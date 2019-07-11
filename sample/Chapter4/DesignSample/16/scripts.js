$(function(){

	var balloon = $('<div class="balloon"><dl>' +
	'<dt>title:</dt><dd class="title">Consuer Attributes</dd>' +
	'<dt>date:</dt><dd class="date">2014-04-01</dd>' +
	'<dt>size:</dt><dd class="size">1.5MB</dd>' +
	'</dl></div>');
	var balloonTitleDd = balloon.find('.title');
	var balloonDateDd = balloon.find('.date');
	var balloonSizeDd = balloon.find('.size');
	
	balloon.appendTo('body');
	
	function updateBalloonType(type){
		balloon.attr('class', 'balloon ' + type);
	}
	
	function updateBalloonText(title, date, size){
		balloonTitleDd.text(title);
		balloonDateDd.text(date);
		balloonSizeDd.text(size);
	}
	 
	function updateBalloonPosition(x, y){
		balloon.css({ left: x + 20, top: y - 30 });
	}
  
	function showBalloon(){
		balloon.stop();
		balloon.css('opacity',0).show();
		balloon.animate({ opacity: 1 }, 200);
	}
  
	function hideBalloon(){
		balloon.stop();
		balloon.animate(
			{ opacity: 0 }, 200,
			function(){ balloon.hide(); }
		);
	}
  
	$('.tipOpener').each(function(){
		var element = $(this);
		element.attr('title','');
		element.hover(function(event){
			updateBalloonType(
				element.attr('data-balloon-type')
			);
			updateBalloonText(
				element.attr('data-balloon-title'),
				element.attr('data-balloon-date'),
				element.attr('data-balloon-size')
			);
			updateBalloonPosition(event.pageX, event.pageY); 
			showBalloon();
		},function(){
			hideBalloon();
		});
		element.mousemove(function(event){
			updateBalloonPosition(event.pageX, event.pageY);
		});
	});
  
});
