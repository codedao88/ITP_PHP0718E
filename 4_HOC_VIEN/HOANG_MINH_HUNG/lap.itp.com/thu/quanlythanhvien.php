<?php
	session_start(); 
 ?>
<?php require_once("includes/connection.php");?>
<?php include("includes/permission.php");?>
<?php include ("includes/header.php"); ?>
<a href="them-thanh-vien.php">Th�m th�nh vi�n</a>
<table border="1px;" align="center">
	<thead>
		<tr>
			<td bgcolor="#E6E6FA">ID</td>
			<td bgcolor="#E6E6FA">Username</td>
			<td bgcolor="#E6E6FA">Email</td>
			<td bgcolor="#E6E6FA">Kh�a t�i kho?n</td>
			<td bgcolor="#E6E6FA">Quy?n</td>
			<td bgcolor="#E6E6FA">H�nh d?ng</td>
		<tr>
	</thead>
	<tbody>
		<tr>
			<td>1</td>
			<td>username 1</td>
			<td>email 1</td>
			<td>Kh�ng</td>
			<td>Admin</td>
			<td>
				<a href="chinh-sua-thanh-vien.php?id=1">S?a</a>
				<a href="quan-ly-thanh-vien.php?id_delete=1">X�a</a>
			</td>
		</tr>
		<tr>
			<td>2</td>
			<td>username 2</td>
			<td>email 2</td>
			<td>C�</td>
			<td>Th�nh vi�n</td>
			<td>
				<a href="chinh-sua-thanh-vien.php?id=2">S?a</a>
				<a href="quan-ly-thanh-vien.php?id_delete=2">X�a</a>
			</td>
		</tr>
		<tr>
			<td>3</td>
			<td>username 3</td>
			<td>email 3</td>
			<td>C�</td>
			<td>Admin</td>
			<td>
				<a href="chinh-sua-thanh-vien.php?id=3">S?a</a>
				<a href="quan-ly-thanh-vien.php?id_delete=3">X�a</a>
			</td>
		</tr>
		<tr>
			<td>4</td>
			<td>username 4</td>
			<td>email 4</td>
			<td>Kh�ng</td>
			<td>Th�nh vi�n</td>
			<td>
				<a href="chinh-sua-thanh-vien.php?id=4">S?a</a>
				<a href="quan-ly-thanh-vien.php?id_delete=4">X�a</a>
			</td>
		</tr>
	</tbody>
</table>
<?php include "includes/footer.php" ?>