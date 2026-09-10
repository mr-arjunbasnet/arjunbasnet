# ClipStack — release flow into this site

Source project: `/Users/arjunbasnet/Makura /Clipboard`. The page is
`src/app/product/clipstack/`, copy in `src/content/clipstack/`, and every
file the page links or the app polls is static under
`public/product/clipstack/`:

```
appcast.json              update feed — served with Cache-Control: no-cache
ClipStack-<v>.zip         what installed apps download (Ed25519-signed; sha256 + length in the feed)
ClipStack-<v>.dmg/.pkg    versioned installers — immutable, a year
ClipStack.dmg / .pkg      "latest" aliases the page links — must-revalidate
```

The feed URL baked into every installed copy (`Resources/Info.plist`,
`ClipStackUpdateFeedURL`) is `https://arjun-basnet.com.np/product/clipstack/appcast.json`.
**Keep that path forever.** (The ClipStack `site/README.md` shows it with a
doubled `/product/product/` — that is a typo in the README; the plist is the
truth.)

Headers live in `next.config.ts` `headers()`, not `vercel.json`. One
deliberate departure from the brief: the un-versioned "latest" aliases are
*not* immutable — they are overwritten under the same name each release, and
a year-long cache would hand returning visitors the previous build.

## Publishing a release

```bash
# in the ClipStack project
scripts/release.sh 1.2.0                                   # → build/release/
# in this site
cp "/Users/arjunbasnet/Makura /Clipboard/build/release/"* public/product/clipstack/
npm run build                                              # route table: /api/contact still the only ƒ
git add public/product/clipstack && git commit -m "ClipStack 1.2.0" && git push
# verify
curl -sI https://arjun-basnet.com.np/product/clipstack/appcast.json | grep -iE 'HTTP|cache-control|content-type'
curl -sI https://arjun-basnet.com.np/product/clipstack/ClipStack-1.2.0.zip | grep -iE 'HTTP|content-length|content-disposition'
```

Cloudflare sits in front: if `appcast.json` ever shows a cache hit, add a
Cache Rule → Bypass for that path, or purge that one URL after each release.

## Leads

Both forms post to `/api/contact` with `type: "clipstack-download"` or
`type: "clipstack-request"`, so the site keeps a single dynamic route.
Downloads never wait on the lead call (4 s race). No autoresponder is sent
for either — the download form promises the address is used only for a
release note if the box is ticked.
