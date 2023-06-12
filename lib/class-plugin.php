<?php

namespace QuadLayers\WPMI;

use QuadLayers\WPMI\Api\Rest\Routes_Library;

final class Plugin {

	private static $instance;

	private function __construct() {

		/**
		 * Load plugin textdomain.
		 */
		load_plugin_textdomain( 'wp-menu-icons', false, WPMI_PLUGIN_DIR . '/languages/' );

		Routes_Library::instance();

		Controllers\Libraries::instance();
		Controllers\Backend::instance();
		Controllers\Navmenu::instance();
		Controllers\Frontend::instance();

		do_action( 'wpmi_init' );
	}

	public static function instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}
}

Plugin::instance();
