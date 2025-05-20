// Simpan produk ke localStorage
function simpanProduk() {
  const nama = document.getElementById("nama").value.trim();
  const harga = document.getElementById("harga").value.trim();
  const deskripsi = document.getElementById("deskripsi").value.trim();
  const gambar = document.getElementById("gambar").value.trim();
  const kategori = document.getElementById("kategori").value;

  if (!nama || !harga || !deskripsi || !gambar || !kategori) return;

  const produk = JSON.parse(localStorage.getItem("produk")) || [];

  produk.push({ nama, harga, deskripsi, gambar, kategori });

  localStorage.setItem("produk", JSON.stringify(produk));
  muatProduk();
  document.getElementById("formProduk").reset();
}

// Muat produk dari localStorage
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

// Hapus produk
function hapusProduk(index) {
  const produk = JSON.parse(localStorage.getItem("produk")) || [];
  produk.splice(index, 1);
  localStorage.setItem("produk", JSON.stringify(produk));
  muatProduk();
}

// Edit produk
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
  }
}

// Event listener
document.getElementById("formProduk").addEventListener("submit", function (e) {
  e.preventDefault();
  simpanProduk();
});

document.addEventListener("DOMContentLoaded", function () {
  muatProduk();
});
