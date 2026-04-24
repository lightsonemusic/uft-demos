# Push UFT.demos to GitHub

## Step 1: Create a new GitHub repository

1. Go to https://github.com/new
2. Create a new public repository named **`uft-demos`** or **`UFT.demos`**
3. **Do NOT** initialize with README, .gitignore, or license (we have those)
4. Click "Create repository"
5. Copy the repository URL (e.g., `https://github.com/YOUR_USERNAME/uft-demos.git`)

---

## Step 2: Initialize Git and push to GitHub

Open PowerShell in the `toys` folder and run:

```powershell
# Navigate to the toys folder
cd "C:\Users\Pedro\Documents\UFT_Project\toys"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: 3 interactive UFT music toys

- Proto-Word Sound Gallery: Click to hear cosmic frequencies
- Frequency Converter: Input Hz to find proto-word associations
- Cymatic Geometry Player: Visualize animated cosmic geometries

All public reference material. No sensitive data."

# Add GitHub remote
git remote add origin https://github.com/lightsonemusic/uft-demos.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Step 3: Verify on GitHub

1. Go to your repository on GitHub: `https://github.com/lightsonemusic/uft-demos`
2. Verify all files are there:
   - `toys/index.html` (hub page)
   - `toys/1-*.html`, `toys/2-*.html`, `toys/3-*.html` (the 3 toys)
   - `README.md` (documentation)
   - `LICENSE` (MIT)
   - `.gitignore`
3. Check that README renders correctly

---

## Step 4: Share!

Your repo is now live! Share the link:
```
https://github.com/lightsonemusic/uft-demos
```

Anyone can:
- **View the code** online
- **Clone it locally:** `git clone https://github.com/YOUR_USERNAME/uft-demos.git`
- **Open toys locally** by downloading and opening `toys/index.html` in a browser

---

## Optional: Add Topics to GitHub

On your GitHub repo page:
1. Click "Add topics"
2. Add: `cosmic`, `frequency`, `music`, `cymatic`, `geometry`, `web-audio`, `educational`

This helps others discover your project!

---

## That's it! 🎉

Your UFT.demos repo is now shareable, searchable, and ready for exploration.
