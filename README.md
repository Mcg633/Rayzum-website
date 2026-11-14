# Rayzum

Vercel üzerinde çalışan statik Rayzum sitesi.

- `/` Rayzum markası, faaliyet alanları, marka hikâyesi ve vizyon.
- `/textile` Rayzum Textile ürün grupları ve okul ile otel/yurt teklif formu. Vercel, `cleanUrls` ayarıyla `textile.html` dosyasını bu adreste sunar.
- `/textile#teklif` hızlı teklif formunun doğrudan bağlantısı. Eski `/#teklif`, `/#cozumler`, `/#okul`, `/#otel` ve `/#neden` bağlantıları Textile sayfasındaki karşılıklarına gider.

`styles.css` iki sayfanın tasarımını, `quote.css` teklif sayfasındaki formu biçimlendirir. `site.js` mobil menüyü, marka hikâyesi animasyonunu ve eski bağlantıların yönlendirmesini yönetir. `script.js` ürün seçimlerinden teklif özetini üretir ve WhatsApp bağlantısını açar.

Üretim yayını mevcut Vercel projesine bağlı GitHub deposundan alınır. Dosyalar depo kökünde durur. Build komutu veya paket kurulumu gerekmez. `vercel.json` mevcut yönlendirme kurallarını ve HTTP başlıklarını içerir.

Canonical, Open Graph ve site haritası, alan adının yönlendirildiği `https://www.rayzum.com` adresini kullanır. İletişim bölümüne kurumsal posta kutusu doğrulandığında bir `mailto:` bağlantısı eklenebilir.
