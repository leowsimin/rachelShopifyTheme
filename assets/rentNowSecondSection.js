//Inserting Current Month/Year

const date = new Date();

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

// First Calendar

// Setting Default Month/Year
document.querySelector('.rentnow-first-month-select').innerHTML = months[date.getMonth()];

const secondMonth = new Date();
secondMonth.setMonth(secondMonth.getMonth() + 1);
document.querySelector(".rentnow-second-month-select").innerHTML = months[secondMonth.getMonth()];

const rentNowSecondYearLabel = document.getElementById('rentNowSecondYearLabel');
document.querySelector('.rentnow-second-year-select').innerHTML = "&nbsp;" + secondMonth.getFullYear();

// DropDown Menu for First Month and Year
const rentNowFirstMonthLabel = document.getElementById('rentNowFirstMonthLabel');
const dropdownMonth = document.getElementById("rentnow-first-month-dropdownmenu");

const rentNowFirstYearLabel = document.getElementById('rentNowFirstYearLabel');
document.querySelector('.rentnow-first-year-select').innerHTML = "&nbsp;" + date.getFullYear();

const currentYear = secondMonth.getFullYear();
const dropdownSecondYear = document.getElementById("rentnow-second-year-dropdownmenu");

const options = dropdownSecondYear.getElementsByTagName('option');
for (let i = 0; i < options.length; i++) {
    if (options[i].value == currentYear) {
        options[i].selected = true;
    } else {
        options[i].selected = false;
    }
}

const dropdownYear = document.getElementById('rentnow-first-year-dropdownmenu');

// Event listener for label click
rentNowFirstMonthLabel.addEventListener('click', function () {
    dropdownMonth.style.display = 'block';
    dropdownMonth.size = "7";
    dropdownMonth.click();
    event.stopPropagation();
});

// Event listener for dropdown change
dropdownMonth.addEventListener('change', function () {
    const selectedMonth = dropdownMonth.value;
    rentNowFirstMonthLabel.textContent = selectedMonth;
    dropdownMonth.style.display = 'none';

    const selectedMonthIndex = months.indexOf(selectedMonth);
    date.setMonth(selectedMonthIndex);

    const selectedYear = dropdownYear.value;

    secondMonth.setMonth(selectedMonthIndex + 1);
    secondMonth.setFullYear(selectedYear);

    // Check if the month of the second calendar is January
    if (secondMonth.getMonth() === 0) {
        secondMonth.setFullYear(secondMonth.getFullYear() + 1);
    }

    rentNowSecondMonthLabel.textContent = months[secondMonth.getMonth()];
    document.querySelector('.rentnow-second-year-select').innerHTML = "&nbsp;" + secondMonth.getFullYear();

    const currentYear = secondMonth.getFullYear();
    const dropdownSecondYear = document.getElementById("rentnow-second-year-dropdownmenu");

    const options = dropdownSecondYear.getElementsByTagName('option');
    for (let i = 0; i < options.length; i++) {
        if (options[i].value == currentYear) {
            options[i].selected = true;
        } else {
            options[i].selected = false;
        }
    }

    updateCalendar();
    attachEventListeners();
    applySelectedDates();
    applyFreeDates();
});


// Function to update the calendar
function updateCalendar() {
    const firstMonthDays = document.querySelector(".rentnow-first-days");
    let days = "";

    const secondMonthDays = document.querySelector(".rentnow-second-days");
    let secondDays = "";

    //First Calendar

    // Dates before Month
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const lastDayPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    for (let x = firstDay - 1; x >= 0; x--) {
        days += `<p class="rentnow-prevdays">${lastDayPrevMonth - x}</p>`;
    }

    // Dates correspond to Month and Year
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    for (let i = 1; i <= lastDay; i++) {
        days += `<p>${i}</p>`;
    }

    // Dates after Month
    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    const nextDays = 6 - lastDayIndex;

    for (let j = 1; j <= nextDays; j++) {
        days += `<p class="rentnow-nextdays">${j}</p>`;
    }

    firstMonthDays.innerHTML = days;

    //Second Calendar

    // Dates before Month
    const firstDaySecond = new Date(secondMonth.getFullYear(), secondMonth.getMonth(), 1).getDay();
    const lastDayPrevSecondMonth = new Date(secondMonth.getFullYear(), secondMonth.getMonth(), 0).getDate();

    for (let t = firstDaySecond - 1; t >= 0; t--) {
        secondDays += `<p class="rentnow-prevdays">${lastDayPrevSecondMonth - t}</p>`;
    }

    const lastDaySecond = new Date(secondMonth.getFullYear(), secondMonth.getMonth() + 1, 0).getDate();

    for (let y = 1; y <= lastDaySecond; y++) {
        secondDays += `<p>${y}</p>`;
    }

    const lastDaySecondIndex = new Date(secondMonth.getFullYear(), secondMonth.getMonth() + 1, 0).getDay();
    const secondNextDays = 6 - lastDaySecondIndex;

    for (let p = 1; p <= secondNextDays; p++) {
        secondDays += `<p class="rentnow-nextdays">${p}</p>`;
    }

    secondMonthDays.innerHTML = secondDays;
}

