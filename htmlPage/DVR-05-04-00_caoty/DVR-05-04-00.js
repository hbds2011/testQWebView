var cgi_using=false;			//CGI応答待ちかどうかを管理するフラグ
//glbDebugFlag = false;
// JavaScript Document
var serUrl		= gUrl;
var allPageNum	= 1;
var pageNum		= 1;
var printRecNum	= 5;		// １画面上に表示するレコード数
var totalNum	= 0;

//var dsError  = new Spry.Data.XMLDataSet("serUrl+"/cgi-bin/DVR-05-04-00.cgi?DVR-05-04-00-00=1&PAGE=" + pageNum + "&OUTPUT=" + printRecNum", "Result",{useCache:false});
var dsError  = new Spry.Data.XMLDataSet("DVR-05-04-00_result.xml", "Result",{useCache:false});
var dsError2 = new Spry.Data.NestedXMLDataSet(dsError, "TotalRows");
var dsError1 = new Spry.Data.NestedXMLDataSet(dsError, "ErrorList/Error");
var dsError1_click = new Spry.Data.XMLDataSet(null, "Result/ErrorList/Error");
var dsError2_click = new Spry.Data.XMLDataSet(null, "Result/TotalRows");
var myObserverdsErrorRegion = new Object ;
var iCount		= 100 ;
var enterID		= "DVR-05-04-01";
var initId		= "DVR-05-04-01";
var lastClickId	= '';
var enterPara	= 1 ;
var xmlHttp		= null;
var flag;
var errContent	= new Array();
var clickId		= "DVR-05-04-01";
var obj			= document.createElement("input");
var isNullDataFlag = 0;		//1 presents is,0 presents not
var Datasubmitting = false; //異常確認の動作の処理中フラグ
var dsTemp=new  Spry.Data.XMLDataSet(gUrl+"/cgi-bin/DVR-99-01-07.cgi", "Result") ;
var BOTHDISABLED		=1;
var ONLYUPDISABLED		=2;
var ONLYDOWNDISABLED	=3;
var BOTHAVLAIBLE		=4;
var isHDfullError		= new Boolean(false);
var sbmtArr				= new Array();
var clkObj;
var timeID		= 0;		// 再描画のキャンセル処理に使用
var noErrCount	= 0;
var reDrawTime	= 1500;		// 再読込みタイマー
var list_start;
var list_end;
var focusFlg;				//マウス操作「前へ」は0、「次へ」は1、リモコン操作は2
var fastFlag	= true;		//cgiの読込が5s定期のものかユーザー操作によるものかを判断するフラグ
tabIdSequence = new Array  (
							 'DVR99-02-01_button1',	
							 'DVR99-02-01_button2'
							 );

var keyUsable = true;//キー操作有効/無効を管理するフラグ(連打防止のため)
var keyUsable2 = true;//キー操作有効/無効を管理するフラグ(連打防止のため)

//本画面で使用する色及び枠線の定義
var WHITECOLOR		= "#FFF";					//白色		復旧済の枠線、非選択リストの文字色
var FOCUSBGCOLOR	= "#0CF";					//水色		選択リストの背景色
var BLACKCOLOR		= "#000";					//黒色		選択リストの文字色
var REDCOLOR		= "#F00";					//赤色		異常発生中リストの枠線色
var BLUECOLOR		= "#00F";					//青色		選択リストの枠線色(選択リストが異常発生中の場合は枠線は赤色)
var BLUEBORDER		= "solid 1px " + BLUECOLOR;	//青枠線	選択中リスト(異常復旧済)の枠線
var REDBORDER		= "solid 1px " + REDCOLOR;	//赤枠線	異常発生中リストの枠線(選択、非選択に関わらず赤色)
var WHITEBORDER		= "solid 1px " + WHITECOLOR;//白枠線	非選択リスト(異常復旧済)の枠線

function preparedsError2(notificationType, dataSet, dat)
{
	
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "preparedsError2 start");
	if (notificationType == "onPostLoad") 
	{
		consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "preparedsError2 onPostLoad");
		totalNum=0;

		var iCycleCount ;
		var maxNumber; 

		err2Row = dataSet.getData();
		
		if(err2Row.length!=0)
		{
			if(err2Row[0]["TotalRows"])
			{
				totalNum = err2Row[0]["TotalRows"];
//alert("TotalRows:"+totalNum);
			}
			
			consoleLogOutputFor05_04(4,"DVR-05-04-00.js",arguments.callee.name,"CGI処理完了2" +"["+err2Row.length +"]["+totalNum+"]");
			// totalNum=210;
			if(( totalNum%printRecNum ) == 0 ) 
			{	
				allPageNum = totalNum / printRecNum;
			}
			else
			{
				allPageNum = ( totalNum - totalNum%printRecNum ) / printRecNum + 1;
			}
			if( allPageNum == 0 ){  allPageNum = 1; }

			// レコード削減時に全ページ数が現在のページ番号より小さくなった場合の対応
			if( pageNum > allPageNum )
			{
				pageNum = allPageNum;
				enterID = "controlBtn";
				lastClickId = enterID;
			}

			iCount=100;

			// ページ送りボタンの状態更新
			pageButtonRefresh();

		}
		else//dataset is null
		{
			consoleLogOutputFor05_04(4,"DVR-05-04-00.js",arguments.callee.name,"CGI処理完了2(異常一覧リストなし)");
			list_start = 0;
			list_end = 0;
			document.getElementById("errlist").innerHTML = "";
			innerContent(noErrCount);
			//do nothing.
			document.getElementById("upBtn").disabled = true;
			document.getElementById("downBtn").disabled = true;
			
			document.getElementById("controlBtn").focus();
			last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
		}
		consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "preparedsError2 onPostLoad end");
	}
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "preparedsError2 end");
}
addSpryDataSetObserver(dsError2, preparedsError2);

function preparedsError2_click(notificationType, dataSet, dat)
{

	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "preparedsError2_click start");
	totalNum=0;

	var iCycleCount ;
	var maxNumber; 

     err2Row = dataSet.getData();
	 
	 if(err2Row.length!=0)
	 {
		if(err2Row[0]["TotalRows"])
		{
			 totalNum = err2Row[0]["TotalRows"];
alert("Result/TotalRows:"+totalNum);
		}
		
		if(( totalNum%printRecNum ) == 0 ) 
		{
			allPageNum = totalNum / printRecNum;
		}
		else
		{
			allPageNum = ( totalNum - totalNum%printRecNum ) / printRecNum + 1;
		}
		if( allPageNum == 0 ){  allPageNum = 1; }

		// レコード削減時に全ページ数が現在のページ番号より小さくなった場合の対応
		if( pageNum > allPageNum )
		{
			pageNum = allPageNum;
			enterID="controlBtn";
			lastClickId = enterID;
		}

		iCount=100;

		// ページ送りボタンの状態更新
		pageButtonRefresh();

	}
	else//dataset is null
	{
		document.getElementById("errlist").innerHTML = "";
		innerContent(noErrCount);
		//do nothing.
		document.getElementById("upBtn").disabled = true;
		document.getElementById("downBtn").disabled = true;
		
		document.getElementById("controlBtn").focus();
		last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
	}
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "preparedsError2_click end");
}
addSpryDataSetObserver(dsError2_click, preparedsError2_click);//add by djwan @20110425

