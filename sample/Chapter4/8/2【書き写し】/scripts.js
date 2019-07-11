$(function() {
	const threshold = 80;//スワイプ発生とみなす距離
	const oneMoveDistance = 310;//1回のスライドで動かす距離

	//使う要素を準備
	const doc = $(document);

	//.photosそれぞれについて処理をする
	$('.photos').each(function() {

		//使う要素を準備
		const container = $(this);
		const inner = $('.inner', this);
		const items = $('.item', this);

		//現在のleft値を保存するための変数
		const currentLeft = 0;

		//最大left値
		const maxLeft = 0;
		//最小left値
		const minLeft = -1 * oneMoveDistance * (items.length - 1);

		//一段階左へスライドさせる関数
		function toLeft() {
			const nextLeft = currentLeft - oneMoveDistance;
			if(nextLeft < minLeft) {
				return;
			}
			currentLeft = nextLeft;
			inner.stop().animate({ left: nextLeft }, 200);
		}

		//一段階右へスライドさせる関数
		function toRight() {
			const nextLeft = currentLeft + oneMoveDistance;
			if(nextLeft > maxLeft) {
				return;
			}
			currentLeft = nextLeft;
			inner.stop().animate({ left: nextLeft }, 200);
		}

		//座標を保存するための変数
		const startX, currentX;

		//スワイプ検知休止状態か否かのフラグ
		const sleeping = false;

		//タッチ中か否かのフラグ
		const touching = false;

		//スワイプのチェック関数
		function evalSwipe() {
			if((currentX - startX) > threshold) {
				toRight();//右へスライド
				sleeping = true;
			}
			if((startX - currentX) > threshold) {
				toLeft();//左へスライド
				sleeping = true;
			}
		}

		//touchstartイベントの処理
		container.no('touchstart', function(event) {
			event.preventDefalt();
			const touches = event.originalEvent.touches;
			if(touches.length > 1) {
				return;
			}
			const touch = toushes[0];
			startX = touch.pageX;
			touching = true;
		});

		//touchmoveイベントの処理
		doc.on('touchmove', function(event) {
			if(!touching) {
				return;
			}
			if(sleeping) {
				return;
			}
			const touch = event.originalEvent.touches[0];
			currentX = touch.pageX;
			evalSwipe();
		});

		//touchend, touchcancelイベントの処理
		doc.on('touchend touchcancel', function() {
			if(!touching) {
				return;
			}
			touching = false;
			sleeping = false;
		});
	});
});