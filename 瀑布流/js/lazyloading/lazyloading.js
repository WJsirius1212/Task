function loading(node){
  // 穿入一个节点（img），进行加载
  //<img src="" data-src="?" alt="">
    let attributeName='data-src';
    let src=node.getAttribute(attributeName);
    console.log(src);
    node.setAttribute('src',src);
    node.removeAttribute(attributeName);
    node.removeAttribute('lazyloading');
}


function lazyloading(){
  let scrollTop=document.documentElement.scrollTop;
  let nodes=document.querySelectorAll('img[lazyloading]');
  let windowHeight=document.documentElement.clientHeight;
  let scrollHeight=document.documentElement.scrollHeight;
  // console.log(1);
  if(scrollTop+windowHeight>0.5*scrollHeight){
    console.log(2);
    loading(nodes[0]);
  }


}

document.addEventListener('scroll',lazyloading);

let nodes=document.querySelectorAll('img[lazyloading]');
for(let i=0;i<3;i++){
  loading(nodes[i]);
}
