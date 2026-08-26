"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import {
  Plus,
  Save,
  X,
  UserCheck,
  BookOpen,
  GraduationCap,
  ChevronDown,
  AlertCircle,
} from "lucide-react";

// =========================================================
// DUMMY DATA (sama dengan halaman daftar)
// =========================================================
const DEFAULT_DATA = {
  guru: [
    { id: 1, nama: "Dr. Ahmad Fauzi, M.Pd.", nip: "198501012010011001", email: "ahmad@sekolah.com", phone: "081234567890", mapel: "Matematika", status: "aktif" },
    { id: 2, nama: "Siti Rahma, S.Pd.", nip: "198712152011012002", email: "siti@sekolah.com", phone: "081234567891", mapel: "Bahasa Indonesia", status: "aktif" },
    { id: 3, nama: "Budi Santoso, S.Si.", nip: "199003202012013003", email: "budi@sekolah.com", phone: "081234567892", mapel: "Fisika", status: "nonaktif" },
    { id: 4, nama: "Dewi Lestari, S.Pd.", nip: "199105152013014004", email: "dewi@sekolah.com", phone: "081234567893", mapel: "Biologi", status: "aktif" },
    { id: 5, nama: "Eko Prasetyo, S.Kom.", nip: "198706102014015005", email: "eko@sekolah.com", phone: "081234567894", mapel: "Pemrograman Dasar", status: "aktif" },
    { id: 6, nama: "Rina Sari, S.Pd.", nip: "199202152015016006", email: "rina@sekolah.com", phone: "081234567895", mapel: "Bahasa Inggris", status: "aktif" },
  ],
  mapel: [
    { id: 1, nama: "Matematika", kode: "MATH" },
    { id: 2, nama: "Bahasa Indonesia", kode: "BIN" },
    { id: 3, nama: "Fisika", kode: "FIS" },
    { id: 4, nama: "Biologi", kode: "BIO" },
    { id: 5, nama: "Pemrograman Dasar", kode: "PROG" },
    { id: 6, nama: "Bahasa Inggris", kode: "BIG" },
    { id: 7, nama: "Kimia", kode: "KIM" },
    { id: 8, nama: "Sejarah", kode: "SEJ" },
    { id: 9, nama: "Geografi", kode: "GEO" },
    { id: 10, nama: "Ekonomi", kode: "EKO" },
  ],
  kelas: [
    { id: 1, nama: "X RPL 1", jenjang: "X" },
    { id: 2, nama: "X RPL 2", jenjang: "X" },
    { id: 3, nama: "X TKJ 1", jenjang: "X" },
    { id: 4, nama: "XI RPL 1", jenjang: "XI" },
    { id: 5, nama: "XI TKJ 1", jenjang: "XI" },
    { id: 6, nama: "XII RPL 1", jenjang: "XII" },
    { id: 7, nama: "XII RPL 2", jenjang: "XII" },
  ],
  assignments: [],
};

