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

// 全ての?画像をtdに格納
for ( var i = 0; i < fit ** 2; i++) {
  var placed_image = document.createElement("img");
  placed_image.setAttribute('class',"placed_image");
  placed_image.src = question; // ?が初期配置
  placed_image.width = resize; // リサイズ
  placed_image.height = resize; // リサイズ
  td_tags[i].appendChild(placed_image);
}
var placed_images = document.getElementsByClassName("placed_image");

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

// めくったカードの通し番号を格納する配列
var opened_cards_list = [];
// クリックしたら?をめくる処理
function flip_the_card(e) {
  var choiced_card = e.currentTarget;
  // めくる関数のデバッグ
  console.log(choiced_card);
  console.log(choiced_card.id);
  placed_images[choiced_card.id].src = color_pallete[choiced_card.id];
  opened_cards_list.push(choiced_card.id); // 通し番号を配列に格納
  console.log("めくる関数発火しました"); // デバッグ
};
for (var i=0; i < td_tags.length; i++) {
  td_tags[i].addEventListener('click', flip_the_card, false);
};

// めくったカードを戻す処理
function reverse_the_card() {
  for ( var i=0; i<fit; i++) {
    // カードを戻す関数のデバッグ
    console.log(opened_cards_list);
    console.log(opened_cards_list[i]);
    console.log(placed_images);
    console.log(placed_images[1]);
    placed_images[opened_cards_list[i]].src = question;
    console.log("カードを戻す関数発火しました"); // デバッグ
  }
  // var opened_cards_list.length = 0; // 初期化
  console.log(opened_cards_list);
  console.log("初期化しました");
}
// 3回毎に通し番号を格納する配列を初期化する処理
// function number_clear {
//   var opened_cards_list.length = 0;
//   console.log("通し番号を格納する配列を初期化する関数発火しました"); // デバッグ
// }
// 暫定でタイマーフレームをクリックしたら発火する設定
// あとで3回めくって、図柄が揃わなかったら戻す処理として使う
timer_frame[0].addEventListener('click', reverse_the_card, false);
// timer_frame[0].addEventListener('click', number_clear, false);

// css あとでbootstrap適応します
for ( var i = 0; i < td_tags.length; i++) {
  td_tags[i].style.border = "thick solid black";
}
timer_frame[0].style.border = "thick solid black";
timer_frame[0].style.width = "200px";

// デバッグ
console.log("placed_images.lengthは");
console.log(placed_images.length); // 初期配置の?は36個
console.log("color_palleteは"); // 36色を確認
console.log(color_pallete); // 36色を確認