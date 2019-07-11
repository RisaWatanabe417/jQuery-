$(function(){

	var tbody = $('#tbody');
	
	$.getJSON('data.json', function(people){
	
		$.each(people, function(i, person){
		
			var text_no = person.no;
			var text_username = person.username;
			var text_email = person.email;
			var text_id = person.id;
			var text_lang = person.lang;
			var text_date = person.date;
			
			var tr = $('<tr />');
			
			if(i%2 === 0) {
				tr.addClass('ajaxTable-tr-even');
			} else {
				tr.addClass('ajaxTable-tr-odd');
			}
			
			var no = $('<td class="ajaxTable-td-no" />').text(text_no);
			var username = $('<td class="ajaxTable-td-username" />').text(text_username);
			var email = $('<td class="ajaxTable-td-email" />').text(text_email);
			var id = $('<td class="ajaxTable-td-id" />').text(text_id);
			var lang = $('<td class="ajaxTable-td-lang" />').text(text_lang);
			var date = $('<td class="ajaxTable-td-date" />').text(text_date);
			
			tr.append(no);
			tr.append(username);
			tr.append(email);
			tr.append(id);
			tr.append(lang);
			tr.append(date);
			
			tbody.append(tr);
			
		});
		
	});
	
});
