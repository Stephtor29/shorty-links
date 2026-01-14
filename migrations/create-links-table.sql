-- Crear tabla de enlaces acortados
CREATE TABLE IF NOT EXISTS links (
  id TEXT PRIMARY KEY,
  "originalUrl" TEXT NOT NULL,
  "shortCode" TEXT NOT NULL UNIQUE,
  "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  clicks INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_links_short_code ON links("shortCode");
CREATE INDEX IF NOT EXISTS idx_links_user_id ON links("userId");