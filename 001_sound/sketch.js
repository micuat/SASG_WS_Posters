var s = function (p) {
  let name;
  let currents = [];
  let n = 24 + 1;
  let font;
  let rfont, rfontc;
  let sfacLogo;
  p.setup = function () {
    p.createCanvas(850, 1150);
    p.frameRate(30);
    for (let k = 0; k < 20; k++) {
      currents.push(p.floor(p.random(n * n)));
    }

    font = p.createFont("assets/Avenir.otf", 120);
    rfont = new Packages.geomerative.RFont("assets/l_10646.ttf", 60, p.LEFT);
    rfontc = new Packages.geomerative.RFont("assets/l_10646.ttf", 120, p.CENTER);

    sfacLogo = p.loadImage("assets/logo.png");
  }

  p.draw = function () {
    p.background(0);
    p.stroke(128);

    let t = p.millis() * 0.001;

    if (p.frameCount % 60 == 0) {
      currents = [];
      for (let k = 0; k < 20; k++) {
        currents.push(p.floor(p.random(n * n)));
      }
    }

    let theta = p.frameCount / 30.0 * 1 * Math.PI;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        let l = 100 / 2.0;
        let hl = l * 0.5;
        p.pushMatrix();
        p.translate((j + 0) * l, (i + 0) * l);

        for (let k in currents) {
          if (i * n + j == currents[k]) {
            hl *= 1.0 - p.pow(1.0 - p.map(Math.cos(theta), -1, 1, 0, 1), 4.0);
            let dx = l*0.5-hl;
            if(dx <= 1) dx = 0;
            p.translate(dx, 0);
          }
        }
        p.line(-hl, 0, hl, 0);
        p.line(0, -hl, 0, hl);
        p.popMatrix();
      }
    }

    Packages.geomerative.RCommand.setSegmentLength(2); // 5 = many points; 125 = only a few points
    Packages.geomerative.RCommand.setSegmentator(Packages.geomerative.RCommand.UNIFORMLENGTH);

    p.fill(255);
    p.stroke(255);
    p.translate(0, 0, 1);
    p.textFont(font, 60);
    {
      // let grp = rfont.toGroup('SASG Workshop 001');
      // let rpoints = grp.getPoints();
      // for (let i = 0; i < rpoints.length - 1; i++) {
      //   // p.point(rpoints[i].x + 100, rpoints[i].y + 100);
      //   p.line(rpoints[i].x + 100, rpoints[i].y + 100,
      //     rpoints[i + 1].x + 100, rpoints[i + 1].y + 100);
      // }
    }
    {
      p.push();
      p.translate(p.width / 2, p.height / 2);
      p.rotate(-Math.PI / 3);
      p.translate(0, 30);
      p.stroke(255, 50);
      let grp = rfontc.toGroup('SASG Workshop 001');
      let rpoints = grp.getPoints();
      for (let i = 0; i < rpoints.length - 1; i++) {
        let rot = Math.pow(Math.sin(t * Math.PI * 0.5 - i * 0.001) * 0.5 + 0.5, 8.0) * Math.PI * 0.125;
        // p.point(rpoints[i].x + 100, rpoints[i].y + 100);
        // let rad = p.dist(0, 0, rpoints[i].x, rpoints[i].y);
        p.line(rpoints[i].x-3, rpoints[i].y,
          rpoints[i].x * Math.cos(rot) + rpoints[i].y * -Math.sin(rot),
          rpoints[i].x * Math.sin(rot) + rpoints[i].y * Math.cos(rot)
        );
      }
      p.pop();
    }

    p.text("SASG Workshop 001", 100, 100);
    p.textFont(font, 30);
    p.text("Robotics and Physicality of Sound", 100, 150);
    p.text("by Evelyne Drouin & Naoto Hieda", 100, 200);
    p.text("Offered in English / Korean", 100, 300);
    p.text("Seoul Art Space Geumcheon", 100, 350);
    p.text("57, Beoman-ro 15-gil, Geumcheon-gu, Seoul", 100, 400);
    p.text("Maximum 10 people / families are welcome", 100, 450);
    p.text("Bring percussive material like metal dishes and rice", 100, 500);

    // p.text("Robotics soundscape using motors and solenoids, etc.", 100, 950);
    p.text("13:00 - 16:00 August 4 (Sat), 2018", 100, 900);
    p.text("More information: http://naotohieda.com/sasg/w001", 100, 950);
    p.text("Free reservation at mail@naotohieda.com", 100, 1100);

    // p.tint(255);
    p.image(sfacLogo, 650 + 50 / 4, 1000);
  }
};

var poster001 = new p5(s);