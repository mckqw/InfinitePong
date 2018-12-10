var canvas;
var ctx;
var ballRadius;
var x;
var y;
var dx;
var dy;
var paddleHeight;
var paddleWidth;
var paddleRight;
var paddleLeft;
var upPressed;
var downPressed;
var wPressed;
var sPressed;
var start;
var spacePressed;
var background;
var score;
var scoreL;
var scoreR;
var id;
var beep;
var peeeep;
var rightPaddleSpeed;
var leftPaddleSpeed;
var counter;
var rightMove;
var leftMove;
var shapeColor;
var speed;
var index;
var colors;
var usr;

function initGraphics() {
    rightMove = false;
    leftMove = false;
    score = 0;
    scoreL = 0;
    scoreR = 0;
    counter = 0;
    rightPaddleSpeed = 8;
    leftPaddleSpeed = 8;
	speed = 4;
    beep = new Audio('ping_pong_8bit_beeep.ogg');
    peeeep = new Audio('ping_pong_8bit_peeeeeep.ogg');
    canvas = document.getElementById("Pong");
    ctx = canvas.getContext("2d");
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
    x = canvas.width / 2;
    y = canvas.height - 30;
    dx = 1;
    dy = -1;
    paddleHeight =(canvas.width*10)/100;
    paddleWidth =(canvas.height*3)/100;
	ballRadius = paddleWidth/2;
    paddleRight = (canvas.height - paddleHeight) / 2;
    paddleLeft = (canvas.height - paddleHeight) / 2;
    upPressed = false;
    downPressed = false;
    wPressed = false;
    sPressed = false;
    canvas.onmousedown = function (event) {
		addUsr();
    };
    background = new Image();
    background.src = "Background.png";

    // Make sure the image is loaded first otherwise nothing will draw.
    background.onload = function () {
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    };
    ctx.font = "75px Arial";
    canvas.fillStyle = "#ff0000";
	
	document.getElementById("BallSpeedSlider").onchange = function () {
        speed = document.getElementById("BallSpeedSlider").value;
        console.log("speed=" + speed);
		draw();
    };
	document.getElementById("ShapeColorMenu").onclick = function(){
	
		var index = document.getElementById("ShapeColorMenu").selectedIndex;
		var colors = document.getElementById("ShapeColorMenu").children;
		
		shapeColor = colors[index].innerHTML;
		setCookie("color", shapeColor, 1);
		console.log("Shape Color=" + shapeColor);
	}
}

function addUsr(){
		document.getElementById("popup2").style.visibility = "visible";
		document.getElementById("popup2").style.opacity = "1";
		document.getElementsByClassName("close")[1].onclick = function(){
				document.getElementById("popup2").style.visibility = "hidden";
				document.getElementById("popup2").style.opacity = "0";
		}
}
function submitUsr(){
	if(document.getElementById("createusr").value != ""){
		document.getElementById("popup2").style.visibility = "hidden";
		document.getElementById("popup2").style.opacity = "0";
		usr = document.getElementById("createusr").value;
		id = setInterval(draw, 20);
		start = false;
	}
}
 

//---- Init Cookies-----//
//Code Modifed from: http://www.w3schools.com/default.asp
function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
};

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

function checkColorCookie() {
    var user=getCookie("color");
    if (user != "") {
    } else {
       user = "white";
       if (user != "" && user != null) {
           setCookie("color", user, 1);
       }
    }
	return user;
};

//----------------------//
//----------------------//

var arrow_keys_handler = function (e) {
    switch (e.keyCode) {
        case 37:
        case 39:
        case 38:
        case 40: // Arrow keys
        case 32:
            e.preventDefault();
            break; // Space
        default:
            break; // do not block other keys
    }
};
window.addEventListener("keydown", arrow_keys_handler, false);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 40) {
        upPressed = true;
    } else if (e.keyCode == 38) {
        downPressed = true;
    }
    if (e.keyCode == 83) {
        wPressed = true;
    } else if (e.keyCode == 87) {
        sPressed = true;
    }
    if (e.keyCode == 32) {
        spacePressed = true;
        addUsr();
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 40) {
        upPressed = false;
    } else if (e.keyCode == 38) {
        downPressed = false;
    }
    if (e.keyCode == 83) {
        wPressed = false;
    } else if (e.keyCode == 87) {
        sPressed = false;
    }
    if (e.keyCode == 32) {
        spacePressed = false;
    }
}
	

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = checkColorCookie();
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    //Right Paddle
    ctx.rect((canvas.width - 10) - paddleWidth, paddleRight, paddleWidth, paddleHeight);
    //Left Paddle
    ctx.rect(10, paddleLeft, paddleWidth, paddleHeight);
    ctx.fillStyle = checkColorCookie();
    ctx.fill();
    ctx.closePath();
}

