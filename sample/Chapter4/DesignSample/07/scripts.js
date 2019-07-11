$(function(){

	var courseTr = $('#courseTr');
	var priceTr = $('#priceTr');
	var projectsTr = $('#projectsTr');
	var usersTr = $('#usersTr');
	var storageTr = $('#storageTr');
	var submitTr = $('#submitTr');
	
	$.getJSON('data.json', function(items){
		
		$.each(items, function(i, item) {
		
			var course = $('<th>' + item.course + '</th>');
			var price = $('<td><div class="ajaxTable-mainText"><em>$</em><strong>' + item.price + '</strong><em>/mo</em></div><div class="ajaxTable-subText">(Price)</div></td>');
			var projects = $('<td><div class="ajaxTable-mainText"><em>' + item.projects + '</em></div><div class="ajaxTable-subText">(Projects)</div></td>');
			var users = $('<td><div class="ajaxTable-mainText"><em>' + item.users + '</em></div><div class="ajaxTable-subText">(Users)</div></td>');
			var storage = $('<td><div class="ajaxTable-mainText"><em>' + item.storage + '</em></div><div class="ajaxTable-subText">(Storage)</div></td>');
			var submit = $('<td><a class="ajaxTable-submit" href="' + item.url + '">Start</a></td>');
			
			courseTr.append(course);
			priceTr.append(price);
			projectsTr.append(projects);
			usersTr.append(users);
			storageTr.append(storage);
			submitTr.append(submit);
			
		});
		
	});
	
});
