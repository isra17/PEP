(function(){
	"use strict";

	function loadPublicKeysTable(keys) {
		var tbody = $('#public_keys_table > tbody');
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
	});	
})();
