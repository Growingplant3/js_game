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

// ターン設定
var turn = 0;
  // 初期化
  // 0:ゲームスタート　→ 1へ
  // 1:カードをめくる（めくるカードの判定をしながら）　→　2へ
  // 2:カードをめくる（めくるカードの判定をしながら）　→　3へ
  // 3:カードをめくる（めくるカードの判定をしながら）　→　4へ
  // 4:図柄一致判定　→　合致なら5へ、不一致なら6へ
  // 5:合致後の処理　→　7へ
  // 6:カードを裏返す　→　7へ
  // 7:配列初期化　→　1へ
  // 条件を満たしたら8へ
  // 8:ゲームクリアorゲームオーバー　→　0へ

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

// css あとでbootstrap適応します
for ( var i = 0; i < td_tags.length; i++) {
  td_tags[i].style.border = "thick solid black";
};
timer_frame[0].style.border = "thick solid black";
timer_frame[0].style.width = "200px";

// めくったカードの通し番号を格納する配列
var opened_cards_list = [];

// 揃った図柄のidを格納する配列 = もうめくれないカードのidリスト
var matched_ids = [];

// ゲームスタート
var judge = true;
turn += 1;
console.log(turn);

// クリックしたら?をめくる処理
// while (judge) { // 勝敗フラグが立つまで続ける必要あり
function flip_the_card(e) {
  console.log("あああ");
  while (turn < 4) {
    // 既に合致したカードはめくれない
    var choiced_card = e.currentTarget;
    for (var j=0; j<matched_ids.length; j++) {
      if (choiced_card.id == matched_ids[j]) {
        console.log("いいい");
        return;
      };
    };
    // 同一通し番号はめくれない = 同じ枠を二度クリックしても無効
    // switch (turn) {
    //   case 3:
    //     if (opened_cards_list[2] == opened_cards_list[3]) {
    //       console.log("うわぁ");
    //       return;
    //     };
    //   case 2:
    //     if (opened_cards_list[1] == opened_cards_list[2]) {
    //       console.log("ううう");
    //       return;
    //     };
    // };
    // 同一通し番号でなければめくる
    // switch + caseでもうちょっと短く書けそう
    if (opened_cards_list.length == 2 && opened_cards_list[0] != opened_cards_list[2] && opened_cards_list[1] != opened_cards_list[2] ) {
      console.log("えええ");
      placed_images[choiced_card.id].src = color_pallete[choiced_card.id];
      opened_cards_list.push(choiced_card.id); // 通し番号を配列に格納 3回目
      turn += 1;
      console.log(opened_cards_list); // デバッグ
      console.log("めくる関数発火しました"); // デバッグ
    };
    if (opened_cards_list.length == 1 && opened_cards_list[0] != opened_cards_list[1]) {
      console.log("おおお");
      placed_images[choiced_card.id].src = color_pallete[choiced_card.id];
      opened_cards_list.push(choiced_card.id); // 通し番号を配列に格納 2回目
      turn +=1;
      console.log(opened_cards_list); // デバッグ
      console.log("めくる関数発火しました"); // デバッグ
    };
    if (opened_cards_list.length == 0) {
      console.log("かかか");
      placed_images[choiced_card.id].src = color_pallete[choiced_card.id];
      opened_cards_list.push(choiced_card.id); // 通し番号を配列に格納 1回目
      turn += 1
      console.log(opened_cards_list); // デバッグ
      console.log("めくる関数発火しました"); // デバッグ
    };
  };
};
console.log("111");
for (var i=0; i < td_tags.length; i++) {
  td_tags[i].addEventListener('click', flip_the_card, false);
};
if (turn == 4) {
  console.log("くくく");
  judge = false;
};

while (turn == 10) {
  // めくったカードの図柄が一致するか判定する処理
  while (turn == 4) {
    function image_match_check() {
      if (opened_cards_list[0] == opened_cards_list[1] && opened_cards_list[1] == opened_cards_list[2]) {
        turn += 2;
      };
      console.log("図柄一致を判定する関数を発火しました"); // デバッグ
    };
    break;
  };

  // 合致したカードはそのままにする処理
  while (matching && turn == 4) {
    function stay_opened() {
      for (var i=0; i<opened_cards_list.length; i++) {
        matched_ids.push(opened_cards_list[i]);
      };
    };
    turn += 1;
    console.log("カードはそのままにする関数を発火しました"); // デバッグ
    break;
  };

  // めくったカードを戻す処理
  while (matching == false && turn == 4) {
    function reverse_the_card() {
      for ( var i=0; i<opened_cards_list.length; i++) {
        placed_images[opened_cards_list[i]].src = question;
      };
    };
    turn += 1;
    console.log("カードを戻す関数発火しました"); // デバッグ
    break;
  };

  // 通し番号を格納する配列を作る初期化する処理
  while (turn == 5) {
    function number_clear() {
      opened_cards_list = [];
      console.log("（通し番号を格納する）配列を初期化する関数発火しました"); // デバッグ
    };
    turn = 1;
    break;
  };
};
// // 暫定でタイマーフレームをクリックしたら発火する設定
// // あとで3回めくって、図柄が揃わなかったら戻す処理として使う
// timer_frame[0].addEventListener('click', image_match_check, false);
// timer_frame[0].addEventListener('click', reverse_the_card, false);
// timer_frame[0].addEventListener('click', number_clear, false);

// デバッグ
// console.log("placed_images.lengthは");
// console.log(placed_images.length); // 初期配置の?は36個
// console.log("color_palleteは");
// console.log(color_pallete); // 36色を確認
