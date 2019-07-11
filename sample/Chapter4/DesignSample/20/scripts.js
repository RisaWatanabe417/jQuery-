$(function(){

	var threshold = 80; // スワイプ発生とみなす距離
	var oneMoveDistance = 330; // 一回のスライドで動かす距離
	
	// 使う要素を準備
	var doc = $(document);

	// .photosそれぞれについて処理する
	$('.photos').each(function(){
	
		// ===============================================
		// スライドに関する処理
		// ===============================================
		
		// スライドに関する要素群を準備
		var container = $(this);
		var inner = container.find('.inner');
		var items = container.find('.item');
		
		// ドット
		var $dots = container.find('.dotContainer span');
	
		// 現在のleft値を保存するための変数
		var currentLeft = 0;
		// 最大left値
		var maxLeft = 0;
		// 最小left値
		var minLeft = -1 * oneMoveDistance * (items.length - 1);
		
		// 一段階左へスライドさせる関数
		var toLeft = function(){
		
			var nextLeft = currentLeft - oneMoveDistance;
			
			if(nextLeft < minLeft) {
				return;
			}
			
			// 写真らをスライド
			currentLeft = nextLeft;
			inner.stop().animate({ left: nextLeft }, 200);
			
			// ドットを移動
			var currentDot = $dots.filter('.current');
			currentDot.removeClass('current');
			currentDot.next().addClass('current');
			
		};
		
		// 一段階右へスライドさせる関数
		var toRight = function(){
		
			var nextLeft = currentLeft + oneMoveDistance;
			
			if(nextLeft > maxLeft) {
				return;
			}
			
			// 写真らをスライド
			currentLeft = nextLeft;
			inner.stop().animate({ left: nextLeft }, 200);
			
			// ドットを移動
			var currentDot = $dots.filter('.current');
			currentDot.removeClass('current');
			currentDot.prev().addClass('current');
			
		};
		
		// ===============================================
		// スワイプに関連する処理
		// ===============================================
	
		// 座標を保存するための変数
		var startX, currentX, startY, currentY;
		
		var sleeping = false; // スワイプ検知休止フラグ
		var touching = false; // タッチ中か否か
		var horizontalSwipe = false; // 横方向のスワイプか否か
		var verticalSwipe = false; // 縦方向のスワイプか否か
	
		// スワイプ方向の検知
		
		function checkSwipeDirection() {
			// スワイプ開始座標より10px以上下に移動していたら縦移動
			if((startY + 10) < currentY) {
				verticalSwipe = true;
				return;
			}
			if((startY - 10) > currentY) {
				verticalSwipe = true;
				return;
			}
			// スワイプ開始座標より5px以左右に移動していたら横移動
			if((startX + 5) < currentX) {
				horizontalSwipe = true;
				return;
			}
			if((startX - 5) > currentX) {
				horizontalSwipe = true;
				return;
			}
		}
		
		// スワイプ評価
		
		var evalSwipe = function(event){
		
			// スワイプ方向がまだ未検出の場合、方向をチェック
			if(!verticalSwipe && !horizontalSwipe){
				checkSwipeDirection();
				
				// もし横方向のスワイプであればスクロールを止める
				// （touchstartかtouchmoveでpreventDefaultすればスクロールとまる）
				if(horizontalSwipe) {
					event.preventDefault();
				}
				// 縦方向のスワイプであれば、それは通常の画面スクロールと
				// 判断し、もうスワイプの検知を行わなくする
				if(verticalSwipe) {
					sleeping = true;
				}
			}
			
			// 左右へのスワイプが発生したかをチェック
			if((currentX - startX) > threshold) {
				toRight(); // 右へスライド
				sleeping = true;
			}
			if((startX - currentX) > threshold) {
				toLeft(); // 左へスライド
				sleeping = true;
			}
			
		};
		
		// touchstartイベントの処理
		
		container.on('touchstart', function(event){
			var touches = event.originalEvent.touches;
			if(touches.length>1){
				return;
			}
			var touch = touches[0];
			startX = touch.pageX; // X座標を保存
			startY = touch.pageY; // Y座標を保存
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
			currentX = touch.pageX; // X座標を保存
			currentY = touch.pageY; // Y座標を保存
			evalSwipe(event);
		});
		
		// touchend, touchcancelイベントの処理
		
		doc.on('touchend touchcanel', function(){
			if(!touching) {
				return;
			}
			// 各種フラグをリセット
			touching = false;
			sleeping = false;
			horizontalSwipe = false;
			verticalSwipe = false;
		});
		
	}); // photos each
	
});
