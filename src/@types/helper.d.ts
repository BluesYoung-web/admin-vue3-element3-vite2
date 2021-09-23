/*
 * @Author: zhangyang
 * @Date: 2021-09-23 16:03:53
 * @LastEditTime: 2021-09-23 16:52:12
 * @Description: 工具函数(类型)
 */
type Simplify<T> = {
  [P in keyof T]: T[P]
};
/**
 * 设置可选属性
 * T 接口
 * K 属性(联合类型)
 */
type SetOptional<T, K extends keyof T> =
  Simplify<
    // 将要设置为可选类型的结构取出并设置为可选
    Partial<Pick<T, K>>
    // 取并集
    &
    // 排除需要设置为可选属性的结构，其余的保持不变
    Pick<T, Exclude<keyof T, K>>
  >;

/**
 * 设置必选属性
 * T 接口
 * K 属性(联合类型)
 */
 type setRequired<T, K extends keyof T> =
 Simplify<
   // 将要设置为可选类型的结构取出并设置为必选
   Required<Pick<T, K>>
   // 取并集
   &
   // 排除需要设置为可选属性的结构，其余的保持不变
   Pick<T, Exclude<keyof T, K>>
 >;

/**
 * 筛选特定类型的属性
 * T 接口
 * K 要筛选的属性的类型
 */
type ConditionalPick<T, K> = {
  // 当属性值为 K 的子集时，保留改属性，否则去除
  [P in keyof T as (T[P] extends K ? P : never)]: T[P]
}

/**
 * 为已有函数类型增加指定类型的参数
 * T 函数类型
 * A 参数类型
 */
type AppendArgument<F, A> =
  F extends (...args: infer Args) => infer Return
    ? (x: A, ...args: Args) => Return
    : never;

/**
 * 数组(元组)扁平化
 */
type NaiveFlat<T extends any[]> = {
  // 如果值为数组(元组)，则使用数组(元组)内部的值，否则直接使用该值
  [P in keyof T]: T[P] extends any[] ? T[P][number] : T[P];
}[number];

/**
 * 严格类型(不一致直接报错)
 * T1 接口
 * T2 属性(联合类型)
 */
type Exclusive<T1, T2 extends T1> = {
  // 除了之前传入类型的属性，其余全部为 never
  [K in keyof T2]: K extends keyof T1 ? T2[K] : never
};

/**
 * 确保数组(元组)非空
 * T 类型
 */
type NotEmpty<T> = [T, ...T[]];

/**
 * 使用指定分隔符拼接字符串数组(元组)
 * Arr 数组(元组)
 * Separator 分隔符
 */
type JoinStrArray<Arr extends string[], Separator extends string> =
 Arr extends [infer A, ...infer B]
 ? `${A extends string ? A : ''}${B extends [string, ...string[]] ? `${Separator}${JoinStrArray<B, Separator>}`: ''}`
 : '';

/**
 * 对于字符串字面量类型进行去空格处理
 */
type TrimLeft<V extends string> = V extends ` ${infer R}` ? TrimLeft<R> : V;
type TrimRight<V extends string> = V extends `${infer R} ` ? TrimRight<R> : V;

type Trim<V extends string> = TrimLeft<TrimRight<V>>;

/**
 * 比较两个类型是否相等
 */
type IsEqual<A, B> = A extends B ? (B extends A ? true: false): false;

/**
 * 获取数组(元组)第一个元素的类型
 */
type Head<T extends any[]> = T extends [infer H, ...infer R] ? H : never;

/**
 * 获取数组(元组)除第一个元素之外的剩余元素
 */
type Tail<T extends any[]> = T extends [infer H, ...infer R] ? R : [];

/**
 * Unshift
 */
type Unshift<T extends any[], E> = [E, ...T];

/**
 * Shift
 */
type Shift<T extends any[]> = T extends [infer F, ...infer R] ? R : [];

/**
 * Push
 */
type Push<T extends any[], E> = [...T, E];

/**
 * Includes
 */
type Includes<T extends any[], E> =
  // 使用 infer 解构
  T extends [first: infer F, ...args: infer R]
    // 判断是否相等，不相等则递归调用直至最后一个元素
    ? IsEqual<F, E> extends true
      ? true
      : Includes<R, E>
    : false;

/**
 * 联合类型转交叉类型
 */
