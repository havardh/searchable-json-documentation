var APP = this.APP || {};

(function (A) {
	buster.testCase('Search Tests', {

		'indexes a simple object': function () {
			var search = APP.search.create({ a: 'a'});
			assert.equals(search.index(), ['a']);
		},

		'indexes should only contain distinct values': function () {
			var search = APP.search.create({
				a: 'a',
				b: 'a',
				c: 'b'
			});

			assert.equals(search.index(), ['a', 'b']);
		},

		'indexes a nested object': function () {
			var search = APP.search.create({
				a: 'a',
				b: { c: 'd'}
			});
			assert.equals(search.index(), ['a', 'd']);
		},

		'indexes a array of strings': function () {
			var arr = [	'a','bdfa','cb' ];

			var search = APP.search.create(arr);
			assert.equals(search.index(), arr);
		},

		'indexes a array of objects': function () {
			var arr = [
				{ a: 'a'},
				{ a: 'a'},
				{ b: 'c'}
			];
			var search = APP.search.create(arr);

			assert.equals(search.index(), ['a', 'c']);
		},

		'indexes a array of nested objects containing arrays and objects': function() {
			var top = [
				{
					a: {
						a: {
							a: [ 'a', 'b']
						}
					}
				},
				{
					a: 'a',
					b: 'c',
					c: [ 'a', 'b', 'c', 'd']
				},
				{
					a: [ 'e'],
					b: [ 'd', 'e', 'f']
				}
			];

			var search = APP.search.create(top);
			assert.equals( search.index(), ['a', 'b', 'c', 'd', 'e', 'f'] );
		}

	});

}(APP));