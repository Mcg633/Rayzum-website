const WHATSAPP = "905321619863";

const form = document.getElementById("quoteForm");
const typeInput = document.getElementById("quoteType");
const schoolFields = document.getElementById("schoolFields");
const hotelFields = document.getElementById("hotelFields");
const previewText = document.getElementById("previewText");
const copyBtn = document.getElementById("copyBtn");
const segments = document.querySelectorAll(".segment");

function val(id) {
  return (document.getElementById(id)?.value || "").trim();
}

function selectType(type) {
  typeInput.value = type;
  const isSchool = type === "school";
  schoolFields.hidden = !isSchool;
  hotelFields.hidden = isSchool;

  segments.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.type === type);
  });

  updatePreview();
}

function selectedProducts() {
  const type = typeInput.value;
  const selected = [];

  document.querySelectorAll(`input[type="checkbox"][data-group="${type}"]`).forEach(box => {
    if (!box.checked) return;
    const qty = document.querySelector(`.qty[data-product="${CSS.escape(box.value)}"]`)?.value;
    selected.push(qty ? `${box.value}: ${qty} adet` : box.value);
  });

  return selected;
}

function buildMessage() {
  const type = typeInput.value;
  const products = selectedProducts();

  const lines = [
    "Merhaba Rayzum, web sitesi üzerinden teklif almak istiyorum.",
    "",
    `Teklif türü: ${type === "school" ? "Okul Tekstili" : "Otel / Yurt Tekstili"}`,
    `Kurum / Firma: ${val("company") || "-"}`,
    `Yetkili: ${val("contactName") || "-"}`,
    `Telefon: ${val("phone") || "-"}`,
    `Teslimat şehri: ${val("city") || "-"}`
  ];

  if (type === "school") {
    lines.push(`Okul adı: ${val("schoolName") || "-"}`);
    lines.push(`Yaklaşık öğrenci sayısı: ${val("studentCount") || "-"}`);
  }

  lines.push("");
  lines.push("Ürünler:");
  if (products.length) {
    products.forEach(item => lines.push(`- ${item}`));
  } else {
    lines.push("- Henüz ürün seçilmedi");
  }

  if (val("deliveryDate")) {
    lines.push("");
    lines.push(`Hedef teslim tarihi: ${val("deliveryDate")}`);
  }

  if (val("notes")) {
    lines.push("");
    lines.push("Notlar:");
    lines.push(val("notes"));
  }

  lines.push("");
  lines.push("Rayzum.com üzerinden gönderildi.");

  return lines.join("\n");
}

function updatePreview() {
  previewText.textContent = buildMessage();
}

segments.forEach(btn => {
  btn.addEventListener("click", () => selectType(btn.dataset.type));
});

document.querySelectorAll("[data-select]").forEach(link => {
  link.addEventListener("click", () => selectType(link.dataset.select));
});

form.addEventListener("input", updatePreview);
form.addEventListener("change", updatePreview);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.reportValidity()) return;

  const message = buildMessage();
  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});

copyBtn.addEventListener("click", async () => {
  const message = buildMessage();
  try {
    await navigator.clipboard.writeText(message);
    const old = copyBtn.textContent;
    copyBtn.textContent = "Kopyalandı ✓";
    setTimeout(() => copyBtn.textContent = old, 1800);
  } catch {
    alert("Kopyalama başarısız oldu. Teklif özetini manuel olarak seçip kopyalayabilirsin.");
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
updatePreview();
