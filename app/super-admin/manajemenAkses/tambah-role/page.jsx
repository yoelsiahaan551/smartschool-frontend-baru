"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";

import {
  ArrowLeft,
  Shield,
  ShieldCheck,
  Settings2,
  CheckCircle2,
  Save,
  RotateCcw,
  Eye,
  Plus,
  Pencil,
  Trash2,
  BookOpen,
  ClipboardCheck,
  Wallet,
  Users,
  GraduationCap,
  Building2,
  CalendarDays,
  FileText,
  Check,
} from "lucide-react";

export default function TambahRolePage() {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu] = useState("manajemen-akses");

  const [formData, setFormData] = useState({
    namaRole: "",
    namaTampilan: "",
    deskripsi: "",
    ikon: "Shield",
    status: "aktif",
  });

  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const notifications = [
    {
      id: 1,
      title: "Pembaruan Sistem v2.0",
      desc: "Dikirim 2 jam lalu",
      read: false,
    },
    {
      id: 2,
      title: "Pengingat: Backup Data",
      desc: "Dikirim 1 hari lalu",
      read: false,
    },
  ];

  // =========================================================
  // DATA PERMISSION
  // =========================================================

  const permissionGroups = [
    {
      id: "akademik",
      name: "Akademik",
      description: "Pengelolaan data akademik sekolah",
      icon: BookOpen,
      permissions: [
        {
          id: "akademik-view",
          label: "Lihat Akademik",
          action: "view",
          icon: Eye,
        },
        {
          id: "akademik-create",
          label: "Tambah Akademik",
          action: "create",
          icon: Plus,
        },
        {
          id: "akademik-edit",
          label: "Edit Akademik",
          action: "edit",
          icon: Pencil,
        },
        {
          id: "akademik-delete",
          label: "Hapus Akademik",
          action: "delete",
          icon: Trash2,
        },
      ],
    },
    {
      id: "presensi",
      name: "Presensi",
      description: "Pengelolaan kehadiran guru dan siswa",
      icon: ClipboardCheck,
      permissions: [
        {
          id: "presensi-view",
          label: "Lihat Presensi",
          action: "view",
          icon: Eye,
        },
        {
          id: "presensi-create",
          label: "Tambah Presensi",
          action: "create",
          icon: Plus,
        },
        {
          id: "presensi-edit",
          label: "Edit Presensi",
          action: "edit",
          icon: Pencil,
        },
        {
          id: "presensi-delete",
          label: "Hapus Presensi",
          action: "delete",
          icon: Trash2,
        },
      ],
    },
    {
      id: "keuangan",
      name: "Keuangan",
      description: "Pengelolaan pembayaran dan keuangan",
      icon: Wallet,
      permissions: [
        {
          id: "keuangan-view",
          label: "Lihat Keuangan",
          action: "view",
          icon: Eye,
        },
        {
          id: "keuangan-create",
          label: "Tambah Keuangan",
          action: "create",
          icon: Plus,
        },
        {
          id: "keuangan-edit",
          label: "Edit Keuangan",
          action: "edit",
          icon: Pencil,
        },
        {
          id: "keuangan-delete",
          label: "Hapus Keuangan",
          action: "delete",
          icon: Trash2,
        },
      ],
    },
    {
      id: "pengguna",
      name: "Pengguna",
      description: "Pengelolaan akun dan pengguna sistem",
      icon: Users,
      permissions: [
        {
          id: "pengguna-view",
          label: "Lihat Pengguna",
          action: "view",
          icon: Eye,
        },
        {
          id: "pengguna-create",
          label: "Tambah Pengguna",
          action: "create",
          icon: Plus,
        },
        {
          id: "pengguna-edit",
          label: "Edit Pengguna",
          action: "edit",
          icon: Pencil,
        },
        {
          id: "pengguna-delete",
          label: "Hapus Pengguna",
          action: "delete",
          icon: Trash2,
        },
      ],
    },
    {
      id: "siswa",
      name: "Siswa",
      description: "Pengelolaan data peserta didik",
      icon: GraduationCap,
      permissions: [
        {
          id: "siswa-view",
          label: "Lihat Siswa",
          action: "view",
          icon: Eye,
        },
        {
          id: "siswa-create",
          label: "Tambah Siswa",
          action: "create",
          icon: Plus,
        },
        {
          id: "siswa-edit",
          label: "Edit Siswa",
          action: "edit",
          icon: Pencil,
        },
        {
          id: "siswa-delete",
          label: "Hapus Siswa",
          action: "delete",
          icon: Trash2,
        },
      ],
    },
    {
      id: "sekolah",
      name: "Sekolah",
      description: "Pengelolaan informasi sekolah",
      icon: Building2,
      permissions: [
        {
          id: "sekolah-view",
          label: "Lihat Sekolah",
          action: "view",
          icon: Eye,
        },
        {
          id: "sekolah-create",
          label: "Tambah Sekolah",
          action: "create",
          icon: Plus,
        },
        {
          id: "sekolah-edit",
          label: "Edit Sekolah",
          action: "edit",
          icon: Pencil,
        },
        {
          id: "sekolah-delete",
          label: "Hapus Sekolah",
          action: "delete",
          icon: Trash2,
        },
      ],
    },
    {
      id: "laporan",
      name: "Laporan",
      description: "Pengelolaan dan akses laporan sistem",
      icon: FileText,
      permissions: [
        {
          id: "laporan-view",
          label: "Lihat Laporan",
          action: "view",
          icon: Eye,
        },
        {
          id: "laporan-create",
          label: "Tambah Laporan",
          action: "create",
          icon: Plus,
        },
        {
          id: "laporan-edit",
          label: "Edit Laporan",
          action: "edit",
          icon: Pencil,
        },
        {
          id: "laporan-delete",
          label: "Hapus Laporan",
          action: "delete",
          icon: Trash2,
        },
      ],
    },
    {
      id: "jadwal",
      name: "Jadwal",
      description: "Pengelolaan jadwal pembelajaran",
      icon: CalendarDays,
      permissions: [
        {
          id: "jadwal-view",
          label: "Lihat Jadwal",
          action: "view",
          icon: Eye,
        },
        {
          id: "jadwal-create",
          label: "Tambah Jadwal",
          action: "create",
          icon: Plus,
        },
        {
          id: "jadwal-edit",
          label: "Edit Jadwal",
          action: "edit",
          icon: Pencil,
        },
        {
          id: "jadwal-delete",
          label: "Hapus Jadwal",
          action: "delete",
          icon: Trash2,
        },
      ],
    },
  ];

  const iconOptions = [
    {
      value: "Shield",
      label: "Shield",
      icon: Shield,
    },
    {
      value: "ShieldCheck",
      label: "Shield Check",
      icon: ShieldCheck,
    },
    {
      value: "Settings2",
      label: "Settings",
      icon: Settings2,
    },
    {
      value: "Users",
      label: "Users",
      icon: Users,
    },
    {
      value: "BookOpen",
      label: "Book",
      icon: BookOpen,
    },
    {
      value: "Building2",
      label: "Building",
      icon: Building2,
    },
  ];

  // =========================================================
  // HANDLER FORM
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePermission = (permissionId) => {
    setSelectedPermissions((prev) => {
      if (prev.includes(permissionId)) {
        return prev.filter((id) => id !== permissionId);
      }

      return [...prev, permissionId];
    });
  };

  const toggleGroup = (group) => {
    const groupIds = group.permissions.map((permission) => permission.id);

    const allSelected = groupIds.every((id) =>
      selectedPermissions.includes(id)
    );

    if (allSelected) {
      setSelectedPermissions((prev) =>
        prev.filter((id) => !groupIds.includes(id))
      );
    } else {
      setSelectedPermissions((prev) => [
        ...new Set([...prev, ...groupIds]),
      ]);
    }
  };

  const totalPermissions = permissionGroups.reduce(
    (total, group) => total + group.permissions.length,
    0
  );

  const allPermissionsSelected =
    selectedPermissions.length === totalPermissions;

  const toggleAllPermissions = () => {
    if (allPermissionsSelected) {
      setSelectedPermissions([]);
      return;
    }

    const allIds = permissionGroups.flatMap((group) =>
      group.permissions.map((permission) => permission.id)
    );

    setSelectedPermissions(allIds);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.namaRole.trim()) {
      alert("Nama role wajib diisi.");
      return;
    }

    if (!formData.namaTampilan.trim()) {
      alert("Nama tampilan wajib diisi.");
      return;
    }

    if (selectedPermissions.length === 0) {
      alert("Pilih minimal satu izin untuk role ini.");
      return;
    }

    const data = {
      ...formData,
      permissions: selectedPermissions,
    };

    console.log("Data role:", data);

    alert("Role berhasil disiapkan.");
    router.push("/super-admin/manajemenAkses");
  };

  const handleReset = () => {
    setFormData({
      namaRole: "",
      namaTampilan: "",
      deskripsi: "",
      ikon: "Shield",
      status: "aktif",
    });

    setSelectedPermissions([]);
  };

  const SelectedIcon =
    iconOptions.find((item) => item.value === formData.ikon)?.icon ||
    Shield;

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* SIDEBAR */}
      <Sidebar
        active={activeMenu}
        setActive={() => {}}
        collapsed={!sidebarOpen}
        setCollapsed={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 min-w-0 flex flex-col">
        {/* HEADER */}
        <Header
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          notifications={notifications}
          user={{
            name: "Sarah",
            email: "sarah@smartschool.com",
            avatar: "SA",
          }}
        />

        {/* MAIN */}
        <main className="flex-1 w-full">
          <div className="w-full max-w-[1400px] mx-auto px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            {/* =====================================================
                PAGE HEADER
            ====================================================== */}

            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  {/* BACK BUTTON */}
                  <button
                    type="button"
                    onClick={() =>
                      router.push("/super-admin/manajemenAkses")
                    }
                    className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 active:scale-95"
                    title="Kembali"
                  >
                    <ArrowLeft size={19} />
                  </button>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
                        <Shield size={20} />
                      </div>

                      <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
                        Tambah Role
                      </h1>

                      <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-600">
                        Manajemen Akses
                      </span>
                    </div>

                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 sm:text-[15px]">
                      Buat role baru dan tentukan izin akses yang dapat
                      digunakan oleh pengguna dalam sistem SmartSchool.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* =====================================================
                FORM
            ====================================================== */}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* =====================================================
                  INFORMASI ROLE
              ====================================================== */}

              <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                {/* SECTION HEADER */}
                <div className="border-b border-slate-200 bg-slate-50/70 px-4 py-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <ShieldCheck size={18} />
                    </div>

                    <div>
                      <h2 className="text-sm font-bold text-slate-800 sm:text-base">
                        Informasi Role
                      </h2>

                      <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                        Lengkapi informasi dasar role yang akan dibuat.
                      </p>
                    </div>
                  </div>
                </div>

                {/* SECTION BODY */}
                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    {/* NAMA ROLE */}
                    <div>
                      <label
                        htmlFor="namaRole"
                        className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm"
                      >
                        Nama Role{" "}
                        <span className="text-rose-500">*</span>
                      </label>

                      <input
                        id="namaRole"
                        name="namaRole"
                        type="text"
                        value={formData.namaRole}
                        onChange={handleChange}
                        placeholder="Contoh: Admin Akademik"
                        className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      />

                      <p className="mt-1.5 text-[11px] text-slate-400">
                        Nama internal role dalam sistem.
                      </p>
                    </div>

                    {/* NAMA TAMPILAN */}
                    <div>
                      <label
                        htmlFor="namaTampilan"
                        className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm"
                      >
                        Nama Tampilan{" "}
                        <span className="text-rose-500">*</span>
                      </label>

                      <input
                        id="namaTampilan"
                        name="namaTampilan"
                        type="text"
                        value={formData.namaTampilan}
                        onChange={handleChange}
                        placeholder="Contoh: Admin Akademik"
                        className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      />

                      <p className="mt-1.5 text-[11px] text-slate-400">
                        Nama yang akan ditampilkan kepada pengguna.
                      </p>
                    </div>

                    {/* DESKRIPSI */}
                    <div className="lg:col-span-2">
                      <label
                        htmlFor="deskripsi"
                        className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm"
                      >
                        Deskripsi
                      </label>

                      <textarea
                        id="deskripsi"
                        name="deskripsi"
                        rows={4}
                        value={formData.deskripsi}
                        onChange={handleChange}
                        placeholder="Tuliskan fungsi dan tanggung jawab role ini..."
                        className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      />

                      <p className="mt-1.5 text-[11px] text-slate-400">
                        Jelaskan secara singkat fungsi role ini.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* =====================================================
                  IKON & STATUS
              ====================================================== */}

              <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 bg-slate-50/70 px-4 py-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                      <Settings2 size={18} />
                    </div>

                    <div>
                      <h2 className="text-sm font-bold text-slate-800 sm:text-base">
                        Ikon & Status
                      </h2>

                      <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                        Tentukan identitas dan status role.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    {/* ICON */}
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm">
                        Pilih Ikon
                      </label>

                      <div className="flex gap-3">
                        <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-600">
                          <SelectedIcon size={19} />
                        </div>

                        <select
                          name="ikon"
                          value={formData.ikon}
                          onChange={handleChange}
                          className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition-all hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        >
                          {iconOptions.map((item) => (
                            <option
                              key={item.value}
                              value={item.value}
                            >
                              {item.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* STATUS */}
                    <div>
                      <label
                        htmlFor="status"
                        className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm"
                      >
                        Status
                      </label>

                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-all hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      >
                        <option value="aktif">Aktif</option>
                        <option value="nonaktif">Nonaktif</option>
                      </select>
                    </div>
                  </div>
                </div>
              </section>

              {/* =====================================================
                  IZIN ROLE
              ====================================================== */}

              <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                {/* HEADER */}
                <div className="border-b border-slate-200 bg-slate-50/70 px-4 py-4 sm:px-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                        <CheckCircle2 size={18} />
                      </div>

                      <div>
                        <h2 className="text-sm font-bold text-slate-800 sm:text-base">
                          Izin Role
                        </h2>

                        <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                          Tentukan apa saja yang dapat dilakukan oleh role
                          ini.
                        </p>
                      </div>
                    </div>

                    {/* PILIH SEMUA */}
                    <button
                      type="button"
                      onClick={toggleAllPermissions}
                      className={`inline-flex w-fit items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-all ${
                        allPermissionsSelected
                          ? "border-blue-200 bg-blue-50 text-blue-600"
                          : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                    >
                      <div
                        className={`flex h-4 w-4 items-center justify-center rounded border ${
                          allPermissionsSelected
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {allPermissionsSelected && (
                          <Check size={11} strokeWidth={3} />
                        )}
                      </div>

                      {allPermissionsSelected
                        ? "Batalkan Semua"
                        : "Pilih Semua"}
                    </button>
                  </div>
                </div>

                {/* PERMISSION BODY */}
                <div className="p-4 sm:p-6">
                  {/* SUMMARY */}
                  <div className="mb-5 flex flex-col gap-3 rounded-lg border border-blue-100 bg-blue-50/60 p-3.5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                        <ShieldCheck size={18} />
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-slate-700 sm:text-sm">
                          Izin yang dipilih
                        </p>

                        <p className="text-[11px] text-slate-500">
                          Hak akses yang akan dimiliki role ini.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-xl font-bold text-blue-600">
                        {selectedPermissions.length}
                      </span>

                      <span className="text-xs text-slate-500">
                        / {totalPermissions} izin
                      </span>
                    </div>
                  </div>

                  {/* PERMISSION GRID */}
                  <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                    {permissionGroups.map((group) => {
                      const GroupIcon = group.icon;

                      const groupIds = group.permissions.map(
                        (permission) => permission.id
                      );

                      const selectedCount = groupIds.filter((id) =>
                        selectedPermissions.includes(id)
                      ).length;

                      const groupFullySelected =
                        selectedCount === groupIds.length;

                      return (
                        <div
                          key={group.id}
                          className="overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:border-slate-300"
                        >
                          {/* GROUP HEADER */}
                          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/60 px-4 py-3">
                            <div className="flex min-w-0 items-center gap-3">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm">
                                <GroupIcon size={17} />
                              </div>

                              <div className="min-w-0">
                                <h3 className="truncate text-sm font-semibold text-slate-800">
                                  {group.name}
                                </h3>

                                <p className="truncate text-[11px] text-slate-400">
                                  {group.description}
                                </p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => toggleGroup(group)}
                              className={`ml-3 shrink-0 text-[11px] font-semibold transition-colors ${
                                groupFullySelected
                                  ? "text-blue-600 hover:text-blue-700"
                                  : "text-slate-400 hover:text-blue-600"
                              }`}
                            >
                              {groupFullySelected
                                ? "Batalkan"
                                : "Semua"}
                            </button>
                          </div>

                          {/* PERMISSIONS */}
                          <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                            {group.permissions.map((permission) => {
                              const PermissionIcon = permission.icon;

                              const isSelected =
                                selectedPermissions.includes(
                                  permission.id
                                );

                              return (
                                <label
                                  key={permission.id}
                                  className={`flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors ${
                                    isSelected
                                      ? "bg-blue-50/60"
                                      : "hover:bg-slate-50"
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() =>
                                      togglePermission(
                                        permission.id
                                      )
                                    }
                                    className="sr-only"
                                  />

                                  {/* CUSTOM CHECKBOX */}
                                  <span
                                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                                      isSelected
                                        ? "border-blue-600 bg-blue-600 text-white"
                                        : "border-slate-300 bg-white text-transparent"
                                    }`}
                                  >
                                    <Check
                                      size={13}
                                      strokeWidth={3}
                                    />
                                  </span>

                                  <span
                                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
                                      isSelected
                                        ? "bg-blue-100 text-blue-600"
                                        : "bg-slate-100 text-slate-400"
                                    }`}
                                  >
                                    <PermissionIcon size={14} />
                                  </span>

                                  <span className="min-w-0">
                                    <span
                                      className={`block truncate text-xs font-medium ${
                                        isSelected
                                          ? "text-blue-700"
                                          : "text-slate-600"
                                      }`}
                                    >
                                      {permission.label}
                                    </span>

                                    <span className="mt-0.5 block text-[10px] capitalize text-slate-400">
                                      {permission.action}
                                    </span>
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* =====================================================
                  FOOTER ACTION
              ====================================================== */}

              <div className="sticky bottom-0 z-10 -mx-4 border-t border-slate-200 bg-slate-50/95 px-4 py-4 backdrop-blur sm:static sm:mx-0 sm:border-t sm:bg-transparent sm:px-0 sm:py-2 sm:backdrop-blur-none">
                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                  {/* LEFT */}
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50"
                  >
                    <RotateCcw size={15} />
                    Reset Form
                  </button>

                  {/* RIGHT */}
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={() =>
                        router.push("/super-admin/manajemenAkses")
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50"
                    >
                      <ArrowLeft size={15} />
                      Kembali
                    </button>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-[0.99]"
                    >
                      <Save size={16} />
                      Simpan Role
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* FOOTER */}
            <div className="mt-6 border-t border-slate-200/70 pt-5 text-center">
              <p className="text-[11px] text-slate-400">
                © 2026 SmartSchool • Manajemen Akses
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}