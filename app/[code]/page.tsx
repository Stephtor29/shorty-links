import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { links } from "@/lib/schema";
import { eq, sql } from "drizzle-orm";

export default async function RedirectPage({
  params,
}: {
  params: { code: string };
}) {
  const { code } = params;

  try {
    // Buscar el enlace por el código corto
    const link = await db
      .select()
      .from(links)
      .where(eq(links.shortCode, code))
      .limit(1);

    if (!link || link.length === 0) {
      notFound();
    }

    // Incrementar el contador de clicks
    await db
      .update(links)
      .set({ clicks: sql`${links.clicks} + 1` })
      .where(eq(links.shortCode, code));

    // Redirigir a la URL original
    redirect(link[0].originalUrl);
  } catch (error) {
    console.error("Error redirecting:", error);
    notFound();
  }
}

export const dynamic = "force-dynamic";