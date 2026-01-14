import { requireAuth } from "../../lib/auth-utils";
import CreateLinkForm from "../../components/CreateLinkForm";
import LinksList from "../../components/LinksList";
import UserMenu from "../../components/UserMenu";

export default async function DashboardPage() {
  const session = await requireAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">🔗 Link Shortener</h1>
              <p className="text-sm text-gray-600">Bienvenido, {session.user.name || session.user.email}</p>
            </div>
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Crear nuevo enlace corto</h2>
            <CreateLinkForm />
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Mis enlaces</h2>
            <LinksList />
          </div>
        </div>
      </main>
    </div>
  );
}