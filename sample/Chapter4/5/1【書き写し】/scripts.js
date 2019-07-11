$(function() {
	const interval = 3000;
	$('.slideshow').each(function() {
		const container = $(this);
		//フェード切り替え1回分の関数
		function switchImg() {
			//containaerの中にあるimg要素をすべて取得する
			const imgs = container.find('img');
			//先頭と2番目の要素を取得する
			const first = imgs.eq(0); //先頭のimg要素
			const second = imgs.eq(1); //2番目のimg要素
			//最初のimg要素を一番後ろに移動し、フェードアウトさせる
			first.appendTo(container).fadeOut();
			//2番目のimg要素をフェードインさせる
			second.fadeIn();
			//ここまでを関数switchImagで定義している
		}

		//setInterval(関数, ミリ秒)でミリ秒ごとに指定した関数が実行される
		//関数switchImgは1回分のアニメーション
		//inrervalは3000ミリ秒(3秒)を定義されている
		setInterval(switchImg, interval);
	})
})