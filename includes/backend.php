<?php
if (!defined('ABSPATH')) {
  die('-1');
}

if (!class_exists('WPMI_Backend')) {

  class WPMI_Backend extends WPMI {

    private static $instance;
    protected static $fields = array('icon');

    function ajax_dismiss_notice() {

      if ($notice_id = ( isset($_POST['notice_id']) ) ? sanitize_key($_POST['notice_id']) : '') {

        update_user_meta(get_current_user_id(), $notice_id, true);

        wp_send_json($notice_id);
      }

      wp_die();
    }

    function add_notices() {

      if (!get_transient('wpmi-first-rating') && !get_user_meta(get_current_user_id(), 'wpmi-user-rating', true)) {
        ?>
        <div id="wpmi-admin-rating" class="wpmi-notice notice is-dismissible" data-notice_id="wpmi-user-rating">
          <div class="notice-container" style="padding-top: 10px; padding-bottom: 10px; display: flex; justify-content: left; align-items: center;">
            <div class="notice-image">
              <img style="border-radius:50%;max-width: 90px;" src="<?php echo plugins_url('/assets/img/logo.jpg', WPMI_PLUGIN_FILE); ?>" alt="<?php echo esc_html(WPMI_PLUGIN_NAME); ?>>">
            </div>
            <div class="notice-content" style="margin-left: 15px;">
              <p>
                <?php printf(esc_html__('Hello! Thank you for choosing the %s plugin!', 'wpmi'), WPMI_PLUGIN_NAME); ?>
                <br/>
                <?php esc_html_e('Could you please give it a 5-star rating on WordPress? We know its a big favor, but we\'ve worked very much and very hard to release this great product. Your feedback will boost our motivation and help us promote and continue to improve this product.', 'wpmi'); ?>
              </p>
              <a href="<?php echo esc_url(WPMI_REVIEW_URL); ?>" class="button-primary" target="_blank">
                <?php esc_html_e('Yes, of course!', 'wpmi'); ?>
              </a>
              <a href="<?php echo esc_url(WPMI_SUPPORT_URL); ?>" class="button-secondary" target="_blank">
                <?php esc_html_e('Report a bug', 'wpmi'); ?>
              </a>
            </div>				
          </div>
        </div>
        <script>
          (function ($) {
            $('.wpmi-notice').on('click', '.notice-dismiss', function (e) {
              e.preventDefault();
              var notice_id = $(e.delegateTarget).data('notice_id');
              $.ajax({
                type: 'POST',
                url: ajaxurl,
                data: {
                  notice_id: notice_id,
                  action: 'wpmi_dismiss_notice',
                },
                success: function (response) {
                  console.log('Dismiss notice!');
                },
              });
            });
          })(jQuery);
        </script>
        <?php
      }
    }

    function add_action_links($links) {

      $links[] = '<a target="_blank" href="' . WPMI_DEMO_URL . '">' . esc_html__('Documentation', 'wpmi') . '</a>';
      $links[] = '<a target="_blank" href="' . WPMI_SUPPORT_URL . '">' . esc_html__('Support', 'wpmi') . '</a>';

      return $links;
    }

    function wp_update_nav_menu_item($menu_id, $menu_item_db_id, $menu_item_args) {

      if (!wp_doing_ajax()) {

        $menu_item_wpmi = array();

        check_admin_referer('update-nav_menu', 'update-nav-menu-nonce');

        if (!empty($_POST['wpmi'][$menu_item_db_id])) {

          $menu_item_wpmi['label'] = absint($_POST['wpmi'][$menu_item_db_id]['label']);
          $menu_item_wpmi['position'] = sanitize_html_class($_POST['wpmi'][$menu_item_db_id]['position']);
          $menu_item_wpmi['align'] = sanitize_html_class($_POST['wpmi'][$menu_item_db_id]['align']);
          $menu_item_wpmi['size'] = sanitize_text_field($_POST['wpmi'][$menu_item_db_id]['size']);
          $menu_item_wpmi['icon'] = esc_attr($_POST['wpmi'][$menu_item_db_id]['icon']);
          $menu_item_wpmi['color'] = sanitize_text_field($_POST['wpmi'][$menu_item_db_id]['color']);

          $this->update($menu_item_db_id, $menu_item_wpmi);
        }
      }
    }

    function update($id, $value) {

      $value = apply_filters('wp_menu_icons_item_meta_values', $value, $id);

      if (!empty($value)) {
        update_post_meta($id, WPMI_DB_KEY, $value);
      } else {
        delete_post_meta($id, WPMI_DB_KEY);
      }
    }

    function save_nav_menu() {

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

    function enqueue() {

      global $pagenow;

      if ($pagenow != 'nav-menus.php')
        return;

      $this->enqueue_style_icons();

      wp_enqueue_media();

      //wp_enqueue_style('wp-color-picker');

      wp_enqueue_style('wpmi-admin', plugins_url('assets/css/admin.css', WPMI_PLUGIN_FILE), array('wp-color-picker'), WPMI_PLUGIN_VERSION, 'all');

      wp_register_script('wp-color-picker-alpha', plugins_url('assets/js/wp-color-picker-alpha.min.js', WPMI_PLUGIN_FILE), array('jquery', 'wp-color-picker'));

      wp_enqueue_script('wpmi', plugins_url('assets/js/modal.js', WPMI_PLUGIN_FILE), array(
          'jquery',
          'backbone',
          'underscore',
          'wp-util',
          'wp-color-picker-alpha'
      ));
      wp_localize_script('wpmi', 'wpmi_l10n', array(
          'legacy_pick' => esc_html__('Select'),
          'legacy_current' => esc_html__('Color'),
          'nonce' => wp_create_nonce('wpmi'),
      ));
    }

    function navmenu() {
      add_meta_box(WPMI_DOMAIN . '_metabox', WPMI_PLUGIN_NAME, array($this, 'metabox'), 'nav-menus', 'side', 'high');
    }

    public function metabox() {

      $menu_id = $this->nav_menu_selected_id();

      if (!$current = get_term_meta($menu_id, WPMI_DB_KEY, true)) {
        $current = 'dashicons';
      }
      ?>
      <div id="posttype-<?php echo esc_attr(WPMI_DOMAIN); ?>-themes" class="posttypediv">
        <div id="tabs-panel-<?php echo esc_attr(WPMI_DOMAIN); ?>-themes" class="tabs-panel tabs-panel-active">
          <ul id ="<?php echo esc_attr(WPMI_DOMAIN); ?>-themes-checklist" class="categorychecklist form-no-clear">
            <?php
            foreach ($this->registered_icons() as $id => $icon) :
              ?>
              <li>
                <label class="menu-item-title">
                  <input type="radio" class="<?php echo esc_attr(WPMI_DOMAIN . '-item-checkbox'); ?>" name="<?php echo esc_attr(WPMI_DOMAIN . '_font'); ?>" value="<?php echo esc_attr($id); ?>" <?php checked($id, $current); ?>> <?php echo esc_html($icon->name); ?>
                </label>
              </li>
            <?php endforeach; ?>
          </ul>
          <?php submit_button(__('Save'), 'button-primary save', false, false); ?>
          <p></p>
        </div>
      </div>
      <?php
    }

    function walker($walker) {

      $walker = 'Menu_Item_Custom_Fields_Walker';

      if (!class_exists($walker)) {
        require_once('walker.php');
      }

      return $walker;
    }

    public function print_media_templates() {

      global $pagenow;

      if ($pagenow != 'nav-menus.php')
        return;

      $menu_id = $this->nav_menu_selected_id();
      ?>
      <script type="text/html" id='tmpl-wpmi-modal-backdrop'>
        <div class="media-modal-backdrop">&nbsp;</div>
      </script>
      <script type="text/html" id='tmpl-wpmi-modal-window'>
        <div id="<?php echo esc_attr(WPMI_DOMAIN . '_modal'); ?>" class="media-modal wp-core-ui">
          <button type="button" class="media-modal-close close">
            <span class="media-modal-icon">
              <span class="screen-reader-text"><?php esc_html_e('Close media panel'); ?></span>
            </span>
          </button>
          <div class="media-frame mode-select wp-core-ui hide-menu">
            <div class="media-frame-title">
              <h1><?php esc_html_e(WPMI_PLUGIN_NAME); ?>
                <span class="dashicons dashicons-arrow-down"></span>
              </h1>
            </div>
            <div class="media-frame-router">
              <div class="media-router">
                <a href="<?php echo esc_url(WPMI_QUADMENU_URL); ?>" class="media-menu-item" target="_blank"><?php esc_html_e('Mega Menu'); ?></a>
                <a href="#" class="media-menu-item active"><?php echo _WPMI()->selected_icons($menu_id)->name; ?></a>
              </div>
            </div>
            <div class="media-modal-content">
              <div class="media-frame mode-select wp-core-ui">
                <div class="media-frame-menu">
                  <div class="media-menu">
                    <a href="#" class="media-menu-item active"><?php esc_html_e('Featured Image'); ?></a>
                  </div>
                </div>
                <div class="media-frame-content" data-columns="8">
                  <div class="attachments-browser">
                    <div class="media-toolbar">
                      <div class="media-toolbar-secondary">
                        <p><em><?php printf(__('Search in %s.'), _WPMI()->selected_icons($menu_id)->name); ?></em></p>
                      </div>
                      <div class="media-toolbar-primary search-form">
                        <input type="search" placeholder="<?php esc_html_e('Search...'); ?>" id="media-search-input" class="search">
                      </div>
                    </div>
                    <ul tabindex="-1" class="attachments">
                      <?php foreach (explode(',', _WPMI()->selected_icons($menu_id)->iconmap) as $id => $icon) : ?>
                        <li tabindex="0" role="checkbox" aria-label="<?php echo esc_attr($icon); ?>" aria-checked="false" data-id="<?php echo esc_attr($id); ?>" class="attachment save-ready icon _<?php echo esc_attr(str_replace(' ', '_', trim($icon))); ?>">
                          <div class="attachment-preview js--select-attachment type-image subtype-jpeg landscape">
                            <div class="thumbnail">
                              <i class="<?php echo esc_attr($icon); ?>"></i>
                            </div>
                          </div>
                          <button type="button" class="check" tabindex="-1">
                            <span class="media-modal-icon"></span>
                            <span class="screen-reader-text"><?php esc_html_e('Deselect'); ?></span>
                          </button>
                        </li>
                      <?php endforeach; ?>
                    </ul>
                    <div class="media-sidebar">
                      <div tabindex="0" class="attachment-details save-ready">
                        <h2>
                          <?php esc_html_e('Icon'); ?>
                          <span class="settings-save-status">
                            <span class="spinner"></span>
                            <span class="saved">
                              <?php esc_html_e('Saved'); ?>
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
                      <button type="button" class="button media-button button-large button-primary media-button-select save"><?php esc_html_e('Save'); ?></button>
                      <button type="button" class="button media-button button-large button-secondary remove"><?php esc_html_e('Remove'); ?></button>
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
              <span><?php esc_html_e('Hide Label'); ?></span>
              <select id="<?php echo esc_attr(WPMI_DOMAIN . '-input-label'); ?>" class="<?php echo esc_attr(WPMI_DOMAIN . '-input'); ?>" name="<?php echo esc_attr(WPMI_DOMAIN . '[label]'); ?>" >
                <option <# if ( data.label != 1) { #>selected<# } #> value=""><?php esc_html_e('No'); ?></option>
                <option <# if ( data.label == 1) { #>selected<# } #> value="1"><?php esc_html_e('Yes'); ?></option>
              </select>
            </label>
            <label class="setting">
              <span><?php esc_html_e('Position'); ?></span>
              <select id="<?php echo esc_attr(WPMI_DOMAIN . '-input-position'); ?>" class="<?php echo esc_attr(WPMI_DOMAIN . '-input'); ?>" name="<?php echo esc_attr(WPMI_DOMAIN . '[position]'); ?>" >
                <option <# if ( data.position == 'before' ) { #>selected<# } #> value="before"><?php esc_html_e('Before'); ?></option>
                <option <# if ( data.position == 'after' ) { #>selected<# } #> value="after"><?php esc_html_e('After'); ?></option>
              </select>
            </label>
            <label class="setting">
              <span><?php esc_html_e('Vertical Align'); ?></span>
              <select id="<?php echo esc_attr(WPMI_DOMAIN . '-input-align'); ?>" class="<?php echo esc_attr(WPMI_DOMAIN . '-input'); ?>" name="<?php echo esc_attr(WPMI_DOMAIN . '[align]'); ?>" >
                <option  <# if ( data.align == 'top' ) { #>selected<# } #> value="top"><?php esc_html_e('Top'); ?></option>
                <option  <# if ( data.align == 'middle' ) { #>selected<# } #> value="middle"><?php esc_html_e('Middle'); ?></option>
                <option  <# if ( data.align == 'bottom' ) { #>selected<# } #> value="bottom"><?php esc_html_e('Bottom'); ?></option>
              </select>
            </label>
            <label class="setting">
              <span><?php esc_html_e('Size'); ?> <em>(em)</em></span>
              <input id="<?php echo esc_attr(WPMI_DOMAIN . '-input-size'); ?>" class="<?php echo esc_attr(WPMI_DOMAIN . '-input'); ?>" name="<?php echo esc_attr(WPMI_DOMAIN . '[size]'); ?>" type="number" min="0.1" step="0.1" value="{{ data.size }}">
            </label>
            <label class="wpmi-color-picker">
              <span class="container">
                <input id="<?php echo esc_attr(WPMI_DOMAIN . '-input-color'); ?>" class="<?php echo esc_attr(WPMI_DOMAIN . '-input'); ?>" name="<?php echo esc_attr(WPMI_DOMAIN . '[color]'); ?>" type="text" value="{{ data.color }}" data-alpha="true">
              </span>
            </label>
            <input id="<?php echo esc_attr(WPMI_DOMAIN . '-input-icon'); ?>" class="<?php echo esc_attr(WPMI_DOMAIN . '-input'); ?>" name="<?php echo esc_attr(WPMI_DOMAIN . '[icon]'); ?>" type="hidden" value="{{ data.icon }}">
          </form>
        </div>
      </script>
      <?php
    }

    function icon($menu_item_id, $item, $depth, $args) {
      ?>
      <span class="menu-item-wpmi_open">
        <?php if (!empty($item->wpmi->icon)): ?>
          <i class="menu-item-wpmi_icon <?php echo esc_attr($item->wpmi->icon); ?>"></i>
        <?php endif; ?>
        <i class="menu-item-wpmi_plus dashicons dashicons-plus"></i>
      </span>
      <?php
    }

    function fields($menu_item_id, $item, $depth, $args) {
      ?>
      <?php
      foreach ($this->default_values as $key => $value) {
        ?>
        <input id="<?php echo esc_attr(WPMI_DOMAIN . '-input-' . $key); ?>" class="<?php echo esc_attr(WPMI_DOMAIN . '-input'); ?>" type="hidden" name="<?php echo esc_attr(WPMI_DOMAIN . '[' . $menu_item_id . '][' . $key . ']'); ?>" value="<?php echo esc_attr($item->wpmi->{$key}); ?>">
        <?php
      }
    }

    function init() {
      add_action('wp_ajax_wpmi_dismiss_notice', array($this, 'ajax_dismiss_notice'));
      add_action('admin_enqueue_scripts', array($this, 'enqueue'));
      add_action('admin_init', array($this, 'navmenu'));
      add_action('admin_notices', array($this, 'add_notices'));
      add_action('wp_ajax_wpmi_save_nav_menu', array($this, 'save_nav_menu'));
      add_filter('wp_edit_nav_menu_walker', array($this, 'walker'), 99);
      add_action('wp_nav_menu_item_custom_fields', array($this, 'fields'), 10, 4);
      add_action('wp_nav_menu_item_custom_title', array($this, 'icon'), 10, 4);
      add_action('wp_update_nav_menu_item', array($this, 'wp_update_nav_menu_item'), 10, 3);
      add_action('print_media_templates', array($this, 'print_media_templates'));
      add_filter('plugin_action_links_' . plugin_basename(WPMI_PLUGIN_FILE), array($this, 'add_action_links'));
    }

    public static function instance() {
      if (!isset(self::$instance)) {
        self::$instance = new self();
        self::$instance->init();
      }
      return self::$instance;
    }

  }

  WPMI_Backend::instance();
}

