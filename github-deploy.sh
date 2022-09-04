#!/usr/bin/env sh
# 确保脚本抛出遇到的错误
set -e
# 生成静态文件
# npm run build
# 进入生成的文件夹
# cd docs/.vuepress/dist
# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME
git init
git status
git add -A
git commit -m '为了优化结构:删除了五个组件.为了提高网络性能:更改接口并且限制了获取歌曲的数目'
# 如果发布到 https://<USERNAME>.github.io
git push -f git@github.com:TimSpan/MyNeteaseMusic.git master
# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
# git push -f git@gitee.com:timspan/kblog.git master:gh-pages
# git push -f git@e.coding.net:kevin-kk/kblog/kblog.git master
cd -