let timewarp = 20;

class Field{
    constructor(x, y, w, h){
        this.x=x
        this.y=y
        this.w=w
        this.h=h
    }

    show(){
        push();
        fill(0, 255, 0);
        noStroke();
        rect(this.x, this.y, this.w, this.h);
        pop();
    }
}

class Nutbot{
    constructor(x, y, r){
        this.x = x;
        this.y = y;
        this.r = r;
        this.slowSpeed = 0.4;
        this.fastSpeed = 0.5;
        this.speed = this.slowSpeed*timewarp;
        this.direction = [1, 0]//x, y
        this.field;
        this.inSequence = false;
        this.wantedY = 0
    }

    init(field){
        this.field=field;
    }

    show(){
        push();
        fill(255)
        circle(this.x, this.y, this.r);
        pop();
    }

    think(){
        if (this.inSequence){
            if(this.x < this.field.x || this.x > this.field.x+this.field.w){
                this.direction[0]*=-1;
                this.wantedY += 10;
            }

            if (this.y-field.y < this.wantedY){
                this.y += this.speed;
            }
        }else{
            if (Math.abs(this.x-this.field.x) > 1){
                this.x -= Math.sign(this.x-this.field.x);
            }
            if (Math.abs(this.y-this.field.y) > 1){
                this.y -= Math.sign(this.y-this.field.y);
            }
            if (Math.abs(this.x-this.field.x) < 2 && Math.abs(this.y-this.field.y) < 2){
                this.inSequence = true
            }
        }
    }

    move(){
        if (this.inSequence){
            this.x += this.direction[0]*this.speed;
            this.y += this.direction[1]*this.speed;
        }
    }
}

field = new Field(100, 100, 500, 500);
let nutbot;
function setup(){
    createCanvas(700, 700);
    drawbg()
    nutbot = new Nutbot(Math.floor(random(700)), Math.floor(random(700)), 20);
    nutbot.init(field);
}

function draw(){
    background(0)
    drawbg()
    nutbot.show();
    nutbot.think();
    nutbot.move();
}

let forestGround;
function preload(){
    forestGround = loadImage("images/forest.png");
}

function drawbg(){
    //image(forestGround, field.x, field.y, field.w, field.h)
    fill(0, 255, 0);
    rect(field.x, field.y, field.w, field.h)
}