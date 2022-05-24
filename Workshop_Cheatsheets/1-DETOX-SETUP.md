# Detox Setup

## Install Detox Command Line Tools

```sh
npm install -g detox-cli
```
## Install applesimutils

A collection of utils for Apple simulators, Detox uses it to query and communicate with the simulator.

```sh
brew tap wix/brew
brew install applesimutils
```

## Add Detox to your project

```sh
npm install detox --save-dev
```

## Add jest

```sh
npm install -D "jest@>=27.2.5"
```

## Init Detox

```sh
detox init -r jest
```
