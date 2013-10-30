(function() {
    'use strict';

    var PEP_EXTENSION_ID = "PEP";

    $(function(){
        $('#pep-test').submit(function(){
            var message = $('#message').val();
            var recipients = [$('#recipients').val()];
            chrome.runtime.sendMessage(PEP_EXTENSION_ID, {
                action: 'encrypt',
                message: message,
                recipients: recipients
            }, function(response) {
                if (response.cipherText) {
                    $('#cipherText').text('Cipher: ' + cipherText);
                }
            });

            return false;
        });
    });
}());