updateCalendar();

// Dates before Month
const firstPrevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
const firstFirstDayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

let days = "";

for (let x = firstFirstDayIndex; x > 0; x--) {
    days += `<p class="rentnow-prevdays">${firstPrevLastDay - x + 1}</p>`;
}

// Dates correspond to Month and Year
const firstMonthDays = document.querySelector(".rentnow-first-days");

const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

for (let i = 1; i <= lastDay; i++) {
    days += `<p id="firstMonthDays">${i}</p>`;
}

// Dates after Month
const firstLastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
const firstNextDays = 7 - firstLastDayIndex - 1;

for (let j = 1; j <= firstNextDays; j++) {
    days += `<p class="rentnow-nextdays">${j}</p>`;
    firstMonthDays.innerHTML = days;
}

// Event listener for label click
rentNowFirstYearLabel.addEventListener('click', function (event) {
    dropdownYear.style.display = 'block';
    dropdownYear.size = 7;
    dropdownYear.click();
    event.stopPropagation();
});

// Event listener for dropdown change
dropdownYear.addEventListener('change', function () {
    const selectedYear = dropdownYear.value;
    rentNowFirstYearLabel.textContent = "\u00A0" + selectedYear;
    dropdownYear.style.display = 'none';

    date.setFullYear(selectedYear);

    secondMonth.setFullYear(selectedYear);

    // Check if the month of the second calendar is January
    if (secondMonth.getMonth() === 0) {
        secondMonth.setFullYear(secondMonth.getFullYear() + 1);
    }

    rentNowSecondMonthLabel.textContent = months[secondMonth.getMonth()];
    document.querySelector('.rentnow-second-year-select').innerHTML = "&nbsp;" + secondMonth.getFullYear();

    updateCalendar();
    attachEventListeners();
    applySelectedDates();
    applyFreeDates();
});

// Second Calendar

// Second Month Dropdown Menu

const rentNowSecondMonthLabel = document.getElementById('rentNowSecondMonthLabel');
const dropdownSecondMonth = document.getElementById("rentnow-second-month-dropdownmenu");

const rentNowMonthError = document.getElementById('rentNowMonthError');
const rentNowYearError = document.getElementById('rentNowYearError');

rentNowSecondMonthLabel.addEventListener("click", function () {
    dropdownSecondMonth.style.display = 'block';
    dropdownSecondMonth.size = "7";
    dropdownSecondMonth.click();
    event.stopPropagation();
})

dropdownSecondMonth.addEventListener('change', function () {
    const selectedMonth = dropdownSecondMonth.value;

    if ((dropdownSecondYear.value > dropdownYear.value)) {

        rentNowSecondMonthLabel.textContent = selectedMonth;
        dropdownSecondMonth.style.display = 'none';

        const selectedMonthIndex = months.indexOf(selectedMonth);
        secondMonth.setMonth(selectedMonthIndex);
        rentNowMonthError.style.display = 'none';

        updateCalendar();
        attachEventListeners();
        applySelectedDates();
        applyFreeDates();
    }

    else if ((dropdownSecondYear.value === dropdownYear.value) && (months.indexOf(selectedMonth) > months.indexOf(rentNowFirstMonthLabel.textContent))) {
        rentNowSecondMonthLabel.textContent = selectedMonth;
        dropdownSecondMonth.style.display = 'none';

        const selectedMonthIndex = months.indexOf(selectedMonth);
        secondMonth.setMonth(selectedMonthIndex);
        rentNowMonthError.style.display = 'none';

        updateCalendar();
        attachEventListeners();
        applySelectedDates();
        applyFreeDates();
    }

    else {
        rentNowMonthError.style.display = 'flex';
    }

});

