let timewarp = 10;

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
        this.slowSpeed = 0.2;
        this.fastSpeed = 0.5;
        this.speed = this.slowSpeed*timewarp;
        this.direction = [this.speed, 0]//x, y
        this.field;
    }

    init(field){
        this.field=field;
    }

    show(){
        push();
        circle(this.x, this.y, this.r);
        pop();
    }

    think(){
        if(this.x < this.field.x || this.x > this.field.x+this.field.w){
            this.direction[0]*=-1;
        }
    }

    move(){
        this.x += this.direction[0];
        this.y += this.direction[1];
    }
}

field = new Field(100, 100, 500, 500);
nutbot = new Nutbot(250, 250, 10);
function setup(){
    createCanvas(700, 700);
    background(255, 0, 0);
    nutbot.init(field);
}

function draw(){
    background(255, 0, 0);
    field.show();
    nutbot.show();
    nutbot.think();
    nutbot.move();
}