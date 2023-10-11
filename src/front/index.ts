/// <reference lib="dom" />
 
const ws = new WebSocket(`ws://${location.host}`)
ws.onopen = () => setInterval(() => ws.send("ping"), 5000)
ws.onmessage = (event: MessageEvent) => {
    console.log(event.data)
    if (event.data === "reload") {
        location.reload()
    }
}

const canvas = document.getElementById("sudokuCanvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const width = canvas.width;
const height = canvas.height;
const cellSize = Math.round(Math.min(width, height) / 9);

function clearCanvas() {
    ctx.fillStyle = "#AAA";
    ctx.fillRect(0, 0, width, height);
}

function drawCell(
    i: number,
    j: number,
    cellSize: number,
    borderCorlor: string,
    fillColor?: string,
) {
    const x = i * cellSize;
    const y = j * cellSize;
    ctx.lineWidth = 1;
    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fillRect(x, y, cellSize - 1, cellSize - 1);
    }
    ctx.strokeStyle = borderCorlor;
    ctx.strokeRect(x, y, cellSize, cellSize);
}

// function drawGroup(groupI: number, groupJ: number, fillColor?: string) {
//     drawCell(groupI, groupJ, cellSize * 3, "#000");
//     for(let i = 0; i < 9; i++) {
//         for(let j = 0; j < 9; j++) {
//             const x = groupI * 3 + i % 3;
//             const y = groupJ * 3 + Math.floor(i / 3);
//             drawCell(x, y, cellSize, "#777");
//             writeInCell(x, y);
//         }
//     }
// }

function drawGrid() {
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            drawCell(i, j, cellSize, "#777", "#E5E5E5");
            writeInCell(i, j);
        }
    }
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            drawCell(i, j, cellSize * 3, "#000");
        }
    }
    // for(let i = 0; i < 3; i++) {
    //     for(let j = 0; j < 3; j++) {
    //         drawGroup(i, j, "#EEE");
    //     }
    // }
}

const writeInCell = (i: number, j: number) => {
    const x = i * cellSize;
    const y = j * cellSize;
    ctx.font = "15px Arial";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let k = 0; k < 9; k++) {
        ctx.fillText((k+1).toString(),
            x + cellSize / 6 + k % 3 * cellSize / 3,
            y + cellSize / 6 + Math.floor(k / 3) * cellSize / 3
        );
    }
}

clearCanvas();
drawGrid();

console.log("Front update")