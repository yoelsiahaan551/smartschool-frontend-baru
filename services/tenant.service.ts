const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getApiUrl() {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL belum dikonfigurasi.");
  }

  return API_URL.replace(/\/$/, "");
}



async function parseResponse(response: Response) {
  const text = await response.text();

  let result: any = null;

  try {
    result = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(
      `Server mengembalikan response yang tidak valid. Status: ${response.status}`
    );
  }

  console.log("========== API RESPONSE ==========");
  console.log("STATUS:", response.status);
  console.log("OK:", response.ok);
  console.log("RESULT:", result);
  console.log("=================================");

  if (!response.ok) {
    throw new Error(
      result?.message ||
        result?.error ||
        `Request gagal. Status: ${response.status}`
    );
  }

  return result;
}



export interface RegisterTenantData {
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
}

export async function registerTenant(
  data: RegisterTenantData
) {
  const response = await fetch(
    `${getApiUrl()}/api/v1/tenant/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        paketId: data.paketId,
        nama: data.nama.trim(),
        namaSekolah: data.namaSekolah.trim(),
        jenjang: data.jenjang,
        subdomain: data.subdomain
          .trim()
          .toLowerCase(),
        email: data.email
          .trim()
          .toLowerCase(),
        teleponSekolah:
          data.teleponSekolah.trim(),
        alamatSekolah:
          data.alamatSekolah.trim(),
        kataSandi: data.kataSandi,

        ...(data.logo?.trim()
          ? {
              logo: data.logo.trim(),
            }
          : {}),

        ...(data.yayasanId
          ? {
              yayasanId: data.yayasanId,
            }
          : {}),
      }),
    }
  );

  return parseResponse(response);
}



export interface VerifyTenantResponse {
  success: boolean;
  message: string;
  data?: {
    payment_url?: string;
    is_trial?: boolean;
  };
}

export async function verifyTenant(
  email: string,
  kodeOtp: string
): Promise<VerifyTenantResponse> {
  const response = await fetch(
    `${getApiUrl()}/api/v1/tenant/verify`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email
          .trim()
          .toLowerCase(),
        kodeOtp: kodeOtp.trim(),
      }),
    }
  );

  return parseResponse(response);
}