let stars = [];
let starCount;
let starOffs = 0;

function initStars(starCount) {
  for (let i = 0; i < starCount; i++) {
    stars.push(
      {
        dist: sqrt(random() * 2),
        rot: random(TAU),
        strokeWeight: random() * 2.5,
        intensity: random() * random(0, 0.9)
      }
    )
  }
}


function starryBackground(inAttractors) {

  let starOffsR = radians(starOffs);

  background(0);
  for (let i = 0; i < stars.length; i++) {
    let xOffs = (Math.cos(stars[i].rot + starOffsR) * stars[i].dist + 1) * (width  / 2);
    let yOffs = (Math.sin(stars[i].rot + starOffsR) * stars[i].dist + 1) * (height / 2);

    let xInRange = 0 < xOffs && xOffs < width;
    let yInRange = 0 < yOffs && yOffs < height;

    if (!xInRange || !yInRange) continue;

    if(inAttractors) if (!inAttractor(new p5.Vector(xOffs, yOffs))) continue;

    strokeWeight(stars[i].strokeWeight);
    stroke(255, stars[i].intensity * 255);

    point(xOffs, yOffs);
  }
}

function inAttractor(pointToCheck) {
  for (let i = 0; i < attractors.length; i++) {
    let posOnScreen = new p5.Vector(
      (attractors[i].x - viewTranslation.x) * viewScale,
      (attractors[i].y - viewTranslation.y) * viewScale
    );

    if (posOnScreen.dist(pointToCheck) < attractors[i].fieldSize * viewScale)
      return true;
  }
    
  return false;
}

function rotateStars(timeMult = 1) {
  starOffs += 0.02 * timeMult;
}