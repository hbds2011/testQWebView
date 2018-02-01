/*
 example : var a=new C0102pop(lp,tp);
  lp's value represents the distance from the left of the Browser viewing area;
  tp's value represents the distance from the top of Browser viewing area;
 attention:You should check CGI's link and the dataset before using ;
	  	
*/

/*var $ = function (id) {
    return "string" == typeof id ? document.getElementById(id) : id;
}*/

var Class = {
  create: function() {
    return function() {
      this.initialize.apply(this, arguments);
    };
  }
};

// ボタン処理中フラグ
var BtnExecuting = false;
var isIn0105GroupTable=false;//Table域フラグ
var Gamen0105Status=0; // 0:初期状態 1:セル間移動状態 2:テキスト入力状態
var FocusOn_TDOBJCT=null;
var currentPage=null;
var Url=Spry.Utils.getLocationParamsAsObject();
var pageNum=Url.Menu;
if(pageNum){
	currentPage=pageNum.split("_")[1];
}else{
	Url=window.location.pathname;
	currentPage=Url.split("/")[2].split("-")[2];
}

//イベント発生元、上へ、下へ、左へ、右へ　の順番に格納しておく
var Focus0105TagList = new Array(
	new Array("camera0105List" 	,""			,"DVR990105button1"	,""			,""),
	new Array("DVR990105button1" 	,"camera0105List"	,""			,""			,"DVR990105button2"),
	new Array("DVR990105button2"   	,""			,""			,"DVR990105button1"	,""));

