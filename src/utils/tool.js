//反解析序列化对象，$.param和sirialize()类似的数据
export const unparam = (str) => {
    let dataObj = {};
    if (str !== "") {
        let src = str.indexOf("?") === 0 ? str.substring(1, str.length) : str;
        let arr = src.split('&');
        for (let i = 0; i < arr.length; i++) {
            let arr2 = arr[i].split('=');
            dataObj[arr2[0]] = decodeURIComponent(arr2[1]);
        }
    }
    return dataObj
}

export const getScrollTop = () => {
    var scroll_top = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scroll_top = document.documentElement.scrollTop;
    }
    else if (document.body) {
        scroll_top = document.body.scrollTop;
    }
    return scroll_top;
}

//颜色转换16进制转rgba
export function hex2Rgba(hex, opacity) {
    if (!hex) hex = "#2c4dae";
    return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + (opacity || "1") + ")";
}

// rgb转rgba
export function rgb2rgba(rgb = '', opacity = 1) {
    let rgbValue = rgb.replace(/rgb\((.+)\)/g, '$1');
    return `rgba(${rgbValue}, ${opacity})`
}

export function uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        var r;

        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('');
}

// 查找下一个元素节点的兼容方案
export function getNextNode(el) {
    if (el.nextElementSibling !== undefined) {
        //IE9+,Chrome,firefox..
        return el.nextElementSibling;
    } else {
        var item = el.nextSibling;
        //IE8-
        while (item && item.nodeType != 1) {
            item = item.nextSibling;
        }
        return item;
    }
}

// 截流函数
export function throttle(cb, context) {
    clearTimeout(context.tid);
    context.tid = setTimeout(() => { cb() }, 30);
}

// 模拟请求
export function delay(time) {
  return new Promise(resolve => {
    setInterval(() => {
      resolve()
    }, time * 1000);
  })
}

/**
     * 计算字符串所占的内存字节数，默认使用UTF-8的编码方式计算，也可制定为UTF-16
     * UTF-8 是一种可变长度的 Unicode 编码格式，使用一至四个字节为每个字符编码
     * 
     * 000000 - 00007F(128个代码)      0zzzzzzz(00-7F)                             一个字节
     * 000080 - 0007FF(1920个代码)     110yyyyy(C0-DF) 10zzzzzz(80-BF)             两个字节
     * 000800 - 00D7FF 
       00E000 - 00FFFF(61440个代码)    1110xxxx(E0-EF) 10yyyyyy 10zzzzzz           三个字节
     * 010000 - 10FFFF(1048576个代码)  11110www(F0-F7) 10xxxxxx 10yyyyyy 10zzzzzz  四个字节
     * 
     * 注: Unicode在范围 D800-DFFF 中不存在任何字符
     * {@link http://zh.wikipedia.org/wiki/UTF-8}
     * 
     * UTF-16 大部分使用两个字节编码，编码超出 65535 的使用四个字节
     * 000000 - 00FFFF  两个字节
     * 010000 - 10FFFF  四个字节
     * 
     * {@link http://zh.wikipedia.org/wiki/UTF-16}
     * @param  {String} str 
     * @param  {String} charset utf-8, utf-16
     * @return {Number}
     */
export function calculatedSize(str, charset) {
  let total = 0,
      charCode,
      i,
      len;
  charset = charset ? charset.toLowerCase() : '';
  if(charset === 'utf-16' || charset === 'utf16'){
      for(i = 0, len = str.length; i < len; i++){
          charCode = str.charCodeAt(i);
          if(charCode <= 0xffff){
              total += 2;
          }else{
              total += 4;
          }
      }
  }else{
      for(i = 0, len = str.length; i < len; i++){
          charCode = str.charCodeAt(i);
          if(charCode <= 0x007f) {
              total += 1;
          }else if(charCode <= 0x07ff){
              total += 2;
          }else if(charCode <= 0xffff){
              total += 3;
          }else{
              total += 4;
          }
      }
  }
  return total
}

// 获取浏览器页面编码
export function getCharset() {
  return document.charset || document.characterSet
}

// 大小转换器
export function formatBt(bt = 0) {
    if(bt >= 1024) {
        if(bt % 1024 === 0) {
            if(bt / 1024 % 1024 === 0){
                return bt / 1024 / 1024 + 'M'
            }
            return bt / 1024 + 'k'
        }
        let k = parseInt(bt / 1024, 10)
        if(k >= 1024) {
            let m = parseInt(k / 1024, 10)
            return m + 'M,' + k % 1024 + 'k,' + bt % 1024 + 'b'
        }else {
            return k + 'k,' + bt % 1024 + 'b'
        } 
    }else {
        return bt + 'b'
    }
}
