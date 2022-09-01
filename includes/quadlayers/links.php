<?php

class WPMI_Admin_Links {

	protected static $_instance;

	function __construct() {
		add_filter( 'plugin_action_links_' . WPMI_PLUGIN_BASENAME, array( $this, 'add_action_links' ) );
	}

	public function add_action_links( $links ) {
		$links[] = '<a target="_blank" href="' . WPMI_DEMO_URL . '">' . esc_html__( 'Documentation', 'wp-menu-icons' ) . '</a>';
		$links[] = '<a target="_blank" href="' . WPMI_SUPPORT_URL . '">' . esc_html__( 'Support', 'wp-menu-icons' ) . '</a>';
		return $links;
	}

	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

}

WPMI_Admin_Links::instance();
