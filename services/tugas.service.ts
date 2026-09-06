import { apiFetch } from "../lib/api";

/**
 * Ambil semua kelas-mapel
 * Endpoint:
 * GET /api/kelas-mapel
 */
export async function getKelasMapelGuru() {
  const response = await apiFetch("/api/kelas-mapel");

  return response;
}

/**
 * Ambil tugas berdasarkan kelas-mapel
 * Endpoint:
 * GET /api/v1/tugas/kelas-mapel/:kelasMapelId
 */
export async function getTugasByKelasMapel(kelasMapelId) {
  if (!kelasMapelId) {
    throw new Error("kelasMapelId wajib diisi");
  }

  const response = await apiFetch(
    `/api/v1/tugas/kelas-mapel/${kelasMapelId}`
  );

  return response;
}

/**
 * Ambil semua tugas yang diampu guru yang sedang login.
 *
 * Alurnya:
 * 1. Ambil kelas-mapel guru
 * 2. Ambil tugas dari setiap kelas-mapel
 * 3. Gabungkan menjadi satu array
 */
export async function getTugasGuru() {
  const responseKelasMapel = await getKelasMapelGuru();

  const kelasMapelData =
    responseKelasMapel?.data?.data ??
    responseKelasMapel?.data ??
    responseKelasMapel ??
    [];

  if (!Array.isArray(kelasMapelData)) {
    return [];
  }

  const hasil = await Promise.all(
    kelasMapelData.map(async (kelasMapel) => {
      try {
        const responseTugas = await getTugasByKelasMapel(
          kelasMapel.id
        );

        const tugasData =
          responseTugas?.data?.data ??
          responseTugas?.data ??
          responseTugas ??
          [];

        if (!Array.isArray(tugasData)) {
          return [];
        }

        return tugasData.map((tugas) => ({
          ...tugas,

          // Informasi kelas-mapel
          kelasMapelId: kelasMapel.id,

          kelas: kelasMapel.kelas,
          mataPelajaran: kelasMapel.mataPelajaran,
          guruPengajar: kelasMapel.guruPengajar,

          // Supaya FE lebih mudah digunakan
          kelasNama:
            kelasMapel?.kelas?.nama ??
            kelasMapel?.kelas?.namaKelas ??
            "-",

          mapelNama:
            kelasMapel?.mataPelajaran?.nama ??
            kelasMapel?.mataPelajaran?.namaMapel ??
            kelasMapel?.mataPelajaran?.nama_mata_pelajaran ??
            "-",

          guruNama:
            kelasMapel?.guruPengajar?.namaLengkap ??
            "-",

          jumlahPengumpulan:
            tugas?._count?.pengumpulanTugasSiswa ??
            tugas?.jumlahPengumpulan ??
            0,
        }));
      } catch (error) {
        console.error(
          `Gagal mengambil tugas kelas-mapel ${kelasMapel.id}:`,
          error
        );

        return [];
      }
    })
  );

  return hasil.flat();
}


/**
 * Detail tugas
 * GET /api/v1/tugas/:id
 */
export async function getDetailTugas(id) {
  if (!id) {
    throw new Error("ID tugas wajib diisi");
  }

  return apiFetch(`/api/v1/tugas/${id}`);
}


/**
 * Buat tugas
 * POST /api/v1/tugas
 */
export async function createTugas(data) {
  return apiFetch("/api/v1/tugas", {
    method: "POST",
    body: JSON.stringify(data),
  });
}


/**
 * Update tugas
 * PUT /api/v1/tugas/:id
 */
export async function updateTugas(id, data) {
  if (!id) {
    throw new Error("ID tugas wajib diisi");
  }

  return apiFetch(`/api/v1/tugas/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}


/**
 * Hapus tugas
 * DELETE /api/v1/tugas/:id
 */
export async function deleteTugas(id) {
  if (!id) {
    throw new Error("ID tugas wajib diisi");
  }

  return apiFetch(`/api/v1/tugas/${id}`, {
    method: "DELETE",
  });
}


/**
 * Ambil pengumpulan siswa
 * GET /api/v1/tugas/:id/pengumpulan
 */
export async function getPengumpulanByTugas(id) {
  if (!id) {
    throw new Error("ID tugas wajib diisi");
  }

  return apiFetch(`/api/v1/tugas/${id}/pengumpulan`);
}


/**
 * Beri nilai tugas
 * PATCH /api/v1/tugas/pengumpulan/:pengumpulanId/nilai
 */
export async function beriNilaiTugas(
  pengumpulanId,
  data
) {
  if (!pengumpulanId) {
    throw new Error("ID pengumpulan wajib diisi");
  }

  return apiFetch(
    `/api/v1/tugas/pengumpulan/${pengumpulanId}/nilai`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    }
  );
}