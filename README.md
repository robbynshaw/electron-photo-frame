# electron-photo-frame

A simple, desktop photo frame for displaying a random slideshow.

> NOTE: This is extremely beta. I just wanted this for myself, so
> quickly spun something together.

## Current Supported Repositories

* Google Photos (Picasa Web API)

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/robbynshaw/electron-photo-frame.git
# Go into the repository
cd electron-quick-start
# Install dependencies
npm install
```
The configuration is currently hardcoded, so you will need to edit
the first couple lines of ```main.js``` with your google user id
and the length of time the photos should be displayed.

```javascript
// Google User ID
const userID = '105272298552335144033'
// 5 minute display time
const interval = 5 * 60 * 1000
```

```bash
# Run the app
npm start
```

#### License [MIT](LICENSE.md)
