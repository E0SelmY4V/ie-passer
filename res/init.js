onload = function () {
	var d = document.getElementsByTagName('div')[0],
		c = document.getElementsByTagName('pre')[0].innerHTML,
		o = eval(c);
	for (var i in o) {
		var n = document.createElement('button');
		n.innerHTML = i;
		n.onclick = o[i];
		d.appendChild(n)
	}
};
document.getElementsByTagName('script')[0].__reqjs = function (path) {
	for (var i = 0; i < path.length; i++) {
		var a = document.createElement('script');
		a.type = 'text/javascript';
		a.src = path[i];
		document.appendChild(a);
	}
};