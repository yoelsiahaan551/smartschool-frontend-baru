"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import {
  ChevronRight,
  ArrowLeft,
  User,
  Users,
  School,
  BookOpen,
  FileText,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Download,
  Eye,
  Phone,
  Mail,
  MapPin,
  CalendarDays,
  Briefcase,
  Wallet,
  IdCard,
  X,
} from "lucide-react";

const initialPendaftar = [
  {
    id: 1,
    noPendaftaran: "PPDB001",
    status: "Menunggu",
    jalur: "Reguler",
    gelombang: "1",
    tanggalDaftar: "2026-01-08",
    pribadi: {
      nama: "Andi Saputra",
      nik: "3273010101080001",
      nisn: "0051234567",
      tempatLahir: "Bandung",
      tanggalLahir: "2010-04-12",
      jenisKelamin: "Laki-laki",
      alamat: "Jl. Merdeka No. 12, Bandung, Jawa Barat",
      telepon: "0812-3456-7801",
      email: "andi.saputra@mail.com",
    },
    ortu: {
      namaAyah: "Sutrisno",
      namaIbu: "Wati Rahmawati",
      telepon: "0813-2233-4455",
      pekerjaan: "Wiraswasta",
      penghasilan: "Rp 3.000.000 - Rp 5.000.000",
    },
    sekolah: {
      asalSekolah: "SMP Negeri 1",
      npsn: "20223344",
      tahunLulus: "2026",
      nilai: "86.5",
    },
    jurusan: {
      pilihan1: "RPL",
      pilihan2: "TKJ",
    },
    berkas: [
      { nama: "Kartu Keluarga (KK)", status: "Terunggah", url: "#" },
      { nama: "Akta Kelahiran", status: "Terunggah", url: "#" },
      { nama: "Ijazah / SKL", status: "Terunggah", url: "#" },
      { nama: "Kartu Keluarga", status: "Terunggah", url: "#" },
      { nama: "Pas Foto", status: "Terunggah", url: "#" },
    ],
  },
];

const STATUS_STYLES = {
  Menunggu: "bg-amber-50 text-amber-600 border-amber-100",
  Terverifikasi: "bg-blue-50 text-blue-600 border-blue-100",
  Lulus: "bg-emerald-50 text-emerald-600 border-emerald-100",
  "Tidak Lulus": "bg-rose-50 text-rose-600 border-rose-100",
  "Daftar Ulang": "bg-violet-50 text-violet-600 border-violet-100",
  Ditolak: "bg-rose-50 text-rose-600 border-rose-100",
  "Perlu Perbaikan": "bg-orange-50 text-orange-600 border-orange-100",
};

function formatTanggal(iso) {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
}

