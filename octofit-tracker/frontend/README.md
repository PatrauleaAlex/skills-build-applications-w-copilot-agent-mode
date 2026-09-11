# Octofit Tracker frontend

Set `VITE_CODESPACE_NAME` before running the app in GitHub Codespaces so the presentation tier can call the API on port 8000.

Example `.env.local`:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is defined, the frontend calls:

`https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`

If `VITE_CODESPACE_NAME` is unset, the app falls back to `${window.location.origin}/api/[component]/` to avoid invalid `https://undefined-8000...` URLs.
