
/*Defined a class*/
var Class = {
  create: function() {
    return function() {
      this.initialize.apply(this, arguments);
    };
  }
};
var temp;
var hiddenPopupObject = new Object;
var hiddenPopupObject2 = null;    //david 2011.06.09  add
// メッセージ画面のボタン数
var buttonNum;
// 操作元ボタン
var buttonObj = null;
//プロセスバーの表示フラグ = false
var ShowProcessBar = false;
//プロセスバーの当前個数
var ProBarNum = 1;
//プロセスバーの総数
var PROBAR_NUM = 4;
//プロセスバーの表示タイマー
var ShowProBarTimer = null;
//プロセスバーの表示タイマークリアフラグ
var NeedClearTimer = false;

//プロセスバーの表示関数
function ShowProBar()
{
	//イメージのURLをリロードする
	document.getElementById("processbar").src = "../images/process_bar"+ ProBarNum +".png";
	//プロセスバーの更新
	if( ProBarNum >= PROBAR_NUM ) {
		ProBarNum = 1;
	} else {
		ProBarNum++;
	}
}

var actionPop = Class.create();
 actionPop.prototype = {
	initialize: function(txt,num,vau1,vau2){
		if(vau2=="nstc"){
			temp = 3;
		}else{
			temp = num;
		}
		// ボタン数の保持
		buttonNum = num;
		this.FN = new FocusNavigator();
		// #17162 表示モードと表示ボタンを保存する
		this.value1 = vau1;
		this.model = num;
		var mFlag=mainMenucreate();
		if(mFlag==0)
		{
			document.getElementById("DVR-99-02-01css").href="../DVR-99/DVR-99-02-01-VGA.css";
		}
		else if(mFlag==3)
		{
			document.getElementById("DVR-99-02-01css").href="../DVR-99/DVR-99-02-01-VGA-BIG.css";
		}
		else if(mFlag==2)//modified by luo 20110720
		{
			document.getElementById("DVR-99-02-01css").href="../DVR-99/DVR-99-02-01-BIG.css";
		}
		else  //added large page css by luo 20110720
		{
			document.getElementById("DVR-99-02-01css").href="../DVR-99/DVR-99-02-01.css";
		}
	        this.observers = [];
			var str= "";
			str=str+"  <div id='DVR99-02-01_main' style='display:none;' onkeydown='commonPopkeyEvent(event)'>";//added onkeydown event by luo 20110605
			str=str+"   <div id='DVR99-02-01_border' class='wordBackColor'>";
			str=str+"            <div id='DVR99-02-01_text' class='font_Rg'>";
			str=str+"               <br/>"+txt+"";//modified by luo 20110608 added "<br/><br/>"
			//プロセスバーの表示
			if( ShowProcessBar == true )
			{
				str=str+"           <br\/><br\/><img id='processbar' src='../images/process_bar1.png'\/>";
			}
			str=str+"            <\/div>";
			             if(num==2){     
			//str=str+"            <div class='DVR99-02-01-button1'>";
			str=str+"            <div id='DVR99-02-01_b1'>";
			str=str+"                  <input type='button' class='middle-button' id='DVR99-02-01_button1' onmousedown='setfocus_click(this)' value='"+vau1+"' \/>";
			str=str+"            <\/div>";
			str=str+"            <div id='DVR99-02-01_b2'>";
			str=str+"                  <input type='button' class='middle-button' id='DVR99-02-01_button2' onmousedown='setfocus_click(this)' value='"+vau2+"' \/>";
			str=str+"            <\/div>";
			//str=str+"            <\/div>";
			
			if(tabIdSequence && !tabIdSequenceBackupForPop){
				tabIdSequenceBackupForPop = tabIdSequence;
				tabIdSequence = new Array  (
							 'DVR99-02-01_button1',	
							 'DVR99-02-01_button2'
							 );						
			}
	
//==============================================================
						 }else if(num==1){
							 
			str=str+"            <div class='DVR99-02-01-button1' id='DVR99-02-01-button1'>";//djwan
			str=str+"                  <input type='button' class='middle-button' id='DVR9901_button1' onmousedown='setfocus_click(this)' value='"+vau1+"' \/>";
			str=str+"            <\/div>";
						 }
						 else if(num==0){
							 
			str=str+"            <div class='DVR99-02-01-table' id='DVR99-02-01-table'>";//djwan
			str=str+"                 <table class='DVR99table'>";
			str=str+"                 <tr>";
			// #15010 仕様上にプログレスバー付きで「処理中です。しばらくお待ちください。」のポップアップが不要になるので、
			// このプログレスバーを普通の「しばらくお待ちください。」ポップアップに変更する
			str=str+"                     <td id='td_1' class='DVR99table_td' style='background-color:#333'></td>";
			str=str+"                     <td id='td_2' class='DVR99table_td' style='background-color:#333'></td>";
			str=str+"                     <td id='td_3' class='DVR99table_td' style='background-color:#333'></td>";
			str=str+"                     <td id='td_4' class='DVR99table_td' style='background-color:#333'></td>";
			str=str+"                     <td id='td_5' class='DVR99table_td' style='background-color:#333'></td>";
			str=str+"                     <td id='td_6' class='DVR99table_td' style='background-color:#333'></td>";
			str=str+"                     <td id='td_7' class='DVR99table_td' style='background-color:#333'></td>";
			str=str+"                     <td id='td_8' class='DVR99table_td' style='background-color:#333'></td>";
			str=str+"                     <td id='td_9' class='DVR99table_td' style='background-color:#333'></td>";
			str=str+"                     <td id='td_10' class='DVR99table_td' style='background-color:#333'></td>";
			str=str+"                     <td id='td_11' class='DVR99table_td' style='background-color:#333'></td>";
			str=str+"                     <td id='td_12' class='DVR99table_td' style='background-color:#333'></td>";
			str=str+"                     <td id='td_13' class='DVR99table_td' style='background-color:#333'></td>";
			str=str+"                     <td id='td_14' class='DVR99table_td' style='background-color:#333'></td>";
			str=str+"                     <td id='td_15' class='DVR99table_td' style='background-color:#333'></td>";
			str=str+"                 </tr>";
			str=str+"                 </table>";
			str=str+"            <\/div>";
						 }
						 
			str=str+"   <\/div>";
			str=str+" <\/div>";
			var popUp = document.getElementById("DVR_popUp");
			if(popUp==null){
				popUp = document.createElement("div") ;
				popUp.id = "DVR_popUp";
			    document.body.appendChild(popUp) ;
				
			}
			popUp.innerHTML=str;//show the popUp in DVR_popUp Div
			
     		this.transPop = new actionPopTransparent();
			this.dosomething(num);
			
			//1キーpopupかつボタンが「中断」の場合はリモコン戻るでpopupを閉じれないようにする
			if((num == 1) && (vau1 == "中断"))
			{
				oneKeypop_wo_return = true;
			}
			else
			{
				oneKeypop_wo_return = false;
			}
		
		},
		dosomething :function(num)
		{   
		   var tem=this;
		   var mFlag=mainMenucreate();
		   if(num==2){
				var btn2=Spry.$("DVR99-02-01_button2");
				btn2.onclick= function(){
					// メッセージ非表示タイミングで、退避処理を削除する
					if(buttonObj)
					{
						buttonObj.onfocus = null;
						buttonObj = null;
					}
					tem.hide();
					tem.notifyObservers("cancel");
					
				};
				
				var btn1=Spry.$("DVR99-02-01_button1");
				btn1.onclick=function(){ 	
					// メッセージ非表示タイミングで、退避処理を削除する
					if(buttonObj)
					{
						buttonObj.onfocus = null;
						buttonObj = null;
					}
					tem.hide();
					tem.notifyObservers("ok");
						
				};
		   }
		   if(num==1){
				var btn1=Spry.$("DVR9901_button1");
				btn1.onclick=function(){
					// メッセージ非表示タイミングで、退避処理を削除する
					if(buttonObj)
					{
						buttonObj.onfocus = null;
						buttonObj = null;
					}
					tem.hide();
					tem.notifyObservers("done");
				};
		   }
		   if(num==0){
			   /*reset the no button popUp style*/
				if(mFlag==0){
				  	document.getElementById("DVR99-02-01_text").style.width="290px";
				}
				else if(mFlag==3){
				  	document.getElementById("DVR99-02-01_text").style.width="380px";
				}
				else{
				  	document.getElementById("DVR99-02-01_text").style.width="330px";
				}
			      document.getElementById("DVR99-02-01_text").style.paddingLeft="1px";
				  document.getElementById("DVR99-02-01_text").style.paddingTop="2px";
				  document.getElementById("DVR99-02-01_text").style.top="10px";
				  document.getElementById("DVR99-02-01_text").style.textAlign="center";
				  //document.getElementById("DVR99-02-01_text").style.position="absolute";
				  //document.getElementById("DVR99-02-01_text").style.width="330px";
			   }
			
		},
		addObserver : function(observer)
		{
			if (!observer)
				return;
			var len = this.observers.length;
			for (var i = 0; i < len; i++)
			{
				if (this.observers[i] == observer)
					return;
			}
			this.observers[len] = observer;
		},
		notifyObservers : function(methodName)
		{
			if (!methodName)
				return;
	
			var len = this.observers.length;
			for (var i = 0; i < len; i++)
			{
				var obs = this.observers[i];
				if (obs)
				{
					if (typeof obs == "function")
						obs(methodName, this);
					
				}
			}
		},
	show :function(obj)
		{
			// マウス連続クリックの退避処理を行う
			if( obj )
			{
				buttonObj = obj;
				obj.onfocus = function(){
					if(buttonNum == 2)
					{
						// いいえボタンにフォーカスを設定する
						Spry.$("DVR99-02-01_button2").focus();
						last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
					}
					if(buttonNum == 1)
					{
						// ボタンにフォーカスを設定する
						Spry.$("DVR99-02-01_button1").focus();
						last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
					}
				};
			}
		iDebug('show :function invoked while temp='+temp);				
			hiddenPopupObject = obj;
			this.transPop.stop_loading();
			this.transPop.show();
			Spry.$('DVR_popUp').style.display="block";
			Spry.$('DVR99-02-01_main').style.display="block";//the Div that is show the popUp which you defined
			//alert(temp==0);
			if(temp!=0){		
				if(temp!=3){
					obj = document.getElementById("DVR99-02-01_main");
					iDebug('push Focus info while temp='+temp);
					this.FN.pushFocusInfo(null, obj, true, null);
					//this.FN.pushFocusInfo(null, obj, null, null);
					tokenFocusReborn=true;
				}else{
					document.getElementById("DVR9901_button1").focus();
					last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
				}
			}else{            //david 2011.06.09  add
				if(hiddenPopupObject2!=null){
					hiddenPopupObject2.blur();
					obj = document.getElementById("DVR99-02-01_main");
					this.FN.pushFocusInfo(null, obj, null, null);
				}
				//document.getElementById("DVR99-02-01_text").setAttribute("tabindex",1);
//				setTimeout(function(){document.getElementById("DVR99-02-01_text").focus();},500); 
				//tokenFocusReborn=true;
			}
		if(document.getElementById("DVR99-02-01_button2")){
			savRetBtn(); 
			identifyRetBtn(document.getElementById("DVR99-02-01_button2"));
		}else if(document.getElementById("DVR9901_button1")){
			savRetBtn(); 
			identifyRetBtn(document.getElementById("DVR9901_button1"));		
		} else {
			savRetBtn(); 	
			//alert(event.srcElement);
			if(event!=undefined){
				if(event.srcElement.id!=undefined){
					hiddenPopupObject2 = event.srcElement;   //david 2011.06.09  add
					event.srcElement.blur();
				}
			}
		}
		setTimeout(this.focusToSome,350);
		// #17162 「戻る」のポップアップ表示後、ディムになった項目を非ディムになる
		if ( typeof(disabledElementId) != "undefined" 
			&& document.getElementById(disabledElementId)
			&& document.getElementById(disabledElementId).disabled == true 
			&& (1 == this.model && "戻る" == this.value1) ) {
			document.getElementById(disabledElementId).disabled = false;
		}
		//プロセスバーの表示
		if( ShowProcessBar == true ){
			//プロセスバーの表示タイマーをクリアする
			if(ShowProBarTimer!=null) {
				clearInterval(ShowProBarTimer);
			}
			//プロセスバーの初期表示時
			ProBarNum = 1;
			ShowProBar();
			NeedClearTimer = true;
			//2秒タイマーでプロセスバーを表示する
			ShowProBarTimer = setInterval( "ShowProBar()", 2000 );
		} else {
			NeedClearTimer = false;
		}
		},
	hide :function()
		{
			//プロセスバーの表示タイマーをクリアする
			if( NeedClearTimer )
			{
				clearInterval(ShowProBarTimer);
				ProBarNum = 1;
			}
		iDebug('hide :function invoked while temp='+temp);				
			this.transPop.hide();
			Spry.$('DVR_popUp').style.display="none";
			Spry.$('DVR99-02-01_main').style.display="none";
			if(temp!=0 || tokenFocusReborn){				
				if(temp!=3){				
					if(hiddenPopupObject) {//fixed by hdu, double hide, if a new popup will be created based on previous popup dialog result @ 20110414
						iDebug('Restore focus info while temp='+temp);					
						this.FN.popFocusInfo(hiddenPopupObject, true); 
						//this.FN.popFocusInfo(hiddenPopupObject);
						tokenFocusReborn = false;
//						if(document.getElementById('debugInfo')!=undefined)
//						document.getElementById('debugInfo').value = document.getElementById('debugInfo').value + ' goPop';						
						// IPアドレス入力エリアはフォーカス場合、一番先頭にカーソルを持ってくる
						if( hiddenPopupObject.getAttribute("sipmode") != null && hiddenPopupObject.getAttribute("sipmode") == "3"){
							//フォーカスフラグの設定をfalseにする
							ipAreaFucusFlg = false;
							hiddenPopupObject.setSelectionRange( 0, 1 );
						}
					}
					hiddenPopupObject = null;
					if(tabIdSequenceBackupForPop){
						tabIdSequence = tabIdSequenceBackupForPop;
						tabIdSequenceBackupForPop = null;
					}
				}else{
					document.getElementById("DVR9901_button1").blur();	
					document.getElementById("DVR-mainMenu-00-root").childNodes[0].focus();
					last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
				}
				
				if(tokenFocusReborn){
					iDebug('Restore focus info while temp='+temp);					
					this.FN.popFocusInfo(null, true);
					tokenFocusReborn = false;
				}
			}
			if(temp==0){    //david 2011.06.09  add
				if(hiddenPopupObject2!=null){
					this.FN.popFocusInfo(hiddenPopupObject2);
					tokenFocusReborn = false;
				}
			}

			// 画面消去の時に、もともと保持したフォーカス対象をクリアする
			hiddenPopupObject = null;
			hiddenPopupObject2 = null;

			resRetBtn();
		}
		,focusToSome :function()
		{
			if(Spry.$('DVR9901_button1')){
				iDebug('1of1 focus');
				Spry.$('DVR9901_button1').focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}else if(Spry.$('DVR99-02-01_button2')){
				iDebug('2of2 focus');				
				Spry.$('DVR99-02-01_button2').focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}else{       //david 2011.06.09  add
				if(hiddenPopupObject2!=null){
					document.getElementById("DVR99-02-01_text").setAttribute("tabindex",1);
					setTimeout(function(){document.getElementById("DVR99-02-01_text").focus();},100);
					last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
				}
			}
			// #16983 ポップアップが表示されたら、入力イベントできる
			dispInputEventStart();
		}		
 };


