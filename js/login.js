const ID = "bpauto";
const PW = "sonamu";

const login_id = document.querySelector("#id");
const login_pw = document.querySelector("#pw");
const login_submit = document.querySelector("#submit");

login_submit.addEventListener("click", () => {
    if(!login_id.value) {
        alert("아이디를 입력해주세요.");
        login_id.focus();
        return false;
    }
    if(!login_pw.value) {
        login_pw.focus();
        alert("비밀번호를 입력해주세요.");
        return false;
    }

    if(login_id.value === ID) {
        if (login_pw.value === PW) {
            location.href = "./main.html";
        } else {
            alert("아이디 또는 비밀번호가 일치하지 않습니다. 다시 시도해주세요.")
        }
    } else {
        alert("아이디 또는 비밀번호가 일치하지 않습니다. 다시 시도해주세요.")
    }
})