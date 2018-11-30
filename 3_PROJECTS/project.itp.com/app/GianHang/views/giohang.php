<?php
$DB = new MySQLHelper();
if(isset($_SESSION['giohang'])){
	//print('<pre>');
	//print_r($_SESSION['giohang']);
	$giohang = $_SESSION['giohang'];
}else{
	//echo "<h2>Giỏ hàng trống</h2>";
	$giohang = array();
} 


?>
<div class="row well" style="top:30px">
	<div class="col-md-12" style="margin:0; auto">
		<h2>Giỏ hàng</h2><hr/>
		<a class="btn btn-sm btn-danger">Hủy đơn hàng</a>
		<table class="table table-bordered tabler-hover table-stripped">
			<thead>
				<tr>
					<th>STT</th>
					<th>Ảnh</th>
					<th>Mô tả</th>
					<th>Giá bán</th>
					<th>Số lượng</th>
					<th>Xóa</th>
				</tr>
			</thead>
			<tbody>
			<?php 
				$tongtien = 0;
				for($i=0; $i<count($giohang);$i++){
					$id = $giohang[$i]['id'];
					$data = $DB->callProcedure('p_ch_sanpham_get_byid(?)',array($id));
					$sp = $data[0];
					$gia = (int)$sp['gia_ban'];
					$soluong = (int)$giohang[$i]['soluong'];
					$thanhtien = $gia  * $soluong;
					$tongtien += $thanhtien;
			?>
				<tr>
					<td>1</td>
					<td>
						<img width="75" src="/media/upload_tgdd/sanpham/<?=$sp['hinhanh']?>"/>
					</td>
					<td>
						<a href="#"><h3><?=$sp['ten']?></h3></a>
						<p><?=$sp['khuyenmai']?></p>
						<p><a href="?app=gianhang&view=chitiet&id=<?=$sp['id']?>"> Xem chi tiết >></a></p>
					</td>
					<td><b style="color:red"><?=$sp['gia_ban']?>₫</b></td>
					<td>2</td>
					<td><a class="btn btn-xs btn-danger">Xóa</a></td>
				</tr>
				<?php } ?>	
			</tbody>
		</table>
		<hr/>
		<h3>Tổng tiền thanh toán <span style="color:red"><?=$tongtien?>₫</span></h3>
	
</div>
	</div>
</div>