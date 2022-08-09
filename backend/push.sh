#!/bin/bash
cd $PWD
rm -rf node_modules/ dist/
git checkout develop
git add .
git commit -m "$1"
git push