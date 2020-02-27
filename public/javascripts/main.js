$(document).ready( function () {
  (async () => {
    await getItem();
  })()
});

async function getItem () {
  (async () => {
    let result = await getItemAjax();
    for(i=0;i<result.length;i++) {
      $('#item-list').append(`
        <tr>
          <td class="td1">${i+1}</td>
          <td class="td2">${result[i].barcode}</td>
          <td class="td3">${result[i].brand}</td>
          <td class="td4">${result[i].product_name}</td>
          <td class="td5"><i class="material-icons" onclick="editPage('${result[i].id}')">edit</i></td>
        </tr>
      `);
    }
    $('.table-title').DataTable({
      paging: false,
      'columnDefs': [
        { 
          'searchable': false, 
          'targets': [0,1,4] 
        },
        {
          'orderable': false,
          'targets': [4]
        }
      ]
    });
  })()
}

async function getItemAjax(data) {
  let result;
  try {
    result = await $.ajax({
      url: '/items',
      type: 'GET'
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}

function editPage(id) {
  window.location.href = `/edit/${id}`;
}