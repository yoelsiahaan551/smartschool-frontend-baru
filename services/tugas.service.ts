import { apiFetch } from "../lib/api";

/**
 * Ambil kelas-mapel yang diampu guru login
 */
export async function getKelasMapelGuru() {
  return apiFetch("/api/kelas-mapel");
}

/**
 * Ambil tugas berdasarkan kelas-mapel
 */
export async function getTugasByKelasMapel(kelasMapelId) {
  if (!kelasMapelId) {
    throw new Error("kelasMapelId wajib diisi");
  }

  return apiFetch(
    `/api/v1/tugas/kelas-mapel/${kelasMapelId}`
  );
}

/**
 * Ambil pengumpulan siswa dari sebuah tugas
 */
export async function getPengumpulanByTugas(tugasId) {
  if (!tugasId) {
    throw new Error("ID tugas wajib diisi");
  }

  return apiFetch(
    `/api/v1/tugas/${tugasId}/pengumpulan`
  );
}

/**
 * Simpan nilai tugas siswa
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
      body: JSON.stringify({
        nilai: Number(data.nilai),
        keterangan: data.keterangan ?? null,
      }),
    }
  );
}

/**
 * Ambil semua tugas guru.
 *
 * Alur:
 * kelas-mapel guru
 * -> tugas setiap kelas-mapel
 */
export async function getTugasGuru() {
  const responseKelasMapel =
    await getKelasMapelGuru();

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
        const responseTugas =
          await getTugasByKelasMapel(
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

          kelasMapelId: kelasMapel.id,

          kelas:
            kelasMapel.kelas ?? null,

          mataPelajaran:
            kelasMapel.mataPelajaran ?? null,

          guruPengajar:
            kelasMapel.guruPengajar ?? null,

          kelasNama:
            kelasMapel?.kelas?.nama ??
            kelasMapel?.kelas?.namaKelas ??
            "-",

          mapelNama:
            kelasMapel?.mataPelajaran?.nama ??
            kelasMapel?.mataPelajaran?.namaMapel ??
            kelasMapel?.mataPelajaran
              ?.nama_mata_pelajaran ??
            "-",

          guruNama:
            kelasMapel?.guruPengajar?.namaLengkap ??
            "-",

          jumlahPengumpulan:
            tugas?._count
              ?.pengumpulanTugasSiswa ??
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