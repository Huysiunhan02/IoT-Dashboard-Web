
// Load list device
function LoadListDevice() {
    let list = JSON.parse(localStorage.getItem('Devices')) || [];
    var str = "";
    var sl = 0;
    list.sort();
    for (let x of list) {
        sl++;
        str += `
            <tr>
                <td>`+ x.type + `</td>
                <td>`+ x.name + `</td>
                <td>`+ x.folder + `</td>
                <td>
                <ion-icon name="create-outline" title="Sửa" onclick="EditDevice(`+ x.id +`)"></ion-icon>
                <ion-icon name="trash-outline" title="Xóa" onclick="DeleteDevice(`+ x.id +`)"></ion-icon>
                </td>
            </tr>
        `;
    }
    document.getElementById("listDevice").innerHTML = str;
    $('#tongsosp').html(sl);
}
LoadListDevice();



//Quản lý thiết bị======================
function AddDevice() {
    let list = JSON.parse(localStorage.getItem('Devices')) || [];
    var id;
    var type = document.getElementById("type-device").value;
    var name = document.getElementById("name-device").value;
    var folder = document.getElementById("folder").value;
    var number = /^[0-9]+$/;

    if (id == null || id == "") {
        var d = new Date();
        id = Number(d);
    }
    else if (!id.match(number) || id.length != 13) {
        alert("Mã sản phẩm phải là kiểu số và có độ dài là 13 ký tự! Vui lòng nhập lại!");
        return false;
    }

    if (type == "choose") {
        alert("Vui lòng chọn loại thiết bị!");
        return false;
    }
    else if (name == null || name == "") {
        alert("Tên thiết bị không được để trống! Vui lòng nhập lại!");
        return false;
    }
    else if (folder == null || folder == "") {
        folder = name.toLowerCase();
    }

    console.log("AddDevice");
    if (list == null) list = [];
    var device = {
        "id": id,
        "type": type,
        "folder": folder,
        "name": name
    };
    list.push(device);
    localStorage.setItem("Devices", JSON.stringify(list));
    alert("Đã thêm thành công!");
    LoadDatasp();
    // location.reload();
}


function DeleteDevice(id) {
    let list = JSON.parse(localStorage.getItem('Devices')) || [];
    if (confirm("Bạn chắc chắn muốn xóa!")) {
        var index = list.findIndex(x => x.id == id);
        if (index >= 0) {
            list.splice(index, 1);
            // alert('debug');
        }
        localStorage.setItem('Devices', JSON.stringify(list));
        alert('Xóa thành công');
        LoadDatasp();
    }
}
function EditDevice(id) {
    let list = JSON.parse(localStorage.getItem('Devices')) || [];
    for (x of list) {
        if (x.id == id) {
            document.getElementById('name-device').value = x.name;
            document.getElementById('folder').value = x.folder;
            document.getElementById('type-device').value = x.type;
        }
    }
}

