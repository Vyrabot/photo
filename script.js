const video = document.getElementById("video");
const selfy = document.getElementById("selfy");
const canvas = document.getElementById("canvas");
const download = document.getElementById("download");
const contentImg = document.getElementById("contentImg");
const countNum = document.getElementById("count");
const filter = [
  "default",
  "contrast",
  "hue-rotate",
  "grayscale",
  "brightness",
  "sepia",
  "saturate",
  "invert",
];
const newFilter = filter.map((ids) => document.getElementById(ids));
const ctx = canvas.getContext("2d");
let dataSrc = [];
let currentFilter = "";
//som permistion
navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then((dataLive) => {
    video.srcObject = dataLive;
    video.play();
  })
  .catch((err) => console.error(err));

// Take photo with delay
selfy.onclick = function () {
  let count = 0;
  const capturePhoto = 5;
  const countDownInterval = setInterval(() => {
    count++;
    countNum.style.display = "block";
    countNum.innerText = count;
    if (count >= 4) {
      countNum.style.display = "none";
      console.log(count);
      count = 0;
      takePhoto();
    }
    if (dataSrc.length >= capturePhoto) {
      dataSrc = [];
      clearTimeout(countDownInterval);
    }
  }, 1000);
};
//take photo fn
function takePhoto() {
  canvas.height = video.videoHeight;
  canvas.width = video.videoWidth;
  ctx.filter = currentFilter;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageSrc = canvas.toDataURL("image/png");
  dataSrc.push(imageSrc);
  const img = document.createElement("img");
  img.src = imageSrc;
  img.style.filter = currentFilter;
  contentImg.appendChild(img);
}

// Download images
download.onclick = function () {
  dataSrc.forEach((src, index) => {
    const link = document.createElement("a");
    link.href = src;
    link.download = `tos_selfy_${Date.now()}_${index}.png`;
    link.click();
  });
};

// Apply filters
newFilter.forEach((filter) => {
  filter.addEventListener("click", () => {
    switch (filter.id) {
      case "default":
        currentFilter = "unset";
        break;
      case "contrast":
        currentFilter = "contrast(120%)";
        break;
      case "hue-rotate":
        currentFilter = "hue-rotate(35deg)";
        break;
      case "grayscale":
        currentFilter = "grayscale(100%)";
        break;
      case "brightness":
        currentFilter = "brightness(120%)";
        break;
      case "sepia":
        currentFilter = "sepia(100%)";
        break;
      case "saturate":
        currentFilter = "saturate(150%)";
        break;
      case "invert":
        currentFilter = "invert(30%)";
        break;
      default:
        currentFilter = "";
    }
    video.style.filter = currentFilter;
  });
});
