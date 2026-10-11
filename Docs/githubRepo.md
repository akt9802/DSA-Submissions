# GitHub Repo Setup — DSA-Submissions

Quick reference for setting up and pushing to your personal GitHub repo (`akt9802/DSA-Submissions`).

---

## 1. Clone the Repo

```zsh
git clone https://<your-token>@github.com/akt9802/DSA-Submissions.git
cd DSA-Submissions
```

> Replace `<your-token>` with your GitHub Personal Access Token.  
> **Never hardcode your token in public files or share it.**

---

## 2. Initialize a New Local Repo (if starting fresh)

```zsh
# Create and navigate to the folder
mkdir DSA-Submissions
cd DSA-Submissions

# Initialize git
git init

# Link to your remote GitHub repo
git remote add origin https://<your-token>@github.com/akt9802/DSA-Submissions.git

# Add files, commit, and push
git add .
git commit -m "Initial commit"
git push -u origin main
```

---

## 3. Daily Push Workflow

```zsh
git add .
git commit -m "your commit message"
git push origin main
```

---

## 4. Set Git Identity for This Repo

Since you have two git identities (work & personal), set identity **locally** so it only applies to this repo:

```zsh
# Set for this repo only (recommended)
git config user.name "akt9802"
git config user.email "your-personal-email@gmail.com"

# Set globally (affects all repos — avoid if you have a work identity)
git config --global user.name "akt9802"
git config --global user.email "your-personal-email@gmail.com"
```

### Verify:
```zsh
git config user.name
git config user.email
```

---

## 5. Store Credentials Securely (macOS Keychain)

Instead of embedding your token in the URL every time, use macOS Keychain:

```zsh
# Enable keychain credential helper
git config --global credential.helper osxkeychain

# Set the remote URL without the token
git remote set-url origin https://github.com/akt9802/DSA-Submissions.git
```

On your first `git push`, git will prompt for:
- **Username:** `akt9802`
- **Password:** `<your GitHub Personal Access Token>`

After that, credentials are saved to Keychain and you won't be prompted again.

---

## 6. Generate a GitHub Personal Access Token

1. Go to [GitHub → Settings → Developer Settings → Personal Access Tokens](https://github.com/settings/tokens)
2. Click **"Generate new token (classic)"**
3. Select scopes: `repo` (full control of private repositories)
4. Copy the token and store it safely (you won't see it again)

> ⚠️ If your token is ever exposed (e.g. pasted in a terminal or shared), **revoke it immediately** from the same page and generate a new one.

---

## Quick Reference

| Task | Command |
|------|---------|
| Clone repo | `git clone https://<token>@github.com/akt9802/DSA-Submissions.git` |
| Initialize local repo | `git init` |
| Link remote | `git remote add origin <url>` |
| Stage all files | `git add .` |
| Commit | `git commit -m "message"` |
| Push | `git push origin main` |
| Set local username | `git config user.name "akt9802"` |
| Set local email | `git config user.email "you@example.com"` |
| View remote URL | `git remote -v` |
| Update remote URL | `git remote set-url origin <new-url>` |
