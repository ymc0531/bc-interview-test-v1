$(document).ready( function () {
  (async () => {
    var uid = window.location.pathname.substr(6);
    await getItem(uid);
  })()
});

async function getItem (uid) {
  let data = {uid: uid};
  (async () => {
    let result = await getItemAjax(data);
    $('.table-title').attr('data-id', result[0].id);
    $('#item-list').append(`
      <tr>
        <td class="td2"><input id="ibarcode" type='number' value='${result[0].barcode}'></td>
        <td class="td3"><input id="ibrand" value='${result[0].brand}'></td>
        <td class="td4"><input id="ipname" value='${result[0].product_name}'></td>
        <td class="td5">
          <div class="d-flex">
            <button class="savebtn" onclick="saveEdit()">save</button>&nbsp;
            <button class="cclbtn" onclick="cancelEdit()">cancel</button>
          </div>
        </td>
      </tr>
    `);
  })()
}

async function getItemAjax(data) {
  let result;
  try {
    result = await $.ajax({
      url: '/item',
      type: 'POST',
      data: data
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}

function saveEdit() {
  let id = $('.table-title').attr('data-id');
  let barcode = $('#ibarcode').val();
  let brand = $('#ibrand').val();
  let pname = $('#ipname').val();
  let data = {id: id, barcode: barcode, brand: brand, pname: pname};
  (async () => {
    await editItemAjax(data);
  })()
}

async function editItemAjax(data) {
  let result;
  try {
    result = await $.ajax({
      url: '/item',
      type: 'PUT',
      data: data,
      statusCode: {
        404: function() {
          alert( "Data is not correct." );
        },
        200: function() {
          if(!alert("Successfully updated.")) 
            window.location.href = '/';
        }
      }
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}

function cancelEdit() {
  window.location.href = "/";
}