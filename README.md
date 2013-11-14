# jQuery Bitstrapped

Looks up bitcoin address data from the Bitcoin blockchain (via Blockchain.info) when it's stored in the dom, then triggering events on those elements. The main purpose is on those occassions where you want a static page to display dynamic content about your bitcoin addresses' info like what the final balance might be or the most recent transactions.

So firstly add the library

```html
<script src="jquery-bitstrapped.js"></script>
```

Make some elements with bitcoin addresses, note they must be valid address e.g. alpha numeric and 34 characters long, if the address doesn't exist then it'll cause errors in that none of the addresses will work:

```html
<span id="first" data-xbt-address="1GoFkzsKr1BUE9XdQRz38TAkwgMubQWG6E"></span>
<span id="second" data-xbt-address="1Mup9bq9KLGuWPeBUqD4vuXBEYeLuEJZBD"></span>
```

You'll also want to set up some triggers for after the API call has finished as well, check the data isn't null, if it is then one of your addresses is invalid, if one address is null all events are still trigger but with null values parsed in. The valid object getting parsed in will be the same kind of address JSON you get from the multiaddress api call found at [Blockchain.info](https://blockchain.info/api/blockchain_api)

```javascript
$('#first').on('bitstrapped', function(event, data) {
  	if(data) {
  		$(this).text(data.final_balance);
  	}
});

$('#second').on('bitstrapped', function(event, data) {
	if(data) {
		$(this).attr('data-balance', data.final_balance);
	}
});
```

Then you can activate the library with (JSON object for the parameters is optional).

```javascript
$().bitstrap({interval:60000});
```

And done, now the library will keep polling for updated info 

### Depends on:

 * [jQuery](https://jquery.com/) works with both 1 and 2