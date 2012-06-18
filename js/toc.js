var APP = this.APP || {};

(function (A) {

	var sandbox,
		template,
		element,
		list,
		data;

	var update = function(tmpl, li, data) {
		sandbox.updateTemplate(tmpl,li,data);
	};

	APP.toc = {

		create: function(tmpl, el, li, dt, sndbx) {
			template = tmpl;
			element = el;
			list = li;
			data = dt;
			sandbox = sndbx;
			return Object.create(this,{});
		},

		init: function() {
			update(template, list, data);

			sandbox.hub.subscribe('new-data', function(o) { 
				update(template, list, o.data);
			});

			sandbox.hub.subscribe('hide-index', function(o) { 
				element.toggle();
			});


		}
	};

}(APP));