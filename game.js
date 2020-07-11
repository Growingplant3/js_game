//　升目
var number_to_align = 3; // 何枚揃えたら良いか宣言する
var fit = number_to_align * 2; // 調整
var area_width = fit; // 列数を宣言する
var area_height = fit; // 行数を宣言する
//var x_position; // x座標を宣言する 0から開始
//var y_position; // y座標を宣言する 0から開始
// var cell = []; // 全てのtdを格納する配列
var game_area = document.getElementById("game_area");
for ( var i = 0; i < area_height; i++) {
  var tr_tag = document.createElement("tr");
  for ( var j = 0; j < area_width; j++) {
    var td_tag = document.createElement("td");
    // td_tag.x_position = i;
    // td_tag.y_position = j;
    // cell.push(td_tag);
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
  img.width = 50; // リサイズ
  img.height = 50; // リサイズ
  td_tags[i].appendChild(img);
}
var all_questions = document.getElementsByTagName("img");

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
  img.width = 50; // リサイズ
  img.height = 50; // リサイズ
  td_tags[j].appendChild(img);
}

// カウントダウンタイマー
var timer = document.getElementsByClassName("timer");
var timer_frame = document.getElementsByClassName("timer_frame");
var limit_time = 60 * 100; // 制限時間
var today = new Date();
var count_time = limit_time; // 時間経過を表現する変数に中身を入れ替える
var time_goes_by = setInterval(function() { // 10ミリ秒毎に発火する関数
  count_time -= 1; // 制限時間から1ミリ秒毎に1ずつ引かれていく
  var second = Math.floor(count_time / 100);
  if (second < 10) {
    second = "0" + second;
  }
  var millisecond = count_time % 100;
  if (millisecond < 10) {
    millisecond = "0" + millisecond;
  }
  timer[0].innerHTML = (second + ":" + millisecond);
  if(count_time <= 0) { // 制限時間に到達、もしくは制限時間を過ぎたら→
    clearInterval(time_goes_by); // 時間経過を表現する関数を止める
    console.log("time up!"); // デバッグ
  }
},10);

// クリックしたら?をめくる処理
function flip_the_card(e) {
  e.currentTarget.style.display = "none";
};


// css あとでbootstrap適応します
for ( var i = 0; i < td_tags.length; i++) {
  td_tags[i].style.border = "thick solid black";
}
timer_frame[0].style.border = "thick solid black";
timer_frame[0].style.width = "200px";

// デバッグ
// console.log(cell);
console.log(all_questions.length); // デバッグ中は要素が72(2倍)になっている
console.log(td_tags.length); // 36マス
console.log("all_questions[4]は");
console.log(all_questions[4]);
console.log("all_questions[5]は");
console.log(all_questions[5]);
all_questions[4].src = color_pallete[2];
console.log("color_pallete[2]は");
console.log(color_pallete[2]);
console.log(color_pallete);
console.log(timer_frame);