var APP = this.APP || {};

(function (A) {

	var sandbox,
		template,
		element,
		data;

	var update = function(tmpl, el, data) {
		sandbox.updateTemplate(tmpl,el,data);
	};

	APP.toc = {

		create: function(tmpl, el, dt, sndbx) {
			template = tmpl;
			element = el;
			data = dt;
			sandbox = sndbx;
			return Object.create(this,{});
		},

		init: function() {
			update(template, element, data);

			sandbox.hub.subscribe('new-data', function(o) { 
				update(template, element, o.data);
			});

			sandbox.hub.subscribe('hide-index', function(o) { 
				element.toggle();
			});


		}
	};

}(APP));