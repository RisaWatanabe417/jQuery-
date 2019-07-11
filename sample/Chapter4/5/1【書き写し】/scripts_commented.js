$(function(){

	// 間隔は3秒
	var interval = 3000;

	// slideshowというクラスが付いた要素それぞれについて処理する
	$('.slideshow').each(function(){

		// img要素らを囲んでいるdiv要素を取得
		var container = $(this);

		// フェード切り替え一回分の関数
		function switchImg(){

			// img要素を全て取得
			var imgs = container.find('img');

			// 先頭・2番目の要素を取得
			var first = imgs.eq(0); // 先頭のimg要素
			var second = imgs.eq(1); // 2番目のimg要素

			// 最初のimg要素を一番後ろに移動し、フェードアウトさせる
			first.appendTo(container).fadeOut();

			// 2番目のimg要素をフェードインさせる
			second.fadeIn();

		}

		// 3秒ごとにswitchImgを実行
		setInterval(switchImg, interval);

	});

});
