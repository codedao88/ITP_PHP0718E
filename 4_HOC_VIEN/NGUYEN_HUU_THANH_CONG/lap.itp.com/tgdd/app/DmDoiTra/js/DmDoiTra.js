var DmDoiTra = function(pAppUrl){
    // Thuộc tính bắt buộc
    this.AppURL = pAppUrl;
    this.CoreData = new CoreDataAjax();
    // Thuộc tính của đối tượng
    this.id_dm_doitra = 0;
    this.ten = '';
    this.mota = '';
    this.trangthai = 1;

    // Thuộc tính mở rộng
    this.DanhSach = null;
    var that = this;

    // Các phương thức
    // Liệt kê tất cả
    this.FindAll = function(){
        var _params = {};
        var _data = {COMMAND:'p_ch_dm_doitra_find_all', PARAMS:_params};
        var _rs = that.CoreData.callDataGet('AjxCallProcGet', _data);
        if(_rs.CODE=='SUC'){
            that.DanhSach = _rs.DATA;
        }else{
            alert(_rs.MESSAGE);
        }
    }

    this.GetById = function(){
        var _params = {
            id_dm_doitra: that.id_dm_doitra
        };
        var _data = {COMMAND:'p_ch_dm_doitra_get_byid', PARAMS:_params};
        var _rs = that.CoreData.callDataGet('AjxCallProcGet', _data);
        if(_rs.CODE=='SUC'){
            var _chitiet = _rs.DATA[0];
            that.ten = _chitiet.ten;
            that.mota = _chitiet.mota;
            that.trangthai = _chitiet.trangthai;
        }else{
            alert(_rs.MESSAGE);
        }
    }

    this.Save = function(){
        var _params = {
            id_dm_doitra: this.id_dm_doitra,
            ten: this.ten,
            mota: this.mota,
            trangthai: this.trangthai
        };
        var _data = {COMMAND:'p_ch_dm_doitra_save', PARAMS:_params};
        var _rs = that.CoreData.callDataGet('AjxCallProcSet', _data);
        alert(_rs.MESSAGE);
    }

    this.Del = function(){
        var _params = {
            id_dm_doitra: this.id_dm_doitra
        };
        var _data = {COMMAND:'p_ch_dm_doitra_del', PARAMS:_params};
        var _rs = that.CoreData.callDataGet('AjxCallProcSet', _data);
        alert(_rs.MESSAGE);
    }
}