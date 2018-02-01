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
var isIn0103GroupTable=false;//Table域フラグ
var Gamen0103Status=0; // 0:初期状態 1:セル間移動状態 2:テキスト入力状態
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
//対象装置の退避用
var OrgMachine;
// 当前カメラリストのカメラ総数
var camCnt = 0;
//イベント発生元、上へ、下へ、左へ、右へ　の順番に格納しておく
var Focus0103TagList = new Array(
	new Array("camera0103List" 			,""				,"DVR990102button1"			,""					,""),
	new Array("DVR990102button1" 	,"camera0103List"	,""							,""					,"DVR990102button2"),
	new Array("DVR990102button2"   	,"camera0103List"	,""							,"DVR990102button1"	,""));

var C0103pop = Class.create();
C0103pop.prototype = {
	initdata: null,
	initialize: function(lp,tp,re,Machine)
	{
		this.FN 					= new FocusNavigator();
		consoleLogOutput(7,"DVR-99-01-03.js",arguments.callee.name,"initialize");
		this.left=lp;
		this.top=tp;
		// 2012/02/29 画像変化検索の場合、パラメータにカメラ再生モードを追加 shono - original
		//this.url="/cgi-bin/DVR-99-01-03.cgi?Machine="+Machine;  // cgi
		// 2012/02/29 画像変化検索の場合、パラメータにカメラ再生モードを追加 shono - start
		//対象装置の退避
		OrgMachine = Machine;
		if(currentPage=="04"){
			this.url="/cgi-bin/DVR-99-01-03.cgi?Machine="+Machine+"&CameraSelectMode="+CameraSelectMode;  // cgi
		} else {
			this.url="/cgi-bin/DVR-99-01-03.cgi?Machine="+Machine;  // cgi
		}
		// 2012/02/29 画像変化検索の場合、パラメータにカメラ再生モードを追加 shono - end
		this.dataset="Result/Camerae/Camera";  // dataset
		this.record=null;// record[0][0]=null;record[1][0]=null;record[2][0],radiobox;
		this.observers = [];
		C0103pop.prototype.initdata=re;
	
		//既にPOPUPが作成されている形跡がある場合、一度初期化を行う
		var thisContainer = document.getElementById('DVR010102Container');
		if(thisContainer){
			thisContainer.parentNode.removeChild(thisContainer);
		}
		var str= "";
		str=str+ "<div id='DVR010102Container' class='wordBackColor borderColor3'";
		str=str+ "style='";
		str=str+ "left:" +this.left +";";
		str=str+ "top:" +this.top +";";
		str=str+ "'>";
		str=str+ "<div class='DVR010102Back wordBackColor' >";
		str=str+ "<div class='DVR010102Border pageBackColor' ></div>";
		str=str+ "<div class='DVR010102Top' id='DVR010102Topname'>" +"対象カメラ" + "</div>";
		//+ "<div class='DVR010102Ds' id=''>" + " "
		str=str+ "<table class='DVR010102Ds'>";
		str=str+ "<tr>";
		str=str+ "<td class='table_tr1_td1 wordBackColor'>選択カメラ";
		str=str+ "</td>";
		str=str+ "<td class='table_tr1_td2 pageBackColor'></td>";
		str=str+ "<td id=\"camera0103List\" onkeydown=\"div0103Evtproc();change0103Focus(this,0);\" tabindex=\"-1\" onclick=\"td0103OnclickEvent(this,1);\" onfocus=\"isIn0103GroupTable=false;Gamen0103Status=0;\">";
		str=str+ "<div  class=\"DVR010301Ds\" >";
		str=str+ "<div id='reg03' spry:region='dsbsc03'>";
		str=str+ "<table  id='dstab03' style='";
		str=str+ "'>";
		str=str+ "</table>";
		str=str+ "</div>";
		str=str+ "</div>";
		str=str+ "</td>";
		str=str+ "</tr>";
		str=str+ "</table>";	
		
		//+ "</div>" +" "
		str=str+ "<div class='DVR010102BtnPs' >";
		str=str+ "<input type='button' name='button1' id='DVR990102button1' onmousedown='doSelf99_03_Click(this)' value='登録' class='big-button' ";
		str=str+ " onkeydown=\"change0103Focus(this,0);\"/>";
		str=str+ "</div>";	
		str=str+ "<div class='DVR010102BtnPs2' >";
		str=str+ "<input type='button' name='button2' id='DVR990102button2' onmousedown='doSelf99_03_Click(this)' value='取消' class='big-button' ";
		str=str+ " onkeydown=\"change0103Focus(this,0);\"/>";
		str=str+ "</div>";	
		str=str+ "<div class='DVR010102BotmFnt pageBackColor' id='DVR010102BotmFnt' >";
		str=str+ "<table>";
		str=str+ "<tr>";
		str=str+ "<td class='message3'>操作ガイド：</td>";
		if(currentPage=="03"){
			str=str+ "<td>サムネイル検索するカメラを１台選択してください。</td>";
		}
		else if(currentPage=="04"){
			str=str+ "<td>画像変化検索するカメラを１台選択してください。</td>";
		}
		else if(currentPage=="05"){
			str=str+ "<td>マルチ再生するカメラを１台選択してください。</td>";
		}
		else{
			str=str+ "<td>指定の場合は［レイアウト］を選択し、検索するカメラをチェックします。</td>";
		}
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
		str=str+ "</div>";
		str=str+"</div>";//Modify 2011-02-22
		str=str+ "</div>";
		document.body.insertAdjacentHTML("beforeEnd",str);
		var dsbsc03 = new Spry.Data.XMLDataSet("", this.dataset);
		dsbsc03.addObserver(this.preparedsbsc);
		dsbsc03.setURL(gUrl+this.url);
		dsbsc03.loadData();

//======画面にかけるカバーの作成=====
		var popUp	= document.getElementById("DVR");
		if( popUp == null )
		{
			popUp			= document.createElement("div") ;
			popUp.id		= "DVR";
			popUp.className	= "DVR";
			document.body.appendChild(popUp) ;
		}
//=============================================

		this.dosomething();	
		// added by hlzhang @ 20110408 specified key action mapping to cancel button click.
		savRetBtn(); 
		identifyRetBtn(document.getElementById("DVR990102button2"));		
		
		
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
		var FN			= this.FN;
		var btn2=Spry.$("DVR990102button2");
		btn2.onclick=function(){

			//ボタン実行中の時、ボタン処理無視
			if( BtnExecuting == true ){
				return;
			} else {
				BtnExecuting = true;
			}
			// カバー非表示
			Spry.$('DVR').style.display					= "none";
			Spry.$('DVR010102Container').style.display	= "none";
			tem.notifyObservers("cancel");
			FN.popFocusInfo(obj);
		    resRetBtn();

			//タブ順番を処理する @ 20110428
			change0103Focus(btn2,1);
			setFatherFocus();
		};
		var btn1=Spry.$("DVR990102button1");
		btn1.onclick=function(){ 

			//ボタン実行中の時、ボタン処理無視
			if( BtnExecuting == true ){
				return;
			} else {
				BtnExecuting = true;
			}
			var x				= document.getElementsByName("DVR990102check");
			tem.record			= new Array(3);
			tem.record[0]		= new Array();
			tem.record[1]		= new Array();
 			tem.record[2]		= new Array();
			tem.record[0][0]	= null;
			tem.record[1][0]	= null;
			var i;
			for( i = 0; i < x.length; i++ )
			{
				if( (x[i].checked) == true )
				{ 
					tem.record[2][0]		= new Array();
					tem.record[2][0][0]		= x[i].value;
					var name				= Spry.$('check03_h'+i).value;
					tem.record[2][0][1]		= Spry.Utils.encodeEntities(name);
					tem.record[2][0][2]		= Spry.$('check03_m'+i).value;
					break;
				}
			}

			// カバー非表示
			Spry.$('DVR').style.display					= "none";
			Spry.$('DVR010102Container').style.display	= "none";

			tem.notifyObservers("ok");

			tem.FN.popFocusInfo(obj);
			//タブ順番を処理する @ 20110428
			change0103Focus(btn1,1);
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
			camCnt = 0;

		if( rows.length > 0){
			while (loop == true) {
				if(rows[jcount] != undefined) {
					//this.Inserdatatrow(x.insertRow(jcount),rows[jcount])
				
					var row=x.insertRow(jcount);
					var data=rows[jcount];
					//	未登録カメラ再生を有の場合（対象装置がセンターのケースを外す）
					if(CameraSelectMode ==1 && OrgMachine != 9){
						var td1=row.insertCell(0);
						var td2=row.insertCell(1);
						var td3=row.insertCell(2);

						document.getElementById('DVR010102Topname').innerHTML="未登録カメラ再生";

						td1.innerHTML="<input type='radio' name='DVR990102check' id='check_r"+ii+"' value='"+data["recId"]+"' onmousedown='doSelf99_03_Click(this)' onKeydown='td0103Evtsproc(this,0)' onclick='td0103Evtsproc(this,1)'/>";
						//td2.innerHTML=data["recId"];
						str="<input type='hidden' name='check03_m' id='check03_m"+ii+"'  value='"+data["recId"]+"' />";
						str=str+"<input type='hidden' name='check03_v' id='check03_h"+ii+"'  value='"+data["Name"]+"' />";
						td3.innerHTML=data["Name"]+str;
						ii++;
						//有効データのみを計算する
						camCnt++;
					}else if((rows[0]["@gid"] != "") && (rows[0]["@gid"] != null)){

						document.getElementById('DVR010102Topname').innerHTML="対象カメラ";

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
						      td1.innerHTML="<input type='radio' name='DVR990102check' id='check_r"+ii+"' value='"+data["Code"]+"' onmousedown='doSelf99_03_Click(this)' onKeydown='td0103Evtsproc(this,0)' onclick='td0103Evtsproc(this,1)'/>";
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
						      td2.innerHTML="<input type='radio' name='DVR990102check' id='check_r"+ii+"' value='"+data["Code"]+"' onmousedown='doSelf99_03_Click(this)' onKeydown='td0103Evtsproc(this,0)' onclick='td0103Evtsproc(this,1)'/>";
						      td3.innerHTML=data["Code"];
						      str="<input type='hidden' name='check03_m' id='check03_m"+ii+"'  value='"+data["recId"]+"' />";
						      str=str+"<input type='hidden' name='check03_v' id='check03_h"+ii+"'  value='"+data["Name"]+"' />";
						      td3.innerHTML=td3.innerHTML+'&nbsp;'+data["Name"]+str;
						      ii++;
						      i_flg=1;
						  }
						}
						//有効データのみを計算する
						camCnt++;
					}
					jcount++;
				} else {
						//	未登録カメラ再生を有の場合（対象装置がセンターのケースを外す）
						if(CameraSelectMode ==1 && OrgMachine != 9){
							document.getElementById('DVR010102Topname').innerHTML="未登録カメラ再生";
						}
						loop = false;
				}
			}
		}
			C0103pop.prototype.init();
			var firstFocus=document.getElementById("camera0103List");
			firstFocus.tabIndex=1;
			firstFocus.focus();
			last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			rescueFocus(top.rightpage.document.getElementById("camera0103List"));
			
			dispInputEventStart();
		}
	},

	init: function()
	{     
		if(C0103pop.prototype.initdata!=null)
		{
			var record=C0103pop.prototype.initdata;
			var x=document.getElementsByName("check03_m");
			var i;
			for(i=0;i<x.length;i++)
			{     if(record[2].length)
			      {
				    if(x[i].value==record[2][0][2])
					{ 
						Spry.$('check_r'+i).checked=true;
						 //document.getElementById('DVR990102Ds').scrollTop=(i)*18;
						break;
						
					}
				  }
					
			
			}
		}
	},
	show :function(mainRecInfo)
	{
		//ボタン非実行中
		BtnExecuting = false;
		/* 現在登録されている情報を再表示する */
		if( mainRecInfo )
		{
			//現在表示しているカメラのラジオボタンをリストにつめる
			var camRadioList	= document.getElementsByName("camera0103List");
			for( i = 0; i < camRadioList.length; i++ )
			{
				if( mainRecInfo[2].length )
				{
					if( camRadioList[i].value == mainRecInfo[2][0][2] )
					{
						//前回選択しているカメラを選択する
						Spry.$('check_r'+i).checked	= true;
						break;
					}
				}
			}
		}

		// カバーを表示する
		Spry.$('DVR').style.display					= "block";
		Spry.$('DVR010102Container').style.display	= "block";
		savRetBtn();  

		identifyRetBtn(document.getElementById("DVR990102button2"));		
		consoleLogOutput(7,"DVR-99-01-03.js",arguments.callee.name,"show_end");
	}
			
};

