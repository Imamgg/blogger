-- =============================================
-- Blog Resume Materi - Database Schema
-- Jalankan SQL ini di Supabase SQL Editor
-- =============================================

-- Tabel posts
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  category TEXT NOT NULL,
  cover_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index untuk query yang sering dipakai
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_date ON posts(date DESC);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Policy: Semua orang bisa membaca posts (public blog)
CREATE POLICY "Posts are publicly readable"
  ON posts
  FOR SELECT
  USING (true);

-- Policy: Allow insert (untuk create post dari admin)
CREATE POLICY "Posts are insertable"
  ON posts
  FOR INSERT
  WITH CHECK (true);

-- Policy: Allow update (untuk edit post dari admin)
CREATE POLICY "Posts are updatable"
  ON posts
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Policy: Allow delete (untuk hapus post dari admin)
CREATE POLICY "Posts are deletable"
  ON posts
  FOR DELETE
  USING (true);

-- =============================================
-- Seed Data - Contoh Post
-- =============================================

INSERT INTO posts (slug, title, excerpt, content, date, category, cover_image) VALUES
(
  'pengenalan-html-css',
  'Pengenalan HTML & CSS',
  'Memahami dasar-dasar HTML dan CSS untuk membangun halaman web yang terstruktur dan menarik.',
  '<h2>Apa itu HTML?</h2>
<p>HTML (HyperText Markup Language) adalah bahasa markup standar yang digunakan untuk membuat struktur halaman web. HTML menggunakan sistem tag untuk mendefinisikan elemen-elemen di halaman.</p>

<h3>Struktur Dasar HTML</h3>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="id"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;title&gt;Halaman Pertama&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;Hello World!&lt;/h1&gt;
  &lt;p&gt;Ini adalah paragraf pertama saya.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>

<h3>Tag-tag Penting HTML</h3>
<ul>
  <li><strong>&lt;h1&gt; - &lt;h6&gt;</strong>: Heading dengan level berbeda</li>
  <li><strong>&lt;p&gt;</strong>: Paragraf teks</li>
  <li><strong>&lt;a&gt;</strong>: Link/tautan</li>
  <li><strong>&lt;img&gt;</strong>: Gambar</li>
  <li><strong>&lt;div&gt;</strong>: Container/wadah</li>
  <li><strong>&lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;</strong>: List</li>
</ul>

<h2>Apa itu CSS?</h2>
<p>CSS (Cascading Style Sheets) digunakan untuk mengatur tampilan dan layout halaman web. CSS memisahkan konten (HTML) dari presentasi visual.</p>

<h3>Cara Menggunakan CSS</h3>
<p>Ada 3 cara menambahkan CSS:</p>
<ol>
  <li><strong>Inline</strong>: Langsung di atribut style elemen</li>
  <li><strong>Internal</strong>: Di dalam tag &lt;style&gt; pada &lt;head&gt;</li>
  <li><strong>External</strong>: File .css terpisah (direkomendasikan)</li>
</ol>

<h3>Contoh CSS</h3>
<pre><code>body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

h1 {
  color: #2563eb;
  font-size: 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}</code></pre>

<h3>Kesimpulan</h3>
<p>HTML dan CSS adalah fondasi utama dalam pengembangan web. HTML memberikan struktur, sementara CSS memberikan tampilan visual. Memahami keduanya dengan baik adalah langkah awal yang penting untuk menjadi web developer.</p>',
  '2026-02-20',
  'Web Development',
  NULL
),
(
  'dasar-javascript',
  'Dasar-dasar JavaScript',
  'Mempelajari konsep fundamental JavaScript: variabel, tipe data, fungsi, dan kontrol alur program.',
  '<h2>Apa itu JavaScript?</h2>
<p>JavaScript adalah bahasa pemrograman yang membuat halaman web menjadi interaktif. JavaScript berjalan di browser dan juga di server (Node.js).</p>

<h3>Variabel</h3>
<p>JavaScript memiliki 3 cara mendeklarasikan variabel:</p>
<pre><code>// var - cara lama (hindari)
var nama = "John";

// let - untuk nilai yang bisa berubah
let umur = 25;
umur = 26; // OK

// const - untuk nilai tetap
const PI = 3.14;
// PI = 3.15; // Error!</code></pre>

<h3>Tipe Data</h3>
<ul>
  <li><strong>String</strong>: Teks, diapit tanda kutip</li>
  <li><strong>Number</strong>: Angka (integer & float)</li>
  <li><strong>Boolean</strong>: true atau false</li>
  <li><strong>Array</strong>: Kumpulan data berurutan</li>
  <li><strong>Object</strong>: Kumpulan key-value pairs</li>
  <li><strong>null & undefined</strong>: Nilai kosong</li>
</ul>

<h3>Fungsi</h3>
<pre><code>// Function declaration
function sapa(nama) {
  return "Halo, " + nama + "!";
}

// Arrow function (ES6+)
const tambah = (a, b) => a + b;

// Penggunaan
console.log(sapa("Imam")); // "Halo, Imam!"
console.log(tambah(5, 3));  // 8</code></pre>

<h3>Kontrol Alur</h3>
<pre><code>// If-else
const nilai = 85;
if (nilai >= 90) {
  console.log("A");
} else if (nilai >= 80) {
  console.log("B");
} else {
  console.log("C");
}

// Loop
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// Array methods
const angka = [1, 2, 3, 4, 5];
const genap = angka.filter(n => n % 2 === 0);
const kaliDua = angka.map(n => n * 2);</code></pre>

<h3>Kesimpulan</h3>
<p>JavaScript adalah bahasa yang sangat penting untuk dikuasai. Dengan memahami variabel, tipe data, fungsi, dan kontrol alur, kamu sudah memiliki fondasi yang kuat untuk membangun aplikasi web yang interaktif.</p>',
  '2026-02-22',
  'Programming',
  NULL
),
(
  'pengenalan-react',
  'Pengenalan React.js',
  'Memahami konsep dasar React: komponen, JSX, props, dan state untuk membangun UI modern.',
  '<h2>Apa itu React?</h2>
<p>React adalah library JavaScript yang dikembangkan oleh Facebook untuk membangun user interface. React menggunakan pendekatan berbasis komponen yang membuat kode lebih modular dan reusable.</p>

<h3>JSX - JavaScript XML</h3>
<p>JSX memungkinkan kita menulis HTML di dalam JavaScript:</p>
<pre><code>// JSX
const element = &lt;h1&gt;Hello, React!&lt;/h1&gt;;

// Dengan variabel
const nama = "Imam";
const greeting = &lt;p&gt;Halo, {nama}!&lt;/p&gt;;</code></pre>

<h3>Komponen</h3>
<p>Komponen adalah building block utama di React:</p>
<pre><code>// Function Component
function Welcome({ nama }) {
  return &lt;h1&gt;Halo, {nama}!&lt;/h1&gt;;
}

// Penggunaan
&lt;Welcome nama="Imam" /&gt;</code></pre>

<h3>Props</h3>
<p>Props (properties) digunakan untuk mengirim data dari parent ke child component:</p>
<pre><code>function Card({ title, description }) {
  return (
    &lt;div className="card"&gt;
      &lt;h2&gt;{title}&lt;/h2&gt;
      &lt;p&gt;{description}&lt;/p&gt;
    &lt;/div&gt;
  );
}

// Penggunaan
&lt;Card 
  title="React" 
  description="Library untuk UI" 
/&gt;</code></pre>

<h3>State</h3>
<p>State adalah data internal komponen yang bisa berubah:</p>
<pre><code>import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    &lt;div&gt;
      &lt;p&gt;Count: {count}&lt;/p&gt;
      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;
        Tambah
      &lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>

<h3>Kesimpulan</h3>
<p>React memudahkan pembuatan UI yang kompleks dengan memecahnya menjadi komponen-komponen kecil yang reusable. Dengan memahami JSX, props, dan state, kamu sudah bisa membangun aplikasi React sederhana.</p>',
  '2026-02-24',
  'Framework',
  NULL
);
