/**
 * rollover plugin
 */
$.fn.rollover = function(options) {
	options = $.extend({
		off: '_off',
		on: '_on'
	}, options);
	this.each(function() {
		const a = $(this);
		const img = a.find('img');
		const src_off = img.attr('src');
		const src_on = src_off.replace(options.off, options.on);
		$('<img />').attr('src', src_on);
		a.hover(function() {
			img.attr('src', src_on);
		}, function() {
			img.attr('src', src_off);
		});
	});
	return this;
};

/* 実行 */

$(function() {
	$('.rollover').rollover();
});