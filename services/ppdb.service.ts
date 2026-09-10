import { apiFetch } from "../lib/api";

const ENDPOINT = "/api/v1/ppdb";

/* =========================================================
   TYPES
========================================================= */

export interface DaftarPpdbPayload {
  sekolahId: string;
  jalurPpdbId: string;
  namaLengkap: string;
  nisn: string;
  tempatLahir: string;
  tanggalLahir: string;
  jenisKelamin: string;
  alamat: string;
  telepon?: string;
  email?: string;
  namaAyah?: string;
  namaIbu?: string;
  asalSekolah?: string;
  nilaiRapor?: number;
}

export interface PendaftaranPpdb {
  id: string;
  sekolahId: string;
  jalurPpdbId: string;

  dibuatOleh?: string | null;
  diperbaruiOleh?: string | null;
  dihapusOleh?: string | null;

  nomorPendaftaran: string;
  namaLengkap: string;
  nisn: string;

  tempatLahir: string;
  tanggalLahir: string;
  jenisKelamin: string;
  alamat: string;

  telepon?: string | null;
  email?: string | null;

  namaAyah?: string | null;
  namaIbu?: string | null;
  asalSekolah?: string | null;

  nilaiRapor?: number | string | null;

  status?: string | null;

  kelasId?: string | null;

  dikonversiKePenggunaId?: string | null;
  dikonversiPada?: string | null;

  dibuatPada?: string;
  diperbaruiPada?: string;
  dihapusPada?: string | null;
}

export interface DaftarPpdbResponse {
  success: boolean;
  message?: string;
  data: PendaftaranPpdb;
}

/* =========================================================
   BERKAS PPDB
========================================================= */

export type NamaBerkasPpdb = "KK" | "AKTE" | "IJAZAH";

export interface BerkasPpdb {
  id: string;
  pendaftaranPpdbId: string;
  namaBerkas: NamaBerkasPpdb;
  urlFile: string;

  status?: string | null;
  keterangan?: string | null;

  dibuatPada?: string;
  diperbaruiPada?: string;
  dihapusPada?: string | null;
}

export interface UploadBerkasPpdbResponse {
  success: boolean;
  message?: string;
  data: BerkasPpdb;
}

/* =========================================================
   VERIFIKASI PPDB
========================================================= */

export interface VerifikasiPpdbPayload {
  status: "lulus" | "ditolak";
  kelasId?: string;
}

export interface VerifikasiPpdbResponse {
  success: boolean;
  message?: string;
  data?: PendaftaranPpdb | Record<string, unknown>;
}

/* =========================================================
   DAFTAR PPDB
========================================================= */

/**
 * POST /api/v1/ppdb/daftar
 *
 * Digunakan untuk membuat pendaftaran PPDB baru.
 */
export async function daftarPpdb(
  payload: DaftarPpdbPayload
): Promise<DaftarPpdbResponse> {
  return apiFetch(`${ENDPOINT}/daftar`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/* =========================================================
   UPLOAD BERKAS PPDB
========================================================= */

/**
 * POST /api/v1/ppdb/:id/berkas
 *
 * Upload:
 * - KK
 * - AKTE
 * - IJAZAH
 *
 * Endpoint BE saat ini tidak menggunakan authenticate,
 * sehingga token tidak wajib.
 */
export async function uploadBerkasPpdb(
  id: string,
  file: File,
  namaBerkas: NamaBerkasPpdb
): Promise<UploadBerkasPpdbResponse> {
  if (!id) {
    throw new Error("ID pendaftaran tidak ditemukan.");
  }

  if (!file) {
    throw new Error("File belum dipilih.");
  }

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

  const formData = new FormData();

  formData.append("file", file);
  formData.append("namaBerkas", namaBerkas);

  const headers: HeadersInit = {};

  // Token hanya dikirim jika tersedia.
  // Jangan set Content-Type karena browser
  // akan mengatur multipart/form-data boundary.
  const token = localStorage.getItem("token");

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(
    `${API_URL}${ENDPOINT}/${id}/berkas`,
    {
      method: "POST",
      headers,
      body: formData,
    }
  );

  let data: UploadBerkasPpdbResponse | null = null;

  try {
    data = await response.json();
  } catch {
    throw new Error("Response dari server bukan JSON.");
  }

  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";

    throw new Error(
      data?.message ||
        "Sesi login telah berakhir. Silakan login kembali."
    );
  }

  if (!response.ok) {
    throw new Error(
      data?.message || "Gagal mengupload berkas PPDB."
    );
  }

  return data as UploadBerkasPpdbResponse;
}

/* =========================================================
   VERIFIKASI PPDB
========================================================= */

/**
 * PATCH /api/v1/ppdb/:id/verifikasi
 *
 * Status:
 * - lulus
 * - ditolak
 *
 * Jika lulus, kelasId wajib dikirim.
 */
export async function verifikasiPpdb(
  id: string,
  payload: VerifikasiPpdbPayload
): Promise<VerifikasiPpdbResponse> {
  if (!id) {
    throw new Error("ID pendaftaran tidak ditemukan.");
  }

  if (!payload?.status) {
    throw new Error("Status verifikasi belum ditentukan.");
  }

  if (
    payload.status === "lulus" &&
    !payload.kelasId
  ) {
    throw new Error(
      "Kelas wajib dipilih untuk pendaftar yang lulus."
    );
  }

  return apiFetch(`${ENDPOINT}/${id}/verifikasi`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}