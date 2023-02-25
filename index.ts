//tsc index.ts -t es6 -w;
//tsc index.ts -w

//44x38


let image = new Image();
image.src = 'sprites.png';
image.onload = () => {
    let numColsToCut: number = 20
    let numRowsToCut: number = 32
    let widthOfOnePiece: number = 48
    let heightOfOnePiece: number = 48

    let imagePieces1: Array<HTMLCanvasElement> = [];
    let imagePieces2: Array<HTMLCanvasElement> = [];

    let canvasRightId: number = 0

    let tempCanvasId: string = ""

    let clicked: boolean

    let selectionLeft: number
    let selectionTop: number

    for (let i = 0; i < numColsToCut; ++i) {
        for (let j = 0; j < numRowsToCut; ++j) {
            let canvas: HTMLCanvasElement = document.createElement('canvas');
            canvas.width = 24;
            canvas.height = 24;
            let context = canvas.getContext('2d');
            (context as CanvasRenderingContext2D).drawImage(image, j * widthOfOnePiece, i * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, 24, 24);
            if (j < 16) {
                imagePieces1.push(canvas);
            } else {
                imagePieces2.push(canvas)
            }

            canvas.addEventListener('click', function () {
                if (tempCanvasId != "") {
                    let tempCanvas = <HTMLCanvasElement>document.getElementById(tempCanvasId);
                    let tempContext = tempCanvas.getContext('2d');
                    (tempContext as CanvasRenderingContext2D).drawImage(image, j * widthOfOnePiece, i * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, 24, 24);
                    document.getElementById(tempCanvasId)!.style.border = "1px dotted white"
                    var checkbox = <HTMLInputElement>document.getElementById("automat");
                    if (checkbox.checked == true) {
                        let num = Number(tempCanvasId);
                        num++
                        tempCanvasId = num.toString()
                        document.getElementById(tempCanvasId)!.style.border = "1px dotted red"
                    } else {
                        tempCanvasId = ""
                    }
                }
            })
        }
    }

    for (let i = 0; i < imagePieces1.length; i++) {
        if (i % 16 == 0) {
            document.querySelector("#left")!.appendChild(document.createElement('br'))
        }
        document.querySelector("#left")!.append(imagePieces1[i]);
    }

    for (let i = 0; i < imagePieces2.length; i++) {
        if (i % 16 == 0) {
            document.querySelector("#left")!.appendChild(document.createElement('br'))
        }
        document.querySelector("#left")!.append(imagePieces2[i]);
    }

    for (let i = 0; i < 38; ++i) {
        for (let j = 0; j < 44; ++j) {
            let canvas: HTMLCanvasElement = document.createElement('canvas');
            canvas.width = 24;
            canvas.height = 24;
            canvas.id = canvasRightId.toString()
            canvas.style.margin = "1px";
            document.querySelector("#right")!.append(canvas);
            canvasRightId++
        }
        document.querySelector("#right")!.appendChild(document.createElement('br'))
    }

    document.querySelector("#right")!.addEventListener("mousedown", (e) => {
        clicked = true
        if (tempCanvasId != "") {
            document.getElementById(tempCanvasId)!.style.border = "1px dotted white"
        }

        for (let i = 0; i < 1672; i++) {
            document.getElementById(i.toString())!.addEventListener('click', function () {
                tempCanvasId = i.toString()
                document.getElementById(i.toString())!.style.border = "1px dotted red"
            })
        }

        document.querySelector("#right")!.addEventListener("mousemove", (e2) => {
            if (clicked) {
                document.getElementById("selection")!.style.display = "block";

                if ((e2 as MouseEvent).clientX - (e as MouseEvent).clientX > 0 && (e2 as MouseEvent).clientY - (e as MouseEvent).clientY > 0) {
                    document.getElementById("selection")!.style.left = ((e as MouseEvent).clientX).toString() + "px"
                    document.getElementById("selection")!.style.top = ((e as MouseEvent).clientY).toString() + "px"
                    selectionLeft = (e as MouseEvent).clientX
                    selectionTop = (e as MouseEvent).clientY
                } else if ((e2 as MouseEvent).clientX - (e as MouseEvent).clientX < 0 && (e2 as MouseEvent).clientY - (e as MouseEvent).clientY > 0) {
                    document.getElementById("selection")!.style.left = ((e2 as MouseEvent).clientX).toString() + "px"
                    document.getElementById("selection")!.style.top = ((e as MouseEvent).clientY).toString() + "px"
                    selectionLeft = (e2 as MouseEvent).clientX
                    selectionTop = (e as MouseEvent).clientY
                } else if ((e2 as MouseEvent).clientX - (e as MouseEvent).clientX > 0 && (e2 as MouseEvent).clientY - (e as MouseEvent).clientY < 0) {
                    document.getElementById("selection")!.style.left = ((e as MouseEvent).clientX).toString() + "px"
                    document.getElementById("selection")!.style.top = ((e2 as MouseEvent).clientY).toString() + "px"
                    selectionLeft = (e as MouseEvent).clientX
                    selectionTop = (e2 as MouseEvent).clientY
                } else {
                    document.getElementById("selection")!.style.left = ((e2 as MouseEvent).clientX).toString() + "px"
                    document.getElementById("selection")!.style.top = ((e2 as MouseEvent).clientY).toString() + "px"
                    selectionLeft = (e2 as MouseEvent).clientX
                    selectionTop = (e2 as MouseEvent).clientY
                }

                document.getElementById("selection")!.style.width = (Math.abs((e2 as MouseEvent).clientX - (e as MouseEvent).clientX)).toString() + "px";
                document.getElementById("selection")!.style.height = (Math.abs((e2 as MouseEvent).clientY - (e as MouseEvent).clientY)).toString() + "px";

                selectionLeft = selectionLeft - 512
                selectionTop = selectionTop - 32

                /*console.log("width: " + document.getElementById("selection")!.style.width)
                console.log("height: " + document.getElementById("selection")!.style.height)
                console.log("left: " + selectionLeft)
                console.log("top: " + selectionTop)*/

                /*--------------------------SZUKANIE PIERWSZEGO ZAZNACZONEGO CANVASA---------------------------------*/

                /*console.log(Math.round(selectionLeft / 26))
                console.log(Math.round(selectionTop / 26))*/

                console.log((Math.round(selectionTop / 26) * 38) + (Math.round(selectionLeft / 26) * 44))

                document.querySelector("#right")!.addEventListener("mouseup", () => {
                    document.getElementById("selection")!.style.display = "none";
                    document.getElementById("selection")!.style.width = "0";
                    document.getElementById("selection")!.style.height = "0";

                    clicked = false
                })
            }
        })
    })
}