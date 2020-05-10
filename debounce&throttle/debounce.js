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
