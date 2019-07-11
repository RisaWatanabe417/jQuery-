$(function(){
	
	// スワイプ発生とみなす距離
	var threshold = 80;
	
	// 使う要素を準備
	var hitArea = $('#hitArea');
	var result = $('#result');
	var doc = $(document);
	
	// 座標を保存するための変数
	var startX, currentX;
	
	// スワイプ検知休止状態か否かのフラグ
	var sleeping = false;
	
	// タッチ中か否かのフラグ
	var touching = false;
	
	// メッセージ通知用関数
	function notify(message){
		var div = $('<div></div>').html(message);
		result.prepend(div);
		div.fadeOut(1200, function(){
			div.remove();
		});
	}
	
	// スワイプのチェック関数
	function evalSwipe(){
		if((startX + threshold) < currentX){
			sleeping = true;
			notify('Right!');
		}
		if(currentX < (startX - threshold)){
			sleeping = true;
			notify('Left!');
		}
	}
	
	// touchstartイベントの処理
	hitArea.on('touchstart', function(event){
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
