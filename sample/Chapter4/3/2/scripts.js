$(function(){
	var class_closed = 'closed';
	$('.accordion').each(function(){
		var dl = $(this);
		var allDt = dl.find('dt');
		var allDd = dl.find('dd');
		function closeAll(){
			allDt.addClass(class_closed); //すべてのdtのクラスに'closed'を追加
			allDd.addClass(class_closed); //すべてのddのクラスに'closed'を追加
		}
		function open(dt, dd){ //引数を指定している
			dt.removeClass(class_closed); //dtのクラスから'closed'を削除
			dd.removeClass(class_closed); //ddのクラスから'closed'を削除
		}
		closeAll(); //7行目でclosedAll関数は定義されているから省略できる
		allDt.click(function(){
			var dt = $(this);
			var dd = dt.next();
			closeAll(); //7行目で定義済み。すべて閉じる
			open(dt, dd); //11行目で定義されている。クリックしたものを開く
		});
	});
});
