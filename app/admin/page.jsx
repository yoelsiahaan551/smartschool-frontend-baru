// "use client";

// import { useState, useEffect } from "react";
// import { format } from "date-fns";
// import {
//   Users,
//   BookOpen,
//   DollarSign,
//   Calendar,
//   TrendingUp,
//   TrendingDown,
//   UserCheck,
//   Clock,
//   MoreHorizontal,
//   Eye,
// } from "lucide-react";

// export default function AdminDashboardPage() {
//   const [currentTime, setCurrentTime] = useState(null);
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setCurrentTime(new Date());
//     setIsMounted(true);
//   }, []);

//   const formatDate = (date) => format(date, "EEEE, dd MMMM yyyy");
//   const formatTime = (date) => format(date, "HH:mm");

//   const stats = [
//     { title: "Total Siswa", value: "1,284", change: "+12%", trend: "up", icon: Users },
//     { title: "Total Guru", value: "64", change: "+4%", trend: "up", icon: UserCheck },
//     { title: "Pendapatan Bulan Ini", value: "Rp 284.5 Jt", change: "+8.2%", trend: "up", icon: DollarSign },
//     { title: "Rata-rata Kehadiran", value: "94.8%", change: "-2.1%", trend: "down", icon: Calendar },
//   ];

//   const recentActivities = [
//     { id: 1, user: "Ahmad Fauzi", action: "Mengupload nilai ujian", time: "10 menit yang lalu", icon: BookOpen },
//     { id: 2, user: "Siti Rahma", action: "Mendaftar siswa baru", time: "1 jam yang lalu", icon: Users },
//     { id: 3, user: "Budi Santoso", action: "Membayar SPP", time: "2 jam yang lalu", icon: DollarSign },
//     { id: 4, user: "Dewi Lestari", action: "Mengedit jadwal pelajaran", time: "3 jam yang lalu", icon: Calendar },
//   ];

//   const chartData = [
//     { day: "Sen", value: 45 },
//     { day: "Sel", value: 52 },
//     { day: "Rab", value: 48 },
//     { day: "Kam", value: 61 },
//     { day: "Jum", value: 55 },
//     { day: "Sab", value: 43 },
//     { day: "Min", value: 38 },
//   ];
//   const maxValue = Math.max(...chartData.map((d) => d.value));

//   return (
//     <>
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
//         <div>
//           <h1 className="text-xl md:text-2xl font-bold text-gray-800">
//             Selamat datang, Admin 👋
//           </h1>
//           <p className="text-sm text-gray-500 mt-0.5">
//             {isMounted && currentTime
//               ? `${formatDate(currentTime)} • ${formatTime(currentTime)} WIB`
//               : "Memuat waktu..."}
//           </p>
//         </div>
//         <div className="flex items-center gap-2">
//           <button className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 shadow-sm">
//             <Calendar size={16} /> Filter
//           </button>
//           <button className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700 shadow-sm">
//             <Eye size={16} /> Lihat Semua
//           </button>
//           <button className="sm:hidden p-2 rounded-lg bg-white border border-gray-200 text-gray-600 shadow-sm">
//             <Calendar size={18} />
//           </button>
//           <button className="sm:hidden p-2 rounded-lg bg-indigo-600 text-white shadow-sm">
//             <Eye size={18} />
//           </button>
//         </div>
//       </div>

//       {/* Statistik */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
//         {stats.map((stat, i) => (
//           <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
//             <div className="flex items-start justify-between">
//               <div>
//                 <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
//                 <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
//               </div>
//               <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
//                 <stat.icon size={20} />
//               </div>
//             </div>
//             <div className="flex items-center gap-1 mt-3">
//               {stat.trend === "up" ? (
//                 <TrendingUp size={14} className="text-green-500" />
//               ) : (
//                 <TrendingDown size={14} className="text-red-500" />
//               )}
//               <span className={`text-xs font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
//                 {stat.change}
//               </span>
//               <span className="text-xs text-gray-400 ml-1">dari bulan lalu</span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Grafik & Aktivitas */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-gray-800 font-semibold">Statistik Kehadiran Mingguan</h3>
//             <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">Lihat Detail</button>
//           </div>
//           <div className="flex items-end gap-2 sm:gap-3 h-44">
//             {chartData.map((item, idx) => (
//               <div key={idx} className="flex-1 flex flex-col items-center gap-2">
//                 <div
//                   className="w-full max-w-[36px] rounded-lg bg-gradient-to-t from-indigo-200 to-indigo-500 transition-all duration-500"
//                   style={{ height: `${(item.value / maxValue) * 100}%`, minHeight: "8px" }}
//                 />
//                 <span className="text-xs text-gray-500">{item.day}</span>
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-between mt-3 text-xs text-gray-400">
//             <span>0%</span> <span>50%</span> <span>100%</span>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-gray-800 font-semibold">Aktivitas Terbaru</h3>
//             <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">Lihat Semua</button>
//           </div>
//           <div className="space-y-4">
//             {recentActivities.map((activity) => (
//               <div key={activity.id} className="flex items-start gap-3">
//                 <div className="p-2 rounded-lg bg-gray-100 text-gray-600 flex-shrink-0">
//                   <activity.icon size={16} />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm text-gray-800 font-medium truncate">{activity.user}</p>
//                   <p className="text-xs text-gray-500 truncate">{activity.action}</p>
//                   <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
//                     <Clock size={12} /> {activity.time}
//                   </p>
//                 </div>
//                 <button className="text-gray-400 hover:text-gray-600">
//                   <MoreHorizontal size={16} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Tabel Siswa */}
//       <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-5 overflow-hidden">
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
//           <h3 className="text-gray-800 font-semibold">Siswa Terbaru</h3>
//           <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">Lihat Semua</button>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="border-b border-gray-200 text-gray-500">
//                 <th className="text-left py-3 px-3 font-medium">Nama</th>
//                 <th className="text-left py-3 px-3 font-medium">Kelas</th>
//                 <th className="text-left py-3 px-3 font-medium">NIS</th>
//                 <th className="text-left py-3 px-3 font-medium">Status</th>
//                 <th className="text-left py-3 px-3 font-medium">Aksi</th>
//               </tr>
//             </thead>
//             <tbody>
//               {[
//                 { name: "Andi Pratama", kelas: "XII RPL 1", nis: "2023001", status: "Aktif" },
//                 { name: "Bunga Melati", kelas: "XI TKJ 2", nis: "2023002", status: "Aktif" },
//                 { name: "Citra Dewi", kelas: "X MM 3", nis: "2023003", status: "Cuti" },
//                 { name: "Dicky Permana", kelas: "XII RPL 2", nis: "2023004", status: "Aktif" },
//               ].map((siswa, idx) => (
//                 <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
//                   <td className="py-3 px-3 text-gray-800">{siswa.name}</td>
//                   <td className="py-3 px-3 text-gray-600">{siswa.kelas}</td>
//                   <td className="py-3 px-3 text-gray-500">{siswa.nis}</td>
//                   <td className="py-3 px-3">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-medium ${
//                         siswa.status === "Aktif" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
//                       }`}
//                     >
//                       {siswa.status}
//                     </span>
//                   </td>
//                   <td className="py-3 px-3">
//                     <button className="text-indigo-600 hover:text-indigo-800 text-xs font-medium">Detail</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }