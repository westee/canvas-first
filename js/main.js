
// window.alert("这是一个画 板");
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

setCanvasSize()

drawAnderaser()

/***************************             哈哈哈                ********************************/
context.lineWidth = 2
//保存图片
download.onclick = function(){
  var url = canvas.toDataURL('image/png')
  //HTMLCanvasElement.toDataURL() 方法返回一个包含图片展示的 data URI 
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = '这是默认名字'
  //HTMLAnchorElement.download属性是DOMString表示该链接的资源是为了下载而不是在浏览器中显示。
  //该值表示文件的建议名称
  a.click()
}
//清屏
clear.onclick = function(){
  context.clearRect(0,0,canvas.width,canvas.height)
  //设置指定矩形区域内（以 点 (x, y) 为起点，范围是(width, height) ）所有像素变成透明，
  //并擦除之前绘制的所有内容。
}
//改变画笔粗细
thin.onclick = function(){
  context.lineWidth = 4
}
thick.onclick = function(){
  context.lineWidth =8
}
//改变画笔颜色
let color = {one:'rgb(221, 81, 69)',
             black:'black',
             red:'red',
             blue:'blue',
             green:'green',
             two:'rgb(255, 205, 66)',
             three:'rgb(26, 165, 95)',
             foru:"rgb(75, 140, 244)"
            }
$('#color').on('click','li',(e)=>{
  let current = (e.target.id)
  context.strokeStyle = color[current]
  $(e.currentTarget).addClass('active')
  $(e.currentTarget).siblings().removeClass('active')
})


function drawAnderaser() {
  var painting = false
  var lastPoint = { x: undefined, y: undefined }
  if ('ontouchstart' in document.body) {
    //触摸设备
    canvas.ontouchstart = function (a) {
      var x = a.touches[0].clientX
      var y = a.touches[0].clientY
      eraserUsing = true
      if (eraserEnable) {
        eraser(x, y)
      } else {
        painting = true
        lastPoint = { x: x, y: y }
        drawCircle(x, y, context.lineWidth/2.2)
      }
    }

    canvas.ontouchmove = function (b) {
      var x = b.touches[0].clientX
      var y = b.touches[0].clientY
      if (eraserEnable && eraserUsing) {
        eraser(x, y)
      } else {
        if (painting) {
          var newPoint = { x: x, y: y }
          drawCircle(x, y, context.lineWidth/2.2)
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
          lastPoint = newPoint
        }
      }
    }
    canvas.ontouchend = function (c) {
      painting = false
      eraserUsing = false
    }

    var eraserEnable = false
    var eraserUsing = false
    eraserr.onclick = function () {     //onclick兼容mouse和touch
      // brush = false
      eraserEnable = true
      eraserr.classList.add('active')
      brush.classList.remove('active')
    }
    brush.onclick = function () {
      eraserEnable = false
      // brush = true
      brush.classList.add('active')
      eraserr.classList.remove('active')
    }
  } else {
    //鼠标设备
    canvas.onmousedown = function (a) {
      var x = a.clientX
      var y = a.clientY
      eraserUsing = true
      if (eraserEnable) {
        eraser(x, y)
      } else {
        painting = true
        lastPoint = { x: x, y: y }
        drawCircle(x, y, context.lineWidth/2)
      }
    }

    canvas.onmousemove = function (b) {
      var x = b.clientX
      var y = b.clientY
      if (eraserEnable && eraserUsing) {
        eraser(x, y)
      } else {
        if (painting) {
          var newPoint = { x: x, y: y }
          drawCircle(x, y, context.lineWidth/2.2)
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
          lastPoint = newPoint
        }
      }
    }
    canvas.onmouseup = function (c) {
      painting = false
      eraserUsing = false
    }

    var eraserEnable = false
    var eraserUsing = false
    eraserr.onclick = function () {
      eraserEnable = true
      eraserr.classList.add('active')
      brush.classList.remove("active")

    }
    brush.onclick = function () {
      eraserEnable = false
      brush.classList.add('active')
      eraserr.classList.remove('active')
    }
  }
}
//设置宽高
function setCanvasSize() {
  function getSize() {
    var pageWidth = document.documentElement.clientWidth        //获得屏幕页面的宽高  ie还不支持
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
  getSize()
  //如果屏幕大小改变  就重新获取屏幕尺寸
  window.onresize = function () {
    getSize()
  }
}
//画圆  
function drawCircle(x, y, radius) {
  context.beginPath()
  context.fillStyle = context.strokeStyle
  context.arc(x, y, radius, 0, Math.PI * 2.2)
  context.fill()
}
//画线
function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1)     //起点
  context.lineWidth = context.lineWidth
  context.strokeStyle = context.strokeStyle
  context.lineTo(x2, y2)     //终点
  context.stroke()
  // context.closePath()
}

//橡皮
function eraser(x, y) {
  context.clearRect(x - 3, y - 3, 10, 10)
}
