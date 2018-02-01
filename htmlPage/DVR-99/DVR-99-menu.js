/*-------------------------------------------
	2012.09.07 Yabuta
	メインメニュー作成専用Javascript
-------------------------------------------*/
var THISFILENAME	= "DVR-99-menu.js";
var COLORGRAY		= "#536675";		
var COLORLIGHTBLUE	= "#55A5CD";		//メニューを開いたときの背景の色
var COLORLIGHTGRAY	= "#506473";		//メニューを開いたときのフォーカスの色
var COLORDARKGRAY	= "#363636";		//背景の色
var COLORWHITE		= "#FFFFFF";		//文字の色


//------------------------------------------イベントマトリクスの定義----------------------------------------------//
//focusID,決定キー押下時のイベント,取消キー押下時のイベント
//以下の順番で配列でセットする
//0.ID
//1.画面の表示有無(有効無効)
//2.上キー押下時のイベント
//3.下キー押下時のイベント
//4.確定キー押下時のイベント
//5.取消キー押下時のイベント
//6.確定キー押下時の飛び先URL
//7.CNVでアクセスしたときのアクセス先コンテンツ
//8.デカ文字用コンテンツ
//9.どの権限のときに表示させるか(1:権限1のみ表示〜3:権限3まで表示、0:セコム保守時のみ表示、9:常に表示、-1:常に非表示)
////旧TOP画面のIDとの紐付(コメント部分)
//----------------------------------------------------------------------------------------------------------------//

