(function () {
    'use strict';

    var handlers = {
        /** key management **/
        'getPublicKeysInfo': function() {
            return PGPService.getPublicKeysInfo();
        },

        'importKey': function(options) {
            PGPService.importKey(options.armored_key);
        },

        'removeKey': function(options) {
            PGPService.removeKey(options.key_id);
        },

        /** Crypto service **/        
        'encrypt': function(options) {
            options = _.defaults( options, { sign: true } );
            return PGPService.encrypt( options.recipients, options.data );
        },

        'decrypt': function(options) {
            options = _.defaults( options, { verify: true } );
            return PGPService.decrypt( options.data, options );
        },

        'sign': function(options) {
            throw new Error("Not implemented");
        },

        'verify': function(options) {
            throw new Error("Not implemented");
        }
    };

    var messageHandler = function(request,sender,sendResponse) {
        var handler = handlers[ request.action ];
        if (handler) {
            try {
                sendResponse( handler( request.options ) );
            } catch(e) {
                sendResponse( {error: e.toString() } );
            }
        }
    };

    chrome.runtime.onMessageExternal.addListener(messageHandler);
    chrome.runtime.onMessage.addListener(messageHandler);

}());