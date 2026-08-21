// app/guru/jadwal/buat/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Calendar,
    Clock,
    BookOpen,
    Users,
    MapPin,
    Building2,
    ArrowLeft,
    Save,
    RotateCcw,
    Eye,
    ChevronDown,
    CheckCircle,
    AlertCircle,
    Clock as ClockIcon,
    CalendarDays,
    GraduationCap,
    School,
    FileText,
    Sparkles,
    ArrowRight,
    Tag,
    Layers,
    Home,
    Sun,
    Coffee,
    Award,
} from 'lucide-react';

import Sidebar from '../../../../components/Sidebar';
import Header from '../../../../components/Header';

// ============================================================
// DATA DUMMY
// ============================================================
const MOCK_BRANCHES = [
    { id: 'b1', name: 'SMK Taruna Bhakti Depok' },
    { id: 'b2', name: 'SMK Taruna Bhakti Jakarta' },
    { id: 'b3', name: 'SMK Taruna Bhakti Bandung' },
];

const MOCK_SUBJECTS = [
    { id: '1', name: 'Matematika', code: 'MTK', color: '#0D9488' },
    { id: '2', name: 'Pemrograman Dasar', code: 'PRG', color: '#2563EB' },
    { id: '3', name: 'Bahasa Indonesia', code: 'BIN', color: '#059669' },
    { id: '4', name: 'Bahasa Inggris', code: 'BIG', color: '#DC2626' },
    { id: '5', name: 'IPA', code: 'IPA', color: '#0891B2' },
    { id: '6', name: 'PKN', code: 'PKN', color: '#D97706' },
    { id: '7', name: 'Sejarah', code: 'SEJ', color: '#7C3AED' },
    { id: '8', name: 'Seni Budaya', code: 'SBY', color: '#DB2777' },
    { id: '9', name: 'Quiz Aljabar', code: 'QAL', color: '#F59E0B' },
];

const MOCK_CLASSES = [
    { id: '1', name: 'X RPL 1' },
    { id: '2', name: 'X RPL 2' },
    { id: '3', name: 'XI RPL 1' },
    { id: '4', name: 'XI RPL 2' },
    { id: '5', name: 'XII RPL 1' },
    { id: '6', name: 'XII RPL 2' },
];

const MOCK_ROOMS = [
    { id: '1', name: 'Ruang 301', type: 'Kelas' },
    { id: '2', name: 'Ruang 302', type: 'Kelas' },
    { id: '3', name: 'Ruang 303', type: 'Kelas' },
    { id: '4', name: 'Ruang 304', type: 'Kelas' },
    { id: '5', name: 'Lab Komputer 1', type: 'Laboratorium' },
    { id: '6', name: 'Lab Komputer 2', type: 'Laboratorium' },
    { id: '7', name: 'Ruang BK', type: 'Kelas' },
    { id: '8', name: 'Ruang Guru', type: 'Kelas' },
];

const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

