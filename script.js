// frontend/script.js
console.log("🚀 JavaScript loaded successfully!");

// Demo JavaScript yang mirror functionality C++
class CppDemo {
    // Mirror function dari C++: tentukanGrade()
    static tentukanGrade(nilai) {
        if (nilai >= 90) {
            return "A (Sangat Baik)";
        } else if (nilai >= 80) {
            return "B (Baik)";
        } else if (nilai >= 70) {
            return "C (Cukup)";
        } else if (nilai >= 60) {
            return "D (Kurang)";
        } else {
            return "E (Sangat Kurang)";
        }
    }

    // Mirror function dari C++: tentukanHari()
    static tentukanHari(hari) {
        switch(hari) {
            case 0: return "Minggu";
            case 1: return "Senin";
            case 2: return "Selasa";
            case 3: return "Rabu";
            case 4: return "Kamis";
            case 5: return "Jumat";
            case 6: return "Sabtu";
            default: return "Hari tidak valid";
        }
    }

    // Mirror kombinasi if-else & switch-case dari C++
    static evaluasiKategori(kategori, skor) {
        if (skor >= 80) {
            switch(kategori) {
                case 'A': return "Kategori A - Excellent!";
                case 'B': return "Kategori B - Good Job!";
                case 'C': return "Kategori C - Fair";
                default: return "Kategori tidak dikenal";
            }
        } else {
            return "Perlu improvement";
        }
    }
}

// ==================== FITUR TANGGAL OTOMATIS ====================

// Fungsi untuk mendapatkan tanggal dan waktu sekarang
function getCurrentDateTime() {
    const now = new Date();
    
    // Format tanggal: "Senin, 1 Januari 2024"
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const formattedDate = now.toLocaleDateString('id-ID', options);
    
    // Format waktu: "14:30:45"
    const time = now.toLocaleTimeString('id-ID');
    
    return {
        date: formattedDate,
        time: time
    };
}

// Update tampilan tanggal
function updateDateTime() {
    const currentDateTime = getCurrentDateTime();
    const dateElement = document.getElementById('currentDate');
    
    if (dateElement) {
        dateElement.innerHTML = `📅 ${currentDateTime.date} ⏰ ${currentDateTime.time}`;
    }
}

// ==================== FITUR LOGIN & NOTIFIKASI ====================

// Update user welcome message
function updateUserWelcome() {
    const userName = localStorage.getItem('userName');
    const userNameElement = document.getElementById('userNamePlaceholder');
    const userWelcomeElement = document.getElementById('userWelcome');
    
    if (userName && userNameElement && userWelcomeElement) {
        userNameElement.textContent = userName;
        userWelcomeElement.style.display = 'block';
        console.log(`👋 Welcome message updated for: ${userName}`);
    } else if (userWelcomeElement) {
        userWelcomeElement.style.display = 'none';
    }
}