function preparedsError1(notificationType, dataSet, dat)
{
	
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "preparedsError1 start");
	if (notificationType == "onPostLoad") {
		consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "preparedsError1 onPostLoad start");
		var iCycleCount ;//ループフラグ
		var maxNumber; //cgiから得られた全異常件数
		var pageMax = Number(list_end); //cgiから得られた表示されているページの総件数
		errContent = dataSet.getData();
		consoleLogOutputFor05_04(4,"DVR-05-04-00.js",arguments.callee.name,"CGI処理完了2:" + errContent.length);

		consoleLogOutputFor05_04(4,"DVR-05-04-00.js",arguments.callee.name,"ポーリング処理の停止");
		clearInterval( timeID );
		consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "fastFlag = " + fastFlag);
		if(fastFlag == true)
		{
			//setTimeout( continuousCall, 0 );
			fastFlag = false;
		}
		else
		{
			
//nakazono add #10218 #10219 >>
//			timeID = setInterval( continuousCall, reDrawTime );
			//timeID = mySetInterval( continuousCall, reDrawTime );
//nakazono add #10218 #10219 <<
		}

		if(errContent.length!=0)
		{
			maxNumber = Number(errContent.length);
			for(iCycleCount=0;iCycleCount<maxNumber;iCycleCount++)
			{
				consoleLogOutputFor05_04(4,"DVR-05-04-00.js",arguments.callee.name,"異常一覧リスト作成処理2(" + (iCycleCount+1) + "/" + maxNumber + "回目)"
					+"["+errContent[iCycleCount]["@MfgId"]+"]"
					+"["+errContent[iCycleCount]["@Date"]+"]"
					+"["+errContent[iCycleCount]["@Time"]+"]"
					+"["+errContent[iCycleCount]["@Code"]+"]"
					+"["+errContent[iCycleCount]["@Name"]+"]"
					+"["+errContent[iCycleCount]["@ErrorKind"]+"]"
					+"["+errContent[iCycleCount]["@Status"]+"]"
					+"["+errContent[iCycleCount]["@ErrorID"]+"]"
					+"["+errContent[iCycleCount]["@Net_MID"]+"]");
				createbut(errContent[iCycleCount]["@MfgId"],errContent[iCycleCount]["@Date"],errContent[iCycleCount]["@Time"],errContent[iCycleCount]["@Code"],errContent[iCycleCount]["@Name"],errContent[iCycleCount]["@ErrorKind"],errContent[iCycleCount]["@Status"],errContent[iCycleCount]["@ErrorID"],errContent[iCycleCount]["@Net_MID"]) ;
				//××件−××件表示部分の件数の、先頭の0表示を削除する
				if(iCycleCount==0){
					list_start=errContent[iCycleCount]["@MfgId"];
					list_start=list_start.replace(/^0+([0-9]+.*)/, "$1");
				}
				if(iCycleCount==maxNumber-1){
					list_end=errContent[iCycleCount]["@MfgId"];
					list_end=list_end.replace(/^0+([0-9]+.*)/, "$1");
				}
			}          //dave 2011.04.30 add the errContent[iCycleCount]["@Net_MID"]
			iCount=100;
//alert("ErrorList/Error:"+totalNum);
			innerContent(totalNum);
			isNullDataFlag=0;
		}
		
		
		

		//set focus on downBtn
		if(errContent.length==0)
		{
			list_start = 0;
			list_end = 0;
			enterID="controlBtn";
			lastClickId = enterID;
			isNullDataFlag=1;
				
			//djwan @20110511  bugfix  NVRD-0368_SC_NVR_0414  start
			document.getElementById("upBtn").disabled=true;
			
			document.getElementById("downBtn").disabled=true;
			innerContent(noErrCount);
		}
		consoleLogOutputFor05_04(4,"DVR-05-04-00.js",arguments.callee.name,"画面表示処理完了2(showpage)");
		showPage();
		consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "preparedsError1 onPostLoad end");
	}
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "preparedsError1 end");
	
}
addSpryDataSetObserver(dsError1, preparedsError1);

//add by djwan @20110425
function preparedsError1_click(notificationType, dataSet, dat)
{
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "preparedsError1_click start");
	var iCycleCount ;
	var maxNumber; 
	
	var oldErrContent=errContent;
	var parentDiv=document.getElementById("errlist");
	var childs=parentDiv.childNodes;
    errContent = dataSet.getData();
alert("Result/ErrorList/Error:"+errContent.length);
	consoleLogOutputFor05_04(4,"DVR-05-04-00.js",arguments.callee.name,"CGI処理完了1:" + errContent.length);

	consoleLogOutputFor05_04(4,"DVR-05-04-00.js",arguments.callee.name,"ポーリング処理の停止");
    clearInterval( timeID );
//nakazono add #10218 #10219 >>
//	timeID = setInterval( continuousCall, reDrawTime );
	//timeID = mySetInterval( continuousCall, reDrawTime );
//nakazono add #10218 #10219 <<
    
	sbmtArr=null;		
	if(errContent.length!=0)
	{
		//first remove all child  in errlist
		for(var i = childs.length - 1; i >= 0; i--) {   
			parentDiv.removeChild(childs[i]);   
		}  
		
		maxNumber = Number(errContent.length) ;
		for(iCycleCount=0;iCycleCount<maxNumber;iCycleCount++)
		{
			consoleLogOutputFor05_04(4,"DVR-05-04-00.js",arguments.callee.name,"異常一覧リスト作成処理1(" + (iCycleCount+1) + "/" + maxNumber + "回目)"
																																+"["+errContent[iCycleCount]["@MfgId"]+"]"
																																+"["+errContent[iCycleCount]["@Date"]+"]"
																																+"["+errContent[iCycleCount]["@Time"]+"]"
																																+"["+errContent[iCycleCount]["@Code"]+"]"
																																+"["+errContent[iCycleCount]["@Name"]+"]"
																																+"["+errContent[iCycleCount]["@ErrorKind"]+"]"
																																+"["+errContent[iCycleCount]["@Status"]+"]"
																																+"["+errContent[iCycleCount]["@ErrorID"]+"]"
																																+"["+errContent[iCycleCount]["@Net_MID"]+"]");
			createbut(errContent[iCycleCount]["@MfgId"],errContent[iCycleCount]["@Date"],errContent[iCycleCount]["@Time"],errContent[iCycleCount]["@Code"],errContent[iCycleCount]["@Name"],errContent[iCycleCount]["@ErrorKind"],errContent[iCycleCount]["@Status"],errContent[iCycleCount]["@ErrorID"],errContent[iCycleCount]["@Net_MID"]) ;
			//××件−××件表示部分の件数の、先頭の0表示を削除する
			if(iCycleCount==0){
				list_start=errContent[iCycleCount]["@MfgId"];
				list_start=list_start.replace(/^0+([0-9]+.*)/, "$1");
			}
			if(iCycleCount==maxNumber-1){
				list_end=errContent[iCycleCount]["@MfgId"];
				list_end=list_end.replace(/^0+([0-9]+.*)/, "$1");
			}
		}
		
		iCount=100;
		innerContent(totalNum);
		isNullDataFlag=0;
	}
	//set focus on downBtn
	if(errContent.length==0)
	{
		list_start = 0;
		list_end = 0;
		enterID="controlBtn";
		lastClickId = enterID;
		isNullDataFlag=1;
		document.getElementById("upBtn").disabled=true;
		
		document.getElementById("downBtn").disabled=true;
			
		/*document.getElementById("upBtn").style.display="none";//djwan
			
		document.getElementById("downBtn").style.display="none";*/
		document.getElementById("errlist").innerHTML = "";
	}
	
	consoleLogOutputFor05_04(4,"DVR-05-04-00.js",arguments.callee.name,"画面表示処理完了1(showpage)");
	showPage();
	//document.getElementById(enterID).focus() ;
	firstFocus();//djwan
	last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる

	innerContent(totalNum);

	//枠線の色を整える処理
	var objectID;
	for(var iLoop=1;iLoop<=8;iLoop++)
	{
		objectID = "DVR-05-04-0" + iLoop;
		if (document.getElementById(objectID))
		{
			//1、異常発生中のリストは常に枠線は赤色
			if(document.getElementById(objectID).className=="DVR0504newErrBtn")
			{
				document.getElementById(objectID).style.border = REDBORDER ;
			}
			//2、選択中のリストは枠線は青色
			else if(objectID == enterID)
			{
				document.getElementById(objectID).style.border = BLUEBORDER ;
			}
			//3、その他は白色
			else
			{
				document.getElementById(objectID).style.border = WHITEBORDER ;
			}
		}
	}
	//画面を表示したらフラグを落として次のポーリング処理までは操作可能にする
	cgi_using=false;
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "cgi_using = " + cgi_using);
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "preparedsError1_click end");
	
}
addSpryDataSetObserver(dsError1_click, preparedsError1_click);//add by djwan @20110425

function screenChange()
{
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "screenChange start");
	consoleLogOutputFor05_04(4,"DVR-05-04-00.js",arguments.callee.name,"START");
	
	//----デバッグエリア(デバッグコンソール)の作成----//
	createDebugArea();
	//--------------------作成完了--------------------//
	
	//-----------計測開始(本関数の使用開始)-----------//
	iDebug(arguments.callee.name + " start");
	//------------------------------------------------//

	//alert("come in");
	var params = Spry.Utils.getLocationParamsAsObject() ;
	var mainCode = params.screenFlag.toString(); 
	//alert("mainCode="+mainCode);
	flag = 1;
	
	if(mainCode!=undefined&&mainCode!=null){
		for(i=1;i<=mainCode.length;i++){
			if(i==5){
				flag = mainCode.substring(i-1,i); 
			}
		}
	}

	// NTSC
	if(flag==0)
	{
		document.getElementById("DVR99-00-00css").href	= "../DVR-99/DVR-99-00-00-VGA.css";
		document.getElementById("DVR0504myCSS").href	= "DVR-05-04-00-VGA.css";
	}
	// IX
	else if(flag==3)
	{
		document.getElementById("DVR99-00-00css").href	= "../DVR-99/DVR-99-00-00-VGA-BIG.css";
		document.getElementById("DVR0504myCSS").href	= "DVR-05-04-00-VGA-BIG.css";
	}
	// XGA(4:3), Full-HD(16:9)
	else
	{
		document.getElementById("DVR0504myCSS").href	= "DVR-05-04-00.css";
	}
	var observer	= new Object;
	var dsPSP		= new Spry.Data.XMLDataSet(serUrl + "/cgi-bin/DVR-99-00-00.cgi?WithoutRefleshMemory=1", "Results") ;
	addSpryDataSetObserver(dsPSP,observer,OBSERVER_HINT_MODE_INIT) ;
	observer.onPostLoad = function(dataSet, data){
		var row = dataSet.getData() ;
		pageMagnification = row[0]["ZoomSize"];
		consoleLogOutputFor05_04(4,"DVR-05-04-00.js",arguments.callee.name,"縮小率取得CGI処理完了:" + pageMagnification);
		if( pageMagnification != null && pageMagnification != undefined )
		{
			document.body.style.zoom = getScaling(pageMagnification);
		}
	};

	// 常にZoomSizeを取得するのではなく、アナログ，デカ文字表示時のみ取得し、設定する様に変更
	if( flag == 0 || flag == 3 )
	{
		consoleLogOutputFor05_04(4,"DVR-05-04-00.js",arguments.callee.name,"アナログ画面のため縮小率取得CGI発行:" + flag);
		dsPSP.loadData();
	}

	createPageTimer("DVR-05-04-00");
	document.getElementById("C-MainsideRight").className = "";//add by djwan @20110413
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "screenChange end");

	//-----------計測終了(本関数の使用終了)-----------//
	iDebug(arguments.callee.name + " end");
	//------------------------------------------------//
}

