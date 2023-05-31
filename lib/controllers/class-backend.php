<?php

namespace QuadLayers\WPMI\Controllers;

use QuadLayers\WPMI\Backend\Icons_Library\Icons_Library;
use QuadLayers\WPMI\Models\Libraries as Models_Libraries;
use QuadLayers\WPMI\Models\Setting as Models_Setting;
use QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Libraries\Get as API_Rest_Libraries;
use QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Settings\Get as API_Rest_Settings;

class Backend
{

	private static $instance;
	protected static $fields      = array('icon');
	protected static $menu_slug = 'wp-menu-icons';

	public static $default_values = array(
		'label'    => 0,
		'position' => 'before',
		'align'    => 'middle',
		'size'     => 1,
		'icon'     => '',
		'color'    => '',
	);

	private function __construct()
	{
		add_action('admin_enqueue_scripts', array($this, 'register_scripts'));
		add_action('admin_enqueue_scripts', array($this, 'enqueue_scripts'));
		add_action('admin_init', array($this, 'navmenu'));
		add_action('wp_ajax_wpmi_save_nav_menu', array($this, 'save_nav_menu'));
		add_filter('wp_setup_nav_menu_item', array($this, 'setup_nav_menu_item_icon'));
		add_filter('wp_edit_nav_menu_walker', array($this, 'walker'), 99);
		add_action('wp_nav_menu_item_custom_fields', array($this, 'fields'), 10, 4);
		add_action('wp_nav_menu_item_custom_title', array($this, 'icon'), 10, 4);
		add_action('wp_update_nav_menu_item', array($this, 'wp_update_nav_menu_item'), 10, 3);
		add_action('admin_menu', array($this, 'add_menu'));

		Icons_Library::instance();
	}

	public function wp_update_nav_menu_item($menu_id, $menu_item_db_id, $menu_item_args)
	{

		if (!wp_doing_ajax()) {

			$menu_item_wpmi = array();

			check_admin_referer('update-nav_menu', 'update-nav-menu-nonce');

			if (!empty($_POST['wpmi'][$menu_item_db_id])) {

				$menu_item_wpmi['label']    = absint($_POST['wpmi'][$menu_item_db_id]['label']);
				$menu_item_wpmi['position'] = sanitize_html_class($_POST['wpmi'][$menu_item_db_id]['position']);
				$menu_item_wpmi['align']    = sanitize_html_class($_POST['wpmi'][$menu_item_db_id]['align']);
				$menu_item_wpmi['size']     = sanitize_text_field($_POST['wpmi'][$menu_item_db_id]['size']);
				$menu_item_wpmi['icon']     = esc_attr($_POST['wpmi'][$menu_item_db_id]['icon']);
				$menu_item_wpmi['color']    = sanitize_text_field($_POST['wpmi'][$menu_item_db_id]['color']);

				$this->update($menu_item_db_id, $menu_item_wpmi);
			}
		}
	}

	protected function update($id, $value)
	{

		$value = apply_filters('wp_menu_icons_item_meta_values', $value, $id);

		if (!empty($value)) {
			update_post_meta($id, WPMI_DB_KEY, $value);
		} else {
			delete_post_meta($id, WPMI_DB_KEY);
		}
	}

	public function save_nav_menu()
	{

		if (check_ajax_referer('wpmi', 'nonce', false)) {

			$menu_id = absint($_REQUEST['menu_id']);

			$menu_font = sanitize_key($_REQUEST['menu_font']);

			if ($menu_id > 0) {

				if (isset($_REQUEST['menu_font'])) {
					update_term_meta($menu_id, WPMI_DB_KEY, $menu_font, false);
				}

				wp_die($_REQUEST['menu_font']);
			}
		}

		wp_die('Fail!');
	}