// Tampilkan notifikasi login berhasil
function showLoginSuccess() {
    const userName = localStorage.getItem('userName') || 'Tamu';
    
    // Hapus notifikasi lama jika ada
    const oldNotification = document.getElementById('loginSuccessNotification');
    if (oldNotification) {
        oldNotification.remove();
    }
    
    // Buat notifikasi
    const notification = document.createElement('div');
    notification.id = 'loginSuccessNotification';
    notification.innerHTML = `
        <div class="notification-overlay">
            <div class="notification-card">
                <div class="notification-icon">🎉</div>
                <h3>Login Berhasil!</h3>
                <p>Halo <strong>${userName}</strong>, selamat datang di demo C++ + HTML!</p>
                <button class="notification-btn" id="closeNotificationBtn">
                    OK, Lanjutkan
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Tambahkan event listener untuk tombol OK
    document.getElementById('closeNotificationBtn').addEventListener('click', closeNotification);
    
    // Auto close ketika klik di luar notifikasi
    notification.addEventListener('click', function(e) {
        if (e.target === notification) {
            closeNotification();
        }
    });
    
    console.log(`✅ Login success notification shown for: ${userName}`);
}

// Tutup notifikasi
function closeNotification() {
    const notification = document.getElementById('loginSuccessNotification');
    if (notification) {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
            console.log("📌 Notification closed");
        }, 300);
    }
}

// Cek status login dan tampilkan notifikasi jika perlu
function checkLoginStatus() {
    const justLoggedIn = sessionStorage.getItem('justLoggedIn');
    const userName = localStorage.getItem('userName');
    
    console.log(`🔍 Login check - Just logged in: ${justLoggedIn}, User: ${userName}`);
    
    if (justLoggedIn && userName) {
        // Tampilkan notifikasi setelah delay kecil agar DOM ready
        setTimeout(() => {
            showLoginSuccess();
        }, 500);
        
        // Hapus flag setelah digunakan
        sessionStorage.removeItem('justLoggedIn');
    }
}

// ==================== FITUR LOGOUT DENGAN MODAL ====================

// Fungsi untuk buka modal logout
function bukaModalLogout() {
    const userName = localStorage.getItem('userName') || 'Mahasiswa';
    
    // Buat modal konfirmasi logout
    const modal = document.createElement('div');
    modal.id = 'logoutConfirmModal';
    modal.className = 'custom-modal logout-modal';
    modal.style.display = 'flex';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <div style="font-size: 3em; margin-bottom: 10px;">🚪</div>
                <h3>Konfirmasi Logout</h3>
                <p>Halo <strong>${userName}</strong>, apakah Anda yakin ingin logout?</p>
            </div>
            <div class="modal-buttons">
                <button class="modal-btn primary" onclick="prosesLogout()" id="yaLogoutBtn">
                    ✅ Ya, Logout
                </button>
                <button class="modal-btn secondary" onclick="tutupModalLogout()">
                    ❌ Batal
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Auto close ketika klik di luar modal
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            tutupModalLogout();
        }
    });
    
    // Focus ke tombol "Ya, Logout" untuk keyboard support
    setTimeout(() => {
        document.getElementById('yaLogoutBtn').focus();
    }, 100);
}

// Tutup modal logout
function tutupModalLogout() {
    const modal = document.getElementById('logoutConfirmModal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            modal.remove();
            console.log("📌 Logout modal closed");
        }, 300);
    }
}

// Proses logout sebenarnya
function prosesLogout() {
    const userName = localStorage.getItem('userName') || 'Mahasiswa';
    
    // Tutup modal logout
    tutupModalLogout();
    
    // Hapus data dari storage
    localStorage.removeItem('userName');
    sessionStorage.removeItem('justLoggedIn');
    
    console.log(`🚪 User ${userName} logged out`);
    
    // Tampilkan notifikasi logout berhasil
    showLogoutSuccess(userName);
    
    // Redirect ke login page setelah delay
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}

// Tampilkan notifikasi logout berhasil
function showLogoutSuccess(userName) {
    // Hapus notifikasi lama jika ada
    const oldNotification = document.getElementById('logoutSuccessNotification');
    if (oldNotification) {
        oldNotification.remove();
    }
    
    // Buat notifikasi logout
    const notification = document.createElement('div');
    notification.id = 'logoutSuccessNotification';
    notification.innerHTML = `
        <div class="notification-overlay">
            <div class="notification-card">
                <div class="notification-icon">👋</div>
                <h3>Logout Berhasil!</h3>
                <p>Sampai jumpa <strong>${userName}</strong>, terima kasih telah menggunakan demo!</p>
                <div style="margin-top: 20px; font-size: 0.9em; color: #666;">
                    Mengarahkan ke halaman login...
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto close setelah 2 detik
    setTimeout(() => {
        closeLogoutNotification();
    }, 1900);
}

