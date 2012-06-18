var APP = this.APP || {};

(function (A, $) {

	var data,
		sandbox;

	var matchStr = function (str, q) {

		var words = q.split(' ');

		for (var i = 0; i < q.split.length; i += 1) {
			if (str && words[i]) {

				if ( str.toLowerCase().indexOf(words[i].toLowerCase()) !== -1) {
					return true;
				}
			}
		}
		return false;
	};

	var matchPkg = function (pckg, q) {
		return matchStr(pckg.name, q);
	};

	var matchObj = function (func, q) {
		
		for (var i in func) {
			if ( typeof func[i] === 'string') {
				if (matchStr(func[i], q)) {
					return true;
				}
			}
			if ( typeof func[i] === 'object') {
				if (matchObj(func[i], q)) {
					return true;
				}
			}
		}

		return false;
	};

	var removeUnmatching = function(pckg, q) {

		var methods = [];

		if (pckg.methods) {
			for (var i = 0; i < pckg.methods.length; i += 1) {
				if (matchObj(pckg.methods[i], q)) {
					methods.push(pckg.methods[i]);
				}

			}
		}

		pckg.methods = methods;
		return methods.length !== 0;
	};

	var run = function (q) {

		var dataCpy = $.extend(true, [], data);

		var pcks = [];

		for(var i = 0; i < dataCpy.length; i += 1) {

			if (matchStr(dataCpy[i].name, q)) {
				pcks.push(dataCpy[i]);
			} else {
				if (removeUnmatching(dataCpy[i], q)) {
					pcks.push(dataCpy[i]);
				}
			}
		}

		return pcks;

	};

	var search = function () {

	};

	var index = function createIndex(n) {

		var i, index = [];

		var add = function (el) {
			if (index.indexOf(el) === -1) {
				index.push(el);
			}
		};

		for (i in n) {

			if (typeof n[i] === 'string') {
				add(n[i]);
			} else if (typeof n[i] === 'object') {
				createIndex(n[i]).map(add);
			}

		}

		return index;
	};

	A.search = {
		create: function (dt, sndbx) {
			data = dt;
			sandbox = sndbx;
			return Object.create(this, {});
		},

		init: function () {

			sandbox.hub.subscribe('autocomplete-focus',
				function(d) {
					var pcks = run(d.query);
					sandbox.hub.publish('new-data', { data: pcks });
				},
				function (error) {
					console.log(error);
				}
			);

			sandbox.hub.subscribe('clear-search', function () {
					sandbox.hub.publish('new-data', { data: data });
			});
		},

		search: search,
		index: (function () {
			return function () {
				return index(data);
			};
		}())
	};

}(APP, jQuery));