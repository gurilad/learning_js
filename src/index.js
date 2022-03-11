import "./styles.css";

var clickamt = 0;
document.getElementById("clicker").onclick = function clicked() {
  document.getElementById("counter").innerHTML = "you have ";
  clickamt += 1 * multiplier;
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

var multiplier = 1;
document.getElementById("fortune").onclick = function fortne() {
  var cost = multiplier * 20;
  if (clickamt >= cost) {
    document.getElementById("counter").innerHTML = "you have ";
    multiplier *= 2;
    clickamt -= cost;
    document.getElementById("counter").innerHTML += clickamt + " points";
  } else {
    console.log("not enough points");
  }
};
