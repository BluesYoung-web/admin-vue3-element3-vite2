/*
 * @Author: zhangyang
 * @Date: 2021-07-06 14:22:37
 * @LastEditTime: 2021-07-07 11:55:39
 * @Description: 文件导出为 Excel
 */
import { saveAs } from 'file-saver';
import XLSX from 'xlsx';
import deepClone from './deepClone';

function sheet_from_array_of_arrays(data: any[]) {
  const ws: any = {};
  const range = {
    s: {
      c: 10000000,
      r: 10000000
    },
    e: {
      c: 0,
      r: 0
    }
  };
  for (let R = 0; R != data.length; ++R) {
    for (let C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      const cell: any = {
        v: data[R][C]
      };
      if (cell.v == null) continue;
      const cell_ref = XLSX.utils.encode_cell({
        c: C,
        r: R
      });

      if (typeof cell.v === 'number') {
        cell.t = 'n';
      } else if (typeof cell.v === 'boolean') {
        cell.t = 'b';
      } else {
        cell.t = 's'
      };
      ws[cell_ref] = cell;
    }
  }
  if (range.s.c < 10000000) {
    ws['!ref'] = XLSX.utils.encode_range(range);
  }
  return ws;
};

class Workbook {
  public SheetNames: string[] = [];
  public Sheets: { [prop: string]: any } = {};
};

const s2ab = (s: string) => {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; ++i) {
    view[i] = s.charCodeAt(i) & 0xFF;
  }
  return buf;
};
interface ExportParams {
  filename: string;
  data: any[];
  header: any[];
};

export const export_json_to_excel = ({
  header,
  data,
  filename,
}: ExportParams) => {
  data = deepClone(data);
  data.unshift(header);
  const ws_name = "SheetJS";
  const wb = new Workbook();
  const ws = sheet_from_array_of_arrays(data);
  /*设置worksheet每列的最大宽度*/
  const colWidth: any[] = data.map((row) => {
    return row.map((val: any) => {
      /*先判断是否为null/undefined*/
      if (val == null) {
        return {
          'wch': 10
        };
      }
      /*再判断是否为中文*/
      else if (val.toString().charCodeAt(0) > 255) {
        return {
          'wch': val.toString().length * 2
        };
      } else {
        return {
          'wch': val.toString().length
        };
      }
    });
  });
  /*以第一行为初始值*/
  let result = colWidth[0];
  for (let i = 1; i < colWidth.length; i++) {
    for (let j = 0; j < colWidth[i].length; j++) {
      if (result[j]['wch'] < colWidth[i][j]['wch']) {
        result[j]['wch'] = colWidth[i][j]['wch'];
      }
    }
  }
  ws['!cols'] = result;

  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  const wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  });
  saveAs(new Blob([s2ab(wbout)], {
    type: "application/octet-stream"
  }), `${filename}.xlsx`);
};
