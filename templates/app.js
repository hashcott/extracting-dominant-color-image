// ----- On render -----
$(function() {

  $('#profile').addClass('dragging').removeClass('dragging');
});

$('#profile').on('dragover', function() {
  $('#profile').addClass('dragging')
}).on('dragleave', function() {
  $('#profile').removeClass('dragging')
}).on('drop', function(e) {
  $('#profile').removeClass('dragging hasImage');

  if (e.originalEvent) {
    var file = e.originalEvent.dataTransfer.files[0];

    var reader = new FileReader();

    //attach event handlers here...

    reader.readAsDataURL(file);
    reader.onload = function(e) {
      alert(this.width + 'x' + this.height);

      // console.log(reader.result);
      $('#profile').css('background-image', 'url(' + reader.result + ')').addClass('hasImage');

    }

  }
})
$('#profile').on('click', function(e) {
  console.log('clicked')
  $('#mediaFile').click();
});
window.addEventListener("dragover", function(e) {
  e = e || event;
  e.preventDefault();
}, false);
window.addEventListener("drop", function(e) {
  e = e || event;
  e.preventDefault();
}, false);
$('#mediaFile').change(function(e) {
  
  var input = e.target;
  alertError(input.files[0],"Vui lòng upload ảnh !")

  if (input.files && input.files[0]) {
    var file = input.files[0];

    var reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = function(e) {
      console.log(reader.result);
      $('#profile').css('background-image', 'url(' + reader.result + ')').addClass('hasImage');
    }
  }
})


// Xuất lỗi
function alertError(value, msg) {
  if(!value || parseInt(value) <= 0) {
    document.getElementById("alert").innerText = msg
    document.getElementById("alert").style.display = "block"
    return false;
  }
  document.getElementById("alert").style.display = "none"
  return true;
}

// Validate number of cluster
$("#cluster-num").keyup(function(e) {
 alertError(e.target.value,"Vui lòng số cluster sai (Yêu cầu > 0) !")
})


// Optimized cluster

$("#cal-cluster").click(async function(e) {
  let input = document.getElementById("mediaFile");
  let valid = alertError(input.files[0],"Vui lòng upload ảnh !")
  if(!valid) return
  let data = new FormData()
  data.append("image", input.files[0])

  let res = await fetch("/cluster", {
    method : "POST",
    body: data
  })
  let dataRes = await res.json()
  console.log(dataRes);
 })