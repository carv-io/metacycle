// The ellipse would spawn on the position of the mouse at that time,
// and it would also pulsate in size basically,
// getting smaller and larger according to a sin function.
// One thing that would be nice to implement as well,
// is that every time the user presses any key,
// the sketch generates a random color for all balls in the sketch.

// Remaining tasks:
// calculate the center points along each line
// draw a point
// apply function that traces the path of these center point
// see https://p5js.org/examples/simulate-spirograph.html as an example.
// Add a gradient fill to the ovals? https://p5js.org/examples/color-linear-gradient.html
// Use curves for connectors
// Use vertex to draw connecting shaped -- try to FILL based on these shapes
//

var ballArr = [];
var angle = 0;
var d1 = 10;
var midPointArr = [];
var trailHistory = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

}

function draw(){
  background(0);

  midPointArr = [];

  for (let i = 0; i < ballArr.length; i++){
    ballArr[i].move();
    ballArr[i].make();
  }

    connectDots();
//    connectAnchors();

    if (midPointArr.length > 0) {
      for (let i = 0; i < midPointArr.length; i++){
        trailHistory.push(midPointArr[i]);
  //      print(trailHistory);
      }
    }

    if (trailHistory.length > 25){
      trailHistory.splice(0, 1);
    }
    drawAnchorTrails();

}

function mousePressed() {
  angle = random(0,50);
  var ballInstance = new Ball(mouseX, mouseY, angle);
  ballInstance.make();
  ballArr.push(ballInstance);
}

function drawAnchorTrails(){

    push();
      fill("red");
      noStroke();
      for (let i = 0; i < trailHistory.length; i++){
        let tpX = trailHistory[i].x;
        let tpY = trailHistory[i].y;
        ellipse(tpX, tpY, 1);
      }
    pop();
}

function connectAnchors(){
  if(midPointArr.length <= 1){
    return;
  }
  strokeWeight(1);
  stroke("red");
  for (let i = 0; i < midPointArr.length; i++){

    if (i > 0){

      let a_x1 = midPointArr[i].x;
      let a_y1 = midPointArr[i].y;
      let a_x2 = midPointArr[i-1].x;
      let a_y2 = midPointArr[i-1].y;
      line(a_x1, a_y1, a_x2, a_y2);
    } else {
      let a_x1 = midPointArr[0].x;
      let a_y1 = midPointArr[0].y;
      let a_x2 = midPointArr[midPointArr.length-1].x;
      let a_y2 = midPointArr[midPointArr.length-1].y;
      line(a_x1, a_y1, a_x2, a_y2);
    }
  }

}

function connectDots(){
  if(ballArr.length <= 1){
    return;
  }
  push();
//  blendMode(EXCLUSION);

  for (let i = 0; i < ballArr.length; i++){

    if (i > 0){
      strokeWeight(1);
      stroke(100);
      line(ballArr[i].anchor.x, ballArr[i].anchor.y, ballArr[i-1].anchor.x, ballArr[i-1].anchor.y);

      push();
        noStroke();
        fill("red");
        let x2 = ballArr[i-1].anchor.x + ((ballArr[i].anchor.x - ballArr[i-1].anchor.x)/2);
        let y2 = ballArr[i-1].anchor.y + ((ballArr[i].anchor.y - ballArr[i-1].anchor.y)/2);
        ellipse(x2, y2, 10);
        midPointArr.push(createVector(x2,y2));

      pop();

    } else {
        strokeWeight(1);
        stroke(100);
        line(ballArr[ballArr.length-1].anchor.x, ballArr[ballArr.length-1].anchor.y, ballArr[0].anchor.x, ballArr[0].anchor.y);

        push();
          noStroke();
          fill("red");
          let x3 = ballArr[0].anchor.x + ((ballArr[ballArr.length-1].anchor.x - ballArr[0].anchor.x)/2);
          let y3 = ballArr[0].anchor.y + ((ballArr[ballArr.length-1].anchor.y - ballArr[0].anchor.y)/2);
          ellipse(x3, y3, 10);
          midPointArr.push(createVector(x3,y3));
        pop();
      }
    }
}

function Ball(x, y, angle){
  this.xPos = x;
  this.yPos = y;
  this.size = d1 + random(10, 150);
  this.angle = angle;
  this.speed = random(0,0.05);
  this.clr = color(random(0,255), random(0,255), random(0,255));
  this.anchor = createVector();
  this.dotHistory = [];

  this.move = function(){
    this.size = (sin(this.angle) + this.size);
    this.angle += this.speed;
//    this.anchor.x = this.anchor.x+(random(0, 50))
  }

  this.make = function (){
      strokeWeight(1);
      stroke(100);
      push();
        translate(this.xPos,this.yPos);
        rotate(this.angle);
        ellipse(0, 0, this.size, this.size+150);
      pop();
      fill(100, 10);
      this.anchor = createVector((cos(this.angle) * this.size/2)+this.xPos, (sin(this.angle)* this.size/2)+this.yPos);
      ellipse(this.anchor.x, this.anchor.y, 15);
  }
}

// push();
//   blendMode(EXCLUSION);
//   ellipse(mouseX-height/8,mouseY-height/8,width/12,width/12);
// pop();
