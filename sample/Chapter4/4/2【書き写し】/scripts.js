$(function() {
	const tbody = $('#tbody');

	//data.xmlを取ってくる
	$.ajax({
		url: 'data.xml',
		dataType: 'xml',
		success: function(xml) {

			//xmlドキュメントをjQueryオブジェクト化する
			const people = $(xml);

			//中にあるperson要素それぞれについて処理する
			people.find('person').each(function() {

				//person要素をjQueryオブジェクト化する
				const person = $(this);

				//各子要素を取得し、テキストを取得する
				const text_no = person.find('no').text();
				const text_name = person.find('name').text();
				const text_mail = person.find('mail').text();

				//tr要素を作る
				const tr = $('<tr />');

				//td要素を作る
				const no = $('<tr />').text(text_no);
				const name = $('<tr />').text(text_name);
				const mail = $('<tr />').text(text_mail);

				//tr要素に作ったtd要素を追加する
				tr.append(no);
				tr.append(name);
				tr.append(mail);

				//tbodyにtr要素をappendする
				tbody.append(tr);
			});
		}
	});
});