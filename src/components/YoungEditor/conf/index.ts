/*
 * @Author: zhangyang
 * @Date: 2021-03-05 13:41:16
 * @LastEditTime: 2021-07-05 16:25:46
 * @Description: 富文本编辑器的基本配置
 */
import { ElMessage } from 'element-plus';
import { EmotionsType } from 'wangeditor/dist/config/menus';

type DicType = {
  [key: string]: string;
};
type CustomUpload = (files: FileList, insertImgCbk: Function) => void;
// class 仅为保持编辑器不报错，效果同 interface
export class CommonConfig {
  height?: number;
  zIndex?: number;
  placeholder?: string;
  // 是否自动聚焦
  focus?: boolean;
  customAlert?: Function;
  // 表情
  emotions?: EmotionsType[];
  languageTab?: string;
  onchangeTimeout?: number;
  onchange?: Function | null;
  onfocus?: Function;
  onblur?: Function;
  // 粘贴是否删除样式
  pasteFilterStyle?: boolean;
  // 粘贴是否忽略图片
  pasteIgnoreImg?: boolean;
  linkImgCallback?: Function;
  onlineVideoCallback?: Function;
  pasteTextHandle?: Function;
  // 图片上传接口地址
  uploadImgServer?: string;
  // 上传图片是否为 base64，与上面的不共存
  uploadImgShowBase64?: boolean;
  // 图片大小限制
  uploadImgMaxSize?: number;
  // 图片类型
  uploadImgAccept?: string[];
  // 可同时上传的图片数量
  uploadImgMaxLength?: number;
  // 上传方法的参数
  uploadImgParams?: DicType;
  // 是否以 get 方式传参
  uploadImgParamsWithUrl?: boolean;
  // 文件名
  uploadFileName?: string;
  // 自定义请求头
  uploadImgHeaders?: DicType;
  // 上传图片的回调函数
  uploadImgHooks?: Function;
  // 自定义上传图片
  customUploadImg?: CustomUpload | null;
}


const EditorConfig: CommonConfig = {
  height: 600,
  zIndex: 9,
  placeholder: '',
  focus: true,
  languageTab: '  ',
  onchangeTimeout: 500,
  pasteFilterStyle: false,
  pasteIgnoreImg: true,
  uploadImgMaxSize: 5 * 1024 * 1024,
  uploadImgAccept: ['jpg', 'jpeg', 'png', 'gif', 'bmp'],
  customAlert: (s: string, t: string) => {
    switch (t) {
      case 'success':
        ElMessage.success(s)
        break
      case 'info':
        ElMessage.info(s)
        break
      case 'warning':
        ElMessage.warning(s)
        break
      case 'error':
        ElMessage.error(s)
        break
      default:
        ElMessage.info(s)
        break
    }
  },
  onchange: (html: string) => {
    // console.log(html);
  },
  linkImgCallback: (src: string, alt: string, href: string) => {
    // 插入图片的回调函数
  },
  onlineVideoCallback: (video: string) => {
    // console.log('插入视频内容', video)
  },
  pasteTextHandle: (str: string) => {
    // 从 Word 文档里面复制粘贴，临时处理，可能存在 bug
    const moreEnd = `div.Section0{page:Section0;}`;
    const index = str.indexOf(moreEnd) + moreEnd.length;
    let useFulStr = str.substr(index);
    // const toBeUploadImgs = new Set();
    // const originImgsMap = new Map();
    // for (const [_, inner] of useFulStr.matchAll(/<img src="(.*?)"/g)) {
    //   toBeUploadImgs.add(inner);
    //   // originImgsMap.set(inner, )
    //   // 可以获取到 file:/// ，但是无法直接读取文件
    // }
    return useFulStr;
  },
  uploadImgShowBase64: true

}

export default EditorConfig;
