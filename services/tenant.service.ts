const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * ==========================================
 * REGISTER TENANT / SEKOLAH
 * ==========================================
 *
 * Digunakan pada:
 * /onboarding/school
 *
 * POST:
 * /api/v1/tenant/register
 */
export async function registerTenant(data: {
  paketId: string | number;
  nama: string;
  namaSekolah: string;
  jenjang: string;
  subdomain: string;
  email: string;
  teleponSekolah: string;
  alamatSekolah: string;
  kataSandi: string;
  logo?: string;
}) {
  if (!API_URL) {
    throw new Error(
      "NEXT_PUBLIC_API_URL belum dikonfigurasi."
    );
  }

  const response = await fetch(
    `${API_URL}/api/v1/tenant/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.message ||
        "Gagal mendaftarkan sekolah."
    );
  }

  return result;
}

/**
 * ==========================================
 * VERIFY TENANT
 * ==========================================
 *
 * Digunakan pada:
 * /onboarding/verify
 *
 * POST:
 * /api/v1/tenant/verify
 */
export async function verifyTenant(
  email: string,
  kodeOtp: string
) {
  if (!API_URL) {
    throw new Error(
      "NEXT_PUBLIC_API_URL belum dikonfigurasi."
    );
  }

  const response = await fetch(
    `${API_URL}/api/v1/tenant/verify`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        kodeOtp,
      }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.message ||
        "Verifikasi OTP gagal."
    );
  }

  return result;
}

/**
 * ==========================================
 * GET TENANT STATUS
 * ==========================================
 *
 * Digunakan pada:
 * /onboarding/status
 *
 * GET:
 * /api/v1/tenant/status
 */
export async function getTenantStatus() {
  if (!API_URL) {
    throw new Error(
      "NEXT_PUBLIC_API_URL belum dikonfigurasi."
    );
  }

  const token =
    localStorage.getItem("token");

  if (!token) {
    throw new Error(
      "Sesi login tidak ditemukan."
    );
  }

  const response = await fetch(
    `${API_URL}/api/v1/tenant/status`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";

    return null;
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
        "Gagal mengecek status pembayaran."
    );
  }

  return data;
}