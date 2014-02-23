(function(){
	"use strict";

	function loadPublicKeysTable(keys) {
		var tbody = $('#public-keys-table > tbody');
		tbody.children().remove();

		var rows = _.map(keys, function(key) {
			var created = new Date(key.created);
			var row = $('<tr id="'+ key.keyId +'"></tr>');
			row.append($('<td></td>').text(key.userId));
			row.append('<td>'+ key.keyId.substr(key.keyId.length-8) +'</td>');
			row.append('<td>'+ created.toLocaleDateString() +'</td>');
			return row;
		});

		tbody.append(rows);
	}

	$(function(){
		PEP.getPublicKeysInfo( loadPublicKeysTable );

		$('#import-key').click(function(ev) {
			ev.preventDefault();
			var modal = $('#import-key-overlay');
			$(modal).show();
			$(modal).find('button, .close-button').click(function() {
				$(modal).hide();
			});

			$(modal).click(function() {
				$(modal).find('.page').addClass('pulse');
				$(modal).find('.page').on('webkitAnimationEnd', function() {
					$(this).removeClass('pulse');
				});
			});
			$(modal).find('.page').click(function(ev) {
				ev.stopPropagation();
			});
			$('body').append(modal);
		});

		$('#import-key-import').click(function() {
			var armored_key = $('#import-key-armored').val();
			PEP.importKey( armored_key, function(res){
				PEP.getPublicKeysInfo( loadPublicKeysTable );				
				if (res && res.error) {
					alert(res.error);
				}
			});
		});
	});	
})();
