# Assignment 07: React II — Event RSVP Manager

## What You Are Building

A page where guests can fill out a short form to RSVP for an event. When they submit, their name and email appear in a list below. Organizers can remove guests from the list.

By the end of this assignment you will have practiced:
- Connecting a text input to React state (controlled inputs)
- Handling a form submit without a page refresh
- Adding and removing items from a list

---

## Working in Groups

You will work together — one person types, the other reads along, helps catch mistakes, and checks the browser. Switch who is typing at each checkpoint.

Each of you should finish with your own complete project on your own GitHub account — not just access to your partner's repo:

1. Each person runs the Step 0 setup on their own laptop and creates their own GitHub repository.
2. Work through each part together on one screen — talk through what the code should do before typing it.
3. At each checkpoint, copy the agreed-on code into both laptops, not just the one you were typing on. Each person saves, commits, and pushes to their own repository.

Both people should be looking at the screen at all times while building. The person not typing should be reading the instructions out loud, checking the browser, and catching errors.

---

## Step 0 — Set Up Your Project

Open your terminal. Run these four commands **one at a time**. Wait for each one to finish before running the next.

```bash
npm create vite@latest rsvp-manager -- --template react
```
```bash
cd rsvp-manager
```
```bash
npm install
```
```bash
npm run dev
```

> **Leave this running.** `npm run dev` starts a local server that keeps your page live in the browser. It needs to keep running in that terminal the whole time you are working — do not close the terminal or press `Ctrl+C`, or your page will stop loading. If you ever need to stop it on purpose, `Ctrl+C` in that terminal is how, and `npm run dev` starts it again.

Open the link in your browser (usually `http://localhost:5173`). You should see the default Vite + React page.

**Before you write any code, do this cleanup:**

Vite fills these files with a demo to show the tool is working. You are going to replace them with your own app.

1. Open `src/App.jsx` — select all the text and delete it.
2. Open `src/App.css` — select all the text and delete it if you want to reset the styles.

Then paste this starter into `src/App.jsx`:

```jsx
import { useState } from 'react'
import './App.css'

export default function App() {
  return (
    <div>

    </div>
  )
}
```

Save the file. Your browser should show a blank white page with no errors. That means your starter is working.

> If your terminal shows an error, ask your instructor before moving on. Do not spend more than 10 minutes on setup.

---

## Before You Start: If You Didn't Finish Movie Night

This assignment is brand new — today's main topic is **forms**, which you have not touched before. You do not need a finished Movie Night app to succeed today.

There are two ideas from Movie Night that come back later in this assignment:
- `.map()` to display a list, with a `key` on each item
- Components and props (passing data from one file to another)

If you didn't get to those parts, don't worry — you will get a quick reminder right when they show up again. If you get stuck on them, ask your partner or your instructor. The important new skill today is the form, and that does not depend on finishing Movie Night.

---

## Part 1 — Warm Up: See a Controlled Input Work

**New ideas in this part:** controlled input, `onChange`, `value`

Before building the full form, you are going to practice with one input first. This is the most important pattern in React forms. Take your time here.

---

### Step 1.1 — Add state and a heading

Your starter file is already set up. Now add to it:
- Inside the `App` function, above the `return`, create one piece of state: a variable called `name` that starts as an empty string `''`
- Inside the `return`, add an `<h1>` that says "RSVP Practice" and a plain `<input type="text" />`

Save the file. You should see a heading and an empty text box in the browser.

Try typing in the text box. It works — but React does not know what you are typing yet. That is what you will fix next.

---

### Step 1.2 — Connect the input to state

Update your `<input>` so that:
- Its displayed value always matches the `name` state variable
- Every time you press a key, it updates the `name` state variable with what you typed

Then add a `<p>` below the input that displays the current value of `name`.

Save the file. Type something in the text box. You should see the text appear below the box at the same time you type.

> **What is a controlled input?** React owns the value. The input just displays it. Two things make this work:
> - `value={name}` — tells the input what to show
> - `onChange` — an event that fires on every keystroke. The event object `e` has `e.target.value`, which is what the user just typed.
>
> **Gotcha:** If you can type in the box but nothing appears below it, check that your `onChange` is calling `setName`.

