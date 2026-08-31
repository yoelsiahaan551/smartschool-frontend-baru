const API_URL = "http://localhost:5000/api/v1/paket";

// ============================================================
// HELPER RESPONSE
// ============================================================
async function parseResponse(response) {
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
// GET ALL PAKET
// ============================================================
export const getPaket = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const result = await parseResponse(response);

  console.log("GET PAKET RESPONSE:", result);

  return result;
};

// ============================================================
// GET PAKET BY ID
// ============================================================
export const getPaketById = async (id) => {
  if (!id) {
    throw new Error("ID paket tidak ditemukan.");
  }

  const response = await fetch(`${API_URL}/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const result = await parseResponse(response);

  console.log("GET PAKET BY ID RESPONSE:", result);

  return result;
};

// ============================================================
// GET SEMUA FITUR / MODUL
// ============================================================
export const getFitur = async () => {
  const response = await fetch(`${API_URL}/fitur/list`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const result = await parseResponse(response);

  console.log("GET FITUR RESPONSE:", result);

  return result;
};

// ============================================================
// CREATE PAKET
// ============================================================
export const createPaket = async (data) => {
  console.log("CREATE PAKET PAYLOAD:", data);

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await parseResponse(response);

  console.log("CREATE PAKET RESPONSE:", result);

  return result;
};

// ============================================================
// UPDATE PAKET
// ============================================================
export const updatePaket = async (id, data) => {
  if (!id) {
    throw new Error("ID paket tidak ditemukan.");
  }

  console.log("UPDATE PAKET ID:", id);
  console.log("UPDATE PAKET PAYLOAD:", data);

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await parseResponse(response);

  console.log("UPDATE PAKET RESPONSE:", result);

  return result;
};

// ============================================================
// DELETE PAKET
// ============================================================
export const deletePaket = async (id) => {
  if (!id) {
    throw new Error("ID paket tidak ditemukan.");
  }

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
  });

  const result = await parseResponse(response);

  console.log("DELETE PAKET RESPONSE:", result);

  return result;
};