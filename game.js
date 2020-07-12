// カウントダウンタイマー
var timer = document.getElementsByClassName("timer");
var timer_frame = document.getElementsByClassName("timer_frame");
var timer_setting = 60; // 秒で設定
var limit_time = timer_setting * 100; // 制限時間
var today = new Date();
var count_time = limit_time; // 時間経過を表現する変数に中身を入れ替える
var time_goes_by = setInterval(function() { // 10ミリ秒毎に発火する関数
  count_time -= 1; // 制限時間から10ミリ秒毎に1ずつ引かれていく
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

//　升目
var number_to_align = 3; // 何枚揃えたら良いか宣言する
var fit = number_to_align * 2; // 調整
var serial_number = -1; // 通し番号
var game_table = document.getElementById("game_table");
for ( var i = 0; i < fit; i++) {
  var tr_tag = document.createElement("tr");
  for ( var j = 0; j < fit; j++) {
    var td_tag = document.createElement("td");
    serial_number += 1;
    td_tag.setAttribute('id',serial_number); // 通し番号付与
    tr_tag.appendChild(td_tag);
  }
  game_table.appendChild(tr_tag);
}
var td_tags = document.querySelectorAll("td");

// リサイズ値を設定
var resize = 50;
// ?と色のパスを宣言
var question = "question.png";
var red = "red.png";
var vermilion = "vermilion.png";
var orange = "orange.png";
var yellow = "yellow.png";
var light_blue = "light_blue.png";
var green = "green.png"

// 全ての?を格納する配列(question_images)
var question_images = [];
// 全ての?画像をtdに格納、かつ配列(question_images)にも格納
for ( var i = 0; i < fit ** 2; i++) {
  var placed_image = document.createElement("img");
  placed_image.src = question; // ?が初期配置
  placed_image.width = resize; // リサイズ
  placed_image.height = resize; // リサイズ
  td_tags[i].appendChild(placed_image);
  question_images.push(question);
}
var placed_images = document.getElementsByTagName("img");

// 全ての色を配列(color_pallete)に格納
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
for ( var j = 0; j < fit ** 2; j++) {
  var color_image = document.createElement("img");
  color_image.src = color_pallete[j];
  color_image.width = resize; // リサイズ
  color_image.height = resize; // リサイズ
  td_tags[j].appendChild(color_image);
}

// クリックしたら?をめくる処理
function flip_the_card(e) {
  var choiced_card = e.currentTarget;
  // めくる関数のデバッグ choiced_card*2はあとでchoiced_cardへ変更する必要あり
  console.log(choiced_card);
  console.log(choiced_card.id*2);
  console.log(choiced_card.id);
  placed_images[choiced_card.id*2].src = color_pallete[choiced_card.id];
  console.log("めくる関数発火しました"); // デバッグ
};
for(var i=0; i < td_tags.length; i++) {
  td_tags[i].addEventListener('click', flip_the_card, false);
};

// css あとでbootstrap適応します
for ( var i = 0; i < td_tags.length; i++) {
  td_tags[i].style.border = "thick solid black";
}
timer_frame[0].style.border = "thick solid black";
timer_frame[0].style.width = "200px";

// デバッグ
console.log(placed_images.length); // デバッグ中は要素が72(2倍)になっている
console.log(td_tags.length); // 36マスを確認
// console.log(question_images); // ?配列を確認
console.log(question_images.length); // ?が36個を確認
console.log(color_pallete); // 36色を確認