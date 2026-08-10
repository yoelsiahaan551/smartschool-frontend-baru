"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import {
    CheckCircle,
    Clock,
    FileText,
    HelpCircle,
    Mail,
    Upload,
    User,
    Building2,
    Calendar,
    AlertCircle,
    Check,
    Loader2,
} from "lucide-react";

const poppins = Poppins({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
    display: "swap",
});

// ========== Komponen Pembantu ==========

const HelpButton = () => (
    <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-slate-200/50">
        <HelpCircle className="w-4 h-4 text-blue-400" />
        <span className="text-sm text-slate-500">Butuh bantuan?</span>
        <a
            href="mailto:admin@portalpelanggan.id"
            className="text-blue-500 font-medium hover:text-blue-600 transition-colors"
        >
            admin@portalpelanggan.id
        </a>
    </div>
);

const ProgressSteps = () => {
    const steps = [
        { label: "Pendaftaran", icon: CheckCircle, active: true },
        { label: "Menunggu", icon: Clock, active: true },
        { label: "Verifikasi", icon: User, active: false },
        { label: "Akun aktif", icon: Check, active: false },
    ];

    return (
        <div className="flex items-center justify-between max-w-md mx-auto">
            {steps.map((step, index, arr) => (
                <div key={index} className="flex items-center">
                    <div className="flex flex-col items-center">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                step.active
                                    ? "bg-blue-400 text-white shadow-lg shadow-blue-300/30"
                                    : "bg-slate-100 text-slate-400"
                            }`}
                        >
                            <step.icon className="w-5 h-5" />
                        </div>
                        <span
                            className={`text-xs font-medium mt-1.5 text-center ${
                                step.active ? "text-slate-700" : "text-slate-400"
                            }`}
                        >
                            {step.label}
                        </span>
                    </div>
                    {index < arr.length - 1 && (
                        <div
                            className={`w-8 sm:w-12 h-0.5 mx-1 sm:mx-2 ${
                                index < 1 ? "bg-blue-400" : "bg-slate-200"
                            }`}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

// ========== Komponen Jam & Tanggal ==========

const ClockDisplay = ({ time, date, day }) => {
    const [hours, minutes] = time.split(".");

    return (
        <div className="flex flex-col items-end gap-0.5">
            {/* Baris pertama: jam */}
            <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight text-slate-800 font-mono tabular-nums">
                    {hours}
                </span>
                <span className="text-2xl font-light text-slate-400">.</span>
                <span className="text-3xl font-bold tracking-tight text-slate-800 font-mono tabular-nums">
                    {minutes}
                </span>
                <span className="text-sm font-medium text-slate-400 ml-1">WIB</span>
            </div>
            {/* Baris kedua: hari dan tanggal */}
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <span className="font-bold text-slate-700">{day}</span>
                <span className="text-slate-400">•</span>
                <span>{date}</span>
            </div>
        </div>
    );
};

// ========== Komponen Utama ==========

export default function CustomerPortal() {
    const [isUploading, setIsUploading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    const [currentTime, setCurrentTime] = useState(null);

    useEffect(() => {
        setCurrentTime(new Date());
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleUpload = () => {
        setIsUploading(true);
        setTimeout(() => {
            setIsUploading(false);
            setIsUploaded(true);
        }, 2000);
    };

    const formattedTime = currentTime
        ? currentTime
            .toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            })
            .replace(":", ".")
        : "";

    const formattedDate = currentTime
        ? currentTime.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
        : "";

    const formattedDay = currentTime
        ? currentTime
            .toLocaleDateString("id-ID", { weekday: "long" })
            .toUpperCase()
        : "";

    return (
        <div className={`${poppins.className} min-h-screen bg-white`}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
                {/* ===== HEADER ===== */}
                <header className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-7">
                    {/* Logo & Judul - kiri */}
                    <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                            <Image
                                src="/logo/logoSS.png"
                                alt="Logo Portal Pelanggan"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-800">
                                Portal Pelanggan
                            </h1>
                            <p className="text-sm text-slate-400 font-medium tracking-wide -mt-0.5">
                                SAAS SISTEM INFORMASI SEKOLAH
                            </p>
                        </div>
                    </div>

                    {/* Kanan: Jam + Bantuan */}
                    <div className="flex flex-col items-end gap-2">
                        {currentTime && (
                            <ClockDisplay
                                time={formattedTime}
                                date={formattedDate}
                                day={formattedDay}
                            />
                        )}
                        <HelpButton />
                    </div>
                </header>

                {/* ===== KARTU UTAMA ===== */}
                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-200/50 overflow-hidden transition-all hover:shadow-2xl hover:shadow-slate-200/60">
                    {/* — Status Header — */}
                    <div className="bg-gradient-to-r from-blue-400 to-indigo-400 px-6 sm:px-8 py-6 sm:py-7">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-3">
                                    <p className="text-blue-50 text-sm font-medium tracking-wide">
                                        STATUS PENDAFTARAN
                                    </p>
                                    <span className="w-px h-5 bg-blue-300/30" />
                                    <div className="flex items-center gap-1.5 text-blue-100/80 text-xs font-mono">
                                        <Clock className="w-3.5 h-3.5 animate-spin-slow" />
                                        <span>{formattedTime || "--.--"}</span>
                                    </div>
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                                    Akun sekolah Anda menunggu aktivasi
                                </h2>
                                <p className="text-blue-50/80 text-sm mt-1.5 max-w-2xl leading-relaxed">
                                    Pendaftaran SMA Harapan Bangsa sudah kami terima. Aktivasi akun akan
                                    berjalan otomatis setelah pembayaran terverifikasi oleh admin —
                                    biasanya 1×24 jam kerja setelah bukti pembayaran diunggah.
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <div className="bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 border border-white/10">
                                    <Clock className="w-4 h-4 text-blue-200 animate-pulse" />
                                    <span className="text-white text-sm font-medium">
                                        Menunggu Aktivasi
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* — Progress Steps — */}
                    <div className="px-6 sm:px-8 pt-6 pb-2 border-b border-slate-200/50">
                        <ProgressSteps />
                    </div>

                    {/* — Body: Tagihan + Aksi — */}
                    <div className="p-6 sm:p-8">
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* Kiri — Rincian Tagihan */}
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-4">
                                    <FileText className="w-5 h-5 text-blue-400" />
                                    <h3 className="text-lg font-semibold text-slate-800">
                                        RINCIAN TAGIHAN
                                    </h3>
                                </div>

                                <div className="bg-slate-50/60 rounded-xl border border-slate-200/50 overflow-hidden">
                                    <div className="divide-y divide-slate-200/50">
                                        <div className="flex items-center justify-between px-4 py-3 hover:bg-white/50 transition-colors">
                                            <span className="text-sm text-slate-500 font-medium">
                                                Kode Tagihan
                                            </span>
                                            <span className="text-sm font-mono font-bold text-slate-800 bg-white px-3 py-1 rounded-md border border-slate-200/50">
                                                SBI - 2025 - 08118
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between px-4 py-3 hover:bg-white/50 transition-colors">
                                            <span className="text-sm text-slate-500 font-medium">
                                                Nama Sekolah
                                            </span>
                                            <span className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                                                <Building2 className="w-4 h-4 text-slate-400" />
                                                SBI Harapan Bangsa
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between px-4 py-3 hover:bg-white/50 transition-colors">
                                            <span className="text-sm text-slate-500 font-medium">
                                                Jumlah Tagihan
                                            </span>
                                            <span className="text-base font-bold text-blue-500">
                                                Rp 2.500.000
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between px-4 py-3 hover:bg-white/50 transition-colors">
                                            <span className="text-sm text-slate-500 font-medium">
                                                Batas Waktu
                                            </span>
                                            <span className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4 text-slate-400" />
                                                17 Agustus 2025
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between px-4 py-3 bg-amber-50/40 hover:bg-amber-50/60 transition-colors">
                                            <span className="text-sm text-slate-500 font-medium">
                                                Status
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-amber-100/80 text-amber-700 border border-amber-200/50">
                                                <AlertCircle className="w-3.5 h-3.5" />
                                                Belum Dibayar
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Kanan — Aksi (tombol rata kanan) */}
                            <div className="lg:w-72 flex-shrink-0">
                                <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-xl border border-blue-200/50 p-6 h-full flex flex-col">
                                    <h4 className="text-sm font-semibold text-slate-700 mb-4">
                                        TINDAKAN
                                    </h4>

                                    <div className="space-y-3 flex-1 flex flex-col items-end">
                                        <button
                                            onClick={handleUpload}
                                            disabled={isUploading || isUploaded}
                                            className={`w-auto min-w-[180px] flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                                                isUploaded
                                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default"
                                                    : "bg-blue-400 text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-300/30 active:scale-[0.98]"
                                            }`}
                                        >
                                            {isUploading ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Mengunggah...
                                                </>
                                            ) : isUploaded ? (
                                                <>
                                                    <Check className="w-5 h-5" />
                                                    Bukti Terunggah
                                                </>
                                            ) : (
                                                <>
                                                    <Upload className="w-5 h-5" />
                                                    Unggah Bukti Pembayaran
                                                </>
                                            )}
                                        </button>

                                        <a
                                            href="mailto:admin@portalpelanggan.id"
                                            className="w-auto min-w-[180px] flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium bg-white border border-slate-200/50 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
                                        >
                                            <Mail className="w-5 h-5" />
                                            Hubungi Admin Sekolah
                                        </a>
                                    </div>

                                    <div className="mt-5 pt-5 border-t border-blue-200/30">
                                        <p className="text-xs text-slate-500 leading-relaxed">
                                            <span className="block font-medium text-slate-600 mb-1">
                                                ℹ️ Informasi
                                            </span>
                                            Halaman ini akan diperbarui otomatis saat status pembayaran
                                            berubah. Jika Anda sudah membayar namun belum berubah dalam
                                            1×24 jam kerja, hubungi{" "}
                                            <a
                                                href="mailto:admin@portalpelanggan.id"
                                                className="text-blue-500 font-medium hover:underline"
                                            >
                                                admin@portalpelanggan.id
                                            </a>{" "}
                                            dengan menyertakan kode tagihan di atas.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===== FOOTER ===== */}
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
                    <p>© 2025 Portal Pelanggan — SAAS Sistem Informasi Sekolah</p>
                    {currentTime && (
                        <div className="flex items-center gap-2 font-mono text-slate-400">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{formattedTime}</span>
                            <span className="text-slate-300">|</span>
                            <span>{formattedDate}</span>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 6s linear infinite;
                }
            `}</style>
        </div>
    );
}