---

### Step 1.3 — See what happens if you remove `onChange`

Try deleting the `onChange` line and type in the box. Notice anything?

The box does not update. You cannot type.

That is because `value={name}` tells the input to always show whatever is in state — and without `onChange`, state never changes, so the input never changes.

Put `onChange` back before moving on.

---

**Checkpoint 1:** You can type in the box and see the text appear below it in real time. ✓

---

## Part 2 — Build the Form

**New ideas in this part:** multiple controlled inputs, form element, submit button

Now you will build the real form. It will have two inputs: name and email.

---

### Step 2.1 — Add a second state variable for email

Inside your `App` function, add a second piece of state — a variable called `email` that starts as an empty string.

---

### Step 2.2 — Replace the input with a full form

Replace everything inside your `return` with a layout that has:
- An `<h1>` that says "Company Picnic RSVP"
- A `<form>` element containing:
  - A `<label>` that says "Name" and a controlled text input connected to your `name` state
  - A `<label>` that says "Email" and a controlled text input connected to your `email` state
  - A `<button type="submit">` with the label "Add Guest"
- Below the form, two `<p>` tags that display the current values of `name` and `email`

Save the file. You should see a form with two inputs and a button. Type in both fields — you should see the values appear below the form as you type.

> **Gotcha:** Each input needs its own `value` and `onChange`. If you connect both inputs to `name`, they will both update the same variable and mirror each other.

---

**Checkpoint 2:** Both inputs update as you type and the values appear below the form. ✓

---

## Part 3 — Handle the Form Submit

**New ideas in this part:** `e.preventDefault()`, adding to an array in state, clearing the form

This part has several steps. Work through them one at a time.

---

### Step 3.1 — Add a guests list to state

Add a third piece of state inside your `App` function: a variable called `guests` that starts as an empty array `[]`.

This starts empty. Every time someone submits the form, you will add a new guest to it.

---

### Step 3.2 — Write the submit handler

Add a function called `handleSubmit` inside your `App` function, above the `return`. It should:
1. Stop the browser from refreshing the page — this must be the very first line
2. Create a new object for the guest with three fields: `id`, `name`, and `email`. For `id`, use `Date.now()` — this gives a unique number based on the current time.
3. Add the new guest to the `guests` array in state — create a new array that includes all the old guests plus the new one
4. Clear both input fields by setting `name` and `email` back to empty strings

> **Why `e.preventDefault()`?** By default, submitting a form causes the browser to reload the page. This would wipe out your React state. Calling `e.preventDefault()` blocks that reload. Your submit handler receives an event object — call this method on it.
>
> **Why not `guests.push(newGuest)`?** In React you cannot change state directly. `push` changes the existing array. Instead, create a brand new array that includes all the old items plus the new one. The spread operator can help: `[...guests, newGuest]` creates a new array with everything in `guests` followed by `newGuest`.
>
> **Gotcha:** Clear the inputs after calling `setGuests`, not before. If you clear them first, the values will be gone when you try to build the new guest object.

---

### Step 3.3 — Connect the handler to the form

Update your `<form>` so that it calls `handleSubmit` when submitted.

Save the file. Fill in both fields and click "Add Guest". The form should clear. (You cannot see the guests yet — that is the next step.)

---

### Step 3.4 — Display the guest list

Below the form, add a section that:
- Shows an `<h2>` that says "Guest List"
- Uses `.map()` to display each guest — show their name and email on the same line
- Gives each item a `key` using the guest's `id`

> **Reminder from Movie Night:** `.map()` goes through every item in an array and returns a piece of JSX for each one. Every item it returns needs a `key` prop — here, use `guest.id`. If you skipped this part of Movie Night, this is the same pattern, just with guests instead of movies.

Save the file. Submit the form a few times with different names and emails. Each guest should appear in the list. The form should clear after every submission.

> **Gotcha:** Make sure the `.map()` is inside your `return`. JSX that lives outside the `return` will not appear on screen.

