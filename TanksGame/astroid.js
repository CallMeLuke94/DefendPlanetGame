function astroid(x_, y_, tx_, v_, s_) {
    this.x = x_;
    this.y = y_;
    this.tx = tx_;
    this.v = v_;
    this.s = s_;
    this.col = color(255, 255, 0);

    this.pos = createVector(this.x, this.y);
    this.tar = createVector(this.tx, height);
    this.dir = this.tar.sub(this.pos);
    this.dir.normalize();
    this.dir.mult(this.v);

    this.display = function() {
        noStroke();
        fill(this.col);
        ellipse(this.x, this.y, this.s, this.s);
    }

    this.move = function() {
        if (this.v > 0) {
            this.x += this.dir.x;
            this.y += this.dir.y;
        }

        if (this.y > height * 0.9) {
            this.y = height * 0.9;
            this.v = 0;
            this.hit();
        }
    }

    this.hit = function() {
        this.col = color(0, 0, 255);
        impacts += 1;
    }

}
