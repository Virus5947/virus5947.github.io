if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", function() {
        loaded();
    });
} else if (document.attachEvent) {
    document.attachEvent("onreadystatechange", function() {
        loaded();
    });
}

function loaded() {

    setInterval(loop, 400);

}

var x = 0;

var titleText = [ "D", "DI", "DIS", "DISC", "DISCO", "DISCOR", "DISCORD", "DISCORD ", "DISCORD T", "DISCORD TO", "DISCORD TOO", "DISCORD TOOL", "DISCORD TOOLS" ];

function loop() {

    document.getElementsByTagName("title")[0].innerHTML = titleText[x++%titleText.length];
	
}