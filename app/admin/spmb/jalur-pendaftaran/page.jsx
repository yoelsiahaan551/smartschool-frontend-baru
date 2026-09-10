// "use client";

// import { useEffect, useMemo, useState } from "react";
// import {
//   Plus,
//   Search,
//   Pencil,
//   Trash2,
//   X,
//   Save,
//   CalendarDays,
//   Users,
//   Route,
//   CheckCircle2,
//   XCircle,
//   Loader2,
//   RefreshCw,
//   AlertCircle,
//   FileText,
// } from "lucide-react";

// import Header from "../../../components/Header";
// import Sidebar from "../../../components/Sidebar";

// import {
//   getJalurPpdb,
//   createJalurPpdb,
//   updateJalurPpdb,
//   deleteJalurPpdb,
// } from "../../../../services/jalurPpdb.service";

// const EMPTY_FORM = {
//   nama: "",
//   deskripsi: "",
//   kuota: "",
//   tanggalMulai: "",
//   tanggalSelesai: "",
//   status: "aktif",
// };

// function formatTanggal(value) {
//   if (!value) return "-";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) {
//     return "-";
//   }

//   return date.toLocaleDateString("id-ID", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// }

// function getStatusInfo(status) {
//   const normalized = String(status || "").toLowerCase();

//   if (normalized === "aktif") {
//     return {
//       label: "Aktif",
//       className:
//         "border-emerald-200 bg-emerald-50 text-emerald-700",
//       icon: CheckCircle2,
//     };
//   }

//   return {
//     label: "Nonaktif",
//     className:
//       "border-slate-200 bg-slate-100 text-slate-600",
//     icon: XCircle,
//   };
// }

// export default function JalurPendaftaranPage() {
//   const [collapsed, setCollapsed] = useState(false);

//   const [data, setData] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] =
//     useState("semua");

//   const [showModal, setShowModal] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   const [form, setForm] = useState(EMPTY_FORM);

//   const [saving, setSaving] = useState(false);
//   const [deletingId, setDeletingId] = useState(null);

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // =========================================================
//   // LOAD DATA
//   // =========================================================

//   async function loadData(isRefresh = false) {
//     try {
//       setError("");

//       if (isRefresh) {
//         setRefreshing(true);
//       } else {
//         setLoading(true);
//       }

//       const result = await getJalurPpdb();

//       setData(Array.isArray(result) ? result : []);
//     } catch (err) {
//       console.error("GET JALUR PPDB ERROR:", err);

//       setError(
//         err?.message ||
//           "Gagal mengambil data jalur pendaftaran."
//       );
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }

//   useEffect(() => {
//     loadData();
//   }, []);

//   // =========================================================
//   // MODAL
//   // =========================================================

//   function openAddModal() {
//     setEditingId(null);
//     setForm(EMPTY_FORM);
//     setError("");
//     setSuccess("");
//     setShowModal(true);
//   }

//   function openEditModal(item) {
//     setEditingId(item.id);

//     setForm({
//       nama: item.nama || "",
//       deskripsi: item.deskripsi || "",
//       kuota:
//         item.kuota !== undefined &&
//         item.kuota !== null
//           ? String(item.kuota)
//           : "",
//       tanggalMulai: item.tanggalMulai
//         ? String(item.tanggalMulai).slice(0, 10)
//         : "",
//       tanggalSelesai: item.tanggalSelesai
//         ? String(item.tanggalSelesai).slice(0, 10)
//         : "",
//       status: item.status || "aktif",
//     });

//     setError("");
//     setSuccess("");
//     setShowModal(true);
//   }

//   function closeModal() {
//     if (saving) return;

//     setShowModal(false);
//     setEditingId(null);
//     setForm(EMPTY_FORM);
//     setError("");
//   }

//   function handleChange(event) {
//     const { name, value } = event.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   // =========================================================
//   // SUBMIT
//   // =========================================================

//   async function handleSubmit(event) {
//     event.preventDefault();

//     setError("");
//     setSuccess("");

