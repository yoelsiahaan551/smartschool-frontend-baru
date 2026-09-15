"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { registerTenant } from "../../services/tenant.service";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const initialForm = {
  namaSekolah: "",
  jenjang: "",
  jumlahSiswa: "",
  kota: "",
  provinsi: "",
  namaLengkap: "",
  jabatan: "",
  email: "",
  whatsapp: "",
  paket: "",
  kataSandi: "",
  konfirmasiKataSandi: "",
  pesan: "",
};

function generateSubdomain(namaSekolah) {
  return namaSekolah
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function DaftarSekolahPage() {
  const router = useRouter();

  const [formData, setFormData] = useState(initialForm);
  const [paketList, setPaketList] = useState([]);
  const [loadingPaket, setLoadingPaket] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const subdomain = useMemo(
    () => generateSubdomain(formData.namaSekolah),
    [formData.namaSekolah]
  );

  /**
   * ============================================================
   * GET PAKET DARI BACKEND
   * ============================================================
   */
  useEffect(() => {
    async function loadPaket() {
      try {
        setLoadingPaket(true);

        const response = await fetch(
          `${API_URL}/api/v1/paket`
        );

        const result = await response.json();

        console.log("PAKET RESPONSE:", result);

        if (!response.ok) {
          throw new Error(
            result?.message ||
              "Gagal mengambil data paket."
          );
        }

        const data =
          Array.isArray(result?.data)
            ? result.data
            : Array.isArray(result)
            ? result
            : [];

        setPaketList(data);
      } catch (err) {
        console.error("GET PAKET ERROR:", err);

        setError(
          err?.message ||
            "Gagal mengambil daftar paket."
        );
      } finally {
        setLoadingPaket(false);
      }
    }

    loadPaket();
  }, []);

  /**
   * ============================================================
   * HANDLE INPUT
   * ============================================================
   */
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }

    if (success) {
      setSuccess("");
    }
  }

  /**
   * ============================================================
   * SUBMIT
   * ============================================================
   */
  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    /**
     * Validasi frontend
     */
    if (!formData.namaSekolah.trim()) {
      setError("Nama sekolah wajib diisi.");
      return;
    }

    if (!formData.jenjang) {
      setError("Jenjang sekolah wajib dipilih.");
      return;
    }

    if (!formData.namaLengkap.trim()) {
      setError("Nama lengkap wajib diisi.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email wajib diisi.");
      return;
    }

    if (!formData.whatsapp.trim()) {
      setError("Nomor WhatsApp wajib diisi.");
      return;
    }

    if (!formData.kota.trim()) {
      setError("Kota wajib diisi.");
      return;
    }

    if (!formData.provinsi.trim()) {
      setError("Provinsi wajib diisi.");
      return;
    }

    if (!formData.paket) {
      setError("Silakan pilih paket.");
      return;
    }

    if (!formData.kataSandi) {
      setError("Kata sandi wajib diisi.");
      return;
    }

    if (formData.kataSandi.length < 6) {
      setError(
        "Kata sandi minimal 6 karakter."
      );
      return;
    }

    if (
      formData.kataSandi !==
      formData.konfirmasiKataSandi
    ) {
      setError(
        "Konfirmasi kata sandi tidak sesuai."
      );
      return;
    }

    if (!subdomain) {
      setError(
        "Nama sekolah belum bisa digunakan sebagai subdomain."
      );
      return;
    }

    /**
     * Cari paket berdasarkan ID
     */
    const selectedPaket = paketList.find(
      (paket) =>
        paket.id === formData.paket
    );

    if (!selectedPaket) {
      setError(
        "Paket yang dipilih tidak ditemukan."
      );
      return;
    }

    /**
     * Payload SESUAI registerTenant()
     */
    const payload = {
      paketId: selectedPaket.id,

      nama: formData.namaLengkap.trim(),

      namaSekolah:
        formData.namaSekolah.trim(),

      jenjang:
        formData.jenjang,

      subdomain,

      email:
        formData.email
          .trim()
          .toLowerCase(),

      teleponSekolah:
        formData.whatsapp.trim(),

      alamatSekolah:
        `${formData.kota.trim()}, ${formData.provinsi.trim()}`,

      kataSandi:
        formData.kataSandi,
    };

    console.log(
      "========== REGISTER TENANT =========="
    );

    console.log(
      "PAYLOAD:",
      payload
    );

    console.log(
      "====================================="
    );

    try {
      setLoadingSubmit(true);

      const result =
        await registerTenant(payload);

      console.log(
        "REGISTER TENANT RESULT:",
        result
      );

      if (!result?.success) {
        throw new Error(
          result?.message ||
            "Pendaftaran gagal."
        );
      }

      /**
       * Simpan email sementara untuk halaman OTP.
       */
      sessionStorage.setItem(
        "tenant_register_email",
        payload.email
      );

      sessionStorage.setItem(
        "tenant_register_nama",
        payload.nama
      );

      sessionStorage.setItem(
        "tenant_register_paket_id",
        payload.paketId
      );

      setSuccess(
        result?.message ||
          "Pendaftaran berhasil. Silakan cek email untuk OTP."
      );

      /**
       * Masuk ke halaman OTP
       */
      setTimeout(() => {
        router.push(
          `/daftar-sekolah/verify?email=${encodeURIComponent(
            payload.email
          )}`
        );
      }, 1000);
    } catch (err) {
      console.error(
        "REGISTER TENANT ERROR:",
        err
      );

      setError(
        err?.message ||
          "Pendaftaran gagal. Silakan coba lagi."
      );
    } finally {
      setLoadingSubmit(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* =====================================================
          NAVBAR
      ====================================================== */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <a
            href="/"
            className="flex items-center"
          >
            <Image
              src="/logo/logoSS.png"
              alt="SmartSchool"
              width={170}
              height={45}
              className="h-auto w-auto"
              priority
            />
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <a
              href="/#fitur"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              Fitur
            </a>

            <a
              href="/#harga"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              Harga
            </a>

            <a
              href="/#cara-kerja"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              Cara Kerja
            </a>

            <a
              href="/#kontak"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              Kontak
            </a>

            <a
              href="/login"
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
            >
              Login
            </a>
          </div>
        </div>
      </nav>

      {/* =====================================================
          HEADER
      ====================================================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <div className="max-w-3xl">
            <span className="mb-4 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              Daftar SmartSchool
            </span>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Mulai kelola sekolah
              <br />
              lebih mudah bersama SmartSchool
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              Lengkapi data sekolah dan data
              administrator untuk membuat akun
              SmartSchool.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          FORM
      ====================================================== */}
      <section className="pb-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1fr_360px] lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <form
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {/* ALERT */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                  {success}
                </div>
              )}

              {/* =================================================
                  DATA SEKOLAH
              ================================================== */}
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Data Sekolah
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Masukkan informasi dasar sekolah.
                </p>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Nama Sekolah
                    </label>

                    <input
                      type="text"
                      name="namaSekolah"
                      value={formData.namaSekolah}
                      onChange={handleChange}
                      placeholder="Contoh: SMA SmartSchool"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-50"
                    />

                    {subdomain && (
                      <p className="mt-2 text-xs text-slate-500">
                        Subdomain sekolah:{" "}
                        <span className="font-semibold text-blue-600">
                          {subdomain}.smartschool.id
                        </span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Jenjang
                    </label>

                    <select
                      name="jenjang"
                      value={formData.jenjang}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-50"
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
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Jumlah Siswa
                    </label>

                    <input
                      type="number"
                      name="jumlahSiswa"
                      value={formData.jumlahSiswa}
                      onChange={handleChange}
                      min="1"
                      placeholder="Contoh: 500"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-50"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Kota
                    </label>

                    <input
                      type="text"
                      name="kota"
                      value={formData.kota}
                      onChange={handleChange}
                      placeholder="Contoh: Depok"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-50"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Provinsi
                    </label>

                    <input
                      type="text"
                      name="provinsi"
                      value={formData.provinsi}
                      onChange={handleChange}
                      placeholder="Contoh: Jawa Barat"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-50"
                    />
                  </div>
                </div>
              </div>

              <div className="h-px bg-slate-200" />

              {/* =================================================
                  DATA ADMIN
              ================================================== */}
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Data Administrator
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Data ini digunakan untuk akun administrator
                  sekolah.
                </p>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Nama Lengkap
                    </label>

                    <input
                      type="text"
                      name="namaLengkap"
                      value={formData.namaLengkap}
                      onChange={handleChange}
                      placeholder="Nama lengkap administrator"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-50"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Jabatan
                    </label>

                    <input
                      type="text"
                      name="jabatan"
                      value={formData.jabatan}
                      onChange={handleChange}
                      placeholder="Contoh: Kepala Sekolah"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-50"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="admin@sekolah.sch.id"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-50"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      WhatsApp
                    </label>

                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="08xxxxxxxxxx"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-50"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Kata Sandi
                    </label>

                    <input
                      type="password"
                      name="kataSandi"
                      value={formData.kataSandi}
                      onChange={handleChange}
                      placeholder="Minimal 6 karakter"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-50"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Konfirmasi Kata Sandi
                    </label>

                    <input
                      type="password"
                      name="konfirmasiKataSandi"
                      value={
                        formData.konfirmasiKataSandi
                      }
                      onChange={handleChange}
                      placeholder="Ulangi kata sandi"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-50"
                    />
                  </div>
                </div>
              </div>

              <div className="h-px bg-slate-200" />

              {/* =================================================
                  PAKET
              ================================================== */}
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Pilih Paket
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Pilih paket SmartSchool yang sesuai
                  kebutuhan sekolah.
                </p>

                {loadingPaket ? (
                  <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">
                    Memuat daftar paket...
                  </div>
                ) : paketList.length === 0 ? (
                  <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
                    Data paket belum tersedia dari
                    backend.
                  </div>
                ) : (
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {paketList.map((paket) => {
                      const selected =
                        formData.paket ===
                        paket.id;

                      return (
                        <button
                          key={paket.id}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              paket: paket.id,
                            }))
                          }
                          className={`rounded-xl border p-5 text-left transition ${
                            selected
                              ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
                              : "border-slate-200 bg-white hover:border-blue-300"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-bold text-slate-900">
                                {paket.nama}
                              </h3>

                              {paket.deskripsi && (
                                <p className="mt-1 text-sm leading-6 text-slate-500">
                                  {
                                    paket.deskripsi
                                  }
                                </p>
                              )}
                            </div>

                            {selected && (
                              <span className="rounded-full bg-blue-600 px-2.5 py-1 text-xs font-bold text-white">
                                Dipilih
                              </span>
                            )}
                          </div>

                          {paket.harga !==
                            undefined &&
                            paket.harga !==
                              null && (
                              <p className="mt-4 text-lg font-bold text-blue-700">
                                Rp{" "}
                                {Number(
                                  paket.harga
                                ).toLocaleString(
                                  "id-ID"
                                )}
                              </p>
                            )}

                          {paket.durasi && (
                            <p className="mt-1 text-xs text-slate-500">
                              Durasi:{" "}
                              {paket.durasi}
                            </p>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* =================================================
                  PESAN
              ================================================== */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Pesan / Kebutuhan Tambahan
                  <span className="ml-1 font-normal text-slate-400">
                    (opsional)
                  </span>
                </label>

                <textarea
                  name="pesan"
                  value={formData.pesan}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tulis kebutuhan atau pertanyaan kamu..."
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-50"
                />
              </div>

              {/* =================================================
                  SUBMIT
              ================================================== */}
              <div className="border-t border-slate-200 pt-6">
                <button
                  type="submit"
                  disabled={
                    loadingSubmit ||
                    loadingPaket
                  }
                  className="w-full rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loadingSubmit
                    ? "Mengirim pendaftaran..."
                    : "Daftar Sekarang"}
                </button>

                <p className="mt-3 text-center text-xs leading-5 text-slate-500">
                  Setelah pendaftaran berhasil,
                  kode OTP akan dikirim ke email
                  administrator.
                </p>
              </div>
            </form>
          </div>

          {/* =====================================================
              SIDEBAR
          ====================================================== */}
          <aside className="h-fit space-y-5">
            <div className="rounded-2xl bg-slate-900 p-6 text-white">
              <h3 className="text-lg font-bold">
                Kenapa SmartSchool?
              </h3>

              <div className="mt-5 space-y-4">
                {[
                  "Manajemen sekolah terintegrasi",
                  "Akses berdasarkan role pengguna",
                  "Data sekolah tersimpan terpusat",
                  "Mendukung pembelajaran digital",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex gap-3"
                  >
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs">
                      ✓
                    </span>

                    <p className="text-sm leading-6 text-slate-300">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">
                Butuh bantuan?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Hubungi tim SmartSchool jika kamu
                membutuhkan informasi mengenai
                paket atau proses pendaftaran.
              </p>

              <a
                href="mailto:info@smartschool.com"
                className="mt-5 inline-flex font-semibold text-blue-600 hover:text-blue-700"
              >
                info@smartschool.com
              </a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}