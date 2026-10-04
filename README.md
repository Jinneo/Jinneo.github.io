# Praveen's portfolio

A responsive personal website based on `create.txt`. Run with Node 18 or later:

```sh
npm run dev
```

Open http://localhost:3000. No install or build step is required. Deploy the static files (`index.html`, `styles.css`, `app.js`, and your assets) to any static host.

## Add your content

Edit the `portfolio` object at the top of `app.js` with verified GitHub and LinkedIn URLs, a resume PDF path, and a `mailto:` contact URL. Add each project's description, stack, URL, and MP4/WebM path. Videos replace the concept artwork and play silently when visible. Reduced motion disables automatic playback.

Update the experience and about copy in `index.html` with your actual role, contributions, technologies, and skills. The current project artwork is original CSS concept art, not a screenshot of the products. Unconfigured resume, profile, and contact links stay hidden until configured. LifeQuest links directly to its published EquityPlay game on itch.io.

The plan suggests Next.js, but this first version uses HTML, CSS, and JavaScript to keep the initial site dependency-free. It includes a text-focused hero, persistent light/dark themes, responsive layouts, and reduced motion support for project videos. Fonts use Google Fonts with system fallbacks.

Validate JavaScript with `npm run check`.
