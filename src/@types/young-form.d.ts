/*
 * @Author: zhangyang
 * @Date: 2021-09-29 11:02:56
 * @LastEditTime: 2021-09-29 16:38:26
 * @Description: 自定义表单相关
 */

type Form_Item_Type =
  | 'check-box'
  | 'radio'
  | 'date-picker'
  | 'input'
  | 'input-number'
  | 'switch'
  | 'select'
  | 'slot';

type CommonRecord = Record<string, any>;

type Form_Item_Attr = {
  label?: string | number | boolean;
  placeholder?: string;
  type?: string;
  min?: number;
  max?: number;
  disabled?: boolean;

  activeColor?: string;
  inactiveColor?: string;
  activeValue?: string | number | boolean;
  inactiveValue?: string | number | boolean;

  options?: {
    label: string | number | boolean;
    content?: string;
  }[];

  controls?: boolean;
  step?: number;
  stepStrictly?: boolean;
  controlsPosition?: string;

} & CommonRecord;

type Form_Schema_item<T extends any = string> = {
  type: Form_Item_Type;
  label: string;
  prop: T extends string ? string : keyof T;
  rules?: import("element-plus/es/components/form/src/form.type").FormItemRule[];
  attrs?: Form_Item_Attr;
}
