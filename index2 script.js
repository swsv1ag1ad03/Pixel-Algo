let IS_CLICKED = false
let CURRENT_COLOR = getComputedStyle(document.documentElement).getPropertyValue('--current-color')
let field = document.querySelector('.field')
let FILL_MODE = false
let CURRENT_COLORCODE = '1'
let COLORS = ['rgb(255,255,255)', 'rgb(255, 1, 1)', 'rgb(19, 146, 19)', 'rgb(255, 255, 0)', 'rgb(39, 39, 158)', 'rgb(4, 178, 247)', 'rgb(153, 0, 153)', 'rgb(255, 102, 178)', 'rgb(0, 0, 0)', 'rgb(255, 128, 0)']


function get_result_from_cookie() {
    let cookies = document.cookie.split('; ')
    console.log(cookies)
    for (let i = 0; i < cookies.length; i += 1){
        let cookie = cookies[i].split('=')
        if (cookie[0] == 'pixel-result'){
            return cookie[1]
        }
    }
    return '0'*800
}


let temp_result = get_result_from_cookie()
console.log('temp-result', temp_result)
if (temp_result != 0){
    for (let i = 0; i < 800; i ++) {
   let cell = document.createElement('div')
   cell.classList.add('cell')
   cell.dataset.color = temp_result[i]
   cell.style.backgroundColor = COLORS[parseInt(temp_result[i])]
   field.appendChild(cell) 
    } 
} else {
   for (let i = 0; i < 800; i ++) {
    let cell = document.createElement('div')
    cell.classList.add('cell')
    cell.dataset.color = '0'
    cell.style.backgroundColor = COLORS[0]
    field.appendChild(cell)
} 
}



document.addEventListener('mousedown', function() {
    IS_CLICKED = true
})


document.addEventListener('mouseup', function() {
    IS_CLICKED = false
})


document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('mousedown', function() {
        if (FILL_MODE) {
            FILL_MODE = false
            document.querySelectorAll('.cell').forEach(cell =>{
                cell.style.backgroundColor = CURRENT_COLOR
                cell.dataset.color = CURRENT_COLORCODE})
        }
        else {
        anime({
            targets: cell,
            background: CURRENT_COLOR,
            duration: 200,
            easing: 'linear'
        })
        cell.dataset.color = CURRENT_COLORCODE
        }
    })
    cell.addEventListener('mouseover', function() {
        if (IS_CLICKED) {
            anime({
                targets: cell,
                background: CURRENT_COLOR,
                duration: 200,
                easing: 'linear'
           })
            cell.dataset.color = CURRENT_COLORCODE
           }
    })
})


document.querySelectorAll('.color-cell').forEach(color_cell => {
    color_cell.addEventListener('click', function() {
        FILL_MODE = false
        CURRENT_COLOR = getComputedStyle(color_cell).backgroundColor
        CURRENT_COLORCODE = color_cell.dataset.colorcode
        document.documentElement.style.cssText = `--curent-color: ${CURRENT_COLOR}`
        document.querySelector('.selected').classList.remove('selected')
        color_cell.classList.add('selected')
    })
})


document.querySelector('.eraser').addEventListener('click', function() {
    FILL_MODE = false
    CURRENT_COLOR = getComputedStyle(document.documentElement).getPropertyValue('--default-color')
    document.querySelector('.selected').classList.remove('selected')
    this.classList.add('selected')
})



document.querySelector('.fill-tool').addEventListener('click', function() {
    FILL_MODE = true
        document.querySelector('.selected').classList.remove('selected')
        this.classList.add('selected')
})


function saveToCookie() {
    let result = ''
    let cells = document.querySelectorAll('.cell')
    for (let i = 0; i < cells.length; i += 1){
        result += `${cells[i].dataset.color}`
    }
    document.cookie = `pixel-result=${result}; max-age = 100000`
    console.log(document.cookie)
}

setInterval(saveToCookie, 6000)


document.querySelector('.save-tool').addEventListener('click', function(){
    domtoimage.toJpeg(field,{quality: 2})
    .then(function (dataUrl) {
        var img = new Image()
        img.src = dataUrl
        let link = document.createElement('a')
        link.download = 'pixel.jpg'
        link.href = dataUrl
        link.click()
    })
})
