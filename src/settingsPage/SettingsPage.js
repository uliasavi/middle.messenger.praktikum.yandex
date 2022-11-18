function showEditSettings(){
    const root = document.querySelector(".settings-link");
    const submitBtn = document.querySelector("#saveSettingsBtn");
    root.style.display = "none";
    submitBtn.style.display = "block";

    disabledSettingsDate(false)
}

function saveSettings(){
    const root = document.querySelector(".settings-link");
    const submitBtn = document.querySelector("#saveSettingsBtn");
    const password = document.querySelector(".settings-password");
    const data = document.querySelector(".settings-data");
    root.style.display = "flex";
    password.style.display = "none";
    submitBtn.style.display = "none";
    data.style.display = "flex";
    disabledSettingsDate(true)
}

function showEditPassword(){
    const link = document.querySelector(".settings-link");
    const root = document.querySelector(".settings-password");
    const data = document.querySelector(".settings-data");
    const submitBtn = document.querySelector("#saveSettingsBtn");
    root.style.display = "block";
    link.style.display = "none";
    submitBtn.style.display = "block";
    data.style.display = "none";
}

function disabledSettingsDate(val){
    const inputs = document.querySelectorAll(".settings-data .wrapper-input input");
    inputs.forEach(el=>{
        el.disabled = val;
    })
}
window.showEditSettings = showEditSettings;
window.saveSettings = saveSettings;
window.showEditPassword = showEditPassword;
