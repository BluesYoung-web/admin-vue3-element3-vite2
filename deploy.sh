#! usr/bin/env sh
# 发生错误时，终止脚本
set -e
# 进入构建目录
cd dist
git config --global user.email $Email
git config --global user.name $USER
git init
git add -A
git commit -m "deploy"
# 推送到指定目录
git push -f https://${$GITHUB_TOKEN}@github.com:BluesYoung-web/BluesYoung-web.github.io.git master:matser
# 返回上层目录
cd -
echo '哎哟不错哦'