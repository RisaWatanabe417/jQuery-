$(function() {
	//吹き出しdiv要素を用意する
	const balloon = $('<div class="balloon"></div>').appendTo('body');
	//吹き出し位置を変更する関数
	function updateBalloonPosition(x, y) {
		balloon.css({ left: x + 15, top: y });//吹き出しがマウスにかぶらないようにするために位置をズラしている
	}
	//クラスshowBalloonが付いた要素に対して吹き出しの表示処理を行う
	$('.showBalloon').each(function() {
		const element = $(this);
		//title属性値に指定された値を吹き出しのテキストとして使用する
		const text = element.attr('title');
		//title属性値を空にしてブラウザ既定の吹き出しを出さないようにする
		element.attr('title', '');
		//mouseenter, mouseleaveイベントを設定
		element.hover(function(event) {
			//吹き出しのテキストを更新
			balloon.text(text);
			//カーソルの位置から吹き出しの位置を更新する
			updateBalloonPosition(event.pageX, event.pageY);
			//吹き出しを表示
			balloon.show();
		},function() {
			//吹き出しを隠す
			balloon.hide();
		})
		//mousemoveイベントを設定
		element.mousemove(function(event) {
			//カーソルの位置から吹き出しの位置を更新する
			updateBalloonPosition(event.pageX, event.pageY);
		});
	});
});