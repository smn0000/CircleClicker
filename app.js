const button = document.querySelector('#start')
button.addEventListener('click', handleClickBtn)
const scoreOutput = document.querySelector('#score')
const customizeBtn = document.querySelector('#customize')
const confirmBtn = document.querySelector('#confirm')
const cancelBtn = document.querySelector('#cancel')
const modal = document.querySelector('#modal')
const widthInput = document.querySelector('#width')
const heightInput = document.querySelector('#height')
const targetInput = document.querySelector('#target')
const widthLabel = document.querySelector('#width__label')
const heightLabel = document.querySelector('#height__label')
const targetLabel = document.querySelector('#target__label')

console.log(heightLabel)
// From events 

customizeBtn.addEventListener('click', ()=>{
    stopGame()
    modal.showModal();
    heightLabel.innerHTML = `Height: ${WIDTH}`
    widthLabel.innerHTML = `Width: ${HEIGHT}`
    targetLabel.innerHTML = `Target Size: ${RADIUS}`

})

confirmBtn.addEventListener('click', (e) => {
    e.preventDefault()
    WIDTH = Number(widthInput.value)
    HEIGHT = Number(heightInput.value)
    RADIUS = Number(targetInput.value)

    canvas.width = WIDTH
    canvas.height = HEIGHT
    circle.radius = RADIUS

    modal.close()
})

cancelBtn.addEventListener('click', (e) => {
    e.preventDefault()
    modal.close()
})

widthInput.addEventListener('input', (e) =>{
    WIDTH = e.target.value
    widthLabel.innerHTML = `Width: ${WIDTH}`
    
})

heightInput.addEventListener('input', (e) =>{
    HEIGHT = e.target.value
    heightLabel.innerHTML = `Height: ${HEIGHT}`
    
})

targetInput.addEventListener('input', (e) =>{
    RADIUS = e.target.value
    targetLabel.innerHTML = `Target Size: ${RADIUS}`
})

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const TICK_RATE = 60

let HEIGHT = 500

let WIDTH = 500

let RADIUS = 30


class Circle {
    constructor(x, y, radius ){
        this.x = x
        this.y = y
        this.radius = radius
    }    

    sAngle = 0
    eAngle = Math.PI * 2
    draw = function(context){
        context.fillStyle = 'red'
        context.beginPath();
        context.arc(this.x, this.y, this.radius, this.sAngle, this.eAngle)
        context.fill();
    }

    checkIfClickedCircle(clickX,clickY){
        let length = Math.sqrt( Math.pow(clickX - this.x, 2) + Math.pow(clickY - this.y, 2))
        if (length <= this.radius) return true
       
        return false
    }

    updatePosition() {
        let x = Math.floor(Math.random() * WIDTH) 
        let y =  Math.floor(Math.random() * HEIGHT) 

        if(x - this.radius < 0) x = this.radius * 2
        else if(x + this.radius > WIDTH) x = WIDTH - this.radius * 2

        if(y - this.radius < 0) y = this.radius * 2
        else if(y + this.radius > WIDTH) y = WIDTH - this.radius * 2

        this.x = x
        this.y = y
    }
}


canvas.width =  WIDTH
canvas.height = HEIGHT

let circle = new Circle(WIDTH / 2 , HEIGHT / 2, RADIUS)

let isGameRunning = false
let score = 0



function handleClickBtn(){
    if(isGameRunning) {
        stopGame()
      
    }
    else{
        startGame()
       
    }
}

function startGame() {
    if(isGameRunning) return

    ctx.clearRect(0,0,WIDTH,HEIGHT)
    gameLoop()
    button.innerHTML = 'STOP'
    isGameRunning = true
}

function stopGame(){
    if(!isGameRunning) return
    canvas.removeEventListener('click', handleClick)
    clearInterval(loop)
    setScore(0)
    button.innerHTML = 'START'
    ctx.clearRect(0,0,WIDTH,HEIGHT)
    isGameRunning = false
}

function handleClick(event){
    let clickX = event.x - event.target.offsetLeft
    let clickY = event.y - event.target.offsetTop

    if(circle.checkIfClickedCircle(clickX,clickY)) {
        setScore(score + 1)
        circle.updatePosition()
    }
    else {
        stopGame()
    }
}

function setScore(newScore){
    score = newScore
    scoreOutput.innerHTML = `Score: ${score}`
}



function gameLoop(){
     
    canvas.addEventListener('click', handleClick)
   

    loop = setInterval(() => {
        ctx.clearRect(0,0,WIDTH,HEIGHT)
        circle.draw(ctx)
      
        
       
    }, 1000/TICK_RATE)
}

