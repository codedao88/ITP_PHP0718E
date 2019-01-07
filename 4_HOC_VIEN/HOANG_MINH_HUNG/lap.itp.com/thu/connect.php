<?php
	session_start(); 
 ?>
<?php require_once("includes/connection.php");?>
<?php include("includes/permission.php");?>
<?php include ("includes/header.php"); ?>
<?php
	$sql = "SELECT * FROM users";
	$query = mysqli_query($conn,$sql);
?>
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
	<?php 
		while ( $data = mysqli_fetch_array($query) ) {
			$i = 1;
			$id = $data['id'];
	?>
		<tr>
			<td><?php echo $i; ?></td>
			<td><?php echo $data['username']; ?></td>
			<td><?php echo $data['email']; ?></td>
			<td><?php echo ($data['is_block'] == 1) ? "B? kh�a" : "Kh�ng b? kh�a"; ?></td>
			<td><?php echo ($data['permision'] == 0) ? "Th�nh vi�n thu?ng" : "Admin"; ?></td>
			<td>
				<a href="chinh-sua-thanh-vien.php?id=<?php echo $id;?>">S?a</a>
				<a href="quan-ly-thanh-vien.php?id_delete=<?php echo $id;?>">X�a</a>
			</td>
		</tr>
	<?php 
			$i++;
		}
	?>
	</tbody>
</table>
<?php include "includes/footer.php" ?>