<?php

namespace QuadLayers\WPMI;

use QuadLayers\WPMI\Models\Libraries;

class Backend {

	private static $instance;
	protected static $fields      = array( 'icon' );
	public static $default_values = array(
		'label'    => 0,
		'position' => 'before',
		'align'    => 'middle',
		'size'     => 1,
		'icon'     => '',
		'color'    => '',
	);

	private function __construct() {
		add_filter( 'wp_setup_nav_menu_item', array( $this, 'setup_nav_menu_item_icon' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue' ) );
		add_action( 'admin_init', array( $this, 'navmenu' ) );
		add_action( 'wp_ajax_wpmi_save_nav_menu', array( $this, 'save_nav_menu' ) );
		add_filter( 'wp_edit_nav_menu_walker', array( $this, 'walker' ), 99 );
		add_action( 'wp_nav_menu_item_custom_fields', array( $this, 'fields' ), 10, 4 );
		add_action( 'wp_nav_menu_item_custom_title', array( $this, 'icon' ), 10, 4 );
		add_action( 'wp_update_nav_menu_item', array( $this, 'wp_update_nav_menu_item' ), 10, 3 );
		add_action( 'print_media_templates', array( $this, 'print_media_templates' ) );
	}

	public function wp_update_nav_menu_item( $menu_id, $menu_item_db_id, $menu_item_args ) {

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

				$this->update( $menu_item_db_id, $menu_item_wpmi );
			}
		}
	}

	public function update( $id, $value ) {

		$value = apply_filters( 'wp_menu_icons_item_meta_values', $value, $id );

		if ( ! empty( $value ) ) {
			update_post_meta( $id, WPMI_DB_KEY, $value );
		} else {
			delete_post_meta( $id, WPMI_DB_KEY );
		}
	}

	public function save_nav_menu() {

		if ( check_ajax_referer( 'wpmi', 'nonce', false ) ) {

			$menu_id = absint( $_REQUEST['menu_id'] );

			$menu_font = sanitize_key( $_REQUEST['menu_font'] );

			if ( $menu_id > 0 ) {

				if ( isset( $_REQUEST['menu_font'] ) ) {
					update_term_meta( $menu_id, WPMI_DB_KEY, $menu_font, false );
				}

				wp_die( $_REQUEST['menu_font'] );
			}
		}

		wp_die( 'Fail!' );
	}

	public function enqueue() {

		global $pagenow;

		if ( $pagenow != 'nav-menus.php' ) {
			return;
		}

		$backend = include WPMI_PLUGIN_DIR . 'build/backend/js/index.asset.php';

		Libraries_Controller::enqueue_style_library();

		wp_enqueue_media();

		wp_register_script( 'wp-color-picker-alpha', plugins_url( 'assets/backend/rgba/wp-color-picker-alpha.min.js', WPMI_PLUGIN_FILE ), array( 'jquery', 'wp-color-picker' ) );

		wp_localize_script(
			'wp-color-picker-alpha',
			'wpColorPickerL10n',
			array(
				'clear'            => esc_html__( 'Clear', 'wp-menu-icons' ),
				'clearAriaLabel'   => esc_html__( 'Clear color', 'wp-menu-icons' ),
				'defaultString'    => esc_html__( 'Default', 'wp-menu-icons' ),
				'defaultAriaLabel' => esc_html__( 'Select default color', 'wp-menu-icons' ),
				'pick'             => esc_html__( 'Select Color', 'wp-menu-icons' ),
				'defaultLabel'     => esc_html__( 'Color value', 'wp-menu-icons' ),
			)
		);

		wp_enqueue_style(
			'wpmi-backend',
			plugins_url( '/build/backend/css/style.css', WPMI_PLUGIN_FILE ),
			array( 'wp-color-picker' ),
			WPMI_PLUGIN_VERSION,
			'all'
		);

		wp_enqueue_script(
			'wpmi-backend',
			plugins_url( '/build/backend/js/index.js', WPMI_PLUGIN_FILE ),
			$backend['dependencies'],
			$backend['version'],
			true
		);

		wp_localize_script(
			'wpmi-backend',
			'wpmi_l10n',
			array(
				'legacy_pick'    => esc_html__( 'Select' ),
				'legacy_current' => esc_html__( 'Color' ),
				'nonce'          => wp_create_nonce( 'wpmi' ),
			)
		);

		$library_model    = new Libraries();
		$libraries = $library_model->get_libraries();

		wp_localize_script(
			'wpmi-backend',
			'wpmi_backend',
			array(
				'WPMI_PREFIX'           => WPMI_PREFIX,
				'WPMI_PLUGIN_NAME'      => WPMI_PLUGIN_NAME,
				'WPMI_PREMIUM_SELL_URL' => WPMI_PREMIUM_SELL_URL,
				'WPMI_LIBRARIES' => $libraries,
			)
		);

	}

