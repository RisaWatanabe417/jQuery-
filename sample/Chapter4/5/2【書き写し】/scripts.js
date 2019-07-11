$(function() {
	const interval = 3000;
	$('.slideshow').each(function() {
		let timer; //timerを14行目で再代入しているためletを使用
		const container = $(this);

		//フェード切り替え1回分の関数
		function switchImg() {

			//a要素を取得
			const anchors = container.find('a');
			const first = anchors.eq(0);//先頭のa要素
			const second = anchors.eq(1);//2番目のa要素

			//最初のa要素を一番後ろに移動し、フェードアウトさせる
			first.appendTo(container).fadeOut();

			//2番目のa要素をフェードインさせる
			second.fadeIn();
		}

		//タイマー開始関数
		function startTimer() {
			timer = setInterval(switchImg, interval);
		}

		//タイマー停止関数
		function stopTimer() {
			clearInterval(timer);
		}
		container.find('a').hover(stopTimer, startTimer);
		startTimer();
	});
});