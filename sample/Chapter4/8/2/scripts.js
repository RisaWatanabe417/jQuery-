$(function(){
	
	var threshold = 80;
	var oneMoveDistance = 310;
	
	var doc = $(document);
	
	$('.photos').each(function(){
	
		var container = $(this);
		var inner = $('.inner', this);
		var items = $('.item', this);
		
		var currentLeft = 0;
		var maxLeft = 0;
		var minLeft = -1 * oneMoveDistance * (items.length - 1);
		
		function toLeft(){
			var nextLeft = currentLeft - oneMoveDistance;
			if(nextLeft < minLeft) {
				return;
			}
			currentLeft = nextLeft;
			inner.stop().animate({ left: nextLeft }, 200);
		};
		
		function toRight(){
			var nextLeft = currentLeft + oneMoveDistance;
			if(nextLeft > maxLeft) {
				return;
			}
			currentLeft = nextLeft;
			inner.stop().animate({ left: nextLeft }, 200);
		};
	
		var startX, currentX;
		var sleeping = false;
		var touching = false;
	
		function evalSwipe(){
			if((currentX - startX) > threshold) {
				toRight();
				sleeping = true;
			}
			if((startX - currentX) > threshold) {
				toLeft();
				sleeping = true;
			}
		};
		
		container.on('touchstart', function(event){
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
	
});
