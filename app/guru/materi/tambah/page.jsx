// app/guru/materi/upload/page.jsx
'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Upload,
  File,
  FileText,
  FileSpreadsheet,
  FileArchive,
  FileVideo,
  X,
  CheckCircle,
  AlertCircle,
  Info,
  BookOpen,
  Users,
  School,
  User,
  Clock,
  HardDrive,
  Download,
  Eye,
  Trash2,
  Save,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Home,
  ShieldCheck,
  Layers,
  Globe,
  TrendingUp,
  BarChart3,
  Zap,
  Crown,
  Gift,
} from 'lucide-react';

import Sidebar from '../../../components/Sidebar';
import Header from '../../../components/Header';

// ============================================================
// DATA DUMMY
// ============================================================
const MOCK_CLASSES = [
  { id: '1', name: 'X RPL 1' },
  { id: '2', name: 'X RPL 2' },
  { id: '3', name: 'XI RPL 1' },
  { id: '4', name: 'XI RPL 2' },
  { id: '5', name: 'XII RPL 1' },
  { id: '6', name: 'XII RPL 2' },
];

const MOCK_SUBJECTS = [
  { id: '1', name: 'Matematika', icon: '📐' },
  { id: '2', name: 'Pemrograman Dasar', icon: '💻' },
  { id: '3', name: 'Bahasa Indonesia', icon: '📖' },
  { id: '4', name: 'Bahasa Inggris', icon: '🌍' },
  { id: '5', name: 'IPA', icon: '🔬' },
  { id: '6', name: 'PKN', icon: '🏛️' },
  { id: '7', name: 'Sejarah', icon: '📜' },
  { id: '8', name: 'Seni Budaya', icon: '🎨' },
];

const MOCK_BRANCHES = [
  { id: 'b1', name: 'SMK Taruna Bhakti Depok' },
  { id: 'b2', name: 'SMK Taruna Bhakti Jakarta' },
  { id: 'b3', name: 'SMK Taruna Bhakti Bandung' },
];