// Second Year Dropdown Menu

rentNowSecondYearLabel.addEventListener('click', function (event) {
    dropdownSecondYear.style.display = 'block';
    dropdownSecondYear.size = 7;
    dropdownSecondYear.click();
    event.stopPropagation();
});

// Event listener for dropdown change
dropdownSecondYear.addEventListener('change', function () {
    const selectedYear = dropdownSecondYear.value;

    if ((dropdownSecondYear.value > dropdownYear.value)) {
        rentNowSecondYearLabel.textContent = "\u00A0" + selectedYear;
        dropdownSecondYear.style.display = 'none';
        rentNowYearError.style.display = 'none';

        secondMonth.setFullYear(selectedYear);

        updateCalendar();
        attachEventListeners();
        applySelectedDates();
        applyFreeDates();
    }

    else if ((dropdownSecondYear.value === dropdownYear.value) && (months.indexOf(rentNowSecondMonthLabel.textContent) > months.indexOf(rentNowFirstMonthLabel.textContent))) {
        rentNowSecondYearLabel.textContent = "\u00A0" + selectedYear;
        dropdownSecondYear.style.display = 'none';

        secondMonth.setFullYear(selectedYear);
        rentNowYearError.style.display = 'none';

        updateCalendar();
        attachEventListeners();
        applySelectedDates();
        applyFreeDates();
    }

    else {
        rentNowYearError.style.display = 'flex';
    }

});

// Dates before Month

const secondPrevLastDay = new Date(secondMonth.getFullYear(), secondMonth.getMonth(), 0).getDate();
const secondFirstDayIndex = new Date(secondMonth.getFullYear(), secondMonth.getMonth(), 1).getDay();

let secondDays = "";

for (let t = secondFirstDayIndex; t > 0; t--) {
    secondDays += `<p class="rentnow-prevdays">${secondPrevLastDay - t + 1}</p>`;
}

// Dates correspond to Month and Year
const secondMonthDays = document.querySelector(".rentnow-second-days");

const lastDaySecond = new Date(secondMonth.getFullYear(), secondMonth.getMonth() + 1, 0).getDate();

for (let y = 1; y <= lastDaySecond; y++) {
    secondDays += `<p id="firstMonthDays">${y}</p>`;
}

// Dates after Month
const secondLastDayIndex = new Date(secondMonth.getFullYear(), secondMonth.getMonth() + 1, 0).getDay();
const secondNextDays = 7 - secondLastDayIndex - 1;

for (let p = 1; p <= secondNextDays; p++) {
    secondDays += `<p class="rentnow-nextdays">${p}</p>`;
    secondMonthDays.innerHTML = secondDays;
}

// Date Selection

// Checking Month Labels

const firstCalendarDays = document.querySelector(".rentnow-first-days");
const secondCalendarDays = document.querySelector(".rentnow-second-days");

[firstCalendarDays, secondCalendarDays].forEach(container => {
    container.querySelectorAll('p').forEach(pElement => {
        pElement.addEventListener('click', selectionOfDays);
    });
});

let startDate = null;
let endDate = null;

let collectionDate1 = null;
let collectionDate2 = null;