// ============================================================
// KOMPONEN UTAMA
// ============================================================
export default function BuatJadwalPage() {
    const router = useRouter();

    // ===== FORM STATE =====
    const [formData, setFormData] = useState({
        branchId: 'b1',
        day: 'Senin',
        startTime: '07:00',
        endTime: '08:30',
        subjectId: '1',
        classId: '1',
        roomId: '1',
        notes: 'Materi Bab 1 – Persamaan Linear',
    });

    const [duration, setDuration] = useState({ hours: 1, minutes: 30 });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // ===== HITUNG DURASI =====
    useEffect(() => {
        const [sh, sm] = formData.startTime.split(':').map(Number);
        const [eh, em] = formData.endTime.split(':').map(Number);
        let totalMinutes = (eh * 60 + em) - (sh * 60 + sm);
        if (totalMinutes < 0) totalMinutes += 24 * 60;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        setDuration({ hours, minutes });
    }, [formData.startTime, formData.endTime]);

    // ===== GETTER DATA =====
    const getBranch = () => MOCK_BRANCHES.find(b => b.id === formData.branchId);
    const getSubject = () => MOCK_SUBJECTS.find(s => s.id === formData.subjectId);
    const getClass = () => MOCK_CLASSES.find(c => c.id === formData.classId);
    const getRoom = () => MOCK_ROOMS.find(r => r.id === formData.roomId);

    const selectedBranch = getBranch();
    const selectedSubject = getSubject();
    const selectedClass = getClass();
    const selectedRoom = getRoom();

    // ===== HANDLE CHANGE =====
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // ===== HANDLE SUBMIT =====
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulasi simpan
        setTimeout(() => {
            const newSchedule = {
                id: `d${Date.now()}`,
                branchId: formData.branchId,
                day: formData.day,
                startTime: formData.startTime,
                endTime: formData.endTime,
                subjectId: formData.subjectId,
                subjectName: selectedSubject?.name || '',
                subjectColor: selectedSubject?.color || '#94A3B8',
                classId: formData.classId,
                className: selectedClass?.name || '',
                roomId: formData.roomId,
                roomName: selectedRoom?.name || '',
                notes: formData.notes,
                isBreak: false,
            };

            // Simpan ke localStorage
            const existing = localStorage.getItem('teacher_schedules');
            let schedules = existing ? JSON.parse(existing) : [];
            schedules.push(newSchedule);
            localStorage.setItem('teacher_schedules', JSON.stringify(schedules));

            setIsSubmitting(false);
            setShowSuccess(true);

            setTimeout(() => {
                setShowSuccess(false);
                router.push('/guru/jadwal/kalender');
            }, 2000);
        }, 800);
    };

    // ===== HANDLE RESET =====
    const handleReset = () => {
        setFormData({
            branchId: 'b1',
            day: 'Senin',
            startTime: '07:00',
            endTime: '08:30',
            subjectId: '1',
            classId: '1',
            roomId: '1',
            notes: '',
        });
    };

    const durationText = duration.hours > 0
        ? `${duration.hours} jam ${duration.minutes > 0 ? duration.minutes + ' menit' : ''}`
        : `${duration.minutes} menit`;

    return (
        <div className="flex h-screen min-h-0 w-full overflow-hidden bg-slate-50">
            <Sidebar />

            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                <Header user={{ name: "Bu Sari", email: "guru@smartschool.com", avatar: "BS" }} />

                <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
                    <div className="w-full min-w-0 p-3 sm:p-4 lg:p-6 xl:p-8">
                        <div className="mx-auto w-full min-w-0 max-w-none space-y-4 sm:space-y-5 lg:space-y-6">
                            {/* ===== HEADER PREMIUM ===== */}
                            <section className="relative w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-lg backdrop-blur-sm sm:rounded-3xl sm:p-5 lg:p-7">
                                <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 -translate-y-1/2 translate-x-1/3 rounded-full bg-blue-100/40 blur-3xl" />
                                <div className="pointer-events-none absolute bottom-0 left-0 h-44 w-44 -translate-x-1/4 translate-y-1/2 rounded-full bg-indigo-50/40 blur-3xl" />

                                <div className="relative flex min-w-0 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                    <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                                        <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-blue-200/50 bg-blue-100/60 shadow-md sm:flex lg:h-12 lg:w-12">
                                            <Calendar className="h-5 w-5 text-blue-600 lg:h-6 lg:w-6" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex min-w-0 flex-wrap items-center gap-2">
                                                <h1 className="min-w-0 text-xl font-bold tracking-tight text-slate-800 sm:text-2xl lg:text-3xl">
                                                    Buat Jadwal Mengajar
                                                </h1>
                                                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-blue-200/50 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                                                    <Sparkles className="h-3 w-3" />
                                                    Baru
                                                </span>
                                            </div>
                                            <div className="mt-1 flex min-w-0 items-start gap-2 text-xs text-slate-500 sm:text-sm">
                                                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                                                <span className="min-w-0">
                                                    Atur hari, waktu, mata pelajaran, kelas, dan ruangan untuk jadwal mengajar Anda.
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => router.push('/guru/jadwal/kalender')}
                                        className="group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-200 hover:text-slate-800 sm:w-auto"
                                    >
                                        <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                                        Kembali
                                    </button>
                                </div>
                            </section>

                            {/* ===== FORM + PREVIEW GRID ===== */}
                            <div className="grid w-full min-w-0 grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-5">
                                {/* FORM - 3/5 kolom */}
                                <div className="lg:col-span-3 min-w-0 space-y-4">
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {/* INFORMASI JADWAL */}
                                        <div className="w-full min-w-0 rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-md backdrop-blur-sm transition-all hover:shadow-lg sm:p-5 lg:p-6">
                                            <div className="mb-5 flex min-w-0 items-center gap-2">
                                                <div className="rounded-lg bg-blue-50 p-1.5">
                                                    <CalendarDays className="h-5 w-5 text-blue-600" />
                                                </div>
                                                <h2 className="text-base font-bold text-slate-800">Informasi Jadwal</h2>
                                                <span className="ml-2 text-xs text-slate-400">Tentukan jadwal dasar yang akan dibuat</span>
                                            </div>

                                            <div className="space-y-4">
                                                {/* Cabang */}
                                                <div className="min-w-0">
                                                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                                        Cabang / Sekolah <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="relative">
                                                        <School className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                        <select
                                                            name="branchId"
                                                            value={formData.branchId}
                                                            onChange={handleChange}
                                                            className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-10 text-sm text-slate-700 outline-none transition-all hover:border-blue-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
                                                        >
                                                            {MOCK_BRANCHES.map(b => (
                                                                <option key={b.id} value={b.id}>{b.name}</option>
                                                            ))}
                                                        </select>
                                                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                    </div>
                                                </div>

                                                {/* Hari */}
                                                <div className="min-w-0">
                                                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                                        Hari Mengajar <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="relative">
                                                        <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                        <select
                                                            name="day"
                                                            value={formData.day}
                                                            onChange={handleChange}
                                                            className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-10 text-sm text-slate-700 outline-none transition-all hover:border-blue-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
                                                        >
                                                            {DAYS.map(day => (
                                                                <option key={day} value={day}>{day}</option>
                                                            ))}
                                                        </select>
                                                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                    </div>
                                                </div>

                                                {/* Waktu */}
                                                <div className="min-w-0">
                                                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                                        Waktu Mengajar
                                                    </label>
                                                    <p className="mb-2 text-xs text-slate-400">Tentukan jam mulai dan jam selesai</p>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div>
                                                            <label className="mb-1 block text-xs text-slate-500">Jam Mulai *</label>
                                                            <input
                                                                type="time"
                                                                name="startTime"
                                                                value={formData.startTime}
                                                                onChange={handleChange}
                                                                className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition-all hover:border-blue-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="mb-1 block text-xs text-slate-500">Jam Selesai *</label>
                                                            <input
                                                                type="time"
                                                                name="endTime"
                                                                value={formData.endTime}
                                                                onChange={handleChange}
                                                                className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition-all hover:border-blue-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-1.5 text-sm text-slate-500">
                                                        <ClockIcon className="h-4 w-4 text-blue-500" />
                                                        <span>Durasi mengajar: <strong className="text-slate-700">{durationText}</strong></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* MATA PELAJARAN & KELAS */}
                                        <div className="w-full min-w-0 rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-md backdrop-blur-sm transition-all hover:shadow-lg sm:p-5 lg:p-6">
                                            <div className="mb-5 flex min-w-0 items-center gap-2">
                                                <div className="rounded-lg bg-indigo-50 p-1.5">
                                                    <BookOpen className="h-5 w-5 text-indigo-600" />
                                                </div>
                                                <h2 className="text-base font-bold text-slate-800">Mata Pelajaran &amp; Kelas</h2>
                                                <span className="ml-2 text-xs text-slate-400">Tentukan materi yang akan diajarkan</span>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="min-w-0">
                                                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                                        Mata Pelajaran <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="relative">
                                                        <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                        <select
                                                            name="subjectId"
                                                            value={formData.subjectId}
                                                            onChange={handleChange}
                                                            className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-10 text-sm text-slate-700 outline-none transition-all hover:border-blue-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
                                                        >
                                                            {MOCK_SUBJECTS.map(s => (
                                                                <option key={s.id} value={s.id}>{s.name}</option>
                                                            ))}
                                                        </select>
                                                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                    </div>
                                                </div>

                                                <div className="min-w-0">
                                                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                                        Kelas <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="relative">
                                                        <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                        <select
                                                            name="classId"
                                                            value={formData.classId}
                                                            onChange={handleChange}
                                                            className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-10 text-sm text-slate-700 outline-none transition-all hover:border-blue-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
                                                        >
                                                            {MOCK_CLASSES.map(c => (
                                                                <option key={c.id} value={c.id}>{c.name}</option>
                                                            ))}
                                                        </select>
                                                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* RUANGAN */}
                                        <div className="w-full min-w-0 rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-md backdrop-blur-sm transition-all hover:shadow-lg sm:p-5 lg:p-6">
                                            <div className="mb-5 flex min-w-0 items-center gap-2">
                                                <div className="rounded-lg bg-amber-50 p-1.5">
                                                    <MapPin className="h-5 w-5 text-amber-600" />
                                                </div>
                                                <h2 className="text-base font-bold text-slate-800">Ruangan</h2>
                                                <span className="ml-2 text-xs text-slate-400">Tentukan lokasi kegiatan belajar</span>
                                            </div>

                                            <div className="min-w-0">
                                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                                    Ruangan / Laboratorium <span className="text-red-500">*</span>
                                                </label>
                                                <div className="relative">
                                                    <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                    <select
                                                        name="roomId"
                                                        value={formData.roomId}
                                                        onChange={handleChange}
                                                        className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-10 text-sm text-slate-700 outline-none transition-all hover:border-blue-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
                                                    >
                                                        {MOCK_ROOMS.map(r => (
                                                            <option key={r.id} value={r.id}>{r.name} – {r.type}</option>
                                                        ))}
                                                    </select>
                                                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* CATATAN */}
                                        <div className="w-full min-w-0 rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-md backdrop-blur-sm transition-all hover:shadow-lg sm:p-5 lg:p-6">
                                            <div className="mb-5 flex min-w-0 items-center gap-2">
                                                <div className="rounded-lg bg-purple-50 p-1.5">
                                                    <FileText className="h-5 w-5 text-purple-600" />
                                                </div>
                                                <h2 className="text-base font-bold text-slate-800">Catatan</h2>
                                                <span className="ml-2 text-xs text-slate-400">Opsional</span>
                                            </div>

                                            <div className="min-w-0">
                                                <textarea
                                                    name="notes"
                                                    value={formData.notes}
                                                    onChange={handleChange}
                                                    rows={3}
                                                    placeholder="Tambahkan catatan untuk jadwal ini, misalnya: Materi Bab 1 – Persamaan Linear"
                                                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all hover:border-blue-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                        </div>

                                        {/* TOMBOL AKSI */}
                                        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:gap-4">
                                            <button
                                                type="button"
                                                onClick={handleReset}
                                                className="flex-1 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm sm:flex-none"
                                            >
                                                <span className="inline-flex items-center justify-center gap-2">
                                                    <RotateCcw className="h-4 w-4" />
                                                    Reset
                                                </span>
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200 transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-blue-300 disabled:opacity-70 sm:flex-none"
                                            >
                                                {isSubmitting ? (
                                                    <span className="inline-flex items-center justify-center gap-2">
                                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                                        Menyimpan...
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center justify-center gap-2">
                                                        <Save className="h-4 w-4" />
                                                        Simpan Jadwal
                                                    </span>
                                                )}
                                            </button>
                                        </div>

                                        <p className="text-center text-xs text-slate-400">
                                            Jadwal yang disimpan akan langsung tersedia di Kalender Guru.
                                        </p>
                                    </form>
                                </div>

                                {/* PREVIEW - 2/5 kolom */}
                                <div className="lg:col-span-2 min-w-0 space-y-4">
                                    <div className="sticky top-6 w-full min-w-0">
                                        <div className="w-full min-w-0 rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-md backdrop-blur-sm transition-all hover:shadow-lg sm:p-5 lg:p-6">
                                            <div className="mb-5 flex min-w-0 items-center gap-2">
                                                <div className="rounded-lg bg-emerald-50 p-1.5">
                                                    <Eye className="h-5 w-5 text-emerald-600" />
                                                </div>
                                                <h2 className="text-base font-bold text-slate-800">Preview Jadwal</h2>
                                                <span className="ml-auto rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-600">Live</span>
                                            </div>

                                            {/* Preview Card */}
                                            <div className="w-full min-w-0 overflow-hidden rounded-xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-white">
                                                {/* Header Preview */}
                                                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4 text-white/80" />
                                                        <span className="text-sm font-semibold text-white">Jadwal Mengajar</span>
                                                    </div>
                                                </div>

                                                <div className="space-y-4 p-4">
                                                    {/* Mata Pelajaran */}
                                                    <div className="min-w-0">
                                                        <div className="flex min-w-0 items-center gap-2">
                                                            <div
                                                                className="h-3 w-3 shrink-0 rounded-full shadow-sm"
                                                                style={{ backgroundColor: selectedSubject?.color || '#94A3B8' }}
                                                            />
                                                            <h3 className="min-w-0 text-base font-bold text-slate-800">
                                                                {selectedSubject?.name || '-'}
                                                            </h3>
                                                            <span className="shrink-0 rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-slate-400">
                                                                {selectedSubject?.code || '-'}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                                        <div className="rounded-lg border border-slate-100 bg-slate-50 p-2.5">
                                                            <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-slate-400">
                                                                <Calendar className="h-3 w-3" />
                                                                Hari
                                                            </div>
                                                            <p className="mt-0.5 text-sm font-semibold text-slate-700">{formData.day}</p>
                                                        </div>
                                                        <div className="rounded-lg border border-slate-100 bg-slate-50 p-2.5">
                                                            <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-slate-400">
                                                                <Clock className="h-3 w-3" />
                                                                Waktu
                                                            </div>
                                                            <p className="mt-0.5 text-sm font-semibold text-slate-700">
                                                                {formData.startTime} – {formData.endTime}
                                                            </p>
                                                        </div>
                                                        <div className="rounded-lg border border-slate-100 bg-slate-50 p-2.5">
                                                            <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-slate-400">
                                                                <ClockIcon className="h-3 w-3" />
                                                                Durasi
                                                            </div>
                                                            <p className="mt-0.5 text-sm font-semibold text-slate-700">{durationText}</p>
                                                        </div>
                                                        <div className="rounded-lg border border-slate-100 bg-slate-50 p-2.5">
                                                            <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-slate-400">
                                                                <Users className="h-3 w-3" />
                                                                Kelas
                                                            </div>
                                                            <p className="mt-0.5 text-sm font-semibold text-slate-700">{selectedClass?.name || '-'}</p>
                                                        </div>
                                                    </div>

                                                    {/* Ruangan */}
                                                    <div className="rounded-lg border border-slate-100 bg-slate-50 p-2.5">
                                                        <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-slate-400">
                                                            <MapPin className="h-3 w-3" />
                                                            Ruangan
                                                        </div>
                                                        <p className="mt-0.5 text-sm font-semibold text-slate-700">
                                                            {selectedRoom?.name || '-'} {selectedRoom?.type ? `– ${selectedRoom.type}` : ''}
                                                        </p>
                                                    </div>

                                                    {/* Cabang */}
                                                    <div className="rounded-lg border border-slate-100 bg-slate-50 p-2.5">
                                                        <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-slate-400">
                                                            <School className="h-3 w-3" />
                                                            Cabang / Sekolah
                                                        </div>
                                                        <p className="mt-0.5 text-sm font-semibold text-slate-700">{selectedBranch?.name || '-'}</p>
                                                    </div>

                                                    {/* Catatan */}
                                                    {formData.notes && (
                                                        <div className="rounded-lg border border-amber-200/50 bg-amber-50/60 p-2.5">
                                                            <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-amber-600">
                                                                <FileText className="h-3 w-3" />
                                                                Catatan
                                                            </div>
                                                            <p className="mt-0.5 text-sm italic text-slate-600">{formData.notes}</p>
                                                        </div>
                                                    )}

                                                    {/* Status */}
                                                    <div className="flex items-center gap-2 border-t border-slate-200/60 pt-2">
                                                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                                                        <span className="text-xs text-slate-500">Jadwal siap disimpan</span>
                                                    </div>
                                                    <p className="flex items-start gap-1 text-[10px] text-slate-400">
                                                        <AlertCircle className="mt-0.5 h-3 w-3 shrink-0" />
                                                        Pastikan tidak ada jadwal lain yang bentrok pada waktu yang sama.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Success Toast */}
                                        {showSuccess && (
                                            <div className="animate-in slide-in-from-bottom-4 fixed bottom-6 right-6 z-50 duration-300">
                                                <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 shadow-lg shadow-emerald-200/30">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                                                        <CheckCircle className="h-5 w-5 text-emerald-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-emerald-800">Jadwal berhasil disimpan!</p>
                                                        <p className="text-xs text-emerald-600">Mengalihkan ke Kalender Guru...</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

// ============================================================
// KOMPONEN TIMER IKON
// ============================================================
function TimerIcon(props) {
    return <Clock {...props} />;
}