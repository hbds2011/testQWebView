// JavaScript Document
// JavaScript Document
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
var isInGroupTable=false;//Table域フラグ
var GamenStatus=0; // 0:初期状態 1:セル間移動状態 2:テキスト入力状態
var FocusOn_TDOBJCT=null;
var lockMark = false;
// 当前カメラリストのカメラ総数
var camCnt = 0;

//イベント発生元、上へ、下へ、左へ、右へ　の順番に格納しておく
//            イベント発生元		↑						↓						←					→
//            対象カメラ			なし					選択カメラ				なし				なし
//            選択カメラ			対象カメラ				登録ボタン				なし				なし
//            登録ボタン			選択カメラ				なし					なし				取消ボタン
//            取消ボタン			なし					なし					登録ボタン			なし
var Focus0102TagList = new Array(
	new Array("cameraConditionsList",""						,"cameraList"			,""					,""),
	new Array("cameraList"   		,"cameraConditionsList"	,"DVR990103button1"		,""					,""),
	new Array("DVR990103button1"	,"cameraList"			,""						,""					,"DVR990103button2"),
	new Array("DVR990103button2"	,"cameraList"			,""					    ,"DVR990103button1"	,""));

var tab0102IdSequence = new Array(
			"cameraConditionsList",
			"cameraList",
			"DVR990103button1",
			"DVR990103button2")	;

//            発生元		↑			  ↓			 ←				 →
//            全て			なし		  指定カメラ	 なし			 指定カメラ
//            指定カメラ	全て		  なし			 全て			 なし
var camera0102CondFocusList = new Array(
	new Array("DVR990103r1",""			 ,"DVR990103r2"	 ,""			,"DVR990103r2"),
	new Array("DVR990103r2","DVR990103r1",""			 ,"DVR990103r1"	,""));

