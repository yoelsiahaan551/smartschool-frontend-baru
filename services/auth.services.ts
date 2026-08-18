import { apiFetch } from "../lib/api";

export async function login(identifier, kataSandi) {
  return apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      identifier,
      kataSandi,
    }),
  });
}

export async function verifyLogin(identifier, kodeOtp) {
  return apiFetch("/api/auth/verify-login", {
    method: "POST",
    body: JSON.stringify({
      identifier,
      kodeOtp,
    }),
  });
}

export async function registerAuth(data) {
  return apiFetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function verifyRegister(email, kodeOtp) {
  return apiFetch("/api/auth/verify-register", {
    method: "POST",
    body: JSON.stringify({
      email,
      kodeOtp,
    }),
  });
}

export async function forgotPassword(email) {
  return apiFetch("/api/auth/lupa-kata-sandi", {
    method: "POST",
    body: JSON.stringify({
      email,
    }),
  });
}

export async function resetPassword(data) {
  return apiFetch("/api/auth/atur-ulang-kata-sandi", {
    method: "POST",
    body: JSON.stringify(data),
  });
}