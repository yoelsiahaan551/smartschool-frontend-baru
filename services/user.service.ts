const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface Guru {
  id: string;
  email: string;
  namaPengguna: string;
  namaLengkap: string;
  avatar?: string | null;
  nipd?: string | null;
  nip?: string | null;
  nisn?: string | null;
  jenisKelamin?: string | null;
  status: string;
  dibuatPada?: string;
  jabatan?: string | null;
  golongan?: string | null;

  sekolah?: {
    id: string;
    nama: string;
    kode?: string;
  } | null;

  peran?: {
    id: string;
    nama: string;
    namaTampilan?: string;
  } | null;
}

export interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  role?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface GetUsersResponse {
  success: boolean;
  message: string;
  data: Guru[];
  pagination?: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
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

  const contentType =
    response.headers.get("content-type") || "";

  const rawText = await response.text();

  let result: any = null;

  if (rawText.trim()) {
    try {
      result = JSON.parse(rawText);
    } catch {
      console.error("Response bukan JSON:", {
        url,
        status: response.status,
        contentType,
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
        "Anda tidak memiliki akses ke data pengguna."
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

export async function getUsers(
  params: GetUsersParams = {}
): Promise<GetUsersResponse> {
  const searchParams = new URLSearchParams();

  searchParams.set(
    "page",
    String(params.page ?? 1)
  );

  searchParams.set(
    "limit",
    String(params.limit ?? 10)
  );

  if (params.search?.trim()) {
    searchParams.set(
      "search",
      params.search.trim()
    );
  }

  if (
    params.status &&
    params.status !== "semua"
  ) {
    searchParams.set(
      "status",
      params.status
    );
  }

  if (params.role) {
    searchParams.set(
      "role",
      params.role
    );
  }

  if (params.sortBy) {
    searchParams.set(
      "sortBy",
      params.sortBy
    );
  }

  if (params.sortOrder) {
    searchParams.set(
      "sortOrder",
      params.sortOrder
    );
  }

  return request<GetUsersResponse>(
    `/users?${searchParams.toString()}`
  );
}

export async function deleteUser(
  id: string
) {
  if (!id) {
    throw new Error(
      "ID pengguna tidak ditemukan."
    );
  }

  return request<{
    success: boolean;
    message: string;
    data?: Guru;
  }>(`/users/${id}`, {
    method: "DELETE",
  });
}