var actionPopTransparent = Class.create();
 actionPopTransparent.prototype = {
     
	initialize: function(){
		var mFlag=mainMenucreate();
		if(mFlag==0)
		{
			document.getElementById("DVR-99-02-01css").href="../DVR-99/DVR-99-02-01-VGA.css";
		}
		else if(mFlag==3)
		{
			document.getElementById("DVR-99-02-01css").href="../DVR-99/DVR-99-02-01-VGA-BIG.css";
		}
		else if(mFlag==2)//modified by luo 20110720
		{
			document.getElementById("DVR-99-02-01css").href="../DVR-99/DVR-99-02-01-BIG.css";
		}
		else  //added large page css by luo 20110720
		{
			document.getElementById("DVR-99-02-01css").href="../DVR-99/DVR-99-02-01.css";
		}
			var popUp = document.getElementById("DVR");
			if(popUp==null){
				popUp = document.createElement("div") ;
				popUp.id = "DVR";
				popUp.className = "DVR";
				document.body.appendChild(popUp) ;
			}
			popUp.innerHTML = "<span id=\"loading\"  class=\"cgi_loading\"></span>";

	
		},

	show :function()
		{
			Spry.$('DVR').style.display="block";
			
		},

	stop_loading :function()
		{
			Spry.$('DVR').innerHTML = "";
			
		},
	hide :function()
		{
			Spry.$('DVR').style.display="none";
			
		}
 };
 

