let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("Brightness");
let sepia = document.getElementById("Sepia");
let grayscale = document.getElementById("Grayscale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");
let downloadBtn = document.getElementById("download");
let uploadBtn = document.getElementById("upload");
let img = document.getElementById("img");
let imgbox = document.querySelector(".imgbox");
let reset = document.getElementById("resetBtn");

window.onload = function () {
  downloadBtn.style.display = "none";
  reset.style.display = "none";
  imgbox.style.display = "none";
};

uploadBtn.onchange = function () {
  resetvalues();
  downloadBtn.style.display = "block";
  reset.style.display = "block";
  imgbox.style.display = "block";
  let file = new FileReader();
  file.readAsDataURL(uploadBtn.files[0]);
  file.onload = function () {
    img.src = file.result;
    applyFilters();
  };
};

function applyFilters() {
  img.style.filter = `
    saturate(${saturate.value}%)
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    sepia(${sepia.value}%)
    grayscale(${grayscale.value})
    blur(${blur.value}px)
    hue-rotate(${hueRotate.value}deg)
  `;
}

saturate.oninput = applyFilters;
contrast.oninput = applyFilters;
brightness.oninput = applyFilters;
sepia.oninput = applyFilters;
grayscale.oninput = applyFilters;
blur.oninput = applyFilters;
hueRotate.oninput = applyFilters;

downloadBtn.onclick = function () {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = img.width;
  canvas.height = img.height;

  ctx.filter = `
    saturate(${saturate.value}%)
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    sepia(${sepia.value}%)
    grayscale(${grayscale.value})
    blur(${blur.value}px)
    hue-rotate(${hueRotate.value}deg)
  `;

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  let imageUrl = canvas.toDataURL("image/jpeg", 0.95); // Specify format and quality
  downloadBtn.href = imageUrl;
  downloadBtn.download = "filtered-image.jpg";
};

function resetvalues() {
  img.style.filter = "none";
  saturate.value = "100";
  contrast.value = "100";
  brightness.value = "100";
  sepia.value = "0";
  grayscale.value = "0";
  blur.value = "0";
  hueRotate.value = "0";
}
