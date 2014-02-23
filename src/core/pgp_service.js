(function () {
    'use strict';

    var keyNameRegex = /^(.*?)\s*(:?<(.*)>)?$/;

    var getPublicKeyFor = function ( recipients ) {
        if( !recipients ) {
            throw new Error('No recipients given');
        }

        var result = {
            keys: [],
            missing: []
        };

        _.each( recipients, function( recipient ) {
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
        init: function() {
            this.localKeyring = new openpgp.Keyring();
        },

        getPublicKeysInfo: function() {
            var publicKeys = _.filter(this.localKeyring.keys, function(key) {
                return key.isPublic();
            });
            return _.map(publicKeys, function(key){
                return {
                    userId: key.users[0].userId.userid,
                    keyId: key.primaryKey.getKeyId().toHex().toUpperCase(),
                    created: key.primaryKey.created.getTime(),
                    armor: key.armor()
                };
            });
        },

        encrypt: function (recipients, message) {
            publicKeys = getPublicKeyFor( recipients );
            return openpgp.write_encrypted_message( publicKeys.keys, message );
        },

        decrypt: function (cipherText) {
            var messages = openpgp.read_message( cipherText );

            return _.map( messages, function(msg) {
                return msg.decrypt();
            });
        }
    };

    PGPService.init();

}());