"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

type Material = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  file_name: string;
  file_url: string;
  file_type: string | null;
  file_size: number;
  uploaded_by: string | null;
  created_at: string;
};

const categories = ["Alle", "Onboarding", "Produkte", "Sales", "Führung", "Allgemein"];

const fileTypeIcons: Record<string, string> = {
  pdf: "📄",
  mp4: "🎬",
  mov: "🎬",
  pptx: "📊",
  ppt: "📊",
  xlsx: "📈",
  xls: "📈",
  docx: "📝",
  doc: "📝",
  png: "🖼️",
  jpg: "🖼️",
  jpeg: "🖼️",
  zip: "📦",
};

function getFileIcon(fileName: string) {
  const ext = fileName.split(".").pop()?.toLowerCase() || "";
  return fileTypeIcons[ext] || "📎";
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export default function SchulungenPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [activeCategory, setActiveCategory] = useState("Alle");
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadDesc, setUploadDesc] = useState("");
  const [uploadCategory, setUploadCategory] = useState("Allgemein");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMaterials();
  }, []);

  async function fetchMaterials() {
    const { data } = await supabase
      .from("materials")
      .select("*")
      .order("created_at", { ascending: false });
    setMaterials(data || []);
    setLoading(false);
  }

  async function handleUpload() {
    if (!selectedFile || !uploadTitle.trim()) return;
    setUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const timestamp = Date.now();
      const filePath = `${user.id}/${timestamp}-${selectedFile.name}`;

      const { error: uploadError } = await supabase.storage
        .from("schulungen")
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("schulungen")
        .getPublicUrl(filePath);

      const { error: insertError } = await supabase.from("materials").insert({
        title: uploadTitle,
        description: uploadDesc || null,
        category: uploadCategory,
        file_name: selectedFile.name,
        file_url: urlData.publicUrl,
        file_type: selectedFile.name.split(".").pop()?.toLowerCase() || null,
        file_size: selectedFile.size,
        uploaded_by: user.id,
      });

      if (insertError) throw insertError;

      setShowUpload(false);
      setUploadTitle("");
      setUploadDesc("");
      setUploadCategory("Allgemein");
      setSelectedFile(null);
      fetchMaterials();
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload fehlgeschlagen. Bitte versuche es erneut.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(material: Material) {
    const pathParts = material.file_url.split("/schulungen/");
    const filePath = pathParts[pathParts.length - 1];

    await supabase.storage.from("schulungen").remove([filePath]);
    await supabase.from("materials").delete().eq("id", material.id);
    fetchMaterials();
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      if (!uploadTitle) setUploadTitle(file.name.replace(/\.[^.]+$/, ""));
    }
  }

  const filtered = activeCategory === "Alle"
    ? materials
    : materials.filter((m) => m.category === activeCategory);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#F1F5F9]">Schulungen & Materialien</h1>
          <p className="text-[#64748B] mt-1">Trainings, Playbooks und Dokumente für dein Team.</p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="bg-gradient-to-r from-[#D4A843] to-[#F59E0B] text-[#050A14] font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity text-sm"
        >
          + Material hochladen
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-gradient-to-r from-[#D4A843] to-[#F59E0B] text-[#050A14]"
                : "bg-[#111D33] text-[#94A3B8] border border-[#1E293B] hover:border-[#D4A843] hover:text-white"
            }`}
          >
            {cat}
            {activeCategory !== cat && (
              <span className="ml-1.5 text-xs text-[#64748B]">
                ({cat === "Alle" ? materials.length : materials.filter((m) => m.category === cat).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Materials Grid */}
      {loading ? (
        <div className="text-center py-20 text-[#64748B]">Laden...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[#64748B] text-lg mb-2">Noch keine Materialien vorhanden</p>
          <p className="text-[#4A5568] text-sm">Lade das erste Dokument hoch.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((material) => (
            <div
              key={material.id}
              className="group bg-[#111D33] border border-[#1E293B] rounded-xl p-6 hover:border-[#3B82F6] transition-all"
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getFileIcon(material.file_name)}</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#D4A843]">
                    {material.category}
                  </span>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleDelete(material)}
                    className="text-xs text-[#64748B] hover:text-red-400 transition-colors"
                    title="Löschen"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-[#F1F5F9] font-semibold mb-2">{material.title}</h3>

              {/* Description */}
              {material.description && (
                <p className="text-[#94A3B8] text-sm leading-relaxed mb-4">
                  {material.description}
                </p>
              )}

              {/* File info */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#1E293B]">
                <div className="text-xs text-[#64748B]">
                  <span>{material.file_type?.toUpperCase()}</span>
                  <span className="mx-2">·</span>
                  <span>{formatFileSize(material.file_size)}</span>
                  <span className="mx-2">·</span>
                  <span>{new Date(material.created_at).toLocaleDateString("de-DE")}</span>
                </div>
                <a
                  href={material.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#D4A843] hover:text-[#F59E0B] transition-colors"
                >
                  Öffnen ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#0A1628] border border-[#1E293B] rounded-xl w-full max-w-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#F1F5F9]">Material hochladen</h2>
              <button
                onClick={() => { setShowUpload(false); setSelectedFile(null); }}
                className="text-[#64748B] hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Drop Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                  dragOver
                    ? "border-[#D4A843] bg-[#D4A843]/5"
                    : selectedFile
                    ? "border-[#3B82F6] bg-[#3B82F6]/5"
                    : "border-[#1E293B] hover:border-[#94A3B8]"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSelectedFile(file);
                      if (!uploadTitle) setUploadTitle(file.name.replace(/\.[^.]+$/, ""));
                    }
                  }}
                />
                {selectedFile ? (
                  <div>
                    <span className="text-3xl">{getFileIcon(selectedFile.name)}</span>
                    <p className="text-[#F1F5F9] font-medium mt-2">{selectedFile.name}</p>
                    <p className="text-[#64748B] text-sm">{formatFileSize(selectedFile.size)}</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-[#94A3B8] text-lg mb-1">📁 Datei hierher ziehen</p>
                    <p className="text-[#64748B] text-sm">oder klicken zum Auswählen</p>
                  </div>
                )}
              </div>

              {/* Title */}
              <input
                type="text"
                placeholder="Titel"
                value={uploadTitle}
                onChange={(e) => setUploadTitle(e.target.value)}
                className="w-full bg-[#111D33] border border-[#1E293B] text-[#F1F5F9] placeholder-[#64748B] rounded-lg px-4 py-3 focus:border-[#D4A843] focus:outline-none"
              />

              {/* Description */}
              <textarea
                placeholder="Beschreibung (optional)"
                value={uploadDesc}
                onChange={(e) => setUploadDesc(e.target.value)}
                rows={2}
                className="w-full bg-[#111D33] border border-[#1E293B] text-[#F1F5F9] placeholder-[#64748B] rounded-lg px-4 py-3 focus:border-[#D4A843] focus:outline-none resize-none"
              />

              {/* Category */}
              <select
                value={uploadCategory}
                onChange={(e) => setUploadCategory(e.target.value)}
                className="w-full bg-[#111D33] border border-[#1E293B] text-[#F1F5F9] rounded-lg px-4 py-3 focus:border-[#D4A843] focus:outline-none"
              >
                {categories.filter((c) => c !== "Alle").map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              {/* Submit */}
              <button
                onClick={handleUpload}
                disabled={!selectedFile || !uploadTitle.trim() || uploading}
                className="w-full bg-gradient-to-r from-[#D4A843] to-[#F59E0B] text-[#050A14] font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {uploading ? "Wird hochgeladen..." : "Hochladen"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Weekly Training Info */}
      <div className="mt-12 bg-[#0A1628] border border-[#1E293B] rounded-xl p-6 text-center">
        <p className="text-[#F1F5F9] font-semibold mb-2">Wöchentliches Live-Training</p>
        <p className="text-[#94A3B8] text-sm mb-4">
          Jeden Mittwoch 18:00 Uhr — Live Sales Training mit Q&A. Zoom-Link wird per Email verschickt.
        </p>
        <span className="text-[#D4A843] text-sm font-medium">
          Nächstes Training: Mittwoch, 19. März 2026
        </span>
      </div>
    </div>
  );
}
