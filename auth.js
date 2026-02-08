/* ===== ADMIN LOGIN ===== */
const ADMIN_USER = "skahosting";
const ADMIN_PASS = "Z62BGma)qTi!Szs";

/* ===== ON LOAD ===== */
window.onload = () => {
  applyAuthUI();
  applyPremiumLock();
};

/* ===== REGISTER ===== */
function register(){
  let u = authUser.value.trim();
  let p = authPass.value.trim();
  if(!u || !p) return alert("Fill all fields");

  let users = JSON.parse(localStorage.users || "[]");
  if(users.find(x=>x.username===u)) return alert("User already exists");

  users.push({username:u,password:p});
  localStorage.users = JSON.stringify(users);
  alert("Registered successfully, now login");
}

/* ===== LOGIN ===== */
function login(){
  let u = authUser.value.trim();
  let p = authPass.value.trim();

  if(u === ADMIN_USER && p === ADMIN_PASS){
    localStorage.currentUser = JSON.stringify({username:u,role:"admin"});
  } else {
    let users = JSON.parse(localStorage.users || "[]");
    let ok = users.find(x=>x.username===u && x.password===p);
    if(!ok) return alert("Wrong username or password");
    localStorage.currentUser = JSON.stringify({username:u,role:"user"});
  }
  location.reload();
}

/* ===== LOGOUT ===== */
function logout(){
  localStorage.removeItem("currentUser");
  location.reload();
}

/* ===== APPLY AUTH UI ===== */
function applyAuthUI(){
  let cu = JSON.parse(localStorage.currentUser || "null");
  if(!cu) return;

  authBox.style.display = "none";
  userBar.style.display = "block";
  mainContent.style.display = "block";
  who.innerText = cu.username + " (" + cu.role + ")";

  if(cu.role === "admin"){
    adminLockBox.style.display = "block";
  } else {
    adminLockBox.style.display = "none";
  }
}

/* ===== PREMIUM LOCK ===== */
function togglePremiumLock(){
  let locked = localStorage.premiumLocked === "true";
  localStorage.premiumLocked = (!locked).toString();
  applyPremiumLock();
  alert("Premium tools " + (!locked ? "LOCKED" : "UNLOCKED"));
}

function applyPremiumLock(){
  let locked = localStorage.premiumLocked === "true";
  document.querySelectorAll(".premium").forEach(btn=>{
    btn.disabled = locked;
    btn.style.opacity = locked ? "0.4" : "1";
  });
}

/* ===== HIDDEN LINK ===== */
function openHidden(url){
  window.open(url,"_blank");
}