//     // VALIDASI NAMA
//     if (!form.nama.trim()) {
//       setError("Nama jalur wajib diisi.");
//       return;
//     }

//     // VALIDASI KUOTA
//     if (!form.kuota) {
//       setError("Kuota wajib diisi.");
//       return;
//     }

//     if (Number(form.kuota) <= 0) {
//       setError("Kuota harus lebih dari 0.");
//       return;
//     }

//     // VALIDASI TANGGAL
//     if (!form.tanggalMulai) {
//       setError("Tanggal mulai wajib diisi.");
//       return;
//     }

//     if (!form.tanggalSelesai) {
//       setError("Tanggal selesai wajib diisi.");
//       return;
//     }

//     if (
//       new Date(form.tanggalSelesai) <
//       new Date(form.tanggalMulai)
//     ) {
//       setError(
//         "Tanggal selesai tidak boleh lebih awal dari tanggal mulai."
//       );
//       return;
//     }

//     const payload = {
//       nama: form.nama.trim(),
//       deskripsi: form.deskripsi.trim(),
//       kuota: Number(form.kuota),
//       tanggalMulai: form.tanggalMulai,
//       tanggalSelesai: form.tanggalSelesai,
//       status: form.status,
//     };

//     try {
//       setSaving(true);

//       if (editingId) {
//         await updateJalurPpdb(
//           editingId,
//           payload
//         );

//         setSuccess(
//           "Jalur pendaftaran berhasil diperbarui."
//         );
//       } else {
//         await createJalurPpdb(payload);

//         setSuccess(
//           "Jalur pendaftaran berhasil ditambahkan."
//         );
//       }

//       setShowModal(false);
//       setEditingId(null);
//       setForm(EMPTY_FORM);

//       await loadData();

//       setTimeout(() => {
//         setSuccess("");
//       }, 3000);
//     } catch (err) {
//       console.error("SAVE JALUR PPDB ERROR:", err);

//       setError(
//         err?.message ||
//           "Gagal menyimpan jalur pendaftaran."
//       );
//     } finally {
//       setSaving(false);
//     }
//   }

//   // =========================================================
//   // DELETE
//   // =========================================================

//   async function handleDelete(item) {
//     const confirmed = window.confirm(
//       `Yakin ingin menghapus jalur "${item.nama}"?\n\nData akan dinonaktifkan dari daftar jalur PPDB.`
//     );

//     if (!confirmed) return;

//     try {
//       setDeletingId(item.id);
//       setError("");
//       setSuccess("");

//       await deleteJalurPpdb(item.id);

//       setSuccess(
//         `Jalur "${item.nama}" berhasil dihapus.`
//       );

//       await loadData();

//       setTimeout(() => {
//         setSuccess("");
//       }, 3000);
//     } catch (err) {
//       console.error("DELETE JALUR PPDB ERROR:", err);

//       setError(
//         err?.message ||
//           "Gagal menghapus jalur pendaftaran."
//       );
//     } finally {
//       setDeletingId(null);
//     }
//   }

//   // =========================================================
//   // FILTER
//   // =========================================================

//   const filteredData = useMemo(() => {
//     const keyword = search
//       .trim()
//       .toLowerCase();

//     return data.filter((item) => {
//       const matchesSearch =
//         !keyword ||
//         item.nama
//           ?.toLowerCase()
//           .includes(keyword) ||
//         item.deskripsi
//           ?.toLowerCase()
//           .includes(keyword);

//       const matchesStatus =
//         statusFilter === "semua" ||
//         String(item.status || "").toLowerCase() ===
//           statusFilter;

//       return matchesSearch && matchesStatus;
//     });
//   }, [data, search, statusFilter]);

//   // =========================================================
//   // STATISTICS
//   // =========================================================

//   const totalJalur = data.length;

//   const totalKuota = data.reduce(
//     (total, item) =>
//       total + Number(item.kuota || 0),
//     0
//   );

//   const jalurAktif = data.filter(
//     (item) =>
//       String(item.status || "").toLowerCase() ===
//       "aktif"
//   ).length;

