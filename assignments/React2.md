# Assignment 07: React II — Event RSVP Manager

## What You Are Building

A page where guests can fill out a short form to RSVP for an event. When they submit, their name and email appear in a list below. Organizers can remove guests from the list.

By the end of this assignment you will have practiced:
- Connecting a text input to React state (controlled inputs)
- Handling a form submit without a page refresh
- Adding and removing items from a list

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

Open the link in your browser (usually `http://localhost:5173`). You should see the default Vite + React page.

**Before you write any code, clean up the template:**
1. Open `src/App.jsx` — delete everything inside it.
2. Open `src/App.css` — delete everything inside it.

> If your terminal shows an error, ask your instructor before moving on. Do not spend more than 10 minutes on setup.

---

## Part 1 — Warm Up: See a Controlled Input Work

**New ideas in this part:** controlled input, `onChange`, `value`

Before building the full form, you are going to practice with one input first. This is the most important pattern in React forms. Take your time here.

---

### Step 1.1 — Write a basic App component

Open `src/App.jsx` and write this:

```jsx
import { useState } from 'react'

export default function App() {
  const [name, setName] = useState('')

  return (
    <div>
      <h1>RSVP Practice</h1>
      <input type="text" />
    </div>
  )
}
```

Save the file. You should see a heading and an empty text box in the browser.

Try typing in the text box. It works — but React does not know about what you are typing yet. That is what you will fix in the next step.

---

### Step 1.2 — Connect the input to state

Update your `<input>` to look like this:

```jsx
<input
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```

Now add a line below the input to display the state value:

```jsx
<p>You typed: {name}</p>
```

Save the file. Type something in the text box. You should see the text appear below the box at the same time you type.

> **What is happening here?**
> - `value={name}` — the input always shows whatever is in the `name` state variable
> - `onChange={(e) => setName(e.target.value)}` — every time you press a key, this updates the state with what you typed
> - React sees the state change and re-renders the component, which updates the input and the paragraph at the same time

This is called a **controlled input**. React owns the value. The input just displays it.

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

Inside your `App` function, add a second state variable:

```jsx
const [name, setName] = useState('')
const [email, setEmail] = useState('')
```

---

### Step 2.2 — Replace the input with a full form

Replace your current `return` with this:

```jsx
return (
  <div>
    <h1>Company Picnic RSVP</h1>

    <form>

      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button type="submit">Add Guest</button>

    </form>

    <p>Name: {name}</p>
    <p>Email: {email}</p>

  </div>
)
```

Save the file. You should see a form with two inputs and a button. Type in both fields — you should see the values appear below the form as you type.

---

**Checkpoint 2:** Both inputs update as you type and the values appear below the form. ✓

---

## Part 3 — Handle the Form Submit

**New ideas in this part:** `e.preventDefault()`, adding to an array in state, clearing the form

This part has several steps. Work through them one at a time.

---

### Step 3.1 — Add a guests list to state

Add a third state variable at the top of your `App` function:

```jsx
const [guests, setGuests] = useState([])
```

This starts as an empty array. Every time someone fills out the form, you will add a new guest to this array.

---

### Step 3.2 — Write the submit handler

Add this function inside your `App` function, **above the `return`**:

```jsx
const handleSubmit = (e) => {
  e.preventDefault()

  const newGuest = {
    id: Date.now(),
    name: name,
    email: email,
  }

  setGuests([...guests, newGuest])

  setName('')
  setEmail('')
}
```

**What each line does:**

- `e.preventDefault()` — stops the browser from refreshing the page. Forms try to do this by default. This must always be the first line.
- `const newGuest = { ... }` — creates a new object with the name and email the user typed. `Date.now()` gives it a unique id number.
- `setGuests([...guests, newGuest])` — creates a new array that includes all the old guests plus the new one.
- `setName('')` and `setEmail('')` — clears both input fields after submitting.

> **Why `[...guests, newGuest]` and not `guests.push(newGuest)`?**
> In React you cannot change state directly. `push` changes the existing array. Instead, you create a brand new array with all the old items (`...guests`) plus the new one (`newGuest`). React sees the new array and updates the screen.

---

### Step 3.3 — Connect the handler to the form

Update your `<form>` opening tag to call `handleSubmit` when the form is submitted:

```jsx
<form onSubmit={handleSubmit}>
```

Save the file. Fill in both fields and click "Add Guest". The form should clear. (You cannot see the guests yet — that is the next step.)

