var gUrl="";
//var gUrl="";

//added by luo @ 20110708 radio array for dealling with  problem scrolled  
var radioArray=null;

var gDevice = 0 ;   //0: NVR鵐, 1: CVR
var gCameraType = 10;  //10:DVR-02-10-xx   18:DVR-02-18-xx
var gSeparator = "|";
var pageTimer;
var pageTimerFlag = 0;

// added by duhong @ 20110414, globle var for emu tab
var tabIdSequence = null;
var tabIdSequenceBackupForPop = null;

// added by hdu @ 20110419,path focus
var spSeqUp= null;
var spSeqDown = null;
var spSeqLeft = null;
var spSeqRight = null;

// added by hdu @ 20110525,possible focus elmenet list
var tabIdSequenceBig= null;
var FocusTagList = null;
var BigFocusTagList = null;
var FocusTagListInPopup = null;
var MianFocusTagList = null;

var tabId0110Sequence = null;
var ScheduleTabFocusList = null;
var TimeSTabFocusList = null;
var TimeETabFocusList = null;
var OBJEventTabFocusList = null;

var whiteListOfTabIdx = null;

var inputSavedBef = null;
var ipProcToken = false;

var isTabKeyChange=false;//added by luo 20110706  is the tab key change to another key code?
var IPAddNull = '---.---.---.---'; //added by hdu @ 20110509
var ipAddBlank = '___.___.___.___';

var VALID_YEAR_FROM = 2011;	// システム有効期間(開始年)
var VALID_YEAR_TO = 2035;	// システム有効期間(終了年)

//added by duhong @ 20110406, common key code for 'return button click' simulation
var commonReturnKeyCode = 27; //ESC

//CGI processing, UI frozen realted. added by hdu @ 20110512
var savedActiveElement = null;
var savedBodyAction = null;
var savedWorkingAreaZIndex = null;
var hintsShowing = false;
var enablerTimer = new Array;
var PAGE_M = null;
//2mins, correspoding to CGI timeout
var SUBMIT_HINT_TIMEOUT_DEFUALT = 3660000; 
var OBSERVER_HINT_TIMEOUT_INIT = 3660000;
var OBSERVER_HINT_TIMEOUT_BTN = 3660000; 
var COVER_TIMEOUT = 500;
var OBSERVER_HINT_MODE_INIT = 'observer_hint_mode_init';
var OBSERVER_HINT_MODE_BTN = 'observer_hint_mode_btn';

//globle debug info
var glbDebugInfo = "";
var glbDebugFlag = false;
var glbDebugSteps = 0;

//★★コンソールにログを出力するデバッグモード管理フラグ★★
consoleDebugMode = false;

var hintFocusSaver = null; //added by hdu @ 20110523, if hint needs focus to be restored.

var Global_Messages = {"PROCESSING_HINT":"処理中です。<br />しばらくお待ちください。"}; //will be override by msg definition DVR-99-00-02.js

var whiteListOfAccessable = null; //added by hdu @ 20110525, element shouldn't be unfocusable by mouseclick after popup showed.
var tokenFocusReborn = false;
var nodeTabindexSaver = new Array;

var currentFocusElementId = null; //add by hdu @ 20110530, saving current focused element in case mouse click disorder the emutab control. 

var waitImageFlag = 0;      //remember the time for wait   2011.09.15 david
var waitPopTimeFlag;        //the timer object   2011.09.15 david
var wait_pop_ForCover;      //image pop for wait   2011.09.15 david
var wait_pop_ForCard;       //menu API card pop for wait   2011.09.15 david

var XGA_MENU_WITH="220,*";    //XGA and FULL-HD page's menu with
var NTSC_MENU_WITH="180,*";   //NTSC page's menu with 
var BIG_MENU_WITH="280,*";    //BIG page's menu with
var NO_MENU_WITH="0,*";       //the page havn't menu

//IP入力エリア定義値 //add start by takizawa @ 2011/10/03
//初期表示時のIPアドレス
var defaultIPAdrr = "   .   .   .   ";
//"."のある位置
var firstDot=3;
var secondDot=7;
var thirdDot=11;
//IP入力エリアのフォーカス遷移フラグ
var ipAreaFucusFlg=false;
//フォーカス時のIPアドレス
var beforChangeIpAddr="";
//"."文字列
var C_DOT = ".";
//"."文字のキーコード
var C_DOT_KEY_CD = 190;
var C_DOT_TEN_KEY_CD = 110;
//IPアドレスの最小値（バイト単位）
var minIpAddr = "000";
//IPアドレスの最大値（バイト単位）
var maxIpAddr = "255";
//keyCodeの保持格納変数
var memKeyCode = "";
//Debug用の特殊画面遷移イベントフラグ(通常はfalseにすること！！)
var debugJump = false;
//エラーメッセージ用の紐付け配列 要素に各画面のIP入力エリアのIDを指定し、値に出力するメッセージのID(DVR-99-99-02.js)を指定
var ipErrMsgList = {"ipt_ip":"DVR-02-01-08-01"
					,"DVR-02-02-00-03":"DVR-02-02-03-01"
					,"DVR-02-02-00-04":"DVR-02-02-03-01"
					,"DVR-02-02-00-05":"DVR-02-02-06-01"
					,"DVR-02-02-00-06":"DVR-02-02-06-01"
					,"DVR-02-02-00-07":"DVR-02-02-05-01"
					,"DVR-02-02-00-08":"DVR-02-02-04-01"
					,"DVR-02-02-00-09":"DVR-02-02-04-01"
					,"DVR-02-02-00-10":"DVR-02-02-04-01"
					,"DVR-02-02-00-11":"DVR-02-02-04-01"
					,"DVR-02-10-03-04-01":"DVR-02-10-03-03"
					,"DVR-02-10-03-04-02":"DVR-02-10-03-03"
					,"DVR-02-10-03-05-01":"DVR-02-10-03-04"
					,"DVR-02-10-03-05-02":"DVR-02-10-03-04"
					,"DVR-02-10-03-06-01":"DVR-02-10-03-05"
					,"DVR-02-10-03-07-01":"DVR-02-10-03-06"
					,"DVR-02-10-03-07-02":"DVR-02-10-03-06"
					,"DVR-02-10-03-08-01":"DVR-02-10-03-06"
					,"DVR-02-10-03-08-02":"DVR-02-10-03-06"
					,"DVR-02-10-03-09-01":"DVR-02-10-03-03"
					,"DVR-02-18-03-04-01":"DVR-02-18-03-03"
					,"DVR-02-18-03-04-02":"DVR-02-18-03-03"
					,"DVR-02-18-03-05-01":"DVR-02-18-03-04"
					,"DVR-02-18-03-05-02":"DVR-02-18-03-04"
					,"DVR-02-18-03-06-01":"DVR-02-18-03-05"
					,"DVR-02-18-03-07-01":"DVR-02-18-03-06"
					,"DVR-02-18-03-07-02":"DVR-02-18-03-06"
					,"DVR-02-18-03-08-01":"DVR-02-18-03-06"
					,"DVR-02-18-03-08-02":"DVR-02-18-03-06"
					,"DVR-02-18-03-09-01":"DVR-02-18-03-03"
					};
///////////////////////add end

//////// ライブ画面/再生画面URL ///////////
var PLAY_SCREEN_URL = "DVR-05-07-00/DVR-05-07-00.html";
var LIVE_SCREEN_URL = "/DVR-05-08-00/DVR-05-08-00.html";
//DISPから呼び出されるパラメータを追加
var LIVE_SCREEN_URL_FOR_BACK = "DVR-05-08-00/DVR-05-08-00.html";
var FOCUS_SETTING_URL = "/DVR-02-10-29/DVR-02-10-29.html";
var SHOW_CAM_NAME = "&DispCamName=1";
var SHOW_CAM_NAME_PLUS_URL = "../DVR-05-08-00/DVR-05-08-00.html?DispCamName=1";
///////////////////////////////////////////

var pageIdTmp;	//フレーム化対応用PAGEID一時格納領域

//////////////////////////////////
//  フレーム化対応 全画面表示用ダミーページURL Define  //
var DUMMY = "/DVR-01-00-00/DVR-01-00-00-dummy.html";
// カメラ接続失敗画面URL
var CAM_ERR_PAGE_URL = "/DVR-02-10-31/DVR-02-10-31.html";
//////////////////////////////////

//////// 機器通信IDDefine ////////
//連想配列 {コンテンツが持つscreenFlag : 機器通信ID (CGI_Common.h 109行目)
var MACHINE_NET_ID = {
						"0":"2049"
						,"1":"257"
						,"2":"258"
						,"3":"259"
						,"4":"260"
						,"5":"261"
					};
//////////////////////////////////

//前記録作成用テーブル 2012.02.22 takeuchi 追加
//===============================================================================//
var iCAMTypeMax = 4;
var iRateMax = 7;
var iQualityMax = 10;
var iRecRateArray = new Array(iCAMTypeMax);
	/*
	camer[i][7] = 
	0:デジタルカメラ
	1:アナログ1CHカメラ
	2:アナログ4CHカメラ
	3:FULL-HDカメラ
	*/
	// refs #3845 2012.4.25 takeuchi 変更//デジタルカメラ[SS,S,X,A,B,C,D,無]
	//デジタルカメラ[SS,S,X,A,B,C,D,無]
	iRecRateArray[0] = new Array(iQualityMax);
	iRecRateArray[0]["30fps"]={SS:-1,S:-1,X:-1,A:15,B:20,C:25,D:45,N:120};
	iRecRateArray[0]["15fps"]={SS:-1,S:-1,X:-1,A:25,B:35,C:45,D:90,N:120};
	iRecRateArray[0]["10fps"]={SS:-1,S:-1,X:-1,A:35,B:45,C:45,D:120,N:120};
	iRecRateArray[0]["5fps"]={SS:-1,S:-1,X:-1,A:45,B:45,C:90,D:120,N:120};
	iRecRateArray[0]["3fps"]={SS:-1,S:-1,X:-1,A:45,B:90,C:120,D:120,N:120};
	iRecRateArray[0]["2fps"]={SS:-1,S:-1,X:-1,A:90,B:120,C:120,D:120,N:120};
	iRecRateArray[0]["1fps"]={SS:-1,S:-1,X:-1,A:120,B:120,C:120,D:120,N:120};
	iRecRateArray[0]["0.5fps"]={SS:-1,S:-1,X:-1,A:120,B:120,C:120,D:120,N:120};
	iRecRateArray[0]["0.33fps"]={SS:-1,S:-1,X:-1,A:120,B:120,C:120,D:120,N:120};
	iRecRateArray[0]["0.2fps"]={SS:-1,S:-1,X:-1,A:120,B:120,C:120,D:120,N:120};
	//アナログ1CHカメラ[SS,S,X,A,B,C,D,無]
	iRecRateArray[1] = new Array(iQualityMax);
	iRecRateArray[1]["30fps"]={SS:-1,S:-1,X:-1,A:15,B:20,C:25,D:45,N:120};
	iRecRateArray[1]["15fps"]={SS:-1,S:-1,X:-1,A:25,B:35,C:45,D:90,N:120};
	iRecRateArray[1]["10fps"]={SS:-1,S:-1,X:-1,A:35,B:45,C:45,D:120,N:120};
	iRecRateArray[1]["5fps"]={SS:-1,S:-1,X:-1,A:45,B:45,C:90,D:120,N:120};
	iRecRateArray[1]["3fps"]={SS:-1,S:-1,X:-1,A:45,B:90,C:120,D:120,N:120};
	iRecRateArray[1]["2fps"]={SS:-1,S:-1,X:-1,A:90,B:120,C:120,D:120,N:120};
	iRecRateArray[1]["1fps"]={SS:-1,S:-1,X:-1,A:120,B:120,C:120,D:120,N:120};
	iRecRateArray[1]["0.5fps"]={SS:-1,S:-1,X:-1,A:120,B:120,C:120,D:120,N:120};
	iRecRateArray[1]["0.33fps"]={SS:-1,S:-1,X:-1,A:120,B:120,C:120,D:120,N:120};
	iRecRateArray[1]["0.2fps"]={SS:-1,S:-1,X:-1,A:120,B:120,C:120,D:120,N:120};
	//アナ4CHカメラ[SS,S,X,A,B,C,D,無]
	iRecRateArray[2] = new Array(iQualityMax);
	iRecRateArray[2]["30fps"]={SS:-1,S:-1,X:-1,A:-1,B:-1,C:-1,D:-1,N:120};
	iRecRateArray[2]["15fps"]={SS:-1,S:-1,X:-1,A:-1,B:-1,C:-1,D:-1,N:120};
	iRecRateArray[2]["10fps"]={SS:-1,S:-1,X:-1,A:-1,B:-1,C:-1,D:-1,N:120};
	iRecRateArray[2]["5fps"]={SS:-1,S:-1,X:-1,A:0,B:0,C:0,D:-1,N:120};
	iRecRateArray[2]["3fps"]={SS:-1,S:-1,X:-1,A:0,B:0,C:3,D:-1,N:120};
	iRecRateArray[2]["2fps"]={SS:-1,S:-1,X:-1,A:0,B:3,C:3,D:-1,N:120};
	iRecRateArray[2]["1fps"]={SS:-1,S:-1,X:-1,A:3,B:5,C:10,D:-1,N:120};
	iRecRateArray[2]["0.5fps"]={SS:-1,S:-1,X:-1,A:3,B:5,C:10,D:-1,N:120};
	iRecRateArray[2]["0.33fps"]={SS:-1,S:-1,X:-1,A:3,B:5,C:10,D:-1,N:120};
	iRecRateArray[2]["0.2fps"]={SS:-1,S:-1,X:-1,A:3,B:5,C:10,D:-1,N:120};
	//フルＨＤカメラ[SS,S,X,A,B,C,D,無]
	iRecRateArray[3] = new Array(iQualityMax);
	iRecRateArray[3]["30fps"]={SS:-1,S:-1,X:-1,A:15,B:20,C:25,D:45,N:120};
	iRecRateArray[3]["15fps"]={SS:-1,S:-1,X:-1,A:25,B:35,C:45,D:90,N:120};
	iRecRateArray[3]["10fps"]={SS:-1,S:-1,X:-1,A:35,B:45,C:45,D:120,N:120};
	iRecRateArray[3]["5fps"]={SS:3,S:5,X:20,A:45,B:45,C:90,D:120,N:120};
	iRecRateArray[3]["3fps"]={SS:3,S:10,X:35,A:45,B:90,C:120,D:120,N:120};
	iRecRateArray[3]["2fps"]={SS:10,S:15,X:35,A:90,B:120,C:120,D:120,N:120};
	iRecRateArray[3]["1fps"]={SS:20,S:20,X:45,A:120,B:120,C:120,D:120,N:120};
	iRecRateArray[3]["0.5fps"]={SS:20,S:20,X:45,A:120,B:120,C:120,D:120,N:120};
	iRecRateArray[3]["0.33fps"]={SS:20,S:20,X:45,A:120,B:120,C:120,D:120,N:120};
	iRecRateArray[3]["0.2fps"]={SS:20,S:20,X:45,A:120,B:120,C:120,D:120,N:120};
	/* refs #3845 2012.4.25 takeuchi 変更
	//デジタルカメラ	[SS,S,X,A,B,C,D,無]
	iRecRateArray[0] = new Array(iQualityMax);
	iRecRateArray[0][0]=[0,0,0,20,25,30,60,120];			//記録レート　30
	iRecRateArray[0][1]=[0,0,0,30,45,60,120,120];			//記録レート　15
	iRecRateArray[0][2]=[0,0,0,45,60,60,120,120];			//記録レート　10
	iRecRateArray[0][3]=[0,0,0,60,60,120,120,120];			//記録レート　 5
	iRecRateArray[0][4]=[0,0,0,60,120,120,120,120];			//記録レート　 3
	iRecRateArray[0][5]=[0,0,0,120,120,120,120,120];		//記録レート　 2
	iRecRateArray[0][6]=[0,0,0,120,120,120,120,120];		//記録レート　 1
	iRecRateArray[0][7]=[0,0,0,120,120,120,120,120];		//記録レート　 0.5
	iRecRateArray[0][8]=[0,0,0,120,120,120,120,120];		//記録レート　 0.33
	iRecRateArray[0][9]=[0,0,0,120,120,120,120,120];		//記録レート　 0.2
	//アナログ1CHカメラ	[SS,S,X,A,B,C,D,無]
	iRecRateArray[1] = new Array(iQualityMax);
	iRecRateArray[1][0]=[0,0,0,20,25,30,60,120];			//記録レート　30
	iRecRateArray[1][1]=[0,0,0,30,45,60,120,120];			//記録レート　15
	iRecRateArray[1][2]=[0,0,0,45,60,60,120,120];			//記録レート　10
	iRecRateArray[1][3]=[0,0,0,60,60,120,120,120];			//記録レート　 5
	iRecRateArray[1][4]=[0,0,0,60,120,120,120,120];			//記録レート　 3
	iRecRateArray[1][5]=[0,0,0,120,120,120,120,120];		//記録レート　 2
	iRecRateArray[1][6]=[0,0,0,120,120,120,120,120];		//記録レート　 1
	iRecRateArray[1][7]=[0,0,0,120,120,120,120,120];		//記録レート　 0.5
	iRecRateArray[1][8]=[0,0,0,120,120,120,120,120];		//記録レート　 0.33
	iRecRateArray[1][9]=[0,0,0,120,120,120,120,120];		//記録レート　 0.2
	//アナ4CHカメラ		[SS,S,X,A,B,C,D,無]
	iRecRateArray[2] = new Array(iQualityMax);
	iRecRateArray[2][0]=[0,0,0,0,0,0,0,120];				//記録レート　30
	iRecRateArray[2][1]=[0,0,0,0,0,0,0,120];				//記録レート　15
	iRecRateArray[2][2]=[0,0,0,0,0,0,0,120];				//記録レート　10
	iRecRateArray[2][3]=[0,0,0,0,0,0,0,120];				//記録レート　 5
	iRecRateArray[2][4]=[0,0,0,0,0,5,0,120];				//記録レート　 3
	iRecRateArray[2][5]=[0,0,0,0,5,5,0,120];				//記録レート　 2
	iRecRateArray[2][6]=[0,0,0,5,10,15,0,120];				//記録レート　 1
	iRecRateArray[2][7]=[0,0,0,15,20,30,0,120];				//記録レート　 0.5
	iRecRateArray[2][8]=[0,0,0,20,30,45,0,120];				//記録レート　 0.33
	iRecRateArray[2][9]=[0,0,0,45,60,90,0,120];				//記録レート　 0.2
	//フルＨＤカメラ	[SS,S,X,A,B,C,D,無]
	iRecRateArray[3] = new Array(iQualityMax);
	iRecRateArray[3][0]=[0,0,0,20,25,30,60,120];			//記録レート　30
	iRecRateArray[3][1]=[0,0,0,30,45,60,120,120];			//記録レート　15
	iRecRateArray[3][2]=[0,0,0,45,60,60,120,120];			//記録レート　10
	iRecRateArray[3][3]=[5,10,30,60,60,120,120,120];		//記録レート　 5
	iRecRateArray[3][4]=[5,15,45,60,120,120,120,120];		//記録レート　 3
	iRecRateArray[3][5]=[15,20,45,120,120,120,120,120];		//記録レート　 2
	iRecRateArray[3][6]=[25,30,60,120,120,120,120,120];		//記録レート　 1
	iRecRateArray[3][7]=[45,60,120,120,120,120,120,120];	//記録レート　 0.5
	iRecRateArray[3][8]=[60,60,120,120,120,120,120,120];	//記録レート　 0.33
	iRecRateArray[3][9]=[60,60,120,120,120,120,120,120];	//記録レート　 0.2
	*/
//===============================================================================//

//設定値誤りがあった場合にその設定部分のフォーカス記憶領域
var ngId=null;

//20120427 Yabuta add start
//CGI処理完了後にwaitpopを表示させるとwaitpopがタイムアウトになるまで消えないので
//CGI処理完了後はwaitpopを呼ばせないようにするためのフラグ
var usableWaitPop = true; //true:使用可能　false使用不可
//20120427 Yabuta add end

//20120502 Yabuta add start		accesslogにログを出力する
jsLOG = false;		//true:jsログON　false:jsログOFF
//20120502 Yabuta add end

//描画時のCGIとの同期用
var drawOK = false;

//画面ID
var screenId = "";

//ポップアップ表示中フラグ
var DispWebViewPopFlg = false;

//operating flag
var operating99 = false;

//========== 現在画面のURLを取得する ==========
try {
	DispWebView.SetCurrentPath(decodeURIComponent(document.location));
} catch (ex) {}

// window.location方式変更(#19816)
function WindowLocationFromDispWebView( gotoUrl )
{
	try{
		dispInputEventStop();
		// DISP様提供関数(DispWebView)を利用する
		if( window.name == "rightpage" )
		{
			setTimeout("DispWebView.SetUrl('false', '" + decodeURIComponent(gotoUrl) + "')" ,200)
		}
		else
		{
			setTimeout("DispWebView.SetUrl('true', '" + decodeURIComponent(gotoUrl) + "')" ,200)
		}
	} catch (ex) {
		// バージョン不一致の場合
		window.location = gotoUrl;
	}
}

// top.location方式変更(#19816)
function TopLocationFromDispWebView( flg, gotoUrl)
{
	try{
		dispInputEventStop();
		// DISP様提供関数(DispWebView)を利用する
		if( flg == "true" )
		{
			setTimeout("DispWebView.SetUrl('true', '" + decodeURIComponent(gotoUrl) + "')" ,200)
		}
		else
		{
			setTimeout("DispWebView.SetUrl('false', '" + decodeURIComponent(gotoUrl) + "')" ,200)
		}
	} catch (ex) {
		// バージョン不一致の場合
		if( flg == "true" )
		{
			top.location = gotoUrl;
		}
		else
		{
			top.rightpage.location = gotoUrl;
		}
	}
}

// 遷移元URLを取得する
function GetOrgPathFromDispWebView()
{
	var ref = ''; 
	try{
		// DISP様提供関数(DispWebView)を利用する
		ref = DispWebView.GetOrgPath();
	} catch (ex) {

		// バージョン不一致の場合
		if (document.referrer.length > 0) { 
			ref = document.referrer; 
		} 
		try { 
			if (ref.length == 0 && opener.location.href.length > 0) { 
				ref = opener.location.href; 
			} 
		} catch (e) {}
	}
	return ref;
}

//stop event bubble, added by duhong @ 20110411
function stopBubbling(e){
	if (e.stopPropagation) {
		e.stopPropagation();
	}
	else if (window.event) {
		// this code is for IE
		e.cancelBubble = true;
	}
}

//stop default event , added by duhong @ 20110411
function stopDefaultling(e){
	if(e.preventDefault){ 
		e.preventDefault();
	}
	else if (window.event) {
		// this code is for IE		
		event.returnValue = false;
	}
}
/**
* 	   judge scrollObj have scroll   david add 2011.08.24
**/
function judgeObj_Scroll(scrollObj){   
	var isHaveScroll=false;       // no have 
	if(scrollObj.offsetHeight<scrollObj.scrollHeight){
		isHaveScroll=true;        //  have      
	}
	return isHaveScroll;
}
/**
* 	  give the month select value   david add 2011.09.21
**/
function addDaySelectValue(dayID,monthID,yearID){  
	var year=Number(document.getElementById(yearID).selectedIndex)+Number(VALID_YEAR_FROM);        //chang by david 2011.09.28
	var month=Number(document.getElementById(monthID).selectedIndex)+1;
	var day=document.getElementById(dayID);
	var days=Number(getMonthDays(year,month));
	var index=day.selectedIndex;
	day.length=0;
	for(var i=1;i<=days;i++){
		if(i<10){
			day.add(new Option("0"+i.toString(),i));
		}else{
			day.add(new Option(i.toString(),i));
		}
	}
	if(index>0){
		getDaySelectIndex(index,day);
	}
}
/**
* 	  get the month days number   david add 2011.09.21
**/
function getMonthDays(year,month){  
	if (month==2) {
		if ((year % 400 == 0) || ((year % 4 == 0) && (year % 100 != 0))) {
			return 29;
		} else {
			return 28;
		}
	}
	if ((month==1) || (month==3) || (month==5) || (month==7) || (month==8) || (month==10) || (month==12)) {
		return 31;
	}
	if ((month==4) || (month==6) || (month==9) || (month==11)) {
		return 30;
	}
}
/**
* 	  get the month select's index   david add 2011.09.21
**/
function getDaySelectIndex(index,obj){
	
	if(index>obj.length-1){
		obj.selectedIndex=obj.length-1;	
	}else{
		obj.selectedIndex=index;
	}
	
}
/**
* 	When the page on the camer that get DVR menu js
**/
function getDVRMenuJs(){
	var URLParams = Spry.Utils.getLocationParamsAsObject();
	/* 対応方針変更 2011.10.26 URLに縮小パラメータを付与し、各画面で縮小CGIを実行しない様に修正
	 * (カメラ側で実行すると404エラーとなる為)
	 * 縮小のパラメータは今までカメラ画面移行時に設定する"PM"とする
	 * PMの値はアナログ，デカ文字表示以外の場合はnullを保持している
	 * 上述している修正により、PAGE_Mを取得する箇所をcreatePageTimerに移動させる
	 */
	//PAGE_M = URLParams.PM;
	var URLtemp;
	URLtemp = URLParams.parentIP.split("|");
	//alert(URLtemp[0]);
	/*URLtemp.pop();
	URLtemp.pop();
	//alert(temp.pop());
	DVRHostIp = URLtemp.pop();//temp.pop();  move david 2011.06.22*/    
	DVRHostIp = URLtemp[0];
	var DVRMenuURL = "//"+DVRHostIp+"/DVR-99/DVR-99-00-00.js";
	document.write("<script language='javascript' src='"+DVRMenuURL+"'></script>");
	//setTimeout(function(){document.body.style.zoom=getScaling(pageM);},900);
}
/*
* 
*dave 2011.04.28   return page scaling
*
*/
function getScaling(num){   
	num = Number(num);
	var scal;
	switch(num){
		case 1:
				  scal=1.0;
				  break ;
		case 2:
				  scal=0.95;
				  break;
		case 3:
				  scal=0.90;
				  break;
		case 4:
				  scal=0.85;
				  break;
		case 5:
				  scal=0.80;
				  break;
		
		default:
		break;
	}
	return scal;
}
/*
*  Author:david 2011.10.11
*  According the screen size to chang the menuframe's with    
*/
function screenSizeChangFrame(screenSize){
	if(localStorage.play)//localStorage.playに値が入っていた場合は操作メニューからの戻り → メニューの幅は0にする
	{
		return;
	}
	var screenFlag=Number(screenSize);      //change 2011.10.14 david
	if(0==screenFlag){
		changMenuFrameWith(NTSC_MENU_WITH);	
	}
	else if(3==screenFlag){
		changMenuFrameWith(BIG_MENU_WITH);
	}
	else{
		return;	
	}
}

/*
*  Author:david 2011.10.11
*  chang the menuframe's with    
*/
function changMenuFrameWith(withValu){
	consoleLogOutput(3,"DVR-99.js",arguments.callee.name,"IN");
	var mainFrameSet = top.document.getElementById("mainFrame");
	if(mainFrameSet){
		mainFrameSet.cols=withValu;
	}
}

/*
*  Author:takizawa 2011.10.25
*  メニューフレームの表示を動的に行う様に修正
*  メイン画面表示時に指定する領域の為、アナログ，デカ文字の場合はメニューを表示しない
*/
function dynamicChangeMenuFrame(){
	//表示モニターの種類を取得する
	var screenFlagForMenu = getPAGE_SIZE();

	//メニュー表示を呼び分ける
	if(0==screenFlagForMenu){
		//VGA表示の場合
		return;
	}else if(1==screenFlagForMenu){
		//XGA(4:3)表示の場合
		changMenuFrameWith(XGA_MENU_WITH);
	}else if(2==screenFlagForMenu){
		//XGA(16:9)表示の場合
		changMenuFrameWith(XGA_MENU_WITH);
	}else if(3==screenFlagForMenu){
		//デカ文字表示の場合
		return;
	}else{
		return;	
	}

}

