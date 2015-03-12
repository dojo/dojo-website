## Creating a Custom Store

dstore provides a flexible selection of stores out of the box, but sometimes, it is necessary to create a custom store to better suit the needs of an application. This is a tutorial for doing just that. For our example, we create a store around the GitHub API v3 for Gists.

### Foundation

At mininum, a custom store implementation should inherit from `dstore/Store` which provides core dstore behavior. We begin with the `Store` class, the base URL for the GitHub API, and an `Accept` header that requests v3 of the GitHub API.

```js
define([
	'dojo/_base/declare',
	'dstore/Store',
], function (declare, Store) {
	return declare(Store, {

		apiUrl: 'https://api.github.com/',

		headers: {
			Accept: 'application/vnd.github.v3+json'
		}
	});
});
```

Every request to the GitHub API will be an HTTP request that incorporates the `apiUrl` and the store `headers`, so we pull in `dojo/request` and other dependencies and define a `_request` method to encapsulate this:

```js
define([
	'dojo/_base/lang',
	'dojo/_base/declare',
	'dojo/request',
	'dstore/Store',
], function (lang, declare, request, Store) {
	return declare(Store, {
		// ...
		_request: function (target, options) {
			// Most responses will be in JSON, so we make that the default expected format.
			options = lang.mixin({ handleAs: 'json' }, options);

			options.headers = lang.mixin({}, this.headers, options.headers);

			return request(this.apiUrl + target, options);
		}
	});
});
```

In dstore, a store is responsible for providing operations for individual objects and the ability to retrieve collections of items. Let's start with individual objects.

### Working with individual objects

Much like dojo object stores, dstore provides create, read, update, and delete (CRUD) operations for individual objects:

1. Create - `Store#add`
2. Read - `Store#get`
3. Update - `Store#put`
4. Delete - `Store#remove`

The GitHub API requires an OAuth token for creating, updating, and deleting gists, so we update the store to accommodate this:

```js
// oAuthToken: String
//    An OAuth token for the current user. Required for `put` and `remove` operations.
oAuthToken: null,

_request: function (target, options) {
	options = lang.mixin({ handleAs: 'json' }, options);

	options.headers = lang.mixin(
		this.headers,
		this.oAuthToken && { Authorization: 'token ' + this.oAuthToken },
		options.headers
	);

	return request(this.apiUrl + target, options);
},
```

Each operation requires only a simple HTTP request so we define them together here:

```js
get: function (id) {
	return this._request('/gists/' + encodeURIComponent(id), {
		method: 'GET'
	});
},

add: function (object) {
	return this._request('/gists', {
		method: 'POST',
		data: object
	});
},

put: function (object) {
	return this._request('/gists/' + encodeURIComponent(object.id), {
		method: 'PATCH',
		data: object
	});
},

remove: function (id) {
	return this._request('/gists/' + encodeURIComponent(id), {
	// unlike get, add, and put, GitHub's response for gist deletion is text rather than JSON
		handleAs: 'text',
		method: 'DELETE'
	});
},
```

<a class="button" href="demo/customStore/custom_store_get.html">View Demo</a>

### Working with collections

The second responsibility of a store is to provide operations for querying and retrieving collections of objects. In this section, we implement the `fetch` and `fetchRange` methods for the Gist API, and we will provide filtering and sorting support. We cannot retrieve the data for a collection without the `fetch` method. Let's start there.

#### Fetching

The `fetch` method retrieves a collection's items, returning a promise to an array, that is argumented with QueryResults to ensure that it can easily be iterated on:

```js
define([
	'dstore/QueryResults',
	//...
], function (..., QueryResults, ...) {
	return declare(Store, {
		//...
		fetch: function () {
			return new QueryResults(this._request('/gists/public'));
		}
```

The promise will also have a `totalLength` property, which is a promise representing the total number of objects in the collection.

GistStore can now retrieve a collection of public gists from GitHub's API.

<a class="button" href="demo/customStore/custom_store_fetch.html">View Demo</a>

#### Sorting

