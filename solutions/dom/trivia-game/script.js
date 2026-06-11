// =============================================================
// PHASE 3 — DATA MODEL
// Define the questions before anything else so every function
// below can access them. Put data at the top, logic below.
// =============================================================

/*
  Each question is a plain object with three keys:
    text    — the question string
    answers — array of four answer strings (order matters!)
    correct — index (0-3) of the right answer in answers[]

  Using an index instead of repeating the answer string means
  there is one source of truth. If you rename an answer, you
  don't have to update two places.
*/
const questions = [
  {
    text: "Which planet in our solar system has the most moons?",
    answers: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correct: 1  // Saturn — 146 confirmed moons as of 2023
  },
  {
    text: "What is the chemical symbol for gold?",
    answers: ["Go", "Gd", "Au", "Ag"],
    correct: 2  // Au — from the Latin word "aurum"
  },
  {
    text: "Which data structure operates on a Last-In, First-Out (LIFO) basis?",
    answers: ["Queue", "Linked List", "Stack", "Heap"],
    correct: 2  // Stack — think of a stack of plates
  },
  {
    text: "What does CSS stand for?",
    answers: [
      "Cascading Style Sheets",
      "Computer Style System",
      "Creative Styling Script",
      "Cascading Script System"
    ],
    correct: 0  // Cascading Style Sheets
  },
  {
    text: "Which language runs natively in the browser?",
    answers: ["Python", "Ruby", "Java", "JavaScript"],
    correct: 3  // JavaScript — the only language browsers execute directly
  }
]

// State variables — track where we are in the game
let currentIndex = 0  // which question we're on (0-based)
let score = 0         // how many correct answers so far


// =============================================================
// PHASE 1 — DOM SELECTIONS
// Grab every element we'll need. Do this once at the top and
// store the references in variables. Calling getElementById
// repeatedly is slower and harder to read.
// =============================================================

const gameTitle    = document.getElementById("game-title")
const scoreDisplay = document.getElementById("score")          // just the number
const questionNumber = document.getElementById("question-number")
const questionText   = document.getElementById("question-text")
const questionCard   = document.getElementById("question-card")
const answerList     = document.getElementById("answer-list")
const nextBtn        = document.getElementById("next-btn")
const endScreen      = document.getElementById("end-screen")

// --- Two ways to select multiple elements ---

// getElementsByClassName returns an HTMLCollection.
// HTMLCollection is live (updates if DOM changes) but has NO array methods.
const answerBtnsCollection = document.getElementsByClassName("answer-btn")

// querySelectorAll returns a NodeList.
// NodeList has .forEach() but still NOT .map() or .filter().
const answerBtnsNodeList = document.querySelectorAll(".answer-btn")

// To use full array methods on either one, convert it:
//   const arr = Array.from(answerBtnsNodeList)
//   const arr = [...answerBtnsNodeList]

// getElementsByClassName returns an HTMLCollection.
// querySelectorAll returns a NodeList.
// To use .map() on either, convert with Array.from() or spread [...].


// =============================================================
// PHASE 2 — READ AND MODIFY THE DOM
// These lines run once on page load and demonstrate the core
// DOM manipulation methods before any events are wired up.
// =============================================================

// textContent sets the text inside an element.
// innerText is similar but respects CSS visibility — textContent is usually preferred.
gameTitle.textContent = "⚡ Quick Fire Trivia"

// Reading a value is just as easy as writing one
console.log("First question:", questionText.textContent)

// String methods work on textContent just like any other string
questionNumber.textContent = questionNumber.textContent.toUpperCase()

// --- Tree traversal ---
// .parentElement walks UP the DOM tree.
// .children or .firstElementChild walks DOWN.
const firstBtn = answerBtnsNodeList[0]
const firstLi  = firstBtn.parentElement          // the <li> wrapping the button
console.log("The first button:", firstBtn)
console.log("Its parent <li>:", firstLi)
console.log("The <ul> that holds all buttons:", firstLi.parentElement)
// Result: we reached #answer-list without a second getElementById call.

// --- classList methods ---
// classList.add / .remove / .toggle let JavaScript apply CSS classes
// without ever touching element.style directly. Keeps styling in CSS.
questionCard.classList.add("answered")     // adds the left border accent
questionCard.classList.remove("answered")  // removes it — back to normal


// =============================================================
// PHASE 3 — loadQuestion(index)
// Renders the question at questions[index] into the DOM.
// Called once on load, and again each time "Next Question" is clicked.
// =============================================================

function loadQuestion(index) {
  // 1. Pull the question object out of the array
  const question = questions[index]

  // 2. Update the "Question X of Y" counter
  //    index is 0-based, so add 1 for the display number
  questionNumber.textContent = `QUESTION ${index + 1} OF ${questions.length}`

  // 3. Set the question text
  questionText.textContent = question.text

  // 4. Update each button's text and clear any leftover state classes
  //    Convert NodeList to array first so we can use forEach with the index
  Array.from(answerBtnsNodeList).forEach((btn, i) => {
    btn.textContent = question.answers[i]
    // Reset to just "answer-btn" — clears .correct, .wrong, .disabled
    // from the previous question
    btn.className = "answer-btn"
  })

  // 5. Hide "Next Question" until the player picks an answer
  nextBtn.classList.add("hidden")

  // 6. Remove the "answered" left-border accent from the card
  questionCard.classList.remove("answered")
}

