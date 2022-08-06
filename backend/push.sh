#!/bin/bash
cd $PWD
rm -rf node_modules/ dist/
git checkout backend
git add .
echo "$commitMessage"
git commit -am “$commitMessage”
git push