---

**Checkpoint 3:** Submitting the form adds a guest to the list and clears both fields. ✓

---

## Part 4 — Remove a Guest

**New ideas in this part:** removing an item from an array in state

---

### Step 4.1 — Write the removeGuest function

Add a function called `removeGuest` inside your `App` function, above the `return`. It should:
- Accept one argument: the `id` of the guest to remove
- Use `.filter()` to create a new array that includes every guest except the one with that `id`
- Call `setGuests` with the result

> **What is `.filter()`?** It goes through every item in an array and keeps only the ones that pass a test you write. Items that fail the test are left out of the new array.
>
> **Hint:** Your test should keep guests whose `id` does not match the one you want to remove.

---

### Step 4.2 — Add a Remove button to each guest

Update your guest list display to include a `<button>` next to each guest that, when clicked, calls `removeGuest` with that guest's `id`.

Save the file. Add a few guests, then click Remove. Each button should remove only that guest.

> **Gotcha:** Same as before — do not call the function immediately. Use an arrow function in `onClick` so it only runs when clicked: `onClick={() => removeGuest(guest.id)}`.

---

### Step 4.3 — Show a message when there are no guests

Remove every guest using your new buttons until the list is empty. Look at the page — there is no error, but there is also no list and no message. That is because `.map()` on an empty array simply renders nothing.

Above your `.map()`, add a check: if `guests.length` is `0`, show a `<p>` that says "No guests yet. Be the first to RSVP!" instead of the list.

> **Hint:** This is the same kind of `if` check you used in Movie Night to decide between "Watched" and "Not watched yet" — you are just deciding between two different things to show.

---

**Checkpoint 4:** Each guest has a Remove button that removes only that guest from the list, and an empty list shows "No guests yet. Be the first to RSVP!" ✓

---

## Finished Checklist

Before you submit, confirm each item:

- [ ] The app loads in the browser with no errors.
- [ ] Typing in an input field updates the field as you type.
- [ ] Submitting the form adds the guest to the list below.
- [ ] The form clears after submitting.
- [ ] Clicking Remove removes only that guest.
- [ ] When there are no guests, the message "No guests yet. Be the first to RSVP!" appears.
- [ ] Your work is committed and pushed to GitHub.

---

## Stretch Challenges

Only start these after everything above is working.

- [ ] **Move the guest list into its own component.** Create `src/GuestList.jsx`. Write a component called `GuestList` that accepts two props — the `guests` array and a function to remove a guest (name it `onRemove`) — and renders everything your guest-list section currently does, including the empty-state message. Import it into `App.jsx` and replace that section with `<GuestList guests={guests} onRemove={removeGuest} />`. The page should look and behave exactly the same — only the file it lives in changes.
  > **Hint:** A component can have more than one `return` statement. Write an `if` check at the top — if `guests.length === 0`, return the empty message. If that condition is not true, JavaScript keeps going and hits the second `return` with the full list.
- [ ] Add a counter above the guest list that shows how many guests have RSVP'd. It should update when guests are added or removed.
- [ ] Add basic validation: do not add a guest if the name field is empty. Show a message that says "Name is required" if the user tries to submit with an empty name.
- [ ] Add a `<select>` dropdown to the form with options: `"None"`, `"Vegetarian"`, `"Vegan"`, `"Gluten-Free"`. Display the meal preference on each guest card.
- [ ] Disable the "Add Guest" button if the name field is empty.

---

## Quick Reference

| Problem | Check this |
|---|---|
| Typing in the input does nothing | Does your input have both `value` and `onChange`? |
| Page refreshes when you submit | Is `e.preventDefault()` the first line in your submit handler? |
| Guest does not appear after submit | Is `setGuests` being called with a new array (not `push`)? |
| Form does not clear after submit | Are you calling `setName('')` and `setEmail('')` after `setGuests`? |
| Remove button removes the wrong guest | Are you passing `guest.id` to `removeGuest`, not the whole object? |
| Blank page | Open the browser console and read the error message. |
