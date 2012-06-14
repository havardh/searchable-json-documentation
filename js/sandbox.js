var APP = this.APP || {};

(function (A, F) {


	var updateTemplate = function(tmpl, el, data, options) {
		options = options || {};
		$(el).empty();
		return tmpl.tmpl(data, options).appendTo(el);
	};

	APP.sandbox = {


		hub: F.eventHub.create(),

		create: function() {
			return Object.create(this,{});
		},

		updateTemplate: updateTemplate

	};

}(APP, FINN));