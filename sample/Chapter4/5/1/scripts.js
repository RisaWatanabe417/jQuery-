$(function(){
	var interval = 3000;
	$('.slideshow').each(function(){
		var container = $(this);
		function switchImg(){
			var imgs = container.find('img');
			var first = imgs.eq(0);
			var second = imgs.eq(1);
			first.appendTo(container).fadeOut();
			second.fadeIn();
		}
		setInterval(switchImg, interval);
	});
});
