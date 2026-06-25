# Güngör Yalıtım Yönetim Paneli ve SQLite Entegrasyonu Tasarım Dokümanı

Tarih: 2026-06-25  
Durum: Onaylandı

## 1. Mimarî Yapı (Node/Express + React SPA)

Proje, tek bir Docker konteyneri içinde hem Express API backend'ini hem de React + Vite frontend'ini barındıracak şekilde tasarlanmıştır.

- **Frontend:** `artifacts/gungor-yalitim` (React, Vite, Tailwind CSS, wouter)
- **Backend:** `artifacts/api-server` (Express, Drizzle ORM, SQLite)
- **Veritabanı:** SQLite (`sqlite.db` dosyası, `/data` dizininde kalıcı olarak saklanacak)

Sunucu başlatıldığında Express uygulaması çalışacak:
1. `/api` altındaki tüm istekleri API router'larına yönlendirecek.
2. `/uploads` altındaki statik dosya/resim isteklerini sunacak.
3. Diğer tüm istekleri (React SPA) `artifacts/gungor-yalitim/dist/public/index.html` dosyasına yönlendirerek istemci tabanlı yönlendirmeyi (client-side routing) destekleyecek.

---

## 2. Veritabanı Şeması (SQLite + Drizzle ORM)

Drizzle şeması (`lib/db/src/schema/index.ts` veya yeni dosyalarda) aşağıdaki tabloları tanımlayacaktır:

### `users` Tablosu
Yönetim paneline giriş yetkisi olan yöneticiler.
- `id`: integer, primary key, autoincrement
- `username`: text, unique, not null
- `password`: text, not null (bcrypt hash)
- `createdAt`: integer/timestamp

### `services` Tablosu
- `id`: integer, primary key, autoincrement
- `slug`: text, unique, not null
- `category`: text, not null ('water' | 'floor')
- `image`: text, not null (Görsel URL'i veya yüklenen dosya yolu)
- `titleTr`: text, not null
- `titleEn`: text, not null
- `descriptionTr`: text, not null
- `descriptionEn`: text, not null
- `contentTr`: text, not null (Rich text veya Markdown formatında detaylı içerik)
- `contentEn`: text, not null
- `order`: integer, default 0 (Sıralama için)

### `projects` Tablosu
- `id`: integer, primary key, autoincrement
- `slug`: text, unique, not null
- `category`: text, not null ('water' | 'floor')
- `year`: integer, not null
- `location`: text, not null
- `image`: text, not null (Kapak görseli)
- `gallery`: text, not null (JSON string olarak saklanan resim yolları dizisi)
- `titleTr`: text, not null
- `titleEn`: text, not null
- `clientTypeTr`: text, not null
- `clientTypeEn`: text, not null
- `scopeTr`: text, not null
- `scopeEn`: text, not null
- `descriptionTr`: text, not null
- `descriptionEn`: text, not null
- `details`: text, not null (JSON string olarak saklanan `{label: {tr, en}, value: {tr, en}}` dizisi)

---

## 3. Yönetim Paneli (Admin UI)

React uygulamasına aşağıdaki yeni rotalar ve bileşenler eklenecektir:

- `/admin/login`: Admin kullanıcı adı ve şifresi ile giriş arayüzü.
- `/admin`: Genel dashboard, hizmetler ve projeler yönetimi için kısayollar.
- `/admin/services`: Hizmetleri listeleme, ekleme, düzenleme ve silme.
- `/admin/projects`: Projeleri listeleme, ekleme, düzenleme ve silme.
- **Dosya Yükleme:** Formlarda kapak görseli veya galeri resmi eklenirken arka planda `/api/upload` API'sine istek gönderilerek dosyalar sunucunun `/uploads` dizinine kaydedilecektir.

---

## 4. Dağıtım ve Sunucu Yapılandırması (Coolify + Docker)

### Dockerfile Tasarımı
- Çok aşamalı (multi-stage) build kullanılacak.
- Aşama 1'de frontend build edilerek statik dosyalar oluşturulacak.
- Aşama 2'de Express backend kurulacak ve build dosyaları kopyalanacak.
- Konteyner içinde `/data` (SQLite için) ve `/uploads` (Yüklenen dosyalar için) dizinleri tanımlanacak.
- Coolify üzerinde bu iki dizin için kalıcı **Volume** tanımlanarak verilerin kalıcı olması sağlanacak.

### Coolify Alan Adı (Host) Yönlendirmesi
- Coolify üzerinde yeni bir Web Application oluşturulacak.
- Repository: `sserdarb/gungor`
- Branch: `main`
- Domain: `https://gungormuhendislik.com.tr`
- Docker port: 5000 (Express portu)
