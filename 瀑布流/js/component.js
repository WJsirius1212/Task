// function lazyLoading(node){
//   // 穿入一个节点（img），进行加载
//   //<img src="" data-src="?" alt="">
//   let attributeName='data-src';
//   let src=node.getAttribute(attributeName);
//   node.setAttribute('src',src);
//   node.removeAttribute(attributeName);
// }

function comparingShortest(Height){
  let min=Math.min(...Height);
  let id=Height.indexOf(min);
  return id;
}

function getColumns(){
  let windowWidth =  document.body.clientWidth;
  return Math.floor((windowWidth*0.9)/300)
}

function setColumns(col){
  for(let i=0;i<col;i++){
    let node=document.createElement('div');
    node.setAttribute('id',i);   
    document.getElementById('Masonry').appendChild(node);
  }
}

function getImg(k){
  // 单纯生成随机图片，没有别的用处
  // template
  // let height='{{height}}';
  // let width='{{width}}'
  // let n='{{n}}'
  // let template='<img src="http://picsum.photos/{{height}}/{{width}}?random={{n}}">';
  // let random=Math.floor(Math.random()*100);
  // template=template.replace(height,((random-Math.floor(Math.random()*10))*8));
  // template=template.replace(width,(random)*10);
  // template=template.replace(n,Math.floor(Math.random()*10));
  // // newnode
  let template='<img src="./img/img ({{k}}).jpg">';
  template=template.replace('{{k}}',k)
  let node=document.createElement('div');
  node.setAttribute('class','item');
  node.innerHTML=template;  
  console.log(node.offsetHeight);
  return node;
}

//方便添加
function putImg(){
  let parentNode=document.getElementById('store');
  for(let i=1;i<17;i++){
    let template='<img src="./img/img ({{i}}).jpg">';
    template=template.replace('{{i}}',i)
    let node=document.createElement('div');
    node.setAttribute('class','item');
    node.innerHTML=template;  
    parentNode.appendChild(node);
  }
}

function throttle(fn,wait){
  //type1-时间戳，立即执行
  let past=0;
  return function(){

    //参数
    let thisContext=this;
    let args=arguments;

      //时间戳
      // 获取当前时间
      let now= Date.now();
      // 判断间隔，若间隔在wait以外则执行函数并更新时间戳
      if(now-past>wait){
        fn.apply(thisContext,args);
        past=now;

  }
}
}

function layoutCol(){
  let col=getColumns();
  let Height=new Array(col);
  // Height 初始化
  for(let i=0;i<col;i++){
    Height[i]=0;
  }
  setColumns(col);
  return Height;
}


function layoutImg(Height){
  let Img=document.getElementsByClassName('item');
  for(let i=0;i<Img.length;i++){
    console.log('I='+i);
    let id=comparingShortest(Height);
    // console.log(id);
    let parentNode=document.getElementById(id);
    // console.log(Img[i].offsetHeight);
    Height[id]+=Img[i].offsetHeight;
    let picNode=Img[i];
    // console.log(picNode);
    // node + pic
    // picNode.removeChild();
    // picNode.parentNode.removeChild();
    parentNode.appendChild(picNode);
    // console.log(...Height);
  }
}


function layout(){
  let Height=layoutCol();
  layoutImg(Height);
}

function store(){
  let Img=document.querySelectorAll('div.item');
  let parentNode=document.getElementById('store');
  console.log(Img.length)
  for(let i=0;i<Img.length;i++){
    // console.log(Img[i]);
    parentNode.appendChild(Img[i]);

  }
  let masonry=document.getElementById('Masonry');
  while(masonry.childNodes[0]){
    masonry.removeChild(masonry.childNodes[0]);
  }
}
function reset(){
  store();
  layout();
}