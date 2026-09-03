const API_URL = "http://localhost:5000/api/v1/yayasan";

// ============================================================
// HELPER RESPONSE
// ============================================================
async function parseResponse(response: Response) {
  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.message ||
        result?.error ||
        `HTTP Error: ${response.status}`
    );
  }

  return result;
}

// ============================================================
// GET SUMMARY YAYASAN
// Endpoint: GET /api/v1/yayasan/summary
// ============================================================
export const getYayasanSummary = async () => {
  const response = await fetch(`${API_URL}/summary`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const result = await parseResponse(response);

  console.log("GET YAYASAN SUMMARY RESPONSE:", result);

  return result;
};

// ============================================================
// GET SEKOLAH BINAAN
// Endpoint: GET /api/v1/yayasan/sekolah
// ============================================================
export const getSekolahBinaan = async () => {
  const response = await fetch(`${API_URL}/sekolah`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const result = await parseResponse(response);

  console.log("GET SEKOLAH BINAAN RESPONSE:", result);

  return result;
};

// ============================================================
// GET DETAIL SEKOLAH BINAAN
// Endpoint: GET /api/v1/yayasan/sekolah/:id
// ============================================================
export const getDetailSekolahBinaan = async (id: string) => {
  if (!id) {
    throw new Error("ID sekolah tidak ditemukan.");
  }

  const response = await fetch(`${API_URL}/sekolah/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const result = await parseResponse(response);

  console.log("GET DETAIL SEKOLAH BINAAN RESPONSE:", result);

  return result;
};