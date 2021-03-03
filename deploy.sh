#! usr/bin/env sh
# 发生错误时，终止脚本
set -e
# 进入构建目录
cd dist
git config --global user.eamil "15171255945@163.com"
git config --global user.name "BluesYoung-web"
git init
git add -A
git commit -m "deploy"
# 推送到指定目录
git push -f https://443b8baebb8a012ffb24c59c536ef79a@gitee.com:BluseYoung-web/admin-management.git master
# 返回上层目录
cd -