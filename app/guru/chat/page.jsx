"use client";

import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
  MessageSquare,
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Check,
  CheckCheck,
} from "lucide-react";

const conversations = [
  {
    id: 1,
    name: "Bagas Saputra",
    role: "Siswa - Kelas 8A",
    lastMessage: "Terima kasih Pak/Bu penjelasannya",
    time: "10.24",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Nadia Putri",
    role: "Siswa - Kelas 8B",
    lastMessage: "Baik, saya kumpulkan besok pagi",
    time: "09.51",
    unread: 0,
    online: true,
  },
  {
    id: 3,
    name: "Wali Kelas 9A",
    role: "Grup - 3 anggota",
    lastMessage: "Rizky: Jadwal live class diundur ya",
    time: "Kemarin",
    unread: 0,
    online: false,
  },
  {
    id: 4,
    name: "Aulia Rahma",
    role: "Siswa - Kelas 9A",
    lastMessage: "Izin Pak/Bu, saya sakit hari ini",
    time: "Kemarin",
    unread: 1,
    online: false,
  },
];

const messagesData = {
  1: [
    { id: 1, from: "them", text: "Pak/Bu, untuk soal nomor 5 apakah jawabannya benar?", time: "10.10" },
    { id: 2, from: "me", text: "Coba dicek lagi penggunaan subjeknya, sudah tepat menurut saya.", time: "10.15", read: true },
    { id: 3, from: "them", text: "Terima kasih Pak/Bu penjelasannya", time: "10.24" },
  ],
  2: [
    { id: 1, from: "them", text: "Pak/Bu, tugas boleh dikumpulkan besok?", time: "09.40" },
    { id: 2, from: "me", text: "Boleh, paling lambat jam 9 pagi ya", time: "09.45", read: true },
    { id: 3, from: "them", text: "Baik, saya kumpulkan besok pagi", time: "09.51" },
  ],
  3: [
    { id: 1, from: "them", text: "Rizky: Jadwal live class diundur ya", time: "Kemarin" },
  ],
  4: [
    { id: 1, from: "them", text: "Izin Pak/Bu, saya sakit hari ini", time: "Kemarin" },
  ],
};

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeChat, setActiveChat] = useState(conversations[0]);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState(messagesData);

  const notifications = [
    { id: 1, title: "Pengumuman Libur Semester", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Deadline Input Nilai", desc: "Dikirim 5 jam lalu", read: false },
  ];

  const handleSend = () => {
    if (!messageText.trim()) return;
    const newMsg = {
      id: Date.now(),
      from: "me",
      text: messageText,
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      read: false,
    };
    setMessages((prev) => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), newMsg],
    }));
    setMessageText("");
  };

  const activeMessages = messages[activeChat.id] || [];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        active="chat"
        setActive={() => {}}
        collapsed={!sidebarOpen}
        setCollapsed={(value) => setSidebarOpen(!value)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          notifications={notifications}
          user={{ name: "Bapak/Ibu Guru", email: "guru@smartschool.com", avatar: "G" }}
        />
        <main className="flex-1 overflow-hidden p-4 sm:p-6 md:p-8">
          <div className="max-w-5xl mx-auto h-full">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 rounded-lg bg-indigo-500 text-white shadow-sm">
                <MessageSquare size={18} />
              </div>
              <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">Chat</h1>
            </div>

            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm h-[calc(100%-3.5rem)] flex overflow-hidden">

              {/* CONVERSATION LIST */}
              <div className="w-full sm:w-72 border-r border-slate-100 flex flex-col flex-shrink-0">
                <div className="p-3.5 border-b border-slate-100">
                  <div className="relative">
                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari percakapan..."
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
                  {conversations.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setActiveChat(c)}
                      className={`w-full flex items-center gap-3 p-3.5 text-left transition-colors ${
                        activeChat.id === c.id ? "bg-indigo-50/60" : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                          {c.name.charAt(0)}
                        </div>
                        {c.online && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium text-slate-800 truncate">{c.name}</p>
                          <span className="text-[10px] text-slate-400 flex-shrink-0">{c.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate">{c.role}</p>
                        <p className={`text-xs truncate mt-0.5 ${c.unread > 0 ? "text-slate-700 font-medium" : "text-slate-500"}`}>
                          {c.lastMessage}
                        </p>
                      </div>
                      {c.unread > 0 && (
                        <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                          {c.unread}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* CHAT WINDOW */}
              <div className="hidden sm:flex flex-col flex-1 min-w-0">
                {/* Chat header */}
                <div className="flex items-center justify-between p-3.5 border-b border-slate-100 flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                        {activeChat.name.charAt(0)}
                      </div>
                      {activeChat.online && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{activeChat.name}</p>
                      <p className="text-[11px] text-slate-400">
                        {activeChat.online ? "Online" : activeChat.role}
                      </p>
                    </div>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                    <MoreVertical size={17} />
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/40">
                  {activeMessages.map((m) => (
                    <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                          m.from === "me"
                            ? "bg-indigo-600 text-white rounded-br-sm"
                            : "bg-white border border-slate-200 text-slate-700 rounded-bl-sm"
                        }`}
                      >
                        <p>{m.text}</p>
                        <div
                          className={`flex items-center gap-1 mt-1 justify-end ${
                            m.from === "me" ? "text-indigo-200" : "text-slate-400"
                          }`}
                        >
                          <span className="text-[10px]">{m.time}</span>
                          {m.from === "me" &&
                            (m.read ? <CheckCheck size={12} /> : <Check size={12} />)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-3.5 border-t border-slate-100 flex items-center gap-2 flex-shrink-0">
                  <button className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0">
                    <Paperclip size={18} />
                  </button>
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Tulis pesan..."
                    className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                  <button
                    onClick={handleSend}
                    className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex-shrink-0"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}