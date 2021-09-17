/*
 * @Author: zhangyang
 * @Date: 2021-07-29 19:34:25
 * @LastEditTime: 2021-09-17 14:10:51
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
        <span id="title">{ props.title }</span>
      </>
    );
  }
});
