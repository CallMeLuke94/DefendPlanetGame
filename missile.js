function missile(x_, y_, a_) {
    this.x = x_;
    this.y = y_;
    this.a = a_;
    this.v = 5;
    this.s = 10;

    this.pos = createVector(this.x, this.y);

    this.display = function() {
        noStroke();
        fill(100, 0, 0);
        ellipse(this.x, this.y, this.s, this.s);
    }

    this.move = function() {
        this.x += this.v * cos(radians(this.a));
        this.y -= this.v * sin(radians(this.a));

        if (this.x < -10 || this.x > width + 10 || this.y < -10) {
            this.v = 0;
        }
    }

    this.destroy = function(ast) {
        var d = (this.x - ast.x) * (this.x - ast.x) + (this.y - ast.y) * (this.y - ast.y);
        if (sqrt(d) < ast.s / 2) {
            ast.x = height * 2;
            ast.v = 0;

            this.y = -height * 2;
            this.v = 0;

            hits += 1;
        }
    }

}
