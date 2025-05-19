

//ページ内リンクは全てアニメーション移動させる
var Ease = {
  easeInOut: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1; }
}
 
// アニメーションの Duration の設定
var duration = 1000;
 
  // スムーススクロールのトリガーを取得（IE11はNodeListでforEachが使えないので、[].slice.call()により配列に変換）
  var smoothScrollTriggers = [].slice.call(document.querySelectorAll('a[href^="#"]'));
 
  smoothScrollTriggers.forEach(function (smoothScrollTrigger) {
 
    // トリガーをクリックした時に実行
    smoothScrollTrigger.addEventListener('click', function (e) {
 
      // href属性の値を取得
      var href = smoothScrollTrigger.getAttribute('href');
 
      // 現在のスクロール位置を取得（クロスブラウザに対応）
      var currentPostion = document.documentElement.scrollTop || document.body.scrollTop;
 
      // スクロール先の要素を取得
      var targetElement = document.getElementById(href.replace('#', ''));
 
      // スクロール先の要素が存在する場合はスムーススクロールを実行
      if (targetElement) {
 
        // デフォルトのイベントアクションをキャンセル
        e.preventDefault();
        e.stopPropagation();
 
        // スクロール先の要素の位置を取得
        var targetPosition = window.pageYOffset + targetElement.getBoundingClientRect().top - 115; // headerと余白の分だけずらす
 
        // スタート時点の時間を取得
        var startTime = performance.now();
 
        // アニメーションのループを定義
        var loop = function (nowTime) {
 
          // スタートからの経過時間を取得
          var time = nowTime - startTime;
 
          // duration を1とした場合の経過時間を計算
          var normalizedTime = time / duration;
 
          // duration に経過時間が達していない場合はアニメーションを実行
          if (normalizedTime < 1) {
 
            // 経過時間とイージングに応じてスクロール位置を変更
            window.scrollTo(0, currentPostion + ((targetPosition - currentPostion) * Ease.easeInOut(normalizedTime)));
 
            // アニメーションを継続
            requestAnimationFrame(loop);
 
          // duration に経過時間が達したら、アニメーションを終了
          } else {
            window.scrollTo(0, targetPosition);
          }
        }
        // アニメーションをスタート
        requestAnimationFrame(loop);
      }
    });
  });


