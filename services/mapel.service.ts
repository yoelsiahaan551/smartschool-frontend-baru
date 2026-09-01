const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface MataPelajaran {
  id: string;
  sekolahId: string;
  nama: string;
  kode: string;
  status: string | null;
  dibuatPada?: string;
  diperbaruiPada?: string;
}

export interface GetMataPelajaranResponse {
  success: boolean;
  message: string;
  data: MataPelajaran[];
}

export interface CreateMataPelajaranPayload {
  nama: string;
  kode: string;
  status?: string;
}

export interface UpdateMataPelajaranPayload {
  nama?: string;
  kode?: string;
  status?: string;
}

function getToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  const keys = [
    "token",
    "accessToken",
    "access_token",
    "authToken",
    "jwt",
  ];

  for (const key of keys) {
    const value = localStorage.getItem(key);

    if (value && value.trim()) {
      return value.trim().replace(/^Bearer\s+/i, "");
    }
  }

  return null;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  if (!token) {
    throw new Error(
      "Token login tidak ditemukan. Silakan login kembali."
    );
  }

  const headers = new Headers(options.headers);

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  headers.set("Authorization", `Bearer ${token}`);

  const url = `${API_URL}${endpoint}`;

  let response: Response;

  try {
    response = await fetch(url, {
      ...options,
      headers,
      cache: "no-store",
    });
  } catch (error) {
    console.error("Network error:", error);

    throw new Error(
      "Tidak dapat terhubung ke server. Pastikan backend berjalan."
    );
  }

  const rawText = await response.text();

  let result: any = null;

  if (rawText.trim()) {
    try {
      result = JSON.parse(rawText);
    } catch {
      console.error("Response bukan JSON:", {
        url,
        status: response.status,
        body: rawText,
      });

      throw new Error(
        `Server mengembalikan response tidak valid (${response.status}).`
      );
    }
  }

  if (response.status === 401) {
    throw new Error(
      result?.message ||
        "Sesi login sudah tidak valid. Silakan login kembali."
    );
  }

  if (response.status === 403) {
    throw new Error(
      result?.message ||
        "Anda tidak memiliki akses ke data mata pelajaran."
    );
  }

  if (response.status === 409) {
    throw new Error(
      result?.message ||
        "Kode mata pelajaran sudah digunakan."
    );
  }

  if (!response.ok) {
    throw new Error(
      result?.message ||
        `Request gagal (${response.status})`
    );
  }

  return result as T;
}

/**
 * Ambil semua mata pelajaran milik sekolah (dari token login).
 * Catatan: backend saat ini belum mendukung pagination/search/sort
 * di endpoint ini — semua data langsung dikembalikan sekaligus,
 * diurutkan berdasarkan nama (A-Z).
 */
export async function getMataPelajaran(): Promise<GetMataPelajaranResponse> {
  return request<GetMataPelajaranResponse>("/mata-pelajaran");
}

export async function createMataPelajaran(
  payload: CreateMataPelajaranPayload
) {
  return request<{
    success: boolean;
    message: string;
    data?: MataPelajaran;
  }>("/mata-pelajaran", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateMataPelajaran(
  id: string,
  payload: UpdateMataPelajaranPayload
) {
  if (!id) {
    throw new Error("ID mata pelajaran tidak ditemukan.");
  }

  return request<{
    success: boolean;
    message: string;
    data?: MataPelajaran;
  }>(`/mata-pelajaran/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteMataPelajaran(id: string) {
  if (!id) {
    throw new Error("ID mata pelajaran tidak ditemukan.");
  }

  return request<{
    success: boolean;
    message: string;
  }>(`/mata-pelajaran/${id}`, {
    method: "DELETE",
  });
}