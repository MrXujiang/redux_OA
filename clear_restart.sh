#!/bin/bash
rm -rf node_modules
npm cache verify
yarn
yarn start
