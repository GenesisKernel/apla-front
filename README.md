[![Throughput Graph](https://graphs.waffle.io/GenesisKernel/genesis-front/throughput.svg)](https://waffle.io/GenesisKernel/genesis-front/metrics/throughput)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Build Status](https://travis-ci.org/GenesisKernel/genesis-front.svg?branch=master)](https://travis-ci.org/GenesisKernel/genesis-front)
[![](https://tokei.rs/b1/github/GenesisKernel/genesis-front)](https://github.com/GenesisKernel/genesis-front)
![](https://reposs.herokuapp.com/?path=GenesisKernel/genesis-front&style=flat)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/GenesisKernel?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)


## Genesis-front
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You will find most of the information of how to use it there.

----------

## Installation
Project requires [Node.js](https://nodejs.org/) v6+ to run.

We use [yarn](https://yarnpkg.com/en/docs/install) as a package manager, so you will need to install yarn as well. Please refer to the instructions for your operating system.

Install the dependencies and devDependencies and start the server.

```bash
$ yarn install
$ yarn start
```

Start script will launch the development server which binds to http://127.0.0.1:7079 by default. You can also use start-desktop to debug the project in desktop environment

API binding can be customized to the value of your choice. Simply create a settings.json in your public directory. Example settings.json.dist is included in /public directory

### Example configuration

```json
{
    "fullNodes": [
        "http://127.0.0.1:7079"
    ]
}
```

Development server emits warnings and will report errors in readable format. You can hack around it, but it is suited only for development/testing. To use it in production environment you will need to build the project.

----------

## Build
Install the dependencies if you not did it already:
```bash
$ yarn install
```

Create your settings.json configuration file and build the project

### Example

```bash
$ yarn build
```

After building, redistributable files will be placed to the '/build' directory. You can serve it with any web-server of your choice. Settings file must be also placed there

----------

## Building desktop application
Install the dependencies if you not did it already:
```bash
$ yarn install
```

Create your settings.json configuration file and build the project

### Example

```bash
$ yarn build-desktop
```

When build process finishes you will need to package your application using "release". You will also need to specify "--publish never" so your project will not be published to github

Platforms can be specified with the combination of m/w/l arguments, where "m" stands for macOS, "w" for windows and "l" for linux

### Example

```bash
$ yarn release --publish never -mwl
```
Will release desktop applications for macOS, windows and linux

----------

### Questions?

Feel free to contact us if you experience any kind of problems while using Genesis: hello@genesis.space