//   const jalurNonaktif = data.filter(
//     (item) =>
//       String(item.status || "").toLowerCase() ===
//       "nonaktif"
//   ).length;

//   // =========================================================
//   // RENDER
//   // =========================================================

//   return (
//     <div className="min-h-screen bg-[#F8FAFC]">
//       {/* SIDEBAR */}

//       <Sidebar
//         active="spmb"
//         setActive={() => {}}
//         collapsed={collapsed}
//         setCollapsed={setCollapsed}
//         role="admin"
//       />

//       {/* MAIN */}

//       <div
//         className={`min-h-screen transition-all duration-300 ${
//           collapsed ? "ml-20" : "ml-72"
//         }`}
//       >
//         {/* HEADER */}

//         <Header
//           toggleSidebar={() =>
//             setCollapsed((value) => !value)
//           }
//           notifications={[]}
//           user={{
//             name: "Admin Sekolah",
//             email: "admin@smartschool.com",
//             avatar: "AS",
//           }}
//         />

//         <main className="p-4 md:p-6 lg:p-8">
//           <div className="mx-auto max-w-[1600px]">
//             {/* PAGE HEADER */}

//             <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//               <div>
//                 <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
//                   <span>SPMB</span>
//                   <span>/</span>
//                   <span className="font-medium text-blue-600">
//                     Jalur Pendaftaran
//                   </span>
//                 </div>

//                 <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
//                   Jalur Pendaftaran
//                 </h1>

//                 <p className="mt-1 text-sm text-slate-500 md:text-base">
//                   Kelola jalur pendaftaran SPMB
//                   sekolah.
//                 </p>
//               </div>

//               <div className="flex items-center gap-3">
//                 {/* REFRESH */}

//                 <button
//                   type="button"
//                   onClick={() => loadData(true)}
//                   disabled={refreshing}
//                   className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
//                 >
//                   <RefreshCw
//                     size={18}
//                     className={
//                       refreshing
//                         ? "animate-spin"
//                         : ""
//                     }
//                   />

//                   Refresh
//                 </button>

//                 {/* ADD */}

//                 <button
//                   type="button"
//                   onClick={openAddModal}
//                   className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
//                 >
//                   <Plus size={19} />

//                   Tambah Jalur
//                 </button>
//               </div>
//             </div>

//             {/* SUCCESS */}

//             {success && (
//               <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
//                 <CheckCircle2 size={19} />

//                 <span>{success}</span>
//               </div>
//             )}

//             {/* ERROR */}

//             {error && !showModal && (
//               <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//                 <AlertCircle
//                   size={19}
//                   className="mt-0.5 shrink-0"
//                 />

//                 <div>
//                   <p className="font-semibold">
//                     Terjadi kesalahan
//                   </p>

//                   <p className="mt-0.5">
//                     {error}
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* STAT CARD */}

//             <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//               <StatCard
//                 title="Total Jalur"
//                 value={totalJalur}
//                 icon={Route}
//                 description="Jalur tersedia"
//               />

//               <StatCard
//                 title="Total Kuota"
//                 value={totalKuota}
//                 icon={Users}
//                 description="Daya tampung"
//               />

//               <StatCard
//                 title="Jalur Aktif"
//                 value={jalurAktif}
//                 icon={CheckCircle2}
//                 description="Sedang digunakan"
//               />

//               <StatCard
//                 title="Jalur Nonaktif"
//                 value={jalurNonaktif}
//                 icon={XCircle}
//                 description="Tidak digunakan"
//               />
//             </div>

//             {/* TABLE CARD */}

//             <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
//               {/* FILTER */}

//               <div className="border-b border-slate-200 p-4 md:p-5">
//                 <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
//                   {/* SEARCH */}

//                   <div className="relative w-full lg:max-w-md">
//                     <Search
//                       size={19}
//                       className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
//                     />

//                     <input
//                       type="text"
//                       value={search}
//                       onChange={(event) =>
//                         setSearch(
//                           event.target.value
//                         )
//                       }
//                       placeholder="Cari nama jalur..."
//                       className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
//                     />
//                   </div>

//                   {/* FILTER STATUS */}

