
//Resizer for About page//
var w = window;
var d = document;
var e = d.documentElement;
var currentUsr;
var usrId;
var currentPass;

window.onload =  function init(){
	usrId = 0;
	currentUsr = "";
	currentPass = "";
	initGraphics();
	var canvas = document.getElementById("Pong");
	var style = canvas.style;
	style.marginLeft = "auto";
	style.marginRight = "auto";
	var parentStyle = canvas.parentElement.style;
	parentStyle.textAlign = "center";
	parentStyle.width = "100%";
	var list = document.getElementById("list");
	var items = list.getElementsByTagName("li");
	for (var j = 0; j < items.length; ++j) {
		// do something with items[j]
		if (j === 0){
			items[j].firstChild.style.display = 'block';
		}else{
			items[j].firstChild.style.display = 'none';
		}
	}
		
	
	items[2].firstChild.style.display = 'block';
	
	/* document.getElementById("loginbtn").style.display = "none"; */
	
	document.getElementById("iframe").width = (e.clientWidth-150);
	document.getElementById("iframe").height = (e.clientHeight-150);
/* 
	document.getElementById("usr").onclick = function(){
		document.getElementById("createError").innerHTML = " ";
		document.getElementById("loginError").innerHTML = "Login";
		document.getElementById("loginError").className = "";
	};
	document.getElementById("pass").onclick =  function(){
		document.getElementById("createError").innerHTML = " ";
		document.getElementById("loginError").innerHTML = "Login";
		document.getElementById("loginError").className = "";
	};
	document.getElementById("createusr").onclick =  function(){
		document.getElementById("createError").innerHTML = " ";
		document.getElementById("loginError").innerHTML = "Login";
		document.getElementById("loginError").className = "";
	};
	document.getElementById("createpass1").onclick =  function(){
		document.getElementById("createError").innerHTML = " ";
		document.getElementById("loginError").innerHTML = "Login";
		document.getElementById("loginError").className = "";
	};
	document.getElementById("createpass2").onclick =  function(){
		document.getElementById("createError").innerHTML = " ";
		document.getElementById("loginError").innerHTML = "Login";
		document.getElementById("loginError").className = "";
	}; */
}

function clear(){
	console.log("here");
	document.getElementById("createError").innerHTML = " ";
	
};

window.onresize = function(event) {
		document.getElementById("iframe").width = (e.clientWidth-150);
		document.getElementById("iframe").height = (e.clientHeight-150);
		console.log(x+" "+y);
};

function Reload() {
    location.reload();
}

function openItem(id){
	var list = document.getElementById("list");
	var items = list.getElementsByTagName("li");		
	for (var j = 0; j < items.length; ++j) {
		// do something with items[j]
		//console.log(id);
		if(items[j].firstChild === id){
			items[j].firstChild.style.display = 'block';
			items[j].firstChild.style.marginLeft = "250px";
		}else{
			items[j].firstChild.style.display = 'none';
		}
	}
	items[2].firstChild.style.display = 'block';	
	window.setTimeout(closeNav,100);
}
function openNav() {
	var show = findDisplay();
	if (document.getElementById("mySidenav").style.width === "250px"){
		closeNav();
	} else{
	/* document.getElementById("sideNavBottom").style.width = "250px"; */
		
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById(show.id).style.marginLeft = "250px";
	//login();
	}
	//Switching the class values are more efficient
}
function closeNav() {
	var show = findDisplay();
	/*closeLogin();
	document.getElementById("welcome").style.display = "none";
	document.getElementById("notUsr").style.display = "none";
	document.getElementById("sideNavBottom").style.width = "0";
	document.getElementById("loginbtn").style.display = "none";
	document.getElementById("notUsr").style.display = "none"; */
	
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById(show.id).style.marginLeft = "0";
}

/* function openLogin(){
	document.getElementById("login").style.display = "block";
	document.getElementById("login").style.height = "300px";
	document.getElementById("createError").innerHTML = " ";
	document.getElementById("loginError").innerHTML = "Login";
	document.getElementById("loginError").className = "";
}

function closeLogin(){
	document.getElementById("login").style.height = "0";
	document.getElementById("login").style.display = "none";
} */

function findDisplay(){
	var list = document.getElementById("list");
	var items = list.getElementsByTagName("li");		
	for (var j = 0; j < items.length; ++j) {
		// do something with items[j]
		if(items[j].firstChild.style.display === 'block'){
			return items[j].firstChild;
		}
	}
}
/* 
function switchUsr(){
	document.getElementById("loginbtn").style.display = "block";
	document.getElementById("welcome").style.display = "none";
	document.getElementById("notUsr").style.display = "none";
}

//---- Init Cookies-----//
//Code Modifed from: http://www.w3schools.com/default.asp
function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
	var numUsrs = getCookie("numUsr");
    document.cookie = cname+"="+cvalue+"; "+expires;
};

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
			console.log(c);
            c = c.substring(1);
        }
		console.log(c);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};


function checkLoginCookie(inUsr,inPass) {
    var usr=getCookie("usr");
	var res = usr.split(",");
	if(inUsr == res[0] && inPass == res[1]){
		console.log(res[0]+" "+res[1]);
		return true;
	} else{
		return false;
	}
};

//----------------------//
//----------------------//

function createLogin(){
	document.cookie = "usr=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
	var usr = document.getElementById("createusr").value;
	var pass1 = document.getElementById("createpass1").value;
	var pass2 = document.getElementById("createpass2").value;
	if(pass1 == "" || pass == "" || usr == ""){
		document.getElementById("createError").innerHTML = "Must Enter a Username and Password!";
	} else {
		if(pass1 == pass2){
			setCookie("usr",usr+","+pass2,365);
		} else {
			document.getElementById("createError").innerHTML = "Passwords Must Match!";
		}
	}
}

function login(){
	var cookie = document.getElementById("usr").value;
	var usr = cookie.substring(',');
	console.log(usr);
	if(checkLoginCookie(usr) == true){
		closeLogin();
		document.getElementById("loginbtn").style.display = "none";
		document.getElementById("notUsr").style.display = "block";
		document.getElementById("welcome").style.display = "block";
		document.getElementById("welcome").innerHTML = "Welcome, "+usr;
		return true;
	}
	else{
		document.getElementById("loginbtn").style.display = "block";
		document.getElementById("welcome").style.display = "none";
		document.getElementById("notUsr").style.display = "none";
		document.getElementById("loginError").innerHTML = "Incorect Login!";
		document.getElementById("loginError").className = "error";
		return false;
	}
} 

*/
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-941940-28']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
  
function save(){
	var response=document.getElementById("response");
	var data = 'data='+document.getElementById("data").value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
	  if (xmlhttp.readyState==4 && xmlhttp.status==200){
	    response.innerHTML='<a href="files/'+xmlhttp.responseText+'.txt">'+xmlhttp.responseText+'.txt</a>';
	  }
	}
	xmlhttp.open("POST","save.php",true);
        //Must add this request header to XMLHttpRequest request for POST
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(data);
}