// マウスダウンの場合
function doSelf99_03_Click(clkObj){
	// 対象が中項目のcheckboxとradio以外の場合、
	if( clkObj.type!="checkbox" && clkObj.type!="radio")
	{
		isIn0103GroupTable=false;//Table域フラグ
		Gamen0103Status=0; // 0:初期状態
	}

	setfocus_click(clkObj);
}


//DIV　KEYが押下された場合、
function div0103Evtproc() {
	// 初期状態以外、反応しない
	if (Gamen0103Status>0) return; 
	//キー押下の場合


	var kcd = event.keyCode;
	if (kcd==13) { //enter key
		Gamen0103Status=1; //セル間移動状態に進入
		
		isIn0103GroupTable=true;
		
		if( camCnt > 0){
			var obj=null;
			// カメラ選択フラグ、初期が未選中
			var checkFlag=false;
			//表示されているカメラを取得
			var camRadObjList=document.getElementsByName("DVR990102check");
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
		}else{
			Gamen0103Status=0;
			isIn0103GroupTable=false;
		}
	}
	if (kcd!=9 && kcd!=8) { //tab key & backspace key
		event.returnValue = false;
	}
}

//TD　KEYが押下され、又はマウスクリックした場合、
	function td0103Evtsproc(obj,mouseflg) {
		//
		if (mouseflg==1) {
			// 初期状態の場合

			
			if (Gamen0103Status==0) {
				Gamen0103Status=1; //セル間移動状態に進入
				isIn0103GroupTable=true;
				//フォーカスはクリックされたカメラに
				obj.style.background='#BCBAFA'; 
				obj.focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
				FocusOn_TDOBJCT=obj;
				return; 
			}
			if (Gamen0103Status==1) {
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

			if (Gamen0103Status==1) {
				//キー押下の場合

				var kcd = event.keyCode;
				var nco=null;
				switch(kcd) {
					case 37: // 左
						//フォーカスはクリックされたカメラに
						/*obj.parentNode.style.background=''; 
						nco=Get0103NextActiveCel(obj,1,1,1);
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
							nco=Get0103NextActiveCel(obj,1,1,3);
						}else{
							nco=Get0103NextActiveCel(obj,1,1,2);
						}
						nco.style.background='#BCBAFA';  
						nco.checked = true;
						nco.focus();
						last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
						FocusOn_TDOBJCT=nco;
						event.returnValue=false;
						break;
					case 39: //右
						//フォーカスはクリックされたカメラに
						/*obj.parentNode.style.background=''; 
						nco=Get0103NextActiveCel(obj,1,1,2);
						nco.style.background='#BCBAFA';  
						nco.checked = true;
						nco.focus();
						FocusOn_TDOBJCT=nco;*/
						event.returnValue=false;
						break;
					case 38: //上

	
						//フォーカスはクリックされたカメラに
						obj.parentNode.style.background=''; 
						nco=Get0103NextActiveCel(obj,1,1,3);
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
						nco=Get0103NextActiveCel(obj,1,1,4);
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
						Gamen0103Status=0; //セル間移動状態に進入
						isIn0103GroupTable=false;
						stopBubbling(event);	
						document.getElementById("camera0103List").focus();
						last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
						return;
					case 13: //enter key
						if (FocusOn_TDOBJCT!=null) {
							FocusOn_TDOBJCT.style.background=''; 
						}
						FocusOn_TDOBJCT=null;
						Gamen0103Status=0; //セル間移動状態に進入
						isIn0103GroupTable=false;
						stopBubbling(event);	
						document.getElementById("camera0103List").focus();
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
function Get0103NextActiveCel(co,rno,cno,flg) {
	var rowmax =document.getElementsByName("DVR990102check").length;//テーブルにカメラ個数

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
function change0103Focus(obj,flag) {
	if(flag==1){
		if(Gamen0103Status>0){
			Gamen0103Status =0;
			isIn0103GroupTable=false;
		}
	}else{
		if (Gamen0103Status>0) return; 
		if (isIn0103GroupTable) return;
		//キーコードを取得
		var keyCd = event.keyCode;
		
		//タブキー押下、次の元素がフォーカスをセット
		
		if(keyCd==9 && !isIn0103GroupTable){
			
			if(event.shiftKey){// Shift + tab
				if(obj.id=='camera0103List'){
					stopDefaultling(event);
					//document.getElementById("DVR990102button2").focus();
					return;
				}
				
				var arrLen = Focus0103TagList.length;
				var arrIdx;
				for (arrIdx=0;arrIdx<arrLen;arrIdx++) {
					if (obj.id==Focus0103TagList[arrIdx][0]) {
						stopDefaultling(event);
						document.getElementById(Focus0103TagList[arrIdx-1][0]).focus();
						last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
						return;
					}
				}
				
			}else{		// tab
				if(obj.id=='DVR990102button2'){
					stopDefaultling(event);
					//document.getElementById("camera0103List").focus();
					return;
				}
				
				var arrLen = Focus0103TagList.length;
				var arrIdx;
				for (arrIdx=0;arrIdx<arrLen;arrIdx++) {
					if (obj.id==Focus0103TagList[arrIdx][0]) {
						stopDefaultling(event);
						document.getElementById(Focus0103TagList[arrIdx+1][0]).focus();
						last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
						return;
					}
				}
			}
		}
	
		//entry key 
		if (keyCd==13 && !isIn0103GroupTable){
			if(obj.type=="button"){
				//stopBubbling(event);
				return;
			}else{
				if( (camCnt > 0) && (FocusOn_TDOBJCT !=null) ){
					isIn0103GroupTable=true;
					stopBubbling(event);
					return;
				}else{
					stopDefaultling(event);
					stopBubbling(event);
					return;
				}
			}
		}
			
		//37(左)38(上)39(右)40(下)以外、処理しない
		if (keyCd==37 || keyCd==38 || keyCd==39 || keyCd==40 ) {
			var iLoop = 0;
			var tagExistFlg = false;
			//キーが押下したタグ名を探し出す
			for (iLoop=0;iLoop<Focus0103TagList.length;iLoop++) {
				if (obj.id==Focus0103TagList[iLoop][0]) {
					tagExistFlg = true;
					stopDefaultling(event);			
					stopBubbling(event);
					break;
				}
			}
			//存在すれば、下記を処理する

	
			//上方キーの場合、遷移先があるかを判断し、ある場合、遷移する

	
			if (keyCd==38 && tagExistFlg && Focus0103TagList[iLoop][1]!="") { //上

				document.getElementById(Focus0103TagList[iLoop][1]).focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}
			//下方キーの場合、遷移先があるかを判断し、ある場合、遷移する

	
			if (keyCd==40 && tagExistFlg && Focus0103TagList[iLoop][2]!="") { //下
				document.getElementById(Focus0103TagList[iLoop][2]).focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}
			//左方キーの場合、遷移先があるかを判断し、ある場合、遷移する

	
			if (keyCd==37 && tagExistFlg && Focus0103TagList[iLoop][3]!="") { //左
				document.getElementById(Focus0103TagList[iLoop][3]).focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}
			//右方キーの場合、遷移先があるかを判断し、ある場合、遷移する

	
			if (keyCd==39 && tagExistFlg && Focus0103TagList[iLoop][4]!="") { //右
				document.getElementById(Focus0103TagList[iLoop][4]).focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}
		}
	}
}

function td0103OnclickEvent(obj,flag){
	if(flag==1){
		if(document.activeElement.id == "camera0103List"){
			if(Gamen0103Status>0){
				Gamen0103Status =0;
				isIn0103GroupTable=false;
			}
		}
	}
}