const WHATSAPP = "905321619863";

/* =========================
   RAYZUM TEXTILE ÜRÜN LİSTESİ
   ========================= */

const PRODUCT_GROUPS = {
  school: [
    "Polo / Tişört",
    "Sweatshirt",
    "Pantolon",
    "Eşofman Altı",
    "Eşofman Takımı",
    "Şort",
    "Mont / Kaban",
    "Hırka",
    "Yelek",
    "Önlük",
    "Personel Polo / Tişört",
    "Diğer Okul Tekstili"
  ],

  hotel: [
    "Çarşaf",
    "Nevresim",
    "Yastık Kılıfı",
    "Pike",
    "Yorgan",
    "Yastık",
    "Alez",
    "Sıvı Geçirmez Alez",
    "Banyo Havlusu",
    "El Havlusu",
    "Yüz Havlusu",
    "Ayak Havlusu",
    "Plaj Havlusu",
    "Bornoz",
    "Otel Terliği",
    "Mutfak Bezi",
    "Masa Örtüsü",
    "Peçete",
    "Diğer Otel Tekstili"
  ],

  health: [
    "Hastane Çarşafı",
    "Nevresim",
    "Yastık Kılıfı",
    "Pike",
    "Yorgan",
    "Yastık",
    "Sıvı Geçirmez Alez",
    "Sedye Örtüsü / Sedye Çarşafı",
    "Hasta Önlüğü",
    "Ameliyat Önlüğü",
    "Doktor Önlüğü",
    "Hemşire Forması",
    "Scrubs Takımı",
    "Personel Forması",
    "Muayene Masa Örtüsü",
    "Havlu",
    "Battaniye",
    "Diğer Sağlık Tekstili"
  ],

  dorm: [
    "Çarşaf",
    "Nevresim",
    "Yastık Kılıfı",
    "Pike",
    "Yorgan",
    "Yastık",
    "Alez",
    "Sıvı Geçirmez Alez",
    "Battaniye",
    "Banyo Havlusu",
    "El / Yüz Havlusu",
    "Ayak Havlusu",
    "Nevresim Takımı",
    "Diğer Yurt Tekstili"
  ],

  spa: [
    "Spa Havlusu",
    "Banyo Havlusu",
    "El Havlusu",
    "Yüz Havlusu",
    "Ayak Havlusu",
    "Sauna Havlusu",
    "Masaj Havlusu",
    "Masaj Yatağı Örtüsü",
    "Bornoz",
    "Peştemal",
    "Saç Havlusu",
    "Terlik",
    "Personel Kıyafeti",
    "Diğer Spa Tekstili"
  ],

  corporate: [
    "Polo Tişört",
    "Bisiklet Yaka Tişört",
    "Sweatshirt",
    "Gömlek",
    "Pantolon",
    "İş Pantolonu",
    "İş Montu",
    "Yelek",
    "Polar",
    "Önlük",
    "Aşçı Ceketi",
    "Personel Forması",
    "Şapka",
    "Logolu Kurumsal Tekstil",
    "Diğer İş Kıyafeti"
  ],

  restaurant: [
    "Masa Örtüsü",
    "Runner",
    "Kumaş Peçete",
    "Servis Peçetesi",
    "Mutfak Bezi",
    "Kurulama Bezi",
    "Aşçı Ceketi",
    "Aşçı Pantolonu",
    "Aşçı Önlüğü",
    "Garson Önlüğü",
    "Garson Gömleği",
    "Personel Polo / Tişört",
    "Personel Forması",
    "Şef Şapkası",
    "Diğer Restoran Tekstili"
  ]
};

const TYPE_NAMES = {
  school: "Okul & Eğitim Tekstili",
  hotel: "Otel & Konaklama Tekstili",
  health: "Hastane & Sağlık Tekstili",
  dorm: "Yurt & Öğrenci Konaklama Tekstili",
  spa: "Spa & Wellness Tekstili",
  corporate: "Kurumsal İş Kıyafetleri",
  restaurant: "Restoran & Yeme-İçme Tekstili"
};


/* =========================
   SAYFA ELEMANLARI
   ========================= */

const form = document.getElementById("quoteForm");
const typeInput = document.getElementById("quoteType");
const previewText = document.getElementById("previewText");
const copyBtn = document.getElementById("copyBtn");

const segments = document.querySelectorAll(".segment");
const panels = document.querySelectorAll("[data-panel]");

const copyLabel = copyBtn?.textContent || "Özeti Kopyala";

let copyReset;


/* =========================
   YARDIMCI FONKSİYONLAR
   ========================= */

