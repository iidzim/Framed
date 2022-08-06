#!/bin/bash
echo “running command from” $PWD
cd $PWD
rm -rf node_modules/ dist/
git checkout backend
git add .
echo “Enter commit message: “
git commit -am “$commitMessage”
git push