//inner the count of the errors 
function innerContent(errCount)
{
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "innerContent start");
	consoleLogOutputFor05_04(4,"DVR-05-04-00.js",arguments.callee.name,"異常件数表示処理(件数:" + errCount +")");

	var countID = document.getElementById("DVR0504title") ;	
	if(errCount==list_start && errCount==list_end){
		//最終ページが1件のみの表示の場合
		countID.innerHTML = "異常一覧&nbsp;"+list_end+"件/（全"+errCount+"件）" ;
	}
	else if(list_start==undefined || list_end==undefined){
		countID.innerHTML = "異常一覧&nbsp;0-0件/（全"+errCount+"件）" ;
	}
	else {
		countID.innerHTML = "異常一覧&nbsp;"+list_start+"-"+list_end+"件/（全"+errCount+"件）" ;
	}
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "innerContent end");
	
}

function createbut(MfgId,EDate,Time,Code,Name,Error,Status,ErrorID,NetID)
{
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "createbut start");
	var parentB ;
	var newbutton ;
	var iCountS ;
	var iCountSID ;
	iCount++ ;
	iCountS = iCount.toString() ;
	iCountSID = iCountS.substring(1,3) ;
	parentB = document.getElementById("errlist") ;
	newbutton = document.createElement("button") ;
	newbutton.id = "DVR-05-04-"+iCountSID ;
	newbutton.name = "DVR-05-04-List-Button";
	var errId = Number(ErrorID) ;
	var netId = Number(NetID) ;
	var errKind=Error;//djwan @20110523

	newbutton.onclick = function(){clickProcess(this.id);doCheck('MOUSE');};//djwan @20110523
//Terry20110504文言変更	if(Status=="未確認"){
	if(Status=="異常発生中"){//djwan @20110506
		newbutton.className = "DVR0504newErrBtn" ;
	}
	else{
		newbutton.className = "DVR0504newBtn" ;
	}
	//newbutton.innerHTML = "<div align=left>"+MfgId+"&nbsp;&nbsp;"+EDate+"&nbsp;&nbsp;"+Time+"<br/>"+Code+"&nbsp;&nbsp;"+Name+"&nbsp;&nbsp;"+Error+"&nbsp;&nbsp;"+Status+"</div>";
	//var tmpStr =     "<table align=left cellspacing=0px style=padding:0px; margin:0px;><tr align=left><td style=width:2.5em;>" + MfgId + "</td><td class=font_Rg style=width:13em;>" + EDate + "&nbsp;&nbsp;" + Time + "</td><td align=left style=width:10em;>" + Status + "</td></tr></table>";
	//tmpStr= tmpStr + "<table align=left cellspacing=0px style=padding:0px; margin:0px;><tr align=left><td style=width:2.5em;>" + Code + "</td><td style=width:13em;>" + Name + "</td><td align=left style=width:10em;>" + Error + "</td></tr></table>";
	var tmpStr =     "<table align=\"left\" cellspacing=\"0px\" style=\"padding:0px; margin:0px;\" class=\"font_Rg\"><tr align=\"left\"><td class=\"td1\">" + Spry.Utils.encodeEntities(MfgId) + "</td><td class=\"td2\">" + Spry.Utils.encodeEntities(EDate) + "&nbsp;" + Spry.Utils.encodeEntities(Time) +"</td><td align=\"left\" class=\"td3\">" + Spry.Utils.encodeEntities(Status) + "</td></tr></table>";
	tmpStr= tmpStr + "<table align=\"left\" cellspacing=\"0px\" style=\"padding:0px; margin:0px;\" class=\"font_Rg\"><tr align=\"left\"><td class=\"td1\">" + Spry.Utils.encodeEntities(Code) +  "</td><td class=\"td2\">" + Spry.Utils.encodeEntities(Name) + "</td><td align=\"left\" class=\"td3\">" + Spry.Utils.encodeEntities(Error) + "</td></tr></table>";
	newbutton.innerHTML = tmpStr;

	//djwan @20110523 start
	var subArr=new Array(newbutton.id,errId,netId,errKind,Status);
	if(!sbmtArr){
		sbmtArr=new Array();
	}
	sbmtArr.push(subArr);//put sub Array into parent array
	//djwan @20110523 end
	parentB.appendChild(newbutton) ;
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "createbut end");
}

//setTimeout呼び出し時に関数に引数をセットさせるためにグローバル定義しておく
var g_errId;
var g_netId;
var g_errKind;
var g_status;
var g_saiki = false;		//再起処理かどうかを判断するフラグ

//addSpryRegionObserver("errlist", myObserverdsErrorRegion);		//modified 10.12.03(Spry.Data.Region.addObserver)
//the process to send data to cgi with Ajax-style
function submitData(errId,netId,errKind,status)
{
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "submitData start");
	keyUsable = false;

	//再起処理による呼出であればグローバル領域に退避させておいた変数を呼び戻す
	if(g_saiki == true)
	{
		g_saiki = false;
		errId = g_errId;
		netId = g_netId;
		errKind = g_errKind;
		status = g_status;
	}

	var objF = document.getElementById("DVR050400form") ;
	var exeID;  // CGI実行種別
	
	if( isHDfullError == false )
	{
		exeID = 1;  // 確認ボタン押下通知
	}
	else
	{
		exeID = 2;  // リリース確認
	}
	
	// CGI応答待ち中
	if(cgi_using == true)
	{
		//変数の内容をグローバル領域に退避(setTimeoutに引数をセットするのはムリなので・・・)
		g_errId = errId;
		g_netId = netId;
		g_errKind = errKind;
		g_status = status;
		g_saiki = true;
		setTimeout("submitData()",0);
		consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "submitData end 1");
		return;
	}

	// 定期の異常最新情報の処理の排他の為に（同時に複数CGIを実行できませんので）、
	// 排他フラグを立ち上げ
	Datasubmitting = true;

	//objF.action = serUrl +"/cgi-bin/DVR-05-04-00.cgi?DVR-05-04-00-00=1"+"&DVR-05-04-00-01="+ errId +"&DVR-05-04-00-02="+ netId +"&DVR-05-04-00-03="+ exeID + "&PAGE=" + pageNum + "&OUTPUT=" + printRecNum; //mod by djwan @20110523
	objF.action ="DVR-05-04-00_result.xml";

	//submitForm("DVR050400form",DVR050400stateChanged,null,true); //djwan @20110523 ;			//modified 10.12.03(Spry.Utils.submitForm)
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "submitData end");
	submitForm("DVR050400form",DVR050400stateChanged);
	
}

//the callback function for the submitData() to check whether it's successful to send data completly
function DVR050400stateChanged(req) 
{ 
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "DVR050400stateChanged start");
	keyUsable = true;
	var aim = /<Success>(\d+)<\/Success>/ ;	
	var resData =  req.xhRequest.responseText ;
	var result = resData.match(aim) ;
	if(result){
		
		if( isHDfullError == true ){
			if(result[1]==0){//fail
				var pop_updIdFail=new actionPop(gettext("DVR-05-04-00-02"),1,"戻る","");//show the waiting popUp that defined by yourself
				setDVRDivStyle();
				Spry.$('DVR_popUp').onkeydown=function(){dvrKeyEvt();};
				pop_updIdFail.addObserver(doSomethings);
				pop_updIdFail.show();
				
			}else if(result[1]==1){//succeed
				var pop_updIdSuc=new actionPop(gettext("DVR-05-04-00-01"),1,"戻る","");//show the waiting popUp that defined by yourself
				setDVRDivStyle();
				Spry.$('DVR_popUp').onkeydown=function(){dvrKeyEvt();};
				pop_updIdSuc.addObserver(doSomethings);
				pop_updIdSuc.show();
				
				
			}
		}
	}
	isHDfullError = false;
	// 異常確認の動作が完了した後、定期処理を再開可能になる
	Datasubmitting = false;
	continuousCall();
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "DVR050400stateChanged end");
	
}


//add  djwan
function dvrKeyEvt(){
	
	
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "dvrKeyEvt start");
	if(event.keyCode==27)//add by djwan 20110411
		{
			document.getElementById('DVR9901_button1').click();
			stopBubbling(event);
			
		}
	if(event.keyCode==9){
		stopDefaultling(event);	
	}
	if(event.keyCode==13){//add by djwan @20110509 fix invalid Enterkey
		document.getElementById('DVR9901_button1').click();
		stopDefaultling(event);	
		stopBubbling(event);
		
	}
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "dvrKeyEvt end");
		
	
}


