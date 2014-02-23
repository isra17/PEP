(function () {
    'use strict';

    var PEP_EXTENSION_ID = "clmlfkaakofcdlgbbbcjfegkgfbdkkhe";

    function callPGPService(action, options, callback) {
        chrome.runtime.sendMessage(PEP_EXTENSION_ID, {
            action: action,
            options: options
        }, callback);
    }

    window.PEP = {
        getPublicKeysInfo: function(callback) {
            callPGPService('getPublicKeysInfo', undefined, callback);
        },

        encrypt: function (recipients, message, callback) {
            callPGPService('encrypt', {
                recipients: recipients,
                message: message
            }, callback);
        },

        decrypt: function (cipherText, callback) {
            callPGPService('decrypt', {
                recipients: cipherText,
            }, callback);
        }
    };

}());