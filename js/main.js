
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
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = '这是默认名字'
  a.click()
}
//清屏
clear.onclick = function(){
  context.clearRect(0,0,canvas.width,canvas.height)
}
//改变画笔粗细
thin.onclick = function(){
  context.lineWidth = 4
}
thick.onclick = function(){
  context.lineWidth =8
}
//改变画笔颜色
black.onclick = function(){
  context.strokeStyle = 'black'
  black.classList.add('active')
  blue.classList.remove('active')
  green.classList.remove('active')
  red.classList.remove('active')
}
red.onclick = function(){
  context.strokeStyle = 'red'
  red.classList.add('active')
  blue.classList.remove('active')
  green.classList.remove('active')
  black.classList.remove('active')
}
blue.onclick = function(){
  context.strokeStyle = 'blue'
  blue.classList.add('active')
  red.classList.remove('active')
  green.classList.remove('active')
  black.classList.remove('active')
}
green.onclick = function(){
  context.strokeStyle = 'green'
  green.classList.add('active')
  red.classList.remove('active')
  blue.classList.remove('active')
  black.classList.remove('active')

}
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
        drawCircle(x, y, context.lineWidth/2.2)
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
  // console.log(context.fillstyle)
}
//画线
function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1)     //起点
  context.lineWidth = context.lineWidth
  context.strokeStyle = context.strokeStyle
  context.lineTo(x2, y2)     //终点
  context.stroke()
  context.closePath()
}

//橡皮
function eraser(x, y) {
  context.clearRect(x - 3, y - 3, 10, 10)
}