//                   <div className="flex items-center gap-3">
//                     <select
//                       value={statusFilter}
//                       onChange={(event) =>
//                         setStatusFilter(
//                           event.target.value
//                         )
//                       }
//                       className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                     >
//                       <option value="semua">
//                         Semua Status
//                       </option>

//                       <option value="aktif">
//                         Aktif
//                       </option>

//                       <option value="nonaktif">
//                         Nonaktif
//                       </option>
//                     </select>

//                     <div className="hidden rounded-xl bg-slate-50 px-4 py-2.5 text-sm text-slate-500 sm:block">
//                       Menampilkan{" "}
//                       <span className="font-semibold text-slate-800">
//                         {filteredData.length}
//                       </span>{" "}
//                       jalur
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* LOADING */}

//               {loading ? (
//                 <div className="flex min-h-[360px] items-center justify-center">
//                   <div className="flex flex-col items-center gap-3 text-slate-500">
//                     <Loader2
//                       size={32}
//                       className="animate-spin text-blue-600"
//                     />

//                     <p className="text-sm">
//                       Memuat data jalur
//                       pendaftaran...
//                     </p>
//                   </div>
//                 </div>
//               ) : filteredData.length === 0 ? (
//                 /* EMPTY */

//                 <div className="flex min-h-[360px] flex-col items-center justify-center px-6 text-center">
//                   <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
//                     <Route size={30} />
//                   </div>

//                   <h3 className="text-lg font-bold text-slate-900">
//                     {data.length === 0
//                       ? "Belum ada jalur pendaftaran"
//                       : "Data tidak ditemukan"}
//                   </h3>

//                   <p className="mt-1 max-w-md text-sm leading-6 text-slate-500">
//                     {data.length === 0
//                       ? "Tambahkan jalur pendaftaran pertama untuk mulai mengatur proses SPMB sekolah."
//                       : "Coba ubah kata kunci pencarian atau filter status."}
//                   </p>

//                   {data.length === 0 && (
//                     <button
//                       type="button"
//                       onClick={openAddModal}
//                       className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
//                     >
//                       <Plus size={18} />

//                       Tambah Jalur
//                     </button>
//                   )}
//                 </div>
//               ) : (
//                 /* TABLE */

//                 <div className="overflow-x-auto">
//                   <table className="w-full min-w-[950px]">
//                     <thead>
//                       <tr className="border-b border-slate-200 bg-slate-50/70">
//                         <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                           Jalur Pendaftaran
//                         </th>

//                         <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                           Kuota
//                         </th>

//                         <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                           Periode
//                         </th>

//                         <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                           Status
//                         </th>

//                         <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
//                           Aksi
//                         </th>
//                       </tr>
//                     </thead>

//                     <tbody className="divide-y divide-slate-100">
//                       {filteredData.map(
//                         (item) => {
//                           const statusInfo =
//                             getStatusInfo(
//                               item.status
//                             );

//                           const StatusIcon =
//                             statusInfo.icon;

//                           return (
//                             <tr
//                               key={item.id}
//                               className="transition hover:bg-slate-50/70"
//                             >
//                               {/* JALUR */}

//                               <td className="px-5 py-5">
//                                 <div className="flex items-start gap-3">
//                                   <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
//                                     <Route
//                                       size={21}
//                                     />
//                                   </div>

//                                   <div className="min-w-0">
//                                     <p className="font-bold text-slate-900">
//                                       {item.nama}
//                                     </p>

//                                     <div className="mt-1 flex max-w-[420px] items-start gap-1.5 text-sm text-slate-500">
//                                       <FileText
//                                         size={15}
//                                         className="mt-0.5 shrink-0"
//                                       />

//                                       <p className="line-clamp-2">
//                                         {item.deskripsi ||
//                                           "Tidak ada deskripsi."}
//                                       </p>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </td>

//                               {/* KUOTA */}

//                               <td className="px-5 py-5">
//                                 <div className="flex items-center gap-2">
//                                   <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
//                                     <Users
//                                       size={17}
//                                     />
//                                   </div>

