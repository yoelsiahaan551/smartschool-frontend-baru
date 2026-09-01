const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

const getToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("token");
};

const request = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token = getToken();

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",

        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),

        ...(options.headers || {}),
      },
    }
  );

  let data;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
        "Terjadi kesalahan pada server."
    );
  }

  return data;
};

/**
 * GET semua jadwal mengajar
 */
export const getJadwalMengajar = async (
  params: Record<string, string | number> = {}
) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(
    ([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        query.append(
          key,
          String(value)
        );
      }
    }
  );

  const queryString =
    query.toString();

  return request(
    `/api/jadwal-mengajar${
      queryString
        ? `?${queryString}`
        : ""
    }`
  );
};

/**
 * GET jadwal berdasarkan ID
 */
export const getJadwalMengajarById =
  async (
    id: string | number
  ) => {
    return request(
      `/api/jadwal-mengajar/${id}`
    );
  };

/**
 * POST tambah jadwal
 */
export const createJadwalMengajar =
  async (data: any) => {
    return request(
      `/api/jadwal-mengajar`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  };

/**
 * PUT update jadwal
 */
export const updateJadwalMengajar =
  async (
    id: string | number,
    data: any
  ) => {
    return request(
      `/api/jadwal-mengajar/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
  };

/**
 * DELETE jadwal
 */
export const deleteJadwalMengajar =
  async (
    id: string | number
  ) => {
    return request(
      `/api/jadwal-mengajar/${id}`,
      {
        method: "DELETE",
      }
    );
  };