var eventMtx = new Array
	(
		//検索
		new Array("検索"				,"有効"	,none		,focusDown	,menuOpen_Close		,backToLive1st,	"大項目",													"大項目",			"大項目",														9),		//00
		new Array("時間検索"			,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-01-01-00/DVR-01-01-00.html?Menu=1_01&screenFlag=",	"自機器コンテンツ",	"../DVR-01-01-00/DVR-01-01-00-BIG.html?Menu=1_01&screenFlag=",	3),		//01
		new Array("イベント検索"		,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-01-02-00/DVR-01-02-00.html?Menu=1_02&screenFlag=",	"自機器コンテンツ",	null,															3),		//02
		new Array("サムネイル検索"		,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-01-03-00/DVR-01-03-00.html?Menu=1_03&screenFlag=",	"自機器コンテンツ",	null,															3),		//03
		new Array("画像変化検索"		,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-01-04-00/DVR-01-04-00.html?Menu=1_04&screenFlag=",	"自機器コンテンツ",	null,															3),		//04
		new Array("マルチ再生"			,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-01-05-00/DVR-01-05-00.html?Menu=1_05&screenFlag=",	"自機器コンテンツ",	null,															3),		//05
		new Array("コピー状態確認"		,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-01-06-00/DVR-01-06-00.html?Menu=1_06&screenFlag=",	null,				null,															3),		//06
		new Array("画像コピー"			,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-01-07-02/DVR-01-07-02.html?Menu=1_07&screenFlag=",	null,				null,															3),		//07
		new Array("ダイレクトコピー"	,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-01-08-02/DVR-01-08-02.html?Menu=1_08&screenFlag=",	null,				null,															3),		//08
		new Array("画像ダウンロード"	,"無効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-01-09-02/DVR-01-09-02.html?Menu=1_09&screenFlag=",	null,				null,															-1),	//09(#23877)センター再生・画像DLの対応不要
		new Array("予約コピー"			,"無効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-01-10-02/DVR-01-10-02.html?Menu=1_10&screenFlag=",	null,				null,															3),		//10
		//設定
		new Array("設定"				,"有効"	,focusUp	,focusDown	,menuOpen_Close		,backToLive1st,	"大項目",													"大項目",			"大項目",														9),		//11
		new Array("機器構成設定"		,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-02-01-00/DVR-02-01-00.html?Menu=2_12&screenFlag=",	"自機器コンテンツ",	null,															1),		//12
		new Array("ネットワーク設定"	,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-02-02-00/DVR-02-02-00.html?Menu=2_13&screenFlag=",	null,				"../DVR-02-02-00/DVR-02-02-00-BIG.html?Menu=2_13&screenFlag=",	1),		//13
		new Array("VPN接続状態確認"		,"無効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-02-03-00/DVR-02-03-00.html?Menu=2_14&screenFlag=",	null,				"../DVR-02-03-00/DVR-02-03-00.html?Menu=2_14&screenFlag=",		1),		//14
		new Array("時刻設定"			,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-02-04-00/DVR-02-04-00.html?Menu=2_15&screenFlag=",	"NVRコンテンツ",	"../DVR-02-04-00/DVR-02-04-00-BIG.html?Menu=2_15&screenFlag=",	1),		//15
		new Array("認証設定"			,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-02-05-00/DVR-02-05-00.html?Menu=2_16&screenFlag=",	"NVRコンテンツ",	null,															1),		//16
		new Array("HDD運用設定"			,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-02-06-00/DVR-02-06-00.html?Menu=2_17&screenFlag=",	"NVRコンテンツ",	"../DVR-02-06-00/DVR-02-06-00-BIG.html?Menu=2_17&screenFlag=",	1),		//17
		new Array("名称設定"			,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-02-07-00/DVR-02-07-00.html?Menu=2_18&screenFlag=",	"自機器コンテンツ",	null,															1),		//18
		new Array("レイアウト設定"		,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-02-08-00/DVR-02-08-00.html?Menu=2_19&screenFlag=",	"NVRコンテンツ",	null,															1),		//19
		new Array("モニター設定"		,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-02-09-00/DVR-02-09-00.html?Menu=2_20&screenFlag=",	"NVRコンテンツ",	"../DVR-02-09-00/DVR-02-09-00.html?Menu=2_20&screenFlag=",		1),		//20
		new Array("カメラ設定"			,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-02-10-00/DVR-02-10-00.html?Menu=2_21&screenFlag=",	"自機器コンテンツ",	"../DVR-02-10-00/DVR-02-10-00-BIG.html?Menu=2_21&screenFlag=",	1),		//21
		new Array("接点入出力設定"		,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-02-11-00/DVR-02-11-00.html?Menu=2_22&screenFlag=",	"NVRコンテンツ",	"../DVR-02-11-00/DVR-02-11-00.html?Menu=2_22&screenFlag=",		1),		//22
		new Array("簡単記録設定"		,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-02-12-00/DVR-02-12-00.html?Menu=2_23&screenFlag=",	"NVRコンテンツ",	"../DVR-02-12-00/DVR-02-12-00.html?Menu=2_23&screenFlag=",		1),		//23
		new Array("詳細記録設定"		,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-02-13-00/DVR-02-13-00.html?Menu=2_24&screenFlag=",	"NVRコンテンツ",	"../DVR-02-13-00/DVR-02-13-00.html?Menu=2_24&screenFlag=",		1),		//24
		new Array("特定日記録設定"		,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-02-14-00/DVR-02-14-00.html?Menu=2_25&screenFlag=",	"NVRコンテンツ",	"../DVR-02-14-00/DVR-02-14-00.html?Menu=2_25&screenFlag=",		1),		//25
		new Array("記録設定確認"		,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-02-15-00/DVR-02-15-00.html?Menu=2_26&screenFlag=",	"NVRコンテンツ",	"../DVR-02-15-00/DVR-02-15-00.html?Menu=2_26&screenFlag=",		1),		//26
		new Array("記録負荷確認"		,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-02-16-00/DVR-02-16-00.html?Menu=2_27&screenFlag=",	"NVRコンテンツ",	"../DVR-02-16-00/DVR-02-16-00.html?Menu=2_27&screenFlag=",		1),		//27
		new Array("記録状態確認"		,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-02-17-00/DVR-02-17-00.html?Menu=2_28&screenFlag=",	"NVRコンテンツ",	"../DVR-02-17-00/DVR-02-17-00.html?Menu=2_28&screenFlag=",		1),		//28
		//履歴
		new Array("履歴"				,"有効"	,focusUp	,focusDown	,menuOpen_Close		,backToLive1st,	"大項目",													"大項目",			"大項目",														9),		//29
		new Array("異常履歴"			,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-03-05-00/DVR-03-05-00.html?Menu=3_30&screenFlag=",	"NVRコンテンツ",	"../DVR-03-05-00/DVR-03-05-00-BIG.html?Menu=3_30&screenFlag=",	3),		//30
		new Array("接点入出力履歴"		,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-03-05-00/DVR-03-05-00.html?Menu=3_31&screenFlag=",	"NVRコンテンツ",	"../DVR-03-05-00/DVR-03-05-00-BIG.html?Menu=3_31&screenFlag=",	3),		//31
		new Array("記録履歴"			,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-03-05-00/DVR-03-05-00.html?Menu=3_32&screenFlag=",	"NVRコンテンツ",	"../DVR-03-05-00/DVR-03-05-00-BIG.html?Menu=3_32&screenFlag=",	3),		//32
		new Array("操作履歴"			,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-03-05-00/DVR-03-05-00.html?Menu=3_33&screenFlag=",	"NVRコンテンツ",	"../DVR-03-05-00/DVR-03-05-00-BIG.html?Menu=3_33&screenFlag=",	3),		//33
		new Array("メニュー操作履歴"	,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-03-05-00/DVR-03-05-00.html?Menu=3_34&screenFlag=",	"NVRコンテンツ",	"../DVR-03-05-00/DVR-03-05-00-BIG.html?Menu=3_34&screenFlag=",	3),		//34
		new Array("履歴保存"			,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-03-06-00/DVR-03-06-00.html?Menu=3_35&screenFlag=",	null,				null,															3),		//35
		//保守
		new Array("保守"				,"有効"	,focusUp	,focusDown	,menuOpen_Close		,backToLive1st,	"大項目",													"大項目",			"大項目",														9),		//36
		new Array("HDD保守"				,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-04-01-00/DVR-04-01-00.html?Menu=4_37&screenFlag=",	null,				"../DVR-04-01-00/DVR-04-01-00.html?Menu=4_37&screenFlag=",		2),		//37
		new Array("ピント調整モード"	,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-04-02-00/DVR-04-02-00.html?Menu=4_38&screenFlag=",	"自機器コンテンツ",	null,															2),		//38
		new Array("記録・再生管理"		,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-04-03-00/DVR-04-03-00.html?Menu=4_39&screenFlag=",	null,				null,															2),		//39
		new Array("システム停止"		,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-04-05-00/DVR-04-05-00.html?Menu=4_41&screenFlag=",	null,				null,															2),		//40
		new Array("リモート接続"		,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-04-06-00/DVR-04-06-00.html?Menu=4_42&screenFlag=",	null,				"../DVR-04-06-00/DVR-04-06-00.html?Menu=4_42&screenFlag=",		2),		//41
		new Array("NTSC出力"			,"無効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"NTSC出力",													"Widget",			"NTSC出力",														2),		//42
		new Array("設定保存・読込"		,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-04-08-00/DVR-04-08-00.html?Menu=4_44&screenFlag=",	null,				null,															2),		//43
		new Array("初期化"				,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-04-09-00/DVR-04-09-00.html?Menu=4_45&screenFlag=",	null,				null,															2),		//44
		new Array("バージョンアップ"	,"有効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-04-10-00/DVR-04-10-00.html?Menu=4_46&screenFlag=",	null,				"../DVR-04-10-00/DVR-04-10-00.html?Menu=4_46&screenFlag=",		2),		//45
		new Array("LANテスト"			,"無効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-04-11-00/DVR-04-11-00.html?Menu=4_47&screenFlag=",	null,				null,															2),		//46
		new Array("HDD詳細"				,"無効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-04-12-00/DVR-04-12-00.html?Menu=4_48&screenFlag=",	null,				null,															2),		//47
		new Array("機器異常詳細設定"	,"無効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-04-13-00/DVR-04-13-00.html?Menu=4_49&screenFlag=",	null,				null,															0),		//48
		new Array("温度履歴"			,"無効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-04-15-00/DVR-04-15-00.html?Menu=4_50&screenFlag=",	null,				null,															0),		//49
		new Array("その他"				,"無効"	,focusUp	,focusDown	,getIPandNextPage	,backToLive1st,	"../DVR-04-16-00/DVR-04-16-00.html?Menu=4_51&screenFlag=",	null,				null,															0),		//50
		new Array("戻る"				,"有効"	,focusUp	,none		,backToLive1st		,backToLive1st,	"大項目",													"大項目",			"大項目",														9),		//51
		// #24478対応で、デカ文字時、遷移先のURLを「null」から「../DVR-02-10-31/DVR-02-10-31.html?screenFlag=」へ修正
		new Array("カメラ接続失敗"		,"無効"	,none		,none		,none				,none,			"../DVR-02-10-31/DVR-02-10-31.html?screenFlag=",			"自機器コンテンツ",	"../DVR-02-10-31/DVR-02-10-31.html?screenFlag=",				-1)		//52
	);

//オートジャンプ用PAGEID退避領域
var pageID_for_autoJump = null;

//----------------------------------------------------------------------------------------------------------------//
//サブメニューの開閉状態とサブメニュー数を管理する変数
//yet-close	:サブメニュー閉状態(開履歴無)
//done-close:サブメニュー閉状態(開履歴有)
//done-open	:サブメニュー開状態(開履歴有)
//----------------------------------------------------------------------------------------------------------------//
var kensakuSub	= "yet-close";
var setteiSub	= "yet-close";
var rirekiSub	= "yet-close";
var hosyuSub	= "yet-close";

var kensakuSubNum	= 0;
var setteiSubNum	= 0;
var rirekiSubNum	= 0;
var hosyuSubNum		= 0;

var onFocusMenuId 	= 0;
var mouseOutFlg 	= false;
var mouseOverFlg	= true;
//----------------------------------------------------------------------------------------------------------------//
//関数名：keyEventFunc
//引数：無
//戻値：無
//キーイベントを受ける関数
//----------------------------------------------------------------------------------------------------------------//
function keyEventFunc(event)
{
	var eventID;
	var iLoop;
	try
	{
		//キーコードをマトリクス上のイベントコードに変換する
		switch(Number(event.keyCode))
		{
			case 9://Tab(本体＜＞)
				if(event.shiftKey == true)//shift+Tab(本体＜)
				{
					eventID = 2;
					if(document.activeElement.id == "divNo1")
					{
						stopDefaultling(event);
					}
				}
				else//Tab(本体＞)
				{
					eventID = 3;
					if(document.activeElement.id == "divNo4")
					{
						stopDefaultling(event);
					}
				}
				break;
			case 13://Enter(確定)
				eventID = 4;
				break;
			case 27://Esc(取消)
				eventID = 5;
				break;
			case 38://上
				eventID = 2;
				break;
			case 40://下
				eventID = 3;
				break;
			default://その他のキー
				return;
				break;
		}
		
		//-----------------------------------------------------------------------------------------------
		//現在のフォーカス位置とキーイベントに対応した処理を実行する
		//-----------------------------------------------------------------------------------------------
		
		//まずはフォーカス位置
		for(iLoop = 0;iLoop < eventMtx.length;iLoop++)
		{
			if(eventMtx[iLoop][0] == focusID)
			{
				break;
			}
		}
		//フォーカス位置(iLoop)とキーイベント(eventID)に対応した処理を実行
		consoleLogOutput(4,THISFILENAME,arguments.callee.name,"KeyEvt",eventID,iLoop+"",document.activeElement.id);
		eventMtx[iLoop][eventID](iLoop);
		document.getElementById("MenuBackground").focus();
	}
	catch(error)
	{
		outputError(error);
	}
}

//★★ここからkeyEventFuncのサブ関数

//----------------------------------------------------------------------------------------------------------------//
//関数名：none
//引数
//	num:現在のフォーカス位置(形式上あるだけで使用しない)
//戻値：無
//何も処理しない関数(イベントマトリクスの形式上コールする)
//----------------------------------------------------------------------------------------------------------------//
function none(num)
{
	consoleLogOutput(7,THISFILENAME,arguments.callee.name,"called");
}

//----------------------------------------------------------------------------------------------------------------//
//関数名：nextPage
//引数
//	num:現在のフォーカス位置
//戻値：無
//各画面への遷移処理を行う
//----------------------------------------------------------------------------------------------------------------//
function nextPage(num)
{
	try
	{
		
		var pageIDparam = "";
		//オートジャンプによる遷移(モニター設定)の場合はPAGEIDを付加する
		if((pageID_for_autoJump == 29) || (pageID_for_autoJump == 19))
		{
			pageIDparam = "&PAGEID=" + pageID_for_autoJump;
			pageID_for_autoJump = null;
		}
		
		createMenuCover();
		var paramObj = getParameter();
		var urlParamForRireki = "";
		//4:3or16:9の場合はメニューの帯を伸ばす
		if(paramObj.da == "デジ")
		{
			if(num < 10)
			{
				document.getElementById("DVR-mainMenu-0" + num).style.width = "255px";
			}
			else
			{
				if(num == 52)
				{
					document.getElementById("DVR-mainMenu-21").style.width = "255px";
				}
				else
				{
					document.getElementById("DVR-mainMenu-" + num).style.width = "255px";
				}
			}
		}
		if(eventMtx[num][6] != "NTSC出力")
		{
			dispDrawStopNonPopup();
		}
		//履歴系の画面の場合はパラメータを付加する
		switch(num)
		{
			case 30:
				urlParamForRireki = "&RF=DVR-03-01-00";
				break;
			case 31:
				urlParamForRireki = "&RF=DVR-03-02-00";
				break;
			case 32:
				urlParamForRireki = "&RF=DVR-03-03-00";
				break;
			case 33:
				urlParamForRireki = "&RF=DVR-03-04-00";
				break;
			case 34:
				urlParamForRireki = "&RF=DVR-03-05-01";
				break;
			default:
				break;
		}
		if(paramObj.da == "アナ")
		{
			var shukusho;
			
			switch(localStorage.zoomPercent)
			{
				case "1.0":
				case "1":
					shukusho = 1;
					break;
				case "0.95":
					shukusho = 2;
					break;
				case "0.90":
				case "0.9":
					shukusho = 3;
					break;
				case "0.85":
					shukusho = 4;
					break;
				case "0.80":
				case "0.8":
					shukusho = 5;
					break;
				default:
					shukusho = 3;
					break;
			}
			if(eventMtx[num][6] == "NTSC出力")
			{
				//NTSC出力設定への遷移
				var toNTSC = new Spry.Data.XMLDataSet(gUrl + "/cgi-bin/DVR-04-07-00.cgi", "Success");
				var callBackFunc = new Object;
				addSpryDataSetObserver(toNTSC,callBackFunc);
				toNTSC.loadData();
				callBackFunc.onPostLoad = function(dataSet, data){
					//コールバック関数の処理☆ここから
					var cgiResult = dataSet.getData();
					if(cgiResult[0]["Success"]==1)
					{
						consoleLogOutput(1,THISFILENAME,arguments.callee.name,"NTSC出力遷移失敗");
					}
					//コールバック関数の処理☆ここまで
				};
			}
			else
			{
				//CNVの場合は自機器コンテンツとNVRコンテンツを呼び分ける
				if(paramObj.opeDevice != "0")
				{
					if(eventMtx[num][7] == "自機器コンテンツ")
					{
						//デカ文字の場合はデカ文字用コンテンツへアクセスする
						if(paramObj.sFlag.substring(4,5) == "3")
						{
							sameServer(eventMtx[num][8] + paramObj.sFlag + "&PM=" + shukusho);
						}
						else
						{
							sameServer(eventMtx[num][6] + paramObj.sFlag + "&PM=" + shukusho);
						}
					}
					else if(eventMtx[num][7] == "NVRコンテンツ")
					{
						//デカ文字の場合はデカ文字用コンテンツへアクセスする
						if(paramObj.sFlag.substring(4,5) == "3")
						{
							anotherServer(localStorage.NVRIP, eventMtx[num][8] + paramObj.sFlag + "&PM=" + shukusho + urlParamForRireki + pageIDparam);
						}
						else
						{
							anotherServer(localStorage.NVRIP, eventMtx[num][6] + paramObj.sFlag + "&PM=" + shukusho + urlParamForRireki + pageIDparam);
						}
					}
					else
					{
						consoleLogOutput(1,THISFILENAME,arguments.callee.name,"存在しないコンテンツにアクセス(ID:" + num + ")");
					}
				}
				//NVRの場合は全て自機器コンテンツに遷移
				else
				{
					//デカ文字の場合はデカ文字用コンテンツへアクセスする
					if(paramObj.sFlag.substring(4,5) == "3")
					{
						sameServer(eventMtx[num][8] + paramObj.sFlag + "&PM=" + shukusho + urlParamForRireki + pageIDparam);
					}
					else
					{
						sameServer(eventMtx[num][6] + paramObj.sFlag + "&PM=" + shukusho + urlParamForRireki + pageIDparam);
					}
				}
			}
		}
		else
		{
			//CNVの場合は自機器コンテンツとNVRコンテンツを呼び分ける
			if(paramObj.opeDevice != "0")
			{
				if(eventMtx[num][7] == "自機器コンテンツ")
				{
					sameServer(eventMtx[num][6] + paramObj.sFlag);
				}
				else if(eventMtx[num][7] == "NVRコンテンツ")
				{
					anotherServer(localStorage.NVRIP, eventMtx[num][6] + paramObj.sFlag + urlParamForRireki + pageIDparam);
				}
				else
				{
					consoleLogOutput(1,THISFILENAME,arguments.callee.name,"存在しないコンテンツにアクセス(ID:" + num + ")");
				}
			}
			//NVRの場合は全て自機器コンテンツに遷移
			else
			{
				sameServer(eventMtx[num][6] + paramObj.sFlag + urlParamForRireki + pageIDparam);
			}
		}
	}
	catch(error)
	{
		outputError(error);
	}
}

//----------------------------------------------------------------------------------------------------------------//
//関数名：getIPandNextPage
//引数：遷移先のURL
//戻値：無
//ライブ画面にてIPアドレスを取得できていなかった時用。IPを取得してNVRコンテンツに遷移する。
//----------------------------------------------------------------------------------------------------------------//
function getIPandNextPage(num)
{
	//========== 現在画面のURLを取得する ==========
	try {
		DispWebView.SetCurrentPath(decodeURIComponent(document.location));
	} catch (ex) {}

	//NVRのIPアドレスが取れている場合はNVRのIPアドレスは必要ないため次の処理に進む
	if(localStorage.NVRIP)
	{
		var ipCheck = 0;	//取得しているIPが有効なIPかどうかをチェックするフラグ(不正なIPの場合は1が入る)
		var ipTemp = localStorage.NVRIP.split(".");
		var ipSum = 0;
		
		//アドレスが4オクテットあるかどうかチェック
		if(ipTemp.length != 4)
		{
			ipCheck = 1;
		}
		else
		{
			//[0.0.0.0],[255.255.255.255]は無効なIPと判断
			ipSum = Number(ipTemp[0]) + Number(ipTemp[1]) + Number(ipTemp[2]) + Number(ipTemp[3]);
			if((ipSum == 0) || (ipSum == (255 * 4)))
			{
				ipCheck = 1;
			}
			//↑IPアドレスの1〜4オクテットの数字の和でIPアドレスの判断を行っている
			//1〜4オクテットの和が0になるのは[0.0.0.0]の時のみ
			//同様に255*4になるのは[255.255.255.255]の時のみ
			//なぜこのような回りくどいことをするのかというと、各オクテットが0で補填されていても不具合が起きないようにするため
			//(この実装だと[000.000.000.000]のようなIPアドレスでも[0.0.0.0]と同じように扱える)
		}
		
		if(ipCheck == 0)
		{
			consoleLogOutput(4,THISFILENAME,arguments.callee.name,"IP取得OK",localStorage.NVRIP,num,ipSum + "");
			nextPage(num);
			return;
		}
		else
		{
			consoleLogOutput(2,THISFILENAME,arguments.callee.name,"IP取得値が不正のため再取得する",localStorage.NVRIP);
		}
	}
	else
	{
		consoleLogOutput(2,THISFILENAME,arguments.callee.name,"IP未取得のため取得する",num);
	}

	var dsPSP = new Spry.Data.XMLDataSet(null, "Results");
	if(localStorage.play)
	{
		dsPSP.setURL(gUrl + "/cgi-bin/DVR-99-00-00.cgi?WithoutRefleshMemory=1");
	}
	else
	{
		dsPSP.setURL(gUrl + "/cgi-bin/DVR-99-00-00.cgi?WithoutRefleshMemory=0");
	}
	g_num = num;
	dsPSP.useCache = false;
	dsPSP.addObserver(afterdsPSPMenu);
	dsPSP.loadData();
}

var g_num;

//----------------------------------------------------------------------------------------------------------------//
//関数名：afterdsPSPMenu
//引数
//	notificationType:cgi実行中状態
//	dataSet			:cgi実行結果
//	dat				:??
//戻値：無
//getIPandNextPage実行後にNVRコンテンツへのリクエストを投げる(nextPageの呼び出し)
//----------------------------------------------------------------------------------------------------------------//
function afterdsPSPMenu(notificationType, dataSet, dat)
{
	if(notificationType=="onPostLoad")
	{
		var row = dataSet.getData();
		localStorage.zoomPercent = getScaling(row[0]["ZoomSize"]);
		localStorage.NVRIP = row[0]["IP"];
		
		//縮小をかける
		var paramObj = getParameter();
		
		if(paramObj.sFlag.substring(4,5) == "0")
		{
			top.document.body.style.zoom = localStorage.zoomPercent;
			top.menu.document.body.style.zoom = localStorage.zoomPercent;
			top.rightpage.document.body.style.zoom = localStorage.zoomPercent;
		}
		else if(paramObj.sFlag.substring(4,5) == "3")
		{
			if(localStorage.zoomPercent=="0.8"){
				document.getElementById("C-mainLeftMenu").className = "z080";
			}else if(localStorage.zoomPercent=="0.85"){
				document.getElementById("C-mainLeftMenu").className = "z085";
			}else if(localStorage.zoomPercent=="0.9"){
				document.getElementById("C-mainLeftMenu").className = "z090";
			}else if(localStorage.zoomPercent=="1"){
				document.getElementById("C-mainLeftMenu").className = "z100";
			}else{
				document.getElementById("C-mainLeftMenu").className = "z095";
			}
			top.document.body.style.zoom = localStorage.zoomPercent;
			top.menu.document.body.style.zoom = localStorage.zoomPercent;
			top.rightpage.document.body.style.zoom = localStorage.zoomPercent;
		}
		else
		{
			//処理無
		}
		nextPage(g_num);
	}
}

//----------------------------------------------------------------------------------------------------------------//
//関数名：createMenuCover
//引数：無
//戻値：無
//Topメニューから各画面に遷移するときにメニュー部分にカバーを被せる
//----------------------------------------------------------------------------------------------------------------//
function createMenuCover(){
	var size=Number(getPAGE_SIZE());
	
	//NTSC or デカ文字の場合は表示幅を0にする
	if(0==size||3==size){
		changMenuFrameWith(NO_MENU_WITH);	
	}
	
	//カバー用のDIV作成
	var menu_div = top.menu.document.createElement("div") ;
	menu_div.className = "menu_div" ;
	menu_div.id = "menu_div" ;
	
	//左側メニューがクリックされたときはフォーカスを右フレームに戻し何もしない
	menu_div.onclick=function(){parent.rightpage.focus();};
	
	//レイヤーを被せている間は、「戻る」ボタンエリアを非表示とする
	var returnAreaDiv = top.menu.document.getElementById("DVR-mainMenu-button");
	if(returnAreaDiv){
		returnAreaDiv.style.display = "none";
	}
	if(!top.menu.document.getElementById("menu_div")){
		top.menu.document.body.appendChild(menu_div);
	}
}


//----------------------------------------------------------------------------------------------------------------//
//関数名：focusUp
//引数
//	num:現在のフォーカス位置
//戻値：無
//カーソルを一つ上に動かす
//----------------------------------------------------------------------------------------------------------------//
function focusUp(num)
{
	try
	{
		consoleLogOutput(4,THISFILENAME,arguments.callee.name,"called",focusID,num,kensakuSub,setteiSub,rirekiSub,hosyuSub);
		var no;		//フォーカス遷移先位置のキー
		//設定、履歴、保守、戻るにフォーカスがある場合はその上のメニューの開閉状態でフォーカス遷移先が異なる
		switch(eventMtx[num][0])
		{
			case "設定":
				if(kensakuSub == "done-open")//検索配下のサブメニューが開いている
				{
					no = searchFocus("up",num);
				}
				else//検索配下のサブメニューが閉じている
				{
					no = 0;
				}
				break;
			case "履歴":
				if(setteiSub == "done-open")//検索配下のサブメニューが開いている
				{
					no = searchFocus("up",num);
				}
				else//検索配下のサブメニューが閉じている
				{
					no = 11;
				}
				break;
			case "保守":
				if(rirekiSub == "done-open")//検索配下のサブメニューが開いている
				{
					no = searchFocus("up",num);
				}
				else//検索配下のサブメニューが閉じている
				{
					no = 29;
				}
				break;
			case "戻る":
				if(hosyuSub == "done-open")//検索配下のサブメニューが開いている
				{
					no = searchFocus("up",num);
				}
				else//検索配下のサブメニューが閉じている
				{
					no = 36;
				}
				break;
			default:
				no = searchFocus("up",num);
				break;
		}
		focusID = eventMtx[no][0];
		if(no < 10)
		{
			upScrollPro("DVR-mainMenu-0" + no);
		}
		else
		{
			upScrollPro("DVR-mainMenu-" + no);
		}

		onFocusMenuId = no;
		//フォーカスが当たった箇所のスタイルをセットする
		//まずフォーカスが当たっていた箇所を元の色に戻す
		menuFocusChange(eventMtx[num][0],"off");
		//次にフォーカスを当てる箇所を選択色に変更する
		menuFocusChange(eventMtx[no][0],"on");
	}
	catch(error)
	{
		outputError(error);
	}
}


//----------------------------------------------------------------------------------------------------------------//
//関数名：focusDown
//引数
//	num:現在のフォーカス位置
//戻値：無
//カーソルを一つ下に動かす
//----------------------------------------------------------------------------------------------------------------//
function focusDown(num)
{
	try
	{
		consoleLogOutput(4,THISFILENAME,arguments.callee.name,"called",focusID,num,kensakuSub,setteiSub,rirekiSub,hosyuSub);
		var no;		//フォーカス遷移先位置のキー
		//検索、設定、履歴、保守にフォーカスがある場合はその下のメニューの開閉状態でフォーカス遷移先が異なる
		switch(eventMtx[num][0])
		{
			case "検索":
				if(kensakuSub == "done-open")//検索配下のサブメニューが開いている
				{
					no = searchFocus("down",num);
				}
				else//検索配下のサブメニューが閉じている
				{
					no = 11;
				}
				break;
			case "設定":
				if(setteiSub == "done-open")//検索配下のサブメニューが開いている
				{
					no = searchFocus("down",num);
				}
				else//設定配下のサブメニューが閉じている
				{
					no = 29;
				}
				break;
			case "履歴":
				if(rirekiSub == "done-open")//検索配下のサブメニューが開いている
				{
					no = searchFocus("down",num);
				}
				else//履歴配下のサブメニューが閉じている
				{
					no = 36;
				}
				break;
			case "保守":
				if(hosyuSub == "done-open")//検索配下のサブメニューが開いている
				{
					no = searchFocus("down",num);
				}
				else//保守配下のサブメニューが閉じている
				{
					no = 51;
				}
				break;
			default:
				no = searchFocus("down",num);
				break;
		}
		focusID = eventMtx[no][0];
		if(no < 10)
		{
			downScrollPro("DVR-mainMenu-0" + no);
		}
		else
		{
			downScrollPro("DVR-mainMenu-" + no);
		}

		onFocusMenuId = no;
		//フォーカスが当たった箇所のスタイルをセットする
		//まずフォーカスが当たっていた箇所を元の色に戻す
		menuFocusChange(eventMtx[num][0],"off");
		//次にフォーカスを当てる箇所を選択色に変更する
		menuFocusChange(eventMtx[no][0],"on");
	}
	catch(error)
	{
		outputError(error);
	}
}


//----------------------------------------------------------------------------------------------------------------//
//関数名：menuOpen_Close
//引数
//	num:現在のフォーカス位置
//戻値：無
//サブメニューの開閉を行う
//----------------------------------------------------------------------------------------------------------------//
function menuOpen_Close(num)
{
	try
	{
		var kaiheiStatus;
		var areaDiv;
		var paramObj = getParameter();
		var newDisDiv = document.createElement("div");
		var iLoop;

		consoleLogOutput(4,THISFILENAME,arguments.callee.name,"called",focusID,num,kensakuSub,setteiSub,rirekiSub,hosyuSub);
		//フォーカス位置でどの大項目に対しての操作なのかを判定する
		switch(num)
		{
			case 0://検索
				kaiheiStatus = kensakuSub.split("-");
				areaDiv = document.getElementById("divNo1");
				
				//検索以外のサブメニューが開かれていた場合は閉じる
				if(setteiSub == "done-open")
				{
					document.getElementById("DVR-mainMenu-11-display").style.display = "none";
					document.getElementById("hr-11").style.display = "none";
					setteiSub = "done-close";
					menuFocusChange("設定","off");
				}
				if(rirekiSub == "done-open")
				{
					document.getElementById("DVR-mainMenu-29-display").style.display = "none";
					document.getElementById("hr-29").style.display = "none";
					rirekiSub = "done-close";
					menuFocusChange("履歴","off");
				}
				if(hosyuSub == "done-open")
				{
					document.getElementById("DVR-mainMenu-36-display").style.display = "none";
					document.getElementById("hr-36").style.display = "none";
					hosyuSub = "done-close";
					menuFocusChange("保守","off");
				}
				
				
				if(kaiheiStatus[0] == "yet")//サブメニューを開く(初回)
				{
					//１サブメニュー閉状態かつ初回開なのでElementの追加から行う
					//↓1-1操作元機器、セコム保守有無、権限、アーカイブ運用によってメニューの表示/非表示を決める---------------------------------
					
					kensakuSubNum = subMenuCreate("検索");
					
					//配下のメニューが存在しない場合は以降の処理は実施しない
					if(kensakuSubNum <= 1)
					{
						consoleLogOutput(4,THISFILENAME,arguments.callee.name,"サブメニュー無し(検索)");
						return;
					}
					
					
					//↑1-1操作元機器、セコム保守有無、権限、アーカイブ運用によってメニューの表示/非表示を決める---------------------------------
					
					//↓1-2エレメントHTMLの書き込み----------------------------------------------------------------------------------------------
					newDisDiv.innerHTML = getHTML(eventMtx[num][0]);
					areaDiv.appendChild(newDisDiv);
					//↑1-2エレメントHTMLの書き込み----------------------------------------------------------------------------------------------
					
					//メニュー開閉状態フラグを更新する
					kensakuSub = "done-open";
					
					//大項目下のラインを表示
					document.getElementById("hr-00").style.display = "block";
					//予約コピーの設定がONの場合は表示する
					if(paramObj.reserveCopy == 1 && document.getElementById("予約コピー"))
					{
						document.getElementById("予約コピー").style.display = "block";
					}
					else if(paramObj.reserveCopy == 0 && document.getElementById("予約コピー"))
					{
						document.getElementById("予約コピー").style.display = "none";
					}
					
					//フォーカス位置をサブメニュー最上部にセットする
					subMenuFocus("検索");
				}
				else if(kaiheiStatus[1] == "close")//サブメニューを開く(2回目以降)
				{
					//配下のメニューが存在しない場合は以降の処理は実施しない
					if(kensakuSubNum <= 1)
					{
						consoleLogOutput(4,THISFILENAME,arguments.callee.name,"サブメニュー無し(検索)");
						return;
					}
					
					
					//Elementは追加し終えているので表示/非表示のみ切換える
					document.getElementById("DVR-mainMenu-00-display").style.display = "block";
					
					//メニュー開閉状態フラグを更新する
					kensakuSub = "done-open";
					
					//大項目下のラインを表示
					document.getElementById("hr-00").style.display = "block";
					//予約コピーの設定がONの場合は表示する
					if(paramObj.reserveCopy == 1 && document.getElementById("予約コピー"))
					{
						document.getElementById("予約コピー").style.display = "block";
					}
					else if(paramObj.reserveCopy == 0 && document.getElementById("予約コピー"))
					{
						document.getElementById("予約コピー").style.display = "none";
					}
					
					//フォーカス位置をサブメニュー最上部にセットする
					subMenuFocus("検索");
				}
				else if(kaiheiStatus[1] == "open")//サブメニューを閉じる
				{
					//Elementは追加し終えているので表示/非表示のみ切換える
					document.getElementById("DVR-mainMenu-00-display").style.display = "none";
					
					//メニュー開閉状態フラグを更新する
					kensakuSub = "done-close";
					
					//大項目下のラインを非表示
					document.getElementById("hr-00").style.display = "none";
					focusChange(0);
					menuFocusChange("検索","on");
				}
				break;
			case 11://設定
				kaiheiStatus = setteiSub.split("-");
				areaDiv = document.getElementById("divNo2");
				
				//設定以外のサブメニューが開かれていた場合は閉じる
				if(kensakuSub == "done-open")
				{
					document.getElementById("DVR-mainMenu-00-display").style.display = "none";
					document.getElementById("hr-00").style.display = "none";
					kensakuSub = "done-close";
					menuFocusChange("検索","off");
				}
				if(rirekiSub == "done-open")
				{
					document.getElementById("DVR-mainMenu-29-display").style.display = "none";
					document.getElementById("hr-29").style.display = "none";
					rirekiSub = "done-close";
					menuFocusChange("履歴","off");
				}
				if(hosyuSub == "done-open")
				{
					document.getElementById("DVR-mainMenu-36-display").style.display = "none";
					document.getElementById("hr-36").style.display = "none";
					hosyuSub = "done-close";
					menuFocusChange("保守","off");
				}
				
				
				if(kaiheiStatus[0] == "yet")//サブメニューを開く(初回)
				{
					//１サブメニュー閉状態かつ初回開なのでElementの追加から行う
					//↓1-1操作元機器、セコム保守有無、権限、アーカイブ運用によってメニューの表示/非表示を決める---------------------------------
					
					setteiSubNum = subMenuCreate("設定");
					
					//配下のメニューが存在しない場合は以降の処理は実施しない
					if(setteiSubNum <= 1)
					{
						consoleLogOutput(4,THISFILENAME,arguments.callee.name,"サブメニュー無し(設定)");
						return;
					}
					
					
					//↑1-1操作元機器、セコム保守有無、権限、アーカイブ運用によってメニューの表示/非表示を決める---------------------------------

					
					//↓1-2エレメントHTMLの書き込み----------------------------------------------------------------------------------------------
					newDisDiv.innerHTML = getHTML(eventMtx[num][0]);
					areaDiv.appendChild(newDisDiv);
					//↑1-2エレメントHTMLの書き込み----------------------------------------------------------------------------------------------
					
					//メニュー開閉状態フラグを更新する
					setteiSub = "done-open";
					
					//大項目下のラインを表示
					document.getElementById("hr-11").style.display = "block";
					
					//フォーカス位置をサブメニュー最上部にセットする
					subMenuFocus("設定");
				}
				else if(kaiheiStatus[1] == "close")//サブメニューを開く(2回目以降)
				{
					//配下のメニューが存在しない場合は以降の処理は実施しない
					if(setteiSubNum <= 1)
					{
						consoleLogOutput(4,THISFILENAME,arguments.callee.name,"サブメニュー無し(設定)");
						return;
					}
					
					
					//Elementは追加し終えているので表示/非表示のみ切換える
					document.getElementById("DVR-mainMenu-11-display").style.display = "block";
					//メニュー開閉状態フラグを更新する
					setteiSub = "done-open";
					
					//大項目下のラインを表示
					document.getElementById("hr-11").style.display = "block";
					
					//フォーカス位置をサブメニュー最上部にセットする
					subMenuFocus("設定");
				}
				else if(kaiheiStatus[1] == "open")//サブメニューを閉じる
				{
					//Elementは追加し終えているので表示/非表示のみ切換える
					document.getElementById("DVR-mainMenu-11-display").style.display = "none";
					//メニュー開閉状態フラグを更新する
					setteiSub = "done-close";
					
					//大項目下のラインを非表示
					document.getElementById("hr-11").style.display = "none";
					focusChange(11);
				}
				break;
			case 29://履歴
				kaiheiStatus = rirekiSub.split("-");
				areaDiv = document.getElementById("divNo3");
				
				//履歴以外のサブメニューが開かれていた場合は閉じる
				if(kensakuSub == "done-open")
				{
					document.getElementById("DVR-mainMenu-00-display").style.display = "none";
					document.getElementById("hr-00").style.display = "none";
					kensakuSub = "done-close";
					menuFocusChange("検索","off");
				}
				if(setteiSub == "done-open")
				{
					document.getElementById("DVR-mainMenu-11-display").style.display = "none";
					document.getElementById("hr-11").style.display = "none";
					setteiSub = "done-close";
					menuFocusChange("設定","off");
				}
				if(hosyuSub == "done-open")
				{
					document.getElementById("DVR-mainMenu-36-display").style.display = "none";
					document.getElementById("hr-36").style.display = "none";
					hosyuSub = "done-close";
					menuFocusChange("保守","off");
				}
				
				
				if(kaiheiStatus[0] == "yet")//サブメニューを開く(初回)
				{
					//１サブメニュー閉状態かつ初回開なのでElementの追加から行う
					//↓1-1操作元機器、セコム保守有無、権限、アーカイブ運用によってメニューの表示/非表示を決める---------------------------------
					
					rirekiSubNum = subMenuCreate("履歴");
					
					//配下のメニューが存在しない場合は以降の処理は実施しない
					if(rirekiSubNum <= 1)
					{
						consoleLogOutput(4,THISFILENAME,arguments.callee.name,"サブメニュー無し(履歴)");
						return;
					}
					
					
					//↑1-1操作元機器、セコム保守有無、権限、アーカイブ運用によってメニューの表示/非表示を決める---------------------------------
					
					//↓1-2エレメントHTMLの書き込み----------------------------------------------------------------------------------------------
					newDisDiv.innerHTML = getHTML(eventMtx[num][0]);
					areaDiv.appendChild(newDisDiv);
					//↑1-2エレメントHTMLの書き込み----------------------------------------------------------------------------------------------
					
					//メニュー開閉状態フラグを更新する
					rirekiSub = "done-open";
					
					//大項目下のラインを表示
					document.getElementById("hr-29").style.display = "block";
					
					//フォーカス位置をサブメニュー最上部にセットする
					subMenuFocus("履歴");
				}
				else if(kaiheiStatus[1] == "close")//サブメニューを開く(2回目以降)
				{
					//配下のメニューが存在しない場合は以降の処理は実施しない
					if(rirekiSubNum <= 1)
					{
						consoleLogOutput(4,THISFILENAME,arguments.callee.name,"サブメニュー無し(履歴)");
						return;
					}
					
					
					//Elementは追加し終えているので表示/非表示のみ切換える
					document.getElementById("DVR-mainMenu-29-display").style.display = "block";
					//メニュー開閉状態フラグを更新する
					rirekiSub = "done-open";
					
					//大項目下のラインを表示
					document.getElementById("hr-29").style.display = "block";
					
					//フォーカス位置をサブメニュー最上部にセットする
					subMenuFocus("履歴");
				}
				else if(kaiheiStatus[1] == "open")//サブメニューを閉じる
				{
					//Elementは追加し終えているので表示/非表示のみ切換える
					document.getElementById("DVR-mainMenu-29-display").style.display = "none";
					//メニュー開閉状態フラグを更新する
					rirekiSub = "done-close";
					
					//大項目下のラインを非表示
					document.getElementById("hr-29").style.display = "none";
					focusChange(29);
				}
				break;
			case 36://保守
				kaiheiStatus = hosyuSub.split("-");
				areaDiv = document.getElementById("divNo4");
				
				//保守以外のサブメニューが開かれていた場合は閉じる
				if(kensakuSub == "done-open")
				{
					document.getElementById("DVR-mainMenu-00-display").style.display = "none";
					document.getElementById("hr-00").style.display = "none";
					kensakuSub = "done-close";
					menuFocusChange("検索","off");
				}
				if(setteiSub == "done-open")
				{
					document.getElementById("DVR-mainMenu-11-display").style.display = "none";
					document.getElementById("hr-11").style.display = "none";
					setteiSub = "done-close";
					menuFocusChange("設定","off");
				}
				if(rirekiSub == "done-open")
				{
					document.getElementById("DVR-mainMenu-29-display").style.display = "none";
					document.getElementById("hr-29").style.display = "none";
					rirekiSub = "done-close";
					menuFocusChange("履歴","off");
				}
				
				
				if(kaiheiStatus[0] == "yet")//サブメニューを開く(初回)
				{
					//１サブメニュー閉状態かつ初回開なのでElementの追加から行う
					//↓1-1操作元機器、セコム保守有無、権限、アーカイブ運用によってメニューの表示/非表示を決める---------------------------------
					
					hosyuSubNum = subMenuCreate("保守");
					
					//配下のメニューが存在しない場合は以降の処理は実施しない
					if(hosyuSubNum <= 1)
					{
						consoleLogOutput(4,THISFILENAME,arguments.callee.name,"サブメニュー無し(保守)");
						return;
					}
					
					
					//↑1-1操作元機器、セコム保守有無、権限、アーカイブ運用によってメニューの表示/非表示を決める---------------------------------
					
					//↓1-2エレメントHTMLの書き込み----------------------------------------------------------------------------------------------
					newDisDiv.innerHTML = getHTML(eventMtx[num][0]);
					areaDiv.appendChild(newDisDiv);
					//↑1-2エレメントHTMLの書き込み----------------------------------------------------------------------------------------------
					
					//メニュー開閉状態フラグを更新する
					hosyuSub = "done-open";
					
					//大項目下のラインを表示
					document.getElementById("hr-36").style.display = "block";
					
					//フォーカス位置をサブメニュー最上部にセットする
					subMenuFocus("保守");
				}
				else if(kaiheiStatus[1] == "close")//サブメニューを開く(2回目以降)
				{
					//配下のメニューが存在しない場合は以降の処理は実施しない
					if(hosyuSubNum <= 1)
					{
						consoleLogOutput(4,THISFILENAME,arguments.callee.name,"サブメニュー無し(保守)");
						return;
					}
					
					//Elementは追加し終えているので表示/非表示のみ切換える
					document.getElementById("DVR-mainMenu-36-display").style.display = "block";
					//メニュー開閉状態フラグを更新する
					hosyuSub = "done-open";
					
					//大項目下のラインを表示
					document.getElementById("hr-36").style.display = "block";
					
					//フォーカス位置をサブメニュー最上部にセットする
					subMenuFocus("保守");
				}
				else if(kaiheiStatus[1] == "open")//サブメニューを閉じる
				{
					//Elementは追加し終えているので表示/非表示のみ切換える
					document.getElementById("DVR-mainMenu-36-display").style.display = "none";
					//メニュー開閉状態フラグを更新する
					hosyuSub = "done-close";
					
					//大項目下のラインを非表示
					document.getElementById("hr-36").style.display = "none";
					focusChange(36);
				}
				break;
			default://不正な値
				break;
		}
	}
	catch(error)
	{
		outputError(error);
	}
}

//----------------------------------------------------------------------------------------------------------------//
//関数名：subMenuCreate
//引数
//	subject:対象の大項目(検索or設定or履歴or保守)
//戻値：有効にしたメニューの数(大項目自身も含むので必ず1以上になる)
//大項目配下の中項目を生成する関数
//----------------------------------------------------------------------------------------------------------------//
function subMenuCreate(subject)
{
	//権限情報、表示画面の取得
	paramObj = getParameter();
	var start;
	var end;
	var iLoop;
	var authMode;
	var enableMenu = 0;
	
	switch (subject)
	{
	case "検索":
		start	= 0;
		end		= 10;
		break;
	case "設定":
		start	= 11;
		end		= 28;
		break;
	case "履歴":
		start	= 29;
		end		= 35;
		break;
	case "保守":
		start	= 36;
		end		= 50;
		break;
	}
	
	//セコム保守の場合は全メニュー表示させる
	if(paramObj.kengen == 7)
	{
		authMode = 0;	//authModeを0にすると全メニュー表示される(例外(VPNとNTSC)を除く)
	}
	//権限設定無しは権限1と同等とする
	else if(paramObj.kengen == 6)
	{
		authMode = 1;
	}
	else
	{
		authMode = Number(paramObj.kengen);
	}
	
	
	for(iLoop = start;iLoop <= end;iLoop++)
	{
		//NVRのデカ文字以外,CNVのデカ文字以外,NVRのデカ文字,CNVのデカ文字の4パターンに分かれる
		if(paramObj.sFlag.substring(4,5) != "3")
		{
			if(paramObj.opeDevice == "0")	//NVRのデカ文字以外
			{
				if(eventMtx[iLoop][9] >= authMode)
				{
					eventMtx[iLoop][1] = "有効";
					enableMenu++;
				}
				else
				{
					eventMtx[iLoop][1] = "無効";
				}
			}
			else							//CNVのデカ文字以外
			{
				if((eventMtx[iLoop][7] != null) && (eventMtx[iLoop][9] >= authMode))
				{
					eventMtx[iLoop][1] = "有効";
					enableMenu++;
				}
				else
				{
					eventMtx[iLoop][1] = "無効";
				}
			}
		}
		else
		{
			if(paramObj.opeDevice == "0")	//NVRのデカ文字
			{
				if((eventMtx[iLoop][8] != null) && (eventMtx[iLoop][9] >= authMode))
				{
					eventMtx[iLoop][1] = "有効";
					enableMenu++;
				}
				else
				{
					eventMtx[iLoop][1] = "無効";
				}
			}
			else							//CNVのデカ文字
			{
				if((eventMtx[iLoop][8] != null) && (eventMtx[iLoop][7] != null) && (eventMtx[iLoop][9] >= authMode))
				{
					eventMtx[iLoop][1] = "有効";
					enableMenu++;
				}
				else
				{
					eventMtx[iLoop][1] = "無効";
				}
			}
		}
	}
	
	//例外処理
	//VPNはVPN接続設定が有になっていなければ表示させない
	if(paramObj.VPN == 0)
	{
		eventMtx[14][1] = "無効";
	}
	
	//NTSC出力はアナログorデカ文字でなければ表示させない
	if(paramObj.da != "アナ")
	{
		eventMtx[42][1] = "無効";
	}

	//アーカイブ運用無の場合、画像ダウンロードを[無効]に変更する
	if(localStorage.arcCenter != "1")
	{
		eventMtx[9][1] = "無効";
	}
	//予約コピーは設定値に関わらず、display:noneでHTMLのみ記述している。
	//画面種別と権限設定に依る有効無効の切替えはこの関数で行っているので
	//残るは設定値に合わせて表示非表示を切替える(これはmenuOpen_Closeで行う)
	
	consoleLogOutput(5,THISFILENAME,arguments.callee.name,"END Result->" + enableMenu);
	return enableMenu;
}

//----------------------------------------------------------------------------------------------------------------//
//関数名：subMenuFocus
//引数
//	subject:対象の大項目(検索or設定or履歴or保守)
//戻値：無
//大項目配下の中項目が開かれたときの初期フォーカスをセットする関数
//----------------------------------------------------------------------------------------------------------------//
function subMenuFocus(subject)
{
	var start;
	var end;
	var iLoop;
	
	switch (subject)
	{
	case "検索":
		start	= 1;
		end		= 10;
		break;
	case "設定":
		start	= 12;
		end		= 28;
		break;
	case "履歴":
		start	= 30;
		end		= 35;
		break;
	case "保守":
		start	= 37;
		end		= 50;
		break;
	}
	
	for(iLoop = start;iLoop <= end;iLoop++)
	{
		if(eventMtx[iLoop][1] == "有効")
		{
			//大項目を非選択色に
			menuFocusChange(subject,"off");
			
			//初期フォーカスセット
			focusChange(iLoop);
			menuFocusChange(eventMtx[iLoop][0],"on");
			focusID = eventMtx[iLoop][0];
			break;
		}
	}
}
//----------------------------------------------------------------------------------------------------------------//
//関数名：searchFocus
//引数
//	method:カーソルを移動させたい方向(down or up)
//	num:現在のフォーカス位置
//戻値
//	no:検出したフォーカス遷移先
//メニューの有効無効(表示・非表示)を判定し、次のフォーカス位置を整数値で返す
//----------------------------------------------------------------------------------------------------------------//
function searchFocus(method,num)
{
	try
	{
		var next;				//ループ実行時にインクリメントorデクリメントさせるために定義
		var iLoop;				//ループインデックス
		if(method == "down")
		{
			next = 1;
		}
		else
		{
			next = -1;
		}
		for(iLoop = (num + next);true;iLoop = iLoop + next)
		{
			if((eventMtx[iLoop][1] == "有効") && (document.getElementById(eventMtx[iLoop][0]).style.display != "none"))
			{
				break;
			}
			else if((iLoop < 0) || (iLoop > eventMtx.length))
			{
				//遷移先が見つからなかった
				consoleLogOutput(1,THISFILENAME,arguments.callee.name,"フォーカス遷移先無");
				return 0;
			}
			else
			{
				//処理無
			}
		}
		return iLoop;
	}
	catch(error)
	{
		outputError(error);
		return 0;
	}
}


//----------------------------------------------------------------------------------------------------------------//
//関数名：getHTML
//引数
//	bigMenuId:選択されている大項目
//戻値
//	insertするHTMLテキスト
//DISPMに画面表示変更通知を送信してLive画面に戻る
//本関数が呼ばれるとDVR-99-01-10.cgiは呼ばれ、CGIの処理が完了するとコールバック関数(backToLive2nd)が呼ばれる
//----------------------------------------------------------------------------------------------------------------//
function getHTML(bigMenuId)
{
	try
	{
		var iLoop;
		var str;
		var ID;
		var start;
		var end;
		switch(bigMenuId)
		{
			case "検索":
				start	= 1;
				end		= 11;
				ID		= "00";
				break;
			case "設定":
				start	= 12;
				end		= 29;
				ID		= "11";
				break;
			case "履歴":
				start	= 30;
				end		= 36;
				ID		= "29";
				break;
			case "保守":
				start	= 37;
				end		= 51;
				ID		= "36";
				break;
			default:
				consoleLogOutput(1,THISFILENAME,arguments.callee.name,"パラメータエラー");
				break;
		}
		str = "<div id=\"DVR-mainMenu-" + ID + "-display\" class=\"C-displayDiv\" style=\"display: block;\">";
		
		for(iLoop = start;iLoop < end;iLoop++)
		{
			if(iLoop < 10)
			{
				ID = "0" + iLoop;
			}
			else
			{
				ID = iLoop;
			}
			if(eventMtx[iLoop][1] == "有効")
			{
				if(eventMtx[iLoop][0] != "予約コピー")
				{
					str = str +		"<a class=\"acss\" id=" + eventMtx[iLoop][0] + ">";
				}
				else
				{
					str = str +		"<a class=\"acss\" id=" + eventMtx[iLoop][0] + " style=\"display:none\">";
				}
				str = str +				"<div id=\"DVR-mainMenu-" + ID + "\" class=\"C-mainSubMenuSelect\" tabindex=\"-1\" onclick=\"clickMenu(this)\" onmouseout=\"menuFocusChange('" + eventMtx[iLoop][0] + "','off')\" onmouseover=\"menuFocusChange('" + eventMtx[iLoop][0] + "','on')\">";
				str = str +					"<span id=" + eventMtx[iLoop][0] + "\">" + eventMtx[iLoop][0] + "</span>";
				str = str +				"</div>";
				str = str +			"</a>";
			}
		}
		str = str + "</div>";
		return(str);
	}
	catch(error)
	{
		outputError(error);
		return 0;
	}
}


//----------------------------------------------------------------------------------------------------------------//
//関数名：clickMenu
//引数
//	clickedID:クリックされたElementのID
//戻値：無
//clickされたメニューに応じて画面の遷移を行う
//----------------------------------------------------------------------------------------------------------------//
function clickMenu(clickedID)
{
	consoleLogOutput(5,THISFILENAME,arguments.callee.name,clickedID);
	var ID_NO = clickedID.id.split("-");
	consoleLogOutput(5,THISFILENAME,arguments.callee.name,">>",ID_NO[0],ID_NO[1],ID_NO[2]);
	var no = Number(ID_NO[2]);
	var iLoop;
	consoleLogOutput(5,THISFILENAME,arguments.callee.name,clickedID);
	//現在のフォーカス(選択色)を消す
	for(iLoop = 0;iLoop < 52;iLoop++)
	{
		menuFocusChange(eventMtx[iLoop][0],"off");
	}
	consoleLogOutput(5,THISFILENAME,arguments.callee.name,clickedID);
	focusChange(no);
	
	getIPandNextPage(no);
}
//----------------------------------------------------------------------------------------------------------------//
//関数名：backToLive1st
//引数：無
//戻値：無
//DISPMに画面表示変更通知を送信するためのフラグを立ててLive画面に戻る
//Live画面に戻った後、DVR-99-01-10.cgiが呼ばれ、CGIの処理が完了するとコールバック関数(backToLive2nd)が呼ばれる
//----------------------------------------------------------------------------------------------------------------//
function backToLive1st()
{
	consoleLogOutput(1,THISFILENAME,arguments.callee.name,"$#$ 日時をOFF->ON");
	try
	{
		onFocusMenuId = 0;
		//DISPMに画面表示変更通知を送信するためのフラグを立てる(画面が変わるのでLocalStorageで管理)
		localStorage.fromMenu = "メニューからの戻る操作";
		// #17019 location方式変更
		//メニュー画面から戻るので日時表示を非表示から表示にする
		dispSetVisibleSystemTime(true);
		// NVRとCNVの場合
		if(dispWebViewFlag == "Active") {
			// Dispプロセスの経由でURLの切換を行う
			var dispUrl = "http://" + window.location.host + "/DVR-05-08-00/DVR-05-08-00.html" + top.location.search + SHOW_CAM_NAME;
		 	TopLocationFromDispWebView("true", dispUrl );
		} else {
			top.location = "../DVR-05-08-00/DVR-05-08-00.html" + top.location.search + SHOW_CAM_NAME;
		}
		
	}
	catch(error)
	{
		outputError(error);
	}
}


//★★ここまでkeyEventFuncのサブ関数



//----------------------------------------------------------------------------------------------------------------//
//関数名：largeMenuFocus
//引数：1)検索 2)設定 3)履歴 4)保守 5)戻る
//戻値：無
//メインメニューの大項目()にフォーカスを当てる
//----------------------------------------------------------------------------------------------------------------//
function menuFocusChange(target,control)
{
	try
	{
		consoleLogOutput(4,THISFILENAME,arguments.callee.name,"called",target,control);
		switch(target)
		{
		case "検索":
			if(mouseOutFlg ==true && onFocusMenuId == 0)
			{
				control = "on";
			}
			if(!mouseOverFlg)
			{
				mouseOverFlg = true;
				return;
			}
			if(control == "off")
			{
				//メニューが開いているときと閉じているときで選択色が異なる
				if(kensakuSub == "done-open")
				{
					document.getElementById("DVR-auxiliary_0").className = "DVR-auxiliary2";
					document.getElementById("DVR-mainMenu-00").style.backgroundColor = COLORLIGHTBLUE;
				}
				else
				{
					document.getElementById("DVR-auxiliary_0").className = "DVR-auxiliary";
					document.getElementById("DVR-mainMenu-00").style.backgroundColor = COLORDARKGRAY;
				}
			}
			else
			{
				//メニューが開いているときと閉じているときで選択色が異なる
				if(kensakuSub == "done-open")
				{
					document.getElementById("DVR-auxiliary_0").className = "DVR-auxiliary";
					document.getElementById("DVR-mainMenu-00").style.backgroundColor = COLORLIGHTGRAY;
				}
				else
				{
					document.getElementById("DVR-auxiliary_0").className = "DVR-auxiliary2";
					document.getElementById("DVR-mainMenu-00").style.backgroundColor = COLORLIGHTBLUE;
				}
			}
			mouseOutFlg = false;
			break;
		case "設定":
			if(mouseOutFlg ==true && onFocusMenuId == 11)
			{
				control = "on";
			}
			if(!mouseOverFlg)
			{
				mouseOverFlg = true;
				return;
			}
			if(control == "off")
			{
				//メニューが開いているときと閉じているときで選択色が異なる
				if(setteiSub == "done-open")
				{
					document.getElementById("DVR-auxiliary_1").className = "DVR-auxiliary2";
					document.getElementById("DVR-mainMenu-11").style.backgroundColor = COLORLIGHTBLUE;
				}
				else
				{
					document.getElementById("DVR-auxiliary_1").className = "DVR-auxiliary";
					document.getElementById("DVR-mainMenu-11").style.backgroundColor = COLORDARKGRAY;
				}
			}
			else
			{
				//メニューが開いているときと閉じているときで選択色が異なる
				if(setteiSub == "done-open")
				{
					document.getElementById("DVR-auxiliary_1").className = "DVR-auxiliary";
					document.getElementById("DVR-mainMenu-11").style.backgroundColor = COLORLIGHTGRAY;
				}
				else
				{
					document.getElementById("DVR-auxiliary_1").className = "DVR-auxiliary2";
					document.getElementById("DVR-mainMenu-11").style.backgroundColor = COLORLIGHTBLUE;
				}
			}
			mouseOutFlg = false;
			break;
		case "履歴":
			if(mouseOutFlg ==true && onFocusMenuId == 29)
			{
				control = "on";
			}
			if(control == "off")
			{
				//メニューが開いているときと閉じているときで選択色が異なる
				if(rirekiSub == "done-open")
				{
					document.getElementById("DVR-auxiliary_2").className = "DVR-auxiliary2";
					document.getElementById("DVR-mainMenu-29").style.backgroundColor = COLORLIGHTBLUE;
				}
				else
				{
					document.getElementById("DVR-auxiliary_2").className = "DVR-auxiliary";
					document.getElementById("DVR-mainMenu-29").style.backgroundColor = COLORDARKGRAY;
				}
			}
			else
			{
				//メニューが開いているときと閉じているときで選択色が異なる
				if(rirekiSub == "done-open")
				{
					document.getElementById("DVR-auxiliary_2").className = "DVR-auxiliary";
					document.getElementById("DVR-mainMenu-29").style.backgroundColor = COLORLIGHTGRAY;
				}
				else
				{
					document.getElementById("DVR-auxiliary_2").className = "DVR-auxiliary2";
					document.getElementById("DVR-mainMenu-29").style.backgroundColor = COLORLIGHTBLUE;
				}
			}
			mouseOutFlg = false;
			break;
		case "保守":
			if(mouseOutFlg ==true && onFocusMenuId == 36)
			{
				control = "on";
			}
			if(control == "off")
			{
				//メニューが開いているときと閉じているときで選択色が異なる
				if(hosyuSub == "done-open")
				{
					document.getElementById("DVR-auxiliary_3").className = "DVR-auxiliary2";
					document.getElementById("DVR-mainMenu-36").style.backgroundColor = COLORLIGHTBLUE;
				}
				else
				{
					document.getElementById("DVR-auxiliary_3").className = "DVR-auxiliary";
					document.getElementById("DVR-mainMenu-36").style.backgroundColor = COLORDARKGRAY;
				}
			}
			else
			{
				//メニューが開いているときと閉じているときで選択色が異なる
				if(hosyuSub == "done-open")
				{
					document.getElementById("DVR-auxiliary_3").className = "DVR-auxiliary";
					document.getElementById("DVR-mainMenu-36").style.backgroundColor = COLORLIGHTGRAY;
				}
				else
				{
					document.getElementById("DVR-auxiliary_3").className = "DVR-auxiliary2";
					document.getElementById("DVR-mainMenu-36").style.backgroundColor = COLORLIGHTBLUE;
				}
			}
			mouseOutFlg = false;
			break;
		case "戻る":
			if(control == "off")
			{
				document.getElementById("DVR-mainMenu-52-shade").style.backgroundColor = COLORDARKGRAY;
			}
			else
			{
				document.getElementById("DVR-mainMenu-52-shade").style.backgroundColor = COLORLIGHTBLUE;
			}
			mouseOutFlg = false;
			break;
		default:
			var iLoop;
			var ID;
			for(iLoop = 0;iLoop<52;iLoop++)
			{
				if(eventMtx[iLoop][0] == target)
				{
					if(iLoop < 10)
					{
						ID = "0" + iLoop;
					}
					else
					{
						ID = iLoop;
					}
					break;
				}
			}
			
			//マウスクリックでメニュー選択後は処理しない
			if(document.getElementById("DVR-mainMenu-" + ID).style.width == "260px")
			{
				return;
			}
			if(mouseOutFlg ==true && onFocusMenuId == Number(ID))
			{
				control = "on";
			}
			if(control == "off")
			{
				document.getElementById("DVR-mainMenu-" + ID).style.backgroundColor = COLORLIGHTBLUE;
			}
			else
			{
				document.getElementById("DVR-mainMenu-" + ID).style.backgroundColor = COLORLIGHTGRAY;
			}
			mouseOutFlg = false;
			break;
		}
	}
	catch(error)
	{
		outputError(error);
	}
}


//----------------------------------------------------------------------------------------------------------------//
//関数名：getParameter
//引数：無
//戻値：以下のプロパティを持ったオブジェクトを返す
//			kengen		:1〜8(6は権限設定無、7はセコム保守、8は一時認証)
//			opeDevice	:操作元機器(CNVorNVR)
//			VPN			:アーカイブ運用有無(0:NVR、1〜5:CNV1〜5)
//			da			:デジタルアナログ判別
//			sFlag		:screenFlag
//サブメニュー表示に必要なパラメータを取得する関数
//----------------------------------------------------------------------------------------------------------------//
function getParameter()
{
	try
	{
		//戻り値となるオブジェクトの生成
		var paramObj = {
						kengen		:0,
						opeDevice	:0,
						VPN			:0,
						da			:0,
						sFlag		:0,
						reserveCopy	:0
						};

		//screenFlagの取得
		var paramsForMenuCreate;
		if(top.document)
		{
			paramsForMenuCreate = Spry.Utils.urlComponentToObject(top.location.search.replace(/^\?/, ""));
		}
		else
		{
			paramsForMenuCreate = Spry.Utils.urlComponentToObject(window.location.search.replace(/^\?/, ""));
		}
		paramObj.sFlag = paramsForMenuCreate.screenFlag.toString();
		
		//権限情報の取得
		paramObj.kengen = paramObj.sFlag.substring(3,4);
		
		//操作元機器
		paramObj.opeDevice = paramObj.sFlag.substring(0,1);
		
		//VPN接続有無
		if(paramObj.sFlag.substring(1,2) == "1")
		{
			paramObj.VPN = 1;
		}
		else
		{
			paramObj.VPN = 0;
		}
		
		//予約コピーの有無
		if(localStorage.yoyakuCopy == "1")
		{
			paramObj.reserveCopy = 1;
		}
		else
		{
			paramObj.reserveCopy = 0;
		}
		
		
		//デジタルアナログの判別
		switch(paramObj.sFlag.substring(4,5))
		{
			case "0":
				paramObj.da = "アナ";
				break;
			case "1":
				paramObj.da = "デジ";
				break;
			case "2":
				paramObj.da = "デジ";
				break;
			case "3":
				paramObj.da = "アナ";
				break;
			default:
				paramObj.da = "デジ";
				break;
		}
		
		//パラメータ取得完了
		consoleLogOutput(4,THISFILENAME,arguments.callee.name,"パラメータ取得完了",paramObj.kengen, paramObj.opeDevice+"", paramObj.VPN+"", paramObj.da+"", paramObj.sFlag, paramObj.reserveCopy+"");
		
		return paramObj;
	}
	catch(error)
	{
		outputError(error);
		return 0;
	}
}

//----------------------------------------------------------------------------------------------------------------//
//関数名：outputError
//引数：Error内容
//戻値：無
//try-catchで検出したError内容を出力する(DispWebViewが無効である場合はAlert出力する)
//----------------------------------------------------------------------------------------------------------------//
function outputError(error)
{
	if(dispWebViewFlag == "Active")
	{
		consoleLogOutput(1,THISFILENAME,arguments.callee.caller.name,error.description);
	}
	else
	{
		alert("関数" + arguments.callee.caller.name + "でError検出:" + error.description);
	}
}

//----------------------------------------------------------------------------------------------------------------//
//関数名：downScrollPro
//引数：現在位置のElementID
//戻値：無
//下へフォーカス移動する際にスクロールさせる処理
//----------------------------------------------------------------------------------------------------------------//
function downScrollPro(strD)
{
	var C_recordRootArr = new Array("00","11","29","36","52");
	var mainMenuSelectFlag = 0;
	var displayFlag = 0;
	var mainMenuHeight = 0;
	var subMenuHeadNum = 0;
	var SubMenuHeight = 0;
	var bigWordCount = 0;
	var subMenuCount = 0;
	var subMenuCountS;
	var tempID;
	var i;
	var numberOfSubMenu;
	
	var paramObj = getParameter();
	var sFlag = paramObj.sFlag.substring(4,5);
	
	if( document.getElementById("C-mainLeftMenu").scrollHeight > document.getElementById("C-mainLeftMenu").offsetHeight )
	{	
		if( strD != "DVR-mainMenu-51" )
		{
			//check which main-menu is extended
			for(var k=0;k<C_recordRootArr.length;k++)
			{
				//now,if there isn't display-div block,there isn't the scroll
				if(document.getElementById("DVR-mainMenu-" + C_recordRootArr[k] + "-display") && document.getElementById("DVR-mainMenu-" + C_recordRootArr[k] + "-display").style.display == "block")
				{
					displayFlag = 1;	//there is main-menu is extend
					break;
				}
			}
			
			//if the current focus is on the main-menu,and get it's location 
			for( var j=0; j<=C_recordRootArr.length; j++)
			{
				if(("DVR-mainMenu-" + C_recordRootArr[j]) == strD)
				{
					mainMenuSelectFlag = 1; //current focus is on the main-menu
					break;
				}
			}
			
			//if there is main-menu extending and the focus is on one sub-menu
			if( (displayFlag == 1) && (mainMenuSelectFlag == 0) )
			{
				//total main-menus' height = main-menus' height + spacings' height	
				mainMenuHeight = document.getElementById("DVR-mainMenu-00").offsetHeight * (k+1) + 5*(k+1);
				
				//big-page
				if(sFlag==0)
				{
					subMenuHeadNum = Number(C_recordRootArr[k]);
					SubMenuHeight = (Number(strD.substring(13,15)) - subMenuHeadNum) * document.getElementById(strD).offsetHeight;
				}
				//big-word-page
				if(sFlag==3)
				{
					subMenuHeadNum = Number(C_recordRootArr[k]);
					subMenuCount = 100 + subMenuHeadNum + 1; 
										
					//check the sub-menus' quantity
					switch(k)
					{
						case 0:
							numberOfSubMenu = 10;
							break;
						case 1:
							numberOfSubMenu = 17;
							break;
						case 2:
							numberOfSubMenu = 6;
							break;
						case 3:
							numberOfSubMenu = 14;
							break;
						default:
							break;
					}
					for(i=1; i<numberOfSubMenu; i++)
					{
						subMenuCountS = subMenuCount.toString();
						if((document.getElementById("DVR-mainMenu-" + subMenuCountS.substring(1,3)) != null) && (Number(subMenuCountS.substring(1,3)) <= Number(strD.substring(13,15))))
						{
							bigWordCount++ ;
						}
						subMenuCount++ ;
					}
					SubMenuHeight = document.getElementById(strD).offsetHeight * bigWordCount;
				}

				if( (mainMenuHeight + SubMenuHeight - document.getElementById("C-mainLeftMenu").scrollTop) > document.getElementById("C-mainLeftMenu").offsetHeight )
				{
					document.getElementById("C-mainLeftMenu").scrollTop = document.getElementById("C-mainLeftMenu").scrollTop + document.getElementById(strD).offsetHeight;
				}
			}
			
			//if there is main-menu extending and the current focus is on one main-menu
			if( (displayFlag == 1) && (mainMenuSelectFlag == 1) )
			{	
				//if the current-focus-mainmenu after the extending-mainmenu			
				if(j > k)
				{//if the focus is on the main-menu which after the display-menu
					switch(k)
					{
						case 0:
							numberOfSubMenu = 10;
							break;
						case 1:
							numberOfSubMenu = 17;
							break;
						case 2:
							numberOfSubMenu = 6;
							break;
						case 3:
							numberOfSubMenu = 14;
							break;
						default:
							break;
					}
					mainMenuHeight = document.getElementById(strD).offsetHeight * (j+1) + (5*(j+1));
					
					//big-page
					if(sFlag==0)
					{
						SubMenuHeight = numberOfSubMenu * document.getElementById(strD).offsetHeight;
					}
					
					//big-word-page
					if(sFlag==3)
					{
						subMenuHeadNum = Number(C_recordRootArr[k]);
						subMenuCount = 100 + subMenuHeadNum + 1; 
											
						//check the extended main-menu's sub-menus-quantity
						for(i=1; i<numberOfSubMenu; i++)
						{
							subMenuCountS = subMenuCount.toString();
							if(document.getElementById("DVR-mainMenu-" + subMenuCountS.substring(1,3)) != null)
							{
								bigWordCount++ ;
								tempID = "DVR-mainMenu-" + subMenuCountS.substring(1,3);
							}
							subMenuCount++ ;
						}
						SubMenuHeight = document.getElementById(tempID).offsetHeight * bigWordCount;
					}
				}
				
				//if the current-focus-mainmenu before or on the extending-mainmenu				
				if(j <= k)
				{
					mainMenuHeight = document.getElementById(strD).offsetHeight * (j+1);
				}
				
				if( (mainMenuHeight + SubMenuHeight - document.getElementById("C-mainLeftMenu").scrollTop) > document.getElementById("C-mainLeftMenu").offsetHeight )
				{
					document.getElementById("C-mainLeftMenu").scrollTop = document.getElementById("C-mainLeftMenu").scrollTop + document.getElementById(strD).offsetHeight + 5;
				}
			}
		}
	}
}


//----------------------------------------------------------------------------------------------------------------//
//関数名：upScrollPro
//引数：現在位置のElementID
//戻値：無
//上へフォーカス移動する際にスクロールさせる処理
//----------------------------------------------------------------------------------------------------------------//
function upScrollPro(strU)
{
	var C_recordRootArr = new Array("00","11","29","36","52");
	var upmainMenuSelectFlag=0;
	var updisplayFlag=0;
	var upmainMenuHeight=0;
	var upsubMenuHeadNum=0;
	var upSubMenuHeight=0;
	var upGap=0;
	var upSubMenuHeadNum=0;
	var upSubMenuCount=0;
	var upBigWordCount=0; 
	var upSubMenuCountS;
	var upTempID;
	var i;
	
	var paramObj = getParameter();
	var sFlag = paramObj.sFlag.substring(4,5);

	if( document.getElementById("C-mainLeftMenu").scrollHeight > document.getElementById("C-mainLeftMenu").offsetHeight )
	{		
		if(strU != "DVR-mainMenu-51")
		{
			//get the extended mainmenu's location
			for(var k=0; k<C_recordRootArr.length; k++)
			{
				//now,if there isn't display-div block,there isn't the scroll
				if(document.getElementById("DVR-mainMenu-" + C_recordRootArr[k] + "-display") && document.getElementById("DVR-mainMenu-" + C_recordRootArr[k] + "-display").style.display == "block")
				{
					upDisplayFlag = 1;	//there is main-menu is extend
					break;
				}
			}
			
			//check whether the current focus is on the mainmenu
			for( var j=0; j<=C_recordRootArr.length; j++)
			{
				if(("DVR-mainMenu-" + C_recordRootArr[j]) == strU)
				{
					upmainMenuSelectFlag = 1; //current focus is on the main-menu
					break;
				}
			}
			
			//the distance between scroll and bottom
			upGap = document.getElementById("C-mainLeftMenu").scrollHeight - document.getElementById("C-mainLeftMenu").offsetHeight - document.getElementById("C-mainLeftMenu").scrollTop;
			
			//there is main-menu is extended and the current focus is on the main-menu
			if((upDisplayFlag == 1) && (upmainMenuSelectFlag == 1))
			{
				//if the current-focus-mainmenu's location after the extending-mainmenu's
				if(j > k)
				{
					upmainMenuHeight = (C_recordRootArr.length - j) * document.getElementById(strU).offsetHeight;
				}
				
				//if the current-focus-mainmenu's location before or on the extending-mainmenu's
				if(j <= k)
				{
					var numberOfSubMenu;
					switch(k)
					{
						case 0:
							numberOfSubMenu = 10;
							break;
						case 1:
							numberOfSubMenu = 18;
							break;
						case 2:
							numberOfSubMenu = 6;
							break;
						case 3:
							numberOfSubMenu = 14;
							break;
						default:
							break;
					}
					upmainMenuHeight = (C_recordRootArr.length - (j+1)) * (document.getElementById(strU).offsetHeight + 5);
					//big-page
					if(sFlag==0)
					{
						upSubMenuHeight = numberOfSubMenu * document.getElementById("DVR-mainMenu-"+(Number(C_recordRootArr[k])+1)).offsetHeight;	
					}
					//big-word-page
					if(sFlag==3)
					{
						upSubMenuHeadNum = Number(C_recordRootArr[k]);
						upSubMenuCount = 100 + upSubMenuHeadNum + 1; 
											
						//check the extended main-menu's sub-menus-quantity 	
						for(i=1; i<numberOfSubMenu; i++)
						{
							upSubMenuCountS = upSubMenuCount.toString();
							if(document.getElementById("DVR-mainMenu-" + upSubMenuCountS.substring(1,3)) != null)
							{
								upBigWordCount++ ;
								upTempID = "DVR-mainMenu-" + upSubMenuCountS.substring(1,3);
							}
							upSubMenuCount++ ;
						}
						upSubMenuHeight = document.getElementById(upTempID).offsetHeight * upBigWordCount;
					}					
				}
				
				if( (upmainMenuHeight + upSubMenuHeight - upGap) > document.getElementById("C-mainLeftMenu").offsetHeight )
				{
					document.getElementById("C-mainLeftMenu").scrollTop = document.getElementById("C-mainLeftMenu").scrollTop - document.getElementById(strU).offsetHeight - 5;
				}
			}
			
			//there is main-menu is extended and the current focus is on the sub-menu
			if((upDisplayFlag == 1) && (upmainMenuSelectFlag == 0))
			{
				switch(k)
				{
					case 0:
						numberOfSubMenu = 10;
						break;
					case 1:
						numberOfSubMenu = 18;
						break;
					case 2:
						numberOfSubMenu = 6;
						break;
					case 3:
						numberOfSubMenu = 14;
						break;
					default:
						break;
				}
				upmainMenuHeight = (C_recordRootArr.length - (k+1)) * document.getElementById("DVR-mainMenu-00").offsetHeight;
				//big-page
				if(sFlag==0)
				{
					upsubMenuHeadNum = Number(C_recordRootArr[k]); 
					upSubMenuHeight = (numberOfSubMenu - (Number(strU.substring(13,15)) - upsubMenuHeadNum)) * document.getElementById(strU).offsetHeight;
				}
				//big-word-page
				if(sFlag==3)
				{
					upSubMenuHeadNum = Number(C_recordRootArr[k]);
					upSubMenuCount = 100 + upSubMenuHeadNum + 1; 
											
					//check the extended main-menu's sub-menus-quantity 	
					for(i=1; i<numberOfSubMenu; i++)
					{
						upSubMenuCountS = upSubMenuCount.toString();
						if( (document.getElementById("DVR-mainMenu-" + upSubMenuCountS.substring(1,3)) != null) && (Number(upSubMenuCountS.substring(1,3)) >= Number(strU.substring(13,15))) )
						{
							upBigWordCount++ ;
							upTempID = "DVR-mainMenu-" + upSubMenuCountS.substring(1,3);
						}
						upSubMenuCount++ ;
					}
					upSubMenuHeight = document.getElementById(upTempID).offsetHeight * upBigWordCount;
				}

				if((upmainMenuHeight + upSubMenuHeight - upGap) > document.getElementById("C-mainLeftMenu").offsetHeight)
				{
					document.getElementById("C-mainLeftMenu").scrollTop = document.getElementById("C-mainLeftMenu").scrollTop - document.getElementById(strU).offsetHeight;
				}
			}
		}
	}
}

function setMouseOutFlg(flg)
{
	mouseOutFlg = flg;
}

function focusChange(newID)
{
	var clearFocusMenuId = onFocusMenuId;
	onFocusMenuId = newID;
	menuFocusChange(eventMtx[clearFocusMenuId][0],"off");
	focusID = eventMtx[onFocusMenuId][0];
	menuFocusChange(focusID,"on");
}

function isMouseOverFlg()
{
	if(event.clientX==0 && event.clientY==0)
	{
		mouseOverFlg = false;
	}
}