const form = document.getElementById('age-form');
const fields = {
  day: document.getElementById('day'),
  month: document.getElementById('month'),
  year: document.getElementById('year'),
};

const outputNodes = {
  years: document.getElementById('YY'),
  months: document.getElementById('MM'),
  days: document.getElementById('DD'),
};

const errorMessages = {
  required: 'This field is required',
  invalidNumber: 'Must be a valid number',
  invalidDay: 'Must be a valid day',
  invalidMonth: 'Must be a valid month',
  invalidYear: 'Must be in the past',
  invalidDate: 'Must be a valid date',
};

function setFieldError(name, message) {
  const fieldWrapper = document.querySelector(`[data-field="${name}"]`);
  const errorNode = document.getElementById(`${name}-error`);
  fieldWrapper.classList.add('error');
  errorNode.textContent = message;
}

function clearErrors() {
  document.querySelectorAll('.field').forEach((field) => field.classList.remove('error'));
  document.querySelectorAll('small').forEach((node) => {
    node.textContent = '';
  });
}

function parseField(name) {
  const value = fields[name].value.trim();

  if (!value) {
    setFieldError(name, errorMessages.required);
    return null;
  }

  if (!/^\d+$/.test(value)) {
    setFieldError(name, errorMessages.invalidNumber);
    return null;
  }

  return Number(value);
}

function isRealDate(day, month, year) {
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

function calculateAge(day, month, year) {
  const today = new Date();
  let years = today.getFullYear() - year;
  let months = today.getMonth() + 1 - month;
  let days = today.getDate() - day;

  if (days < 0) {
    const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += previousMonth.getDate();
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return { years, months, days };
}

function animateValue(node, value) {
  const duration = 450;
  const start = Number(node.textContent.replace(/\D/g, '')) || 0;
  const startTime = performance.now();

  function step(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const current = Math.floor(start + (value - start) * progress);
    node.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

function resetOutput() {
  outputNodes.years.textContent = '--';
  outputNodes.months.textContent = '--';
  outputNodes.days.textContent = '--';
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  clearErrors();

  const day = parseField('day');
  const month = parseField('month');
  const year = parseField('year');

  if ([day, month, year].includes(null)) {
    resetOutput();
    return;
  }

  const now = new Date();
  let hasError = false;

  if (day < 1 || day > 31) {
    setFieldError('day', errorMessages.invalidDay);
    hasError = true;
  }

  if (month < 1 || month > 12) {
    setFieldError('month', errorMessages.invalidMonth);
    hasError = true;
  }

  if (year < 1 || year > now.getFullYear()) {
    setFieldError('year', errorMessages.invalidYear);
    hasError = true;
  }

  if (!hasError && !isRealDate(day, month, year)) {
    setFieldError('day', errorMessages.invalidDate);
    setFieldError('month', errorMessages.invalidDate);
    setFieldError('year', errorMessages.invalidDate);
    hasError = true;
  }

  const selectedDate = new Date(year, month - 1, day);
  if (!hasError && selectedDate > now) {
    setFieldError('year', errorMessages.invalidYear);
    hasError = true;
  }

  if (hasError) {
    resetOutput();
    return;
  }

  const age = calculateAge(day, month, year);
  animateValue(outputNodes.years, age.years);
  animateValue(outputNodes.months, age.months);
  animateValue(outputNodes.days, age.days);
});
