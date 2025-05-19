
	//ページの遷移の際に作動するJS
	document.body.classList.remove('is-pageFade');
	document.body.classList.remove("is-pageRemove");

	// ページを移動するトリガーを取得（IE11はNodeListでforEachが使えないので、[].slice.call()により配列に変換）
	var movePageTriggers = [].slice.call(document.querySelectorAll('a:not([href^="#"]):not([target]):not(.is-notMovePage)'));
	 
	movePageTriggers.forEach(function (movePageTrigger) {
	    // トリガーをクリックした時に実行
	    movePageTrigger.addEventListener('click', function (e) {
		    e.preventDefault(); // ナビゲートをキャンセル
		    url = this.getAttribute('href'); // 遷移先のURLを取得
		    if (url !== '') {
		      document.body.classList.add('is-pageRemove');  // bodyに class="is-pageRemove"を挿入
		      setTimeout(function(){
		        window.location = url;  // 0.8秒後に取得したURLに遷移
		      }, 800);
		    }
		    return false;
	    });
	});

	/* iOSブラウザバック対応する為にリロードさせる*/
	window.onpageshow = function(event) {
		if (event.persisted) {
			 window.location.reload();
		}
	};





	//ウインドウサイズの横幅によって条件分岐
	var timer = '';
	window.onresize = function () {
		  if (timer) {
		    	clearTimeout(timer);
		  }
		  timer = setTimeout(function(){
		    	var windowSize = window.innerWidth;
			var wrapperIdDiv = document.getElementById("wrapper");
		    	if (windowSize < 768) {
				// スマホ時の処理
		      		wrapperIdDiv.classList.remove("is-wideScreen");
		      		wrapperIdDiv.classList.add("is-smallScreen");
		    	} else {
				// スマホ以外の処理
		      		wrapperIdDiv.classList.add("is-wideScreen");
		      		wrapperIdDiv.classList.remove("is-smallScreen");
		    	}
		  }, 200);
	};



	//最上位置・スクロールで表示・変化させるボタンの処理

	//上部に移動するボタン
	const btnRise_btn = document.querySelector('#btnRise');
	//スマホ用画面固定ボタン
	const btnPageBottom_btn = document.querySelector('#btnPageBottom');
	//スティッキーヘッダー
	var sticky_head = document.querySelector('#pageTopFix');
	var sticky = false;

	//クリックイベントを追加
	btnRise_btn.addEventListener( 'click' , scroll_to_top );
	function scroll_to_top(){
		window.scroll({top: 0, behavior: 'smooth'});
	};

	//スクロール時のイベントを追加
	window.addEventListener( 'scroll' , scroll_event );

	function scroll_event(){
		if(window.pageYOffset > 100){
			btnRise_btn.style.opacity = '1';
			btnPageBottom_btn.style.opacity = '1';
		}else if(window.pageYOffset < 100){
			btnRise_btn.style.opacity = '0';
			btnPageBottom_btn.style.opacity = '0';
		}
	};



// jsへのリンクは、main.jsからの相対パスで記述。
// ファイルを呼び出す時は、拡張子[.js]を削除。

