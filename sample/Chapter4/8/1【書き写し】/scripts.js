$(function() {
	//スワイプ発生とみなす距離を定義
	//左右に80px以上指が動くとスワイプとみなす
	const threshold = 80;

	//使う要素を準備する
	const hitArea = $('#hitArea');//タッチエリアを取るためのヒットエリア
	const result = $('#result');//メッセージを表示させるためのコンテナ
	const doc = $(document);//documentイベントを使用するため、jQueryオブジェクト化してdocの中に入れておく

	//座標を保存するための変数
	//startXにはtouchstart時のX座標を入れておく
	//currentXにはtouchmove時のX座標を入れておく
	const startX, currentX;

	//スワイプ検知休止状態か否かをチェックするためのフラグ
	const sleeping = false;

	//タッチ中かどうかを知るためのフラグ
	const touching = false;

	//メッセージ通知用関数
	function notify(message) {
		const div = $('<div></div>').html(message);
		result.prepend(div);
		div.fadeOut(1200, function() {
			div.remove();//フェードアウトし終わったら要素は削除される
		});
	}

	//スワイプのチェック関数
	function evalSwipe() {
		if((startX + threshold) < currentX) {//右スワイプの発生をチェック
			sleeping = true;//スワイプが発生したらtrueとし、スワイプ検知を休止させる
			notify('Right!');//メッセージを通知
		}
		if(currentX < (startX - threshold)) {//左スワイプの発生をチェック
			sleeping = true;//スワイプが発生したらtrueとし、スワイプ検知を休止させる
			notify('Left!');//メッセージを通知
		}
	}

	//touchstartイベント処理
	hitArea.on('touchstart', function(event) {//タッチした場所がhitArea内であればtochstartイベントが発生する
		event.preventDefault();//画面スクロールを停止させている(ブラウザの規定の挙動を停止させている)
		const touches = event.originalEvent.touches;//変数touchesにはユーザーがタッチした指の情報が入る
		if(touches.lenght > 1) {//2本以上の指で操作された場合、returnを返す
			return;
		}
		const touch = touches[0];//触れられた指の情報が入る
		startX = touch.pageX;//タッチされた位置のX座標をstartXに格納
		touching = true;//タッチ状態が始まったことが分かるようにしている
	});

	//touchmoveイベントの処理
	doc.on('touchmove', function() {
		if(!touching) {
			return;
		}
		if(sleeping) {
			return;
		}
		const touch = event.originalEvent.touches[0];
		currentX = touch.pageX;//指のタッチ情報をcurrentXに入れる
		evalSwipe();//指が動くたびにスワイプのチェックははじまる
	});

	//touchend,touchcancelイベントの処理
	//tachendは指が離れたときに起こる
	//tachcancelはタッチがキャンセルされたときに起こる
	doc.on('touchend touchcancel', function() {
		if(!touching) {
			return;
		}
		touching = false;//タッチ中だったらfalse
		sleeping = false;//タッチ中だったらfalse
	});
});