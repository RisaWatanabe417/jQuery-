$(function(){
	
	// 間隔は3秒
	var interval = 3000;

	// slideshowというクラスが付いた要素それぞれについて処理する
	$('.slideshow').each(function(){

		// タイマーを入れておく変数を準備
		var timer;

		// jQueryオブジェクトを準備
		var container = $(this);

		// フェード切り替え一回分の関数
		function switchImg(){

			// a要素を取得
			var anchors = container.find('a');

			var first = anchors.eq(0); // 先頭のa要素
			var second = anchors.eq(1); // 2番目のa要素

			// 最初のa要素を一番後ろに移動し、フェードアウトさせる
			first.appendTo(container).fadeOut();

			// 2番目のa要素をフェードインさせる
			second.fadeIn();

		}

		// タイマー開始関数
		function startTimer(){
			timer = setInterval(switchImg, interval);
		}

		// タイマー停止関数
		function stopTimer(){
			clearInterval(timer);
		}

		// イベントの設定：
		// マウスオーバーしたらタイマーを止め、
		// マウスアウトしたらタイマーを開始
		container.find('a').hover(stopTimer,startTimer);

		// 最初のタイマーを開始
		startTimer();

	});

});
