//　升目
var fit = 3; // 何枚揃えたら良いか宣言する
var area_width = fit; // 列数を宣言する
var area_height = fit * 2; // 行数を宣言する
var x_position; // x座標を宣言する 0から開始
var y_posttion; // y座標を宣言する 0から開始
var cell = []; // 配列に要素を格納する
var game_area = document.getElementById("game_area");
for ( var i = 0; i < area_height; i++) {
  cell[i] = [];
  var tr_tag = document.createElement("tr");
  for ( var j = 0; j < area_width; j++) {
    var td_tag = document.createElement("td");
    td_tag.x_position = i;
    td_tag.y_posttion = j;
    cell[i][j] = td_tag;
    tr_tag.appendChild(td_tag);
  }
  game_area.appendChild(tr_tag);
}
var td_tags = document.querySelectorAll("td");

// ?と色パスを宣言
var question = "question.png";
var red = "red.png";
var vermilion = "vermilion.png";
var orange = "orange.png";
var yellow = "yellow.png";
var light_blue = "light_blue.png";
var green = "green.png"

// 全ての?をtdに格納
for ( var i = 0; i < area_width * area_height; i++) {
  var img = document.createElement("img");
  img.src = question; // ?パス
  img.width = 100; // リサイズ
  img.height = 100; // リサイズ
  td_tags[i].appendChild(img);
}

// 全ての色を配列に格納
var color_pallete = [];
for ( var i = 0; i < fit; i++) {
  color_pallete.push(red,vermilion,orange,yellow,light_blue,green);
}
// 全ての色をランダム化して配置
const shuffle = ([...color_pallete]) => {
  for ( var i = color_pallete.length - 1; i >= 0; i--) {
    var j = Math.floor(Math.random() * ( i + 1 ));
    [color_pallete[i],color_pallete[j]] = [color_pallete[j],color_pallete[i]];
  }
  return color_pallete;
}
color_pallete = shuffle(color_pallete);
for ( var j = 0; j < area_width * area_height; j++) {
  var img = document.createElement("img");
  img.src = color_pallete[j];
  img.width = 100; // リサイズ
  img.height = 100; // リサイズ
  td_tags[j].appendChild(img);
}

// カウントダウンタイマー
var timer = document.getElementsByClassName("timer");
var timer_frame = document.getElementsByClassName("timer_frame");
var limit_time = 60 * 100; // 制限時間
var today = new Date();
var dead_line = new Date(today.getMilliseconds() + limit_time); // 現在時間に制限時間を加える
var count_time = limit_time; // 時間経過を表現する変数に中身を入れ替える
var time_goes_by = setInterval(function() { // 1秒毎に発火する関数
  count_time -= 1; // 制限時間から1ミリ秒毎に1ずつ引かれていく
  var elder = Math.floor(count_time / 100);
  if (elder < 10) {
    elder = "0" + elder;
  }
  var young = count_time % 100;
  if (young < 10) {
    young = "0" + young;
  }
  timer[0].innerHTML = (elder + ":" + young);
  today = new Date(); // 再計算
  if(count_time <= 0) { // 制限時間に到達〜過ぎたら
    clearInterval(time_goes_by); // 時間経過を表現する関数を止める
    console.log("time up!");
  }
},10);

// css あとでbootstrap適応します
for ( var i = 0; i < td_tags.length; i++) {
  td_tags[i].style.border = "thick solid black";
}
timer_frame[0].style.border = "thick solid black";
timer_frame[0].style.width = "200px";

// デバック
console.log(game_area);
console.log(cell);
console.log(td_tags);
console.log(color_pallete);
// console.log(today);
// console.log(dead_line);