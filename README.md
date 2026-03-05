# Age Calculator App

A responsive age calculator built as a Frontend Mentor challenge. Users enter a birth date and the app validates the input before calculating a precise age in years, months, and days.

## Features

- Validates required fields (day, month, year)
- Validates numeric values and valid ranges
- Rejects impossible dates (e.g. 31/04/1991)
- Rejects future dates
- Calculates exact age from the selected date to today
- Animates output values for a smoother UI update
- Responsive layout for mobile and desktop

## Tech Stack

- HTML5 (semantic form structure + accessibility attributes)
- CSS3 (custom styling + responsive breakpoints)
- Vanilla JavaScript (validation, age math, animated results)

## Getting Started

### 1) Clone and enter the project

```bash
git clone <your-repo-url>
cd age-calculator-app-main
```

### 2) Run locally

Since this is a static project, you can open `index.html` directly or serve it with a local server:

```bash
python3 -m http.server 4173
```

Then open <http://localhost:4173>.

## Usage

1. Enter `Day`, `Month`, and `Year`.
2. Click the arrow button.
3. If inputs are valid, the calculated age appears below.
4. If inputs are invalid, field-level errors are shown.

## Project Structure

```text
.
├── index.html      # App markup
├── style.css       # Styling and responsive layout
├── script.js       # Validation + age calculation logic
├── assets/         # Icons and fonts
├── design/         # Reference design screenshots
└── README.md
```

## Validation Rules Implemented

- All fields are required
- Day must be `1-31`
- Month must be `1-12`
- Year must be in the past
- Date must exist on the calendar

## Acknowledgments

- Challenge by [Frontend Mentor](https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q)
