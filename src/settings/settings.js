(function(){
	"use strict";

	function loadPublicKeysTable(keys) {
		var tbody = $('#public-keys-table > tbody');
		tbody.children().remove();

		var rows = _.map(keys, function(key) {
			var created = new Date(key.created);
			var row = $('<tr id="'+ key.keyId +'"></tr>');
			row.append('<td><input type="checkbox"></td>');
			row.append($('<td></td>').text(key.userId));
			row.append('<td>'+ key.keyId.substr(key.keyId.length-8) +'</td>');
			row.append('<td>'+ created.toLocaleDateString() +'</td>');
			return row;
		});

		tbody.append(rows);
	}

	function refreshPublicKeysTable() {
		PEP.getPublicKeysInfo( loadPublicKeysTable );
	}

	$(function(){
		refreshPublicKeysTable();

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

		$('#remove-key').click(function(){
			_.each($('#public-keys-table :checked'), function(el){
				var keyId = $(el).closest('tr').attr('id');
				PEP.removeKey(keyId, function(){
					refreshPublicKeysTable();
				});
			});
		});

		$('#import-key-import').click(function() {
			var armored_key = $('#import-key-armored').val();
			PEP.importKey( armored_key, function(res){
				refreshPublicKeysTable();
				if (res && res.error) {
					alert(res.error);
				}
			});
		});
	});	
})();
