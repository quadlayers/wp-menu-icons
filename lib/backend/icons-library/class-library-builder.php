<?php

namespace QuadLayers\WPMI\Backend\Icons_Library;

class Library_Builder {
	protected $libraries = [];

	public function add_library( /* LibraryInterface */ $library ) {
		$this->libraries[ $library->get_name() ] = $library;
		return $this;
	}

	public function get_libraries() {
		return $this->libraries;
	}
}
