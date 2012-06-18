var APP = this.APP || {};

(function($, F, A) {

	$(function() {

	
		var input = $('#query'),
			indexList = $('#index-list'),
			index = $('#index'),
			docList = $('#doc-list'),
			clear = $('#clear'),
			hide = $('#hide-index'),
			codes = 'pre.sh_oracle',
			
			indexTemplate = $('#index-template'),
			docTemplate = $('#doc-template'),

			sandbox = A.sandbox.create(),

			docModule = A.doc.create(docTemplate, docList, docListData, sandbox),
			tocModule = A.toc.create(indexTemplate, index, indexList, docListData, sandbox),
			autModule = A.autocomplete.create(input, sandbox),
			srchModule = A.search.create(docListData, sandbox),
			btnModule = A.button.create(clear, hide, sandbox);
			cpyModule = A.clipboard.create(codes);

		srchModule.init();
		autModule.init();
		tocModule.init();
		docModule.init();
		btnModule.init();
		cpyModule.init();
	});

}(jQuery, FINN, APP));