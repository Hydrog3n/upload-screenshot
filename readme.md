# Upload screenshot

For Mac OS X app for upload your screen on multiple image hosting (chevereto, imgur, zupmage, noelshack).

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
pm2 install upload-screenshot
```

### Change Default settings

You has the settings in settings.json
Your images is uploaded on http://pix.hydrog3n.fr without API key. 
Change your screen directory on setting.js by default is /Users/hydrog3n/Pictures
```bash
cd ~/.pm2/node_modules/upload-screenshot
cp settings.json.default settings.json
vim settings.json
pm2 restart upload-screenshot
```

# BUGS 

I test my app on Mac OS X (10.10.4). 
Please if you use an others OS add a new issue with your OS. 