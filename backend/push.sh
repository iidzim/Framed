#!/bin/bash
cd $PWD
rm -rf node_modules/ dist/
git checkout backend
git add .
git commit -am “$commitMessage”
git push