let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let color = document.querySelector('#color');
let buttons = document.querySelectorAll('.settings img');
let mySize = document.querySelector('#range');

let myColor = '';
let size = 4;
let defaultApp = 'default';
console.log('defaultApp: ', defaultApp);

color.addEventListener('input', (event) => {
    myColor = event.target.value
})

const setCanvas = (app) => {
    canvas.addEventListener('mousedown', (event) => {
        
        ctx.strokeStyle = myColor
        let size = mySize.value;
        ctx.lineWidth = size;
        let currentX = event.pageX - event.target.offsetLeft;
        let currentY = event.pageY - event.target.offsetTop;
        ctx.beginPath();
        ctx.moveTo(currentX, currentY);

        let savedImg = canvas.toDataURL()
        let startX = event.pageX - event.target.offsetLeft;
        let startY = event.pageY - event.target.offsetTop;
        

        canvas.onmousemove = function (event) {
            let mouseX = event.pageX - event.target.offsetLeft;
            let mouseY = event.pageY - event.target.offsetTop;

            let width = mouseX - startX;
            let height = mouseY - startY;
            let x = event.offsetX;
            let y = event.offsetY;
            let mx = event.movementX;
            let my = event.movementY;

            let img = new Image()
            ctx.lineCup = 'round'
            switch(app) {
                case 'brush':
                case 'defaultApp':
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x - mx, y - my);
                    ctx.stroke();
                    break
                case 'line':
                    let xUp = event.pageX - event.target.offsetLeft;
                    let yUp = event.pageY - event.target.offsetTop;
                    
                    img.src = savedImg
                    img.onload = function () {
                        ctx.clearRect(0, 0, canvas.width, canvas.height)
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                        ctx.beginPath()
                        ctx.moveTo(currentX, currentY);
                        ctx.lineTo(xUp, yUp);
                        ctx.stroke()
                    }
                    break
                case 'rectangle':
                    // let img = new Image()
                    img.src = savedImg
                    img.onload = () => {
                        ctx.clearRect(0, 0, canvas.width, canvas.height)
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                        ctx.beginPath()
                        ctx.rect(startX, startY, width, height)
                        ctx.stroke()
                    }
                    break
                case 'polygon':
                    setCanvas('polygon')
                    e.target.classList.add('active')
                    break
                case 'ellipse':
                    let r = Math.sqrt(width**2 + height**2)
                    img.src = savedImg
                    img.onload = () => {
                        ctx.clearRect(0, 0, canvas.width, canvas.height)
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                        ctx.beginPath()
                        ctx.arc(startX, startY, r, 0, 2*Math.PI)
                        ctx.stroke()
                    }
                    break
            }
        }
        canvas.addEventListener('mouseup', () => {
            canvas.onmousemove = null
        })
    })
}

setCanvas('defaultApp')

for (let i = 0; i < buttons.length; i++) {
    const btn = buttons[i]
    

        btn.addEventListener('click', (e) => {
            let element = e.target

            for (let i = 0; i < buttons.length; i++) {
                const el = buttons[i];
                if(el.className === 'active') {
                    el.classList.remove('active')
                }
            }
            
            let el = e.target.getAttribute('data-type')
            switch(el) {
                case 'brush':
                    setCanvas('brush')
                    e.target.classList.add('active')
                    break
                case 'line':
                    setCanvas('line')
                    e.target.classList.add('active')
                    break
                case 'rectangle':
                    setCanvas('rectangle')
                    e.target.classList.add('active')
                    break
                case 'polygon':
                    setCanvas('polygon')
                    e.target.classList.add('active')
                    break
                case 'ellipse':
                    setCanvas('ellipse')
                    e.target.classList.add('active')
                    break
            }
        })
}