$(function() {
	const tbody = $('#tbody');//tbodyをjQueryオブジェクト化している
	$.getJSON('data.json', function(people) {//入れて置きたい変数をpeopleを定義
		$.each(people, function(i, peorson) {//$eachに書かれた処理をi(3)回繰り返す
			//オブジェクトの各プロパティ値を変数に格納する
			const text_no = person.no;//変数はpersonのこと?
			const text_name = person.name;//??
			const text_mail = person.mail;
			
			//tr要素を作る
			const tr = $('<tr />');

			//3つのtd要素を作る
			const no = $('<td />').text(text_no);
			const name = $('<td />').text(text_name);
			const mail = $('<td />').text(text_mail);

			//tr要素に作ったtd要素を追加
			tr.append(no);
			tr.append(name);
			tr.append(mail);

			//tbodyにtr要素をappendする
			//ひとまとめに要素を作っておいて最後にappendすることができる
			tbody.append(tr);
		});
	});
});