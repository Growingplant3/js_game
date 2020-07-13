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

// 時間停止
var wait = function() {
  return function() {
    return new Promise(function(resolve/*, reject*/) {
      setTimeout(resolve, 3000)
    });
  };
};
// 時間停止の使い方
// console.log("ザ・ワールド！時よ(0.8秒だけ)止まれ！");
// Promise.resolve()
//   .then(wait())
//   .then(function() {
// ここに目的の処理を書きます。
//     console.log("時が動き出す！");
// });

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

// ターンエンドフラグ
var turn_end = true;

// ゲームスタート
turn += 1;

// クリックしたら?をめくる処理
while (turn_end) {
  turn_end = false;
  var flip_the_card = (function flip_the_card(element) {
    // 既に合致したカードはめくれない
    console.log(element.target);
    var choiced_card = element.target.parentNode;
    for (var i=0; i<matched_ids.length; i++) {
      if (choiced_card.id == matched_ids[i]) {
        console.log("もうそこのマスはめくれません"); // デバッグ
        return;
      };
    };
    // 同一通し番号はめくれない = 同一通し番号でなければめくる = 同じ枠を二度クリックしても無効
    switch (turn) {
      case 3:
        if (opened_cards_list[0] == choiced_card.id || opened_cards_list[1] == choiced_card.id) {
          console.log("3回目のめくりで失敗"); // デバッグ
          return;
        } else {
          console.log("3回目のめくりが成功"); // デバッグ
          placed_images[choiced_card.id].src = color_pallete[choiced_card.id];
          opened_cards_list.push(choiced_card.id); // 通し番号を配列に格納 3回目
          turn += 1;
          console.log(opened_cards_list); // デバッグ
          console.log("カードをめくる関数が終わりました"); // デバッグ
          image_match_check(turn,opened_cards_list) // 引数を持って次の関数に移動
        };
      case 2:
        if (opened_cards_list[0] == choiced_card.id) {
          console.log("2回目のめくりで失敗"); // デバッグ
          return;
        } else {
          console.log("2回目のめくりが成功"); // デバッグ
          placed_images[choiced_card.id].src = color_pallete[choiced_card.id];
          opened_cards_list.push(choiced_card.id); // 通し番号を配列に格納 2回目
          turn += 1;
          console.log(opened_cards_list); // デバッグ
        };
      case 1:
        if (opened_cards_list.length == 0) {
          console.log("1回目のめくりが成功"); // デバッグ
          placed_images[choiced_card.id].src = color_pallete[choiced_card.id];
          opened_cards_list.push(choiced_card.id); // 通し番号を配列に格納 1回目
          turn += 1
          console.log(opened_cards_list); // デバッグ
        };
    };
  });
};
console.log("カードをめくる関数を開始できます"); // デバッグ
for (var i=0; i < td_tags.length; i++) {
  td_tags[i].addEventListener('click', flip_the_card, false); // 全てのtdをクリックした時に発火する
};

// めくったカードの図柄が一致するか判定する処理
var image_match_check = (function image_match_check(turn,opened_cards_list) {
  if (color_pallete[opened_cards_list[0]] == color_pallete[opened_cards_list[1]] &&
    color_pallete[opened_cards_list[1]] == color_pallete[opened_cards_list[2]]) {
    console.log("図柄判定関数を発火しまして、図柄は一致しました"); // デバッグ
    stay_opened(turn,opened_cards_list); // 引数を持って次の関数に移動
  } else {
    console.log("図柄判定関数を発火しましたが、図柄は一致しませんでした"); // デバッグ
    reverse_the_card(turn,opened_cards_list);　// 引数を持って次の関数に移動
  };
});

// 合致したカードはそのままにする処理
var stay_opened = (function stay_opened(turn,opened_cards_list) {
  for (var i=0; i<opened_cards_list.length; i++) {
    matched_ids.push(opened_cards_list[i]);
  };
  console.log("カードはそのままにする関数を発火しました"); // デバッグ
  number_clear(turn,opened_cards_list);
});

// めくったカードを戻す処理
var reverse_the_card = (function reverse_the_card(turn,opened_cards_list) {
  console.log("ザ・ワールド！時よ(0.8秒だけ)止まれ！");
  Promise.resolve()
    .then(wait())
    .then(function() {
    for ( var i=0; i<opened_cards_list.length; i++) {
      placed_images[opened_cards_list[i]].src = question;
    };
    console.log("時は動き出す！");
    number_clear(turn,opened_cards_list);
  });
  console.log("カードを戻す関数発火しました"); // デバッグ
});

// 通し番号を格納する配列を作る初期化する処理
var number_clear = (function number_clear(turn,opened_cards_list) {
  turn = 0;
  console.log("ターン数を初期化しました");
  opened_cards_list = [];
  console.log("（通し番号を格納する）配列を初期化する関数発火しました"); // デバッグ
  turn_end = true;
  console.log("めくる関数に戻ります");
  flip_the_card();
});
