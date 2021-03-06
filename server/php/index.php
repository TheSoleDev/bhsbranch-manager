<?php
/*
 * jQuery File Upload Plugin PHP Example
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

error_reporting(E_ALL | E_STRICT);
require('UploadHandler.php');
// $upload_handler = new UploadHandler();


$custom_dir = $_REQUEST['path'];
$upload_url = isset($_REQUEST['upload_url'])?$_REQUEST['upload_url']:'server/php/'.$custom_dir;
$upload_handler = new UploadHandler(array('upload_dir' => $custom_dir,'upload_url' => $upload_url));
