"use client";

import { useEffect, useState } from "react";
import {
  Check,
  ArrowRight,
  Loader2,
  ShieldCheck,
  Zap,
  Rocket,
  Sparkles,
  Crown,
} from "lucide-react";

import { getPaket } from "../../../services/paket.service";

export default function PricingSection() {
  const [paket, setPaket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================================
  // AMBIL DATA PAKET
  // ============================================================

  useEffect(() => {
    let mounted = true;

    async function loadPaket() {
      try {
        setLoading(true);
        setError("");

        const response = await getPaket();

        console.log("=================================");
        console.log("DATA PAKET DARI BACKEND:");
        console.log(response);
        console.log("=================================");

        if (!mounted) return;

        /*
         * Support beberapa bentuk response:
         *
         * 1. { success: true, data: [...] }
         * 2. { data: [...] }
         * 3. [...]
         */

        let data = [];

        if (Array.isArray(response)) {
          data = response;
        } else if (Array.isArray(response?.data)) {
          data = response.data;
        }

        console.log("DATA PAKET SETELAH NORMALISASI:", data);

        /*
         * Normalisasi data paket supaya frontend
         * tetap bisa menampilkan fitur walaupun BE
         * mengirim "paketModul".
         */
        const normalizedData = data.map((item) => {
          let fitur = [];

          // Kalau backend sudah mengirim fitur
          if (Array.isArray(item?.fitur)) {
            fitur = item.fitur;
          }

          // Kalau backend mengirim paketModul
          else if (Array.isArray(item?.paketModul)) {
            fitur = item.paketModul
              .map((paketModul) => {
                /*
                 * Kemungkinan struktur:
                 * paketModul.modul
                 */
                if (paketModul?.modul) {
                  return {
                    id: paketModul.modul.id,
                    nama:
                      paketModul.modul.nama ||
                      paketModul.modul.name ||
                      "Fitur",
                  };
                }

                /*
                 * Kemungkinan langsung:
                 * paketModul.nama
                 */
                if (paketModul?.nama) {
                  return {
                    id: paketModul.id,
                    nama: paketModul.nama,
                  };
                }

                return null;
              })
              .filter(Boolean);
          }

          return {
            ...item,
            fitur,
          };
        });

        console.log(
          "DATA PAKET FINAL UNTUK CARD:",
          normalizedData
        );

        setPaket(normalizedData);

        if (normalizedData.length === 0) {
          setError("Belum ada paket yang tersedia.");
        }
      } catch (err) {
        console.error("GAGAL MENGAMBIL PAKET:", err);

        if (!mounted) return;

        setPaket([]);

        setError(
          err?.message ||
            "Gagal mengambil data paket. Pastikan backend sedang berjalan."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadPaket();

    return () => {
      mounted = false;
    };
  }, []);

  // ============================================================
  // FORMAT RUPIAH
  // ============================================================

  function formatRupiah(value) {
    if (
      value === undefined ||
      value === null ||
      value === ""
    ) {
      return "Rp0";
    }

    const number = Number(value);

    if (Number.isNaN(number)) {
      return "Rp0";
    }

    if (number === 0) {
      return "Gratis";
    }

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(number);
  }

  // ============================================================
  // PILIH PAKET
  // ============================================================

  function handlePilihPaket(item) {
    try {
      sessionStorage.setItem(
        "selected_paket_id",
        String(item.id)
      );

      sessionStorage.setItem(
        "selected_paket",
        JSON.stringify(item)
      );
    } catch (err) {
      console.error(
        "Gagal menyimpan paket:",
        err
      );
    }

    window.location.href =
      `/onboarding/school?paketId=${encodeURIComponent(
        item.id
      )}`;
  }

  // ============================================================
  // THEME CARD
  // ============================================================

  const cardThemes = [
    {
      wrapper:
        "from-[#1c2b43] via-[#142038] to-[#09111f]",

      border:
        "border-white/[0.10] hover:border-blue-300/30",

      icon:
        "border-blue-200/15 bg-blue-300/[0.08] text-blue-200",

      button:
        "bg-white text-[#142038] hover:bg-blue-50",

      check:
        "bg-blue-300/[0.10] text-blue-200",

      glow:
        "bg-blue-500/20",
    },

    {
      wrapper:
        "from-[#3b82f6] via-[#2563eb] to-[#1d4ed8]",

      border:
        "border-blue-200/30 hover:border-blue-100/60",

      icon:
        "border-white/20 bg-white/[0.12] text-white",

      button:
        "bg-white text-[#1d4ed8] hover:bg-blue-50",

      check:
        "bg-white/[0.12] text-white",

      glow:
        "bg-blue-400/30",
    },

    {
      wrapper:
        "from-[#1769aa] via-[#0f5b8d] to-[#073b5c]",

      border:
        "border-blue-100/20 hover:border-blue-100/50",

      icon:
        "border-blue-100/15 bg-blue-100/[0.08] text-blue-100",

      button:
        "bg-white text-[#0f5b8d] hover:bg-blue-50",

      check:
        "bg-blue-100/[0.10] text-blue-100",

      glow:
        "bg-blue-700/25",
    },

    {
      wrapper:
        "from-[#294f7c] via-[#1b3d69] to-[#0e2748]",

      border:
        "border-blue-100/15 hover:border-blue-100/40",

      icon:
        "border-blue-100/10 bg-blue-100/[0.07] text-blue-100",

      button:
        "bg-white text-[#183b68] hover:bg-blue-50",

      check:
        "bg-blue-100/[0.08] text-blue-100",

      glow:
        "bg-blue-800/25",
    },
  ];

  // ============================================================
  // MAIN
  // ============================================================

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#f8fafc]
        py-20
        md:py-28
      "
    >
      {/* ========================================================
          BACKGROUND
          ======================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            -left-52
            top-10
            h-[500px]
            w-[500px]
            animate-pulse
            rounded-full
            bg-blue-200/25
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            -right-52
            top-[35%]
            h-[500px]
            w-[500px]
            animate-pulse
            rounded-full
            bg-slate-300/30
            blur-[120px]
            [animation-delay:1.5s]
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-[45%]
            h-[400px]
            w-[700px]
            -translate-x-1/2
            rounded-full
            bg-blue-100/30
            blur-[130px]
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-0
            h-[280px]
            w-[650px]
            -translate-x-1/2
            rounded-full
            bg-white
            blur-[100px]
          "
        />
      </div>

      {/* ========================================================
          CONTENT
          ======================================================== */}

      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-5
          sm:px-6
          lg:px-8
        "
      >
        {/* ======================================================
            HEADER
            ====================================================== */}

        <div
          className="
            mx-auto
            max-w-3xl
            text-center
          "
        >
          <div
            className="
              mb-6
              flex
              justify-center
            "
          >
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-blue-200
                bg-white/90
                px-4
                py-2
                text-xs
                font-bold
                text-blue-700
                shadow-sm
                shadow-blue-100
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-blue-300
                hover:shadow-lg
                hover:shadow-blue-100
              "
            >
              <Sparkles
                size={14}
                className="text-blue-600"
              />

              Solusi Digital Sekolah
            </div>
          </div>

          <h2
            className="
              text-4xl
              font-black
              tracking-[-0.045em]
              text-[#0b1220]
              sm:text-5xl
              lg:text-6xl
            "
          >
            Pilih Paket untuk

            <span
              className="
                mt-2
                block
                bg-gradient-to-r
                from-[#172554]
                via-[#2563eb]
                to-[#1e40af]
                bg-clip-text
                text-transparent
              "
            >
              Digitalisasi Sekolah
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-sm
              leading-7
              text-slate-500
              sm:text-base
            "
          >
            Kelola akademik, administrasi, dan operasional
            sekolah melalui satu ekosistem digital yang
            modern, terintegrasi, dan siap digunakan.
          </p>
        </div>

        {/* ======================================================
            TRUST BADGES
            ====================================================== */}

        <div
          className="
            mt-9
            flex
            flex-wrap
            items-center
            justify-center
            gap-3
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
              rounded-full
              border
              border-slate-200
              bg-white/90
              px-4
              py-2
              text-xs
              font-semibold
              text-slate-600
              shadow-sm
              backdrop-blur
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-blue-200
              hover:shadow-md
            "
          >
            <ShieldCheck
              size={15}
              className="text-blue-600"
            />

            Data Terintegrasi
          </div>

          <div
            className="
              flex
              items-center
              gap-2
              rounded-full
              border
              border-slate-200
              bg-white/90
              px-4
              py-2
              text-xs
              font-semibold
              text-slate-600
              shadow-sm
              backdrop-blur
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-blue-200
              hover:shadow-md
            "
          >
            <Zap
              size={15}
              className="text-blue-600"
            />

            Implementasi Mudah
          </div>

          <div
            className="
              flex
              items-center
              gap-2
              rounded-full
              border
              border-slate-200
              bg-white/90
              px-4
              py-2
              text-xs
              font-semibold
              text-slate-600
              shadow-sm
              backdrop-blur
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-blue-200
              hover:shadow-md
            "
          >
            <Check
              size={15}
              className="text-blue-600"
            />

            Paket Fleksibel
          </div>
        </div>

        {/* ======================================================
            LOADING
            ====================================================== */}

        {loading && (
          <div
            className="
              mt-16
              flex
              justify-center
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-6
                py-4
                shadow-lg
                shadow-slate-200/50
              "
            >
              <Loader2
                size={19}
                className="
                  animate-spin
                  text-blue-600
                "
              />

              <span
                className="
                  text-sm
                  font-medium
                  text-slate-500
                "
              >
                Memuat paket...
              </span>
            </div>
          </div>
        )}

        {/* ======================================================
            ERROR
            ====================================================== */}

        {!loading && error && (
          <div
            className="
              mx-auto
              mt-16
              max-w-xl
              rounded-2xl
              border
              border-red-200
              bg-red-50
              px-6
              py-5
              text-center
              shadow-sm
            "
          >
            <p
              className="
                text-sm
                font-semibold
                text-red-600
              "
            >
              {error}
            </p>
          </div>
        )}

        {/* ======================================================
            PRICING CARDS
            ====================================================== */}

        {!loading &&
          !error &&
          paket.length > 0 && (
            <div
              className="
                mt-20
                grid
                grid-cols-1
                gap-8
                md:grid-cols-2
                lg:grid-cols-3
                lg:items-stretch
              "
            >
              {paket.map((item, index) => {
                const theme =
                  cardThemes[
                    index % cardThemes.length
                  ];

                const featuredIndex =
                  paket.length >= 3 ? 1 : 0;

                const isFeatured =
                  index === featuredIndex;

                const fitur =
                  Array.isArray(item.fitur)
                    ? item.fitur
                    : [];

                return (
                  <div
                    key={item.id || index}
                    className={`
                      group
                      relative
                      ${
                        isFeatured
                          ? "lg:-translate-y-4"
                          : ""
                      }
                    `}
                  >
                    {/* GLOW */}

                    <div
                      className={`
                        pointer-events-none
                        absolute
                        -inset-3
                        rounded-[36px]
                        ${theme.glow}
                        opacity-20
                        blur-2xl
                        transition-all
                        duration-700
                        group-hover:opacity-40
                        group-hover:blur-3xl
                      `}
                    />

                    {/* BADGE */}

                    {isFeatured && (
                      <div
                        className="
                          absolute
                          -top-4
                          left-1/2
                          z-30
                          -translate-x-1/2
                        "
                      >
                        <div
                          className="
                            flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-blue-300/30
                            bg-[#0f172a]
                            px-5
                            py-2
                            text-[10px]
                            font-black
                            uppercase
                            tracking-[0.15em]
                            text-white
                            shadow-[0_12px_35px_rgba(15,23,42,0.35)]
                          "
                        >
                          <Crown
                            size={13}
                            className="text-blue-300"
                          />

                          Paling Populer
                        </div>
                      </div>
                    )}

                    {/* CARD */}

                    <div
                      className={`
                        relative
                        flex
                        min-h-[620px]
                        h-full
                        flex-col
                        overflow-hidden
                        rounded-[30px]
                        border
                        bg-gradient-to-br
                        ${theme.wrapper}
                        ${theme.border}
                        p-7
                        shadow-[0_25px_70px_rgba(15,23,42,0.20)]
                        transition-all
                        duration-500
                        ease-out
                        hover:-translate-y-3
                        hover:shadow-[0_35px_90px_rgba(15,23,42,0.28)]
                        sm:p-8
                      `}
                    >
                      {/* TOP SHINE */}

                      <div
                        className="
                          pointer-events-none
                          absolute
                          left-1/2
                          top-0
                          h-40
                          w-[75%]
                          -translate-x-1/2
                          rounded-full
                          bg-white/[0.07]
                          blur-[70px]
                          transition-all
                          duration-700
                          group-hover:bg-white/[0.11]
                        "
                      />

                      {/* TOP BORDER */}

                      <div
                        className="
                          pointer-events-none
                          absolute
                          left-1/2
                          top-0
                          h-px
                          w-[65%]
                          -translate-x-1/2
                          bg-gradient-to-r
                          from-transparent
                          via-white/30
                          to-transparent
                        "
                      />

                      {/* DECORATION */}

                      <div
                        className="
                          pointer-events-none
                          absolute
                          -right-20
                          -top-20
                          h-48
                          w-48
                          rounded-full
                          border
                          border-white/[0.10]
                          bg-white/[0.025]
                          transition-transform
                          duration-700
                          group-hover:scale-110
                        "
                      />

                      <div
                        className="
                          pointer-events-none
                          absolute
                          -right-8
                          -top-8
                          h-28
                          w-28
                          rounded-full
                          border
                          border-white/[0.07]
                        "
                      />

                      <div
                        className="
                          pointer-events-none
                          absolute
                          -bottom-24
                          -left-24
                          h-56
                          w-56
                          rounded-full
                          border
                          border-white/[0.08]
                          bg-white/[0.02]
                        "
                      />

                      {/* HEADER */}

                      <div
                        className="
                          relative
                          z-10
                          flex
                          items-start
                          justify-between
                        "
                      >
                        <div>
                          <p
                            className="
                              mb-2
                              text-[10px]
                              font-bold
                              uppercase
                              tracking-[0.22em]
                              text-white/40
                            "
                          >
                            SmartSchool
                          </p>

                          <h3
                            className="
                              text-2xl
                              font-black
                              tracking-tight
                              text-white
                            "
                          >
                            {item.nama ||
                              "Paket SmartSchool"}
                          </h3>
                        </div>

                        <div
                          className={`
                            flex
                            h-12
                            w-12
                            shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            backdrop-blur-md
                            transition-all
                            duration-500
                            group-hover:-translate-y-1
                            group-hover:rotate-3
                            group-hover:scale-110
                            ${theme.icon}
                          `}
                        >
                          {isFeatured ? (
                            <Crown size={21} />
                          ) : (
                            <Rocket size={21} />
                          )}
                        </div>
                      </div>

                      {/* PRICE */}

                      <div
                        className="
                          relative
                          z-10
                          mt-8
                        "
                      >
                        <p
                          className="
                            text-4xl
                            font-black
                            tracking-[-0.045em]
                            text-white
                            transition-transform
                            duration-500
                            group-hover:translate-x-1
                            sm:text-5xl
                          "
                        >
                          {formatRupiah(
                            item.harga
                          )}
                        </p>

                        {item.durasi && (
                          <div
                            className="
                              mt-3
                              inline-flex
                              rounded-full
                              border
                              border-white/[0.09]
                              bg-white/[0.06]
                              px-3
                              py-1
                              text-[10px]
                              font-medium
                              text-white/60
                            "
                          >
                            Durasi {item.durasi} hari
                          </div>
                        )}
                      </div>

                      {/* DESCRIPTION */}

                      <p
                        className="
                          relative
                          z-10
                          mt-6
                          min-h-[84px]
                          text-sm
                          leading-6
                          text-white/60
                        "
                      >
                        {item.deskripsi ||
                          "Paket digitalisasi sekolah untuk mendukung kebutuhan akademik dan operasional secara terintegrasi."}
                      </p>

                      {/* BUTTON */}

                      <button
                        type="button"
                        onClick={() =>
                          handlePilihPaket(item)
                        }
                        className={`
                          relative
                          z-10
                          mt-6
                          flex
                          w-full
                          items-center
                          justify-center
                          gap-2
                          rounded-2xl
                          px-5
                          py-3.5
                          text-sm
                          font-black
                          shadow-lg
                          shadow-black/10
                          transition-all
                          duration-300
                          hover:-translate-y-1
                          hover:shadow-xl
                          active:scale-[0.97]
                          ${theme.button}
                        `}
                      >
                        {Number(item.harga) === 0
                          ? "Mulai Uji Coba"
                          : "Pilih Paket"}

                        <ArrowRight
                          size={17}
                          className="
                            transition-transform
                            duration-300
                            group-hover:translate-x-1
                          "
                        />
                      </button>

                      {/* DIVIDER */}

                      <div
                        className="
                          relative
                          z-10
                          my-7
                          h-px
                          bg-gradient-to-r
                          from-transparent
                          via-white/10
                          to-transparent
                        "
                      />

                      {/* FEATURES */}

                      <div
                        className="
                          relative
                          z-10
                          flex-1
                        "
                      >
                        <p
                          className="
                            text-[10px]
                            font-black
                            uppercase
                            tracking-[0.2em]
                            text-white/35
                          "
                        >
                          Fitur yang tersedia
                        </p>

                        <div
                          className="
                            mt-5
                            space-y-3.5
                          "
                        >
                          {fitur.length > 0 ? (
                            fitur.map(
                              (fiturItem, fiturIndex) => (
                                <div
                                  key={
                                    fiturItem?.id ||
                                    `${item.id}-${fiturIndex}`
                                  }
                                  className="
                                    flex
                                    items-start
                                    gap-3
                                    transition-all
                                    duration-300
                                    hover:translate-x-1
                                  "
                                >
                                  <div
                                    className={`
                                      mt-0.5
                                      flex
                                      h-5
                                      w-5
                                      shrink-0
                                      items-center
                                      justify-center
                                      rounded-full
                                      ${theme.check}
                                    `}
                                  >
                                    <Check
                                      size={11}
                                      strokeWidth={3}
                                    />
                                  </div>

                                  <span
                                    className="
                                      text-sm
                                      leading-5
                                      text-white/70
                                    "
                                  >
                                    {fiturItem?.nama ||
                                      fiturItem?.name ||
                                      "Fitur tersedia"}
                                  </span>
                                </div>
                              )
                            )
                          ) : (
                            <p
                              className="
                                text-sm
                                text-white/35
                              "
                            >
                              Fitur paket belum tersedia.
                            </p>
                          )}
                        </div>
                      </div>

                      {/* BOTTOM */}

                      <div
                        className="
                          relative
                          z-10
                          mt-7
                          flex
                          items-center
                          gap-2
                          text-[11px]
                          font-semibold
                          text-white/35
                        "
                      >
                        <ShieldCheck size={14} />

                        Sistem aman & terintegrasi
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        {/* ======================================================
            CONSULTATION
            ====================================================== */}

        <div
          className="
            mt-16
            text-center
          "
        >
          <p
            className="
              text-sm
              text-slate-500
            "
          >
            Masih bingung menentukan paket?
          </p>

          <button
            type="button"
            className="
              mt-3
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-slate-200
              bg-white
              px-5
              py-2.5
              text-sm
              font-bold
              text-slate-700
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-blue-200
              hover:text-blue-700
              hover:shadow-lg
              hover:shadow-blue-100
              active:scale-95
            "
          >
            Konsultasi dengan tim kami

            <ArrowRight
              size={15}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </button>
        </div>
      </div>
    </section>
  );
}

