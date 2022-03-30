/**
 * 生成二维码的方法
 */
import QRCode from 'qrcodejs2'
export function createQRCode(el, url, width, height) {
  el.innerHTML = ''
  return new QRCode(el, {
    text: url,
    width: width || 100,
    height: height || 100,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  })
}
