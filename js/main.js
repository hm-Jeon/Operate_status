import Swiper from "https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.esm.browser.min.js";
import {SEOUL_GU, SEOUL_GU_LOGO, SEOUL_DONG} from "./config.js";

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
