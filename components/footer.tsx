import Link from 'next/link'
import { Logo } from './logo'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-sidebar to-sidebar/95 border-t border-sidebar-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Logo size={56} />
            </Link>
            <p className="text-sidebar-foreground/70 text-sm">
              Simplificando la salud
            </p>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sidebar-foreground text-sm">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sidebar-foreground/70 hover:text-sidebar-primary text-sm transition-colors"
                >
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sidebar-foreground/70 hover:text-sidebar-primary text-sm transition-colors"
                >
                  Privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sidebar-foreground text-sm">
              Soporte
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sidebar-foreground/70 hover:text-sidebar-primary text-sm transition-colors"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sidebar-foreground/70 hover:text-sidebar-primary text-sm transition-colors"
                >
                  Soporte
                </Link>
              </li>
            </ul>
          </div>

          {/* Status */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sidebar-foreground text-sm">
              Estado
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <p className="text-sidebar-foreground/70 text-sm">
                Todos los sistemas operativos
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-sidebar-border" />

        {/* Copyright */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sidebar-foreground/60 text-sm">
            © {currentYear} Clinio. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-sidebar-foreground/60 hover:text-sidebar-primary text-sm transition-colors"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-sidebar-foreground/60 hover:text-sidebar-primary text-sm transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-sidebar-foreground/60 hover:text-sidebar-primary text-sm transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