	public function navmenu() {
		add_meta_box( WPMI_PREFIX . '_metabox', WPMI_PLUGIN_NAME, array( $this, 'metabox' ), 'nav-menus', 'side', 'high' );
	}

	public function metabox() {

		$menu_id = self::nav_menu_selected_id();

		if ( ! $current = get_term_meta( $menu_id, WPMI_DB_KEY, true ) ) {
			$current = 'dashicons';
		}
		?>
		<div id="posttype-<?php echo esc_attr( WPMI_PREFIX ); ?>-themes" class="posttypediv">
			<!-- TODO: move to react and make render in "posttype-<?php echo esc_attr( WPMI_PREFIX ); ?>-themes"-->
			<div id="tabs-panel-<?php echo esc_attr( WPMI_PREFIX ); ?>-themes" class="tabs-panel tabs-panel-active">
				<ul id="<?php echo esc_attr( WPMI_PREFIX ); ?>-themes-checklist" class="categorychecklist form-no-clear">
				<?php
				$library_model    = new Libraries();
				$active_libraries = $library_model->get_active_libraries();
				foreach ( $active_libraries as $id => $library ) :
					?>
					<li>
					<label class="menu-item-title">
						<input type="radio" class="<?php echo esc_attr( WPMI_PREFIX . '-item-checkbox' ); ?>" name="<?php echo esc_attr( WPMI_PREFIX . '_font' ); ?>" value="<?php echo esc_attr( $id ); ?>" <?php checked( $id, $current ); ?>> <?php echo esc_html( $library['name'] ); ?>
					</label>
					</li>
				<?php endforeach; ?>
				</ul>
					<?php submit_button( esc_html__( 'Save' ), 'button-primary save', false, false ); ?>
				<p></p>
			</div>
		</div>
			<?php
	}

	public function walker( $walker ) {

		$walker = 'QuadLayers\WPMI\Menu_Item_Custom_Fields_Walker';

		if ( ! class_exists( $walker ) ) {
			require_once 'walker.php';
		}

		return $walker;
	}

