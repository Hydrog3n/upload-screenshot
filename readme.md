# Upload screenshot

Multi OS app for upload your screen on a chevereto hosting (if API enable).
You can use with my image hosting. 

# Requirements

- nodejs (> 0.11 )

### Installing nodejs with [nvm](https://github.com/creationix/nvm)

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.25.4/install.sh | bash
nvm install 0.12 #nvm ls-remote to see available versions
nvm alias default 0.12
```

## Install

### As a pm2 module

```bash
npm i pm2 -g
```
### Get sources 

```bash
git clone https://github.com/Hydrog3n/upload-screenshot.git
cd upload-screenshot
```

### Change Default settings

You has the settings in settings.json
Your images is uploaded on http://pix.hydrog3n.fr without API key. 
Change your screen directory on setting.js by default is /Users/loic/Screenshots
```bash
vim settings.json
```

### START 
```bash
npm install
pm2 start app.js
```