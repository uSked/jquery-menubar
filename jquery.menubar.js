/* Coded up by Marvin Herbold
 *
 * This jQuery UI menubar code just re-uses the current built-in jquery ui menu widget
 * and tweaks it a little bit to add full menubar support - the tweaks done are as follows:
 *
 * 1) Split position option into downPosition and rightPosition options
 * 2) Split submenu icon option into submenuDown and submenuRight icon options
 * 3) Split role option into role (default=menubar) and submenuRole (default=menu) options
 * 4) Switch around right/left/up/down keyboard mapping for top level menu items
 * 5) Only "-" will be converted to dividers - not spaces
 *
 * That's it! All jQuery UI menu options and callbacks are supported.
 */

/* this is the custom menu widget extension to remap the key presses for the top level items only */
var menubarMenu = $.widget("ui.menubarMenu", $.ui.menu, {
  _keydown: function(event) {
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
  _isDivider: function( item ) {
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

  _create: function() {

    var menubar = this;

    /* create the menu bar - note the custom focus code to fix positioning of submenus */
    menubar.element.menubarMenu({
      icons: {
        submenu: menubar.options.submenuRight
      },
      items: menubar.options.items,
      menus: menubar.options.menus,
      position: menubar.options.downPosition,
      role: menubar.options.submenuRole,
      blur: menubar.options.blur,
      focus: function(event, item) {
        if (menubar.element.get(0) === $(item).get(0).item.parent().get(0)) {
          $(this).menubarMenu("option", "position", menubar.options.downPosition);
        } else {
          $(this).menubarMenu("option", "position", menubar.options.rightPosition);
        }

        menubar._trigger("focus", event, {
          item: item
        });
      },
      select: this.options.select
    });
	
	/* add the ui-menubar class */
	menubar.element.addClass("ui-menubar");

    /* fix the role of the top level menu */
    menubar.element.attr("role", menubar.options.role);

    /* change the icons of the top level menu items */
    menubar.element.children(".ui-menu-item").children("." + menubar.options.icons.submenuRight).each(function() {
      $(this).removeClass(menubar.options.icons.submenuRight).addClass(menubar.options.icons.submenuDown);
    });
  }
});