//add  djwan
function dvrKeyEvt_Cfm(){
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "dvrKeyEvt_Cfm start");
	
	if(event.keyCode==27)//add by djwan 20110411
		{
			document.getElementById('DVR99-02-01_button2').click();
			stopBubbling(event);
			
		}
	if(event.keyCode==9 || event.keyCode==37 ||event.keyCode==38 ||event.keyCode==39 ||event.keyCode==40){
		emuTab(true);
		stopDefaultling(event);	
		stopBubbling(event);
	}
	if(event.keyCode==13){//add by djwan @20110524 fix invalid Enterkey
		emuTab(true);
		//document.getElementById('DVR9901_button1').click();
		//var fcsObj=document.
		stopDefaultling(event);	
		stopBubbling(event);
		
	}
	
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "dvrKeyEvt_Cfm end");
	
}


//the PopUp's callback function by djwan
function doSomethings(methodName)
{   
	

	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "doSomethings start");
	if(methodName=="done"){ 
	
		try{
			
			if(Spry.$(lastClickId)){
				setTimeout(Spry.$(lastClickId).focus(),300);
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}else{//if no data,focus on retBtn djwan @20110523
				Spry.$('controlBtn').focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}
			
			
		}catch(ex){
		}
		
	}
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "doSomethings end");

}



//the PopUp's callback function by djwan
function doSomethings_Cfm(methodName)
{   
	
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "doSomethings_Cfm start");
	if(methodName=="cancel"){ 
	Spry.$('DVR_popUp').style.display='none';
	Spry.$('DVR').style.display='none';
	Spry.$('ATField').style.display='none';
	
		try{
			
			if(Spry.$(lastClickId)){
				setTimeout(Spry.$(lastClickId).focus(),300);
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}else{//if no data,focus on retBtn djwan @20110523
				Spry.$('controlBtn').focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}
			
			
		}catch(ex){
		}
		
	}
	// 再度5秒毎の処理を実行
//nakazono add #10218 #10219 >>
//	timeID = setInterval( continuousCall, reDrawTime );
	timeID = mySetInterval( continuousCall, reDrawTime );
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "doSomethings_Cfm end");
//nakazono add #10218 #10219 <<
	
}


//djwan @20110509 about size of popup
function setDVRDivStyle(flg){
	
	
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "setDVRDivStyle start");
	if(flag==1||flag==2){//big screen
		Spry.$('DVR').style.width='483px';
		Spry.$('DVR').style.top='0px';
		Spry.$('DVR').style.height='546px';
		Spry.$('DVR').style.left='0px';

		// ポップアップ表示位置を左に寄せる(異常一覧はメニューがない為、中央位置が左よりとなる)
		document.getElementById("DVR_popUp").style.left="335px";

	}else if(flag==0){//small screen
		Spry.$('DVR').style.width='386px';
		Spry.$('DVR').style.top='0px';
		Spry.$('DVR').style.height='426px';
		Spry.$('DVR').style.left='0px';

//		Spry.$('DVR_popUp').style.left='200px';
		Spry.$('DVR_popUp').style.top='135px';

		// ポップアップの文言が折り返している為、幅を調節
//		document.getElementById("DVR_popUp").style.width="320px";
//		document.getElementById("DVR99-02-01_main").style.width="320px";
//		document.getElementById("DVR99-02-01_border").style.width="320px";
//		document.getElementById("DVR99-02-01_text").style.width="320px";
//		document.getElementById("DVR99-02-01_text").style.borderStyle="none";
		
		if(flg){
			//ボタンの表示位置がおかしくなる為、削除 2011/08/23
			//Spry.$('DVR99-02-01_b2').style.top='-26px';
//			document.getElementById("DVR99-02-01_b1").style.left="40px";
//			document.getElementById("DVR99-02-01_b2").style.right="40px";
		}else{
//			document.getElementById("DVR99-02-01-button1").style.width="320px";
		}

		
	}else if(flag==3){//vga-big screen
		Spry.$('DVR').style.width='612px';
		Spry.$('DVR').style.height='399px';

		//DVR_popUp
//		Spry.$('DVR_popUp').style.left='130px';
		Spry.$('DVR_popUp').style.top='115px';
//		Spry.$('DVR_popUp').style.width='330px';		
//		Spry.$('DVR_popUp').style.height='300px';
		
		//DVR99-02-01_main
//		Spry.$('DVR99-02-01_main').style.width='330px';		
//		Spry.$('DVR99-02-01_main').style.height='200px';
		
		//DVR99-02-01_border
//		Spry.$('DVR99-02-01_border').style.width='330px';		
//		Spry.$('DVR99-02-01_border').style.height='200px';
		
		//DVR99-02-01_text
//		Spry.$('DVR99-02-01_text').style.width='330px';		
//		Spry.$('DVR99-02-01_text').style.height='200px';
		
		//DVR99-02-01-button1
		if(!flg){
//			Spry.$('DVR99-02-01-button1').style.top='165px';
		}
		
	}
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "setDVRDivStyle end");
	
}




//the process for down-keys 
/*  下キーを押したときの処理  */
function keydownProcess(maxND)
{
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "keydownProcess start");
	if(keyUsable == false || keyUsable2 == false)
	{
		return;
	}

	focusFlg=2;

	var strD = "" ;
	var enterS ;
	var enterNum ;
	var curStrD ;
	var keyCountD ;
	var keyCountDS ;
	if(isNullDataFlag!=1)
	{
		var buttonStatus=getButtonStatus();
		if(event.keyCode!=39 && enterID.substring(10,12)!=maxND && enterID!="upBtn" && enterID!="downBtn" && enterID!="controlBtn"
			|| event.shiftKey && enterID.substring(10,12)!=maxND && enterID!="upBtn" && enterID!="downBtn" && enterID!="controlBtn")
		{
			/*if(enterID=="controlBtn")
			{
				//enterS= "00";	
			}
			else
			{ deleted by Freya 11.07.21*/
				enterS = enterID.substring(10,12) ;
			//}
			enterNum = Number(enterS) ;
			keyCountD =100+enterNum ;	
			//change the focus 
			keyCountD++ ;
			keyCountDS = keyCountD.toString() ;
			curStrD = keyCountDS.substring(1,3) ;
			
			strD = "DVR-05-04-"+curStrD ;
			if (document.getElementById(enterID))
			{
				if(event.keyCode!=39 && document.getElementById(enterID).className=="DVR0504newErrBtn" || event.keyCode!=39 && document.getElementById(enterID).className=="DVR0504newBtn"
					|| event.shiftKey && document.getElementById(enterID).className=="DVR0504newErrBtn" || event.shiftKey && document.getElementById(enterID).className=="DVR0504newBtn"){//djwan
					if(document.getElementById(enterID).className=="DVR0504newErrBtn"){
						document.getElementById(enterID).style.backgroundColor = "";
						document.getElementById(enterID).style.border = REDBORDER ;
						document.getElementById(enterID).style.color = WHITECOLOR ;
						enterID = strD ;
					}
					else{
						document.getElementById(enterID).style.border = WHITEBORDER ;
						document.getElementById(enterID).style.backgroundColor = "";
						document.getElementById(enterID).style.color = WHITECOLOR ;
					}
				}
			}
			enterPara = enterID ;	
			enterID = strD ;
			
			//enterPara = Number(curStrD) ;	
			if(flag==0)
			{
				document.getElementById('errlist').scrollTop=document.getElementById('errlist').scrollTop+40;
			}
			else
			{
				document.getElementById('errlist').scrollTop=document.getElementById('errlist').scrollTop+60;
			}
		}
		//-------added by Freya 11.07.21(if previous focus is on the back-button, the focus will stop at the back-button )
		else if(enterID == "controlBtn")
		{
			strD = enterID;
			enterID = strD ;
		}
		//-------added by Freya 11.07.21
		else	
		{
			if(enterID.substring(10,12)==maxND && enterID.substring(10,12)!="")
			{
				if(buttonStatus==BOTHDISABLED)
				{
					strD = "controlBtn";
				}
				else if(buttonStatus==ONLYUPDISABLED)	
				{				
					strD = "downBtn";
				}
				else if(buttonStatus==ONLYDOWNDISABLED)
				{
					strD = "upBtn";					
				}
				else if(buttonStatus==BOTHAVLAIBLE)
				{
					strD = "upBtn";					
				}
				if (document.getElementById(enterID))
				{
					if(event.keyCode==40 && document.getElementById(enterID).className=="DVR0504newErrBtn"
						|| event.shiftKey==false && document.getElementById(enterID).className=="DVR0504newErrBtn"){//djwan
						document.getElementById(enterID).style.backgroundColor = "";
						document.getElementById(enterID).style.border = "" ;
						document.getElementById(enterID).style.color = WHITECOLOR ;
						//document.getElementById(enterID).style.border = REDBORDER ;
					}else{
						if(document.getElementById(enterID).className=="DVR0504upBtn" || document.getElementById(enterID).className=="DVR0504downBtn" || document.getElementById(enterID).className=="DVR0504controlBtn"){//if is controlButton,then width=0
							//document.getElementById(enterID).style.border = "solid 0px" ;
						}else{
							if(event.keyCode==39 && document.getElementById(enterID).className=="DVR0504newErrBtn" || event.keyCode==39 && document.getElementById(enterID).className=="DVR0504newBtn"){
								consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "keydownProcess end 1");
								return false;
							}
							else{
								document.getElementById(enterID).style.backgroundColor = "";
								document.getElementById(enterID).style.border = "" ;
								document.getElementById(enterID).style.color = WHITECOLOR ;
							}
						}
					}
				}
				enterID = strD ;

			}
			else if(enterID=="upBtn")
			{
				if(buttonStatus==ONLYDOWNDISABLED)
				{
					strD = "controlBtn";					
				}
				else if(buttonStatus==BOTHAVLAIBLE)
				{
					strD = "downBtn";					
				}
				if (document.getElementById(enterID))
				{
					if(event.keyCode==40 && document.getElementById(enterID).className=="DVR0504newErrBtn"
						|| event.shiftKey==false && document.getElementById(enterID).className=="DVR0504newErrBtn"){//djwan
						document.getElementById(enterID).style.border = REDBORDER ;
					}else{
						if(document.getElementById(enterID).className=="DVR0504upBtn" || document.getElementById(enterID).className=="DVR0504downBtn" || document.getElementById(enterID).className=="DVR0504controlBtn"){//if is controlButton,then width=0
							//document.getElementById(enterID).style.border = "solid 0px" ;
							if(event.keyCode==40){
								consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "keydownProcess end 2");
								return false;
							}
						}
					}				
				}
				enterID = strD ;
			}
			else if(enterID=="downBtn")
			{
				if (document.getElementById(enterID))
				{
					if(event.keyCode==40 && document.getElementById(enterID).className=="DVR0504newErrBtn"
						|| event.shiftKey==false && document.getElementById(enterID).className=="DVR0504newErrBtn"){//djwan
							document.getElementById(enterID).style.border = REDBORDER ;
					}else{
						if(document.getElementById(enterID).className=="DVR0504upBtn" || document.getElementById(enterID).className=="DVR0504downBtn" || document.getElementById(enterID).className=="DVR0504controlBtn"){//if is controlButton,then width=0
							if(event.keyCode==40){
								consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "keydownProcess end 3");
								return false;
							}
						}
					}
				}
				strD = "controlBtn";
				enterID = strD ;
			}
		}
	}
	if(document.getElementById(strD)){
		if(event.keyCode==40 && document.getElementById(strD).className=="DVR0504newErrBtn" || event.keyCode==40 && document.getElementById(strD).className=="DVR0504newBtn"
			|| event.shiftKey==false && document.getElementById(strD).className=="DVR0504newErrBtn" || event.shiftKey==false && document.getElementById(strD).className=="DVR0504newBtn"){
			setFocus(strD);
		}
		else{
			document.getElementById(strD).focus();
			last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
		}
	enterID = strD;
	}
	if(event.keyCode==39 && strD=="controlBtn"){
		 consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "keydownProcess end 4");
		 return false;
	}
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "keydownProcess end");
}

