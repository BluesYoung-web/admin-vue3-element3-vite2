/*
 * @Author: zhangyang
 * @Date: 2020-08-14 10:59:06
 * @LastEditTime: 2021-10-15 11:41:23
 * @Description: 处理数值
 */

/**
 * 加入财务分隔符
 */
export const formatCurrency = (num: string | number) => {
  if (num) {
    num = num.toString().replace(/\$|\,/g, '');
    if (num === '' || isNaN(+num)) {
      return 'Not a Number !';
    }
    const sign = num.indexOf('-') > 0 ? '-' : '';
    let cents = num.indexOf('.') > 0 ? num.substr(num.indexOf('.')) : '';
    cents = cents.length > 1 ? cents : '';
    num = num.indexOf('.') > 0 ? num.substring(0, (num.indexOf('.'))) : num;
    if (cents === '') {
      if (num.length > 1 && num.substr(0, 1) === '0') {
        return 'Not a Number !';
      }
    } else {
      if (num.length > 1 && num.substr(0, 1) === '0') {
        return 'Not a Number !';
      }
    }
    for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
      num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
    }
    return (sign + num + cents);
  } else {
    return '0';
  }
};
/**
 * 手机号隐藏中间4位
 */
export const telMasaike = (str: string | number, mid = '****') => {
  str = String(str);
  const start = str.substring(0, 3);
  const end = str.substring(7, 11);
  return start + mid + end;
};
/**
 * 姓名隐藏中间值
 */
export const nameMasaike = (str: string, mid = '*') => {
  const len = str.length;
  if (len <= 2) {
    return str[0] + mid;
  } else {
    return str[0] + mid + str[len - 1];
  }
};
/**
 * 身份证号隐藏出生年月日
 */
export const idMasaike = (str: string, mid = '********') => {
  return `${str.substr(0, 6)}${mid}${str.substr(-4)}`;
}
