$(function(){

	// ===============================================
	// タブに関する処理
	// ===============================================
	
	var currentTabIndex = 0;
	
	// インジケーターを準備
	
	var tabIndicatorPointer = $('#tabIndicator .pointer');
	
	function changeIndicatorTo(index){
		// 渡されたindexに相当する位置にポインタを移動
		var val = index * 80;
		tabIndicatorPointer.css('left', val);
	}
	
	// タブを準備
	
	var tabs = $('#tabContainer a');
	var tabContentDivs = $('.tabContent').hide();
	tabContentDivs.eq(0).show();
	
	tabs.each(function(i, el){
		// クリックされた時、対応するタブ表示を行わせる
		$(el).click(function(e){
			e.preventDefault();
			changeIndex(i);
		});
	});
	
	// 対応するindexに相当するタブ表示を行う関数
	
	function changeIndex(index) {
		if(currentTabIndex === index){
			return;
		}
		currentTabIndex = index;
		changeIndicatorTo(index);
		tabContentDivs.stop().hide();
		window.scrollTo(0, 0);
		tabContentDivs.eq(index).fadeIn(250);
	}
	
	// 次のタブ表示を行う関数
	
	function toNext(){
		if(currentTabIndex === 0){
			return;
		}
		var nextIndex = currentTabIndex - 1;
		changeIndex(nextIndex);
	}
	
	// 前のタブ表示を行う関数
	
	function toPrev(){
		if(currentTabIndex === tabs.length-1){
			return;
		}
		var nextIndex = currentTabIndex + 1;
		changeIndex(nextIndex);
	}
	
	// ===============================================
	// スワイプに関連する処理
	// ===============================================

	// スワイプしきい値

	var threshold = 80;
	
	// スワイプに関する変数ら
	
	var doc = $(document);
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
	
	function evalSwipe(event){
	
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
		if((startX + threshold) < currentX){
			sleeping = true;
			toNext(); // 次のタブへ
		}
		if(currentX < (startX - threshold)){
			sleeping = true;
			toPrev(); // 前のタブへ
		}
		
	}
	
	// touchstartイベントの処理
	
	doc.on('touchstart', function(event){
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
	
});