//the process for up-keys 
/*  上キーを押したときの処理  */
function keyupProcess(maxNU)
{
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "keyupProcess start");
	if(keyUsable == false || keyUsable2 == false)
	{
		consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "keyupProcess end 1");
		return;
	}
	focusFlg=2;

	var strU = "" ;
	var enterS ;
	var enterNum ;
	var curStrU ;
	var keyCountU ;
	var keyCountUS ;
	
	if(isNullDataFlag!=1)//no data djwan
	{
		var buttonStatus=getButtonStatus();

		if(event.keyCode==38 && enterID.substring(10,12)!=01 && enterID!="controlBtn" && enterID!="upBtn" && enterID!="downBtn"
			|| event.shiftKey && enterID.substring(10,12)!=01 && enterID!="controlBtn" && enterID!="upBtn" && enterID!="downBtn")
		{
			if (document.getElementById(enterID))
			{
				document.getElementById(enterID).style.backgroundColor = "";
				document.getElementById(enterID).style.color = WHITECOLOR ;
			}
			strU=keyUpProcessForupBtn(strU,enterS,enterNum,curStrU,keyCountU,keyCountUS,maxNU,0);
		}
		else
		{
			if(enterID.substring(10,12)==01)
			{
	//---modified by Freya start 11.07.21(if previous focus is on the first err-button,the focus will stop at the first err-button)
				//strU = "controlBtn";
				strU = enterID ;
	//---modified by Freya end 11.07.21
				if (document.getElementById(enterID))
				{
					if(event.keyCode==38 && document.getElementById(enterID).className=="DVR0504newErrBtn"
					   || event.shiftKey && document.getElementById(enterID).className=="DVR0504newErrBtn"){//djwan
						document.getElementById(enterID).style.border = REDBORDER ;
					}else{
						if(document.getElementById(enterID).className=="DVR0504upBtn" || document.getElementById(enterID).className=="DVR0504downBtn" || document.getElementById(enterID).className=="DVR0504controlBtn"){//if is controlButton,then width=0
							//document.getElementById(enterID).style.border = "solid 0px" ;
						}else{
						}
					}
				}
				enterID = strU ;
			}
			else if(enterID=="controlBtn")
			{
				if(buttonStatus==BOTHDISABLED)
				{
					//enterID="upBtn";
					//strU=keyUpProcessForupBtn(strU,enterS,enterNum,curStrU,keyCountU,keyCountUS,maxNU,1);
					var errListBtn = document.getElementsByName("DVR-05-04-List-Button");
					if(errListBtn.length != 0){
						strU = errListBtn[errListBtn.length -1].id;
					} else {
						// エラーデータ0件の場合はフォーカス移動させない様に設定
						strU = "controlBtn";
					}
				}
				else if(buttonStatus==ONLYUPDISABLED)
				{
					strU = "downBtn";	
					//enterID="upBtn";
					//strU=keyUpProcessForupBtn(strU,enterS,enterNum,curStrU,keyCountU,keyCountUS,maxNU,1);
				}
				else if(buttonStatus==ONLYDOWNDISABLED)
				{
					strU = "upBtn";
				}
				else if(buttonStatus==BOTHAVLAIBLE)
				{
					strU = "downBtn";
				}
				if (document.getElementById(enterID))
				{
					if(event.keyCode==38 && document.getElementById(enterID).className=="DVR0504newErrBtn"
						|| event.shiftKey && document.getElementById(enterID).className=="DVR0504newErrBtn"){//djwan
						document.getElementById(enterID).style.border = REDBORDER ;
					}else{
						if(document.getElementById(enterID).className=="DVR0504upBtn" || document.getElementById(enterID).className=="DVR0504downBtn" || document.getElementById(enterID).className=="DVR0504controlBtn"){//if is controlButton,then width=0
							if(event.keyCode==37 && enterID=="controlBtn" && document.getElementById("upBtn").disabled==true && document.getElementById("downBtn").disabled==true){
								consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "keyupProcess end 2");
								return false;
							}
							document.getElementById(enterID).style.backgroundColor = "";
							//document.getElementById(enterID).style.border = "solid 0px" ;
						}
						enterID = strU ;
					}
				}
				enterID = strU ;
			}
			else if(enterID=="downBtn")
			{
				 if(buttonStatus==ONLYUPDISABLED)	
				{	
					//strU = "downBtn";	
					//enterID="upBtn";
					//strU=DVR-02-11-04(strU,enterS,enterNum,curStrU,keyCountU,keyCountUS,maxNU,1);
					var errListBtn = document.getElementsByName("DVR-05-04-List-Button");
					strU = errListBtn[errListBtn.length -1].id;
				}				
				else if(buttonStatus==BOTHAVLAIBLE)
				{
					strU = "upBtn";
				}
				if (document.getElementById(enterID))
				{
					if(event.keyCode==38 && document.getElementById(enterID).className=="DVR0504newErrBtn"
						|| event.shiftKey && document.getElementById(enterID).className=="DVR0504newErrBtn"){//djwan
						document.getElementById(enterID).style.border = REDBORDER ;
					}else{
						if(document.getElementById(enterID).className=="DVR0504upBtn" || document.getElementById(enterID).className=="DVR0504downBtn" || document.getElementById(enterID).className=="DVR0504controlBtn"){//if is controlButton,then width=0
							if(event.keyCode==37){
								if(enterID=="downBtn" && document.getElementById("upBtn").disabled==true || enterID=="upBtn" && document.getElementById("downBtn").disabled==true){
									consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "keyupProcess end 3");
									return false;
								}
								else{
									if(enterID=="upBtn"){
										consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "keyupProcess end 4");
										return false;
									}
								}
							}
							document.getElementById(enterID).style.backgroundColor = "";
							//document.getElementById(enterID).style.color = BLACKCOLOR ;
							//document.getElementById(enterID).style.border = "solid 0px" ;
						}
					}
				}
				enterID = strU ;
			}
			else if(event.shiftKey && enterID=="upBtn"){
				var errListBtn = document.getElementsByName("DVR-05-04-List-Button");
				strU = errListBtn[errListBtn.length -1].id;
				enterID = strU ;
			}
		}
	}

	//キー操作が上の場合
	if(event.keyCode==38){
		if(enterID=="upBtn" || enterID=="downBtn" || enterID=="controlBtn"){
			var errListBtn = document.getElementsByName("DVR-05-04-List-Button");
			strU = errListBtn[errListBtn.length -1].id;
			enterID = strU ;
		}
	}
	if(document.getElementById(strU)){
		if(!(strU=="upBtn" || strU=="downBtn")){
			setFocus(strU);
		}
		else{
			document.getElementById(strU).focus();
			last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
		}
	enterID = strU ;
	}
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "keyupProcess end");
	
}

