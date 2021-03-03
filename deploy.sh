#! usr/bin/env sh
###
 # @Author: zhangyang
 # @Date: 2021-03-03 16:23:04
 # @LastEditTime: 2021-03-03 17:26:56
 # @Description: 
### 
# 发生错误时，终止脚本
set -e
# 进入构建目录
cd dist
git config --gloabl user.eamil "15171255945@163.com"
git config --gloabl user.name "BluesYoung-web"
git init
git add -A
git commit -m "deploy"
# 推送到指定目录
git push -f https://443b8baebb8a012ffb24c59c536ef79a@gitee.com:BluseYoung-web/admin-management.git master
# 返回上层目录
cd -