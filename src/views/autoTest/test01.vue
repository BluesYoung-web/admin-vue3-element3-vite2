<!--
 * @Author: zhangyang
 * @Date: 2021-07-07 08:25:23
 * @LastEditTime: 2021-10-16 19:54:32
 * @Description: 自动创建页面测试
-->
<template>
  <h1 class="text-center">WebSocket 使用示例</h1>
  <div class="border-solid border-gray-500 p-5 rounded">
    <p
      v-for="(msg, index) in msgList"
      :key="index"
      class="bg-cyan-100 p-4 rounded"
    >{{ msg }}</p>
  </div>
  <div>
    <el-input
      v-model="content"
      type="textarea"
      class="my-2"
      :rows="3"
      placeholder="输入一内容，然后回车，服务器收到之后，会返回你刚才输入的内容"
      @keyup.enter="sendMsg"
    />
    <el-button type="primary" @click="sendMsg">发送消息</el-button>
  </div>
</template>
<script lang="ts" setup>
import { MySocket, MsgConf } from '../../util/youngSocket';
const ws = new MySocket();
const msgList = ref<string[]>([]);
const content = ref('');
const sendMsg = () => {
  const toBeSend: SocketMsg_Send = {
    cbk: '200-0-0',
    data: { com: 200, task: 0, id: 1, params: { msg: content.value } },
    extra: null
  };
  ws.sendMsg({
    msg: toBeSend,
    success: () => console.log('消息发送成功'),
    fail: () => console.log('消息发送失败')
  });
  content.value = '';
};
watchEffect(() => {
  const msg = isJsonStr(ws.data.value) ? JSON.parse(ws.data.value) : {};
  if (msg.data) {
    msgList.value.push(msg.data.msg);
  }
})
</script>
