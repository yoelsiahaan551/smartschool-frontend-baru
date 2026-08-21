// app/guru/jadwal/kalender/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Calendar,
    Clock,
    BookOpen,
    Users,
    MapPin,
    ChevronLeft,
    ChevronRight,
    Plus,
    Home,
    CalendarDays,
    CheckCircle,
    XCircle,
    Building2,
    Sparkles,
    Sun,
    Coffee,
    Award,
    Bell,
    Timer,
    CalendarCheck,
    CalendarOff,
    ClockArrowUp,
    Star,
    ArrowRight,
} from 'lucide-react';

import Sidebar from '../../../components/Sidebar';
import Header from '../../../components/Header';

// ============================================================
// DATA CABANG
// ============================================================

const MOCK_BRANCHES = [
    { id: 'b1', name: 'SMK Taruna Bhakti Depok' },
    { id: 'b2', name: 'SMK Taruna Bhakti Jakarta' },
    { id: 'b3', name: 'SMK Taruna Bhakti Bandung' },
];

// ============================================================
// DATA MAPEL
// ============================================================

const MOCK_SUBJECTS = [
    { id: '1', name: 'Matematika', color: '#0D9488' },
    { id: '2', name: 'Pemrograman Dasar', color: '#2563EB' },
    { id: '3', name: 'Bahasa Indonesia', color: '#059669' },
    { id: '4', name: 'Bahasa Inggris', color: '#DC2626' },
    { id: '5', name: 'IPA', color: '#0891B2' },
    { id: '6', name: 'PKN', color: '#D97706' },
    { id: '7', name: 'Sejarah', color: '#7C3AED' },
    { id: '8', name: 'Seni Budaya', color: '#DB2777' },
    { id: '9', name: 'Quiz Aljabar', color: '#F59E0B' },
];

// ============================================================
// DATA KELAS
// ============================================================

const MOCK_CLASSES = [
    { id: '1', name: 'X RPL 1' },
    { id: '2', name: 'X RPL 2' },
    { id: '3', name: 'XI RPL 1' },
    { id: '4', name: 'XI RPL 2' },
    { id: '5', name: 'XII RPL 1' },
    { id: '6', name: 'XII RPL 2' },
];

// ============================================================
// DATA RUANGAN
// ============================================================

const MOCK_ROOMS = [
    { id: '1', name: 'Ruang 301' },
    { id: '2', name: 'Ruang 302' },
    { id: '3', name: 'Ruang 303' },
    { id: '4', name: 'Ruang 304' },
    { id: '5', name: 'Lab Komputer 1' },
    { id: '6', name: 'Lab Komputer 2' },
    { id: '7', name: 'Ruang BK' },
    { id: '8', name: 'Ruang Guru' },
];

// ============================================================
// DATA JADWAL
// ============================================================

