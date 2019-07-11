$(function(){

	var tbody = $('#tbody');
	
	$.getJSON('data.json', function(items){
	
		$.each(items, function(i, item){
		
			var img_src = item.img;
			var text_title = item.title;
			var text_author = item.author;
			var text_price = item.price;
			var text_date = item.date;
			var text_id = item.id;
		
			var tr = $('<tr />');
			
			var img = $('<td class="ajaxTable-td-img" />').html('<img src="imgs/' + img_src + '" alt="" />');
			var title = $('<td class="ajaxTable-td-title" />').text(text_title);
			var author = $('<td class="ajaxTable-td-author" />').text(text_author);
			var price = $('<td class="ajaxTable-td-price" />').text(text_price);
			var date = $('<td class="ajaxTable-td-date" />').text(text_date);
			var id = $('<td class="ajaxTable-td-id" />').text(text_id);
			
			tr.append(img);
			tr.append(title);
			tr.append(author);
			tr.append(price);
			tr.append(date);
			tr.append(id);
			
			tbody.append(tr);
			
		});
		
	});
	
});
