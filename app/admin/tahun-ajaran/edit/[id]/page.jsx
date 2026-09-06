"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Loader2,
  Save,
} from "lucide-react";

import {
  getTahunAjaran,
  updateTahunAjaran,
} from "../../../../../services/tahunAjaran.service";

export default function EditTahunAjaranPage() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id;

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [nama, setNama] =
    useState("");

  const [semester, setSemester] =
    useState("Ganjil");

  const [status, setStatus] =
    useState("tidak_aktif");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const data =
          await getTahunAjaran();

        const item =
          data.find(
            (row) =>
              row.id === id
          );

        if (!item) {
          throw new Error(
            "Tahun ajaran tidak ditemukan."
          );
        }

        setNama(
          item.nama ?? ""
        );

        setSemester(
          item.semester ??
            "Ganjil"
        );

        setStatus(
          item.status ??
            "tidak_aktif"
        );
      } catch (err) {
        console.error(err);

        setError(
          err instanceof Error
            ? err.message
            : "Gagal mengambil data tahun ajaran."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      load();
    }
  }, [id]);

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    if (!id) {
      return;
    }

    setError("");

    if (!nama.trim()) {
      setError(
        "Nama tahun ajaran wajib diisi."
      );
      return;
    }

    try {
      setSaving(true);

      await updateTahunAjaran(
        id,
        {
          nama: nama.trim(),
          semester,
          status,
        }
      );

      router.replace(
        "/admin/tahun-ajaran"
      );
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Gagal memperbarui tahun ajaran."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
          <Loader2
            size={20}
            className="animate-spin"
          />
          Memuat data...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <button
          type="button"
          onClick={() =>
            router.back()
          }
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft size={17} />
          Kembali
        </button>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
          <div className="border-b border-slate-100 bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <CalendarDays size={22} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Akademik
                </p>

                <h1 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                  Edit Tahun Ajaran
                </h1>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 p-6 sm:p-8"
          >
            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Nama Tahun Ajaran
              </label>

              <input
                type="text"
                value={nama}
                onChange={(e) =>
                  setNama(
                    e.target.value
                  )
                }
                disabled={saving}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Semester
              </label>

              <div className="grid grid-cols-2 gap-3">
                {[
                  "Ganjil",
                  "Genap",
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    disabled={saving}
                    onClick={() =>
                      setSemester(
                        item
                      )
                    }
                    className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
                      semester ===
                      item
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value
                  )
                }
                disabled={saving}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              >
                <option value="tidak_aktif">
                  Tidak Aktif
                </option>

                <option value="aktif">
                  Aktif
                </option>
              </select>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() =>
                  router.back()
                }
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Batal
              </button>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save size={17} />
                    Simpan Perubahan
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}