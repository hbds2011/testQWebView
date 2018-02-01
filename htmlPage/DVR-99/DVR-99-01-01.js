// JavaScript Document
/*
 example : var a=new C0101pop(lp,tp+ " "
  lp's value represents the distance from the left of the Browser viewing area;
  tp's value represents the distance from the top of Browser viewing area;
 attention:You should check CGI's link and the dataset before using ;
	  	
*/
/*var $ = function (id) {
    return "string" == typeof id ? document.getElementById(id) : id;
}
*/
var Class = {
  create: function() {
    return function() {
      this.initialize.apply(this, arguments);
    };
  }
};
var display=0;
var isIn0101GroupTable=false;//Table域フラグ
var Gamen0101Status=0; // 0:初期状態 1:セル間移動状態 2:テキスト入力状態
var FocusOn_TDOBJCT=null;
var lock0101Mark = false;
var fatherFocusObj=null;
// 当前カメラリストのカメラ総数
var camCnt = 0;

//イベント発生元、上へ、下へ、左へ、右へ　の順番に格納しておく
var FocusTagList = new Array(
	new Array("cameraConditionsList" ,""						,"mySelect01"			,""					,""),
	new Array("mySelect01" 			 ,"cameraConditionsList"	,"cameraList"			,""					,""),
	new Array("cameraList"   		 ,"mySelect01"				,"button01-1"			,""					,""),
	new Array("button01-1"			 ,"cameraList"				,""						,""					,"button01-2"),
	new Array("button01-2"			 ,"cameraList"				,""					    ,"button01-1"			,""));

var tab0101IdSequence = new Array(
			"cameraConditionsList",
			"mySelect01",
			"cameraList",
			"button01-1",
			"button01-2");	

var camera0101CondFocusList = new Array(
	new Array("r01-1","","r01-2"	 ,""		,"r01-2"),
	new Array("r01-2","r01-1",""	 ,"r01-1"	,""));