---

### Step 3.4 — Display the guest list

Below the form and above the closing `</div>`, add this:

```jsx
<h2>Guest List</h2>
{guests.map((guest) => (
  <div key={guest.id}>
    <p>{guest.name} — {guest.email}</p>
  </div>
))}
```

Save the file. Submit the form a few times with different names and emails. Each guest should appear in the list. The form should clear after every submission.

---

**Checkpoint 3:** Submitting the form adds a guest to the list and clears both fields. ✓

---

## Part 4 — Remove a Guest

**New ideas in this part:** removing an item from an array in state

---

### Step 4.1 — Write the removeGuest function

Add this function inside your `App` function, above the `return`:

```jsx
const removeGuest = (id) => {
  const updatedGuests = guests.filter((guest) => guest.id !== id)
  setGuests(updatedGuests)
}
```

> `filter` goes through every guest and keeps only the ones where `guest.id !== id`. The guest you clicked to remove does not pass that check, so it gets left out of the new array.

---

### Step 4.2 — Add a Remove button to each guest

Update your guest list display to include a button:

```jsx
{guests.map((guest) => (
  <div key={guest.id}>
    <p>{guest.name} — {guest.email}</p>
    <button onClick={() => removeGuest(guest.id)}>Remove</button>
  </div>
))}
```

Save the file. Add a few guests, then click Remove. Each button should remove only that guest.

---

**Checkpoint 4:** Each guest has a Remove button that removes only that guest from the list. ✓

---

## Part 5 — GuestList Component

**New ideas in this part:** moving display logic into a separate component

Right now all your code is in one file. In this part, you will move the guest list display into its own component.

---

### Step 5.1 — Create the file

In your `src` folder, create a new file called `GuestList.jsx`.

---

### Step 5.2 — Write the GuestList component

Open `GuestList.jsx` and write this:

```jsx
export default function GuestList({ guests, onRemove }) {

  if (guests.length === 0) {
    return <p>No guests yet. Be the first to RSVP!</p>
  }

  return (
    <div>
      {guests.map((guest) => (
        <div key={guest.id}>
          <p>{guest.name} — {guest.email}</p>
          <button onClick={() => onRemove(guest.id)}>Remove</button>
        </div>
      ))}
    </div>
  )
}
```

---

### Step 5.3 — Use GuestList in App

Open `App.jsx`. At the top, import the new component:

```js
import GuestList from './GuestList'
```

Then replace the guest list section in your `return` with this:

```jsx
<h2>Guest List</h2>
<GuestList guests={guests} onRemove={removeGuest} />
```

Save the file. Everything should work exactly the same as before. The page behavior should not change — you only moved the code into a separate component.

---

**Checkpoint 5:** The app still works. GuestList is in its own file. ✓

---

## Finished Checklist

Before you submit, confirm each item:

- [ ] The app loads in the browser with no errors.
- [ ] Typing in an input field updates the field as you type.
- [ ] Submitting the form adds the guest to the list below.
- [ ] The form clears after submitting.
- [ ] Clicking Remove removes only that guest.
- [ ] When there are no guests, the message "No guests yet. Be the first to RSVP!" appears.
- [ ] `GuestList` is in its own file: `src/GuestList.jsx`.
- [ ] Your work is committed and pushed to GitHub.

---

## Stretch Challenges

Only start these after everything above is working.

- [ ] Add a counter above the guest list that shows how many guests have RSVP'd. It should update when guests are added or removed.
- [ ] Add basic validation: do not add a guest if the name field is empty. Show a message that says "Name is required" if the user tries to submit with an empty name.
- [ ] Add a `<select>` dropdown to the form with options: `"None"`, `"Vegetarian"`, `"Vegan"`, `"Gluten-Free"`. Display the selection on each guest card.
- [ ] Disable the "Add Guest" button if the name field is empty.

---

## Quick Reference

| Problem | Check this |
|---|---|
| Typing in the input does nothing | Does your input have both `value` and `onChange`? |
| Page refreshes when you submit | Is `e.preventDefault()` the first line in your submit handler? |
| Guest does not appear after submit | Is `setGuests` being called with a new array? |
| Form does not clear after submit | Are you calling `setName('')` and `setEmail('')` after `setGuests`? |
| Remove button removes the wrong guest | Are you passing `guest.id` to `removeGuest`, not the whole object? |
| Blank page | Check the browser console for an error message. |
