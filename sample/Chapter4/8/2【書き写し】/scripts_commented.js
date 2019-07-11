$(function(){

	var threshold = 80; // スワイプ発生とみなす距離
	var oneMoveDistance = 310; // 一回のスライドで動かす距離
	
	// 使う要素を準備
	var doc = $(document);

	// .photosそれぞれについて処理する
	$('.photos').each(function(){
	
		// 使う要素を準備
		var container = $(this);
		var inner = $('.inner', this);
		var items = $('.item', this);
		
		// 現在のleft値を保存するための変数
		var currentLeft = 0;
		
		// 最大left値
		var maxLeft = 0;
		// 最小left値
		var minLeft = -1 * oneMoveDistance * (items.length - 1);
		
		// 一段階左へスライドさせる関数
		function toLeft(){
			var nextLeft = currentLeft - oneMoveDistance;
			if(nextLeft < minLeft) {
				return;
			}
			currentLeft = nextLeft;
			inner.stop().animate({ left: nextLeft }, 200);
		}
		
		// 一段階右へスライドさせる関数
		function toRight(){
			var nextLeft = currentLeft + oneMoveDistance;
			if(nextLeft > maxLeft) {
				return;
			}
			currentLeft = nextLeft;
			inner.stop().animate({ left: nextLeft }, 200);
		}
	
		// 座標を保存するための変数
		var startX, currentX;
		
		// スワイプ検知休止状態か否かのフラグ
		var sleeping = false;
		
		// タッチ中か否かのフラグ
		var touching = false;
	
		// スワイプのチェック関数
		function evalSwipe(){
			if((currentX - startX) > threshold) {
				toRight(); // 右へスライド
				sleeping = true;
			}
			if((startX - currentX) > threshold) {
				toLeft(); // 左へスライド
				sleeping = true;
			}
		}
		
		// touchstartイベントの処理
		container.on('touchstart', function(event){
			event.preventDefault();
			var touches = event.originalEvent.touches;
			if(touches.length>1){
				return;
			}
			var touch = touches[0];
			startX = touch.pageX;
			touching = true;
		});
	
		// touchmoveイベントの処理
		doc.on('touchmove', function(event){
			if(!touching) {
				return;
			}
			if(sleeping) {
				return;
			}
			var touch = event.originalEvent.touches[0];
			currentX = touch.pageX;
			evalSwipe();
		});
		
		// touchend, touchcancelイベントの処理
		doc.on('touchend touchcanel', function(){
			if(!touching) {
				return;
			}
			touching = false;
			sleeping = false;
		});
		
	});
  
});