var C0101pop = Class.create();
C0101pop.prototype = {
	initdata: null,
	initialize: function(lp,tp,re,SrchKind)
	{
		consoleLogOutput(7,"DVR-99-01-01.js",arguments.callee.name,"initialize:function");
		this.FN = new FocusNavigator();
		this.left=lp;
		this.top=tp;
		this.SrchKind=SrchKind;
		this.url="/cgi-bin/DVR-99-01-01.cgi?SrchKind="+SrchKind;  // cgi
		this.dataset="Result/Camerae/Camera"; // dataset
		this.record=null;// record[0][0]=0,全;record[0][0]=1,指定;record[1][0],表示画面;record[2][0],checkbox;
		this.observers = [];
		var cpop=this;
		C0101pop.prototype.initdata=re;
		//既にPOPUPが作成されている形跡がある場合、一度初期化を行う
		var thisContainer = document.getElementById('DVR010101Container');
		if(thisContainer){
			thisContainer.parentNode.removeChild(thisContainer);
		}
		
		var str= ""
//		+ "<div id='DVR010101Container' class='wordBackColor' " +" "
		+ "<div id='DVR010101Container' " +" "
		+ "style='" + ""
		+ "left:" +this.left +";"
		+ "top:" +this.top +";"
		+ "'>" +" "

		+ "<div class=\"DVR010101Border wordBackColor\">"+ " "  
		
		+ "<div class=\"DVR_form1 pageBackColor\">"+ " "  
		+ "    <table class=\"pageBackColor\" style=\"margin-left:7px;\">"+ " "
		+ "        <tr class=\"tr1\"></tr>"+ " "
		+ "        <tr class='tr2'>"+ " "
		+ "            <td class=\"tr2_td1 wordBackColor\">対象カメラ</td>"+ " "  
		+ "            <td class=\"tr2_td2\"></td>"+ " "
		+ "            <td class='tr2_td3 wordBackColor' id=\"cameraConditionsList\" onkeydown=\"div0101Evtproc(0);change0101Focus(this,0);\" onclick=\"td0102CameraListOn();td0101OnclickEvent(this,1);\"  tabIndex=\"1\" onfocus=\"isIn0101GroupTable=false;Gamen0101Status=0;\">"+ " "
		+ "<table style='border-spacing:0px;' cellpadding='0px;'><tr><td class='td_width_cam'></td><td>"+ " "
		+ "<input type=\"radio\"name=\"rad01\" id=\"r01-1\" value=\"0\" checked=\"checked\" onkeydown=\"td0102CameraListOn();changeCamera0101CondFocus(this,0);\" onmousedown='doSelf99_01_Click(this)' tabIndex=\"-1\"/></td><td style='padding-left:8px;'>全て</td><td class='td_width_cam'></td>"+ " "
		+ "<td><input type=\"radio\" name=\"rad01\" id=\"r01-2\" value=\"1\" onkeydown=\"td0102CameraListOn();changeCamera0101CondFocus(this,0);\" onmousedown='doSelf99_01_Click(this)' tabIndex=\"-1\"/></td><td style='padding-left:8px;'>指定カメラ</td>"+ " "
		+ "<td class='td_width_cam'></td></tr></table>"+ " "
		+ "            </td>"+ " "
		+ "        </tr>"+ " "
		+ "        <tr class=\"tr1\"></tr>"+ " "
		+ "         <tr class='tr3'>"+ " "
		+ "            <td class='tr3_td1 wordBackColor'>表示画面</td><td class=\"tr2_td2\"></td>"+ " " 
		+ "            <td class=\"wordBackColor\" style='padding-left:10px;'>"+ " "
		+ "             <select id=\"mySelect01\"class='select1_1' disabled=\"disabled\" onkeydown=\"change0101Focus(this,0);\" tabIndex=\"2\" onclick=\"change0101Focus(this,1);\" onmousedown=\"doSelf99_01_Click(this)\">"+ " "
		+ "        </select></td>"+ " "
		+ "        </tr>"+ " "
		+ "        <tr class='tr1'></tr>"+ " "
		+ "        <tr class='tr4'>"+ " "
		+ "            <td class=\"wordBackColor\" style=\"text-align:center;\">選択カメラ</td>"+ " "
		+ "            <td class='tr2_td2'></td>"+ " "
		+ "            <td class=\"wordBackColor\" id=\"cameraList\" onkeydown=\"div0101Evtproc(1);change0101Focus(this,0);\" tabIndex=\"3\" onclick=\"td0101OnclickEvent(this,1);\">"+ " "
		+ "<div class=\"DVR010101Ds\" id=\"DVR990101Ds\">"+ " "
		+ "                <div id=\"reg01\" spry:region=\"dsbsc01\">"+ " "
		+ "                    <div ><table  id=\"dstab01\" style=\"border:0px;\">"+ " "
		+ "                    </table></div>"+ " "
		+ "                </div>"+ " "
		+ "               </div>"+ " "
		+ "             </div>"+ " "
		+ "        	</td>"+ " "
		+ "        "+ " "
		+ "        </tr>"+ " "
		+ "    "+ " "
		+ "    </table>"+ " "
		+"    "+ " "
		+"    </div>"+ " "
		+"    <table class=\"DVR010101BotmFnt\">"+ " "
		+"        <tr>"+ " "
		+"            <td class='message'>操作ガイド：</td>"
		+"<td>指定の場合は［レイアウト］を選択し、検索するカメラをチェックします。</td>"+ " "
		+"        </tr>"+ " "
		+"        <tr>"+ " "
		+"            <td></td><td>全ての場合は［レイアウト］と［カメラ］を指定する事はできません。</td>"+ " "
		+"        </tr>"+ " "
		+"    </table>"+ " "
		+"    <div class=\"DVR010101BtnPs\" >"+ " "
		+"        <input type=\"button\" name=\"button1\" id=\"button01-1\" value=\"登録\" onmousedown='doSelf99_01_Click(this)' class=\"big-button\" "+ " "
		+"         onkeydown=\"change0101Focus(this);\" tabIndex=\"4\"/>"+ " "
		+"    </div>"+ " "
		+"    <div class=\"DVR010101BtnPs2\" >"+ " "
		+"        <input type=\"button\" name=\"button2\" id=\"button01-2\" value=\"取消\" onmousedown='doSelf99_01_Click(this)' class='big-button' "+ " "
		+"         onkeydown=\"change0101Focus(this);\" tabIndex=\"5\"/>"+ " "
		+"    </div>"+ " "
		+ "</div>";
		document.body.insertAdjacentHTML("beforeEnd",str);
		var dsbsc01 = new Spry.Data.XMLDataSet("", this.dataset);
		dsbsc01.addObserver(this.preparedsbsc);
		dsbsc01.setURL(gUrl+this.url);
		dsbsc01.loadData();

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
		fatherFocusObj = obj;
		
		// 選択カメラブロックのフォーカス色を設定
		td0102CameraListOn();

		var btn2=Spry.$("button01-2");
		btn2.onclick= function(){
			// カバー非表示
			Spry.$('DVR').style.display					= "none";
			Spry.$('DVR010101Container').style.display	= "none";
			tem.notifyObservers("cancel");

			// フォーカスを戻す
			tem.FN.popFocusInfo(obj);
			resRetBtn();		//added by hlzhang @ 20110408

			//タブ順番を処理する @ 20110428
			change0101Focus(btn2,1);

			//ポップアップから元の画面フォーカスを戻す			
			focusFlag	= 1;
			//setTimeout('setFatherFocus()',800);//added by hlzhang @ 20110427
			last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
		};
		
		var btn1=Spry.$("button01-1");
		btn1.onclick=function(){ 
			// カバー非表示
			Spry.$('DVR').style.display	= "none";

			var x						= document.getElementsByName("DVR990101check");
			tem.record					= new Array(3);		
			tem.record[0]				= new Array();
			tem.record[1]				= new Array();
 			tem.record[2]				= new Array();
			if( (document.getElementsByName("rad01")[0].checked) == true )
			{
				tem.record[0][0]	= 0;
			}
			else
			{
				tem.record[0][0]	= 1;
			}

			var	sec				= Spry.$("mySelect01");
			tem.record[1][0]	= sec.options[sec.selectedIndex].value;
			var j				= 0;
			var i				= 0;
			for( i = 0; i < x.length; i++ )
			{
				if( (tem.record[0][0] == 0 ) || (x[i].checked) == true )
				{ 
					tem.record[2][j]		= new Array();
					tem.record[2][j][0]		= x[i].value;
					var name				= Spry.$('check01_h'+i).value;
					tem.record[2][j][1]		= Spry.Utils.encodeEntities(name);
					tem.record[2][j][2]		= Spry.$('check01_m'+i).value;
					j++;
				}
			}
			Spry.$('DVR010101Container').style.display	= "none";
//20120906 nakazono mod >>
//			tem.notifyObservers("ok");
//
//			//タブ順番を処理する @ 20110428
//			change0101Focus(btn1,1);
//			
//			//ポップアップから元の画面フォーカスを戻す
//			focusFlag=1;
//			//setTimeout('setFatherFocus()',800);//djwan
//			last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
//			tem.FN.popFocusInfo(obj);	
//20120906 nakazono mod <<>>
			var result_obs = tem.notifyObservers("ok");
			if((result_obs!=undefined) && (result_obs != 1)){
				//タブ順番を処理する @ 20110428
				change0101Focus(btn1,1);
				//ポップアップから元の画面フォーカスを戻す
				focusFlag=1;
				//setTimeout('setFatherFocus()',800);//djwan
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
				tem.FN.popFocusInfo(obj);
			}
//20120906 nakazono mod >>
		};
		var rad1=Spry.$("r01-1");
		rad1.onclick=function(){ 
			
			var x=document.getElementsByName("DVR990101check");
			var y=Spry.$("mySelect01");
			var i;
			// 2012/02/08 対象カメラで全てを選択された場合の表示画面レイアウトの設定を変更 shono - start
			//y.selectedIndex=Number(display);
			var selectBoxObj = document.getElementById("mySelect01");
			if(C0101pop.prototype.initdata[1][1]&&C0101pop.prototype.initdata[1][1]!=undefined){
				for(var idx = 0; idx < selectBoxObj.length; idx++){
					if(selectBoxObj.options[idx].value == C0101pop.prototype.initdata[1][1]){
						selectBoxObj.selectedIndex = idx;
						consoleLogOutput(9,"DVR-99-01-01.js",arguments.callee.name,"id:"+selectBoxObj.id+" value:"+C0101pop.prototype.initdata[1][1]+" idx:"+idx);
					}
				}
			} else {
				selectBoxObj.selectedIndex=0;
				consoleLogOutput(9,"DVR-99-01-01.js",arguments.callee.name,"id:"+selectBoxObj.id+" idx:0");
			}
			// 2012/02/08 対象カメラで全てを選択された場合の表示画面レイアウトの設定を変更 shono - end
			y.disabled=true;
			
			for(i=0;i<x.length;i++)
			{
				x[i].disabled=true;
				// 全てのラジオボタンが選択された場合は、選択カメラの全てにチェックを入れる
				x[i].checked = true;
			}
			//タブ順番を処理する


			changeCamera0101CondFocus(rad1,1);
		};
		var rad2=Spry.$("r01-2");
		rad2.onclick=function(){ 
			var x=document.getElementsByName("DVR990101check");
			var y=Spry.$("mySelect01");
			var i;
			y.disabled=false;
			for(i=0;i<x.length;i++)
			{    		x[i].checked=false;	//「全て」→「指定カメラ」に変更する時、全てのカメラが非選択の状態となる。
					x[i].disabled=false;
					
			}
			//タブ順番を処理する


			changeCamera0101CondFocus(rad2,1);
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
		var x=document.getElementById('dstab01');
		var i_flg=0;
		camCnt = 0;

		if( (rows[0]["@gid"] != "") && (rows[0]["@gid"] != null) ){
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
					  if(data["@gid"] == 0) {
					    var td1=row.insertCell(0);
					    var td2=row.insertCell(1);
					    var td3=row.insertCell(2);

					    td1.innerHTML="<input type='checkbox' name='DVR990101check' disabled='disabled' id='checkDetail_n"+ii+"' value='"+data["Code"]+"' onmousedown='doSelf99_01_Click(this)' onKeydown='td0101Evtsproc(this,0)' onClick='td0101Evtsproc(this,1)' tabIndex=\"-1\"/>";
					    td2.innerHTML= data["Code"];
					    str="<input type='hidden' name='check01_m' id='check01_m"+ii+"'  value='"+data["recId"]+"' tabIndex=\"-1\"/>";
					    str=str+"<input type='hidden' name='check01_v' id='check01_h"+ii+"'  value='"+data["Name"]+"' tabIndex=\"-1\"/>";
					    td3.innerHTML= data["Name"]+str;
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
					    td2.innerHTML="<input type='checkbox' name='DVR990101check' disabled='disabled' id='checkDetail_n"+ii+"' value='"+data["Code"]+"' onmousedown='doSelf99_01_Click(this)' onKeydown='td0101Evtsproc(this,0)' onClick='td0101Evtsproc(this,1)' tabIndex=\"-1\"/>";
					    td3.innerHTML= data["Code"];
					    str="<input type='hidden' name='check01_m' id='check01_m"+ii+"'  value='"+data["recId"]+"' tabIndex=\"-1\"/>";
					    str=str+"<input type='hidden' name='check01_v' id='check01_h"+ii+"'  value='"+data["Name"]+"' tabIndex=\"-1\"/>";
					    td3.innerHTML=td3.innerHTML+'&nbsp;'+data["Name"]+str;
					    ii++;
					    i_flg=1;
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
		//Spry.$('r01-1').focus(); //deleted by hlzhang 20110411;
		var dsMonitor = new Spry.Data.XMLDataSet("", "Result/Monitor");

		var selectBoxObj = document.getElementById("mySelect01");
		// 2012/03/21 モニタ種類をSpryのみで判断するように変更 shono - start
			var prms = Spry.Utils.getLocationParamsAsObject();
			var mnt = prms.screenFlag.toString().substring(4,5);
			if (mnt == "2") {
				// モニタ出力が16:9の場合のセレクトボックス作成
				selectBoxObj.add(new Option("フル表示","1"));
				selectBoxObj.add(new Option("3台表示","2"));
				selectBoxObj.add(new Option("4台表示","3"));
				selectBoxObj.add(new Option("6台表示","4"));
				selectBoxObj.add(new Option("7台表示（全再生）","5"));
				selectBoxObj.add(new Option("7台表示（混在）","6"));
				selectBoxObj.add(new Option("9台表示","7"));
				selectBoxObj.add(new Option("12台表示","8"));
				selectBoxObj.add(new Option("16台表示","9"));
			} else {
				selectBoxObj.add(new Option("フル表示","1"));
				selectBoxObj.add(new Option("4台表示","3"));
				selectBoxObj.add(new Option("7台表示（全再生）","5"));
				selectBoxObj.add(new Option("7台表示（混在）","6"));
				selectBoxObj.add(new Option("9台表示","7"));
				selectBoxObj.add(new Option("16台表示","9"));
			}
		// 2012/03/21 モニタ種類をSpryのみで判断するように変更 shono - end

		C0101pop.prototype.init();

		//現在表示中のレイアウトを表示
		if(C0101pop.prototype.initdata[1][0]&&C0101pop.prototype.initdata[1][0]!=undefined){
			for(var idx = 0; idx < selectBoxObj.length; idx++){
				if(selectBoxObj.options[idx].value == C0101pop.prototype.initdata[1][0]){
					selectBoxObj.selectedIndex = idx;
					consoleLogOutput(9,"DVR-99-01-01.js",arguments.callee.name,"id:"+selectBoxObj.id+" value:"+C0101pop.prototype.initdata[1][0]+" idx:"+idx);
				}
			}
		}else{
			selectBoxObj.selectedIndex=0;
			consoleLogOutput(9,"DVR-99-01-01.js",arguments.callee.name,"id:"+selectBoxObj.id+" idx:0");
		}

		dispInputEventStart();
		}
	},

	init: function()
	{     
		consoleLogOutput(7,"DVR-99-01-01.js",arguments.callee.name,"init:function");
	    if(C0101pop.prototype.initdata!=null)
		{
			var record=C0101pop.prototype.initdata;
			var i;
			var j;
			if(record[0][0]==0)
			{
				//「全て」を選択している場合
				document.getElementsByName("rad01")[0].checked=true;
//20120905 nakazono add >>
				document.getElementById("cameraList").className = "wordBackColor disFocus";
//20120905 nakazono add <<
				var x=document.getElementsByName("DVR990101check");
				var y=Spry.$("mySelect01");
				y.selectedIndex=display;
				consoleLogOutput(9,"DVR-99-01-01.js",arguments.callee.name,"id:"+y.id+" idx:"+display);
				y.disabled=true;
				for(i=0;i<x.length;i++)
				{
					x[i].disabled=true;
					//チェックボックスを選択状態とする
					x[i].checked = true;
				}
			}
			else
			{
				//「指定」を選択している場合
				document.getElementsByName("rad01")[1].checked=true;
//20120905 nakazono add >>
				document.getElementById("cameraList").className = "wordBackColor";
//20120905 nakazono add <<
				var x=document.getElementsByName("DVR990101check");
				var h=document.getElementsByName("check01_m");
				var y=Spry.$("mySelect01");
				y.selectedIndex=0;  //david add 2011.06.16
				consoleLogOutput(9,"DVR-99-01-01.js",arguments.callee.name,"id:"+y.id+" idx:0");
				y.disabled=false;
/*				for(i=0;i<y.options.length;i++)
				{
					if(y.options[i].value==record[1][0])
					{
						y.selectedIndex=i;
						break;
					}
				}*/
				for(i=0;i<record[2].length;i++)
				{
					for(j=0;j<h.length;j++)
					{   
						x[j].disabled=false;
						//カメラの情報が一致していればチェックをつける
						if(h[j].value==record[2][i][2])
						{
							x[j].checked=true;
							if(i==0)
							document.getElementById('DVR990101Ds').scrollTop=(j)*18;
						
						}
					}
				}
				
				
			}
		}
		var obj=document.getElementById("cameraConditionsList");
		if(!obj.disabled){
			obj.focus();
			last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			dispConsoleOutput("DVR-99-01-01.js",arguments.callee.name,"focus処理終了 last=" + last_focus.id);
		}
		rescueFocus(document.getElementById("cameraConditionsList"));
	},
	show :function(mainRecInfo)
	{
		consoleLogOutput(7,"DVR-99-01-01.js",arguments.callee.name,"show:function");
		/* 現在登録されている情報を再表示する */
		// mainRecInfoを設定しない場合、前回対象カメラを表示し、未登録で画面を閉じても再表示すると値を保持している為
		// 表示毎に値を設定する様に対応
		if(mainRecInfo){
			//表示画面の設定
			var selectBoxObj = document.getElementById("mySelect01");
			if(mainRecInfo[1][0])
			{
				for(var idx = 0; idx < selectBoxObj.length; idx++){
					if(selectBoxObj.options[idx].value == mainRecInfo[1][0]){
						selectBoxObj.selectedIndex = idx;
						consoleLogOutput(9,"DVR-99-01-01.js",arguments.callee.name,"id:"+selectBoxObj.id+" value:"+mainRecInfo[1][0]+" idx:"+idx);
					}
				}
			}
			
			if(mainRecInfo[0][0]==0)
			{
				//全てのラジオボタンをチェック状態にする
				document.getElementsByName("rad01")[0].checked=true;
				//表示画面の設定をディム表示にする
				selectBoxObj.disabled = true;
				//表示されているカメラを取得(チェックボックスをリスト状態で取得)
				var camChkObjList=document.getElementsByName("DVR990101check");
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
				document.getElementsByName("rad01")[1].checked=true;
				//表示画面の設定を通常表示にする
				selectBoxObj.disabled = false;
				
				//表示されているカメラを取得(チェックボックスをリスト状態で取得)
				var camChkObjList=document.getElementsByName("DVR990101check");
				//表示されているカメラの隠し項目チェックボックスをリスト状態で取得
				var camHdnObjList=document.getElementsByName("check01_m");
				
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
		Spry.$('DVR010101Container').style.display	= "block";
		savRetBtn(); 
		identifyRetBtn(document.getElementById("DVR990103button2"));
		this.FN.pushFocusInfo(null, document.getElementById("DVR010101Container"), null, null);
	}		
};

// マウスダウンの場合
function doSelf99_01_Click(clkObj){
	// 対象が中項目のcheckboxとradio以外の場合、
	if( clkObj.type!="checkbox" && clkObj.type!="radio")
	{
		isIn0101GroupTable=false;//Table域フラグ
		Gamen0101Status=0;
	}

	setfocus_click(clkObj);
}

//DIV　KEYが押下された場合、
function div0101Evtproc(flg) {
	// 初期状態以外、反応しない
	if (Gamen0101Status>0) return; 
	//キー押下の場合



	var kcd = event.keyCode;
	if (kcd==13) { //enter key
		Gamen0101Status=1; //セル間移動状態に進入
		
		isIn0101GroupTable=true;
		
		var obj=null;
		//フォーカスは一番目カメラに
		if(flg == 0){ //対象カメラ
			obj=document.getElementById("r01-1");
			if(!obj.checked){
				obj=document.getElementById("r01-2");
			}
			obj.style.background='#BCBAFA'; 
			obj.focus();
			last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			FocusOn_TDOBJCT=obj;
		}else{//選択カメラ
			if( camCnt > 0){
				obj=document.getElementById("checkDetail_n0");
				if(!obj.disabled){
					obj.style.background='#BCBAFA'; 
					obj.focus();
					last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
					FocusOn_TDOBJCT=obj;
				}else{
					Gamen0101Status=0;	
					isIn0101GroupTable=false;
				}
			}else{
				Gamen0101Status=0;
				isIn0101GroupTable=false;
			}
		}
			stopDefaultling(event);
	}
	if (kcd!=9 && kcd!=8) { //tab key & backspace key
			stopDefaultling(event);
	}
}

//TD　KEYが押下され、又はマウスクリックした場合、
function td0101Evtsproc(obj,mouseflg) {
		//
		if (mouseflg==1) {

			//表示画面リスト非選択の状態をセット
			lock0101Mark=false;

			// 初期状態の場合


			if (Gamen0101Status==0) {
				Gamen0101Status=1; //セル間移動状態に進入
				isIn0101GroupTable=true;
				//フォーカスはクリックされたカメラに
				obj.style.background='#BCBAFA'; 
				obj.focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
				FocusOn_TDOBJCT=obj;
				return; 
			}
			
			if (Gamen0101Status==1) {
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


			if (Gamen0101Status==1) {
				//キー押下の場合


				var kcd = event.keyCode;
				var nco=null;
				switch(kcd) {
					case 37: // 左
						//フォーカスはクリックされたカメラに
						/*obj.parentNode.style.background=''; 
						nco=GetNext0101ActiveCel(obj,1,1,1);
						nco.style.background='#BCBAFA';  
						nco.focus();
						FocusOn_TDOBJCT=nco;*/
						event.returnValue=false;
						break;
					case 9: // tab key
						//フォーカスはクリックされたカメラに
						obj.parentNode.style.background=''; 
						if(event.shiftKey){ //Shift + tab
							nco=GetNext0101ActiveCel(obj,1,1,3);
						}else{
							nco=GetNext0101ActiveCel(obj,1,1,2);
						}
						nco.style.background='#BCBAFA';  
						nco.focus();
						last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
						FocusOn_TDOBJCT=nco;
						event.returnValue=false;
						break;
					case 39: //右
						//フォーカスはクリックされたカメラに
						/*obj.parentNode.style.background=''; 
						nco=GetNext0101ActiveCel(obj,1,1,2);
						nco.style.background='#BCBAFA';  
						nco.focus();
						FocusOn_TDOBJCT=nco;*/
						event.returnValue=false;
						break;
					case 38: //上


	
						//フォーカスはクリックされたカメラに
						obj.parentNode.style.background=''; 
						nco=GetNext0101ActiveCel(obj,1,1,3);
						nco.style.background='#BCBAFA';  
						nco.focus();
						last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
						FocusOn_TDOBJCT=nco;
						event.returnValue=false;
						break;
					case 40: //下
						//フォーカスはクリックされたカメラに
						obj.parentNode.style.background=''; 
						nco=GetNext0101ActiveCel(obj,1,1,4);
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
						Gamen0101Status=0; //セル間移動状態に進入
						isIn0101GroupTable=false;
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
function GetNext0101ActiveCel(co,rno,cno,flg) {
	var rowmax =document.getElementsByName("DVR990101check").length;//テーブルにカメラ個数


	rno = parseInt(co.id.substring(13))+1 ;
	var obj=null;
	switch(flg) {
	   case 1: // 左
			rno--;
			if (rno<1) {
				rno=1;
			}
			obj=document.getElementById("checkDetail_n" + (rno-1) );
		 break;
	   case 2: // 右
			rno++;
			if (rno>rowmax) {
				rno=rno-1;
			}

			obj=document.getElementById("checkDetail_n" + (rno-1) );
		
		 break;
	   case 3: // 上



			rno--;
			if (rno<1) {
				rno=1;
			}
			obj=document.getElementById("checkDetail_n" + (rno-1) );
		 break;
	   case 4: // 下
			rno++;
			if (rno>rowmax) {
				rno=rno-1;
			}
			obj=document.getElementById("checkDetail_n" + (rno-1) );
		 break;
	   default:
	   break;
   	}
	return obj;
}

//方向キーにて、フォーカスを遷移させる処理
function change0101Focus(obj,flag) {
	if(flag==1){
		if(Gamen0101Status>0){
			Gamen0101Status =0;
			isIn0101GroupTable=false;
		}
		//表示画面リスト非選択の状態をセット
//		lock0101Mark=false; 20111201 Yabuta Del DISP対応によりプルダウン選択中の判定は不要になった
	}else{
		if (Gamen0101Status>0) return; 
		if (isIn0101GroupTable) return;
		//キーコードを取得
		var keyCd = event.keyCode;
	
		//表示画面 値を選択する状態
		if (keyCd==13 && obj.id=='mySelect01') {

/*20111201 Yabuta Del DISP対応によりプルダウン選択中の判定は不要になった
			if(lock0101Mark){
				lock0101Mark=false;
				return;
			}else{*/
//				lock0101Mark=true;
				return;
//			}	
		}
	//added enter key event for radios by luo 20110720 start	
		//if (keyCd==13 && obj.id=='cameraConditionsList') {
//			if(lock0101Mark){
//				lock0101Mark=false;
//				return;
//			}else{
//				var radios=document.getElementsByName("rad01");
//				if(radios.item(1).checked){
//				    radios.item(1).focus();
//				 }else{
//				     radios.item(0).checked;
//					 radios.item(0).focus();
//				 }
//				lock0101Mark=true;
//				return;
//			}	
//		}
//		
//		if (keyCd==13 && obj.type=='radio') {
//				var CL=document.getElementById("cameraConditionsList");
//				CL.tabIndex=1;
//				CL.focus();
//				lock0101Mark=false;
//				return;
//		
//		}
		//added enter key event for radios by luo 20110720 end
			
		//タブ事件を無効になる


		if(keyCd==9 /*&& lock0101Mark*/){
			stopDefaultling(event);
		}
		
		//Esc事件


		if(keyCd==27){
			document.getElementById("button01-2").click();
			stopBubbling(event);
//			lock0101Mark=false;
			return;
		}
		
		var condFlg = document.getElementById("r01-1").checked;
//20111201 Yabuta Del DISP対応によりプルダウン選択中の判定は不要になった
//		if(!lock0101Mark){
			//タブキー押下、次の元素がフォーカスをセット
			
			if(keyCd==9 && !isIn0101GroupTable){
				
				if(event.shiftKey){// Shift + tab
					if(obj.id=='cameraConditionsList'){
						stopDefaultling(event);
						//document.getElementById("button01-2").focus();
						return;
					}
					var preObjId = restlessSeeker(tab0101IdSequence,sameIdAsActived,canBeFocused,false,tab0101IdSequence.length-1,0);
					if(preObjId){
						document.getElementById(preObjId).focus();
						last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
					}
				}else{		// tab
					if(obj.id=='button01-2'){
						stopDefaultling(event);
						//document.getElementById("cameraConditionsList").focus();
						return;
					}
					var nextObjId = restlessSeeker(tab0101IdSequence,sameIdAsActived,canBeFocused,true,0,0);
					if(nextObjId){
						document.getElementById(nextObjId).focus();
						last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
					}
				}
			}
		
			//entry key 
			if (keyCd==13 && !isIn0101GroupTable){
				if(obj.type=="button"){
					obj.click();
					stopBubbling(event);
					return;
				}else{
					if( (camCnt > 0) && ( FocusOn_TDOBJCT != null ) ){
						isIn0101GroupTable=true;
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
				// リモコン移動
				controlArrow(FocusTagList,obj,keyCd);
			}
//		}	
	}
}

function controlArrow(arryList,obj,keyVaul){
	//キーコードを取得
	var keyCd = keyVaul;

	//37(左)38(上)39(右)40(下)以外、処理しない
	if (keyCd==37 || keyCd==38 || keyCd==39 || keyCd==40 ) {
		var iLoop = 0;
		var tagExistFlg = false;
		//キーが押下したタグ名を探し出す
		for (iLoop=0;iLoop<arryList.length;iLoop++) {
			if (obj.id==arryList[iLoop][0]) {
				tagExistFlg = true;
				stopDefaultling(event);			
				stopBubbling(event);
				break;
			}
		}
		//存在すれば、下記を処理する
	
		//上方キーの場合、遷移先があるかを判断し、ある場合、遷移する
		if (keyCd==38 && tagExistFlg && arryList[iLoop][1]!="") { //上
			if (!document.getElementById(arryList[iLoop][1]).disabled && document.getElementById(arryList[iLoop][1]).style.display!="none") {
				document.getElementById(arryList[iLoop][1]).focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			} else {
				// 次の遷移先へ
				controlArrow(arryList,document.getElementById(arryList[iLoop][1]),keyCd);
			}
		}
		//下方キーの場合、遷移先があるかを判断し、ある場合、遷移する
		if (keyCd==40 && tagExistFlg && arryList[iLoop][2]!="") { //下
			if (!document.getElementById(arryList[iLoop][2]).disabled  && document.getElementById(arryList[iLoop][2]).style.display!="none") {
				document.getElementById(arryList[iLoop][2]).focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			} else {
				// 次の遷移先へ
				controlArrow(arryList,document.getElementById(arryList[iLoop][2]),keyCd);
			}
		}
		//左方キーの場合、遷移先があるかを判断し、ある場合、遷移する
		if (keyCd==37 && tagExistFlg && arryList[iLoop][3]!="") { //左
			if (!document.getElementById(arryList[iLoop][3]).disabled  && document.getElementById(arryList[iLoop][3]).style.display!="none") {
				document.getElementById(arryList[iLoop][3]).focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			} else {
				// 次の遷移先へ
				controlArrow(arryList,document.getElementById(arryList[iLoop][3]),keyCd);
			}
		}
		//右方キーの場合、遷移先があるかを判断し、ある場合、遷移する
		if (keyCd==39 && tagExistFlg && arryList[iLoop][4]!="") { //右
			if (!document.getElementById(arryList[iLoop][4]).disabled  && document.getElementById(arryList[iLoop][4]).style.display!="none") {
				document.getElementById(arryList[iLoop][4]).focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			} else {
				// 次の遷移先へ
				controlArrow(arryList,document.getElementById(arryList[iLoop][4]),keyCd);
			}
		}
	}
}

//対象カメラ区域に、方向キーにて、フォーカスを遷移させる処理
function changeCamera0101CondFocus(obj,flag) {
	if(flag==1){
		if(Gamen0101Status==0){
			Gamen0101Status =1;
			isIn0101GroupTable=true;
		}
		//表示画面リスト非選択の状態をセット
//		lock0101Mark=false; 20111201 Yabuta Del DISP対応によりプルダウン選択中の判定は不要になった
		obj.focus();
		last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
	}else{
		//セル間移動場合


		if (Gamen0101Status==0) return; 
		if (!isIn0101GroupTable) return;
		//キーコードを取得
		var keyCd = event.keyCode;
		
		if(keyCd==27 || keyCd==13){
			if (FocusOn_TDOBJCT!=null) {
				FocusOn_TDOBJCT.style.background=''; 
			}
			FocusOn_TDOBJCT=null;
			Gamen0101Status=0; //セル間移動状態に進入
			isIn0101GroupTable=false;
			stopBubbling(event);	
			document.getElementById("cameraConditionsList").focus();
			last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			return;
		}
			
		if(keyCd==9){
			stopDefaultling(event);
			if(obj.id=="r01-1" && !event.shiftKey){
				document.getElementById("r01-2").checked=true;
				document.getElementById("r01-2").onclick();
				document.getElementById("r01-2").focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}else if(obj.id=="r01-2" && event.shiftKey){
				document.getElementById("r01-1").checked=true;
				document.getElementById("r01-1").focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
				document.getElementById("r01-1").onclick();
			}
		}
		
		//37(左)38(上)39(右)40(下)以外、処理しない
		if (keyCd==37 || keyCd==38 || keyCd==39 || keyCd==40) {
			var iLoop = 0;
			var tagExistFlg = false;
			//キーが押下したタグ名を探し出す
			for (iLoop=0;iLoop<camera0101CondFocusList.length;iLoop++) {
				if (obj.id==camera0101CondFocusList[iLoop][0]) {
					stopDefaultling(event);			
					stopBubbling(event);
					tagExistFlg = true;
					break;
				}
			}
			//存在すれば、下記を処理する


	
			//上方キーの場合、遷移先があるかを判断し、ある場合、遷移する


	
			if (keyCd==38 && tagExistFlg && camera0101CondFocusList[iLoop][1]!="") { //上


				document.getElementById(camera0101CondFocusList[iLoop][1]).checked = true;
				document.getElementById(camera0101CondFocusList[iLoop][1]).onclick();
				document.getElementById(camera0101CondFocusList[iLoop][1]).focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}
			//下方キーの場合、遷移先があるかを判断し、ある場合、遷移する


	
			if (keyCd==40 && tagExistFlg && camera0101CondFocusList[iLoop][2]!="") { //下
				document.getElementById(camera0101CondFocusList[iLoop][2]).checked = true;
				document.getElementById(camera0101CondFocusList[iLoop][2]).onclick();
				document.getElementById(camera0101CondFocusList[iLoop][2]).focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}
			//左方キーの場合、遷移先があるかを判断し、ある場合、遷移する


	
			if (keyCd==37 && tagExistFlg && camera0101CondFocusList[iLoop][3]!="") { //左
				document.getElementById(camera0101CondFocusList[iLoop][3]).checked = true;
				document.getElementById(camera0101CondFocusList[iLoop][3]).onclick();
				document.getElementById(camera0101CondFocusList[iLoop][3]).focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}
			//右方キーの場合、遷移先があるかを判断し、ある場合、遷移する


	
			if (keyCd==39 && tagExistFlg && camera0101CondFocusList[iLoop][4]!="") { //右
				document.getElementById(camera0101CondFocusList[iLoop][4]).checked = true;
				document.getElementById(camera0101CondFocusList[iLoop][4]).onclick();
				document.getElementById(camera0101CondFocusList[iLoop][4]).focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}
		}
	}
}

function td0101OnclickEvent(obj,flag){
	if(flag==1){
		if(document.activeElement.id == "cameraList" || document.activeElement.id == "cameraConditionsList"){
			if(Gamen0101Status>0){
				Gamen0101Status =0;
				isIn0101GroupTable=false;
			}
			//表示画面リスト非選択の状態をセット
//			lock0101Mark=false; 20111201 Yabuta Del DISP対応によりプルダウン選択中の判定は不要になった
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
	if(document.getElementById("r01-1").checked)
	{
		document.getElementById("cameraList").className = "wordBackColor disFocus";
	}
	else
	{
		document.getElementById("cameraList").className = "wordBackColor";
	}
}