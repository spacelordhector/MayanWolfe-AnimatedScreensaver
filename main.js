//set up canvas
//gives acces to the drawing properties
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//innerWidth refers to the viewport
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

//function to generate random number
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; //Because you don't want this to be too low.
}

//function to generate a random rgb color
function randomRGB() {
    return `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)} )`
}

class BallMaker {
    constructor(x, y, velocityX, velocityY, color, size) {
        this.x = x;
        this.y = y;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.color = color;
        this.size = size;
    }
    draw() {
        ctx.beginPath();//start drawing shape
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
    update() {
        if ((this.x + this.size) >= width) {
            this.velocityX *= -1//The velocity changes direction
        }
        if ((this.x - this.size) <= 0) {
            this.velocityX *= -1
        }
        if ((this.y + this.size) >= height) {
            this.velocityY *= -1
        }
        if ((this.y - this.size) <= 0) {
            this.velocityY *= -1
        }
        this.x += this.velocityX;
        this.y += this.velocityY;
    }
    collistionDetection() {
        for (const ball of balls) {
            if (!(this === ball)) {
                const dx = this.x - ball.x
                const dy = this.y - ball.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < this.size + ball.size) {
                    ball.color = this.ball = randomRGB()
                }
            }
        }
    }
}

const balls = []

while (balls.length < 20) {
    const size = random(10, 20);
    const ball = new BallMaker(
        random(0 + size, width - size),// x-coordibate 
        random(0 + size, height - size),//y-coordinate
        random(1, 4), //velocity-x
        random(1, 4),//velocity-y
        randomRGB(), //assigns color
        size
    )
    balls.push(ball)
}
function loop() {
    ctx.fillStyle = 'rgba(0,0,0,0.01)'
    ctx.fillRect(0, 0, width, height)
    for (const ball of balls) {
        ball.draw()
        ball.update()
        ball.collistionDetection()
    }
    requestAnimationFrame(loop)//recursion
}

loop();//START FUNCTION