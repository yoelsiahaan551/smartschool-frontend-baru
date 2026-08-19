// app/cmsAdmin/components/BannerTable.jsx

"use client";

import Link from "next/link";
import { useState } from "react";
import { Pencil, Trash2, Eye, Image, Calendar, LayoutPanelTop, Check, X as XIcon } from "lucide-react";

const BannerTable = ({ banners: initialBanners }) => {
  const [banners, setBanners] = useState(initialBanners);

  const handleDelete = (id) => {
    if (!confirm("Yakin ingin menghapus banner ini?")) return;
    setBanners(banners.filter((banner) => banner.id !== id));
  };

  if (banners.length === 0) {
    return (
      <div className="text-center py-[clamp(2rem,8vh,5rem)] bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="w-[clamp(3rem,8vw,4.5rem)] h-[clamp(3rem,8vw,4.5rem)] bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-[clamp(0.5rem,1vh,1rem)]">
          <LayoutPanelTop className="w-[clamp(1.25rem,3vw,2rem)] h-[clamp(1.25rem,3vw,2rem)] text-gray-400" />
        </div>
        <h3 className="text-[clamp(0.875rem,1.5vw,1.125rem)] font-medium text-gray-600">Belum ada banner</h3>
        <p className="text-[clamp(0.7rem,1vw,0.875rem)] text-gray-400 mt-1">Tambahkan banner pertama Anda</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden w-full">
      {/* TABLE - Desktop & Tablet */}
      <div className="hidden sm:block overflow-x-auto w-full">
        <table className="w-full table-fixed min-w-[560px]">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/80">
              <th className="px-[clamp(0.5rem,1vw,1.25rem)] py-[clamp(0.375rem,0.6vw,0.75rem)] text-left w-[clamp(18%,20%,25%)]">
                <span className="text-[clamp(0.5rem,0.65vw,0.75rem)] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">Gambar</span>
              </th>
              <th className="px-[clamp(0.5rem,1vw,1.25rem)] py-[clamp(0.375rem,0.6vw,0.75rem)] text-left w-[clamp(20%,25%,30%)]">
                <span className="text-[clamp(0.5rem,0.65vw,0.75rem)] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">Judul</span>
              </th>
              <th className="px-[clamp(0.5rem,1vw,1.25rem)] py-[clamp(0.375rem,0.6vw,0.75rem)] text-left hidden md:table-cell w-[clamp(10%,12%,15%)]">
                <span className="text-[clamp(0.5rem,0.65vw,0.75rem)] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">Posisi</span>
              </th>
              <th className="px-[clamp(0.5rem,1vw,1.25rem)] py-[clamp(0.375rem,0.6vw,0.75rem)] text-left hidden lg:table-cell w-[clamp(10%,12%,15%)]">
                <span className="text-[clamp(0.5rem,0.65vw,0.75rem)] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">Status</span>
              </th>
              <th className="px-[clamp(0.5rem,1vw,1.25rem)] py-[clamp(0.375rem,0.6vw,0.75rem)] text-left hidden xl:table-cell w-[clamp(8%,10%,12%)]">
                <span className="text-[clamp(0.5rem,0.65vw,0.75rem)] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">Urutan</span>
              </th>
              <th className="px-[clamp(0.5rem,1vw,1.25rem)] py-[clamp(0.375rem,0.6vw,0.75rem)] text-right w-[clamp(15%,18%,22%)]">
                <span className="text-[clamp(0.5rem,0.65vw,0.75rem)] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">Aksi</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {banners.map((banner) => (
              <tr
                key={banner.id}
                className="group transition-all duration-200 hover:bg-blue-50/40"
              >
                {/* Gambar */}
                <td className="px-[clamp(0.5rem,1vw,1.25rem)] py-[clamp(0.375rem,0.6vw,0.875rem)]">
                  <div className="flex items-center gap-[clamp(0.375rem,0.6vw,0.75rem)]">
                    <div className="flex-shrink-0 w-[clamp(3rem,4vw,5rem)] h-[clamp(2rem,2.5vw,3rem)] rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                      <img
                        src={banner.image}
                        alt={banner.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </td>

                {/* Judul */}
                <td className="px-[clamp(0.5rem,1vw,1.25rem)] py-[clamp(0.375rem,0.6vw,0.875rem)]">
                  <div className="min-w-0">
                    <p className="text-[clamp(0.75rem,1vw,1rem)] font-medium text-gray-800 truncate">
                      {banner.title}
                    </p>
                    <div className="flex items-center gap-[clamp(0.25rem,0.3vw,0.5rem)] mt-[0.125rem] md:hidden flex-wrap">
                      <span className="text-[clamp(0.45rem,0.5vw,0.6rem)] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
                        {banner.position}
                      </span>
                      <span className={`inline-flex items-center gap-1 text-[clamp(0.45rem,0.5vw,0.6rem)] font-medium px-1.5 py-0.5 rounded-full ${
                        banner.status === "active"
                          ? "bg-green-50 text-green-600"
                          : "bg-gray-50 text-gray-500"
                      }`}>
                        <span className={`w-1 h-1 rounded-full ${
                          banner.status === "active" ? "bg-green-500" : "bg-gray-400"
                        }`} />
                        {banner.status === "active" ? "Active" : "Draft"}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Posisi - Desktop */}
                <td className="px-[clamp(0.5rem,1vw,1.25rem)] py-[clamp(0.375rem,0.6vw,0.875rem)] hidden md:table-cell">
                  <span className="inline-flex items-center gap-1 text-[clamp(0.5rem,0.6vw,0.75rem)] text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full capitalize">
                    <LayoutPanelTop className="w-[clamp(0.5rem,0.6vw,0.75rem)] h-[clamp(0.5rem,0.6vw,0.75rem)]" />
                    {banner.position}
                  </span>
                </td>

                {/* Status - Desktop */}
                <td className="px-[clamp(0.5rem,1vw,1.25rem)] py-[clamp(0.375rem,0.6vw,0.875rem)] hidden lg:table-cell">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[clamp(0.5rem,0.6vw,0.75rem)] font-medium ${
                    banner.status === "active"
                      ? "bg-green-50 text-green-700"
                      : "bg-gray-50 text-gray-500"
                  }`}>
                    {banner.status === "active" ? (
                      <Check className="w-[clamp(0.5rem,0.6vw,0.75rem)] h-[clamp(0.5rem,0.6vw,0.75rem)]" />
                    ) : (
                      <XIcon className="w-[clamp(0.5rem,0.6vw,0.75rem)] h-[clamp(0.5rem,0.6vw,0.75rem)]" />
                    )}
                    {banner.status === "active" ? "Active" : "Draft"}
                  </span>
                </td>

                {/* Urutan - Desktop */}
                <td className="px-[clamp(0.5rem,1vw,1.25rem)] py-[clamp(0.375rem,0.6vw,0.875rem)] hidden xl:table-cell">
                  <span className="text-[clamp(0.5rem,0.6vw,0.75rem)] font-medium text-gray-600">
                    #{banner.order}
                  </span>
                </td>

                {/* Aksi */}
                <td className="px-[clamp(0.5rem,1vw,1.25rem)] py-[clamp(0.375rem,0.6vw,0.875rem)] text-right">
                  <div className="flex items-center justify-end gap-[clamp(0.0625rem,0.15vw,0.25rem)]">
                    <Link
                      href={`/cmsAdmin/banners/${banner.id}/preview`}
                      target="_blank"
                      className="p-[clamp(0.25rem,0.3vw,0.5rem)] rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
                      title="Preview"
                    >
                      <Eye className="w-[clamp(0.75rem,0.9vw,1rem)] h-[clamp(0.75rem,0.9vw,1rem)]" />
                    </Link>
                    <Link
                      href={`/cmsAdmin/banners/${banner.id}/edit`}
                      className="p-[clamp(0.25rem,0.3vw,0.5rem)] rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                      title="Edit"
                    >
                      <Pencil className="w-[clamp(0.75rem,0.9vw,1rem)] h-[clamp(0.75rem,0.9vw,1rem)]" />
                    </Link>
                    <button
                      onClick={() => handleDelete(banner.id)}
                      className="p-[clamp(0.25rem,0.3vw,0.5rem)] rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                      title="Hapus"
                    >
                      <Trash2 className="w-[clamp(0.75rem,0.9vw,1rem)] h-[clamp(0.75rem,0.9vw,1rem)]" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE - Card View */}
      <div className="sm:hidden divide-y divide-gray-100">
        {banners.map((banner) => (
          <div key={banner.id} className="px-[clamp(0.625rem,2vw,1.25rem)] py-[clamp(0.625rem,1.2vw,1.25rem)] hover:bg-blue-50/40 transition-colors">
            <div className="flex items-start gap-[clamp(0.375rem,1vw,0.75rem)]">
              <div className="flex-shrink-0 w-[clamp(3.5rem,8vw,4.5rem)] h-[clamp(2.5rem,5vw,3.5rem)] rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[clamp(0.7rem,1.2vw,1rem)] font-medium text-gray-800 truncate">{banner.title}</p>
                <div className="flex flex-wrap items-center gap-1 mt-0.5">
                  <span className="text-[clamp(0.4rem,0.7vw,0.65rem)] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full capitalize">
                    {banner.position}
                  </span>
                  <span className={`inline-flex items-center gap-1 text-[clamp(0.4rem,0.7vw,0.65rem)] font-medium px-1.5 py-0.5 rounded-full ${
                    banner.status === "active"
                      ? "bg-green-50 text-green-600"
                      : "bg-gray-50 text-gray-500"
                  }`}>
                    <span className={`w-1 h-1 rounded-full ${
                      banner.status === "active" ? "bg-green-500" : "bg-gray-400"
                    }`} />
                    {banner.status === "active" ? "Active" : "Draft"}
                  </span>
                  <span className="text-[clamp(0.4rem,0.7vw,0.65rem)] text-gray-400">#{banner.order}</span>
                </div>
              </div>
              <div className="flex items-center gap-[0.0625rem] ml-1 flex-shrink-0">
                <Link href={`/cmsAdmin/banners/${banner.id}/edit`} className="p-1.5 text-gray-400 hover:text-blue-600">
                  <Pencil className="w-[clamp(0.65rem,0.9vw,0.9rem)] h-[clamp(0.65rem,0.9vw,0.9rem)]" />
                </Link>
                <button onClick={() => handleDelete(banner.id)} className="p-1.5 text-gray-400 hover:text-red-600">
                  <Trash2 className="w-[clamp(0.65rem,0.9vw,0.9rem)] h-[clamp(0.65rem,0.9vw,0.9rem)]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="px-[clamp(0.5rem,1vw,1.25rem)] py-[clamp(0.375rem,0.6vw,0.75rem)] bg-gray-50/50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-[clamp(0.25rem,0.5vw,0.5rem)]">
        <div className="flex items-center gap-[clamp(0.375rem,0.6vw,0.75rem)] text-[clamp(0.5rem,0.6vw,0.75rem)] text-gray-400 flex-wrap">
          <span>Total <span className="font-medium text-gray-600">{banners.length}</span> banner</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">
            Active <span className="font-medium text-green-600">{banners.filter(b => b.status === "active").length}</span>
            <span className="mx-[clamp(0.125rem,0.2vw,0.375rem)]">•</span>
            Draft <span className="font-medium text-gray-500">{banners.filter(b => b.status === "draft").length}</span>
          </span>
        </div>
        <span className="text-[clamp(0.4rem,0.5vw,0.625rem)] px-[clamp(0.375rem,0.5vw,0.625rem)] py-[clamp(0.0625rem,0.15vw,0.1875rem)] bg-yellow-50 text-yellow-600 rounded-full">⚡ Dummy</span>
      </div>
    </div>
  );
};

export default BannerTable;