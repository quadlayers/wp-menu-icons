<?php

namespace QuadLayers\WPMI\Entities\Libraries;

use QuadLayers\WPMI\Entities\Libraries\Base as Library_Base;
use QuadLayers\WPMI\Entities\Libraries\Library as Library_Interface;

class Icomoon extends Library_Base implements Library_Interface {

	public function __construct() {
		$this->type  = 'uploaded';
		$this->name  = 'icomoon';
		$this->label = 'Icomoon';
		parent::__construct();
	}

}
