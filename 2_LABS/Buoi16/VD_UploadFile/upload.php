<?php 
	define("UPLOAD_FOLDER", "hinhanh/")
	foreach ($_FILE['uploadfile']['name'] as $f => $name) {
		$đuongan = UPLOAD_FILE.$name;
		$tmp_name = $_FILES['uploadfile']['tmp_name'][$f];
		move_uploaded_file($tmp_name, $duongdan);
	}
	header('Location:danhsach.php');
 ?>