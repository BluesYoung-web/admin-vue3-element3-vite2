/*
 * @Author: zhangyang
 * @Date: 2021-07-29 19:34:25
 * @LastEditTime: 2021-08-27 09:32:47
 * @Description: 子组件
 */

export default defineComponent({
  name: 'SubItem',
  props: {
    icon: { type: String, default: '' },
    title: { type: String, default: '' }
  },
  setup(props) {
    return () => (
      <>
        <i class={ props.icon ? 'el-icon-' + props.icon : '' }></i>
        <span id="title">{ props.title }</span>
      </>
    );
  }
});
