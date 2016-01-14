# jquery-menubar
Completely accessible and 508 compliant menubar extension for jQuery UI.

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
 
 # Known issues:
 
 The native jQuery menu widget has a few issues with the coloring of icons and anchors. This project includes a fix for the coloring of anchors, but I am still working on a fix for the coloring of icons in submenus.
