$(function(){

	// 吹き出しのdiv要素を用意
	var balloon = $('<div class="balloon"></div>').appendTo('body');

	// 吹き出しの位置を更新する関数
	function updateBalloonPosition(x, y){
		balloon.css({ left: x + 15, top: y });
	}

	// 吹き出しを表示する関数
	function showBalloon(){
		balloon.stop(); // 既にアニメーション中であった場合、止める
		balloon.css('opacity',0).show(); // 透明な状態で表示させる
		balloon.animate({ opacity: 1 }, 200); // 0.2秒で透明度1に
	}

	// 吹き出しを非表示にする関数
	function hideBalloon(){
		balloon.stop(); // 既にアニメーション中であった場合、止める
		balloon.animate(
			{ opacity: 0 }, 200, // 0.2秒で透明に
			function(){ balloon.hide(); } // 終わったら非表示に
		);
	}
	
	// クラスshowBalloonが付いた要素に対し吹き出しの表示処理を行う
	$('.showBalloon').each(function(){

		var element = $(this);

		// title属性値に指定された値を吹き出しのテキストとして使用する
		var text = element.attr('title');
		// title属性値を空にしてブラウザ既定の吹き出しを出さないようにする
		element.attr('title','');

		// mouseenter, mouseleaveイベントを設定
		element.hover(function(event){
			// 吹き出しのテキストを更新
			balloon.text(text);
			// カーソルの位置から吹き出しの位置を更新する
			updateBalloonPosition(event.pageX, event.pageY); 
			// 吹き出しを表示
			showBalloon();
		},function(){
			// 吹き出しを隠す
			hideBalloon();
		})
		
		// mousemoveイベントを設定
		element.mousemove(function(event){
			// カーソルの位置から吹き出しの位置を更新する
			updateBalloonPosition(event.pageX, event.pageY);
		});

	});
	
});