function calcBall() {
    //Bounding Box the same size as the paddle
    //   *for the change in direction of the ballRadius
    //   *for playing the beep sound
    if ((x - 2) < ((canvas.width - 10) - paddleWidth) + paddleWidth &&
        (x - 2) + (ballRadius) > ((canvas.width - 10) - paddleWidth) &&
        (y - 2) < paddleRight + paddleHeight &&
        (ballRadius) + (y - 2) > paddleRight) {
        // collision detected on Right Paddle!
        console.log("Detected Right");
        beep.play();
		scoreR++;
			console.log(scoreR);
        var centerY = paddleRight - (paddleHeight / 2);
        var centerX = ((canvas.width - 10) - paddleWidth);
        var angle = ((Math.abs(centerY-y))/paddleWidth)/10;
		console.log(angle);
        if(centerY-y < 0){
            dy = dy+angle;
        } else{
            dy = dy-angle;
        }
        dx = -dx;
    } else if ((x - 2) < 15 + paddleWidth &&
        (x - 2) + (ballRadius) > (paddleWidth) &&
        (y - 2) < paddleLeft + paddleHeight &&
        (ballRadius) + (y - 2) > paddleLeft) {
        // collision detected on Left Paddle!
        console.log("Detected Left");
        beep.play();
		scoreL++;
			console.log(scoreL);
        var centerY = paddleLeft - (paddleHeight / 2);
        var centerX = (paddleWidth);
        var angle = ((Math.abs(centerY-y))/paddleWidth)/10;
        if(centerY-y < 0){
            dy = dy+angle;
        } else{
            dy = dy-angle;
        }
        dx = -dx;
    }
    //Bounding Box larger than the size of the paddle
    //   *for the change increase of speed of ball
    if ((x - 2) < ((canvas.width - 30) - paddleWidth) + paddleWidth &&
        (x - 2) + (ballRadius) > ((canvas.width - 30) - paddleWidth) &&
        (y - 2) < paddleRight + paddleHeight &&
        (ballRadius) + (y - 2) > paddleRight) {
        if (rightMove) {
            speed +=0.01;
            console.log("Detected Speed:"+speed);
        }
        // collision detected on Right Paddle!
    } else if ((x - 2) < (30 + paddleWidth) + paddleWidth &&
        (x - 2) + (ballRadius) > (30 + paddleWidth) &&
        (y - 2) < paddleLeft + paddleHeight &&
        (ballRadius) + (y - 2) > paddleLeft) {
        if (leftMove) {
            speed +=0.01;
            console.log("Detected Speed:"+speed);
        }
        // collision detected on Left Paddle!
    }

    x += dx * speed;
    y += dy * speed;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        beep.play();
        dy = -dy;
    } else if (x + dx > canvas.width - 1) {
        ctx.fillText("Game Over", (canvas.width / 2) - 210, (canvas.height / 2));
        peeeep.play();
        clearInterval(id);
        setTimeout(reload, 2000);
		setTimeout(initGraphics, 2100);
	} else if (x + dx < 4) {
		drawStroked("Top Score Left", (background.width/2), (background.height-20), 20);
		drawStroked("Top Score Right", (background.width/2), (background.height-20), 20);
        ctx.fillText("Game Over", (canvas.width / 2) - 210, (canvas.height / 2));
        peeeep.play();
        clearInterval(id);
        setTimeout(reload, 2000);
		setTimeout(initGraphics, 2100);
    }
    calcBall();
    if (upPressed && paddleRight < canvas.height - paddleHeight) {
        paddleRight += rightPaddleSpeed;
        rightMove = true;
    } else if (downPressed && paddleRight > 0) {
        paddleRight -= rightPaddleSpeed;
        rightMove = true;
    } else {
        rightMove = false;
    }
    if (wPressed && paddleLeft < canvas.height - paddleHeight) {
        paddleLeft += leftPaddleSpeed;
        leftMove = true;
    } else if (sPressed && paddleLeft > 0) {
        paddleLeft -= leftPaddleSpeed;
        leftMove = true;
    } else {
        leftMove = false;
    }

    var txt = scoreL + "   " + scoreR;
    ctx.fillText(txt, (canvas.width / 2) - 75, 75);
    counter += 20;
    if (counter == 1000) {
        counter = 0;
        console.log("round");
    }
}

function drawStroked(text, x, y, size) {
	var font = size+"px Sans-serif";
    ctx.font = font;
    ctx.strokeStyle = checkColorCookie();
    ctx.lineWidth = 1;
	ctx.textAlign="center"; 
    ctx.strokeText(text, x, y);
    ctx.fillStyle = 'white';
    ctx.fillText(text, x, y);
	console.log(y);
}

function reload() {
    document.location.reload();
}
