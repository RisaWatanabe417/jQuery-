$(function() {
	const rollover = $('.rollover'); //rolloverをjQueryオブジェクト化する
	rollover.each(function() { //eachは各々を意味する
		const a = $(this); //1つずつ順番に引っ張ってくる
		const img = a.find('img'); //aの中にあるimgを探す
		const src_off = img.attr('src'); //src_offとsrc_onは変数
		const src_on = src_off.replace('_off','_on');
		$('<img />').attr('src',src_on); //??
		//hoverしたときの動きについて
		a.hover(function() {
			img.attr('src', src_on); //hover前半はオンしたとき、後半はオフしたとき
		},function() {
			img.attr('src', src_off);
		});
	});
});