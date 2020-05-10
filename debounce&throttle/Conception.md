# 概念

## 浏览器缓存实现
> 强缓存、协商缓存缓存

![一图流](https://ss.csdn.net/p?https://mmbiz.qpic.cn/mmbiz_png/MQ4FoG1HmnLE29ZX1qrTDOcE9C6LicTINYMfXicU43eubKHVaxiaP58dKFdKBOrOf8ZqUngSUoo0rcqZBicHejL7NQ/640?wx_fmt=png)

[概念0](https://juejin.im/entry/5ad86c16f265da505a77dca4)

[概念1](https://blog.csdn.net/tTU1EvLDeLFq5btqiK/article/details/89037445)

[概念2](https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651226262&idx=1&sn=2128db200b88479face67ed8e095757c&chksm=bd4959128a3ed0041b43a5683c75c4b88c7d35fac909a59c14b4e9fc11e8d408680b171d2706&scene=21#wechat_redirect)

[概念3](https://www.haorooms.com/post/qianduan_cache_bushu)

[概念3](https://www.jianshu.com/p/9c95db596df5)

## 节流防抖

**问题**：想要执行持续触发的事件（resize、scroll、mousemove），但有些时候不希望在事件持续触发的过程中那么频繁地去执行函数，有**节流**和**防抖**两个方法


### 防抖

> 所谓防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。

+ **立即执行**(true)触发事件后函数会立即执行，然后 n 秒内不触发事件才能继续执行函数的效果。
+ **延后执行**(false)触发事件后函数不会立即执行而是在 n 秒后执行，如果又触发了事件则会重新计算函数执行时间

```javascript
function debounce(fn, wait, imm) {
  //fn-执行函数  wait-等待多久后无反应才执行该函数 imm-立即执行还是延后执行
  let timeOut;
  //timeOut是一个不会随着function调用而重新从头初始化的值

  //让调用的事件等于一个返回的函数
  return function () {
    //改变此函数作用域
    let thisContext = this;
    //传入这个函数有可能获得的参数
    let args = arguments;
    //再一次触发，取消所有即将调用的计时器 timeOut是计时器id
    clearTimeout(timeOut);
    if (imm) {
      //判断现在是调用过fn还是没有
      console.log(timeOut);
      let now = !timeOut;
      //给其赋值表明在此阶段已经调用过，得到id
      timeOut = setTimeout(() => {
        //这个阶段过去后清空timeOut进入下一次调用
        timeOut = null;
      }, wait);
      //如果没有调用过则进行调用
      if (now) {
        fn.apply(thisContext, args);
      }
    } else {
      // 更新计时器及其id
      timeOut = setTimeout(function () {
        fn.apply(thisContext, args);
      }, wait);
    }
  };
}

```

*****
### 防抖

> 所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数，稀释函数的执行频率

+ **时间戳版**(1)函数触发是在时间段内开始的时候
+ **定时器版**(0)函数触发是在时间段内结束的时候

```javascript
function throttle(fn,wait,type){
  //type0-计时器，延后执行
  //type1-时间戳，立即执行
  let past=0;
  let timeOut;
  return function(){

    //参数
    let thisContext=this;
    let args=arguments;

    if(type===1){
      //时间戳
      // 获取当前时间
      let now= Date.now();
      // 判断间隔，若间隔在wait以外则执行函数并更新时间戳
      if(now-past>wait){
        fn.apply(thisContext,args);
        past=now;
      }
    }else if(type===0){
      // 计时器
      // 判断计时器是否生效
      if(!timeOut){
        // 不生效则设置计时器
        timeOut=setTimeout(()=>{
          // 计时器延后运行函数并将把timeOut设置成不生效模式
          fn.apply(thisContext,args);
          timeOut=null;
        },wait);
      }
    }

  }
}
```


## 小结
