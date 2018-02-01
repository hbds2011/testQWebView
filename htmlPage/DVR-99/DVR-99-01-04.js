// JavaScript Document
/*
 example : var a=new C0101pop(lp,tp);
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

var isIn0104GroupTable=false;//Table域フラグ
var Gamen0104Status=0; // 0:初期状態 1:セル間移動状態 2:テキスト入力状態
var FocusOn_TDOBJCT=null;
// 当前対象カメラリストのカメラ総数
var camCnt = 0;
// 当前選択カメラリストのカメラ総数
var selectCamCnt = 0;
//イベント発生元、上へ、下へ、左へ、右へ　の順番に格納しておく
var Focus0104TagList = new Array(
	new Array("selectCameraList" 	,""			,"DVR990104button1"	,""				,"add"),
	new Array("add" 		,""			,"delete"		,"selectCameraList"		,"camera0104List"),
	new Array("delete"   		,"add"			,"DVR990104button1"	,"selectCameraList"		,"camera0104List"),
	new Array("camera0104List"   	,""			,"DVR990104button1"	,"add"				,""),
	new Array("DVR990104button1"   	,"selectCameraList"	,""			,""				,"DVR990104button2"),
	new Array("DVR990104button2"   	,"selectCameraList"	,""			,"DVR990104button1"		,""));

function DVR990104_init_checkbox() {
	for(var i=1;i<17;i++)
	{
	    if(Spry.$('left_'+i).value=="0")
	    {
		Spry.$('left_'+i).disabled = true;
	    } else {
		Spry.$('left_'+i).disabled = false;
	    }
	}

	var loop = true;
	var jcount=0;
	var tab=Spry.$("DVR990104tabMiddle");
	var row=tab.rows;
	while (loop == true) {
		var obj=Spry.$('DVR990104_'+jcount);
		if(obj != undefined) {
		    var obj2=Spry.$('DVR990104td_'+jcount);
		
		    obj.checked = false;
		    obj.disabled=false;
		    obj2.style.color="#000000";
		} else {
		   break;
		}
		jcount ++;
	}

	jcount = 0;
	while (loop == true) {
		var obj=Spry.$('DVR990104_'+jcount);
		if(obj != undefined) {
		    var obj2=Spry.$('DVR990104td_'+jcount);
		
		    for(var t=1;t<17;t++)
		    {
//		 	if(Spry.$('middle_'+t).innerHTML==obj.value.replace(obj.value.split("_")[0]+"_",""))
			if(Spry.$('left_'+t).value==obj.value.split("_")[0])
			{
				obj.checked=true;
				obj.disabled=true;
				obj2.style.color="gray";
				break;
			}
		    }
		} else {
		   break;
		}
		jcount ++;
	}
};

var C0104pop = Class.create();
C0104pop.prototype = {
	initdata: null,
	initialize: function(lp,tp,re,Machine,folderCode)
	{
		this.FN 					= new FocusNavigator();
		consoleLogOutput(7,"DVR-99-01-04.js",arguments.callee.name,"initialize");
		this.left=lp;
		this.top=tp;
		this.url="/cgi-bin/DVR-99-01-04.cgi?Machine="+Machine+"&folderCode="+folderCode;  // cgi
		this.dataset="Result/Camerae/Camera"; // dataset
		this.record=null;
		this.observers = [];
		var cpop=this;
		C0104pop.prototype.initdata=re;
        var str0= "";
		var str01= "";
		var i;
		for(i=1;i<17;i++)
		{  
			str0= str0 + "<tr>";
			if(i<10){
				str0= str0 + "<td class='table_tr_td1i'>"+" "
				    + "0"+i +" "
					+ "</td> ";
				
			}else{
				str0= str0 + "<td class='table_tr_td1i'>"+" "
				    + i +" "
					+ "</td> ";
			}
			str0= str0 + "<td style=\" text-align:center;\" class='table_tr_tdi pageBackColor'></td> "
		           + "  <td  class='table_tr_td2i' id='middle_" + i +"' ></td> ";

			str0= str0 + "<td style=\" text-align:center;\" class='table_tr_tdi pageBackColor'></td> "
			   + "  <td class='table_tr_td3i' >"
				+ "<input type=\"checkbox\" value=\"0\"  id='left_"+i+"' onKeydown='td0104Evtsproc(this,0,0)' onmousedown='doSelf99_04_Click(this)' onClick='td0104Evtsproc(this,1,0)'/>"+" "
				    + "</td></tr>";


		}
		//既にPOPUPが作成されている形跡がある場合、一度初期化を行う
		var thisContainer = document.getElementById('DVR990104Container');
		if(thisContainer){
			thisContainer.parentNode.removeChild(thisContainer);
		}

	    var str1= ""
		+ "<div id='DVR990104Container'" +" "
		+ "style='" + ""
		+ "left:" +this.left +";"
		+ "top:" +this.top +";"
		+ "'>" +" "
		+ "<div class='DVR990104Back' ></div>" +" "
		+ "<div class='DVR990104Border' ></div>" +" "
		+ "<div class='DVR990104Dstit' >" + " "
//		+ "カメラリスト</div>" +" "

		+ "<table cellpadding=\"0\" cellspacing=\"0\" >"+ " "
		+ "<tr>" +" "
		+ "<td class='table_tr_td1r'>" +"追加"
		+ "</td>" +" "
		+ "<td style=\" text-align:center;\" class='table_tr_td_add'>"+" "
		+ "</td>" +" "
		+ "<td class='table_tr_td2r'>" +"カメラリスト"+" "
		+ "</td>" +" "
		+ "</tr>" +" "
		+ "</table>" +" "
		+ "</div>" +" "

		+ "<div id=\"camera0104List\" class='DVR990104Dsdata' onkeydown=\"div0104Evtproc(1);change0104Focus(this,0);\"  tabIndex=\"-1\" onclick=\"td0104OnclickEvent(this,1);\" onfocus=\"isIn0104GroupTable=false;Gamen0104Status=0;\">" + " "
		+ "<div id='DVR990104reg' spry:region='dsbsc04'>"  + " "

		+ "</div>" +" "
		+ "</div>" +" "


		+ "<div class='DVR990104BtnPs' >" +" "
		+ "<input type='button' name='DVR990104button1' id='DVR990104button1' onmousedown='doSelf99_04_Click(this)' value='登録' class='big-button' " +" "
		+ "onkeydown=\"change0104Focus(this,0);\"/>" +" "
		+ "</div>" +" "
		+ "<div class='DVR990104BtnPs2' >" +" "
		+ "<input type='button' name='DVR990104button2' id='DVR990104button2' onmousedown='doSelf99_04_Click(this)' value='取消' class='big-button' " +" "
		+ " onkeydown=\"change0104Focus(this,0);\"/>" +" "
		+ "</div>" +" "
		+ "<table class='DVR990104BotmFnt' >" +" "
		+"<tr>"+" "
		+ "<td class='message4'>操作ガイド：</td>" +" "
		+ "<td>メディア内のデータ(現在構成に無いカメラ含む)を再生するモードです。</td></tr>"
		+ "<tr><td></td><td>カメラリストから、表示する枠番へ登録してください。</td></tr>" 
		+ "</table>" +" " 
		+ "<div class='DVR990104Log' >"  + " "
		+ "<input type='button' name='DVR990104button1' id='add' onmousedown='doSelf99_04_Click(this)' value='追加' class='small-button'  style='" +" "
		+ "margin-left:20px;' onkeydown=\"change0104Focus(this,0);\"/>" +" "
		+ "</div>" +" "
		+ "<div class='DVR990104Del' >"
		+ "<input type='button' name='DVR990104button1' id='delete' onmousedown='doSelf99_04_Click(this)' value='削除' class='small-button' style='" +" "
		+ "margin-left:20px;' onkeydown=\"change0104Focus(this,0);\"/>" +" "
		+ "</div>" +" "
		+ "<div class='DVR990104Logpic' >"  + " "
		+ "</div>" +" "
		+ "<div class='DVR990104Delpic' >"  + " "
		+ "</div>" +" "
		+ "<div class='DVR990104Toptit' >" +"　　　未登録カメラ再生" + " "
		+ "</div>" +" "
		+ "<tr>" +" "
		+ "<table class='DVR990104Tabletit' cellpadding=\"0\" cellspacing=\"0\" >"+ " "
		+ "<tr>" +" "
		+ "<td class='table_tr_td1'>" +"枠番"
		+ "</td>" +" "
		+ "<td style=\" text-align:center;\" class='table_tr_td'>"+" "
		+ "</td>" +" "
		+ "<td class='table_tr_td2'>" +"カメラ名称"+" "
		+ "</td>" +" "
		+ "<td style=\" text-align:center;\" class='table_tr_td'>"+" "
		+ "</td>" +" "
		+ "<td class='table_tr_td3'>" +"削除"+" "
		+ "</td>" +" "
		+ "</tr>" +" "
		
		+ "<tr>" +" "
		+ "<td colspan=\"3\" >" +" "
		+ "<div  class='DVR990104Div2 borderAsPageBackColor'  id=\"selectCameraList\" onkeydown=\"div0104Evtproc(0);change0104Focus(this,0);\" tabIndex=\"-1\" onclick=\"td0104OnclickEvent(this,1);\" onfocus=\"isIn0104GroupTable=false;Gamen0104Status=0;\">"  + " "
		+ "<table id='DVR990104tabMiddle' cellpadding=\"0\" cellspacing=\"0\">" +" "
		+ str0 +" "
		+ "</table >" +" "
		+ "</div>"  + " "
		+ "</td>" +" "
		+ "</tr>" +" "
		+ "</table>" +" "
		+ "</div>"  + " "
		+ "</div>" +" ";
		//+ "<div id='DVR990104Bg' >" +" "
		//+ "</div>";
		document.body.insertAdjacentHTML("beforeEnd",str1);
		var dsbsc04 = new Spry.Data.XMLDataSet("",this.dataset);
		dsbsc04.addObserver(this.preparedsbsc);
		dsbsc04.setURL(gUrl +this.url);
		dsbsc04.loadData();

//======画面にかけるカバーの作成=====
		var popUp = document.getElementById("DVR");
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
	  identifyRetBtn(document.getElementById("DVR990104button2"));
	  
		},
	dosomething :function()
	{
		
		var tem=this;
		var FN	= this.FN;
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
		//画像コピー時のカメラ選択ボタン
		if(Spry.$("DVR-01-07-00-03"))
		{
			obj	=Spry.$("DVR-01-07-00-03");
		}
		var btn2=Spry.$("DVR990104button2");
		btn2.onclick= function(){
			// カバー非表示
			Spry.$('DVR').style.display	= "none";

			Spry.$('DVR990104Container').style.display	= "none";
			tem.notifyObservers("cancel");
			//alert("取消");
			FN.popFocusInfo(obj);
			resRetBtn();		//added by hlzhang @ 20110408

			//タブ順番を処理する @ 20110428
			change0104Focus(btn2,1);
			
			//ポップアップから元の画面フォーカスを戻す
			focusFlag	= 1;
			last_focus	= document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
		};
		var btn1=Spry.$("DVR990104button1");
		btn1.onclick=function(){ 
			// カバー非表示
			Spry.$('DVR').style.display	= "none";

			tem.record			= new Array(); 
			tem.record[0]		= new Array();
			tem.record[0][0]	= null;
			tem.record[1]		= new Array();
			tem.record[1][0]	= null;
			tem.record[2]		= new Array();
			for( i = 1; i < 17; i++ )
			{ 
				tem.record[2][i-1]		= new Array();
				tem.record[2][i-1][2]	= Spry.$("left_"+i).value;
			}
													
			Spry.$('DVR990104Container').style.display	= "none";
//20120906 nakazono mod >>
//			tem.notifyObservers("ok");
//			FN.popFocusInfo(obj);
//
//			//タブ順番を処理する @ 20110428
//			change0104Focus(btn1,1);
//			
//			//ポップアップから元の画面フォーカスを戻す
//			focusFlag	= 1;
//			last_focus	= document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
//20120906 nakazono mod <<>>
			var result_obs = tem.notifyObservers("ok");
			if((result_obs!=undefined) && (result_obs != 1)){

				//タブ順番を処理する @ 20110428
				change0104Focus(btn1,1);
				
				//ポップアップから元の画面フォーカスを戻す
				focusFlag	= 1;
				last_focus	= document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}
//20120906 nakazono mod >>
		};	
	    var btnAdd=Spry.$("add");
		btnAdd.onclick= function(){

			var loop = true;
			var jcount=0;
			var tab=Spry.$("DVR990104tabMiddle");	
		    var row=tab.rows;
			while (loop == true) {
				var obj=Spry.$('DVR990104_'+jcount);
				if(obj != undefined) {
					var obj2=Spry.$('DVR990104td_'+jcount);
					
					if(obj.checked==true)
					{   /* obj.checked=false; */
						var flag=0;
						for(var t=1;t<17;t++)
							{
								if(Spry.$('left_'+t).value==obj.value.split("_")[0])
								{   flag=1;
									break;
								}
							}					
						if(flag==0)
						{
							
							for(var t=1;t<17;t++)
							{
								if(Spry.$('left_'+t).value=="0")
								{   
									Spry.$('left_'+t).value=obj.value.split("_")[0];
									var name = obj.value.replace(obj.value.split("_")[0]+"_","");
									Spry.$('middle_'+t).innerHTML=Spry.Utils.encodeEntities(name);
									Spry.$('left_'+t).disabled=false;
									obj.disabled=true;
									obj2.style.color="gray";
									break;
								}
							}
						} 
					}
					jcount++;
				}
				else {
						loop = false;
					}
			}	
			
			//タブ順番を処理する

			change0104Focus(btnAdd,1);
			
			//追加ボタンを押した、フォーカスをセット
			btnAdd.focus();
			last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
		};
		
		var btnDelete=Spry.$("delete");
		btnDelete.onclick= function(){
		    var tab=Spry.$("DVR990104tabMiddle");	
		    var row=tab.rows;
			for(var i=1;i<17;i++)
			{
			    if(Spry.$('left_'+i).checked==true)
				{

				var loop = true;
				var jcount=0;
				while (loop == true) {
				    var obj=Spry.$('DVR990104_'+jcount);
				    var obj2=Spry.$('DVR990104td_'+jcount);
				    //if(Spry.$('middle_'+i).innerHTML==obj.value.replace(obj.value.split("_")[0]+"_",""))
				    if(Spry.$('left_'+i).value==obj.value.split("_")[0])
				    {
					obj.disabled=false;
					obj.checked=false;
					obj2.style.color="#000000";
					break;
				    }
				    jcount++;
				}



				Spry.$('left_'+i).checked=false;
				Spry.$('left_'+i).disabled=true;
				Spry.$('left_'+i).value="0";
				Spry.$('middle_'+i).innerHTML="";
				}
			}

			for(var i=1;i<17;i++)
			{
			    if(Spry.$('left_'+i).value=="0")
			    {

				for(var j=i+1;j<17;j++)
				{
				    if(Spry.$('left_'+j).value!="0")
				    {
				        Spry.$('left_'+i).value=Spry.$('left_'+j).value;
				        Spry.$('middle_'+i).innerHTML= Spry.$('middle_'+j).innerHTML;
					Spry.$('left_'+j).value="0";
					Spry.$('middle_'+j).innerHTML= "";
					break;

				    }
				}

			    }
			}

			DVR990104_init_checkbox();

			//タブ順番を処理する

			change0104Focus(btnDelete,1);
			
			//削除ボタンを押した、フォーカスをセット
			btnDelete.focus();
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
			var loop = true;
			var rows = dataSet.getData();
			var x=Spry.$('DVR990104reg');
			var str="";
			str=str + "<table class='DVR990104TableRight' id='DVR990104tab' cellpadding='0px;'>" +" ";
			camCnt = 0;
			selectCamCnt=0;
			if( rows.length > 0 ){
				while (loop == true) {
					if(rows[jcount] != undefined) {
						var data=rows[jcount];
			
						str=str + "<tr>"+" "
						   + "  <td class='talbe_right_tr_td' id='DVR990104" + i +" "+ "'>"  
						 //   +"<input type='checkbox' id='DVR990104_" +jcount +"_" +data["recId"] +"'" +" "
						 //   + "name='DVR990104btn' value='" +data["Name"] +"' />"

						   +"<input type='checkbox' id='DVR990104_"+jcount+"'"+ "checked='true' disabled='true'"+" "
						   +"name='DVR990104btn1' value='"+data["recId"]+"_"+data["Name"]+"' onKeydown='td0104Evtsproc(this,0,1)' onmousedown='doSelf99_04_Click(this)' onClick='td0104Evtsproc(this,1,1)'/></td>"

						   +"<td style=\" text-align:center;\" class='table_tr_tdi_add pageBackColor'></td> ";
						   str=str +"<td class='talbe_right_tr_td_1' id='DVR990104td_"+jcount+"'"+ "> ";
						   str=str +data["Name"]+""; //+data["recId"]; // ←koko
						   + "</td>";

						   + "<td></td>" + " ";
	//
						   + "</tr>";

						jcount++;
						//有効データのみを計算する
						selectCamCnt++;
					}
					else {

			                        str=str + "<tr>"+" "
						   + "  <td class='talbe_right_tr_td' id='DVR990104" + i +" "+ "'>"  

						   +"</td>"

						   +"<td style=\" text-align:center;\" class='table_tr_tdi_add pageBackColor'></td> "


						   +"<td class='talbe_right_tr_td_1'>"
						   + "</td>";

						   + "<td></td>" + " ";
	//
						   + "</tr>";

						   jcount++;

						   if (jcount > 16) {
							loop = false;
						   }

					}
				}
			}
			str=str+ "</table>" +" ";
			x.innerHTML=str;
			var i;
			var j;
			var btn=document.getElementsByName("DVR990104btn");
			var h=document.getElementsByName("DVR990104btn");
			var tab=Spry.$("DVR990104tabMiddle");	
		    var row=tab.rows;
			var cnt=0;
			var pos=0;
			var btnindex=new Array(); 
			if(C0104pop.prototype.initdata!=null)
			{
				var record=C0104pop.prototype.initdata;
				var y;
				for(i=0;i<record[2].length;i++)
				{  
						//有効データのみを計算する
						camCnt++;
						for(j=0;j<rows.length;j++)      
						{
						    var valueClar=document.getElementById("DVR990104_"+j).value;
							if(document.getElementById("DVR990104_"+j).value.split("_")[0]==record[2][i][2])
							{  
								if(i<16){                  //david chang 2011.06.22
									document.getElementById("left_"+(i+1)).value=record[2][i][2];
									var name = valueClar.replace(valueClar.split("_")[0]+"_","");
									document.getElementById("middle_"+(i+1)).innerHTML=Spry.Utils.encodeEntities(name);
								}
								break;
							}
	
						}
			
				}	
				cnt=pos;	
				
			}
			for(i=0;i<btn.length;i++)
			{
				btn[i].onclick= function(){ 
					 
							var x=this.id.split("_");
							if(this.style.color!="red")
							{
								if(cnt<16)
								{
									this.style.color="red";
								
									{
									   
									
									  	for(;(row[pos].cells[1].innerText)!="";pos++)
									   	{
										}
										
				                      	row[pos].cells[1].innerHTML=this.value;
										row[pos].cells[2].id=this.id.split("_")[2];
										//row[pos].cells[2].innerHTML=this.id.split("_")[2];//shan
									  	btnindex[x[1]]=pos;
									    pos++;
									}
									 cnt++;
									 
								}
								else{
										alert("max=16");
									 }
								
								
								
							}
							else
							{
								this.style.color="#FFFFFF";
						
								cnt--;
								row[btnindex[x[1]]].cells[1].innerHTML="";
								row[btnindex[x[1]]].cells[2].id=null;
								if(btnindex[x[1]]<pos)
								 pos=btnindex[x[1]];
								
								
								
							}
								
					
													 
												
				};
			}
			DVR990104_init_checkbox();
			rescueFocus(top.rightpage.document.getElementById("selectCameraList"));
			
			dispInputEventStart();
		}
	},
	
	show :function()
	{
		// カバーを表示する
		Spry.$('DVR').style.display					= "block";
		Spry.$('DVR990104Container').style.display	= "block";
		savRetBtn();

		setTimeout(function()
		{
			var firstFocus		= document.getElementById("selectCameraList");	
			firstFocus.tabIndex	= 1;
			firstFocus.focus();
			last_focus			= document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
		},1000);
		
		identifyRetBtn(document.getElementById("DVR990104button2"));
	}
	
};