require([
  "smoothScroll",			//スムーズスクロール用JS
  "micromodal.min",			//モーダルウィンドウJS
  "luminous.min",			//画像用モーダルウィンドウJS
],function(){ //[ , ]で区切ってfunction文を追記

	//micromodal.min モーダルウィンドウ用
	MicroModal.init({
	  disableScroll: true,
	  awaitOpenAnimation: true,
	  awaitCloseAnimation: true
	});

	//スマートフォン用ボタン
	var globalNaviSmallIcon = document.querySelector('#globalNaviSmallIcon');
	globalNaviSmallIcon.addEventListener( 'click' , btn_is_open );
	
	function btn_is_open(){
		if( globalNaviSmallIcon.classList.contains("is-open") == true ){
			globalNaviSmallIcon.classList.remove("is-open");
			MicroModal.close('modal-globalNaviSmall', {
				awaitCloseAnimation: true
     			});
		} else {
			globalNaviSmallIcon.classList.add("is-open");
			MicroModal.show('modal-globalNaviSmall', {
			       disableScroll: true, // ページスクロールを無効に
			       awaitOpenAnimation: true, // 開閉時のアニメーションを可能に
			       awaitCloseAnimation: true
			});
	        }
	};

	//スマートフォン用ボタン ページ内リンクをクリックした時にモーダルウィンドウを外す
	var globalNaviSmallMenuMain = document.querySelector('.globalNaviSmall__menu__main');
	var globalNaviSmallIconPagelinks = [].slice.call(globalNaviSmallMenuMain.querySelectorAll('a[href^="#"]'));

	globalNaviSmallIconPagelinks.forEach(function (globalNaviSmallIconPagelink) {

		globalNaviSmallIconPagelink.addEventListener( 'click' , pagelink_btn_is_open );
		function pagelink_btn_is_open(){
			if( globalNaviSmallIcon.classList.contains("is-open") == true ){
				globalNaviSmallIcon.classList.remove("is-open");
				MicroModal.close('modal-globalNaviSmall', {
					awaitCloseAnimation: true
	     			});
			} else {
				globalNaviSmallIcon.classList.add("is-open");
				MicroModal.show('modal-globalNaviSmall', {
				       awaitOpenAnimation: true, // 開閉時のアニメーションを可能に
				       awaitCloseAnimation: true
				});
		        }
		};
	});

	//luminous.min用
	//単数用　.luminous
	var luminousOptions = {
		caption: function (trigger) {
	    		return trigger.getAttribute('title');
	  	},
	}
	var luminousTrigger = document.querySelectorAll('.luminous');
	for (var i = 0; i < luminousTrigger.length; i++) {
	  var elem = luminousTrigger[i];
	  new Luminous(elem, luminousOptions);
	}
	//複数用　.luminousGallery
	var luminousGalleryTrigger = document.querySelectorAll('.luminousGallery');
	var luminousGalleryOptions = {
		caption: function (trigger) {
	    		return trigger.getAttribute('title');
	  	},
	}
	if( luminousGalleryTrigger !== null ) {
		new LuminousGallery(luminousGalleryTrigger,{},luminousGalleryOptions);
	}

	
});//end function文 & require


//画面スクロール・遷移でのアニメ用　ScrollMagic用
require([
  "ScrollMagic",			//特定の位置で発火させるJS
  "debug.addIndicators.min",		//デバッグ用JS
  "gsap.min",				//アニメーションJS
],function(){ //[ , ]で区切ってfunction文を追記

	var ScrollMagic = require('ScrollMagic');

	class ScrollFade {
		constructor() {
			this.ANIMATION_CLASS = 'active';

			let $section = document.querySelectorAll('.--typeScrollFadeIn:not(.active)');
			if ($section.length === null) {
				return;
			}
		    	let controller = new ScrollMagic.Controller();
		    	for (let i = 0; i < $section.length; i++) {
		      		let scene = new ScrollMagic.Scene({
		        		triggerElement: $section[i],		//どの位置で発火させるか
		        		triggerHook: 'onEnter',			//トリガーの位置 /onEnter/onLeave デフォルトはonCenter
		        		reverse: false,
		        		offset: 200,				//スタート位置はトリガーから200px
		      		})
		        	//.addIndicators()　//デバッグ用
		        	.addTo(controller);
			      	scene.on('enter', () => {
			        	$section[i].classList.toggle(this.ANIMATION_CLASS);
			      	});
		    	}
		}
	}

	new ScrollFade();

	class ScrollLine {
		constructor() {
			this.ANIMATION_CLASS = 'active';

			let $section = document.querySelectorAll('.--typeScrollLine:not(.active)');
			if ($section.length === null) {
				return;
			}
		    	let controller = new ScrollMagic.Controller();
		    	for (let i = 0; i < $section.length; i++) {
		      		let scene = new ScrollMagic.Scene({
		        		triggerElement: $section[i],		//どの位置で発火させるか
		        		triggerHook: 'onEnter',			//トリガーの位置 /onEnter/onLeave デフォルトはonCenter
		        		reverse: false,
		        		offset: 200,				//スタート位置はトリガーから200px
		      		})
		        	//.addIndicators()　//デバッグ用
		        	.addTo(controller);
			      	scene.on('enter', () => {
			        	$section[i].classList.toggle(this.ANIMATION_CLASS);
			      	});
		    	}
		}
	}

	new ScrollLine();

	class ScrollShrink {
		constructor() {
			this.ANIMATION_CLASS = 'active';

			let $section = document.querySelectorAll('.--typeScrollShrink:not(.active)');
			if ($section.length === null) {
				return;
			}
		    	let controller = new ScrollMagic.Controller();
		    	for (let i = 0; i < $section.length; i++) {
		      		let scene = new ScrollMagic.Scene({
		        		triggerElement: $section[i],		//どの位置で発火させるか
		        		triggerHook: 'onEnter',			//トリガーの位置 /onEnter/onLeave デフォルトはonCenter
		        		reverse: false,
		        		offset: 200,				//スタート位置はトリガーから200px
		      		})
		        	//.addIndicators()　//デバッグ用
		        	.addTo(controller);
			      	scene.on('enter', () => {
			        	$section[i].classList.toggle(this.ANIMATION_CLASS);
			      	});
		    	}
		}
	}

	new ScrollShrink();

	
});//end function文 & require