//the process to catch keycode
function catchKey(e)
{
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "catchKey start");
	if(keyUsable == false || keyUsable2 == false)
	{
		consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "catchKey end 1");
		return;
	}
	var allinput ;
	var maxkeyNum ;
	
	consoleLogOutputFor05_04(4,"DVR-05-04-00.js",arguments.callee.name,"ポーリング処理の停止");
	clearInterval( timeID );
//nakazono add #10218 #10219 >>
//	timeID = setInterval( continuousCall, reDrawTime );
	//timeID = mySetInterval( continuousCall, reDrawTime );
//nakazono add #10218 #10219 <<
	
	if(event.keyCode==9 || event.keyCode==13 || event.keyCode==38 ||event.keyCode==40 || event.keyCode==37 || event.keyCode==39){//djwan @20110505
			consoleLogOutput(4,"DVR-05-04-00.js",arguments.callee.name,"keydownEvent:"+event.keyCode+",enterID:"+enterID);
			//stopDefaultling(event);	
			stopDefault(e) ;
			
			 //add by djwan @20110505
			 if(document.activeElement.tagName=='BODY'){
			 			
						var firstElm = document.getElementById(enterID);		
						if(firstElm !=null && firstElm!=undefined){
							firstElm.focus();
							last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
						}
			 }
			
			
		}
	
	
	allinput=document.getElementsByTagName("button") ;
	maxkeyNum = allinput.length  ;	//get the count of the buttons
	
	
	//add by djwan @20110429 start
	if(Spry.$('DVR_popUp').style.display=='block'){//popup
		
	}else
	{

		if(event.shiftKey&&event.keyCode==9 || event.keyCode==38 || event.keyCode==37){//mod djwan
			keyupProcess(maxkeyNum) ;
			// フォーカス移動した場合は、クリック情報を初期化
			lastClickId="";
		}
		if(event.shiftKey==false&&event.keyCode==9 || event.keyCode==40 || event.keyCode==39){//djwan
			keydownProcess(maxkeyNum) ;
			// フォーカス移動した場合は、クリック情報を初期化
			lastClickId="";
		}
		if(event.keyCode==13){
			if(enterID=="controlBtn"){
				//window.location.href = "../DVR-05-00-00/DVR-05-00-00.html" ;
				callBack();//add by djwan
			}
			else if(enterID=="upBtn"){
				upPage();
			}
			else if(enterID=="downBtn"){
				downPage();
			}
			else{
				clickProcess(enterID);
				//djwan @20110523 start
				if (!clkObj) clkObj = {};
				
				 clkObj.errorId=searchData(enterID,'ERRID');
				 clkObj.netId=searchData(enterID,'NETID');
				 clkObj.errKind=searchData(enterID,'ERRKIND');
				 clkObj.status=searchData(enterID,'STATUS');
				//djwan @20110523 end
				doCheck('KEY') ;
			}
		}
		
		if(event.keyCode==27)//add by djwan 20110411
		{
			document.getElementById('controlBtn').click();
		}
	}
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "catchKey end");
}
function stopDefault(e)
{	
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "stopDefault start");
	if(e && e.preventDefault){
		e.preventDefault() ;	
	}
	else{
		e.returnValue = false ;
	}
	
	if(e.stopPropagation){

		e.stopPropagation() ;	
	}
	else{
		e.cancelBubble = true ;	
	}
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "stopDefault end");
	
}
//the process to deal with when mouse-click:change the simulated focus and record the current button
function clickProcess(ID)
{

	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "clickProcess start");
	if(keyUsable == false || keyUsable2 == false)
	{
		consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "clickProcess end 1");
		return;
	}
	focusFlg=2;
	//元々フォーカスが当たっていたボタンの選択色を解除
	replaceBtn(enterID);

	enterID = ID ;

	if (document.getElementById(enterID))
	{
		if(document.getElementById(enterID).className=="DVR0504newErrBtn"){//djwan
			document.getElementById(enterID).style.border = REDBORDER ;
		}else{
			if(document.getElementById(enterID).className=="DVR0504upBtn" || document.getElementById(enterID).className=="DVR0504downBtn" || document.getElementById(enterID).className=="DVR0504controlBtn"){//if is controlButton,then width=0
				//document.getElementById(enterID).style.border = "solid 0px" ;						
			}else{					
				
			}
		}
	}
	//---------added by Freya start 11.03.21-----------//
	if (document.getElementById(ID))
	{
		document.getElementById(ID).focus() ;
	}
	last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
	//---------added by Freya end 11.03.21-------------//

	enterID = ID ;
	clickId=ID;
	lastClickId=ID;//add by djwan @20110425
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "clickProcess end");
	
}

function downPage(){            //david do it 2011 01 20

	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "downPage start");
alert("downPage");
	if(keyUsable == false || keyUsable2 == false)
	{
alert("downPage_keyUsable_false");
		consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "downPage end 1");
		return;
	}
	else
	{
		keyUsable = false;
	}
	//var pop_wait=new actionPop(gettext("DVR-01-02-01-00-01"),0,"","");//show the waiting popUp that defined by yourself
	// pop_wait.show();

	// CGI応答待ち中
	if(cgi_using == true)
	{
alert("downPage_cgi_using_true");
		setTimeout("downPage()",0);
		consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "downPage end 2");
		return;
	}

	focusFlg=1;

	consoleLogOutputFor05_04(4,"DVR-05-04-00.js",arguments.callee.name,"ポーリング処理の停止");
	clearInterval( timeID );
	//timeID = setInterval( continuousCall, reDrawTime );

 	pageNum++;
	// ページ送りボタンの状態更新
	pageButtonRefresh();

	var objF = document.forms.item(0);

	fastflag = true;
	obj.name="DVR-05-04-00-00";
	obj.id="DVR-05-04-00-00"; 
	obj.type="checkbox";
	obj.checked=true;
	obj.style.visibility="hidden";
	obj.value=(pageNum-1)*100+1;//mod djwan
	objF.appendChild(obj);
	//objF.action =serUrl+"/cgi-bin/DVR-05-04-00.cgi?DVR-05-04-00-00=1&PAGE=" + pageNum + "&OUTPUT=" + printRecNum;
	objF.action ="DVR-05-04-00_result_next.xml";
	callSubmit();	// 処理を1回に集約
	setTimeout("clearColor()",800);
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "downPage end");
	

}
function clearColor()
{
	
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "clearColor start");
	//全リスト背景色初期化
	for(var iLoop=1;iLoop<=8;iLoop++)
	{
		if (document.getElementById("DVR-05-04-0" + iLoop))
		{
			document.getElementById("DVR-05-04-0" + iLoop).style.backgroundColor="transparent";
			document.getElementById("DVR-05-04-0" + iLoop).style.color=WHITECOLOR;
			if(document.getElementById("DVR-05-04-0" + iLoop).className!="DVR0504newErrBtn")
			{
				document.getElementById("DVR-05-04-0" + iLoop).style.border = WHITEBORDER ;
			}
			else
			{
				document.getElementById("DVR-05-04-0" + iLoop).style.border = REDBORDER ;
			}
		}
	}
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "clearColor end");
	callSubmit();	// 処理を1回に集約
	
}

function upPage(){  //david do it 2011 01 20

	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "upPage start");
	if(keyUsable == false || keyUsable2 == false)
	{
		return;
	}
	else
	{
		keyUsable = false;
	}
	// CGI応答待ち中
	if(cgi_using == true)
	{
		setTimeout("upPage()",0);
		consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "upPage end 1");
		return;
	}

	focusFlg=0;

	consoleLogOutputFor05_04(4,"DVR-05-04-00.js",arguments.callee.name,"ポーリング処理の停止");
	clearInterval( timeID );
	//timeID = setInterval( continuousCall, reDrawTime );

	pageNum--;
	if( pageNum < 1 ){  pageNum = 1;  }
	//var pop_wait=new actionPop(gettext("DVR-01-02-01-00-01"),0,"","");//show the waiting popUp that defined by yourself
	//pop_wait.show();

	// ページ送りボタンの状態更新
	pageButtonRefresh();
	
	var objF = document.forms.item(0);
			 
	obj.name="DVR-05-04-00-00";
	obj.id="DVR-05-04-00-00"; 
	obj.type="checkbox";
	obj.checked=true;
	obj.style.visibility="hidden";
	obj.value=(pageNum-1)*100+1;//mod djwan
	objF.appendChild(obj);
	//objF.action =serUrl+"/cgi-bin/DVR-05-04-00.cgi?DVR-05-04-00-00=1&PAGE=" + pageNum + "&OUTPUT=" + printRecNum;
	objF.action ="DVR-05-04-00_result_prev.xml";

	callSubmit();	// 処理を1回に集約
	setTimeout("clearColor()",800);
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "upPage end");
	
}

