import Swiper from "https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.esm.browser.min.js";
import {SEOUL_GU_LOGO} from "./config.js";

const url = new URL(window.location.href);
const urlParams = url.searchParams;
const dong_name = urlParams.get("dong");
const gu_name = urlParams.get("gu");
const tab = urlParams.get("tab");

// Chart Global Configuration
Chart.defaults.responsive = true;
Chart.defaults.aspectRatio = 2;

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
    };

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

    const average = (ctx, idx) => {
        const values = ctx.chart.data.datasets[idx].data;
        return values.reduce((a, b) => a + b, 0) / values.length;
    };

    const year_data_1 = [];
    const year_data_2 = [];
    const year_data_3 = [];
    const year_data = [year_data_1, year_data_2, year_data_3];

    for (var i = 0; i < 12; i++) {
        year_data_1.push(Math.floor(Math.random() * (900 - 700 + 1)) + 700);
        year_data_2.push(Math.floor(Math.random() * (900 - 700 + 1)) + 700);
        year_data_3.push(Math.floor(Math.random() * (900 - 700 + 1)) + 700);
    }

    const renderNumberTicketYearChart = () => {
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
                        label: "제증명 발급",
                        data: year_data_1,
                        borderColor: "#0088ca",
                        backgroundColor: "#0088ca",
                    },
                    {
                        label: "신분증 발급",
                        data: year_data_2,
                        borderColor: "#2e9545",
                        backgroundColor: "#2e9545",
                    },
                    {
                        label: "출생/사망/전입 신고",
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
                        max: 1000,
                        min: 500,
                        // beginAtZero: true,
                        grid: {
                            borderDash: [6, 10000],
                            tickLength: 6,
                            color: "#fff",
                        },
                        ticks: {
                            maxTicksLimit: 6,
                            callback: (value) => `${value.toLocaleString("kr")}건`,
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
                    annotation: {
                        annotations: {
                            0: {
                                type: "line",
                                borderColor: "#0088ca",
                                borderDash: [10, 10],
                                borderDashOffset: 0,
                                borderWidth: 3,
                                scaleID: "y",
                                value: (ctx) => average(ctx, 0),
                            },
                            1: {
                                type: "line",
                                borderColor: "#2e9545",
                                borderDash: [10, 10],
                                borderDashOffset: 0,
                                borderWidth: 3,
                                scaleID: "y",
                                value: (ctx) => average(ctx, 1),
                            },
                            2: {
                                type: "line",
                                borderColor: "#bb1238",
                                borderDash: [10, 10],
                                borderDashOffset: 0,
                                borderWidth: 3,
                                scaleID: "y",
                                value: (ctx) => average(ctx, 2),
                            },
                        },
                    },
                },
            },
        });
    };

    const renderNumberTicketYearTable = () => {
        const year_table_head = document.querySelector(".mode#year table thead");
        const year_table_body = document.querySelector(".mode#year table tbody");
        const year_table_foot = document.querySelector(".mode#year table tfoot");

        year_table_head.innerHTML =
            `<tr>` +
            (() => {
                let htmlString = "<td>업무구분</td>";

                for (var i = 1; i <= 12; i++) {
                    htmlString += `<td>${i}월</td>`;
                }

                return htmlString;
            })() +
            `<td>합계</td>` +
            `<tr>`;

        year_table_body.innerHTML = (() => {
            let htmlString = "";

            year_data.forEach((rows, idx) => {
                htmlString += `<tr>`;

                if (idx === 0) {
                    htmlString += "<td>제증명 발급</td>";
                } else if (idx === 1) {
                    htmlString += "<td>신분증 발급</td>";
                } else if (idx === 2) {
                    htmlString += "<td>출생/사망/전입 신고</td>";
                }

                let amount = 0;

                rows.forEach((row) => {
                    htmlString += `<td>${row}</td>`;
                    amount += row;
                });

                htmlString += `<td>${amount}</td>` + `</tr>`;
            });

            return htmlString;
        })();

        year_table_foot.innerHTML = (() => {
            let htmlString = "<td>합계</td>";

            for (var i = 2; i <= 14; i++) {
                let amount = 0;
                document.querySelectorAll(".mode#year table tbody tr").forEach((tr) => {
                    amount += +tr.querySelector(`td:nth-child(${i})`).innerHTML;
                });

                htmlString += `<td>${amount}</td>`;
            }

            return htmlString;
        })();
    };

    const month_label = [];
    const month_data_1 = [];
    const month_data_2 = [];
    const month_data_3 = [];
    const month_data = [month_data_1, month_data_2, month_data_3];

    for (var i = 1; i <= 31; i++) {
        month_label.push(`${i}일`);
        month_data_1.push(Math.floor(Math.random() * (50 - 10 + 1)) + 10);
        month_data_2.push(Math.floor(Math.random() * (50 - 10 + 1)) + 10);
        month_data_3.push(Math.floor(Math.random() * (50 - 10 + 1)) + 10);
    }

    const renderNumberTicketMonthChart = () => {
        const ctx = document.querySelector("#month #number_ticket_chart");

        new Chart(ctx, {
            type: "line",
            data: {
                labels: month_label,
                datasets: [
                    {
                        label: "제증명 발급",
                        data: month_data_1,
                        borderColor: "#0088ca",
                        backgroundColor: "#0088ca",
                    },
                    {
                        label: "신분증 발급",
                        data: month_data_2,
                        borderColor: "#2e9545",
                        backgroundColor: "#2e9545",
                    },
                    {
                        label: "출생/사망/전입 신고",
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
                        max: 100,
                        beginAtZero: true,
                        grid: {
                            borderDash: [6, 10000],
                            tickLength: 6,
                            color: "#fff",
                        },
                        ticks: {
                            maxTicksLimit: 6,
                            callback: (value) => `${value.toLocaleString("kr")}건`,
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
                    annotation: {
                        annotations: {
                            0: {
                                type: "line",
                                borderColor: "#0088ca",
                                borderDash: [10, 10],
                                borderDashOffset: 0,
                                borderWidth: 3,
                                scaleID: "y",
                                value: (ctx) => average(ctx, 0),
                            },
                            1: {
                                type: "line",
                                borderColor: "#2e9545",
                                borderDash: [10, 10],
                                borderDashOffset: 0,
                                borderWidth: 3,
                                scaleID: "y",
                                value: (ctx) => average(ctx, 1),
                            },
                            2: {
                                type: "line",
                                borderColor: "#bb1238",
                                borderDash: [10, 10],
                                borderDashOffset: 0,
                                borderWidth: 3,
                                scaleID: "y",
                                value: (ctx) => average(ctx, 2),
                            },
                        },
                    },
                },
            },
        });
    };

    const renderNumberTicketMonthTable = () => {
        const month_table_head = document.querySelector(".mode#month table thead");
        const month_table_body = document.querySelector(".mode#month table tbody");
        const month_table_foot = document.querySelector(".mode#month table tfoot");

        month_table_head.innerHTML =
            `<tr>` +
            (() => {
                let htmlString = "<td>업무구분</td>";

                month_label.forEach((label) => {
                    htmlString += `<td>${label}</td>`;
                });

                return htmlString;
            })() +
            `<td>합계</td>` +
            `<tr>`;

        month_table_body.innerHTML = (() => {
            let htmlString = "";

            month_data.forEach((rows, idx) => {
                htmlString += `<tr>`;

                if (idx === 0) {
                    htmlString += "<td>제증명 발급</td>";
                } else if (idx === 1) {
                    htmlString += "<td>신분증 발급</td>";
                } else if (idx === 2) {
                    htmlString += "<td>출생/사망/전입 신고</td>";
                }

                let amount = 0;

                rows.forEach((row) => {
                    htmlString += `<td>${row}</td>`;
                    amount += row;
                });

                htmlString += `<td>${amount}</td>` + `</tr>`;
            });

            return htmlString;
        })();

        month_table_foot.innerHTML = (() => {
            let htmlString = "<td>합계</td>";

            for (var i = 2; i <= 33; i++) {
                let amount = 0;
                document.querySelectorAll(".mode#month table tbody tr").forEach((tr) => {
                    amount += +tr.querySelector(`td:nth-child(${i})`).innerHTML;
                });

                htmlString += `<td>${amount}</td>`;
            }

            return htmlString;
        })();
    };

    const day_label = [];
    const day_data_1 = [];
    const day_data_2 = [];
    const day_data_3 = [];
    const day_data = [day_data_1, day_data_2, day_data_3];

    for (var i = 7; i <= 20; i++) {
        day_label.push(`${i}시`);
        day_data_1.push(Math.floor(Math.random() * (5 - 0 + 1)) + 0);
        day_data_2.push(Math.floor(Math.random() * (5 - 0 + 1)) + 0);
        day_data_3.push(Math.floor(Math.random() * (5 - 0 + 1)) + 0);
    }

    const renderNumberTicketDayChart = () => {
        const ctx = document.querySelector("#day #number_ticket_chart");

        new Chart(ctx, {
            type: "line",
            data: {
                labels: day_label,
                datasets: [
                    {
                        label: "제증명 발급",
                        data: day_data_1,
                        borderColor: "#0088ca",
                        backgroundColor: "#0088ca",
                    },
                    {
                        label: "신분증 발급",
                        data: day_data_2,
                        borderColor: "#2e9545",
                        backgroundColor: "#2e9545",
                    },
                    {
                        label: "출생/사망/전입 신고",
                        data: day_data_3,
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
                        max: 10,
                        beginAtZero: true,
                        grid: {
                            borderDash: [6, 10000],
                            tickLength: 6,
                            color: "#fff",
                        },
                        ticks: {
                            maxTicksLimit: 6,
                            callback: (value) => `${value.toLocaleString("kr")}건`,
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
                    annotation: {
                        annotations: {
                            0: {
                                type: "line",
                                borderColor: "#0088ca",
                                borderDash: [10, 10],
                                borderDashOffset: 0,
                                borderWidth: 3,
                                scaleID: "y",
                                value: (ctx) => average(ctx, 0),
                            },
                            1: {
                                type: "line",
                                borderColor: "#2e9545",
                                borderDash: [10, 10],
                                borderDashOffset: 0,
                                borderWidth: 3,
                                scaleID: "y",
                                value: (ctx) => average(ctx, 1),
                            },
                            2: {
                                type: "line",
                                borderColor: "#bb1238",
                                borderDash: [10, 10],
                                borderDashOffset: 0,
                                borderWidth: 3,
                                scaleID: "y",
                                value: (ctx) => average(ctx, 2),
                            },
                        },
                    },
                },
            },
        });
    };

    const renderNumberTicketDayTable = () => {
        const day_table_head = document.querySelector(".mode#day table thead");
        const day_table_body = document.querySelector(".mode#day table tbody");
        const day_table_foot = document.querySelector(".mode#day table tfoot");

        day_table_head.innerHTML =
            `<tr>` +
            (() => {
                let htmlString = "<td>업무구분</td>";

                day_label.forEach((label) => {
                    htmlString += `<td>${label}</td>`;
                });

                return htmlString;
            })() +
            `<td>합계</td>` +
            `<tr>`;

        day_table_body.innerHTML = (() => {
            let htmlString = "";

            day_data.forEach((rows, idx) => {
                htmlString += `<tr>`;

                if (idx === 0) {
                    htmlString += "<td>제증명 발급</td>";
                } else if (idx === 1) {
                    htmlString += "<td>신분증 발급</td>";
                } else if (idx === 2) {
                    htmlString += "<td>출생/사망/전입 신고</td>";
                }

                let amount = 0;

                rows.forEach((row) => {
                    htmlString += `<td>${row}</td>`;
                    amount += row;
                });

                htmlString += `<td>${amount}</td>` + `</tr>`;
            });

            return htmlString;
        })();

        day_table_foot.innerHTML = (() => {
            let htmlString = "<td>합계</td>";

            for (var i = 2; i <= 16; i++) {
                let amount = 0;
                document.querySelectorAll(".mode#day table tbody tr").forEach((tr) => {
                    amount += +tr.querySelector(`td:nth-child(${i})`).innerHTML;
                });

                htmlString += `<td>${amount}</td>`;
            }

            return htmlString;
        })();
    };

    const initNumberTicket = () => {
        renderNumberTicketYearChart();
        renderNumberTicketYearTable();
        renderNumberTicketMonthChart();
        renderNumberTicketMonthTable();
        renderNumberTicketDayChart();
        renderNumberTicketDayTable();
    };

    initNumberTicket();

    const call_log_tabs = document.querySelectorAll(".call-log-tab");

    const initCallLogTab = () => {
        call_log_tabs[0].classList.add("active");
    };

    initCallLogTab();

    const call_log_mode = document.querySelectorAll("#call_log .mode");

    const renderCallLogContent = () => {
        const call_log_tab_active = document.querySelector(".call-log-tab.active");

        call_log_mode.forEach((mode) => {
            if (mode.id === call_log_tab_active.dataset.value) {
                mode.classList.add("active");
            } else {
                mode.classList.remove("active");
            }
        });
    };

    renderCallLogContent();

    const addCallLogTabClickEventListener = () => {
        call_log_tabs.forEach((tab) => {
            tab.addEventListener("click", (event) => {
                call_log_tabs.forEach((tab) => {
                    if (tab === event.currentTarget) {
                        tab.classList.add("active");
                    } else {
                        tab.classList.remove("active");
                    }
                });

                renderCallLogContent();
            });
        });
    };

    addCallLogTabClickEventListener();

    const amount_label = [];
    const amount_data_1 = [];
    const amount_data_2 = [];
    const amount_data_3 = [];
    const amount_data = [amount_data_1, amount_data_2, amount_data_3];

    for (var i = 1; i <= 8; i++) {
        amount_label.push(`${i}번 창구`);
        if (i === 2 || i === 5) {
            amount_data_1.push(Math.floor(Math.random() * (10 - 5 + 1)) + 5);
            amount_data_2.push(Math.floor(Math.random() * (10 - 5 + 1)) + 5);
            amount_data_3.push(Math.floor(Math.random() * (10 - 5 + 1)) + 5);
        } else if (i === 4 || i === 8) {
            amount_data_1.push(Math.floor(Math.random() * (3 - 1 + 1)) + 1);
            amount_data_2.push(Math.floor(Math.random() * (3 - 1 + 1)) + 1);
            amount_data_3.push(Math.floor(Math.random() * (3 - 1 + 1)) + 1);
        } else {
            amount_data_1.push(Math.floor(Math.random() * (5 - 2 + 1)) + 2);
            amount_data_2.push(Math.floor(Math.random() * (5 - 2 + 1)) + 2);
            amount_data_3.push(Math.floor(Math.random() * (5 - 2 + 1)) + 2);
        }
    }

    const renderCallLogAmountChart = () => {
        const ctx = document.querySelector("#amount #call_log_chart");

        new Chart(ctx, {
            type: "bar",
            data: {
                labels: amount_label,
                datasets: [
                    {
                        label: "제증명 발급",
                        data: amount_data_1,
                        backgroundColor: "#0088ca",
                        borderRadius: 10,
                        barPercentage: 0.5,
                    },
                    {
                        label: "신분증 발급",
                        data: amount_data_2,
                        backgroundColor: "#2e9545",
                        borderRadius: 10,
                        barPercentage: 0.5,
                    },
                    {
                        label: "출생/사망/전입 신고",
                        data: amount_data_3,
                        backgroundColor: "#bb1238",
                        borderRadius: 10,
                        barPercentage: 0.5,
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        stacked: true,
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
                        stacked: true,
                        beginAtZero: true,
                        grid: {
                            borderDash: [6, 10000],
                            tickLength: 5,
                            color: "#fff",
                        },
                        ticks: {
                            maxTicksLimit: 6,
                            callback: (value) => `${value.toLocaleString("kr")}건`,
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
                    annotation: {
                        annotations: {
                            0: {
                                type: "line",
                                borderColor: "#fff",
                                borderDash: [10, 10],
                                borderDashOffset: 0,
                                borderWidth: 3,
                                scaleID: "y",
                                value: (ctx) => average(ctx, 0) + average(ctx, 1) + average(ctx, 2),
                            },
                        },
                    },
                },
            },
        });
    };

    const renderCallLogAmountTable = () => {
        const amount_table_head = document.querySelector(".mode#amount table thead");
        const amount_table_body = document.querySelector(".mode#amount table tbody");
        const amount_table_foot = document.querySelector(".mode#amount table tfoot");

        amount_table_head.innerHTML =
            `<tr>` +
            (() => {
                let htmlString = "<td>업무구분</td>";

                amount_label.forEach((label) => {
                    htmlString += `<td>${label}</td>`;
                });

                return htmlString;
            })() +
            `<td>합계</td>` +
            `<tr>`;

        amount_table_body.innerHTML = (() => {
            let htmlString = "";

            amount_data.forEach((rows, idx) => {
                htmlString += `<tr>`;

                if (idx === 0) {
                    htmlString += "<td>제증명 발급</td>";
                } else if (idx === 1) {
                    htmlString += "<td>신분증 발급</td>";
                } else if (idx === 2) {
                    htmlString += "<td>출생/사망/전입 신고</td>";
                }

                let amount = 0;

                rows.forEach((row) => {
                    htmlString += `<td>${row}</td>`;
                    amount += row;
                });

                htmlString += `<td>${amount}</td>` + `</tr>`;
            });

            return htmlString;
        })();

        amount_table_foot.innerHTML = (() => {
            let htmlString = "<td>합계</td>";

            for (var i = 2; i <= 10; i++) {
                let amount = 0;
                document.querySelectorAll(".mode#amount table tbody tr").forEach((tr) => {
                    amount += +tr.querySelector(`td:nth-child(${i})`).innerHTML;
                });

                htmlString += `<td>${amount}</td>`;
            }

            return htmlString;
        })();
    };

    const time_label = [];
    const time_log_data = [];
    const time_average = [];

    for (var i = 1; i <= 8; i++) {
        time_label.push(`${i}번 창구`);
    }

    const setTimeLogData = () => {
        const call_amount = document.querySelectorAll("#amount table tfoot td");

        for (var i = 1; i < call_amount.length - 1; i++) {
            const time_log = [];
            const open_time = new Date();
            open_time.setHours(9);
            open_time.setMinutes(0);
            open_time.setSeconds(0);

            for (var j = 0; j < +call_amount[i].innerHTML; j++) {
                const term = Math.floor(Math.random() * (20 - 5 + 1)) + 5;

                let duration = 0;
                if (i === 2 || i === 5) {
                    duration = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
                } else if (i === 4 || i === 8) {
                    duration = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
                } else {
                    duration = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
                }

                const call_time = new Date(open_time.setMinutes(open_time.getMinutes() + term));
                const finish_time = new Date(
                    open_time.setMinutes(open_time.getMinutes() + duration)
                );

                time_log.push({ call: call_time, finish: finish_time, duration: duration });
            }

            time_log_data.push(time_log);
        }
    };

    const getTimeAverage = () => {
        time_log_data.forEach((time_log) => {
            let amount = 0;

            time_log.forEach((log) => {
                amount += log.duration;
            });

            time_average.push(Math.round(amount / time_log.length));
        });
    };

    const renderCallLogTimeChart = () => {
        const ctx = document.querySelector("#time #call_log_chart");

        new Chart(ctx, {
            type: "bar",
            data: {
                labels: time_label,
                datasets: [
                    {
                        label: "평균 소요시간",
                        data: time_average,
                        backgroundColor: (ctx) => {
                            const average = Math.round(time_average.reduce((prev, current) => prev + current) / time_average.length);
                            const data = ctx.parsed.y;

                            if (Math.abs(average - data) <= 5) {
                                return "#2e9545";
                            }
                            else if (average < data) {
                                return "#bb1238";
                            } else {
                                return "#0088ca";
                            }
                        },
                        borderRadius: 10,
                        barPercentage: 0.5,
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        stacked: true,
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
                        stacked: true,
                        max: 60,
                        beginAtZero: true,
                        grid: {
                            borderDash: [6, 10000],
                            tickLength: 6,
                            color: "#fff",
                        },
                        ticks: {
                            maxTicksLimit: 6,
                            callback: (value) => `${value.toLocaleString("kr")}분`,
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
                                return `${label}: ${(+value).toLocaleString("kr")}분`;
                            },
                        },
                    },
                    annotation: {
                        annotations: {
                            0: {
                                type: "line",
                                borderColor: "#fff",
                                borderDash: [10, 10],
                                borderDashOffset: 0,
                                borderWidth: 3,
                                scaleID: "y",
                                value: (ctx) => average(ctx, 0),
                            },
                        },
                    },
                },
            },
        });
    };

    const renderCallLogTimeTable = () => {
        const call_log_swiper = document.querySelector("#time .swiper-wrapper");

        let htmlString = "";

        time_log_data.forEach((time_log, idx) => {
            htmlString += `<div class="window swiper-slide">
            <div class='time-log-title'><span>${idx + 1}번 창구</span></div>
            <div class="time-log-header">
                <div class="call">호출시간</div>
                <div class="finish">완료시간</div>
                <div class="duration">소요시간</div>
            </div>
            <ul class="time-log">
            `;

            time_log.forEach((log) => {
                htmlString += `<li class="log">
                    <div class="call">${log.call.toLocaleTimeString("ko-KR")}</div>
                    <div class="finish">${log.finish.toLocaleTimeString("ko-KR")}</div>
                    <div class="duration">${log.duration}분</div>
                </li>`;
            });

            htmlString += `</ul>
            </div>`;
        });

        call_log_swiper.innerHTML = htmlString;
    };

    const swiper = new Swiper(".swiper", {
        slidesPerView: "auto",
        spaceBetween: 10,
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: true,
        },
    });

    const initCallLog = () => {
        renderCallLogAmountChart();
        renderCallLogAmountTable();
        setTimeLogData();
        getTimeAverage();
        renderCallLogTimeChart();
        renderCallLogTimeTable();
    };

    initCallLog();
});
