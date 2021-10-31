// ----- On render -----
$(function () {
  $("#profile").addClass("dragging").removeClass("dragging");
});

$("#profile")
  .on("dragover", function () {
    $("#profile").addClass("dragging");
  })
  .on("dragleave", function () {
    $("#profile").removeClass("dragging");
  })
  .on("drop", function (e) {
    $("#profile").removeClass("dragging hasImage");
    $("#result").empty();

    if (e.originalEvent) {
      var file = e.originalEvent.dataTransfer.files[0];

      var reader = new FileReader();

      //attach event handlers here...

      reader.readAsDataURL(file);
      reader.onload = function (e) {
        alert(this.width + "x" + this.height);

        // console.log(reader.result);
        $("#profile")
          .css("background-image", "url(" + reader.result + ")")
          .addClass("hasImage");
      };
    }
  });
$("#profile").on("click", function (e) {
  console.log("clicked");
  $("#mediaFile").click();
});
window.addEventListener(
  "dragover",
  function (e) {
    e = e || event;
    e.preventDefault();
  },
  false
);
window.addEventListener(
  "drop",
  function (e) {
    e = e || event;
    e.preventDefault();
  },
  false
);
$("#mediaFile").change(function (e) {
  $("#result").empty();
  $("#get-colors").prop("disabled", true);
  $("#cluster-num").val("");

  var input = e.target;
  alertError(input.files[0], "Vui lòng upload ảnh !");

  if (input.files && input.files[0]) {
    var file = input.files[0];

    var reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = function (e) {
      $("#profile")
        .css("background-image", "url(" + reader.result + ")")
        .addClass("hasImage");
    };
  }
});

// Xuất lỗi
function alertError(value, msg) {
  if (!value || parseInt(value) <= 0) {
    document.getElementById("alert").innerText = msg;
    document.getElementById("alert").style.display = "block";
    return false;
  }
  document.getElementById("alert").style.display = "none";
  return true;
}

// Validate number of cluster
$("#cluster-num").keyup(function (e) {
  let valid = alertError(
    e.target.value,
    "Vui lòng số cluster sai (Yêu cầu > 0) !"
  );
  if (valid) {
    $("#get-colors").prop("disabled", false);
    return;
  }
  $("#get-colors").prop("disabled", true);
});

// Optimized cluster
function loading_cluster() {
  $("#cal-cluster").html(`<img src="/statics/loading.svg" alt="" srcset="">
  <h3>Đang xử lý</h3>`);
  $("#cal-cluster").prop("disabled", true);
}
$("#cal-cluster").click(async function (e) {
  let input = document.getElementById("mediaFile");
  let valid = alertError(input.files[0], "Vui lòng upload ảnh !");
  if (!valid) return;
  let data = new FormData();
  data.append("image", input.files[0]);
  loading_cluster();
  let res = await fetch("/cluster", {
    method: "POST",
    body: data,
  });
  let dataRes = await res.json();
  $("#elbow-img").attr("src", "/statics/elbow.png?" + new Date().getTime());

  $("#cal-cluster").html(`Tìm cụm`);
  $("#cal-cluster").prop("disabled", false);
  $("#get-colors").prop("disabled", false);
  $("#cluster-num").val(dataRes);
});

// Lấy dữ liệu về màu và in ra màn hình
$("#get-colors").click(async function (e) {
  $("#result").empty();
  $("#get-colors").prop("disabled", true);
  $("#cal-cluster").prop("disabled", true);

  $(".loading")[0].style.display = "flex";

  let inputImg = document.getElementById("mediaFile");
  let inputCluster = document.getElementById("cluster-num");

  // let valid = alertError(input.files[0], "Vui lòng upload ảnh !")
  // if (!valid) return
  let data = new FormData();
  data.append("image", inputImg.files[0]);
  data.append("cluster", inputCluster.value);
  let res = await fetch("/get-colors", {
    method: "POST",
    body: data,
  });
  let dataRes = await res.json();

  dataRes.forEach((color, i) => {
    let box = document.createElement("div");
    box.classList.add("box");

    let colorEl = document.createElement("div");
    colorEl.classList.add("color");
    colorEl.style.backgroundColor = color;
    box.appendChild(colorEl);

    let textColor = document.createElement("p");
    textColor.innerText = color;
    box.appendChild(textColor);

    $("#result").append(box);
  });

  $(".loading")[0].style.display = "none";
  $("#cal-cluster").prop("disabled", false);
  $("#get-colors").prop("disabled", false);
});

// Get the modal
var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