/*
*  Author:david 2011.10.11
*  disp give the page number and show it    
*/
function dispShowPage(){
	consoleLogOutput(4,"DVR-99.js",arguments.callee.name,"IN:" + localStorage.pageId);
	var D_enterID;
	var params = Spry.Utils.urlComponentToObject(top.location.search.replace(/^\?/, ""));
	var sFlg = params.screenFlag.toString().substring(4,5);
	var disp_skip_flg = false;
	if(localStorage.pageId){
		disp_skip_flg = true;
		var Page_ID=localStorage.pageId;
		localStorage.removeItem("pageId");
		var temp=judgePAGEID(Page_ID);
		if(temp){
			D_enterID=temp;
			consoleLogOutput(4,"DVR-99.js",arguments.callee.name,"Page_ID:" + Page_ID);
			pageID_for_autoJump = Page_ID;
			
			if(localStorage.ajNOW == "AutoJump(ToLive)")
			{
				localStorage.removeItem("ajNOW");
				consoleLogOutput(3,"DVR-99.js",arguments.callee.name,"localStorage(AutoJump)の削除");
			}
			
			switch(Number(Page_ID))
			{
				case 47:
				//NTSC出力設定の場合はTopメニューより奥の階層に入らないため、Topメニュー表示終了後に描画再開の必要がある　→　フラグをfalseに
				disp_skip_flg = false;
					
					//保守メニューを展開している状態にする
					menuOpen_Close(36);
					
					//現在のフォーカス(選択色)を消す
					for(var iLoop = 0;iLoop < 52;iLoop++)
					{
						menuFocusChange(eventMtx[iLoop][0],"off");
					}
					
					//NTSC文字にフォーカスを当てる
					focusID = "NTSC出力";
					menuFocusChange("NTSC出力","on");
					
					//メニューの表示幅を戻す
					switch (sFlg)
					{
						case "0":
							top.document.getElementById("mainFrame").cols = "180,*";
							break;
						case "1":
							top.document.getElementById("mainFrame").cols = "220,*";
							break;
						case "2":
							top.document.getElementById("mainFrame").cols = "220,*";
							break;
						case "3":
							top.document.getElementById("mainFrame").cols = "280,*";
							break;
					}
					
					break;
				case 29:
				case 19:
					//設定メニューを展開している状態にする
					menuOpen_Close(11);
					
					//メニューにレイヤーを被せる
					//createMenuCover();
					consoleLogOutput(4,"DVR-99.js",arguments.callee.name,D_enterID);
					switch (sFlg)
					{
						case "0":
							top.document.getElementById("mainFrame").cols = "180,*";
							break;
						case "1":
							top.document.getElementById("mainFrame").cols = "220,*";
							break;
						case "2":
							top.document.getElementById("mainFrame").cols = "220,*";
							break;
						case "3":
							top.document.getElementById("mainFrame").cols = "280,*";
							break;
					}
					//呼び出す関数の引数の形に合わせる
					var D_enterID_OBJ = {id:0};
					D_enterID_OBJ.id = D_enterID;
					clickMenu(D_enterID_OBJ);
					break;
				case 99:
					//設定メニューを展開している状態にする
					menuOpen_Close(11);
					
					//現在のフォーカス(選択色)を消す
					for(var iLoop = 0;iLoop < 52;iLoop++)
					{
						menuFocusChange(eventMtx[iLoop][0],"off");
					}
					
					//カメラ設定にフォーカスを当てる
					focusID = "カメラ設定";
					menuFocusChange("カメラ設定","on");

					//メニューにレイヤーを被せる
					createMenuCover();
					
					// ページIDを保持する必要がない為、空にする
					pageIdTmp = null;

					switch (sFlg)
					{
						case "0":
							top.document.getElementById("mainFrame").cols = "180,*";
							break;
						case "1":
							top.document.getElementById("mainFrame").cols = "220,*";
							break;
						case "2":
							top.document.getElementById("mainFrame").cols = "220,*";
							break;
						case "3":
							top.document.getElementById("mainFrame").cols = "280,*";
							break;
					}
					//カメラ接続失敗画面に遷移させる]
					nextPage(52);
					//sameServer(CAM_ERR_PAGE_URL + "?" + scaleParamForVGA + pageMagnification);
					break;
				// #16371 カメラ通信エラーの場合、左メニューのフォーカスが以前と同じに設定
				case 98:
					// 履歴メニューを展開している状態にする
					menuOpen_Close(29);
					
					// 現在のフォーカス(選択色)を消す
					for(var iLoop = 0;iLoop < 52; iLoop++)
					{
						menuFocusChange(eventMtx[iLoop][0], "off");
					}
					
					// 異常履歴にフォーカスを当てる
					focusID = "異常履歴";
					menuFocusChange(focusID, "on");

					//メニューにレイヤーを被せる
					createMenuCover();
					
					// ページIDを保持する必要がない為、空にする
					pageIdTmp = null;

					switch (sFlg)
					{
						case "0":
							top.document.getElementById("mainFrame").cols = "180,*";
							break;
						case "1":
							top.document.getElementById("mainFrame").cols = "220,*";
							break;
						case "2":
							top.document.getElementById("mainFrame").cols = "220,*";
							break;
						case "3":
							top.document.getElementById("mainFrame").cols = "280,*";
							break;
					}
					// カメラ接続失敗画面に遷移させる
					nextPage(52);
					break;
				case 97:
					// 履歴メニューを展開している状態にする
					menuOpen_Close(29);
					
					// 現在のフォーカス(選択色)を消す
					for(var iLoop = 0;iLoop < 52; iLoop++)
					{
						menuFocusChange(eventMtx[iLoop][0], "off");
					}
					
					// 接点入出力履歴にフォーカスを当てる
					focusID = "接点入出力履歴";
					menuFocusChange(focusID, "on");

					//メニューにレイヤーを被せる
					createMenuCover();
					
					// ページIDを保持する必要がない為、空にする
					pageIdTmp = null;

					switch (sFlg)
					{
						case "0":
							top.document.getElementById("mainFrame").cols = "180,*";
							break;
						case "1":
							top.document.getElementById("mainFrame").cols = "220,*";
							break;
						case "2":
							top.document.getElementById("mainFrame").cols = "220,*";
							break;
						case "3":
							top.document.getElementById("mainFrame").cols = "280,*";
							break;
					}
					// カメラ接続失敗画面に遷移させる
					nextPage(52);
					break;
				case 96:
					// 履歴メニューを展開している状態にする
					menuOpen_Close(29);
					
					// 現在のフォーカス(選択色)を消す
					for(var iLoop = 0;iLoop < 52; iLoop++)
					{
						menuFocusChange(eventMtx[iLoop][0], "off");
					}
					
					// 記録履歴にフォーカスを当てる
					focusID = "記録履歴";
					menuFocusChange(focusID, "on");

					//メニューにレイヤーを被せる
					createMenuCover();
					
					// ページIDを保持する必要がない為、空にする
					pageIdTmp = null;

					switch (sFlg)
					{
						case "0":
							top.document.getElementById("mainFrame").cols = "180,*";
							break;
						case "1":
							top.document.getElementById("mainFrame").cols = "220,*";
							break;
						case "2":
							top.document.getElementById("mainFrame").cols = "220,*";
							break;
						case "3":
							top.document.getElementById("mainFrame").cols = "280,*";
							break;
					}
					// カメラ接続失敗画面に遷移させる
					nextPage(52);
					break;
				case 95:
					// 履歴メニューを展開している状態にする
					menuOpen_Close(29);
					
					// 現在のフォーカス(選択色)を消す
					for(var iLoop = 0;iLoop < 52; iLoop++)
					{
						menuFocusChange(eventMtx[iLoop][0], "off");
					}
					
					// 操作履歴にフォーカスを当てる
					focusID = "操作履歴";
					menuFocusChange(focusID, "on");

					//メニューにレイヤーを被せる
					createMenuCover();
					
					// ページIDを保持する必要がない為、空にする
					pageIdTmp = null;

					switch (sFlg)
					{
						case "0":
							top.document.getElementById("mainFrame").cols = "180,*";
							break;
						case "1":
							top.document.getElementById("mainFrame").cols = "220,*";
							break;
						case "2":
							top.document.getElementById("mainFrame").cols = "220,*";
							break;
						case "3":
							top.document.getElementById("mainFrame").cols = "280,*";
							break;
					}
					// カメラ接続失敗画面に遷移させる
					nextPage(52);
					break;
				case 94:
					// 履歴メニューを展開している状態にする
					menuOpen_Close(29);
					
					// 現在のフォーカス(選択色)を消す
					for(var iLoop = 0;iLoop < 52; iLoop++)
					{
						menuFocusChange(eventMtx[iLoop][0], "off");
					}
					
					// メニュー操作履歴にフォーカスを当てる
					focusID = "メニュー操作履歴";
					menuFocusChange(focusID, "on");

					//メニューにレイヤーを被せる
					createMenuCover();
					
					// ページIDを保持する必要がない為、空にする
					pageIdTmp = null;

					switch (sFlg)
					{
						case "0":
							top.document.getElementById("mainFrame").cols = "180,*";
							break;
						case "1":
							top.document.getElementById("mainFrame").cols = "220,*";
							break;
						case "2":
							top.document.getElementById("mainFrame").cols = "220,*";
							break;
						case "3":
							top.document.getElementById("mainFrame").cols = "280,*";
							break;
					}
					// カメラ接続失敗画面に遷移させる
					nextPage(52);
					break;
				default:
					//その他は検索系へのオートジャンプなので検索メニューを開く
					menuOpen_Close(0);
					switch (sFlg)
					{
						case "0":
							top.document.getElementById("mainFrame").cols = "180,*";
							break;
						case "1":
							top.document.getElementById("mainFrame").cols = "220,*";
							break;
						case "2":
							top.document.getElementById("mainFrame").cols = "220,*";
							break;
						case "3":
							top.document.getElementById("mainFrame").cols = "280,*";
							break;
					}
					//呼び出す関数の引数の形に合わせる
					var D_enterID_OBJ = {id:0};
					D_enterID_OBJ.id = D_enterID;
					clickMenu(D_enterID_OBJ);
					break;
			}
		}
	}


//20120529 Yabuta add START
//再生画面(DVR-05-07-00)から操作メニューを表示し、戻るボタンが押されたときの対応
	else if(localStorage.play)//localStorage.playに値が入っていた場合は操作メニューからの戻り
	{
		consoleLogOutput(4,"DVR-99.js",arguments.callee.name,"play:" + localStorage.play);
		disp_skip_flg = true;
		//「戻る」で戻ってきたときにフォーカス位置に不整合が生じないように元々のページに合わせてフォーカスを整える
		var num = localStorage.play.lastIndexOf("DVR-");		//後ろから検索していって最初に「DVR-」の文字列が見つかった位置がCurrentのParentURL
		var fromPage = localStorage.play.slice(num,(num+9));	//「DVR-**-**」まで取得できれば元のページがどこかはわかる

		//検索系の画面からの再生の場合は履歴メニューを開いておく
		if(fromPage.charAt(5) == "1")
		{
			menuOpen_Close(0);
		}

		//履歴系の画面からの再生の場合は履歴メニューを開いておく
		if(fromPage.charAt(5) == "3")
		{
			menuOpen_Close(29);
		}
		
		//現在のフォーカス(選択色)を消す
		for(var iLoop = 0;iLoop < 52;iLoop++)
		{
			menuFocusChange(eventMtx[iLoop][0],"off");
		}
		switch (fromPage)
		{
			case "DVR-01-01"://時間検索
				C_enterID = "DVR-mainMenu-01";
				//時間検索にフォーカスを当てる
				focusID = "時間検索";
				menuFocusChange("時間検索","on");
				break;
			case "DVR-01-02"://イベント検索
				C_enterID = "DVR-mainMenu-02";
				//イベント検索にフォーカスを当てる
				focusID = "イベント検索";
				menuFocusChange("イベント検索","on");
				break;
			case "DVR-01-03"://サムネイル検索
				C_enterID = "DVR-mainMenu-03";
				//サムネイル検索にフォーカスを当てる
				focusID = "サムネイル検索";
				menuFocusChange("サムネイル検索","on");
				break;
			case "DVR-01-04"://画像変化検索
				C_enterID = "DVR-mainMenu-04";
				//画像変化検索にフォーカスを当てる
				focusID = "画像変化検索";
				menuFocusChange("画像変化検索","on");
				break;
			case "DVR-01-05"://マルチ再生
				C_enterID = "DVR-mainMenu-05";
				//マルチ再生にフォーカスを当てる
				focusID = "マルチ再生";
				menuFocusChange("マルチ再生","on");
				break;
			case "DVR-03-01"://異常履歴
				C_enterID = "DVR-mainMenu-30";
				//異常履歴にフォーカスを当てる
				focusID = "異常履歴";
				menuFocusChange("異常履歴","on");
				break;
			case "DVR-03-02"://接点入出力履歴
				C_enterID = "DVR-mainMenu-31";
				//接点入出力履歴にフォーカスを当てる
				focusID = "接点入出力履歴";
				menuFocusChange("接点入出力履歴","on");
				break;
			case "DVR-03-03"://記録履歴
				C_enterID = "DVR-mainMenu-32";
				//記録履歴にフォーカスを当てる
				focusID = "記録履歴";
				menuFocusChange("記録履歴","on");
				break;
			case "DVR-03-04"://操作履歴
				C_enterID = "DVR-mainMenu-33";
				//操作履歴にフォーカスを当てる
				focusID = "操作履歴";
				menuFocusChange("操作履歴","on");
				break;

			default:
			break;
		}
		//呼び出す関数の引数の形に合わせる
		var D_enterID_OBJ = {id:0};
		D_enterID_OBJ.id = C_enterID;
		localStorage.playFlag = "フォーカス調整完了";
		consoleLogOutput(5,"DVR-99-00-00.js",arguments.callee.name,"自動遷移処理につき右フレームにBlankをロード");
		var dispUrl = "http://127.0.0.1/DVR-01-00-00/DVR-01-00-00-blank.html?DispCamName=1";
		TopLocationFromDispWebView("false", dispUrl );
	}
//20120529 Yabuta add END
	consoleLogOutput(4,"DVR-99.js",arguments.callee.name,"dispShowPage End : " + disp_skip_flg);

	if(!disp_skip_flg) { // オートジャンプの際、描画を行わない
		dispDrawStart();
		//右ページをloadしないため、左ページにフォーカスが当たらないので、ここでセットする
		top.menu.focus();
	}

}

/*
* 設定メニューを開いた状態とする共通関数
*/
function selectSettingMenu(){
	//設定メニューを擬似クリックし、設定メニューを展開している状態にする
	C_maindisplayPro("DVR-mainMenu-11");
	//設定メニューの機器構成の背景色を変更する
	for(i=12;i<29;i++)
	{
		if(document.getElementById("DVR-mainMenu-" + i))//画面や権限の設定によって表示されるメニューは異なるので設定メニューの先頭のメニューをサーチ
		{
			document.getElementById("DVR-mainMenu-" + i).style.backgroundColor = colorLightBlue;
			return;
		}
	}
}

/*
*  Author:david 2011.10.12
*  disp give the page number and show it
*  judge the PAGEID is who    
*/
function judgePAGEID(id){
	var num = Number(id);
	var enterID;
	consoleLogOutput(5,"DVR-99.js",arguments.callee.name,"num:" + num);
	switch(num){
		case 1:
				  enterID="DVR-mainMenu-01";                 //"時間検索"
				  break ;
		case 6:
				  enterID="DVR-mainMenu-06";                 //"コピー状態確認"
				  break ;
		case 7:
				  enterID="DVR-mainMenu-07";				//"画像コピー"
				  break;
		case 8:
				  enterID="DVR-mainMenu-08";				//"ダイレクトコピー"
				  break;
		case 9:
				  enterID="DVR-mainMenu-09";                //"画像ダウンロード"
				  break;
		case 19:
				  enterID="DVR-mainMenu-20";                //"モニター設定"
				  break;
		case 29:
				  enterID="DVR-mainMenu-20";                //"モニター設定"
				  break;
		case 47:
				  enterID="DVR-mainMenu-43";                //"NTSC画面設定後"
				  break;
		case 99:
				  enterID="DVR-mainMenu-21";                //"カメラ接続失敗後画面"
				  break;
		// #16371 履歴画面からカメラ通信エラーの場合、遷移先をカメラ接続失敗後画面に設定
		case 98:
				  enterID="DVR-mainMenu-21";                //"カメラ接続失敗後画面"
				  break;
		case 97:
				  enterID="DVR-mainMenu-21";                //"カメラ接続失敗後画面"
				  break;
		case 96:
				  enterID="DVR-mainMenu-21";                //"カメラ接続失敗後画面"
				  break;
		case 95:
				  enterID="DVR-mainMenu-21";                //"カメラ接続失敗後画面"
				  break;
		case 94:
				  enterID="DVR-mainMenu-21";                //"カメラ接続失敗後画面"
				  break;
		default: 
				  enterID=null;
				  break;	 		  
	}
	return enterID;
}

/*
*  Author:david 2011.10.12
*  delete the pageid in window's url   
*/
function delWINDOW_PAGEID(){
	var URL=null;
	if(top.document){
		var URL_hostname=top.location.host;
		var URL_pathname=top.location.pathname;
		var URL_search=top.location.search;
		//alert("http://"+URL_hostname+URL_pathname+URL_search+"=="+top.location.href);
		var params = Spry.Utils.urlComponentToObject(top.location.search.replace(/^\?/, ""));
		var markk=-1;
		if(params.PAGEID){
			for(var p in params){  
				if('PAGEID'==p){
					URL_search=getProcUrl('&'+p,params[p],URL_search);
				}
				if('MonitorChangeFlg'==p){
					URL_search=getProcUrl(p,params[p],URL_search);
				}
			}
			URL="http://"+URL_hostname+URL_pathname+URL_search;
		}
	}
	return URL;
}


/*
*  Author:Duhong	
*  Debug
*/
/**
 * Debug用関数
 * 引数に任意の出力文字を指定
 * ローカル時間 + 任意の出力文字 を画面左部に出力する
**/
function iDebug(info){
	// Debugフラグが有効となっている場合、以下の処理を実施
	if(glbDebugFlag){
		var strTmp = "";
		// 実行ブラウザのローカルタイムを取得
		var debugDay = new Date();
		// 年 (1900年からの差分 + 1900年)
		var debugYear = debugDay.getYear() + 1900;
		// 月 (0=1月の為、1増加分を表示)
		var debugMonth = debugDay.getMonth() + 1;
		// 桁数合わせ
		strTmp = "0" + debugMonth.toString();
		debugMonth = strTmp.substring(strTmp.length - 2, strTmp.length);
		// 日
		var debugDate = debugDay.getDate();
		// 桁数合わせ
		strTmp = "0" + debugDate.toString();
		debugDate = strTmp.substring(strTmp.length - 2, strTmp.length);
		// 時
		var debugHours = debugDay.getHours();
		// 桁数合わせ
		strTmp = "0" + debugHours.toString();
		debugHours = strTmp.substring(strTmp.length - 2, strTmp.length);
		// 分
		var debugMinutes = debugDay.getMinutes();
		// 桁数合わせ
		strTmp = "0" + debugMinutes.toString();
		debugMinutes = strTmp.substring(strTmp.length - 2, strTmp.length);
		// 秒
		var debugSeconds = debugDay.getSeconds();
		// 桁数合わせ
		strTmp = "0" + debugSeconds.toString();
		debugSeconds = strTmp.substring(strTmp.length - 2, strTmp.length);
		// ミリ秒
		var debugMilliSeconds = debugDay.getMilliseconds();
		// 桁数合わせ
		strTmp = "00" + debugMilliSeconds.toString();
		debugMilliSeconds = strTmp.substring(strTmp.length - 3, strTmp.length);
		// コンソールに出力する文言の作成(前回までの記録を一番後ろに付与する)
		glbDebugInfo = debugYear+"/"+debugMonth+"/"+debugDate+"-"+debugHours+":"+debugMinutes+":"+debugSeconds+"-"+debugMilliSeconds+" [info]"+info +"<br /><br />"+glbDebugInfo;
		// 出力コンソールが存在する場合
		if(document.getElementById("debugInfo")!=null){
			// 画面への出力
			document.getElementById("debugInfo").innerHTML = glbDebugInfo;
		}
	}
}

/**
 * Debug用コンソール作成メソッド
 * Debug、レスポンス計測用のエリアを作成する関数
 * ★各HTMLのonload処理先頭に配置
**/
function createDebugArea(){
	/* Debug用エリアがない場合且つ、グローバルDebugフラグにtureが設定されている場合 */
	/* 擬似コンソールエリアを作成する                                               */
	if(document.getElementById("DebugLayer")==null && glbDebugFlag){
		// 擬似コンソールをdivタグで作成する
		var debugInfo = document.createElement("div");	
		// オブジェクトのid設定
		debugInfo.id = "debugInfo";
		/** スタイルの指定 **/
		debugInfo.style.position="absolute";	//表示方法の指定
		debugInfo.style.left="0px";				//配置場所 Y軸
		debugInfo.style.top="0px";				//配置場所 X軸
		debugInfo.style.width="600px";			//擬似コンソール横幅
		debugInfo.style.height="400px";			//擬似コンソール縦幅
		debugInfo.style.overflow="auto";		//書き込み量が多い場合はスクロールバーを出す設定
		debugInfo.style.backgroundColor="green";//コンソールの色
		debugInfo.style.color="white";			//文字色
		debugInfo.style.fontSize="12px";		//文字サイズ
		debugInfo.className="font_Rg";			//フォントスタイルのクラス設定 非プロポーショナルフォント
		/*********************/

		// オブジェクトをHTMLのbodyタグに追加する
		document.body.appendChild(debugInfo);
		
		/** コンソールを移動させる設定 **/
		var obj;		//擬似コンソールのオブジェクトを設定する変数
		var offsetX;	//オブジェクト表示位置X軸格納変数
		var offsetY;	//オブジェクト表示位置Y軸格納変数
		
		// マウス操作を設定 //
		debugInfo.onmousedown = function(e) {
									obj = this;
									// マウスダウン時の基準値を設定
									offsetX = e.pageX - parseInt(obj.style.left);
									offsetY = e.pageY - parseInt(obj.style.top);
									return false;};
		document.onmousemove = function(e){
								// マウスダウンされていない場合は処理しない
								if(!obj){
									return true;
								}
								// オブジェクトを移動させる
								var xPosition = e.pageX-offsetX;
								var yPosition = obj.style.top=e.pageY-offsetY;
								obj.style.left = xPosition.toString() + "px";
								obj.style.top = yPosition.toString() + "px";
								return false;};
		document.onmouseup = function(e){
								// マウスアップ時にはオブジェクトを初期化する
								obj=null;};
		// 初期表示するコンソール内容を設定
		glbDebugInfo =" ###JS Debug Console### ";
		document.getElementById("debugInfo").innerHTML=glbDebugInfo;
	}
}

/**
* create cover layer  david 2011.06.02
**/	
function createCover(divID){
	var coverDivObject = document.getElementById("coverLayer");
	if(coverDivObject==null)
	{
		coverDivObject = document.createElement("div") ;
		coverDivObject.id = "coverLayer";
		coverDivObject.className = "coverLayer";
		document.body.appendChild(coverDivObject);
	}
}	
/**
* remove cover layer    david 2011.06.02
**/	
function removeCover(){
	var coverDivObject = document.getElementById("coverLayer");
	if(coverDivObject!=null)
	{
		document.body.removeChild(coverDivObject);
	}
}
	
/**
* create page's timer
**/
function createPageTimer(divID,delayTime,flag){    //  david change 2011.10.13 COVER_TIMEOUT
	try{
		//20120522 Yabuta add
		//異常一覧画面から呼び出された場合は表示するメニューの大きさの違いにより
		//カバーのサイズも他画面と変えたいため処理を分ける　→　そもそもカバーいらないので出さない方向で
		if(divID == "DVR-05-04-00")
		{
	    	//createCover(divID);
	    }
	    else
	    {
	    	createCover();
	    }
		/* デバッグ用エリアの処理を createDebugArea() 関数に分けました
		if(document.getElementById("DebugLayer")==null && glbDebugFlag){
			var debugInfo = document.createElement("div");	
			debugInfo.id = "debugInfo";
			debugInfo.style.position="absolute";
			debugInfo.style.left="0px";
			debugInfo.style.top="40px";
			debugInfo.style.width="220px";
			debugInfo.style.height="600px";	
			debugInfo.style.overflow="auto";
			debugInfo.style.backgroundColor="Green";
			document.body.appendChild(debugInfo);
			glbDebugInfo ="#JS Debug Console# : "+glbDebugInfo;
			document.getElementById("debugInfo").innerHTML=glbDebugInfo;		
		}*/
		
		//preprocess for CGI processing hint layer
		if(document.getElementById("ATField")==null){
			var atField = document.createElement("div");
			atField.id = "ATField";
			document.body.appendChild(atField);
		}else{
			atField.style.zIndex = "100";	
		}
		
		/* 対応方針変更 2011.10.26 URLに縮小パラメータを付与し、各画面で縮小CGIを実行しない様に修正
		 * (カメラ側で実行すると404エラーとなる為)
		 * 縮小のパラメータは今までカメラ画面移行時に設定する"PM"とする
		 * PMの値はアナログ，デカ文字表示以外の場合はnullを保持している
		 */
		var URLParams = Spry.Utils.getLocationParamsAsObject();
		//縮小に使用するパラメータを取得する XGAモードの場合、PMにはnullが入っている
		PAGE_M = URLParams.PM;
		if(PAGE_M!=null){
			document.body.style.zoom=getScaling(PAGE_M);
		}
		document.getElementById("C-MainsideRight").className = "pageBackColor";  /*2011.03.24 dave*/
		if(divID!=''&&divID!=undefined&&divID!=null){
			if(delayTime!='' && delayTime!=undefined && delayTime!=null){
				pageTimer = setTimeout("showPage('"+divID+"',"+flag+")",delayTime);
			}else{
				pageTimer = setTimeout("showPage('"+divID+"',"+flag+")",COVER_TIMEOUT);
			}
				
		}else{
			if(delayTime!='' && delayTime!=undefined && delayTime!=null){
				pageTimer = setTimeout("showPage(null,"+flag+")",delayTime);
			}else{
				pageTimer = setTimeout("showPage(null,"+flag+")",COVER_TIMEOUT);
			}
		}				
		//iDebug('pageTimer='+pageTimer);
	}catch(e){
		iDebug('createPageTimer error! : '+ e);
	}
}

function showPage(cusLayerId,timeOutReact){
	try{
		
		//iDebug('showPageInvoked, cusLayerId='+cusLayerId+' ,timeOutReact='+timeOutReact+' ,pageTimerFlag='+pageTimerFlag)
		if(pageTimerFlag==0){
			pageTimerFlag = 1;		
			delPageTimer();	
			removeCover();   //david 2011.06.02
			var cusLayerObj = document.getElementById(cusLayerId);
			var defaultLayerObj = document.getElementById("C-Mainbody");
			
			if(cusLayerObj!=null && cusLayerObj!=undefined){
				cusLayerObj.style.display="block";
			}else if(defaultLayerObj!=null && defaultLayerObj!=undefined){
				document.getElementById("C-Mainbody").style.display="block";
			}
			consoleLogOutput(5,"DVR-99.js",arguments.callee.name,"timeOutReact:" + timeOutReact + " hintsShowing:" + hintsShowing);
			if(timeOutReact!=null && timeOutReact!=undefined && !hintsShowing){ //show page before CGI done
				//alert('timeOutReact fired!');
				iDebug('timeOutReact fired!');
				commonDisabler(true);
				var timer = setTimeout(validNotReadOnly,OBSERVER_HINT_TIMEOUT_INIT);
				enablerTimer.push(timer);//UI free for control after default timeout				
			}else{//show page after CGI done, or donothing
				iDebug('CGI done proc!');
			}			
		}	
	}catch(e){
		iDebug('showPage error! : ' + e);	
	}
}

function delPageTimer(){
	clearTimeout(pageTimer);
	//iDebug('pageTimer del invoked, after value pageTimer='+pageTimer);
}

/*
*  Author:david 2011.10.14
*  get page size   
*/
function getPAGE_SIZE(){
	var screenFlag = 1;
	var params = Spry.Utils.urlComponentToObject(top.location.search.replace(/^\?/, ""));
	if(params.screenFlag!=null||params.screenFlag!=undefined){
		screenFlag =params.screenFlag.toString().substring(4,5) ;       
	}else{
		screenFlag = 1;
	}
	return screenFlag;
}
/**
* 	  return  screenFlag's first number 
**/
function displayer(){
	var displayFlag;
	var params = Spry.Utils.getLocationParamsAsObject() ;
	if(params.screenFlag!=null||params.screenFlag!=undefined){
		displayFlag =params.screenFlag.toString().substring(0,1) ;       
	}else{
		displayFlag = 0;
	}
	return displayFlag;
}	
/**
* 	  Check communications status true or false
**/
function checkCommunication(){
	var status;
	var temp = /<Success>(\d+)<\/Success>/;
	var txt = overallResponseXml;
	var result = txt.match(temp);
	if (result != null){		
		if(result[1] == 100) {
			status = false;	
		}else{
			status = true;
		}
	}
	return status;
}

/**
*     created by duhong @ 20110406
**/
var retBtn = null;
function identifyRetBtn(returnButton){
	retBtn = returnButton;
}
/**
*     created by duhong @ 20110408
**/
var carRetBtn = new Array;
var mutex = 0;
function savRetBtn(){
	if(mutex==0 && retBtn!=null){
		carRetBtn.push(retBtn);
		mutex = 1;
		//alert('savRetBtn??saving id current'+retBtn.id)		
		retBtn = null;		
	}
}
function resRetBtn(){
	if(mutex==1 && carRetBtn.length>0){
		retBtn = carRetBtn.pop();
		mutex=0;
		//alert('resRetBtn??recoveryBtn id current'+retBtn.id )
	}
}

