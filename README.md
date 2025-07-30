# QuizApp

A fully functional React-based quiz application with email entry, timer-based auto-submission, and a detailed score report.

**Live Demo:** [https://testzy.vercel.app](https://testzy.vercel.app)

---

## Features

- 15 questions fetched from the Open Trivia API
- Multiple choice and true/false formats
- Individual question submission and navigation
- 30-minute countdown timer with auto-submit
- Detailed report of attempted, correct, and missed questions
- Route protection using session and local storage

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Shivansh541/quizapp.git
cd quizapp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the App Locally

```bash
npm start
```
This will start the app at [http://localhost:3000](http://localhost:3000).

### 4. Build for Production (optional)

```bash
npm run build
```
This will create an optimized build in the `build/` directory.

---

## Challenges Faced

### Timer Handling
Managing countdown and ensuring auto-submission worked reliably even if the user didn’t interact.

### Route Restrictions
Preventing users from accessing `/quiz` or `/report` directly by typing URLs — solved using `localStorage` and `sessionStorage`.

### Preserving State
Used `useRef()` to persist the attempted state for accurate results even when the timer redirects to the report page.

---

## Technologies Used

- React
- HTML & CSS
- JavaScript (ES6+)
- Open Trivia DB API