export default function TambahAssignPage() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [guru, setGuru] = useState([]);
  const [mapel, setMapel] = useState([]);
  const [kelas, setKelas] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    guru_id: "",
    mapel_id: "",
    kelas_id: "",
  });

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  // =========================================================
  // LOAD DATA DARI LOCALSTORAGE
  // =========================================================
  useEffect(() => {
    const loadData = () => {
      const stored = localStorage.getItem("guruMapelData");
      if (stored) {
        const data = JSON.parse(stored);
        setGuru(data.guru || DEFAULT_DATA.guru);
        setMapel(data.mapel || DEFAULT_DATA.mapel);
        setKelas(data.kelas || DEFAULT_DATA.kelas);
        setAssignments(data.assignments || DEFAULT_DATA.assignments);
      } else {
        setGuru(DEFAULT_DATA.guru);
        setMapel(DEFAULT_DATA.mapel);
        setKelas(DEFAULT_DATA.kelas);
        setAssignments([]);
      }
    };
    loadData();
  }, []);

  // =========================================================
  // HANDLERS
  // =========================================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.guru_id || !form.mapel_id || !form.kelas_id) {
      alert("Semua field wajib diisi!");
      return;
    }

    // Cek duplikat
    const exists = assignments.some(
      (a) =>
        a.guru_id === parseInt(form.guru_id) &&
        a.mapel_id === parseInt(form.mapel_id) &&
        a.kelas_id === parseInt(form.kelas_id)
    );
    if (exists) {
      alert("Guru ini sudah mengajar mapel tersebut di kelas ini!");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const newAssignment = {
        id: Date.now(),
        guru_id: parseInt(form.guru_id),
        mapel_id: parseInt(form.mapel_id),
        kelas_id: parseInt(form.kelas_id),
      };

      const updatedAssignments = [...assignments, newAssignment];
      setAssignments(updatedAssignments);

      // Update localStorage
      const stored = JSON.parse(localStorage.getItem("guruMapelData"));
      stored.assignments = updatedAssignments;
      localStorage.setItem("guruMapelData", JSON.stringify(stored));

      setLoading(false);
      alert("Assign berhasil ditambahkan!");
      router.push("/admin/guru-mapel");
    }, 500);
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar
        active="guru"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
      />

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header
          toggleSidebar={toggleSidebar}
          notifications={[]}
          user={{ name: "Admin Sekolah", email: "admin@smartschool.com", avatar: "AD" }}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="w-full p-4 md:p-6 lg:p-8">
            <div className="w-full max-w-3xl mx-auto space-y-5">
              {/* ===== HEADER ===== */}
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200 flex-shrink-0">
                  <Plus size={20} />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-slate-800">Tambah Assign Guru</h1>
                  <p className="text-sm text-slate-500">Assign guru ke mata pelajaran di kelas tertentu</p>
                </div>
              </div>

              {/* ===== FORM ===== */}
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-6">
                <div className="space-y-4">
                  {/* Pilih Guru */}
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">
                      Pilih Guru <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <UserCheck size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <select
                        name="guru_id"
                        value={form.guru_id}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition cursor-pointer text-slate-600 appearance-none"
                      >
                        <option value="">Pilih Guru</option>
                        {guru
                          .filter((g) => g.status === "aktif")
                          .map((g) => (
                            <option key={g.id} value={g.id}>
                              {g.nama} ({g.mapel})
                            </option>
                          ))}
                      </select>
                      <ChevronDown size={17} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Pilih Mapel */}
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">
                      Pilih Mata Pelajaran <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <BookOpen size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <select
                        name="mapel_id"
                        value={form.mapel_id}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition cursor-pointer text-slate-600 appearance-none"
                      >
                        <option value="">Pilih Mapel</option>
                        {mapel.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.nama} ({m.kode})
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={17} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Pilih Kelas */}
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">
                      Pilih Kelas <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <GraduationCap size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <select
                        name="kelas_id"
                        value={form.kelas_id}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition cursor-pointer text-slate-600 appearance-none"
                      >
                        <option value="">Pilih Kelas</option>
                        {kelas.map((k) => (
                          <option key={k.id} value={k.id}>
                            {k.nama}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={17} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Informasi */}
                  <div className="bg-blue-50/60 rounded-xl p-3 border border-blue-100">
                    <div className="flex items-start gap-2">
                      <AlertCircle size={16} className="text-blue-500 mt-0.5" />
                      <div>
                        <p className="text-xs text-blue-600 font-medium">Informasi</p>
                        <p className="text-[10px] text-blue-500">
                          Pastikan guru yang dipilih memiliki kompetensi di mapel tersebut.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tombol Aksi */}
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href="/admin/guru-mapel"
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors text-center"
                  >
                    Batal
                  </Link>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:shadow-blue-200 transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:hover:shadow-none"
                  >
                    {loading ? (
                      <>
                        <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        Menyimpan...
                      </>
                    ) : (
                      <>
                        <Save size={17} />
                        Simpan
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}