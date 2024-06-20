1. curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
2. export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
3. [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" 
4. nvm install node
5. npm install -g npm
6. npx install playwright
7. npx electron . (to run)
8. electron-packager . ClickCloak --platform=win32 --arch=x64 (to package)

To use the software simply run the executable, be greeted by the GUI, optionally select a URL to visit
(defaults to google.com if you don't), a custom userAgent, locale or timezone and click "Browse".
You may now use this as any other browser, protection is happening in the background.
