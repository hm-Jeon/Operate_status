import Swiper from "https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.esm.browser.min.js";

const SEOUL_GU = [
    "종로구",
    "중구",
    "용산구",
    "성동구",
    "광진구",
    "동대문구",
    "중랑구",
    "성북구",
    "강북구",
    "도봉구",
    "노원구",
    "은평구",
    "서대문구",
    "마포구",
    "양천구",
];

const SEOUL_GU_LOGO = {
    종로구: "jongno_logo",
    중구: "jung_logo",
    용산구: "yongsan_logo",
    성동구: "seongdong_logo",
    광진구: "gwangjin_logo",
    동대문구: "dongdaemun_logo",
    중랑구: "jungrang_logo",
    성북구: "seongbuk_logo",
    강북구: "gangbuk_logo",
    도봉구: "dobong_logo",
    노원구: "nowon_logo",
    은평구: "eunpyeong_logo",
    서대문구: "seodaemun_logo",
    마포구: "mapo_logo",
    양천구: "yangcheon_logo",
};

const SEOUL_DONG = {
    종로구: [
        "청운효자동",
        "사직동",
        "삼청동",
        "부암동",
        "평창동",
        "무악동",
        "교남동",
        "가회동",
        "종로1·2·3·4가동",
        "종로5·6가동",
        "이화동",
        "혜화동",
        "창신제1동",
        "창신제2동",
        "창신제3동",
        "숭인제1동",
        "숭인제2동",
    ],
    중구: [
        "소공동",
        "회현동",
        "명동",
        "필동",
        "장충동",
        "광희동",
        "을지로동",
        "신당동",
        "다산동",
        "약수동",
        "청구동",
        "신당제5동",
        "동화동",
        "황학동",
        "중림동",
    ],
    용산구: [
        "후암동",
        "용산2가동",
        "남영동",
        "청파동",
        "원효로제1동",
        "원효로제2동",
        "효창동",
        "용문동",
        "한강로동",
        "이촌제1동",
        "이촌제2동",
        "이태원제1동",
        "이태원제2동",
        "한남동",
        "서빙고동",
        "보광동",
    ],
    성동구: [
        "왕십리도선동",
        "왕십리제2동",
        "마장동",
        "사근동",
        "행당제1동",
        "행당제2동",
        "응봉동",
        "금호1가동",
        "금호2·3가동",
        "금호4가동",
        "옥수동",
        "성수1가제1동",
        "성수1가제2동",
        "성수2가제1동",
        "성수2가제2동",
        "송정동",
        "용답동",
    ],
    광진구: [
        "중곡제1동",
        "중곡제2동",
        "중곡제3동",
        "중곡제4동",
        "능동",
        "구의제1동",
        "구의제2동",
        "구의제3동",
        "광장동",
        "자양제1동",
        "자양제2동",
        "자양제3동",
        "자양제4동",
        "화양동",
        "군자동",
    ],
    동대문구: [
        "용신동",
        "제기동",
        "전농제1동",
        "전농제2동",
        "답십리제1동",
        "답십리제2동",
        "답십리제3동",
        "장안제1동",
        "장안제2동",
        "청량리동",
        "회기동",
        "휘경제1동",
        "휘경제2동",
        "이문제1동",
        "이문제2동",
    ],
    중랑구: [
        "면목본동",
        "면목제2동",
        "면목제3·8동",
        "면목제4동",
        "면목제5동",
        "면목제7동",
        "상봉제1동",
        "상봉제2동",
        "중화제1동",
        "중화제2동",
        "묵제1동",
        "묵제2동",
        "망우본동",
        "망우제3동",
        "신내제1동",
        "신내제2동",
    ],
    성북구: [
        "성북동",
        "삼선동",
        "동선동",
        "돈암제1동",
        "돈암제2동",
        "안암동",
        "보문동",
        "정릉제1동",
        "정릉제2동",
        "정릉제3동",
        "정릉제4동",
        "길음제1동",
        "길음제2동",
        "종암동",
        "월곡제1동",
        "월곡제2동",
        "장위제1동",
        "장위제2동",
        "장위제3동",
        "석관동",
    ],
    강북구: [
        "삼양동",
        "미아동",
        "송중동",
        "송천동",
        "삼각산동",
        "번1동",
        "번2동",
        "번3동",
        "수유1동",
        "수유2동",
        "수유3동",
        "우이동",
        "인수동",
    ],
    도봉구: [
        "쌍문1동",
        "쌍문2동",
        "쌍문3동",
        "쌍문4동",
        "방학1동",
        "방학2동",
        "방학3동",
        "창1동",
        "창2동",
        "창3동",
        "창4동",
        "창5동",
        "도봉1동",
        "도봉2동",
    ],
    노원구: [
        "월계1동",
        "월계2동",
        "월계3동",
        "공릉1동",
        "공릉2동",
        "하계1동",
        "하계2동",
        "중계본동",
        "중계1동",
        "중계2·3동",
        "중계4동",
        "상계1동",
        "상계2동",
        "상계3·4동",
        "상계5동",
        "상계6·7동",
        "상계8동",
        "상계9동",
        "상계10동",
    ],
    은평구: [
        "녹번동",
        "불광제1동",
        "불광제2동",
        "갈현제1동",
        "갈현제2동",
        "구산동",
        "대조동",
        "응암제1동",
        "응암제2동",
        "응암제3동",
        "역촌동",
        "신사제1동",
        "신사제2동",
        "증산동",
        "수색동",
        "진관동",
    ],
    서대문구: [
        "충현동",
        "천연동",
        "북아현동",
        "신촌동",
        "연희동",
        "홍제제1동",
        "홍제제2동",
        "홍제제3동",
        "홍은제1동",
        "홍은제2동",
        "남가좌제1동",
        "남가좌제2동",
        "북가좌제1동",
        "북가좌제2동",
    ],
    마포구: [
        "공덕동",
        "아현동",
        "도화동",
        "용강동",
        "대흥동",
        "염리동",
        "신수동",
        "서강동",
        "서교동",
        "합정동",
        "망원1동",
        "망원2동",
        "연남동",
        "성산1동",
        "성산2동",
        "상암동",
    ],
    양천구: [
        "목1동",
        "목2동",
        "목3동",
        "목4동",
        "목5동",
        "신월1동",
        "신월2동",
        "신월3동",
        "신월4동",
        "신월5동",
        "신월6동",
        "신월7동",
        "신정1동",
        "신정2동",
        "신정3동",
        "신정4동",
        "신정6동",
        "신정7동",
    ],
};

