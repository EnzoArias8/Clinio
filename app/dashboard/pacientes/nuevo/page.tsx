'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { crearPaciente } from '../actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  Loader2, 
  User, 
  Calendar, 
  Mail, 
  Phone, 
  ArrowLeft,
  UserPlus,
  Shield
} from 'lucide-react';
import Link from 'next/link';

// Form validation schema
const pacienteSchema = z.object({
  nombre: z.string().min(2, 'El nombre del paciente debe tener al menos 2 caracteres'),
  fechaNac: z.string().optional(),
  tutorNombre: z.string().min(2, 'El nombre del tutor debe tener al menos 2 caracteres'),
  tutorEmail: z.string().email('Email del tutor inválido'),
  tutorWhatsapp: z.string().min(5, 'El WhatsApp debe tener al menos 5 caracteres'),
});

type PacienteFormData = z.infer<typeof pacienteSchema>;

export default function NuevoPacientePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PacienteFormData>({
    resolver: zodResolver(pacienteSchema),
  });

  const onSubmit = async (data: PacienteFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('nombre', data.nombre);
      if (data.fechaNac) {
        formData.append('fechaNac', data.fechaNac);
      }
      formData.append('tutorNombre', data.tutorNombre);
      formData.append('tutorEmail', data.tutorEmail);
      formData.append('tutorWhatsapp', data.tutorWhatsapp);

      const result = await crearPaciente(formData);

      if (!result?.success) {
        setError(result?.error || 'Error al crear el paciente');
        setIsSubmitting(false);
      }
    } catch (error) {
      setError('Error inesperado. Intente nuevamente.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/pacientes">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Nuevo Paciente</h1>
            <p className="text-gray-600 mt-2">
              Registre un nuevo paciente y su información de contacto
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Patient Information Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-teal-600" />
                <CardTitle>Información del Paciente</CardTitle>
              </div>
              <CardDescription>
                Datos personales del paciente a registrar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Nombre */}
              <div className="space-y-2">
                <Label htmlFor="nombre" className="text-sm font-medium text-gray-700">
                  Nombre completo *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="nombre"
                    {...register('nombre')}
                    placeholder="Nombre del paciente"
                    className="pl-10 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.nombre && (
                  <p className="text-sm text-red-600">{errors.nombre.message}</p>
                )}
              </div>

              {/* Fecha de Nacimiento */}
              <div className="space-y-2">
                <Label htmlFor="fechaNac" className="text-sm font-medium text-gray-700">
                  Fecha de Nacimiento
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="fechaNac"
                    type="date"
                    {...register('fechaNac')}
                    className="pl-10 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.fechaNac && (
                  <p className="text-sm text-red-600">{errors.fechaNac.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Separator */}
          <div className="flex items-center space-x-4">
            <Separator className="flex-1" />
            <span className="text-sm text-gray-500 font-medium">Datos del Tutor</span>
            <Separator className="flex-1" />
          </div>

          {/* Tutor Information Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-teal-600" />
                <CardTitle>Información del Tutor</CardTitle>
              </div>
              <CardDescription>
                Datos de contacto del responsable del paciente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Nombre del Tutor */}
              <div className="space-y-2">
                <Label htmlFor="tutorNombre" className="text-sm font-medium text-gray-700">
                  Nombre del Tutor *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="tutorNombre"
                    {...register('tutorNombre')}
                    placeholder="María García"
                    className="pl-10 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.tutorNombre && (
                  <p className="text-sm text-red-600">{errors.tutorNombre.message}</p>
                )}
              </div>

              {/* Email del Tutor */}
              <div className="space-y-2">
                <Label htmlFor="tutorEmail" className="text-sm font-medium text-gray-700">
                  Email del Tutor *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="tutorEmail"
                    type="email"
                    {...register('tutorEmail')}
                    placeholder="maria@ejemplo.com"
                    className="pl-10 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.tutorEmail && (
                  <p className="text-sm text-red-600">{errors.tutorEmail.message}</p>
                )}
              </div>

              {/* WhatsApp del Tutor */}
              <div className="space-y-2">
                <Label htmlFor="tutorWhatsapp" className="text-sm font-medium text-gray-700">
                  WhatsApp del Tutor *
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="tutorWhatsapp"
                    {...register('tutorWhatsapp')}
                    placeholder="+54 9 11 1234-5678"
                    className="pl-10 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.tutorWhatsapp && (
                  <p className="text-sm text-red-600">{errors.tutorWhatsapp.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link href="/dashboard/pacientes">
              <Button variant="outline" disabled={isSubmitting}>
                Cancelar
              </Button>
            </Link>
            <Button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando Paciente...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Crear Paciente
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
