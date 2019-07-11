$(function(){

	var class_closed = 'closed'; // 閉じるためのクラスを定義
	
	$('.accordion').each(function(){
		
		// jQueryオブジェクトを用意
		var dl = $(this);
		var allDt = dl.find('dt');
		var allDd = dl.find('dd');

		// 全てを閉じる関数
		function closeAll(){
			allDt.addClass(class_closed); // 全てのdtのクラスに 'closed' 追加
			allDd.addClass(class_closed); // 全てのddのクラスに 'closed' 追加
		}

		// 指定された要素を開く関数
		function open(dt, dd){
			dt.removeClass(class_closed); // dtのクラスから 'closed' 削除
			dd.removeClass(class_closed); // ddのクラスから 'closed' 削除
		}

		// まずは全てのddを閉じる
		closeAll();

		// イベントを設定
		allDt.click(function(){

			var dt = $(this);
			var dd = dt.next();

			closeAll(); // 全て閉じ
			open(dt, dd); // クリックされたものを開く

		});

	});

});