const SUPPORTED_FORMATS = [
  { ext: 'PDF', icon: FileText, desc: 'Dokumen PDF', maxSize: '50MB', color: 'text-red-500', bg: 'bg-red-50' },
  { ext: 'DOC / DOCX', icon: FileText, desc: 'Dokumen Word', maxSize: '50MB', color: 'text-blue-500', bg: 'bg-blue-50' },
  { ext: 'PPT / PPTX', icon: FileText, desc: 'Presentasi PowerPoint', maxSize: '50MB', color: 'text-orange-500', bg: 'bg-orange-50' },
  { ext: 'XLS / XLSX', icon: FileSpreadsheet, desc: 'Spreadsheet Excel', maxSize: '50MB', color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { ext: 'MP4', icon: FileVideo, desc: 'Video', maxSize: '50MB', color: 'text-purple-500', bg: 'bg-purple-50' },
  { ext: 'ZIP', icon: FileArchive, desc: 'Arsip File', maxSize: '50MB', color: 'text-amber-500', bg: 'bg-amber-50' },
];

const RECENT_UPLOADS = [
  {
    id: '1',
    title: 'Persamaan Linear Satu Variabel.pdf',
    subject: 'Matematika',
    class: 'X RPL 1',
    date: '20 Mei 2025, 10:30',
    size: '2.45 MB',
    type: 'pdf',
    status: 'published',
    views: 42,
  },
  {
    id: '2',
    title: 'Modul Pemrograman Dasar Bab 2.docx',
    subject: 'Pemrograman Dasar',
    class: 'X RPL 2',
    date: '19 Mei 2025, 14:15',
    size: '1.8 MB',
    type: 'docx',
    status: 'draft',
    views: 0,
  },
  {
    id: '3',
    title: 'PPT Sejarah Indonesia Bab 4.pptx',
    subject: 'Sejarah',
    class: 'XI RPL 1',
    date: '18 Mei 2025, 09:45',
    size: '4.2 MB',
    type: 'pptx',
    status: 'published',
    views: 28,
  },
];

// ============================================================
// KOMPONEN UTAMA
// ============================================================
export default function UploadMateriPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    classId: '',
    subjectId: '',
    title: '',
    description: '',
  });

  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [recentUploads, setRecentUploads] = useState(RECENT_UPLOADS);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateFile = (file) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/zip',
      'video/mp4',
    ];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx|ppt|pptx|xls|xlsx|zip|mp4)$/i)) {
      setFileError('Format file tidak didukung. Gunakan PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, ZIP, atau MP4.');
      return false;
    }
    if (file.size > maxSize) {
      setFileError('Ukuran file maksimal 5MB.');
      return false;
    }
    setFileError('');
    return true;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
      } else {
        setFile(null);
        e.target.value = '';
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
      } else {
        setFile(null);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.classId) {
      alert('Pilih kelas terlebih dahulu.');
      return;
    }
    if (!formData.subjectId) {
      alert('Pilih mata pelajaran.');
      return;
    }
    if (!formData.title.trim()) {
      alert('Masukkan judul materi.');
      return;
    }
    if (!file) {
      alert('Pilih file materi terlebih dahulu.');
      return;
    }

    setIsUploading(true);

    setTimeout(() => {
      const newUpload = {
        id: Date.now().toString(),
        title: formData.title + (file ? '.' + file.name.split('.').pop() : ''),
        subject: MOCK_SUBJECTS.find(s => s.id === formData.subjectId)?.name || '',
        class: MOCK_CLASSES.find(c => c.id === formData.classId)?.name || '',
        date: new Date().toLocaleString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        type: file.name.split('.').pop(),
        status: 'published',
        views: 0,
      };
      setRecentUploads(prev => [newUpload, ...prev]);

      setIsUploading(false);
      setUploadSuccess(true);

      setFormData({ classId: '', subjectId: '', title: '', description: '' });
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';

      setTimeout(() => setUploadSuccess(false), 4000);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({ classId: '', subjectId: '', title: '', description: '' });
    setFile(null);
    setFileError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const getClass = () => MOCK_CLASSES.find(c => c.id === formData.classId);
  const getSubject = () => MOCK_SUBJECTS.find(s => s.id === formData.subjectId);
  const selectedClass = getClass();
  const selectedSubject = getSubject();

  // Statistik
  const stats = [
    { label: 'Total Materi', value: recentUploads.length, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Diterbitkan', value: recentUploads.filter(u => u.status === 'published').length, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Total Views', value: recentUploads.reduce((acc, u) => acc + (u.views || 0), 0), icon: Eye, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Total Size', value: '8.45 MB', icon: HardDrive, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={{ name: "Bu Sari", email: "guru@smartschool.com", avatar: "BS" }} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 w-full">
          <div className="w-full max-w-[1600px] mx-auto space-y-5 sm:space-y-6">
            {/* ===== BREADCRUMB ===== */}
            <nav className="flex items-center gap-2 text-sm text-slate-500">
              <Home className="w-4 h-4 text-blue-500" />
              <span>Dashboard</span>
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <span>Materi</span>
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <span className="font-semibold text-slate-700">Upload Materi</span>
            </nav>

            {/* ===== HEADER PREMIUM ===== */}
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6 sm:p-8 lg:p-10 shadow-2xl shadow-blue-900/20 border border-blue-800/20">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
              
              {/* Grid pattern overlay */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30 pointer-events-none" />

              <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start gap-5">
                  <div className="hidden sm:flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/20 backdrop-blur-sm border border-blue-400/20 shadow-lg shadow-blue-500/10">
                    <Upload className="w-7 h-7 text-blue-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                        Upload Materi
                      </h1>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/20 text-blue-300 text-xs font-medium backdrop-blur-sm">
                        <Sparkles className="w-3 h-3" />
                        Premium
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-300/80 mt-0.5">
                      <FileText className="w-4 h-4 text-blue-400" />
                      <span>Unggah dan bagikan materi pembelajaran kepada siswa dengan mudah</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => router.push('/guru/materi')}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl text-sm font-medium transition-all duration-300 border border-white/20 hover:border-white/30 flex-shrink-0"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 duration-300" />
                  Kembali
                </button>
              </div>

              {/* Quick Stats */}
              <div className="relative mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-3.5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                        <stat.icon className={`w-4 h-4 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-white">{stat.value}</p>
                        <p className="text-[10px] text-white/50 uppercase tracking-wider">{stat.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ===== GRID UTAMA ===== */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
              {/* FORM - 2/3 kolom */}
              <div className="lg:col-span-2 space-y-5">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* FORM UPLOAD */}
                  <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200/80 p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/60">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-md shadow-blue-200">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="font-bold text-slate-800 text-base">Form Upload Materi</h2>
                        <p className="text-xs text-slate-400">Isi semua field yang diperlukan</p>
                      </div>
                      <div className="ml-auto flex items-center gap-1.5 text-xs text-slate-400">
                        <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                        <span>Required fields marked with *</span>
                      </div>
                    </div>

                    <div className="space-y-5">
                      {/* Kelas */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                          Kelas <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <select
                            name="classId"
                            value={formData.classId}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm focus:ring-2 focus:ring-blue-400 outline-none transition-all hover:border-blue-300 appearance-none"
                          >
                            <option value="">Pilih kelas</option>
                            {MOCK_CLASSES.map(c => (
                              <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                          </select>
                          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Mata Pelajaran */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                          Mata Pelajaran <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <select
                            name="subjectId"
                            value={formData.subjectId}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm focus:ring-2 focus:ring-blue-400 outline-none transition-all hover:border-blue-300 appearance-none"
                          >
                            <option value="">Pilih mata pelajaran</option>
                            {MOCK_SUBJECTS.map(s => (
                              <option key={s.id} value={s.id}>{s.icon} {s.name}</option>
                            ))}
                          </select>
                          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Judul */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                          Judul Materi <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          placeholder="Contoh: Persamaan Linear Satu Variabel"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm focus:ring-2 focus:ring-blue-400 outline-none transition-all hover:border-blue-300"
                        />
                      </div>

                      {/* Deskripsi */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                          Deskripsi Materi
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows={3}
                          placeholder="Tulis deskripsi singkat tentang materi ini."
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm focus:ring-2 focus:ring-blue-400 outline-none transition-all hover:border-blue-300 resize-none"
                        />
                      </div>

                      {/* File Upload */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                          File Materi <span className="text-red-500">*</span>
                        </label>
                        <div
                          className={`
                            relative border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-all duration-200
                            ${isDragging ? 'border-blue-500 bg-blue-50/80 shadow-lg shadow-blue-100/50' : 'border-slate-200 hover:border-blue-300 bg-slate-50/30'}
                            ${file ? 'border-blue-400 bg-blue-50/40' : ''}
                            ${fileError ? 'border-red-400 bg-red-50/30' : ''}
                          `}
                          onDrop={handleDrop}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                        >
                          <input
                            ref={fileInputRef}
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                            accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.mp4"
                          />

                          {!file ? (
                            <div className="space-y-4">
                              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shadow-inner">
                                <Upload className="w-10 h-10 text-blue-600" />
                              </div>
                              <div>
                                <p className="text-sm text-slate-600">
                                  <span className="font-semibold">Drag & drop</span> file di sini atau
                                </p>
                                <button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="mt-1.5 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-all duration-300 shadow-sm shadow-blue-200 hover:shadow-blue-300"
                                >
                                  <Upload className="w-4 h-4" />
                                  Pilih File
                                </button>
                              </div>
                              <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
                                <span className="flex items-center gap-1">
                                  <FileText className="w-3 h-3" /> PDF, DOC, PPT, XLS
                                </span>
                                <span className="text-slate-300">|</span>
                                <span>Max 5MB</span>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between gap-4 text-left">
                              <div className="flex items-center gap-4 min-w-0">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0 shadow-inner">
                                  <File className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="min-w-0">
                                  <p className="font-medium text-slate-700 truncate">{file.name}</p>
                                  <p className="text-xs text-slate-400">
                                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={removeFile}
                                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-red-500 transition-all"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          )}
                        </div>
                        {fileError && (
                          <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {fileError}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* TOMBOL AKSI PREMIUM */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex-1 sm:flex-none px-8 py-3 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-800 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-md group"
                    >
                      <RotateCcw className="w-4 h-4 transition-transform group-hover:-rotate-180 duration-500" />
                      Reset Form
                    </button>
                    <button
                      type="submit"
                      disabled={isUploading}
                      className="flex-1 sm:flex-none px-10 py-3 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 disabled:opacity-70 disabled:cursor-not-allowed group"
                    >
                      {isUploading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Mengunggah...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 duration-300" />
                          Upload Materi
                          <Crown className="w-3.5 h-3.5 text-yellow-300" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* SIDEBAR KANAN PREMIUM */}
              <div className="lg:col-span-1 space-y-5">
                {/* Informasi Upload */}
                <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200/80 p-5 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/60">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                      <Info className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-700 text-sm">Informasi Upload</h3>
                  </div>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-sm shadow-blue-200 flex-shrink-0">
                        G
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Guru</p>
                        <p className="font-medium text-slate-700">Bapak/Ibu Guru</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-xs text-slate-400">Mata Pelajaran</p>
                        <p className="font-medium text-slate-700 text-sm truncate">{selectedSubject?.name || '-'}</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-xs text-slate-400">Kelas</p>
                        <p className="font-medium text-slate-700 text-sm">{selectedClass?.name || '-'}</p>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-xs text-slate-400">Cabang / Sekolah</p>
                      <p className="font-medium text-slate-700 text-sm flex items-center gap-1.5">
                        <School className="w-3.5 h-3.5 text-slate-400" />
                        SMK Taruna Bhakti Depok
                      </p>
                    </div>
                  </div>
                </div>

                {/* Format File yang Didukung */}
                <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200/80 p-5 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/60">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600">
                      <HardDrive className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-700 text-sm">Format File yang Didukung</h3>
                  </div>
                  <div className="space-y-2.5">
                    {SUPPORTED_FORMATS.map((fmt, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm p-2.5 rounded-xl hover:bg-slate-50 transition-all">
                        <div className={`w-8 h-8 rounded-lg ${fmt.bg} flex items-center justify-center flex-shrink-0`}>
                          <fmt.icon className={`w-4 h-4 ${fmt.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-700 text-xs">{fmt.ext}</p>
                          <p className="text-[10px] text-slate-400">{fmt.desc}</p>
                        </div>
                        <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Maks. {fmt.maxSize}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tips Upload Premium */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 border border-blue-100/80 p-5 shadow-lg shadow-blue-100/30">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-200/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />
                  
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 rounded-lg bg-gradient-to-br from-amber-400 to-amber-500 shadow-sm shadow-amber-200">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="font-semibold text-blue-700 text-sm">Tips Upload Materi</h3>
                    </div>
                    <ul className="space-y-2.5 text-sm text-slate-600">
                      <li className="flex items-start gap-3 p-2.5 bg-white/60 rounded-xl border border-blue-100/50">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>Pastikan materi sesuai dengan kurikulum yang berlaku</span>
                      </li>
                      <li className="flex items-start gap-3 p-2.5 bg-white/60 rounded-xl border border-blue-100/50">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>Gunakan judul yang jelas dan deskripsi yang informatif</span>
                      </li>
                      <li className="flex items-start gap-3 p-2.5 bg-white/60 rounded-xl border border-blue-100/50">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>Periksa kembali file sebelum diupload</span>
                      </li>
                      <li className="flex items-start gap-3 p-2.5 bg-white/60 rounded-xl border border-blue-100/50">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>Materi akan langsung tersedia untuk siswa setelah berhasil diupload</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== MATERI TERBARU PREMIUM ===== */}
            <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200/80 p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/60">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-md shadow-blue-200">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-800 text-base">Materi Terbaru</h2>
                    <p className="text-xs text-slate-400">Daftar materi yang baru saja diupload</p>
                  </div>
                </div>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-all flex items-center gap-1 hover:gap-2">
                  Lihat semua
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-x-auto -mx-2">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-left">
                      <th className="pb-3 px-2 font-semibold text-slate-500 text-xs uppercase tracking-wider">Nama Materi</th>
                      <th className="pb-3 px-2 font-semibold text-slate-500 text-xs uppercase tracking-wider hidden sm:table-cell">Mata Pelajaran</th>
                      <th className="pb-3 px-2 font-semibold text-slate-500 text-xs uppercase tracking-wider hidden md:table-cell">Kelas</th>
                      <th className="pb-3 px-2 font-semibold text-slate-500 text-xs uppercase tracking-wider hidden lg:table-cell">Tanggal Upload</th>
                      <th className="pb-3 px-2 font-semibold text-slate-500 text-xs uppercase tracking-wider">Ukuran</th>
                      <th className="pb-3 px-2 font-semibold text-slate-500 text-xs uppercase tracking-wider hidden xl:table-cell">Status</th>
                      <th className="pb-3 px-2 font-semibold text-slate-500 text-xs uppercase tracking-wider text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentUploads.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/70 transition-all group">
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.type === 'pdf' ? 'bg-red-50 text-red-500' : item.type === 'docx' ? 'bg-blue-50 text-blue-500' : item.type === 'pptx' ? 'bg-orange-50 text-orange-500' : 'bg-slate-50 text-slate-500'}`}>
                              <File className="w-4 h-4" />
                            </div>
                            <span className="font-medium text-slate-700 truncate max-w-[120px] sm:max-w-[180px] lg:max-w-none">{item.title}</span>
                          </div>
                        </td>
                        <td className="py-3 px-2 hidden sm:table-cell text-slate-600 text-xs">{item.subject}</td>
                        <td className="py-3 px-2 hidden md:table-cell text-slate-600 text-xs">{item.class}</td>
                        <td className="py-3 px-2 hidden lg:table-cell text-slate-400 text-xs">{item.date}</td>
                        <td className="py-3 px-2 text-slate-500 text-xs">{item.size}</td>
                        <td className="py-3 px-2 hidden xl:table-cell">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                            item.status === 'published' 
                              ? 'bg-emerald-50 text-emerald-600' 
                              : 'bg-amber-50 text-amber-600'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'published' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                            {item.status === 'published' ? 'Diterbitkan' : 'Draf'}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <div className="flex items-center justify-end gap-0.5">
                            <button className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-all opacity-0 group-hover:opacity-100">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-all opacity-0 group-hover:opacity-100">
                              <Download className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-all opacity-0 group-hover:opacity-100">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ===== SUCCESS TOAST PREMIUM ===== */}
          {uploadSuccess && (
            <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-bottom-4 duration-300">
              <div className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-emerald-50 to-emerald-100/80 border border-emerald-200 rounded-2xl shadow-2xl shadow-emerald-200/50 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-200">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-emerald-800 text-sm">Upload Berhasil!</p>
                  <p className="text-emerald-600 text-xs">Materi telah tersedia untuk siswa.</p>
                </div>
                <button onClick={() => setUploadSuccess(false)} className="p-1.5 hover:bg-emerald-200/50 rounded-lg transition-all">
                  <X className="w-4 h-4 text-emerald-600" />
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}