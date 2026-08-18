import { apiFetch } from "../lib/api";

export async function getPaket() {
  return apiFetch("/api/v1/paket");
}

export async function getPaketById(id) {
  return apiFetch(`/api/v1/paket/${id}`);
}

export async function getFitur() {
  return apiFetch("/api/v1/paket/fitur/list");
}