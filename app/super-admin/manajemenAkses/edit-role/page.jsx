"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";

// dummyPermissions diimpor dari halaman list manajemen akses
import { dummyPermissions } from "../page";

const dummyRoles = [
  { id: "role-001", nama: "Super Admin", namaTampilan: "super-admin", deskripsi: "Akses penuh ke seluruh modul dan pengaturan sistem SmartSchool, termasuk manajemen tenant dan langganan.", status: "aktif", pengguna: 3, dibuat: "12 Jan 2025", diperbarui: "27 Agu 2026" },
  { id: "role-002", nama: "Admin Sekolah", namaTampilan: "admin", deskripsi: "Mengelola data sekolah, guru, siswa, kelas, dan pengaturan operasional pada satu sekolah.", status: "aktif", pengguna: 125, dibuat: "12 Jan 2025", diperbarui: "20 Agu 2026" },
  { id: "role-003", nama: "Yayasan", namaTampilan: "yayasan", deskripsi: "Memantau seluruh sekolah di bawah naungan yayasan, termasuk laporan akademik dan keuangan lintas sekolah.", status: "aktif", pengguna: 12, dibuat: "3 Feb 2025", diperbarui: "15 Jul 2026" },
  { id: "role-004", nama: "Kepala Sekolah", namaTampilan: "admin", deskripsi: "Mengawasi kegiatan akademik dan administratif sekolah serta menyetujui laporan dari guru dan staf.", status: "aktif", pengguna: 24, dibuat: "3 Feb 2025", diperbarui: "2 Jun 2026" },
  { id: "role-005", nama: "Guru", namaTampilan: "guru", deskripsi: "Mengelola nilai, presensi, dan materi ajar untuk kelas dan mata pelajaran yang diampu.", status: "aktif", pengguna: 842, dibuat: "3 Feb 2025", diperbarui: "10 Agu 2026" },
  { id: "role-006", nama: "Wali Kelas", namaTampilan: "guru", deskripsi: "Memantau perkembangan siswa, presensi, dan catatan perilaku untuk satu kelas yang diampu.", status: "aktif", pengguna: 210, dibuat: "3 Feb 2025", diperbarui: "10 Agu 2026" },
  { id: "role-007", nama: "Guru BK", namaTampilan: "guru", deskripsi: "Mengelola data bimbingan konseling, catatan kasus, dan laporan perkembangan siswa.", status: "aktif", pengguna: 36, dibuat: "3 Feb 2025", diperbarui: "5 Mei 2026" },
  { id: "role-008", nama: "Bendahara", namaTampilan: "admin", deskripsi: "Mengelola tagihan, pembayaran SPP, dan laporan keuangan sekolah.", status: "aktif", pengguna: 18, dibuat: "10 Mar 2025", diperbarui: "1 Agu 2026" },
  { id: "role-009", nama: "Staff Tata Usaha", namaTampilan: "admin", deskripsi: "Mengelola administrasi surat-menyurat, arsip data siswa, dan kebutuhan operasional harian sekolah.", status: "aktif", pengguna: 45, dibuat: "10 Mar 2025", diperbarui: "18 Jul 2026" },
  { id: "role-010", nama: "Admin Sarpras", namaTampilan: "adminSarpras", deskripsi: "Mengelola data sarana dan prasarana sekolah, inventaris, serta jadwal pemeliharaan.", status: "aktif", pengguna: 15, dibuat: "22 Apr 2025", diperbarui: "9 Jun 2026" },
  { id: "role-011", nama: "Admin PPDB", namaTampilan: "adminPPDB", deskripsi: "Mengelola proses pendaftaran peserta didik baru, seleksi, dan verifikasi berkas calon siswa.", status: "aktif", pengguna: 20, dibuat: "22 Apr 2025", diperbarui: "30 Jul 2026" },
  { id: "role-012", nama: "CMS Admin", namaTampilan: "cms", deskripsi: "Mengelola konten dan tampilan situs sekolah, termasuk berita, pengumuman, dan halaman publik.", status: "nonaktif", pengguna: 6, dibuat: "5 Mei 2025", diperbarui: "14 Feb 2026" },
  { id: "role-013", nama: "Siswa", namaTampilan: "siswa", deskripsi: "Mengakses jadwal, nilai, presensi, dan materi ajar melalui portal siswa.", status: "aktif", pengguna: 3210, dibuat: "5 Mei 2025", diperbarui: "25 Agu 2026" },
];

