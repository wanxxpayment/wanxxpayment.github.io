// Simpan info toko
function simpanInfoToko() {
  const nama = document.getElementById("namaToko").value.trim();
  const logo = document.getElementById("logoUrl").value.trim();
  const deskripsi = document.getElementById("deskripsiToko").value.trim();

  if (!nama || !logo) return;

  localStorage.setItem("toko_nama", nama);
  localStorage.setItem("toko_logo", logo);
  localStorage.setItem("toko_deskripsi", deskripsi);

  alert("Informasi toko berhasil disimpan!");
}

// Simpan produk baru
function simpanProduk() {
  const nama = document.getElementById("namaProduk").value.trim();
  const harga = document.getElementById("hargaProduk").value.trim();
  const deskripsi = document.getElementById("deskripsiProduk").value.trim();
  const gambar = document.getElementById("gambarProduk").value.trim();
  const kategori = document.getElementById("kategoriProduk").value;

  if (!nama || !harga || !deskripsi || !gambar || !kategori) return;

  const produk = JSON.parse(localStorage.getItem("produk")) || [];

  produk.push({ nama, harga, deskripsi, gambar, kategori });

  localStorage.setItem("produk", JSON.stringify(produk));
  muatProduk();
  alert("Produk ditambahkan!");
}

// Muat daftar produk
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

document.addEventListener("DOMContentLoaded", function () {
  muatProduk();
});
