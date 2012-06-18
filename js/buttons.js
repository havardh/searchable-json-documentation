var APP = this.APP || {};

(function (A, $) {
	
	var clear,
		hide,
		sandbox;

	A.button = {
		create: function(clr, hde, sndbx) {
			clear = clr;
			hide = hde;
			sandbox = sndbx;
			return Object.create(this, {});
		},

		init: function () {

			clear.on('click', function() {
				sandbox.hub.publish('clear-search');
			});

			hide.on('click', function() {
				sandbox.hub.publish('hide-index');
			});

			sandbox.hub.subscribe('hide-index', function () {
				if (hide.text() == 'Hide Index') {
					hide.text('Show Index');
				} else {
					hide.text('Hide Index');
				}
			});

		}
	};

}(APP, jQuery));