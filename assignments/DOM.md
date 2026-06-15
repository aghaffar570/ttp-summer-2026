# DOM Workshop: Quick Fire Trivia

## The Scenario

It's the end of a long week and someone says: "What if we had a trivia game?" You volunteer.

By the end of this workshop, you'll have a **playable trivia game** running entirely in the browser — no frameworks, no libraries. Questions load from a JavaScript array, players click to answer, cards flash green or red, a score tracks every correct answer, and a final screen appears when the game ends. Then the game resets.

Everything you build here — selecting elements, reading and changing the DOM, responding to events, creating new nodes — is the same foundation that powers every web app you'll write from here on out.

---

DOM REF CHEAT SHEET: https://devsheets.io/sheets/dom-manipulation

## What You'll Learn

- How to find elements with different selector methods and what each one returns
- How to read and modify content, classes, and attributes on live DOM nodes
- How to respond to user actions with event listeners
- Why event delegation exists and how to use it
- How to build new DOM nodes from scratch in JavaScript

---

## Phase 0: Build the Shell

**Write zero JavaScript.** Build the complete HTML and CSS first. When you open the page, it should look and feel like a real trivia game — even though the buttons do nothing yet. This is the page JavaScript is going to bring to life.

Create a folder named `trivia-game/` with three files:

```
trivia-game/
  index.html
  styles.css
  script.js
```

### HTML Structure

Your page needs:

- A valid HTML5 skeleton with `styles.css` linked in `<head>` and `script.js` linked with `defer`:

```html
<script src="script.js" defer></script>
```

- A `<main id="game">` wrapper around everything
- A `<header>` with a title and score display:

```html
<header>
  <h1 id="game-title">Quick Fire Trivia</h1>
  <div id="score-display">Score: <span id="score">0</span></div>
</header>
```

- A `<section id="question-card">` containing:
  - A `<p id="question-number">Question 1 of 5</p>`
  - A `<h2 id="question-text">Who invented the World Wide Web?</h2>`
  - A `<ul id="answer-list">` with **four** `<li>` items, each wrapping a button:

```html
<ul id="answer-list">
  <li><button class="answer-btn">Tim Berners-Lee</button></li>
  <li><button class="answer-btn">Bill Gates</button></li>
  <li><button class="answer-btn">Linus Torvalds</button></li>
  <li><button class="answer-btn">Ada Lovelace</button></li>
</ul>
```

  - A `<button id="next-btn" class="hidden">Next Question →</button>`

- An empty `<section id="end-screen" class="hidden">` below the question card — JavaScript fills this in at the end and removes the `hidden` class when the game is over

Pick any trivia category you like (science, movies, history, sports) and write one real question with four real answers in the HTML. You'll replace the content with a data array in Phase 3.

### CSS Requirements

Make it look like a real game. At minimum:

- A card-style layout for `#question-card` (box-shadow, padding, max-width centered)
- `#question-text` should be visually prominent
- `.answer-btn`: full-width, clearly a button, with hover and focus styles
- Define these classes now — JavaScript will apply them during the game:

```css
/* Applied to the button the player clicked — correct answer */
.correct {
  background-color: #4caf50;
  color: white;
  border-color: #388e3c;
}

/* Applied to the button the player clicked — wrong answer */
.wrong {
  background-color: #e53935;
  color: white;
  border-color: #c62828;
}

/* Applied to all answer buttons after a choice is made */
.disabled {
  opacity: 0.5;
  pointer-events: none;
  cursor: default;
}

/* Applied to #question-card after an answer is locked in */
.answered {
  border-left: 4px solid #90a4ae;
}

/* Hides an element — used on next-btn and end-screen initially */
.hidden {
  display: none;
}
```

- Style `#end-screen` — it'll appear at game end. Give it a distinct look (different background, centered text, large heading). It starts hidden, so you won't see it yet.
- Add `class="hidden"` to `#next-btn` in your HTML. It should not be visible on load.
- Clean, readable layout. Responsive design is a bonus if you have extra time — don't let it block you.

**Checkpoint — open the page in the browser.** You should see your game title, a score of 0, one question with four answer buttons, and no "Next Question" button. Clicking anything does nothing. That's exactly right.

**Commit your work:**
```
git add .
git commit -m "phase 0: HTML and CSS shell for trivia game"
```

---

## Phase 1: Connect to the DOM

Open `script.js`. Your first job is to give JavaScript handles to the elements it'll need. The first two are done for you — follow the same pattern for the rest:

```js
const gameTitle = document.getElementById("game-title")
const scoreDisplay = document.getElementById("score")
// select #question-number  → store in questionNumber
// select #question-text    → store in questionText
// select #question-card    → store in questionCard
// select #answer-list      → store in answerList
// select #next-btn         → store in nextBtn
// select #end-screen       → store in endScreen
```

Now select the answer buttons two different ways. The first one is done — write the second yourself:

```js
const answerBtnsCollection = document.getElementsByClassName("answer-btn")
// select ".answer-btn" using querySelectorAll → store in answerBtnsNodeList
```

