import "./styles.css";

var clickamt = 0;
document.getElementById("clicker").onclick = function clicked() {
  document.getElementById("counter").innerHTML = "you have ";
  clickamt += 1;
  document.getElementById("counter").innerHTML += clickamt + " points";
};

var shopOpen = false;
document.getElementById("shop").onclick = function shoptoggle() {
  shopOpen = !shopOpen;
  if (shopOpen) {
    console.log("test1");
  } else {
    console.log("test");
  }
};
