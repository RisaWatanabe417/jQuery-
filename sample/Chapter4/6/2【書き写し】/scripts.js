$(function() {
	$('.tabSet').each(function() {
		//使う要素の準備
		const topDiv = $(this);
		const anchors = topDiv.find('ul.tabs a');
		const panelDivs = topDiv.find('div.panel');
		let lastAnchor;
		let lastPanel;
		//タブ部分を表示
		anchors.show();
		//はじめから開いておくパネルを取得
		lastAnchor = anchors.filter('.on');
		lastPanel = $(lastAnchor.attr('href'));
		//パネルを全部隠してはじめのパネルだけを開く
		panelDivs.hide();
		lastPanel.show();
		//イベントを設定
		anchors.click(function(event) {
			//a要素クリックのデフォルト動作を無効化
			event.preventDefault();
			//クリックされたa要素に対応するパネルを取得
			const currentAnchor = $(this);
			const currentPanel = $(currentAnchor.attr('href'));
			//もし同じタブだったら中断
			if(currentAnchor.get(0) === lastAnchor.get(0)) {
				return;
			}
			//最後に開かれたパネルを閉じる
			lastPanel.slideUp(200, function() {
				//アニメーションが終わったら…
				lastAnchor.removeClass('on');//最後にクリックされたタブのハイライトを消す
				currentAnchor.addClass('on');//クリックされたタブをハイライトさせる
				currentPanel.slideDown(200);//クリックされたタブに対応するパネルを表示

				//次の処理のため、クリックされたa要素のパネルを変数に保存
				lastAnchor = currentAnchor;
				lastPanel = currentPanel;
			});
		});
	});
});