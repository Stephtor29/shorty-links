import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 p-4">
      <div className="text-center max-w-3xl">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            🔗 Shorty Links
          </h1>
          <p className="text-2xl text-gray-700 mb-2">
            Acorta tus enlaces en segundos
          </p>
          <p className="text-lg text-gray-600">
            Crea enlaces cortos, rastreables y fáciles de compartir
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition transform hover:scale-105 shadow-lg"
          >
            Comenzar Gratis
          </Link>
          <Link
            href="/login"
            className="bg-white hover:bg-gray-50 text-gray-900 font-semibold px-8 py-4 rounded-lg transition border-2 border-gray-300 shadow-lg"
          >
            Iniciar Sesión
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Rápido</h3>
            <p className="text-gray-600">Crea enlaces cortos al instante</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Analítica</h3>
            <p className="text-gray-600">Rastrea cuántas veces se usa tu enlace</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Seguro</h3>
            <p className="text-gray-600">Tus enlaces protegidos con autenticación</p>
          </div>
        </div>
      </div>
    </div>
  );
}