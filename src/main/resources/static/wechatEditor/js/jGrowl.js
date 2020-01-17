
/**
 * jQuery jGrowl
 */
!(function(a) {
	var b = (function() {
		return (
			!1 === a.support.boxModel &&
			a.support.objectAll &&
			a.support.leadingWhitespace
		);
	})();
	(a.jGrowl = function(b, c) {
		0 === a("#jGrowl").size() &&
			a('<div id="jGrowl"></div>')
				.addClass(
					c && c.position ? c.position : a.jGrowl.defaults.position
				)
				.appendTo("body"), a("#jGrowl").jGrowl(b, c);
	}), (a.fn.jGrowl = function(b, c) {
		if (a.isFunction(this.each)) {
			var d = arguments;
			return this.each(function() {
				void 0 === a(this).data("jGrowl.instance") &&
					(a(this).data(
						"jGrowl.instance",
						a.extend(new a.fn.jGrowl(), {
							notifications: [],
							element: null,
							interval: null
						})
					), a(this)
						.data("jGrowl.instance")
						.startup(
							this
						)), a.isFunction(a(this).data("jGrowl.instance")[b]) ? a(this).data("jGrowl.instance")[b].apply(a(this).data("jGrowl.instance"), a.makeArray(d).slice(1)) : a(this).data("jGrowl.instance").create(b, c);
			});
		}
	}), a.extend(a.fn.jGrowl.prototype, {
		defaults: {
			pool: 0,
			header: "",
			group: "",
			sticky: !1,
			position: "top-right",
			glue: "after",
			theme: "default",
			themeState: "highlight",
			corners: "10px",
			check: 250,
			life: 3e3,
			closeDuration: "normal",
			openDuration: "normal",
			easing: "swing",
			closer: false,
			closeTemplate: "&times;",
			closerTemplate: "<div>[ close all ]</div>",
			log: function() {},
			beforeOpen: function() {},
			afterOpen: function() {},
			open: function() {},
			beforeClose: function() {},
			close: function() {},
			animateOpen: { opacity: "show" },
			animateClose: { opacity: "hide" }
		},
		notifications: [],
		element: null,
		interval: null,
		create: function(b, c) {
			var d = a.extend({}, this.defaults, c);
			"undefined" != typeof d.speed &&
				((d.openDuration = d.speed), (d.closeDuration =
					d.speed)), this.notifications.push({
				message: b,
				options: d
			}), d.log.apply(this.element, [this.element, b, d]);
		},
		render: function(b) {
			var c = this, d = b.message, e = b.options;
			e.themeState = "" === e.themeState
				? ""
				: "ui-state-" + e.themeState;
			var f = a("<div/>")
				.addClass(
					"jGrowl-notification " +
						e.themeState +
						" ui-corner-all" +
						(void 0 !== e.group && "" !== e.group
							? " " + e.group
							: "")
				)
				.append(
					a("<div/>").addClass("jGrowl-close").html(e.closeTemplate)
				)
				.append(a("<div/>").addClass("jGrowl-header").html(e.header))
				.append(a("<div/>").addClass("jGrowl-message").html(d))
				.data("jGrowl", e)
				.addClass(e.theme)
				.children("div.jGrowl-close")
				.bind("click.jGrowl", function() {
					a(this).parent().trigger("jGrowl.beforeClose");
				})
				.parent();
			a(f)
				.bind("mouseover.jGrowl", function() {
					a("div.jGrowl-notification", c.element).data(
						"jGrowl.pause",
						!0
					);
				})
				.bind("mouseout.jGrowl", function() {
					a("div.jGrowl-notification", c.element).data(
						"jGrowl.pause",
						!1
					);
				})
				.bind("jGrowl.beforeOpen", function() {
					e.beforeOpen.apply(f, [f, d, e, c.element]) !== !1 &&
						a(this).trigger("jGrowl.open");
				})
				.bind("jGrowl.open", function() {
					e.open.apply(f, [f, d, e, c.element]) !== !1 &&
						("after" == e.glue
							? a(
									"div.jGrowl-notification:last",
									c.element
								).after(f)
							: a(
									"div.jGrowl-notification:first",
									c.element
								).before(f), a(
							this
						).animate(
							e.animateOpen,
							e.openDuration,
							e.easing,
							function() {
								a.support.opacity === !1 &&
									this.style.removeAttribute(
										"filter"
									), null !== a(this).data("jGrowl") &&
									(a(this).data(
										"jGrowl"
									).created = new Date()), a(this).trigger(
									"jGrowl.afterOpen"
								);
							}
						));
				})
				.bind("jGrowl.afterOpen", function() {
					e.afterOpen.apply(f, [f, d, e, c.element]);
				})
				.bind("jGrowl.beforeClose", function() {
					e.beforeClose.apply(f, [f, d, e, c.element]) !== !1 &&
						a(this).trigger("jGrowl.close");
				})
				.bind("jGrowl.close", function() {
					a(this).data("jGrowl.pause", !0), a(
						this
					).animate(
						e.animateClose,
						e.closeDuration,
						e.easing,
						function() {
							a.isFunction(e.close)
								? e.close.apply(f, [f, d, e, c.element]) !==
										!1 && a(this).remove()
								: a(this).remove();
						}
					);
				})
				.trigger("jGrowl.beforeOpen"), "" !== e.corners &&
				void 0 !== a.fn.corner &&
				a(f).corner(e.corners), a(
				"div.jGrowl-notification:parent",
				c.element
			).size() > 1 &&
				0 === a("div.jGrowl-closer", c.element).size() &&
				this.defaults.closer !== !1 &&
				a(this.defaults.closerTemplate)
					.addClass(
						"jGrowl-closer " +
							this.defaults.themeState +
							" ui-corner-all"
					)
					.addClass(this.defaults.theme)
					.appendTo(c.element)
					.animate(
						this.defaults.animateOpen,
						this.defaults.speed,
						this.defaults.easing
					)
					.bind("click.jGrowl", function() {
						a(this)
							.siblings()
							.trigger(
								"jGrowl.beforeClose"
							), a.isFunction(c.defaults.closer) && c.defaults.closer.apply(a(this).parent()[0], [a(this).parent()[0]]);
					});
		},
		update: function() {
			a(this.element)
				.find("div.jGrowl-notification:parent")
				.each(function() {
					void 0 !== a(this).data("jGrowl") &&
						void 0 !== a(this).data("jGrowl").created &&
						a(this).data("jGrowl").created.getTime() +
							parseInt(a(this).data("jGrowl").life, 10) <
							new Date().getTime() &&
						a(this).data("jGrowl").sticky !== !0 &&
						(void 0 === a(this).data("jGrowl.pause") ||
							a(this).data("jGrowl.pause") !== !0) &&
						a(this).trigger("jGrowl.beforeClose");
				}), this.notifications.length > 0 &&
				(0 === this.defaults.pool ||
					a(this.element)
						.find("div.jGrowl-notification:parent")
						.size() < this.defaults.pool) &&
				this.render(this.notifications.shift()), a(this.element)
				.find("div.jGrowl-notification:parent")
				.size() < 2 &&
				a(this.element)
					.find("div.jGrowl-closer")
					.animate(
						this.defaults.animateClose,
						this.defaults.speed,
						this.defaults.easing,
						function() {
							a(this).remove();
						}
					);
		},
		startup: function(c) {
			(this.element = a(c)
				.addClass("jGrowl")
				.append(
					'<div class="jGrowl-notification"></div>'
				)), (this.interval = setInterval(function() {
				a(c).data("jGrowl.instance").update();
			}, parseInt(this.defaults.check, 10))), b &&
				a(this.element).addClass("ie6");
		},
		shutdown: function() {
			a(this.element)
				.removeClass("jGrowl")
				.find("div.jGrowl-notification")
				.trigger("jGrowl.close")
				.parent()
				.empty(), clearInterval(this.interval);
		},
		close: function() {
			a(this.element).find("div.jGrowl-notification").each(function() {
				a(this).trigger("jGrowl.beforeClose");
			});
		}
	}), (a.jGrowl.defaults = a.fn.jGrowl.prototype.defaults);
})(jQuery);