(function () {
    'use strict';

    function init () {
        openpgp.init();
    }

    var handlers = {
        'signAndEncrypt': function(options) {

            return PGPService.encrypt( options.recipients, options.data, true );
        },

        'encrypt': function(options) {
            return PGPService.encrypt( options.recipients, options.data );
        },

        'sign': function(options) {
            return PGPService.sign( options.recipients, options.data );
        },

        'decrypt': function(options) {
            options = _.defaults( options, { verify: true } );
            return PGPService.decrypt( options.data, options );
        }
    };

    chrome.runtime.onMessageExternal.addListener( function(request,sender,sendResponse) {
        var handler = handlers[ request.method ];
        if (handler) {
            sendResponse( handler( request ) );
        }
    });


    document.onload = init;

}());