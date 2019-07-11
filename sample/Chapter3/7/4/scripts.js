$(function(){
	$('#input1').focus(function(){
		$('#input1').addClass('active');
	});
	$('#input1').blur(function(){
		$('#input1').removeClass('active');
	});
});