function selectionOfDays(event) {

    const clickedDay = event.target.textContent;

    // Check if the clicked element has "rentnow-nextdays" or "rentnow-prevdays" class
    if (event.target.classList.contains('rentnow-nextdays') || event.target.classList.contains('rentnow-prevdays')) {
        return;
    }

    let clickedMonth = null;

    if (!startDate) {
        const monthContainer = findMonthContainer(event.target);
        const yearContainer = findYearContainer(event.target);

        if (monthContainer) {
            clickedMonth = monthContainer.textContent.trim();
            clickedYear = yearContainer.textContent.trim();

            startDate = clickedDay + ' ' + clickedMonth + ' ' + clickedYear;
            event.target.classList.add('rentnow-start-date');
        }
    }

    else if (!endDate) {
        const monthContainer = findMonthContainer(event.target);
        const yearContainer = findYearContainer(event.target);

        if (monthContainer) {
            clickedMonth = monthContainer.textContent.trim();
            clickedYear = yearContainer.textContent.trim();

            endDate = clickedDay + ' ' + clickedMonth + ' ' + clickedYear;
            event.target.classList.add('rentnow-end-date');
        }

        applySelectedDates();
        applyFreeDates();
        updatingSection(startDate, endDate);

        const daysDifference = updatingSection(startDate, endDate);

        collectionOptions(daysDifference);

    }

    else {
        // Remove existing classes to clear previous selection
        document.querySelectorAll('.rentnow-start-date, .rentnow-end-date, .rentnow-selected-date, .rentnow-selected-first-date, .rentnow-selected-last-date, .rentnow-selected-start-date, .rentnow-selected-end-date, .rentnow-free-first-date, .rentnow-free-last-date').forEach(element => {
            element.classList.remove('rentnow-start-date', 'rentnow-end-date', 'rentnow-selected-date', 'rentnow-selected-first-date', 'rentnow-selected-last-date', 'rentnow-selected-start-date', 'rentnow-selected-end-date', 'rentnow-free-first-date', 'rentnow-free-last-date');
        });

        const monthContainer = findMonthContainer(event.target);
        const yearContainer = findYearContainer(event.target);

        if (monthContainer) {
            clickedMonth = monthContainer.textContent.trim();
            clickedYear = yearContainer.textContent.trim();

            startDate = clickedDay + ' ' + clickedMonth + ' ' + clickedYear;
            event.target.classList.add('rentnow-start-date');
            endDate = null;
        }
    }
}

function findMonthContainer(element) {
    while (element) {
        if (element.classList) {
            if (element.classList.contains('rentnow-first-calendar')) {
                return document.querySelector('#rentNowFirstMonthLabel');
            } else if (element.classList.contains('rentnow-second-calendar')) {
                return document.querySelector('#rentNowSecondMonthLabel');
            }
        }
        element = element.parentNode;
    }
    return null;
}

function findYearContainer(element) {
    while (element) {
        if (element.classList) {
            if (element.classList.contains('rentnow-first-calendar')) {
                return document.querySelector('#rentNowFirstYearLabel');
            } else if (element.classList.contains('rentnow-second-calendar')) {
                return document.querySelector('#rentNowSecondYearLabel');
            }
        }
        element = element.parentNode;
    }
    return null;
}

function applySelectedDates() {

    const rentNowDateError = document.getElementById("rentNowDateError");
    rentNowDateError.style.display = "none";

    if (endDate && isEndDateBeforeStartDate(endDate, startDate)) {
        rentNowDateError.style.display = "flex";
        return;  // Exit the function if invalid input
    }

    const allDateElements = [
        ...firstCalendarDays.querySelectorAll('p'),
        ...secondCalendarDays.querySelectorAll('p')
    ];

    // Exclude elements with classes "rentnow-prevdays" and "rentnow-nextdays"
    const dateElements = allDateElements.filter(pElement => (
        !pElement.classList.contains('rentnow-prevdays') && !pElement.classList.contains('rentnow-nextdays')
    ));

    // Add event listener to filtered date elements
    dateElements.forEach(pElement => {
        pElement.addEventListener('click', selectionOfDays);
    });

    let startSelected = false;
    let endSelected = false;

    // Iterate through the date elements
    dateElements.forEach(element => {
        const date = parseInt(element.textContent, 10);
        const monthContainer = findMonthContainer(element);
        const yearContainer = findYearContainer(element);

        if (monthContainer) {
            const month = monthContainer.textContent.trim();
            const currentYear = yearContainer ? yearContainer.textContent.trim() : new Date().getFullYear();
            const currentDate = date + ' ' + month + ' ' + currentYear;

            if (isDateInRange(currentDate, startDate, endDate)) {
                element.classList.add('rentnow-selected-date');

                const currentDateObj = new Date(currentDate);

                // Check if the current date is one day after the start date
                const oneDayAfterStartDate = new Date(startDate);
                oneDayAfterStartDate.setDate(oneDayAfterStartDate.getDate() + 1);

                if (!startSelected && currentDateObj.getTime() === oneDayAfterStartDate.getTime()) {
                    // Apply class to the date one day after the start date
                    startSelected = true;
                    element.classList.add('rentnow-selected-first-date');
                }

                // Check if the current date is one day before the end date
                const oneDayBeforeEndDate = new Date(endDate);
                oneDayBeforeEndDate.setDate(oneDayBeforeEndDate.getDate() - 1);

                if (currentDateObj.getTime() === oneDayBeforeEndDate.getTime()) {
                    // Apply class to the date one day before the end date
                    endSelected = true;
                    element.classList.add('rentnow-selected-last-date');
                }

                // Check if the current date is the first day of the month
                const firstDayOfMonth = new Date(currentDateObj.getFullYear(), currentDateObj.getMonth(), 1);

                if (currentDateObj.getTime() === firstDayOfMonth.getTime()) {
                    // Apply class to the first day of the month
                    element.classList.add('rentnow-selected-start-date');
                }

                // Check if the current date is the last day of the month
                const lastDayOfMonth = new Date(currentDateObj.getFullYear(), currentDateObj.getMonth() + 1, 0);

                if (currentDateObj.getTime() === lastDayOfMonth.getTime()) {
                    // Apply class to the last day of the month
                    element.classList.add('rentnow-selected-end-date');
                }
            }
        }
    });
}

