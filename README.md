# Zain El — Portfolio V2

A new standalone portfolio that brings marketing strategy, creative production, business growth, web development and digital product building together. It is a static HTML/CSS/JavaScript website, designed for GitHub Pages and relative paths. No build command, Node.js installation, database, paid backend or API key is needed.

## Preview locally

Extract this ZIP. Open `index.html` in your browser. Alternatively, serve the folder locally (if Python is installed):

```sh
python -m http.server 8000
```

Visit `http://localhost:8000`. The local content and UniRide simulation are self-contained; Google Fonts, the original external stock image, video playback and the contact form require internet access.

## Publish as a new GitHub repository (do not modify the existing one)

1. Create a **new public** repository, for example `portfolio-v2`. Do not select the old portfolio repository. Do not initialise it with a README if using the Git instructions below.
2. Extract the ZIP and upload the **contents** of the extracted directory (not the ZIP, and not its enclosing directory). `index.html`, `assets/`, both original PDFs and the remaining files must be at the repository root. Commit to `main`. GitHub's web uploader may omit dotfiles, so confirm `.nojekyll` is present or create an empty file with that name if needed.
3. Open the new repository's Settings > Pages. Under Build and deployment, choose Deploy from a branch. Choose `main` and `/ (root)`, then Save.
4. Use the exact preview URL shown in Settings > Pages when deployment succeeds. Check that the preview loads correctly on your phone and computer, and test the form and all original video links.
5. Leave the existing repo, its custom-domain setting, CNAME and DNS unchanged. This ZIP deliberately has **no CNAME file**, so it does not claim the old domain. Do not transfer the custom domain until you have approved the new site.

Optional Git commands, run inside the extracted directory (replace YOUR-USERNAME):

```sh
git init -b main
git add .
git commit -m "Launch Zain El portfolio v2"
git remote add origin https://github.com/YOUR-USERNAME/portfolio-v2.git
git push -u origin main
```

### Optional domain switch / rollback (only after approval)

The existing portfolio remains your rollback version. First record the existing repository, domain settings and DNS records. GitHub Pages normally associates a custom domain with only one Pages site at a time: when ready, remove the domain association from the old Pages site and configure it in the new repository's Pages settings, checking GitHub's DNS guidance and HTTPS status. Keep a copy of the old CNAME. If you decide to roll back, reverse the domain association and restore the prior configuration/DNS if it was changed. Domain reassignment and HTTPS provisioning can take time, so rollback is not necessarily instantaneous. No domain transfer or DNS changes have been made by this package.

## What's in the project

- `index.html`: all site content, semantic structure, case studies, video links and portfolio copy.
- `assets/css/site.css`: responsive dark navy / blue / gold design, layouts and accessibility styles.
- `assets/js/site.js`: menu, navigation state, case-study dialogs, on-demand video embeds, image fallback and interactive UniRide concept.
- `assets/images/`: optimized WebP versions of source photography and visual assets, plus favicon.
- `assets/original/`: all nine original image files, byte-for-byte preserved.
- Both original PDF documents at their original relative root paths, byte-for-byte preserved.

## Review before going live

- The professional history, qualifications and campaign claims are drawn from the supplied portfolio; confirm the dates, current availability, contact details and performance data are still appropriate to publish. Resume and marketing PDF are unchanged.
- UniRide's demonstration is a four-step browser-only simulation using illustrative data and UI, not the live Telegram Mini App. No booking, actual driver, payment or network request is involved. The development section also showcases this portfolio itself. Update project copy or add genuine screenshots/links once approved for public release.
- Video IDs match the previous site: YouTube `a2gbUd_HnYs`; Vimeo `1162882459`, `1162882510`, `1162882621`. The original videos are externally hosted. The new design loads players on demand; if embedding is restricted, the modal links to the original provider.
- The original Unsplash URL is retained, with a local image fallback if it cannot load. Google fonts have system-font fallbacks.
- The contact form retains the previous FormSubmit recipient and uses standard form validation and a honeypot. External email delivery, confirmation/activation, and any provider CAPTCHA must be checked on the published preview. The site also offers direct email, phone and WhatsApp links. No test message was submitted.
- No live analytics, new backend, payments, AI chatbot or client portal is configured. The site is intentionally static for fast deployment and ease of rollback.

## Local QA performed

Static file/anchor checks; original-image and PDF byte comparison; JavaScript syntax check. In-memory Chromium checks (the execution environment blocks direct local HTTP/file browser navigation) passed at 320x740, 375x812, 390x844, 430x932, 768x1024, 1024x768 and 1440x1000: no horizontal page overflow, local image decoding, mobile menu where applicable, four case study dialogs, four video embed URLs/dialog cleanup, UniRide demo/reset, and native form validation. The run did not finish the 1920px case within its time limit. Third-party network resources were unavailable. Real iOS Safari, macOS Safari, other physical devices, actual video playback, form delivery and final GitHub Pages deployment have not been verified. The supplied screenshots are local Chromium renders using system-font fallbacks.
Published using Github Pages.