/**
* 	  turn the key event to mouse
*     created by dawei
*     update by duhong @ 20110406
**/
function keyToMouse(){
	var kCode = event.keyCode;
	var obj = event.srcElement;
	if(kCode==commonReturnKeyCode && retBtn){
		try{		
		retBtn.click();
		}catch(e){
			//alert('keyToMouse process of return Button failed: '+e);
		}
	}
	if(kCode==13){
		if(obj.onclick!=null){
			obj.onclick();
		}
	}
	if(radioArray&&radioArray!=null){//modified by luo 20110721
	        var currentFocusObj=document.activeElement;
			var cIndex=0;//the next object column index
			var rIndex=0;//the next object row index
	        if(kCode==9){//added by luo @ 20110721 deal with the problem of page scroll about radio down
					    if(currentFocusObj.type!="radio"){
					       return;
					    }
						for(var i=0;i<radioArray.length;i++){
								for(var j=0;j<radioArray[i].length;j++){
										
										if(currentFocusObj.id==radioArray[i][j]){// is the current focus object in the radioArray?
												if(event.shiftKey){
													  if(currentFocusObj.id==radioArray[i][0]){//is the first object in the i row
														  cIndex=0;
														  rIndex=i;
												      }else{
														  rIndex=i;
														  cIndex=j-1;
													  }
												   
												}else{
													  if(currentFocusObj.id==radioArray[i][radioArray[i].length-1]){//is the last object in the i row
														  cIndex=radioArray[i].length-1;
														  rIndex=i;
													  }else{
														  cIndex=j+1;
														  rIndex=i;
													  }
												}
												stopDefaultling(event);
												document.getElementById(radioArray[rIndex][cIndex]).checked=true;
												document.getElementById(radioArray[rIndex][cIndex]).click();
												document.getElementById(radioArray[rIndex][cIndex]).focus();
												last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
												break;
										}
										
								}//end inside for
						}//end outside for
			}
			if(kCode==40){//added by luo @ 20110708 deal with the problem of page scroll about radio down
								for(i=0;i<radioArray.length;i++){
										if(currentFocusObj.id==radioArray[i][radioArray[i].length-1]){
											 stopDefaultling(event);
											 return;
										}
								 }
			}
			if(kCode==38){//added by @ 20110708 deal with the problem of page scroll about radio up
					  if(radioArray&&radioArray!=null){//modified by luo 20110719
							  for(i=0;i<radioArray.length;i++){
										  if(currentFocusObj.id==radioArray[i][0]){
											  stopDefaultling(event);
											  return;
										  }
								}
					   }
			}
	}//end out if
}

/**
* 	  turn the ESc key event to mouse
*     created by dawei
*     update by duhong @ 20110427
**/
function EsckeyToMouse(){
	var kCode = event.keyCode;
	var obj = event.srcElement;
	if(kCode==commonReturnKeyCode && retBtn){
		try{		
		retBtn.click();
		}catch(e){
			//alert('keyToMouse process of return Button failed: '+e);
		}
	}	
	if(kCode==13 && obj.type=="button"){
		if(obj.onclick!=null){
			obj.onclick();
		}
	}
}

/**
* 	  globle Key Rereaction
**/
function globleKeyRereaction(e,id){
 		if(e.keyCode=="8"){ // key "backspace" 
			document.getElementById(id).click();
		}
}

