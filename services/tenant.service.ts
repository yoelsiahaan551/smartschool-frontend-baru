const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getApiUrl() {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL belum dikonfigurasi.");
  }

  return API_URL;
}

/**
 * ==========================================
 * REGISTER TENANT / SEKOLAH
 * ==========================================
 */
export async function registerTenant(data: {
  paketId: string;
  nama: string;
  namaSekolah: string;
  jenjang: string;
  subdomain: string;
  email: string;
  teleponSekolah: string;
  alamatSekolah: string;
  kataSandi: string;
  logo?: string;
  yayasanId?: string;
}) {
  const response = await fetch(
    `${getApiUrl()}/api/v1/tenant/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  let result: any = null;

  try {
    result = await response.json();
  } catch {
    throw new Error(
      `Server mengembalikan response yang tidak valid. Status: ${response.status}`
    );
  }

  console.log("REGISTER TENANT RESPONSE:", {
    status: response.status,
    ok: response.ok,
    result,
  });

  if (!response.ok) {
    throw new Error(
      result?.message ||
        result?.error ||
        `Gagal mendaftarkan sekolah. Status: ${response.status}`
    );
  }

  return result;
}

/**
 * ==========================================
 * VERIFY TENANT
 * ==========================================
 */
export async function verifyTenant(
  email: string,
  kodeOtp: string
) {
  const response = await fetch(
    `${getApiUrl()}/api/v1/tenant/verify`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        kodeOtp,
      }),
    }
  );

  let result: any = null;

  try {
    result = await response.json();
  } catch {
    throw new Error(
      `Server mengembalikan response yang tidak valid. Status: ${response.status}`
    );
  }

  console.log("VERIFY TENANT RESPONSE:", {
    status: response.status,
    ok: response.ok,
    result,
  });

  if (!response.ok) {
    throw new Error(
      result?.message ||
        result?.error ||
        `Verifikasi OTP gagal. Status: ${response.status}`
    );
  }

  return result;
}

/**
 * ==========================================
 * GET TENANT STATUS
 * ==========================================
 */
export async function getTenantStatus() {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  if (!token) {
    throw new Error("Sesi login tidak ditemukan.");
  }

  const response = await fetch(
    `${getApiUrl()}/api/v1/tenant/status`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  let data: any = null;

  try {
    data = await response.json();
  } catch {
    throw new Error(
      `Server mengembalikan response yang tidak valid. Status: ${response.status}`
    );
  }

  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";

    return null;
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.error ||
        "Gagal mengecek status pembayaran."
    );
  }

  return data;
}