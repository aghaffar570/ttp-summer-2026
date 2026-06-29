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

PostgreSQL is not an app you open and look at — it's a **server**, the same idea as the Express server you already built. It's a program that starts up, runs quietly in the background, and listens for connections (on port `5432`, instead of an HTTP port like `8080`). The server is where your actual data lives. A GUI tool like **Postico** or **pgAdmin** doesn't contain your data — it just connects to the server and shows you what's there. We'll use a GUI tool all course instead of the `psql` command line.

Convention for this course: **set your database password to `root`** everywhere you're asked for one. It's not secure, but nothing here is a real production database — using the same simple password as everyone else means assignment instructions and troubleshooting work the same for the whole class. You're always free to use a stronger password on your own machine later, for a real project.

**Mac:**
1. Download **Postgres.app**: https://postgresapp.com/ — this is the server itself, no Homebrew or terminal needed.
2. Drag it into your Applications folder, then open it.
3. Click **Initialize** — this creates and starts a new Postgres server. You'll see an elephant icon appear in your menu bar at the top of the screen whenever it's running.
4. Download **Postico**: https://eggerapps.at/postico2/ — this is the GUI tool you'll use to look at and query your databases.
5. Open Postico and create a new connection using the defaults it suggests (host `localhost`, port `5432`, your Mac username, no password). Connect — this is the default database Postgres.app already created for you.
6. Every assignment in this course expects a role literally named `postgres` with the password `root`. Postgres.app doesn't create that for you by default, so create it once: in Postico, open a New Query window on your current connection and run:
   ```sql
   CREATE ROLE postgres WITH LOGIN SUPERUSER PASSWORD 'root';
   ```
7. From now on, connect in Postico using username `postgres` and password `root` — that's the login every assignment assumes.

**Windows:**
1. Go to https://www.postgresql.org/download/windows/ and download the installer (the EDB installer link).
2. Run the installer. Click through the defaults, **except**:
   - When asked to set a password for the `postgres` superuser, set it to `root` (see the convention note above).
   - Leave the port at the default, `5432`.
3. The installer automatically installs **pgAdmin 4** for you — no separate download needed. That's the GUI tool you'll use on Windows.

**Both Mac and Windows — connect with your GUI tool and confirm it works:**
1. Open Postico (Mac) or pgAdmin (Windows). The first time you open pgAdmin, it may ask you to set a "master password" — that's just for pgAdmin itself, not your database.
2. Create a new connection/server with these settings:
   - Host: `localhost`
   - Port: `5432`
   - Username: `postgres`
   - Password: `root`
3. Once connected, you should see a `postgres` database already listed by default.

- [ ] You can see the connection in your GUI tool's sidebar without an error.
- [ ] You can expand it and see the default `postgres` database.

Good to know:
- Closing Postico or pgAdmin does **not** stop the server — the server runs independently in the background and keeps running until your computer restarts or you stop it on purpose.
- If your GUI tool ever fails to connect, the server itself probably isn't running. **Mac:** open Postgres.app from your Applications folder (or click the elephant icon in your menu bar) and make sure it shows the server as started. **Windows:** open "Services" from the Start menu, find `postgresql-x64-...`, and make sure it says "Running".
