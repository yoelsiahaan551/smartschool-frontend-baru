const API_URL = "http://localhost:5000/api/v1";

// ============================================================
// TYPES
// ============================================================

export interface PaketFitur {
  id: string;
  kode: string;
  nama: string;
  deskripsi?: string | null;
  ikon?: string | null;
}

export interface Modul {
  id: string;
  kode: string;
  nama: string;
  deskripsi?: string | null;
  ikon?: string | null;
  sistem?: boolean;
}

export interface Paket {
  id: string;
  nama: string;
  deskripsi?: string | null;
  harga: number;
  durasi: number;
  fitur: PaketFitur[];
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

// ============================================================
// GET TOKEN
// ============================================================

function getToken() {
  if (typeof window === "undefined") {
    return "";
  }

  return localStorage.getItem("token") || "";
}

// ============================================================
// PARSE RESPONSE
// ============================================================

async function parseResponse(response: Response) {
  const text = await response.text();

  let result: any = null;

  try {
    result = text ? JSON.parse(text) : null;
  } catch {
    result = null;
  }

  console.log("========================================");
  console.log("📦 PAKET API");
  console.log("STATUS:", response.status);
  console.log("URL:", response.url);
  console.log("RAW RESPONSE:", text);
  console.log("PARSED RESPONSE:", result);
  console.log("========================================");

  if (!response.ok) {
    throw new Error(
      result?.message ||
        result?.error ||
        result?.errors?.[0]?.message ||
        `HTTP ${response.status}: ${response.statusText}`
    );
  }

  return result;
}

// ============================================================
// GET SEMUA PAKET
//
// GET /api/v1/paket
//
// Backend:
// getPaketPublic
//
// Response:
// {
//   success: true,
//   message: "...",
//   data: [
//     {
//       id,
//       nama,
//       deskripsi,
//       harga,
//       durasi,
//       fitur: []
//     }
//   ]
// }
// ============================================================

export const getPaket = async (): Promise<
  ApiResponse<Paket[]>
> => {
  const url = `${API_URL}/paket`;

  console.log("📦 GET PAKET:", url);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const result = await parseResponse(response);

  let data: Paket[] = [];

  if (Array.isArray(result)) {
    data = result;
  } else if (Array.isArray(result?.data)) {
    data = result.data;
  }

  console.log("========== HASIL GET PAKET ==========");

  console.log("Jumlah paket:", data.length);

  data.forEach((paket: any) => {
    console.log("--------------------------------------");
    console.log("Nama:", paket?.nama);
    console.log("ID:", paket?.id);
    console.log("Harga:", paket?.harga);
    console.log("Durasi:", paket?.durasi);

    console.log(
      "Fitur:",
      Array.isArray(paket?.fitur)
        ? paket.fitur
        : []
    );

    console.log(
      "Jumlah fitur:",
      Array.isArray(paket?.fitur)
        ? paket.fitur.length
        : 0
    );
  });

  console.log("======================================");

  return {
    success: result?.success !== false,
    data,
    message: result?.message || "",
  };
};

// ============================================================
// GET PAKET BERDASARKAN ID
//
// GET /api/v1/paket/:id
// ============================================================

export const getPaketById = async (
  id: string
): Promise<ApiResponse<Paket>> => {
  if (!id) {
    throw new Error("ID paket tidak ditemukan");
  }

  const url = `${API_URL}/paket/${id}`;

  console.log("📦 GET PAKET BY ID:", url);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const result = await parseResponse(response);

  return {
    success: result?.success !== false,
    data: result?.data || result,
    message: result?.message || "",
  };
};

// ============================================================
// GET SEMUA FITUR / MODUL
//
// GET /api/v1/paket/fitur/list
//
// Backend:
// getFiturPublic
//
// Response:
// {
//   success: true,
//   message: "...",
//   data: [
//     {
//       id,
//       kode,
//       nama,
//       deskripsi,
//       ikon,
//       sistem
//     }
//   ]
// }
// ============================================================

export const getFitur = async (): Promise<
  ApiResponse<Modul[]>
> => {
  const url = `${API_URL}/paket/fitur/list`;

  console.log("🔵 GET SEMUA FITUR / MODUL:", url);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const result = await parseResponse(response);

  let data: Modul[] = [];

  if (Array.isArray(result)) {
    data = result;
  } else if (Array.isArray(result?.data)) {
    data = result.data;
  }

  console.log("========== HASIL GET FITUR ==========");

  console.log("Jumlah modul:", data.length);

  data.forEach((modul: any, index: number) => {
    console.log(`${index + 1}. ${modul?.nama}`);
    console.log("   ID:", modul?.id);
    console.log("   Kode:", modul?.kode);
    console.log("   Deskripsi:", modul?.deskripsi);
    console.log("   Ikon:", modul?.ikon);
    console.log("   Sistem:", modul?.sistem);
  });

  console.log("======================================");

  return {
    success: result?.success !== false,
    data,
    message: result?.message || "",
  };
};

// ============================================================
// CREATE PAKET
//
// POST /api/v1/paket
//
// Body backend:
// {
//   nama,
//   deskripsi,
//   harga,
//   durasi,
//   modulIds
// }
// ============================================================

export const createPaket = async (
  data: {
    nama: string;
    deskripsi?: string;
    harga: number;
    durasi: number;
    modulIds: string[];
  },
  token?: string
) => {
  const url = `${API_URL}/paket`;

  const authToken = token || getToken();

  console.log("🟢 CREATE PAKET:", url);
  console.log("BODY:", data);

  const response = await fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",

      ...(authToken
        ? {
            Authorization: `Bearer ${authToken}`,
          }
        : {}),
    },

