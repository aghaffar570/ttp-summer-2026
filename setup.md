## SET UP


### VS Code
Download: https://code.visualstudio.com/

Extensions (install inside VS Code):
- Live Server: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
- Browse more extensions: https://marketplace.visualstudio.com/VSCode

---

### Node.js
Download: https://nodejs.org/en

- Click the **LTS** version (recommended for most users)
- Run the installer and click through with the defaults
- Confirm it worked — open your terminal and run:

```text
node --version
```
You should see a version number, for example: `v22.17.0`


---

### Git


Download: https://git-scm.com/

**Mac:**
1. Check if you have homebrew installed. Run `brew --version`
2. Download [homebrew](https://brew.sh/) if you don't have it already
3. Then run `brew install git`
4. Run `git --version` again to confirm

**Windows:**
1. Download from https://git-scm.com/ and run the installer
2. Click through the defaults with one exception — when asked to choose a default editor, select **Visual Studio Code**
3. Finish the install
4. Open VS Code, then open the terminal
5. Click the dropdown arrow next to the `+` in the terminal panel → select **Git Bash** → set it as the default profile
6. Run `git --version` to confirm


### Git global config (everyone does this — Mac and Windows)
Tell Git who you are. Use the same email as your GitHub account:

```bash
git config --global user.name "FirstName LastName"
git config --global user.email "yourEmail@example.com"
```
IMPORTANT: Use the same email as your GitHub account.
Good to know: To override for a specific repo, run the same commands without `--global` inside that repo's folder.

This only needs to be done once per computer.

---


### GitHub account

1. Go to https://github.com and create a free account
2. Use the same email you used in the git config step above


### Personal Access Token (PAT)

GitHub requires a token instead of your password for git operations. You only set this up once.

1. Log into GitHub and go to **Settings** (click your profile photo → Settings)
2. Scroll down and click **Developer settings** (bottom of the left sidebar)
3. Click **Personal access tokens** → **Tokens (classic)**
4. Click **Generate new token** → **Generate new token (classic)**
5. Give it a name (e.g. "my laptop")
6. Set expiration to **No expiration** (or 90 days if you prefer)
7. Check the **repo** checkbox under scopes and all admin access
8. Click **Generate token** at the bottom
9. **Copy the token now — you won't be able to see it again**

When you push to GitHub for the first time, Git will ask for your username and password:
- Username: your GitHub username (this is your handle, not your email)
- Password: paste your PAT (not your GitHub account password)

Your computer will save it automatically after the first time — you won't be asked again.


### SSH (optional - if you did PAT, you don't need this)

step by step guide:

https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh

---

### PostgreSQL

Download: https://www.postgresql.org/download/

PostgreSQL is not an app you open and look at — it's a **server**, the same idea as the Express server you already built. It's a program that starts up, runs quietly in the background, and listens for connections (on port `5432`, instead of an HTTP port like `8080`). The server is where your actual data lives. A GUI tool like **pgAdmin** or **Postico** doesn't contain your data — it just connects to the server and shows you what's there. We'll use one of these GUI tools all course instead of the `psql` command line.

**Mac:**
1. You already have Homebrew from the Git setup step. Run: `brew install postgresql`
2. Start it as a background service — this is what makes it "running," and it'll keep running even after you close the terminal:
   ```bash
   brew services start postgresql
   ```
3. One extra step Mac needs that Windows doesn't: Homebrew makes *your own Mac username* the database superuser by default, not a role literally named `postgres`. Every assignment in this course assumes a role named `postgres`, so create it once, in your terminal:
   ```bash
   createuser -s postgres
   ```
   (This is the one and only command-line step — after this, you won't touch the terminal for database work again.)
4. Install a GUI tool, either one:
   - **pgAdmin** (free, works the same on Mac and Windows): https://www.pgadmin.org/download/pgadmin-4-macos/
   - **Postico** (Mac-only, nicer native interface, free to try / paid after the trial): https://eggerapps.at/postico2/

**Windows:**
1. Go to https://www.postgresql.org/download/windows/ and download the installer (the EDB installer link).
2. Run the installer. Click through the defaults, **except**:
   - When asked to set a password for the `postgres` superuser, set one and **write it down somewhere safe** — you'll be typing this constantly for the rest of the course.
   - Leave the port at the default, `5432`.
3. The installer automatically installs **pgAdmin 4** for you — no separate download needed. That's the GUI tool we'll use all course.

**Both Mac and Windows — connect with your GUI tool and confirm it works:**
1. Open pgAdmin (or Postico). The first time you open pgAdmin, it may ask you to set a "master password" — that's just for pgAdmin itself, not your database.
2. Create a new connection/server with these settings:
   - Host: `localhost`
   - Port: `5432`
   - Username: `postgres`
   - Password: the one you set during the Windows install (Mac: leave blank, then try `postgres` if it's rejected)
3. Once connected, you should see a `postgres` database already listed by default.

- [ ] You can see the connection in your GUI tool's sidebar without an error.
- [ ] You can expand it and see the default `postgres` database.

Good to know:
- Closing pgAdmin or Postico does **not** stop the server — the server runs independently in the background and keeps running until your computer restarts or you stop it on purpose.
- If your GUI tool ever fails to connect, the server itself probably isn't running. **Mac:** open a terminal and run `brew services restart postgresql`. **Windows:** open "Services" from the Start menu, find `postgresql-x64-...`, and make sure it says "Running".
