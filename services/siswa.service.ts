import { apiFetch } from "../lib/api";

export async function createSiswa(data: {
  namaLengkap: string;
  email: string;
  nisn: string;
  nis?: string;
  kelasId: string;
  nik?: string;
  namaAyah?: string;
  pekerjaanAyah?: string;
  namaIbu?: string;
  pekerjaanIbu?: string;
  alamatKtp?: string;
  alamatDomisili?: string;
  kecamatan?: string;
  kelurahan?: string;
  kota?: string;
}) {
  return apiFetch("/api/v1/siswa", {
    method: "POST",
    body: JSON.stringify(data),
  });
}