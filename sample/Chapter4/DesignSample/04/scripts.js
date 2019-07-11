$(function(){
	var class_closed = 'closed';
	$('.accordion').each(function(){
		var dl = $(this);
		var allDt = dl.find('dt');
		var allDd = dl.find('dd');
		function closeAll(){
			allDt.addClass(class_closed);
			allDd.addClass(class_closed);
		}
		function open(dt, dd){
			dt.removeClass(class_closed);
			dd.removeClass(class_closed);
		}
		closeAll();
		allDt.click(function(){
			var dt = $(this);
			var dd = dt.next();
			closeAll();
			open(dt, dd);
		});
	});
});
