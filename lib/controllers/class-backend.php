<?php

namespace QuadLayers\WPMI\Controllers;

use QuadLayers\WPMI\Models\Settings as Models_Settings;

use QuadLayers\WPMI\Api\Rest\Routes_Library as Routes_Library;

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
		add_action( 'admin_head', array( __CLASS__, 'add_premium_js' ) );
		add_action( 'admin_footer', array( __CLASS__, 'add_premium_css' ) );
	}

	public function register_scripts() {
		$components = include WPMI_PLUGIN_DIR . 'build/components/js/index.asset.php';
		$store      = include WPMI_PLUGIN_DIR . 'build/store/js/index.asset.php';
		$backend    = include WPMI_PLUGIN_DIR . 'build/backend/js/index.asset.php';
		$navmenu    = include WPMI_PLUGIN_DIR . 'build/navmenu/js/index.asset.php';

		$models_settings = Models_Settings::instance();

		wp_register_script(
			'wpmi-components',
			plugins_url( '/build/components/js/index.js', WPMI_PLUGIN_FILE ),
			$components['dependencies'],
			$components['version'],
			true
		);

		wp_register_script(
			'wpmi-store',
			plugins_url( '/build/store/js/index.js', WPMI_PLUGIN_FILE ),
			$store['dependencies'],
			$store['version'],
			true
		);

		wp_localize_script(
			'wpmi-store',
			'wpmi_store',
			array(
				'WPMI_REST_ROUTES' => $this->get_endpoints(),
			)
		);

		wp_register_style(
			'wpmi-components',
			plugins_url( '/build/components/css/style.css', WPMI_PLUGIN_FILE ),
			array(
				'wp-components',
			),
			WPMI_PLUGIN_VERSION
		);

		wp_register_style(
			'wpmi-backend',
			plugins_url( '/build/backend/css/style.css', WPMI_PLUGIN_FILE ),
			array(
				'wpmi-components',
				'wp-components',
				'wp-editor',
				'media-views',
			),
			WPMI_PLUGIN_VERSION
		);

		wp_register_script(
			'wpmi-backend',
			plugins_url( '/build/backend/js/index.js', WPMI_PLUGIN_FILE ),
			$backend['dependencies'],
			$backend['version'],
			true
		);

		wp_localize_script(
			'wpmi-backend',
			'wpmi_backend',
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
			)
		);

		wp_register_style(
			'wpmi-navmenu',
			plugins_url( '/build/navmenu/css/style.css', WPMI_PLUGIN_FILE ),
			array(
				'wpmi-components',
				'wp-components',
			),
			WPMI_PLUGIN_VERSION
		);

		wp_register_script(
			'wpmi-navmenu',
			plugins_url( '/build/navmenu/js/index.js', WPMI_PLUGIN_FILE ),
			$navmenu['dependencies'],
			$navmenu['version'],
			true
		);
	}

	public function get_endpoints() {
	   $route_library    = Routes_Library::instance();
		$endpoints       = $route_library->get_routes();
		$endpoints_array = array();

		foreach ( $endpoints as $endpoint ) {

			$endpoint_key = str_replace( '/', '_', $endpoint::get_rest_route() );

			if ( ! isset( $endpoints_array[ $endpoint_key ] ) ) {

				$endpoints_array[ $endpoint_key ] = $endpoint::get_rest_path();
			}
		}

		return $endpoints_array;
	}

	public function enqueue_scripts() {

		if ( ! isset( $_GET['page'] ) || $_GET['page'] !== self::get_menu_slug() ) {
			return;
		}

		wp_enqueue_media();
		wp_enqueue_style( 'wpmi-components' );
		wp_enqueue_script( 'wpmi-backend' );
		wp_enqueue_style( 'wpmi-backend' );
		wp_enqueue_script( 'wpmi-navmenu' );
		wp_enqueue_style( 'wpmi-navmenu' );
	}

	public function add_menu() {
	   $menu_slug = self::get_menu_slug();
		add_menu_page(
			WPMI_PLUGIN_NAME,
			WPMI_PLUGIN_NAME,
			'edit_posts',
			$menu_slug,
			'__return_null'
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
		add_submenu_page(
			$menu_slug,
			esc_html__( 'Premium', 'wp-menu-icons' ),
			esc_html__( 'Premium', 'wp-menu-icons' ),
			'manage_options',
			"{$menu_slug}&tab=premium",
			'__return_null'
		);
		add_submenu_page(
			$menu_slug,
			esc_html__( 'Suggestions', 'wp-menu-icons' ),
			esc_html__( 'Suggestions', 'wp-menu-icons' ),
			'manage_options',
			"{$menu_slug}&tab=suggestions",
			'__return_null'
		);
	}

	public static function get_menu_slug() {
		return self::$menu_slug;
	}

	public static function add_premium_js() {
		?>
		<script>
			var WPMI_IS_PREMIUM = false;
		</script>
	<?php
	}

	public static function add_premium_css() {
		?>
		<style>
			.wpmi__premium-field {
				opacity: 0.5;
				pointer-events: none;
			}

			.wpmi__premium-field input,
			.wpmi__premium-field textarea,
			.wpmi__premium-field select {
				background-color: #eee;
			}

			.wpmi__premium-badge::before {
				content: "PRO";
				display: inline-block;
				font-size: 10px;
				color: #ffffff;
				background-color: #f57c00;
				border-radius: 3px;
				width: 30px;
				height: 15px;
				line-height: 15px;
				text-align: center;
				margin-right: 5px;
				vertical-align: middle;
			}

			.wpmi__premium-hide {
				display: none;
			}
		</style>
<?php
	}

	public static function instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}
}