    body: JSON.stringify({
      nama: data.nama,
      deskripsi: data.deskripsi || "",
      harga: Number(data.harga),
      durasi: Number(data.durasi),
      modulIds: Array.isArray(data.modulIds)
        ? data.modulIds
        : [],
    }),
  });

  return await parseResponse(response);
};

// ============================================================
// UPDATE PAKET
//
// PUT /api/v1/paket/:id
//
// Body backend:
// {
//   nama,
//   deskripsi,
//   harga,
//   durasi,
//   modulIds,
//   status
// }
// ============================================================

export const updatePaket = async (
  id: string,
  data: {
    nama: string;
    deskripsi?: string;
    harga: number;
    durasi: number;
    modulIds?: string[];
    status?: string;
  },
  token?: string
) => {
  if (!id) {
    throw new Error("ID paket tidak ditemukan");
  }

  const url = `${API_URL}/paket/${id}`;

  const authToken = token || getToken();

  console.log("🟡 UPDATE PAKET:", url);
  console.log("BODY:", data);

  const body: any = {
    nama: data.nama,
    deskripsi: data.deskripsi || "",
    harga: Number(data.harga),
    durasi: Number(data.durasi),
  };

  // Kalau modulIds dikirim, pastikan selalu array
  if (Array.isArray(data.modulIds)) {
    body.modulIds = data.modulIds;
  }

  // Status hanya dikirim kalau memang ada
  if (data.status !== undefined) {
    body.status = data.status;
  }

  const response = await fetch(url, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",

      ...(authToken
        ? {
            Authorization: `Bearer ${authToken}`,
          }
        : {}),
    },

    body: JSON.stringify(body),
  });

  return await parseResponse(response);
};

// ============================================================
// DELETE PAKET
//
// DELETE /api/v1/paket/:id
//
// Backend melakukan soft delete:
// status = nonaktif
// dihapusPada = new Date()
// ============================================================

export const deletePaket = async (
  id: string,
  token?: string
) => {
  if (!id) {
    throw new Error("ID paket tidak ditemukan");
  }

  const url = `${API_URL}/paket/${id}`;

  const authToken = token || getToken();

  console.log("🔴 DELETE PAKET:", url);

  const response = await fetch(url, {
    method: "DELETE",

    headers: {
      Accept: "application/json",

      ...(authToken
        ? {
            Authorization: `Bearer ${authToken}`,
          }
        : {}),
    },
  });

  return await parseResponse(response);
};