//                                   <div>
//                                     <p className="font-bold text-slate-900">
//                                       {Number(
//                                         item.kuota ||
//                                           0
//                                       ).toLocaleString(
//                                         "id-ID"
//                                       )}
//                                     </p>

//                                     <p className="text-xs text-slate-400">
//                                       siswa
//                                     </p>
//                                   </div>
//                                 </div>
//                               </td>

//                               {/* PERIODE */}

//                               <td className="px-5 py-5">
//                                 <div className="flex items-start gap-2">
//                                   <CalendarDays
//                                     size={18}
//                                     className="mt-0.5 shrink-0 text-slate-400"
//                                   />

//                                   <div className="text-sm">
//                                     <p className="font-medium text-slate-700">
//                                       {formatTanggal(
//                                         item.tanggalMulai
//                                       )}
//                                     </p>

//                                     <p className="mt-0.5 text-xs text-slate-400">
//                                       sampai{" "}
//                                       {formatTanggal(
//                                         item.tanggalSelesai
//                                       )}
//                                     </p>
//                                   </div>
//                                 </div>
//                               </td>

//                               {/* STATUS */}

//                               <td className="px-5 py-5">
//                                 <span
//                                   className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${statusInfo.className}`}
//                                 >
//                                   <StatusIcon
//                                     size={14}
//                                   />

//                                   {
//                                     statusInfo.label
//                                   }
//                                 </span>
//                               </td>

//                               {/* ACTION */}

//                               <td className="px-5 py-5">
//                                 <div className="flex justify-end gap-2">
//                                   <button
//                                     type="button"
//                                     onClick={() =>
//                                       openEditModal(
//                                         item
//                                       )
//                                     }
//                                     className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
//                                   >
//                                     <Pencil
//                                       size={15}
//                                     />

//                                     Edit
//                                   </button>

//                                   <button
//                                     type="button"
//                                     onClick={() =>
//                                       handleDelete(
//                                         item
//                                       )
//                                     }
//                                     disabled={
//                                       deletingId ===
//                                       item.id
//                                     }
//                                     className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
//                                   >
//                                     {deletingId ===
//                                     item.id ? (
//                                       <Loader2
//                                         size={15}
//                                         className="animate-spin"
//                                       />
//                                     ) : (
//                                       <Trash2
//                                         size={15}
//                                       />
//                                     )}

//                                     Hapus
//                                   </button>
//                                 </div>
//                               </td>
//                             </tr>
//                           );
//                         }
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           </div>
//         </main>
//       </div>

//       {/* =====================================================
//           MODAL TAMBAH / EDIT
//       ====================================================== */}

//       {showModal && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
//           <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
//             {/* MODAL HEADER */}

//             <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
//               <div>
//                 <h2 className="text-xl font-bold text-slate-900">
//                   {editingId
//                     ? "Edit Jalur Pendaftaran"
//                     : "Tambah Jalur Pendaftaran"}
//                 </h2>

//                 <p className="mt-1 text-sm text-slate-500">
//                   {editingId
//                     ? "Perbarui informasi jalur pendaftaran."
//                     : "Tambahkan jalur baru untuk proses SPMB."}
//                 </p>
//               </div>

//               <button
//                 type="button"
//                 onClick={closeModal}
//                 disabled={saving}
//                 className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
//               >
//                 <X size={21} />
//               </button>
//             </div>

//             {/* FORM */}

//             <form
//               onSubmit={handleSubmit}
//               className="space-y-5 p-6"
//             >
//               {/* ERROR MODAL */}

//               {error && (
//                 <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//                   <AlertCircle
//                     size={18}
//                     className="mt-0.5 shrink-0"
//                   />

//                   <div>
//                     <p className="font-semibold">
//                       Data belum bisa disimpan
//                     </p>

//                     <p className="mt-0.5">
//                       {error}
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {/* NAMA */}

//               <div>
//                 <label className="mb-2 block text-sm font-semibold text-slate-700">
//                   Nama Jalur
//                   <span className="ml-1 text-red-500">
//                     *
//                   </span>
//                 </label>

