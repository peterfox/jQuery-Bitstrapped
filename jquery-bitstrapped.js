// jQuery Bitstrapped
// Copyright (C) 2013 Peter Fox

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

(function ($) {
    
    var init_options = null;
    
    var methods = {
        init: function(options) {
            init_options = $.extend({
                // These are the defaults.
                interval: 10000
            }, options );
        },
        query_addresses: function(addresses) {
            // requests a JSON result containing information on the addresses provided
            $.ajax({
                dataType: 'json',
                type: 'GET',
                url: methods.make_url(addresses),
                success: function(data) {
                    $.each( data.addresses, function(index, value) {
                        methods.output_result(value.address, value);
                    });
                    
                    // fire off the method which will run the api call in a loop
                    methods.query_loop();
                },
                error: function(data) {
                    $('[data-xbt-address]').trigger('bitstrapped', [null]);
                }
            });  
        },
        make_url: function(addresses) {
            // implodes the object keys into a string like address1|address2|address3
            var addresses_implode =  Object.keys(addresses).join("|");
            return 'https://blockchain.info/multiaddr?cors=true&active='+addresses_implode;
        },
        validate_address: function(address) {
            // check that only alpha-numeric characters are used and the length is always 34 characters long
            return address.match(/^[0-9a-zA-Z]{34}$/);
        },
        query_loop: function() {
            // forces the query to be run again after the set time
            setTimeout('$().bitstrap()', init_options.interval);
        },
        output_result: function(address, data) {
            
            // fetch the original address holding element
            var dom_element = $('[data-xbt-address='+address+']');
            
            // trigger an event on the dom object passing in the data object for the address
            dom_element.trigger("bitstrapped", [data]);
        }
    };
    
    $.fn.bitstrap = function (options) {
        
        // initalise the library, only do it when the library has it's first run or when the library has been provided new parameters
        if((options === null && init_option === null) ||
          options != null) {
            methods.init(options);
        }
        
        var addresses = {};
        
        $('[data-xbt-address]').each(function () {
            
            // check the address is valid and then add to the addresses object
            if(methods.validate_address($(this).data('xbtAddress'))) {
                addresses[$(this).data('xbtAddress')] = this;
            } else {
                $(this).trigger('bitstrapped', 'Invalid Bitcoin Address');
            }
        });
        
        // Query the api for data using the address found in the dom
        methods.query_addresses(addresses);
    }

}(jQuery));