function isDateInRange(currentDate, startDate, endDate) {
    // Convert dates to JavaScript Date objects
    const current = new Date(currentDate);
    const start = new Date(startDate);
    const end = new Date(endDate);

    return current > start && current < end;
}

function applyFreeDates() {

    const deliveryPickUp1 = document.getElementById("deliveryPickUp1");
    const deliveryPickUp2 = document.getElementById("deliveryPickUp2");
    const deliveryPickUp3 = document.getElementById("deliveryPickUp3");
    const deliveryPickUp4 = document.getElementById("deliveryPickUp4");

    if (endDate && isEndDateBeforeStartDate(endDate, startDate)) {
        return;
    }

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // Calculate two days before the startDate
    const twoDaysBeforeStartDate = new Date(startDateObj);
    twoDaysBeforeStartDate.setDate(startDateObj.getDate() - 2);

    const formattedtwoDaysBeforeStartDate = `${(twoDaysBeforeStartDate.getDate() < 10 ? '0' : '') + twoDaysBeforeStartDate.getDate()}/${(twoDaysBeforeStartDate.getMonth() < 9 ? '0' : '') + (twoDaysBeforeStartDate.getMonth() + 1)}/${twoDaysBeforeStartDate.getFullYear().toString().slice(-2)}`;
    deliveryPickUp1.textContent = formattedtwoDaysBeforeStartDate + ": AM (11 a.m. - 2 p.m.)";
    deliveryPickUp2.textContent = formattedtwoDaysBeforeStartDate + ": PM (2 p.m. - 5 p.m.)";

    // Calculate two days after the endDate
    const twoDaysBeforeEndDate = new Date(endDateObj);
    twoDaysBeforeEndDate.setDate(endDateObj.getDate() + 2);

    const formattedtwoDaysBeforeEndDate = `${(twoDaysBeforeEndDate.getDate() < 10 ? '0' : '') + twoDaysBeforeEndDate.getDate()}/${(twoDaysBeforeEndDate.getMonth() < 9 ? '0' : '') + (twoDaysBeforeEndDate.getMonth() + 1)}/${twoDaysBeforeEndDate.getFullYear().toString().slice(-2)}`;
    deliveryPickUp3.textContent = formattedtwoDaysBeforeEndDate + ": AM (11 a.m. - 2 p.m.)";
    deliveryPickUp4.textContent = formattedtwoDaysBeforeEndDate + ": PM (2 p.m. - 5 p.m.)";

    // Calculate one day before the startDate
    const oneDayBeforeStartDate = new Date(startDateObj);
    oneDayBeforeStartDate.setDate(startDateObj.getDate() - 1);

    // Calculate one day after the endDate
    const oneDayBeforeEndDate = new Date(endDateObj);
    oneDayBeforeEndDate.setDate(endDateObj.getDate() + 1);

    // Find all date elements
    const allDateElements = [
        ...firstCalendarDays.querySelectorAll('p'),
        ...secondCalendarDays.querySelectorAll('p')
    ];

    // Exclude elements with classes "rentnow-prevdays" and "rentnow-nextdays"
    const dateElements = allDateElements.filter(pElement => (
        !pElement.classList.contains('rentnow-prevdays') && !pElement.classList.contains('rentnow-nextdays')
    ));

    // Iterate through the date elements
    dateElements.forEach(element => {
        const date = parseInt(element.textContent, 10);
        const monthContainer = findMonthContainer(element);
        const yearContainer = findYearContainer(element);

        if (monthContainer) {
            const month = monthContainer.textContent.trim();
            const currentYear = yearContainer ? yearContainer.textContent.trim() : new Date().getFullYear();
            const currentDate = date + ' ' + month + ' ' + currentYear;
            const currentDateObj = new Date(currentDate);

            if (currentDateObj.getTime() === twoDaysBeforeStartDate.getTime()) {
                element.classList.add('rentnow-free-first-date');
            }

            else if (currentDateObj.getTime() === oneDayBeforeStartDate.getTime()) {
                element.classList.add('rentnow-free-last-date');
            }

            else if (currentDateObj.getTime() === oneDayBeforeEndDate.getTime()) {
                element.classList.add('rentnow-free-first-date');
            }

            else if (currentDateObj.getTime() === twoDaysBeforeEndDate.getTime()) {
                element.classList.add('rentnow-free-last-date');
            }
        }
    });

    // DELIVERY Options

    const deliveryPickUp1Container = document.getElementById("deliveryPickUp1Container");
    const deliveryPickUp2Container = document.getElementById("deliveryPickUp2Container");

    const deliveryPickUp3Container = document.getElementById("deliveryPickUp3Container");
    const deliveryPickUp4Container = document.getElementById("deliveryPickUp4Container");


    deliveryPickUp1Container.addEventListener("click", function () {
        deliveryPickUp1Container.style.backgroundColor = "rgba(255, 166, 101, 0.50)";
        deliveryPickUp2Container.style.backgroundColor = "transparent";
        collectionDate1 = deliveryPickUp1.textContent;
        console.log("Start:", collectionDate1);
    })

    deliveryPickUp2Container.addEventListener("click", function () {
        deliveryPickUp1Container.style.backgroundColor = "transparent";
        deliveryPickUp2Container.style.backgroundColor = "rgba(255, 166, 101, 0.50)";
        collectionDate1 = deliveryPickUp2.textContent;
        console.log("Start:", collectionDate1);
    })

    deliveryPickUp3Container.addEventListener("click", function () {
        deliveryPickUp3Container.style.backgroundColor = "rgba(255, 166, 101, 0.50)";
        deliveryPickUp4Container.style.backgroundColor = "transparent";
        collectionDate2 = deliveryPickUp3.textContent;
        console.log("End:", collectionDate2);
    })

    deliveryPickUp4Container.addEventListener("click", function () {
        deliveryPickUp3Container.style.backgroundColor = "transparent";
        deliveryPickUp4Container.style.backgroundColor = "rgba(255, 166, 101, 0.50)";
        collectionDate2 = deliveryPickUp4.textContent;
        console.log("End:", collectionDate2);
    })
}