// Tutup notifikasi logout
function closeLogoutNotification() {
    const notification = document.getElementById('logoutSuccessNotification');
    if (notification) {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
            console.log("📌 Logout notification closed");
        }, 300);
    }
}

// ==================== VALIDASI MATA KULIAH ====================

// Validasi pilihan mata kuliah
function validasiMataKuliah() {
    const subjectSelect = document.getElementById('subjectSelect');
    const subjectSelector = document.getElementById('subjectSelector');
    const validationElement = document.getElementById('subjectValidation');
    const selectedSubject = subjectSelect.value;
    
    // Hapus validasi sebelumnya
    subjectSelector.classList.remove('error');
    validationElement.className = 'subject-validation';
    validationElement.innerHTML = '';
    
    if (!selectedSubject) {
        // Tampilkan error
        subjectSelector.classList.add('error');
        validationElement.classList.add('error');
        validationElement.innerHTML = '❌ Silakan pilih mata kuliah terlebih dahulu!';
        return false;
    } else {
        // Tampilkan success
        validationElement.classList.add('success');
        validationElement.innerHTML = `✅ Mata kuliah dipilih: <strong>${selectedSubject}</strong>`;
        return true;
    }
}

// ==================== MODAL INPUT NILAI ====================

// Fungsi untuk modal input nilai
function bukaModalInput() {
    // Validasi mata kuliah terlebih dahulu
    if (!validasiMataKuliah()) {
        document.getElementById('subjectSelect').focus();
        return;
    }
    
    const selectedSubject = document.getElementById('subjectSelect').value;
    const userName = localStorage.getItem('userName') || 'Mahasiswa';
    
    document.getElementById('selectedSubject').textContent = selectedSubject;
    document.getElementById('nilaiModal').style.display = 'flex';
    document.getElementById('nilaiInput').value = '';
    document.getElementById('nilaiInput').focus();
}

function tutupModal() {
    document.getElementById('nilaiModal').style.display = 'none';
}

function prosesNilai() {
    const nilaiInput = document.getElementById('nilaiInput');
    const nilai = parseInt(nilaiInput.value);
    const selectedSubject = document.getElementById('subjectSelect').value;
    const userName = localStorage.getItem('userName') || 'Mahasiswa';

    if (isNaN(nilai) || nilai < 0 || nilai > 100) {
        alert('Masukkan nilai yang valid antara 0-100!');
        nilaiInput.focus();
        return;
    }

    // Tutup modal
    tutupModal();

    // Proses nilai
    const grade = CppDemo.tentukanGrade(nilai);
    const gradeDetails = getGradeDetails(grade);
    showGradeResult(userName, selectedSubject, nilai, grade, gradeDetails);
}

// ==================== DEMO INTERAKTIF ====================

// Fungsi untuk mendapatkan detail grade
function getGradeDetails(grade) {
    const gradeInfo = {
        "A (Sangat Baik)": { 
            emoji: "🎉", 
            message: "Luar Biasa! Pertahankan!",
            color: "#ffffff"
        },
        "B (Baik)": { 
            emoji: "👍", 
            message: "Bagus! Tingkatkan lagi!",
            color: "#ffffff"
        },
        "C (Cukup)": { 
            emoji: "💪", 
            message: "Cukup baik, butuh improvement",
            color: "#ffffff"
        },
        "D (Kurang)": { 
            emoji: "📚", 
            message: "Perlu belajar lebih giat",
            color: "#ffffff"
        },
        "E (Sangat Kurang)": { 
            emoji: "🔥", 
            message: "Butuh usaha ekstra!",
            color: "#ffffff"
        }
    };
    
    return gradeInfo[grade] || { emoji: "❓", message: "Tidak diketahui", color: "#ffffff" };
}

