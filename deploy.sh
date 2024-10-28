#!/usr/bin/env sh
set -e
npm run build
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:TimSpan/MyNeteaseMusic.git master:gh-pages
# git push origin master:gh-pages: 将本地的 master 分支推送到远程的 gh-pages
cd -