document.addEventListener("DOMContentLoaded", () => {
    const time_now = document.querySelector("#time_now");
    const time_update = document.querySelector("#time_update");
    const operate_status = document.querySelector(".operate-status .swiper .swiper-wrapper");

    const getDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return `${year}년 ${month}월 ${day}일`;
    };

    const getTime = () => {
        const time = new Date();
        const hour = time.getHours().toString().padStart(2, "0");
        const minute = time.getMinutes().toString().padStart(2, "0");
        const second = time.getSeconds().toString().padStart(2, "0");

        return `${hour}:${minute}:${second}`;
    };

    const date = getDate();

    const renderTimeNow = () => {
        time_now.innerHTML = `${date} ${getTime()}`;
    };

    const renderTimeUpdate = () => {
        time_update.innerHTML = getTime();
    };

    const startTimeNow = () => {
        renderTimeNow();
        setInterval(() => {
            renderTimeNow();
        }, 1000);
    };

    startTimeNow();

    const renderOperateStatus = () => {
        renderTimeUpdate();

        SEOUL_GU.forEach((gu) => {
            operate_status.innerHTML +=
                "<div class='gu swiper-slide'>" +
                `<div class='gu-title'><img class='gu-logo' src='./images/${SEOUL_GU_LOGO[gu]}.svg' alt='${gu}'><span>${gu}</span></div>` +
                "<div class='list-header'>" +
                "<div class='status'>상태</div>" +
                "<div class='welfare-center'>행정복지센터</div>" +
                "<div class='waiting'>대기인원</div>" +
                "</div>" +
                "<ul class='dong-list'>" +
                (() => {
                    let htmlString = "";

                    SEOUL_DONG[gu].forEach((dong) => {
                        const waiting = Math.floor(Math.random() * (15 - 0 + 1)) + 0;

                        let status_class = "";
                        if (waiting >= 10) {
                            status_class = "busy";
                        } else if (waiting >= 5) {
                            status_class = "normal";
                        } else {
                            status_class = "smooth";
                        }

                        if(dong === "장충동") {
                            status_class = "error";
                        }

                        htmlString +=
                            `<li class='dong ${status_class === "error" ? "error" : ""}'>` +
                            `<div><span class='status ${status_class}'>${status_class === "error" ? "장애" : ""}</span></div>` +
                            `<div class='dong-name'>${dong}</div>` +
                            `<div class='waiting'>${status_class === "error" ? "-" : waiting}</div>` +
                            "</li>";
                    });

                    return htmlString;
                })() +
                "</ul>" +
                "</div>";
        });
    };

    const swiper = new Swiper(".swiper", {
        slidesPerView: "auto",
        spaceBetween: 10,
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: true,
        },
    });

    const updateStatus = () => {
        renderTimeUpdate();

        const allDong = document.querySelectorAll(".dong-list .dong");

        allDong.forEach((dong) => {
            if (dong.querySelector(".dong-name").innerHTML !== "장충동") {
                const status = dong.querySelector(".status");
                const waiting = dong.querySelector(".waiting");
    
                const newWaiting = Math.floor(Math.random() * (15 - 0 + 1)) + 0;
    
                status.classList.remove("busy", "normal", "smooth");
                let status_class = "";
                if (newWaiting >= 10) {
                    status_class = "busy";
                } else if (newWaiting >= 5) {
                    status_class = "normal";
                } else {
                    status_class = "smooth";
                }
    
                status.classList.add(status_class);
                waiting.innerHTML = newWaiting;
            }
        });
    };

    renderOperateStatus();
    setInterval(() => {
        updateStatus();
    }, 3000);

    const addDongClickEventListener = () => {
        const all_dong = document.querySelectorAll(".dong-list .dong");

        all_dong.forEach((dong) => {
            dong.addEventListener("click", (event) => {
                const dong_name = event.currentTarget.querySelector(".dong-name").innerHTML;
                const gu_name = event.currentTarget.parentElement.parentElement.querySelector(".gu-title span").innerHTML;
                console.log(gu_name);

                location.href = `./dong_detail.html?gu=${gu_name}&dong=${dong_name}`;
            });
        });
    };

    addDongClickEventListener();
});
