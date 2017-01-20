(function (lib, img, cjs, ss, an) {

var p; // shortcut to reference prototypes
lib.ssMetadata = [];


// symbols:



// stage content:
(lib.lottery_04 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		var nameAry = ["所有", "参与","抽奖","的用户","名称","放在这个","数组里"];
		var changeInterval = 0;
		var chagneSpeed = 100;
		var lastChangeIndex = 0;
		var animNamePop;
		var animWinnerPop;
		var sta_changeName = false;
		var wW = window.innerWidth;
		var wH = window.innerHeight;
		var wDP = window.devicePixelRatio;
		var gScale = 1 / wDP;
		var bitmapScale = 630/1260 * gScale;
		
		var bg = new createjs.Bitmap("Assets/bg.png");
		var sz_bg = {w:1280, h:720};
		var hb_on = new createjs.Bitmap("Assets/hongbao_on.png");
		var sz_hb_on = {w:1260, h:1118};
		var hb_off = new createjs.Bitmap("Assets/hongbao_off.png");
		var sz_hb_off = {w:1260, h:746};
		var winner_bg = new createjs.Bitmap("Assets/winner.png");
		var sz_winner = {w:1436, h:952};
		var logo = new createjs.Bitmap("Assets/logo.png");
		var sz_logo = {w:550, h:396};
		
		var changeHero = new createjs.Text();
		var mainBtn = new createjs.Container();
		var mainBtnNm = new createjs.Shape();
		var mainBtnTxt = new createjs.Text();
		var fsBtn = new createjs.Shape();
		var sz_fsBtn = {w:stage.canvas.width*gScale, h:stage.canvas.height*gScale};
		var winner = new createjs.Container();
		var winnerTxt = new createjs.Text();
		var mainBtnTween;
		var testText = new createjs.Text();
		winner.visible = false;
		
		var fs_changeHero = 82;
		var fs_mainBtnTxt = 60
		var sz_mainBtn = {w:300, h:300};
		
		function changeHeroName()
		{
			changeHero.text = generateRandomName(nameAry);
			//Animation start
			changeHero.alpha = 0;
			changeHero.scaleX = 0.8 + Math.random();
			changeHero.scaleY = 0.8 + Math.random();
			changeHero.rotation = -10 + Math.random() * 20;
		
			//Animation Tween
			animNamePop = createjs.Tween.get(changeHero).to(
			{
				alpha: 1,
				scaleX: 1,
				scaleY: 1,
				rotation: 0
			}, chagneSpeed, createjs.Ease.cubicInOut);
		}
		
		
		////NameChange 停止，显示Winner
		function getWinnerName()
		{
			createjs.Tween.removeTweens(animNamePop);
			
			//THIS GUY IS THE WINNER
			winnerTxt.text = generateRandomName(nameAry, true);
			
			winner.scaleX = bitmapScale;
			winner.scaleY = bitmapScale;
			
			animWinnerPop = createjs.Tween.get(winner).to(
			{
				scaleX: 1,
				scaleY: 1,
				alpha: 1,
				rotation: 0
			}, 500, createjs.Ease.bounceOut);
		}
		
		//generate a random number different from last one
		function generateRandomNum(max, last)
		{
			var randNum = Math.round(Math.random() * max);
			if (randNum == last)
			{
				randNum = generateRandomNum(max, last);
			}
		
			lastChangeIndex = randNum;
			return randNum;
		}
		
		function generateRandomName(ary, winner)
		{
			winner = winner || false;
			var randomNum = generateRandomNum(ary.length - 1, lastChangeIndex);
			var name = ary[randomNum];
			if(winner)
			{
				nameAry.splice(randomNum,1);
			}
			
			return name;
		}
		
		//Main Button Action
		function mainBtnAction(me)
		{
			if (sta_changeName)
			{
				//if name chaning is on going
				mainBtnTxt.text = "开抽";
				sta_changeName = false;
				clearInterval(changeInterval);
				hb_on.visible = false;
				hb_off.visible = true;
				winner.visible = true;
				changeHero.visible = false;
				
				getWinnerName();
			}
			else
			{
				//if nothing is going on
				mainBtnTxt.text = "停";
				sta_changeName = true;
				clearInterval(changeInterval);
				hb_on.visible = true;
				hb_off.visible = false;
				winner.visible = false;
				changeHero.visible = true;
				changeInterval = setInterval(changeHeroName, chagneSpeed)
			}
		}
		
		function buildUI()
		{
			bg.width = wW;
			bg.height = wH;
			
		
		
			fsBtn.graphics.beginFill("#00ffff");
			fsBtn.graphics.drawRect(0, 0, sz_fsBtn.w, sz_fsBtn.h);
			fsBtn.graphics.endFill();
			
			logo.regX = sz_logo.w /2;
			logo.regY = sz_logo.h /2;
			
			hb_on.regX = sz_hb_on.w / 2;
			hb_on.regY = sz_hb_on.h;
			hb_on.visible = false;
			
			hb_off.regX = sz_hb_off.w / 2;
			hb_off.regY = sz_hb_off.h;
			hb_off.visible = true;
			
			var fs1 = fs_changeHero * gScale;
			changeHero.font = fs1 + "px Lantinghei SC";
			changeHero.color = "#756446";
			changeHero.textAlign = "center";
			
			winner_bg.regX = sz_winner.w / 2;
			winner_bg.regY = sz_winner.h / 2;
			winnerTxt.font = fs1 + "px Lantinghei SC";
			winnerTxt.color = "#756446";
			winnerTxt.textAlign = "center";
			winnerTxt.text = "lol";
			winnerTxt.scaleX = 1.5;
			winnerTxt.scaleY = 1.5;
			winner.addChild(winner_bg, winnerTxt);
			winner.addEventListener("click", function()
			{
				winner.visible = false;
			});
			
			mainBtnNm.graphics.beginFill("#0066CC");
			mainBtnNm.graphics.drawRoundRect(0, 0, sz_mainBtn.w, sz_mainBtn.h, 12 * gScale);
			mainBtnNm.graphics.endFill();
			mainBtnNm.name = "normal";
			mainBtnNm.alpha = 1;
		
			mainBtn.regX = sz_mainBtn.w / 2 * gScale;
			mainBtn.regY = sz_mainBtn.h / 2 * gScale;
			mainBtn.alpha = 0;
			mainBtn.hitArea = fsBtn;
		
			var fs2 = fs_mainBtnTxt * gScale;
			mainBtnTxt.text = "开抽";
			mainBtnTxt.font = fs2 + "px Lantinghei SC";
			mainBtnTxt.color = "#fff";
			mainBtnTxt.textAlign = "center";
		
			mainBtn.addChild(mainBtnNm, mainBtnTxt);
			mainBtn.name = "mb";
		
			mainBtn.addEventListener("pressup", mainBtnAction);
		
			stage.addChild(fsBtn, bg, logo, hb_on, hb_off, winner, changeHero, mainBtn);
		
			//test
			//stage.addChild(testText);
		
			resizeUI();
		}
		
		
		function resizeUI()
		{
			bitmapScale = 630/1260 * gScale;
			
			bg.scaleX = wW / sz_bg.w;
			bg.scaleY = wH / sz_bg.h;
		
			fsBtn.scaleX = wW / sz_fsBtn.w * gScale;
			fsBtn.scaleY = wH / sz_fsBtn.h * gScale;
			
			logo.scaleX = bitmapScale;
			logo.scaleY = bitmapScale;
			logo.x = stage.canvas.width / 2 * gScale;
			logo.y = (wH - sz_hb_off.h*bitmapScale) / 2  * gScale;
			
			hb_on.scaleX = bitmapScale;
			hb_on.scaleY = bitmapScale;
			hb_on.x = stage.canvas.width / 2 * gScale;
			hb_on.y = stage.canvas.height * gScale;
			
			hb_off.scaleX = bitmapScale;
			hb_off.scaleY = bitmapScale;
			hb_off.x = stage.canvas.width / 2 * gScale;
			hb_off.y = stage.canvas.height * gScale;
			
			winner_bg.scaleX = bitmapScale;
			winner_bg.scaleY = bitmapScale;
			
			winnerTxt.y = -130 * gScale;
			
			winner.x = stage.canvas.width / 2 * gScale;
			winner.y = stage.canvas.height / 2 * gScale;
			
			var fs1 = fs_changeHero * gScale;
			winnerTxt.font = fs1 + "px Kaiti SC";
			changeHero.font = fs1 + "px Kaiti SC";
			changeHero.x = stage.canvas.width / 2 * gScale;
			changeHero.y = (stage.canvas.height - 480) * gScale;
		
			mainBtnTxt.x = sz_mainBtn.w/2 * gScale;
			mainBtnTxt.y = sz_mainBtn.h/2 * gScale;
		
			mainBtn.x = (stage.canvas.width / 2) * gScale;
			mainBtn.y = (wH - 100) * gScale;
			mainBtn.scaleX = gScale;
			mainBtn.scaleY = gScale;
		
		}
		
		function resize()
		{
			wW = window.innerWidth;
			wH = window.innerHeight;
			var oW = canvas.width;
			var oH = canvas.height;
			wDP = window.devicePixelRatio;
			gScale = 1 / wDP;
		
			testText.text = "win: " + wW + " x " + wH + "\ncan: " + oW + " x " + oH + "\nPixelRatio: " + wDP + "\nhb: "+hb_off.x;
			testText.x = wW / 2 * gScale;
			testText.y = wH / 2 * gScale;
		
			document.getElementById("canvas").width = wW;
			document.getElementById("canvas").height = wH;
			canvas.style.width = wW + "px";
			canvas.style.height = wH + "px";
			canvas.width = wW;
			canvas.height = wH;
		
			resizeUI();
		}
		
		function init()
		{
			stage.enableMouseOver(10)
		
			window.addEventListener('resize', resize)
			buildUI()
		
			resize();
		}
		
		init();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;
// library properties:
lib.properties = {
	width: 1280,
	height: 720,
	fps: 60,
	color: "#CCCCCC",
	opacity: 1.00,
	manifest: [],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;