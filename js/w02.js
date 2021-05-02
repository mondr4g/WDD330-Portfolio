function min(a, b) {
    if (a < b) return a;
    else return b;
  }
  
var m = min(0, 10);
document.getElementById('ex1').innerHTML += m;