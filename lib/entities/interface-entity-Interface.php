<?php

namespace QuadLayers\WPMI\Entities;

interface Entity_Interface {
	public function get_prefix();

	public function get_name();

	public function get_label();

	public function get_base_dir();

	public function get_base_url();

	public function get_folder_path();

	public function get_folder_url();

	public function get_file_path( $filename );

	public function get_file_url( $filename );

	public function get_library_assets();

	public function get_version();

	public function get_json_url();

	public function get_json_path();

	public function get_stylesheet_url();

	public function get_stylesheet_path();
}
