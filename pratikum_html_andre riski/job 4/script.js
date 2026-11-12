console.log("Berkas script.js berhasil terhubung dengan HTML!");

const kkmNilai = 75;
let nilaiUjian = 82;
let selisihSkor = nilaiUjian - kkmNilai;
console.log("Nilai Ujian Masuk:", nilaiUjian);
console.log("Batas Kelulusan (KKM):", kkmNilai);
console.log("Selisih Nilai Ke KKM:", selisihSkor);

function evaluasiSkor(nama, skor) {
    const batasMinimal = 75;
    let status = "";
    let gradeText = "";

    if (skor >= batasMinimal) {
        status = "Selamat " + nama + ", Anda dinyatakan LULUS mata pelajaran Pemrograman!";
    } else {
        status = "Maaf " + nama + ", Anda Belum Lulus KKM. Silakan mengikuti program Remedial.";
    }
    
    if (skor >= 90) {
        gradeText = "(Grade: A - Istimewa)";
    } else if (skor >= 80 && skor <= 89) {
        gradeText = "(Grade: B - Baik)";
    } else if (skor >= 75 && skor <= 79) {
        gradeText = "(Grade: C - Cukup)";
    } else {
        gradeText = "(Grade: D - Kurang)";
    }

    return status + " " + gradeText;
}

let hasilUji = evaluasiSkor("Rian", 80);
console.log("Hasil Fungsi Test:", hasilUji);

const tombolProses = document.getElementById('btn-proses');
const elemenHasil = document.getElementById('box-hasil');

tombolProses.onclick = function() {
    let namaSiswa = document.getElementById('input-nama').value;
    let nilaiSiswa = document.getElementById('input-nilai').value;
    
    if (namaSiswa === "" || nilaiSiswa === "") {
        elemenHasil.innerText = "Peringatan: Mohon isi Nama dan Nilai terlebih dahulu!";
        elemenHasil.style.color = "#dc2626";
        elemenHasil.style.borderLeftColor = "#dc2626";
        return;
    }
    
    let nilaiAngka = Number(nilaiSiswa);
    let kalimatKesimpulan = evaluasiSkor(namaSiswa, nilaiAngka);
    
    elemenHasil.innerText = kalimatKesimpulan;
    
    if (nilaiAngka >= 75) {
        elemenHasil.style.color = "#15803d"; 
        elemenHasil.style.borderLeftColor = "#15803d";
    } else {
        elemenHasil.style.color = "#b91c1c"; 
        elemenHasil.style.borderLeftColor = "#b91c1c";
    }
};

const tombolLoop = document.getElementById('btn-loop');
const elemenBoxLoop = document.getElementById('box-loop');
tombolLoop.onclick = function() {
    let penampungTeks = "";
    for (let i = 1; i <= 5; i++) {
        penampungTeks += "Mencetak Baris Angka ke-" + i + "<br>";
    }
    elemenBoxLoop.innerHTML = penampungTeks;
    elemenBoxLoop.style.fontStyle = "normal";
};

const tombolTema = document.getElementById('btn-togle');
tombolTema.onclick = function() {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
        tombolTema.innerText = "Mode Terang";
        tombolTema.style.backgroundColor = "#e2e8f0";
        tombolTema.style.color = "#1e293b";
    } else {
        tombolTema.innerText = "Mode Gelap";
        tombolTema.style.backgroundColor = "#334155";
        tombolTema.style.color = "#ffffff";
    }
};