function attachEventListeners() {
    const firstCalendarDays = document.querySelector(".rentnow-first-days");
    const secondCalendarDays = document.querySelector(".rentnow-second-days");

    [firstCalendarDays, secondCalendarDays].forEach(container => {
        container.querySelectorAll('p').forEach(pElement => {
            pElement.addEventListener('click', selectionOfDays);
        });
    });
}

function isEndDateBeforeStartDate(endDate, startDate) {
    const endDateObj = new Date(endDate);
    const startDateObj = new Date(startDate);

    const endMonth = endDateObj.getMonth();
    const startMonth = startDateObj.getMonth();

    const endDateDate = endDateObj.getDate();
    const startDateDate = startDateObj.getDate();

    const endYear = endDateObj.getFullYear();
    const startYear = startDateObj.getFullYear();

    // Compare the year, month, and date
    if (endYear < startYear) {
        return true;
    } else if (endYear === startYear && endMonth < startMonth) {
        return true;
    } else if (endYear === startYear && endMonth === startMonth && endDateDate < startDateDate) {
        return true;
    }

    return false;
}

function updatingSection(startDate, endDate) {

    const startDateFormat = new Date(startDate);
    const endDateFormat = new Date(endDate);

    const numberOfSelectedDates = document.getElementById("rentNowNumberOfSelectedDates");
    const selectedDates = document.getElementById("rentNowSelectedDates");
    const rentNowRentalCost = document.getElementById("rentNowRentalCost");

    if (endDate && isEndDateBeforeStartDate(endDate, startDate)) {
        selectedDates.textContent = "";
        numberOfSelectedDates.textContent = "";
        rentNowRentalCost.textContent = "";
        return;
    }

    const formattedStartDate = `${(startDateFormat.getDate() < 10 ? '0' : '') + startDateFormat.getDate()}/${(startDateFormat.getMonth() < 9 ? '0' : '') + (startDateFormat.getMonth() + 1)}/${startDateFormat.getFullYear().toString().slice(-2)}`;
    const formattedEndDate = `${(endDateFormat.getDate() < 10 ? '0' : '') + endDateFormat.getDate()}/${(endDateFormat.getMonth() < 9 ? '0' : '') + (endDateFormat.getMonth() + 1)}/${endDateFormat.getFullYear().toString().slice(-2)}`;

    selectedDates.textContent = formattedStartDate + " - " + formattedEndDate;

    const timeDifference = endDateFormat - startDateFormat;
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
    const diffDays = Math.round(timeDifference / oneDay) + 1;

    numberOfSelectedDates.textContent = `(${diffDays} day${diffDays !== 1 ? 's' : ''})`;

    rentNowRentalCost.textContent = `$1/day  x  ${diffDays} days = $${diffDays}`;

    return diffDays;
}

