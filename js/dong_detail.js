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

const url = new URL(window.location.href);
const urlParams = url.searchParams;
const dong_name = urlParams.get("dong");
const gu_name = urlParams.get("gu");
const tab = urlParams.get("tab");

// Chart Global Configuration
Chart.defaults.responsive = true;
// Chart.defaults.maintainAspectRatio = false;
Chart.defaults.aspectRatio = 2;
// Chart.defaults.layout.padding = {
//     top: 20,
//     bottom: 20,
//     left: 20,
//     right: 20,
// };

Chart.defaults.font.family = "Spoqa Han Sans Neo";
Chart.defaults.font.color = "#fff";

Chart.defaults.color = "#fff";
Chart.defaults.borderColor = "#fff";

Chart.defaults.plugins.tooltip.displayColors = false;
Chart.defaults.plugins.tooltip.padding = 10;
Chart.defaults.plugins.tooltip.titleFont = { size: 14, weight: "bold" };
// Chart Global Configuration END

document.addEventListener("DOMContentLoaded", () => {
    const title = document.querySelector("head title");

    const updateTitle = () => {
        title.innerHTML = `${dong_name} 운영현황`;
    };

    updateTitle();

    const header_dong_name = document.querySelector(".header-center .title .dong-name");

    const updateDongName = () => {
        header_dong_name.innerHTML = dong_name;
    };

    updateDongName();

    const header_right = document.querySelector(".header-right");

    const renderGuLogo = () => {
        header_right.innerHTML = `<img class='gu-logo' src='./images/${SEOUL_GU_LOGO[gu_name]}.svg' alt='${gu_name}'><span class="gu-text">${gu_name}</span`;
    };

    renderGuLogo();

    const tabs = document.querySelectorAll(".tab-box .tab");

    const initTab = () => {
        tabs[0].classList.add("active");
    };

    initTab();

    const contents = document.querySelectorAll(".content");

    const renderContent = () => {
        const tab_active = document.querySelector(".tab.active");

        contents.forEach((content) => {
            if (content.id === tab_active.dataset.value) {
                content.classList.add("active");
            } else {
                content.classList.remove("active");
            }
        });
    };

    renderContent();

    const addTabClickEventListener = () => {
        tabs.forEach((tab) => {
            tab.addEventListener("click", (event) => {
                tabs.forEach((tab) => {
                    if (tab === event.currentTarget) {
                        tab.classList.add("active");
                    } else {
                        tab.classList.remove("active");
                    }
                });

                renderContent();
            });
        });
    };

    addTabClickEventListener();

    const number_ticket_tabs = document.querySelectorAll(".number-ticket-tab");

    const initNumberTicketTab = () => {
        number_ticket_tabs[0].classList.add("active");
    }

    initNumberTicketTab();

    const number_ticket_mode = document.querySelectorAll("#number_ticket .mode");

    const renderNumberTicketContent = () => {
        const number_ticket_tab_active = document.querySelector(".number-ticket-tab.active");

        number_ticket_mode.forEach((mode) => {
            if (mode.id === number_ticket_tab_active.dataset.value) {
                mode.classList.add("active");
            } else {
                mode.classList.remove("active");
            }
        });
    };

    renderNumberTicketContent();

    const addNumberTicketTabClickEventListener = () => {
        number_ticket_tabs.forEach((tab) => {
            tab.addEventListener("click", (event) => {
                number_ticket_tabs.forEach((tab) => {
                    if (tab === event.currentTarget) {
                        tab.classList.add("active");
                    } else {
                        tab.classList.remove("active");
                    }
                });

                renderNumberTicketContent();
            });
        });
    };

    addNumberTicketTabClickEventListener();

    const renderNumberTicketYearChart = () => {
        const year_data_1 = [];
        const year_data_2 = [];
        const year_data_3 = [];
        for (var i = 0; i < 12; i++) {
            year_data_1.push(Math.floor(Math.random() * (1000 - 300 + 1)) + 300);
            year_data_2.push(Math.floor(Math.random() * (1000 - 300 + 1)) + 300);
            year_data_3.push(Math.floor(Math.random() * (1000 - 300 + 1)) + 300);
        }

        const ctx = document.querySelector("#year #number_ticket_chart");

        new Chart(ctx, {
            type: "line",
            data: {
                labels: [
                    "1월",
                    "2월",
                    "3월",
                    "4월",
                    "5월",
                    "6월",
                    "7월",
                    "8월",
                    "9월",
                    "10월",
                    "11월",
                    "12월",
                ],
                datasets: [
                    {
                        label: "민원구분1",
                        data: year_data_1,
                        borderColor: "#0088ca",
                        backgroundColor: "#0088ca",
                    },
                    {
                        label: "민원구분2",
                        data: year_data_2,
                        borderColor: "#2e9545",
                        backgroundColor: "#2e9545",
                    },
                    {
                        label: "민원구분3",
                        data: year_data_3,
                        borderColor: "#bb1238",
                        backgroundColor: "#bb1238",
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        grid: {
                            display: false,
                            color: "#fff",
                        },
                        ticks: {
                            color: "#fff",
                            font: {
                                size: 12,
                            },
                        },
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            borderDash: [6, 10000],
                            tickLength: 6,
                            color: "#fff",
                        },
                        ticks: {
                            maxTicksLimit: 6,
                            font: {
                                color: "#fff",
                            },
                            padding: 5,
                        },
                    },
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label;
                                let value = context.parsed.y;
                                return `${label}: ${(+value).toLocaleString("kr")}건`;
                            },
                        },
                    },
                },
            },
        });
    }

    const renderNumberTicketMonthChart = () => {
        const month_label = [];
        const month_data_1 = [];
        const month_data_2 = [];
        const month_data_3 = [];
        for (var i = 1; i <= 31; i++) {
            month_label.push(`${i}일`);
            month_data_1.push(Math.floor(Math.random() * (50 - 5 + 1)) + 5);
            month_data_2.push(Math.floor(Math.random() * (50 - 5 + 1)) + 5);
            month_data_3.push(Math.floor(Math.random() * (50 - 5 + 1)) + 5);
        }

        const ctx = document.querySelector("#month #number_ticket_chart");

        new Chart(ctx, {
            type: "line",
            data: {
                labels: month_label,
                datasets: [
                    {
                        label: "민원구분1",
                        data: month_data_1,
                        borderColor: "#0088ca",
                        backgroundColor: "#0088ca",
                    },
                    {
                        label: "민원구분2",
                        data: month_data_2,
                        borderColor: "#2e9545",
                        backgroundColor: "#2e9545",
                    },
                    {
                        label: "민원구분3",
                        data: month_data_3,
                        borderColor: "#bb1238",
                        backgroundColor: "#bb1238",
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        grid: {
                            display: false,
                            color: "#fff",
                        },
                        ticks: {
                            color: "#fff",
                            font: {
                                size: 12,
                            },
                        },
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            borderDash: [6, 10000],
                            tickLength: 6,
                            color: "#fff",
                        },
                        ticks: {
                            maxTicksLimit: 6,
                            font: {
                                color: "#fff",
                            },
                            padding: 5,
                        },
                    },
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label;
                                let value = context.parsed.y;
                                return `${label}: ${(+value).toLocaleString("kr")}건`;
                            },
                        },
                    },
                },
            },
        });
    }

    const initNumberTicket = () => {
        renderNumberTicketYearChart();
        renderNumberTicketMonthChart();
    };

    initNumberTicket();
});
