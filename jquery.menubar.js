
/* this is the custom menu widget extension to remap the key presses for the top level items only */
var menubarMenu = $.widget("ui.menubarMenu", $.ui.menu, {
	_keydown: function (event) {
		var focusedElement = this.element.find(".ui-state-focus").get(0);
		if (typeof focusedElement !== "undefined") {
			if (this.element.get(0) === $(focusedElement).parent().get(0)) {
				switch (event.keyCode) {
					case $.ui.keyCode.UP:
						event.keyCode = $.ui.keyCode.LEFT;
						break;

					case $.ui.keyCode.DOWN:
						event.keyCode = $.ui.keyCode.RIGHT;
						break;

					case $.ui.keyCode.LEFT:
						event.keyCode = $.ui.keyCode.UP;
						break;

					case $.ui.keyCode.RIGHT:
						event.keyCode = $.ui.keyCode.DOWN;
						break;
				}
			}
		}

		return this._super(event);
	},
	_isDivider: function (item) {
		if ($(item).text() === "-") {
			return true;
		}
		return false;
	}
});

/* this is the new menubar widget */
var menubar = $.widget("ui.menubar", {
	version: "1.11.4",
	defaultElement: "<ul>",
	delay: 300,
	options: {
		icons: {
			submenuDown: "ui-icon-carat-1-s",
			submenuRight: "ui-icon-carat-1-e"
		},
		items: "> *",
		menus: "ul",
		downPosition: {
			my: "left top",
			at: "left bottom"
		},
		rightPosition: {
			my: "left top",
			at: "right top"
		},
		role: "menubar",
		submenuRole: "menu",
		
		// callbacks
		blur: null,
		focus: null,
		select: null
	},
	_create: function () {
		var menubar = this;
		menubar.element.menubarMenu({
			icons: {
				submenu: menubar.options.submenuRight
			},
			items: menubar.options.items,
			menus: menubar.options.menus,
			position: menubar.options.downPosition,
			role: menubar.options.submenuRole,
			blur: menubar.options.blur,
			/* this bit of magic positions the submenus properly */
			focus: function (event, item) {
				if (menubar.element.get(0) === $(item).get(0).item.parent().get(0)) {
					$(this).menubarMenu("option", "position", menubar.options.downPosition);
				} else {
					$(this).menubarMenu("option", "position", menubar.options.rightPosition);
				}
				menubar._trigger("focus", event, item);
			},
			/* this bit of magic makes anchor elements work when the menuitem is selected */
			select: function (event, ui) {
				if (ui.item.menubarItemSelected) {
					event.stopPropagation();
				} else {
					ui.item.menubarItemSelected = true;
					var a = ui.item.children("a").get(0);
					if (typeof a !== "undefined") {
						a.click();
					}
					menubar._trigger("select", event, ui);
					ui.item.menubarItemSelected = false;
				}
			}
		});

		/* add the ui-menubar class */
		menubar.element.addClass("ui-menubar");

		/* fix the role of the top level menu */
		menubar.element.attr("role", menubar.options.role);

		/* change the icons of the top level menu items */
		menubar.element.children(".ui-menu-item").children("." + menubar.options.icons.submenuRight).each(function () {
			$(this).removeClass(menubar.options.icons.submenuRight).addClass(menubar.options.icons.submenuDown);
		});

		/* don't let anchors inside the menubar get keyboard focus - the focus should stay on the li */
		menubar.element.find("a").prop("tabindex", -1);
	}
});
