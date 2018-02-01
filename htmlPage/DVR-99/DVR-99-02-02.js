/**
 * メッセージ五行用ポップアップ
 */
/*Defined a class*/
var Class = {
  create: function() {
    return function() {
      this.initialize.apply(this, arguments);
    };
  }
};
var temp2;
var hiddenPopup2Object = new Object;
var hiddenPopup2Object2 = null;    //david 2011.06.09  add

var actionPop2 = Class.create();
 actionPop2.prototype = {
	initialize: function(txt,num,vau1,vau2){
		if(vau2=="nstc"){
			temp2 = 3;
		}else{
			temp2 = num;
		}
		this.FN = new FocusNavigator();
		var mFlag=mainMenucreate();
		if(mFlag==0)
		{
			document.getElementById("DVR-99-02-02css").href="../DVR-99/DVR-99-02-02-VGA.css";
		}
		else if(mFlag==3)
		{
			// デカ文字未対応
//			document.getElementById("DVR-99-02-02css").href="../DVR-99/DVR-99-02-02-VGA-BIG.css";
		}
		else if(mFlag==2)//modified by luo 20110720
		{
			document.getElementById("DVR-99-02-02css").href="../DVR-99/DVR-99-02-02-BIG.css";
		}
		else  //added large page css by luo 20110720
		{
			document.getElementById("DVR-99-02-02css").href="../DVR-99/DVR-99-02-02.css";
		}
	        this.observers = [];
			var str= "";
			str=str+"  <div id='DVR99-02-02_main' onkeydown='commonPopkeyEvent2(event)'>";//added onkeydown event by luo 20110605
			str=str+"   <div id='DVR99-02-02_border' class='wordBackColor'>";
			str=str+"            <div id='DVR99-02-02_text' class='font_Rg'>";
			str=str+"               <br/>"+txt+"";//modified by luo 20110608 added "<br/><br/>"
			str=str+"            <\/div>";
			             if(num==2){     
			//str=str+"            <div class='DVR99-02-02-button1'>";
			str=str+"            <div id='DVR99-02-02_b1'>";
			str=str+"                  <input type='button' class='middle-button' id='DVR99-02-02_button1' onmousedown='setfocus_click(this)' value='"+vau1+"' \/>";
			str=str+"            <\/div>";
			str=str+"            <div id='DVR99-02-02_b2'>";
			str=str+"                  <input type='button' class='middle-button' id='DVR99-02-02_button2' onmousedown='setfocus_click(this)' value='"+vau2+"' \/>";
			str=str+"            <\/div>";
			//str=str+"            <\/div>";
			
			if(tabIdSequence && !tabIdSequenceBackupForPop){
				tabIdSequenceBackupForPop = tabIdSequence;
				tabIdSequence = new Array  (
							 'DVR99-02-02_button1',	
							 'DVR99-02-02_button2'
							 );						
			}
	
//==============================================================
						 }else if(num==1){
							 
			str=str+"            <div class='DVR99-02-02-button1' id='DVR99-02-02-button1'>";//djwan
			str=str+"                  <input type='button' class='middle-button' id='DVR990202_button1' onmousedown='setfocus_click(this)' value='"+vau1+"' \/>";
			str=str+"            <\/div>";
						 }
						 else if(num==0){
							 
			str=str+"            <div class='DVR99-02-02-table' id='DVR99-02-02-table'>";//djwan
			str=str+"                 <table class='DVR99table'>";
			str=str+"                 <tr>";
			str=str+"                     <td id='td_1' class='DVR99table_td' style='background-color:#09C'></td>";
			str=str+"                     <td id='td_2' class='DVR99table_td' style='background-color:#09C'></td>";
			str=str+"                     <td id='td_3' class='DVR99table_td' style='background-color:#09C'></td>";
			str=str+"                     <td id='td_4' class='DVR99table_td' style='background-color:#09C'></td>";
			str=str+"                     <td id='td_5' class='DVR99table_td' style='background-color:#09C'></td>";
			str=str+"                     <td id='td_6' class='DVR99table_td' style='background-color:#09C'></td>";
			str=str+"                     <td id='td_7' class='DVR99table_td' style='background-color:#09C'></td>";
			str=str+"                     <td id='td_8' class='DVR99table_td' style='background-color:#09C'></td>";
			str=str+"                     <td id='td_9' class='DVR99table_td' style='background-color:#09C'></td>";
			str=str+"                     <td id='td_10' class='DVR99table_td' style='background-color:#09C'></td>";
			str=str+"                     <td id='td_11' class='DVR99table_td' style='background-color:#09C'></td>";
			str=str+"                     <td id='td_12' class='DVR99table_td' style='background-color:#09C'></td>";
			str=str+"                     <td id='td_13' class='DVR99table_td' style='background-color:#09C'></td>";
			str=str+"                     <td id='td_14' class='DVR99table_td' style='background-color:#09C'></td>";
			str=str+"                     <td id='td_15' class='DVR99table_td' style='background-color:#09C'></td>";
			str=str+"                 </tr>";
			str=str+"                 </table>";
			str=str+"            <\/div>";
						 }
						 
			str=str+"   <\/div>";
			str=str+" <\/div>";
			var popUp = document.getElementById("DVR_popUp_2");
			if(popUp==null){
				popUp = document.createElement("div") ;
				popUp.id = "DVR_popUp_2";
			    document.body.appendChild(popUp) ;
				
			}
			popUp.innerHTML=str;//show the popUp in DVR_popUp Div
			
			//added by duhong @ 20110408 for specified key action mapping to return button click action;
			if(num==2){
				savRetBtn(); 
				identifyRetBtn(document.getElementById("DVR99-02-02_button2"));
			}else if(num==1){
				savRetBtn(); 
				identifyRetBtn(document.getElementById("DVR990202_button1"));		
			}else if(num==0){
				savRetBtn(); 	
				//alert(event.srcElement);
				if(event!=undefined){
					if(event.srcElement.id!=undefined){
						hiddenPopup2Object2 = event.srcElement;   //david 2011.06.09  add
						event.srcElement.blur();
					}
				}
			}	
     		this.transPop = new actionPop2Transparent();
			this.dosomething(num);
		
		},
		dosomething :function(num)
		{   
		   var tem=this;
		   if(num==2){
				var btn2=Spry.$("DVR99-02-02_button2");
				btn2.onclick= function(){
					tem.hide();
					tem.notifyObservers("cancel");
					
				};
				
				var btn1=Spry.$("DVR99-02-02_button1");
				btn1.onclick=function(){ 	
					tem.hide();
					tem.notifyObservers("ok");
						
				};
		   }
		   if(num==1){
				var btn1=Spry.$("DVR990202_button1");
				btn1.onclick=function(){ 	
					tem.hide();
					tem.notifyObservers("done");
				};
		   }
		   if(num==0){
			   /*reset the no button popUp style*/
			      document.getElementById("DVR99-02-02_text").style.paddingLeft="1px";
				  document.getElementById("DVR99-02-02_text").style.paddingTop="2px";
				  //document.getElementById("DVR99-02-02_text").style.position="absolute";
				  document.getElementById("DVR99-02-02_text").style.width="330px";
				  document.getElementById("DVR99-02-02_text").style.top="10px";
				  document.getElementById("DVR99-02-02_text").style.textAlign="center";
				  
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
		iDebug('show :function invoked while temp2='+temp2);				
			hiddenPopup2Object = obj;
			this.transPop.stop_loading();
			this.transPop.show();
			Spry.$('DVR_popUp_2').style.display="block";
			Spry.$('DVR99-02-02_main').style.display="block";//the Div that is show the popUp which you defined
			//alert(temp2==0);
			if(temp2!=0){		
				if(temp2!=3){
					obj = document.getElementById("DVR99-02-02_main");
					iDebug('push Focus info while temp2='+temp2);
					this.FN.pushFocusInfo(null, obj, true, null);
					//this.FN.pushFocusInfo(null, obj, null, null);
					tokenFocusReborn=true;
				}else{
					document.getElementById("DVR990202_button1").focus();
					last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
				}
			}else{            //david 2011.06.09  add
				if(hiddenPopup2Object2!=null){
					hiddenPopup2Object2.blur();
					obj = document.getElementById("DVR99-02-02_main");
					this.FN.pushFocusInfo(null, obj, null, null);
				}
				//document.getElementById("DVR99-02-02_text").setAttribute("tabindex",1);
//				setTimeout(function(){document.getElementById("DVR99-02-02_text").focus();},500); 
				//tokenFocusReborn=true;
			}
			
		setTimeout(this.focusToSome,350);
		},
	hide :function()
		{
		iDebug('hide :function invoked while temp2='+temp2);				
			this.transPop.hide();
			Spry.$('DVR_popUp_2').style.display="none";
			Spry.$('DVR99-02-02_main').style.display="none";
			if(temp2!=0 || tokenFocusReborn){				
				if(temp2!=3){				
					if(hiddenPopup2Object) {//fixed by hdu, double hide, if a new popup will be created based on previous popup dialog result @ 20110414
						iDebug('Restore focus info while temp2='+temp2);					
						this.FN.popFocusInfo(hiddenPopup2Object, true); 
						//this.FN.popFocusInfo(hiddenPopup2Object);
						tokenFocusReborn = false;
//						if(document.getElementById('debugInfo')!=undefined)
//						document.getElementById('debugInfo').value = document.getElementById('debugInfo').value + ' goPop';						
					}
					hiddenPopup2Object = null;
					if(tabIdSequenceBackupForPop){
						tabIdSequence = tabIdSequenceBackupForPop;
						tabIdSequenceBackupForPop = null;
					}
				}else{
					document.getElementById("DVR990202_button1").blur();	
					document.getElementById("DVR-mainMenu-00-root").childNodes[0].focus();
					last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
				}
				
				if(tokenFocusReborn){
					iDebug('Restore focus info while temp2='+temp2);					
					this.FN.popFocusInfo(null, true);
					tokenFocusReborn = false;
				}
			}
			if(temp2==0){    //david 2011.06.09  add
				if(hiddenPopup2Object2!=null){
					this.FN.popFocusInfo(hiddenPopup2Object2);
					tokenFocusReborn = false;
				}
			}
			resRetBtn();
		}
		,focusToSome :function()
		{
			if(Spry.$('DVR990202_button1')){
				iDebug('1of1 focus');
				Spry.$('DVR990202_button1').focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}else if(Spry.$('DVR99-02-02_button2')){
				iDebug('2of2 focus');				
				Spry.$('DVR99-02-02_button2').focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}else{       //david 2011.06.09  add
				if(hiddenPopup2Object2!=null){
					document.getElementById("DVR99-02-02_text").setAttribute("tabindex",1);
					setTimeout(function(){document.getElementById("DVR99-02-02_text").focus();},100);
					last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
				}
			}
		}		
 };


var actionPop2Transparent = Class.create();
 actionPop2Transparent.prototype = {
     
	initialize: function(){
		var mFlag=mainMenucreate();
		if(mFlag==0)
		{
			document.getElementById("DVR-99-02-02css").href="../DVR-99/DVR-99-02-02-VGA.css";
		}
		else if(mFlag==3)
		{
			document.getElementById("DVR-99-02-02css").href="../DVR-99/DVR-99-02-02-VGA-BIG.css";
		}
		else if(mFlag==2)//modified by luo 20110720
		{
			document.getElementById("DVR-99-02-02css").href="../DVR-99/DVR-99-02-02-BIG.css";
		}
		else  //added large page css by luo 20110720
		{
			document.getElementById("DVR-99-02-02css").href="../DVR-99/DVR-99-02-02.css";
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
 

var actionPop2Opaque = Class.create();
 actionPop2Opaque.prototype = {
     initialize: function()
    {
		var mFlag=mainMenucreate();
		if(mFlag==0)
		{
			document.getElementById("DVR-99-02-02css").href="../DVR-99/DVR-99-02-02-VGA.css";
		}
		else if(mFlag==3)
		{
			document.getElementById("DVR-99-02-02css").href="../DVR-99/DVR-99-02-02-VGA-BIG.css";
		}
		else if(mFlag==2)//modified by luo 20110720
		{
			document.getElementById("DVR-99-02-02css").href="../DVR-99/DVR-99-02-02-BIG.css";
		}
		else  //added large page css by luo 20110720
		{
			document.getElementById("DVR-99-02-02css").href="../DVR-99/DVR-99-02-02.css";
		}
			var popUp = document.getElementById("DVROpaque");
			if(popUp==null)
			{
				popUp = document.createElement("div") ;
				popUp.id = "DVROpaque";
				popUp.className = "DVROpaque";
				document.body.appendChild(popUp) ;
			}
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
function commonPopkeyEvent2(event){
   var curentFocus_id=document.activeElement.id;
   if(event.keyCode==37){//left key
		stopDefaultling(event);
		if(curentFocus_id=="DVR99-02-02_button2"){
		    document.getElementById("DVR99-02-02_button1").focus();
			last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
		}
			  
	 }else if(event.keyCode==39){//right ;key
		stopDefaultling(event);
		if(curentFocus_id=="DVR99-02-02_button1"){
		    document.getElementById("DVR99-02-02_button2").focus();
			last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
		}		  
	}
}

