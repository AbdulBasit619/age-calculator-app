////// Activating Strict Mode
'use strict';

////////////////////////////////
///// SELECTING ELEMENTS

const inputDay = document.querySelector('.input__day');
const inputMonth = document.querySelector('.input__month');
const inputYear = document.querySelector('.input__year');

const labelDay = document.querySelector('.label__input--day');
const labelMonth = document.querySelector('.label__input--month');
const labelYear = document.querySelector('.label__input--year');

const messageErrorDayEmpty = document.querySelector(
  '.message__error__day--empty'
);
const messageErrorMonthEmpty = document.querySelector(
  '.message__error__month--empty'
);
const messageErrorYearEmpty = document.querySelector(
  '.message__error__year--empty'
);

const messageErrorDayInvalid = document.querySelector(
  '.message__error__day--invalid'
);
const messageErrorMonthInvalid = document.querySelector(
  '.message__error__month--invalid'
);
const messageErrorYearInvalid = document.querySelector(
  '.message__error__year--invalid'
);

const messageErrorDateDayInvalid = document.querySelector(
  '.message__error__date--day__invalid'
);
const messageErrorDateMonthInvalid = document.querySelector(
  '.message__error__date--month__invalid'
);
const messageErrorDateYearInvalid = document.querySelector(
  '.message__error__date--year__invalid'
);

const btnInitiator = document.querySelector('.icon__divider');

const outputYears = document.querySelector('.output__years');
const outputMonths = document.querySelector('.output__months');
const outputDays = document.querySelector('.output__days');

////////////////////////////////
///// IMPlEMENTING FUNCTIONALITY

/*

A leap year is a year if:
- It's divisible by 4.
- But if it's divisible by 100, it's  not a leap year unless it's also divisible by 400.

*/

const isLeapYear = year =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

const currentTime = new Date();
const currentDay = currentTime.getDate();
const currentMonth = currentTime.getMonth() + 1; // As it is 0 based, so the first month is actually at number 0
const currentYear = currentTime.getFullYear();

let longMonths = [1, 3, 5, 7, 8, 10, 12];
let shortMonths = [2, 4, 6, 9, 11];

const lastMonth = 12;
const firstMonth = 1;

const lastDayInLongMonths = 31;
const lastDayInShortMonths = 30;

const firstDayOfMonth = 1;

const lastDayInLeapFeb = 29;
const lastDayInNonLeapFeb = 28;