Log all of them to the console and open DevTools. Expand both `answerBtnsCollection` and `answerBtnsNodeList` and compare them.

Then test this directly in the console:

```js
answerBtnsCollection.map    // → undefined
answerBtnsNodeList.forEach  // → ƒ forEach() { [native code] }
```

`getElementsByClassName` returns an **HTMLCollection** — it has no `.map()`, no `.filter()`, no array methods at all. `querySelectorAll` returns a **NodeList** — it has `.forEach()`, but still no `.map()` or `.filter()`. To get a real array from either one, convert it:

```js
const btnsArray = Array.from(answerBtnsNodeList)
// or
const btnsArray2 = [...answerBtnsNodeList]
```

Fill in this comment in your code before moving on:

```js
// getElementsByClassName returns an ________.
// querySelectorAll returns a ________.
// To use .map() on either, convert with ________.
```

Going forward, use `answerBtnsNodeList` — it's the one with `.forEach()`. You can ignore `answerBtnsCollection` from here on out; it was just there to show you the difference.

**Commit your work:**
```
git add .
git commit -m "phase 1: select DOM elements, observe HTMLCollection vs NodeList"
```

---

## Phase 2: Read and Modify the Page

JavaScript will now visually change the static page. No clicks yet — just reading from and writing to the DOM.

Add the following to `script.js` below your selections. After each change, save and refresh the browser to see it take effect.

**Update the title:**
```js
gameTitle.textContent = "⚡ Quick Fire Trivia"
```

**Read the current question text and log it:**
```js
console.log("First question:", questionText.textContent)
```

**Change the question number label to uppercase:**
```js
questionNumber.textContent = questionNumber.textContent.toUpperCase()
```

**Walk the tree — no new selectors:**

Starting from the first answer button, navigate to its parent and back:

```js
const firstBtn = answerBtnsNodeList[0]
const firstLi = firstBtn.parentElement

console.log("The first button:", firstBtn)
console.log("Its parent <li>:", firstLi)
console.log("The <ul> that holds all buttons:", firstLi.parentElement)
```

You reached `#answer-list` without ever writing `document.getElementById("answer-list")` again. That's traversal.

**Toggle a class on the question card:**
```js
questionCard.classList.add("answered")
// Look at the browser — does the card look different?

questionCard.classList.remove("answered")
// Back to normal
```

`classList.add`, `classList.remove`, and `classList.toggle` are how JavaScript applies and removes visual state without ever touching a style directly.

**Commit your work:**
```
git add .
git commit -m "phase 2: read and modify DOM content, classes, and traverse the tree"
```

---

## Phase 3: Your Questions

Before adding any interaction, write out the questions your game will use.

At the top of `script.js` — above everything else — add a `questions` array. Write at least three real questions. Each object has this shape:

```js
const questions = [
  {
    text: "Who invented the World Wide Web?",
    answers: [
      "Tim Berners-Lee",
      "Bill Gates",
      "Linus Torvalds",
      "Ada Lovelace"
    ],
    correct: 0  // index of the correct answer in the answers array
  },
  // ...four more
]
```

Also add two variables to keep track of where the player is in the game:

```js
let currentIndex = 0
let score = 0
```

Now write a function called `loadQuestion(index)` that takes an index and updates the DOM to show that question. The skeleton below is your guide — replace each comment with real code:

```js
function loadQuestion(index) {
  // 1. Get the current question object out of the questions array using index

  // 2. Update questionNumber.textContent — should read "Question X of Y"
  //    hint: use index + 1 for the display number, questions.length for the total

  // 3. Update questionText.textContent with the question's text

  // 4. Loop over the four answer buttons and for each one:
  //    - Set its textContent to the matching answer from the question object
  //    - Reset its className back to "answer-btn" to clear any leftover .correct / .wrong / .disabled
  //    hint: convert answerBtnsNodeList to a real array first, then use forEach

  // 5. Hide the next button

  // 6. Remove the "answered" class from questionCard
}
```

Call it at the bottom of the file: `loadQuestion(0)`

**Refresh the browser.** The placeholder question you typed in the HTML is gone — `loadQuestion` just updated the DOM elements directly with the first question's content.

**Commit your work:**
```
git add .
git commit -m "phase 3: question data model and loadQuestion render function"
```

---

## Phase 4: Make It Interactive

Now the buttons do something.

Instead of attaching a click listener to every button, attach **one listener to `#answer-list`**. When any button inside the list is clicked, the event bubbles up to the list and fires the listener. This is **event delegation** — one handler covers all current and future children.

Every DOM element has a `tagName` property that tells you what kind of element it is — `"BUTTON"`, `"LI"`, `"DIV"`, etc. It's always uppercase. You'll use this to filter out clicks that land on the list itself rather than on a button.