// マウスダウンの場合
function doSelf99_04_Click(clkObj){
	// 対象が中項目のcheckboxとradio以外の場合、
	if( clkObj.type!="checkbox" && clkObj.type!="radio")
	{
		isIn0104GroupTable=false;//Table域フラグ
		Gamen0104Status=0; // 0:初期状態
	}

	setfocus_click(clkObj);
}

//DIV　KEYが押下された場合、
function div0104Evtproc(flg) {
	// 初期状態以外、反応しない
	if (Gamen0104Status>0) return; 
	//キー押下の場合

	var kcd = event.keyCode;
	if (kcd==13) { //enter key
		event.returnValue = false;
		Gamen0104Status=1; //セル間移動状態に進入
		
		var obj=null;
		var nco=null;
		
		//フォーカスは一番目カメラに
		if(flg == 0){ //対象カメラ

			document.getElementById("selectCameraList").focus();
			if( camCnt > 0 ){
				obj=document.getElementById("left_1");
				if( obj!= null && obj.disabled==true) {
					FocusOn_TDOBJCT=null;
					Gamen0104Status=0;
					isIn0104GroupTable=false;
				} else {
					//obj.checked = true;
					isIn0104GroupTable=true;
				}
			}else{
				Gamen0104Status=0;
				isIn0104GroupTable=false;
			}
		}else{//選択カメラ

			document.getElementById("camera0104List").focus();
			if( selectCamCnt > 0){
				obj=document.getElementById("DVR990104_0");
				if(obj.disabled==true) {
					nco=Get0104NextActiveCel(obj,1,1,4);
					if(nco.disabled==false) {
						obj = nco;
						//obj.checked = true;
						isIn0104GroupTable=true;
					} else {
					    FocusOn_TDOBJCT=null;
					    Gamen0104Status=0;
					    isIn0104GroupTable=false;
					}
				} else {
					//obj.checked = true;
					isIn0104GroupTable=true;
				}
			}else{
				Gamen0104Status=0;
				isIn0104GroupTable=false;
			}
		}
		stopDefaultling(event);
		
		if (Gamen0104Status == 1) {
		  obj.style.background='#BCBAFA'; 
		  obj.focus();
		  last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
		  FocusOn_TDOBJCT=obj;
		  event.returnValue = false;
		}
	}
	if (kcd!=9 && kcd!=8) { //tab key & backspace key
		event.returnValue = false;
	}
}

