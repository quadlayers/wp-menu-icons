<?php

namespace QuadLayers\WPMI\Controllers;

use QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Settings\Get as API_Rest_Settings;
use QuadLayers\WPMI\Models\Setting as Models_Setting;
use QuadLayers\WPMI\Models\Libraries as Models_Libraries;

use QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Libraries\Get as API_Rest_Libraries;
use QuadLayers\WPMI_PRO\Api\Rest\Endpoints\Backend\Libraries\Upload as API_Rest_Library_Upload;
use QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Menu\Get as API_Rest_Menu;

class Backend {

	protected static $instance;
	protected static $menu_slug = 'wp-menu-icons';

	private function __construct() {
		/**
		 * Admin
		 */
		add_action( 'admin_enqueue_scripts', array( $this, 'register_scripts' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'admin_menu', array( $this, 'add_menu' ) );
	}

	public function register_scripts() {
		$store   = include WPMI_PLUGIN_DIR . 'build/store/js/index.asset.php';
		$backend = include WPMI_PLUGIN_DIR . 'build/backend/js/index.asset.php';

		$models_settings  = new Models_Setting();
		$models_libraries = new Models_Libraries();

		wp_register_script(
			'wpmi-store',
			plugins_url( '/build/store/js/index.js', WPMI_PLUGIN_FILE ),
			$store['dependencies'],
			$store['version'],
			true
		);

		$library_model = new Models_Libraries();
		$libraries     = $library_model->get_libraries();

		wp_localize_script(
			'wpmi-store',
			'wpmi_store',
			array(
				'WPMI_REST_ROUTES' => array(
					'libraries' => API_Rest_Libraries::get_rest_path(),
					'settings'  => API_Rest_Settings::get_rest_path(),
					'menu'      => API_Rest_Menu::get_rest_path(),
					'upload'    => API_Rest_Library_Upload::get_rest_path(),
				),
				'WPMI_LIBRARIES'   => $libraries,
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
				'plugin_url'             => plugins_url( '/', WPMI_PLUGIN_FILE ),
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
