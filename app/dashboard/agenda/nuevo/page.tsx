'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { crearTurno, getPacientesForTurno, getServiciosForTurno } from '../actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Loader2, 
  Calendar, 
  User, 
  DollarSign, 
  ArrowLeft,
  Plus,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

// Form validation schema
const turnoSchema = z.object({
  pacienteId: z.string().min(1, 'Debe seleccionar un paciente'),
  servicioId: z.string().min(1, 'Debe seleccionar un servicio'),
  fechaHora: z.string().min(1, 'Debe seleccionar una fecha y hora'),
});

type TurnoFormData = z.infer<typeof turnoSchema>;

interface Paciente {
  id: string;
  nombre: string;
  tutor: {
    nombre: string;
    email: string;
    whatsapp: string;
  };
}

interface Servicio {
  id: string;
  nombre: string;
  precio: number;
  duracionMin: number;
}

export default function NuevoTurnoPage() {
  const router = useRouter();
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<TurnoFormData>({
    resolver: zodResolver(turnoSchema),
  });

  const selectedServicioId = watch('servicioId');
  const selectedServicio = servicios.find(s => s.id === selectedServicioId);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [pacientesResult, serviciosResult] = await Promise.all([
        getPacientesForTurno(),
        getServiciosForTurno(),
      ]);

      if (pacientesResult.success) {
        setPacientes(pacientesResult.data || []);
      } else {
        setError(pacientesResult.error || 'Error al cargar los pacientes');
      }

      if (serviciosResult.success) {
        setServicios(serviciosResult.data || []);
      } else {
        setError(serviciosResult.error || 'Error al cargar los servicios');
      }
    } catch (err) {
      setError('Error inesperado al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: TurnoFormData) => {
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append('pacienteId', data.pacienteId);
      formData.append('servicioId', data.servicioId);
      formData.append('fechaHora', data.fechaHora);

      const result = await crearTurno(formData);

      if (result.success) {
        setSuccess('Turno creado exitosamente');
        setTimeout(() => {
          router.push('/dashboard/agenda');
        }, 1500);
      } else {
        setError(result.error || 'Error al crear el turno');
        setSubmitting(false);
      }
    } catch (error) {
      setError('Error inesperado. Intente nuevamente.');
      setSubmitting(false);
    }
  };

  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(precio);
  };

  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
        <span className="ml-2 text-gray-600">Cargando datos...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/dashboard/agenda">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nuevo Turno</h1>
          <p className="text-gray-600 mt-2">
            Agende un nuevo turno con un paciente
          </p>
        </div>
      </div>

      {/* Empty State Checks */}
      {pacientes.length === 0 && (
        <Alert>
          <User className="h-4 w-4" />
          <AlertDescription>
            No hay pacientes registrados. <Link href="/dashboard/pacientes/nuevo" className="text-teal-600 hover:text-teal-700 underline">Registre un paciente primero</Link> antes de crear turnos.
          </AlertDescription>
        </Alert>
      )}

      {servicios.length === 0 && (
        <Alert>
          <DollarSign className="h-4 w-4" />
          <AlertDescription>
            No hay servicios configurados. <Link href="/dashboard/configuracion" className="text-teal-600 hover:text-teal-700 underline">Configure sus servicios primero</Link> antes de crear turnos.
          </AlertDescription>
        </Alert>
      )}

      {/* Form */}
      {pacientes.length > 0 && servicios.length > 0 && (
        <div className="max-w-2xl">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Plus className="h-5 w-5 text-teal-600" />
                <CardTitle>Información del Turno</CardTitle>
              </div>
              <CardDescription>
                Complete los datos para agendar un nuevo turno
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Paciente */}
                <div className="space-y-2">
                  <Label htmlFor="pacienteId" className="text-sm font-medium text-gray-700">
                    Paciente *
                  </Label>
                  <Select
                    value={watch('pacienteId')}
                    onValueChange={(value) => setValue('pacienteId', value)}
                    disabled={submitting}
                  >
                    <SelectTrigger className="border-gray-300 focus:border-teal-500 focus:ring-teal-500">
                      <SelectValue placeholder="Seleccione un paciente" />
                    </SelectTrigger>
                    <SelectContent>
                      {pacientes.map((paciente) => (
                        <SelectItem key={paciente.id} value={paciente.id}>
                          <div>
                            <div className="font-medium">{paciente.nombre}</div>
                            <div className="text-sm text-gray-500">
                              Tutor: {paciente.tutor.nombre}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.pacienteId && (
                    <p className="text-sm text-red-600">{errors.pacienteId.message}</p>
                  )}
                </div>

                {/* Servicio */}
                <div className="space-y-2">
                  <Label htmlFor="servicioId" className="text-sm font-medium text-gray-700">
                    Servicio *
                  </Label>
                  <Select
                    value={watch('servicioId')}
                    onValueChange={(value) => setValue('servicioId', value)}
                    disabled={submitting}
                  >
                    <SelectTrigger className="border-gray-300 focus:border-teal-500 focus:ring-teal-500">
                      <SelectValue placeholder="Seleccione un servicio" />
                    </SelectTrigger>
                    <SelectContent>
                      {servicios.map((servicio) => (
                        <SelectItem key={servicio.id} value={servicio.id}>
                          <div>
                            <div className="font-medium">{servicio.nombre}</div>
                            <div className="text-sm text-gray-500">
                              {formatearPrecio(servicio.precio)} • {servicio.duracionMin}min
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.servicioId && (
                    <p className="text-sm text-red-600">{errors.servicioId.message}</p>
                  )}
                </div>

                {/* Service Details */}
                {selectedServicio && (
                  <Card className="bg-teal-50 border-teal-200">
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-teal-600">Precio</p>
                          <p className="font-medium text-teal-900">
                            {formatearPrecio(selectedServicio.precio)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-teal-600">Duración</p>
                          <p className="font-medium text-teal-900">
                            {selectedServicio.duracionMin} minutos
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Fecha y Hora */}
                <div className="space-y-2">
                  <Label htmlFor="fechaHora" className="text-sm font-medium text-gray-700">
                    Fecha y Hora *
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="fechaHora"
                      type="datetime-local"
                      {...register('fechaHora')}
                      min={getMinDateTime()}
                      className="pl-10 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                      disabled={submitting}
                    />
                  </div>
                  {errors.fechaHora && (
                    <p className="text-sm text-red-600">{errors.fechaHora.message}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    Seleccione una fecha y hora futuras para el turno
                  </p>
                </div>

                {/* Messages */}
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">{success}</AlertDescription>
                  </Alert>
                )}

                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
                  <Link href="/dashboard/agenda">
                    <Button variant="outline" disabled={submitting}>
                      Cancelar
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    className="bg-teal-600 hover:bg-teal-700 text-white font-medium"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Agendando Turno...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Agendar Turno
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
