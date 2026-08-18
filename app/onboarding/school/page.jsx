"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Lock,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import { getPaketById } from "../../../services/paket.service";
import { registerTenant } from "../../../services/tenant.service";

export default function SchoolOnboardingPage() {
  const [paket, setPaket] = useState(null);
  const [loadingPaket, setLoadingPaket] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    nama: "",
    email: "",
    namaSekolah: "",
    jenjang: "",
    subdomain: "",
    alamatSekolah: "",
    teleponSekolah: "",
    kataSandi: "",
    konfirmasiKataSandi: "",
    logo: "",
  });

  // ================================
  // LOAD PAKET
  // ================================
  useEffect(() => {
    const loadPaket = async () => {
      try {
        const params = new URLSearchParams(
          window.location.search
        );

        let paketId = params.get("paketId");

        // Prioritas:
        // 1. Paket dari sessionStorage
        // 2. Paket dari URL
        // 3. Paket dari selected_paket_id

        const storedPaket =
          sessionStorage.getItem("selected_paket");

        if (storedPaket) {
          try {
            const parsedPaket =
              JSON.parse(storedPaket);

            if (parsedPaket?.id) {
              setPaket(parsedPaket);

              sessionStorage.setItem(
                "selected_paket_id",
                parsedPaket.id
              );

              setLoadingPaket(false);
              return;
            }
          } catch (storageError) {
            console.error(
              "Gagal membaca selected_paket:",
              storageError
            );

            sessionStorage.removeItem(
              "selected_paket"
            );
          }
        }

        if (!paketId) {
          paketId = sessionStorage.getItem(
            "selected_paket_id"
          );
        }

        if (!paketId) {
          setError(
            "Belum ada paket yang dipilih."
          );
          setLoadingPaket(false);
          return;
        }

        sessionStorage.setItem(
          "selected_paket_id",
          paketId
        );

        const response =
          await getPaketById(paketId);

        if (!response?.data) {
          throw new Error(
            "Paket tidak ditemukan."
          );
        }

        setPaket(response.data);

        sessionStorage.setItem(
          "selected_paket",
          JSON.stringify(response.data)
        );
      } catch (error) {
        console.error(
          "Load paket error:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Gagal mengambil data paket."
        );
      } finally {
        setLoadingPaket(false);
      }
    };

    loadPaket();
  }, []);

  // ================================
  // HANDLE INPUT
  // ================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    // KHUSUS SUBDOMAIN
    // Otomatis:
    // SMK Taruna Bhakti
    // menjadi:
    // smk-taruna-bhakti
    if (name === "subdomain") {
      newValue = value
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");
    }

    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    setError("");
  };

  // ================================
  // SUBMIT
  // ================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!paket?.id) {
      setError("Paket belum dipilih.");
      return;
    }

    // VALIDASI DATA WAJIB
    if (
      !form.nama.trim() ||
      !form.email.trim() ||
      !form.namaSekolah.trim() ||
      !form.jenjang ||
      !form.subdomain.trim() ||
      !form.alamatSekolah.trim() ||
      !form.teleponSekolah.trim()
    ) {
      setError(
        "Mohon lengkapi seluruh data yang wajib diisi."
      );
      return;
    }

    // VALIDASI SUBDOMAIN
    const subdomain = form.subdomain
      .trim()
      .toLowerCase();

    if (
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(
        subdomain
      )
    ) {
      setError(
        "Subdomain hanya boleh menggunakan huruf kecil, angka, dan tanda strip (-)."
      );
      return;
    }

    // VALIDASI PASSWORD
    if (
      form.kataSandi !==
      form.konfirmasiKataSandi
    ) {
      setError(
        "Konfirmasi kata sandi tidak sama."
      );
      return;
    }

    if (form.kataSandi.length < 8) {
      setError(
        "Kata sandi minimal 8 karakter."
      );
      return;
    }

    if (!/[A-Z]/.test(form.kataSandi)) {
      setError(
        "Kata sandi harus memiliki minimal 1 huruf kapital."
      );
      return;
    }

    if (!/[0-9]/.test(form.kataSandi)) {
      setError(
        "Kata sandi harus memiliki minimal 1 angka."
      );
      return;
    }

    setLoading(true);

    try {
      // PAYLOAD YANG DIKIRIM KE BACKEND
      const payload = {
        nama: form.nama.trim(),
        email: form.email.trim(),
        namaSekolah:
          form.namaSekolah.trim(),
        jenjang: form.jenjang,
        subdomain: subdomain,
        alamatSekolah:
          form.alamatSekolah.trim(),
        teleponSekolah:
          form.teleponSekolah.trim(),
        kataSandi: form.kataSandi,
        paketId: paket.id,
      };

      if (form.logo.trim()) {
        payload.logo = form.logo.trim();
      }

      console.log(
        "Payload register tenant:",
        payload
      );

      const response =
        await registerTenant(payload);

      if (!response?.success) {
        throw new Error(
          response?.message ||
            "Pendaftaran gagal."
        );
      }

      // SIMPAN DATA UNTUK HALAMAN VERIFIKASI
      sessionStorage.setItem(
        "onboarding_email",
        form.email.trim()
      );

      sessionStorage.setItem(
        "onboarding_paket_id",
        paket.id
      );

      // PINDAH KE VERIFIKASI
      window.location.href =
        "/onboarding/verify";
    } catch (error) {
      console.error(
        "Register tenant error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Gagal melakukan pendaftaran."
      );
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // LOADING PAKET
  // ================================
  if (loadingPaket) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2
            className="animate-spin text-blue-600 mx-auto mb-3"
            size={30}
          />

          <p className="text-sm text-slate-500">
            Memuat paket...
          </p>
        </div>
      </main>
    );
  }

  // ================================
  // PAKET TIDAK DITEMUKAN
  // ================================
  if (!paket) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-5">
        <div className="bg-white border border-red-200 rounded-2xl shadow-sm p-8 max-w-md w-full text-center">
          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2
              size={22}
              className="text-red-500"
            />
          </div>

          <h1 className="text-lg font-bold text-slate-900">
            Paket tidak ditemukan
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            {error ||
              "Silakan kembali ke halaman paket dan pilih paket terlebih dahulu."}
          </p>

          <button
            type="button"
            onClick={() => {
              sessionStorage.removeItem(
                "selected_paket"
              );

              sessionStorage.removeItem(
                "selected_paket_id"
              );

              window.location.href =
                "/#pricing";
            }}
            className="mt-6 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold"
          >
            Kembali ke Paket
          </button>
        </div>
      </main>
    );
  }

  // ================================
  // HALAMAN UTAMA
  // ================================
  return (
    <main className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9">
              <Image
                src="/logo/logoSS.png"
                alt="SmartSchool"
                fill
                className="object-contain"
              />
            </div>

            <span className="font-bold text-lg text-slate-900">
              SMART{" "}
              <span className="text-blue-600">
                SCHOOL
              </span>
            </span>
          </div>

          <div className="text-xs text-slate-500">
            Pendaftaran Sekolah
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-5 py-10">
        {/* PROGRESS */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                1
              </div>

              <span className="ml-2 text-sm font-semibold text-blue-600">
                Data Sekolah
              </span>
            </div>

            <div className="w-16 h-px bg-slate-300 mx-4" />

            <div className="flex items-center">
              <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-sm font-bold">
                2
              </div>

              <span className="ml-2 text-sm text-slate-400">
                Verifikasi
              </span>
            </div>

            <div className="w-16 h-px bg-slate-300 mx-4" />

            <div className="flex items-center">
              <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-sm font-bold">
                3
              </div>

              <span className="ml-2 text-sm text-slate-400">
                Pembayaran
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
          {/* FORM */}
          <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-7">
            <div className="mb-7">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Building2
                    size={20}
                    className="text-blue-600"
                  />
                </div>

                <div>
                  <h1 className="text-xl font-bold text-slate-900">
                    Daftarkan Sekolah
                  </h1>

                  <p className="text-sm text-slate-500">
                    Lengkapi data sekolah dan akun
                    admin.
                  </p>
                </div>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-7"
            >
              {/* ================= ADMIN ================= */}
              <section>
                <h2 className="text-sm font-bold text-slate-900 mb-4">
                  Data Admin Sekolah
                </h2>

                <div className="grid md:grid-cols-2 gap-5">
                  <Input
                    label="Nama Lengkap"
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    placeholder="Nama admin"
                    icon={
                      <User size={16} />
                    }
                    required
                  />

                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="admin@sekolah.sch.id"
                    icon={
                      <Mail size={16} />
                    }
                    required
                  />
                </div>
              </section>

              {/* ================= SEKOLAH ================= */}
              <section>
                <h2 className="text-sm font-bold text-slate-900 mb-4">
                  Informasi Sekolah
                </h2>

                <div className="space-y-5">
                  <Input
                    label="Nama Sekolah"
                    name="namaSekolah"
                    value={form.namaSekolah}
                    onChange={handleChange}
                    placeholder="Contoh: SMK Taruna Bhakti"
                    icon={
                      <Building2 size={16} />
                    }
                    required
                  />

                  <div className="grid md:grid-cols-2 gap-5">
                    {/* JENJANG */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Jenjang
                      </label>

                      <select
                        name="jenjang"
                        value={form.jenjang}
                        onChange={handleChange}
                        required
                        className="w-full h-11 px-3 border border-slate-200 rounded-lg bg-white text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">
                          Pilih jenjang
                        </option>

                        <option value="SD">
                          SD
                        </option>

                        <option value="SMP">
                          SMP
                        </option>

                        <option value="SMA">
                          SMA
                        </option>

                        <option value="SMK">
                          SMK
                        </option>

                        <option value="SLB">
                          SLB
                        </option>

                        <option value="Lainnya">
                          Lainnya
                        </option>
                      </select>
                    </div>

                    {/* SUBDOMAIN */}
                    <Input
                      label="Subdomain"
                      name="subdomain"
                      value={form.subdomain}
                      onChange={handleChange}
                      placeholder="smk-taruna-bhakti"
                      icon={
                        <Globe size={16} />
                      }
                      required
                    />
                  </div>

                  <p className="text-xs text-slate-400 -mt-3">
                    Gunakan huruf kecil, angka,
                    dan tanda strip (-).
                    <br />
                    Contoh:
                    smk-taruna-bhakti.smartschool.id
                  </p>

                  {/* ALAMAT */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Alamat Sekolah
                    </label>

                    <div className="relative">
                      <MapPin
                        size={16}
                        className="absolute left-3 top-3.5 text-slate-400"
                      />

                      <textarea
                        name="alamatSekolah"
                        value={
                          form.alamatSekolah
                        }
                        onChange={handleChange}
                        placeholder="Alamat lengkap sekolah"
                        required
                        rows={3}
                        className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg text-sm outline-none resize-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* TELEPON */}
                  <Input
                    label="Nomor Telepon Sekolah"
                    name="teleponSekolah"
                    value={
                      form.teleponSekolah
                    }
                    onChange={handleChange}
                    placeholder="081234567890"
                    icon={
                      <Phone size={16} />
                    }
                    required
                  />

                  {/* LOGO */}
                  <Input
                    label="URL Logo Sekolah"
                    name="logo"
                    value={form.logo}
                    onChange={handleChange}
                    placeholder="https://..."
                    icon={
                      <Globe size={16} />
                    }
                  />
                </div>
              </section>

              {/* ================= PASSWORD ================= */}
              <section>
                <h2 className="text-sm font-bold text-slate-900 mb-4">
                  Keamanan Akun
                </h2>

                <div className="grid md:grid-cols-2 gap-5">
                  <Input
                    label="Kata Sandi"
                    name="kataSandi"
                    type="password"
                    value={form.kataSandi}
                    onChange={handleChange}
                    placeholder="Minimal 8 karakter"
                    icon={
                      <Lock size={16} />
                    }
                    required
                  />

                  <Input
                    label="Konfirmasi Kata Sandi"
                    name="konfirmasiKataSandi"
                    type="password"
                    value={
                      form.konfirmasiKataSandi
                    }
                    onChange={handleChange}
                    placeholder="Ulangi kata sandi"
                    icon={
                      <Lock size={16} />
                    }
                    required
                  />
                </div>

                <p className="text-xs text-slate-400 mt-2">
                  Minimal 8 karakter, memiliki 1
                  huruf kapital dan 1 angka.
                </p>
              </section>

              {/* ================= BUTTON ================= */}
              <div className="pt-2 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() =>
                    window.history.back()
                  }
                  className="px-5 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center gap-2"
                >
                  <ArrowLeft size={16} />
                  Kembali
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition"
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />
                      Mendaftarkan...
                    </>
                  ) : (
                    <>
                      Lanjutkan
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* ================= PACKAGE SUMMARY ================= */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 lg:sticky lg:top-6">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">
              Paket yang dipilih
            </p>

            <h2 className="text-xl font-bold text-slate-900">
              {paket.nama}
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              {paket.deskripsi}
            </p>

            <div className="my-5 h-px bg-slate-100" />

            <div className="mb-5">
              <p className="text-xs text-slate-500">
                Harga
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                {formatRupiah(paket.harga)}
              </p>

              <p className="text-xs text-slate-400">
                / {paket.durasi}
              </p>
            </div>

            <div className="space-y-3">
              {paket.fitur?.map((fitur) => (
                <div
                  key={fitur.id}
                  className="flex gap-2"
                >
                  <CheckCircle2
                    size={17}
                    className="text-blue-600 shrink-0"
                  />

                  <span className="text-sm text-slate-600">
                    {fitur.nama}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// ================================
// INPUT COMPONENT
// ================================
function Input({
  label,
  icon,
  ...props
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>

      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>

        <input
          {...props}
          className="w-full h-11 pl-10 pr-3 border border-slate-200 rounded-lg text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>
    </div>
  );
}

// ================================
// FORMAT RUPIAH
// ================================
function formatRupiah(value) {
  if (
    value === undefined ||
    value === null
  ) {
    return "Rp0";
  }

  const number = Number(value);

  if (number === 0) {
    return "Gratis";
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(number);
}