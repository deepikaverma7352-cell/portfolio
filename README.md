# Deepika Verma – Portfolio Website

A responsive personal portfolio built with plain HTML5, CSS3 and vanilla JavaScript.
No build step and no libraries, so it runs directly on GitHub Pages.

## Folder structure

```
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   │   ├── profile.jpg      <- your photo
│   │   └── project1.jpg     <- ADD THIS (project screenshot)
│   └── documents/
│       └── resume.pdf       <- your resume
└── README.md
```

## Before you publish: things to fill in

1. **LinkedIn link** – in `index.html`, search for `TODO: replace "#" with your LinkedIn profile URL`
   (it appears twice: hero section and contact section) and put your URL in the `href`.
2. **GitHub link** – do the same for `TODO: replace "#" with your GitHub profile URL` (twice).
   Until you add them, these two links stay hidden automatically.
3. **Project image** – save a screenshot of your AI Resume Builder as `assets/images/project1.jpg`.
   Until then, a coloured placeholder with the project name is shown.
4. **Resume** – to update it, replace `assets/documents/resume.pdf` with a new file of the same name.
5. **Photo** – to change it, replace `assets/images/profile.jpg`.

## How to update content

All content is in `index.html`. Each section has a comment explaining how to add items:

- **Education / Training / Certifications / Projects** – copy one existing block and edit the text.
- **Skills** – add or remove an `<li>` inside the relevant skill card.
- **Hidden empty sections** – if you delete every item from a section, that section and its menu link
  are hidden automatically.
- **Colours** – change the variables at the top of `css/style.css` (`--accent`, `--accent-2`, etc.).

## Publish on GitHub Pages

1. Create a new repository on GitHub (for example `portfolio`, or `<your-username>.github.io`).
2. Upload **the contents of this folder** (so `index.html` is at the top level of the repository).
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select the `main` branch and the `/ (root)` folder, then **Save**.
5. After a minute or two your site will be live at `https://<your-username>.github.io/<repository-name>/`.

## Run locally

Just double-click `index.html` to open it in your browser.

## Features

- Light and dark theme toggle (remembers your choice)
- Mobile-friendly menu, smooth scrolling and subtle scroll animations
- Project card hover effects
- Download Resume button
- Working email, phone, LinkedIn and GitHub links
