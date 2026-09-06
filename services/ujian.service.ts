import { apiFetch } from "../lib/api";

export interface Ujian {
  id: string;
  kelasMapelId: string;
  judul: string;
  deskripsi?: string | null;
  jenis: string;
  durasi: number;
  waktuMulai?: string | null;
  waktuSelesai?: string | null;
  nilaiKelulusan?: number | null;
  dipublikasikan: boolean;
  modeUjian?: string | null;
  penilaianOtomatis?: boolean;

  dibuatPada?: string;
  diperbaruiPada?: string;

  _count?: {
    soalUjian?: number;
    percobaanUjian?: number;
  };

  kelasMapel?: {
    id: string;

    kelas?: {
      id: string;
      nama: string;
      tingkat?: number;
    };

    mataPelajaran?: {
      id: string;
      nama: string;
      kode: string;
    };
  };
}

export interface CreateUjianPayload {
  kelasMapelId: string;
  judul: string;
  deskripsi?: string;
  jenis: string;
  durasi: number;
  waktuMulai?: string | null;
  waktuSelesai?: string | null;
  nilaiKelulusan?: number | null;
  modeUjian?: string;
  dipublikasikan?: boolean;
  penilaianOtomatis?: boolean;
}

export interface UpdateUjianPayload {
  judul?: string;
  deskripsi?: string;
  jenis?: string;
  durasi?: number;
  waktuMulai?: string | null;
  waktuSelesai?: string | null;
  nilaiKelulusan?: number | null;
  dipublikasikan?: boolean;
}

// =====================================================
// GET UJIAN BERDASARKAN KELAS MAPEL
// GET /api/v1/ujian/kelas-mapel/:kelasMapelId
// =====================================================

export async function getUjianByKelasMapel(
  kelasMapelId: string
) {
  if (!kelasMapelId) {
    throw new Error(
      "Kelas mata pelajaran wajib dipilih."
    );
  }

  return apiFetch(
    `/api/v1/ujian/kelas-mapel/${kelasMapelId}`,
    {
      method: "GET",
    }
  );
}



export async function getUjianById(
  id: string
) {
  if (!id) {
    throw new Error(
      "ID ujian tidak ditemukan."
    );
  }

  return apiFetch(
    `/api/v1/ujian/${id}`,
    {
      method: "GET",
    }
  );
}



export async function createUjian(
  payload: CreateUjianPayload
) {
  if (!payload.kelasMapelId) {
    throw new Error(
      "Kelas mata pelajaran wajib dipilih."
    );
  }

  if (!payload.judul?.trim()) {
    throw new Error(
      "Judul ujian wajib diisi."
    );
  }

  if (!payload.jenis) {
    throw new Error(
      "Jenis ujian wajib dipilih."
    );
  }

  if (
    !payload.durasi ||
    payload.durasi <= 0
  ) {
    throw new Error(
      "Durasi ujian harus lebih dari 0 menit."
    );
  }

  return apiFetch(
    "/api/v1/ujian",
    {
      method: "POST",

      body: JSON.stringify({
        ...payload,

        judul:
          payload.judul.trim(),

        deskripsi:
          payload.deskripsi?.trim() ||
          null,

        waktuMulai:
          payload.waktuMulai ||
          null,

        waktuSelesai:
          payload.waktuSelesai ||
          null,

        nilaiKelulusan:
          payload.nilaiKelulusan !==
            undefined &&
          payload.nilaiKelulusan !==
            null
            ? Number(
                payload.nilaiKelulusan
              )
            : null,

        dipublikasikan:
          payload.dipublikasikan ??
          false,

        penilaianOtomatis:
          payload.penilaianOtomatis ??
          true,
      }),
    }
  );
}



export async function updateUjian(
  id: string,
  payload: UpdateUjianPayload
) {
  if (!id) {
    throw new Error(
      "ID ujian tidak ditemukan."
    );
  }

  return apiFetch(
    `/api/v1/ujian/${id}`,
    {
      method: "PUT",

      body: JSON.stringify(
        payload
      ),
    }
  );
}



export async function deleteUjian(
  id: string
) {
  if (!id) {
    throw new Error(
      "ID ujian tidak ditemukan."
    );
  }

  return apiFetch(
    `/api/v1/ujian/${id}`,
    {
      method: "DELETE",
    }
  );
}

