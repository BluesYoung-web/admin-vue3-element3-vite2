/*
 * @Author: zhangyang
 * @Date: 2021-03-22 11:44:01
 * @LastEditTime: 2021-03-22 11:52:47
 * @Description: 时间处理
 */
export function formatDate(number: number, format: string) {

  const formateArr  = ['Y','M','D','h','m','s'];
  const returnArr   = [];

  const date = new Date(number);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (const i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i] + '');
  }
  return format;
}

//数据转化
function formatNumber(n: number) {
  let temp = n.toString()
  return temp[1] ? temp : '0' + temp;
}