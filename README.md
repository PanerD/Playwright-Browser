
# Playwright Browser Automation Project

This repository contains a project for browser automation using Playwright and Electron. The project allows you to interact with web pages and perform automated tasks within a customized browser environment.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Packaging](#packaging)
- [Features](#features)
- [License](#license)

## Installation

1. Install NVM (Node Version Manager):
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    ```

2. Set up NVM environment:
    ```bash
    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    ```

3. Install Node.js using NVM:
    ```bash
    nvm install node
    ```

4. Update npm to the latest version:
    ```bash
    npm install -g npm
    ```

5. Install Playwright:
    ```bash
    npx install playwright
    ```

6. Run the application:
    ```bash
    npx electron .
    ```

## Packaging

To package the application for distribution:

1. Package for Windows (64-bit):
    ```bash
    electron-packager . ClickCloak --platform=win32 --arch=x64
    ```

## Features

To use the software, simply run the executable and you will be greeted by the GUI. You can optionally select a URL to visit (defaults to google.com if you don't specify one), set a custom userAgent, locale, or timezone, and click "Browse". You may now use this as any other browser, with protection happening in the background.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
