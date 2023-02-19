//tsc index.ts -t es6 -w;
//tsc index.ts -w
//44x38
var image = new Image();
image.src = 'sprites.png';
var numColsToCut = 20;
var numRowsToCut = 32;
var widthOfOnePiece = 48;
var heightOfOnePiece = 48;
var imagePieces1 = [];
var imagePieces2 = [];
var canvasRightId = 0;
var tempCanvasId;
var _loop_1 = function (i) {
    var _loop_3 = function (j) {
        var canvas = document.createElement('canvas');
        canvas.width = 24;
        canvas.height = 24;
        var context = canvas.getContext('2d');
        context.drawImage(image, j * widthOfOnePiece, i * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, 24, 24);
        if (j < 16) {
            imagePieces1.push(canvas);
        }
        else {
            imagePieces2.push(canvas);
        }
        canvas.addEventListener('click', function () {
            var tempCanvas = document.getElementById(tempCanvasId);
            var tempContext = tempCanvas.getContext('2d');
            tempContext.drawImage(image, j * widthOfOnePiece, i * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, 24, 24);
            var checkbox = document.getElementById("automat");
            if (checkbox.checked == true) {
                var num = Number(tempCanvasId);
                num++;
                tempCanvasId = num.toString();
            }
        });
    };
    for (var j = 0; j < numRowsToCut; ++j) {
        _loop_3(j);
    }
};
for (var i = 0; i < numColsToCut; ++i) {
    _loop_1(i);
}
for (var i = 0; i < imagePieces1.length; i++) {
    if (i % 16 == 0) {
        document.querySelector("#left").appendChild(document.createElement('br'));
    }
    document.querySelector("#left").append(imagePieces1[i]);
}
for (var i = 0; i < imagePieces2.length; i++) {
    if (i % 16 == 0) {
        document.querySelector("#left").appendChild(document.createElement('br'));
    }
    document.querySelector("#left").append(imagePieces2[i]);
}
for (var i = 0; i < 38; ++i) {
    var _loop_2 = function (j) {
        var canvas = document.createElement('canvas');
        canvas.width = 24;
        canvas.height = 24;
        canvas.id = canvasRightId.toString();
        canvas.style.margin = "1px";
        document.querySelector("#right").append(canvas);
        canvas.addEventListener('click', function () {
            tempCanvasId = canvas.id.toString();
        });
        canvasRightId++;
    };
    for (var j = 0; j < 44; ++j) {
        _loop_2(j);
    }
    document.querySelector("#right").appendChild(document.createElement('br'));
}
