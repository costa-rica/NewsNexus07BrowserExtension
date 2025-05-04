# NewsNexus07BrowserExtension

This is for Chrome mainly

- for firefox see [NewsNexusBrowserExtension01Firefox](https://github.com/costa-rica/NewsNexusBrowserExtension01Firefox)

## install in Firefox

1. go to `about:debugging` in browser
2. click on `This Firefox`
3. click on `Load Temporary Add-on`
4. select the `manifest.json` file

## install in Chrome

1. go to `chrome://extensions/` in browser
2. click on `Load unpacked`
3. select the `dist` folder

## .env

```
VITE_API_BASE_URL=http://localhost:3000
VITE_API_BASE_URL_SERVER=https://api.news-nexus-dev.kineticmetrics.com
VITE_ENVIRONMENT=development
```

## installations

```

npm install react react-dom
npm install --save-dev vite
npm install --save-dev @vitejs/plugin-react
```

## Folder Structure

```
.
├── README.md
├── dist
│   ├── assets
│   │   └── popup-DjBzPxyW.js
│   ├── background.js
│   ├── manifest.json
│   └── src
│       └── popup
├── package-lock.json
├── package.json
├── public
│   ├── background.js
│   └── manifest.json
├── popup
│   ├── Popup.jsx
│   ├── index.html
│   └── main.jsx
└── vite.config.js
```

## Adding Icons

### single

```json
"action": {
  "default_popup": "popup/index.html",
  "default_icon": "icon.png"
},
"icons": {
  "48": "icon.png"
}
```

### multiple

```json
"action": {
  "default_popup": "popup/index.html",
  "default_icon": {
    "16": "icons/icon-16.png",
    "32": "icons/icon-32.png",
    "48": "icons/icon-48.png",
    "128": "icons/icon-128.png"
  }
},
"icons": {
  "16": "icons/icon-16.png",
  "32": "icons/icon-32.png",
  "48": "icons/icon-48.png",
  "128": "icons/icon-128.png"
}
```