	public function register_scripts()
	{

		$backend = include WPMI_PLUGIN_DIR . 'build/backend/js/index.asset.php';
		$store   = include WPMI_PLUGIN_DIR . 'build/store/js/index.asset.php';

		$library_model = new Models_Libraries();
		$libraries     = $library_model->get_libraries();
		$models_settings = new Models_Setting();

		wp_register_script(
			'wpmi-store',
			plugins_url('/build/store/js/index.js', WPMI_PLUGIN_FILE),
			$store['dependencies'],
			$store['version'],
			true
		);

		wp_register_script(
			'wpmi-backend',
			plugins_url('/build/backend/js/index.js', WPMI_PLUGIN_FILE),
			$backend['dependencies'],
			$backend['version'],
			true
		);

		wp_register_style(
			'wpmi-backend',
			plugins_url('/build/backend/css/style.css', WPMI_PLUGIN_FILE),
			array(
				// 'wp-color-picker',
				'media-views',
				'wp-components',
				'wp-editor',
			),
			WPMI_PLUGIN_VERSION,
			'all'
		);

		wp_localize_script(
			'wpmi-backend',
			'wpmi_backend',
			array(
				'nonce'                 => wp_create_nonce('wpmi'),
				'plugin_url'               => plugins_url('/', WPMI_PLUGIN_FILE),
				'WPMI_PLUGIN_NAME'       => WPMI_PLUGIN_NAME,
				'WPMI_PLUGIN_VERSION'    => WPMI_PLUGIN_VERSION,
				'WPMI_PLUGIN_FILE'       => WPMI_PLUGIN_FILE,
				'WPMI_PLUGIN_DIR'        => WPMI_PLUGIN_DIR,
				// 'WPMI_DOMAIN'            => WPMI_DOMAIN,
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
				'WPMI_LIBRARIES_DEFAULT' => \QuadLayers\WPMI\Models\Libraries::get_default_libraries(),
				'WPMI_LIBRARIES_CUSTOM'  => Models_Libraries::get_custom_libraries(),
			)
		);

		wp_localize_script(
			'wpmi-store',
			'wpmi_store',
			array(
				'WPMI_REST_ROUTES' => array(
					'libraries' => API_Rest_Libraries::get_rest_path(),
					'settings'  => API_Rest_Settings::get_rest_path(),
				),
				'WPMI_LIBRARIES'   => $libraries,
			)
		);
	}

	public function enqueue_scripts()
	{
		if (!isset($_GET['page']) || $_GET['page'] !== self::get_menu_slug()) {
			return;
		}

		global $pagenow;

		// if ($pagenow != 'nav-menus.php') {
		// 	return;
		// }

		Libraries::enqueue_style_library();

		wp_enqueue_media();

		wp_enqueue_style('wpmi-backend');

		wp_enqueue_script('wpmi-backend');
	}

	public static function get_menu_slug()
	{
		return self::$menu_slug;
	}

	public function add_menu()
	{
		$menu_slug = self::get_menu_slug();

		add_menu_page(
			WPMI_PLUGIN_NAME,
			WPMI_PLUGIN_NAME,
			'edit_posts',
			$menu_slug,
			'__return_null'
			// plugins_url( '/assets/backend/img/tiktok-white.svg', QLWPMI_PRO_PLUGIN_FILE )
		);
		add_submenu_page(
			$menu_slug,
			esc_html__('Welcome', 'wp-menu-icons-pro'),
			esc_html__('Welcome', 'wp-menu-icons-pro'),
			'edit_posts',
			$menu_slug,
			'__return_null'
		);
		add_submenu_page(
			$menu_slug,
			esc_html__('Settings', 'wp-menu-icons-pro'),
			esc_html__('Settings', 'wp-menu-icons-pro'),
			'manage_options',
			"{$menu_slug}&tab=settings",
			'__return_null'
		);
	}

	public function navmenu()
	{
		add_meta_box(WPMI_PREFIX . '_metabox', WPMI_PLUGIN_NAME, array($this, 'metabox'), 'nav-menus', 'side', 'high');
	}

