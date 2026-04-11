# Deploying to Hostinger (Shared Hosting)

This document explains step-by-step how to deploy the `TS Custom Screen Printing` frontend (Vite-built static site) to Hostinger Shared Hosting (hPanel / public_html). The app is frontend-only — build artifacts live in the `dist/` folder.

---

## TL;DR

1. Build locally:

```bash
npm install
npm run build
```

2. Upload the *contents* of `dist/` (not the `dist` folder itself) into Hostinger's `public_html/` for your domain.
3. Add a `.htaccess` file in `public_html/` (see example below) so SPA routing rewrites to `index.html`.
4. Install SSL via hPanel and force HTTPS if desired.

---

## Prerequisites

- Local machine with Node.js (18+) and npm.
- Hostinger account with access to hPanel (File Manager or FTP/SFTP credentials).
- Domain configured (or use Hostinger subdomain).

---

## 1) Build the production assets

From the project root:

```bash
npm install
npm run build
```

This creates a `dist/` folder with optimized static assets. Vite automatically copies files from the `public/` folder into `dist/` (for example `public/loop.mp4`, `logo.png`, etc.).

Optional: preview locally:

```bash
npm run preview
# visits http://localhost:5173 by default
```

---

## 2) If deploying to a subfolder (optional)

If you want the site under `https://yourdomain.com/mysite/` you must set Vite's `base`:

Edit `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
export default defineConfig({
  base: '/mysite/',
  // ...
})
```

Then rebuild: `npm run build`.

---

## 3) Create a `.htaccess` for SPA routing (Apache)

Put this file in `public_html/.htaccess` (or the folder you deploy to). It ensures direct routes (e.g. `/quote`) are served by `index.html`.

```apache
# Force HTTPS (optional) — place before rewrite if you want to force HTTPS
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTPS} !=on
  RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>

# SPA rewrite: serve existing files and otherwise rewrite to index.html
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  # If the file or directory exists, serve it
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]
  # Otherwise forward to index.html
  RewriteRule ^ index.html [L,QSA]
</IfModule>

# Optional: enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Optional: caching best-effort
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType image/* "access plus 1 month"
</IfModule>
```

Notes:
- If deploying to a subfolder change `RewriteBase /mysite/`.
- Hostinger will respect `.htaccess` rules on shared Apache hosting.

---

## 4) Upload options

Choose one: File Manager, FTP/SFTP, or Git/CI.

### A) Hostinger File Manager (GUI)

1. Log into hPanel → Files → File Manager.
2. Open `public_html` (or the folder for your domain/subdomain).
3. Upload the *contents* of `dist/` (drag & drop). Do not upload the `dist` folder itself — put the files directly in `public_html`.
4. Upload `.htaccess` to `public_html/`.
5. If you uploaded a zip: right-click → Extract.
6. Ensure `index.html` is at `public_html/index.html`.
7. Test your domain.

### B) FTP / SFTP (recommended for larger projects)

1. Enable FTP/SFTP in hPanel (Hosting → FTP Accounts or SFTP details).
2. Use FileZilla or other client.
   - Host: yourdomain or server IP
   - Protocol: SFTP (if available) or FTP
   - Username / Password: from hPanel
   - Port: 22 for SFTP, 21 for FTP (passive mode)
3. Upload the *contents* of `dist/` into `/public_html/`.
4. Set file permissions: files `644`, folders `755` (usually default).

Example `rsync` (if SSH/rsync enabled):

```bash
rsync -avz --delete dist/ user@server:/home/username/public_html/
```

### C) ZIP upload (quick)

- Create zip of `dist/` contents:
  - macOS / Linux:

    ```bash
    cd dist && zip -r ../site-dist.zip .
    ```

  - Windows (PowerShell):

    ```powershell
    Compress-Archive -Path dist\* -DestinationPath site-dist.zip
    ```

- Upload `site-dist.zip` via File Manager and extract into `public_html`.

---

## 5) Domain, DNS, and SSL

- Point domain A record to Hostinger server IP (in your DNS provider) or use Hostinger's nameservers.
- In hPanel → SSL, install Auto SSL (Let's Encrypt) for your domain.
- Optionally force HTTPS in `.htaccess` (see example earlier).

---

## 6) Post-deploy checks

- Visit `https://yourdomain/` and confirm the site loads.
- Test internal routes (e.g. `/quote`, `/contact`) directly in the address bar.
- Check browser console/network for 404s (missing assets).
- Verify `public/loop.mp4` (if used) is present at `/loop.mp4` within `dist/`.

---

## 7) Common issues & fixes

- Blank page / 404: Ensure `index.html` + assets are in `public_html/` and `.htaccess` is present.
- Resources 404 on subfolder deploy: set `base` in `vite.config.ts` to the subfolder and rebuild.
- Old assets cached: clear CDN or add cache-busting by re-building (Vite hashes assets by default).
- Permissions errors: ensure correct file/folder permissions (644/755).

---

## 8) Optional: Automatic deploy via GitHub Actions (FTP)

Create a GitHub Actions workflow saving FTP credentials in repository Secrets (`FTP_HOST`, `FTP_USERNAME`, `FTP_PASSWORD`). Example:

```yaml
name: Build & Deploy to Hostinger
on:
  push:
    branches: [ main ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Deploy via FTP
        uses: SamKirkland/FTP-Deploy-Action@4.3.0
        with:
          server: ${{ secrets.FTP_HOST }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./dist
          git-ftp-args: --insecure
```

Note: Hostinger supports FTP; for SFTP you can use a different action or configure SSH keys.

---

## 9) Extra tips

- If you need to deploy to a subfolder but keep the app root at the domain, consider using a subdomain instead (e.g. `app.yourdomain.com`) and deploy to its `public_html` equivalently.
- Keep backups or use CI/CD to avoid manual mistakes.

---

If you want, I can:

- Add a small `package.json` script to create a zip for upload.
- Create the `.htaccess` file in the repo as `public/.htaccess` for convenience.
- Add the GitHub Actions workflow file to the repo and configure secrets with instructions.

Tell me which of these you'd like next and I will add it.
