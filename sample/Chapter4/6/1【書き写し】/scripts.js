$(function() {
	$('.tabSet').each(function() {
		//使う要素を準備する
		const topDiv = $(this);
		const anchors = topDiv.find('ul.tabs a');//タブ部分のa要素
		const panelDivs = topDiv.find('div.panel');//パネルのdiv要素
		//最初にクリックされたa要素、パネルを保存するための変数を定義
		let lastAnchor;
		let lastPanel;
		//aタブ部分を表示
		anchors.show();
		//はじめに表示させておくa要素、パネルのdiv要素を取得
		//filterメソッドは要素内から指定された要素を抽出
		lastAnchor = anchors.filter('.on');//開いているa要素が入っている
		lastPanel = $(lastAnchor.attr('href'));//開いているタブのdiv要素が入っている
		//パネルを全部隠してはじめのパネルだけ開く
		panelDivs.hide();//すべてのパネルを非表示にする
		lastPanel.show();//最初から開いておくパネルを表示する
		
		//イベント設定
		anchors.click(function(event) {
			//a要素クリックしたときに発生するデフォルト動作を無効化する
			event.preventDefault();
			//a要素をクリックするとデフォルト動作では、herf値で設定した位置まで移動してしまう
			//preventDefaultを使うことで上記の動作を無効化し、a要素を扱いやすくしている

			//クリックされたa要素に対応するパネルを取得
			const currentAnchor = $(this);//thisはクリックされたa要素のこと
			const currentPanel = $(currentAnchor.attr('href'));//クリックされて表示されたタブのこと

			lastAnchor.removeClass('on');//最初に開かれたa要素からクラスonを削除
			currentAnchor.addClass('on');//新しくクリックされたa要素にクラスonを追加

			lastPanel.hide();//最後に開かれたパネルを隠す
			currentPanel.show();//クリックされたa要素に対応するタブ開く

			//次の処理のため、クリックされたa要素とパネル変数を保存
			lastAnchor = currentAnchor;
			lastPanel = currentPanel;
		});
	});
});