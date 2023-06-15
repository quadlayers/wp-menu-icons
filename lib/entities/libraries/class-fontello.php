<?php

namespace QuadLayers\WPMI\Entities\Libraries;

use QuadLayers\WPMI\Entities\Libraries\Base as Library_Base;
use QuadLayers\WPMI\Entities\Libraries\Library as Library_Interface;

class Fontello extends Library_Base implements Library_Interface {

	public function __construct() {
		$this->type  = 'uploaded';
		$this->name  = 'fontello';
		$this->label = 'Fontello';
		parent::__construct();
	}

}
