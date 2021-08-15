function getRoundedCanvas(sourceCanvas) {
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  var width = sourceCanvas.width;
  var height = sourceCanvas.height;

  canvas.width = width;
  canvas.height = height;
  context.imageSmoothingEnabled = true;
  context.drawImage(sourceCanvas, 0, 0, width, height);
  context.globalCompositeOperation = "destination-in";
  context.beginPath();
  context.arc(
    width / 2,
    height / 2,
    Math.min(width, height) / 2,
    0,
    2 * Math.PI,
    true
  );
  context.fill();
  return canvas;
}

function each(arr, callback) {
  var length = arr.length;
  var i;

  for (i = 0; i < length; i++) {
    callback.call(arr, arr[i], i, arr);
  }

  return arr;
}

async function selectFile(env) {
  const fileInput = document.querySelector("#my-input");
  return new Promise((resolve, reject) => {
    fileInput.addEventListener("change", async (event) => {
			let result;
			result = await getDataUrlFromReader(event);
      resolve(result);
    });
  });
}


async function getDataUrlFromReader(event) {
  const files = event.target.files;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("loadend", () => {
      resolve(reader.result);
    });
    reader.readAsDataURL(files[0]);
  });
}

async function getEnv() {
  return new Promise((resolve, reject) => {
    uni.getEnv((res) => {
      resolve(res);
    });
  });
}


// TODO: 
async function chooseWithPlusApi() {
  const btnArray = [{ title: "拍照" }, { title: "从手机相册选择" }];

  return new Promise((resolve, reject) => {
    plus.nativeUI.actionSheet(
      {
        cancel: "取消",
        buttons: btnArray,
      },
      function (e) {
        var index = e.index;
        switch (index) {
          case 0:
            break;
          case 1:
            var camera = plus.camera.getCamera();
            camera.captureImage(
              function (file) {
                resolve(file);
              },
              function () {
                console.log("从相机获取照片失败");
                reject("从相机获取照片失败");
              },
              {
                filename: "_doc/photo/",
                index: 1,
              }
            );
            break;
          case 2:
            plus.gallery.pick(
              function (file) {
                resolve(file);
              },
              function () {
                console.log("取消图片选择");
                reject("取消图片选择");
              },
              { multiple: false }
            );
            break;
        }
      }
    );
  });
}
