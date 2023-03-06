//tsc index.ts -t es6 -w;
//tsc index.ts -w
//44x38
var image = new Image();
image.src = 'sprites.png';
image.onload = function () {
    var numColsToCut = 20;
    var numRowsToCut = 32;
    var widthOfOnePiece = 48;
    var heightOfOnePiece = 48;
    var imagePieces1 = [];
    var imagePieces2 = [];
    var selectedCanvasArray = [];
    var canvasRightId = 0;
    var clicked;
    var selectionLeft;
    var selectionTop;
    var selectionWidth;
    var selectionHeight;
    var _loop_1 = function (i) {
        var _loop_2 = function (j) {
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
                if (selectedCanvasArray.length > 1) {
                    for (var k = 0; k < selectedCanvasArray.length; k++) {
                        var tempCanvas = selectedCanvasArray[k];
                        var tempContext = tempCanvas.getContext('2d');
                        tempContext.drawImage(image, j * widthOfOnePiece, i * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, 24, 24);
                        tempCanvas.style.border = "1px dotted white";
                    }
                    selectedCanvasArray = [];
                }
                else {
                    var tempCanvas = selectedCanvasArray[0];
                    var tempContext = tempCanvas.getContext('2d');
                    tempContext.drawImage(image, j * widthOfOnePiece, i * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, 24, 24);
                    tempCanvas.style.border = "1px dotted white";
                    var checkbox = document.getElementById("automat");
                    if (checkbox.checked) {
                        var tempCanvasId = (Number(selectedCanvasArray[0].id) + 1);
                        selectedCanvasArray[0] = document.getElementById(tempCanvasId.toString());
                        selectedCanvasArray[0].style.border = "1px dotted red";
                    }
                }
            });
        };
        for (var j = 0; j < numRowsToCut; ++j) {
            _loop_2(j);
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
        for (var j = 0; j < 44; ++j) {
            var canvas = document.createElement('canvas');
            canvas.width = 24;
            canvas.height = 24;
            canvas.id = canvasRightId.toString();
            canvas.style.margin = "1px";
            document.querySelector("#right").append(canvas);
            canvasRightId++;
        }
        document.querySelector("#right").appendChild(document.createElement('br'));
    }
    document.querySelector("#right").addEventListener("mousedown", function (e) {
        clicked = true;
        var _loop_3 = function (i) {
            document.getElementById(i.toString()).addEventListener('click', function () {
                document.querySelector("#right").onclick = function (e3) {
                    if (e3.metaKey) {
                        selectedCanvasArray.push(document.getElementById(i.toString()));
                        document.getElementById(i.toString()).style.border = "1px dotted red";
                    }
                    else {
                        for (var k = 0; k < selectedCanvasArray.length; k++) {
                            selectedCanvasArray[k].style.border = '1px dotted white';
                        }
                        selectedCanvasArray = [];
                        selectedCanvasArray.push(document.getElementById(i.toString()));
                        document.getElementById(i.toString()).style.border = "1px dotted red";
                    }
                };
            });
        };
        for (var i = 0; i < 1672; i++) {
            _loop_3(i);
        }
        document.querySelector("#right").onmousemove = function (e2) {
            if (clicked) {
                document.getElementById("selection").style.display = "block";
                if (e2.clientX - e.clientX > 0 && e2.clientY - e.clientY > 0) {
                    document.getElementById("selection").style.left = (e.clientX).toString() + "px";
                    document.getElementById("selection").style.top = (e.clientY).toString() + "px";
                    selectionLeft = e.clientX;
                    selectionTop = e.clientY;
                }
                else if (e2.clientX - e.clientX < 0 && e2.clientY - e.clientY > 0) {
                    document.getElementById("selection").style.left = (e2.clientX).toString() + "px";
                    document.getElementById("selection").style.top = (e.clientY).toString() + "px";
                    selectionLeft = e2.clientX;
                    selectionTop = e.clientY;
                }
                else if (e2.clientX - e.clientX > 0 && e2.clientY - e.clientY < 0) {
                    document.getElementById("selection").style.left = (e.clientX).toString() + "px";
                    document.getElementById("selection").style.top = (e2.clientY).toString() + "px";
                    selectionLeft = e.clientX;
                    selectionTop = e2.clientY;
                }
                else {
                    document.getElementById("selection").style.left = (e2.clientX).toString() + "px";
                    document.getElementById("selection").style.top = (e2.clientY).toString() + "px";
                    selectionLeft = e2.clientX;
                    selectionTop = e2.clientY;
                }
                document.getElementById("selection").style.width = (Math.abs(e2.clientX - e.clientX)).toString() + "px";
                document.getElementById("selection").style.height = (Math.abs(e2.clientY - e.clientY)).toString() + "px";
                selectionLeft = selectionLeft - 665;
                selectionTop = selectionTop - 34;
                selectionWidth = Number(document.getElementById("selection").style.width.substring(0, document.getElementById("selection").style.width.length - 2));
                selectionHeight = Number(document.getElementById("selection").style.height.substring(0, document.getElementById("selection").style.height.length - 2));
                /*--------------------------SZUKANIE PIERWSZEGO ZAZNACZONEGO CANVASA---------------------------------*/
                try {
                    document.querySelector("#right").onclick = function (e3) {
                        if (e3.metaKey) {
                            var firstSelectedId = (Math.floor(selectionTop / 28) * 44) + (Math.floor(selectionLeft / 28));
                            var lastSelectedRowId = firstSelectedId + Math.floor(selectionWidth / 28);
                            var selectedCollumns = Math.floor(selectionHeight / 28);
                            for (var i = firstSelectedId; i <= lastSelectedRowId; i++) {
                                for (var j = 0; j <= selectedCollumns; j++) {
                                    selectedCanvasArray.push((document.getElementById((i + (j * 44)).toString())));
                                }
                            }
                            for (var i = 0; i < selectedCanvasArray.length; i++) {
                                selectedCanvasArray[i].style.border = "1px dotted red";
                            }
                        }
                        else {
                            for (var i = 0; i < selectedCanvasArray.length; i++) {
                                selectedCanvasArray[i].style.border = "1px dotted white";
                            }
                            selectedCanvasArray = [];
                            var firstSelectedId = (Math.floor(selectionTop / 28) * 44) + (Math.floor(selectionLeft / 28));
                            var lastSelectedRowId = firstSelectedId + Math.floor(selectionWidth / 28);
                            var selectedCollumns = Math.floor(selectionHeight / 28);
                            for (var i = firstSelectedId; i <= lastSelectedRowId; i++) {
                                for (var j = 0; j <= selectedCollumns; j++) {
                                    selectedCanvasArray.push((document.getElementById((i + (j * 44)).toString())));
                                }
                            }
                            for (var i = 0; i < selectedCanvasArray.length; i++) {
                                selectedCanvasArray[i].style.border = "1px dotted red";
                            }
                        }
                    };
                }
                catch (error) {
                }
                document.querySelector("#right").onmouseup = function () {
                    document.getElementById("selection").style.display = "none";
                    document.getElementById("selection").style.width = "0";
                    document.getElementById("selection").style.height = "0";
                    clicked = false;
                };
            }
        };
    });
};