function SectionCard({ icon: Icon, title, children }) {
  return (
    <section className="bg-white rounded-xl p-5 md:p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
          <Icon size={15} className="text-blue-500" />
        </div>
        <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function Field({ label, value, icon: Icon }) {
  return (
    <div className="flex items-start gap-2.5">
      {Icon && <Icon size={14} className="text-slate-300 mt-0.5 flex-shrink-0" />}
      <div className="min-w-0">
        <p className="text-[11px] text-slate-400">{label}</p>
        <p className="text-sm text-slate-700 mt-0.5 break-words">{value || "-"}</p>
      </div>
    </div>
  );
}

export default function DetailPendaftarPage() {
  const params = useParams();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null); // "verifikasi" | "tolak" | "kembalikan"
  const [catatan, setCatatan] = useState("");
  const [previewBerkas, setPreviewBerkas] = useState(null);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const data = useMemo(() => {
    const found = initialPendaftar.find((p) => String(p.id) === String(params?.id));
    return found || initialPendaftar[0];
  }, [params]);

  const [status, setStatus] = useState(data.status);

  const actionConfig = {
    verifikasi: {
      title: "Verifikasi Pendaftar",
      desc: "Pendaftar akan ditandai sebagai Terverifikasi dan dapat melanjutkan ke tahap seleksi.",
      confirmLabel: "Ya, Verifikasi",
      confirmClass: "bg-blue-600 hover:bg-blue-700",
      needCatatan: false,
      newStatus: "Terverifikasi",
    },
    tolak: {
      title: "Tolak Pendaftar",
      desc: "Berikan alasan penolakan agar pendaftar mengetahui kekurangannya.",
      confirmLabel: "Ya, Tolak",
      confirmClass: "bg-rose-600 hover:bg-rose-700",
      needCatatan: true,
      newStatus: "Ditolak",
    },
    kembalikan: {
      title: "Kembalikan untuk Diperbaiki",
      desc: "Pendaftar akan diminta memperbaiki data/berkas sesuai catatan yang kamu berikan.",
      confirmLabel: "Kirim & Kembalikan",
      confirmClass: "bg-orange-500 hover:bg-orange-600",
      needCatatan: true,
      newStatus: "Perlu Perbaikan",
    },
  };

  const handleConfirm = () => {
    const cfg = actionConfig[confirmAction];
    if (!cfg) return;
    // TODO: sambungkan ke API — kirim { id: data.id, status: cfg.newStatus, catatan }
    setStatus(cfg.newStatus);
    setConfirmAction(null);
    setCatatan("");
  };

  return (
    <div className="flex h-screen w-full bg-[#EEF0F2] overflow-hidden">
      <Sidebar
        role="adminPPDB"
        active="pendaftar"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
      />

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header
          toggleSidebar={toggleSidebar}
          notifications={[]}
          user={{ name: "Admin PPDB", email: "adminppdb@smartschool.com", avatar: "PP" }}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="w-full p-4 md:p-6 lg:p-8">
            <div className="w-full space-y-5 max-w-[1100px] mx-auto">
              {/* Breadcrumb */}
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span>PPDB</span>
                <ChevronRight size={12} />
                <span
                  onClick={() => router.push("/adminPPDB/pendaftar")}
                  className="hover:text-blue-500 cursor-pointer"
                >
                  Data Pendaftar
                </span>
                <ChevronRight size={12} />
                <span className="text-slate-600 font-medium">{data.noPendaftaran}</span>
              </div>

              {/* Tombol kembali */}
              <button
                onClick={() => router.push("/adminPPDB/pendaftar")}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700"
              >
                <ArrowLeft size={14} />
                Kembali ke Data Pendaftar
              </button>

              {/* ===== HEADER PROFIL ===== */}
              <section className="bg-white rounded-xl p-5 md:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <User size={26} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-slate-800">{data.pribadi.nama}</p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{data.noPendaftaran}</p>
                    <span className={`inline-block mt-2 text-[11px] font-medium px-2.5 py-1 rounded-full border ${STATUS_STYLES[status] || STATUS_STYLES.Menunggu}`}>
                      {status}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs text-slate-500 sm:text-right">
                  <p><span className="text-slate-400">Jalur:</span> {data.jalur}</p>
                  <p><span className="text-slate-400">Gelombang:</span> {data.gelombang}</p>
                  <p className="col-span-2"><span className="text-slate-400">Tanggal Daftar:</span> {formatTanggal(data.tanggalDaftar)}</p>
                </div>
              </section>

              {/* ===== DATA PRIBADI ===== */}
              <SectionCard icon={User} title="Data Pribadi">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Nama Lengkap" value={data.pribadi.nama} />
                  <Field label="NIK" icon={IdCard} value={data.pribadi.nik} />
                  <Field label="NISN" icon={IdCard} value={data.pribadi.nisn} />
                  <Field
                    label="Tempat, Tanggal Lahir"
                    icon={CalendarDays}
                    value={`${data.pribadi.tempatLahir}, ${formatTanggal(data.pribadi.tanggalLahir)}`}
                  />
                  <Field label="Jenis Kelamin" value={data.pribadi.jenisKelamin} />
                  <Field label="No. HP" icon={Phone} value={data.pribadi.telepon} />
                  <Field label="Email" icon={Mail} value={data.pribadi.email} />
                  <Field label="Alamat" icon={MapPin} value={data.pribadi.alamat} />
                </div>
              </SectionCard>

              {/* ===== DATA ORANG TUA ===== */}
              <SectionCard icon={Users} title="Data Orang Tua">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Nama Ayah" value={data.ortu.namaAyah} />
                  <Field label="Nama Ibu" value={data.ortu.namaIbu} />
                  <Field label="No. HP Orang Tua" icon={Phone} value={data.ortu.telepon} />
                  <Field label="Pekerjaan" icon={Briefcase} value={data.ortu.pekerjaan} />
                  <Field label="Penghasilan" icon={Wallet} value={data.ortu.penghasilan} />
                </div>
              </SectionCard>

              {/* ===== DATA SEKOLAH ===== */}
              <SectionCard icon={School} title="Data Sekolah">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Asal Sekolah" value={data.sekolah.asalSekolah} />
                  <Field label="NPSN" value={data.sekolah.npsn} />
                  <Field label="Tahun Lulus" value={data.sekolah.tahunLulus} />
                  <Field label="Nilai" value={data.sekolah.nilai} />
                </div>
              </SectionCard>

              {/* ===== PILIHAN JURUSAN ===== */}
              <SectionCard icon={BookOpen} title="Pilihan Jurusan">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-lg border border-slate-100 p-4">
                    <p className="text-[11px] text-slate-400">Pilihan 1</p>
                    <p className="text-sm font-semibold text-slate-700 mt-1">{data.jurusan.pilihan1}</p>
                  </div>
                  <div className="rounded-lg border border-slate-100 p-4">
                    <p className="text-[11px] text-slate-400">Pilihan 2</p>
                    <p className="text-sm font-semibold text-slate-700 mt-1">{data.jurusan.pilihan2}</p>
                  </div>
                </div>
              </SectionCard>

              {/* ===== BERKAS ===== */}
              <SectionCard icon={FileText} title="Berkas">
                <div className="divide-y divide-slate-50">
                  {data.berkas.map((b, i) => (
                    <div key={i} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FileText size={15} className="text-slate-300 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm text-slate-700 truncate">{b.nama}</p>
                          <p className="text-[11px] text-emerald-500 mt-0.5">{b.status}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          onClick={() => setPreviewBerkas(b)}
                          className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:bg-blue-50 px-2.5 py-1.5 rounded-md transition-colors"
                        >
                          <Eye size={13} />
                          Lihat
                        </button>
                        <a
                          href={b.url}
                          className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:bg-slate-50 px-2.5 py-1.5 rounded-md transition-colors"
                        >
                          <Download size={13} />
                          Unduh
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>

              {/* ===== AKSI ===== */}
              <section className="bg-white rounded-xl p-5 md:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2.5">
                <button
                  onClick={() => setConfirmAction("kembalikan")}
                  className="flex items-center justify-center gap-1.5 text-xs font-medium text-orange-600 border border-orange-200 hover:bg-orange-50 px-4 py-2.5 rounded-md transition-colors"
                >
                  <RotateCcw size={14} />
                  Kembalikan untuk Diperbaiki
                </button>
                <button
                  onClick={() => setConfirmAction("tolak")}
                  className="flex items-center justify-center gap-1.5 text-xs font-medium text-rose-600 border border-rose-200 hover:bg-rose-50 px-4 py-2.5 rounded-md transition-colors"
                >
                  <XCircle size={14} />
                  Tolak
                </button>
                <button
                  onClick={() => setConfirmAction("verifikasi")}
                  className="flex items-center justify-center gap-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-md transition-colors"
                >
                  <CheckCircle2 size={14} />
                  Verifikasi
                </button>
              </section>

              <footer className="text-center text-[11px] text-slate-400 py-3">
                © 2026 SmartSchool &middot; Dashboard Admin PPDB &middot; All rights reserved
              </footer>
            </div>
          </div>
        </main>
      </div>

      {/* ===== MODAL KONFIRMASI AKSI ===== */}
      {confirmAction && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-semibold text-slate-800">{actionConfig[confirmAction].title}</h3>
              <button onClick={() => setConfirmAction(null)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2">{actionConfig[confirmAction].desc}</p>

            {actionConfig[confirmAction].needCatatan && (
              <div className="mt-4">
                <label className="text-[11px] text-slate-400">Catatan / Alasan</label>
                <textarea
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  rows={4}
                  placeholder="Tuliskan catatan untuk pendaftar..."
                  className="mt-1.5 w-full text-sm border border-slate-200 rounded-md px-3 py-2 outline-none focus:border-blue-400 placeholder:text-slate-400 resize-none"
                />
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-5 mt-5 border-t border-slate-100">
              <button
                onClick={() => setConfirmAction(null)}
                className="text-xs font-medium text-slate-500 hover:text-slate-700 px-4 py-2"
              >
                Batal
              </button>
              <button
                onClick={handleConfirm}
                disabled={actionConfig[confirmAction].needCatatan && !catatan.trim()}
                className={`text-xs font-medium text-white px-4 py-2 rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${actionConfig[confirmAction].confirmClass}`}
              >
                {actionConfig[confirmAction].confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL PREVIEW BERKAS ===== */}
      {previewBerkas && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-800">{previewBerkas.nama}</h3>
              <button onClick={() => setPreviewBerkas(null)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>
            <div className="w-full aspect-[4/3] bg-slate-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-slate-400">
                <FileText size={32} className="mx-auto mb-2" />
                <p className="text-xs">Pratinjau berkas akan tampil di sini</p>
                <p className="text-[11px] mt-1">(sambungkan ke URL file asli dari API)</p>
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <a
                href={previewBerkas.url}
                className="flex items-center gap-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                <Download size={13} />
                Unduh Berkas
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}