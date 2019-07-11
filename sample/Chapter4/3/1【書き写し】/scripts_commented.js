$(function(){
	
	$('.accordion').each(function(){
		
		// jQueryオブジェクトを用意
		var dl = $(this);
		var allDt = dl.find('dt');
		var allDd = dl.find('dd');

		// まずは全てのddを閉じる
		allDd.hide();

		// dtのカーソルを変更
		allDt.css('cursor','pointer');

		// イベントを設定
		allDt.click(function(){

			var dt = $(this);
			var dd = dt.next(); // 次の要素を取得

			// クリックされたものだけ開く
			allDd.hide();
			dd.show();

			// カーソル変更
			allDt.css('cursor','pointer');
			dt.css('cursor','default');

		});

	});

});