//TD　KEYが押下され、又はマウスクリックした場合、
	function td0104Evtsproc(obj,mouseflg,groupFlag) {
		//
		if (mouseflg==1) {
			// 初期状態の場合
			if (Gamen0104Status==0) {
				Gamen0104Status=1; //セル間移動状態に進入
				isIn0104GroupTable=true;
				//フォーカスはクリックされたカメラに
				obj.style.background='#BCBAFA'; 
				obj.focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
				FocusOn_TDOBJCT=obj;
				return; 
			}
			
			if (Gamen0104Status==1) {
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
			if (Gamen0104Status==1) {
				//キー押下の場合

				var kcd = event.keyCode;
				var nco=null;
				switch(kcd) {
					case 37: // 左
						//フォーカスはクリックされたカメラに
						/*obj.parentNode.style.background=''; 
						if(groupFlag == 0){
							nco=GetNextActiveCelForSelectCamera(obj,1,1,1);
						}else{
							nco=Get0104NextActiveCel(obj,1,1,1);
						}
						nco.style.background='#BCBAFA';  
						nco.focus();
						FocusOn_TDOBJCT=nco;*/
						event.returnValue=false;
						break;
					case 9: // tab key
						//フォーカスはクリックされたカメラに
						stopDefaultling(event);
						obj.parentNode.style.background=''; 
						if(groupFlag == 0){
							
							if(event.shiftKey){ //Shift + tab
								nco=GetNextActiveCelForSelectCamera(obj,1,1,3);
							}else{
								nco=GetNextActiveCelForSelectCamera(obj,1,1,2);
							}
						}else{
							if(event.shiftKey){ //Shift + tab
								nco=Get0104NextActiveCel(obj,1,1,3);
							}else{
								nco=Get0104NextActiveCel(obj,1,1,4);
							}
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
						if(groupFlag == 0){
							nco=GetNextActiveCelForSelectCamera(obj,1,1,2);
						}else{
							nco=Get0104NextActiveCel(obj,1,1,2);
						}
						nco.style.background='#BCBAFA';  
						nco.focus();
						FocusOn_TDOBJCT=nco;*/
						event.returnValue=false;
						break;
					case 38: //上

	
						//フォーカスはクリックされたカメラに
						obj.parentNode.style.background='';
						if(groupFlag == 0){
							nco=GetNextActiveCelForSelectCamera(obj,1,1,3);
						}else{
							nco=Get0104NextActiveCel(obj,1,1,3);
						}
						nco.style.background='#BCBAFA'; 
						nco.focus();
						last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
						FocusOn_TDOBJCT=nco;
						event.returnValue=false;
						break;
					case 40: //下
						//フォーカスはクリックされたカメラに
						obj.parentNode.style.background=''; 
						if(groupFlag == 0){
							nco=GetNextActiveCelForSelectCamera(obj,1,1,4);
						}else{
							nco=Get0104NextActiveCel(obj,1,1,4);
						}
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
						Gamen0104Status=0; //セル間移動状態に進入
						isIn0104GroupTable=false;
						stopBubbling(event);	
						if(groupFlag == 0){
							document.getElementById("selectCameraList").focus();
							last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
						}else{
							document.getElementById("camera0104List").focus();
							last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
						}
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
function Get0104NextActiveCel(co,rno,cno,flg) {
	var rowmax =document.getElementsByName("DVR990104btn1").length;//テーブルにカメラ個数

	rno = parseInt(co.id.substring(10))+1 ;
	var obj=null;
	switch(flg) {
	   case 1: // 左
			rno--;
			if (rno<1) {
				rno=1;
			}
			obj=document.getElementById("DVR990104_" + (rno-1) );
		 break;
	   case 2: // 右
			rno++;
			if (rno>rowmax) {
				rno=rno-1;
			}

			obj=document.getElementById("DVR990104_" + (rno-1) );
		
		 break;
	   case 3: // 上

			while(true){
			rno--;
			if (rno<1) {
				rno=1;
				break;
			}
			obj=document.getElementById("DVR990104_" + (rno-1) );
			if (obj) {
			} else {
				break;
			}
			if(obj.disabled == false) {
				break;
			}
			}
		 break;
	   case 4: // 下
			while(true){
			rno++;
			if (rno>rowmax) {
				rno=rno-1;
				break;
			}
			obj=document.getElementById("DVR990104_" + (rno-1) );
			if (obj) {
			} else {
				break;
			}
			if(obj.disabled == false) {
				break;
			}
			}
		 break;
	   default:
   	}
	return obj;
}

//カメラ一覧にキー移動時、移動先を探し出す処理
function GetNextActiveCelForSelectCamera(co,rno,cno,flg) {
	rno = parseInt(co.id.substring(5)) ;
	var obj=null;
	switch(flg) {
	   case 1: // 左
			rno--;
			if (rno<1) {
				rno=1;
			}
			obj=document.getElementById("left_" + rno );
		 break;
	   case 2: // 右
			rno++;
			if (rno>16) {
				rno=16;
			}

			obj=document.getElementById("left_" + rno );
		
		 break;
	   case 3: // 上

			rno--;
			if (rno<1) {
				rno=1;
			}
			obj=document.getElementById("left_" + rno );
		 break;
	   case 4: // 下
			rno++;
			if (rno>16) {
				rno=16;
			}
			obj=document.getElementById("left_" + rno );
		 break;
	   default:
   	}
	return obj;
}

//方向キーにて、フォーカスを遷移させる処理
function change0104Focus(obj,flag) {
	if(flag==1){
		if(Gamen0104Status>0){
			Gamen0104Status =0;
			isIn0104GroupTable=false;
		}
	}else{
		if (Gamen0104Status>0) return; 
		if (isIn0104GroupTable) return;
		//キーコードを取得
		var keyCd = event.keyCode;
		
		//タブキー押下、次の元素がフォーカスをセット
		
		if(keyCd==9 && !isIn0104GroupTable){
			if(event.shiftKey){// Shift + tab
				
				var arrLen = Focus0104TagList.length;
				var arrIdx;
				for (arrIdx=0;arrIdx<arrLen;arrIdx++) {
					if (obj.id==Focus0104TagList[arrIdx][0]) {
						stopDefaultling(event);
						document.getElementById(Focus0104TagList[arrIdx-1][0]).focus();
						last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
						return;
					}
				}
				
			}else{		// tab
				if(obj.id=='DVR990104button2'){
					stopDefaultling(event);
					//document.getElementById("selectCameraList").focus();
					return;
				}
				
				var arrLen = Focus0104TagList.length;
				var arrIdx;
				for (arrIdx=0;arrIdx<arrLen;arrIdx++) {
					if (obj.id==Focus0104TagList[arrIdx][0]) {
						stopDefaultling(event);
						document.getElementById(Focus0104TagList[arrIdx+1][0]).focus();
						last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
						return;
					}
				}
			}
		}

		//entry key 
		if (keyCd==13 && !isIn0104GroupTable){
			if(obj.type=="button"){
				//stopBubbling(event);      //change david 2011.06.22
				return;
			}else{
				if( (camCnt > 0) && (FocusOn_TDOBJCT !=null) ){
					isIn0104GroupTable=true;
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
			for (iLoop=0;iLoop<Focus0104TagList.length;iLoop++) {
				if (obj.id==Focus0104TagList[iLoop][0]) {
					tagExistFlg = true;
					stopDefaultling(event);			
					stopBubbling(event);
					break;
				}
			}
			//存在すれば、下記を処理する

	
			//上方キーの場合、遷移先があるかを判断し、ある場合、遷移する

			if (keyCd==38 && tagExistFlg && Focus0104TagList[iLoop][1]!="") { //上

				document.getElementById(Focus0104TagList[iLoop][1]).focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}
			//下方キーの場合、遷移先があるかを判断し、ある場合、遷移する

			if (keyCd==40 && tagExistFlg && Focus0104TagList[iLoop][2]!="") { //下
				document.getElementById(Focus0104TagList[iLoop][2]).focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}
			//左方キーの場合、遷移先があるかを判断し、ある場合、遷移する

			if (keyCd==37 && tagExistFlg && Focus0104TagList[iLoop][3]!="") { //左
				document.getElementById(Focus0104TagList[iLoop][3]).focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}
			//右方キーの場合、遷移先があるかを判断し、ある場合、遷移する

			if (keyCd==39 && tagExistFlg && Focus0104TagList[iLoop][4]!="") { //右
				document.getElementById(Focus0104TagList[iLoop][4]).focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}
		}
	}
}

function td0104OnclickEvent(obj,flag){
	if(flag==1){
		if(document.activeElement.id == "camera0104List" || document.activeElement.id == "selectCameraList"){
			if(Gamen0104Status>0){
				Gamen0104Status =0;
				isIn0104GroupTable=false;
			}
		}
	}
}
