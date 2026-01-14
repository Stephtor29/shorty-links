"use client";
import { useRouter } from "next/navigation";
import { signOut } from "../lib/auth-client";
import { LogOut } from "lucide-react";

export default function UserMenu() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <button onClick={handleSignOut} className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition">
      <LogOut className="w-4 h-4" />
      Cerrar Sesión
    </button>
  );
}