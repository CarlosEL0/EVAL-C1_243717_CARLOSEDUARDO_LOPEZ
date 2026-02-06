import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { name: 'Inicio', href: '/dashboard' },
    { name: 'Libros Populares', href: '/dashboard/popular' },
    { name: 'Préstamos Vencidos', href: '/dashboard/overdue' },
    { name: 'Resumen de Multas', href: '/dashboard/fines' },
    { name: 'Actividad de Socios', href: '/dashboard/members' },
    { name: 'Salud de Inventario', href: '/dashboard/inventory' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6">
        <h2 className="text-xl font-bold mb-8">Biblioteca Dashboard</h2>
        <nav className="space-y-4">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href} className="block hover:text-blue-400 transition-colors">
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}