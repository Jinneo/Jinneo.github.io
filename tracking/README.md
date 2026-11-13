# Project click tracking

Prepared but disabled until the backend and Google Sheet integration are configured. GitHub Pages continues to serve the website. No IP lookup service is called by visitors' browsers.

1. In the target Google Sheet, open **Extensions > Apps Script** and paste `google-apps-script/Code.gs`. It writes only to a new `Project clicks` tab.
2. Generate a random secret locally (`openssl rand -hex 32`). In Apps Script **Project Settings > Script properties**, save it as `TRACKING_SECRET`. Never commit the secret.
3. Deploy the script as a **Web app**, executing as you, accessible to **Anyone**. Copy the `/exec` deployment URL. The endpoint validates the secret before writing.
4. Deploy the `backend` folder to Vercel (no framework or build command). Set server environment variables `SHEETS_WEB_APP_URL` to the `/exec` URL and `TRACKING_SECRET` to the same secret. Redeploy after setting variables. `PORTFOLIO_ORIGIN` defaults to `https://praveensriramvadlamani.github.io`.
5. Set the URL in `tracking-config.js` to `https://YOUR-PROJECT.vercel.app/api/projects`, then publish the website files. Do not put the secret in the browser configuration.
6. Open the published homepage and click View Projects. Confirm navigation and a timestamp/IP row in the Sheet. Clicks from the same IP within a minute may be deduplicated. Confirm a direct request without the correct Origin is rejected and requests without the Apps Script secret cannot write.

The page displays an IP collection notice when tracking is configured. Share the Sheet only with people who should see visitors' IP addresses. No names, device fingerprints, URLs, or user agents are recorded. The public endpoint is analytics, not authenticated evidence of a person or a human click; bots can mimic requests. Set hosting rate limits before exposing it to heavy traffic. Cache deduplication is best effort.

Vercel must directly receive the request so its `x-vercel-forwarded-for` header represents the client network. IPs can belong to VPNs, proxies, or shared networks. Browser blockers, offline requests, hosting outages, or denied requests can prevent logging; links still open normally.

This Node backend is separate from the static site and does not run on GitHub Pages. No changes to the existing local static server are required.
