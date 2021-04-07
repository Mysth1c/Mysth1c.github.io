var tableWidth, tableHeight;
var i, j;
var arr, arrDup;
var count;
var generation;

document.getElementById("sizeButton").addEventListener("click", updateTable);
document.getElementById("playButton").addEventListener("click", runSimulation);

function getTableSizes() {
    tableWidth = parseInt(document.getElementById("tableWidth").value);
    tableHeight = parseInt(document.getElementById("tableHeight").value);
    generation = 0;
    updateCounter();
    arr = create2DArray();
    createTable();
}

function updateTable() {
    tableWidth = parseInt(document.getElementById("tableWidth").value); // parseInt ehk muudame tüübilt täisarvuks
    tableHeight = parseInt(document.getElementById("tableHeight").value);
    generation = 0;
    updateCounter();
    arr = create2DArray();
    var table = document.getElementById("gameOfLifeGrid");
    for (var i = 1; i < tableHeight + 1; i++) {
        for (var j = 1; j < tableWidth + 1; j++) {
            cell = document.getElementById(i + "-" + j);
            if (arr[i][j] == 0) {
                cell.setAttribute("class", "dead");
            } else {
                cell.setAttribute("class", "live");
            }
        }
    }
}

function create2DArray() {
    arr = [];
    for (i = 0; i < tableHeight + 2; i++) {
        arr[i] = [];
        for (j = 0; j < tableWidth + 2; j++) {
            arr[i][j] = Math.round(Math.random()); // Genereerime suvaliselt 0 või 1
        }
    }
    createImaginaryEdges();
    fillDuplicateArray();
    return arr;
}

function runSimulation() {
    generation++;
    updateCounter();
    createImaginaryEdges();
    for (i = 1; i < tableHeight+1; i++) {
        for (j = 1; j < tableWidth+1; j++) {
            count = countNeighbors(i, j);
            if (arr[i][j] == 1) {
                if (count < 2) {
                    arrDup[i][j] = 0;
                } else if (count > 3) {
                    arrDup[i][j] = 0;
                } else if (count == 2 || count == 3) {
                    arrDup[i][j] = 1;
                }
            } else if (arr[i][j] == 0) {
                if (count == 3) {
                    arrDup[i][j] = 1;
                }
            }
        }
    }
    copyAndClear(); // Kopeerime duplikaatmassiivi väärtused originaali tagasi ja nullime duplikaadi
    for (i = 1; i < tableHeight+1; i++) {
        for (j = 1; j < tableWidth+1; j++) {
            if (arr[i][j] == 0) {
                document.getElementById(i + "-" + j).setAttribute("class", "dead");
            } else {
                document.getElementById(i + "-" + j).setAttribute("class", "live");
            }
        }
    }
}

function countNeighbors(row, col) {
    count = 0;
    if (arr[row - 1][col - 1] == 1) {
        count++;
    }
    if (arr[row - 1][col] == 1) {
        count++;
    }
    if (arr[row - 1][col + 1] == 1) {
        count++;
    }
    if (arr[row][col - 1] == 1) {
        count++;
    }
    if (arr[row][col + 1] == 1) {
        count++;
    }
    if (arr[row + 1][col - 1] == 1) {
        count++;
    }
    if (arr[row + 1][col] == 1) {
        count++;
    }
    if (arr[row + 1][col + 1] == 1) {
        count++;
    }
    return count;
}

function createImaginaryEdges() {
    arr[0][0] = arr[tableHeight][tableWidth];
    arr[tableHeight + 1][0] = arr[1][tableWidth];
    arr[0][tableWidth + 1] = arr[tableHeight][1];
    arr[tableHeight + 1][tableWidth + 1] = arr[1][1];
    for (i = 1; i < tableHeight; i++) {
        arr[i][0] = arr[i][tableWidth];
    }
    for (i = 1; i < tableHeight; i++) {
        arr[i][tableWidth + 1] = arr[i][1];
    }
    for (j = 1; j < tableWidth; j++) {
        arr[0][j] = arr[tableHeight][j];
    }
    for (j = 1; j < tableWidth; j++) {
        arr[tableHeight + 1][j] = arr[1][j];
    }
}

function fillDuplicateArray() {
    arrDup = [];
    for (i = 0; i < tableHeight + 2; i++) {
        arrDup[i] = [];
        for (j = 0; j < tableWidth + 2; j++) {
            arrDup[i][j] = arr[i][j];
        }
    }
}

function createTable() {
    var table = document.getElementById("gameOfLifeGrid");

    for (var i = 1; i < tableHeight + 1; i++) {
        var tr = document.createElement("tr"); // Loome uue rea, kõik identsed, sest neid pöördumisel ei kasuta
        for (var j = 1; j < tableWidth + 1; j++) {//
            var cell = document.createElement("td"); // Reealselt nähtav rakk, mitte lihtsalt masssiivielement
            cell.setAttribute("id", i + "-" + j);
            if (arr[i][j] == 0) {
                cell.setAttribute("class", "dead");
            } else {
                cell.setAttribute("class", "live");
            }
            tr.appendChild(cell);
        }
        table.appendChild(tr);
    }
}

function copyAndClear() {
    for (i = 0; i < tableHeight + 2; i++) {
        for (j = 0; j < tableWidth + 2; j++) {
            arr[i][j] = arrDup[i][j];
            arrDup[i][j] = 0;
        }
    }
    createImaginaryEdges();
}

function updateCounter() {
    var disp = document.getElementById("display");
    disp.innerHTML = generation;
}


window.onload = getTableSizes();

/*
function makeGrid() {
    let tbl = document.getElementById("pixelCanvas");

    for (let i = 0; i < 11; i++) {
        let myRow = document.createElement("tr");
        myRow.id = "row" + i;

        tbl.appendChild(myRow);
        let rowW = document.getElementById("row" + i);

        for (let j = 0; j < 11; j++) {
            let myCell = document.createElement("td");
            rowW.appendChild(myCell);
        }
    }
}

$('#sizePicker').submit(function (event) {
    event.preventDefault();
    height = $('#inputHeight').val();
    width = $('#inputWidth').val();
    makeGrid(height, width);
})

function makeGrid(x, y) {
    $('tr').remove();

    for (var i = 1; i <= x; i++) {
        $('#gameOfLifeGrid').append('<tr id = row' + i + '></tr>');
        for (var j = 1; j <= y; j++) {
            $('#row' + i).append('<td></td>');
        }
    }
    $('td').click(function changeColor(){
        color = $('#colorPicker').val();

        if ($(this).attr('style')) {
            $(this).removeAttr('style');
        } else {
            $(this).attr('style', 'background-color:' + color);
        }
    })
}
*/