// Defining the function
function calculateAge(e) {
  e.preventDefault();

  const valueDay = Number(inputDay.value); // Converting to number because values from inputs are always string value, not number values
  const valueMonth = Number(inputMonth.value);
  const valueYear = Number(inputYear.value);

  //// Checking for Errors

  // Checking for empty inputs

  if (!valueDay) {
    messageErrorDayEmpty.classList.add('hidden');
    messageErrorDayInvalid.classList.add('hidden');

    messageErrorDateDayInvalid.classList.add('hidden');
    messageErrorDateMonthInvalid.classList.add('hidden');
    messageErrorDateYearInvalid.classList.add('hidden');

    labelDay.style.color = 'hsl(0, 100%, 67%)';
    inputDay.style.borderColor = 'hsl(0, 100%, 67%)';
  }

  if (!valueMonth) {
    messageErrorMonthEmpty.classList.add('hidden');
    messageErrorMonthInvalid.classList.add('hidden');

    messageErrorDateDayInvalid.classList.add('hidden');
    messageErrorDateMonthInvalid.classList.add('hidden');
    messageErrorDateYearInvalid.classList.add('hidden');

    labelMonth.style.color = 'hsl(0, 100%, 67%)';
    inputMonth.style.borderColor = 'hsl(0, 100%, 67%)';
  }

  if (!valueYear) {
    messageErrorYearEmpty.classList.add('hidden');
    messageErrorYearInvalid.classList.add('hidden');

    messageErrorDateDayInvalid.classList.add('hidden');
    messageErrorDateMonthInvalid.classList.add('hidden');
    messageErrorDateYearInvalid.classList.add('hidden');

    labelYear.style.color = 'hsl(0, 100%, 67%)';
    inputYear.style.borderColor = 'hsl(0, 100%, 67%)';
  }

  if (!valueDay && !valueMonth && !valueYear) {
    messageErrorDayInvalid.classList.add('hidden');
    messageErrorDayEmpty.classList.remove('hidden');
    messageErrorMonthInvalid.classList.add('hidden');
    messageErrorMonthEmpty.classList.remove('hidden');
    messageErrorYearInvalid.classList.add('hidden');
    messageErrorYearEmpty.classList.remove('hidden');

    labelDay.style.color = 'hsl(0, 100%, 67%)';
    inputDay.style.borderColor = 'hsl(0, 100%, 67%)';
    labelMonth.style.color = 'hsl(0, 100%, 67%)';
    inputMonth.style.borderColor = 'hsl(0, 100%, 67%)';
    labelYear.style.color = 'hsl(0, 100%, 67%)';
    inputYear.style.borderColor = 'hsl(0, 100%, 67%)';
    return;
  }

  // Checking validity of the input fields
  if (
    valueDay &&
    (valueDay < 1 || valueDay > 31) &&
    valueMonth &&
    (valueMonth < 1 || valueMonth > 12) &&
    valueYear &&
    (valueYear < 1 || valueYear > currentYear)
  ) {
    messageErrorDayEmpty.classList.add('hidden');
    messageErrorDayInvalid.classList.remove('hidden');
    messageErrorMonthEmpty.classList.add('hidden');
    messageErrorMonthInvalid.classList.remove('hidden');
    messageErrorYearEmpty.classList.add('hidden');
    messageErrorYearInvalid.classList.remove('hidden');
    messageErrorDateDayInvalid.classList.add('hidden');
    messageErrorDateMonthInvalid.classList.add('hidden');
    messageErrorDateYearInvalid.classList.add('hidden');

    labelDay.style.color = 'hsl(0, 100%, 67%)';
    inputDay.style.borderColor = 'hsl(0, 100%, 67%)';
    labelMonth.style.color = 'hsl(0, 100%, 67%)';
    inputMonth.style.borderColor = 'hsl(0, 100%, 67%)';
    labelYear.style.color = 'hsl(0, 100%, 67%)';
    inputYear.style.borderColor = 'hsl(0, 100%, 67%)';
    return;
  } else if (
    (valueDay && (valueDay < 1 || valueDay > 31)) ||
    (valueMonth && (valueMonth < 1 || valueMonth > 12)) ||
    (valueYear &&
      (valueYear < 1 ||
        valueYear > currentYear ||
        (valueYear === currentYear &&
          (valueMonth > currentMonth ||
            (valueMonth === currentMonth && valueDay > currentDay)))))
  ) {
    messageErrorDayEmpty.classList.add('hidden');
    messageErrorDayInvalid.classList.add('hidden');
    messageErrorMonthEmpty.classList.add('hidden');
    messageErrorMonthInvalid.classList.add('hidden');
    messageErrorYearEmpty.classList.add('hidden');
    messageErrorYearInvalid.classList.add('hidden');
    messageErrorDateDayInvalid.classList.remove('hidden');
    messageErrorDateMonthInvalid.classList.remove('hidden');
    messageErrorDateYearInvalid.classList.remove('hidden');

    labelDay.style.color = 'hsl(0, 100%, 67%)';
    inputDay.style.borderColor = 'hsl(0, 100%, 67%)';
    labelMonth.style.color = 'hsl(0, 100%, 67%)';
    inputMonth.style.borderColor = 'hsl(0, 100%, 67%)';
    labelYear.style.color = 'hsl(0, 100%, 67%)';
    inputYear.style.borderColor = 'hsl(0, 100%, 67%)';
    return;
  }

  // IF everything is correct, remove the red error colors back to normal and perform the actual age calculation till current date.

  messageErrorDayEmpty.classList.add('hidden');
  messageErrorDayInvalid.classList.add('hidden');
  messageErrorMonthEmpty.classList.add('hidden');
  messageErrorMonthInvalid.classList.add('hidden');
  messageErrorYearEmpty.classList.add('hidden');
  messageErrorYearInvalid.classList.add('hidden');
  messageErrorDateDayInvalid.classList.add('hidden');
  messageErrorDateMonthInvalid.classList.add('hidden');
  messageErrorDateYearInvalid.classList.add('hidden');

  labelDay.style.color = 'hsl(0, 1%, 44%)';
  inputDay.style.borderColor = 'hsl(0, 0%, 86%)';
  labelMonth.style.color = 'hsl(0, 1%, 44%)';
  inputMonth.style.borderColor = 'hsl(0, 0%, 86%)';
  labelYear.style.color = 'hsl(0, 1%, 44%)';
  inputYear.style.borderColor = 'hsl(0, 0%, 86%)';

  let years;
  if (currentMonth > valueMonth) years = currentYear - valueYear;
  if (currentMonth < valueMonth) years = currentYear - valueYear - 1;
  if (currentYear === valueYear) years = 0;

  console.log(years);

  let months;

  if (currentMonth > valueMonth) months = currentMonth - valueMonth;
  if (currentMonth < valueMonth) {
    const monthsUntilEndOfThatYear = lastMonth - valueMonth;
    let MonthsFromStartOfCurrentYearTillToday = currentMonth - firstMonth;
    if (valueDay < currentDay) MonthsFromStartOfCurrentYearTillToday++;
    months = monthsUntilEndOfThatYear + MonthsFromStartOfCurrentYearTillToday;
  }
  if (currentMonth === valueMonth) months = 0;

  let days;
  let daysUntilEndOfPrevMonth;

  if (currentDay > valueDay) days = currentDay - valueDay;
  if (currentDay < valueDay) {
    if (longMonths.includes(currentMonth - 1))
      daysUntilEndOfPrevMonth = lastDayInLongMonths - valueDay;
    if (shortMonths.includes(currentMonth - 1))
      if (!shortMonths.includes(2))
        daysUntilEndOfPrevMonth = lastDayInLongMonths - valueDay;
      else if (shortMonths.includes(2))
        if (isLeapYear(currentYear))
          daysUntilEndOfPrevMonth = lastDayInLeapFeb - valueDay;
        else if (!isLeapYear(currentYear))
          daysUntilEndOfPrevMonth = lastDayInNonLeapFeb - valueDay;

    /*
  // To include the current date in age calculation
  const daysFromStartOfMonthTillToday = currentDay - firstDayOfMonth;
  */

    // To exclude the current date in age calculation
    const daysFromStartOfMonthTillToday = currentDay - firstDayOfMonth + 1;
  }

  if (currentDay === valueDay) days = 0;

  console.log(days, months, years);

  outputYears.textContent = years;
  outputMonths.textContent = months;
  outputDays.textContent = days;
}

// Using the function
btnInitiator.addEventListener('click', e => calculateAge(e));
btnInitiator.addEventListener('touchstart', e => calculateAge(e)); // For listening to finger touch on the button even on touch device
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') calculateAge(e);
});
