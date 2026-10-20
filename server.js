import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Inisialisasi Path untuk ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

if (!process.env.DB_PASSWORD) {
    throw new Error('DB_PASSWORD belum dikonfigurasi');
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Konfigurasi Folder Upload (Sesuaikan dengan path di Hostinger)
const uploadDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Konfigurasi Multer (Penyimpanan Gambar)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Melayani file gambar agar bisa diakses browser
app.use('/uploads', express.static(uploadDir));

// Koneksi Database MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'u633344023_pan_ntt'
});

db.connect((err) => {
    if (err) {
        console.error('Gagal koneksi ke MySQL:', err);
        return;
    }
    console.log('Terhubung ke database MySQL');
});

// Domain Produksi
const DOMAIN = 'https://panwebtes.katongpung.com';

// --- API ROUTES (GET) ---

app.get('/api/berita', (req, res) => {
    db.query('SELECT * FROM berita ORDER BY date DESC', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.get('/api/dokumentasi', (req, res) => {
    db.query('SELECT * FROM dokumentasi', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.get('/api/pengurus', (req, res) => {
    db.query('SELECT * FROM pengurus', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// --- API ROUTES (POST - TAMBAH) ---

app.post('/api/berita', upload.single('imageFile'), (req, res) => {
    const { title, excerpt, content, date } = req.body;
    const imageUrl = req.file ? `${DOMAIN}/uploads/${req.file.filename}` : '';
    const sql = "INSERT INTO berita (title, excerpt, content, image, date) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [title, excerpt, content, imageUrl, date], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Berita berhasil ditambah" });
    });
});

app.post('/api/dokumentasi', upload.single('imageFile'), (req, res) => {
    const { title } = req.body;
    const imageUrl = req.file ? `${DOMAIN}/uploads/${req.file.filename}` : '';
    db.query("INSERT INTO dokumentasi (title, image) VALUES (?, ?)", [title, imageUrl], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Foto berhasil ditambah" });
    });
});

app.post('/api/pengurus', upload.single('imageFile'), (req, res) => {
    const { nama, jabatan } = req.body;
    const imageUrl = req.file ? `${DOMAIN}/uploads/${req.file.filename}` : '';
    db.query("INSERT INTO pengurus (nama, jabatan, image) VALUES (?, ?, ?)", [nama, jabatan, imageUrl], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Pengurus berhasil ditambah" });
    });
});

// --- API ROUTES (PUT - EDIT) ---

app.put('/api/berita/:id', upload.single('imageFile'), (req, res) => {
    const { title, excerpt, content, date } = req.body;
    const { id } = req.params;
    let sql = "UPDATE berita SET title=?, excerpt=?, content=?, date=? WHERE id=?";
    let params = [title, excerpt, content, date, id];

    if (req.file) {
        const imageUrl = `${DOMAIN}/uploads/${req.file.filename}`;
        sql = "UPDATE berita SET title=?, excerpt=?, content=?, date=?, image=? WHERE id=?";
        params = [title, excerpt, content, date, imageUrl, id];
    }
    db.query(sql, params, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Berita diperbarui" });
    });
});

app.put('/api/dokumentasi/:id', upload.single('imageFile'), (req, res) => {
    const { title } = req.body;
    const { id } = req.params;
    let sql = "UPDATE dokumentasi SET title=? WHERE id=?";
    let params = [title, id];

    if (req.file) {
        const imageUrl = `${DOMAIN}/uploads/${req.file.filename}`;
        sql = "UPDATE dokumentasi SET title=?, image=? WHERE id=?";
        params = [title, imageUrl, id];
    }
    db.query(sql, params, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Foto diperbarui" });
    });
});

app.put('/api/pengurus/:id', upload.single('imageFile'), (req, res) => {
    const { nama, jabatan } = req.body;
    const { id } = req.params;
    let sql = "UPDATE pengurus SET nama=?, jabatan=? WHERE id=?";
    let params = [nama, jabatan, id];

    if (req.file) {
        const imageUrl = `${DOMAIN}/uploads/${req.file.filename}`;
        sql = "UPDATE pengurus SET nama=?, jabatan=?, image=? WHERE id=?";
        params = [nama, jabatan, imageUrl, id];
    }
    db.query(sql, params, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Pengurus diperbarui" });
    });
});

// --- API ROUTES (DELETE - HAPUS) ---

app.delete('/api/:type/:id', (req, res) => {
    const { type, id } = req.params;
    const allowedTypes = ['berita', 'dokumentasi', 'pengurus'];
    if (!allowedTypes.includes(type)) return res.status(400).send("Tipe tidak valid");

    db.query(`DELETE FROM ${type} WHERE id = ?`, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Data berhasil dihapus" });
    });
});

// Jalankan Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server API berjalan di port ${PORT}`);
});
