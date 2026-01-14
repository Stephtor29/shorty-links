"use client";
import { useEffect, useState } from "react";
import { Copy, ExternalLink, BarChart3, Check } from "lucide-react";

interface Link {
  id: number;
  originalUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
}

export default function LinksList() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await fetch("/api/links");
      const data = await response.json();
      setLinks(data);
    } catch (error) {
      console.error("Error al cargar links:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (shortCode: string, id: number) => {
    const shortUrl = `${window.location.origin}/${shortCode}`;
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>;
  }

  if (links.length === 0) {
    return <div className="text-center py-12"><p className="text-gray-500">No tienes enlaces creados aún.</p></div>;
  }

  return (
    <div className="space-y-4">
      {links.map((link) => {
        const shortUrl = `${window.location.origin}/${link.shortCode}`;
        const isCopied = copiedId === link.id;
        return (
          <div key={link.id} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-1">
                    {shortUrl}<ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-sm text-gray-600 truncate" title={link.originalUrl}>{link.originalUrl}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><BarChart3 className="w-3 h-3" />{link.clicks} clicks</span>
                  <span>Creado: {new Date(link.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <button onClick={() => copyToClipboard(link.shortCode, link.id)} className="flex-shrink-0 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition flex items-center gap-2 text-sm font-medium">
                {isCopied ? <><Check className="w-4 h-4 text-green-600" />Copiado</> : <><Copy className="w-4 h-4" />Copiar</>}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}