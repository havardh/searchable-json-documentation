var APP = this.APP || {};

(function($, F, A) {

	
	var input = $('#query'),
		indexList = $('#index-list'),
		docList = $('#doc-list'),
		clear = $('#clear'),
		hide = $('#hide-index'),
		
		indexTemplate = $('#index-template'),
		docTemplate = $('#doc-template'),

		sandbox = A.sandbox.create(),

		docModule = A.doc.create(docTemplate, docList, docListData, sandbox),
		tocModule = A.toc.create(indexTemplate, indexList, docListData, sandbox),
		autModule = A.autocomplete.create(input, sandbox),
		srchModule = A.search.create(docListData, sandbox),
		btnModule = A.button.create(clear, hide, sandbox);

	$(function() {

		srchModule.init();
		autModule.init();
		tocModule.init();
		docModule.init();
		btnModule.init();
	});

}(jQuery, FINN, APP));