function updateResponse(req) //dsError2_clickに先にデータをセットしないといけないからdsError2_click→dsError1_clickの順番
{
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "updateResponse start");
	cgi_using=false;//CGIが応答を返したのでフラグは落とす　→　戻る操作が可能に
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "cgi_using = " + cgi_using);
	keyUsable = true;
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "callBackflg = " + callBackflg);
	if(callBackflg == true)
	{
		consoleLogOutputFor05_04(4,"DVR-05-04-00.js",arguments.callee.name,"ポーリング処理の停止");
		clearInterval( timeID );//ここまでくると後は戻る処理を行うだけなのでポーリング処理をやめる
		callBack2();
		consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "updateResponse end 1");
		return;
	}
	jsLogPrint("DVR-05-04-00.js",arguments.callee.name,"CHANGE_CGI_USING_FALSE");
	var txt = req.xhRequest.responseText;
alert(txt);
	var xmlDOMDocument = Spry.Utils.stringToXMLDoc(txt);
	dsError2_click.setDataFromDoc(xmlDOMDocument);
	dsError1_click.setDataFromDoc(xmlDOMDocument);
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "updateResponse end");
}

var pollingCount = 0;
function continuousCall()
{
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "continuousCall start");
	if(pollingCount > 2)
	{
		logmode = "off";
	}
	else
	{
		pollingCount++;//ポーリング処理が行われた回数をカウントして3回目以降はログの出力を行わないようにする(ログ溢れ防止のため)
	}
	consoleLogOutputFor05_04(4,"DVR-05-04-00.js",arguments.callee.name,"ポーリング"+(pollingCount+1)+"/4回目");

	// 処理中の時に、定時タイマーの処理を禁止する
	// 異常確認の時に、具体的に当該関数を再度コールするので、問題がありません
	if(Datasubmitting == true)
	{
		return;
	}

	var objF = document.forms.item(0);

	obj.name="DVR-05-04-00-00";
	obj.id="DVR-05-04-00-00"; 
	obj.type="checkbox";
	obj.checked=false;
	obj.style.visibility="hidden";
	obj.value=pageNum;
	objF.appendChild(obj);
	//objF.action =serUrl+"/cgi-bin/DVR-05-04-00.cgi?DVR-05-04-00-00=1&PAGE=" + pageNum + "&OUTPUT=" + printRecNum;
	objF.action ="DVR-05-04-00_result.xml";
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "continuousCall end");
	callSubmit();	// 処理を1回に集約
	
}

function callBack()
{
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "callBack start");
	keyUsable2 = false;
	callBackflg = true;
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "callBack end");
}

var callBackflg = false;

function callBack2()
{
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "callBack2 start");
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "cgi_using = " + cgi_using);
	//CGI応答待ちでない場合だけ、DISPMにボタン操作通知を送信して画面を閉じる
	if(cgi_using == true)
	{
		setTimeout("callBack()",0);
	}
	if(cgi_using != true)
	{
		cgi_using = true;
		consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "cgi_using = " + cgi_using);
		if(localStorage.playLocationTop)
		{
			consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "dsTemp.loadData");
			dsTemp.loadData();
		}
		else
		{
			consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "backServer");
			//#10827対応　ボタン操作通知はライブ画面に戻ってから行う
			localStorage.fromDVR_05_04 = "異常一覧からの戻る操作";
			backServer(1,null,true);
		}
	}
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "callBack2 end");
}

function updateForward(notificationType, dataSet, dat)
{
	
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "updateForward start");
	if (notificationType=="onPostLoad")
	{	
		localStorage.playFlag = "フォーカス調整未完了";
		var removeParamForPlayScreen = new Array("DispCamName");
		var topLocationTmp = localStorage.playLocationTop;
		//localStorage.removeItem("playLocationTop");
		//top.location = topLocationTmp;
		TopLocationFromDispWebView("true", topLocationTmp );
	}
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "updateForward end");
}
addSpryDataSetObserver(dsTemp, updateForward,OBSERVER_HINT_MODE_BTN);//djwan @20110523

//add djwan
function getButtonStatus()
{
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "getButtonStatus start");
	var upBtn=document.getElementById("upBtn");
	var downBtn=document.getElementById("downBtn");	
	if((upBtn.disabled||upBtn.style.display=='none') && (downBtn.disabled||downBtn.style.display=='none'))// both disabled
	{
		consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "getButtonStatus end 1");
		return 1;	
	}
	else if((upBtn.disabled||upBtn.style.display=='none') && (!downBtn.disabled||downBtn.style.display!='none'))//upbtn is disabled,downbtn is available
	{
		consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "getButtonStatus end 2");
		return 2;	
	}
	else if((!upBtn.disabled||upBtn.style.display!='none') && (downBtn.disabled||downBtn.style.display=='none'))//upbtn is available,downbtn is disabled
	{
		consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "getButtonStatus end 3");
		return 3;
	}
	else if((!upBtn.disabled ||upBtn.style.display!='none')&& (!downBtn.disabled||downBtn.style.display!='none'))// both available
	{
		consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "getButtonStatus end 4");
		return 4;
		
	}
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "getButtonStatus end");
	
	
}

//djwan
function keyUpProcessForupBtn(strU,enterS,enterNum,curStrU,keyCountU,keyCountUS,maxNU,disabledFlag)
{
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "keyUpProcessForupBtn start");
	if(enterID=="upBtn" || disabledFlag)
	{
		enterS=(Number(maxNU)+1).toString();
	}
	else
	{
		enterS = enterID.substring(10,12) ;
	}
	enterNum = Number(enterS) ;
	keyCountU =100+enterNum ;	
	keyCountU-- ;
	keyCountUS = keyCountU.toString() ;
	curStrU = keyCountUS.substring(1,3) ;
	
	strU = "DVR-05-04-"+curStrU ;
	if (document.getElementById(enterID))
	{
		if(document.getElementById(enterID).className=="DVR0504newErrBtn"){//djwan
			document.getElementById(enterID).style.border = REDBORDER ;
		}else{
			if(document.getElementById(enterID).className=="DVR0504upBtn" || document.getElementById(enterID).className=="DVR0504downBtn" || document.getElementById(enterID).className=="DVR0504controlBtn"){//if is controlButton,then width=0
				//document.getElementById(enterID).style.border = "solid 0px" ;						
			}else{
				document.getElementById(enterID).style.border = "" ;
			}
		}
	}
	enterPara = enterID ;
	enterID = strU ;
	
	//enterPara = Number(curStrU) ;		
	if(flag==0)
	{
		document.getElementById('errlist').scrollTop=document.getElementById('errlist').scrollTop-40;
	}
	else
	{
		document.getElementById('errlist').scrollTop=document.getElementById('errlist').scrollTop-60;
	}	
	
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "keyUpProcessForupBtn end");
	return strU;
}


function firstFocus(){
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "firstFocus start");
	consoleLogOutputFor05_04(4,"DVR-05-04-00.js",arguments.callee.name,"IN:"+enterID);
	
	//document.getElementById(enterID).focus() ;
	//if(enterID!="controlBtn"){
		if(document.getElementById(lastClickId)){
			if(Spry.$('DVR').style.display=='none'){//when no popup,focus last click button
				//document.getElementById(lastClickId).focus() ;
				if(enterID != "controlBtn" && enterID != "upBtn" && enterID != "downBtn"){
					document.getElementById(lastClickId).focus() ;
					if (document.getElementById(enterID))
					{
						setFocus(enterID);
					}
					last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
				} else {
					//ここで異常全復旧確認後のフォーカス当て直しを行っている。
					document.getElementById(lastClickId).focus() ;
					last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
				}
			}

		}else{
			if(document.getElementById(enterID)) {
				if(enterID != "controlBtn" && enterID != "upBtn" && enterID != "downBtn"){
					setFocus(enterID);
				} else {
					document.getElementById(enterID).focus() ;
					last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
				}
			} else {
				document.getElementById("controlBtn").focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
				enterID="controlBtn";
			}

		}
		//マウス操作で「次へ」にフォーカスを当てた場合
		if(focusFlg==1){
			enterID="downBtn";
			document.getElementById("downBtn").focus();
			//最終ページへ遷移した場合、「前へ」ボタンへフォーカス移動
			if(document.getElementById("downBtn").disabled==true){
				enterID="upBtn";
				document.getElementById("upBtn").focus();
			}
		//マウス操作で「前へ」にフォーカスを当てた場合
		}else if(focusFlg==0){
			enterID="upBtn";
			document.getElementById("upBtn").focus();
			//1ページ目へ戻った場合は、「次へ」ボタンへフォーカス移動
			if(document.getElementById("upBtn").disabled==true){
				enterID="downBtn";
				document.getElementById("downBtn").focus();
			}
		} else {
		}
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "firstFocus end");
	consoleLogOutputFor05_04(4,"DVR-05-04-00.js",arguments.callee.name,"OUT:"+enterID);
}

