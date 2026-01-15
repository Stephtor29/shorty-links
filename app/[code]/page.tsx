import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { links } from "@/lib/schema";
import { eq } from "drizzle-orm";

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ code: string }>; 
}) {
  const { code } = await params;

  if (!code) {
    notFound();
  }

  // Buscar el enlace por el código corto
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, code))
    .limit(1);

  if (!link) {
    notFound();
  }

  // Incrementar contador de clicks (sin await para no bloquear)
  db.update(links)
    .set({ clicks: link.clicks + 1 }) 
    .where(eq(links.id, link.id))
    .catch((err) => console.error("Error updating clicks:", err));

  // Redirigir a la URL original - NO lo pongas en try/catch
  redirect(link.originalUrl);
}

export const dynamic = "force-dynamic";