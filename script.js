let excel = {
    cols: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
    rows: [null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    cells: []
}

function fillCells() {
        excel.rows.forEach((row) => {
        excel.cols.forEach((col) => {
            if (row) {
                excel.cells.push({
                    name: col + row,
                    value: "",
                    size: 14,
                    family: '',
                    width: 110,
                    height: 25
                })
            }
        });
    });
}

function render() {
        excel.rows.forEach((row) => {
        $("#excel").append(`<div class="rowww" data-row="${row}"></div>`);
        $(".rowww[data-row=" + row + "]").append(`<div class="column first-col">${row ? row : ""}</div>`);
        excel.cols.forEach((col) => {
            if (!row) {
            $(".rowww[data-row=" + row + "]").append(`<input class="column" disabled="true" style="min-width:${getWidth(col)}px;" value="${col}" data-col="${col}"/>`);
            } 
            else {
            $(".rowww[data-row=" + row + "]").append(`<input class="column cell" value="${getValue(col,row)}" style="min-width:${getWidth(col)}px;height:${getHeight(row)}px" data-row="${row}" data-col="${col}" data-cell="${col + row}"/>`);
            }
        });
    });
}

fillCells();
render();

function getValue(col,row){
    let value;
    excel.cells.forEach(item =>{
        if (item.name == col+row){
            value = item.value;
        }
    })
    return value;
}
function getWidth(col){
    let width;
    excel.cells.forEach(item => {
        if (item.name[0] == col){
            width = item.width;
        }
    })
    return width;
}
function getHeight(row){
    let height;
    excel.cells.forEach(item => {
        if (item.name.slice(1) == row){
            height = item.height;
        }
    })
    return height;
}



$('.cell').on('blur', function(){
    let key = $(this).attr('data-cell')
    let value = $(this).val();
    excel.cells.forEach(item => {
        if(item.name == key){
            item.value = value;
        }
    })
})



$('.btnChangeFz').click(function(){
    $('#font-size').val('');
})
$('#exampleModal').on('click', '.btn-dark', function(){
    let size = $('#font-size').val();
    let family;

    if ($('#flexRadioDefault1')[0].checked){
        family = 'Bakbak One';
    }
    if ($('#flexRadioDefault2')[0].checked){
        family = 'Roboto';
    }
    if ($('#flexRadioDefault3')[0].checked){
        family = 'Cabin';
    }

    excel.cells.forEach(item => {
        item.size = size;
        item.family = family;
    })

    $('.cell').css({
        'font-size': `${size}px`,
        'font-family': `${family}` 
    })
})



$('.btnChangeWh').click(function(){
    $('#column-letter').val('');
    $('#column-number').val('');
    $('#column-width').val('');
    $('#column-height').val('');
})
$('#exampleModal1').on('click', '.btn-dark', function(){
    let columnLetter = $('#column-letter').val();
    let columnNumber = $('#column-number').val();
    let columnWidth = Number($('#column-width').val());
    let columnHeight = Number($('#column-height').val());
    excel.cells.forEach(item => {
        if (item.name[0] == columnLetter){
            item.width = columnWidth;
        }
        if (item.name.slice(1) == columnNumber){
            item.height = columnHeight;
        }
    })
    $('#excel').html('');
    render();
})
