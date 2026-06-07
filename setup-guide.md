# THE QUIET HUSTLE — Setup Guide

## Part 1: Create the Claude Project

### Step 1: Open Claude Projects
1. Go to **claude.ai**
2. Click the **hamburger menu** (top-left) → **Projects**
3. Click **"Create project"**
4. Name it: **The Quiet Hustle**
5. Add a description: "Faceless affiliate marketing education brand — content design and creation"

### Step 2: Paste the Project Instructions
1. In your new project, click **"Set custom instructions"**
2. Open the file `tqh-claude-project-instructions.md` from this repo
3. Copy the ENTIRE contents and paste into the instructions field
4. Click Save

### Step 3: Upload Knowledge Files
1. In your project, click **"Add knowledge"**
2. Upload these 2 files:
   - `docs/brand-guidelines.md` — full brand kit reference (colors, fonts, templates, specs)
   - `docs/content-calendar.md` — first 14 days of content with captions
3. These files give Claude persistent context about your brand so you don't have to re-explain every session

### Step 4: Upload Brand Assets
1. Still in "Add knowledge", upload:
   - `brand-kit/logo/tqh-logo-wordmark-optionC.svg`
   - `brand-kit/profile-pic/tqh-pfp-square-1080.png`
2. Now Claude can reference these when designing new assets

### Step 5: Test It
Start a new conversation inside the project and say:

> "Generate the Day 1 carousel: '5 things nobody tells you about affiliate marketing.' 7 slides — cover, 5 content slides, CTA. Export as a React artifact I can screenshot."

Claude should produce on-brand content with the correct colors, fonts, and layout without you specifying any of it — because the project instructions handle it.

---

## Part 2: Create the GitHub Repository

### Option A: GitHub Desktop (Easiest)
1. Open GitHub Desktop
2. File → New Repository
3. Name: `the-quiet-hustle`
4. Local path: wherever you keep projects
5. Click "Create Repository"
6. Copy ALL the contents of the `tqh-github/` folder into your new repo folder
7. In GitHub Desktop, commit: "Initial brand kit + project structure"
8. Click "Publish repository" (set to Private)

### Option B: Command Line
```bash
# Navigate to where you want the repo
cd ~/Projects

# Clone or init
mkdir the-quiet-hustle
cd the-quiet-hustle
git init

# Copy the contents of tqh-github/ into this folder
# (the folder you downloaded from Claude)

git add .
git commit -m "Initial brand kit + project structure"

# Create repo on GitHub first, then:
git remote add origin https://github.com/YOUR-USERNAME/the-quiet-hustle.git
git branch -M main
git push -u origin main
```

### Recommended: Set to Private
This repo contains your brand strategy and content plan. Keep it private.

---

## Part 3: Daily Workflow

### Creating Content (Sunday Batch Session)
1. Open the **Claude Project** (The Quiet Hustle)
2. Pull up this week's posts from the **Notion Content Calendar**
3. For each post, prompt Claude:

   **For carousels:**
   > "Generate the carousel for Day X: '[post title]'. [slide count] slides. Use the caption from the content calendar."

   **For static quotes:**
   > "Generate the static quote graphic: '[quote text]'"

   **For Reel overlays:**
   > "Generate the Reel text overlay frame for: '[hook text]'"

   **For comparisons:**
   > "Generate the Do This Not That post: [3 comparison pairs]"

4. Screenshot or export each artifact
5. Save to `content/week-XX/` in your repo
6. Copy finals to `exports/instagram/` by format

### Editing Reels
1. Download Reel overlay frame from Claude
2. Open CapCut
3. Import stock footage (Pexels — search: laptop, coffee, city, workspace)
4. Layer the text overlay frame on top
5. Add ambient/lo-fi audio
6. Export 1080x1920 MP4

### Scheduling
1. Open Meta Business Suite
2. Upload the week's content
3. Add captions (copy from Notion Content Calendar)
4. Schedule: one post per day, 11AM-1PM your local time
5. Update Notion status: Not Started → In Progress → Done

### After Posting
1. Engage 20 min: reply to comments, comment on 5 niche accounts
2. Update Notion with performance notes at end of week
3. Git commit: `git add . && git commit -m "Week XX content"`

---

## Quick Prompts for the Claude Project

Copy-paste these as needed:

**Generate a full carousel:**
> Generate the full carousel for: "[TITLE]". [X] slides total — cover slide, [Y] content slides, CTA slide. Use brand kit specs. Make it a React artifact I can screenshot at 1080x1350.

**Generate a static quote:**
> Generate a 1:1 static quote graphic: "[QUOTE TEXT]". Use the quote template from the brand kit.

**Generate a Reel text overlay:**
> Generate the Reel text overlay frame for: "[HOOK LINE]" with accent line: "[SECOND LINE]". 1080x1920, dark glass card style.

**Generate a Do This Not That:**
> Generate a comparison post with these 3 pairs:
> ✕ [bad thing 1] → ✓ [good thing 1]
> ✕ [bad thing 2] → ✓ [good thing 2]
> ✕ [bad thing 3] → ✓ [good thing 3]

**Batch request:**
> Generate all 7 posts for Week [X]. Here are the titles and formats: [paste from Notion]. Produce each as a separate artifact.
