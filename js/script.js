"use strict";

const title = document.getElementsByTagName('h1')[0];
const buttonPlus = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");

const inputRange = document.querySelector(".rollback input");
const inputRangeValue = document.querySelector(".rollback .range-value");

const startBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];

const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const fullTotalCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];

let screens = document.querySelectorAll(".screen");

const appData = {
    title: "",
    screens: [],
    screenPrice: 0,
    count: 0,
    adaptive: true,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    rollback: {},
    fullPrice: 0,
    servicePercentPrices: 0,
    servicesPercent: {},
    servicesNumber: {},
    init: function () {
        appData.addTitle();
        buttonPlus.addEventListener('click', appData.addScreenBlock);
        appData.addRange();
        startBtn.addEventListener('click', function () {
            screens.forEach(function (screen, index) {
                const select = screen.querySelector("select");
                const input = screen.querySelector("input");
                if (!select.value || !input.value) {
                    return false;
                } else {
                    appData.start();
                }
            });
        });
    },
    start: function () {
        appData.addScreens();
        appData.addServices();
        appData.addPrices();
        appData.showResult();
        console.log(appData.screens);

        // appData.getServicePercentPrices();
        // appData.logger();
    },
    addTitle: function () {
        document.title = title.textContent;
    },
    showResult: function () {
        total.value = appData.screenPrice;
        totalCount.value = appData.count;
        fullTotalCount.value = appData.fullPrice;
        totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
        totalCountRollback.value = appData.servicePercentPrices;
    },
    addScreens: function () {
        screens = document.querySelectorAll(".screen");

        screens.forEach(function (screen, index) {
            const select = screen.querySelector("select");
            const selectName = select.options[select.selectedIndex].textContent;
            const input = screen.querySelector("input");
            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: +input.value
            });
        });
    },
    addServices: function () {
        otherItemsPercent.forEach(function (item) {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");

            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            }
        });
        otherItemsNumber.forEach(function (item) {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");

            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value;
            }
        });
    },
    addScreenBlock: function () {
        const cloneScreen = screens[0].cloneNode(true);
        screens[screens.length - 1].after(cloneScreen);
    },
    addPrices: function () {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price;
        }

        for (let count of appData.screens) {
            appData.count += +count.count;
        }

        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key];
        }

        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
        }

        appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;

        for (let key in appData.rollback) {
            appData.servicePercentPrices = appData.rollback[key] * (appData.fullPrice / 100);
        }
    },
    addRange: function () {
        inputRange.addEventListener('input', function (event) {
            inputRangeValue.textContent = event.target.value + "%";
            appData.rollback[inputRangeValue.textContent] = +event.target.value;
            console.log(appData.rollback);
        });
    },
    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrices);
        console.log(appData.screens);
    },
};

appData.init();