function val(id) {
  return (document.getElementById(id)?.value || "").trim();
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


/* =========================
   ÜRÜNLERİ OTOMATİK OLUŞTUR
   ========================= */

function renderProducts() {
  document.querySelectorAll("[data-products]").forEach(container => {
    const type = container.dataset.products;
    const products = PRODUCT_GROUPS[type] || [];

    container.innerHTML = products.map((product, index) => {
      const safeProduct = escapeHtml(product);
      const inputId = `${type}-product-${index}`;
      const qtyId = `${type}-qty-${index}`;

      return `
        <div class="product-item">
          <label class="product-choice" for="${inputId}">
            <input
              id="${inputId}"
              type="checkbox"
              value="${safeProduct}"
              data-group="${type}"
            >
            <span>${safeProduct}</span>
          </label>

          <input
            id="${qtyId}"
            class="qty"
            type="number"
            min="1"
            inputmode="numeric"
            data-product="${safeProduct}"
            data-group="${type}"
            placeholder="Adet"
            aria-label="${safeProduct} adedi"
            disabled
          >
        </div>
      `;
    }).join("");
  });
}


/* =========================
   KATEGORİ DEĞİŞTİR
   ========================= */

function selectType(type) {
  if (!PRODUCT_GROUPS[type]) return;

  typeInput.value = type;

  panels.forEach(panel => {
    const active = panel.dataset.panel === type;

    panel.hidden = !active;

    panel.querySelectorAll("input, textarea, select").forEach(input => {
      input.disabled = !active;
    });
  });

  segments.forEach(button => {
    const active = button.dataset.type === type;

    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  updatePreview();
}


/* =========================
   ÜRÜN SEÇİMİ
   ========================= */

function selectedProducts() {
  const type = typeInput.value;
  const selected = [];

  document
    .querySelectorAll(`input[type="checkbox"][data-group="${type}"]`)
    .forEach(box => {
      if (!box.checked) return;

      const qtyInput = box
        .closest(".product-item")
        ?.querySelector(".qty");

      const qty = qtyInput?.value?.trim();

      if (qty) {
        selected.push(`${box.value}: ${qty} adet`);
      } else {
        selected.push(box.value);
      }
    });

  return selected;
}


/* =========================
   WHATSAPP MESAJI
   ========================= */

function buildMessage() {
  const type = typeInput.value;
  const products = selectedProducts();

  const lines = [
    "Merhaba Rayzum, web sitesi üzerinden teklif almak istiyorum.",
    "",
    `Teklif türü: ${TYPE_NAMES[type] || type}`,
    `Kurum / Firma: ${val("company") || "-"}`,
    `Yetkili: ${val("contactName") || "-"}`,
    `Telefon: ${val("phone") || "-"}`,
    `Teslimat şehri: ${val("city") || "-"}`
  ];

  if (type === "school") {
    if (val("schoolName")) {
      lines.push(`Okul adı: ${val("schoolName")}`);
    }

    if (val("studentCount")) {
      lines.push(`Yaklaşık öğrenci sayısı: ${val("studentCount")}`);
    }
  }

  lines.push("");
  lines.push("Ürünler:");

  if (products.length) {
    products.forEach(product => {
      lines.push(`- ${product}`);
    });
  } else {
    lines.push("- Henüz ürün seçilmedi");
  }

  if (val("deliveryDate")) {
    lines.push("");
    lines.push(`Hedef teslim tarihi: ${val("deliveryDate")}`);
  }

  if (val("notes")) {
    lines.push("");
    lines.push("Teknik detaylar / Notlar:");
    lines.push(val("notes"));
  }

  lines.push("");
  lines.push("Rayzum.com üzerinden gönderildi.");

  return lines.join("\n");
}


/* =========================
   TEKLİF ÖNİZLEME
   ========================= */

function updatePreview() {
  if (!previewText) return;

  previewText.textContent = buildMessage();
}


/* =========================
   KATEGORİ BUTONLARI
   ========================= */

segments.forEach(button => {
  button.addEventListener("click", () => {
    selectType(button.dataset.type);
  });
});


/* =========================
   SEKTÖR KARTLARI
   ========================= */

document.querySelectorAll("[data-select]").forEach(link => {
  link.addEventListener("click", () => {
    selectType(link.dataset.select);
  });
});


/* =========================
   ÜRÜN CHECKBOX + ADET
   ========================= */

form.addEventListener("change", event => {
  const target = event.target;

  if (
    target.matches(
      'input[type="checkbox"][data-group]'
    )
  ) {
    const qtyInput = target
      .closest(".product-item")
      ?.querySelector(".qty");

    if (qtyInput) {
      qtyInput.disabled = !target.checked;

      if (target.checked) {
        qtyInput.focus();
      } else {
        qtyInput.value = "";
      }
    }
  }

  updatePreview();
});


form.addEventListener("input", () => {
  updatePreview();
});


/* =========================
   WHATSAPP İLE GÖNDER
   ========================= */

form.addEventListener("submit", event => {
  event.preventDefault();

  if (!form.reportValidity()) return;

  const products = selectedProducts();

  if (!products.length) {
    alert("Lütfen teklif almak istediğiniz en az bir ürünü seçin.");
    return;
  }

  const message = buildMessage();

  /* Google Analytics */
  if (typeof gtag === "function") {
    gtag("event", "quote_submit", {
      quote_type: typeInput.value,
      delivery_city: val("city") || "belirtilmedi",
      product_count: products.length
    });
  }

  const url =
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank", "noopener,noreferrer");
});


/* =========================
   TEKLİFİ KOPYALA
   ========================= */

copyBtn.addEventListener("click", async () => {
  const message = buildMessage();

  try {
    await navigator.clipboard.writeText(message);

    copyBtn.textContent = "Kopyalandı ✓";

    clearTimeout(copyReset);

    copyReset = setTimeout(() => {
      copyBtn.textContent = copyLabel;
    }, 1800);

  } catch {
    alert(
      "Kopyalama başarısız oldu. Teklif özetini manuel olarak seçip kopyalayabilirsiniz."
    );
  }
});


/* =========================
   BAŞLAT
   ========================= */

renderProducts();
selectType(typeInput.value);
updatePreview();
