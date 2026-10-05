// **Data Produk Awal (Minimal 5)**[cite: 4]
let produklist = [
    { id: 1, nama: "Laptop", harga: 12000000 },
    { id: 2, nama: "Smartphone", harga: 5000000 },
    { id: 3, nama: "Tablet", harga: 4000000 },
    { id: 4, nama: "Headset", harga: 500000 },
    { id: 5, nama: "Smartwatch", harga: 1500000 }
];

// **Menampilkan Produk dengan Destructuring**[cite: 4]
function tampilkanProduk() {
    const container = document.getElementById("productContainer");
    container.innerHTML = ""; // Bersihkan kontainer sebelum render ulang

    if (produklist.length === 0) {
        container.innerHTML = "<p style='text-align:center; color:gray;'>Tidak ada produk tersedia.</p>";
        return;
    }

    produklist.forEach(produk => {
        // Menggunakan Destructuring untuk mengekstrak properti objek[cite: 4]
        const { id, nama, harga } = produk;

        // Membuat elemen HTML secara dinamis
        const itemDiv = document.createElement("div");
        itemDiv.className = "product-item";
        itemDiv.innerHTML = `
            <div>
                <strong>[ID: ${id}] ${nama}</strong><br>
                <small style="color: #666;">Rp ${harga.toLocaleString('id-ID')}</small>
            </div>
            <button class="btn-hapus" onclick="hapusProdukBinding(${id})">Hapus</button>
        `;
        container.appendChild(itemDiv);
    });
}

// **Menambahkan Produk dengan Spread Operator**[cite: 4]
function tambahProduk(id, nama, harga) {
    const produkBaru = { id, nama, harga };
    
    // Spread operator untuk menggabungkan array lama dengan objek baru[cite: 4]
    produklist = [...produklist, produkBaru];
    tampilkanProduk();
}

// **Menghapus Produk dengan Rest Parameter**[cite: 4]
function hapusProduk(...ids) {
    // Rest parameter menampung id ke dalam array, lalu difilter[cite: 4]
    produklist = produklist.filter(produk => !ids.includes(produk.id));
    tampilkanProduk();
}

// Fungsi penghubung untuk tombol hapus di HTML
function hapusProdukBinding(id) {
    hapusProduk(id);
}

// **Event Listener untuk Form Submit**
document.getElementById("productForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Mencegah perilaku default form agar tidak mereset halaman

    const idInput = Number(document.getElementById("idProduk").value);
    const namaInput = document.getElementById("namaProduk").value;
    const hargaInput = Number(document.getElementById("hargaProduk").value);

    // Validasi sederhana ID unik
    const cekId = produklist.some(p => p.id === idInput);
    if (cekId) {
        alert("ID Produk sudah ada! Gunakan ID yang lain.");
        return;
    }

    // Panggil fungsi tambah produk
    tambahProduk(idInput, namaInput, hargaInput);

    // Reset form input setelah submit
    this.reset();
});

// Jalankan fungsi tampilkan saat pertama kali halaman dimuat
tampilkanProduk();