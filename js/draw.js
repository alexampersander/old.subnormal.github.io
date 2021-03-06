var elem = document.getElementById('draw-animation');
var two = new Two({
    width: 285,
    height: 250
}).appendTo(elem);

var circle = two.makeCircle(-71, 0, 50);
var rect = two.makeRectangle(70, 0, 100, 100);
circle.fill = '#FF8000';
rect.fill = 'rgba(0, 200, 255, 0.75)';

var group = two.makeGroup(circle, rect);
group.translation.set(two.width / 2, two.height / 2);
group.scale = 0;
group.noStroke();

/* Bind a function to scale and rotate the group to the
animation loop. */
two.bind('update', function (frameCount) {
    /* Called everytime two.update() is called.
	Effectively 60 times per second.
	In case you want this to loop:
	if (group.scale > 0.9999) {
		group.scale = group.rotation = 0;
	}*/
    var t = (1 - group.scale) * 0.125;
    group.scale += t;
    group.rotation += t * 4 * Math.PI;
}).play();