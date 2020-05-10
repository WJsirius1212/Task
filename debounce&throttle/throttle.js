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
