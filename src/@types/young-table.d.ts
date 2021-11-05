/*
 * @Author: zhangyang
 * @Date: 2021-03-01 17:07:01
 * @LastEditTime: 2021-11-05 17:53:29
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
} & Record<string, any>
interface MultiRowItem {
  before?: unknown;
  value: unknown;
  after?: unknown;
}
