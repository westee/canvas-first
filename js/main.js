var div = document.getElementById('canvas')
div.onmousedown = function(a){
    var x = a.clientX
    var y = a.clientY
    var diva = document.createElement('div')
    diva.style = "width:6px; height:6px;"+"background:green;border-radius:3px;"+
    "position:absolute;left:"+(x-3)+"px;"+"top:"+(y-3)+"px;"
    div.appendChild(diva)
    console.log(a)
}