At the time of this writing, there is no documented API support for sorting gists, so we must sort in-memory if at all. This small disappointment turns out to be a good opportunity to demonstrate how to use the query log in conjunction with a querier factory. A querier is a function that allows query methods to compute queries locally so operations such as `sort` and `filter` can be performed on in-memory collection data. A querier factory is a method that creates a querier from query arguments and is named according to the convention `'_create<Type>Querier'`. Dstore provides default querier factories in the form of the `dstore/SimpleQuery` mixin, and `SimpleQuery#_createSortQuerier` is just what we need.

We define our `_createSortQuerier` method and then expand `fetch` to execute any queriers that have been applied to the collection.

```js
define([
	'dstore/QueryResults',
	'dstore/SimpleQuery',
	//...
], function (QueryResults, SimpleQuery, ...) {
	return declare(Store, {
		_createSortQuerier: SimpleQuery.prototype._createSortQuerier,
		//...
		fetch: function () {
			var queryLog = this.queryLog;
			return new QueryResults(this._request('/gists/public').then(function(data){
				// iterate through the query log, applying each querier
				for (var i = 0, l = queryLog.length; i < l; i++) {
					data = queryLog[i].querier(data);
				}
				return data;
			}));
		}
	});
});
```

<a class="button" href="demo/customStore/custom_store_sort.html">View Demo</a>

#### Paging

The paging API for gists does not provide the total gist count which is required for dstore paging to truly function properly. For the purposes of this tutorial, we perform paging in-memory. The `Store#fetchRange` method is the dstore method used to retrieve paged data, or ranges of data. To implement this method, we will make use of our `fetch` method, and then retrieve the correct subset of the data by using the `slice()` method. When implementing `fetchRange`, we should also provide the `totalLength` property to communicate the total length of the collection. For both, we will operate on the resolution of the promised data:

```js
fetchRange: function (kwArgs) {
	var start = kwArgs.start,
		end = kwArgs.end,
		data = this.fetch();

	return new QueryResults(data.then(function (data) {
		return data.slice(start, end);
	}), {
		totalLength: data.then(function (data) {
			return data.length;
		})
	});
}
```

<a class="button" href="demo/customStore/custom_store_range.html">View Demo</a>

#### Filtering

GitHub's Gist API provides a way to filter gists by user and since a given date. The previous code would properly filter on the client side, but since GitHub provides this API, we can more efficiently perform (at least some) filtering on the server side. Here, we add support for filtering on those axes. When `filter` is called, the filter is added to the `queryLog`. We iterate through the `queryLog` and then recurse through the filter to determine if any equivalence filters for `owner` or `since` are present, so we can take advantage of sending those filter parameters to the GitHub Gist API in `fetch`:

```js
fetch: function () {
    var queryLog = this.queryLog || [];
    var owner;
    var since;
    var serverFilter;
    for (var i = 0; i < queryLog.length; i++) {
    	if (queryLog[i].type === 'filter') {
    		checkFilter(queryLog[i].normalizedArguments[0]);
    		if (serverFilter) {
    			queryLog[i].serverFilter = true;
    		}
    	}
	}
	function checkFilter(filter) {
		// check the filter to see if the user or since is specified
		if (filter.type === 'eq' || filter.type === 'gte') {
			// it is a filter for equivalence (or greater than or equal, which should used be for since)
			var name = filter.args[0];
			var value = filter.args[1];
			if (name === 'owner') {
				owner = value;
				serverFilter = true;
			}
			if (name === 'since') {
				since = value;
				serverFilter = true;
			}
		}
		if (filter.type === 'and') {
			// need to check each part
			checkFilter(filter.args[0], filter.args[1]);
		}
	}
    var target = owner ? '/users/' + encodeURIComponent(owner) + '/gists' : '/gists/public';
	return new QueryResults(this._request('/gists/public', {
		 query: since ? { since: since.toISOString() } : null
	}).then(function(data){
		// iterate through the query log, applying each querier
		for (var i = 0, l = queryLog.length; i < l; i++) {
			var logEntry = queryLog[i];
			// ignore server filters, as they have already been applied
			if (!logEntry.serverFilter) {
				data = logEntry.querier(data);
			}
		}
		return data;
	}));
}
```

<a class="button" href="demo/customStore/custom_store_filter.html">View Demo</a>

### Conclusion

We now have a basic, custom store that wraps the GitHub Gist API. It can perform CRUD operations on individual gists and sort, filter, and page collections of gists.