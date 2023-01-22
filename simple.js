var sound = "grunt";
var bear = { sound: "roar" };

function roar() {
  console.log(roar.bind(bear));
}