var actionPopOpaque = Class.create();
 actionPopOpaque.prototype = {
     initialize: function()
    {
		var mFlag=mainMenucreate();
		if(mFlag==0)
		{
			document.getElementById("DVR-99-02-01css").href="../DVR-99/DVR-99-02-01-VGA.css";
		}
		else if(mFlag==3)
		{
			document.getElementById("DVR-99-02-01css").href="../DVR-99/DVR-99-02-01-VGA-BIG.css";
		}
		else if(mFlag==2)//modified by luo 20110720
		{
			document.getElementById("DVR-99-02-01css").href="../DVR-99/DVR-99-02-01-BIG.css";
		}
		else  //added large page css by luo 20110720
		{
			document.getElementById("DVR-99-02-01css").href="../DVR-99/DVR-99-02-01.css";
		}
			var popUp = document.getElementById("DVROpaque");
			if(popUp==null)
			{
				popUp = document.createElement("div") ;
				popUp.id = "DVROpaque";
				popUp.className = "DVROpaque";
				document.body.appendChild(popUp) ;
			}
			//popUp.innerHTML = "<span id=\"loadingOpaque\"  class=\"loadingOpaque\" style='background-image:url(../images/pictrue/1.PNG)'></span>";

	
		},

	    show :function()
		{
			Spry.$('DVROpaque').style.display="block";
			
		},

	    stop_loading :function()
		{
			Spry.$('DVROpaque').innerHTML = "";
			
		},
	    hide :function()
		{
			Spry.$('DVROpaque').style.display="none";
			
		}
  
};

