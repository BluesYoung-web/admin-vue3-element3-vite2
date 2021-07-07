/*
 * @Author: zhangyang
 * @Date: 2021-07-06 15:08:23
 * @LastEditTime: 2021-07-07 12:13:43
 * @Description: 配合表格组件的导出方法
 */
import { export_json_to_excel } from './export2excel';
import { formatCurrency } from './numFormat';

/**
 * 提取HTML标签包含的文字
 * @param {string} htmlText 包含 HTML 标签的字符串
 */
const tagReplace = (htmlText: string) => {
  let reg = /<\/?.+?\/?>/g;
  if (reg.test(htmlText)) {
    return htmlText.replace(reg, '');
  } else {
    return htmlText;
  }
};

/**
 * 导出数据格式化
 * @param {Array} filterVal 表头字段（用于获取对应的数据）
 * @param {Array} jsonData 表数据
 */
const formatJson = (filterVal: any[], jsonData: any[]): any[] => {
  return jsonData.map((v) => {
    return filterVal.map((j) => {
      if (!(v[j] instanceof Array)) {
        return tagReplace(v[j]);
      }
      const arr = [];
      for (const iterator of v[j]) {
        if (j.indexOf('imgs') === 0) {
          arr.push(iterator);
        } else {
          arr.push(`${iterator.before || ''}${iterator.value}${iterator.after || ''}`);
        }
      }
      return arr.join('\n');
    });
  });
};
interface ExportParams {
  filename: string;
  tableHead: any[];
  tableData: any[];
};
export const youngExport = ({ filename, tableHead, tableData }: ExportParams, sumText?: string, operate?: (txt: string, data: any[]) => any[]) => {
  const header = tableHead.map((item) => item.label);
  const filter = tableHead.map((item) => item.prop);
  let data = formatJson(filter, tableData);
  if (sumText) {
    if (operate) {
      data = operate(sumText, data);
    } else {
      const arr = [sumText];
      const len = data[0].length;
      for (let i = 1; i < len; i++) {
        let sum = 0;
        if (tableHead[i].not_sum) {
          arr[i] = 'N/A';
          continue;
        }
        for (const item of data) {
          item[i] = item[i].replaceAll(',', '');
          sum += parseFloat(item[i]) || 0;
        }
        if (!Number.isNaN(sum)) {
          arr[i] = sum + '';
        } else {
          arr[i] = '';
        }
        if (tableHead[i].separator) {
          arr[i] = formatCurrency(arr[i]);
        }
      }
      data.push(arr);
    }
  }
  export_json_to_excel({
    header,
    data,
    filename
  });
};
