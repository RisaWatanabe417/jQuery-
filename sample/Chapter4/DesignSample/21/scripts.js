$(function(){

	// 種々の設定値
	
	var threshold = 80; // スワイプ発生とみなす距離
	var oneMoveDistance = 300; // 一回のスライドで動かす距離
	
	// indexに関する変数
	
	var currentIndex = 0; // 現在のindex
	var minIndex = 0; // 最小index
	var maxIndex = $('#calenderInner table').length - 1; // 最大index
	
	// 使う要素を準備
	
	var doc = $(document);
	
	// ===============================================
	// 見出しに関する処理
	// ===============================================
	
	var title = $('#calendarTitle');
	
	var monthLabels = [
		'2014 January',
		'2014 February',
		'2014 March ',
		'2014 April',
		'2014 May',
		'2014 June',
		'2014 July',
		'2014 August',
		'2014 September',
		'2014 October',
		'2014 November',
		'2014 December'
	];
	
	// 現在のindexに応じてラベルの内容を見出しとして設定
	
	function updateTitle(){
		title.text(monthLabels[currentIndex]);
	}
	
	updateTitle(); // はじめは1月のカレンダーへ
	
	// ===============================================
	// カレンダースライドに関する処理
	// ===============================================
	
	var calendarInner = $('#calenderInner');
	
	// 現在のindexに応じた位置へスライド
	
	function slideCalendar(){
		var nextLeft = -1 * oneMoveDistance * currentIndex;
		calendarInner.stop().animate({ left: nextLeft }, 200);
	}
	
	// ===============================================
	// ボタンの挙動に関する処理
	// ===============================================
	
	var prevButton = $('#prevButton');
	var nextButton = $('#nextButton');
	
	// 現在のindexに応じてボタンの状態をアップデート
	
	function updateButtonStats(){
	
		// indexが最小だったら前へボタンを非活性に
		if(currentIndex === minIndex){
			prevButton.addClass('disabled');
		} else {
			prevButton.removeClass('disabled');
		}
		
		// indexが最大だったら津次へボタンを非活性に
		if(currentIndex === maxIndex){
			nextButton.addClass('disabled');
		} else {
			nextButton.removeClass('disabled');
		}
		
	}
	
	// クリックされた時の挙動を設定
	
	prevButton.click(function(e){
		e.preventDefault();
		toRight();
	});
	nextButton.click(function(e){
		e.preventDefault();
		toLeft();
	});
	
	
	updateButtonStats(); // 初期状態のボタン表示を更新
	
	// ===============================================
	// インデックス変更を管理する処理
	// ===============================================
	
	// 次のインデックスへ変更
	
	function updateIndex(nextIndex){
	
		// 許容範囲外だったら何もしない
		if(nextIndex < minIndex) { return; }
		if(nextIndex > maxIndex) { return; }
		
		// 次のindexを現在のindexとして扱う
		currentIndex = nextIndex;
		
		// 各コンポーネントをアップデート
		updateTitle();
		updateButtonStats();
		slideCalendar();
		
	}
	
	// 左へ
	function toLeft(){
		updateIndex(currentIndex + 1);
	}
	// 右へ
	function toRight(){
		updateIndex(currentIndex - 1);
	}
	
	// ===============================================
	// スワイプに関する処理
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
