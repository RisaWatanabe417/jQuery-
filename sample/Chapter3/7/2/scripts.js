$(function(){
	$('#div1').mouseenter(function(){
		$('#div1').text('マウスのりました');
	});
	$('#div1').mouseleave(function(){
		$('#div1').text('マウスおりました');
	});
});
