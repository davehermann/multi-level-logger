#!/usr/bin/env sh

# abort on errors
set -e

# clean the existing files
rm -r docs/assets
rm -r docs/generated
rm -r docs/*.html

# build
npm run docs:build

# copy to the docs root
mv docs/src/.vuepress/dist/** docs

# clean up
rm -r docs/src/.vuepress/dist