```js
answerList.addEventListener("click", (event) => {
  // 1. If the click was not on a BUTTON element, return early and do nothing
  //    hint: check event.target.tagName — it will be the string "BUTTON" if a button was clicked

  // 2. Store the clicked button and figure out which index it is in the list
  //    hint: convert answerBtnsNodeList to an array and use .indexOf(event.target)

  // 3. Get the correct answer index from the current question in the data array

  // 4. Compare: did the player pick the right one?
  //    - If correct: add the "correct" class to the clicked button, increment score,
  //      and update scoreDisplay.textContent
  //    - If wrong: add the "wrong" class to the clicked button,
  //      and add "correct" to the button at the correct index to reveal it

  // 5. Disable all four answer buttons so the player can't change their answer
  //    hint: convert to a real array and use forEach to add "disabled" to each

  // 6. Add "answered" to questionCard and remove "hidden" from nextBtn
})
```

**In the browser:** Click an answer. It should flash green or red, the correct answer highlights, all buttons go dim, and "Next Question" appears.

Log both `event.target` and `event.currentTarget` inside the handler so you can see the difference. `event.target` is the button that was clicked. `event.currentTarget` is always `#answer-list` — the element with the listener.

Add this comment to your code:

```js
// Why does clicking a button inside #answer-list trigger this listener?
// Answer: 
//
// What is the difference between event.target and event.currentTarget here?
// event.target  → 
// event.currentTarget → 
```

**Commit your work:**
```
git add .
git commit -m "phase 4: event delegation on answer list, score tracking"
```

---

## Phase 5: Move to the Next Question

Wire up the "Next Question" button:

```js
nextBtn.addEventListener("click", () => {
  // 1. Increment currentIndex

  // 2. If there are more questions left (currentIndex < questions.length):
  //    - Call loadQuestion with the updated index

  // 3. Otherwise the game is over — call showEndScreen()
})
```

Now write `showEndScreen()`. This function builds the entire end screen **dynamically from JavaScript** — do not edit the HTML for this step. Use `document.createElement` for every element:

```js
function showEndScreen() {
  // 1. Hide the question card

  // 2. Show the end screen (it started with class="hidden" — remove that now)

  // 3. Create an <h2> and set its textContent to show the final score
  //    e.g. "You scored 3 out of 5"
  //    hint: use the score and questions.length variables

  // 4. Create a <p> for an encouragement message
  //    Write a conditional with at least two different messages
  //    (e.g. one for a perfect score, one for passing, one for failing)

  // 5. Create a <button>, set its id to "restart-btn" and its textContent to "Play Again"

  // 6. Append all three elements to endScreen
  //    note: createElement builds the node in memory — appendChild is what puts it on the page
}
```

**In the browser:** Answer all five questions. The question card should disappear and the end screen should show your final score, a message, and a "Play Again" button.

`document.createElement` creates a node that exists in memory but isn't on the page yet. `appendChild` puts it in the tree. Until you call `appendChild`, the element is invisible.

**Commit your work:**
```
git add .
git commit -m "phase 5: next question flow and dynamic end screen with createElement"
```

---

## Phase 6: Restart

The restart button was created by JavaScript — it didn't exist when the page loaded, so you can't select it at the top of the file. Instead, delegate to `#end-screen`:

```js
endScreen.addEventListener("click", (event) => {
  // 1. Return early if the clicked element is not the restart button
  //    hint: check event.target.id
  //    think: why can't we just do document.getElementById("restart-btn") at the top of the file?

  // 2. Reset both state variables (score and currentIndex) to 0
  //    - Also update scoreDisplay.textContent so the header reflects the reset

  // 3. Clear everything showEndScreen built
  //    hint: setting endScreen.innerHTML to "" removes all child elements at once

  // 4. Bring the question card back

  // 5. Load the first question
})
```

`endScreen.innerHTML = ""` is the fast way to remove all child elements at once. You're clearing the DOM nodes that `showEndScreen` created.

**In the browser:** Finish the game, click "Play Again." Score resets, question resets, the game is fresh.

**Commit your work:**
```
git add .
git commit -m "phase 6: restart via event delegation on end screen"
```

---

## Stretch Challenges

If you finish early, pick any of these:

- **Progress bar** — add a `<div id="progress-bar">` that fills to `(currentIndex / questions.length) * 100%` after each question
- **Answer explanations** — add an `explanation` field to each question object and display it after an answer is selected
- **Timer** — give players 10 seconds per question; if it runs out, the question auto-fails using `setTimeout`
- **High score** — store the best score in `localStorage` and display it in the header on load
- **Shuffle** — randomize question order on each game start using `array.sort(() => Math.random() - 0.5)`; make sure the `correct` index still maps to the right answer after shuffling

---

## Before You Submit

- [ ] The page looks complete and styled before any JavaScript runs
- [ ] Questions load from a data array — the HTML placeholder text is gone
- [ ] Clicking a correct answer turns it green; clicking wrong turns it red and reveals the correct one
- [ ] All buttons are disabled after an answer is selected
- [ ] "Next Question" is hidden until an answer is chosen
- [ ] The end screen is built entirely with `document.createElement` — no hardcoded HTML
- [ ] "Play Again" resets the score, the index, and the question
- [ ] Event delegation is used in at least two places
- [ ] Your comments on event delegation and HTMLCollection vs NodeList are filled in
- [ ] No console errors on page load
- [ ] Code is formatted and readable
- [ ] Committed after every phase and pushed to GitHub