// 予約コピー画面表示中フラグ
var SpecialCopyConfigPage = false;
// ボタン処理中フラグ
var BtnExecuting = false;
// ダイレクトコピー最大16台制限のフラグ
var CopyMaxNumFlg = false;
// 画像コピー最大64台制限のフラグ
var ImageCopyMaxNumFlg = false;
var C0102pop = Class.create();
C0102pop.prototype = {
	initdata: null,
	initialize: function(lp,tp,DVR,re,Machine)
	{
		consoleLogOutput(7,"DVR-99-01-02.js",arguments.callee.name,"initialize");
		this.FN = new FocusNavigator();
		this.left=lp;
		this.top=tp;
		if(DVR==0){
			this.url="/cgi-bin/DVR-99-01-02.cgi?DVR-99-01-02-00="+DVR+"&Machine="+Machine;
			if( SpecialCopyConfigPage == true )
			{
				this.url = this.url + "&FromCopy=1";
			}
		}else if(DVR==1){
			this.url="/cgi-bin/DVR-99-01-01.cgi";
		}
		var mFlag=mainMenucreate();
		if(mFlag==0){ //アナログモニターの場合
			document.getElementById("DVR-99-02-01css").href="../DVR-99/DVR-99-02-01-VGA.css";
		}else if(mFlag==3){ //アナログモニター(デカ文字)の場合
			document.getElementById("DVR-99-02-01css").href="../DVR-99/DVR-99-02-01-VGA-BIG.css";
		}else if(mFlag==2){ //デジタルモニター(4:3)の場合
			document.getElementById("DVR-99-02-01css").href="../DVR-99/DVR-99-02-01-BIG.css";
		}else{ //デジタルモニター(16:9)の場合
			document.getElementById("DVR-99-02-01css").href="../DVR-99/DVR-99-02-01.css";
		}
		this.record=null;// record[0][0]=1,全;record[0][0]=0,指定;record[1][0],null;record[2][0],checkbox;
		this.observers = [];
		var cpop=this;
		C0102pop.prototype.initdata=re;
		
		//既にPOPUPが作成されている形跡がある場合、一度初期化を行う
		var thisContainer = document.getElementById('DVR010103Container');
		if(thisContainer){
			thisContainer.parentNode.removeChild(thisContainer);
		}
		
		var str= ""
		+ "<div id='DVR010103Container' class='wordBackColor'" +" "
		+ "style='" + ""
		+ "left:" +this.left +";"
		+ "top:" +this.top +";"
		+ "'>" +" "
		
		+ "<div class='DVR010103Back wordBackColor'>"  + " "
		+ "<div class='div_form1 pageBackColor'>"+ " "
		+ "    <table  class=\"pageBackColor\" style=\"margin-left:7px;\">"+ " "
		+ "    <tr class='table_tr1'></tr>"+ " "
		+ "        <tr class='table_tr2'>"+ " "
		+ "            <td class='table_tr2_td1'>対象カメラ</td>"+ " "
		+ "            <td class='table_tr2_td2'></td>"+ " "
		+ "            <td class='table_tr2_td3' id='cameraConditionsList' onkeydown='div0102Evtproc(0);change0102Focus(this,0);' onclick='td0102CameraListOn();td0102OnclickEvent(this,1);' onfocus='isInGroupTable=false;GamenStatus=0;' tabIndex=\"-1\">" +" "
		+ "<table style='border-spacing:0px;' cellpadding='0px;'><tr><td class='td_width_cam2'></td><td>"+ " "
		+ "<input type='radio'name='DVR990103rad' id='DVR990103r1' value='0' checked='checked' onkeydown='td0102CameraListOn();changeCamera0102CondFocus(this,0);' onmousedown='doSelf99_02_Click(this)' /></td><td style='padding-left:8px;'>全て</td><td class='td_width_cam2'></td>"+ " "
		+ "<td><input type='radio'name='DVR990103rad' id='DVR990103r2' value='1'  onkeydown='td0102CameraListOn();changeCamera0102CondFocus(this,0);' onmousedown='doSelf99_02_Click(this)'/></td><td style='padding-left:8px;'>指定カメラ</td>"+ " "
		+ "<td class='td_width_cam2'></td></tr></table>"+ " "
		+ "            </td>"+ " "
		+ "        </tr>"+ " "
		+ "        <tr class='table_tr1'></tr>"+ " "
		//+ "        <tr class='table_tr4'></tr>"+ " "
		+ "        <tr class='table_tr5'>"+ " "
		+ "            <td style=\"background-color:#333333; text-align:center;\">選択カメラ</td>"+ " "
		+ "            <td class='table_tr2_td2'></td>"+ " "
		+ "            <td class=\"wordBackColor\" id='cameraList' onkeydown='div0102Evtproc(1);change0102Focus(this,0);' onclick='td0102OnclickEvent(this,1);' tabIndex=\"-1\">"+ " "
		+ "<div class='DVR010103Ds' id='DVR010103Ds'>" + " "
		+ "<div id='reg02' spry:region='dsbsc02'>"  + " "
		+ "<div ><table  id=\"dstab02\" style=\"border:0px;\">"+ " "
		+ "                    </table></div>"+ " "
		+ "                </div>"+ " "
		+ "                </div>"+ " "
		+ "        	</td>"+ " "
		+ "        "+ " "
		+ "        </tr>"+ " "
		+ "    "+ " "
		+ "    </table>"+ " "
		+"    "+ " "
		+"    </div>"+ " "
		+"    <table class='DVR010102BotmFnt'>"+ " ";
		// コピー最大16台の制限がある
		if( CopyMaxNumFlg == true )
		{
			// 操作ガイド表示後、フラグをリセットする
			CopyMaxNumFlg = false;
			str = str + "        <tr>"+ " "
			+"            <td class='message2'>操作ガイド：</td>"
			+"<td>同時にコピー実行するカメラは、16台以下にしてください。</td>"+ " "
			+"        </tr>"+ " "
			+"        <tr>"+ " "
			+"            <td>&nbsp;</td><td>&nbsp;</td>"+ " "
			+"        </tr>";
		}
		// 未登録モードの場合、画像コピー最大64台の制限がある
		else if( ImageCopyMaxNumFlg == true )
		{
			// 操作ガイド表示後、フラグをリセットする
			ImageCopyMaxNumFlg = false;
			str = str + "        <tr>"+ " "
			+"            <td class='message2'>操作ガイド：</td>"
			+"<td>同時にコピー実行するカメラは、64台以下にしてください。</td>"+ " "
			+"        </tr>"+ " "
			+"        <tr>"+ " "
			+"            <td>&nbsp;</td><td>&nbsp;</td>"+ " "
			+"        </tr>";
		}
		else
		{
			// (PH3対応内容) 画像コピー最大16台の制限が削除される。
			SpecialCopyConfigPage = false;
			str = str + "        <tr>"+ " "
			+"            <td class='message2'>操作ガイド：</td>"
			+"<td>指定の場合は、検索するカメラをチェック選択します。</td>"+ " "
			+"        </tr>"+ " "
			+"        <tr>"+ " "
			+"            <td>&nbsp;</td>"
			+"            <td>全ての場合は「カメラ」を指定する事はできません。</td>"
			+"        </tr>";
		}

		str = str + "    </table>"+ " "
		+"    <div class=\"DVR010103BtnPs\" >"+ " "
		+"        <input type='button' name='button02-1' id='DVR990103button1' onmousedown='doSelf99_02_Click(this)' value='登録' class=\"big-button\" "+ " "
		+"         onkeydown='change0102Focus(this);'/>"+ " "
		+"    </div>"+ " "
		+"    <div class=\"DVR010103BtnPs2\" >"+ " "
		+"        <input type='button' name='button02-2' id='DVR990103button2' onmousedown='doSelf99_02_Click(this)' value='取消' class=\"big-button\" "+ " "
		+"        onkeydown='change0102Focus(this);'/>"+ " "
		+"      </div>"+ " "
		+"    </div>"+ " "
		+ "</div>";
		document.body.insertAdjacentHTML("beforeEnd",str);
		var dsbsc02 = new Spry.Data.XMLDataSet("", "Result/Camerae/Camera");
		dsbsc02.addObserver(this.preparedsbsc);
		dsbsc02.setURL(gUrl+this.url);
		dsbsc02.loadData();

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
	},
	dosomething :function()
	{   
		var tem=this;
		var FN			= this.FN;
		var obj;
		if(Spry.$("DVR-01-07-00-03"))
		{
			obj	=Spry.$("DVR-01-07-00-03");
		}
		if(Spry.$("DVR-01-08-00-01"))
		{
			obj	=Spry.$("DVR-01-08-00-01");
		}
		if(Spry.$("DVR-01-09-00-01"))
		{
			obj	=Spry.$("DVR-01-09-00-01");
		}
		if(Spry.$("DVR-01-10-00-02"))
		{
			obj	=Spry.$("DVR-01-10-00-02");
		}
		var btn2=Spry.$("DVR990103button2");
		btn2.onclick=function(){

			//ボタン実行中の時、ボタン処理無視
			if( BtnExecuting == true ){
				return;
			} else {
				BtnExecuting = true;
			}
			// カバー非表示
			Spry.$('DVR').style.display					= "none";
			Spry.$('DVR010103Container').style.display	= "none";
			tem.notifyObservers("cancel");
			FN.popFocusInfo(obj);
			resRetBtn();
			change0102Focus(btn2,1);
			setTimeout('setFatherFocus()',800);
			last_focus	= document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
		};
		var btn1=Spry.$("DVR990103button1");
		btn1.onclick=function(){

			//ボタン実行中の時、ボタン処理無視
			if( BtnExecuting == true ){
				return;
			} else {
				BtnExecuting = true;
			}
			// カバー非表示
			Spry.$('DVR').style.display	= "none";

			var x						= document.getElementsByName("DVR990103check");
			tem.record					= new Array(3);
			tem.record[0]				= new Array();
			tem.record[1]				= new Array();
			tem.record[2]				= new Array();
			if( (document.getElementsByName("DVR990103rad")[0].checked) == true )
				tem.record[0][0]	= 0;
			else
				tem.record[0][0]	= 1;
			var j	= 0;
			var i;
			for( i = 0; i < x.length; i++ )
			{
				if( (tem.record[0][0] == 0) || ( x[i].checked) == true )
				{ 
					tem.record[2][j]		= new Array();
					tem.record[2][j][0]		= x[i].value;
					var name				= Spry.$('check02_h'+i).value;
					tem.record[2][j][1]		= Spry.Utils.encodeEntities(name);
					tem.record[2][j][2]		= Spry.$('check02_m'+i).value;
					j++;
				}
			}
			Spry.$('DVR010103Container').style.display	= "none";
//20120906 nakazono mod >>
//			tem.notifyObservers("ok");
//			FN.popFocusInfo(obj);
//			change0102Focus(btn1,1);
//			last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
//20120906 nakazono mod <<>>
			//カメラ選択した後、リモコンの[取消]キーが無効になることを修正する
			resRetBtn();
			var result_obs = tem.notifyObservers("ok");
			if((result_obs!=undefined) && (result_obs != 1)){
				FN.popFocusInfo(obj);
				change0102Focus(btn1,1);
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}
//20120906 nakazono mod <<
		};
		var rad1=Spry.$("DVR990103r1");
			rad1.onclick=function(){ 
			
			var x=document.getElementsByName("DVR990103check");
			
			var i;
			
			
			for(i=0;i<x.length;i++)
			{
				x[i].disabled=true;
				//カメラを全て選択状態にする
				x[i].checked = true;
				
			}
			changeCamera0102CondFocus(rad1,1);
			
			};
		var rad2=document.getElementById("DVR990103r2");
			rad2.onclick=function(){ 
			var x=document.getElementsByName("DVR990103check");
			
			var i;
			for(i=0;i<x.length;i++)
			{
				x[i].disabled=false;
				// カメラを全て非選択にする
				x[i].checked=false;
					
			}
			
			changeCamera0102CondFocus(rad2,1);
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
		//preare select elements
		var jcount = 0;
		var ii=0;
		var str="";
		var loop = true;
		var rows = dataSet.getData();		
		var x=document.getElementById('dstab02');
		var i_flg=0;
		camCnt = 0;
		if( rows.length > 0 ){
			while (loop == true) {
			    if(rows[jcount] != undefined) {
					var row=x.insertRow(jcount);
					var data=rows[jcount];

					if(CameraSelectMode ==1){
					    if(data["@gid"]!=data["Code"])
					    {
						var td1=row.insertCell(0);
						var td2=row.insertCell(1);
		//				var td3=row.insertCell(2);

						td1.innerHTML="<input type='checkbox' name='DVR990103check'  id='check02_n"+ii+"' value='"+data["Code"]+"' onKeydown='td0102Evtsproc(this,0)' onmousedown='doSelf99_02_Click(this)' onClick='td0102Evtsproc(this,1)' tabIndex=\"-1\" />"	;
		//				td2.innerHTML=data["Code"];
						str="<input type='hidden' name='check02_m' id='check02_m"+ii+"'  value='"+data["recId"]+"' />";
						str=str+"<input type='hidden' name='check02_v' id='check02_h"+ii+"'  value='"+data["Name"]+"' />";
						td2.innerHTML=data["Name"]+str;
						ii++;
						camCnt++;
					    }
				    } else if( (rows[0]["@gid"] != "") && (rows[0]["@gid"] != null) ){
					    if(data["@gid"]==data["Code"])
					    {

						row.innerHTML="<td colspan='3'>" + data["Name"] + "</td>";
						i_flg=0;
					    }
					    else
					    {
						  	if(data["@gid"] == 0) {
							    var td1=row.insertCell(0);
							    var td2=row.insertCell(1);
							    var td3=row.insertCell(2);

						    	    td1.innerHTML="<input type='checkbox' name='DVR990103check'  id='check02_n"+ii+"' value='"+data["Code"]+"' onKeydown='td0102Evtsproc(this,0)' onmousedown='doSelf99_02_Click(this)' onClick='td0102Evtsproc(this,1)' tabIndex=\"-1\" />"	;
						    	    td2.innerHTML=data["Code"];
						    	    str="<input type='hidden' name='check02_m' id='check02_m"+ii+"'  value='"+data["recId"]+"' />";
						    	    str=str+"<input type='hidden' name='check02_v' id='check02_h"+ii+"'  value='"+data["Name"]+"' />";
						    	    td3.innerHTML=data["Name"]+str;
						    	    ii++;
						  	} else {
							    var td1=row.insertCell(0);
							    var td2=row.insertCell(1);
							    var td3=row.insertCell(2);

							    if (i_flg == 0) {
						    	        td1.innerHTML="└";
							    } else {
						    	        td1.innerHTML="　";
							    }
						    	    td2.innerHTML="<input type='checkbox' name='DVR990103check'  id='check02_n"+ii+"' value='"+data["Code"]+"' onKeydown='td0102Evtsproc(this,0)' onmousedown='doSelf99_02_Click(this)' onClick='td0102Evtsproc(this,1)' tabIndex=\"-1\" />"	;
						    	    td3.innerHTML=data["Code"];
						    	    str="<input type='hidden' name='check02_m' id='check02_m"+ii+"'  value='"+data["recId"]+"' />";
						    	    str=str+"<input type='hidden' name='check02_v' id='check02_h"+ii+"'  value='"+data["Name"]+"' />";
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
					loop = false;
			    }
			}
		}
		C0102pop.prototype.init();
		document.getElementById("cameraConditionsList").focus();
		last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
		rescueFocus(top.rightpage.document.getElementById("cameraConditionsList"));

		dispInputEventStart();
		}
	},
	init: function()
	{     

	    if(C0102pop.prototype.initdata!=null)
		{
			var record=C0102pop.prototype.initdata;
			var i;
			var j;
			//record[0][0] == 0 の場合は、全てを選択している状態
			if(record[0][0]==0)
			{
				//全てのラジオボタンをチェック状態にする
				document.getElementsByName("DVR990103rad")[0].checked=true;
//20120905 nakazono add >>
				document.getElementById("cameraList").className = "wordBackColor disFocus";
//20120905 nakazono add <<
				//表示されているカメラを取得(チェックボックスをリスト状態で取得)
				var x=document.getElementsByName("DVR990103check");
				for(i=0;i<x.length;i++)
				{
					//全てが選択されているので、ディム表示にする
					x[i].disabled=true;
					//全てが選択されているので、チェック状態に設定する
					x[i].checked = true;
				}
			}
			else
			{
				//指定のラジオボタンをチェック状態にする
				document.getElementsByName("DVR990103rad")[1].checked=true;
//20120905 nakazono add >>
				document.getElementById("cameraList").className = "wordBackColor";
//20120905 nakazono add <<
				//表示されているカメラを取得(チェックボックスをリスト状態で取得)
				var x=document.getElementsByName("DVR990103check");
				//表示されているカメラの隠し項目チェックボックスをリスト状態で取得
				var h=document.getElementsByName("check02_m");
				//前回表示値のリスト分ループさせる
				for(i=0;i<record[2].length;i++)
				{
					//表示されているカメラのリスト分ループさせる
					for(j=0;j<h.length;j++)
					{
						x[j].disabled=false;
						//前回表示値と値が合致すれば、チェックを入れる
						if(h[j].value==record[2][i][2])
						{
							x[j].checked=true;
							if(i==0)
							document.getElementById('DVR010103Ds').scrollTop=(j)*18;
							
						}
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
		// mainRecInfoを設定しない場合、前回対象カメラを表示し、未登録で画面を閉じても再表示すると値を保持している為
		// 表示毎に値を設定する様に対応
		if(mainRecInfo){
			if(mainRecInfo[0][0]==0)
			{
				//全てのラジオボタンをチェック状態にする
				document.getElementsByName("DVR990103rad")[0].checked=true;
				//表示されているカメラを取得(チェックボックスをリスト状態で取得)
				var camChkObjList=document.getElementsByName("DVR990103check");
				for( i = 0; i < camChkObjList.length; i++)
				{
					//全てが選択されているので、ディム表示にする
					camChkObjList[i].disabled=true;
					//全てが選択されているので、チェック状態に設定する
					camChkObjList[i].checked = true;
				}
			}
			else
			{
				//指定のラジオボタンをチェック状態にする
				document.getElementsByName("DVR990103rad")[1].checked=true;
				//表示されているカメラを取得(チェックボックスをリスト状態で取得)
				var camChkObjList=document.getElementsByName("DVR990103check");
				//表示されているカメラの隠し項目チェックボックスをリスト状態で取得
				var camHdnObjList=document.getElementsByName("check02_m");
				
				//表示されているカメラのリスト分ループさせる
				for(i = 0; i < camChkObjList.length; i++)
				{
					camChkObjList[i].disabled = false;
					//一旦チェックをはずす状態を作る
					camChkObjList[i].checked = false;
					
					//登録されている機器記録IDと合致すればチェックを入れる
					for(j = 0; j < mainRecInfo[2].length; j++)
					{
						if(mainRecInfo[2][j][2] && mainRecInfo[2][j][2] != undefined)
						{
							if(camHdnObjList[i].value == mainRecInfo[2][j][2])
							{
								camChkObjList[i].checked = true;
							}
						}
					}
				}
			}
		}
		// カバーを表示する
		Spry.$('DVR').style.display					= "block";
		Spry.$('DVR010103Container').style.display	= "block";
		savRetBtn();  
		identifyRetBtn(document.getElementById("DVR990103button2"));
		this.FN.pushFocusInfo(null, document.getElementById("DVR010103Container"), null, null);
		// 画面初期フォーカスの設定を行う
		var firstFocus=document.getElementById("cameraConditionsList");
		firstFocus.focus();
		last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
	}
			
};

// マウスダウンの場合
function doSelf99_02_Click(clkObj){
	// 対象が中項目のcheckboxとradio以外の場合、
	if( clkObj.type!="checkbox" && clkObj.type!="radio")
	{
		isInGroupTable=false;//Table域フラグ
		GamenStatus=0; // 0:初期状態
	}

	setfocus_click(clkObj);
}

//DIV　KEYが押下された場合、
function div0102Evtproc(flg) {
	// 初期状態以外、反応しない
	if (GamenStatus>0) return; 
	//キー押下の場合


	var kcd = event.keyCode;
	if (kcd==13) { //enter key
		GamenStatus=1; //セル間移動状態に進入
		isInGroupTable=true;
		
		var obj=null;
		//フォーカスは一番目カメラに
		if(flg == 0){ //対象カメラ
			obj=document.getElementById("DVR990103r1");
			if(!obj.checked){
				obj=document.getElementById("DVR990103r2");
			}
			obj.style.background='#BCBAFA'; 
			obj.focus();
			last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			FocusOn_TDOBJCT=obj;
		}else{//選択カメラ
			if( camCnt > 0){
				obj=document.getElementById("check02_n0");
				if(!obj.disabled){
					obj.style.background='#BCBAFA'; 
					obj.focus();
					last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
					FocusOn_TDOBJCT=obj;
				}else{
					GamenStatus=0;	
					isInGroupTable=false;
				}
			}else{
				GamenStatus=0;	
				isInGroupTable=false;
			}
		}
			stopDefaultling(event);
	}
	if (kcd!=9 && kcd!=8) { //tab key & backspace key
			stopDefaultling(event);
	}
}

//TD　KEYが押下され、又はマウスクリックした場合、
function td0102Evtsproc(obj,mouseflg) {
	//
	if (mouseflg==1) {
		
		// 初期状態の場合

		if (GamenStatus==0) {
			GamenStatus=1; //セル間移動状態に進入
			isInGroupTable=true;
			//フォーカスはクリックされたカメラに
			obj.style.background='#BCBAFA'; 
			obj.focus();
			last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			FocusOn_TDOBJCT=obj;
			//stopBubbling(event);
			return; 
		}
		
		if (GamenStatus==1) {
			if (FocusOn_TDOBJCT!=null) {
				FocusOn_TDOBJCT.style.background=''; 
			}
			//フォーカスはクリックされたカメラに
			obj.style.background='#BCBAFA'; 
			obj.focus();
			last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			FocusOn_TDOBJCT=obj;
			//stopBubbling(event);
			return; 
		}
	} else {

		// セル間移動場合

		if (GamenStatus==1) {
			//キー押下の場合

			var kcd = event.keyCode;
			var nco=null;
			switch(kcd) {
				case 37: // 左
					//フォーカスはクリックされたカメラに
					/*obj.parentNode.style.background=''; 
					nco=GetNext0102ActiveCel(obj,1,1,1);
					nco.style.background='#BCBAFA';  
					nco.focus();
					FocusOn_TDOBJCT=nco;*/
					event.returnValue=false;
					break;
				case 9: // tab key
					//フォーカスはクリックされたカメラに
					obj.parentNode.style.background=''; 
					if(event.shiftKey){ //Shift + tab
						nco=GetNext0102ActiveCel(obj,1,1,3);
					}else{
						nco=GetNext0102ActiveCel(obj,1,1,2);
					}
					nco.style.background='#BCBAFA';  
					nco.focus();
					last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
					FocusOn_TDOBJCT=nco;
					event.returnValue=false;
					break;
				case 39: //右
					/*//フォーカスはクリックされたカメラに
					obj.parentNode.style.background=''; 
					nco=GetNext0102ActiveCel(obj,1,1,2);
					nco.style.background='#BCBAFA';  
					nco.focus();
					FocusOn_TDOBJCT=nco;*/
					event.returnValue=false;
					break;
				case 38: //上


					//フォーカスはクリックされたカメラに
					obj.parentNode.style.background=''; 
					nco=GetNext0102ActiveCel(obj,1,1,3);
					nco.style.background='#BCBAFA';  
					nco.focus();
					last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
					FocusOn_TDOBJCT=nco;
					event.returnValue=false;
					break;
				case 40: //下
					//フォーカスはクリックされたカメラに
					obj.parentNode.style.background=''; 
					nco=GetNext0102ActiveCel(obj,1,1,4);
					nco.style.background='#BCBAFA';  
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
					GamenStatus=0; //セル間移動状態に進入

					isInGroupTable=false;
					stopBubbling(event);	
					document.getElementById("cameraList").focus();
					last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
					return;
				case 13: //enter key
					// checkBox チェック状態変更される

					if (document.getElementById(obj.id).checked == true) {
						document.getElementById(obj.id).checked = false;
					}else{
						document.getElementById(obj.id).checked= true;
					}
					//submitしない
					stopBubbling(event);
					event.returnValue=false;
					break;
				default:
					return;
					break;
			}
			return; 
		}
	}
}
	
//カメラ一覧にキー移動時、移動先を探し出す処理
function GetNext0102ActiveCel(co,rno,cno,flg) {
	var rowmax =document.getElementsByName("DVR990103check").length;//テーブルにカメラ個数

	rno = parseInt(co.id.substring(9))+1 ;
	var obj=null;
	switch(flg) {
	   case 1: // 左
			rno--;
			if (rno<1) {
				rno=1;
			}
			obj=document.getElementById("check02_n" + (rno-1) );
		 break;
	   case 2: // 右
			rno++;
			if (rno>rowmax) {
				rno=rno-1;
			}

			obj=document.getElementById("check02_n" + (rno-1) );
		
		 break;
	   case 3: // 上


			rno--;
			if (rno<1) {
				rno=1;
			}
			obj=document.getElementById("check02_n" + (rno-1) );
		 break;
	   case 4: // 下
			rno++;
			if (rno>rowmax) {
				rno=rno-1;
			}
			obj=document.getElementById("check02_n" + (rno-1) );
		 break;
	   default:
   	}
	return obj;
}

//方向キーにて、フォーカスを遷移させる処理
function change0102Focus(obj,flag) {
	if(flag==1){
		if(GamenStatus>0){
			GamenStatus =0;

			isInGroupTable=false;
		}

	}else{	
		if (GamenStatus>0) return; 
		if (isInGroupTable) return;
		//キーコードを取得
		var keyCd = event.keyCode;
		
		var condFlg = document.getElementById("DVR990103r1").checked;
		
		//タブキー押下、次の元素がフォーカスをセット
		if(keyCd==9 && !isInGroupTable){
			
			if(event.shiftKey){// Shift + tab
				if(obj.id=='cameraConditionsList'){
					stopDefaultling(event);
					//document.getElementById("DVR990103button2").focus();
					return;
				}
				
				var arrLen = Focus0102TagList.length;
				var arrIdx;
				for (arrIdx=0;arrIdx<arrLen;arrIdx++) {
					if (obj.id==Focus0102TagList[arrIdx][0]) {
						stopDefaultling(event);
						document.getElementById(Focus0102TagList[arrIdx-1][0]).focus();
						last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
						return;
					}
				}
				
			}else{		// tab
				if(obj.id=='DVR990103button2'){
					stopDefaultling(event);
					//document.getElementById("cameraConditionsList").focus();
					return;
				}
				
				var arrLen = Focus0102TagList.length;
				var arrIdx;
				for (arrIdx=0;arrIdx<arrLen;arrIdx++) {
					if (obj.id==Focus0102TagList[arrIdx][0]) {
						stopDefaultling(event);
						document.getElementById(Focus0102TagList[arrIdx+1][0]).focus();
						last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
						return;
					}
				}
			}
		}
	
		//entry key 
		if (keyCd==13 && !isInGroupTable){
			if(obj.type=="button"){
				//stopBubbling(event);
				return;
			}else{
				if( (camCnt > 0) && (FocusOn_TDOBJCT != null) ){
					isInGroupTable=true;
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
			for (iLoop=0;iLoop<Focus0102TagList.length;iLoop++) {
				if (obj.id==Focus0102TagList[iLoop][0]) {
					tagExistFlg = true;
					stopDefaultling(event);			
					stopBubbling(event);
					break;
				}
			}
			//存在すれば、下記を処理する

	
			//上方キーの場合、遷移先があるかを判断し、ある場合、遷移する

	
			if (keyCd==38 && tagExistFlg && Focus0102TagList[iLoop][1]!="") { //上
				document.getElementById(Focus0102TagList[iLoop][1]).focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}
			//下方キーの場合、遷移先があるかを判断し、ある場合、遷移する

	
			if (keyCd==40 && tagExistFlg && Focus0102TagList[iLoop][2]!="") { //下
				document.getElementById(Focus0102TagList[iLoop][2]).focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}
			//左方キーの場合、遷移先があるかを判断し、ある場合、遷移する

	
			if (keyCd==37 && tagExistFlg && Focus0102TagList[iLoop][3]!="") { //左
				document.getElementById(Focus0102TagList[iLoop][3]).focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}
			//右方キーの場合、遷移先があるかを判断し、ある場合、遷移する

	
			if (keyCd==39 && tagExistFlg && Focus0102TagList[iLoop][4]!="") { //右
				document.getElementById(Focus0102TagList[iLoop][4]).focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}
		}
	}
}

//対象カメラ区域に、方向キーにて、フォーカスを遷移させる処理
function changeCamera0102CondFocus(obj,flag)
{
	if( flag == 1 )
	{
		if( GamenStatus == 0 )
		{
			GamenStatus		= 1;
			isInGroupTable	= true;
		}
		obj.focus();
		last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
	}
	else
	{
		 //セル間移動場合
		if ( GamenStatus == 0 ) return; 
		if ( !isInGroupTable ) return;
		//キーコードを取得
		var keyCd = event.keyCode;

		if( keyCd == 27 || keyCd == 13 )
		{
			if ( FocusOn_TDOBJCT != null )
			{
				FocusOn_TDOBJCT.style.background = ''; 
			}
			FocusOn_TDOBJCT	= null;
			GamenStatus		= 0;			//セル間移動状態に進入

			isInGroupTable	= false;
			stopBubbling(event);	
			document.getElementById("cameraConditionsList").focus();
			last_focus = document.activeElement;						//フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			return;
		}

		// 本体キー
		if( keyCd == 9 )
		{
			stopDefaultling(event);
			// 「全て」選択中に「＞」キー
			if( obj.id == "DVR990103r1" && !event.shiftKey )
			{
				document.getElementById("DVR990103r2").checked	= true;
				document.getElementById("DVR990103r2").onclick();
				document.getElementById("DVR990103r2").focus();
				last_focus = document.activeElement;					//フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}
			// 「指定カメラ」選択中に「＜」キー
			else if( obj.id == "DVR990103r2" && event.shiftKey )
			{
				document.getElementById("DVR990103r1").checked = true;
				document.getElementById("DVR990103r1").focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
				document.getElementById("DVR990103r1").onclick();
			}
		}
		
		//37(左)38(上)39(右)40(下)以外、処理しない
		if ( keyCd == 37 || keyCd == 38 || keyCd == 39 || keyCd == 40 )
		{
			var iLoop		= 0;
			var tagExistFlg	= false;
			//キーが押下したタグ名を探し出す
			for ( iLoop = 0; iLoop < camera0102CondFocusList.length; iLoop++ )
			{
				if ( obj.id == camera0102CondFocusList[iLoop][0] )
				{
					stopDefaultling(event);
					stopBubbling(event);
					tagExistFlg = true;
					break;
				}
			}
			//存在すれば、下記を処理する
			//上方キーの場合、遷移先があるかを判断し、ある場合、遷移する
			if ( keyCd == 38 && tagExistFlg && camera0102CondFocusList[iLoop][1] != "" )
			{ //上
				document.getElementById(camera0102CondFocusList[iLoop][1]).checked = true;
				document.getElementById(camera0102CondFocusList[iLoop][1]).onclick();
				document.getElementById(camera0102CondFocusList[iLoop][1]).focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}
			//下方キーの場合、遷移先があるかを判断し、ある場合、遷移する
			if ( keyCd == 40 && tagExistFlg && camera0102CondFocusList[iLoop][2] != "" )
			{ //下
				document.getElementById(camera0102CondFocusList[iLoop][2]).checked = true;
				document.getElementById(camera0102CondFocusList[iLoop][2]).onclick();
				document.getElementById(camera0102CondFocusList[iLoop][2]).focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}
			//左方キーの場合、遷移先があるかを判断し、ある場合、遷移する
			if ( keyCd == 37 && tagExistFlg && camera0102CondFocusList[iLoop][3] != "" )
			{ //左
				document.getElementById(camera0102CondFocusList[iLoop][3]).checked = true;
				document.getElementById(camera0102CondFocusList[iLoop][3]).onclick();
				document.getElementById(camera0102CondFocusList[iLoop][3]).focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}
			//右方キーの場合、遷移先があるかを判断し、ある場合、遷移する
			if ( keyCd == 39 && tagExistFlg && camera0102CondFocusList[iLoop][4] != "" )
			{ //右
				document.getElementById(camera0102CondFocusList[iLoop][4]).checked = true;
				document.getElementById(camera0102CondFocusList[iLoop][4]).onclick();	
				document.getElementById(camera0102CondFocusList[iLoop][4]).focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}
		}
	}
}

function td0102OnclickEvent(obj,flag){
	if(flag==1){
		if(document.activeElement.id == "cameraList" || document.activeElement.id == "cameraConditionsList"){
			if(GamenStatus>0){
				GamenStatus =0;
				isInGroupTable=false;

			}
		}
	}
}

/*---------------------------------------------------------*
 * td0103CameraListOn
 * 選択カメラリストのフォーカス色変更
 *---------------------------------------------------------*/
function td0102CameraListOn()
{
	// 対象カメラに「全て」が選択されていたらクラスを切り替えて選択カメラブロックのフォーカス色を変える
	if(document.getElementById("DVR990103r1").checked)
	{
		document.getElementById("cameraList").className = "wordBackColor disFocus";
	}
	else
	{
		document.getElementById("cameraList").className = "wordBackColor";
	}
}