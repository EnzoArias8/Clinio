import { redirect } from 'next/navigation'
import { getCurrentProfesional } from '@/lib/auth'
import { PerfilForm } from './perfil-form'

export default async function PerfilPage() {
  const profesional = await getCurrentProfesional()

  if (!profesional) {
    redirect('/login')
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Mi Perfil</h1>
        <p className="text-muted-foreground mt-2">
          Actualiza tu información personal y foto de perfil.
        </p>
      </div>

      <div className="max-w-2xl">
        <PerfilForm profesional={{
          id: profesional.id,
          nombre: profesional.nombre,
          especialidad: profesional.especialidad,
          fotoPerfil: profesional.fotoPerfil || undefined,
          email: profesional.email,
        }} />
      </div>
    </div>
  )
}
