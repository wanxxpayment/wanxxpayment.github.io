// 🔧 Simpan produk baru ke localStorage
function simpanProduk() {
  const nama = document.getElementById("namaProduk").value.trim();
  const harga = document.getElementById("hargaProduk").value.trim();
  const deskripsi = document.getElementById("deskripsiProduk").value.trim();
  const gambar = document.getElementById("gambarProduk").value.trim();
  const kategori = document.getElementById("kategoriProduk").value;

  if (!nama || !harga || !deskripsi || !gambar || !kategori) {
    alert("Semua kolom harus diisi!");
    return;
  }

  const produk = JSON.parse(localStorage.getItem("produk")) || [];

  produk.push({ nama, harga, deskripsi, gambar, kategori });

  localStorage.setItem("produk", JSON.stringify(produk));
  muatProduk();
  document.getElementById("formProduk").reset();
  alert("Produk berhasil ditambahkan!");
}

// 🔄 Muat daftar produk dari localStorage
function muatProduk() {
  const tbody = document.querySelector("#tabelProduk tbody");
  tbody.innerHTML = "";
  const produk = JSON.parse(localStorage.getItem("produk")) || [];

  produk.forEach((item, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.nama}</td>
      <td>Rp${parseInt(item.harga).toLocaleString()}</td>
      <td>${item.kategori}</td>
      <td>
        <button class="btn-edit" onclick="editProduk(${index})">Edit</button>
        <button class="btn-hapus" onclick="hapusProduk(${index})">Hapus</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ❌ Hapus produk berdasarkan index
function hapusProduk(index) {
  const produk = JSON.parse(localStorage.getItem("produk")) || [];
  if (confirm("Yakin ingin menghapus produk ini?")) {
    produk.splice(index, 1);
    localStorage.setItem("produk", JSON.stringify(produk));
    muatProduk();
  }
}

// ✏️ Edit produk berdasarkan index
function editProduk(index) {
  const produk = JSON.parse(localStorage.getItem("produk")) || [];
  const item = produk[index];

  const newNama = prompt("Nama Produk", item.nama);
  const newHarga = prompt("Harga", item.harga);
  const newDeskripsi = prompt("Deskripsi", item.deskripsi);
  const newGambar = prompt("URL Gambar", item.gambar);
  const newKategori = prompt("Kategori (ff/mlbb/valorant/pubg/fifa)", item.kategori);

  if (newNama && newHarga && newDeskripsi && newGambar && newKategori) {
    produk[index] = { nama: newNama, harga: newHarga, deskripsi: newDeskripsi, gambar: newGambar, kategori: newKategori };
    localStorage.setItem("produk", JSON.stringify(produk));
    muatProduk();
    alert("Produk berhasil diedit!");
  }
}

// 💾 Simpan info toko (logo, nama, deskripsi)
function simpanInfoToko() {
  const nama = document.getElementById("namaToko").value.trim();
  const logo = document.getElementById("logoUrl").value.trim();
  const deskripsi = document.getElementById("deskripsiToko").value.trim();

  if (!nama || !logo) {
    alert("Nama toko dan logo wajib diisi!");
    return;
  }

  localStorage.setItem("toko_nama", nama);
  localStorage.setItem("toko_logo", logo);
  localStorage.setItem("toko_deskripsi", deskripsi);
  alert("Informasi toko berhasil disimpan!");
  muatInfoToko();
}

// 🖼️ Muat info toko ke halaman utama
function muatInfoToko() {
  const namaToko = localStorage.getItem("toko_nama") || "WANXX STORE";
  const logoToko = localStorage.getItem("toko_logo") || "https://i.ibb.co.com/67ytF0Wf/Whats-App-Image-2025-05-19-at-00-29-47-1c5ff881.jpg ";
  const deskripsiToko = localStorage.getItem("toko_deskripsi") || "Toko jual akun game termurah dan terpercaya.";

  // Jika di halaman index.html
  const headerLogo = document.querySelector(".header-logo img");
  const headerTitle = document.querySelector(".header-title");

  if (headerLogo) headerLogo.src = logoToko;
  if (headerTitle) headerTitle.innerText = namaToko;
}

// 🔍 Fungsi pencarian produk
function cariProduk() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".produk-card");
  let found = false;

  cards.forEach(card => {
    const title = card.querySelector("h3").innerText.toLowerCase();
    if (title.includes(input)) {
      card.style.display = "block";
      found = true;
    } else {
      card.style.display = "none";
    }
  });

  if (!found && input !== "") {
    alert("Produk tidak ditemukan.");
  }
}

// 🎯 Filter produk berdasarkan kategori
function filterKategori(btn, kategori) {
  const buttons = document.querySelectorAll(".filter-buttons button");
  buttons.forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  const cards = document.querySelectorAll(".produk-card");
  cards.forEach(card => {
    if (kategori === "all" || card.getAttribute("data-kategori") === kategori) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// 🕒 Jalankan fungsi saat halaman dimuat
document.addEventListener("DOMContentLoaded", function () {
  muatProduk();
  muatInfoToko();
});
