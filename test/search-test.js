var APP = this.APP || {};

(function (A) {
	buster.testCase('Indexing Tests', {

		'indexes a simple object': function () {
			assert.equals(APP.search.index({ a: 'a'}), ['a']);
		},

		'indexes should only contain distinct values': function () {

			assert.equals(APP.search.index({
				a: 'a',
				b: 'a',
				c: 'b'
			}), ['a', 'b']);
		},

		'indexes a nested object': function () {
			
			assert.equals(APP.search.index({
				a: 'a',
				b: { c: 'd'}
			}), ['a', 'd']);
		},

		'indexes a array of strings': function () {
			var arr = ['a', 'bc', 'c'];
			
			assert.equals(APP.search.index(arr), arr);
		},

		'indexes a array of objects': function () {

			assert.equals(APP.search.index([
				{ a: 'a'},
				{ a: 'a'},
				{ b: 'c'}
			]), ['a', 'c']);
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

			
			assert.equals( APP.search.index(top), ['a', 'b', 'c', 'd', 'e', 'f'] );
		},

		'indexes a single string': function() {
			assert.equals(APP.search.index('hei'), ['hei']);
		},

		'splits up a string with spaces': function() {
			assert.equals(APP.search.index('hei pa dei'), ['hei','pa','dei']);
		},

		'splits up a string with punctuation': function() {
			assert.equals(APP.search.index('PLT_API.plant_object(PLT_SQ, OBJECT_SQ);'),
							['PLT_API', 'plant_object', 'PLT_SQ', 'OBJECT_SQ', '']);
		}

	});

	buster.testCase('Search Test', {

		'returns full set on empty search': function () {
			var arr = [{ a: 'a'}];

			assert.equals( APP.search.search(arr, ''), arr);
		},

		'returns a object if it contains the word': function() {
			var arr = [{ a: 'a' }];

			assert.equals( APP.search.search(arr, 'a'), arr);
		},

		'returns empty list on non match': function() {
			var arr = [{ a: 'a' }];

			assert.equals( APP.search.search(arr, 'b'), []);
		},

		'returns only objects containing the word': function () {
			var arr = [{ a: 'a'}, { b: 'b'}];

			assert.equals( APP.search.search(arr, 'b'), [{ b: 'b'}]);
		},

		'returns whole object on top match': function() {
			var arr = [
				{
					a: 'a',
					b: [{
						a: 'b',
						b: 'b'
					},
					{ a: 'b'}]
				}
			];

			assert.equals( APP.search.search(arr, 'a'), arr);
		},

		'returns only deep on deep match': function() {
			var arr = [
				{
					a: 'b',
					b: [{ a: 'a', b: 'b' },
						{ a: 'b'}]
				},
				{ a: 'a'}
			];

			assert.equals(APP.search.search(arr, 'a'),[
				{
					a: 'b',
					b: [{ a: 'a', b: 'b'}]
				},
				{ a: 'a'}
			]);
		},

		'does not change passed array': function() {
			var arr = [{ a: 'b', b: [{ a: 'a', b: 'b' }, { a: 'b'}] }, { a: 'a'} ],

				res = APP.search.search(arr, 'a');

			assert.equals(res, [{ a: 'b', b: [{ a: 'a', b: 'b'}] }, { a: 'a'}]);
			assert.equals(arr, [{ a: 'b', b: [{ a: 'a', b: 'b' }, { a: 'b'}] }, { a: 'a'} ]);
		},

		'matches all words in query': function() {
			var arr = [{ a: 'hei pa dei'}];

			assert.equals(APP.search.search(arr, 'hei dei'), [{ a: 'hei pa dei'}]);

		}

	});

}(APP));