//                 <input
//                   type="text"
//                   name="nama"
//                   value={form.nama}
//                   onChange={handleChange}
//                   placeholder="Contoh: Jalur Prestasi"
//                   disabled={saving}
//                   className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                 />
//               </div>

//               {/* DESKRIPSI */}

//               <div>
//                 <label className="mb-2 block text-sm font-semibold text-slate-700">
//                   Deskripsi
//                 </label>

//                 <textarea
//                   name="deskripsi"
//                   value={form.deskripsi}
//                   onChange={handleChange}
//                   rows={4}
//                   placeholder="Jelaskan ketentuan atau informasi mengenai jalur ini..."
//                   disabled={saving}
//                   className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                 />
//               </div>

//               {/* KUOTA + STATUS */}

//               <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
//                 <div>
//                   <label className="mb-2 block text-sm font-semibold text-slate-700">
//                     Kuota Siswa
//                     <span className="ml-1 text-red-500">
//                       *
//                     </span>
//                   </label>

//                   <div className="relative">
//                     <Users
//                       size={18}
//                       className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
//                     />

//                     <input
//                       type="number"
//                       name="kuota"
//                       value={form.kuota}
//                       onChange={handleChange}
//                       min="1"
//                       placeholder="Contoh: 100"
//                       disabled={saving}
//                       className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="mb-2 block text-sm font-semibold text-slate-700">
//                     Status
//                     <span className="ml-1 text-red-500">
//                       *
//                     </span>
//                   </label>

//                   <select
//                     name="status"
//                     value={form.status}
//                     onChange={handleChange}
//                     disabled={saving}
//                     className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                   >
//                     <option value="aktif">
//                       Aktif
//                     </option>

//                     <option value="nonaktif">
//                       Nonaktif
//                     </option>
//                   </select>
//                 </div>
//               </div>

//               {/* TANGGAL */}

//               <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
//                 <div>
//                   <label className="mb-2 block text-sm font-semibold text-slate-700">
//                     Tanggal Mulai
//                     <span className="ml-1 text-red-500">
//                       *
//                     </span>
//                   </label>

//                   <div className="relative">
//                     <CalendarDays
//                       size={18}
//                       className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
//                     />

//                     <input
//                       type="date"
//                       name="tanggalMulai"
//                       value={form.tanggalMulai}
//                       onChange={handleChange}
//                       disabled={saving}
//                       className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="mb-2 block text-sm font-semibold text-slate-700">
//                     Tanggal Selesai
//                     <span className="ml-1 text-red-500">
//                       *
//                     </span>
//                   </label>

//                   <div className="relative">
//                     <CalendarDays
//                       size={18}
//                       className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
//                     />

//                     <input
//                       type="date"
//                       name="tanggalSelesai"
//                       value={form.tanggalSelesai}
//                       onChange={handleChange}
//                       disabled={saving}
//                       className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* FOOTER */}

//               <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   disabled={saving}
//                   className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
//                 >
//                   Batal
//                 </button>

//                 <button
//                   type="submit"
//                   disabled={saving}
//                   className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
//                 >
//                   {saving ? (
//                     <>
//                       <Loader2
//                         size={18}
//                         className="animate-spin"
//                       />

//                       Menyimpan...
//                     </>
//                   ) : (
//                     <>
//                       <Save size={18} />

//                       {editingId
//                         ? "Simpan Perubahan"
//                         : "Simpan Jalur"}
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // =========================================================
// // STAT CARD
// // =========================================================

// function StatCard({
//   title,
//   value,
//   icon: Icon,
//   description,
// }) {
//   return (
//     <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//       <div className="flex items-start justify-between">
//         <div>
//           <p className="text-sm font-medium text-slate-500">
//             {title}
//           </p>

//           <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
//             {Number(
//               value || 0
//             ).toLocaleString("id-ID")}
//           </p>

//           <p className="mt-1 text-xs text-slate-400">
//             {description}
//           </p>
//         </div>

//         <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
//           <Icon size={21} />
//         </div>
//       </div>
//     </div>
//   );
// }