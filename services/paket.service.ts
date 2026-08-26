const API_URL = "http://localhost:5000/api/v1/paket";

// ============================================================
// GET ALL PAKET
// ============================================================
export const getPaket = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      throw new Error(
        errorData?.message || `HTTP Error: ${response.status}`
      );
    }

    const data = await response.json();

    console.log("GET PAKET RESPONSE:", data);

    return data;
  } catch (error: any) {
    console.error("Error get paket:", error.message);

    throw error;
  }
};

// ============================================================
// GET PAKET BY ID
// ============================================================
export const getPaketById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      throw new Error(
        errorData?.message || `HTTP Error: ${response.status}`
      );
    }

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.error("Error get paket by id:", error.message);

    throw error;
  }
};

// ============================================================
// GET FITUR
// ============================================================
export const getFitur = async () => {
  try {
    const response = await fetch(`${API_URL}/fitur/list`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      throw new Error(
        errorData?.message || `HTTP Error: ${response.status}`
      );
    }

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.error("Error get fitur:", error.message);

    throw error;
  }
};

// ============================================================
// CREATE PAKET
// ============================================================
export const createPaket = async (data: any) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      throw new Error(
        errorData?.message || `HTTP Error: ${response.status}`
      );
    }

    const result = await response.json();

    return result;
  } catch (error: any) {
    console.error("Error create paket:", error.message);

    throw error;
  }
};

// ============================================================
// UPDATE PAKET
// ============================================================
export const updatePaket = async (
  id: string,
  data: any
) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      throw new Error(
        errorData?.message || `HTTP Error: ${response.status}`
      );
    }

    const result = await response.json();

    return result;
  } catch (error: any) {
    console.error("Error update paket:", error.message);

    throw error;
  }
};

// ============================================================
// DELETE PAKET
// ============================================================
export const deletePaket = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      throw new Error(
        errorData?.message || `HTTP Error: ${response.status}`
      );
    }

    const result = await response.json();

    return result;
  } catch (error: any) {
    console.error("Error delete paket:", error.message);

    throw error;
  }
};