//スライダー　Swiper用
require([
  "swiper-bundle.min",			//スライダーJS
],function(){ //[ , ]で区切ってfunction文を追記
	var Swiper = require('swiper-bundle.min');



	//動画用　スライダー
  const mySwiperMovie = new Swiper('.--typeMovieSlider .swiper', {
  	slidesPerView: 'auto', // コンテナ内に表示させるスライド数（CSSでサイズ指定する場合は 'auto'）
	  centeredSlides: true, // アクティブなスライドを中央に配置する
    grabCursor: true,
    pagination: {
      el: '.--typeMovieSlider .card01 .swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.--typeMovieSlider .card01 .swiper-button-next',
      prevEl: '.--typeMovieSlider .card01 .swiper-button-prev',
    },
    breakpoints: {
      600: {
      },
      1025: {
        spaceBetween: 120,
      }
    },
  });

	//インターン生の声用　スライダー
	const mySwiperVoiceBox = new Swiper('.homeVoiceBox.--typeExtendsBeyondSlider .swiper', {
	  slidesPerView: 'auto',
	  spaceBetween: 16,
	  grabCursor: true,
	  loop: true, // ループの指定
	  pagination: {
	    el: '.homeVoiceBox.--typeExtendsBeyondSlider .card02 .swiper-pagination',
	    clickable: true,
	  },
	  navigation: {
	    nextEl: '.homeVoiceBox.--typeExtendsBeyondSlider .card02 .swiper-button-next',
	    prevEl: '.homeVoiceBox.--typeExtendsBeyondSlider .card02 .swiper-button-prev',
	  },
	  breakpoints: {
	    1025: {
	      spaceBetween: 32,
	    }
	  },
	});

	//採用ブログ用　スライダー
	const mySwiperBlogBox = new Swiper('.homeBlogBox.--typeExtendsBeyondSlider .swiper', {
	  slidesPerView: 'auto',
	  spaceBetween: 16,
	  grabCursor: true,
	  loop: true, // ループの指定
	  pagination: {
	    el: '.homeBlogBox.--typeExtendsBeyondSlider .card02 .swiper-pagination',
	    clickable: true,
	  },
	  navigation: {
	    nextEl: '.homeBlogBox.--typeExtendsBeyondSlider .card02 .swiper-button-next',
	    prevEl: '.homeBlogBox.--typeExtendsBeyondSlider .card02 .swiper-button-prev',
	  },
	  breakpoints: {
	    1025: {
	      spaceBetween: 32,
	    }
	  },
	});

	//働く人の想いに触れる用　スライダー
	  let mySwiperContentsSliderSp = null;
	  const mediaQuery = window.matchMedia('(max-width: 768px)');

	  const checkBreakpoint = (e) => {
	    if (e.matches) {
	      initSwiper();
	    } else if (mySwiperContentsSliderSp) {
	      mySwiperContentsSliderSp.destroy(false, true);
	    }
	  }

	  const initSwiper = () => {
	    mySwiperContentsSliderSp = new Swiper('.swiper.--typeContentsSliderSp', {
	      slidesPerView: 1,
	      spaceBetween: 16,
	      //loop: true,
	      loopAdditionalSlides: 1,
	      speed: 1000,
	      grabCursor: true,
	      pagination: {
	        el: '.--typeContentsSliderSp .swiper-pagination', // ページネーション要素のクラス
	        clickable: true, //クリックを有効化する
	      },
	      navigation: {
	        nextEl: '.--typeContentsSliderSp .swiper-button-next--typeContentsSliderSp',
	        prevEl: '.--typeContentsSliderSp .swiper-button-prev--typeContentsSliderSp',
	      },
	      breakpoints: {
	        600: {
	          slidesPerView: 2,
	        }
	      },
	    });
	  };

	  mediaQuery.addListener(checkBreakpoint);
	  checkBreakpoint(mediaQuery);
	
});//end function文 & require