	public function metabox()
	{

		$menu_id = self::nav_menu_selected_id();

		if (!$current = get_term_meta($menu_id, WPMI_DB_KEY, true)) {
			$current = 'dashicons';
		}
?>
		<div id="posttype-<?php echo esc_attr(WPMI_PREFIX); ?>-themes" class="posttypediv">
		</div>
	<?php
	}

	public function walker($walker)
	{

		$walker = 'QuadLayers\WPMI\Menu_Item_Custom_Fields_Walker';

		if (!class_exists($walker)) {
			require_once 'walker.php';
		}

		return $walker;
	}

	public function icon($menu_item_id, $item, $depth, $args)
	{
	?>
		<span class="menu-item-wpmi_open">
			<?php if (!empty($item->wpmi->icon)) : ?>
				<i class="menu-item-wpmi_icon <?php echo esc_attr($item->wpmi->icon); ?>"></i>
			<?php endif; ?>
			<i class="menu-item-wpmi_plus dashicons dashicons-plus"></i>
		</span>
	<?php
	}

	public function fields($menu_item_id, $item, $depth, $args)
	{
	?>
		<?php
		foreach (self::get_default_values() as $key => $value) {
		?>
			<input id="<?php echo esc_attr(WPMI_PREFIX . '-input-' . $key); ?>" class="<?php echo esc_attr(WPMI_PREFIX . '-input'); ?>" type="hidden" name="<?php echo esc_attr(WPMI_PREFIX . '[' . $menu_item_id . '][' . $key . ']'); ?>" value="<?php echo esc_attr($item->wpmi->{$key}); ?>">
<?php
		}
	}

	public static function nav_menu_selected_id()
	{

		$nav_menus = wp_get_nav_menus(array('orderby' => 'name'));

		$menu_count = count($nav_menus);

		// Get recently edited nav menu
		$recently_edited = (int) get_user_option('nav_menu_recently_edited');

		$nav_menu_selected_id = isset($_REQUEST['menu']) ? (int) $_REQUEST['menu'] : 0;

		// Are we on the add new screen?
		$add_new_screen = (isset($_GET['menu']) && 0 == $_GET['menu']) ? true : false;

		$page_count = wp_count_posts('page');

		$one_theme_location_no_menus = (1 == count(get_registered_nav_menus()) && !$add_new_screen && empty($nav_menus) && !empty($page_count->publish)) ? true : false;

		if (empty($recently_edited) && is_nav_menu($nav_menu_selected_id)) {
			$recently_edited = $nav_menu_selected_id;
		}

		// Use $recently_edited if none are selected.
		if (empty($nav_menu_selected_id) && !isset($_GET['menu']) && is_nav_menu($recently_edited)) {
			$nav_menu_selected_id = $recently_edited;
		}

		// On deletion of menu, if another menu exists, show it.
		if (!$add_new_screen && 0 < $menu_count && isset($_GET['action']) && 'delete' == $_GET['action']) {
			$nav_menu_selected_id = $nav_menus[0]->term_id;
		}

		// Set $nav_menu_selected_id to 0 if no menus.
		if ($one_theme_location_no_menus) {
			$nav_menu_selected_id = 0;
		} elseif (empty($nav_menu_selected_id) && !empty($nav_menus) && !$add_new_screen) {
			// if we have no selection yet, and we have menus, set to the first one in the list.
			$nav_menu_selected_id = $nav_menus[0]->term_id;
		}

		return $nav_menu_selected_id;
	}

	public function setup_nav_menu_item_icon($item)
	{
		$item->wpmi = new \stdClass();

		if ($wpmi = wp_parse_args((array) get_post_meta($item->ID, WPMI_DB_KEY, true), self::get_default_values())) {

			if (count($wpmi)) {
				foreach ($wpmi as $key => $value) {
					$item->wpmi->{$key} = $value;
				}
			}
		}

		return $item;
	}

	public static function get_default_values()
	{
		return self::$default_values;
	}

	public static function instance()
	{
		if (!isset(self::$instance)) {
			self::$instance = new self();
		}
		return self::$instance;
	}
}
