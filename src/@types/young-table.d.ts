/*
 * @Author: zhangyang
 * @Date: 2021-03-01 17:07:01
 * @LastEditTime: 2021-03-24 17:56:49
 * @Description: 自定义表格组件
 */
declare enum TableHeadAligin { 'left', 'center', 'right' }

interface TableHeadItem {
  prop: string;
  label: string;
  width?: string;
  sortable?: boolean;
  fixed?: boolean;
  aligin?: TableHeadAligin;
  show_all?: boolean;
  tool_content?: string;
}

interface TableDataItem {
  [prop: string]: string | string[] | MultiRows[] | number;
}
interface MultiRows {
  before?: unknown;
  value: unknown;
  after?: unknown;
}