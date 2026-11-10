// ট্যাব পরিবর্তন (লগইন ও রেজিস্ট্রেশন)
function switchAuthTab(tab) {
    if(tab === 'login') {
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginTabBtn').classList.add('active-tab');
        document.getElementById('regTabBtn').classList.remove('active-tab');
    } else {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
        document.getElementById('regTabBtn').classList.add('active-tab');
        document.getElementById('loginTabBtn').classList.remove('active-tab');
    }
}

// রেজিস্ট্রেশন হ্যান্ডলার (ইউজার আইডি, মোবাইল নম্বর ও আলাদা পাসওয়ার্ড সংরক্ষণ)
function handleRegister() {
    let name = document.getElementById('regName').value;
    let flat = document.getElementById('regFlat').value;
    let mobile = document.getElementById('regMobile').value;
    let pass = document.getElementById('regPass').value;

    if(!name || !flat || !mobile || !pass) {
        alert("দয়া করে সব ফিল্ড পূরণ করুন!");
        return;
    }

    let users = JSON.parse(localStorage.getItem('flatUsers')) || [];
    
    // চেক করা মোবাইল নম্বর ইতিমধ্যে রেজিস্টার্ড কিনা
    let exists = users.find(u => u.mobile === mobile);
    if(exists) {
        alert("এই মোবাইল নম্বর দিয়ে ইতিমধ্যে অ্যাকাউন্ট রয়েছে!");
        return;
    }

    users.push({name, flat, mobile, pass});
    localStorage.setItem('flatUsers', JSON.stringify(users));
    alert("রেজিস্ট্রেশন সফল হয়েছে! এখন লগইন করুন।");
    switchAuthTab('login');
}

// লগইন হ্যান্ডলার
function handleLogin() {
    let mobile = document.getElementById('loginMobile').value;
    let pass = document.getElementById('loginPass').value;

    let users = JSON.parse(localStorage.getItem('flatUsers')) || [];
    let validUser = users.find(u => u.mobile === mobile && u.pass === pass);

    if(validUser || (mobile === "admin" && pass === "1234")) { // ডিফল্ট অ্যাডমিন এক্সেস
        localStorage.setItem('loggedInUser', mobile);
        showDashboard();
    } else {
        alert("ভুল মোবাইল নম্বর বা পাসওয়ার্ড!");
    }
}

// ড্যাশবোর্ড প্রদর্শন
function showDashboard() {
    document.getElementById('auth-container').style.display = 'none';
    document.getElementById('dashboard-container').style.display = 'flex';
    loadUsersTable();
}

// লগআউট
function handleLogout() {
    localStorage.removeItem('loggedInUser');
    document.getElementById('auth-container').style.display = 'flex';
    document.getElementById('dashboard-container').style.display = 'none';
}

// ড্যাশবোর্ড ট্যাব পরিবর্তন
function switchDashboardTab(tabId) {
    document.querySelectorAll('.dash-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.sidebar ul li a').forEach(el => el.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// ইউজার টেবিল লোড করা
function loadUsersTable() {
    let users = JSON.parse(localStorage.getItem('flatUsers')) || [];
    let table = document.getElementById('userTable');
    table.innerHTML = `<tr><th>নাম</th><th>ফ্ল্যাট নং</th><th>মোবাইল নম্বর</th></tr>`;
    users.forEach(u => {
        let row = table.insertRow();
        row.innerHTML = `<td>${u.name}</td><td>${u.flat}</td><td>${u.mobile}</td>`;
    });
}

// মাসিক চার্জ এন্ট্রি (৳৩০০০ ডিফল্ট)
function addFeeRecord() {
    let flat = document.getElementById('feeFlat').value;
    let month = document.getElementById('feeMonth').value;
    let status = document.getElementById('feeStatus').value;

    if(!flat || !month) { alert("সব তথ্য পূরণ করুন!"); return; }

    let table = document.getElementById('feeTable');
    let row = table.insertRow();
    let statusColor = status === 'Paid' ? 'green' : 'red';
    row.innerHTML = `<td>${flat}</td><td>${month}</td><td>৳ ৩,০০০</td><td style="color:${statusColor}; font-weight:bold;">${status}</td>`;
    
    document.getElementById('feeFlat').value = '';
    document.getElementById('feeMonth').value = '';
}

// নোটিশ প্রকাশ
function addNotice() {
    let title = document.getElementById('noticeTitle').value;
    let desc = document.getElementById('noticeDesc').value;

    if(!title) { alert("শিরোনাম লিখুন!"); return; }

    let container = document.getElementById('noticeContainer');
    let card = document.createElement('div');
    card.className = 'notice-card';
    card.innerHTML = `<h4>${title}</h4><p>${desc}</p><small style="color:gray;">তারিখ: আজ</small>`;
    container.prepend(card);

    document.getElementById('noticeTitle').value = '';
    document.getElementById('noticeDesc').value = '';
}