const DUMMY_SCHEDULES = [
    {
        id: 'd1',
        branchId: 'b1',
        day: 'Senin',
        startTime: '07:00',
        endTime: '08:00',
        subjectId: '1',
        subjectName: 'Matematika',
        subjectColor: '#0D9488',
        classId: '1',
        className: 'X RPL 1',
        roomId: '1',
        roomName: 'Ruang 301',
        notes: '',
    },
    {
        id: 'd2',
        branchId: 'b1',
        day: 'Senin',
        startTime: '08:00',
        endTime: '09:00',
        subjectId: '1',
        subjectName: 'Matematika',
        subjectColor: '#0D9488',
        classId: '2',
        className: 'X RPL 2',
        roomId: '2',
        roomName: 'Ruang 302',
        notes: '',
    },
    {
        id: 'd3',
        branchId: 'b1',
        day: 'Senin',
        startTime: '09:00',
        endTime: '09:45',
        subjectId: '1',
        subjectName: 'Matematika',
        subjectColor: '#0D9488',
        classId: '3',
        className: 'XI RPL 1',
        roomId: '3',
        roomName: 'Ruang 303',
        notes: '',
    },
    {
        id: 'd4',
        branchId: 'b1',
        day: 'Senin',
        startTime: '09:45',
        endTime: '10:15',
        subjectId: null,
        subjectName: 'Istirahat',
        subjectColor: '#94A3B8',
        classId: null,
        className: '',
        roomId: null,
        roomName: '',
        notes: '',
        isBreak: true,
    },
    {
        id: 'd5',
        branchId: 'b1',
        day: 'Senin',
        startTime: '10:15',
        endTime: '11:15',
        subjectId: '9',
        subjectName: 'Quiz Aljabar',
        subjectColor: '#F59E0B',
        classId: '1',
        className: 'X RPL 1',
        roomId: '1',
        roomName: 'Ruang 301',
        notes: '',
    },
    {
        id: 'd6',
        branchId: 'b1',
        day: 'Selasa',
        startTime: '07:00',
        endTime: '08:00',
        subjectId: '2',
        subjectName: 'Pemrograman Dasar',
        subjectColor: '#2563EB',
        classId: '2',
        className: 'X RPL 2',
        roomId: '5',
        roomName: 'Lab Komputer 1',
        notes: '',
    },
    {
        id: 'd7',
        branchId: 'b1',
        day: 'Selasa',
        startTime: '08:00',
        endTime: '09:00',
        subjectId: '2',
        subjectName: 'Pemrograman Dasar',
        subjectColor: '#2563EB',
        classId: '4',
        className: 'XI RPL 2',
        roomId: '5',
        roomName: 'Lab Komputer 1',
        notes: '',
    },
    {
        id: 'd8',
        branchId: 'b1',
        day: 'Rabu',
        startTime: '08:00',
        endTime: '09:00',
        subjectId: '3',
        subjectName: 'Bahasa Indonesia',
        subjectColor: '#059669',
        classId: '3',
        className: 'XI RPL 1',
        roomId: '3',
        roomName: 'Ruang 303',
        notes: '',
    },
    {
        id: 'd9',
        branchId: 'b1',
        day: 'Rabu',
        startTime: '09:00',
        endTime: '10:00',
        subjectId: '4',
        subjectName: 'Bahasa Inggris',
        subjectColor: '#DC2626',
        classId: '1',
        className: 'X RPL 1',
        roomId: '1',
        roomName: 'Ruang 301',
        notes: '',
    },
    {
        id: 'd10',
        branchId: 'b1',
        day: 'Kamis',
        startTime: '07:00',
        endTime: '08:00',
        subjectId: '5',
        subjectName: 'IPA',
        subjectColor: '#0891B2',
        classId: '5',
        className: 'XII RPL 1',
        roomId: '6',
        roomName: 'Lab Komputer 2',
        notes: '',
    },
    {
        id: 'd11',
        branchId: 'b1',
        day: 'Kamis',
        startTime: '08:00',
        endTime: '09:00',
        subjectId: '6',
        subjectName: 'PKN',
        subjectColor: '#D97706',
        classId: '2',
        className: 'X RPL 2',
        roomId: '2',
        roomName: 'Ruang 302',
        notes: '',
    },
    {
        id: 'd12',
        branchId: 'b1',
        day: 'Jumat',
        startTime: '07:00',
        endTime: '08:00',
        subjectId: '7',
        subjectName: 'Sejarah',
        subjectColor: '#7C3AED',
        classId: '1',
        className: 'X RPL 1',
        roomId: '1',
        roomName: 'Ruang 301',
        notes: '',
    },
    {
        id: 'd13',
        branchId: 'b1',
        day: 'Jumat',
        startTime: '08:00',
        endTime: '09:00',
        subjectId: '8',
        subjectName: 'Seni Budaya',
        subjectColor: '#DB2777',
        classId: '3',
        className: 'XI RPL 1',
        roomId: '3',
        roomName: 'Ruang 303',
        notes: '',
    },
];

// ============================================================
// AGENDA
// ============================================================

const UPCOMING_EVENTS = [
    {
        id: 'e1',
        title: 'Rapat Guru Mapel Matematika',
        date: 'Rabu, 22 Mei 2025',
        time: '13.00 - 14.30',
        location: 'Ruang Guru',
        branchId: 'b1',
    },
    {
        id: 'e2',
        title: 'Penilaian Tengah Semester',
        date: '27 Mei - 31 Mei 2025',
        time: '',
        location: 'X RPL 1, X RPL 2, XI RPL 1',
        branchId: 'b1',
    },
    {
        id: 'e3',
        title: 'Pengumpulan Nilai',
        date: 'Jumat, 31 Mei 2025',
        time: '',
        location: 'Semua Kelas',
        branchId: 'b1',
    },
];

// ============================================================
// CONSTANT
// ============================================================

const monthNames = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
];

const getDayName = (dayIndex) => {
    const map = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    return map[dayIndex];
};