function btnCheck(btnId){
	
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "btnCheck start");
	var btnFlg="0";
	if(btnId == "upBtn" || btnId == "downBtn" || btnId == "controlBtn"){
		btnFlg="1";
	}
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "btnCheck end");
	return btnFlg;
	
}

/*###############yes/no popup djwan @20110523 start###################*/	
function doCheck(mouseOrKey)
{
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "doCheck start");
	focusFlg=2;
	consoleLogOutputFor05_04(4,"DVR-05-04-00.js",arguments.callee.name,"ポーリング処理の停止");
	clearInterval( timeID );
    // 押下ボタンの情報を取得
	if(!clkObj) clkObj = {};
	clkObj.errorId=searchData(enterID,'ERRID');
	clkObj.netId=searchData(enterID,'NETID');
	clkObj.errKind=searchData(enterID,'ERRKIND');
	clkObj.status=searchData(enterID,'STATUS');

	setFocus(enterID);


	// ディスクフルエラー以外のケース
	if( (( clkObj.errKind != "HDDフル" ) && ( clkObj.errKind != "HDDニアフル" )) || clkObj.status != "異常発生中" )
	{
		isHDfullError = false;

		// 押下ボタン該当エラー情報の確認用APIを実行する

		submitData(clkObj.errorId,clkObj.netId,clkObj.errKind,clkObj.status);

	}
	// ディスクフルエラー
	else
	{
		isHDfullError = true;

		if(mouseOrKey=='KEY'){
			if(clkObj.errKind == "HDDフル" ){
				var popObj1=new actionPop(gettext("DVR-05-04-00-03"),2,"はい","いいえ");
			}else{
				var popObj1=new actionPop(gettext("DVR-05-04-00-04"),2,"はい","いいえ");
			}
			setDVRDivStyle('doCfm');
			Spry.$('DVR_popUp').onkeydown=function(){dvrKeyEvt_Cfm();};
			popObj1.addObserver(doOKByKey);
			popObj1.show();
		}else{
			if(clkObj.errKind == "HDDフル" ){
				var popObj2=new actionPop(gettext("DVR-05-04-00-03"),2,"はい","いいえ");
			}else{
				var popObj2=new actionPop(gettext("DVR-05-04-00-04"),2,"はい","いいえ");
			}
			setDVRDivStyle('doCfm');
			Spry.$('DVR_popUp').onkeydown=function(){dvrKeyEvt_Cfm();};
			popObj2.addObserver(doOKByMouse);
			popObj2.show();
		}
	};
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "doCheck end");
}
function doOKByKey(methodName){
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "doOKByKey start");
	   if(methodName=="ok"){
		   submitData(clkObj.errorId,clkObj.netId,clkObj.errKind,clkObj.status);
	   }else{
		  doSomethings_Cfm('cancel');//set focus
	   }
	   consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "doOKByKey end");
	}
	
	
function doOKByMouse(methodName){
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "doOKByMouse start");
	   if(methodName=="ok"){
		   		 if (!clkObj) clkObj = {};
				
				 clkObj.errorId=searchData(enterID,'ERRID');
				 clkObj.netId=searchData(enterID,'NETID');
				 clkObj.errKind=searchData(enterID,'ERRKIND');
				 clkObj.status=searchData(enterID,'STATUS');

		   submitData(clkObj.errorId,clkObj.netId,clkObj.errKind,clkObj.status);
	   }else{
		   doSomethings_Cfm('cancel');//set focus
	   }
	   consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "doOKByMouse end");
	
	}	
	
/*###############yes/no popup djwan @20110523 end###################*/	 

//by djwan @20110523
function searchData(enterID,schType){
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "searchData start");
		var iLoop = 0;
		//var tagExistFlg = false;
		//search action
		for (iLoop=0;iLoop<sbmtArr.length;iLoop++) {
			if (enterID==sbmtArr[iLoop][0]) {
				//tagExistFlg = true;
				switch(schType) {
					case 'ERRID':
						return sbmtArr[iLoop][1];					
					break;
					
					case 'NETID':
						return sbmtArr[iLoop][2];					
					break;
					
					case 'ERRKIND':
						return sbmtArr[iLoop][3];					
					break;					
					
					case 'STATUS':
						return sbmtArr[iLoop][4];					
					break;
					
					default:
						return;
						break;
				}
				break;
			}
			
		}
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "searchData end");
}

//
// ページ送りボタンの状態制御関数

//
function pageButtonRefresh()
{
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "pageButtonRefresh start");
	// 単一ページ
	if( allPageNum <= 1 )
	{
		document.getElementById("upBtn").disabled = true;
		document.getElementById("downBtn").disabled = true;
	}
	// 最終ページを表示
	else if( ( allPageNum > 1 ) && ( pageNum == allPageNum ) )
	{
		document.getElementById("upBtn").disabled = false;
		document.getElementById("downBtn").disabled = true;
	}
	// １ページ目を表示
	else if( ( allPageNum > 1 ) && ( pageNum == 1 ) )
	{
		document.getElementById("upBtn").disabled = true;
		document.getElementById("downBtn").disabled = false;
	}
	// 途中ページ
	else
	{
		document.getElementById("upBtn").disabled = false;
		document.getElementById("downBtn").disabled = false;
	}
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "pageButtonRefresh end");
	
}

//ボタンの選択色を元に戻す関数
function replaceBtn(objectID)
{
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "replaceBtn start");
	if(objectID.indexOf("Btn",0)==-1)//前へ、次へ、戻るボタンでは無効
	{
		if (document.getElementById(objectID))
		{
			document.getElementById(objectID).style.backgroundColor="transparent";
			document.getElementById(objectID).style.color=WHITECOLOR;
			if(document.getElementById(objectID).className=="DVR0504newErrBtn")
			{
				document.getElementById(objectID).style.border = REDBORDER ;
			}
			else
			{
				document.getElementById(objectID).style.border = WHITEBORDER ;
			}
		}
	}
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "replaceBtn end");
	
}

function callSubmit()
{
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "callSubmit start");
	cgi_using=true;		//CGIを使用中のステータスに変える　→　使用中であった場合は異常一覧画面を閉じれなくするため
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "cgi_using = " + cgi_using);
	jsLogPrint("DVR-05-04-00.js",arguments.callee.name,"CHANGE_CGI_USING_TRUE");
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "callSubmit end");
alert("callSubmit");
	submitForm('DVR050400form', updateResponse);
}


//nakazono add #10218 #10219 >>
//------------------------------------------------------------------
//	タイマー設定関数
//	method	関数
//	time	時間間隔
//------------------------------------------------------------------
function mySetInterval(method, time)
{
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "mySetInterval start");
	if(callBackflg == true){
		consoleLogOutputFor05_04(4,"DVR-05-04-00.js",arguments.callee.name,"callBackflg=trueのためポーリングさせない");
		return 0;
	}
	consoleLogOutputFor05_04(4,"DVR-05-04-00.js",arguments.callee.name,"ポーリング処理の開始(" + time + "ms間隔)");
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "mySetInterval end");
	return setInterval( method, time );
}
//nakazono add #10218 #10219 <<

var logmode = "on";
function consoleLogOutputFor05_04(Level,Filename,Funcname,Text)
{
	if(logmode == "on")
	{
		consoleLogOutput(Level,Filename,Funcname,Text);
	}
}

//------------------------------------------------------------------------------------------------------------------------------------
//	フォーカスセット関数
//	target_ID:フォーカスを当てるターゲットのID
//	old_ID:元々フォーカスが当たっていたエレメントID(セットしない場合は元々のフォーカスの選択色解除を行わない)
//	戻り値:なし
//------------------------------------------------------------------------------------------------------------------------------------
function setFocus(target_ID ,old_ID)
{
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "setFocus start");
	if (document.getElementById(target_ID))//ターゲットのオブジェクトが存在するかをチェック
	{
		//----------------------------------------------------------
		//	元々フォーカスが当たっていたリストの選択色を解除する
		//----------------------------------------------------------
		if(old_ID)
		{
			document.getElementById(old_ID).style.backgroundColor="transparent";
			document.getElementById(old_ID).style.color=WHITECOLOR;
			
			//異常発生中のリストなら枠線は赤色、復旧済であれば枠線は白色とする
			if(document.getElementById(old_ID).className=="DVR0504newErrBtn")
			{
				document.getElementById(old_ID).style.border = REDBORDER ;
			}
			else
			{
				document.getElementById(old_ID).style.border = WHITEBORDER ;
			}
		}
		//----------------------------------------------------------
		//	ターゲットのリストを選択色にする
		//----------------------------------------------------------
		document.getElementById(target_ID).style.backgroundColor=FOCUSBGCOLOR;
		document.getElementById(target_ID).style.color=BLACKCOLOR;
		
		//異常発生中のリストなら枠線は赤色、復旧済であれば枠線は白色とする
		if(document.getElementById(target_ID).className=="DVR0504newErrBtn")
		{
			document.getElementById(target_ID).style.border = REDBORDER ;
		}
		else
		{
			document.getElementById(target_ID).style.border = BLUEBORDER ;
		}
		document.getElementById(target_ID).focus();
		last_focus = document.activeElement;
	}
	consoleLogOutput(5 , "DVR-05-04-00.js", arguments.callee.name, "setFocus end");
}
