<?php

namespace QuadLayers\WPMI\Controllers;

use QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Settings\Get as API_Rest_Setting_Get;
use QuadLayers\WPMI\Models\Setting as Models_Setting;
use QuadLayers\WPMI\Models\Libraries as Libraries_Controller;

class Backend {
	protected static $instance;
	protected static $menu_slug = 'wp-menu-icons';

	private function __construct() {
		/**
		 * Admin
		 */
		add_action( 'admin_enqueue_scripts', array( $this, 'register_scripts' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'admin_scripts' ) );
		add_action( 'admin_menu', array( $this, 'add_menu' ) );
	}

	public function admin_scripts() {

		if ( ! isset( $_GET['page'] ) || $_GET['page'] !== self::get_menu_slug() ) {
			return;
		}

		$backend = include WPMI_PLUGIN_DIR . 'build/backend/js/index.asset.php';
		// wp_enqueue_script( 'wp-menu-icons-pro-backend', plugins_url( 'build/backend/js/index.js', WPMI_PLUGIN_FILE ), $backend['dependencies'], $backend['version'] );
		// wp_enqueue_style( 'wp-menu-icons-pro-backend', plugins_url( 'build/backend/css/style.css', WPMI_PLUGIN_FILE ), array(), WPMI_PLUGIN_VERSION );
	}

	public function register_scripts() {
		$backend_store   = include WPMI_PLUGIN_DIR . 'build/backend-store/js/index.asset.php';
		$backend = include WPMI_PLUGIN_DIR . 'build/backend/js/index.asset.php';

		// $models_feed     = new Models_Feed();
		$models_settings  = new Models_Setting();
		$models_libraries = new Libraries_Controller();

		wp_register_script(
			'qlwpmi-store',
			plugins_url( '/build/backend-store/js/index.js', WPMI_PLUGIN_FILE ),
			$backend_store['dependencies'],
			$backend_store['version'],
			true
		);

		wp_localize_script(
			'qlwpmi-store',
			'qlwpmi_store_routes',
			array(
				// 'userProfile' => API_Rest_User_Profile::get_rest_path(),
				// 'accounts'    => API_Rest_Accounts_Get::get_rest_path(),
				// 'feeds'       => API_Rest_Feeds_Get::get_rest_path(),
				'settings' => API_Rest_Setting_Get::get_rest_path(),
				// 'cache'       => API_Rest_Feeds_Clear_Cache::get_rest_path(),
			)
		);

		wp_register_style(
			'qlwpmi-backend',
			plugins_url( '/build/backend/css/style.css', WPMI_PLUGIN_FILE ),
			array(
				'media-views',
				'wp-components',
				'wp-editor',
			),
			WPMI_PLUGIN_VERSION
		);

		wp_register_script(
			'qlwpmi-backend',
			plugins_url( '/build/backend/js/index.js', WPMI_PLUGIN_FILE ),
			$backend['dependencies'],
			$backend['version'],
			true
		);

		wp_localize_script(
			'qlwpmi-backend',
			'qlwpmi_backend',
			array(
				'plugin_url'                   => plugins_url( '/', WPMI_PLUGIN_FILE ),
				'WPMI_PLUGIN_NAME'       => WPMI_PLUGIN_NAME,
				'WPMI_PLUGIN_VERSION'    => WPMI_PLUGIN_VERSION,
				'WPMI_PLUGIN_FILE'       => WPMI_PLUGIN_FILE,
				'WPMI_PLUGIN_DIR'        => WPMI_PLUGIN_DIR,
				'WPMI_DOMAIN'            => WPMI_DOMAIN,
				'WPMI_PREFIX'            => WPMI_PREFIX,
				'WPMI_WORDPRESS_URL'     => WPMI_WORDPRESS_URL,
				'WPMI_REVIEW_URL'        => WPMI_REVIEW_URL,
				'WPMI_DEMO_URL'          => WPMI_DEMO_URL,
				'WPMI_PREMIUM_SELL_URL'  => WPMI_PREMIUM_SELL_URL,
				'WPMI_SUPPORT_URL'       => WPMI_SUPPORT_URL,
				'WPMI_DOCUMENTATION_URL' => WPMI_DOCUMENTATION_URL,
				'WPMI_GROUP_URL'         => WPMI_GROUP_URL,
				'WPMI_DEVELOPER'         => WPMI_DEVELOPER,
				'WPMI_SETTING_MODEL'     => $models_settings->get_args(),
				'WPMI_LIBRARIES'         => $models_libraries->get_libraries(),
			)
		);
	}

	public function enqueue_scripts() {
		if ( ! isset( $_GET['page'] ) || $_GET['page'] !== self::get_menu_slug() ) {
			return;
		}

		wp_enqueue_media();
		wp_enqueue_script( 'qlwpmi-backend' );
		wp_enqueue_style( 'qlwpmi-backend' );
	}

	function add_menu() {
		$menu_slug = self::get_menu_slug();
		add_menu_page(
			WPMI_PLUGIN_NAME,
			WPMI_PLUGIN_NAME,
			'edit_posts',
			$menu_slug,
			'__return_null'
			// plugins_url( '/assets/backend/img/tiktok-white.svg', WPMI_PLUGIN_FILE )
		);
		add_submenu_page(
			$menu_slug,
			esc_html__( 'Welcome', 'wp-menu-icons' ),
			esc_html__( 'Welcome', 'wp-menu-icons' ),
			'edit_posts',
			$menu_slug,
			'__return_null'
		);
		add_submenu_page(
			$menu_slug,
			esc_html__( 'Settings', 'wp-menu-icons' ),
			esc_html__( 'Settings', 'wp-menu-icons' ),
			'manage_options',
			"{$menu_slug}&tab=settings",
			'__return_null'
		);
	}

	public static function get_menu_slug() {
		return self::$menu_slug;
	}



	public static function instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}
}
