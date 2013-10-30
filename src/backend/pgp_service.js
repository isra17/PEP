(function () {
    'use strict';

    var getPublicKeyFor = function ( recipients ) {
        if( !recipients ) {
            throw new Error('No recipients given');
        }

        var result = {
            keys: [],
            missing: []
        };

        _.map( recipients, function( recipient ) {
            if( !recipient )
                return;

            var key = openpgp.keyring.getPublicKeyForAddress( recipient );
            if( !key ) {
                result.missing.push( recipient );
            } else {
                result.keys.push( key );
            }
        } );

        return result;
    };

    window.PGPService = {

        encrypt: function (recipients, message) {
            publicKeys = getPublicKeyFor( recipients );
            return openpgp.write_encrypted_message( publicKeys.keys, message );
        },

        decrypt: function (cipherText) {
            var messages = openpgp.read_message( cipherText );

            return _.map( messages, function(msg) {
                return msg.decrypt();
            });
        },

        sign: function () {

        },

        verify: function () {

        }
    };

}());