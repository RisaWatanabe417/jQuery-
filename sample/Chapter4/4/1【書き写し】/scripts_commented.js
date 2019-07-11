$(function(){

	// tbody要素を取得
	var tbody = $('#tbody');

	// data.jsonを取ってくる
	$.getJSON('data.json', function(people){

		// 配列内の各オブジェクトそれぞれについて処理する
		$.each(people, function(i, person){

			// 各値を取得し、テキストを取得
			var text_no = person.no;
			var text_name = person.name;
			var text_mail = person.mail;

			// tr要素を作る
			var tr = $('<tr />');

			// td要素を作る
			var no = $('<td />').text(text_no);
			var name = $('<td />').text(text_name);
			var mail = $('<td />').text(text_mail);

			// tr要素にtd要素を追加
			tr.append(no);
			tr.append(name);
			tr.append(mail);

			// tbodyにtr要素をappend
			tbody.append(tr);

		});

	});

});