/**
 * 将联合类型转为对应的交叉函数类型
 * @template U 联合类型
 */
 type UnionToInterFunction<U> = (U extends any ? (k: () => U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

/**
 * 获取联合类型中的最后一个类型
 * @template U 联合类型
 */
type GetUnionLast<U> = UnionToInterFunction<U> extends { (): infer A } ? A : never;

/**
 * 在元组类型中前置插入一个新的类型（元素）；
 * @template Tuple 元组类型
 * @template E 新的类型
 */
type Prepend<Tuple extends any[], E> = [E, ...Tuple];

/**
 * 联合类型转元组类型；
 * @template Union 联合类型
 * @template T 初始元组类型
 * @template Last 传入联合类型中的最后一个类型（元素），自动生成，内部使用
 */
type UnionToTuple<Union, T extends any[] = [], Last = GetUnionLast<Union>> = {
  0: T;
  1: UnionToTuple<Exclude<Union, Last>, Prepend<T, Last>>;
}[[Union] extends [never] ? 0 : 1];

type TupleToIntersection<T extends any[]> = T extends [infer F, ...infer U]
  ? U extends []
    ? F
    : F & TupleToIntersection<U>
  : never;
// @ts-ignore 堆栈深度过高
type UnionToIntersection<U> = TupleToIntersection<UnionToTuple<U>>;


/**
 * 获取对象类型中所有的可选属性
 */
type OptionalKeys<T> = NonNullable<{
  [key in keyof T]: undefined extends T[key] ? key : never;
}[keyof T]>;

type FirstAsArray<T extends any[]> =
T extends [...infer A, infer B, infer C]
  ? A extends []
    ? T extends [...infer A, infer B] ? A : never
    : T extends [...infer A, infer B] ? FirstAsArray<A> : never
  : T;

/**
 * 函数类型柯里化
 */
type Curry<
  F extends (...args: any[]) => any,
  P extends any[] = Parameters<F>,
  R = ReturnType<F>
> = P extends [infer A, infer B, ...infer C]
  ? P extends [infer A, ...infer B]
    ? Curry<F, FirstAsArray<P>, Curry<F, B, R>>
    : never
  : (...args: P) => R;

/**
 * Merge
 * F2 优先级高于 F1
 */
type Merge<F1, F2> = {
  [K in keyof (F1 & F2)]:
    K extends keyof F2
      ? F2[K]
      : K extends keyof F1
        ? F1[K]
        : never;
};

/**
 * 至少包含一个给定的属性
 */
type RequireAtLeastOne<
 ObjectType,
 KeysType extends keyof ObjectType = keyof ObjectType,
> = KeysType extends unknown ? ObjectType & {[K in KeysType]-?: ObjectType[K]}: never;

/**
 * 移除索引签名
 */
type RemoveIndexSignature<T> = {
  [
    k in keyof T as (
      string extends k
        ? never
        : number extends k
          ? never
          :k
    )
  ]: T[k];
};

/**
 * 移除部分属性的 readonly 修饰符
 * 默认全部移除
 */
type Mutable<T, Keys extends keyof T = keyof T> = {
  // 默认去除全部属性的 readonly 修饰符
  -readonly [k in Keys]: T[k];
  // 其余属性保持不变
} & Pick<T, Exclude<keyof T, Keys>>;

/**
 * 判断是否为联合类型
 */
type IsUnion<T, U = T> = T extends U ? ([U] extends [T] ? false : true) : never;

/**
 * 判断是否为 never
 */
type IsNever<T> = [T] extends [never] ? true : false;

/**
 * 数组(元组)翻转
 */
type Reverse<
  T extends Array<any>,
  R extends Array<any> = []
> =
   // 获取首元素
   Head<T> extends never
   // 递归结束，返回翻转后的目标数组(元组)
   ? R
   // 不为 never 则递归将源数组(元组)里面的元素转移到目标数组(元组)
   : Reverse<Tail<T>, Unshift<R, Head<T>>>;

/**
 * 字符串分割
 */
type Split<
  S extends string,
  Delimiter extends string
> = S extends `${infer First}${Delimiter}${infer Rest}` ? [First, ...Split<Rest, Delimiter>] : [S];


type Str2Tuple<S extends string> =
  // 尝试使用 `[]` 分割
  S extends `${infer First}[${infer Second}]`
    ? [First, Second]
    : [S];
/**
 * 属性访问转数组(元组)
 */
type ToPath<S extends string> =
  // 首先以 `.` 分割
  S extends `${infer A}.${infer R}`
    ? [...Str2Tuple<A>, ...ToPath<R>]
    : [S];
/**
 * 链式调用进行类型扩展，实现动态类型推导
 */
type Chainable<T = {}> = {
  // S extends string can make S is Template Literal Types
  option<V, S extends string>(key: S, value: V): Chainable<T & {
    // use Key Remapping in Mapped Types generate {  S: V } type
    // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#key-remapping-in-mapped-types
    [P in keyof {
      S: S,
    } as `${S}`]: V
  }>
  get(): Simplify<T>
}
/**
 * Repeat
 */
type Repeat<
  T,
  C extends number,
  R extends Array<any> = []
> =
  // 返回数组的长度等于给定值，结束递归
  R['length'] extends C ? R : Repeat<T, C, Push<R, T>>;

/**
 * RepeatString
 */
type RepeatString<
  T extends string,
  C extends number,
  R extends string = '',
  A extends any[] = [],
> =
  // 利用数组的长度来控制递归的次数
  A['length'] extends C
  ? R
  : (RepeatString<T, C, `${R}${T}`, Push<A, T>>);

/**
 * 数字字符串转数字
 */
type ToNumber<
  T extends string,
  S extends any[] = [],
  L extends number = S['length']
> =
  // 数值过大时会导致递归次数过多从而报错
  `${L}` extends T ? L : ToNumber<T, [...S, 1]>
