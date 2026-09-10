import { apiFetch } from "../lib/api";

const ENDPOINT = "/api/v1/jalur-ppdb";

export interface JalurPpdb {
  id: string;
  sekolahId: string;
  nama: string;
  deskripsi?: string | null;
  kuota: number;
  tanggalMulai?: string | null;
  tanggalSelesai?: string | null;
  status: string;
  dibuatPada?: string;
  diperbaruiPada?: string;
}

export interface JalurPpdbPayload {
  nama: string;
  deskripsi?: string;
  kuota: number;
  tanggalMulai?: string;
  tanggalSelesai?: string;
  status?: string;
}

export interface JalurPpdbResponse {
  success: boolean;
  message?: string;
  data: JalurPpdb;
}

export interface JalurPpdbListResponse {
  success: boolean;
  message?: string;
  data: JalurPpdb[];
}

/**
 * GET semua jalur PPDB
 */
export async function getJalurPpdb(): Promise<JalurPpdbListResponse> {
  return apiFetch(ENDPOINT, {
    method: "GET",
  });
}

/**
 * GET detail jalur PPDB
 */
export async function getJalurPpdbById(
  id: string
): Promise<JalurPpdbResponse> {
  return apiFetch(`${ENDPOINT}/${id}`, {
    method: "GET",
  });
}

/**
 * POST tambah jalur PPDB
 */
export async function createJalurPpdb(
  payload: JalurPpdbPayload
): Promise<JalurPpdbResponse> {
  return apiFetch(ENDPOINT, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * PUT edit jalur PPDB
 */
export async function updateJalurPpdb(
  id: string,
  payload: Partial<JalurPpdbPayload>
): Promise<JalurPpdbResponse> {
  return apiFetch(`${ENDPOINT}/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

/**
 * DELETE / soft delete jalur PPDB
 */
export async function deleteJalurPpdb(
  id: string
) {
  return apiFetch(`${ENDPOINT}/${id}`, {
    method: "DELETE",
  });
}