//added onkeydown event by luo 20110605
function commonPopkeyEvent(event){
	var curentFocus_id=document.activeElement.id;
	//1キーpopupかつボタンが「中断」の場合はリモコン戻るでpopupを閉じれないようにする
	if((oneKeypop_wo_return == true) && (event.keyCode==27))
	{
		stopDefaultling(event);
		stopBubbling(event);
		return;
	}
	// #15278 戻るボタンだけあるポップアップ子画面上に、確定ボタンと戻るボタンだけ反応するように対応
	if(curentFocus_id == "DVR9901_button1" && event.keyCode != 27 && event.keyCode != 13)
	{
		stopDefaultling(event);
		stopBubbling(event);
		return;
	}

	// 当前表示画面のURLを取得する(異常一覧など右フレームなしの画面を処理しない)
	if( (top.rightpage != undefined) && (top.rightpage != null) ){
		var fromUrl=top.rightpage.location.href;
		var noParamsUrl = fromUrl.replace(/\?.+/g, "");
		if( (noParamsUrl!="") && (noParamsUrl!=undefined) && (noParamsUrl!=null) )
		{
			// 再生実行一時停止画面（再生失敗）のみ、「戻る」ボタンの反応処理は追加必要です。
			if( noParamsUrl.indexOf("DVR-05-07-00.html") > -1 ){
				// #25547 戻るボタンだけあるポップアップ子画面上に、確定ボタン反応するように対応
				if(curentFocus_id == "DVR9901_button1" && event.keyCode == 13)
				{
					document.activeElement.click();
				}
			}
		}
	}

	if(event.keyCode==37){//left key
		stopDefaultling(event);
		if(curentFocus_id=="DVR99-02-01_button2"){
		    document.getElementById("DVR99-02-01_button1").focus();
			last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
		}
			  
	 }else if(event.keyCode==39){//right ;key
		stopDefaultling(event);
		if(curentFocus_id=="DVR99-02-01_button1"){
		    document.getElementById("DVR99-02-01_button2").focus();
			last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
		}		  
	}else if(event.keyCode==9 && event.shiftKey==false){//Tab key 2012.5.24 takeuchi 追加
		stopDefaultling(event);
		if(curentFocus_id=="DVR99-02-01_button1"){
			document.getElementById("DVR99-02-01_button2").focus();
			last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
		}
	}else if(event.keyCode==9 && event.shiftKey==true){//Shift + Tab key 2012.5.24 takeuchi 追加
		stopDefaultling(event);
		if(curentFocus_id=="DVR99-02-01_button2"){
			document.getElementById("DVR99-02-01_button1").focus();
			last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
		}
	}
}

var oneKeypop_wo_return = false;
