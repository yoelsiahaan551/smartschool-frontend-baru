import { apiFetch } from "../lib/api";



export interface KelasMapel {
  id: string;

  kelasId: string;
  mataPelajaranId: string;
  guruPengajarId: string;

  status?: string;

  dibuatPada?: string;
  diperbaruiPada?: string;
  dihapusPada?: string | null;

  kelas?: {
    id: string;
    nama: string;
    tingkat?: number;
    sekolahId?: string;
  };

  mataPelajaran?: {
    id: string;
    nama: string;
    kode?: string;
    sekolahId?: string;
  };

  guruPengajar?: {
    id: string;
    namaLengkap: string;
    email?: string;
    nip?: string;
    nuptk?: string;
  };
}

export interface CreateKelasMapelPayload {
  kelasId: string;
  mataPelajaranId: string;
  guruPengajarId: string;
}

export interface UpdateKelasMapelPayload {
  kelasId?: string;
  mataPelajaranId?: string;
  guruPengajarId?: string;
}



export async function getKelasMapel(): Promise<KelasMapel[]> {
  const response = await apiFetch("/api/kelas-mapel", {
    method: "GET",
  });

  if (!response.ok) {
    let message = "Gagal mengambil data kelas mapel";

    try {
      const errorData = await response.json();

      message =
        errorData?.message ||
        errorData?.error ||
        message;
    } catch {
      // gunakan message default
    }

    throw new Error(message);
  }

  const result = await response.json();

  /*
    BE mengembalikan:

    {
      success: true,
      message: "...",
      data: [...]
    }
  */

  return Array.isArray(result?.data)
    ? result.data
    : [];
}



export async function getKelasMapelById(
  id: string
): Promise<KelasMapel | null> {
  const data = await getKelasMapel();

  return (
    data.find((item) => item.id === id) || null
  );
}



export async function createKelasMapel(
  payload: CreateKelasMapelPayload
): Promise<KelasMapel> {
  const response = await apiFetch("/api/kelas-mapel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.message ||
        result?.error ||
        "Gagal menambahkan mata pelajaran ke kelas"
    );
  }

  return result?.data;
}



export async function updateKelasMapel(
  id: string,
  payload: UpdateKelasMapelPayload
): Promise<KelasMapel> {
  const response = await apiFetch(
    `/api/kelas-mapel/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.message ||
        result?.error ||
        "Gagal memperbarui data kelas mapel"
    );
  }

  return result?.data;
}



export async function deleteKelasMapel(
  id: string
): Promise<void> {
  const response = await apiFetch(
    `/api/kelas-mapel/${id}`,
    {
      method: "DELETE",
    }
  );

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.message ||
        result?.error ||
        "Gagal menghapus mata pelajaran dari kelas"
    );
  }
}