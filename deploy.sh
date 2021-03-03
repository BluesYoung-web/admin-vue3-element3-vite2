#! usr/bin/env sh
# 发生错误时，终止脚本
set -e
# 进入构建目录
cd dist
git config --global user.email "15171255945@163.com"
git config --global user.name "BluesYoung-web"
git init
git add -A
git commit -m "deploy"
# 推送到指定目录
git push -f https://0361d677d7add024a0cd2d02548081ddb152073e@github.com/BluesYoung-web/BluesYoung-web.github.io master
# 返回上层目录
cd -