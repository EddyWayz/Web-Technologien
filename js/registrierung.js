
function disableAbsenden() {
    var isChecked = document.getElementById("agb").checked;
    document.getElementById("absendenButton").disabled = !isChecked;

}
function checkPasswords() {
    let password1Value = document.getElementById("password").value;
    let password2Value = document.getElementById("password2").value;
    let icon1 = document.getElementById("passwordIcon1");
    let icon2 = document.getElementById("passwordIcon2");

    if (password1Value !== "" && password2Value !== "") {
        if (password1Value !== password2Value) {
            let r = confirm("Die Passwörter sind unterschiedlich");
            if (r) {
                document.getElementById("password").value = ""; 
                document.getElementById("password2").value = "";
                icon1.innerHTML = '';
                icon2.innerHTML = '';
                document.getElementById("password").focus();
            } else {
                icon1.innerHTML = '<i class="bi bi-x-circle text-danger"></i>';
                icon2.innerHTML = '<i class="bi bi-x-circle text-danger"></i>';
                document.getElementById("password").focus();
            }
        } else {
            icon1.innerHTML = '<i class="bi bi-check-circle text-success"></i>';
            icon2.innerHTML = '<i class="bi bi-check-circle text-success"></i>'; 
        }
    } else {
        icon1.innerHTML = '';
        icon2.innerHTML = ''; 
    }
}