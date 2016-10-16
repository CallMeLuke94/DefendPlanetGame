function tank(x_, y_) {
    this.x = x_;
    this.y = y_;
    this.h = 30;
    this.w = 60;
    this.ws = this.w / 4; //wheel size
    this.l = 40; //cannon length

    this.a = 90; //cannon angle
    this.mobile = true;

    this.display = function() {
        strokeWeight(8); //cannon
        strokeCap(SQUARE);
        stroke(150);
        line(this.x + this.w / 2, this.y + this.h / 2, this.x + this.w / 2 + this.l * cos(radians(this.a)), this.y + this.h / 2 - this.l * sin(radians(this.a)));

        noStroke(); //body
        fill(150);
        rect(this.x, this.y + this.h - this.ws, this.w, this.h - this.ws);

        ellipse(this.x + this.w / 2, this.y + this.h / 2, this.ws * 2.2, this.ws * 2.2);

        strokeWeight(1); //wheels
        stroke(0);
        fill(0);
        for (var i = 0; i < 5; i++) {
            ellipse(this.x + i * this.ws, this.y + this.h - this.ws / 2, this.ws, this.ws);
        }
        line(this.x, this.y + this.h - this.ws, this.x + this.w, this.y + this.h - this.ws);
        line(this.x, this.y + this.h, this.x + this.w, this.y + this.h);
    }

    this.fall = function() {
        this.y += gravity / 1.5;

        if (this.y > height * 0.9 - this.h) {
            this.y = height * 0.9 - this.h;
        }
    }

    this.pivot = function() {
        if (this.mobile == true) {
            if (key == 'j') {
                this.a += 5;
            } else if (key == 'l') {
                this.a -= 5;
            }

            if (this.a < 10) {
                this.a = 10;
            } else if (this.a > 170) {
                this.a = 170;
            }
        }
    }

    this.move = function() {
        if (this.mobile == true) {
            if (key == 'd') {
                this.x += 3;
            } else if (key == 'a') {
                this.x -= 3;
            }

            if (this.x < 0) {
                this.x = 0;
            } else if (this.x > width - this.w) {
                this.x = width - this.w;
            }
        }
    }

    this.shoot = function() {
        if (this.mobile == true) {
            if (keyCode == 32) {
                shots.push(new missile(this.x + this.w / 2 + this.l * cos(radians(this.a)), this.y + this.h / 2 - this.l * sin(radians(this.a)), this.a));
            }
        }
    }

    this.death = function(ast) {
        var d = (this.x + this.w / 2 - ast.x) * (this.x + this.w / 2 - ast.x) + (this.y - ast.y) * (this.y - ast.y);
        if (sqrt(d) < ast.s / 2 + this.w / 4) {
            ast.v = 0;
            this.mobile = false;
            lose = true;
        }
    }

}