// Preset izin yang sudah dimiliki tiap role (contoh data, disesuaikan dengan kebutuhan nyata)
const dummyRolePermissions = {
  "role-001": dummyPermissions.map((p) => p.id),
  "role-002": ["perm-001", "perm-002", "perm-003", "perm-005", "perm-006", "perm-007", "perm-009", "perm-010", "perm-011", "perm-012"],
  "role-005": ["perm-001", "perm-005", "perm-006"],
  "role-008": ["perm-007", "perm-008"],
  "role-010": ["perm-009", "perm-010"],
  "role-011": ["perm-011", "perm-012"],
  "role-012": ["perm-013", "perm-014"],
};

const AKSI_LIST = [
  { key: "view", label: "Lihat" },
  { key: "create", label: "Tambah" },
  { key: "edit", label: "Ubah" },
  { key: "delete", label: "Hapus" },
];

export default function EditRolePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleId = searchParams.get("id");

  const [activeMenu, setActiveMenu] = useState("manajemen-akses");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [cariModul, setCariModul] = useState("");
  const [modulTerbuka, setModulTerbuka] = useState(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const roleAsal = useMemo(
    () => dummyRoles.find((r) => r.id === roleId) || dummyRoles[0],
    [roleId]
  );

  const [form, setForm] = useState({
    nama: roleAsal.nama,
    namaTampilan: roleAsal.namaTampilan,
    deskripsi: roleAsal.deskripsi,
    status: roleAsal.status,
  });

  // selectedPermissions: Set berisi id permission yang dicentang
  const [selectedPermissions, setSelectedPermissions] = useState(
    () => new Set(dummyRolePermissions[roleAsal.id] || [])
  );

  useEffect(() => {
    setForm({
      nama: roleAsal.nama,
      namaTampilan: roleAsal.namaTampilan,
      deskripsi: roleAsal.deskripsi,
      status: roleAsal.status,
    });
    setSelectedPermissions(new Set(dummyRolePermissions[roleAsal.id] || []));
  }, [roleAsal]);

  const notifications = [
    { id: 1, title: "Pembaruan Sistem v2.0", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Pengingat: Backup Data", desc: "Dikirim 1 hari lalu", read: false },
  ];

  // Kelompokkan permission berdasarkan modul
  const modulGroups = useMemo(() => {
    const map = new Map();
    dummyPermissions.forEach((perm) => {
      if (!map.has(perm.modul)) map.set(perm.modul, {});
      map.get(perm.modul)[perm.aksi] = perm;
    });
    return Array.from(map.entries()).map(([modul, aksiMap]) => ({ modul, aksiMap }));
  }, []);

  const modulTersaring = useMemo(
    () => modulGroups.filter((m) => m.modul.toLowerCase().includes(cariModul.toLowerCase())),
    [modulGroups, cariModul]
  );

  const totalPermissionTersedia = dummyPermissions.length;
  const totalDipilih = selectedPermissions.size;

  const togglePermission = (permId) => {
    setSelectedPermissions((prev) => {
      const next = new Set(prev);
      if (next.has(permId)) next.delete(permId);
      else next.add(permId);
      return next;
    });
  };

  const toggleModulPenuh = (aksiMap) => {
    const idsModul = Object.values(aksiMap).map((p) => p.id);
    const semuaTerpilih = idsModul.every((id) => selectedPermissions.has(id));
    setSelectedPermissions((prev) => {
      const next = new Set(prev);
      idsModul.forEach((id) => (semuaTerpilih ? next.delete(id) : next.add(id)));
      return next;
    });
  };

  const pilihSemua = () => setSelectedPermissions(new Set(dummyPermissions.map((p) => p.id)));
  const hapusSemua = () => setSelectedPermissions(new Set());

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSimpan = () => {
    setIsSaving(true);
    // Simulasi penyimpanan ke server
    setTimeout(() => {
      console.log("Simpan role:", { id: roleAsal.id, ...form, permissions: Array.from(selectedPermissions) });
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }, 600);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        active={activeMenu}
        setActive={setActiveMenu}
        collapsed={!sidebarOpen}
        setCollapsed={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          notifications={notifications}
          user={{ name: "Sarah", email: "sarah@smartschool.com", avatar: "SA" }}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="w-full space-y-5 sm:space-y-6">
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <button
                  onClick={() => router.push("/super-admin/manajemenAkses")}
                  className="text-xs text-slate-600 hover:text-blue-600 transition-colors mb-2"
                >
                  ← Kembali ke Manajemen Akses
                </button>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-xl sm:text-2xl text-slate-900">
                    Edit Role
                  </h1>
                  <span className="text-xs text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                    {roleAsal.id}
                  </span>
                </div>
                <p className="text-sm text-slate-600">
                  Perbarui detail peran dan tentukan hak akses modul untuk role ini.
                </p>
              </div>
              <button
                onClick={handleSimpan}
                disabled={isSaving}
                className="px-5 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors shadow-sm hover:shadow"
              >
                {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>

            {saved && (
              <div className="px-4 py-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
                Perubahan role berhasil disimpan.
              </div>
            )}

            {/* RINGKASAN ROLE */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-sm">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Pengguna</p>
                <p className="text-lg text-slate-900">{roleAsal.pengguna.toLocaleString("id-ID")}</p>
              </div>
              <div className="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-sm">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Hak Akses Aktif</p>
                <p className="text-lg text-slate-900">{totalDipilih}/{totalPermissionTersedia}</p>
              </div>
              <div className="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-sm hidden sm:block">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Terakhir Diperbarui</p>
                <p className="text-sm text-slate-900">{roleAsal.diperbarui}</p>
              </div>
            </div>

            {/* DETAIL ROLE */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 sm:p-5">
              <h2 className="text-sm text-slate-800 mb-4">
                Detail Peran
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-700 mb-1.5">Nama Peran</label>
                  <input
                    type="text"
                    value={form.nama}
                    onChange={(e) => handleChange("nama", e.target.value)}
                    className="w-full px-3 py-2 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-700 mb-1.5">Nama Tampilan (kode sistem)</label>
                  <input
                    type="text"
                    value={form.namaTampilan}
                    onChange={(e) => handleChange("namaTampilan", e.target.value)}
                    className="w-full px-3 py-2 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all font-mono"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs text-slate-700 mb-1.5">Deskripsi</label>
                  <textarea
                    value={form.deskripsi}
                    onChange={(e) => handleChange("deskripsi", e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-700 mb-1.5">Status</label>
                  <div className="flex items-center gap-2">
                    {["aktif", "nonaktif"].map((s) => (
                      <button
                        key={s}
                        onClick={() => handleChange("status", s)}
                        className={`px-3.5 py-1.5 text-xs rounded-lg border transition-colors ${
                          form.status === s
                            ? s === "aktif"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                              : "bg-rose-50 text-rose-800 border-rose-300"
                            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {s === "aktif" ? "Aktif" : "Nonaktif"}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-end gap-1 text-xs text-slate-600">
                  <p>{roleAsal.pengguna.toLocaleString("id-ID")} pengguna sedang menggunakan peran ini.</p>
                  <p>Dibuat {roleAsal.dibuat} · Diperbarui {roleAsal.diperbarui}</p>
                </div>
              </div>
            </div>

            {/* PENEMPATAN HAK AKSES */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="px-4 sm:px-5 py-4 border-b border-slate-200/80 flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h2 className="text-sm text-slate-800">
                      Penempatan Hak Akses
                    </h2>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Pilih modul dan aksi yang boleh diakses oleh role ini.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
                      {totalDipilih}/{totalPermissionTersedia} dipilih
                    </span>
                    <button
                      onClick={pilihSemua}
                      className="px-2.5 py-1 text-xs text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Pilih Semua
                    </button>
                    <button
                      onClick={hapusSemua}
                      className="px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      Hapus Semua
                    </button>
                  </div>
                </div>
                <div className="relative w-full sm:max-w-xs">
                  <input
                    type="text"
                    placeholder="Cari modul..."
                    value={cariModul}
                    onChange={(e) => setCariModul(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* TAMPILAN DESKTOP: TABEL */}
              {!isMobile && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50/80 border-b border-slate-200/80">
                        <th className="px-4 sm:px-5 py-2.5 text-left text-[10px] text-slate-600 uppercase tracking-wider">
                          Modul
                        </th>
                        {AKSI_LIST.map((aksi) => (
                          <th key={aksi.key} className="px-3 py-2.5 text-center text-[10px] text-slate-600 uppercase tracking-wider">
                            {aksi.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {modulTersaring.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-4 py-10 text-center text-slate-500">
                            <p className="text-sm text-slate-600">Modul tidak ditemukan</p>
                          </td>
                        </tr>
                      ) : (
                        modulTersaring.map(({ modul, aksiMap }) => {
                          const idsModul = Object.values(aksiMap).map((p) => p.id);
                          const semuaTerpilih = idsModul.every((id) => selectedPermissions.has(id));
                          const sebagianTerpilih = !semuaTerpilih && idsModul.some((id) => selectedPermissions.has(id));
                          return (
                            <tr key={modul} className="hover:bg-slate-50/60 transition-colors">
                              <td className="px-4 sm:px-5 py-3">
                                <button
                                  onClick={() => toggleModulPenuh(aksiMap)}
                                  className="flex items-center gap-2 text-sm text-slate-800 hover:text-blue-600 transition-colors"
                                >
                                  <span
                                    className={`inline-block w-4 h-4 rounded border ${
                                      semuaTerpilih
                                        ? "bg-blue-600 border-blue-600"
                                        : sebagianTerpilih
                                        ? "bg-blue-100 border-blue-300"
                                        : "bg-white border-slate-300"
                                    }`}
                                  />
                                  {modul}
                                </button>
                              </td>
                              {AKSI_LIST.map((aksi) => {
                                const perm = aksiMap[aksi.key];
                                if (!perm) {
                                  return <td key={aksi.key} className="px-3 py-3 text-center text-slate-300">—</td>;
                                }
                                const checked = selectedPermissions.has(perm.id);
                                return (
                                  <td key={aksi.key} className="px-3 py-3 text-center">
                                    <label className="inline-flex items-center justify-center cursor-pointer">
                                      <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={() => togglePermission(perm.id)}
                                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/30"
                                      />
                                    </label>
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* TAMPILAN MOBILE: KARTU AKORDEON */}
              {isMobile && (
                <div className="divide-y divide-slate-100">
                  {modulTersaring.length === 0 ? (
                    <div className="px-4 py-10 text-center text-slate-500">
                      <p className="text-sm text-slate-600">Modul tidak ditemukan</p>
                    </div>
                  ) : (
                    modulTersaring.map(({ modul, aksiMap }) => {
                      const idsModul = Object.values(aksiMap).map((p) => p.id);
                      const semuaTerpilih = idsModul.every((id) => selectedPermissions.has(id));
                      const sebagianTerpilih = !semuaTerpilih && idsModul.some((id) => selectedPermissions.has(id));
                      const terbuka = modulTerbuka === modul;
                      const jumlahDipilihModul = idsModul.filter((id) => selectedPermissions.has(id)).length;
                      return (
                        <div key={modul} className="p-3.5">
                          <div className="flex items-center justify-between gap-3">
                            <button
                              onClick={() => toggleModulPenuh(aksiMap)}
                              className="flex items-center gap-2 text-sm text-slate-800 min-w-0"
                            >
                              <span
                                className={`inline-block w-4 h-4 rounded border flex-shrink-0 ${
                                  semuaTerpilih
                                    ? "bg-blue-600 border-blue-600"
                                    : sebagianTerpilih
                                    ? "bg-blue-100 border-blue-300"
                                    : "bg-white border-slate-300"
                                }`}
                              />
                              <span className="truncate">{modul}</span>
                            </button>
                            <button
                              onClick={() => setModulTerbuka(terbuka ? null : modul)}
                              className="text-xs text-slate-600 flex-shrink-0"
                            >
                              {jumlahDipilihModul}/{idsModul.length} {terbuka ? "▲" : "▼"}
                            </button>
                          </div>
                          {terbuka && (
                            <div className="grid grid-cols-2 gap-2 mt-3 pl-6">
                              {AKSI_LIST.map((aksi) => {
                                const perm = aksiMap[aksi.key];
                                if (!perm) return null;
                                const checked = selectedPermissions.has(perm.id);
                                return (
                                  <label
                                    key={aksi.key}
                                    className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                                      checked
                                        ? "bg-blue-50 border-blue-200 text-blue-800"
                                        : "bg-white border-slate-200 text-slate-700"
                                    }`}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={checked}
                                      onChange={() => togglePermission(perm.id)}
                                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/30"
                                    />
                                    {aksi.label}
                                  </label>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              <div className="px-4 sm:px-5 py-3 border-t border-slate-200/80 bg-slate-50/50">
                <p className="text-xs text-slate-600">
                  Centang kolom aksi untuk memberi izin, atau klik nama modul untuk memilih/melepas seluruh aksi pada modul tersebut sekaligus.
                </p>
              </div>
            </div>

            {/* AKSI BAWAH */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5">
              <button
                onClick={() => router.push("/super-admin/manajemenAkses")}
                className="px-4 py-2 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm"
              >
                Batal
              </button>
              <button
                onClick={handleSimpan}
                disabled={isSaving}
                className="px-5 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors shadow-sm hover:shadow"
              >
                {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}