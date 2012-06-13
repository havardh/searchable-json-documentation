var APP = this.APP || {};

(function (A) {

	var sandbox, input;

	var getMatchingWords = function(query, str) {
		if (typeof str === 'string') {

			return _.filter(str.split(' '),
				function (word) {
					return word.toUpperCase().indexOf(query.toUpperCase()) !== -1;
				});
		} else {

			return [];
		}
	};

	var search = function(query) {
		var i, j, list = [], words;

		var getMatchingWordsForQuery = (function(query) {

			return function (str) {
				return getMatchingWords(query, str);
			};

		}(query));

		var isString = function(obj) {
			return typeof obj === 'string';
		};

		var addWord = function(word) {
			list.push(word);
		};

		var addWords = function(words) {
			_.map(words, addWord);
		};

		var pushAll = function(to, from) {
			var i;

			for (i in from) {
				to.push(from[i]);
			}
		};

		var getAllStrings = function (root) {
			
			var i, strings = [];
			for (i in root) {

				if (typeof root[i] === 'object') {
					pushAll(strings, getAllStrings(root[i]));
				}
				
			}
			pushAll(strings, _.filter(root, isString));

			return strings;
		};

		var extend = function (a, b) {
			var i;

			for (i in b) {
				a.push(b[i]);
			}

			return a;
		};

		var unique = function (list) {
			var result = [], i;

			for (i in list) {
				if (result.indexOf(list[i]) === -1) {
					result.push(list[i]);
				}
			}

			return result;

		};

		var words = _.reduce(_.map(docListData, getAllStrings), extend);
		
		list = _.reduce(_.map(words,getMatchingWordsForQuery),extend);

		list = unique(list);

		//console.log(list);

		return list;
	};

	APP.autocomplete = {

		create: function(el, sndbx) {
			input = el;
			sandbox = sndbx;
			return Object.create(this,{});
		},

		init: function() {

			input.autocomplete({
				source: function(request, response) {
					response(search(request.term));
				},
				focus: function (event, ui) {
					sandbox.hub.publish('autocomplete-focus', { query: ui.item.label });
				}
			});

			sandbox.hub.subscribe('clear-search', function() {
				input.val('');
			});
		}

	};

}(APP));