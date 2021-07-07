#!/usr/bin/env node
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const shell = require('shelljs');


/**
 * 页面基础路径
 */
const basePath = path.join(__dirname, '../src/views');
/**
 * 切换到页面所在目录
 */
shell.cd(basePath);
/**
 * 过滤固定路由
 */
const dirs = fs.readdirSync('./')
  .filter((temp) => !['404.vue', 'dashboard', 'login'].includes(temp))
  .filter((temp) => fs.statSync(temp).isDirectory());

/**
 * 生成页面模板
 */
const getPageTemplate = (title, author) => {
  const moment = require('moment');
  moment.locale('zh-cn');
  const time = moment().format('YYYY-MM-DD kk:mm:ss');
  return`<!--
 * @Author: ${author}
 * @Date: ${time}
 * @LastEditTime: ${time}
 * @Description: ${title}
-->
<template>
  <h1>${ title }</h1>
</template>
<script lang="ts" setup>

</script>
`;
};
/**
 * 保证文件名全局唯一
 * @param {*} file_name
 */
const checkName = (file_name) => {
  const json_path = path.join(__dirname, '../src/route/pages.json');
  let jsonData = {};
  try {
    jsonData = require(json_path);
  } catch (error) {
    null;
  }
  /**
   * 获取现有的所有名称
   */
  const namesArr = Object.values(jsonData).map((v) => Object.values(v).map((k) => k.name)).flat();
  return namesArr.includes(file_name);
};
/**
 * 生成单页面文件
 * @param {*} file_name 文件名
 * @param {*} content 文件内容
 */
const generatePageFile = async (file_name, content) => {
  while (checkName(file_name)) {
    // 文件名重复，需要重新输入
    const { name } = await inquirer.prompt([
      {
        name: 'name',
        type: 'input',
        message: '文件名重复，请重新输入！',
        validate: (val) => {
          if (val.trim() !== '') {
            return true;
          }
          return '请勿输入空字符串！！！';
        }
      }
    ]);
    file_name = name;
  }
  fs.writeFileSync(`${file_name}.vue`, content);
  console.log('---单页面文件已生成---');
};
/**
 * 生成路由配置文件
 * @param {*} dir 目录
 * @param {*} route_path 路由路径
 * @param {*} name 唯一名称
 * @param {*} file_path 文件真实路径
 * @param {*} title 文件标题
 */
const generatePagesJSON = (dir, name, title) => {
  const json_path = path.join(__dirname, '../src/route/pages.json');
  let jsonData = {};
  try {
    jsonData = require(json_path);
  } catch (error) {
    null;
  }
  if (!Array.isArray(jsonData[dir])) {
    jsonData[dir] = [];
  }
  jsonData[dir].push({ name, title });
  fs.writeFileSync(json_path, JSON.stringify(jsonData));
  console.log('---路由配置已生成---');
};
/**
 * 命令行交互
 */
inquirer.prompt([
  {
    name: 'dir',
    type: 'list',
    message: '请选择页面所属目录',
    choices: [...dirs, 'mkdir   ->   新建目录'],
    filter: (val) => {
      return val.match(/\w+/)[0];
    }
  },
  {
    name: 'dir_name',
    type: 'input',
    message: '请输入合法的目录名，尽量简单易懂：',
    when: ({ dir }) => dir === 'mkdir',
    validate: (val) => {
      if (val.trim() !== '') {
        return true;
      }
      return '请勿输入空字符串！！！';
    }
  },
  {
    name: 'file_name',
    type: 'input',
    message: '请输入文件名(全局唯一)，无需后缀：',
    validate: (val) => {
      if (val.trim() !== '') {
        return true;
      }
      return '请勿输入空字符串！！！';
    }
  },
  {
    name: 'author',
    type: 'input',
    message: '请输入作者：',
    validate: (val) => {
      if (val.trim() !== '') {
        return true;
      }
      return '请勿输入空字符串！！！';
    }
  },
  {
    name: 'title',
    type: 'input',
    message: '请输入页面标题：',
    validate: (val) => {
      if (val.trim() !== '') {
        return true;
      }
      return '请勿输入空字符串！！！';
    }
  }
]).then(async (answer) => {
  let { dir, dir_name, file_name, author, title } = answer;
  if (dir === 'mkdir') {
    dir = dir_name;
    fs.mkdirSync(dir);
  }
  shell.cd(dir);
  const templateText = getPageTemplate(title, author);
  // 生成单页面文件
  await generatePageFile(file_name, templateText);
  // 生成路由配置
  generatePagesJSON(dir, file_name, title);
  console.log('请打开`/src/route/navMap.ts`添加节点映射');
});