function collectionOptions(diffDays) {

    const rentNowNotClickedSelfCollect = document.getElementById("rentNowNotClickedSelfCollect");
    const rentNowClickedSelfCollect = document.getElementById("rentNowClickedSelfCollect");

    const rentNowNotClickedDelivery = document.getElementById("rentNowNotClickedDelivery");
    const rentNowClickedDelivery = document.getElementById("rentNowClickedDelivery");

    const deliveryTimeDate = document.getElementById("rentNowHeader3Container4");

    const totalAmountCalculation = document.getElementById("totalAmountCalculation");

    const rentNowConfirmButton = document.getElementById("rentNowConfirmButton");

    rentNowNotClickedSelfCollect.addEventListener("click", function () {
        rentNowNotClickedSelfCollect.style.display = "none";
        rentNowClickedSelfCollect.style.display = "flex";

        rentNowClickedDelivery.style.display = "none";
        rentNowNotClickedDelivery.style.display = "flex";

        rentNowConfirmButton.style.color = "#0D2610";
        rentNowConfirmButton.style.border = "2px solid #0D2610";

        deliveryTimeDate.style.display = "none";

        totalAmountCalculation.textContent = `$${diffDays} + $0 = $${diffDays}`;
    });

    rentNowNotClickedDelivery.addEventListener("click", function () {
        rentNowNotClickedDelivery.style.display = "none";
        rentNowClickedDelivery.style.display = "flex";

        rentNowClickedSelfCollect.style.display = "none";
        rentNowNotClickedSelfCollect.style.display = "flex";

        rentNowConfirmButton.style.color = "#0D2610";
        rentNowConfirmButton.style.border = "2px solid #0D2610";

        deliveryTimeDate.style.display = "block";

        totalAmountCalculation.textContent = `$${diffDays} + $20 = $${diffDays + 20}`;
    });

    rentNowConfirmButton.addEventListener("click", function (event) {

        event.preventDefault();

        var buttonColor = window.getComputedStyle(rentNowConfirmButton).getPropertyValue("color");

        // Check if the color is equal to the desired color
        if (buttonColor === "rgb(13, 38, 16)") { // RGB value for color #0D2610
            // Proceed to the next page
            console.log("issa the colour");
            window.location.href = "https://tner-rental.myshopify.com/pages/rent-now-product-page";
        } else {
            // Display an error message (you can customize this part)
            alert("Error: Please choose the correct color.");
        }
    });

}
