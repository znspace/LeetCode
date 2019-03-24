#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 进入生成的文件夹
cd docs/.vuepress/dist

npm run docs:build
git init
git add -A
git push -f git@github.com:ZNspace/LeetCode.git.git master:gh-pages

cd -