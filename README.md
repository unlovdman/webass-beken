# Praktikum Management System API

Backend sistem manajemen praktikum yang dibangun menggunakan Node.js, Express, dan PostgreSQL. Sistem ini menyediakan API untuk mengelola praktikum, asistensi, kelompok, laporan, dan penilaian.

## 🚀 Fitur

- Autentikasi dan Otorisasi (JWT)
- Manajemen User (Dosen, Asisten, Mahasiswa)
- Pengelolaan Praktikum
- Manajemen Kelompok Praktikum
- Sistem Asistensi
- Upload dan Download Laporan
- Penilaian Praktikum
- API Documentation dengan Swagger
- Database PostgreSQL dengan Sequelize ORM

## 📋 Prasyarat

Sebelum menjalankan proyek ini, pastikan Anda telah menginstall:

- Node.js (v14 atau lebih baru)
- PostgreSQL
- npm atau yarn

## 🛠️ Instalasi

1. Clone repository

```bash
git clone [URL_REPOSITORY]
cd praktikum-management-system
```

2. Install dependencies

```bash
npm install
```

3. Konfigurasi environment variables
   Buat file `.env` di root directory dan isi dengan:

```env
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=your_db_name
DB_PORT=5432

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=24h
```

4. Jalankan server

```bash
# Development mode dengan nodemon
npm run dev

# Production mode
npm start
```

## 📚 API Documentation

API documentation tersedia melalui Swagger UI di endpoint `/api-docs` setelah server berjalan.

### Endpoint Utama:

- 🔐 Authentication

  - POST /api/auth/register
  - POST /api/auth/login
- 👥 Users

  - GET /api/users
  - GET /api/users/:id
  - PUT /api/users/:id
  - DELETE /api/users/:id
- 📚 Praktikum

  - GET /api/praktikum
  - POST /api/praktikum
  - GET /api/praktikum/:id
  - PUT /api/praktikum/:id
  - DELETE /api/praktikum/:id
- 👥 Kelompok

  - GET /api/kelompok
  - POST /api/kelompok
  - GET /api/kelompok/:id
  - PUT /api/kelompok/:id
  - DELETE /api/kelompok/:id
- 📝 Asistensi

  - GET /api/asistensi
  - POST /api/asistensi
  - GET /api/asistensi/:id
  - PUT /api/asistensi/:id
  - DELETE /api/asistensi/:id
- 📊 Nilai

  - GET /api/nilai
  - POST /api/nilai
  - GET /api/nilai/:id
  - PUT /api/nilai/:id
  - DELETE /api/nilai/:id

## 🗄️ Database Structure

Sistem menggunakan PostgreSQL dengan Sequelize ORM. Model utama meliputi:

- User (admin, asisten, mahasiswa)
- Praktikum
- Kelompok
- Asistensi
- Laporan
- Nilai
- Pertemuan

## 🔒 Security

- Autentikasi menggunakan JWT (JSON Web Tokens)
- Password di-hash menggunakan bcrypt
- CORS enabled
- Environment variables untuk konfigurasi sensitif

## 🛠️ Built With

- [Node.js](https://nodejs.org/) - Runtime environment
- [Express](https://expressjs.com/) - Web framework
- [Sequelize](https://sequelize.org/) - ORM
- [PostgreSQL](https://www.postgresql.org/) - Database
- [JWT](https://jwt.io/) - Authentication
- [Swagger](https://swagger.io/) - API documentation
- [Multer](https://github.com/expressjs/multer) - File upload handling

## 📄 License

This project is licensed under the ISC License

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