// ============================================================
// KOMPONEN UTAMA
// ============================================================

export default function KalenderGuruPage() {
    const router = useRouter();

    const [schedules, setSchedules] = useState([]);
    const [branches] = useState(MOCK_BRANCHES);

    const [selectedBranch, setSelectedBranch] = useState('b1');
    const [selectedDate, setSelectedDate] = useState(new Date(2025, 4, 20));
    const [viewDate, setViewDate] = useState(new Date(2025, 4, 20));

    const [filterClass, setFilterClass] = useState('all');
    const [filterSubject, setFilterSubject] = useState('all');
    const [selectedDay, setSelectedDay] = useState(2);

    // ============================================================
    // LOAD DATA
    // ============================================================

    useEffect(() => {
        const stored = localStorage.getItem('teacher_schedules');

        if (stored) {
            try {
                const parsed = JSON.parse(stored);

                if (Array.isArray(parsed) && parsed.length > 0) {
                    setSchedules(parsed);
                    return;
                }
            } catch (error) {
                console.error('Gagal membaca jadwal:', error);
            }
        }

        setSchedules(DUMMY_SCHEDULES);
        localStorage.setItem('teacher_schedules', JSON.stringify(DUMMY_SCHEDULES));
    }, []);

    // ============================================================
    // WEEK
    // ============================================================

    const getWeekDays = (baseDate) => {
        const date = new Date(baseDate);
        const day = date.getDay();
        const diff = day === 0 ? -6 : 1 - day;
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() + diff);

        return Array.from({ length: 7 }, (_, index) => {
            const d = new Date(weekStart);
            d.setDate(weekStart.getDate() + index);
            return d;
        });
    };

    const weekDays = getWeekDays(viewDate);

    // ============================================================
    // FILTER
    // ============================================================

    const filteredSchedules = schedules
        .filter((s) => s.branchId === selectedBranch)
        .filter((s) => s.day === getDayName(selectedDay))
        .filter((s) => filterClass === 'all' || s.classId === filterClass)
        .filter((s) => filterSubject === 'all' || s.subjectId === filterSubject)
        .sort((a, b) => a.startTime.localeCompare(b.startTime));

    // ============================================================
    // STATISTIC
    // ============================================================

    const totalMinutes = filteredSchedules.reduce((acc, schedule) => {
        if (schedule.isBreak) return acc;

        const [sh, sm] = schedule.startTime.split(':').map(Number);
        const [eh, em] = schedule.endTime.split(':').map(Number);

        return acc + (eh * 60 + em) - (sh * 60 + sm);
    }, 0);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const totalSessions = filteredSchedules.filter((s) => !s.isBreak).length;

    const uniqueClasses = [
        ...new Set(
            filteredSchedules.filter((s) => !s.isBreak).map((s) => s.className)
        ),
    ];

    const uniqueSubjects = [
        ...new Set(
            filteredSchedules.filter((s) => !s.isBreak).map((s) => s.subjectName)
        ),
    ];

    // ============================================================
    // CURRENT TIME
    // ============================================================

    const now = new Date();

    const nowTime =
        `${String(now.getHours()).padStart(2, '0')}:` +
        `${String(now.getMinutes()).padStart(2, '0')}`;

    const nextSchedule = filteredSchedules
        .filter((s) => s.startTime > nowTime && !s.isBreak)
        .sort((a, b) => a.startTime.localeCompare(b.startTime))[0];

    // ============================================================
    // GREETING
    // ============================================================

    const getGreeting = () => {
        const hour = now.getHours();

        if (hour < 12) {
            return { text: 'Selamat Pagi', icon: Sun };
        }

        if (hour < 15) {
            return { text: 'Selamat Siang', icon: Sun };
        }

        if (hour < 18) {
            return { text: 'Selamat Sore', icon: Sun };
        }

        return { text: 'Selamat Malam', icon: Moon };
    };

    const greeting = getGreeting();
    const GreetingIcon = greeting.icon;

    // ============================================================
    // NAVIGASI
    // ============================================================

    const goToPrevWeek = () => {
        const date = new Date(viewDate);
        date.setDate(date.getDate() - 7);
        setViewDate(date);
    };

    const goToNextWeek = () => {
        const date = new Date(viewDate);
        date.setDate(date.getDate() + 7);
        setViewDate(date);
    };

    const goToToday = () => {
        const today = new Date();
        setViewDate(today);
        setSelectedDate(today);
        setSelectedDay(today.getDay());
    };

    const handleDateClick = (date) => {
        if (!date) return;

        setSelectedDate(date);
        setSelectedDay(date.getDay());
    };

    // ============================================================
    // RENDER
    // ============================================================

    return (
        <div className="flex h-screen min-h-0 w-full overflow-hidden bg-slate-50">
            <Sidebar />

            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                <Header user={{ name: "Bu Sari", email: "guru@smartschool.com", avatar: "BS" }} />

                <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
                    <div className="w-full min-w-0 p-3 sm:p-4 lg:p-6 xl:p-8">
                        <div className="mx-auto w-full min-w-0 max-w-none space-y-4 sm:space-y-5 lg:space-y-6">
                            {/* ==================================================
                                HEADER
                            ================================================== */}

                            <section className="relative w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-5 lg:p-7">
                                <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 -translate-y-1/2 translate-x-1/3 rounded-full bg-blue-100/30 blur-3xl" />

                                <div className="pointer-events-none absolute bottom-0 left-0 h-44 w-44 -translate-x-1/4 translate-y-1/2 rounded-full bg-indigo-50/40 blur-3xl" />

                                <div className="relative flex min-w-0 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                    <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                                        <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-blue-200/50 bg-blue-100/60 shadow-sm sm:flex lg:h-12 lg:w-12">
                                            <GreetingIcon className="h-5 w-5 text-blue-600 lg:h-6 lg:w-6" />
                                        </div>

                                        <div className="min-w-0">
                                            <div className="flex min-w-0 flex-wrap items-center gap-2">
                                                <h1 className="min-w-0 text-xl font-bold tracking-tight text-slate-800 sm:text-2xl lg:text-3xl">
                                                    {greeting.text},{' '}
                                                    <span className="text-blue-700">
                                                        Bapak/Ibu Guru
                                                    </span>
                                                </h1>

                                                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-blue-200/50 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                                                    <Sparkles className="h-3 w-3" />
                                                    Pro
                                                </span>
                                            </div>

                                            <div className="mt-1 flex min-w-0 items-start gap-2 text-xs text-slate-500 sm:text-sm">
                                                <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />

                                                <span className="min-w-0">
                                                    Kelola jadwal mengajar Anda dengan mudah dan profesional
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() =>
                                            router.push('/guru/jadwal/kalender/buat')
                                        }
                                        className="group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-300 sm:w-auto"
                                    >
                                        <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />

                                        <span>Buat Jadwal</span>

                                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </button>
                                </div>

                                {/* STAT */}

                                <div className="relative mt-4 grid w-full min-w-0 grid-cols-2 gap-2 sm:mt-5 sm:grid-cols-4 sm:gap-3">
                                    {[
                                        {
                                            label: 'Total Sesi Hari Ini',
                                            value: totalSessions,
                                            icon: Clock,
                                        },
                                        {
                                            label: 'Total Jam',
                                            value: `${hours}j ${minutes}m`,
                                            icon: Timer,
                                        },
                                        {
                                            label: 'Kelas',
                                            value: uniqueClasses.length || '-',
                                            icon: Users,
                                        },
                                        {
                                            label: 'Mapel',
                                            value: uniqueSubjects.length || '-',
                                            icon: BookOpen,
                                        },
                                    ].map((stat, index) => {
                                        const Icon = stat.icon;

                                        return (
                                            <div
                                                key={index}
                                                className="min-w-0 rounded-xl border border-slate-200/60 bg-slate-50/80 p-3 transition-all duration-300 hover:bg-slate-100/80"
                                            >
                                                <div className="flex min-w-0 items-center gap-2">
                                                    <Icon className="h-3.5 w-3.5 shrink-0 text-blue-600/70" />

                                                    <span className="min-w-0 truncate text-xs font-medium text-slate-500">
                                                        {stat.label}
                                                    </span>
                                                </div>

                                                <p className="mt-0.5 truncate text-lg font-bold text-slate-800 sm:text-xl">
                                                    {stat.value}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* ==================================================
                                FILTER
                            ================================================== */}

                            <section className="w-full min-w-0 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm sm:p-4">
                                <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
                                    <div className="flex shrink-0 items-center gap-2 rounded-xl border border-blue-200/50 bg-blue-50 px-3 py-1.5">
                                        <Home className="h-4 w-4 text-blue-600" />

                                        <span className="text-xs font-semibold text-slate-700 sm:text-sm">
                                            HARI INI
                                        </span>
                                    </div>

                                    <span className="min-w-0 truncate text-xs font-medium text-slate-600 sm:text-sm">
                                        {selectedDate.toLocaleDateString('id-ID', {
                                            weekday: 'long',
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </span>

                                    <div className="hidden h-6 w-px bg-slate-200 lg:block" />

                                    <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                                        {/* CABANG */}

                                        <div className="flex min-w-0 items-center gap-1.5">
                                            <Building2 className="h-3.5 w-3.5 shrink-0 text-slate-400" />

                                            <select
                                                value={selectedBranch}
                                                onChange={(e) =>
                                                    setSelectedBranch(e.target.value)
                                                }
                                                className="h-9 min-w-0 max-w-full rounded-xl border border-slate-200 bg-white px-2.5 text-xs text-slate-700 outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-400 sm:text-sm"
                                            >
                                                {branches.map((branch) => (
                                                    <option key={branch.id} value={branch.id}>
                                                        {branch.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* KELAS */}

                                        <div className="flex min-w-0 items-center gap-1.5">
                                            <Users className="h-3.5 w-3.5 shrink-0 text-slate-400" />

                                            <select
                                                value={filterClass}
                                                onChange={(e) =>
                                                    setFilterClass(e.target.value)
                                                }
                                                className="h-9 min-w-0 rounded-xl border border-slate-200 bg-white px-2.5 text-xs text-slate-700 outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-400 sm:text-sm"
                                            >
                                                <option value="all">Semua Kelas</option>

                                                {MOCK_CLASSES.map((item) => (
                                                    <option key={item.id} value={item.id}>
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* MAPEL */}

                                        <div className="flex min-w-0 items-center gap-1.5">
                                            <BookOpen className="h-3.5 w-3.5 shrink-0 text-slate-400" />

                                            <select
                                                value={filterSubject}
                                                onChange={(e) =>
                                                    setFilterSubject(e.target.value)
                                                }
                                                className="h-9 min-w-0 rounded-xl border border-slate-200 bg-white px-2.5 text-xs text-slate-700 outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-400 sm:text-sm"
                                            >
                                                <option value="all">Semua Mapel</option>

                                                {MOCK_SUBJECTS.map((item) => (
                                                    <option key={item.id} value={item.id}>
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <button
                                        onClick={goToToday}
                                        className="shrink-0 rounded-xl bg-blue-600 px-3 py-2 text-xs font-medium text-white shadow-sm transition-all hover:bg-blue-700 sm:px-4 sm:text-sm"
                                    >
                                        Hari ini
                                    </button>
                                </div>
                            </section>

                            {/* ==================================================
                                MAIN CONTENT
                            ================================================== */}

                            <div className="grid w-full min-w-0 grid-cols-1 gap-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-5 xl:grid-cols-[300px_minmax(0,1fr)]">
                                {/* ==================================================
                                    LEFT COLUMN
                                ================================================== */}

                                <aside className="min-w-0 space-y-4 sm:space-y-5">
                                    {/* CALENDAR */}

                                    <div className="w-full min-w-0 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
                                        <div className="mb-4 flex items-center justify-between gap-2">
                                            <h3 className="flex min-w-0 items-center gap-2 text-sm font-bold text-slate-800">
                                                <Calendar className="h-4 w-4 shrink-0 text-blue-500" />

                                                <span className="truncate">
                                                    {monthNames[viewDate.getMonth()]}{' '}
                                                    {viewDate.getFullYear()}
                                                </span>
                                            </h3>

                                            <div className="flex shrink-0 gap-0.5">
                                                <button
                                                    onClick={goToPrevWeek}
                                                    className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100"
                                                >
                                                    <ChevronLeft className="h-4 w-4" />
                                                </button>

                                                <button
                                                    onClick={goToNextWeek}
                                                    className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100"
                                                >
                                                    <ChevronRight className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-slate-400 sm:text-xs">
                                            {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map(
                                                (day) => (
                                                    <div key={day} className="py-1">
                                                        {day}
                                                    </div>
                                                )
                                            )}
                                        </div>

                                        <div className="grid grid-cols-7 gap-1">
                                            {weekDays.map((date, index) => {
                                                const isToday =
                                                    date.toDateString() ===
                                                    new Date().toDateString();

                                                const isSelected =
                                                    date.toDateString() ===
                                                    selectedDate.toDateString();

                                                const dayName = getDayName(date.getDay());

                                                const hasSchedule = schedules.some(
                                                    (schedule) =>
                                                        schedule.day === dayName &&
                                                        schedule.branchId === selectedBranch
                                                );

                                                const isWeekend =
                                                    date.getDay() === 0 || date.getDay() === 6;

                                                return (
                                                    <button
                                                        key={index}
                                                        onClick={() => handleDateClick(date)}
                                                        className={`
                                                            relative aspect-square min-w-0 rounded-lg
                                                            flex flex-col items-center justify-center
                                                            text-xs font-medium transition-all
                                                            sm:text-sm
                                                            ${
                                                                isSelected
                                                                    ? 'scale-95 bg-blue-600 text-white shadow-sm'
                                                                    : ''
                                                            }
                                                            ${
                                                                isToday && !isSelected
                                                                    ? 'border-2 border-blue-300/50 bg-blue-50 text-blue-700'
                                                                    : ''
                                                            }
                                                            ${
                                                                !isSelected && !isToday
                                                                    ? 'text-slate-700 hover:bg-slate-100'
                                                                    : ''
                                                            }
                                                            ${
                                                                isWeekend && !isSelected && !isToday
                                                                    ? 'text-slate-300'
                                                                    : ''
                                                            }
                                                        `}
                                                    >
                                                        <span>{date.getDate()}</span>

                                                        {hasSchedule && (
                                                            <span
                                                                className={`
                                                                    absolute bottom-1 h-1.5 w-1.5 rounded-full
                                                                    ${
                                                                        isSelected
                                                                            ? 'bg-white/70'
                                                                            : 'bg-blue-400'
                                                                    }
                                                                `}
                                                            />
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
                                            <button
                                                onClick={goToToday}
                                                className="flex shrink-0 items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800"
                                            >
                                                <CalendarCheck className="h-3.5 w-3.5" />
                                                Hari ini
                                            </button>

                                            <span className="flex min-w-0 items-center gap-1 truncate text-[10px] text-slate-500 sm:text-xs">
                                                <span className="h-2 w-2 shrink-0 rounded-full bg-blue-400" />
                                                Ada jadwal
                                            </span>
                                        </div>
                                    </div>

                                    {/* RINGKASAN */}

                                    <div className="w-full min-w-0 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
                                        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                                            <Award className="h-4 w-4 text-amber-500" />
                                            Ringkasan Hari Ini
                                        </h4>

                                        <div className="space-y-2.5">
                                            {[
                                                {
                                                    label: 'Total Jam',
                                                    value: `${hours}j ${minutes}m`,
                                                    icon: Timer,
                                                    color: 'text-blue-600',
                                                },
                                                {
                                                    label: 'Sesi',
                                                    value: totalSessions,
                                                    icon: Clock,
                                                    color: 'text-blue-600',
                                                },
                                                {
                                                    label: 'Kelas',
                                                    value: uniqueClasses.join(', ') || '-',
                                                    icon: Users,
                                                    color: 'text-indigo-600',
                                                },
                                                {
                                                    label: 'Mapel',
                                                    value: uniqueSubjects.join(', ') || '-',
                                                    icon: BookOpen,
                                                    color: 'text-amber-600',
                                                },
                                            ].map((item, index) => {
                                                const Icon = item.icon;

                                                return (
                                                    <div
                                                        key={index}
                                                        className="flex min-w-0 items-center justify-between gap-3 border-b border-slate-100/80 py-1.5 last:border-0"
                                                    >
                                                        <div className="flex min-w-0 items-center gap-2">
                                                            <Icon
                                                                className={`h-3.5 w-3.5 shrink-0 ${item.color}`}
                                                            />

                                                            <span className="truncate text-xs text-slate-500 sm:text-sm">
                                                                {item.label}
                                                            </span>
                                                        </div>

                                                        <span className="max-w-[50%] truncate text-right text-xs font-semibold text-slate-700 sm:text-sm">
                                                            {item.value}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </aside>

                                {/* ==================================================
                                    RIGHT COLUMN
                                ================================================== */}

                                <section className="min-w-0 space-y-4 sm:space-y-5">
                                    {/* JADWAL */}

                                    <div className="w-full min-w-0 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
                                        <div className="mb-5 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                            <div className="flex min-w-0 flex-wrap items-center gap-2">
                                                <h2 className="flex min-w-0 items-center gap-2 text-base font-bold text-slate-800 sm:text-lg">
                                                    <Clock className="h-5 w-5 shrink-0 text-blue-500" />

                                                    <span>Jadwal {getDayName(selectedDay)}</span>
                                                </h2>

                                                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-normal text-slate-400">
                                                    {selectedDate.toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })}
                                                </span>

                                                <span className="max-w-full truncate rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-400">
                                                    {
                                                        branches.find(
                                                            (b) => b.id === selectedBranch
                                                        )?.name
                                                    }
                                                </span>
                                            </div>

                                            <span className="w-fit shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-400 sm:text-sm">
                                                {filteredSchedules.filter((s) => !s.isBreak).length} sesi
                                            </span>
                                        </div>

                                        {filteredSchedules.length === 0 ? (
                                            <div className="py-10 text-center text-slate-400 sm:py-14">
                                                <CalendarOff className="mx-auto mb-2 h-10 w-10 text-slate-300 sm:h-12 sm:w-12" />

                                                <p className="text-sm">Tidak ada jadwal untuk hari ini</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-2.5">
                                                {filteredSchedules.map((schedule) => {
                                                    const isNow =
                                                        schedule.startTime <= nowTime &&
                                                        schedule.endTime > nowTime &&
                                                        !schedule.isBreak;

                                                    const isPast =
                                                        schedule.endTime <= nowTime &&
                                                        !schedule.isBreak;

                                                    if (schedule.isBreak) {
                                                        return (
                                                            <div
                                                                key={schedule.id}
                                                                className="flex min-w-0 items-center gap-3 rounded-xl border border-amber-200/60 bg-amber-50/80 p-3 sm:gap-4 sm:p-4"
                                                            >
                                                                <div className="w-12 shrink-0 text-xs font-semibold text-amber-600 sm:w-16 sm:text-sm">
                                                                    {schedule.startTime}
                                                                </div>

                                                                <div className="flex min-w-0 flex-1 items-center gap-2">
                                                                    <Coffee className="h-4 w-4 shrink-0 text-amber-500 sm:h-5 sm:w-5" />

                                                                    <span className="truncate text-sm font-medium text-amber-700 sm:text-base">
                                                                        {schedule.subjectName}
                                                                    </span>

                                                                    <span className="hidden shrink-0 text-xs text-amber-500 sm:inline">
                                                                        {schedule.startTime} - {schedule.endTime}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        );
                                                    }

                                                    return (
                                                        <div
                                                            key={schedule.id}
                                                            className={`
                                                                flex min-w-0 items-start gap-3 rounded-xl p-3 transition-all sm:gap-4 sm:p-4
                                                                ${
                                                                    isNow
                                                                        ? 'border-2 border-blue-300/60 bg-blue-50/90 shadow-sm'
                                                                        : isPast
                                                                        ? 'border border-slate-100 bg-slate-50/70 opacity-70'
                                                                        : 'border border-slate-100 bg-white hover:border-blue-200 hover:shadow-sm'
                                                                }
                                                            `}
                                                        >
                                                            <div className="w-12 shrink-0 pt-0.5 text-xs font-semibold text-slate-600 sm:w-16 sm:text-sm">
                                                                {schedule.startTime}
                                                            </div>

                                                            <div className="min-w-0 flex-1">
                                                                <div className="flex min-w-0 flex-wrap items-center gap-2">
                                                                    <span
                                                                        className="h-2.5 w-2.5 shrink-0 rounded-full shadow-sm sm:h-3 sm:w-3"
                                                                        style={{
                                                                            backgroundColor:
                                                                                schedule.subjectColor,
                                                                        }}
                                                                    />

                                                                    <span className="max-w-full truncate text-sm font-bold text-slate-800 sm:text-base">
                                                                        {schedule.subjectName}
                                                                    </span>

                                                                    <span className="max-w-full truncate rounded-lg bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                                                                        {schedule.className}
                                                                    </span>

                                                                    <span className="flex min-w-0 max-w-full items-center gap-1 text-xs text-slate-500">
                                                                        <MapPin className="h-3 w-3 shrink-0" />

                                                                        <span className="truncate">
                                                                            {schedule.roomName}
                                                                        </span>
                                                                    </span>

                                                                    <div className="ml-auto shrink-0">
                                                                        {isNow && (
                                                                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-600 sm:text-xs">
                                                                                <CheckCircle className="h-3 w-3" />
                                                                                Mengajar
                                                                            </span>
                                                                        )}

                                                                        {isPast && (
                                                                            <span className="inline-flex items-center gap-1 rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-400 sm:text-xs">
                                                                                <XCircle className="h-3 w-3" />
                                                                                Selesai
                                                                            </span>
                                                                        )}

                                                                        {!isNow && !isPast && (
                                                                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 sm:text-xs">
                                                                                <Clock className="h-3 w-3" />
                                                                                Akan datang
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                {schedule.notes && (
                                                                    <p className="mt-1 truncate text-xs text-slate-500 sm:text-sm">
                                                                        {schedule.notes}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>

                                    {/* BOTTOM CARDS */}

                                    <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-2">
                                        {/* AGENDA */}

                                        <div className="min-w-0 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
                                            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-800">
                                                <Bell className="h-4 w-4 text-blue-500" />
                                                Agenda Mendatang
                                            </h3>

                                            <div className="custom-scrollbar max-h-[240px] space-y-3 overflow-y-auto pr-1">
                                                {UPCOMING_EVENTS.filter(
                                                    (event) => event.branchId === selectedBranch
                                                ).map((event) => (
                                                    <div
                                                        key={event.id}
                                                        className="min-w-0 rounded-xl border border-slate-100 bg-slate-50/80 p-3 transition hover:border-blue-200"
                                                    >
                                                        <p className="flex min-w-0 items-start gap-1.5 text-xs font-semibold text-slate-800 sm:text-sm">
                                                            <Star className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />

                                                            <span className="min-w-0">{event.title}</span>
                                                        </p>

                                                        <div className="mt-1.5 flex min-w-0 flex-wrap items-center gap-1.5 text-[10px] text-slate-500 sm:text-xs">
                                                            <span className="flex items-center gap-1">
                                                                <Calendar className="h-3 w-3 shrink-0" />
                                                                {event.date}
                                                            </span>

                                                            {event.time && (
                                                                <>
                                                                    <span className="text-slate-300">•</span>

                                                                    <span className="flex items-center gap-1">
                                                                        <Clock className="h-3 w-3 shrink-0" />
                                                                        {event.time}
                                                                    </span>
                                                                </>
                                                            )}

                                                            {event.location && (
                                                                <>
                                                                    <span className="text-slate-300">•</span>

                                                                    <span className="flex min-w-0 max-w-full items-center gap-1">
                                                                        <MapPin className="h-3 w-3 shrink-0" />

                                                                        <span className="truncate">
                                                                            {event.location}
                                                                        </span>
                                                                    </span>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <button
                                                onClick={() =>
                                                    router.push('/guru/jadwal/buat')
                                                }
                                                className="mt-4 flex w-full items-center justify-center gap-1 rounded-xl border border-dashed border-blue-200 py-2 text-xs font-medium text-blue-600 transition hover:border-blue-300 hover:bg-blue-50 sm:text-sm"
                                            >
                                                <Plus className="h-4 w-4" />
                                                Tambah Agenda
                                            </button>
                                        </div>

                                        {/* JADWAL BERIKUTNYA */}

                                        <div className="min-w-0 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
                                            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-800">
                                                <ClockArrowUp className="h-4 w-4 text-amber-500" />
                                                Jadwal Berikutnya
                                            </h3>

                                            {nextSchedule ? (
                                                <div className="rounded-xl border border-amber-200/60 bg-amber-50/80 p-3 sm:p-4">
                                                    <div className="flex min-w-0 items-center gap-3">
                                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-200/50 text-amber-700 sm:h-10 sm:w-10">
                                                            <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                                                        </div>

                                                        <div className="min-w-0">
                                                            <p className="text-base font-bold text-amber-800 sm:text-lg">
                                                                {nextSchedule.startTime} - {nextSchedule.endTime}
                                                            </p>

                                                            <p className="truncate text-xs font-semibold text-slate-700 sm:text-sm">
                                                                {nextSchedule.subjectName} • {nextSchedule.className}
                                                            </p>

                                                            <p className="flex min-w-0 items-center gap-1 truncate text-[10px] text-slate-500 sm:text-xs">
                                                                <MapPin className="h-3 w-3 shrink-0" />

                                                                <span className="truncate">
                                                                    {nextSchedule.roomName}
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex min-h-[120px] items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
                                                    <p className="text-xs text-slate-400">
                                                        Tidak ada jadwal berikutnya
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

// ============================================================
// MOON ICON
// ============================================================

function Moon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
    );
}