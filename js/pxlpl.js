//get and set tools' details
var buttons = document.getElementsByTagName("button");
//var toolBox = document.getElementById("toolbox");
//var tools = document.getElementsByClassName("tool");
var currentSize = document.getElementById("size");
var pallete = document.getElementById("color");
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var colorSet;
var drawSize = 1;

var canvas_style = getComputedStyle(canvas);
canvas.width = parseInt(canvas_style.getPropertyValue('width'));
canvas.height = parseInt(canvas_style.getPropertyValue('height'));

//get mouse coodinates
var mousePosition = {x: 0, y: 0};
canvas.addEventListener('mousemove', function(e) {
  mousePosition.x = e.pageX - this.offsetLeft;
  mousePosition.y = e.pageY - this.offsetTop;
});

if(colorSet != true){
  currentColor = "#ffffff";
}

var doDraw = function(color){
  ctx.lineWidth = drawSize;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = color;
  canvas.addEventListener('mousedown', function(eType) {
    ctx.beginPath();
    ctx.moveTo(mousePosition.x, mousePosition.y);
    canvas.addEventListener('mousemove', onPaint);
  });
  canvas.addEventListener('mouseup', function() {
      canvas.removeEventListener('mousemove', onPaint);
  });
  var onPaint = function() {
      ctx.lineTo(mousePosition.x, mousePosition.y);
      ctx.stroke();
  };
};

for(var i = 0; i < buttons.length; i++){
  //pickedTool = '';
  buttons[i].onclick = function(){    
    var pickedTool = this.id;
    if (pickedTool == 'size'){
      var sizePicker = document.getElementById("size_picker");
      sizePicker.style.display = "block";//show size_picker form
      var pickSize = document.getElementById("pick_size");
      pickSize.onclick = function(){
        var sizeValue = document.getElementById("size_value");
        drawSize = sizeValue.value;
        ctx.lineWidth = drawSize;
        sizePicker.style.display = "none";//hide size_picker form
        return false;//prevent sizePicker form from submitting, and thus resetting currentSize to 1;
      };//end picsksize.onclick
    }//end if pickedTool==size

    if(pickedTool == 'color'){
      var colorPicker = document.getElementById("color_picker");
      colorPicker.onchange = function(){
        var currentColor = colorPicker.value;
        pallete.style.backgroundColor = currentColor;
        ctx.strokeStyle = currentColor;
        colorSet = true;
        return false;
      };
    }//end if pickedTool==color
    
    if(pickedTool == 'pencil'){
      doDraw(currentColor);
    }//end if pickedTool==pencil

    if(pickedTool == 'eraser'){
      doDraw('#ffffff');
    }//end if pickedtool == eraser
  };//end buttons[i].onclick
}//end for(buttons.length)


