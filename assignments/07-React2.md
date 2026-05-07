# Assignment 07: React II — Event RSVP Manager

## Goal

Build a React app with controlled form inputs, client-side validation, and a live-updating list — practicing the full controlled input pattern that every professional React form uses.

## Objectives

You will practice:

- Building controlled inputs with `useState` + `onChange` + `value`.
- Preventing default form submission with `e.preventDefault()`.
- Writing inline validation logic inside `onChange` handlers.
- Displaying validation error messages conditionally.
- Disabling the submit button when the form is invalid.
- Resetting the form after a successful submission.
- Combining everything learned in React I and React II.

## Problem

Build an **Event RSVP Manager** for a fictional company event. Guests can fill out a form to RSVP, and the page displays a live guest list below the form. Organizers can also remove guests from the list.

Use Vite to scaffold:

```bash
npm create vite@latest rsvp-manager -- --template react
cd rsvp-manager
npm install
npm run dev
```

## Assignment Tasks

### Part 1: Form Skeleton

In `App.jsx`:

- [ ] Create a `<form>` with the following fields:
  - **Name** — text input (required)
  - **Email** — email input (required)
  - **Dietary restriction** — `<select>` with options: `"None"`, `"Vegetarian"`, `"Vegan"`, `"Gluten-Free"`
  - **Attending?** — checkbox input
  - A submit button labeled `"Add Guest"`
- [ ] Add a heading: `"Company Picnic RSVP"`.
- [ ] The form should not do anything yet — just render.

### Part 2: Controlled Inputs

- [ ] Add state for each field:
  ```js
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dietary, setDietary] = useState("None");
  const [attending, setAttending] = useState(true);
  ```
- [ ] Wire each input to its state variable:
  - `value={name}` + `onChange={(e) => setName(e.target.value)}` for the name input.
  - Same pattern for email and dietary select.
  - For the checkbox: `checked={attending}` + `onChange={(e) => setAttending(e.target.checked)}`.
- [ ] Verify in React DevTools that state updates as you type.

### Part 3: Validation

Add the following validation — check on every `onChange`, not only on submit.

- [ ] **Name** — must not be empty. Error: `"Name is required."`
- [ ] **Email** — must include `@` and `.`. Error: `"Please enter a valid email address."`
- [ ] Add state for each error message:
  ```js
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  ```
- [ ] Update the error state inside each field's `onChange` handler.
- [ ] Display error messages below each input when the error string is not empty.
- [ ] Disable the submit button when either error is non-empty **or** when name or email is empty.

### Part 4: Submitting and Building the Guest List

- [ ] In `App`, add a `guests` state variable (array, default `[]`).
- [ ] Write a `handleSubmit(e)` function that:
  - Calls `e.preventDefault()`.
  - Creates a new guest object: `{ id: Date.now(), name, email, dietary, attending }`.
  - Adds the guest to `guests` without mutating the existing array.
  - Resets all form fields back to their default values.
- [ ] Connect `handleSubmit` to the form's `onSubmit` prop.

### Part 5: GuestList Component

Create `src/components/GuestList.jsx`.

- [ ] Receives `guests` and `onRemove` as props.
- [ ] If `guests` is empty, renders `<p>No guests yet. Be the first to RSVP!</p>`.
- [ ] Otherwise renders a list of guest cards, each showing:
  - Name and email
  - Dietary restriction
  - Attending badge: `"✅ Attending"` or `"❌ Not Attending"`
  - A `"Remove"` button that calls `onRemove(guest.id)`
- [ ] In `App`, write a `removeGuest(id)` function that filters the guest out of `guests`.
- [ ] Render `<GuestList guests={guests} onRemove={removeGuest} />` below the form.

### Part 6: Summary Stats

- [ ] Display a summary above the guest list:
  - Total RSVPs.
  - Number attending.
  - Number not attending.
- [ ] This can live in `App` or its own component — your choice.

## Common Gotchas

- Always call `e.preventDefault()` **first** in your submit handler — before anything else. If state updates run first, React may re-render before you prevent the default.
- A checkbox uses `checked`, not `value`. Using `value` on a checkbox is a very common mistake.
- Checking `e.target.value.includes("@")` is a simple email validator for this assignment. In production, use a regex or a form library.
- If the submit button is disabled by default (because the form starts empty and `name` is `""`), that's correct behavior — the user hasn't typed anything yet.
- Clearing a controlled form after submit means resetting all state variables. Resetting the DOM directly (`e.target.reset()`) won't work the same way because React manages the values.
- `Date.now()` returns a number that is unique enough for a local id when creating new items client-side.

## Industry Standards

- Every form input in React should be controlled. Uncontrolled inputs (`ref`-based) are used only in specific edge cases.
- Validate on `onChange` (as you type), not only on submit — it gives users faster feedback.
- Submit buttons should be disabled while the form is invalid — it prevents repeated bad submissions.
- Separate the form component from the list component. Forms and displays are different responsibilities.
- When building the new array after submit, use spread: `[...guests, newGuest]`. Never push to state directly.

## Stretch Challenges

If you finish early:

- [ ] Extract the form into its own `RSVPForm` component. Pass `onAddGuest` as a prop.
- [ ] Add a `"Dietary Summary"` section that counts guests per dietary restriction using `reduce`.
- [ ] Add an `"Edit"` button that populates the form with a guest's existing data so they can update their RSVP.
- [ ] Add a `"Sort by name"` button that re-orders the guest list alphabetically.
- [ ] Persist the guest list to `localStorage` so it survives a page refresh.
- [ ] Add a minimum character count to the name field (at least 2 characters).

## Finished Checklist

Before submitting, verify:

- [ ] The form renders all four inputs correctly.
- [ ] State updates as you type — verify in React DevTools.
- [ ] Validation errors appear for invalid name and email.
- [ ] The submit button is disabled when the form is invalid.
- [ ] Submitting adds a new guest card to the list.
- [ ] The form clears after a successful submission.
- [ ] The `"Remove"` button deletes the correct guest.
- [ ] Stats update correctly when guests are added or removed.
- [ ] Your work has been committed and pushed to GitHub.
