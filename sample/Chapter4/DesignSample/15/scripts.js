$(function(){
	$('.tabSet').each(function(){
		var topDiv = $(this);
		var anchors = topDiv.find('ul.tabs a');
		var panelDivs = topDiv.find('div.panel');
		var lastAnchor;
		var lastPanel;
		anchors.show();
		lastAnchor = anchors.filter('.on');
		lastPanel = $(lastAnchor.attr('href'));
		panelDivs.hide();
		lastPanel.show();
		anchors.click(function(event){
			event.preventDefault();
			var currentAnchor = $(this);
			var currentPanel = $(currentAnchor.attr('href'));
			if(currentAnchor.get(0) === lastAnchor.get(0)){
				return;
			}
			if($.support.opacity) {
				lastPanel.fadeOut(200, function(){
					lastAnchor.removeClass('on');
					currentAnchor.addClass('on');
					currentPanel.fadeIn(200);
					lastAnchor = currentAnchor;
					lastPanel = currentPanel;
				});
			} else {
				lastPanel.hide();
				lastAnchor.removeClass('on');
				currentAnchor.addClass('on');
				currentPanel.show();
				lastAnchor = currentAnchor;
				lastPanel = currentPanel;
			}
		});
	});
});