var C0105pop = Class.create();
C0105pop.prototype = {
	initdata: null,
	initialize: function(lp,tp,re,Machine)
	{
		consoleLogOutput(7,"DVR-99-01-05.js",arguments.callee.name,"initialize");
		this.left=lp;
		this.top=tp;
		this.url="/cgi-bin/DVR-99-01-11.cgi?Machine="+Machine;  // cgi
		this.dataset="Result/Camerae/Camera";  // dataset
		this.record=null;// record[0][0]=null;record[1][0]=null;record[2][0],radiobox;
		this.observers = [];
		C0105pop.prototype.initdata=re;
	
		//既にPOPUPが作成されている形跡がある場合、一度初期化を行う
		var thisContainer = document.getElementById('DVR010105Container');
		if(thisContainer){
			thisContainer.parentNode.removeChild(thisContainer);
		}
		var str= "";
		str=str+ "<div id='DVR010105Container' class='wordBackColor borderColor3'";
		str=str+ "style='";
		str=str+ "left:" +this.left +";";
		str=str+ "top:" +this.top +";";
		str=str+ "'>";
		str=str+ "<div class='DVR010105Border pageBackColor' ></div>";
		str=str+ "<div class='DVR010105Top' id='DVR010105Topname'>" +"対象カメラ" + "</div>";
		str=str+ "<table class='DVR010105Ds'>";
		str=str+ "<tr>";
		str=str+ "<td class='table_tr1_td1 wordBackColor'>選択カメラ";
		str=str+ "</td>";
		str=str+ "<td class='table_tr1_td2 pageBackColor'></td>";
		str=str+ "<td id=\"camera0105List\" onkeydown=\"div0105Evtproc();change0105Focus(this,0);\" tabindex=\"-1\" onclick=\"td0105OnclickEvent(this,1);\" onfocus=\"isIn0105GroupTable=false;Gamen0105Status=0;\">";
		str=str+ "<div  class=\"DVR010501Ds\" >";
		str=str+ "<div id='reg03' spry:region='dsbsc03'>";
		str=str+ "<table  id='dstab03' style='";
		str=str+ "'>";
		str=str+ "</table>";
		str=str+ "</div>";
		str=str+ "</div>";
		str=str+ "</td>";
		str=str+ "</tr>";
		str=str+ "</table>";	
		
		str=str+ "<div class='DVR010105BtnPs' >";
		str=str+ "<input type='button' name='button1' id='DVR990105button1' onmousedown='doSelf99_05_Click(this)' value='登録' class='big-button' ";
		str=str+ " onkeydown=\"change0105Focus(this,0);\"/>";
		str=str+ "</div>";	
		str=str+ "<div class='DVR010105BtnPs2' >";
		str=str+ "<input type='button' name='button2' id='DVR990105button2' onmousedown='doSelf99_05_Click(this)' value='取消' class='big-button' ";
		str=str+ " onkeydown=\"change0105Focus(this,0);\"/>";
		str=str+ "</div>";	
		str=str+ "<div class='DVR010105BotmFnt pageBackColor' id='DVR010105BotmFnt' >";
		str=str+ "<table>";
		str=str+ "<tr>";
		str=str+ "<td class='message3'>操作ガイド：</td>";
//		str=str+ "<td>画像ダウンロードするカメラを１台選択してください。</td>";
		str=str+ "<td>指定の場合は画像ダウンロード対象カメラをチェックします。</td>";
		str=str+ "</tr>";
		str=str+ "<tr>";
		str=str+ "<td></td>";
		if(currentPage=="01"){
			str=str+ "<td>全ての場合は［レイアウト］と［カメラ］を指定する事はできません。</td>";
		}else{
			str=str+ "<td>&nbsp;</td>";
		}
		str=str+ "</tr>";
		str=str+ "</table>";

		str=str+ "</div>";
		str=str+"</div>";
		str=str+ "</div>";
		document.body.insertAdjacentHTML("beforeEnd",str);

		var dsbsc03 = new Spry.Data.XMLDataSet("", this.dataset);

		dsbsc03.addObserver(this.preparedsbsc);
		dsbsc03.setURL(gUrl+this.url);
		dsbsc03.loadData();

     		this.transPop=new actionPop(gettext("DVR-99-01-waiter"),0,"","");
		
		this.dosomething();
	},
	dosomething :function()
	{   
		var obj;
		if(Spry.$("DVR-01-01-00-03"))
		{
			obj	=Spry.$("DVR-01-01-00-03");
		}
		if(Spry.$("DVR-01-02-00-03"))
		{
			obj	=Spry.$("DVR-01-02-00-03");
		}
		if(Spry.$("DVR-01-03-00-03"))
		{
			obj	=Spry.$("DVR-01-03-00-03");
		}
		if(Spry.$("DVR-01-04-00-03"))
		{
			obj	=Spry.$("DVR-01-04-00-03");
		}
		if(Spry.$("DVR-01-05-00-03"))
		{
			obj	=Spry.$("DVR-01-05-00-03");
		}
		
		var tem=this;
		var btn2=Spry.$("DVR990105button2");
		btn2.onclick=function(){

			//ボタン実行中の時、ボタン処理無視
			if( BtnExecuting == true ){
				return;
			} else {
				BtnExecuting = true;
			}
			tem.transPop.hide();
			Spry.$('DVR010105Container').style.display="none";
			tem.notifyObservers("cancel");
			//FN.popFocusInfo(obj);
		    resRetBtn();		//added by hlzhang @ 20110408
			//obj.focus();
			
			//タブ順番を処理する @ 20110428
			change0105Focus(btn2,1);
			
			setTimeout('setFatherFocus()',800);//added by hlzhang @ 20110427
			last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
		};
		var btn1=Spry.$("DVR990105button1");
		btn1.onclick=function(){ 

			//ボタン実行中の時、ボタン処理無視
			if( BtnExecuting == true ){
				return;
			} else {
				BtnExecuting = true;
			}
			var x=document.getElementsByName("DVR990105check");
			tem.record=new Array(3);
			
			tem.record[0]=new Array();
			tem.record[1]=new Array();
 			tem.record[2]=new Array();
			
				tem.record[0][0]=null;
				tem.record[1][0]=null;
			
			var i;
			for(i=0;i<x.length;i++)
			{
				if((x[i].checked)==true)
				{ 
					tem.record[2][0]=new Array();
					tem.record[2][0][0]=x[i].value;
					tem.record[2][0][1]=Spry.$('check03_h'+i).value;
					tem.record[2][0][2]=Spry.$('check03_m'+i).value;
					break;
			
					
				}
		
			}
			tem.transPop.hide();
			Spry.$('DVR010105Container').style.display="none";
			tem.notifyObservers("ok");
			//FN.popFocusInfo(obj);
			//obj.focus();
			//カメラ選択した後、リモコンの[取消]キーが無効になることを修正する
			resRetBtn();
			//タブ順番を処理する @ 20110428
			change0105Focus(btn1,1);
			
			setTimeout('setFatherFocus()',800);
			last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
		};
			
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
	preparedsbsc :function(notificationType, dataSet, dat)
	{
	 
		if (notificationType == "onPostLoad") {
			var jcount = 0;
			var ii=0;
			var str="";
			var loop = true;
			var rows = dataSet.getData();
			var x=document.getElementById('dstab03');
			var i_flg=0;
			while (loop == true) {
				if(rows[jcount] != undefined) {
				
					var row=x.insertRow(jcount);
					var data=rows[jcount];
					

					if(data["@gid"]==data["Code"])
					{
						row.innerHTML="<td colspan='3'>" + data["Name"] + "</td>";
						i_flg=0;
					}
					else
					{
					  var td1=row.insertCell(0);
					  var td2=row.insertCell(1);
					  var td3=row.insertCell(2);

					  if(data["@gid"] == 0) {
					      td1.innerHTML="<input type='radio' name='DVR990105check' id='check_r"+ii+"' value='"+data["Code"]+"' onmousedown='doSelf99_05_Click(this)' onKeydown='td0105Evtsproc(this,0)' onclick='td0105Evtsproc(this,1)'/>";
					      td2.innerHTML=data["Code"];
					      str="<input type='hidden' name='check03_m' id='check03_m"+ii+"'  value='"+data["recId"]+"' />";
					      str=str+"<input type='hidden' name='check03_v' id='check03_h"+ii+"'  value='"+data["Name"]+"' />";
					      td3.innerHTML=data["Name"]+str;
					      ii++;
					  } else {
					      if (i_flg == 0) {
					          td1.innerHTML="└";
					      } else {
					          td1.innerHTML="　";
					      }
					      td2.innerHTML="<input type='radio' name='DVR990105check' id='check_r"+ii+"' value='"+data["Code"]+"' onmousedown='doSelf99_05_Click(this)' onKeydown='td0105Evtsproc(this,0)' onclick='td0105Evtsproc(this,1)'/>";
					      td3.innerHTML=data["Code"];
					      str="<input type='hidden' name='check03_m' id='check03_m"+ii+"'  value='"+data["recId"]+"' />";
					      str=str+"<input type='hidden' name='check03_v' id='check03_h"+ii+"'  value='"+data["Name"]+"' />";
					      td3.innerHTML=td3.innerHTML+'&nbsp;'+data["Name"]+str;
					      ii++;
					      i_flg=1;
					  }
					}
					jcount++;
				} else {
						  loop = false;
				}
			}
		   C0105pop.prototype.init();
		   dispInputEventStart();
		}
	},

	init: function()
	{     
		if(C0105pop.prototype.initdata!=null)
		{
			var record=C0105pop.prototype.initdata;
			var x=document.getElementsByName("check03_m");
			var i;
			for(i=0;i<x.length;i++)
			{     if(record[2].length)
			      {
				    if(x[i].value==record[2][0][2])
					{ 
						Spry.$('check_r'+i).checked=true;
						break;
						
					}
				  }
			}
		}
		rescueFocus(top.rightpage.document.getElementById("camera0105List"));
	
	},
	show :function(mainRecInfo)
	{
		//ボタン非実行中
		BtnExecuting = false;
		/* 現在登録されている情報を再表示する */
		if(mainRecInfo){
			//現在表示しているカメラのラジオボタンをリストにつめる
			var camRadioList = document.getElementsByName("check03_m");
			for(i = 0; i < camRadioList.length; i++)
			{
				if(mainRecInfo[2].length)
				{
					if(camRadioList[i].value==mainRecInfo[2][0][2])
					{
						//前回選択しているカメラを選択する
						Spry.$('check_r'+i).checked = true;
						break;
					}
				}
			}
		}
		//this.transPop.stop_loading();
		this.transPop.show();
//		this.transPop.hide();
		Spry.$('DVR010105Container').style.display="block";
		// added by hlzhang @ 20110408 specified key action mapping to cancel button click.
		savRetBtn();  
		
		//set the first focus on object by luo 20110720
		setTimeout(function(){
		   var firstFocus=document.getElementById("camera0105List");	
		   firstFocus.tabIndex=1;
		   firstFocus.focus();
		   last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
		},1000);
		
		identifyRetBtn(document.getElementById("DVR990105button2"));
	}
			
};

// マウスダウンの場合
function doSelf99_05_Click(clkObj){
	// 対象が中項目のcheckboxとradio以外の場合、
	if( clkObj.type!="checkbox" && clkObj.type!="radio")
	{
		isIn0105GroupTable=false;//Table域フラグ
		Gamen0105Status=0; // 0:初期状態
	}

	setfocus_click(clkObj);
}

//DIV　KEYが押下された場合、
function div0105Evtproc() {
	// 初期状態以外、反応しない
	if (Gamen0105Status>0) return; 
	//キー押下の場合


	var kcd = event.keyCode;
	if (kcd==13) { //enter key
		Gamen0105Status=1; //セル間移動状態に進入
		
		isIn0105GroupTable=true;
		
		var obj=null;
		// カメラ選択フラグ、初期が未選中
		var checkFlag=false;
		//表示されているカメラを取得
		var camRadObjList=document.getElementsByName("DVR990105check");
		//表示されているカメラのリスト分ループさせる
		for(var i = 0; i < camRadObjList.length; i++)
		{
			//一旦チェック場合、登録ボタン操作可に設定する
			if (camRadObjList[i].checked) {
				obj=document.getElementById("check_r" + i);
				checkFlag=true;
				break;
			}
			
		}

		//フォーカスは一番目カメラに
		if (checkFlag==false)
		{
			obj=document.getElementById("check_r0");
			obj.checked = true;
		}
		stopDefaultling(event);
		obj.style.background='#BCBAFA'; 
		obj.focus();
		last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
		FocusOn_TDOBJCT=obj;
		event.returnValue = false;
	}
	if (kcd!=9 && kcd!=8) { //tab key & backspace key
		event.returnValue = false;
	}
}

//TD　KEYが押下され、又はマウスクリックした場合、
	function td0105Evtsproc(obj,mouseflg) {
		//
		if (mouseflg==1) {
			// 初期状態の場合

			
			if (Gamen0105Status==0) {
				Gamen0105Status=1; //セル間移動状態に進入
				isIn0105GroupTable=true;
				//フォーカスはクリックされたカメラに
				obj.style.background='#BCBAFA'; 
				obj.focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
				FocusOn_TDOBJCT=obj;
				return; 
			}
			if (Gamen0105Status==1) {
				if (FocusOn_TDOBJCT!=null) {
					FocusOn_TDOBJCT.style.background=''; 
				}
				//フォーカスはクリックされたカメラに
				obj.style.background='#BCBAFA'; 
				obj.focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
				FocusOn_TDOBJCT=obj;
				return; 
			}
		} else {
			// セル間移動場合

			if (Gamen0105Status==1) {
				//キー押下の場合

				var kcd = event.keyCode;
				var nco=null;
				switch(kcd) {
					case 37: // 左
						//フォーカスはクリックされたカメラに
						/*obj.parentNode.style.background=''; 
						nco=Get0105NextActiveCel(obj,1,1,1);
						nco.style.background='#BCBAFA';  
						nco.checked = true;
						nco.focus();
						FocusOn_TDOBJCT=nco;*/
						event.returnValue=false;
						break;
					case 9: // tab key
						//フォーカスはクリックされたカメラに
						obj.parentNode.style.background=''; 
						if(event.shiftKey){ //Shift + tab
							nco=Get0105NextActiveCel(obj,1,1,3);
						}else{
							nco=Get0105NextActiveCel(obj,1,1,2);
						}
						nco.style.background='#BCBAFA';  
						nco.checked = true;
						nco.focus();
						last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
						FocusOn_TDOBJCT=nco;
						event.returnValue=false;
						break;
					case 39: //右
						event.returnValue=false;
						break;
					case 38: //上

	
						//フォーカスはクリックされたカメラに
						obj.parentNode.style.background=''; 
						nco=Get0105NextActiveCel(obj,1,1,3);
						nco.style.background='#BCBAFA'; 
						nco.checked = true;
						nco.focus();
						last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
						FocusOn_TDOBJCT=nco;
						event.returnValue=false;
						break;
					case 40: //下
						//フォーカスはクリックされたカメラに
						obj.parentNode.style.background=''; 
						nco=Get0105NextActiveCel(obj,1,1,4);
						nco.style.background='#BCBAFA';  
						nco.checked = true;
						nco.focus();
						last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
						FocusOn_TDOBJCT=nco;
						event.returnValue=false;
						break;
					case 27: //esc key
						if (FocusOn_TDOBJCT!=null) {
							FocusOn_TDOBJCT.style.background=''; 
						}
						FocusOn_TDOBJCT=null;
						Gamen0105Status=0; //セル間移動状態に進入
						isIn0105GroupTable=false;
						stopBubbling(event);	
						document.getElementById("camera0105List").focus();
						last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
						return;
					case 13: //enter key
						if (FocusOn_TDOBJCT!=null) {
							FocusOn_TDOBJCT.style.background=''; 
						}
						FocusOn_TDOBJCT=null;
						Gamen0105Status=0; //セル間移動状態に進入
						isIn0105GroupTable=false;
						stopBubbling(event);	
						document.getElementById("camera0105List").focus();
						last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
						return;
					default:
						return;
						break;
				}
				return; 
			}
		}
	}
	
//カメラ一覧にキー移動時、移動先を探し出す処理
function Get0105NextActiveCel(co,rno,cno,flg) {
	var rowmax =document.getElementsByName("DVR990105check").length;//テーブルにカメラ個数

	rno = parseInt(co.id.substring(7))+1 ;
	var obj=null;
	switch(flg) {
	   case 1: // 左
			rno--;
			if (rno<1) {
				rno=1;
			}
			obj=document.getElementById("check_r" + (rno-1) );
		 break;
	   case 2: // 右
			rno++;
			if (rno>rowmax) {
				rno=rno-1;
			}

			obj=document.getElementById("check_r" + (rno-1) );
		
		 break;
	   case 3: // 上


			rno--;
			if (rno<1) {
				rno=1;
			}
			obj=document.getElementById("check_r" + (rno-1) );
		 break;
	   case 4: // 下
			rno++;
			if (rno>rowmax) {
				rno=rno-1;
			}
			obj=document.getElementById("check_r" + (rno-1) );
		 break;
	   default:
   	}
	return obj;
}

//方向キーにて、フォーカスを遷移させる処理
function change0105Focus(obj,flag) {
	if(flag==1){
		if(Gamen0105Status>0){
			Gamen0105Status =0;
			isIn0105GroupTable=false;
		}
	}else{
		if (Gamen0105Status>0) return; 
		if (isIn0105GroupTable) return;
		//キーコードを取得
		var keyCd = event.keyCode;
		
		//タブキー押下、次の元素がフォーカスをセット
		
		if(keyCd==9 && !isIn0105GroupTable){
			
			if(event.shiftKey){// Shift + tab
				if(obj.id=='camera0105List'){
					stopDefaultling(event);
					return;
				}
				
				var arrLen = Focus0105TagList.length;
				var arrIdx;
				for (arrIdx=0;arrIdx<arrLen;arrIdx++) {
					if (obj.id==Focus0105TagList[arrIdx][0]) {
						stopDefaultling(event);
						document.getElementById(Focus0105TagList[arrIdx-1][0]).focus();
						last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
						return;
					}
				}
				
			}else{		// tab
				if(obj.id=='DVR990105button2'){
					stopDefaultling(event);
					return;
				}
				
				var arrLen = Focus0105TagList.length;
				var arrIdx;
				for (arrIdx=0;arrIdx<arrLen;arrIdx++) {
					if (obj.id==Focus0105TagList[arrIdx][0]) {
						stopDefaultling(event);
						document.getElementById(Focus0105TagList[arrIdx+1][0]).focus();
						last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
						return;
					}
				}
			}
		}
	
		//entry key 
		if (keyCd==13 && !isIn0105GroupTable){
			if(obj.type=="button"){
				//stopBubbling(event);
				return;
			}else{
				isIn0105GroupTable=true;
				stopBubbling(event);
				return;
			}
		}
			
		//37(左)38(上)39(右)40(下)以外、処理しない
		if (keyCd==37 || keyCd==38 || keyCd==39 || keyCd==40 ) {
			var iLoop = 0;
			var tagExistFlg = false;
			//キーが押下したタグ名を探し出す
			for (iLoop=0;iLoop<Focus0105TagList.length;iLoop++) {
				if (obj.id==Focus0105TagList[iLoop][0]) {
					tagExistFlg = true;
					stopDefaultling(event);			
					stopBubbling(event);
					break;
				}
			}
			//存在すれば、下記を処理する

	
			//上方キーの場合、遷移先があるかを判断し、ある場合、遷移する

	
			if (keyCd==38 && tagExistFlg && Focus0105TagList[iLoop][1]!="") { //上

				document.getElementById(Focus0105TagList[iLoop][1]).focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}
			//下方キーの場合、遷移先があるかを判断し、ある場合、遷移する

	
			if (keyCd==40 && tagExistFlg && Focus0105TagList[iLoop][2]!="") { //下
				document.getElementById(Focus0105TagList[iLoop][2]).focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}
			//左方キーの場合、遷移先があるかを判断し、ある場合、遷移する

	
			if (keyCd==37 && tagExistFlg && Focus0105TagList[iLoop][3]!="") { //左
				document.getElementById(Focus0105TagList[iLoop][3]).focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}
			//右方キーの場合、遷移先があるかを判断し、ある場合、遷移する

	
			if (keyCd==39 && tagExistFlg && Focus0105TagList[iLoop][4]!="") { //右
				document.getElementById(Focus0105TagList[iLoop][4]).focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}
		}
	}
}

function td0105OnclickEvent(obj,flag){
	if(flag==1){
		if(document.activeElement.id == "camera0105List"){
			if(Gamen0105Status>0){
				Gamen0105Status =0;
				isIn0105GroupTable=false;
			}
		}
	}
}