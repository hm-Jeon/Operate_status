import { SEOUL_GU_LOGO, SEOUL_DONG } from "./config.js";

const url = new URL(window.location.href);
const urlParams = url.searchParams;
const gu_name = urlParams.get("gu");

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
        title.innerHTML = `${gu_name} 운영현황`;
    };

    updateTitle();

    const header_gu_name = document.querySelector(".header-center .title .gu-name");

    const updateGuName = () => {
        header_gu_name.innerHTML = gu_name;
    };

    updateGuName();

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

    const work_average_tabs = document.querySelectorAll(".work-average-tab");

    const initWorkAverageTab = () => {
        work_average_tabs[0].classList.add("active");
    };

    initWorkAverageTab();

    const work_average_mode = document.querySelectorAll("#work_average .mode");

    const renderWorkAverageContent = () => {
        const work_average_tab_active = document.querySelector(".work-average-tab.active");

        work_average_mode.forEach((mode) => {
            if (mode.id === work_average_tab_active.dataset.value) {
                mode.classList.add("active");
            } else {
                mode.classList.remove("active");
            }
        });
    };

    renderWorkAverageContent();

    const addWorkAverageTabClickEventListener = () => {
        work_average_tabs.forEach((tab) => {
            tab.addEventListener("click", (event) => {
                work_average_tabs.forEach((tab) => {
                    if (tab === event.currentTarget) {
                        tab.classList.add("active");
                    } else {
                        tab.classList.remove("active");
                    }
                });

                renderWorkAverageContent();
            });
        });
    };

    addWorkAverageTabClickEventListener();

    const average = (ctx, idx) => {
        const values = ctx.chart.data.datasets[idx].data;
        return values.reduce((a, b) => a + b, 0) / values.length;
    };

    const work_average_data = {};

    SEOUL_DONG[gu_name].forEach((dong, dong_idx) => {
        const dong_data = [];
        const worker = Math.floor(Math.random() * (10 - 6 + 1)) + 6;
        let year_work_average = 0;

        for (var i = 0; i < 12; i++) {
            let work;

            if (dong_idx === 2) {
                work = Math.floor(Math.random() * (2800 - 2200 + 1)) + 2200;
            }
            if (dong_idx === 4) {
                work = Math.floor(Math.random() * (1900 - 1500 + 1)) + 1500;
            } else {
                work = Math.floor(Math.random() * (2300 - 1800 + 1)) + 1800;
            }

            const average = +(work / worker).toFixed(1);
            year_work_average += average;

            dong_data.push({ worker, work, average });
        }

        work_average_data[dong] = {
            dong_data,
            year_average: +(year_work_average / 12).toFixed(1),
        };
    });

    const renderWorkAverageYearChart = () => {
        const ctx = document.querySelector("#year #work_average_chart");

        const year_average = [];

        for (const dong in work_average_data) {
            year_average.push(work_average_data[dong].year_average);
        }

        new Chart(ctx, {
            type: "bar",
            data: {
                labels: Object.keys(work_average_data),
                datasets: [
                    {
                        label: "인원당 평균 민원 처리건수",
                        data: year_average,
                        backgroundColor: (ctx) => {
                            const average = Math.round(
                                year_average.reduce((prev, current) => prev + current) /
                                    year_average.length
                            );
                            const data = ctx.parsed.y;

                            if (Math.abs(average - data) <= 20) {
                                return "#2e9545";
                            } else if (average < data) {
                                return "#bb1238";
                            } else {
                                return "#0088ca";
                            }
                        },
                        borderRadius: 5,
                        barPercentage: 0.5,
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
                        max: 400,
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

    const renderWorkAverageYearTable = () => {
        const year_table_head = document.querySelector(".mode#year table thead");
        const year_table_body = document.querySelector(".mode#year table tbody");
        const year_table_foot = document.querySelector(".mode#year table tfoot");

        year_table_head.innerHTML =
            `<tr>` +
            (() => {
                let htmlString = "<td></td>";

                for (const dong in work_average_data) {
                    htmlString += `<td>${dong}</td>`;
                }

                return htmlString;
            })() +
            `<tr>`;

        year_table_body.innerHTML = (() => {
            let htmlString = "";

            for (var month = 0; month < 12; month++) {
                htmlString += `<tr>`;
                htmlString += `<td>${month + 1}월</td>`;
                let amount = 0;

                for (const dong in work_average_data) {
                    const average = work_average_data[dong].dong_data[month].average;
                    htmlString += `<td>${average}</td>`;
                }

                htmlString += `</tr>`;
            }

            return htmlString;
        })();

        year_table_foot.innerHTML = (() => {
            let htmlString = "<tr><td>인원수</td>";

            for (const dong in work_average_data) {
                htmlString += `<td>${work_average_data[dong].dong_data[0].worker}</td>`
            }

            htmlString += "</tr><tr><td>평균</td>";

            for (const dong in work_average_data) {
                const average = work_average_data[dong].year_average;
                htmlString += `<td>${average}</td>`;
            }


            htmlString += "</tr>"

            return htmlString;
        })();
    };

    const month_average = [];
    for (const dong in work_average_data) {
        month_average.push(work_average_data[dong].dong_data[0].average);
    }

    const renderWorkAverageMonthChart = () => {
        const ctx = document.querySelector("#month #work_average_chart");

        new Chart(ctx, {
            type: "bar",
            data: {
                labels: Object.keys(work_average_data),
                datasets: [
                    {
                        label: "인원당 평균 민원 처리건수",
                        data: month_average,
                        backgroundColor: (ctx) => {
                            const average = Math.round(
                                month_average.reduce((prev, current) => prev + current) /
                                    month_average.length
                            );
                            const data = ctx.parsed.y;

                            if (Math.abs(average - data) <= 20) {
                                return "#2e9545";
                            } else if (average < data) {
                                return "#bb1238";
                            } else {
                                return "#0088ca";
                            }
                        },
                        borderRadius: 5,
                        barPercentage: 0.5,
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
                        max: 400,
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

    const renderWorkAverageMonthTable = () => {
        const month_table_head = document.querySelector(".mode#month table thead");
        const month_table_body = document.querySelector(".mode#month table tbody");
        const month_table_foot = document.querySelector(".mode#month table tfoot");

        month_table_head.innerHTML =
            `<tr>` +
            (() => {
                let htmlString = "<td>행정복지센터</td>";

                for (const dong in work_average_data) {
                    htmlString += `<td>${dong}</td>`;
                }

                return htmlString;
            })() +
            `<tr>`;

        month_table_body.innerHTML = (() => {
            let htmlString = "";

            htmlString += `
            <tr>
                <td>인원당 평균</td>
            `;


            for (const dong in work_average_data) {
                const average = work_average_data[dong].dong_data[0].average;
                htmlString += `<td>${average}</td>`;
            }

            htmlString += `</tr>`;

            return htmlString;
        })();

        month_table_foot.innerHTML = (() => {
            let htmlString = "<tr><td>인원수</td>";

            for (const dong in work_average_data) {
                htmlString += `<td>${work_average_data[dong].dong_data[0].worker}</td>`
            }

            htmlString += "</tr>"

            return htmlString;
        })();
    };

    const initWorkAverage = () => {
        console.log(work_average_data);
        renderWorkAverageYearChart();
        renderWorkAverageYearTable();
        renderWorkAverageMonthChart();
        renderWorkAverageMonthTable();
    };

    initWorkAverage();
});
