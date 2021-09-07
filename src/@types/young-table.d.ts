/*
 * @Author: zhangyang
 * @Date: 2021-03-01 17:07:01
 * @LastEditTime: 2021-09-07 16:57:05
 * @Description: 自定义表格组件
 */
type TableHeadAligin = 'left' | 'center' | 'right' | undefined;
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
interface MultiRowItem {
  before?: unknown;
  value: unknown;
  after?: unknown;
}
