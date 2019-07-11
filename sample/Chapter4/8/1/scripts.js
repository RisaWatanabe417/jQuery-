$(function(){

	var threshold = 80;
	
	var hitArea = $('#hitArea');
	var result = $('#result');
	var doc = $(document);
	
	var startX, currentX;
	var sleeping = false;
	var touching = false;
	
	function notify(message){
		var div = $('<div></div>').html(message);
		result.prepend(div);
		div.fadeOut(1200, function(){
			div.remove();
		});
	}
	
	function evalSwipe(){
		if((startX + threshold) < currentX){
			sleeping = true;
			notify('Right!');
		}
		if(currentX < (startX - threshold)){
			sleeping = true;
			notify('Left!');
		}
	}
	
	hitArea.on('touchstart', function(event){
		event.preventDefault();
		var touches = event.originalEvent.touches;
		if(touches.length>1){
			return;
		}
		var touch = touches[0];
		startX = touch.pageX;
		touching = true;
	});
	
	doc.on('touchmove', function(event){
		if(!touching) {
			return;
		}
		if(sleeping) {
			return;
		}
		var touch = event.originalEvent.touches[0];
		currentX = touch.pageX;
		evalSwipe();
	});
	
	doc.on('touchend touchcanel', function(){
		if(!touching) {
			return;
		}
		touching = false;
		sleeping = false;
	});
	
});
