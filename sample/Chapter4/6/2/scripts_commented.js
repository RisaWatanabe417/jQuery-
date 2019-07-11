$(function(){
	
	$('.tabSet').each(function(){

		// 使う要素を準備
		var topDiv = $(this);
		var anchors = topDiv.find('ul.tabs a'); // タブ部分のa要素
		var panelDivs = topDiv.find('div.panel'); // パネルのdiv要素
		var lastAnchor; // 最後にクリックされたa要素を保存するための変数
		var lastPanel; // 最後に開かれたパネルを保存するための変数

		// タブ部分を表示
		anchors.show();

		// 初めから開いておくパネルを取得
		lastAnchor = anchors.filter('.on');
		lastPanel = $(lastAnchor.attr('href'));

		// パネルを全部隠して初めのパネルだけを開く
		panelDivs.hide();
		lastPanel.show();

		// イベントを設定
		anchors.click(function(event){

			// a要素クリックのデフォルト動作を無効化
			event.preventDefault();
			
			// クリックされたa要素、対応するパネルを取得
			var currentAnchor = $(this);
			var currentPanel = $(currentAnchor.attr('href'));

			// もし同じタブだったら中断
			if(currentAnchor.get(0) === lastAnchor.get(0)){
				return;
			}

			// 最後に開かれたパネルを閉じる
			lastPanel.slideUp(200, function(){

				// アニメーションが終わったら…

				lastAnchor.removeClass('on'); // 最後にクリックされたタブのハイライトを消す
				currentAnchor.addClass('on'); // クリックされたタブをハイライトさせる

				currentPanel.slideDown(200); // クリックされたタブに対応するパネルを表示

				// 次の処理のため、クリックされたa要素、パネルを変数に保存
				lastAnchor = currentAnchor;
				lastPanel = currentPanel;

			});

		});

	});
	
});
