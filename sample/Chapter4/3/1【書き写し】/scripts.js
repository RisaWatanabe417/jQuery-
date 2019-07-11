$(function() {
	const accordion = $('.accordion');
	accordion.each(function() { //eachはdl毎に処理を行うという意味

//準備部分
		const dl = $(this); //??
		const allDt = dl.find('dt'); //変数allDtにすべてのdt要素を入れる
		const allDd = dl.find('dd'); //変数allDdにすべてのdd要素を入れる
		allDd.hide(); //すべてのddの要素を隠す

//開閉作業
		allDt.click(function() { //すべてのdtが対象となるクリックイベント
			const dt = $(this); //クリックされた1つのdt要素をjQueryオブジェクト化する
			const dd = dt.next(); //dtの直下にあるddを取ってくる
			allDd.hide(); //すべてのddの要素を隠す
			dd.show(); //クリックされたdt要素の直下にあるddのみ表示

//カーソルの変更
			allDt.css('cursor','pointer'); //すべてのdtのカーソルをポインターに変更
			dt.css('cursor','default'); //クリックされたdtのみカーソルをデフォルトに戻す
		});
	});
});