// Fungsi untuk menampilkan hasil nilai
function showGradeResult(userName, subject, nilai, grade, gradeDetails) {
    const outputElement = document.getElementById('js-output');
    
    const resultHTML = `
        <div class="grade-result" style="border-left: 6px solid ${gradeDetails.color}">
            <h4>${gradeDetails.emoji} Hasil Evaluasi Nilai</h4>
            <div class="grade-details">
                <div class="grade-item">
                    <strong>👤 Mahasiswa</strong>
                    <span>${userName}</span>
                </div>
                <div class="grade-item">
                    <strong>📚 Mata Kuliah</strong>
                    <span>${subject}</span>
                </div>
                <div class="grade-item">
                    <strong>🔢 Nilai</strong>
                    <span>${nilai}</span>
                </div>
                <div class="grade-item">
                    <strong>📊 Grade</strong>
                    <span style="font-weight: bold; color: ${gradeDetails.color}">${grade}</span>
                </div>
            </div>
            <div style="margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.2); border-radius: 10px;">
                <strong>💡 Feedback:</strong> ${gradeDetails.message}
            </div>
        </div>
    `;
    
    outputElement.innerHTML = resultHTML;
    
    // Scroll ke hasil
    outputElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Update HTML dengan hasil JavaScript
function updateOutput() {
    const outputElement = document.getElementById('js-output');
    if (outputElement) {
        outputElement.innerHTML = `
            <div class="result-item">
                <h4>🎯 JavaScript If-Else Result:</h4>
                <p>Nilai 85 → <strong style="color: white;">${CppDemo.tentukanGrade(85)}</strong></p>
                <p>Nilai 55 → <strong style="color: white;">${CppDemo.tentukanGrade(55)}</strong></p>
            </div>
            <div class="result-item">
                <h4>🔥 JavaScript Combination Result:</h4>
                <p>Kategori B + Skor 85 → <strong style="color: white;">${CppDemo.evaluasiKategori('B', 85)}</strong></p>
                <p>Kategori C + Skor 75 → <strong style="color: white;">${CppDemo.evaluasiKategori('C', 75)}</strong></p>
            </div>
        `;
    }
}

// ==================== KEYBOARD SUPPORT ====================

// Fungsi untuk handle keyboard events
function setupKeyboardSupport() {
    // Enter key untuk modal input nilai
    document.addEventListener('keydown', function(e) {
        // Jika modal nilai terbuka dan tekan Enter
        if (document.getElementById('nilaiModal').style.display === 'flex' && e.key === 'Enter') {
            e.preventDefault();
            prosesNilai();
        }
        
        // Jika modal logout terbuka dan tekan Enter
        if (document.getElementById('logoutConfirmModal') && e.key === 'Enter') {
            e.preventDefault();
            prosesLogout();
        }
    });
}

// ==================== INITIALIZATION ====================

// Initialize ketika halaman load
document.addEventListener('DOMContentLoaded', function() {
    console.log("🖥️ DOM Ready - JavaScript siap!");
    
    // Update tanggal dan waktu
    updateDateTime();
    
    // Update setiap detik untuk waktu real-time
    setInterval(updateDateTime, 1000);
    
    // Update welcome message
    updateUserWelcome();
    
    // Check login status untuk notifikasi
    checkLoginStatus();
    
    // Update output demo
    updateOutput();
    
    // Setup keyboard support
    setupKeyboardSupport();
    
    // Tambahkan event listener untuk dropdown
    const subjectSelect = document.getElementById('subjectSelect');
    if (subjectSelect) {
        subjectSelect.addEventListener('change', function() {
            validasiMataKuliah();
            if (this.value) {
                console.log(`📚 Mata kuliah dipilih: ${this.value}`);
            }
        });
        
        // Validasi awal
        validasiMataKuliah();
    }
});

// Animation untuk notifikasi
if (!document.querySelector('#notificationAnimations')) {
    const style = document.createElement('style');
    style.id = 'notificationAnimations';
    style.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes scaleIn {
            from { 
                opacity: 0;
                transform: scale(0.8);
            }
            to { 
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);
}

console.log("✅ All JavaScript features loaded successfully!");