/**
* Change screen to same machine
*
**/
function sameScreen(toUrl){
	var toUrlNew;
	var fromInfo = getFromIpUrl(toUrl);
    if(toUrl.indexOf("?")==-1){
		toUrlNew="http://"+window.location.host+"/"+toUrl+"?";
	}else{
		toUrlNew="http://"+window.location.host+"/"+toUrl+"&";
	}
	if(fromInfo.fromParamStr!=null&&fromInfo.fromParamStr.length>0){
		if(fromInfo.fromParamStr.substring(fromInfo.fromParamStr.length-1)=='&'){
			fromInfo.fromParamStr = fromInfo.fromParamStr.substring(0,fromInfo.fromParamStr.length-1);
		}
	}
	WindowLocationFromDispWebView( toUrlNew+fromInfo.fromParamStr );
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function removeSavedPara(checkUrl,procUrl,paramName){//updated by hdu @ 20110511, comm url param  david 2011.08.18
	if((checkUrl && checkUrl.indexOf('DVR-01-00-00')!=-1) || (!checkUrl)){//if checkUrl is root menu
		 //remove savepPara from procUrl
		var startIndex;// = procUrl.indexOf('savedPara');
		//if (startIndex!=-1)	{
		params = Spry.Utils.getLocationParamsAsObject();	
		var endIndex;
		for(p in params)
		{
			if(p == 'savedPara' && params[p]!=undefined){
				/*startIndex=procUrl.indexOf('savedPara');
				endIndex = startIndex + p.length + 1 + params[p].toString().length;
				procUrl = procUrl.substring(0,startIndex-1) + procUrl.substring(endIndex);	*/	
				procUrl=getProcUrl(p,params[p],procUrl);
			}else{
				if(typeof paramName=="string"){
					if(p == paramName && params[p]!=undefined){
						procUrl=getProcUrl(p,params[p],procUrl);		
					}
				}	
				else if(typeof paramName=="object"){
					for(var m in paramName){
						if(paramName[m]!=undefined){
							paramName[m]=paramName[m].toString();
							if(p == paramName[m] && params[p]!=undefined){
								procUrl=getProcUrl(p,params[p],procUrl);
							}
						}
					}
				}
			}
		}
	}
	return procUrl;
}
function getProcUrl(str1,str2,procUrl){  //add david 2011.08.18
	startIndex=procUrl.indexOf(str1);
	endIndex = startIndex + str1.length + 1 + str2.toString().length;
	procUrl = procUrl.substring(0,startIndex) + procUrl.substring(endIndex+1);
	return procUrl;	
}

function getFromIpUrl(url,flag){
	var toUrl = url;
	var fromUrl;
	var fromIp;
	if(flag){	
		// URL中に"|"のような文字は%7cへエンコードしたので、解析前に、まずディコードする
		fromUrl=decodeURI(window.location.href);
		fromIp =window.location.host;
	}else{
		// URL中に"|"のような文字は%7cへエンコードしたので、解析前に、まずディコードする
		fromUrl=decodeURI(top.rightpage.location.href);
		fromIp =top.rightpage.location.host;
	}
	
	var start = fromUrl.indexOf(fromIp)+fromIp.length;
	var end = fromUrl.indexOf("?");
	if(end==-1){
		end=fromUrl.length;
	}
	var paramStr = fromUrl.substring(end+1,fromUrl.length);
	fromUrl = fromUrl.substring(start+1,end);
	var temp;
	var temp1;
	var pros;
	var mark;
	var mk;
	var params;
	if(flag){	
		if(window.location.search.indexOf('&amp;')!=-1){
			params =  Spry.Utils.urlComponentToObject(window.location.search.replace(/^\?/, ""),'&amp;');
		}else{
			params =  Spry.Utils.urlComponentToObject(window.location.search.replace(/^\?/, ""));	
		}
	}else{
		if(top.rightpage.location.search.indexOf('&amp;')!=-1){
			params =  Spry.Utils.urlComponentToObject(top.rightpage.location.search.replace(/^\?/, ""),'&amp;');
		}else{
			params =  Spry.Utils.urlComponentToObject(top.rightpage.location.search.replace(/^\?/, ""));	
		}
	}
	if(toUrl!=null){ 
	   for(var p in params){  
	        mark = toUrl.indexOf("?"+p+"=");
			if(mark==-1){
				mark = toUrl.indexOf("&"+p+"=");
			}
			if(mark!=-1){ 
				mk = paramStr.indexOf("&"+p+"=");
				if(typeof params[p]!="object"){
					pros = params[p].toString();
					start = mk+1;
					end = start+p.length+2+pros.length;
					paramStr = paramStr.substring(0,start)+paramStr.substring(end,paramStr.length);
				}else{
					for(var i= 0;i<params[p].length;i++){
						pros = params[p][i].toString();
						start = mk+1;
						end = start+p.length+2+pros.length;
						paramStr = paramStr.substring(0,start)+paramStr.substring(end,paramStr.length);
			    		mk = paramStr.indexOf("&"+p+"=");
					}
				}
			}
		}  
	}  
	//alert(paramStr);
	var parentIp=params.parentIP;
	var parentUrl=params.parentUrl;
	if(parentIp!=null&&parentIp!=""){

		fromIp=parentIp+gSeparator+fromIp;
		
	}
	if(parentUrl!=null&&parentUrl!=""){
		
		fromUrl=parentUrl+gSeparator+fromUrl;
		
	}		
	start =  paramStr.indexOf("parentIP");
	if(start!=-1){
		end = start+"parentIP".length+2+parentIp.length;
		paramStr = paramStr.substring(0,start)+paramStr.substring(end,paramStr.length);
	}
	start =  paramStr.indexOf("parentUrl");
	if(start!=-1){
		end = start+"parentUrl".length+2+parentUrl.length;
		paramStr = paramStr.substring(0,start)+paramStr.substring(end,paramStr.length);
	}
	if(paramStr!=null&&paramStr.length>0){
		if(paramStr.substring(paramStr.length-1)=='&'){
			//paramStr = paramStr.substring(0,paramStr.length-1);
		}else{
			paramStr = paramStr+"&";
		}
	}

	var fromInfo = {"fromParamStr":paramStr,"fromUrl":fromUrl,"fromIp":fromIp};
	return fromInfo;
}
/**
* Change screen to another Server(toIp,toUrl)
*
**/
function anotherServer(toIp,toUrl,savedPara,flag){//updated by hdu @ 20110511, comm url param
	consoleLogOutput(6,"DVR-99.js",arguments.callee.name, "IN[" + toIp + "][" + toUrl + "][" + savedPara + "][" + flag + "]");
	try{
		//alert('toIp='+toIp+' toUrl='+toUrl)
		//createCover();     //david add 2011.06.04
		
		var toUrlNew;
		var fromInfo = getFromIpUrl(toUrl,flag);
		if(toUrl.indexOf("?")==-1){
			toUrlNew="http://"+toIp+"/"+toUrl+"?";
		}else{
			toUrlNew="http://"+toIp+"/"+toUrl+"&";
		}

		//戻り先がない場合はDVR-01-00-00-blank.htmlを付加する
		if(fromInfo.fromIp == null || fromInfo.fromIp == undefined || fromInfo.fromIp == "")
		{
			fromInfo.fromIp = "127.0.0.1";
			fromInfo.fromUrl = "DVR-01-00-00/DVR-01-00-00-blank.html";
			consoleLogOutput(3,"DVR-99.js",arguments.callee.name, "ParentURLなしのため情報付加");
		}
		consoleLogOutput(6,"DVR-99.js",arguments.callee.name, "パラメタ確認[" + fromInfo.fromIp + "][" + fromInfo.fromUrl + "]");
		var goUrl = toUrlNew+removeSavedPara(toUrlNew,fromInfo.fromParamStr)+"parentIP="+fromInfo.fromIp+"&parentUrl="+fromInfo.fromUrl;	
		//20120502 Yabuta add start		accesslogにログを出力する
		if(jsLOG == true)
		{
			//ログがパラメータにある場合は消去する
			var startLog = goUrl.indexOf("jsLOG");
			var endLog = goUrl.indexOf("LOGEND");
			
			if((startLog != -1) && (endLog != -1))
			{
				goUrl = goUrl.substring(0,(startLog-1)) + goUrl.substring(endLog+6);
			}
		}
		//20120502 Yabuta end
		if(savedPara){
			 goUrl = removeSavedPara(null,goUrl) +"&savedPara="+savedPara;
		}
		//setTimeout(function(){window.location = goUrl},10000);
		
		// Widgetによるカメラ名称の出力変更により、ライブ画面/再生画面/ピント調整画面(カメラ側からくる分)に遷移する場合は、カメラの名称を表示させるパラメータを付与し遷移する様に設定
		if(toUrl.indexOf(LIVE_SCREEN_URL) > -1 || toUrl.indexOf(PLAY_SCREEN_URL) > -1 || toUrl.indexOf(FOCUS_SETTING_URL) > -1){
			goUrl += SHOW_CAM_NAME;
			flag = true;
		}
		
		//20111109 Yabuta add フレーム化対応 ライブ画面からの遷移の場合はPAGEIDをリクエストにつける
		if(pageIdTmp!="" && pageIdTmp!=undefined && pageIdTmp!=null)
		{
			goUrl = goUrl + "&PAGEID=" + pageIdTmp;
			pageIdTmp=null;
			//alert(goUrl);
		}
		//20111109 Yabuta end

		//window.location = goUrl;
		 if(flag){
			WindowLocationFromDispWebView( goUrl );
		 }else{
			// #17019 location方式変更
			TopLocationFromDispWebView("false", goUrl );
		 }
		 //alert('targetUrl = '+targetUrl);
		 
	}catch(e){
		iDebug('exception during anotherServer! : '+e);
	}
}

/**
* Change screen to same Server(toUrl)
*
**/
function sameServer(toUrl,savedPara,flag){//updated by hdu @ 20110511, comm url param

	try {
		consoleLogOutput(6,"DVR-99.js",arguments.callee.name, "IN[" + toUrl + "][" + savedPara + "][" + flag + "]");

		//createCover();     //david add 2011.06.04

		var toUrlNew;
		var fromInfo = getFromIpUrl(toUrl,flag);
	    if(toUrl.indexOf("?")==-1){
			toUrlNew="http://"+window.location.host+"/"+toUrl+"?";
		}else{
			toUrlNew="http://"+window.location.host+"/"+toUrl+"&";
		}

		//戻り先がない場合はDVR-01-00-00-blank.htmlを付加する
		if(fromInfo.fromIp == null || fromInfo.fromIp == undefined || fromInfo.fromIp == "")
		{
			fromInfo.fromIp = "127.0.0.1";
			fromInfo.fromUrl = "DVR-01-00-00/DVR-01-00-00-blank.html";
			consoleLogOutput(3,"DVR-99.js",arguments.callee.name, "ParentURLなしのため情報付加");
		}
		consoleLogOutput(6,"DVR-99.js",arguments.callee.name, "パラメタ確認[" + fromInfo.fromIp + "][" + fromInfo.fromUrl + "]");
		var goUrl = toUrlNew+removeSavedPara(toUrlNew,fromInfo.fromParamStr)+"parentIP="+fromInfo.fromIp+"&parentUrl="+fromInfo.fromUrl;
		
		//20120502 Yabuta add start		accesslogにログを出力する
		if(jsLOG == true)
		{
			//ログがパラメータにある場合は消去する
			var startLog = goUrl.indexOf("jsLOG");
			var endLog = goUrl.indexOf("LOGEND");
			
			if((startLog != -1) && (endLog != -1))
			{
				goUrl = goUrl.substring(0,(startLog-1)) + goUrl.substring(endLog+6);
			}
		}
		//20120502 Yabuta add
		
		if(savedPara){
			goUrl = removeSavedPara(null,goUrl) +"&savedPara="+savedPara;		
		}
		//setTimeout(function(){window.location = goUrl;},10000);
		
		// Widgetによるカメラ名称の出力変更により、ライブ画面/再生画面に遷移する場合は、カメラの名称を表示させるパラメータを付与し遷移する様に設定
		if(toUrl.indexOf(LIVE_SCREEN_URL) > -1 || toUrl.indexOf(LIVE_SCREEN_URL_FOR_BACK) > -1 
		 || toUrl.indexOf(PLAY_SCREEN_URL) > -1 || toUrl.indexOf(FOCUS_SETTING_URL) > -1){
			goUrl += SHOW_CAM_NAME;
			flag = true;
		}

		//20120131 Yabuta add フレーム化対応 ライブ画面からの遷移の場合はPAGEIDをリクエストにつける
		if(pageIdTmp!="" && pageIdTmp!=undefined && pageIdTmp!=null)
		{
			goUrl = goUrl + "&PAGEID=" + pageIdTmp;
			pageIdTmp=null;
			//alert(goUrl);
		}
		//20120131 Yabuta end
		
		// window.location = goUrl;
		 //alert(goUrl);
		if(flag){
			WindowLocationFromDispWebView( goUrl );
		}else{
			// #17019 location方式変更
			TopLocationFromDispWebView("false",  goUrl );
		}
		//window.location ="http://"+window.location.host+"/"+toUrl + "?parentIP=" + fromInfo.fromIp+ "&parentUrl=" + fromInfo.fromUrl;
	// ログ強化（画面遷移失敗の場合、JavaScriptのエラー内容を出力する）
	} catch(e) {
		consoleLogOutput(6,"DVR-99.js", e);
	}
}
/**
* back screen to parent server(fromIp,fromUrl)
*
**/
function backServer(backLevel,delParamers,flag){//updated by hdu @ 20110511, comm url param
	consoleLogOutput(6,"DVR-99.js",arguments.callee.name, "IN[" + backLevel + "][" + delParamers + "][" + flag + "]");
	var level = 1;
	if(backLevel!=null){
		level = backLevel;
	}
	var fromInfo = getFromIpUrl(null,flag);

	var temp;
	temp = fromInfo.fromIp.split(gSeparator);
	for(var i=0;i<level;i++){
		temp.pop();
	}
	//alert(temp);
	var toIp = temp.pop();
	var fromIp = temp.join(gSeparator);
	
	temp = fromInfo.fromUrl.split(gSeparator);
	for(var i=0;i<level;i++){
		temp.pop();
	}
	
	var toUrl = temp.pop();
	var fromUrl = temp.join(gSeparator);

	//20120502 Yabuta add start		accesslogにログを出力する	
	if(jsLOG == true && localStorage['logBuff'])
	{
		//ログ蓄積用のlocalstorageに貯めたテキストを吐き出す
		var logBuffArray = new Array();
		logBuffArray = JSON.parse(localStorage['logBuff']);
		var logtext = "";
		for(i=0;i<logBuffArray.length;i++)
		{
			if(i < 9)
			{
				logtext = logtext + "LINE0" + (i+1) + "--" + logBuffArray[i];
			}
			else
			{
				logtext = logtext + "LINE" + (i+1) + "--" + logBuffArray[i];
			}
		}
		logtext = logtext + "LOGEND";
		localStorage.removeItem("logBuff");
		var goUrl = "http://"+toIp+"/"+toUrl+"?"+removeSavedPara(toUrl,fromInfo.fromParamStr,delParamers)+"parentIP="+fromIp+"&parentUrl="+fromUrl+"&jsLOG="+logtext;
	}
	else
	{
		//戻り先が見つからない場合はDVR-01-00-00-blank.htmlを読み込ませる
		if(toIp == null || toIp == undefined || toIp == "")
		{
			toIp = "127.0.0.1";
			toUrl = "DVR-01-00-00/DVR-01-00-00-blank.html";
			consoleLogOutput(3,"DVR-99.js",arguments.callee.name, "ParentURLなしのためBlank呼出");
		}
		var goUrl = "http://"+toIp+"/"+toUrl+"?"+removeSavedPara(toUrl,fromInfo.fromParamStr,delParamers)+"parentIP="+fromIp+"&parentUrl="+fromUrl;
	}
	//20120502 Yabuta add end
	
	// Widgetによるカメラ名称の出力変更により、ライブ画面/再生画面に戻る場合は、カメラの名称を表示させるパラメータを付与し戻る様に設定
	// これから戻る画面のURL（パラメータは除く）に該当の文字列が存在すればパラメータを付与する
	if(toUrl.indexOf(LIVE_SCREEN_URL) > -1 || toUrl.indexOf(LIVE_SCREEN_URL_FOR_BACK) > -1 || toUrl.indexOf(PLAY_SCREEN_URL) > -1){
		goUrl += SHOW_CAM_NAME;
	}

	var mark=null;
	if(fromUrl==''){
		mark=delWINDOW_PAGEID();
	}
	if(!mark){
		if(flag){
			WindowLocationFromDispWebView( goUrl );
		}else{
			// #17019 location方式変更
			// 戻るボタン処理を行う
			try {
				// NVRとCNVの場合
				if(dispWebViewFlag == "Active") {
					// Dispプロセスの経由でURLの切換を行う
				 	DispWebView.GoTop(decodeURIComponent(goUrl));
				} else {
					// #17019 location方式変更
					TopLocationFromDispWebView("false", goUrl );
				}
			}
			catch(e)
			{
				// エラーの時、ログ出力
				errOutput(e);
			}
		}
	}else{
		// #17019 location方式変更
		TopLocationFromDispWebView("true", delWINDOW_PAGEID() );
	}
}

/**
 * 自画面が保持しているパラメータにパラメータを追加しつつ前画面に戻る場合に使用する
 * 前画面に戻る仕様はbackServerと同様の仕様とする
 * 2次元配列で作成するパラメータ情報を渡す
 * 付与できるパラメータには限界がある為、最大値を考慮してテストを実施する事
 * 第4引数追加 フレーム化対応(backServerに引数が追加された為)
 * addParams : Array(Array(パラメータ名,パラメータ)) で作成する
**/
function backServerForAddParam(backLevel,delParamers,addParams,flag){
	consoleLogOutput(6,"DVR-99.js",arguments.callee.name, "IN[" + backLevel + "][" + delParamers + "][" + addParams + "][" + flag + "]");
	var level = 1;
	if(backLevel!=null){
		level = backLevel;
	}
	var fromInfo = getFromIpUrl(null, flag);
	
	var temp;
	temp = fromInfo.fromIp.split(gSeparator);
	for(var i=0;i<level;i++){
		temp.pop();
	}
	//alert(temp);
	var toIp = temp.pop();
	var fromIp = temp.join(gSeparator);
	
	temp = fromInfo.fromUrl.split(gSeparator);
	for(var i=0;i<level;i++){
		temp.pop();
	}
	
	//戻り先が見つからない場合はDVR-01-00-00-blank.htmlを読み込ませる
	if(toIp == null || toIp == undefined || toIp == "")
	{
		toIp = "127.0.0.1";
		toUrl = "DVR-01-00-00/DVR-01-00-00-blank.html";
		consoleLogOutput(3,"DVR-99.js",arguments.callee.name, "ParentURLなしのためBlank呼出");
	}
	var toUrl = temp.pop();
	var fromUrl = temp.join(gSeparator);
	var goUrl = "http://"+toIp+"/"+toUrl+"?"+removeSavedPara(toUrl,fromInfo.fromParamStr,delParamers)+"parentIP="+fromIp+"&parentUrl="+fromUrl;
	
	// Widgetによるカメラ名称の出力変更により、ライブ画面/再生画面に戻る場合は、カメラの名称を表示させるパラメータを付与し戻る様に設定
	// これから戻る画面のURL（パラメータは除く）に該当の文字列が存在すればパラメータを付与する
	if(toUrl.indexOf(LIVE_SCREEN_URL) > -1 || toUrl.indexOf(LIVE_SCREEN_URL_FOR_BACK) > -1 || toUrl.indexOf(PLAY_SCREEN_URL) > -1){
		goUrl += SHOW_CAM_NAME;
	}
	
	//***** ここからオリジナルの処理 *****//
	//addParamsが配列オブジェクトの場合のみ実施
	if(addParams&&addParams instanceof Array){
		for(var i = 0;i < addParams.length;i++){
			goUrl = goUrl + "&" + addParams[i][0] + "=" + addParams[i][1];
		}
	}
	
	/* フレーム化対応 */
	var mark=null;
	if(fromUrl==''){
		mark=delWINDOW_PAGEID();
	}
	if(!mark){
		if(flag){
			WindowLocationFromDispWebView( goUrl );
		}else{
			// #17019 location方式変更
			TopLocationFromDispWebView("false", goUrl );
		}
	}else{
		// #17019 location方式変更
		TopLocationFromDispWebView("true", delWINDOW_PAGEID() );
	}
	//window.location = goUrl;
}

/**
 * 自画面が保持しているパラメータで削除したいパラメータがある場合に使用する
 * 注意！！ 使用時に必須パラメータを削除しないようにする事 注意！！
 * targetParamsは配列で渡す事
 * 第4引数追加 フレーム化対応(backServerに引数が追加された為)
 **/
function backServerForDelParam(backLevel,delParamers,targetParams,flag){
	consoleLogOutput(6,"DVR-99.js",arguments.callee.name, "IN[" + backLevel + "][" + delParamers + "][" + targetParams + "][" + flag + "]");
	var level = 1;
	if(backLevel!=null){
		level = backLevel;
	}
	var fromInfo = getFromIpUrl(null,flag);
	
	var temp;
	temp = fromInfo.fromIp.split(gSeparator);
	for(var i=0;i<level;i++){
		temp.pop();
	}
	//alert(temp);
	var toIp = temp.pop();
	var fromIp = temp.join(gSeparator);
	
	temp = fromInfo.fromUrl.split(gSeparator);
	for(var i=0;i<level;i++){
		temp.pop();
	}
	
	var toUrl = temp.pop();
	var fromUrl = temp.join(gSeparator);
	//***** ここからオリジナルの処理 *****//
	//removeSavedParaの戻り値で受け取った値から、さらに本メソッドの第3引数に指定されているパラメータ名を削除する
	var resultPara = removeSavedPara(toUrl,fromInfo.fromParamStr,delParamers);
	var startIndex = 0;
	var endIndex = 0;
	for(var i = 0; i < targetParams.length; i++){
		if(resultPara.indexOf(targetParams[i]) > -1){
			startIndex = resultPara.indexOf(targetParams[i]);
			endIndex = resultPara.indexOf("&",startIndex);
			//次の"&"が見つからない場合は、最終文字までを削除対象とする
			if(endIndex == -1){
				endIndex = resultPara.length;
			}
			resultPara = resultPara.substring(0,startIndex) + resultPara.substring(endIndex+1);
		}
	}
	//戻り先が見つからない場合はDVR-01-00-00-blank.htmlを読み込ませる
	if(toIp == null || toIp == undefined || toIp == "")
	{
		toIp = "127.0.0.1";
		toUrl = "DVR-01-00-00/DVR-01-00-00-blank.html";
		consoleLogOutput(3,"DVR-99.js",arguments.callee.name, "ParentURLなしのためBlank呼出");
	}
	var goUrl = "http://"+toIp+"/"+toUrl+"?"+resultPara+"parentIP="+fromIp+"&parentUrl="+fromUrl;
	
	// Widgetによるカメラ名称の出力変更により、ライブ画面/再生画面に戻る場合は、カメラの名称を表示させるパラメータを付与し戻る様に設定
	// これから戻る画面のURL（パラメータは除く）に該当の文字列が存在すればパラメータを付与する
	if(toUrl.indexOf(LIVE_SCREEN_URL) > -1 || toUrl.indexOf(LIVE_SCREEN_URL_FOR_BACK) > -1 || toUrl.indexOf(PLAY_SCREEN_URL) > -1){
		goUrl += SHOW_CAM_NAME;
	}
	
	/* フレーム化対応 */
	var mark=null;
	if(fromUrl==''){
		mark=delWINDOW_PAGEID();
	}
	if(!mark){
		if(flag){
			WindowLocationFromDispWebView( goUrl );
		}else{
			// #17019 location方式変更
			TopLocationFromDispWebView("false", goUrl );
		}
	}else{
		// #17019 location方式変更
		TopLocationFromDispWebView("true", delWINDOW_PAGEID() );
	}
	//window.location = goUrl;
}

/**
* translate message id to message text
* if translate failure, message id will be return
*
* please add message id & text  mapping in DVR-99-99-02.js
*
**/
function gettext(msgid) {
	var msgtext;
	msgtext = Global_Messages[msgid];
	if (msgtext == null) {
		msgtext = msgid;
	}
	return msgtext;
}

//common spry error info show
function commonErrorShow(info){
	// 例外処理
	try{//in case actionPop not introduced, added by hdu @ 20110613
//	var pop_warning=new actionPop(info,1,"&#x623B;&#x308B;","noe");
//	pop_warning.show(document.activeElement);//-updated by duhong @ 20110331 common msg pop focus control-->
//	document.getElementById('DVR99-02-01_text').style.overflow="scroll";

		// ポップアップ表示ではなく、デバッグ表示に変更
		iDebug("commonErrorShow:"+info);
	}catch(e){
		//alert('commonErrorShow error! '+e);	
	}	
}

/**
* common callback function for exception handling after form submitted
*
**/
function commonSubmitError(req) 
{
	var debuginfo = "url: \n\n[" + req.url + "] \n\n post data: \n\n[" + req.postData + "]\n\n response: \n\n[" + req.xhRequest.responseText + "]";
	//alert(debuginfo);
	commonErrorShow(debuginfo);
}
/**
* common function for form submit
*
**/
function submitForm(form, callback, opts, hintFlag) {
	//alert(hintFlag);
	if (!opts) opts = {};
	if(!opts.errorCallback) opts.errorCallback = commonSubmitError;
	if(hintFlag){
		submitFormWithHint(form, callback, opts);
	}else{
		//Debug関数挿入
		//return Spry.Utils.submitForm(form, callback, opts);
		return Spry.Utils.submitForm(form, function(req){
												// Debug用処理
												iDebug(callback.name + " start ");
												callback(req);
												// Debug用処理
												iDebug(callback.name + "  end  ");
												}, opts);
	}
}

/**
* common callback function for exception handling once the region receive a notification
*
**/
function commonRegionError(sourceObject) 
{
	var debuginfo = "error occur on region [" + sourceObject.regionID + "]\n\n";
	if(sourceObject.region) {
		var len = sourceObject.region.dataSets.length;
		for(var i=0;i<len;i++) {
			var dsinfo = sourceObject.region.dataSets[i];
			debuginfo += "\n dataSet [" + i + "] \n\n url: \n\n[" + dsinfo.getURL() + "] \n";
		}
	}
	//alert(debuginfo);
	commonErrorShow(debuginfo);	
}

/**
* common callback function for handling the region notification
*
**/
function commonRegionObserver(methodName, sourceObject, data, regionObserver) {
	if (methodName == "onError") {
		commonRegionError(data);
	} else {

		if (regionObserver)
		{
			// Debug用処理
			iDebug(regionObserver.onPostUpdate.name + " start ["+methodName+"]");
			if (typeof regionObserver == "function")
			{
				regionObserver(methodName, sourceObject, data);
			}
			else if (regionObserver[methodName])
			{
				regionObserver[methodName](sourceObject, data);
			}
			// Debug用処理
			iDebug(regionObserver.onPostUpdate.name + "  end  ["+methodName+"]");
		}
	}
}

/**
* common function to prepare Spry Region Observer
*
**/
function addSpryRegionObserver(regionName, regionObserver, hintFlag) {
	if(hintFlag == OBSERVER_HINT_MODE_INIT || hintFlag == OBSERVER_HINT_MODE_BTN){
		iDebug('addSpryRegionObserver, hintFlag='+hintFlag);
		return Spry.Data.Region.addObserver(regionName, function(methodName, notifier, data) {
																 commonEnabler('readInfoByRO',null); //free UI after CGI done
																 commonRegionObserver(methodName, notifier, data, regionObserver);
																 });		
	}else{
		return Spry.Data.Region.addObserver(regionName, function(methodName, notifier, data) {
																 commonRegionObserver(methodName, notifier, data, regionObserver);
																 });
	}
}
/**
* common callback function for exception handling once the dataset receive a notification
*
**/
function commonDataSetError(sourceObject) 
{
	var debuginfo = "error occur on DataSet [" + sourceObject.url + "] \n\n";
	debuginfo = "url: \n\n[" + sourceObject.url + "] \n\n post data: \n\n[" + sourceObject.postData + "]\n\n response: \n\n[" + sourceObject.xhRequest.responseText + "]";
	//alert(debuginfo);
	commonErrorShow(debuginfo);	
}

/**
* common callback function for handling the dataset notification
*
**/
function commonDataSetObserver(methodName, sourceObject, data, dataSetObserver) {
	//alert(methodName);
	if (methodName == "onLoadError") {
		commonDataSetError(data);
	} else {
		if (dataSetObserver)
		{
			// Debug用処理
			iDebug(dataSetObserver.name + " start ["+methodName+"]");
			if (typeof dataSetObserver == "function")
			{
				dataSetObserver(methodName, sourceObject, data);
			}
			else if (dataSetObserver[methodName])
			{
				dataSetObserver[methodName](sourceObject, data);
			}
			// Debug用処理
			iDebug(dataSetObserver.name + "  end  ["+methodName+"]");
		}
	}
}

/**
* common function to prepare Spry DataSet Observer
*
**/
function addSpryDataSetObserver(objDataSet, dataSetObserver, hintFlag) {
	consoleLogOutput(6,"DVR-99.js",arguments.callee.name,"IN hintFlag:" + hintFlag);
	if(hintFlag == OBSERVER_HINT_MODE_INIT || hintFlag == OBSERVER_HINT_MODE_BTN){
		consoleLogOutput(8,"DVR-99.js",arguments.callee.name,"if");
		iDebug('addSpryDataSetObserver OBSERVER_HINT_MODE step in!');
		if(hintFlag == OBSERVER_HINT_MODE_BTN){
			//alert('addSpryDataSetObserver is OBSERVER_HINT_MODE_BTN!');	
			iDebug('addSpryDataSetObserver commonDisabler proc for OBSERVER_HINT_MODE_BTN!');			
			commonDisabler(true);
			var timer = setTimeout(validNotReadOnly,OBSERVER_HINT_TIMEOUT_BTN);
			enablerTimer.push(timer);//UI free for control after default timeout			
		}
		return objDataSet.addObserver(function(methodName, notifier, data) {
																			commonEnabler('readInfo',methodName); //free UI after CGI done
																			commonDataSetObserver(methodName, notifier, data, dataSetObserver);
																				});
	}else{
		consoleLogOutput(8,"DVR-99.js",arguments.callee.name,"else");
		return objDataSet.addObserver(function(methodName, notifier, data) {
																			commonDataSetObserver(methodName, notifier, data, dataSetObserver);
																				});		
	}
}

/**
* common test function for test form submit
*
**/
function submitFormWithHint(form, callback, opts) {
	consoleLogOutput(6,"DVR-99.js",arguments.callee.name,"IN");
	//iDebug('submitFormWithHint!');
	commonDisabler(true);
	setTimeout(validNotReadOnly,SUBMIT_HINT_TIMEOUT_DEFUALT);//UI free for control after default timeout
	return Spry.Utils.submitForm(form, function(req){
												commonEnabler('submit',null);
												// Debug用処理
												iDebug(callback.name + " start ");
												callback(req);
												// Debug用処理
												iDebug(callback.name + "  end  ");
												}, opts);
}


/**
*   david add 2011.09.15
*   the function for waitImage and waitPop 
**/
function showWaitPop(){
	consoleLogOutput(4,"DVR-99.js",arguments.callee.name,"IN");
	wait_pop_ForCover=new actionPopOpaque();
	wait_pop_ForCover.show();
	waitPopTimeFlag=setInterval(changeWaitImage,200);         //don't delete it
	//wait_pop_ForCard = new actionPop(gettext("PROCESSING_HINT"),0,"","") ;
	//wait_pop_ForCard.show();
	//document.getElementById("DVR99-02-01-table").style.display="block";   
	//waitPopTimeFlag=setInterval(changePopTd,8000);
	enablerTimer.push(waitPopTimeFlag);
}

function changeWaitImage(){
	waitImageFlag=waitImageFlag+1;
	var imageSpanObj = document.getElementById("loadingOpaque");
	var waitImageFlagMax = 25;
	if (screenId == "020603") {
		waitImageFlagMax = 15;
	}
	if (waitImageFlag <= waitImageFlagMax) {
		if(imageSpanObj!=null){
			var i=waitImageFlag;
			if(waitImageFlag>=13&&waitImageFlag<=24){
				i=waitImageFlag-12;
			}
			else if(waitImageFlag>=25&&waitImageFlag<=36){
				i=waitImageFlag-24;
			}
			imageSpanObj.style.backgroundImage="url(../images/"+i+".PNG)";
		}
	}else{
		waitImageFlag = 0;
		clearInterval(waitPopTimeFlag);
		wait_pop_ForCover.hide();
		consoleLogOutput(2,"DVR-99.js",arguments.callee.name,"しばおまプログレスバーの表示");
		wait_pop_ForCard = new actionPop(gettext("PROCESSING_HINT"),0,"","") ;
		wait_pop_ForCard.show();
		document.getElementById("DVR99-02-01-table").style.display="block";
		waitPopTimeFlag=setInterval(changePopTd,8000);
		enablerTimer.push(waitPopTimeFlag);
	}
}

function changePopTd(){
	waitImageFlag=waitImageFlag+1;
	var tdObj;
	if(waitImageFlag<=450){
		tdObj = document.getElementById("td_"+waitImageFlag);
		//存在する場合のみ設定 2012.3.9 takeuchi 追加
		if(tdObj){
			// #15010 仕様上にプログレスバー付きで「処理中です。しばらくお待ちください。」のポップアップが不要になるので、
			// このプログレスバーを普通の「しばらくお待ちください。」ポップアップに変更する
			tdObj.style.backgroundColor="#333";
		}
	}else{
		tdObj = document.getElementById("td_"+waitImageFlag);
		//存在する場合のみ設定 2012.3.9 takeuchi 追加
		if(tdObj){
			// #15010 仕様上にプログレスバー付きで「処理中です。しばらくお待ちください。」のポップアップが不要になるので、
			// このプログレスバーを普通の「しばらくお待ちください。」ポップアップに変更する
			tdObj.style.backgroundColor="#333";
		}
		waitImageFlag = 0;
		clearInterval(waitPopTimeFlag);
		wait_pop_ForCard.hide();
	}
}
/*************************************************************************************8*/

function commonDisabler(flag){
	consoleLogOutput(3,"DVR-99.js",arguments.callee.name,"IN flag:" + flag);
	if(flag){
		//setTimeout(validReadOnly,500);	
		iDebug('commonDisabler in Action!');
		validReadOnly();
		//alert('disable body! --commonDisabler debug info');		
	}
}

function commonEnabler(src,methodName){
	try{	
		if(src=='readInfo'){
			//iDebug('readInfo of commonEnabler ['+ methodName+'] and hintsShowing is '+hintsShowing)
			//alert('commonEnabler.methodName = '+methodName+' !  --commonEnabler debug info' );		
			if((methodName == 'onPostLoad' || methodName == 'onDataChanged') && hintsShowing){
				iDebug('commonEnabler in Action!');				
				//setTimeout(validNotReadOnly,1000);
				validNotReadOnly();
				//alert('enable body! --by readInfo --commonEnabler debug info');	
				for(i in enablerTimer){
					clearTimeout(enablerTimer[i]);	
				}				
			}	
		}
		if(src=='submit' || src=='readInfoByRO'){
			//iDebug('submit linked validNotReadOnly proc..')					
			//setTimeout(validNotReadOnly,1000);
			iDebug('commonEnabler in Action! src=='+src);					
			validNotReadOnly();
				//alert('enable body! --by submit --commonEnabler debug info');	
				for(i in enablerTimer){
					clearTimeout(enablerTimer[i]);			
				}	
		}
	}catch(e){
		iDebug('Exception!commonEnabler : '+e);
	}			
}

function validReadOnly(){
	consoleLogOutput(3,"DVR-99.js",arguments.callee.name,"IN usableWaitPop:" + usableWaitPop);
	try{	
		if(!hintsShowing){
			
			//alert('validReadOnly start!');
		
			try{
				var workingAreaLayer = document.getElementById('WhollyBackground');
				if(workingAreaLayer){
					savedWorkingAreaZIndex=workingAreaLayer.style.zIndex; //save working area zIndex
					workingAreaLayer.style.zIndex=-1; //move working area to bottom
				}
				
				var hintLayer = document.getElementById('ATField');
				if(hintLayer){
					//hintLayer.style.display='block'; //display hint layer

					//20120427 Yabuta 修正
					if(usableWaitPop == true)//CGIの処理が終了している状態で呼ぶと消せなくなるのでフラグONの時のみwaitpopを呼ぶ
					{
						showWaitPop();
					}
					//20120427 Yabuta 修正ここまで
				}
				
				//if focus exist, discard it
				//iDebug('validReadOnly savedActiveElement is: '+savedActiveElement);
				savedActiveElement = document.activeElement;
				if(savedActiveElement)savedActiveElement.blur();
				
				//iDebug('saving body action : '+document.body.onkeydown);
				//20120427 Yabuta 修正
				if(usableWaitPop == true)//CGIの処理が終了している状態で呼ぶと消せなくなるのでフラグONの時のみwaitpopを呼ぶ
				{
					//save event hander of document.body
					savedBodyAction = new Array;
					savedBodyAction.push(document.body.onkeydown);
					
					//replace it with do noting, stop defualt reaction of keydown, should also affected keyup,keypress ...
					document.body.onkeydown = function(){
						stopDefaultling(event);
					};
				}
				//画面表示後にcgiが呼ばれた時用にフラグを戻す
				usableWaitPop = true;
				//20120427 Yabuta 修正ここまで
				
				hintsShowing = true;	
				
			//alert('validReadOnly end!');
			
			}catch(e){
				iDebug('Exception!validReadOnly while hintsShowing: '+e);
			}
		}
	}catch(e){
		iDebug('Exception!validReadOnly : '+e);
	}	
}

function validNotReadOnly(){
	try{		
	
		//always hide hintLayer 
		var hintLayer = document.getElementById('ATField');
		if(hintLayer){
			//hintLayer.style.display='none';	//hint layer hide
			waitImageFlag = 0;
			//clearInterval(waitPopTimeFlag);
			/*alert(document.getElementById("DVR99-02-01-table").style.display);                           don't delete it*/
			if(document.getElementById("DVROpaque")!=null&&wait_pop_ForCover.hide()!=undefined){
				wait_pop_ForCover.hide();
			}
			if(document.getElementById("DVR99-02-01-table")!=null&&wait_pop_ForCard&&wait_pop_ForCard.hide()!=undefined){
				wait_pop_ForCard.hide();	
			}
			
		}
			
		if(hintsShowing){//hint text is being showed, do responding process (control recovery)
		
			//alert('validNotReadOnly start!');			
			
			//iDebug('validNotReadOnly savedActiveElement is: '+savedActiveElement);
			//iDebug('hintFocusSaver is: '+hintFocusSaver);			

			if(hintFocusSaver) {
				hintFocusSaver.focus(); //added by hdu@ 20110523, manully set back.
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}else if(savedActiveElement && savedActiveElement.id){
				savedActiveElement.focus();	//restore focus	
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			}
					
			var	toExec = savedBodyAction.pop(); //restore saved dobument.body event handler
			//iDebug('toExec is :'+toExec)	
			if(toExec){
				//iDebug('Restore ReadOnlyKeyDownAction..')	
				document.body.onkeydown = function(){
				};				
				if(isIE()){
					document.body.attachEvent("onkeydown", toExec);	
				}else{
					document.body.addEventListener('keydown',toExec);
				}
			}

			var workingAreaLayer = document.getElementById('WhollyBackground');
			if(workingAreaLayer){
				document.getElementById('WhollyBackground').style.zIndex=savedWorkingAreaZIndex; //working area zIndex recovery				
			}			

			hintsShowing = false; //globle flag of hint layer showing, set to False
			
			//alert('validNotReadOnly end!');	
		}
	}catch(e){iDebug('Exception!validNotReadOnly : '+e);}			
}

function HintSaver(obj){
	hintFocusSaver = obj;
}

function isIE(){
	return !(!document.all); 
} 
	
function commSubmitFormThreeTimesEventProcess(form, callback, opts, eventName, successFlag, xmlResult, isCancel) {

}

function commSubmitFormThreeTimesCallback(form, callback, opts, eventName, req) {
	var isCancel = {value: false}; // change to 'true' to cancel subsequence process in event callback function
	var result;

	var aim = /<Success>(\d+)<\/Success>/;
	var txt = req.xhRequest.responseText;
	var resultMatch = txt.match(aim);

	var successFlag = -1;

	if (resultMatch != null) successFlag = resultMatch[1];

	if("CallbackFirstTime" ==  eventName) {
		opts.EventFirstTimeEnd(successFlag, txt, isCancel);

		if (!isCancel.value) {
			if(0 == successFlag) {
				aim = /<ProcessId>(.*)<\/ProcessId>/;
				resultMatch = txt.match(aim);

				var processId = -1;
				if (resultMatch != null) processId = resultMatch[1];

				opts.EventSecondTimeBegin(0, null, isCancel);
				if (!isCancel.value) {
					opts.additionalData = "ProcessId=" + encodeURIComponent(processId);
					form.action = opts.CGISecondTime;
					setTimeout(function() {submitForm(form, opts.CallbackSecondTime, opts);}, 0);
				}
			}
		}
	} else if("CallbackSecondTime" ==  eventName) {
		if(1 == successFlag) {
			form.action = opts.CGISecondTime;
			setTimeout(function() {submitForm(form, opts.CallbackSecondTime, opts);}, opts.SecondTimeCallDelay);
		} else if(0 == successFlag) {
			opts.EventSecondTimeEnd(successFlag, txt, isCancel);

			if (!isCancel.value) {
				opts.EventThirdTimeBegin(0, null, isCancel);
				if (!isCancel.value) {
					form.action = opts.CGIThirdTime;
					result = submitForm(form, opts.CallbackThirdTime, opts);
				}
			}
		}
	} else if("CallbackThirdTime" ==  eventName) {
		opts.EventThirdTimeEnd(successFlag, txt, isCancel);

		if (!isCancel.value) {
			callback(req);
		}
	} 
}

/**
* common function for form submit three times
*
* First Call: launch a job to process long time task, such as search or download 
* Second Call: query the progress of the job, running or finished 
* Third Call: retrieve the result of the job 
*
* cgi names
*
* first time:  call opts.CGIFirstTime (default = form.action)
* second time: call opts.CGISecondTime
* third time:  call opts.CGIThirdTime
*
* event names
*
* first time call: EventFirstTimeBegin(successFlag, xmlResult, isCancel)
* first time call end: EventFirstTimeEnd(successFlag, xmlResult, isCancel)
* second time call: EventSecondTimeBegin(successFlag, xmlResult, isCancel)
* second time call end: EventSecondTimeEnd(successFlag, xmlResult, isCancel)
* third time call: EventThirdTimeBegin(successFlag, xmlResult, isCancel)
* third time call end: EventThirdTimeEnd(successFlag, xmlResult, isCancel)
*
* callback names
*
* first time callback: CallbackFirstTime(form, callback, opts, eventName, req) 
* second time callback: CallbackSecondTime(form, callback, opts, eventName, req) 
* third time callback: CallbackThirdTime(form, callback, opts, eventName, req) 
*
* other options
*
* second time call delay: SecondTimeCallDelay (default = 1s)
**/
function submitFormThreeTimes(form, callback, opts) {
	var result = null;

	if ( typeof form == 'string' )
		form = Spry.$(form) || document.forms[form];

	if (!opts) opts = {};
	if (!opts.CGIFirstTime) opts.CGIFirstTime = form.getAttribute('action') || document.location.href;
	if (!opts.CGISecondTime) opts.CGISecondTime = opts.CGIFirstTime.substring(0,opts.CGIFirstTime.length - 4) + "-01.cgi";
	if (!opts.CGIThirdTime) opts.CGIThirdTime = opts.CGIFirstTime.substring(0,opts.CGIFirstTime.length - 4) + "-02.cgi";

	if (!opts.EventFirstTimeBegin) opts.EventFirstTimeBegin = function(successFlag, xmlResult, isCancel) {commSubmitFormThreeTimesEventProcess(form, callback, opts, "EventFirstTimeBegin", successFlag, xmlResult, isCancel);};
	if (!opts.EventFirstTimeEnd) opts.EventFirstTimeEnd = function(successFlag, xmlResult, isCancel) {commSubmitFormThreeTimesEventProcess(form, callback, opts, "EventFirstTimeEnd", successFlag, xmlResult, isCancel);};
	if (!opts.EventSecondTimeBegin) opts.EventSecondTimeBegin = function(successFlag, xmlResult, isCancel) {commSubmitFormThreeTimesEventProcess(form, callback, opts, "EventSecondTimeBegin", successFlag, xmlResult, isCancel);};
	if (!opts.EventSecondTimeEnd) opts.EventSecondTimeEnd = function(successFlag, xmlResult, isCancel) {commSubmitFormThreeTimesEventProcess(form, callback, opts, "EventSecondTimeEnd", successFlag, xmlResult, isCancel);};
	if (!opts.EventThirdTimeBegin) opts.EventThirdTimeBegin = function(successFlag, xmlResult, isCancel) {commSubmitFormThreeTimesEventProcess(form, callback, opts, "EventThirdTimeBegin", successFlag, xmlResult, isCancel);};
	if (!opts.EventThirdTimeEnd) opts.EventThirdTimeEnd = function(successFlag, xmlResult, isCancel) {commSubmitFormThreeTimesEventProcess(form, callback, opts, "EventThirdTimeEnd", successFlag, xmlResult, isCancel);};
	
	if (!opts.CallbackFirstTime) opts.CallbackFirstTime = function(req) {commSubmitFormThreeTimesCallback(form, callback, opts, "CallbackFirstTime", req);};
	if (!opts.CallbackSecondTime) opts.CallbackSecondTime = function(req) {commSubmitFormThreeTimesCallback(form, callback, opts, "CallbackSecondTime", req);};
	if (!opts.CallbackThirdTime) opts.CallbackThirdTime = function(req) {commSubmitFormThreeTimesCallback(form, callback, opts, "CallbackThirdTime", req);};
	
	if (!opts.SecondTimeCallDelay) opts.SecondTimeCallDelay = 1000;


	opts.EventFirstTimeBegin(0, null, isCancel);

	var isCancel = {value:false}; // change to 'true' to cancel subsequence process in event callback function
	if (!isCancel.value) {
		result = submitForm(form, opts.CallbackFirstTime, opts);
	}
	return result;
}

function commSubmitFormThreeTimesEventProcessSearch(form, callback, opts, eventName, successFlag, xmlResult, isCancel) {
	var popupObj;
			
	//alert("eventName:" + eventName + " successFlag:" + successFlag);
	if("EventFirstTimeBegin" == eventName) {
//======modified by luobingwu 2011.04.07=====
     //popupObj = new actionPopTransparent();
     popupObj=new actionPop(gettext("DVR-99-01-waiter"),0,"","");
//=============================================
		
		opts.CurrentPopupHandler = popupObj;
		opts.CurrentPopupHandler.show();
	} else if("EventFirstTimeEnd" == eventName) {
		if(2 == successFlag) {
			//no privilege
			isCancel.value = true;

			popupObj = new actionPop(gettext("DVR-01-01-05-01"),1,gettext("button.back"));
			opts.CurrentPopupHandler = popupObj;
			opts.CurrentPopupHandler.show();
		} else if(0 == successFlag) {
			//success
			popupObj = new actionPop(gettext("DVR-01-01-07-01"),0);
			opts.CurrentPopupHandler = popupObj;
			opts.CurrentPopupHandler.show();
		}
	} else if("EventThirdTimeEnd" == eventName) {
		if(2 == successFlag) {
			//not found
			isCancel.value = true;

			popupObj = new actionPop(gettext("DVR-01-01-06-01"),1,gettext("button.back"));
			opts.CurrentPopupHandler = popupObj;
			opts.CurrentPopupHandler.show();
		} else if(0 == successFlag) {
			//success
			opts.CurrentPopupHandler.hide();
		}
	}
}

/**
* common callback function for exception handling after form submitted
* for Search
*
**/
function commonSubmitErrorSearch(req, opts) 
{
	if(opts.CurrentPopupHandler) {
		opts.CurrentPopupHandler.hide();
	}
	commonSubmitError(req);
}

/**
* common function for form submit three times
* to process a long time search
*
* First Call: launch a job to process long time task, such as search or download 
* Second Call: query the progress of the job, running or finished 
* Third Call: retrieve the result of the job 
*
* cgi names
*
* first time:  call opts.CGIFirstTime (default = form.action)
* second time: call opts.CGISecondTime
* third time:  call opts.CGIThirdTime
*
* event names
*
* first time call: EventFirstTimeBegin(successFlag, xmlResult, isCancel)
* first time call end: EventFirstTimeEnd(successFlag, xmlResult, isCancel)
* second time call: EventSecondTimeBegin(successFlag, xmlResult, isCancel)
* second time call end: EventSecondTimeEnd(successFlag, xmlResult, isCancel)
* third time call: EventThirdTimeBegin(successFlag, xmlResult, isCancel)
* third time call end: EventThirdTimeEnd(successFlag, xmlResult, isCancel)
*
* callback names
*
* first time callback: CallbackFirstTime(form, callback, opts, eventName, req) 
* second time callback: CallbackSecondTime(form, callback, opts, eventName, req) 
* third time callback: CallbackThirdTime(form, callback, opts, eventName, req) 
*
* other options
*
* second time call delay: SecondTimeCallDelay (default = 1s)
*
* runtime variable
* 
* current popup handler : CurrentPopupHandler
**/
function submitFormThreeTimesSearch(form, callback, opts) {
	var result = null;

	if (!opts) opts = {};

	if (!opts.EventFirstTimeBegin) opts.EventFirstTimeBegin = function(successFlag, xmlResult, isCancel) {commSubmitFormThreeTimesEventProcessSearch(form, callback, opts, "EventFirstTimeBegin", successFlag, xmlResult, isCancel);};
	if (!opts.EventFirstTimeEnd) opts.EventFirstTimeEnd = function(successFlag, xmlResult, isCancel) {commSubmitFormThreeTimesEventProcessSearch(form, callback, opts, "EventFirstTimeEnd", successFlag, xmlResult, isCancel);};
	if (!opts.EventSecondTimeBegin) opts.EventSecondTimeBegin = function(successFlag, xmlResult, isCancel) {commSubmitFormThreeTimesEventProcessSearch(form, callback, opts, "EventSecondTimeBegin", successFlag, xmlResult, isCancel);};
	if (!opts.EventSecondTimeEnd) opts.EventSecondTimeEnd = function(successFlag, xmlResult, isCancel) {commSubmitFormThreeTimesEventProcessSearch(form, callback, opts, "EventSecondTimeEnd", successFlag, xmlResult, isCancel);};
	if (!opts.EventThirdTimeBegin) opts.EventThirdTimeBegin = function(successFlag, xmlResult, isCancel) {commSubmitFormThreeTimesEventProcessSearch(form, callback, opts, "EventThirdTimeBegin", successFlag, xmlResult, isCancel);};
	if (!opts.EventThirdTimeEnd) opts.EventThirdTimeEnd = function(successFlag, xmlResult, isCancel) {commSubmitFormThreeTimesEventProcessSearch(form, callback, opts, "EventThirdTimeEnd", successFlag, xmlResult, isCancel);};
	
	if(!opts.errorCallback) opts.errorCallback = function(req) {commonSubmitErrorSearch(req, opts);};

	result = submitFormThreeTimes(form, callback, opts);
	return result;
}




function commSubmitFormThreeTimesEventProcessMediaCheck(form, callback, opts, eventName, successFlag, xmlResult, isCancel) {
	var popupObj;
			
	//alert("eventName:" + eventName + " successFlag:" + successFlag);
	if("EventFirstTimeBegin" == eventName) {
//======modified by luobingwu 2011.04.07=====
     //popupObj = new actionPopTransparent();
     popupObj=new actionPop(gettext("DVR-01-01-07-01"),0,"","");
//=============================================
		
		opts.CurrentPopupHandler = popupObj;
		opts.CurrentPopupHandler.show();
	} else if("EventFirstTimeEnd" == eventName) {
		if(2 == successFlag) {
			//no privilege
			isCancel.value = true;

			popupObj = new actionPop(gettext("DVR-01-06-02-02"),1,gettext("button.back"));
			opts.CurrentPopupHandler = popupObj;
			opts.CurrentPopupHandler.show();
		} else if(0 == successFlag) {
			//success
			popupObj = new actionPop(gettext("DVR-01-06-01-01"),0);
			opts.CurrentPopupHandler = popupObj;
			opts.CurrentPopupHandler.show();
		}
	} else if("EventThirdTimeEnd" == eventName) {
		if(2 == successFlag) {
			//not found
			isCancel.value = true;

			popupObj = new actionPop(gettext("DVR-01-06-02-01"),1,gettext("button.back"));
			opts.CurrentPopupHandler = popupObj;
			opts.CurrentPopupHandler.show();
		} else if(0 == successFlag) {
			//success
			opts.CurrentPopupHandler.hide();
		}
	}
}



/**
* common callback function for exception handling after form submitted
* for MediaCheck
*
**/
function commonSubmitErrorMediaCheck(req, opts) 
{
	if(opts.CurrentPopupHandler) {
		opts.CurrentPopupHandler.hide();
	}
	commonSubmitError(req);
}

/**
* common function for form submit three times
* to process a long time MediaCheck
*
* First Call: launch a job to process long time task, such as MediaCheck or download 
* Second Call: query the progress of the job, running or finished 
* Third Call: retrieve the result of the job 
*
* cgi names
*
* first time:  call opts.CGIFirstTime (default = form.action)
* second time: call opts.CGISecondTime
* third time:  call opts.CGIThirdTime
*
* event names
*
* first time call: EventFirstTimeBegin(successFlag, xmlResult, isCancel)
* first time call end: EventFirstTimeEnd(successFlag, xmlResult, isCancel)
* second time call: EventSecondTimeBegin(successFlag, xmlResult, isCancel)
* second time call end: EventSecondTimeEnd(successFlag, xmlResult, isCancel)
* third time call: EventThirdTimeBegin(successFlag, xmlResult, isCancel)
* third time call end: EventThirdTimeEnd(successFlag, xmlResult, isCancel)
*
* callback names
*
* first time callback: CallbackFirstTime(form, callback, opts, eventName, req) 
* second time callback: CallbackSecondTime(form, callback, opts, eventName, req) 
* third time callback: CallbackThirdTime(form, callback, opts, eventName, req) 
*
* other options
*
* second time call delay: SecondTimeCallDelay (default = 1s)
*
* runtime variable
* 
* current popup handler : CurrentPopupHandler
**/
function submitFormThreeTimesMediaCheck(form, callback, opts) {
	var result = null;

	if (!opts) opts = {};

	if (!opts.EventFirstTimeBegin) opts.EventFirstTimeBegin = function(successFlag, xmlResult, isCancel) {commSubmitFormThreeTimesEventProcessMediaCheck(form, callback, opts, "EventFirstTimeBegin", successFlag, xmlResult, isCancel);};
	if (!opts.EventFirstTimeEnd) opts.EventFirstTimeEnd = function(successFlag, xmlResult, isCancel) {commSubmitFormThreeTimesEventProcessMediaCheck(form, callback, opts, "EventFirstTimeEnd", successFlag, xmlResult, isCancel);};
	if (!opts.EventSecondTimeBegin) opts.EventSecondTimeBegin = function(successFlag, xmlResult, isCancel) {commSubmitFormThreeTimesEventProcessMediaCheck(form, callback, opts, "EventSecondTimeBegin", successFlag, xmlResult, isCancel);};
	if (!opts.EventSecondTimeEnd) opts.EventSecondTimeEnd = function(successFlag, xmlResult, isCancel) {commSubmitFormThreeTimesEventProcessMediaCheck(form, callback, opts, "EventSecondTimeEnd", successFlag, xmlResult, isCancel);};
	if (!opts.EventThirdTimeBegin) opts.EventThirdTimeBegin = function(successFlag, xmlResult, isCancel) {commSubmitFormThreeTimesEventProcessMediaCheck(form, callback, opts, "EventThirdTimeBegin", successFlag, xmlResult, isCancel);};
	if (!opts.EventThirdTimeEnd) opts.EventThirdTimeEnd = function(successFlag, xmlResult, isCancel) {commSubmitFormThreeTimesEventProcessMediaCheck(form, callback, opts, "EventThirdTimeEnd", successFlag, xmlResult, isCancel);};
	
	if(!opts.errorCallback) opts.errorCallback = function(req) {commonSubmitErrorMediaCheck(req, opts);};

	result = submitFormThreeTimes(form, callback, opts);
	return result;
}





/*-------the function-group for checking of IP-address	added by Freya 2010.12.10 start-------*/
function AddIPCheckEvents(obj)
{
	var eventOKU = obj.onkeyup ;
	var eventOKD = obj.onkeydown ;
	var eventOB = obj.onblur ;
	var eventOF = obj.onfocus ;
	var eventMO = obj.onmouseup ;
//	obj.onkeyup = function(){eventOKU;return DVR99CheckIPFmt(obj);} ; //commented by hdu @ 20110506
//	obj.onkeydown = function(){eventOKD;return DVR99keyDIPCheck(obj);} ;
//	obj.onblur = function(){eventOB;DVR99supAddress(obj);} ;
//	obj.onfocus = function(){eventOF;DVR99focusAllSelect(obj);} ;
	
	//added by hdu @ 20110506
	//for IE
	try{
		//obj.attachEvent("onkeydown", function(){DVR99keyDIPCheck(event.srcElement);} );
		//obj.attachEvent("onkeyup", function(){DVR99CheckIPFmt(event.srcElement);} );	
		obj.attachEvent("onblur", function(){DVR99IPaddress(obj);} );			
		//全選択は仕様変更によりなくなり、先頭文字列のフォーカスに変更
		//obj.attachEvent("onfocus", function(){DVR99focusAllSelect(event.srcElement);} );		
//		obj.attachEvent("onmouseup", function(){MultiSelDisabler(event.srcElement)} );			
	}catch(e){
		//alert(e);	
	};	
	//for NonIE
	try{

		//obj.addEventListener('keydown',function(){DVR99keyDIPCheck(event.srcElement);});
		//obj.addEventListener('keyup',function(){DVR99CheckIPFmt(event.srcElement);});	
		//obj.addEventListener('blur',function(){DVR99supAddress(event.srcElement);});
		obj.addEventListener('blur',function(){DVR99IPaddress(obj);});
		//全選択は仕様変更によりなくなり、先頭文字列のフォーカスに変更
		//obj.addEventListener('focus',function(){DVR99focusAllSelect(event.srcElement);});	
//		obj.addEventListener('mouseup', function(){MultiSelDisabler(event.srcElement)} );	
	}catch(e){
		//alert(e);	
	};	
}

//added by hdu @ 20110506
function MultiSelDisabler(obj){
	if(obj.selectionStart!=obj.selectionEnd){
		goToRangePos(obj,obj.value.length+1);
	}
}

//when keyUp,check the IP's format:10.11.10 added by Freya
function DVR99CheckIPFmt(IPObj)		
{
	
//	//alert(inputSavedBef);
//	var curPos = getSelectionStart(IPObj);
//	//number keys 
//	if((event.keyCode > 47)&&(event.keyCode < 58)){
//		//alert(IPObj.value.length);
//		if(IPObj.value.length>15){
//			IPObj.value = inputSavedBef;
//		}else{
//			var end=false;
//			var ipparts = IPObj.value.split('.')
//			for(p in ipparts){
//				if(ipparts[p].length>3)	{
//					IPObj.value = inputSavedBef;
//					goToRangePos(IPObj,curPos)
//					end=true;
//					break;			
//				}else if(Number(ipparts[p])>255){
//					IPObj.value = inputSavedBef;
//					goToRangePos(IPObj,curPos)					
//					end=true;					
//					break;				
//				}else{
//					//ipparts[p]=Number(ipparts[p]);
//				}
//			}
//			//if(!end)IPObj.value = ipparts.join('.');			
//		}		
//	}
//	//backspace key
//	else if((event.keyCode==8)){
//		//alert(inputSavedBef.substring(curPos,curPos+1))
//		if(inputSavedBef.substring(curPos,curPos+1)=='.'){
//			IPObj.value = inputSavedBef;
//			goToRangePos(IPObj,curPos+1)	
//		}
//	}
//	//deleted key	
//	else if((event.keyCode==46)){
//		//alert(inputSavedBef.substring(curPos,curPos+1))
//		if(inputSavedBef.substring(curPos,curPos+1)=='.'){
//			IPObj.value = inputSavedBef;
//			goToRangePos(IPObj,curPos+2)				
//		}		
//	}	
//	//"." key
//	else if((event.keyCode==190)){
//		IPObj.value = inputSavedBef;
//		goToRangePos(IPObj,curPos+2)	
//	}
//	else if((event.keyCode!=9)&&(event.keyCode<37||event.keyCode>40)){	//not in tab or up,down,left,right
//		var pos = getSelectionStart(IPObj);
//		IPObj.value = inputSavedBef;
//	}
//	
//	ipProcToken = false;	
	
	var moveCont = 0 ;
	var dotLastLoc ;
	var addStr ;
	var subStr ;
	var str ;
	var IPvalue = IPObj.value ;
		
	dotLastLoc = IPvalue.lastIndexOf(".") ;		//get the location of last "."
	if(dotLastLoc==-1){
		moveCont = 0 ;
	}
	else{
		moveCont = dotLastLoc + 1 ;
	}
			
	var kc = event.keyCode;
	//number keys 
	if((kc > 47&&kc < 58)||(kc > 95 && kc < 106)){
		/*----avoid "xxx.xxxx" after deleting;  xxx.xxxx  xxx.xxx.x----*/
		if(((IPvalue.length-moveCont)>3)&&(IPvalue.length<15)){
			var befSubStr = IPvalue.substring(0,(moveCont+3)) ; 
			var endSubStr = IPvalue.substring((moveCont+3),IPvalue.length) ;
			befSubStr += "." ;
			IPObj.value = befSubStr + endSubStr ;
		}
		/*-------------auto to add "." after three numbers-------------*/
		if(((IPvalue.length-moveCont)==3)&&(IPvalue.length<15)){
			if(IPvalue.length<15){			//there is no "." at last
				IPObj.value = IPvalue + "." ;
			}
		}
	}
	//deleted key
	else if((kc==8)||(kc==46)){
		if((IPvalue.length-moveCont)==0){	//auto to delete "."
			IPObj.value = IPvalue.substring(0,(IPvalue.length-1)) ;
		}		
		return true ;
	}

	//"." key
	else if((kc==190||kc==110)&&(IPvalue.length<=15)){
		dotLastLoc = IPvalue.lastIndexOf(".") ;						//if 111.22.    dotLastLoc = 6
		if((IPvalue.length==15)&&(dotLastLoc==11)){				//dot respond of the addition that xxx.xxx.xxx.xxx + "." 
			return false ;
		}
		
		subStr = IPvalue.substring(0,dotLastLoc) ;					//if 111.22.    subStr = 111.22
		dotLastLoc = subStr.lastIndexOf(".") ;						//111.22  dotLastLoc = 3
		if(dotLastLoc==-1){		//no "." exist
			moveCont = 0 ;
		}
		else{
			moveCont = dotLastLoc + 1 ;
		}
		
		var iLen = IPvalue.length - moveCont - 1 ;					//the count of numbers between last two "."
		subStr = IPvalue.substring(moveCont,(IPvalue.length-1)) ;  //if 111.22.   subStr = 22
		addStr = IPvalue.substring(0,moveCont) ;					//if 111.22.   addStr = 111.
		if(iLen==2){						//have writen 2 numbers
			str = addStr + "0" + subStr ;
		}
		else if(iLen==1){					//have writen 1 numbers before pressing "." key
			str = addStr + "00" + subStr ;
		}
		else if(iLen==3){
			str = addStr + subStr ;
		}
		else{								//no content before pressing "." key
			str = addStr + "000" + subStr ;
		}
		if(dotLastLoc==11){					//there have been three "." existed,avoid last bit is "."
			IPObj.value = str ;	
		}
		else{
			IPObj.value = str + "." ;		//rewrite the content to the input-text
		}
	}
	else{	//other keys are invalid
		return false ;	
	}
}

//when keyDown,check the format of IP address : 10.11.10 added by Freya
function DVR99keyDIPCheck(IPObj)
{
	
//	if(ipProcToken){
//		stopDefaultling(event);
//		stopBubbling(event);		
//		return false;	
//	}else{
//		ipProcToken = true;
//	}
//	if((event.keyCode!=9)&&(event.keyCode<37||event.keyCode>40)){	//not in tab or up,down,left,right
//		inputSavedBef = IPObj.value;	
//	}

	var subStrCont = 0 ;
	var moveCont = 0 ;		//the count of need to change
	var dotLastLoc ;
	var IPvalue = IPObj.value ;
	var IPvalueTemp = "" ;

	var kc = event.keyCode;
		
	if(((kc>47)&&(kc<58))||(kc==8)||(kc==46)||(kc==190)||(kc==37)||(kc==39)||(kc==9)
		||(kc>95&&kc<106)||(kc ==110)){
		//number keys or "." key
		if(((kc>47)&&(kc<58))||(kc==190)||(kc>95&&kc<106)||(kc==110)){
			
			dotLastLoc = IPvalue.lastIndexOf(".") ;
			if(dotLastLoc==-1){		//no "." is exist
				moveCont = 0 ;
			}
			else{
				moveCont = dotLastLoc + 1 ;
			}
			
			var focusText = GetSelectedText() ;
			var AreaText = document.getElementById(IPObj.id).value ;
			var index = AreaText.indexOf(focusText) ;
	
			//when the focus is at the middle of the text,will delete the content after the focus
			if(focusText.length==0){
				setCaretPosition(IPObj.value.length) ;
			}
				
			/*-----if the datas of focus selected in the middle of the text-----*/
			if((focusText.length!=0)&&(index!=-1)){
				var focusLen = focusText.length ;
				var focusLastChar = focusText.substring((focusLen-1),focusLen) ;
				var indexFL = AreaText.indexOf(focusLastChar) ;					
				if(indexFL!=14){
					setCaretPosition(IPObj.value.length) ;
				}
			}
			/*---------------------added by Freya 10.12.13----------------------*/

			/*check whether the number is between 0--255,if the number will be bigger than 255,the key is invalid*/ 	
			var DNumber ;
			switch(kc){
				case 48:
					DNumber = 0 ;
					break ;
				case 49:
					DNumber = 1 ;
					break ;
				case 50:
					DNumber = 2 ;
					break ;
				case 51:
					DNumber = 3 ;
					break ;
				case 52:
					DNumber = 4 ;
					break ;
				case 53:
					DNumber = 5 ;
					break ;
				case 54:
					DNumber = 6 ;
					break ;
				case 55:
					DNumber = 7 ;
					break ;
				case 56:
					DNumber = 8 ;
					break ;
				case 57:
					DNumber = 9 ;
					break ;
				case 96:
					DNumber = 0 ;
					break ;
				case 97:
					DNumber = 1 ;
					break ;
				case 98:
					DNumber = 2 ;
					break ;
				case 99:
					DNumber = 3 ;
					break ;
				case 100:
					DNumber = 4 ;
					break ;
				case 101:
					DNumber = 5 ;
					break ;
				case 102:
					DNumber = 6 ;
					break ;
				case 103:
					DNumber = 7 ;
					break ;
				case 104:
					DNumber = 8 ;
					break ;
				case 105:
					DNumber = 9 ;
					break ;
				default:
					break ;
			}
				
			if(kc!=190&&kc!=110){
				IPvalueTemp = IPObj.value + DNumber ;	//get the value after keydowning
				var subStr = IPvalueTemp.substring(moveCont,IPvalueTemp.length) ;	//if 111.232.23  subStr=23
				if(subStr.length==3){
					if((Number(subStr)<0)||(Number(subStr)>255)){
						return false ;
					}
				}
				if((subStr.length==4)&&(dotLastLoc!=11)){	//keydown:120.2345  keyup  120.234.5
					return true ;
				}
				}
				else{
					return true ;	
			}		
			/*----------------------------------------------------------------------------------------------------*/
			
			/*--------------judge whether to response the key when the address is integrated-------------*/			
			//if there have been 3 "." exist or there have been 3 number exist,keydown is invalid
			if(((kc!=190&&kc!=110)&&((IPObj.value.length-moveCont)>=3))||((kc==190||kc==110)&&(dotLastLoc==11)&&((IPObj.value.length-moveCont)>=3))){
				if((index!=-1)&&(focusText.length!=0)){	//if there is content selected in the input-text				
					return true ;
				}
				else{				//if there isn't content selected in the input-text
					return false ;
				}
			}
			else{	//if the IP's address isn't writen completly
				return true ;
			}
			/*-------------------------------------------------------------------------------------------*/
		}
		else{  		//delete-key left-key right-key are valid
			return true ;
		}
	}
	else{			//other keys are invalid
		return false ;
	}
}

//get the focus's area in the input-text
function GetSelectedText() 
{
	var selText = "";
	if (window.getSelection) {        // Firefox, Opera, Google Chrome, Safari
		if (document.activeElement && 
				(document.activeElement.tagName.toLowerCase () == "textarea" || 
				 document.activeElement.tagName.toLowerCase () == "input")) 
		{
			var text = document.activeElement.value;
			selText = text.substring (document.activeElement.selectionStart, 
									  document.activeElement.selectionEnd);
		}
		else {
			var selRange = window.getSelection ();
			selText = selRange.toString ();
		}
	} 
	else {
		if (document.selection.createRange) {        // Internet Explorer
			var range = document.selection.createRange ();
			selText = range.text;
		}
	}
	return selText;
}

function setCaretPosition(pos)
{
	var range = "" ;
	if (window.getSelection) {        // Firefox, Opera, Google Chrome, Safari
		if (document.activeElement && 
				(document.activeElement.tagName.toLowerCase () == "textarea" || 
				 document.activeElement.tagName.toLowerCase () == "input")) 
		{
			var text = document.activeElement.value;
			document.activeElement.selectionEnd	= pos ;	//expand the selected area to the end of the IP Adress
			var range = text.substring (document.activeElement.selectionStart, 
									  document.activeElement.selectionEnd);
		}
		else {
			var range = window.getSelection ();
			range.moveEnd('character', pos) ;
			range.select() ;
		}
	} 
	else {
		if (document.selection.createRange) {    // Internet Explorer
			range = document.selection.createRange ();
			range.moveEnd('character', pos) ;
			range.select() ;
		}
	}
}

//check whether there are invalid IP address
function DVR99IPaddress(obj)
{
	var IPhead ;
	var IPheadNum ;
	var IPend ;
	var IPendNum ;
	var IPvalue ;
	var res = DVR99supAddress(obj) ; //call the supplement function 
	
	IPvalue = obj.value ;	
	if((IPvalue=="")||(IPvalue=="---.---.---.---")||(IPvalue==ipAddBlank)){
		var PopObj = new actionPop(gettext("DVR-02-10-03-03"),1,gettext("button.back"),"") ;
		PopObj.show() ;		
	}
	else{
		IPhead = IPvalue.substring(0,3) ;
		IPheadNum = Number(IPhead) ;
		IPend = IPvalue.substring(12,15) ;
		IPendNum = Number(IPend) ;
		if((IPhead=="000")||(IPhead=="127")||((IPheadNum>=224)&&(IPheadNum<=239))||((IPheadNum>=240)&&(IPheadNum<=254))||(IPhead=="255")||(IPend=="000")||(IPend=="255")){
		
		//	alert("                        ?: 000.***.***.***; 127.***.***.***; 224.***.***.***  239.***.***.***; 240.***.***.***  254.***.***.***; 255.***.***.***;***.***.***.000; ***.***.***.255") ;
			var objPop = new actionPop(gettext("DVR-02-10-03-12"),1,gettext("button.back"),"") ;
			objPop.show() ;
		
			var FunTemp = function(){DVR99ChangeFocus(obj);} ; 
			setTimeout(FunTemp,1) ;
			res = 0 ;
		}
	}
	
	return res ;
}

//supplement the IP address if the address isn't integrated when the focus is removed
function DVR99supAddress(obj)
{
	var strTemp ;
	var dotLastLoc ;
	var befSubStr ;
	var endSubStr ;
	var dotFlag ;
	var IPvalueTemp ;
	var subStrLenArr = new Array() ;
	var dotContArr = new Array() ;
	
	if((obj.value=="")||(obj.value=="---.---.---.---")||(obj.value==ipAddBlank)){
		return 0 ;
	}
	
	/*----supplement the content if there are some datas in the middle of the text aren't integrated---*/
	if(obj.value.length!=15){		
		var dotCont = -1 ;
		var subDotStr = obj.value ;
		var subChar="" ;
		var subStrLen = 3 ;
		var iCount = 0 ;
		while(1){
			var indexDot = subDotStr.indexOf(".") ;
			if(indexDot!=-1){
				subChar = subDotStr.substring(0,indexDot) ;
				if(subChar.length!=3){	//if the count of the numbers between two "." isn't enought 3
					subStrLenArr[iCount] = subChar.length ; //record the incomplement string's length
					dotContArr[iCount] = dotCont ;	//record the dot's location in front of the incomplement string
					iCount++ ;
				}				
				subDotStr = subDotStr.substring((indexDot+1),subDotStr.length) ;//left the string after the dot in front of the incomplement string
				dotCont += 4 ;	//change the location of the dot (example:111.22.1.123  subDotStr=22.1.123  dotCont=3) 
				continue ;
			}
			else{
				break ;
			}
		}
		
		if(subStrLenArr.length!=0){  //supplement the string in input-text with the records
			for(var i=0;i<subStrLenArr.length;i++){
				subStrLen = subStrLenArr[i] ;
				dotCont = dotContArr[i] ;
				befSubStr = obj.value.substring(0,(dotCont+1)) ;
				endSubStr = obj.value.substring((dotCont+subStrLen+1),obj.value.length) ;
				unintegSubStr = obj.value.substring((dotCont+1),(dotCont+1+subStrLen)) ;
				DVR99supPro(obj,befSubStr,unintegSubStr,endSubStr,"") ;								
			}
		}
	}
	/*-------------------------------------------------------------------------------------------------*/
	
	/*--supplement the content if there are some datas at the end of the input-text aren't integrated--*/
	if(obj.value.length!=15){
		IPvalueTemp = obj.value ;
		dotLastLoc = IPvalueTemp.lastIndexOf(".") ;
		//get the count of ".000" will be added after the unintegrated IP address
		switch(dotLastLoc){
			case -1:
				dotFlag = 3 ;
				break ;
			case 3:
				dotFlag = 2 ;
				break ;
			case 7:
				dotFlag = 1 ;
				break ;
			case 11:
				dotFlag = 0 ;
				break ;
			default:
				break ; 
		}				
		befSubStr = IPvalueTemp.substring(0,(dotLastLoc+1)) ;//the content in front of the last "." and the "."
		unintegSubStr = IPvalueTemp.substring((dotLastLoc+1),IPvalueTemp.length) ;	//the content after the last "."
		DVR99supPro(obj,befSubStr,unintegSubStr,"",dotFlag) ;
	}
	/*-------------------------------------------------------------------------------------------------*/
}

//the process for supplementing the IP address
function DVR99supPro(obj,befSubStr,strUninteg,endSubStr,dotFlag)
{
	//supplement the content after the last "." which isn't enought 3 numbers	
	if(strUninteg.length==0){
		strTemp = befSubStr + "000" + endSubStr ;
	}
	if(strUninteg.length==1){
		strTemp = befSubStr + "00" + strUninteg + endSubStr ;
	}
	if(strUninteg.length==2){
		strTemp = befSubStr + "0" + strUninteg + endSubStr ;
	}
	if(strUninteg.length==3){
		strTemp = befSubStr + strUninteg + endSubStr ;
	}
	
	if(endSubStr.length==0){	
		//add the ".000" after unintegrated IP address
		for(var i=1;i<=dotFlag;i++){
			strTemp += ".000" ;	
		}
	}
	obj.value = strTemp ;
}

//the function for change the focus to the current input-text
function DVR99ChangeFocus(curObj)
{
	curObj.focus() ;
	last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
	curObj.select() ;
}

//change to all selected when there is "---.---.---.---" in the input-text
function DVR99focusAllSelect(focusObj)
{
	if(focusObj.value=="---.---.---.---"||focusObj.value==ipAddBlank){
		focusObj.select() ;
	}
}

/*-----------------------------------added by Freya 2010.12.10 end--------------------------------*/

/* added by H.Du 2011.03.08 || START */

//recommanded reserveParametersString format: p1_p2_p3 ...
function goReplay(reserveParametersString){
	//sameScreenWithPara("DVR-05-07-00/DVR-05-07-00.html",reserveParametersString);
	sameServer("DVR-05-07-00/DVR-05-07-00.html");   //david chang 2011.06.07
}

function sameScreenWithPara(toUrl,reserveParameters){
	var toUrlNew;
	var fromInfo = getFromIpUrl(toUrl);
    if(toUrl.indexOf("?")==-1){
		toUrlNew="http://"+window.location.host+"/"+toUrl+"?";
	}else{
		toUrlNew="http://"+window.location.host+"/"+toUrl+"&";
	}
	if(fromInfo.fromParamStr!=null&&fromInfo.fromParamStr.length>0){
		if(fromInfo.fromParamStr.substring(fromInfo.fromParamStr.length-1)=='&'){
			fromInfo.fromParamStr = fromInfo.fromParamStr.substring(0,fromInfo.fromParamStr.length-1);
		}
	}
	WindowLocationFromDispWebView( toUrlNew+fromInfo.fromParamStr+"&reserveParameters="+reserveParameters );
}

/* added by H.Du 2011.03.08 || END */

/* added by hdu @ 20110411 start */
var lockMode = false;
/* commented by hdu @ 20110413 start */
//function emuTab(handleTab){
//	
//	var keyCode = event.keyCode;
//
//	if (tabIdSequence && tabIdSequence.length>0){
//		
//		//mode switching
//		if(event.keyCode==13
//		   	||(document.activeElement.tagName=='SELECT' && event.keyCode==27 && lockMode)){//enter or esc on 'select'
//			if(!lockMode){
//				lockMode=true;
//			}else{
//				lockMode=false;
//				if(document.activeElement.tagName=='SELECT') return;
//			}		
//		}	
//		
//		if(event.keyCode==9){//tab
//			stopDefaultling(event);				
//			//emulate Tab reaction using up down
//			if(handleTab && !lockMode){		
//				if(event.shiftKey )	{//shfit
//					keyCode=38; //working as up
//				}else{
//					keyCode=40; //working as down
//				}
//			}
//		}
//		if((keyCode==38 || keyCode==37) && !lockMode){//up & left
//			//alert(document.activeElement.tagName+' '+document.activeElement.type);
//			if((document.activeElement.tagName=='INPUT' || document.activeElement.tagName=='SELECT' || document.activeElement.tabindex!=-1) && document.activeElement.id!=undefined){
//				if(document.activeElement.tagName=='SELECT'){
//					stopDefaultling(event);							
//				}
//				var keepLooking = false;				
//				for(i=tabIdSequence.length-1,j=0;i>=0;i--){
//					if(document.activeElement.id==tabIdSequence[i]||keepLooking)	{
//						if((i-1)>=0){
//							var preElm = document.getElementById(tabIdSequence[i-1]);
//							if(preElm !=null && tabIdSequence[i-1]!=undefined) {
//								if(preElm.disabled||!ElementIsVisible(preElm)){
//									if(!keepLooking){
//										keepLooking=true;	
//									}
//									if(j==tabIdSequence.length-1){
//										break;
//									}else{
//										j+=1;
//									}								
//									continue;
//								}else{
//									preElm.focus();	
//									break;									
//								}
//							}
//						}
//						if((i-1)<0){
//							var lastElm = document.getElementById(tabIdSequence[tabIdSequence.length-1]);
//							if(lastElm !=null && lastElm!=undefined){
//								if(lastElm.disabled||!ElementIsVisible(lastElm)){
//									if(!keepLooking){
//										keepLooking=true;	
//									}
//									if(j==tabIdSequence.length-1){
//										break;
//									}else{
//										j+=1;
//									}								
//									continue;
//								}else{
//									lastElm.focus();
//									break;
//								}
//							}
//						}
//					}
//				}				
//			}			
//		}
//		if((keyCode==40 || keyCode==39) && !lockMode){//down & right
//			if(document.activeElement.tagName=='BODY'){
//				var firstElm = document.getElementById(tabIdSequence[0]);
//				if(firstElm !=null && firstElm!=undefined){
//					firstElm.focus();	
//				}				
//			}else if((document.activeElement.tagName=='INPUT' || document.activeElement.tagName=='SELECT' || document.activeElement.tabindex!=-1) && document.activeElement.id!=undefined){
//				if(document.activeElement.tagName=='SELECT'){
//					stopDefaultling(event);							
//				}
//				var keepLooking = false;
//				for(i=0,j=0;i<tabIdSequence.length;i++){
//					if(document.activeElement.id==tabIdSequence[i]||keepLooking)	{
//						if((i+1)<tabIdSequence.length){
//							var nextElm = document.getElementById(tabIdSequence[i+1]);
//							if(nextElm !=null && tabIdSequence[i+1]!=undefined) {
//								if(nextElm.disabled||!ElementIsVisible(nextElm)){
//									if(!keepLooking){
//										keepLooking=true;	
//									}
//									if(j==tabIdSequence.length-1){
//										break;
//									}else{
//										j+=1;
//									}								
//									continue;
//								}else{
//									nextElm.focus();	
//									break;
//								}								
//
//							}
//						}
//						if((i+1)>=tabIdSequence.length){
//							var firstElm = document.getElementById(tabIdSequence[0]);
//							if(firstElm !=null && firstElm!=undefined){
//								if(firstElm.disabled||!ElementIsVisible(firstElm)){
//									if(!keepLooking){
//										keepLooking=true;	
//									}
//									if(j==tabIdSequence.length-1){
//										break;
//									}else{
//										j+=1;
//									}								
//									continue;
//								}else{								
//									firstElm.focus();
//									break;
//								}								
//							}
//						}
//					}
//				}				
//			}
//		}		
//	}
//	
//	keyToMouse();
//	
//}
/* commented by hdu @ 20110413 end */
/* added by hdu @ 20110411 end */

/* added by hdu @ 20110412 start */
 function ElementIsVisible(elm)
    {
        if (typeof(elm.style) != "undefined" &&
                (
                    ( typeof(elm.style.display) != "undefined" 
                      && elm.style.display == "none" )
                    ||
                    ( typeof(elm.style.visibility) != "undefined"
                      && elm.style.visibility == "hidden" )
                )
            )
        {
            return false;
        }
        else if (typeof(elm.parentNode) != "undefined" 
                  && elm.parentNode != null 
                  && elm.parentNode != elm)
        {
            return ElementIsVisible(elm.parentNode);
        }
        return true;
    } 
/* added by hdu @ 20110412 end */

/* added by hdu @ 20110413 start */
function emuTab(handleTab){
	
	//iDebug('emuTab received keycode :'+event.keyCode);

	//revive_focus()でフォーカスの復活処理がされた時はこの関数のフォーカス移動処理は実行しない
	if(revive_flag == "OK")
	{
		return;
	}

	try{
		
		var keyCode = event.keyCode;
		
		if(keyCode==13 && document.activeElement.tagName=='INPUT' && document.activeElement.type=='checkbox' && canBeFocused(document.activeElement.id)){
			if(document.activeElement.checked){
				document.activeElement.checked = false;
				
			}else{
				document.activeElement.checked = true;
			}
			stopDefaultling(event);			
			stopBubbling(event);
		}
	
		if (tabIdSequence && tabIdSequence.length>0){
			
			//mode switching
/*20111201 Yabuta Del DISP対応によりプルダウン選択中の判定は不要になった
			if((document.activeElement.tagName=='SELECT' || isTextInput(document.activeElement))
				 &&(event.keyCode==13 || event.keyCode==27)){//ENTER or ESC on 'select','text'
				if(!lockMode){
					if (event.keyCode==13)	lockMode=true;//lock for ENTER when unlocked
				}else{
					//when locked
					lockMode=false;//unlock
					if(event.keyCode==27) return;//avoiding following ESC reaction
				}		
			}*/
				
			//----added by Freya start 11.09.27
/*20111201 Yabuta Del DISP対応によりプルダウン選択中の判定は不要になった
			if((keyCode==33 || keyCode==34) && (document.activeElement.tagName=="SELECT"))
			{
				if(!lockMode)
				{
					stopDefaultling(event);
					return;
				}
			}*/
			//----added by Freya start 11.09.27
			
			if(event.keyCode==9 && handleTab){//tab
				stopDefaultling(event);				
				//emulate Tab reaction using up down
				if(handleTab /*&& !lockMode*/){		
					if(event.shiftKey )	{//shfit
						//keyCode=38; //working as up
						keyCode=37; //working as left  modified by luo 20110706
						isTabKeyChange=true;//added by luo 20110706
					}else{
						//keyCode=40; //working as down
						keyCode=39; //working as up    modified by luo 20110706
						isTabKeyChange=true;//added by luo 20110706
					}
				}
			}
			if((keyCode==38) /*&& !lockMode*/){//up
			//if((keyCode==38 || keyCode==37) && !lockMode){//up & left //updated by hdu @ 20110419, for maze moving
				//alert(document.activeElement.tagName+' '+document.activeElement.type);
				if(document.activeElement.tagName=='BODY'){
					if(currentFocusElementId){
						var memOne  = document.getElementById(currentFocusElementId);
						if(memOne !=null && memOne!=undefined){
							memOne.focus();
							last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
						}							
					}	
				}else if((document.activeElement.tagName=='INPUT' || document.activeElement.tagName=='SELECT' || document.activeElement.tabindex!=-1) && document.activeElement.id!=undefined){
					//if(document.activeElement.tagName=='SELECT' || isTextInput(document.activeElement)){    //delete by luo 20110725
//						stopDefaultling(event);							
//					}
					stopDefaultling(event);//modified by luo 20110725	
					//document.getElementById('debugInfo').value = '';	Debug html textbox commented in DVR-02-18-17	
					//updated by hdu @ 20110419, for maze moving
					//var preObjId = restlessSeeker(tabIdSequence,sameIdAsActived,canBeFocused,false,tabIdSequence.length-1,0);
					var preObjId = exceptionalSeeker('up',true);	
					if(preObjId){
						//alert(preObjId);
						document.getElementById(preObjId[1]).focus();
						last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
						currentFocusElementId = preObjId[1];
					}else{	
						preObjId = restlessSeeker(tabIdSequence,sameIdAsActived,canBeFocused,false,tabIdSequence.length-1,0);
						if(preObjId && !isFocusCycling(preObjId,false,tabIdSequence)){
							//alert(preObjId);
							document.getElementById(preObjId).focus();
							last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
							currentFocusElementId = preObjId;
						}
					}
				}			
			}
			if((keyCode==40) /*&& !lockMode*/){//down 
			//if((keyCode==40 || keyCode==39) && !lockMode){//down & right //updated by hdu @ 20110419, for maze moving
				if(document.activeElement.tagName=='BODY'){
					if(currentFocusElementId){
						var memOne  = document.getElementById(currentFocusElementId);
						if(memOne !=null && memOne!=undefined){
							memOne.focus();
							last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
						}							
					}else{
						var firstElm = document.getElementById(tabIdSequence[0]);
						if(firstElm !=null && firstElm!=undefined){
							firstElm.focus();
							last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
						}							
					}			
				}else if((document.activeElement.tagName=='INPUT' || document.activeElement.tagName=='SELECT' || document.activeElement.tabindex!=-1) && document.activeElement.id!=undefined){
					if(document.activeElement.tagName=='SELECT' || isTextInput(document.activeElement)){
						stopDefaultling(event);							
					}
					//document.getElementById('debugInfo').value = ''; Debug html textbox commented in DVR-02-18-17
					//updated by hdu @ 20110419, for maze moving	
					//var nextObjId = restlessSeeker(tabIdSequence,sameIdAsActived,canBeFocused,true,0,0);
					var nextObjId = exceptionalSeeker('down',true);	
					if(nextObjId){
						//alert(nextObjId);
						document.getElementById(nextObjId[1]).focus();
						last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
						currentFocusElementId = nextObjId[1];
					}else{
						nextObjId =  restlessSeeker(tabIdSequence,sameIdAsActived,canBeFocused,true,0,0);
						if(nextObjId && !isFocusCycling(nextObjId,true,tabIdSequence)){
							//alert(nextObjId);
							document.getElementById(nextObjId).focus();
							last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
							currentFocusElementId = nextObjId;
						}
					}				
				}
			}	
			if((keyCode==37) /*&& !lockMode*/){//left
				if(document.activeElement.tagName=='BODY'){
					if(currentFocusElementId){
						var memOne  = document.getElementById(currentFocusElementId);
						if(memOne !=null && memOne!=undefined){
							memOne.focus();
							last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
						}							
					}	
				}else if((document.activeElement.tagName=='INPUT' || document.activeElement.tagName=='SELECT' || document.activeElement.tabindex!=-1) && document.activeElement.id!=undefined){
					if(document.activeElement.tagName=='SELECT' || isTextInput(document.activeElement)){
						stopDefaultling(event);							
					}	
					var goObjId = exceptionalSeeker('left',true);	
					if(goObjId){
						//alert(goObjId);
						document.getElementById(goObjId[1]).focus();
						last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
						currentFocusElementId = goObjId[1];
						
					}else{	//'left' working like 'up', if there is no maze moving found. added by hdu @ 20110422
					     
						 if(isTabKeyChange){//is tab keyCode changed into left keyCode?  added by luo 20110706
								goObjId = restlessSeeker(tabIdSequence,sameIdAsActived,canBeFocused,false,tabIdSequence.length-1,0);
								if(goObjId && !isFocusCycling(goObjId,false,tabIdSequence) ){
									//alert(goObjId);
									document.getElementById(goObjId).focus();
									last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
									currentFocusElementId = goObjId;
								}
								isTabKeyChange=false;//added by hdu @ 20110422
						 }
					}		
					
				}
			}
			if((keyCode==39) /*&& !lockMode*/){//right
				if(document.activeElement.tagName=='BODY'){
					if(currentFocusElementId){
						var memOne  = document.getElementById(currentFocusElementId);
						if(memOne !=null && memOne!=undefined){
							memOne.focus();
							last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
						}							
					}	
				}else if((document.activeElement.tagName=='INPUT' || document.activeElement.tagName=='SELECT' || document.activeElement.tabindex!=-1) && document.activeElement.id!=undefined){
					if(document.activeElement.tagName=='SELECT' || isTextInput(document.activeElement)){
						stopDefaultling(event);							
					}
					var goObjId = exceptionalSeeker('right',true);	
					if(goObjId){
						//alert(goObjId);
						document.getElementById(goObjId[1]).focus();
						last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
						currentFocusElementId = goObjId[1];
					}else{ //'right' working like 'down', if there is no maze moving found. added by hdu @ 20110422
					        if(isTabKeyChange){//is tab keyCode changed into left keyCode?   added by luo 20110706
								goObjId =  restlessSeeker(tabIdSequence,sameIdAsActived,canBeFocused,true,0,0);
								if(goObjId && !isFocusCycling(goObjId,true,tabIdSequence)){
									//alert(goObjId);
									document.getElementById(goObjId).focus();
									last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
									currentFocusElementId = goObjId;
								}
								isTabKeyChange=false; //added by hdu @ 20110422
							}
					}					
				}
			}		
		}
		
		keyToMouse();
		
	}catch(e){
		iDebug('!!! Exception occurred in emuTab : '+e);	
	}

}
/* added by hdu @ 20110413 end */

//added by hdu @ 20110530, cycling check for prevent cycling.
//id:target element id
//inSeq: by sequence or reverse
//definedAry: focus element predefined list
function isFocusCycling(id, inSeq, definedAry){
	if(inSeq){//by sequence
		var currentIndex = definedAry.indexOf(currentFocusElementId);
		if(currentIndex==definedAry.length-1)return true; //current is the last element, must be cycling.
		var followingElements = definedAry.slice(currentIndex+1); //get following elements.
		if(followingElements.indexOf(id)!=-1){
			return false;//if target element exists in the following elements, not cycling.
		}else{
			return true;//if target element dosen't exists in the following elements, must be cycling.
		}
	}else{//reverse sequence
		var currentIndex = definedAry.indexOf(currentFocusElementId);
		if(currentIndex==0)return true; //current is the first element, must be cycling.
		var beginningElements = definedAry.slice(0,currentIndex); //get begining elements.
		if(beginningElements.indexOf(id)!=-1){
			return false;//if target element exists in the beginning elements, not cycling.
		}else{
			return true;//if target element doesn'te exists in the beginning elements, must be cycling.
		}		
	}
}

/* added by duhong @ 20110413 -- START */
//for common usage, combined with focus control js, can skipping disabled or invisable element
//road arrry;
//judgeCallback callback[return boolean,paramter(element of road)];
//validCallback callback[return boolean,paramter(element of road)];
//sequence boolean;
//startIndex number;
//nestingCntnumber;
function restlessSeeker(road,judgeCallback,validCallback,sequence,startIndex,nestingCnt){
	if(!nestingCnt)nestingCnt=0;
	if(nestingCnt>road.length) return null;
	//document.getElementById('debugInfo').value = document.getElementById('debugInfo').value + ' [*] ';
	var booty = null;
		if(sequence){//from 0 to N, normal
			var relativeIndex;
			var relativeNextIndex;			
			if(!startIndex)startIndex=0;
			for(i=0;i<road.length;i++){//on my way
				if(i+startIndex >= road.length){//cycle back?
					relativeIndex = i + startIndex - road.length;//yes
				}else{
					relativeIndex = i + startIndex;//no
				}
				//document.getElementById('debugInfo').value = document.getElementById('debugInfo').value + ' | ' + relativeIndex;	Debug html textbox commented in DVR-02-18-17			
				if(judgeCallback(road[relativeIndex])){//found good thing
					if(nestingCnt!=-1){ //simple seeker
						if(relativeIndex+1 >= road.length){//cycle back?
							relativeNextIndex = relativeIndex+1 - road.length;//yes
						}else{
							relativeNextIndex = relativeIndex+1;//no
						}				
					}else{
						relativeNextIndex = relativeIndex;
					}
					if(validCallback(road[relativeNextIndex])){//is the one you keep looking?
						booty = road[relativeNextIndex];//just the one
					}else{
						booty = restlessSeeker(road,function(obj){return true;},validCallback,sequence,relativeNextIndex,nestingCnt+1);//what a pitty, do keep looking.
					}
					break;						
				}
			}		
		}else{// from N to 0, abnormal
			var relativeIndex;		
			var relativeNextIndex;			
			if(!startIndex)startIndex=0;			
			for(i=0;i<road.length;i++){//on my way
				if((road.length-i)-(road.length-startIndex) <0){//cycle back?
					relativeIndex =(road.length-i)-(road.length-startIndex)+road.length;//yes
				}else{
					relativeIndex =(road.length-i)-(road.length-startIndex);//no
				}
				//document.getElementById('debugInfo').value = document.getElementById('debugInfo').value + ' | ' + relativeIndex;	Debug html textbox commented in DVR-02-18-17							
				if(judgeCallback(road[relativeIndex])){//found good thing
					if(nestingCnt!=-1){ //simple seeker
						if(relativeIndex - 1 <0){//cycle back?
							relativeNextIndex =relativeIndex - 1+road.length;//yes
						}else{
							relativeNextIndex =relativeIndex - 1;//no
						}					
					}else{
						relativeNextIndex = relativeIndex;							
					}
		
					if(validCallback(road[relativeNextIndex])){//is the one you keep looking?
						booty = road[relativeNextIndex];//just the one
					}else{
						booty = restlessSeeker(road,function(obj){return true;},validCallback,sequence,relativeNextIndex,nestingCnt+1);//what a pitty, do keep looking.
					}
					break;						
				}				
			}		
		}
	return booty;
}

function sameIdAsActived(objId){
	if(objId==document.activeElement.id){
		return true;	
	}
	return false;
}

function canBeFocused(objId){
	try{
		//Not readonly, Not disabled, Is Visible. Updated by hdu @ 2011-04-19 
		if (!document.getElementById(objId).readOnly && !document.getElementById(objId).disabled && ElementIsVisible(document.getElementById(objId)))
			return true;
	}catch(e){
		return false;	
	}		
	return false;
}

/* added by duhong @ 20110413 -- END */

/* added by duhong @ 20110414 -- START */

//key focus control kit for unsuitable table layout.

//create dynamic mask layer upon checkbox/radio group when focus moving.
//click or onkeydown created layer will close it by default, can use callback method the custermize the behavior.
//parameters: div id,absolute position top, absolute position left, div height, div width, onKeyDown&onClick Handler
function createDynamicMaskLayer(id,top,left,height,width,callback){
	if(document.getElementById(id)==null){
		var newDiv = document.createElement("div");
		newDiv.id = id;
		newDiv.style.height = height;
		newDiv.style.width = width;
		newDiv.style.position = 'absolute';
		newDiv.style.left = left;
		newDiv.style.top = top;
		newDiv.style.backgroundColor = 'transparent';
		//newDiv.style.backgroundColor = '#F00'; //for debug
		newDiv.style.zIndex = '99';
		newDiv.style.visibility = 'visible';
		newDiv.tabIndex = '-1';
		//alert(typeof callback)
		if(callback){
				//for IE
				try{
				newDiv.attachEvent("onkeydown", function(){callback();} );
				newDiv.attachEvent("onclick", function(){callback();} );									
				}catch(e){
					//alert(e);	
				};	
				//for NonIE
				try{
				newDiv.addEventListener('keydown',function(){callback();});
				newDiv.addEventListener('click',function(){callback();});	
				}catch(e){
					//alert(e);	
				};	
			}else{
				//for IE
				try{
				newDiv.attachEvent("onkeydown", function(){removeDynamicMaskLayer(id);} );
				newDiv.attachEvent("onclick", function(){removeDynamicMaskLayer(id);} );		
				}catch(e){
					//alert(e);	
				};	
				//for NonIE
				try{
				newDiv.addEventListener('keydown',function(){removeDynamicMaskLayer(id);});
				newDiv.addEventListener('click',function(){removeDynamicMaskLayer(id);});			
				}catch(e){
					//alert(e);	
				};
			}
			
		var rightArea = document.getElementById('C-MainsideRight');
		rightArea.appendChild(newDiv);
		var plant = document.getElementById(id);
		plant.focus();
		last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
	}else{
		var plant = document.getElementById(id);
		plant.style.visibility = 'visible';
		plant.focus();
		last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
	}
}

//find newly created dynamic mask layer, close it if exists.
function removeDynamicMaskLayer(id){
	//alert(id);
	if(document.getElementById(id)!=null){	
		var rightArea = document.getElementById('C-MainsideRight');	
		rightArea.removeChild(document.getElementById(id));		
	}
}

//find newly created dynamic mask layer, change the z-index to hide if exists.
function hideDynamicMaskLayer(id){
	//alert(id);
	if(document.getElementById(id)!=null){	
		document.getElementById(id).style.visibility = 'hidden';
	}
}

/* added by duhong @ 20110414 -- END */

/* added by hdu @ 20110419 -- START */
//direction : 'up','down','left','right'
//bySequence : Sequence or Reversed
function exceptionalSeeker(direction,bySequence){
	var sIndex = 0;
	if(direction=='up' && spSeqUp){		
		if(!bySequence){sIndex=spSeqUp.length-1;}
		 var booty = restlessSeeker(spSeqUp,sameIdAsActived2D, function(){return true;},bySequence,sIndex,-1);	
		 if(booty && !canBeFocused(booty[1])) return null;
		 return booty;
		
	}else if (direction=='down' && spSeqDown){
		if(!bySequence){sIndex=spSeqDown.length-1;}
		var booty =  restlessSeeker(spSeqDown,sameIdAsActived2D, function(){return true;},bySequence,sIndex,-1);		
		if(booty && !canBeFocused(booty[1])) return null;		
		return booty;
		
	}else if (direction=='left' && spSeqLeft){
		if(!bySequence){sIndex=spSeqLeft.length-1;}
		var booty =  restlessSeeker(spSeqLeft,sameIdAsActived2D, function(){return true;},bySequence,sIndex,-1);	
		if(booty && !canBeFocused(booty[1])) return null;
		return booty;		
		
	}else if (direction=='right' && spSeqRight){
		if(!bySequence){sIndex=spSeqRight.length-1;}
		var booty =  restlessSeeker(spSeqRight,sameIdAsActived2D, function(){return true;},bySequence,sIndex,-1);	
		if(booty && !canBeFocused(booty[1])) return null;
		return booty;			
		
	}else{
		return null;	
	}
}

function sameIdAsActived2D(fromToAry){
	if(fromToAry && fromToAry.length==2){
		if(fromToAry[0]==document.activeElement.id){
			return true;	
		}
	}
	return false;
}

function isTextInput(obj){
	if(document.activeElement.tagName=='INPUT' && document.activeElement.type=='text')	{
		return true;	
	}
	if(document.activeElement.tagName=='INPUT' && document.activeElement.type=='password')	{
		return true;	
	}	
	return false;
}

/* added by hdu @ 20110419 -- END */

// added by hdu @ 20110426 -- set first focus for tabIdSequence
function setFirstFocusForTabEmu(){
		for(obj in tabIdSequence){
			//alert(tabIdSequence[obj]);
			if(canBeFocused(tabIdSequence[obj])){
				var firstElm = document.getElementById(tabIdSequence[obj]);			
				firstElm.focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
				break;
			}	
		}
}

//add by djwan @20110506 start about IP
function formatIP(IP){
   if(IP!='' && IP!=undefined &&IP!=null){
   
	   var IPNum=IP.split('.');
	   var  newIp='';    
	   var eachNum;
			var IPNumObj=Spry.Utils.urlComponentToObject(IPNum);
			/*for(var i=0;i<IPNum.length;i++){
				var temp=Number(IPNum[i]);
				temp=temp+1000;
				var temp1=temp.toString().substring(1,4);
				newIp=newIp.concat(temp1+'.');			
			}*/
			
			for(eachNum in IPNumObj){
				var temp=Number(eachNum);
				temp=temp+1000;
				var temp1=temp.toString().substring(1,4);
				newIp=newIp.concat(temp1+'.');
			}
			
			return newIp.toString().substring(0,newIp.length-1);
	
	}else{
		return '';
	}
}
//add by djwan @20110506 end about IP

//added by hdu @ 20110506 
function getSelectionStart(o) {
	var isIE = !(!document.all);  
	if(!isIE){
		return o.selectionStart;
	}
	return;
}


function goToRangePos(o,pos){
	var isIE = !(!document.all);  
	if(!isIE){
		o.selectionStart=pos-1;  
		o.selectionEnd=pos-1;  
	}
}

//added by hdu @ 20110509
function fillingIP(ip)
{
	return (ip+1000).toString(10).substring(1); //鯉塀晒補竃(温巣)
}
function IPFormatter(ip_raw)
{
	if((ip_raw!=IPAddNull||ip_raw!=ipAddBlank)&&ip_raw!=""){
		var IPArray = ip_raw.split(".");
		var ip1 = parseInt(IPArray[0]);
		var ip2 = parseInt(IPArray[1]);
		var ip3 = parseInt(IPArray[2]);
		var ip4 = parseInt(IPArray[3]);
		var ip_fromatted = fillingIP(ip1) + "." + fillingIP(ip2) + "." + fillingIP(ip3) + "." + fillingIP(ip4);	
		return ip_fromatted;	
	}else{
		return ip_raw;			
	}
}

//prepare customized focusable element white list, added by hdu @ 20110525
function bulidWhiteList(focusEleAry){
	
	whiteListOfAccessable = new Array;
	
	if(focusEleAry){
		for(i in focusEleAry){
			whiteListOfAccessable = getElementSeeker(focusEleAry[i],whiteListOfAccessable);
		}
	}else{
		whiteListOfAccessable = getElementSeeker(tabIdSequenceBig,whiteListOfAccessable);
		
		whiteListOfAccessable = getElementSeeker(spSeqRight,whiteListOfAccessable);
		whiteListOfAccessable = getElementSeeker(spSeqLeft,whiteListOfAccessable);
		whiteListOfAccessable = getElementSeeker(spSeqUp,whiteListOfAccessable);
		whiteListOfAccessable = getElementSeeker(spSeqDown,whiteListOfAccessable);		
	
		whiteListOfAccessable = getElementSeeker(FocusTagList,whiteListOfAccessable);
		whiteListOfAccessable = getElementSeeker(BigFocusTagList,whiteListOfAccessable);
		whiteListOfAccessable = getElementSeeker(FocusTagListInPopup,whiteListOfAccessable);
		
		whiteListOfAccessable = getElementSeeker(MianFocusTagList,whiteListOfAccessable);	
		whiteListOfAccessable = getElementSeeker(tabId0110Sequence,whiteListOfAccessable);	
		whiteListOfAccessable = getElementSeeker(ScheduleTabFocusList,whiteListOfAccessable);	
		whiteListOfAccessable = getElementSeeker(TimeSTabFocusList,whiteListOfAccessable);	
		whiteListOfAccessable = getElementSeeker(TimeETabFocusList,whiteListOfAccessable);
		whiteListOfAccessable = getElementSeeker(OBJEventTabFocusList,whiteListOfAccessable);			
	}
	
}

function getElementSeeker(obj,container){
	if(obj && obj.constructor.toString().indexOf('Array')==-1){
		if(obj!='')	{
			container.push(obj);	
		}
	}else{
		for (i in obj){
			if(obj[i]) 	container = getElementSeeker(obj[i],container);
		}		
	}
	return container;
}

function getTargetByte(text) {
	var count = 0;
	for (i=0; i<text.length; i++)
	{
		var target = text.charCodeAt(i);
		if ((target >= 0x0 && target < 0x81) 
		 || (target == 0xf8f0) 
		 || (target >= 0xff61 && target < 0xffa0) 
		 || (target >= 0xf8f1 && target < 0xf8f4)) {
			count++;
		} else {
			count+=2;
		}
	}
	return count;
}

/**
 * IPアドレス入力時関数
 * 上書きモードの作成
**/
function inputIpArea(ipObj){

	var keyCd = event.keyCode;
	//キーコードから数値を特定
	var inputNum = numKeyCdToInputNumber(keyCd);
	
	if(keyCd != 27 && keyCd !=37 && keyCd != 38 && keyCd != 39 && keyCd != 40 && keyCd != 9){
		//イベント伝播抑止
		stopDefaultling(event);	
		stopBubbling(event);
	}
	
	//数値のキーコードの場合、入力処理を実行する
	if(inputNum!=999){
		//現在の開始位置を取得
		var startCursorPoint = ipObj.selectionStart;
		//入力ポイントまでの文字列を取得
		var frontIpArea = ipObj.value.substring(0, startCursorPoint);
		//入力ポイントよりも後ろの文字列を取得
		var backIpArea = ipObj.value.substring(startCursorPoint+1, ipObj.value.length);
		
		//入力内容の反映
		ipObj.value = "" + frontIpArea + inputNum + backIpArea;
		
		//入力位置の再フォーカス
		ipObj.setSelectionRange( startCursorPoint, startCursorPoint + 1 );
		//擬似的に右コードが指定されていると認識させる
		var rightKeyCd = 39;
		//右に移動するエリアがある場合
		if(startCursorPoint != 14 && startCursorPoint != 15){
			//入力エリアから遷移しないように、フラグを指定する（第二、第三引数にfalse）
			moveCursorSubst(ipObj, false, false, rightKeyCd, startCursorPoint);
		}
	}
	
}

/**
 * IPアドレス上のカーソル遷移
 * 常に一文字選択しながら移動する
 * 第一引数：現在選択中のIP入力テキストフィールド
 * 第二引数：左端までカーソルが移動した時に、左のオブジェクトに遷移するかどうかのフラグ(true指定で遷移する)
 * 第三引数：右端までカーソルが移動した時に、左のオブジェクトに遷移するかどうかのフラグ(true指定で遷移する)
**/
function moveOnIpArea(ipObj, leftFlg, rightFlg){
	var keyCd = event.keyCode;

	//キーコードを保持させる（onblur処理時に使用）
	memoryKeyCd();
	//左・右以外の入力時は移動させない
	if(keyCd==37||keyCd==39){
	
		//現在の開始位置を取得
		var startCursorPoint = ipObj.selectionStart;
		//フォーカス移動実装部に委譲
		moveCursorSubst(ipObj, leftFlg, rightFlg, keyCd, startCursorPoint);
//		alert("nextCursorPointStart==["+nextCursorPointStart+"]  nextCursorPointEnd==["+nextCursorPointEnd+"]");
		
	}else if(keyCd==C_DOT_KEY_CD || keyCd==C_DOT_TEN_KEY_CD){
		//"."キーを押下された場合は次のセグメントに移動させる
		//次がない場合は移動させない
		//現在の開始位置を取得
		var startCursorPoint = ipObj.selectionStart;

		if(startCursorPoint < firstDot){
			//第一セグメントにフォーカスがある場合
			//カーソル移動
			ipObj.setSelectionRange( firstDot + 1, firstDot + 2 );
		}else if(startCursorPoint > firstDot && startCursorPoint < secondDot){
			//第二セグメントにフォーカスがある場合
			//カーソル移動
			ipObj.setSelectionRange( secondDot + 1, secondDot + 2 );
		}else if(startCursorPoint > secondDot && startCursorPoint < thirdDot){
			//第三セグメントにフォーカスがある場合
			//カーソル移動
			ipObj.setSelectionRange( thirdDot + 1, thirdDot + 2 );
		}
	}else{
		return;
	}
}

/**
 * IP入力エリア内のカーソル移動実装部
**/
function moveCursorSubst(ipObj, leftFlg, rightFlg, keyCd, startCursorPoint){
	
	//カーソル移動後の開始ポイント(初期値)
	var nextCursorPointStart = 0;
	//カーソル移動後の終了ポイント(初期値)
	var nextCursorPointEnd = 0;
	
	//最終文字（15文字目）までカーソルが移動していなければ、移動させる
	if(keyCd==39&&startCursorPoint!=14&&startCursorPoint!=15){
		//次のカーソルポイントが"."ならば次セグメントの先頭をフォーカスする
//			alert("startCursorPoint=="+startCursorPoint)
		if( startCursorPoint == firstDot - 1 || startCursorPoint == secondDot - 1 || startCursorPoint == thirdDot -1 ){
			nextCursorPointStart = startCursorPoint + 2;
			nextCursorPointEnd = startCursorPoint + 3;
		}else{
			nextCursorPointStart = startCursorPoint + 1;
			nextCursorPointEnd = startCursorPoint + 2;
		}
		//カーソル移動
		ipObj.setSelectionRange( nextCursorPointStart, nextCursorPointEnd );
	}else if(keyCd==37&&startCursorPoint!=0){
		//次のカーソルポイントが"."ならば次セグメントの先頭をフォーカスする
		if( startCursorPoint==firstDot + 1 || startCursorPoint == secondDot + 1 || startCursorPoint == thirdDot + 1 ){
			nextCursorPointStart = startCursorPoint - 2;
			nextCursorPointEnd = startCursorPoint - 1;
		}else{
			nextCursorPointStart = startCursorPoint - 1;
			nextCursorPointEnd = startCursorPoint;
		}
		//カーソル移動
		ipObj.setSelectionRange( nextCursorPointStart, nextCursorPointEnd );
	}else{
		//カーソルが右端まで行っていて、尚且つ右ボタンが押下されていれば、フォーカス移動フラグを立てる
		if(startCursorPoint==14&&keyCd==39&&rightFlg){
			ipAreaFucusFlg = true;
		}else if(startCursorPoint==0&&keyCd==37&&leftFlg){
			ipAreaFucusFlg = true;
		}
	}
}


/**
 * テキストフォーカス時に、一番先頭にカーソルを持ってくる関数
**/
function frontCursorProc(ipObj){
	//フォーカスフラグの設定をfalseにする
	ipAreaFucusFlg = false;
	//フォーカス時のIPアドレスを取得
	beforChangeIpAddr = ipObj.value;
	ipObj.setSelectionRange( 0, 1 );
}

/**
 * IPアドレス入力エリアからフォーカスが外れる時のチェック
 * onChangeが使用できないので、別の方法を思案
 */
function fakeOnChange(ipObj){
	var keyCd = memKeyCode;
	//IPアドレスのフォーマットを整え、入力値に誤りがないかをチェックする
	//チェック内容：各セグメントの値が"000"〜"255"以内となっている事
	if(zeroPaddingIpArea(ipObj)){
		//ソフトウェアキーボード出力時、取消ボタン押下時はエラーメッセージを出さない様にする
		//37(左)38(上)39(右)40(下)以外は処理を行わない
		if(((keyCd == 37 || keyCd == 39) && ipAreaFucusFlg) || keyCd == 38 || keyCd == 40){
			//エラーメッセージを出力 "IPアドレスに誤りがあります。<br />再入力してください。"
			var objErrPop = new actionPop(gettext(ipErrMsgList[ipObj.id]),1,gettext("button.back"),"");
			objErrPop.show(ipObj);
		}
		//エラーが出たので、フォーカス遷移のフラグを倒しておく
		ipAreaFucusFlg = false;
	}
}

/**
 * IPアドレス入力エリアにて、空白表示が残っている場合は0に置き換える
 * 各セグメントの値が"000"〜"255"内に含まれていない場合はtrueを返す
**/
function zeroPaddingIpArea(ipObj){

	//各セグメントの値をチェックするフラグ
	var returnCheckFlg = false;
	//"."ポイントの初期化
	var dotStartPoint = 0;
	var dotEndPoint = 1;
	
	var returnIpAddr = "";
	//IPアドレスの値が初期表示値と変更されていない場合は、0埋め処理を実施しない
	//チェックも行わない
	if(ipObj.value != defaultIPAdrr){
		for(var i = 0; i < 4; i++){
			//ドットの検索
			dotEndPoint = ipObj.value.indexOf(C_DOT, dotStartPoint);

			//IPアドレスのi+1セグメントの文字列を取得（半角スペースが残っている場合、正規表現で削除して取得する）
			var byteValue = "";
			if(i != 3){
				byteValue = ipObj.value.substring(dotStartPoint, dotEndPoint).replace(/[ ]/g, "");
			}else{
				byteValue = ipObj.value.substring(dotStartPoint, ipObj.value.length).replace(/[ ]/g, "");
			}
			//次回の開始位置を格納
			dotStartPoint = dotEndPoint + 1;
			
			//変換後のIPアドレス（セグメント単位）の格納変数
			var checkAfterByte = "";
			if(byteValue&&byteValue!=undefined&&byteValue!=""){
				//第一ドットまでの値を数値化し、その後0パディングし右から3桁分取得する
				checkAfterByte = "" + minIpAddr + byteValue;
				checkAfterByte = checkAfterByte.substring(checkAfterByte.length - 3, checkAfterByte.length);
			}else{
				checkAfterByte = minIpAddr;
			}
			
			//各セグメントの値が最小〜最大値に含まれているかをチェック
			if(!(checkAfterByte >= minIpAddr && checkAfterByte <= maxIpAddr)){
				returnCheckFlg = true;
			}
			
			//IPアドレスの作成
			if(i != 3){
				returnIpAddr += checkAfterByte + C_DOT;
			}else{
				returnIpAddr += checkAfterByte;

			}
		}
		
		//IPアドレスを格納
		ipObj.value = returnIpAddr;
	}
	//IPアドレスのチェック結果を戻す
	return returnCheckFlg;
}


/**
 * キーコードを数値に変換するメソッド
 * 空白を返した場合、入力されたキーコードは数値ではない
**/
function numKeyCdToInputNumber(keyCd){
	switch(keyCd){
		case 48:
			return 0;
			break;
		case 49:
			return 1;
			break;
		case 50:
			return 2;
			break;
		case 51:
			return 3;
			break;
		case 52:
			return 4;
			break;
		case 53:
			return 5;
			break;
		case 54:
			return 6;
			break;
		case 55:
			return 7;
			break;
		case 56:
			return 8;
			break;
		case 57:
			return 9;
			break;
		case 96:
			return 0;
			break;
		case 97:
			return 1;
			break;
		case 98:
			return 2;
			break;
		case 99:
			return 3;
			break;
		case 100:
			return 4;
			break;
		case 101:
			return 5;
			break;
		case 102:
			return 6;
			break;
		case 103:
			return 7;
			break;
		case 104:
			return 8;
			break;
		case 105:
			return 9;
			break;
		default:
			return 999;
			break;
	}
}

/**
 * 最後に押下したキーコードを一時領域に保持させる
**/
function memoryKeyCd(){
//	iDebug("memoryKeyCd in");
	memKeyCode = event.keyCode;
//	iDebug("memoryKeyCd out");
}

/**
 * キーコード一時領域初期化
**/
function deleteKeyCd(){
//	iDebug("deleteKeyCd in");
	memKeyCode = "";
//	iDebug("deleteKeyCd out");
}

function check_password(ev,elemid)//Check the passwords whether or not require
{
	var checkflag=0;
	if(ev.value.length!=0)
	{
		if(4>ev.value.length||ev.value.length>6)
	    {
			//alert("ABC");
			//文字数が4〜6文字でない場合
//			var pop_num=new actionPop("パスワードは４〜６文字以内で入力してください",1,"OK","");//show the waiting popUp that defined by yourself
			// 文字数が4〜6文字でない場合、文言が「パスワードは4〜6文字以内で<br />入力してください。」、戻るボタンを表示する
			var pop_num=new actionPop(gettext("DVR-01-07-07-01"),1,"戻る","");//show the waiting popUp that defined by yourself
			pop_num.addObserver(doOK_alert);
			pop_num.show(document.getElementById(elemid));
			return false;
		//	break;
	    }
		//半角英数字以外が使われていないかチェック
		for(var i=0;i<ev.value.length;i++)
		{
			var letter=ev.value.toString().substring(i,i+1);
			if(isNumber(letter)||isletter(letter))
			{}else
			{
			    checkflag=1;
			}	
		}
		if(checkflag==1)
		{
			// パスワードが不正の場合、文言が「パスワードが不正です。」、戻るボタンを表示する
			var pop_digitalEnglish=new actionPop(gettext("DVR-01-07-07-02"),1,"戻る","");//show the waiting popUp that defined by yourself
			pop_digitalEnglish.addObserver(doOK_alert);
			pop_digitalEnglish.show(document.getElementById(elemid));
			return false;
		}
		
		return true;
	}
	
}

//20111014Yabuta add フォーカスを見失ったときの復活処理
var revive_flag = null;
var last_focus = null;
function revive_focus()
{
	var i;
	var ipform_Array = new Array("ipt_ip"
								,"DVR-02-02-00-03"
								,"DVR-02-02-00-04"
								,"DVR-02-02-00-05"
								,"DVR-02-02-00-06"
								,"DVR-02-02-00-07"
								,"DVR-02-02-00-08"
								,"DVR-02-02-00-09");
	revive_flag = "NG";
	if(document.activeElement.tagName=='BODY')
	{
		//暫定対応でフォーカスを見失った時は一律で「取消」釦に戻す
		if(last_focus !=null && last_focus != undefined)
		{
			revive_flag = "OK";
			last_focus.focus();
			last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			for(i=0;i<10;i++)
			{
				if(last_focus.id==ipform_Array[i])
				{
					frontCursorProc(last_focus);
				}
			}
			//フォーカス復活後はイベントの伝播を止める
			stopDefaultling(event);
			stopBubbling(event);
		}
	}
}

//20111019 Yabuta add フォームがマウスでクリックされた際にフォーカス位置を覚えさせる処理
function setfocus_click(target)
{
	target.focus();
	last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
}
//サムネイル詳細画面のポップアップ表示(FULLHD)
function validReadOnlyBIG(){
	try{	
		if(!hintsShowing){
		
			try{
				var workingAreaLayer = document.getElementById('WhollyBackground');
				if(workingAreaLayer){
					savedWorkingAreaZIndex=workingAreaLayer.style.zIndex; //save working area zIndex
					workingAreaLayer.style.zIndex=-1; //move working area to bottom
				}
				
				var hintLayer = document.getElementById('ATField');
				if(hintLayer){

				var wail = new actionPop(gettext("PROCESSING_HINT"),0,"","") ;
				document.getElementById("DVR").style.left = "0px";
				document.getElementById("DVR").style.width = "1900px";
				document.getElementById("DVR_popUp").style.left = "760px";
				document.getElementById("DVR_popUp").style.top = "440px";
				wail.show();
				document.getElementById("DVR99-02-01-table").style.display="block";   
				}
				
				savedActiveElement = document.activeElement;
				if(savedActiveElement)savedActiveElement.blur();
				
				savedBodyAction = new Array;
				savedBodyAction.push(document.body.onkeydown);
				
				document.body.onkeydown = function(){
					stopDefaultling(event);
				};
				
				hintsShowing = true;				
			}catch(e){
				iDebug('Exception!validReadOnly while hintsShowing: '+e);
			}
		}
	}catch(e){
		iDebug('Exception!validReadOnly : '+e);
	}	
}

//サムネイル詳細画面のポップアップ表示(4:3)
function validReadOnlyNormal(){
	try{	
		if(!hintsShowing){
		
			try{
				var workingAreaLayer = document.getElementById('WhollyBackground');
				if(workingAreaLayer){
					savedWorkingAreaZIndex=workingAreaLayer.style.zIndex; //save working area zIndex
					workingAreaLayer.style.zIndex=-1; //move working area to bottom
				}
				
				var hintLayer = document.getElementById('ATField');
				if(hintLayer){
				var wail = new actionPop(gettext("PROCESSING_HINT"),0,"","") ;
				document.getElementById("DVR").style.left = "0px";
				document.getElementById("DVR").style.width = "1024px";
				document.getElementById("DVR_popUp").style.left = "312px";
				document.getElementById("DVR_popUp").style.top = "264px";
				wail.show();
				document.getElementById("DVR99-02-01-table").style.display="block";   
				}
				
				savedActiveElement = document.activeElement;
				if(savedActiveElement)savedActiveElement.blur();
				
				savedBodyAction = new Array;
				savedBodyAction.push(document.body.onkeydown);

				document.body.onkeydown = function(){
					stopDefaultling(event);
				};
				
				hintsShowing = true;			
			}catch(e){
				iDebug('Exception!validReadOnly while hintsShowing: '+e);
			}
		}
	}catch(e){
		iDebug('Exception!validReadOnly : '+e);
	}	
}

/*-----------------------------------------------------------------------------------------
20111130 Yabuta add 履歴画面にて絞込を行ったときにそのときの開始・終了日時を記憶させる関数
第一引数:操作種別
	indate->絞込日時の記憶
	outdate->記憶した絞込日時の呼出
	delete->localStorageの開放)
第二引数:ダウンボックスのID(第一引数がdeleteの場合は必要ない)
-----------------------------------------------------------------------------------------*/
function DateIandO(io, id)
{
	switch (io)
	{
		case "indate":	//絞込日時の記憶
			localStorage.fromyear = document.getElementById(id + "-06-01").value;
			localStorage.frommonth = document.getElementById(id + "-06-02").value;
			localStorage.fromday = document.getElementById(id + "-06-03").value;
			localStorage.fromhour = document.getElementById(id + "-06-04").value;
			localStorage.fromminite = document.getElementById(id + "-06-05").value;
			localStorage.fromsecond = document.getElementById(id + "-06-06").value;
			localStorage.toyear = document.getElementById(id + "-07-01").value;
			localStorage.tomonth = document.getElementById(id + "-07-02").value;
			localStorage.today = document.getElementById(id + "-07-03").value;
			localStorage.tohour = document.getElementById(id + "-07-04").value;
			localStorage.tominite = document.getElementById(id + "-07-05").value;
			localStorage.tosecond = document.getElementById(id + "-07-06").value;
			break;
		case "outdate":	//記憶した絞込日時の呼出
			document.getElementById(id + "-06-01").value = localStorage.fromyear;
			document.getElementById(id + "-06-02").value = localStorage.frommonth;

			// 「日」セレクトボックスの選択肢を初期化し、読み出した指定年月に合わせた日数を再設定する
			// 指定年月の最終日を取得する
			var LastDay = getLastDayofSetDate( localStorage.fromyear, localStorage.frommonth );
			document.getElementById(id + "-06-03").length = 0;		// 一旦初期化
			// セレクトボックス再生成
			for( var i = 1; i <= LastDay; i++ )
			{
				if( i < 10)
				{
					document.getElementById(id + "-06-03").add(new Option("0" + i.toString(), i));
				}
				else
				{
					document.getElementById(id + "-06-03").add(new Option(i.toString(), i));
				}
			}
			// ストレージに覚えている値が指定年月の最終日を超える場合は補正
			if( localStorage.fromday > LastDay )
			{
				document.getElementById(id + "-06-03").value = LastDay;
				document.getElementById(id + "-06-03").selectedIndex = LastDay - 1;
			}
			else
			{
				document.getElementById(id + "-06-03").value = localStorage.fromday;
				document.getElementById(id + "-06-03").selectedIndex = localStorage.fromday - 1;
			}
			document.getElementById(id + "-06-04").value = localStorage.fromhour;
			document.getElementById(id + "-06-05").value = localStorage.fromminite;
			document.getElementById(id + "-06-06").value = localStorage.fromsecond;

			document.getElementById(id + "-07-01").value = localStorage.toyear;
			document.getElementById(id + "-07-02").value = localStorage.tomonth;

			// 「日」セレクトボックスの選択肢を初期化し、読み出した指定年月に合わせた日数を再設定する
			// 指定年月の最終日を取得する
			LastDay = getLastDayofSetDate( localStorage.toyear, localStorage.tomonth );
			document.getElementById(id + "-07-03").length = 0;		// 一旦初期化
			// セレクトボックス再生成
			for( var i = 1; i <= LastDay; i++ )
			{
				if( i < 10)
				{
					document.getElementById(id + "-07-03").add(new Option("0" + i.toString(), i));
				}
				else
				{
					document.getElementById(id + "-07-03").add(new Option(i.toString(), i));
				}
			}
			// ストレージに覚えている値が指定年月の最終日を超える場合は補正
			if( localStorage.today > LastDay )
			{
				document.getElementById(id + "-07-03").value = LastDay;
				document.getElementById(id + "-07-03").selectedIndex = LastDay - 1;
			}
			else
			{
				document.getElementById(id + "-07-03").value = localStorage.today;
				document.getElementById(id + "-07-03").selectedIndex = localStorage.today - 1;
			}
			document.getElementById(id + "-07-04").value = localStorage.tohour;
			document.getElementById(id + "-07-05").value = localStorage.tominite;
			document.getElementById(id + "-07-06").value = localStorage.tosecond;
			break;
		case "delete":	//localStorageの開放
			localStorage.removeItem("fromyear");
			localStorage.removeItem("frommonth");
			localStorage.removeItem("fromday");
			localStorage.removeItem("fromhour");
			localStorage.removeItem("fromminite");
			localStorage.removeItem("fromsecond");
			localStorage.removeItem("toyear");
			localStorage.removeItem("tomonth");
			localStorage.removeItem("today");
			localStorage.removeItem("tohour");
			localStorage.removeItem("tominite");
			localStorage.removeItem("tosecond");
			break;

		default:
		break;
	}
}

function getLastDayofSetDate(yy,mm) {
	if (mm==2) {
		if ((yy % 400 == 0) || ((yy % 4 == 0) && (yy % 100 != 0))) {
			return 29;
		} else {
			return 28;
		}
	}
	if ((mm==1) || (mm==3) || (mm==5) || (mm==7) || (mm==8) || (mm==10) || (mm==12)) {
		return 31;
	}
	if ((mm==4) || (mm==6) || (mm==9) || (mm==11)) {
		return 30;
	}
}

//columeとpanは二つで一組。入力した時刻の有効無効を判定する関数
function colume(value1,value2,value3,value4,obj3,obj4,obj){  
//20111220 Yabuta Del start この処理は不要
//	if(value1==0&&value3==0){
//	   obj4.selectedIndex=0;	
//	}
//20111220 Yabuta Del end
	var columeFlag=0;
	if(value3<value1){
		
		columeFlag=1;
	}
	
	if(value3==value1&&value2>value4){
		
		columeFlag=1;
		
	}
	return(columeFlag);
}

/*#####################################################  judge time ######################################################################*/

function pan(str1,str2,str3,str4,x){       
	var panFlag=0;
	var obj1 = document.getElementById(str1);
	var obj2 = document.getElementById(str2);
	var obj3 = document.getElementById(str3);
	var obj4 = document.getElementById(str4);
	var value1 = parseInt(obj1.options[obj1.selectedIndex].value,10);
	var value2 = parseInt(obj2.options[obj2.selectedIndex].value,10);
	var value3 = parseInt(obj3.options[obj3.selectedIndex].value,10);
	var value4 = parseInt(obj4.options[obj4.selectedIndex].value,10);
	 panFlag=colume(value1,value2,value3,value4,obj3,obj4,x);
//	 	timedarw();
	 return(panFlag);
}


//設定値(記録時間)が間違っている旨popupで出した後にフォーカスを間違っていた箇所に戻す処理
function setNgFocus(methodName){
	document.getElementById(ngId).focus();
	last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
	ngId=null;
}

function keyToMoustop()//リンク切れ画面はボタンが1つなのでEnter、Esc以外のイベントの伝播を抑止
{
	if(event.keyCode!=27 && event.keyCode!=13)
	{
		stopBubbling(event);
		stopDefaultling(event);
	}
}

/**
 * inputTextArea
 * テキストボックス入力処理
 * (キーボードでの直接入力の場合、入力は数値のみ)
 * 
 * @param Object obj
 *
 * @return なし
 */
function inputTextArea(obj) {
	// キーコードを取得
	var keyCd    = event.keyCode;
	
	// キーコードを元に数値を特定
	var inputNum = numKeyCdToInputNumber(keyCd);

	// 特定のキーコード以外はイベントを抑止する
	switch(keyCd) {
		case 27: // Esc
		case 38: // ↑
		case 40: // ↓
		case 8:  // BackSpace
		case 9:  // Tab
		break;

		case 37: // ←
		case 39: // →
			return false;
		break;

		default:
			//イベント伝播抑止
			stopDefaultling(event);	
			stopBubbling(event);
		break;
	}
	
	// 数値のキーコードの場合、入力処理を実行する
	if(inputNum!=999) {	// 数値以外の場合999が入ってくる
		// 現在の開始位置を取得
		var startCursorPoint = obj.selectionStart;

		// 入力内容に反映
		if(obj.value.length < obj.maxLength) {
			obj.value = "" + obj.value + inputNum;

			// 再フォーカス
//			startCursorPoint = startCursorPoint + 1;
			// 強制でフォーカスを最後尾に持っていく
			obj.setSelectionRange( obj.value.length, obj.value.length );
		}
	}
	
	return true;
}

/**
 * checkFileName
 * ファイルに使用できない文字が含まれているかチェック
 * 
 * @param String str チェックを行う文字列
 *
 * @return bool err_flg  true / false
 */
function checkFileName(str) {
	var err_flg = true;
	var err_str = new Array('\\', '/', ':', ',', '*', '?', '"', '<', '>', ';', '|', ' ', '　');

	for(var i = 0; i < err_str.length; i ++) {
		if(str.indexOf(err_str[i], 0) >= 0) {
			err_flg = false;
			break;
		}
	}

	return err_flg;
}

/**
 * checkCameraName
 * カメラ名称に使用できない文字が含まれているかチェック
 * 
 * @param String str チェックを行う文字列
 *
 * @return bool err_flg  true / false
 */
function checkCameraName(str) {
	var err_flg = true;
	var err_str = new Array('\\', ',', "'", '"', '<', '>', '%', ';', '_');

	for(var i = 0; i < err_str.length; i ++) {
		if(str.indexOf(err_str[i], 0) >= 0) {
			err_flg = false;
			break;
		}
	}

	return err_flg;
}

/**	
 * checkNum
 * 数値チェック
 *
 * @param String str チェックを行う文字列
 *
 * @return true / false
 */
function checkNum(str) {
	if (str == undefined || str == null || str == "") {return true;}	

	var r,re;
	re = /\d*/i; //\dは数字を表し、*は複数の数字をマッチング
	r = str.match(re);
	return (r==str)?true:false;
}

/**
 * checkEnglish
 * 半角英数字チェック
 *
 * @param String str チェックを行う文字列
 *
 * @return true / false
 */
function checkEnglish(str) {
	// 値が入ってなかったら、何もせずに返す
	if (str == undefined || str == null || str == "") {return true;}	

	var re = /^[A-Za-z0-9]+$/;
	return re.test(str);
}

/*---------------------------------------------------------*
 * checkCh
 * 半角英数字記号チェック
 *
 * @param String str チェックを行う文字列
 *
 * @return true / false
 *---------------------------------------------------------*/
function checkCh(str) {
	// 値が入ってなかったら、何もせずに返す
	if (str == undefined || str == null || str == "") {return true;}

	var re = /^[A-Za-z0-9!-\/:-@\[-\`\{-\~]+$/;
	return re.test(str);
}

/**
 * checkMailAddress
 * メールアドレスチェック
 *
 * @param String str チェックを行う文字列
 *
 * @return true / false
 */
function checkMailAddress(str) {
	// 値が入ってなかったら、何もせずに返す
	if (str == undefined || str == null || str == "") {return true;}

	//・最初の文字：英数字以外はNG
	//・最後の文字：英字以外はNG
	//・最後の文字：2文字未満はNG
	//・中間の文字：英数字、「.」、「_」、「-」、「@」以外はNG
	//・@の数：1文字以外はNG
	//・@直前/直後の文字：英数字以外はNG
	//・@より後部分の文字：「.」無しはNG
	//・@より後部分の文字：英字が1文字以内はNG
	var re = /^[a-zA-Z0-9][\.a-zA-Z0-9_-]*[a-zA-Z0-9][@][a-zA-Z0-9][\.a-zA-Z0-9_-]*[\.][a-zA-Z]{2,}$/;
	if(re.test(str) == false){
		return false;
	}

	return true;
}

/**
 * checkHeadSpace
 * 前方スペースチェック
 * (文字の先頭が半角または全角のスペースであるかのチェックを行います)
 *
 * @param String str  チェックを行う文字列
 *
 * @return bool err_flg  エラーフラグ true / false
 */
function checkHeadSpace(str) {
	// 値が入ってなかったら、何もせずに返す
	if (str == undefined || str == null || str == "") {return true;}

	var err_flg = true;

	if(str.charAt(0) == ' ')  { err_flg = false; } // 半角スペース
	if(str.charAt(0) == '　') { err_flg = false; } // 全角スペース

	return err_flg;
}


/**
 * checkIpAddressFormat
 * IPアドレスとフォーマット形式が一緒かをチェックする
 *
 * @param String str
 *
 * @return true / false
 */
function checkIpAddressFormat(str) {
	// 「.」で文字列を分割
	var sub_str = str.split(".");

	// ブロックが4つ存在しない場合、エラー
	if(sub_str.length != 4) { return false; }
	
	// 範囲チェック(0〜255)
	var err_flg = true;
	for(var i = 0; i < sub_str.length; i ++) {
		if((sub_str[i] < 0) || (sub_str[i] > 255)) {
			err_flg = false;
			break;
		}
		// 数字以外の文字がある場合
		if( isNaN( Number(sub_str[i]) ) ) {
			err_flg = false;
			break;
		}
	}
	
	return err_flg;
}

/**
 * resetNTPIpAddressValue
 * NTPサーバーがIPアドレスの場合、補正を行う
 *
 * @param String str
 *
 * @return true / false
 */
function resetNTPIpAddressValue(str) {
	// 「.」で文字列を分割
	var sub_str = str.split(".");
	var tmpstr  = "";

	tmpstr = parseInt(sub_str[0], 10) + "." + parseInt(sub_str[1], 10) + "." + parseInt(sub_str[2], 10) + "."+ parseInt(sub_str[3], 10);
	
	return tmpstr;
}

/**
 * checkSubnetmask
 * サブネットマスクチェック
 *
 * @param String str サブネットマスク(xxx.xxx.xxx.xxx)
 *
 * @return true / false
 */
function checkSubnetmask(str) {
	// アドレスフォーマットチェック
	if(!checkIpAddressFormat(str)) { return false; }

	// サブネットマスクから「.」をとりのぞく
	var mask_array = str.split(".");

	//
	var sub_num = 0;
	var sub_str = "";
	var subnetmask = "";
	var err_flg = true;
	for(var i = 0; i < mask_array.length; i ++) {
		// 2進数に変換
		sub_num = Number(mask_array[i]).toString(2);

		// 0埋めする
		sub_str = "00000000"+sub_num;
		subnetmask = subnetmask + sub_str.slice(-8);
	}

	// 一番最初の"0"を検索
	var p = subnetmask.indexOf(0);

	// 255.255.255.255 なら エラー
	if(p == -1) {
		return false;

	// 「0」からはじまっているのでエラー
	} else if(p == 0) {
		return false;

	} else {
		// 検索した0の位置から文字列を切り取る
		var slice_mask = subnetmask.slice(p);

		// 切り取った文字列を10進数に直す
		slice_mask = parseInt(slice_mask, 2);

		// 計算した10進数が0より大きければNG
		if(slice_mask > 0) {
			return false;
		} else {
			return true;
		}
	}
}

/**
 * checkIpAddress
 * IPアドレスチェック
 *
 * @param String str IPアドレス(xxx.xxx.xxx.xxx)
 *
 * @return bool err_flg true / false
 */
function checkIpAddress(str) {
	// フォーマットチェック
	if(!checkIpAddressFormat(str)) { return false; }

	// 変数宣言
	var err_flg = true;

	// 対象のIPアドレスを「.」で分解
	var ip_array = str.split(".");

	// 使用不可IPアドレス
	// 0.xxx.xxx.xxx
	// 127.xxx.xxx.xxx
	// 224.xxx.xxx.xxx 〜 239.xxx.xxx.xxx
	// 240.xxx.xxx.xxx 〜 254.xxx.xxx.xxx
	// 255.xxx.xxx.xxx
	// xxx.xxx.xxx.0
	// xxx.xxx.xxx.255
	if(ip_array[0] == 0)        { err_flg = false; }
	else if(ip_array[0] == 127) { err_flg = false; }
	else if((ip_array[0] >= 224) && (ip_array[0] <= 239)) { err_flg = false; }
	else if((ip_array[0] >= 240) && (ip_array[0] <= 254)) { err_flg = false; }
	else if(ip_array[0] == 255) { err_flg = false; }
	else if(ip_array[3] == 0) { err_flg = false; }
	else if(ip_array[3] == 255) { err_flg = false; }
	
	return err_flg;
}

/**
 * checkGateWay
 * ゲートウェイチェック
 *
 * @param String gateway    ゲートウェイ(xxx.xxx.xxx.xxx)
 * @param String subnetmask サブネットマスク(xxx.xxx.xxx.xxx)
 * @param String ipadd      IPアドレス(xxx.xxx.xxx.xxx)
 *
 * @return bool err_flg  true / false
 */
function checkGateWay(gateway, subnetmask, ipadd) {
	// フォーマットチェック
	if(!checkIpAddressFormat(gateway)) { return false; }    // ゲートウェイ
	if(!checkIpAddressFormat(subnetmask)) { return false; } // サブネットマスク
	if(!checkIpAddressFormat(ipadd)) { return false; }      // IPアドレス

	// 
	var gateway_arr    = gateway.split(".");
	var subnetmask_arr = subnetmask.split(".");
	var ipadd_arr      = ipadd.split(".");
	
	// 設定無し(0.0.0.0)の場合は処理をしない
	if((gateway_arr[0] == 0) && (gateway_arr[1] == 0) && (gateway_arr[2] == 0) && (gateway_arr[3] == 0)) { return true; }

	// 運用IPの同様チェック
	if( checkIpAddress(gateway) == false ) {
		return false;
	}

	// 運用IPと重複チェック
	if( Number(gateway_arr[0]) == Number(ipadd_arr[0])
		&& Number(gateway_arr[1]) == Number(ipadd_arr[1])
		&& Number(gateway_arr[2]) == Number(ipadd_arr[2])
		&& Number(gateway_arr[3]) == Number(ipadd_arr[3]) ) {
		return false;
	}

	// マスクの一致確認
	for(var i = 0; i < 4; i ++) {
		if((subnetmask_arr[i] & ipadd_arr[i]) != (subnetmask_arr[i] & gateway_arr[i])) {
			return false;
		}
	}

	return true;
}

//===============================================================================//
//	refs #3845 2012.4.25 takeuchi 引数の形式変更
//	引　数：カメラタイプ,記録レート,品質(クオリティー)
//
//	返り値：前記録時間の設定可能最大時間
//===============================================================================//
function getPreRecTime(iCAMtype,iRecRate,iQuality)
{
//	alert("iCAMtype:"+iCAMtype + " iRecRateIdx:" +iRecRateIdx+ " iQualityIdx:"+iQuality);
	return(iRecRateArray[iCAMtype][iRecRate][iQuality]);
}


//20120502 Yabuta add start		accesslogにログを出力する
//HTMLのログをaccesslogに残す関数
function jsLogPrint(filename, funcname, value1, value2, value3, value4, value5)
{
	if(jsLOG == true)
	{
		//時刻の取得
		var Time	= new Date();
		var Year	= Time.getYear();						// 年
		var Month	= Time.getMonth()+1;					// 月
		var Day		= Time.getDate();						// 日
		var Hours	= Time.getHours();						// 時
		var Minutes	= Time.getMinutes();					// 分
		var Seconds	= Time.getSeconds();					// 秒
		var mSeconds= (Time.getTime() + "_").slice(-4,-1);	// ミリ秒
		
		Year = Year + 1900;
		if(Month < 10)
		{
			Month = "0" + Month;
		}
		if(Day < 10)
		{
			Day = "0" + Day;
		}
		if(Hours < 10)
		{
			Hours = "0" + Hours;
		}
		if(Minutes < 10)
		{
			Minutes = "0" + Minutes;
		}
		if(Seconds < 10)
		{
			Seconds = "0" + Seconds;
		}
		
		strTime = Year + "-" + Month + "-" + Day + "-" + Hours + ":" + Minutes + ":" + Seconds + ":" + mSeconds;
		
		var buff = strTime + "/" + filename + "/" + funcname + "/";	//filenameとfuncnameは必ずつけて本関数を使うのでデフォルトで出力
		var logBuffArray = new Array();
		
		//value1以降は本関数呼び出し時に設定されているときのみ出力させる
		if(value1)
		{
			buff = buff + value1 + "/";
		}
		if(value2)
		{
			buff = buff + value2 + "/";
		}
		if(value3)
		{
			buff = buff + value3 + "/";
		}
		if(value4)
		{
			buff = buff + value4 + "/";
		}
		if(value5)
		{
			buff = buff + value5 + "/";
		}
		
		if(!localStorage['logBuff'])
		{
			logBuffArray[0] = buff;
			localStorage['logBuff'] = JSON.stringify(logBuffArray);
		}
		else
		{
			logBuffArray = JSON.parse(localStorage['logBuff']);
			logBuffArray[logBuffArray.length] = buff;
			localStorage['logBuff'] = JSON.stringify(logBuffArray);
		}
	}
}
//20120502 Yabuta add end


//20120602 Yabuta add start
//履歴検索条件をlocalStorageに記憶させる関数
function saveSearchConf(pagenum, fromDate, toDate, conf, index, direction, pageType, FromDate, ToDate, FromNwDate, ToOdDate, max_flg, OverWriteNum, DivNo, HDDNo, ClsNo, ATNo, PTNo, PHNo)
{
	//引数がない場合はstorage消去(第二引数がnullかどうかで判断する)
	if(fromDate == null)
	{
		localStorage.removeItem("pagenum");
		localStorage.removeItem("fromDate");
		localStorage.removeItem("toDate");
		localStorage.removeItem("conf");
		localStorage.removeItem("index");
		localStorage.removeItem("direction");
		localStorage.removeItem("FromDate");
		localStorage.removeItem("ToDate");
		localStorage.removeItem("FromNwDate");
		localStorage.removeItem("ToOdDate");
		localStorage.removeItem("max_flg");
		localStorage.removeItem("OverWriteNum");
		localStorage.removeItem("DivNo");
		localStorage.removeItem("HDDNo");
		localStorage.removeItem("ClsNo");
		localStorage.removeItem("ATNo");
		localStorage.removeItem("PTNo");
		localStorage.removeItem("PHNo");
	}
	else
	{
		if(pagenum)
		{
			localStorage.pagenum = pagenum;
		}
		else
		{
			localStorage.pagenum = "";
		}
		
		if(fromDate)
		{
			localStorage.fromDate     = fromDate;
		}
		else
		{
			localStorage.fromDate     = "";
		}
		if(toDate)
		{
			localStorage.toDate       = toDate;
		}
		else
		{
			localStorage.toDate       = "";
		}
		if(conf)
		{
			localStorage.conf         = conf;
		}
		else
		{
			localStorage.conf         = "";
		}
		if(index)
		{
			localStorage.index        = index;
		}
		else
		{
			localStorage.index        = "";
		}
		if(direction)
		{
			localStorage.direction    = direction;
		}
		else
		{
			localStorage.direction    = "";
		}
		if(pageType)
		{
			localStorage.pageType = pageType;
		}
		else
		{
			localStorage.pageType = "";
		}
		if(ToDate)
		{
			localStorage.ToDate = ToDate;
		}
		else
		{
			localStorage.ToDate = "";
		}
		if(FromDate)
		{
			localStorage.FromDate = FromDate;
		}
		else
		{
			localStorage.FromDate = "";
		}
		if(FromNwDate)
		{
			localStorage.FromNwDate = FromNwDate;
		}
		else
		{
			localStorage.FromNwDate = "";
		}
		if(ToOdDate)
		{
			localStorage.ToOdDate = ToOdDate;
		}
		else
		{
			localStorage.ToOdDate = "";
		}
		if(max_flg)
		{
			localStorage.max_flg = max_flg;
		}
		else
		{
			localStorage.max_flg = "";
		}
		if(OverWriteNum)
		{
			localStorage.OverWriteNum = OverWriteNum;
		}
		else
		{
			localStorage.OverWriteNum = "";
		}
		if(DivNo)
		{
			localStorage.DivNo        = DivNo;
		}
		else
		{
			localStorage.DivNo        = "";
		}
		if(HDDNo)
		{
			localStorage.HDDNo        = HDDNo;
		}
		else
		{
			localStorage.HDDNo        = "";
		}
		if(ClsNo)
		{
			localStorage.ClsNo        = ClsNo;
		}
		else
		{
			localStorage.ClsNo        = "";
		}
		if(ATNo)
		{
			localStorage.ATNo         = ATNo;
		}
		else
		{
			localStorage.ATNo         = "";
		}
		if(PTNo)
		{
			localStorage.PTNo         = PTNo;
		}
		else
		{
			localStorage.PTNo         = "";
		}
		if(PHNo)
		{
			localStorage.PHNo         = PHNo;
		}
		else
		{
			localStorage.PHNo         = "";
		}
	}
}

/*---------------------------------------------------------*
 * rescueFocus
 * 初期フォーカスが当たらなかったときの救済処置
 *---------------------------------------------------------*/
var rescueFocusTimer;
var g_targetElement;
function rescueFocus(targetElement)
{
	consoleLogOutput(5,"DVR-99.js",arguments.callee.name,"IN(targetElement="+targetElement.id+")");
	
	//last_focus.idに値がある場合は正しくフォーカスが当たっているもしくはマウス操作でのfocusLostである。
	//マウス操作でのfocusLostはrevive_focusで行うためここでは処理を終了させる
	if(last_focus)
	{
		if(last_focus.id != null && last_focus.id != undefined && last_focus.id != "")
		{
			consoleLogOutput(4,"DVR-99.js",arguments.callee.name,"救済の必要なし(last_focus=" + last_focus.id + ")");
			return;
		}
	}
	
	//本関数の引数をsetInterval内の関数でも使用できるようにするためグローバル変数に格納する
	g_targetElement = targetElement;
	
	//フォーカスが当たり、救済処置が終わるまで処理を繰り返す　→　setIntervalを使用する
	rescueFocusTimer = setInterval(function()
	{
		if(g_targetElement != null && g_targetElement != undefined && g_targetElement != "")
		{
			g_targetElement.focus();
			last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
			consoleLogOutput(2,"DVR-99.js",arguments.callee.name,"フォーカスロスト救済完了" + last_focus.id);
			clearInterval(rescueFocusTimer);
			return;
		}
	},500);
}




/*---------------------------------------------------------*
 * errOutput
 * try-catch文でエラーを検出したときにエラー内容を出力する
 *---------------------------------------------------------*/
function errOutput(err)
{
	//時刻の取得
	var Time	= new Date();
	var Year	= Time.getYear();						// 年
	var Month	= Time.getMonth()+1;					// 月
	var Day		= Time.getDate();						// 日
	var Hours	= Time.getHours();						// 時
	var Minutes	= Time.getMinutes();					// 分
	var Seconds	= Time.getSeconds();					// 秒
	var mSeconds= (Time.getTime() + "_").slice(-4,-1);	// ミリ秒
	
	Year = Year + 1900;
	if(Month < 10)
	{
		Month = "0" + Month;
	}
	if(Day < 10)
	{
		Day = "0" + Day;
	}
	if(Hours < 10)
	{
		Hours = "0" + Hours;
	}
	if(Minutes < 10)
	{
		Minutes = "0" + Minutes;
	}
	if(Seconds < 10)
	{
		Seconds = "0" + Seconds;
	}
	
	var strTime = Year + "/" + Month + "/" + Day + "-" + Hours + ":" + Minutes + ":" + Seconds + "." + mSeconds;
	if(arguments.callee.caller.name != "consoleLogOutput")
	{
		var string = strTime + "  " + arguments.callee.caller.name + " of " + arguments.callee.caller.caller.name + " catchError";
		//alert(string);
	}
}

/*---------------------------------------------------------*
 * showBackGround
 * 背景色の表示非表示
 *---------------------------------------------------------*/
function showBackGround(showflg){
//======画面にかけるカバーの作成=====
	consoleLogOutput(5,"DVR-99.js",arguments.callee.name,""+showflg);
	var popUp = document.getElementById("DVR");
	if( popUp == null ){
		popUp			= document.createElement("div") ;
		popUp.id		= "DVR";
		popUp.className	= "DVR";
		document.body.appendChild(popUp);
	}
	popUp = document.getElementById("DVR-99-02-01css");
	if(popUp == null){
		popUp			= document.createElement("style") ;
		popUp.id		= "DVR-99-02-01css";
		popUp.className	= "DVR-99-02-01css";
		document.head.appendChild(popUp);
	}
//======画面にかけるカバーのスタイル=====
	var mFlag=mainMenucreate();
	if(mFlag==0){
		document.getElementById("DVR-99-02-01css").href="../DVR-99/DVR-99-02-01-VGA.css";
	}else if(mFlag==3){
		document.getElementById("DVR-99-02-01css").href="../DVR-99/DVR-99-02-01-VGA-BIG.css";
	}else if(mFlag==2){
		document.getElementById("DVR-99-02-01css").href="../DVR-99/DVR-99-02-01-BIG.css";
	}else{
		document.getElementById("DVR-99-02-01css").href="../DVR-99/DVR-99-02-01.css";
	}
//======表示非表示の切り替え=====
	if(showflg){
		document.getElementById("DVR").style.display = "block";
	}else{
		document.getElementById("DVR").style.display = "none";
	}
}

/*---------------------------------------------------------*
 * backhome
 * 取消ボタン押下
 *---------------------------------------------------------*/
//取消
function backhome(msg){

	// operating flag
	if( operating99 == true )
	{
		return;
	}
	if(!DispWebViewPopFlg){
		consoleLogOutput(9,"DVR-99.js",arguments.callee.name,"IN");
		DispWebViewPopFlg = true;
		//showBackGround(true);
		if(!msg){
			msg = "処理を中断します。\nよろしいですか？";
		}
		DispWebView.ShowBackHomeDlg(msg);
	}
}
/*---------------------------------------------------------*
 * closeBackHome
 * 取消押下
 *---------------------------------------------------------*/
function closeBackHome(focusid,backflg){
	consoleLogOutput(7,"DVR-99.js",arguments.callee.name,"IN:" + DispWebViewPopFlg);
	if(DispWebViewPopFlg){
		consoleLogOutput(9,"DVR-99.js",arguments.callee.name,"IN");
		var keycode = event.keyCode;
		switch(keycode)
		{
			case 89: // Yキー押下でトップメニューを表示する
				dispInputEventStop();
				DispWebViewPopFlg = false;
				// 処理前にCSSの切換
				showBackGround(false);
				if(backflg == 2){//2:doIt関数から戻る
					doIt("ok");
				} else if(backflg == 1){//1:パラメータを削除して戻る
					// 前画面に戻る前に本画面で使用したパラメータを削除する
					backServerForDelParam(1, null, removeParam);
				}else{//0:戻る
					backServer();
				}
				break;
			case 78: // Nキー押下で「取消」ボタンにフォーカスする
				DispWebViewPopFlg = false;
				document.getElementById(focusid).focus();
				showBackGround(false);
				consoleLogOutput(9,"DVR-99.js",arguments.callee.name,"OUT");
				break;
		}
	}
}

//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
//★★			ここより下はDISP様提供関数(DispWebView)					★★
//★★			Chrome使用時にはここでエラーが出ます。					★★
//★★			dispWebViewFlagに"Active"以外の値を設定することで		★★
//★★			一律で関数を無効化できるのでChromeデバッグ時に			★★
//★★			使用して下さい。										★★
//★★			(リリース時は必ず"Active"にすること！！！！)			★★
//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★


var dispWebViewFlag = "Active";


/*---------------------------------------------------------*
 * DispWebViewLogStop
 * DispWebView(ログ出力)を無効化する
 *	(有効化するまで無効になったままになるので注意！)
 *---------------------------------------------------------*/
function DispWebViewLogStop()
{
	localStorage.logStop = "Stop";
}

/*---------------------------------------------------------*
 * DispWebViewLogStart
 * DispWebView(ログ出力)を有効化する
 *---------------------------------------------------------*/
function DispWebViewLogStart()
{
	if(localStorage.logStop)
	{
		localStorage.removeItem("logStop");
	}
}

/*---------------------------------------------------------*
 * consoleLogOutput
 * コンソール上にログを出力する(LOGレベルつき)
 *---------------------------------------------------------*/

var consoleLogLevel = 6;

//consoleLogLevel->Levelが高いほど情報量は多くなる
//ログを組み込む人、デバッグする人は下記に従ってLevelを設定すること
//0:ログの出力無し
//1:重大なエラーなど、絶対に出力したいもののみ出力(赤ログに相当。異常系処理時に使う)
//2〜3:Warningレベル、正常系だが重要な情報もしくは準正常系の処理に入ったときに使う
//4〜6:開発者個々人ではなく、全員が知っておいた方がデバッグが捗る情報
//7〜9:開発者個々人で自由に埋め込んだログ
function consoleLogOutput(level,filename,funcname,string,v1,v2,v3,v4,v5,v6,v7,v8,v9,v10) {
	try
	{
		if(level <= consoleLogLevel && dispWebViewFlag == "Active")
		{
			var info;
			switch(level)
			{
				case 1:
					info = "[-E-]";//Error
					break;
				case 2:
				case 3:
					info = "[-W-]";//Warning
					break;
				case 4:
				case 5:
				case 6:
					info = "[-I-]";//Infomation
					break;
				case 7:
				case 8:
				case 9:
					info = "[-F-]";//Free
					break;
				default:
					info = "[-U-]";//Unknown
					break;
			}
			var v = "";
			if(v1)
			{
				v = " Value[" + v1 + "]";
				if(v2)
				{
					v = v + "[" + v2 + "]";
					if(v3)
					{
						v = v + "[" + v3 + "]";
						if(v4)
						{
							v = v + "[" + v4 + "]";
							if(v5)
							{
								v = v + "[" + v5 + "]";
								if(v6)
								{
									v = v + "[" + v6 + "]";
									if(v7)
									{
										v = v + "[" + v7 + "]";
										if(v8)
										{
											v = v + "[" + v8 + "]";
											if(v9)
											{
												v = v + "[" + v9 + "]";
												if(v10)
												{
													v = v + "[" + v10 + "]";
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if(arguments.callee.caller.caller)
			{
				var buff = info + filename + " | " + funcname + " | " + string + v + " @@ CallFrom:" + arguments.callee.caller.caller.name;	//filenameとfuncnameは必ずつけて本関数を使うのでデフォルトで出力
			}
			else
			{
				var buff = info + filename + " | " + funcname + " | " + string + v;	//filenameとfuncnameは必ずつけて本関数を使うのでデフォルトで出力
			}
			if(!localStorage.logStop)
			{
				DispWebView.debugConsoleOutput(buff);
			}
		}
	}
	catch(e)
	{
		errOutput(e);
	}
}


/*---------------------------------------------------------*
 * dispSetVisibleSystemTime
 * 日時の表示を制御する
 *---------------------------------------------------------*/
function dispSetVisibleSystemTime(enable) {
	consoleLogOutput(1,"DVR-99.js",arguments.callee.name,"$#$ 日時表示を制御 enable=" + enable);
	if(enable)
	{
		DispWebView.setVisibleSystemTime(true);
	}
	else
	{
		DispWebView.setVisibleSystemTime(false);
	}
}

/*---------------------------------------------------------*
 * dispSetGrayOverlay
 * 灰色オーバレイの設定・解除を行う
 *---------------------------------------------------------*/
function dispSetGrayOverlay(enable) {
	if(enable)
	{
		DispWebView.setGrayOverlay(true);
	}
	else
	{
		DispWebView.setGrayOverlay(false);
	}
}

/*---------------------------------------------------------*
 * dispDrawStop
 * 画面の描画を止める
 *---------------------------------------------------------*/
function dispDrawStop(string) {
	try
	{
		if(dispWebViewFlag == "Active")
		{
			DispWebView.DisableUpdateDrawing_woDialog();
			consoleLogOutput(5,"DVR-99.js",arguments.callee.name,"描画停止(popupなし)");
		}
	}
	catch(e)
	{
		errOutput(e);
	}
}

/*---------------------------------------------------------*
 * dispDrawStop
 * 画面の描画を止める(文言指定)
 *---------------------------------------------------------*/
function dispDrawStopWithText(string) {
	try
	{
		if(dispWebViewFlag == "Active")
		{
			DispWebView.DisableUpdateDrawing(string);
			consoleLogOutput(5,"DVR-99.js",arguments.callee.name,"描画停止(文言指定)" + string);
		}
	}
	catch(e)
	{
		errOutput(e);
	}
}

/*---------------------------------------------------------*
 * dispDrawStop
 * 画面の描画を止める(しばおまpopupなし)
 *---------------------------------------------------------*/
function dispDrawStopNonPopup() {
	try
	{
		if(dispWebViewFlag == "Active")
		{
			DispWebView.DisableUpdateDrawing_woDialog();
			consoleLogOutput(5,"DVR-99.js",arguments.callee.name,"描画停止(popupなし)");
		}
	}
	catch(e)
	{
		errOutput(e);
	}
}

/*---------------------------------------------------------*
 * dispDrawStart
 * 画面の描画を開始する
 *---------------------------------------------------------*/
function dispDrawStart() {
	try
	{
		if(dispWebViewFlag == "Active")
		{
			if((document.activeElement) && (document.activeElement.id != null) && (document.activeElement.id != "") && (document.activeElement.id != "undefined"))
			{
				//last_focus = document.activeElement;
				//last_focus.blur();
				//setTimeout(function(){last_focus.focus();},50);
				last_focus = document.activeElement;
				var last_focus_id = document.activeElement.id;
				document.activeElement.blur();
				//document.getElementById(last_focus_id).focus();
				setTimeout(function(){document.getElementById(last_focus_id).focus();},50);
			}
			DispWebView.EnableUpdateDrawing();
			consoleLogOutput(5,"DVR-99.js",arguments.callee.name,"描画再開");
		}
	}
	catch(e)
	{
		errOutput(e);
	}
}

/*---------------------------------------------------------*
 * dispDrawStart
 * 画面の描画を開始する(フォーカス再設定なし)
 *---------------------------------------------------------*/
function dispDrawStartNoFocus() {
	try
	{
		DispWebView.EnableUpdateDrawing();
		consoleLogOutput(5,"DVR-99.js",arguments.callee.name,"描画再開(focusなし)");
	}
	catch(e)
	{
		errOutput(e);
	}
}

/*---------------------------------------------------------*
 * dispDrawStop
 * 画面の描画を開始する(しばおまpopupなし)
 *---------------------------------------------------------*/
function dispDrawStartNonPopup() {
	try
	{
		if(dispWebViewFlag == "Active")
		{
			DispWebView.EnableUpdateDrawing_woDialog();
			consoleLogOutput(5,"DVR-99.js",arguments.callee.name,"描画再開(popupなし)");
		}
	}
	catch(e)
	{
		errOutput(e);
	}
}

/*---------------------------------------------------------*
 * dispInputEventStop
 * 入力イベントを止める
 *---------------------------------------------------------*/
function dispInputEventStop() {
	try
	{
		if(dispWebViewFlag == "Active")
		{
			DispWebView.DisableInputEvent();
			consoleLogOutput(5,"DVR-99.js",arguments.callee.name,"入力イベント停止");
		}
	}
	catch(e)
	{
		errOutput(e);
	}
}

/*---------------------------------------------------------*
 * dispInputEventStart
 * 入力イベントを開始する
 *---------------------------------------------------------*/
function dispInputEventStart() {
	try
	{
		if(dispWebViewFlag == "Active")
		{
			DispWebView.EnableInputEvent();
			consoleLogOutput(5,"DVR-99.js",arguments.callee.name,"入力イベント再開");
		}
	}
	catch(e)
	{
		errOutput(e);
	}
}


/*---------------------------------------------------------*
 * dispDrawStopW_lapper
 * 特定条件下で画面の描画を止める
 *---------------------------------------------------------*/
function dispDrawStopW_lapper(event_ID)
{
	try
	{
		if(dispWebViewFlag == "Active")
		{
			consoleLogOutput(5,"DVR-99.js",arguments.callee.name,"event_ID:" + event_ID);
			switch(event_ID)
			{
				case 1://操作メニュー→再生画面への戻り時のオートジャンプ
					if(!localStorage.playFlag)
					{
						dispDrawStopNonPopup();
					}
					break;
				case 2://詳細記録設定画面用
					if(localStorage.focusIdAfterReload)
					{
						dispDrawStopNonPopup();
					}
					else
					{
						dispDrawStop();
					}
					break;
				default:
					break;
			}
		}
	}
	catch(e)
	{
		errOutput(e);
	}
}

/*---------------------------------------------------------*
 * 詳細記録設定用 確認ボタンダイアログ表示
 * #13346 詳細記録設定画面のポップアップ Widget化の対応
 *---------------------------------------------------------*/
function dispShowDetailRecOkDlg(msg){
	consoleLogOutput(9,"DVR-99.js",arguments.callee.name,"IN");
	if(!msg){
		msg = "処理を中断します。\nよろしいですか？";
	}
	DispWebView.ShowDetailRecOkDlg(msg);
}

/*---------------------------------------------------------*
 * 詳細記録設定用 戻るボタンダイアログ表示
 * #13346 詳細記録設定画面のポップアップ Widget化の対応
 *---------------------------------------------------------*/
function dispShowDetailRecBackDlg(msg){
	consoleLogOutput(9,"DVR-99.js",arguments.callee.name,"IN");
	if(!msg){
		msg = "処理を中断します。\nよろしいですか？";
	}
	DispWebView.ShowDetailRecBackDlg(msg);
}

/*---------------------------------------------------------*
 * 詳細記録設定用 文字列が多いとき用のダイアログ表示
 * #13346 詳細記録設定画面のポップアップ Widget化の対応
 *---------------------------------------------------------*/
function dispShowDetailRecBackBigDlg(msg){
	consoleLogOutput(9,"DVR-99.js",arguments.callee.name,"IN");
	if(!msg){
		msg = "処理を中断します。\nよろしいですか？";
	}
	DispWebView.ShowDetailRecBackBigDlg(msg);
}

/*---------------------------------------------------------*
 * 詳細記録設定用 文字列が多いとき用のダイアログ表示
 *---------------------------------------------------------*/
function dispShowDetailRecOKBigDlg(msg){
	consoleLogOutput(9,"DVR-99.js",arguments.callee.name,"IN");
	if(!msg){
		msg = "処理を中断します。\nよろしいですか？";
	}
	DispWebView.ShowDetailRecOkBigDlg(msg);
}


/*---------------------------------------------------------*
 * dispConsoleOutput
 * コンソール上にログを出力する
 *　　→ 新規にログを埋める時はconsoleLogOutputを使用して下さい
 *---------------------------------------------------------*/
function dispConsoleOutput(filename,funcname,string) {
	try
	{
		if(dispWebViewFlag == "Active")
		{
			if(consoleDebugMode == true)
			{
				var buff = filename + " | " + funcname + " | " + string;	//filenameとfuncnameは必ずつけて本関数を使うのでデフォルトで出力
				DispWebView.debugConsoleOutput(buff);
			}
		}
	}
	catch(e)
	{
		errOutput(e);
	}
}

//--------------------------------------------------
// 特殊文字のエスケープ処理
//--------------------------------------------------
function escapeHTML( text )
{
    var replacement = function( word )
    {
        var characterReference =
        {
            '"':'&quot;',
            '&':'&amp;',
            '\'':'&#39;',
            '<':'&lt;',
            '>':'&gt;'
        };

        return characterReference[ word ];
    };

    return text.replace( /"|&|'|<|>/g, replacement );
}

var last_object = null;
function setLastObject()
{
	var active_object = document.activeElement;
	if (!(active_object == null || active_object.nodeName == "BODY"))
	{
		if (active_object.getAttribute('ID').length > 0)
		{
			last_object = active_object;
		}
	}
}

document.onmousemove = function() {
    setLastObject();
}

document.onmousedown = function() {
    setLastObject();
}

document.onkeydown = function() {
    setLastObject();
}

document.onclick = onMouseLeftClick;
function onMouseLeftClick()
{
	setLastObject();
	if (last_object != null)
	{
		top.rightpage.document.getElementById(last_object.getAttribute("id")).focus();
	}
}

document.onselectstart = onMouseSelectStart;
function onMouseSelectStart()
{
    if (document.selection.type != "None") {
		setLastObject();
		if (last_object != null)
		{
			top.rightpage.document.getElementById(last_object.getAttribute("id")).focus();
		}
	}
}

/*---------------------------------------------------------*
 * resizeOverErrPopup
 * ポップアップリサイズ
 * (記録負荷が100%を超えてポップアップの高の再設定)
 *---------------------------------------------------------*/
function resizeOverErrPopup(screenFlag, num)
{
	if(screenFlag == 3)  // IX
	{
		// ポップアップ大枠
		Spry.$('DVR_popUp').style.top = (130 - 7 * num) + 'px';

		// ポップアップメイン
		Spry.$('DVR99-02-01_main').style.height  = (178 + 16 * num) + 'px';

		// ポップアップボーダー
		Spry.$('DVR99-02-01_border').style.height  = (180 + 16 * num) + 'px';	
	}
	else if(screenFlag == 0) // NTSC
	{
		// ポップアップ大枠
		Spry.$('DVR_popUp').style.top = (155 - 7 * num) + 'px';

		// ポップアップメイン
		Spry.$('DVR99-02-01_main').style.height  = (145 + 15 * num) + 'px';

		// ポップアップボーダー
		Spry.$('DVR99-02-01_border').style.height  = (147 + 15 * num) + 'px';	
	}
	else if(screenFlag == 2) // 16:9
	{
		// ポップアップ大枠
		Spry.$('DVR_popUp').style.top = (260 - 9 * num) + 'px';

		// ポップアップメイン
		Spry.$('DVR99-02-01_main').style.height  = (172 + 14 * num) + 'px';

		// ポップアップボーダー
		Spry.$('DVR99-02-01_border').style.height  = (176 + 14 * num) + 'px';	
	}
	else // 4:3
	{
		// ポップアップ大枠
		Spry.$('DVR_popUp').style.top = (260 - 7 * num) + 'px';

		// ポップアップメイン
		Spry.$('DVR99-02-01_main').style.height  = (163 + 14 * num) + 'px';

		// ポップアップボーダー
		Spry.$('DVR99-02-01_border').style.height  = (169 + 14 * num) + 'px';	
	}
}

var LocalStorageKeyList = new Array
	(
		"ajNOW",
		"pageId",
		"superAutoJump",
		"CameraRecId",
		"MachineId",
		"CameraType",
		"Layout",
		"NVRIP",
		"numcnt",
		"pagenum0104",
		"Search_Sensitivity",
		"Search_saisei",
		"Search_Interval",
		"SearchCameraList",
		"safevalue",
		"dsplimited",
		"monitorChange",
		"YesNoFlg",
		"monitorDevice",
		"selectedDevice",
		"monitorSize",
		"pintBackFlg",
		"before_rate",
		"before_sound",
		"focusIdAfterReload",
		"selectValueAfterReload",
		"selectIdAfterReload",
		"pageType",
		"yoyakuCopy",
		"shibaomahidflg",
		"menustatus",
		"menuChange",
		"stopProcess",
		"zoomPercent",
		"arcCenter",
		"logBuff",
		"fromyear",
		"frommonth",
		"fromday",
		"fromhour",
		"fromminite",
		"fromsecond",
		"toyear",
		"tomonth",
		"today",
		"tohour",
		"tominite",
		"tosecond"
	);

/*---------------------------------------------------------*
 * GetLocalStorageValue
 * #25397対応で、デジアナ切替時、本画面の有効なlocalStorage
 * の値を取得する（本画面は切替元時）
 *---------------------------------------------------------*/
function GetLocalStorageValue()
{
	// 本画面のローカルストレージに指定アイテムの値を設定
	var arrLen = LocalStorageKeyList.length;
	var arrIdx;
	var arrVal;
	for(arrIdx = 0; arrIdx < arrLen; arrIdx++) {
		arrVal = localStorage.getItem(LocalStorageKeyList[arrIdx]);
		// キーに対して、値があれば、DispWebViewへ保存する
		if(arrVal !== null)
		{
			DispWebView.GetLocalStorageValFromJS(LocalStorageKeyList[arrIdx], arrVal);
		}
	}
}

/*---------------------------------------------------------*
 * ClaerLocalStorageFromAnother
 * #25397対応で、デジアナ切替時、本画面の有効なlocalStorage
 * をクリア（本画面は切替先時）
 *---------------------------------------------------------*/
function ClaerLocalStorageFromAnother()
{
	// 本画面のローカルストレージに指定アイテムの値をクリア
	var arrLen = LocalStorageKeyList.length;
	var arrIdx;
	var arrVal;
	for(arrIdx = 0; arrIdx < arrLen; arrIdx++) {
		arrVal = localStorage.getItem(LocalStorageKeyList[arrIdx]);
		// キーに対して、値があれば、削除する
		if(arrVal !== null)
		{
			localStorage.removeItem(LocalStorageKeyList[arrIdx]);
		}
	}
}

/*---------------------------------------------------------*
 * SetLocalStorageFromAnother
 * #25397対応で、デジアナ切替時、本画面の有効なlocalStorage
 * を設定する（本画面は切替先時）
 *---------------------------------------------------------*/
function SetLocalStorageFromAnother(itemKey, itemVal)
{
	// 本画面のローカルストレージに指定アイテムの値を設定
	localStorage.setItem(itemKey, itemVal);
}

var sysStats = new Spry.Data.XMLDataSet(null, "Result");
var doReStartFunc = null;
var doReStartNGFocus = null;
var doReStartNGFunc = null;

/* #26123 画面で再起動操作時に、先にシステム状態のコピー状態を判断する
 * doFunction	: 画面再起動操作の関数
 * p1			: パラメータ（設定失敗後フォーカス対象）
 * p2			: パラメータ（設定失敗後実施関数）
 */
function DoAfterCheckCopyStats(doFunction, p1, p2) {
	doReStartFunc = doFunction;
	doReStartNGFocus = p1;
	doReStartNGFunc = p2;

	sysStats.setURL(gUrl + "/cgi-bin/DVR-99-01-12.cgi");
	sysStats.useCache = false;
	sysStats.loadData();
}

// コールバック関数の登録処理を行う
addSpryDataSetObserver(sysStats, ComCheckCopyStats, OBSERVER_HINT_MODE_INIT);

// システム状態のコピー状態をチェックして、再起動操作ができるかを判断する
function ComCheckCopyStats(notificationType, dataSet, dat) {
	if (notificationType == "onPostLoad") {
		var tmpData = dataSet.getData();
		consoleLogOutput(5,"DVR-99.js",arguments.callee.name,"コピー状態(0:コピー中以外、1:コピー中)=" + tmpData[0]["Success"]);
		// 画像コピー中じゃないから、再起動操作ができます
		if(tmpData[0]["Success"] == "0")
		{
			doReStartFunc();
			return;
		}

		// コピー中なので、設定不可
		var PopUp = new actionPop(gettext("COPYING_RESETNG"),1,"戻る","");
		PopUp.addObserver(doReStartNGFunc);
		PopUp.show(doReStartNGFocus);
	}
}

