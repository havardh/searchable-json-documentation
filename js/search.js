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

	var isArray = function(v) {
		return  v ? v.constructor.prototype === Array.prototype : false;
	};

	var isString = function(v) {
		return typeof v === 'string';
	};

	var isObject = function(v) {
		return typeof v === 'object';
	};

	var searchString = function(str, q) {

		var i, list;

		if (!q) {
			return str;
		}

		list = q.split(' ');

		for (i in list) {
			if (str.indexOf(list[i]) !== -1) {
				return str;
			}
		}

		return  false;
	};

	var searchObject = function(obj, q) {

		var i, v,
			rs,
			match = false,
			r = {};

		for (i in obj) {
			v = obj[i];

			if (obj.hasOwnProperty(i)) {

				if (isString(v)) {
					if (searchString(v, q)) {
						return obj;
					} else {
						r[i] = v;
					}
				} else if (isArray(v)) {
					rs = searchArray(v, q);
				} else if (isObject(v)) {
					rs = searchObject(v, q);
				}

				if (rs) {
					match = true;
					r[i] = rs;
					rs = null;
				}
			}
		}

		if (match) {
			return r;
		} else {
			return false;
		}
	};

	var searchArray = function(array, q) {
		var i, v, r = [];

		for (i in array) {
			v = search(array[i], q);

			if (v) {
				r.push(v);
			}
		}

		return r;
	};

	var search = function search(n, q) {

		var r;

		if (isArray(n)) {
			r = searchArray(n,q);
		} else if (isString(n)) {
			r = searchString(n,q);
		} else if (isObject(n)) {
			r = searchObject(n,q);
		}

		return r;
	};

	var index = function createIndex(n) {

		var i, index = [],
			split,

			add = function (el) {
			if (index.indexOf(el) === -1) {
				index.push(el);
			}
		};

		if (isString(n)) {
			split = n.split(/\W+/g);

			for (i in split) {
				add(split[i]);
			}
		} else {
			for (i in n) {
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
		index: index
	};

}(APP, jQuery));