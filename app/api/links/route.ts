import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { links } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const userLinks = await db
      .select()
      .from(links)
      .where(eq(links.userId, session.user.id))
      .orderBy(links.createdAt);

    return NextResponse.json(userLinks);
  } catch (error) {
    console.error("Error fetching links:", error);
    return NextResponse.json({ error: "Error al obtener los links" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { originalUrl } = await request.json();

    if (!originalUrl) {
      return NextResponse.json({ error: "URL es requerida" }, { status: 400 });
    }

    // Validar URL
    try {
      new URL(originalUrl);
    } catch {
      return NextResponse.json({ error: "URL inválida" }, { status: 400 });
    }

    // Generar código corto único
    const shortCode = nanoid(8);

    // Crear el enlace
    const newLink = await db.insert(links).values({
      id: nanoid(),
      originalUrl,
      shortCode,
      userId: session.user.id,
      clicks: 0,
    }).returning();

    return NextResponse.json(newLink[0], { status: 201 });
  } catch (error) {
    console.error("Error creating link:", error);
    return NextResponse.json({ error: "Error al crear el link" }, { status: 500 });
  }
}