# Slow Pour – Vue 3 affiliate site with a Decap CMS admin panel

No backend of your own. The site is static; the admin panel at `/admin` edits the
files in `content/` through GitHub, and Netlify rebuilds the site after every change.

```
content/site.json            site name, text, Amazon tag
content/products/*.json      one file per product (created by the admin panel)
public/admin/config.yml      what the admin panel lets you edit
public/images/uploads/       photos uploaded through the admin panel
```

## One-time setup

1. **Put the project on GitHub.** Create a new repo and push this folder to it.
2. **Edit `public/admin/config.yml`.** Change `repo:` to `your-username/your-repo-name`.
   Commit and push.
3. **Deploy on Netlify.** "Add new site" → "Import an existing project" → pick the repo.
   Build command `npm run build`, publish directory `dist` (already set in `netlify.toml`).
4. **Let the admin log in with GitHub.**
   - In GitHub: Settings → Developer settings → OAuth Apps → New OAuth App.
     Homepage URL: your Netlify site URL. Callback URL: `https://api.netlify.com/auth/done`.
     Copy the Client ID and generate a Client Secret.
   - In Netlify: Site configuration → Access & security → OAuth → Install provider → GitHub.
     Paste the Client ID and Secret. (Menu names can change slightly; search the Netlify
     docs for "OAuth provider" if you cannot find it.)
5. **Open `https://YOUR-SITE.netlify.app/admin/`**, click "Login with GitHub".

Anyone who needs to manage products must have a GitHub account with **write access** to
the repo (Repo → Settings → Collaborators).

## Daily use
Open `/admin/` → Products → New Product → fill in the form → Publish.
The site updates after Netlify finishes rebuilding (about a minute).
To remove a product, open it and choose Delete.

## Try it on your computer first
```bash
npm install
npx decap-server      # terminal 1: local stand-in for GitHub
npm run dev           # terminal 2
```
Visit http://localhost:5173/admin/ . Changes are written straight to the files in
`content/`, no login needed.

## Amazon Associates rules to keep in mind
- Keep the disclosure visible.
- Don't hard-code prices; they go stale and Amazon restricts showing them.
- Only use official Amazon links that include your tag.
- Check your current Associates Operating Agreement for qualifying-sales requirements.
