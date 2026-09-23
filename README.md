# Rayzum Web Sitesi

Bu paket statik bir web sitesidir ve Vercel'e doğrudan yüklenebilir.

## İçerik
- Okul tekstili teklif akışı
- Otel / yurt tekstili teklif akışı
- Okul adı, öğrenci sayısı, ürün ve adet alanları
- Ölçü / baskı / beden / teslimat notları
- WhatsApp hattı: 0532 161 98 63
- Otomatik WhatsApp teklif mesajı
- Mobil uyumlu tasarım
- SEO meta etiketleri, robots.txt ve sitemap.xml

## Vercel'e Yükleme
1. Vercel hesabına giriş yap.
2. Add New > Project seç.
3. Bu klasörü GitHub üzerinden veya Vercel CLI ile yükle.
4. Framework Preset: Other
5. Build Command: boş bırak
6. Output Directory: boş bırak
7. Deploy et.

## rayzum.com Alan Adını Bağlama
Vercel proje ekranında:
Settings > Domains > rayzum.com

Vercel sana gerekli DNS kayıtlarını gösterecek.
METUnic panelinde Alan Adı > DNS Yönetimi bölümüne girip Vercel'in verdiği kayıtları birebir ekle.

Genellikle:
- root domain için A kaydı
- www için CNAME kaydı

Ancak kesin değer olarak Vercel panelinde o anda gösterilen DNS kayıtlarını kullan.

## Dosyalar
- index.html
- styles.css
- script.js
- vercel.json
- robots.txt
- sitemap.xml


## Kurumsal kimlik güncellemesi
- Mevcut `logo.png` header, Hakkımızda bölümü ve footer'da kullanılır.
- Hakkımızda ve Vizyonumuz bölümleri eklendi.
- Kurumsal konumlandırma: Yatırım · Üretim · İnovasyon.
