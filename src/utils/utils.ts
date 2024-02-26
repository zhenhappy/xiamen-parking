export const isWeChat = () => /(MicroMessenger)/i.test(navigator.userAgent);

export const isWeChatDevTools = () => /(wechatdevtools)/i.test(navigator.userAgent);

export const isAndroid = () => /(android)/i.test(navigator.userAgent);

export const isIOS = () => /iPad|iPhone|iPod/i.test(navigator.userAgent);

export const isWeb = () => !isAndroid() && !isIOS();

export default {
  isWeChat,
  isWeChatDevTools,
  isAndroid,
  isIOS,
  isWeb,
};
