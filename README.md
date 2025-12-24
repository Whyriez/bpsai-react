# ⚛️ BPS AI Chatbot - Frontend Service

Repository ini adalah antarmuka (Frontend) untuk aplikasi BPS AI Chatbot. Aplikasi ini dibangun menggunakan **React.js**, **Tailwind CSS**, dan **Vite** untuk performa yang cepat dan responsif.

---

## 📋 Prasyarat (Prerequisites)

Pastikan di komputer Anda sudah terinstall:
- **Node.js** (Versi 16.x atau lebih baru)
- **NPM** (Node Package Manager)
- **Git**

---

## 🚀 1. Instalasi & Setup

Lakukan langkah-langkah berikut untuk menjalankan aplikasi di komputer lokal (Development).

### 1.1. Setup Project

```bash
# 1. Clone repository
git https://github.com/Whyriez/bpsai-react.git
cd bpsai-react

# 2. Install Library/Dependencies
npm install
```

---

## 🏃 2. Menjalankan Aplikasi

### Mode Development (Lokal)
Gunakan perintah ini untuk coding atau testing fitur baru. Fitur *Hot Reload* aktif (perubahan kode langsung muncul di browser).

```bash
npm run dev
```
*Aplikasi biasanya berjalan di: http://localhost:5173*

### Mode Production (Build)
Gunakan perintah ini sebelum upload ke hosting atau server production (Nginx/Vercel).

```bash
# 1. Build project menjadi file statis (HTML/CSS/JS minified)
npm run build

# 2. Preview hasil build di lokal (Opsional, untuk memastikan build sukses)
npm run preview
```

---

## 📂 Struktur Folder

Berikut adalah struktur direktori utama aplikasi ini.

```text
bpsai-frontend/
├── public/             # Aset statis (favicon, robot.txt, dll)
├── src/
│   ├── assets/         # Gambar, Logo, Font, Icon
│   ├── components/     # Komponen UI Reusable (Button, Card, Input, Modal)
│   ├── pages/          # Halaman Utama (Dashboard, Chat, Login, NotFound)
│   ├── services/       # Koneksi ke API Backend (Axios config)
│   ├── App.jsx         # Main Component & Routing
│   └── main.jsx        # Entry Point React
├── index.html          # File HTML Utama
├── package.json        # Daftar dependencies
├── tailwind.config.js  # Konfigurasi Tailwind CSS
└── vite.config.js      # Konfigurasi Vite
```

---


## 🛠️ Tech Stack Utama

- **Framework:** [React.js](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Routing:** [React Router DOM](https://reactrouter.com/)
```