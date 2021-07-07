/*
 * @Author: zhangyang
 * @Date: 2021-03-01 17:07:01
 * @LastEditTime: 2021-07-07 11:58:27
 * @Description: 自定义表格组件
 */
declare enum TableHeadAligin { 'left', 'center', 'right' }

interface TableHeadItem<T> {
  prop: keyof T;
  label: string;
  width?: string;
  sortable?: boolean;
  fixed?: boolean;
  aligin?: TableHeadAligin;
  show_all?: boolean;
  tool_content?: string;
  not_sum?: boolean;
  separator?: boolean;
  only_export?: boolean;
}

type TableDataItem<T> = {
  [key in keyof T]: T[key];
}
interface MultiRows {
  before?: unknown;
  value: unknown;
  after?: unknown;
}
