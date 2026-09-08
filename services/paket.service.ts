const API_URL = "http://localhost:5000/api/v1";

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

  console.log("========== PAKET API ==========");
  console.log("STATUS:", response.status);
  console.log("URL:", response.url);
  console.log("RAW RESPONSE:", text);
  console.log("PARSED RESPONSE:", result);
  console.log("===============================");

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
// ============================================================

export const getPaket = async () => {
  const url = `${API_URL}/paket`;

  console.log("GET PAKET URL:", url);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const result = await parseResponse(response);

  let data = [];

  if (Array.isArray(result)) {
    data = result;
  } else if (Array.isArray(result?.data)) {
    data = result.data;
  }

  console.log("========== DATA PAKET ==========");
  console.log("JUMLAH PAKET:", data.length);

  data.forEach((item: any) => {
    console.log("PAKET:", item.nama);
    console.log("ID:", item.id);
    console.log("FITUR:", item.fitur);
    console.log(
      "JUMLAH FITUR:",
      Array.isArray(item.fitur)
        ? item.fitur.length
        : 0
    );
  });

  console.log("================================");

  return {
    success: result?.success !== false,
    data,
    message: result?.message || "",
  };
};

// ============================================================
// GET PAKET BERDASARKAN ID
// ============================================================

export const getPaketById = async (id: string) => {
  if (!id) {
    throw new Error("ID paket tidak ditemukan");
  }

  const url = `${API_URL}/paket/${id}`;

  console.log("GET PAKET BY ID URL:", url);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  return await parseResponse(response);
};

// ============================================================
// GET FITUR
// ============================================================

export const getFitur = async () => {
  const url = `${API_URL}/paket/fitur/list`;

  console.log("GET FITUR URL:", url);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const result = await parseResponse(response);

  let data = [];

  if (Array.isArray(result)) {
    data = result;
  } else if (Array.isArray(result?.data)) {
    data = result.data;
  }

  return {
    success: result?.success !== false,
    data,
    message: result?.message || "",
  };
};

// ============================================================
// CREATE PAKET
// ============================================================

export const createPaket = async (
  data: any,
  token?: string
) => {
  const url = `${API_URL}/paket`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",

      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
    },
    body: JSON.stringify(data),
  });

  return await parseResponse(response);
};

// ============================================================
// UPDATE PAKET
// ============================================================

export const updatePaket = async (
  id: string,
  data: any,
  token?: string
) => {
  if (!id) {
    throw new Error("ID paket tidak ditemukan");
  }

  const url = `${API_URL}/paket/${id}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",

      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
    },
    body: JSON.stringify(data),
  });

  return await parseResponse(response);
};

// ============================================================
// DELETE PAKET
// ============================================================

export const deletePaket = async (
  id: string,
  token?: string
) => {
  if (!id) {
    throw new Error("ID paket tidak ditemukan");
  }

  const url = `${API_URL}/paket/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",

      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
    },
  });

  return await parseResponse(response);
};