	public function print_media_templates() {

		global $pagenow;

		if ( $pagenow != 'nav-menus.php' ) {
			return;
		}

		$menu_id = self::nav_menu_selected_id();
		?>
		<script type="text/html" id='tmpl-wpmi-modal-backdrop'>
			<div class="media-modal-backdrop">&nbsp;</div>
		</script>
		<script type="text/html" id='tmpl-wpmi-modal-window'>
			<div id="<?php echo esc_attr( WPMI_PREFIX . '_modal' ); ?>" class="media-modal wp-core-ui">
				<button type="button" class="media-modal-close close">
				<span class="media-modal-icon">
					<span class="screen-reader-text"><?php esc_html_e( 'Close media panel' ); ?></span>
				</span>
				</button>
				<div class="media-frame mode-select wp-core-ui hide-menu">
				<div class="media-frame-title">
					<h1><?php esc_html_e( WPMI_PLUGIN_NAME ); ?>
					<span class="dashicons dashicons-arrow-down"></span>
					</h1>
				</div>
				<div class="media-frame-router">
					<div class="media-router">
					<a href="<?php echo esc_url( WPMI_PREMIUM_SELL_URL ); ?>" class="media-menu-item" target="_blank"><?php esc_html_e( 'Mega Menu' ); ?></a>
					<a href="#" class="media-menu-item active"><?php echo Libraries_Controller::selected_library( $menu_id )['name']; ?></a>
					</div>
				</div>
				<div class="media-modal-content">
					<div class="media-frame mode-select wp-core-ui">
					<div class="media-frame-menu">
						<div class="media-menu">
						<a href="#" class="media-menu-item active"><?php esc_html_e( 'Featured Image' ); ?></a>
						</div>
					</div>
					<div class="media-frame-content" data-columns="8">
						<div class="attachments-browser">
						<div class="media-toolbar">
							<div class="media-toolbar-secondary">
							<p><em><?php printf( esc_html__( 'Search in %s.' ), Libraries_Controller::selected_library( $menu_id )['name'] ); ?></em></p>
							</div>
							<div class="media-toolbar-primary search-form">
							<input type="search" placeholder="<?php esc_html_e( 'Search...' ); ?>" id="media-search-input" class="search">
							</div>
						</div>
						<ul tabindex="-1" class="attachments">
						<?php foreach ( explode( ',', Libraries_Controller::selected_library( $menu_id )['iconmap'] ) as $id => $icon ) : ?>
							<li tabindex="0" role="checkbox" aria-label="<?php echo esc_attr( $icon ); ?>" aria-checked="false" data-id="<?php echo esc_attr( $id ); ?>" class="attachment save-ready icon _<?php echo esc_attr( str_replace( ' ', '_', trim( $icon ) ) ); ?>">
								<div class="attachment-preview js--select-attachment type-image subtype-jpeg landscape">
								<div class="thumbnail">
									<i class="<?php echo esc_attr( $icon ); ?>"></i>
								</div>
								</div>
								<button type="button" class="check" tabindex="-1">
								<span class="media-modal-icon"></span>
								<span class="screen-reader-text"><?php esc_html_e( 'Deselect' ); ?></span>
								</button>
							</li>
							<?php endforeach; ?>
						</ul>
						<div class="media-sidebar">
							<div tabindex="0" class="attachment-details save-ready">
							<h2>
							<?php esc_html_e( 'Icon' ); ?>
								<span class="settings-save-status">
								<span class="spinner"></span>
								<span class="saved">
								<?php esc_html_e( 'Saved' ); ?>
								</span>
								</span>
							</h2>
							</div>
						</div>
						</div>
					</div>
					<div class="media-frame-toolbar">
						<div class="media-toolbar">
						<div class="media-toolbar-secondary"></div>
						<div class="media-toolbar-primary search-form">
							<button type="button" class="button media-button button-large button-primary media-button-select save"><?php esc_html_e( 'Save' ); ?></button>
							<button type="button" class="button media-button button-large button-secondary remove"><?php esc_html_e( 'Remove' ); ?></button>
						</div>
						</div>
					</div>
					</div>
				</div>
				</div>
			</div>
		</script>
		<script type="text/html" id='tmpl-wpmi-modal-preview'>
			<div class="attachment-info">
				<div class="thumbnail thumbnail-image">
				<i class="{{ data.icon }}"></i>
				</div>
				<div class="details">
				<div class="filename">{{ data.icon }}</div>
				<div class="uploaded">{{ data.align }}</div>
				<div class="file-size">{{ data.size }} <em>(em)</em></div>
				</div>
			</div>
		</script>
		<script type="text/html" id='tmpl-wpmi-modal-settings'>
			<div class="attachment-info">
				<form>
					<label class="setting">
						<span><?php esc_html_e( 'Hide Label' ); ?></span>
						<select id="<?php echo esc_attr( WPMI_PREFIX . '-input-label' ); ?>" class="<?php echo esc_attr( WPMI_PREFIX . '-input' ); ?>" name="<?php echo esc_attr( WPMI_PREFIX . '[label]' ); ?>">
						<option <# if ( data.label !=1) { #>selected<# } #> value=""><?php esc_html_e( 'No' ); ?></option>
						<option <# if ( data.label==1) { #>selected<# } #> value="1"><?php esc_html_e( 'Yes' ); ?></option>
						</select>
					</label>
					<label class="setting">
						<span><?php esc_html_e( 'Position' ); ?></span>
						<select id="<?php echo esc_attr( WPMI_PREFIX . '-input-position' ); ?>" class="<?php echo esc_attr( WPMI_PREFIX . '-input' ); ?>" name="<?php echo esc_attr( WPMI_PREFIX . '[position]' ); ?>">
						<option <# if ( data.position=='before' ) { #>selected<# } #> value="before"><?php esc_html_e( 'Before' ); ?></option>
						<option <# if ( data.position=='after' ) { #>selected<# } #> value="after"><?php esc_html_e( 'After' ); ?></option>
						</select>
					</label>
					<label class="setting">
						<span><?php esc_html_e( 'Vertical Align' ); ?></span>
						<select id="<?php echo esc_attr( WPMI_PREFIX . '-input-align' ); ?>" class="<?php echo esc_attr( WPMI_PREFIX . '-input' ); ?>" name="<?php echo esc_attr( WPMI_PREFIX . '[align]' ); ?>">
						<option <# if ( data.align=='top' ) { #>selected<# } #> value="top"><?php esc_html_e( 'Top' ); ?></option>
						<option <# if ( data.align=='middle' ) { #>selected<# } #> value="middle"><?php esc_html_e( 'Middle' ); ?></option>
						<option <# if ( data.align=='bottom' ) { #>selected<# } #> value="bottom"><?php esc_html_e( 'Bottom' ); ?></option>
						</select>
					</label>
					<label class="setting">
						<span><?php esc_html_e( 'Size' ); ?> <em>(em)</em></span>
						<input id="<?php echo esc_attr( WPMI_PREFIX . '-input-size' ); ?>" class="<?php echo esc_attr( WPMI_PREFIX . '-input' ); ?>" name="<?php echo esc_attr( WPMI_PREFIX . '[size]' ); ?>" type="number" min="0.1" step="0.1" value="{{ data.size }}">
					</label>
					<label class="wpmi-color-picker">
						<span class="container">
						<input id="<?php echo esc_attr( WPMI_PREFIX . '-input-color' ); ?>" class="<?php echo esc_attr( WPMI_PREFIX . '-input' ); ?>" name="<?php echo esc_attr( WPMI_PREFIX . '[color]' ); ?>" type="text" value="{{ data.color }}" data-alpha="true">
						</span>
					</label>
					<input id="<?php echo esc_attr( WPMI_PREFIX . '-input-icon' ); ?>" class="<?php echo esc_attr( WPMI_PREFIX . '-input' ); ?>" name="<?php echo esc_attr( WPMI_PREFIX . '[icon]' ); ?>" type="hidden" value="{{ data.icon }}">
				</form>
			</div>
		</script>
			<?php
	}

	public function icon( $menu_item_id, $item, $depth, $args ) {
		?>
				<span class="menu-item-wpmi_open">
				<?php if ( ! empty( $item->wpmi->icon ) ) : ?>
						<i class="menu-item-wpmi_icon <?php echo esc_attr( $item->wpmi->icon ); ?>"></i>
					<?php endif; ?>
					<i class="menu-item-wpmi_plus dashicons dashicons-plus"></i>
				</span>
			<?php
	}

	public function fields( $menu_item_id, $item, $depth, $args ) {
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
