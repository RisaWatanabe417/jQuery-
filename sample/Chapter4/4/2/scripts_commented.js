$(function(){

	// tbody要素を取得
	var tbody = $('#tbody');

	// data.xmlを取ってくる
	$.ajax({
		url: 'data.xml',
		dataType: 'xml',
		success: function(xml){
			
			// xmlドキュメントをjQueryオブジェクト化
			var people = $(xml);

			// 中にあるperson要素それぞれについて処理する
			people.find('person').each(function(){

				// person要素をjQueryオブジェクト化
				var person = $(this);

				// 各子要素を取得し、テキストを取得
				var text_no = person.find('no').text();
				var text_name = person.find('name').text();
				var text_mail = person.find('mail').text();

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

		}
	});

});