// Render the first question immediately on page load
loadQuestion(0)


// =============================================================
// PHASE 4 — EVENT DELEGATION ON #answer-list
//
// Instead of four listeners (one per button), we use ONE listener
// on the parent <ul>. When any child button is clicked, the click
// event "bubbles" up through the DOM tree to the <ul> and fires here.
//
// Why delegation?
//   - Fewer listeners → better performance
//   - Works for elements added dynamically later (like in Phase 5)
//   - One place to look at the answer-click logic
// =============================================================

answerList.addEventListener("click", (event) => {
  // event.target  → the actual element that was clicked (could be a <button> or <li> or the <ul> itself)
  // event.currentTarget → always the element that has the listener attached (#answer-list)

  console.log("event.target:", event.target)           // the clicked element
  console.log("event.currentTarget:", event.currentTarget) // always #answer-list

  // Why does clicking a button inside #answer-list trigger this listener?
  // Answer: Click events bubble up the DOM tree — from the button, to the <li>,
  //         to the <ul>, where our listener catches them.
  //
  // What is the difference between event.target and event.currentTarget here?
  // event.target      → the specific button that was clicked
  // event.currentTarget → #answer-list, the element with the listener

  // 1. Guard: only act when a button was clicked, not the <ul> padding
  if (event.target.tagName !== "BUTTON") return

  const clickedBtn = event.target

  // 2. Find which index (0-3) the clicked button is among the four
  //    indexOf works on arrays, so convert the NodeList first
  const clickedIndex = Array.from(answerBtnsNodeList).indexOf(clickedBtn)

  // 3. Get the correct answer index for this question
  const correctIndex = questions[currentIndex].correct

  // 4. Compare and give feedback
  if (clickedIndex === correctIndex) {
    // Correct — turn the button green and update the score
    clickedBtn.classList.add("correct")
    score++
    scoreDisplay.textContent = score
  } else {
    // Wrong — turn the clicked button red
    clickedBtn.classList.add("wrong")
    // Reveal the correct answer in green so the player learns
    answerBtnsNodeList[correctIndex].classList.add("correct")
  }

  // 5. Disable all four buttons so the player can't change their answer
  Array.from(answerBtnsNodeList).forEach(btn => btn.classList.add("disabled"))

  // 6. Show the card's "answered" border and reveal "Next Question"
  questionCard.classList.add("answered")
  nextBtn.classList.remove("hidden")
})


// =============================================================
// PHASE 5a — NEXT BUTTON
// Advances to the next question or ends the game.
// =============================================================

nextBtn.addEventListener("click", () => {
  currentIndex++  // move forward one question

  if (currentIndex < questions.length) {
    // More questions remain — load the next one
    loadQuestion(currentIndex)
  } else {
    // No more questions — game over
    showEndScreen()
  }
})


// =============================================================
// PHASE 5b — showEndScreen()
// Builds the end screen entirely with JavaScript.
// document.createElement creates a node in memory — it's not
// visible on the page until you appendChild it to a parent.
// =============================================================

function showEndScreen() {
  // 1. Hide the question card
  questionCard.classList.add("hidden")

  // 2. Reveal the end screen (was class="hidden" in HTML)
  endScreen.classList.remove("hidden")

  // 3. Create the score headline
  const scoreHeading = document.createElement("h2")
  scoreHeading.textContent = `You scored ${score} out of ${questions.length}`
  // At this point scoreHeading exists in memory but is NOT on the page yet.

  // 4. Create an encouragement message based on performance
  const message = document.createElement("p")
  const percentage = score / questions.length

  if (percentage === 1) {
    message.textContent = "Perfect score! You're on fire! 🔥"
  } else if (percentage >= 0.6) {
    message.textContent = "Nice work — keep it up!"
  } else {
    message.textContent = "Tough round. Give it another shot!"
  }

  // 5. Create the "Play Again" button
  //    We set its id so the restart listener below can identify it
  const restartBtn = document.createElement("button")
  restartBtn.id = "restart-btn"
  restartBtn.textContent = "Play Again"

  // 6. Append all three nodes to #end-screen — this puts them on the page
  endScreen.appendChild(scoreHeading)
  endScreen.appendChild(message)
  endScreen.appendChild(restartBtn)
}


// =============================================================
// PHASE 6 — RESTART via event delegation on #end-screen
//
// The restart button was created dynamically by showEndScreen().
// It didn't exist when the page first loaded, so we CAN'T
// select it with getElementById at the top of the file —
// getElementById would return null because it doesn't exist yet.
//
// Solution: delegate to #end-screen (which DID exist on load)
// and filter for the restart button by id when a click bubbles up.
// =============================================================

endScreen.addEventListener("click", (event) => {
  // Only act on the restart button — ignore clicks on the heading or message
  if (event.target.id !== "restart-btn") return

  // 1. Reset state variables
  score = 0
  currentIndex = 0
  scoreDisplay.textContent = 0  // update the header so it shows 0 again

  // 2. Clear everything showEndScreen() added to #end-screen
  //    innerHTML = "" removes ALL child nodes at once (the h2, p, and button)
  endScreen.innerHTML = ""

  // 3. Hide the end screen again
  endScreen.classList.add("hidden")

  // 4. Bring the question card back
  questionCard.classList.remove("hidden")

  // 5. Load from the first question
  loadQuestion(0)
})
