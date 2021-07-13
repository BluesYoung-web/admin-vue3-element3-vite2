/*
 * @Author: zhangyang
 * @Date: 2021-07-13 16:45:30
 * @LastEditTime: 2021-07-13 16:48:10
 * @Description: console.log 美化
 */
const _consoleLog = window.console.log;
window.console.log = function() {
  if(arguments.length ===1 && typeof arguments[0] !== "object") {
    const iconList=["🌏","🌛","🌟","🔥","🐦","👿","🎃","🎊","🎋","🎁","🍀","🌷","🌱","🍁","🌸","🍃","🌿","🍒","🍎","🍊","🍓","🍍","🍇"]
    const colorList=[
      "background-color:#8BC34A;color:white",
      "background-color:#42b983;color:white",
      "background-color:#33A5FF;color:white",
      "background-color:orange;color:white",
      "background-color:#2EAFB0;color:white",
      "background-color:#6EC1C2;color:white",
      "background-color:#FFDD4D;color:black",
      "background-color:#7F2B82;color:white",
      "background-color:#4b4b4b;color:white",
      "background-color:#E41A6A;color:white"
    ];
    const idx1 = Math.floor(Math.random() * iconList.length);
    const idx2 = Math.floor(Math.random() * colorList.length);
    let msg = arguments[0];
    msg = "%c " + iconList[idx1] + " " + msg;
    _consoleLog(msg, "font-size:20pt;" + colorList[idx2]);
  }else{
    _consoleLog.apply(this, arguments);
  }
}
