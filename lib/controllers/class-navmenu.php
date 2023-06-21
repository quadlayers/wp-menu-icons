<?php

namespace QuadLayers\WPMI\Controllers;

use QuadLayers\WPMI\Models\Libraries as Models_Libraries;
use QuadLayers\WPMI\Controllers\Libraries;
use QuadLayers\WPMI\Models\Navmenu as Models_Navmenu;

class Navmenu {

	private static $instance;

	protected static $default_values = array(
		'label'    => 0,
		'position' => 'before',
		'align'    => 'middle',
		'size'     => 1,
		'icon'     => '',
		'color'    => '',
	);

	private function __construct() {
		add_action( 'admin_enqueue_scripts', array( $this, 'register_scripts' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'admin_init', array( $this, 'add_meta_box' ) );
		add_filter( 'wp_setup_nav_menu_item', array( $this, 'setup_nav_menu_item_icon' ) );
		add_filter( 'wp_edit_nav_menu_walker', array( $this, 'edit_nav_menu_walker' ), 99 );
		add_action( 'wp_nav_menu_item_custom_fields', array( $this, 'nav_menu_item_custom_fields' ), 10, 4 );
		add_action( 'wp_nav_menu_item_custom_title', array( $this, 'nav_menu_item_custom_title' ), 10, 4 );
		add_action( 'wp_update_nav_menu_item', array( $this, 'update_nav_menu_item' ), 10, 3 );
		Models_Libraries::instance();
	}

	public function update_nav_menu_item( $menu_id, $menu_item_db_id, $menu_item_args ) {

		if ( ! wp_doing_ajax() ) {

			$menu_item_wpmi = array();

			check_admin_referer( 'update-nav_menu', 'update-nav-menu-nonce' );

			if ( ! empty( $_POST['wpmi'][ $menu_item_db_id ] ) ) {

				$menu_item_wpmi['label']    = absint( $_POST['wpmi'][ $menu_item_db_id ]['label'] );
				$menu_item_wpmi['position'] = sanitize_html_class( $_POST['wpmi'][ $menu_item_db_id ]['position'] );
				$menu_item_wpmi['align']    = sanitize_html_class( $_POST['wpmi'][ $menu_item_db_id ]['align'] );
				$menu_item_wpmi['size']     = sanitize_text_field( $_POST['wpmi'][ $menu_item_db_id ]['size'] );
				$menu_item_wpmi['icon']     = esc_attr( $_POST['wpmi'][ $menu_item_db_id ]['icon'] );
				$menu_item_wpmi['color']    = sanitize_text_field( $_POST['wpmi'][ $menu_item_db_id ]['color'] );

				$this->edit_update_nav_menu_item( $menu_item_db_id, $menu_item_wpmi );
			}

			if ( isset( $_POST['wpmi_font'] ) ) {
				$menu_font = sanitize_key( $_POST['wpmi_font'] );

				if ( $menu_id > 0 ) {
					$models_navmenu = Models_Navmenu::instance();

					$models_navmenu->save( $menu_id, $menu_font );
				}
			}
		}
	}

	protected function edit_update_nav_menu_item( $id, $value ) {

		$value = apply_filters( 'wp_menu_icons_item_meta_values', $value, $id );

		if ( ! empty( $value ) ) {
			update_post_meta( $id, WPMI_DB_KEY, $value );
		} else {
			delete_post_meta( $id, WPMI_DB_KEY );
		}
	}

	public function register_scripts() {
		$navmenu = include WPMI_PLUGIN_DIR . 'build/navmenu/js/index.asset.php';
		$store   = include WPMI_PLUGIN_DIR . 'build/store/js/index.asset.php';

		wp_register_script(
			'wpmi-store',
			plugins_url( '/build/store/js/index.js', WPMI_PLUGIN_FILE ),
			$store['dependencies'],
			$store['version'],
			true
		);

		wp_register_script(
			'wpmi-navmenu',
			plugins_url( '/build/navmenu/js/index.js', WPMI_PLUGIN_FILE ),
			$navmenu['dependencies'],
			$navmenu['version'],
			true
		);

		wp_localize_script(
			'wpmi-navmenu',
			'wpmi_navmenu',
			array(
				'WPMI_PREFIX'           => WPMI_PREFIX,
				'WPMI_PLUGIN_NAME'      => WPMI_PLUGIN_NAME,
				'WPMI_PREMIUM_SELL_URL' => WPMI_PREMIUM_SELL_URL,
				'nonce'                 => wp_create_nonce( 'wpmi' ),
			)
		);

		wp_register_style(
			'wpmi-navmenu',
			plugins_url( '/build/navmenu/css/style.css', WPMI_PLUGIN_FILE ),
			array(
				// 'wp-color-picker',
				'media-views',
				'wp-components',
				'wp-editor',
			),
			WPMI_PLUGIN_VERSION,
			'all'
		);
	}

	public function enqueue_scripts() {
		global $pagenow;

		if ( $pagenow != 'nav-menus.php' ) {
			return;
		}

		wp_enqueue_media();

		wp_enqueue_style( 'wpmi-navmenu' );

		wp_enqueue_script( 'wpmi-navmenu' );
	}

	public function add_meta_box() {
		add_meta_box( WPMI_PREFIX . '_metabox', WPMI_PLUGIN_NAME, array( $this, 'metabox' ), 'nav-menus', 'side', 'high' );
	}

	public function metabox() {         ?>
		<div id="posttype-<?php echo esc_attr( WPMI_PREFIX ); ?>-themes" class="posttypediv">
		</div>
	<?php
	}

	public function edit_nav_menu_walker( $walker ) {

		$walker = 'QuadLayers\WPMI\Menu_Item_Custom_Fields_Walker';

		if ( ! class_exists( $walker ) ) {
			require_once 'walker.php';
		}

		return $walker;
	}

	public function nav_menu_item_custom_title( $menu_item_id, $item, $depth, $args ) {
		?>
		<span class="menu-item-wpmi_open">
			<i class="menu-item-wpmi_plus dashicons dashicons-plus"></i>
			<?php if ( ! empty( $item->wpmi->icon ) ) : ?>
				<i class="menu-item-wpmi_icon <?php echo esc_attr( $item->wpmi->icon ); ?>"></i>
			<?php endif; ?>
		</span>
	<?php
	}

	public function nav_menu_item_custom_fields( $menu_item_id, $item, $depth, $args ) {
		?>
		<?php
		foreach ( self::get_default_values() as $key => $value ) {
			?>
			<input id="<?php echo esc_attr( WPMI_PREFIX . '-input-' . $key ); ?>" class="<?php echo esc_attr( WPMI_PREFIX . '-input' ); ?>" type="hidden" name="<?php echo esc_attr( WPMI_PREFIX . '[' . $menu_item_id . '][' . $key . ']' ); ?>" value="<?php echo esc_attr( $item->wpmi->{$key} ); ?>">
<?php
		}
	}

	public static function nav_menu_selected_id() {
		$nav_menus = wp_get_nav_menus( array( 'orderby' => 'name' ) );

		$menu_count = count( $nav_menus );

		// Get recently edited nav menu
		$recently_edited = (int) get_user_option( 'nav_menu_recently_edited' );

		$nav_menu_selected_id = isset( $_REQUEST['menu'] ) ? (int) $_REQUEST['menu'] : 0;

		// Are we on the add new screen?
		$add_new_screen = ( isset( $_GET['menu'] ) && 0 == $_GET['menu'] ) ? true : false;

		$page_count = wp_count_posts( 'page' );

		$one_theme_location_no_menus = ( 1 == count( get_registered_nav_menus() ) && ! $add_new_screen && empty( $nav_menus ) && ! empty( $page_count->publish ) ) ? true : false;

		if ( empty( $recently_edited ) && is_nav_menu( $nav_menu_selected_id ) ) {
			$recently_edited = $nav_menu_selected_id;
		}

		// Use $recently_edited if none are selected.
		if ( empty( $nav_menu_selected_id ) && ! isset( $_GET['menu'] ) && is_nav_menu( $recently_edited ) ) {
			$nav_menu_selected_id = $recently_edited;
		}

		// On deletion of menu, if another menu exists, show it.
		if ( ! $add_new_screen && 0 < $menu_count && isset( $_GET['action'] ) && 'delete' == $_GET['action'] ) {
			$nav_menu_selected_id = $nav_menus[0]->term_id;
		}

		// Set $nav_menu_selected_id to 0 if no menus.
		if ( $one_theme_location_no_menus ) {
			$nav_menu_selected_id = 0;
		} elseif ( empty( $nav_menu_selected_id ) && ! empty( $nav_menus ) && ! $add_new_screen ) {
			// if we have no selection yet, and we have menus, set to the first one in the list.
			$nav_menu_selected_id = $nav_menus[0]->term_id;
		}

		return $nav_menu_selected_id;
	}

	public function setup_nav_menu_item_icon( $item ) {
		$item->wpmi = new \stdClass();

		if ( $wpmi = wp_parse_args( (array) get_post_meta( $item->ID, WPMI_DB_KEY, true ), self::get_default_values() ) ) {

			if ( count( $wpmi ) ) {
				foreach ( $wpmi as $key => $value ) {
					$item->wpmi->{$key} = $value;
				}
			}
		}

		return $item;
	}

	public static function get_default_values() {
		return self::$default_values;
	}

	public static function instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}
}
