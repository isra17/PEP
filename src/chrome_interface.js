(function () {
    'use strict';

    var handlers = {
        'getPublicKeysInfo': function() {
            return PGPService.getPublicKeysInfo();
        },

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
            sendResponse( handler( request.options ) );
        }
    };

    chrome.runtime.onMessageExternal.addListener(messageHandler);
    chrome.runtime.onMessage.addListener(messageHandler);

}());