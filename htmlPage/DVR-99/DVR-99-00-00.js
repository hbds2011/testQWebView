// JavaScript Document
/*****************************************************************************/
/* ファイル名		：Create_main.js				     */
/* 処理概要		：main page create				     */
/* using method		:    
	  The list of URL at the head of the file is used to change the menus' 
	link-file when you need.You can use the file to create the page-menu if 	
	you call the function "mainMenucreate(selectMenuID)",the "selectMenuID" 	
	is the ID of the current page you are writing,there is a value to return 	
	after calling  the function,0 stand for small page,1 stand for big page,	
	please get it and deal with in your file.Of course,you should link the
	"Create_main.js" and "Create_main.css" to your file's head.          */
/*****************************************************************************/

//DVR-mainMenu
var url_DVR_01="../DVR-01-00-00/DVR-01-00-00.html" ;
var url_DVR_02="../DVR-02-00-00/DVR-02-00-00.html" ;
var url_DVR_03="../DVR-03-00-00/DVR-03-00-00.html" ;
var url_DVR_04="../DVR-04-00-00/DVR-04-00-00.html" ;
//DVR-01-subMenu
var url_DVR_01_01="../DVR-01-01-00/DVR-01-01-00.html?Menu=1_01&screenFlag=" ;
var url_DVR_01_01_BIG="../DVR-01-01-00/DVR-01-01-00-BIG.html?Menu=1_01&screenFlag=" ; //add 2011-02-21
var url_DVR_01_02="../DVR-01-02-00/DVR-01-02-00.html?Menu=1_02&screenFlag=" ;
var url_DVR_01_03="../DVR-01-03-00/DVR-01-03-00.html?Menu=1_03&screenFlag=" ;
var url_DVR_01_04="../DVR-01-04-00/DVR-01-04-00.html?Menu=1_04&screenFlag=" ;
var url_DVR_01_05="../DVR-01-05-00/DVR-01-05-00.html?Menu=1_05&screenFlag=" ;
var url_DVR_01_06="../DVR-01-06-00/DVR-01-06-00.html?Menu=1_06&screenFlag=" ;
var url_DVR_01_07="../DVR-01-07-02/DVR-01-07-02.html?Menu=1_07&screenFlag=" ;
var url_DVR_01_08="../DVR-01-08-02/DVR-01-08-02.html?Menu=1_08&screenFlag=" ;
var url_DVR_01_09="../DVR-01-09-02/DVR-01-09-02.html?Menu=1_09&screenFlag=" ;
var url_DVR_01_10="../DVR-01-10-02/DVR-01-10-02.html?Menu=1_10&screenFlag=" ;
//var url_DVR_01_11="../DVR-01-01-01/DVR-01-01-01.html?Menu=1_1&screenFlag=" ;//overage
//DVR-02-subMenu
var url_DVR_02_01="../DVR-02-01-00/DVR-02-01-00.html?Menu=2_12&screenFlag=" ;
var url_DVR_02_02="../DVR-02-02-00/DVR-02-02-00.html?Menu=2_13&screenFlag=" ;
var url_DVR_02_02_BIG="../DVR-02-02-00/DVR-02-02-00-BIG.html?Menu=2_13&screenFlag=" ;
var url_DVR_02_03="../DVR-02-03-00/DVR-02-03-00.html?Menu=2_14&screenFlag=" ;
var url_DVR_02_04="../DVR-02-04-00/DVR-02-04-00.html?Menu=2_15&screenFlag=" ;
var url_DVR_02_04_BIG="../DVR-02-04-00/DVR-02-04-00-BIG.html?Menu=2_15&screenFlag=" ;
var url_DVR_02_05="../DVR-02-05-00/DVR-02-05-00.html?Menu=2_16&screenFlag=" ;
var url_DVR_02_06="../DVR-02-06-00/DVR-02-06-00.html?Menu=2_17&screenFlag=" ;
var url_DVR_02_06_BIG="../DVR-02-06-00/DVR-02-06-00-BIG.html?Menu=2_17&screenFlag=" ;
var url_DVR_02_07="../DVR-02-07-00/DVR-02-07-00.html?Menu=2_18&screenFlag=" ;
var url_DVR_02_08="../DVR-02-08-00/DVR-02-08-00.html?Menu=2_19&screenFlag=" ;
var url_DVR_02_09="../DVR-02-09-00/DVR-02-09-00.html?Menu=2_20&screenFlag=" ;
var url_DVR_02_10="../DVR-02-10-00/DVR-02-10-00.html?Menu=2_21&screenFlag=" ;
var url_DVR_02_10_BIG="../DVR-02-10-00/DVR-02-10-00-BIG.html?Menu=2_21&screenFlag=" ;//added by luo 20110722
var url_DVR_02_11="../DVR-02-11-00/DVR-02-11-00.html?Menu=2_22&screenFlag=" ;
var url_DVR_02_12="../DVR-02-12-00/DVR-02-12-00.html?Menu=2_23&screenFlag=" ;
var url_DVR_02_13="../DVR-02-13-00/DVR-02-13-00.html?Menu=2_24&screenFlag=" ;
var url_DVR_02_14="../DVR-02-14-00/DVR-02-14-00.html?Menu=2_25&screenFlag=" ;
var url_DVR_02_15="../DVR-02-15-00/DVR-02-15-00.html?Menu=2_26&screenFlag=" ;
var url_DVR_02_16="../DVR-02-16-00/DVR-02-16-00.html?Menu=2_27&screenFlag=" ;
var url_DVR_02_17="../DVR-02-17-00/DVR-02-17-00.html?Menu=2_28&screenFlag=" ;
//DVR-03-subMenu
var url_DVR_03_01="../DVR-03-01-00/DVR-03-01-00.html?Menu=3_30&screenFlag=" ;
var url_DVR_03_02="../DVR-03-02-00/DVR-03-02-00.html?Menu=3_31&screenFlag=" ;
var url_DVR_03_03="../DVR-03-03-00/DVR-03-03-00.html?Menu=3_32&screenFlag=" ;
var url_DVR_03_04="../DVR-03-04-00/DVR-03-04-00.html?Menu=3_33&screenFlag=" ;
var url_DVR_03_05="../DVR-03-05-00/DVR-03-05-00.html?Menu=3_34&screenFlag=" ;
var url_DVR_03_06="../DVR-03-06-00/DVR-03-06-00.html?Menu=3_35&screenFlag=" ;
var url_DVR_03_01_BIG="../DVR-03-01-00/DVR-03-01-00-BIG.html?Menu=3_30&screenFlag=" ;
var url_DVR_03_02_BIG="../DVR-03-02-00/DVR-03-02-00-BIG.html?Menu=3_31&screenFlag=" ;
var url_DVR_03_03_BIG="../DVR-03-03-00/DVR-03-03-00-BIG.html?Menu=3_32&screenFlag=" ;
var url_DVR_03_04_BIG="../DVR-03-04-00/DVR-03-04-00-BIG.html?Menu=3_33&screenFlag=" ;
var url_DVR_03_05_BIG="../DVR-03-05-00/DVR-03-05-00-BIG.html?Menu=3_34&screenFlag=" ;
//DVR-04-subMenu
var url_DVR_04_01="../DVR-04-01-00/DVR-04-01-00.html?Menu=4_37&screenFlag=" ;
var url_DVR_04_02="../DVR-04-02-00/DVR-04-02-00.html?Menu=4_38&screenFlag=" ;
var url_DVR_04_03="../DVR-04-03-00/DVR-04-03-00.html?Menu=4_39&screenFlag=" ;
var url_DVR_04_04="../DVR-04-04-00/DVR-04-04-00.html?Menu=4_40&screenFlag=" ;
var url_DVR_04_05="../DVR-04-05-00/DVR-04-05-00.html?Menu=4_41&screenFlag=" ;
var url_DVR_04_06="../DVR-04-06-00/DVR-04-06-00.html?Menu=4_42&screenFlag=" ;
var url_DVR_04_07="nstc" ;
var url_DVR_04_08="../DVR-04-08-00/DVR-04-08-00.html?Menu=4_44&screenFlag=" ;
var url_DVR_04_09="../DVR-04-09-00/DVR-04-09-00.html?Menu=4_45&screenFlag=" ;
var url_DVR_04_10="../DVR-04-10-00/DVR-04-10-00.html?Menu=4_46&screenFlag=" ;
var url_DVR_04_11="../DVR-04-11-00/DVR-04-11-00.html?Menu=4_47&screenFlag=" ;
var url_DVR_04_12="../DVR-04-12-00/DVR-04-12-00.html?Menu=4_48&screenFlag=" ;
var url_DVR_04_13="../DVR-04-13-00/DVR-04-13-00.html?Menu=4_49&screenFlag=" ;
var url_DVR_04_14="../DVR-04-14-00/DVR-04-14-00.html?Menu=4_50&screenFlag=" ;
var url_DVR_04_15="../DVR-04-15-00/DVR-04-15-00.html?Menu=4_50&screenFlag=" ;
var url_DVR_04_16="../DVR-04-16-00/DVR-04-16-00.html?Menu=4_51&screenFlag=" ;

var main_menuArr1=new Array(["検索",""],["設定",url_DVR_02],["履歴",url_DVR_03],["保守",url_DVR_04]) ;
var main_menuArr2=new Array(["設定",""],["履歴",url_DVR_03],["保守",url_DVR_04],["検索",url_DVR_01]) ;
var main_menuArr3=new Array(["履歴",""],["保守",url_DVR_04],["検索",url_DVR_01],["設定",url_DVR_02]) ;
var main_menuArr4=new Array(["保守",""],["検索",url_DVR_01],["設定",url_DVR_02],["履歴",url_DVR_03]) ;


	var paramsForMenuCreate;
	if(top.document){
		paramsForMenuCreate = Spry.Utils.urlComponentToObject(top.location.search.replace(/^\?/, ""));
	}else{
		paramsForMenuCreate = Spry.Utils.urlComponentToObject(window.location.search.replace(/^\?/, ""));
	}
	if(paramsForMenuCreate.screenFlag.toString().substring(0,1)==0)
	{

		//NVRのメニュー(全て自機器コンテンツとする)

		var submenu1=new Array(["検索","#",""],["時間検索",url_DVR_01_01,"0"],["イベント検索",url_DVR_01_02,"0"],["サムネイル検索",url_DVR_01_03,"0"],["画像変化検索",url_DVR_01_04,"0"],["マルチ再生",url_DVR_01_05,"0"],["コピー状態確認",url_DVR_01_06,"0"],["画像コピー",url_DVR_01_07,"0"],["ダイレクトコピー",url_DVR_01_08,"0"],["画像ダウンロード",url_DVR_01_09,"0"],["予約コピー",url_DVR_01_10,"0"]) ;


		//var submenu2=new Array(["設定","#",""],["機器構成",url_DVR_02_01,"0"],["ネットワーク設定",url_DVR_02_02,"1"],["VPN接続状態確認",url_DVR_02_03,"1"],["時刻設定",url_DVR_02_04,"1"],["認証設定",url_DVR_02_05,"1"],["HDD運用",url_DVR_02_06,"1"],["名称設定",url_DVR_02_07,"0"],["レイアウト設定",url_DVR_02_08,"1"],["モニタ設定",url_DVR_02_09,"1"],["カメラ設定",url_DVR_02_10,"0"],["入出力設定",url_DVR_02_11,"1"],["簡単記録設定",url_DVR_02_12,"1"],["詳細記録設定",url_DVR_02_13,"1"],["特定日記録設定",url_DVR_02_14,"1"],["記録設定確認",url_DVR_02_15,"1"],["記録負荷確認",url_DVR_02_16,"1"],["記録状態確認",url_DVR_02_17,"1"]) ;
		var submenu2=new Array(["設定","#",""],["機器構成設定",url_DVR_02_01,"0"],["ネットワーク設定",url_DVR_02_02,"0"],["VPN接続状態確認",url_DVR_02_03,"0"],["時刻設定",url_DVR_02_04,"0"],["認証設定",url_DVR_02_05,"0"],["HDD運用設定",url_DVR_02_06,"0"],["名称設定",url_DVR_02_07,"0"],["レイアウト設定",url_DVR_02_08,"0"],["モニター設定",url_DVR_02_09,"0"],["カメラ設定",url_DVR_02_10,"0"],["接点入出力設定",url_DVR_02_11,"0"],["簡単記録設定",url_DVR_02_12,"0"],["詳細記録設定",url_DVR_02_13,"0"],["特定日記録設定",url_DVR_02_14,"0"],["記録設定確認",url_DVR_02_15,"0"],["記録負荷確認",url_DVR_02_16,"0"],["記録状態確認",url_DVR_02_17,"0"]) ;//modified by Japan  20110706

		var submenu3=new Array(["履歴","#",""],["異常履歴",url_DVR_03_01,"0"],["接点入出力履歴",url_DVR_03_02,"0"],["記録履歴",url_DVR_03_03,"0"],["操作履歴",url_DVR_03_04,"0"],["メニュー操作履歴",url_DVR_03_05,"0"],["履歴保存",url_DVR_03_06,"0"]) ;

		var submenu4=new Array(["保守","#",""],["HDD保守",url_DVR_04_01,"0"],["ピント調整モード",url_DVR_04_02,"0"],["記録・再生管理",url_DVR_04_03,"0"],["帯域制限",url_DVR_04_04,"0"],["システム停止",url_DVR_04_05,"0"],["リモート接続",url_DVR_04_06,"0"],["NTSC出力",url_DVR_04_07,"0"],["設定保存・読込",url_DVR_04_08,"0"],["初期化",url_DVR_04_09,"0"],["バージョンアップ",url_DVR_04_10,"0"],["LANテスト",url_DVR_04_11,"0"],["HDD詳細",url_DVR_04_12,"0"],["機器異常詳細設定",url_DVR_04_13,"0"],["温度履歴",url_DVR_04_15,"0"],["その他",url_DVR_04_16,"0"]) ;


		// ADD 2011-03-25
		var submenu1_1=new Array(["検索","#",""],["時間検索",url_DVR_01_01_BIG,"0"],["イベント検索",url_DVR_01_02,"0"],["サムネイル検索",url_DVR_01_03,"0"],["画像変化検索",url_DVR_01_04,"0"],["マルチ再生",url_DVR_01_05,"0"],["コピー状態確認",url_DVR_01_06,"0"],["画像コピー",url_DVR_01_07,"0"],["ダイレクトコピー",url_DVR_01_08,"0"],["画像ダウンロード",url_DVR_01_09,"0"],["予約コピー",url_DVR_01_10,"0"]) ;


		//var submenu2_1=new Array(["設定","#",""],["機器構成",url_DVR_02_01,"0"],["ネットワーク設定",url_DVR_02_02_BIG,"1"],["VPN接続状態確認",url_DVR_02_03,"1"],["時刻設定",url_DVR_02_04_BIG,"1"],["認証設定",url_DVR_02_05,"1"],["HDD運用",url_DVR_02_06_BIG,"1"],["名称設定",url_DVR_02_07,"0"],["レイアウト設定",url_DVR_02_08,"1"],["モニタ設定",url_DVR_02_09,"1"],["カメラ設定",url_DVR_02_10,"1"],["入出力設定",url_DVR_02_11,"1"],["簡単記録設定",url_DVR_02_12,"1"],["詳細記録設定",url_DVR_02_13,"1"],["特定日記録設定",url_DVR_02_14,"1"],["記録設定確認",url_DVR_02_15,"1"],["記録負荷確認",url_DVR_02_16,"1"],["記録状態確認",url_DVR_02_17,"1"]) ;
		//var submenu2_1=new Array(["設定","#",""],["機器構成",url_DVR_02_01,"0"],["ネットワーク設定",url_DVR_02_02_BIG,"1"],["VPN接続状態確認",url_DVR_02_03,"1"],["時刻設定",url_DVR_02_04_BIG,"1"],["認証設定",url_DVR_02_05,"1"],["HDD運用",url_DVR_02_06_BIG,"1"],["名称設定",url_DVR_02_07,"0"],["レイアウト設定",url_DVR_02_08,"1"],["モニター設定",url_DVR_02_09,"1"],["カメラ設定",url_DVR_02_10_BIG,"0"],["入出力設定",url_DVR_02_11,"1"],["簡単記録設定",url_DVR_02_12,"1"],["詳細記録設定",url_DVR_02_13,"1"],["特定日記録設定",url_DVR_02_14,"1"],["記録設定確認",url_DVR_02_15,"1"],["記録負荷確認",url_DVR_02_16,"1"],["記録状態確認",url_DVR_02_17,"1"]) ;//modified by Japan 20110706
		var submenu2_1=new Array(["設定","#",""],["機器構成設定",url_DVR_02_01,"0"],["ネットワーク設定",url_DVR_02_02_BIG,"0"],["VPN接続状態確認",url_DVR_02_03,"0"],["時刻設定",url_DVR_02_04_BIG,"0"],["認証設定",url_DVR_02_05,"0"],["HDD運用設定",url_DVR_02_06_BIG,"0"],["名称設定",url_DVR_02_07,"0"],["レイアウト設定",url_DVR_02_08,"0"],["モニター設定",url_DVR_02_09,"0"],["カメラ設定",url_DVR_02_10,"0"],["接点入出力設定",url_DVR_02_11,"0"],["簡単記録設定",url_DVR_02_12,"0"],["詳細記録設定",url_DVR_02_13,"0"],["特定日記録設定",url_DVR_02_14,"0"],["記録設定確認",url_DVR_02_15,"0"],["記録負荷確認",url_DVR_02_16,"0"],["記録状態確認",url_DVR_02_17,"0"]) ;//modified by Japan 20110914
		var submenu3_1=new Array(["履歴","#",""],["異常履歴",url_DVR_03_01_BIG,"0"],["接点入出力履歴",url_DVR_03_02_BIG,"0"],["記録履歴",url_DVR_03_03_BIG,"0"],["操作履歴",url_DVR_03_04_BIG,"0"],["メニュー操作履歴",url_DVR_03_05_BIG,"0"],["履歴保存",url_DVR_03_06,"0"]) ;


	}
	else
	{

		//CNVのメニュー(自機器コンテンツとNVRコンテンツの区別をつける)

		var submenu1=new Array(["検索","#",""],["時間検索",url_DVR_01_01,"0"],["イベント検索",url_DVR_01_02,"0"],["サムネイル検索",url_DVR_01_03,"0"],["画像変化検索",url_DVR_01_04,"0"],["マルチ再生",url_DVR_01_05,"0"],["コピー状態確認",url_DVR_01_06,"1"],["画像コピー",url_DVR_01_07,"1"],["ダイレクトコピー",url_DVR_01_08,"1"],["画像ダウンロード",url_DVR_01_09,"1"],["予約コピー",url_DVR_01_10,"1"]) ;


		//var submenu2=new Array(["設定","#",""],["機器構成",url_DVR_02_01,"0"],["ネットワーク設定",url_DVR_02_02,"1"],["VPN接続状態確認",url_DVR_02_03,"1"],["時刻設定",url_DVR_02_04,"1"],["認証設定",url_DVR_02_05,"1"],["HDD運用",url_DVR_02_06,"1"],["名称設定",url_DVR_02_07,"0"],["レイアウト設定",url_DVR_02_08,"1"],["モニタ設定",url_DVR_02_09,"1"],["カメラ設定",url_DVR_02_10,"0"],["入出力設定",url_DVR_02_11,"1"],["簡単記録設定",url_DVR_02_12,"1"],["詳細記録設定",url_DVR_02_13,"1"],["特定日記録設定",url_DVR_02_14,"1"],["記録設定確認",url_DVR_02_15,"1"],["記録負荷確認",url_DVR_02_16,"1"],["記録状態確認",url_DVR_02_17,"1"]) ;
		var submenu2=new Array(["設定","#",""],["機器構成設定",url_DVR_02_01,"0"],["ネットワーク設定",url_DVR_02_02,"1"],["VPN接続状態確認",url_DVR_02_03,"1"],["時刻設定",url_DVR_02_04,"1"],["認証設定",url_DVR_02_05,"1"],["HDD運用設定",url_DVR_02_06,"1"],["名称設定",url_DVR_02_07,"0"],["レイアウト設定",url_DVR_02_08,"1"],["モニター設定",url_DVR_02_09,"1"],["カメラ設定",url_DVR_02_10,"0"],["接点入出力設定",url_DVR_02_11,"1"],["簡単記録設定",url_DVR_02_12,"1"],["詳細記録設定",url_DVR_02_13,"1"],["特定日記録設定",url_DVR_02_14,"1"],["記録設定確認",url_DVR_02_15,"1"],["記録負荷確認",url_DVR_02_16,"1"],["記録状態確認",url_DVR_02_17,"1"]) ;//modified by Japan  20110706

		var submenu3=new Array(["履歴","#",""],["異常履歴",url_DVR_03_01,"1"],["接点入出力履歴",url_DVR_03_02,"1"],["記録履歴",url_DVR_03_03,"1"],["操作履歴",url_DVR_03_04,"1"],["メニュー操作履歴",url_DVR_03_05,"1"],["履歴保存",url_DVR_03_06,"1"]) ;

		var submenu4=new Array(["保守","#",""],["HDD保守",url_DVR_04_01,"1"],["ピント調整モード",url_DVR_04_02,"0"],["記録・再生管理",url_DVR_04_03,"1"],["帯域制限",url_DVR_04_04,"1"],["システム停止",url_DVR_04_05,"1"],["リモート接続",url_DVR_04_06,"1"],["NTSC出力",url_DVR_04_07,"0"],["設定保存・読込",url_DVR_04_08,"0"],["初期化",url_DVR_04_09,"1"],["バージョンアップ",url_DVR_04_10,"0"],["LANテスト",url_DVR_04_11,"0"],["HDD詳細",url_DVR_04_12,"0"],["機器異常詳細設定",url_DVR_04_13,"0"],["温度履歴",url_DVR_04_15,"0"],["その他",url_DVR_04_16,"0"]) ;


		// ADD 2011-03-25
		var submenu1_1=new Array(["検索","#",""],["時間検索",url_DVR_01_01_BIG,"0"],["イベント検索",url_DVR_01_02,"0"],["サムネイル検索",url_DVR_01_03,"0"],["画像変化検索",url_DVR_01_04,"0"],["マルチ再生",url_DVR_01_05,"0"],["コピー状態確認",url_DVR_01_06,"1"],["画像コピー",url_DVR_01_07,"1"],["ダイレクトコピー",url_DVR_01_08,"0"],["画像ダウンロード",url_DVR_01_09,"0"],["予約コピー",url_DVR_01_10,"0"]) ;


		//var submenu2_1=new Array(["設定","#",""],["機器構成",url_DVR_02_01,"0"],["ネットワーク設定",url_DVR_02_02_BIG,"1"],["VPN接続状態確認",url_DVR_02_03,"1"],["時刻設定",url_DVR_02_04_BIG,"1"],["認証設定",url_DVR_02_05,"1"],["HDD運用",url_DVR_02_06_BIG,"1"],["名称設定",url_DVR_02_07,"0"],["レイアウト設定",url_DVR_02_08,"1"],["モニタ設定",url_DVR_02_09,"1"],["カメラ設定",url_DVR_02_10,"1"],["入出力設定",url_DVR_02_11,"1"],["簡単記録設定",url_DVR_02_12,"1"],["詳細記録設定",url_DVR_02_13,"1"],["特定日記録設定",url_DVR_02_14,"1"],["記録設定確認",url_DVR_02_15,"1"],["記録負荷確認",url_DVR_02_16,"1"],["記録状態確認",url_DVR_02_17,"1"]) ;
		//var submenu2_1=new Array(["設定","#",""],["機器構成",url_DVR_02_01,"0"],["ネットワーク設定",url_DVR_02_02_BIG,"1"],["VPN接続状態確認",url_DVR_02_03,"1"],["時刻設定",url_DVR_02_04_BIG,"1"],["認証設定",url_DVR_02_05,"1"],["HDD運用",url_DVR_02_06_BIG,"1"],["名称設定",url_DVR_02_07,"0"],["レイアウト設定",url_DVR_02_08,"1"],["モニター設定",url_DVR_02_09,"1"],["カメラ設定",url_DVR_02_10_BIG,"0"],["入出力設定",url_DVR_02_11,"1"],["簡単記録設定",url_DVR_02_12,"1"],["詳細記録設定",url_DVR_02_13,"1"],["特定日記録設定",url_DVR_02_14,"1"],["記録設定確認",url_DVR_02_15,"1"],["記録負荷確認",url_DVR_02_16,"1"],["記録状態確認",url_DVR_02_17,"1"]) ;//modified by Japan 20110706
		var submenu2_1=new Array(["設定","#",""],["機器構成設定",url_DVR_02_01,"0"],["ネットワーク設定",url_DVR_02_02_BIG,"1"],["VPN接続状態確認",url_DVR_02_03,"1"],["時刻設定",url_DVR_02_04_BIG,"1"],["認証設定",url_DVR_02_05,"1"],["HDD運用設定",url_DVR_02_06_BIG,"1"],["名称設定",url_DVR_02_07,"0"],["レイアウト設定",url_DVR_02_08,"1"],["モニター設定",url_DVR_02_09,"1"],["カメラ設定",url_DVR_02_10,"1"],["接点入出力設定",url_DVR_02_11,"1"],["簡単記録設定",url_DVR_02_12,"1"],["詳細記録設定",url_DVR_02_13,"1"],["特定日記録設定",url_DVR_02_14,"1"],["記録設定確認",url_DVR_02_15,"1"],["記録負荷確認",url_DVR_02_16,"1"],["記録状態確認",url_DVR_02_17,"1"]) ;//modified by Japan 20110914
		var submenu3_1=new Array(["履歴","#",""],["異常履歴",url_DVR_03_01_BIG,"1"],["接点入出力履歴",url_DVR_03_02_BIG,"1"],["記録履歴",url_DVR_03_03_BIG,"1"],["操作履歴",url_DVR_03_04_BIG,"1"],["メニュー操作履歴",url_DVR_03_05_BIG,"1"],["履歴保存",url_DVR_03_06,"1"]) ;

	}


var main_SubMenu = new Array(submenu1,submenu2,submenu3,submenu4) ;
var main_Menu = new Array(main_menuArr1,main_menuArr2,main_menuArr3,main_menuArr4) ;
var DVR99serUrl = "" ;
var dsNSTC = new Spry.Data.XMLDataSet("", "Success") ;
var dsPSP = new Spry.Data.XMLDataSet(null, "Results") ;
var dsIPAdress; // = new Spry.Data.NestedXMLDataSet(dsPSP, "IPAdress") ;
var dsDVR99Menu; // = new Spry.Data.NestedXMLDataSet(dsPSP, "Menu");
var DVR99pageState = 0 ;	//big and small page's flag"
var mScaCopyStatusFlag = 1 ;//セコム保守・その他 スケジュールコピー 0:OFF 1:ON
var mVPNStatusFlag = 1 ;	//1:VPNあり		0:VPNなし	
var mPermStatusFlag = 1 ;	//権限   0:モードロック  1:セコム保守	2:権限１  3:権限２  4:権限３  5:権限４  6:権限５
var mArchiveFlag = 1 ;		//1:アーカイブ運用時 
var recordFlag;
var mIPAdress="" ;			//IP address	
var DVR99selectMenuID ;		//the menuID which as the parameter of the mainMenucreate(ID)'s ID
var arrayRight_DVR_VPN_Exist = new Array(48);//whether the display according to judge to authority .1 is a privilege, 0 does not have permission
var C_enterID = "DVR-mainMenu-00" ;
var linkAdd ;
var C_recordBefDis = "" ;
var C_recordRootArr = new Array() ;
var imgflag=1;
var color1="#9900FF";
var colorGray="#536675";//
var colorLightBlue="#55A5CD";
var colorBlack="#1A1A1A";//
var colorLightGray="#506473";
var colorDarkGray="#363636";
var Display_sub_menu="01";	/*modified by Freya 11.07.18(00->01)*/
var ip;
var pageMagnification=null;   //david 2011.06.23 page magnification
var paramsForImg = Spry.Utils.getLocationParamsAsObject();
var ipArray;
var imgIP;
var mainMenuFocusFlag = false;
var saved_menu_ActiveElement = null;  // restore active element
var saved_menu_BodyAction = null;     //  restoren active what had done

var perZoomWait = true;

// VGA画面のスケーリング用に保持するパラメータ
var scaleParamForVGA="&PM=";
// 直接ライブ画面から呼び出される画面
var directDispIdList = new Array("DVR-01-01-00"
								,"DVR-01-06-00"
								,"DVR-01-07-00"
								,"DVR-01-07-02"
								,"DVR-01-08-00"
								,"DVR-01-08-02"
								,"DVR-01-09-00"
								,"DVR-01-09-02");

if(paramsForImg.parentIP!=undefined&&paramsForImg.parentIP!=''){
	ipArray = paramsForImg.parentIP.split("|");
	imgIP=ipArray[0];	
}else{
	imgIP=window.location.host;
}

//the function to create menus
function C_menuCreate(headID,subID,subStatus)
{
	dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN");
	//iDebug('Step In C_menuCreate! current host is :'+ window.location.host);
	var menuCount = 100 ;
	var subCount = 100 ;
	var menuCountStr ;
	var menuCountSub ;
	var menuCountNum ;
	var newDisDiv ;
	var rootCount = 0 ;
	
	var tmpScreenFlag = DVR99pageState.toString().substring(4,5);
	//mainParent = document.getElementById("C-Mainbody") ;
	//divBefore = document.getElementById("C-MainsideRight") ;
	
	/*var newLeftDiv = document.createElement("div") ;
	newLeftDiv.id = "C-mainLeftMenu" ;
	mainParent.insertBefore(newLeftDiv,divBefore) ;
	parentLeft = document.getElementById("C-mainLeftMenu") ;
	//-----------added by Freya start 11.03.19--------------//
	//parentLeft.onkeydown = function(){main_keyClick(event)} ;
	//-----------added by Freya end 11.03.19----------------//
	
	var newTopDiv = document.createElement("div") ;
	newTopDiv.className = "C-mainTopMenu" ;
	mainParent.insertBefore(newTopDiv,divBefore) ;*/
	//document.body.appendChild
	parentLeft = top.menu.document.getElementById("C-mainLeftMenu") ;
	for(var i=0;i<4;i++){
		subCount = 100 ;			//clear the subCount ;
		
		if(main_Menu[i].length!=0){
			//▼=====大項目表示チェック処理=====▼//
			var main_disp_flg = false; // 大項目表示判断フラグ

			// 他の大項目で既に作成済のサブメニュー数計算
			// ※作成メニュー数 - 変数初期値(100) - 表示済大項目数
			var disp_num      = menuCount - 100 - i;

			// 大項目で作成するサブメニュー数
			// ※メニュー開始番号 + サブメニュー数 - 2(表示予定大項目が含まれる為1引く、開始番号からスタートしているので1引く)
			var disp_sub_num  = disp_num + main_SubMenu[i].length - 2; 

			// サブメニューを1つでも表示するならば大項目も表示する
			for(var j = disp_num; j < disp_sub_num; j ++) {
				if(arrayRight_DVR_VPN_Exist[j] == 1) {
					main_disp_flg = true;
					break;
				}
			}

			// 大項目が非表示の場合、次の大項目スタート位置を計算してcontinue
			if(!main_disp_flg) {
				menuCount = menuCount + main_SubMenu[i].length;
				continue;
			}
			//▲=====大項目表示チェック処理=====▲//
		
			//alert(ip);
			for(var iSub=0;iSub<main_SubMenu[i].length;iSub++){
				menuCountStr = menuCount.toString() ;				
				menuCountSub = menuCountStr.substring(1,3) ;
				menuCount++ ;
				if(main_SubMenu[i][iSub][1]=="#"){	
					//avoid have a line between root's div and display-div
					var newGBDiv = document.createElement("div") ;
					newGBDiv.className = "C-displayDiv" ;
					parentLeft.appendChild(newGBDiv) ;
					
					//add the root's div
					var newDiv = document.createElement("div") ; 
					newDiv.id = "DVR-mainMenu-"+ menuCountSub ;
					newDiv.name = "DVR-0" + (i+1) + "-00-00" ;
					newDiv.className = "C-mainTitle" ;
/*---- added by Freya start 11.07.17 (once the mouse is over the root-menu,root-menu's background-color is LightBlue ) -----*/
					newDiv.onmouseover = function(){MainMenuMouseOverProcess(this.id);};
					newDiv.onmouseout = function(){MainMenuMouseOutProcess(this.id);};
/*---- added by Freya end 11.07.17 -----------------------------------------------------------------------------------------*/
					
					var newDiv_auxiliary  = document.createElement("div") ; 
					newDiv_auxiliary .id ="DVR-auxiliary_"+i;
					newDiv_auxiliary .name ="DVR-auxiliary_"+i;
					newDiv_auxiliary .className = "DVR-auxiliary" ;
					
					if((headID=="00")&&(i==0)){
						newDiv.style.backgroundColor = colorGray ;
					}					
					newDiv_auxiliary.appendChild(newDiv) ;
					
					newGBDiv.appendChild(newDiv_auxiliary) ;
					C_recordRootArr[rootCount] = newDiv.id ;		//record the root's div
					rootCount++ ;						
					var newImg = document.createElement("img") ;
					newImg.id = "DVR-mainMenu-" + menuCountSub + "-img" ;
					newImg.name = "DVR-mainMenu-" + menuCountSub ;
					if(subStatus=="true"){
						//Edit BY hlzhang 2011/05/16 Start
						//メニューは文字だけでなく、色のついているところをクリック可とすること。
						//newImg.onclick = function(){C_maindisplayPro(this.name)} ;
						newDiv.onclick = function(){C_maindisplayPro(this.id);} ;
						//Edit BY hlzhang 2011/05/16 End
					}
					newImg.className = "C-mainImage" ;
				
					if(newImg.name=="DVR-mainMenu-00"&&headID==1)
					{    // alert(ip);
						newImg.src = "//"+imgIP+"/images/DVR-99-00-00-01-02" + calibrationIcon() + ".png" ;
					}else if(newImg.name=="DVR-mainMenu-11"&&headID==2)
					{
						newImg.src = "//"+imgIP+"/images/DVR-99-00-00-02-02" + calibrationIcon() + ".png" ;
					}else if(newImg.name=="DVR-mainMenu-29"&&headID==3)
					{
						newImg.src = "//"+imgIP+"/images/DVR-99-00-00-03-02" + calibrationIcon() + ".png" ;
					}else if(newImg.name=="DVR-mainMenu-36"&&headID==4)
					{
						newImg.src = "//"+imgIP+"/images/DVR-99-00-00-04-02" + calibrationIcon() + ".png" ;
					}
					else
					{
						if(newImg.name=="DVR-mainMenu-00")
						{
							newImg.src = "//"+imgIP+"/images/DVR-99-00-00-01-01" + calibrationIcon() + ".png" ;
						}
						if(newImg.name=="DVR-mainMenu-11")
						{
							newImg.src = "//"+imgIP+"/images/DVR-99-00-00-02-01" + calibrationIcon() + ".png" ;
						}
						if(newImg.name=="DVR-mainMenu-29")
						{
							newImg.src = "//"+imgIP+"/images/DVR-99-00-00-03-01" + calibrationIcon() + ".png" ;
						}
						if(newImg.name=="DVR-mainMenu-36")
						{
							newImg.src = "//"+imgIP+"/images/DVR-99-00-00-04-01" + calibrationIcon() + ".png" ;
						}
							
					}					
					newDiv.appendChild(newImg) ;

					//add the root's location and content
					var newRoot = document.createElement("div") ;
				    var newRoot_big = document.createElement("div") ;
					var hr = document.createElement("div") ;//yin
					hr.id ="hr-" + menuCountSub;
					hr.className = "hr" ;
					newRoot.id = "DVR-mainMenu-" + menuCountSub + "-root" ;
					newRoot.className = "C-mainTitleLoc" ;
					if(subStatus=="true"){
						//Edit BY hlzhang 2011/05/16 Start
						//メニューは文字だけでなく、色のついているところをクリック可とすること。
						//newRoot.innerHTML = "<a class='acss' href=" + main_SubMenu[i][iSub][1] + " id="+main_SubMenu[i][iSub][0]+" onclick='C_maindisplayPro(this.id);'>" + main_SubMenu[i][iSub][0] + "</a>" ;   //C_maindisplayPro
						if(menuCountSub == "00") {
							newRoot.innerHTML = "<span class='acss' href=" + main_SubMenu[i][iSub][1] + " id="+main_SubMenu[i][iSub][0]+">" + main_SubMenu[i][iSub][0] + "</span>" ;   //C_maindisplayPro
						}
						else {
							newRoot.innerHTML = "<span class='acssgray' href=" + main_SubMenu[i][iSub][1] + " id="+main_SubMenu[i][iSub][0]+">" + main_SubMenu[i][iSub][0] + "</span>" ;
						}
						//Edit BY hlzhang 2011/05/16 End
						hr.innerHTML="<hr color=\"white\" size=\"1\" />";
					}else{
						newRoot.innerHTML = main_SubMenu[i][iSub][0] ;
					}
					if(Number(headID)==(i+1)){
						//newRoot.className = "C-mainTitleLocSelect" ;
					}
					newDiv.appendChild(newRoot) ;
					newDiv.appendChild(hr) ;
					
					//add the display-div
					newDisDiv = document.createElement("div") ;	
					newDisDiv.id = "DVR-mainMenu-" + menuCountSub + "-display" ;
					newImgDiv="DVR-mainMenu-" + menuCountSub + "-img"  ;//by yin
					newDisDiv.className = "C-displayDiv" ;
					newDisDiv.value = i ;				//record the menus' location in the main_SubMenu-array
					if(Number(headID)==(i+1)){
						newDisDiv.style.display = "block" ;
						top.menu.document.getElementById("DVR-mainMenu-" + menuCountSub).style.backgroundColor=colorLightBlue;
						newDisDiv.style.backgroundColor = colorLightBlue ;
						top.menu.document.getElementById("hr-"+menuCountSub).style.display="block";//by yin
						//Add By hlzhang 2011/05/10 中項目を開いている時、大項目の下の白い線が表示される


						top.menu.document.getElementById("hr-"+menuCountSub).innerHTML="<hr color=\"white\" size=\"1\" />";
						C_recordBefDis = newDisDiv.id ;	//record the display-div
					}
					else{
			/*---------------------------------	modified by Freya start 11.07.17	------------------------------------*/			
						/*document.getElementById("DVR-mainMenu-" + menuCountSub).style.backgroundColor=colorBlack;
						newDisDiv.style.backgroundColor = colorBlack ;*/
						top.menu.document.getElementById("DVR-mainMenu-" + menuCountSub).style.backgroundColor="#363636";
						newDisDiv.style.backgroundColor = "#363636" ;
			/*---------------------------------	modified by Freya end 11.07.17	----------------------------------------*/
						newDisDiv.style.display = "none" ;
					}
					newGBDiv.appendChild(newDisDiv) ;
				}else{//add sub-menus
					subCount++ ;
					var subCountStr = subCount.toString() ;
					var subCountSub = subCountStr.substring(1,3) ;	
					//create the sub-menus
					
					//Add By hlzhang 2011/05/16 Start 
					//メニューは文字だけでなく、色のついているところをクリック可とすること。
					var newAlive = document.createElement("a");
					newAlive.className="acss";
					newAlive.id=main_SubMenu[i][iSub][1];
					//Add By hlzhang 2011/05/16 Start 
					
					var newSubDiv = document.createElement("div") ;
					newSubDiv.id = "DVR-mainMenu-" + menuCountSub ;
					newSubDiv.name = "DVR-0" + (i+1) + "-" + subCountSub + "-00" ;
					newSubDiv.className = "C-mainSubMenu" ;	
					newSubDiv.setAttribute('tabindex',-1);//djwan @20110523
					/*---------	added by Freya start 11.07.17 -------------*/
					newSubDiv.onmouseover = function(){MouseOverProcess(this.id);};
					newSubDiv.onmouseout = function(){MouseOutProcess(this.id);};
					/*--------- added by Freya end 11.07.17	---------------*/
					if(subStatus=="true"){
						if((Number(headID)==(i+1))&&(subCountSub=="01")){ 
						
							//host-page first sub-menu is defined selected 
							newSubDiv.className = "C-mainSubMenuSelect" ;
							newDiv_auxiliary .className = "DVR-auxiliarySelect" ;
						}
						//Edit By hlzhang 2011/05/16 Start
						//メニューは文字だけでなく、色のついているところをクリック可とすること。
						if(i==3&&iSub==7){
							//alert("<a class='acss' id="+main_SubMenu[i][iSub][1]+" onclick='callSub_pages(this);'>" + main_SubMenu[i][iSub][0] + "</a>");
							//newSubDiv.innerHTML = "<a id="+main_SubMenu[i][iSub][1]+" onclick='doNSTC();'>" + main_SubMenu[i][iSub][0] + "</a>" ;
					//-------- modified by OSK start 11.07.19	 	
							//newSubDiv.innerHTML = "<span id="+main_SubMenu[i][iSub][1]+" onclick='doNSTC();' >" + main_SubMenu[i][iSub][0] + "</span>" ;
							newSubDiv.innerHTML = "<span id="+main_SubMenu[i][iSub][1]+" >" + main_SubMenu[i][iSub][0] + "</span>" ;
					//-------- modified by OSK end 11.07.19
							newAlive.onclick=function(){doNSTC();} ;
						}else{
					//-------- modified by OSK start 11.07.19
							//newSubDiv.innerHTML = "<span class='acss' id="+main_SubMenu[i][iSub][1]+" onclick='callSub_pages(this);'>" + main_SubMenu[i][iSub][0] + "</span>" ;
							newSubDiv.innerHTML = "<span id="+main_SubMenu[i][iSub][1]+" >" + main_SubMenu[i][iSub][0] + "</span>" ;
					//-------- modified by OSK end 11.07.19
							newAlive.onclick=function(){callSub_pages(this);} ;
						}
						//Edit By hlzhang 2011/05/16 End
						newSubDiv.onclick = function(){C_mainMouseClick(this.id);} ;
					}else{
						if(subCountSub==subID){				//sub-page's sub-menu is defined selected 
							newSubDiv.className = "C-mainSubMenuSelect" ;
							newDiv_auxiliary .className = "DVR-auxiliarySelect";
						}
						newSubDiv.innerHTML = main_SubMenu[i][iSub][0] ; //there isn't link on the sub-page
					}
					var order;
					if(newSubDiv.id.substring(13,15)<"11")
					{   
					    order=Number(newSubDiv.id.substring(13,15))-1;	
					}
					if(newSubDiv.id.substring(13,15)<"29"&&newSubDiv.id.substring(13,15)>"11")
                    {   
					    order=Number(newSubDiv.id.substring(13,15))-2;	
						
					}
					if(newSubDiv.id.substring(13,15)<"36"&&newSubDiv.id.substring(13,15)>"29")
                    {
					    order=Number(newSubDiv.id.substring(13,15))-3;	
					}
					if(newSubDiv.id.substring(13,15)<"52"&&newSubDiv.id.substring(13,15)>"36")
                    {  
					    order=Number(newSubDiv.id.substring(13,15))-4;
					}
//alert(order);					
					if(arrayRight_DVR_VPN_Exist[order]==1)
                    {   
						//Edit By hlzhang 2011/05/16
						//newDisDiv.appendChild(newSubDiv) ; 
						newAlive.appendChild(newSubDiv) ; 
						newDisDiv.appendChild(newAlive) ; 
					}
					/* debug 
					else
					{
						alert(order);
						alert(newSubDiv.innerHTML);
					}
					*/
			   }
			   
			}
		
		}
		
	}
	
	if( (subStatus=="false") && (recordFlag != 3)&& (recordFlag != 0) )
	{
		//big page
		if( recordFlag == 1 )
		{
			document.getElementById("C-mainLeftMenu").style.height = "";
		}
		//great big page
		else if( recordFlag == 2 )
		{
		}
	}
	
	if(document.location.pathname.split("/")[1]=="DVR-01-00-00"||document.location.pathname.split("/")[1]=="DVR-02-00-00"||document.location.pathname.split("/")[1]=="DVR-03-00-00"||document.location.pathname.split("/")[1]=="DVR-04-00-00")
		{
			var buttonDiv = document.createElement("div") ;
			buttonDiv.id = "DVR-mainMenu-button";
			buttonDiv.name ="DVR-mainMenu-button";
			var inHtmlStr = 			"<div id=\"modoruarea\" class=\"DVR-auxiliary\">";
			inHtmlStr = inHtmlStr +			"<div id=\"DVR-mainMenu-52-shade\" class=\"C-mainTitle\" onclick=\"cancel()\" tabindex='-1' onmouseover=\"changeOfColor(this,1)\" onmouseout=\"changeOfColor(this,0)\" >";
			//inHtmlStr = inHtmlStr +			"<div id=\"DVR-mainMenu-52\" class=\"C-mainTitleLoc\">"//</div>"
			inHtmlStr = inHtmlStr +			"<div id=\"DVR-mainMenu-52\">";
			//inHtmlStr = inHtmlStr +				"<img id=\"test\" name=\"imgtest\" class=\"C-mainImage\">"
			inHtmlStr = inHtmlStr +				"<div class=\"C-mainTitleLoc_Back\">";
			inHtmlStr = inHtmlStr +					"<div id=\"divTmpForFocus\" class='divTmpForFocus' tabindex='-1'></div>";
			inHtmlStr = inHtmlStr +					"<span class=\"acssgray\" id=\"戻る\">戻る</span>";
			inHtmlStr = inHtmlStr +				"</div>";
			inHtmlStr = inHtmlStr +			"</div>";
			inHtmlStr = inHtmlStr +			"</div>";
			inHtmlStr = inHtmlStr +		"</div>";
			buttonDiv.innerHTML=inHtmlStr;

//			buttonDiv.innerHTML="<label class=\"label_back\">戻る</label><div id=\"DVR-mainMenu-52\" onclick=\"cancel()\" ></div><div id=\"DVR-mainMenu-52-shade\"  onclick=\"cancel()\" tabindex='-1' onmouseover=\"MainMenuMouseOverProcess(this.id)\" onmouseout=\"MainMenuMouseOutProcess(this.id)\"></div><div id=\"divTmpForFocus\" class='divTmpForFocus' tabindex='-1'></div>";//<input class=\"button\" type=\"button\" onmousedown='setfocus_click(this)' value="取消"/>";value="再生実行"
			buttonDiv.className = "mainButtonMenu" ;
			top.menu.document.getElementById("MenuBackground").appendChild(buttonDiv) ;
			document.getElementById("DVR-mainMenu-52").style.backgroundImage = "url(../images/DVR-99-backbutton" + calibrationIcon() + ".png)";
		}
		for(var i=0;i<4;i++)
		{
			if(top.menu.document.getElementById("DVR-auxiliary_"+i)) {
				top.menu.document.getElementById("DVR-auxiliary_"+i).style.backgroundColor = colorDarkGray ;
				top.menu.document.getElementById("DVR-auxiliary_"+(Number(headID)-1)).style.backgroundColor = colorLightBlue ;
			}
		}
		/*	deleted by Freya 11.07.18
			if(headID=="01")
			{ 
				if(document.getElementById("DVR-mainMenu-"+document.location.pathname.split("-")[2]))
				document.getElementById("DVR-mainMenu-"+document.location.pathname.split("-")[2]).style.backgroundColor=colorLightGray;
				document.getElementById("DVR-auxiliary_"+(Number(headID)-1)).style.backgroundColor = colorLightBlue ;
			}
			else if(headID=="02")
			{
				var string=(Number(document.location.pathname.split("-")[2])+11).toString();
				document.getElementById("DVR-mainMenu-"+string).style.backgroundColor=colorLightGray;	
				document.getElementById("DVR-auxiliary_"+(Number(headID)-1)).style.backgroundColor = colorLightBlue ;
			}
			else if(headID=="03")
			{
				var string=(Number(document.location.pathname.split("-")[2])+29).toString();			
				document.getElementById("DVR-mainMenu-"+string).style.backgroundColor=colorLightGray;
				document.getElementById("DVR-auxiliary_"+(Number(headID)-1)).style.backgroundColor = colorLightBlue ;
			}
			else if(headID=="04")
			{
				var string=(Number(document.location.pathname.split("-")[2])+36).toString();
				if(Number(document.location.pathname.split("-")[2])>14)
				{var string=(Number(document.location.pathname.split("-")[2])+35).toString();}
				document.getElementById("DVR-mainMenu-"+string).style.backgroundColor=colorLightGray;
				document.getElementById("DVR-auxiliary_"+(Number(headID)-1)).style.backgroundColor = colorLightBlue ;
			}
		*/
	var newEndDiv = document.createElement("div") ;
	newEndDiv.className = "C-mainEndMenu" ;
	//mainParent.insertBefore(newEndDiv,divBefore) ;
	document.body.appendChild(newEndDiv);
	//---added by hdu start 11.03.21--------------//
	try{
	document.getElementById("DVR-mainMenu-00-root").childNodes[0].focus();
	last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
	}catch(ex){}
	//---added by hdu end 11.03.21----------------//
	//戻る 変更の色
	
	//--------added by Freya start 11.07.18(change the lenght of the focus when came back from the sub-page)
	//カーソルを移動する時、選択したDIVの背景長さをセット
	if( subStatus=="true" )
	{
		if(recordFlag==3){//デカ文字
			top.menu.document.getElementById("DVR-mainMenu-"+Display_sub_menu).style.width="260px";
		}
		else if(recordFlag==0){//小画面
			top.menu.document.getElementById("DVR-mainMenu-"+Display_sub_menu).style.width="160px";
		}else
		{//大画面
			top.menu.document.getElementById("DVR-mainMenu-"+Display_sub_menu).style.width="200px";
		}
	}
	//--------added by Freya end 11.07.18
	top.menu.document.getElementById("DVR-mainMenu-"+Display_sub_menu).style.backgroundColor=colorLightGray;
	//戻る 記録ID
	C_enterID="DVR-mainMenu-"+Display_sub_menu;
	//戻る 記録 接続
	linkAdd = top.menu.document.getElementById(C_enterID).firstChild.id;//by yin 11/3/31

	identifyRetBtn(document.getElementById('DVR-mainMenu-52-shade'));//add by djwan @20110420
	
	//非同期処理により、CGI実行結果取得前に処理されてしまう為、実装場所をCGI処理後に変更
	//dispShowPage();


	if(recordFlag==0 || recordFlag==3){
		var img_zoom = "";
		if(pageMagnification==1){
		}
		else if(pageMagnification==2){
			img_zoom = "1.06";
		}
		else if(pageMagnification==3 || pageMagnification==null){
			img_zoom = "1.1";
		}
		else if(pageMagnification==4){
			img_zoom = "1.2";
		}
		else if(pageMagnification==5){
			img_zoom = "1.3";
		}

		// 画像サイズ比率変更
		if(img_zoom != "") {
			if(document.getElementById("DVR-mainMenu-00-img")) {
				document.getElementById("DVR-mainMenu-00-img").style.zoom = img_zoom;
			}
			if(document.getElementById("DVR-mainMenu-11-img")) {
				document.getElementById("DVR-mainMenu-11-img").style.zoom = img_zoom;
			}
			if(document.getElementById("DVR-mainMenu-29-img")) {
				document.getElementById("DVR-mainMenu-29-img").style.zoom = img_zoom;
			}
			if(document.getElementById("DVR-mainMenu-36-img")) {
				document.getElementById("DVR-mainMenu-36-img").style.zoom = img_zoom;
			}
			if(document.getElementById("DVR-mainMenu-52")) {
				document.getElementById("DVR-mainMenu-52").style.zoom = img_zoom;
			}
		}
	}
	pageScalingParameters(pageMagnification);
	drawOK = true;
}

/*-----added by Freya start 11.07.17---------*/
function MouseOverProcess(DivID)
{
	dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN");
	if( (DivID !="DVR-mainMenu-52") && (DivID != "DVR-mainMenu-00") && (DivID != "DVR-mainMenu-11") && (DivID != "DVR-mainMenu-29") && (DivID != "DVR-mainMenu-36") && (DivID !="DVR-mainMenu-52-shade") )
	{
		//カーソルを移動する時、選択したDIVの背景長さをセット
		if(recordFlag==3){//デカ文字
			document.getElementById(DivID).style.width="260px";
		}
		else if(recordFlag==0){//小画面
			document.getElementById(DivID).style.width="160px";
		}else
		{//大画面
			document.getElementById(DivID).style.width="200px";
		}
	}
	document.getElementById(DivID).style.backgroundColor = colorLightGray ;
}

function MouseOutProcess(DivID)
{
	dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN");
	document.getElementById(DivID).style.backgroundColor = colorLightBlue ;
	if( (C_enterID !="DVR-mainMenu-52") && (C_enterID != "DVR-mainMenu-00") && (C_enterID != "DVR-mainMenu-11") && (C_enterID != "DVR-mainMenu-29") && (C_enterID != "DVR-mainMenu-36") )
	{
		document.getElementById(C_enterID).style.backgroundColor = colorLightGray ;

		if(recordFlag==3){//デカ文字
			document.getElementById(DivID).style.width="260px";
		}
		else if(recordFlag==0){//小画面
			document.getElementById(DivID).style.width="160px";
		}else
		{//大画面
			if(document.getElementById("DVR-mainMenu-button").style.display=="none")
			{
				document.getElementById(DivID).style.width="221px";//戻るボタンが表示されている＝何かしらのメニュー画面が出ている時は長さを長くして選択表示をメニュー右端につける
			}
			else
			{
				document.getElementById(DivID).style.width="200px";
			}
		}
	}
}

function MainMenuMouseOverProcess(DivID)
{
	dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN");
	if(DivID == "DVR-mainMenu-52-shade")
	{
		document.getElementById("DVR-mainMenu-52-shade").backgroundColor = colorLightBlue ;
		document.getElementById("DVR-mainMenu-52").style.backgroundImage = "url(../images/DVR-99-backbutton_white" + calibrationIcon() + ".png)";
		document.getElementById("戻る").style.color = "#FFF";
		document.getElementById("DVR-mainMenu-52-shade").style.outline="0px";		
	}
	else
	{
		if( (DivID == C_enterID) && (document.getElementById(C_enterID + "-display").style.display == "block") && (mainMenuFocusFlag != true))
		{
			//mouse over the main-menu which is the location of the Gray-focus
			document.getElementById(DivID).style.backgroundColor = colorLightGray ;
		}
		else
		{
			document.getElementById(DivID).style.backgroundColor = colorLightBlue ;
		}
	}
}

function MainMenuMouseOutProcess(DivID)
{
	dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN");
	if(DivID == "DVR-mainMenu-52-shade")
	{
		document.getElementById("DVR-mainMenu-52-shade").style.backgroundColor = "#363636" ;
		document.getElementById("DVR-mainMenu-52").style.backgroundImage = "url(../images/DVR-99-backbutton" + calibrationIcon() + ".png)";
		document.getElementById("戻る").style.color = "#CCC";
		document.getElementById("DVR-mainMenu-52-shade").style.outline="0px";		
	}
	else
	{
		if(document.getElementById( DivID + "-display" ).style.display == "none")
		{
			document.getElementById(DivID).style.backgroundColor = "#363636" ;
		}	
	}
	if( (C_enterID == "DVR-mainMenu-00") || (C_enterID == "DVR-mainMenu-11") || (C_enterID == "DVR-mainMenu-29") || (C_enterID == "DVR-mainMenu-36") )
	{
		if((document.getElementById(C_enterID + "-display").style.display == "block") && (mainMenuFocusFlag != true))
		{
			document.getElementById(C_enterID).style.backgroundColor = colorLightGray ;
		}
		else
		{
			document.getElementById(C_enterID).style.backgroundColor = colorLightBlue ;
		}
	}
}
/*-----added by Freya end 11.07.17-----------*/

//the process of display-div
function C_maindisplayPro(subStrID)
{
	dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN");
	var tempNum ;
	var tempSubStr ;
	var tempEnterIDsub ;
	var menusNum ;
	var rootDivName ;
	var sFlag = false;
	mainMenuFocusFlag = false;
	
	//by yin 11/3/30    click "検索" ,"設定","履歴","保守" 
	if(subStrID=="検索")
	{
		subStrID="DVR-mainMenu-00";	
	}
	if(subStrID=="設定")
	{
		subStrID="DVR-mainMenu-11";	
	}
	if(subStrID=="履歴")
	{
		subStrID="DVR-mainMenu-29";	
	}
	if(subStrID=="保守")
	{
		subStrID="DVR-mainMenu-36";	
	}
	
	var displayID = subStrID + "-display" ;
	var disState = document.getElementById(displayID).style.display ;
	if(disState=="none"){	//if the display-div is closed
		var string=Number(document.getElementById(subStrID).name.substring(5,6))-1;
		document.getElementById("DVR-auxiliary_"+string).style.backgroundColor = colorDarkGray ;
		//alert(ip);
		if(subStrID.substring(13,15)=="00")
		{
			document.getElementById(subStrID+"-img").src = "//"+imgIP+"/images/DVR-99-00-00-01-02" + calibrationIcon() + ".png";
			document.getElementById(subStrID+"-img").style.zoom = calibrationsize() ;
			document.getElementById("検索").style.color = "#FFF";
		}
		if(subStrID.substring(13,15)=="11")
		{
			document.getElementById(subStrID+"-img").src = "//"+imgIP+"/images/DVR-99-00-00-02-02" + calibrationIcon() + ".png";
			document.getElementById(subStrID+"-img").style.zoom = calibrationsize() ;
			document.getElementById("設定").style.color = "#FFF";
		}
		if(subStrID.substring(13,15)=="29")
		{
			document.getElementById(subStrID+"-img").src = "//"+imgIP+"/images/DVR-99-00-00-03-02" + calibrationIcon() + ".png";
			document.getElementById(subStrID+"-img").style.zoom = calibrationsize() ;
			document.getElementById("履歴").style.color = "#FFF";
		}
		if(subStrID.substring(13,15)=="36")
		{
			document.getElementById(subStrID+"-img").src = "//"+imgIP+"/images/DVR-99-00-00-04-02" + calibrationIcon() + ".png";
			document.getElementById(subStrID+"-img").style.zoom = calibrationsize() ;
			document.getElementById("保守").style.color = "#FFF";
		}
			
		/*------modified by Freya start 11.07.17(avoid the root-menu's background-color changing to gray)--------*/
	    //document.getElementById(subStrID).style.backgroundColor = colorLightGray ;
		document.getElementById(subStrID).style.backgroundColor = colorLightBlue ;
		/*------modified by Freya end 11.07.17	-----------------------------------------------------------------*/
		document.getElementById(displayID).style.backgroundColor = colorLightBlue ;

		if(document.getElementById(C_recordBefDis))
		{ 
		    document.getElementById(C_recordBefDis).style.display = "none" ;//close the	open display-div which is opened last time
		}
		document.getElementById(displayID).style.display = "block" ;
	    document.getElementById("hr-"+subStrID.substring(13,15)).style.display="block";//by yin
		var string=Number(document.getElementById(subStrID).name.substring(5,6))-1;
		document.getElementById("DVR-auxiliary_"+string).style.backgroundColor = colorLightBlue ;
		if(C_recordBefDis.substring(0,15)!=subStrID)//by yin
		{
		    var string=Number(document.getElementById(subStrID).name.substring(5,6))-1;
		    document.getElementById("DVR-auxiliary_"+string).style.backgroundColor = colorLightBlue ;
			if(document.getElementById(C_recordBefDis.substring(0,15)).name)
			{
			    string=Number(document.getElementById(C_recordBefDis.substring(0,15)).name.substring(5,6))-1;
    		    document.getElementById("DVR-auxiliary_"+string).style.backgroundColor = colorDarkGray ;
			}
			if(C_recordBefDis.substring(13,15)=="00")
			{
				document.getElementById(C_recordBefDis.substring(0,15)+"-img").src = "//"+imgIP+"/images/DVR-99-00-00-01-01" + calibrationIcon() + ".png";
				document.getElementById(C_recordBefDis.substring(0,15)+"-img").style.zoom = calibrationsize() ;
				document.getElementById("検索").style.color = "#CCC";
				//document.getElementById("検索").style.color = "#000";
			}
			if(C_recordBefDis.substring(13,15)=="11")
			{
				document.getElementById(C_recordBefDis.substring(0,15)+"-img").src = "//"+imgIP+"/images/DVR-99-00-00-02-01" + calibrationIcon() + ".png";
				document.getElementById(C_recordBefDis.substring(0,15)+"-img").style.zoom = calibrationsize() ;
				document.getElementById("設定").style.color = "#CCC";
				//document.getElementById("設定").style.color = "#000";
			}
			if(C_recordBefDis.substring(13,15)=="29")
			{
				document.getElementById(C_recordBefDis.substring(0,15)+"-img").src = "//"+imgIP+"/images/DVR-99-00-00-03-01" + calibrationIcon() + ".png";
				document.getElementById(C_recordBefDis.substring(0,15)+"-img").style.zoom = calibrationsize() ;
				document.getElementById("履歴").style.color = "#CCC";
				//document.getElementById("履歴").style.color = "#000";
			}
			if(C_recordBefDis.substring(13,15)=="36")
			{
				document.getElementById(C_recordBefDis.substring(0,15)+"-img").src = "//"+imgIP+"/images/DVR-99-00-00-04-01" + calibrationIcon() + ".png";
				document.getElementById(C_recordBefDis.substring(0,15)+"-img").style.zoom = calibrationsize() ;
				document.getElementById("保守").style.color = "#CCC";
				//document.getElementById("保守").style.color = "#000";
			}
			/*--------	modified by Freya start 11.07.17(there isn's black back-ground below the main-menus) ------*/	
		    //document.getElementById(C_recordBefDis.substring(0,15)).style.backgroundColor = colorBlack ;// by yin
			document.getElementById(C_recordBefDis.substring(0,15)).style.backgroundColor = "#363636" ;
			/*--------	modified by Freya end 11.07.17 ------------------------------------------------------------*/
		    document.getElementById("hr-"+C_recordBefDis.substring(13,15)).style.display="none";//by yin
		}
		if(C_recordBefDis!=""){
			rootCode = document.getElementById(C_recordBefDis).value ;
			menusNum = main_SubMenu[rootCode].length ; //get the number of menus under the root-menu
			tempSubStr = C_recordBefDis.substring(13,15) ;
			tempNum = Number(tempSubStr) ;				//get the menus' start-location among display-menus
			//subStrID = C_recordBefDis.substring(0,15) ; //deleted by Freya 11.07.18
		}
		C_recordBefDis = displayID ;				//record the opened display-div
	}else{
		if(subStrID.substring(13,15)=="00")
		{
			document.getElementById(subStrID+"-img").src = "//"+imgIP+"/images/DVR-99-00-00-01-01" + calibrationIcon() + ".png";
			document.getElementById(subStrID+"-img").style.zoom = calibrationsize() ;
			document.getElementById("検索").style.color = "#CCC";
		}
		if(subStrID.substring(13,15)=="11")
		{
			document.getElementById(subStrID+"-img").src = "//"+imgIP+"/images/DVR-99-00-00-02-01" + calibrationIcon() + ".png";
			document.getElementById(subStrID+"-img").style.zoom = calibrationsize() ;
			document.getElementById("設定").style.color = "#CCC";
		}
		if(subStrID.substring(13,15)=="29")
		{
			document.getElementById(subStrID+"-img").src = "//"+imgIP+"/images/DVR-99-00-00-03-01" + calibrationIcon() + ".png";
			document.getElementById(subStrID+"-img").style.zoom = calibrationsize() ;
			document.getElementById("履歴").style.color = "#CCC";
		}
		if(subStrID.substring(13,15)=="36")
		{
			document.getElementById(subStrID+"-img").src = "//"+imgIP+"/images/DVR-99-00-00-04-01" + calibrationIcon() + ".png";
			document.getElementById(subStrID+"-img").style.zoom = calibrationsize() ;
			document.getElementById("保守").style.color = "#CCC";
		}

	     //if the display-div is opened	
		document.getElementById(displayID).style.display = "none" ;	
		document.getElementById("hr-"+subStrID.substring(13,15)).style.display="none";//by yin
		rootCode = document.getElementById(displayID).value ;
		menusNum = main_SubMenu[rootCode].length ;	//get the number of the sub-menus under the root-menu
		tempSubStr = subStrID.substring(13,15) ;													
		tempNum = Number(tempSubStr) ;				//get the menus' start-location among display-menus
		var string=Number(document.getElementById(subStrID).name.substring(5,6))-1;
		document.getElementById("DVR-auxiliary_"+string).style.backgroundColor = colorDarkGray ;
		sFlag = true;
	}
	
	tempEnterIDsub = C_enterID.substring(13,15) ;	//get the focus's number-code before this process
	if((Number(tempEnterIDsub)>=tempNum)&&(Number(tempEnterIDsub)<(tempNum+menusNum))){
		//if the focus is at the sub-menus under the root which need to close,focus change to the root after closing
		if(document.getElementById(C_enterID)){
			//document.getElementById(C_enterID).style.backgroundColor = "#666" ;
			//前の選択したメニューの背景色をクリアする
			document.getElementById(C_enterID).style.backgroundColor = "" ;
		}
		//Edit By hlzhang 2011/05/16 同じ大項目をクッリクした、背景色変更しない
		if(sFlag==true){
			/*------ modified by Freya start 11.07.18(main-menu's selected-color is blue) -----*/
			//document.getElementById(subStrID).style.backgroundColor = colorGray ;
			document.getElementById(subStrID).style.backgroundColor = colorLightBlue ;
			/*------ modified by Freya end 11.07.18 -------------------------------------------*/
		}
		//C_enterID = subStrID ;	//deleted by Freya 11.07.18		
	}
	
	//--- added by Freya start 11.07.17(setting the focus on the first sub-menu in the open main-menu) ---//
	if( document.getElementById(displayID).style.display == "block" )
	{
		var mainMenuNum = subStrID.substring(13,15);
		var FocusNum = Number(mainMenuNum) + 101;
		var FocusNumS = FocusNum.toString();
		var currentFocusID = "DVR-mainMenu-" + FocusNumS.substring(1,3);	//focus is on the sub-menu after the main-menu;record the focus-menu's id 
		
		//find the current opened root-menu's next menu's id 
		while(document.getElementById(currentFocusID) == null)
		{
			FocusNum++ ; //there isn't the first sub-menu in the setting of big-word mode
			FocusNumS = FocusNum.toString();
			currentFocusID = "DVR-mainMenu-" + FocusNumS.substring(1,3); //focus is on the sub-menu after the main-menu;record the focus-menu's id 					
		}
		if(currentFocusID == "DVR-mainMenu-52")
		{
			currentFocusID = C_recordRootArr[C_recordRootArr.length-1];
		}
		
	//judge whether the opened root-menu's next menu is also a root menu, for determing that whether there are submenus below the current opened root-menu
	//if there is no submenu below the opened root-menu, the flag is "true", otherwise, the flag is "false"
		for(var j=0; j<C_recordRootArr.length; j++ )
		{
			if(currentFocusID == C_recordRootArr[j])
			{
				mainMenuFocusFlag = true;
				break;
			}
		}
		
		//if there is no submenu below the current openning-root-menu, the processing as following  
		if(mainMenuFocusFlag == true)
		{
			C_enterID = subStrID;
			document.getElementById(C_enterID).style.backgroundColor = "" ;
			document.getElementById(subStrID).style.backgroundColor = colorLightBlue ;
		}
		//if there are some submenus below the current openning-root-menu, the processing as following
		else
		{
			//カーソルを移動する時、選択したDIVの背景長さをセット
			if(recordFlag==3){//デカ文字

				/*if(Number(mainMenuNum) == 11)
				{
					while( document.getElementById(currentFocusID) == null )
					{
						FocusNum++ ; //there isn't the first sub-menu in the setting of big-word mode
						FocusNumS = FocusNum.toString();
						currentFocusID = "DVR-mainMenu-" + FocusNumS.substring(1,3); //focus is on the sub-menu after the main-menu;record the focus-menu's i 					
					}
				}*/
				document.getElementById(currentFocusID).style.width="260px";
			}
			else if(recordFlag==0){//小画面
				document.getElementById(currentFocusID).style.width="160px";
			}
			else
			{//大画面
				document.getElementById(currentFocusID).style.width="200px";
			}
		//-----added by Freya start 11.07.29
			document.getElementById(currentFocusID).style.backgroundColor = colorLightGray;
		//-----added by Freya end 11.07.29
			C_enterID = currentFocusID ;	//record the current focus's location
		}
	}
	else
	{
		document.getElementById(C_enterID).style.backgroundColor = "" ;
		document.getElementById(subStrID).style.backgroundColor = colorLightBlue ;
		C_enterID = subStrID ;	//record the current focus's location
	}
	//--- added by Freya end 11.07.18 ---------------------------------------------------------------------//
}

//record the current ID and change the backgroundColor when click the menu
function C_mainMouseClick(ID)
{
	dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN");
	var flag = 0;
	//document.getElementById(C_enterID).style.backgroundColor = "#666" ;
	//前の選択したメニューの背景色をクリアする

	document.getElementById(C_enterID).style.backgroundColor = "" ;
	document.getElementById(ID).style.backgroundColor = colorGray ;
	document.getElementById(ID).style.width = "221px";//各種メニューが押されたタイミングで長さを長くして選択表示をメニュー右端につける
	C_enterID = ID ;
	linkAdd = document.getElementById(ID).firstChild ;
}

//the process for the downkey pressing
function downChange(maxNum,jumpN)
{
	dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN");
	var strD ;
	var curstrD ;
	var prestrD ;
	var countUD ;
	var countUDS ;
	var displayFlag = 0;
	var mainMenuSelectFlag = 0;
	var mainMenuHeight = 0;

	var locstatusD=0 ;
	while(1){		//get the current-menu's number and previous-menu's number  
		if(locstatusD==0){
			prestrD = C_enterID.substring(13,15) ;
			countUD =100 + Number(prestrD) + jumpN + 1 ;
			countUDS = countUD.toString() ;
			locstatusD = 1 ;
			continue ;
		}
		else{
			curstrD = countUDS.substring(1,3) ;
			break ;
		}
	}

	while(1)
	{
		if(document.getElementById("DVR-mainMenu-"+curstrD.toString())==null&&curstrD<maxNum)
		{ 
			if((Number(curstrD)+1)<10)
         	{
				curstrD="0"+(Number(curstrD)+1).toString();
			}
			else
			{
				curstrD=(Number(curstrD)+1).toString();
			}				
		}else
		{
			break;
		}
	}
	if(curstrD<maxNum)
	{
		strD = "DVR-mainMenu-" + curstrD ;
		if(C_enterID=="DVR-mainMenu-00"||C_enterID=="DVR-mainMenu-11"||C_enterID=="DVR-mainMenu-29"||C_enterID=="DVR-mainMenu-36")
		{
			if(strD!="DVR-mainMenu-00"&&strD!="DVR-mainMenu-11"&&strD!="DVR-mainMenu-29"&&strD!="DVR-mainMenu-36"&&strD!="DVR-mainMenu-52")
			{
				var string=Number(document.getElementById(C_enterID).name.substring(5,6))-1;
				document.getElementById("DVR-auxiliary_"+string).style.backgroundColor = colorLightBlue ;
				if(C_enterID !="DVR-mainMenu-52"){
					document.getElementById(C_enterID).style.backgroundColor = colorLightBlue ;	
				}
			}else{
				if(C_enterID !="DVR-mainMenu-52"){
				/*-----	modified by Freya start 11.07.17(there isn's black-background below the main-menus)	-----*/
					//document.getElementById(C_enterID).style.backgroundColor = colorBlack ;
					if(document.getElementById(C_enterID+"-display").style.display == "block")
					{
						document.getElementById(C_enterID).style.backgroundColor = colorLightBlue ;	
					}
					else
					{
						document.getElementById(C_enterID).style.backgroundColor = "#363636" ;
					}
				/*-----	modified by Freya end 11.07.17	---------------------------------------------------------*/
				}
			}
		}else
		{   	
			if(C_enterID !="DVR-mainMenu-52"){
		    	document.getElementById(C_enterID).style.backgroundColor = colorLightBlue ;
		   	}
		}
	}
	else 
	{
		   /*-------- modified by Freya start 11.07.18(the facus isn's cycle-moving)	-----*/
		     //strD = "DVR-mainMenu-00" ;				//if the previous focus is the last menu
			 strD = "DVR-mainMenu-52" ;
		   /*-------- modified by Freya end 11.07.18 ----------------------------------------*/	
			if(C_enterID !="DVR-mainMenu-52"){
				document.getElementById(C_enterID).style.backgroundColor = "#FFFFFF" ;
			}
		}
		if(strD!="DVR-mainMenu-52"){			
		/*------------------	modified by Freya start 11.07.17	---------------*/
			if(strD!="DVR-mainMenu-00"&&strD!="DVR-mainMenu-11"&&strD!="DVR-mainMenu-29"&&strD!="DVR-mainMenu-36"&&strD!="DVR-mainMenu-52")
			{
				//カーソルを移動する時、選択したDIVの背景長さをセット
				if(recordFlag==3){//デカ文字	
					document.getElementById(strD).style.width="260px";
				}else if(recordFlag==0){//小画面
					document.getElementById(strD).style.width="160px";
				}else{//大画面
					document.getElementById(strD).style.width="200px";
				}

				document.getElementById(strD).style.backgroundColor = colorLightGray ;	//focus on sub-menu,color is gray
			}
			else if(document.getElementById(strD + "-display").style.display == "block")
			{ 
				document.getElementById(strD).style.backgroundColor = colorLightGray ; //focus on main-menu which is extent,color is gray 
			}
			else
			{
				document.getElementById(strD).style.backgroundColor = colorLightBlue ; //focus on main-menu,color is blue
			}
		/*------------------	modified by Freya end 11.07.17	-------------------*/
		}
		
		if(C_enterID=="DVR-mainMenu-52")
		{
		//document.getElementById(C_enterID).style.border="";	
			//document.getElementById("DVR-mainMenu-52-shade").blur();
		//alert('leave me!');
			document.getElementById("DVR-mainMenu-52-shade").backgroundColor = "#363636" ;
			document.getElementById("DVR-mainMenu-52").style.backgroundImage = "url(../images/DVR-99-backbutton" + calibrationIcon() + ".png)";
			document.getElementById("戻る").style.color = "#CCC";
			document.getElementById("DVR-mainMenu-52-shade").style.outline="0px";	
		}
		C_enterID = strD ;										//record the ID
	
	/* deleted by Freya 11.07.18
		if(strD!="DVR-mainMenu-52")
		{   
			linkAdd = document.getElementById(strD).firstChild.id;	//record the information of link
		}else*/
		if(strD == "DVR-mainMenu-52")
		{
		//document.getElementById(strD).style.border="#000000 2px solid";	
		//alert('hold me!');
		//document.getElementById("DVR-mainMenu-52-shade").focus();
			
			document.getElementById("DVR-mainMenu-52-shade").style.backgroundColor = colorLightBlue ;
			document.getElementById("DVR-mainMenu-52").style.backgroundImage = "url(../images/DVR-99-backbutton_white" + calibrationIcon() + ".png)";
			document.getElementById("戻る").style.color = "#FFF";
			document.getElementById("DVR-mainMenu-52-shade").style.outline="0px";	
		}
		
		//-----added by Freya start 11.07.24
		downScrollPro(strD);
		//-----added by Freya end 11.07.24
}

//------added by Freya start 11.07.24
function downScrollPro(strD)
{
	dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN");
	var mainMenuSelectFlag = 0;
	var displayFlag = 0;
	var mainMenuHeight = 0;
	var subMenuHeadNum = 0;
	var SubMenuHeight = 0;
	var bigWordCount = 0;
	var subMenuCount = 0;
	var subMenuCountS;
	var tempID;		
	
	if( document.getElementById("C-mainLeftMenu").scrollHeight > document.getElementById("C-mainLeftMenu").offsetHeight )
	{	
		if( strD != "DVR-mainMenu-52" )
		{
			//check which main-menu is extended
			for(var k=0;k<C_recordRootArr.length;k++)
			{
				//now,if there isn't display-div block,there isn't the scroll
				if(document.getElementById(C_recordRootArr[k] + "-display").style.display == "block")
				{
					displayFlag = 1;	//there is main-menu is extend
					break;
				}
			}
			
			//if the current focus is on the main-menu,and get it's location 
			for( var j=0; j<C_recordRootArr.length; j++)
			{
				if(C_recordRootArr[j] == strD)
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
				if(recordFlag==0)
				{
					subMenuHeadNum = Number(C_recordRootArr[k].substring(13,15));
					SubMenuHeight = (Number(strD.substring(13,15)) - subMenuHeadNum) * document.getElementById(strD).offsetHeight;
				}
				//big-word-page
				if(recordFlag==3)
				{
					subMenuHeadNum = Number(C_recordRootArr[k].substring(13,15));
					subMenuCount = 100 + subMenuHeadNum + 1; 
										
					//check the sub-menus' quantity 	
					for(var i=1; i<main_SubMenu[k].length; i++)
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
					mainMenuHeight = document.getElementById(strD).offsetHeight * (j+1) + (5*(j+1));
					
					//big-page
					if(recordFlag==0)
					{
						SubMenuHeight = main_SubMenu[k].length * document.getElementById(strD).offsetHeight;
					}
					
					//big-word-page
					if(recordFlag==3)
					{
						subMenuHeadNum = Number(C_recordRootArr[k].substring(13,15));
						subMenuCount = 100 + subMenuHeadNum + 1; 
											
						//check the extended main-menu's sub-menus-quantity 	
						for(var i=1; i<main_SubMenu[k].length; i++)
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
//------added by Freya end 11.07.24
	
//the process for the upkey pressing 
function upChange(maxNum,jumpN)
{
	dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN");
	var strU ;
	var curstrU ;
	var prestrU ;
	var countUD ;
	var countUDS ;
	var locstatusU = 0 ;
	
	while(1){
		if(locstatusU==0){	//firstly,change the countUD's value
			prestrU = C_enterID.substring(13,15) ;
			countUD =100 + Number(prestrU) - jumpN - 1 ;
			countUDS = countUD.toString() ;
			locstatusU = 1 ;
			continue ;
		}else{
			//secondly,get the curstrU; if previous menu is the first menu,make the focus to the last menu
			if((prestrU=="52")&&(jumpN!=0)){	//if the display-div is closed
				countUD = 100 + maxNum - jumpN -1 ;
				countUDS = countUD.toString() ;
			}else if((prestrU=="52")&&(jumpN==0)){//if the display-div is open
				countUD = 151 ;
				countUDS = countUD.toString() ;
			}else if(prestrU=="00"){//if the display-div is open
			/*----- modified by Freya start 11.07.18(the focus isn's cycle-moving) ---*/
				//countUD = 100 + maxNum - 1 ;
				countUD = 100 ;
			/*----- modified by Freya end 11.07.18	----------------------------------*/
				countUDS = countUD.toString() ;
			}else{}
			curstrU = countUDS.substring(1,3) ;	   //get the curstrU
			break ;
		}
	}
	while(1){
		if(document.getElementById("DVR-mainMenu-"+curstrU.toString())==null)
		{ 
			if((Number(curstrU)-1)<10)
			{
				curstrU="0"+(Number(curstrU)-1).toString();
			}else{
			   curstrU=(Number(curstrU)-1).toString();
			}				
		}else{
			break;
		}			
	}
	//get the menu's location which the focus need to go,and change the focus 
	strU = "DVR-mainMenu-" + curstrU ;
	var curstrU_color=C_enterID.substring(13,15);
	if(C_enterID=="DVR-mainMenu-00"||C_enterID=="DVR-mainMenu-11"||C_enterID=="DVR-mainMenu-29"||C_enterID=="DVR-mainMenu-36")
	{  
		//.style.display)
		if(document.getElementById("DVR-mainMenu-"+curstrU_color+"-display").style.display=="block")
		{    
			var string=Number(document.getElementById(C_enterID).name.substring(5,6))-1;
			document.getElementById("DVR-auxiliary_"+string).style.backgroundColor = colorLightBlue ;
			document.getElementById(C_enterID).style.backgroundColor = colorLightBlue ;
		}else{
		/*------- modified by Freya start 11.07.17(there isn't black back-ground below the main-menus) ---------*/
			//document.getElementById(C_enterID).style.backgroundColor = colorBlack ;
			document.getElementById(C_enterID).style.backgroundColor ="#363636" ;
		/*------- modified by Freya end 11.07.17 ---------------------------------------------------------------*/
		}
			
	}else{   
		if(C_enterID=="DVR-mainMenu-52"){
		   // document.getElementById(C_enterID).style.backgroundColor="#FFFFFF";	
		}else{
			document.getElementById(C_enterID).style.backgroundColor = colorLightBlue ;	
		}	    
	}
		if(strU !="DVR-mainMenu-52"){			
		/*-------------	modified by Freya start 11.07.17	----------------------------*/
			if(strU == "DVR-mainMenu-00"||strU == "DVR-mainMenu-11"||strU == "DVR-mainMenu-29"||strU == "DVR-mainMenu-36")
			{
				if( document.getElementById(strU + "-display").style.display == "block" )
				{
					document.getElementById(strU).style.backgroundColor = colorLightGray ;
				}
				else
				{
					document.getElementById(strU).style.backgroundColor = colorLightBlue ;	//focus on main-menu,color is blue
				}
			}
			else
			{
				//カーソルを移動する時、選択したDIVの背景長さをセット
				if(recordFlag==3){//デカ文字	
					document.getElementById(strU).style.width="260px";
				}else if(recordFlag==0){//小画面
					document.getElementById(strU).style.width="160px";
				}else{//大画面
					document.getElementById(strU).style.width="200px";
				}

				document.getElementById(strU).style.backgroundColor = colorLightGray ;	//focus on sub-menu,color is gray
			}
		/*-------------	modified by Freya end 11.07.17	--------------------------------*/	
		}
		
		if(C_enterID=="DVR-mainMenu-52")
		{
			//alert('leave me?');
			//document.getElementById(C_enterID).style.border="";	
			//document.getElementById("DVR-mainMenu-52-shade").blur();
			document.getElementById("DVR-mainMenu-52-shade").style.backgroundColor = "#363636" ;
			document.getElementById("DVR-mainMenu-52").style.backgroundImage = "url(../images/DVR-99-backbutton" + calibrationIcon() + ".png)";
			document.getElementById("戻る").style.color = "#CCC";
			document.getElementById("DVR-mainMenu-52-shade").style.outline="0px";	

		}
		C_enterID = strU ;
	
/*		deleted by Freya 11.07.18
	if(strU!="DVR-mainMenu-52")
	{ 
	    linkAdd = document.getElementById(strU).firstChild.id ;
	}else*/
	if(strU == "DVR-mainMenu-52")
	{
		//alert('hold me?');	
		//document.getElementById(strU).style.border="#000000 2px solid";	
		//document.getElementById("DVR-mainMenu-52-shade").focus();
		document.getElementById("DVR-mainMenu-52-shade").style.backgroundColor = colorLightBlue ;
		document.getElementById("DVR-mainMenu-52").style.backgroundImage = "url(../images/DVR-99-backbutton_white" + calibrationIcon() + ".png)";
		document.getElementById("戻る").style.color = "#FFF";
		document.getElementById("DVR-mainMenu-52-shade").style.outline="0px";	
	}
	
	//-------added by Freya start 11.07.25
	upScrollPro(strU);
	//-------added by Freya end 11.07.25	
}

//------added by Freya start 11.07.24
function upScrollPro(strU)
{
	dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN");
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

	if( document.getElementById("C-mainLeftMenu").scrollHeight > document.getElementById("C-mainLeftMenu").offsetHeight )
	{		
		if(strU != "DVR-mainMenu-52")
		{
			//get the extended mainmenu's location
			for(var k=0; k<C_recordRootArr.length; k++)
			{
				//now,if there isn't display-div block,there isn't the scroll
				if(document.getElementById(C_recordRootArr[k] + "-display").style.display == "block")
				{
					upDisplayFlag = 1;	//there is main-menu is extend
					break;
				}
			}
			
			//check whether the current focus is on the mainmenu
			for( var j=0; j<C_recordRootArr.length; j++)
			{
				if(C_recordRootArr[j] == strU)
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
					upmainMenuHeight = (C_recordRootArr.length - (j+1)) * (document.getElementById(strU).offsetHeight + 5);
					//big-page
					if(recordFlag==0)
					{
						upSubMenuHeight = main_SubMenu[k].length * document.getElementById("DVR-mainMenu-"+(Number(C_recordRootArr[k].substring(13,15))+1)).offsetHeight;	
					}
					//big-word-page
					if(recordFlag==3)
					{
						upSubMenuHeadNum = Number(C_recordRootArr[k].substring(13,15));
						upSubMenuCount = 100 + upSubMenuHeadNum + 1; 
											
						//check the extended main-menu's sub-menus-quantity 	
						for(var i=1; i<main_SubMenu[k].length; i++)
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
				upmainMenuHeight = (C_recordRootArr.length - (k+1)) * document.getElementById("DVR-mainMenu-00").offsetHeight;
				//big-page
				if(recordFlag==0)
				{
					upsubMenuHeadNum = Number(C_recordRootArr[k].substring(13,15)); 
					upSubMenuHeight = (main_SubMenu[k].length - (Number(strU.substring(13,15)) - upsubMenuHeadNum)) * document.getElementById(strU).offsetHeight;
				}
				//big-word-page
				if(recordFlag==3)
				{
					upSubMenuHeadNum = Number(C_recordRootArr[k].substring(13,15));
					upSubMenuCount = 100 + upSubMenuHeadNum + 1; 
											
					//check the extended main-menu's sub-menus-quantity 	
					for(var i=1; i<main_SubMenu[k].length; i++)
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
//------added by Freya end 11.07.24

//the process catch keycode when there is keydown
function main_keyClick1(handTab)
{
	dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN");
		if(event.keyCode==9 || event.keyCode==13 || event.keyCode==38 ||event.keyCode==40){//tab
			//event.returnValue = false;
			stopDefaultling(event);	
			var firstElm=document.getElementById('DVR-mainMenu-07');
			if(firstElm !=null && firstElm!=undefined){
					//alert('ready to focus');
					firstElm.focus();
					last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
				}		
			
			//alert('come in');
		}
}



//the process catch keycode when there is keydown
function main_keyClick(handTab)
{
	dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN");
	var iLoop;
	var rootFlag    = 0;
	var rootStrFlag = 0;
	var RETURN_BTN_ID = "DVR-mainMenu-52";

	// 移動先算出
	var wkNum; // 作業用変数
	var getNextFlag = 0;
	var strD; // 次のフォーカス先

	var menu_Layer = top.menu.document.getElementById("menu_div");
	if(menu_Layer != null){              ///david add 2011.10.10  when the menu is covered , we can't do anythings for it
		saved_menu_ActiveElement = top.menu.document.activeElement;
		if(saved_menu_ActiveElement){
			saved_menu_ActiveElement.blur();
		}
		saved_menu_BodyAction = new Array;
		saved_menu_BodyAction.push(top.menu.document.body.onkeydown);
		
		//replace it with do noting, stop defualt reaction of keydown, should also affected keyup,keypress ...
		top.menu.document.body.onkeydown = function(){
			stopDefaultling(event);
		};
	}else{
		if(event.keyCode==9 || event.keyCode==13){//djwan @2011050
			stopDefaultling(event);	
			if(document.activeElement.tagName=='BODY'){	
				document.getElementById("divTmpForFocus").focus();	
			}	
		}
				
		// 次のID取得用クロージャ
		// @param id
		// @param act 上:-1 下:1
		function nextFocusID(id, act) {
			var prestrID = id.substring(13,15);
			var countUID  = Number(prestrID);
			countUID = countUID + act;
			prestrID = "00"+countUID.toString();
			prestrID = prestrID.slice(-2);

			return "DVR-mainMenu-" + prestrID ;
		}

		// 大項目判断用
		for(iLoop = 0; iLoop < C_recordRootArr.length; iLoop ++) {
			if(C_enterID == C_recordRootArr[iLoop]) {
				rootFlag = 1;
				break;
			}
		}

		maxNum = main_SubMenu[0].length + main_SubMenu[1].length + main_SubMenu[2].length + main_SubMenu[3].length+1 ;

		// フォーカス処理
		if((event.shiftKey && event.keyCode == 9) || event.keyCode == 38 || (!event.shiftKey && event.keyCode==9) || event.keyCode == 40)
		{
			// 上キー
			if((event.shiftKey && event.keyCode == 9) || event.keyCode == 38) {
				// ネットワーク設定にカーソルがある場合かつ、上もしくはShift+Tabキー押下時
				if(C_enterID == C_recordRootArr[0]){
					// スクロールバーの値があれば、スクロールを一番上まで持っていく
					if(document.getElementById("C-mainLeftMenu").scrollTop){
						document.getElementById("C-mainLeftMenu").scrollTop = 0;
					}
				}

				// 次のフォーカス先を取得
				// メインメニュー
				if(rootFlag == 1) 
				{
					strD = C_recordRootArr[iLoop-1];
					if((strD == "") || (strD == null) || (strD == undefined)) {
						// 対象になるIDが存在しなければ、一番最初のIDを代入する
						strD = C_recordRootArr[0];
					}
					
					// 上のメニューが開いている状態なら、次のフォーカスを取りにいく
					// ※一番上のメニューは、次のフォーカスを取りに行かない
					if(document.getElementById(strD+"-display").style.display == "block" && C_enterID != C_recordRootArr[0]) {
						getNextFlag = 1;
					}
				}
				// 戻るボタン
				else if(C_enterID == RETURN_BTN_ID)
				{
					var last_mainMenu_disp = C_recordRootArr[(C_recordRootArr.length-1)];
					if(document.getElementById(last_mainMenu_disp+"-display").style.display == "none") {
						strD = last_mainMenu_disp;
					} else {
						getNextFlag = 1;
					}
				}
				// サブメニュー
				else 
				{
					getNextFlag = 1;
				}

				// 次のフォーカスのIDを取得
				if(getNextFlag == 1) {
					strD = C_enterID;
					while(1) {
						// 次のフォーカスを取得
						strD = nextFocusID(strD, -1);

						// IDが存在することを確認
						if(document.getElementById(strD)) {
							break;
						}
						
						wkNum = Number(strD.substring(13,15));
						if(wkNum > maxNum) {
							strD = C_enterID;
							break;
						}
					}
				}
				curstrD = strD.substring(13,15);

				//-------added by Freya start 11.07.25
				upScrollPro(strD);
				//-------added by Freya end 11.07.25	
			}

			// 下
			if((!event.shiftKey && event.keyCode==9) || event.keyCode == 40) {
				// メインメニュー
				if(rootFlag == 1) {
					if(document.getElementById(C_enterID+"-display").style.display == "none") {
						strD = C_recordRootArr[iLoop+1];
						if((strD == "") || (strD == null) || (strD == undefined)) {
							strD = RETURN_BTN_ID;
						}
					} else {
						getNextFlag = 1;
					}
				}
				// サブメニュー
				else 
				{
					getNextFlag = 1;
				}

				// 次のフォーカスのIDを取得
				if(getNextFlag == 1) {
					strD = C_enterID;
					while(1) {
						// 次のフォーカスを取得
						strD = nextFocusID(strD, 1);

						// IDが存在することを確認
						if(document.getElementById(strD)) {
							break;
						}
						
						wkNum = Number(strD.substring(13,15));
						if(wkNum > maxNum) {
							strD = C_enterID;
							break;
						}
					}
				}
				curstrD = strD.substring(13,15);

				//-----added by Freya start 11.07.24
				downScrollPro(strD);
				//-----added by Freya end 11.07.24
			}

			// カーソルが最大数を超えていたら、次のIDに戻るボタンのIDを設定する
			if(curstrD >= maxNum)
			{
				alert(curstrD+":"+maxNum);
				strD = RETURN_BTN_ID;
			}

			// 大項目判断用
			rootStrFlag = 0;
			for(iLoop = 0; iLoop < C_recordRootArr.length; iLoop ++) {
				if(strD == C_recordRootArr[iLoop]) {
					rootStrFlag = 1;
					break;
				}
			}
			
			// メインメニュー
			if(rootFlag == 1)
			{
				if(document.getElementById(C_enterID+"-display").style.display == "block") {
					document.getElementById(C_enterID).style.backgroundColor = colorLightBlue ;	
				}
				else
				{
					document.getElementById(C_enterID).style.backgroundColor = "#363636" ;
				}
			}
			// 戻るボタン
			else if(C_enterID == RETURN_BTN_ID)
			{
				document.getElementById("DVR-mainMenu-52-shade").style.backgroundColor = "#363636" ;
				document.getElementById("DVR-mainMenu-52").style.backgroundImage = "url(../images/DVR-99-backbutton" + calibrationIcon() + ".png)";
				document.getElementById("戻る").style.color = "#CCC";
				document.getElementById("DVR-mainMenu-52-shade").style.outline="0px";	
			}
			else
			{
				var string=Number(document.getElementById(C_enterID).name.substring(5,6))-1;
				document.getElementById("DVR-auxiliary_"+string).style.backgroundColor = colorLightBlue ;
				document.getElementById(C_enterID).style.backgroundColor = colorLightBlue ;	
			}

			// メインメニュー
			if(rootStrFlag == 1)
			{
				if(document.getElementById(strD + "-display").style.display == "block")
				{
					document.getElementById(strD).style.backgroundColor = colorLightGray ;
				}
				else
				{
					document.getElementById(strD).style.backgroundColor = colorLightBlue ;
				}
			}
			// 戻るボタン
			else if(strD == RETURN_BTN_ID)
			{
				document.getElementById(RETURN_BTN_ID+"-shade").style.backgroundColor = colorLightBlue ;
				document.getElementById(RETURN_BTN_ID).style.backgroundImage = "url(../images/DVR-99-backbutton_white" + calibrationIcon() + ".png)";
				document.getElementById("戻る").style.color = "#FFF";
				document.getElementById(RETURN_BTN_ID+"-shade").style.outline="0px";	
			}
			// サブメニュー
			else
			{
				// カーソルを移動する時、選択したDIVの背景長さをセット
				// デカ文字	
				if(recordFlag == 3)
				{
					document.getElementById(strD).style.width = "260px";
				}
				// 小画面
				else if(recordFlag == 0)
				{
					document.getElementById(strD).style.width = "160px";
				}
				// 大画面
				else
				{
					document.getElementById(strD).style.width = "200px";
				}
				document.getElementById(strD).style.backgroundColor = colorLightGray;
			}
			C_enterID = strD ;
		}

		// 確定ボタン
		if(event.keyCode==13){
			// 大項目メニュー
			if(rootFlag==1){
				C_maindisplayPro(C_enterID) ;	
			}
			// 戻るボタン
			else if(C_enterID == RETURN_BTN_ID)
			{
				cancel();
			}
			// サブメニュー
			else
			{
				//------added by Freya start 11.07.18
				if(C_enterID != RETURN_BTN_ID)
				{
					linkAdd = document.getElementById(C_enterID).firstChild.id;
				}
				//------added by Freya end 11.07.18
				//メニュー表示時にメニューの選択色(グレー)を右端まで伸ばす
				if( (C_enterID !="DVR-mainMenu-52") && (C_enterID != "DVR-mainMenu-00") && (C_enterID != "DVR-mainMenu-11") && (C_enterID != "DVR-mainMenu-29") && (C_enterID != "DVR-mainMenu-36") )
				{
					document.getElementById(C_enterID).style.backgroundColor = colorLightGray ;

					if(recordFlag==3){//デカ文字
						document.getElementById(C_enterID).style.width="260px";
					}
					else if(recordFlag==0){//小画面
						document.getElementById(C_enterID).style.width="160px";
					}else
					{//大画面
						document.getElementById(C_enterID).style.width="221px";//Enterキーが押されたタイミングで長さを長くして選択表示をメニュー右端につける
					}
				}

				if(linkAdd=="nstc"){
					doNSTC();
				}else{
					//anotherServer(ip,linkAdd + DVR99pageState);
					linkSever(linkAdd);
				}
			}
		}
		
		// 取消ボタン
		if(event.keyCode==27){
			cancel();
		}
	}
}

function linkSever(linkAdd){
	dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN");
	createMenuCover();
	var array=Number(linkAdd.substring(10,12));
    if(linkAdd.substring(8,9)=="1")
	{
		if(submenu1[array][2]==1){
			//CNV側から実行時かつ、コピー状態確認画面のみ、メニュー画面でcgiを実行する
			if(linkAdd==url_DVR_01_06&&DVR99pageState.toString().substring(0,1)!="0"){
				confirmCopyState();
			}else{
				/* URLに画面の縮小サイズを追加 2011.10.26 */
				//anotherServer(ip,linkAdd + DVR99pageState);
				anotherServer(ip,linkAdd + DVR99pageState + scaleParamForVGA + pageMagnification);
			}
		}
		else{
			/* URLに画面の縮小サイズを追加 2011.10.26 */
			//sameServer(linkAdd + DVR99pageState);
			sameServer(linkAdd + DVR99pageState + scaleParamForVGA + pageMagnification);
		}
	}
	if(linkAdd.substring(8,9)=="2")
	{
		if(submenu2[array][2]==1){
			/* URLに画面の縮小サイズを追加 2011.10.26 */
			//anotherServer(ip,linkAdd + DVR99pageState);
			anotherServer(ip,linkAdd + DVR99pageState + scaleParamForVGA + pageMagnification);
		}else{
			/* URLに画面の縮小サイズを追加 2011.10.26 */
			//sameServer(linkAdd + DVR99pageState);
			sameServer(linkAdd + DVR99pageState + scaleParamForVGA + pageMagnification);
		}
	}
	if(linkAdd.substring(8,9)=="3")
	{
		var checkRireki = C_enterID.split("-");
		var rirekiFlag;	//どのメニューが押されたかのFlag　履歴共通の機器選択画面に遷移したときにどこから来たか区別するために使う
		switch (Number(checkRireki[2]))
		{
			case 30:
				rirekiFlag = "&RF=DVR-03-01-00";
				break;
			case 31:
				rirekiFlag = "&RF=DVR-03-02-00";
				break;
			case 32:
				rirekiFlag = "&RF=DVR-03-03-00";
				break;
			case 33:
				rirekiFlag = "&RF=DVR-03-04-00";
				break;
			case 34:
				rirekiFlag = "&RF=DVR-03-05-01";
				break;
			default:
				rirekiFlag = "";
				break;
		}

		if(paramsForMenuCreate.screenFlag.toString().substring(4,5)==3)
		{
			linkAdd = "../DVR-03-05-00/DVR-03-05-00-BIG.html" + linkAdd.slice(37);
		}
		else if(rirekiFlag != "")
		{
			linkAdd = "../DVR-03-05-00/DVR-03-05-00.html" + linkAdd.slice(33);
		}

		if(submenu3[array][2]==1){
			/* URLに画面の縮小サイズを追加 2011.10.26 */
			//anotherServer(ip,linkAdd + DVR99pageState);
			anotherServer(ip,linkAdd + DVR99pageState + scaleParamForVGA + pageMagnification + rirekiFlag);
		}else{
			/* URLに画面の縮小サイズを追加 2011.10.26 */
			//sameServer(linkAdd + DVR99pageState);
			sameServer(linkAdd + DVR99pageState + scaleParamForVGA + pageMagnification + rirekiFlag);
		}
	}
	if(linkAdd.substring(8,9)=="4")
	{
	    if(array>14)
	    {
			array=array-1;
		}
		if(submenu4[array][2]==1){
			/* URLに画面の縮小サイズを追加 2011.10.26 */
			//anotherServer(ip,linkAdd + DVR99pageState);
			anotherServer(ip,linkAdd + DVR99pageState + scaleParamForVGA + pageMagnification);
		}else{
			/* URLに画面の縮小サイズを追加 2011.10.26 */
			//sameServer(linkAdd + DVR99pageState);
			sameServer(linkAdd + DVR99pageState + scaleParamForVGA + pageMagnification);
		}
	}
}

function cancel()//close the page 
{
	dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN");
	//alert("cancel");
	//========modify by luobingwu 2011/04/06==========
	var f = document.createElement("form");
	f.id="DVR-99-00-createForm";
	//var mainDiv=document.getElementById("C-Mainbody");
    document.body.appendChild(f);
	
	var objf = document.getElementById("DVR-99-00-createForm");
	objf.action = gUrl + "/cgi-bin/DVR-99-01-10.cgi";//mod djwan 20110413
	submitForm("DVR-99-00-createForm", doCancelResponse,null,true); //djwan @20110523
	//================================================
	//window.location = "../DVR-05-08-00/DVR-05-08-00.html" + window.location.search
	
}
//modify by luobingwu 2011/04/06
function doCancelResponse(req){           /* ＣＧＩレスポンスメッソド */
	dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN");
	var aim = /<Success>(\d+)<\/Success>/;
	var txt = req.xhRequest.responseText;
	var result = txt.match(aim);
	if (result[1] == "0") {
		//ライブ画面表示時は、カメラ名称を表示状態とする為、フラグを最後尾に追加する
		//window.location = "../DVR-05-08-00/DVR-05-08-00.html" + window.location.search;
		//window.location = "../DVR-05-08-00/DVR-05-08-00.html" + window.location.search + SHOW_CAM_NAME;
		/* フレーム化対応 */
		//window.location = "../DVR-05-08-00/DVR-05-08-00.html" + window.location.search;
		if(top){
			//メインフレームが取得できた場合は、メインフレームのURLを更新する
			if(top.location.search!=undefined)
			{
				var gotoUrl = "http://" + window.location.host + "/DVR-05-08-00/DVR-05-08-00.html" + top.location.search + SHOW_CAM_NAME;
				TopLocationFromDispWebView("true", gotoUrl );
			}
			else
//ライブから直接メニューを呼び出した場合はtop.locationが取れないためwindow.locationを入れる。
//この場合、ライブからカメラ一覧などメニュー以外の画面を出す場合、parentUrlにライブから呼び出したメニューのURLがついてしまう。
//20111110時点で動作上問題はないが、後々問題が出た場合はparentUrlを消してscreenFlagだけを残す処理が必要
			{
				var gotoUrl = "http://" + window.location.host + "/DVR-05-08-00/DVR-05-08-00.html" + window.location.search + SHOW_CAM_NAME;
				TopLocationFromDispWebView("true", gotoUrl );
			}
		}else{
			var gotoUrl = "http://" + window.location.host + "/DVR-05-08-00/DVR-05-08-00.html" + window.location.search + SHOW_CAM_NAME;
			WindowLocationFromDispWebView( gotoUrl );
		}
	}
}
//stop the default process of the particular keys
function stopDefault(e)
{	
	dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN");
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
}
var g_headID;
var g_subID;
var g_state;
//get the information before creating the main-menu
function mainMenu_check(selectMenuID,pageStatus)
{
	dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN   selectMenuID=" + selectMenuID + "IN   pageStatus=" + pageStatus);
	if(localStorage.play)
	{
		consoleLogOutput(5,"DVR-99-00-00.js",arguments.callee.name,"自動遷移処理につき右フレームにBlankをロード");
		var gotoUrl = "http://127.0.0.1/DVR-01-00-00/DVR-01-00-00-blank.html";
		TopLocationFromDispWebView("false", gotoUrl );
	}
	var headID,subID,state ;
	var maxNum = 0 ;
	var iNum ;
	var temp ;
	var mMenu_num ;
	var pageStatus = Number(pageStatus);      //dave add 2011.05.09
	var Url = Spry.Utils.getLocationParamsAsObject();
    Menu=Url.Menu;
	if(Menu){
		headID=Menu.split("_")[0];
		Display_sub_menu=Menu.split("_")[1];
	}else{
		headID = selectMenuID.substring(4,6) ;
	}
	subID = selectMenuID.substring(7,9) ;
	if(subID=="00"){
		state = "true" ;			
	}
	else{
		state = "false" ;	
	}
	g_headID = headID;
	g_subID = subID;
	g_state = state;
	if(state=="true"){
		if(pageStatus==0){

			if(!localStorage.play)//localStorage.playに値が入っていた場合は操作メニューからの戻り → メニューの幅は0にする
			{
				changMenuFrameWith(NTSC_MENU_WITH);
			}
			
			var allcss=document.getElementsByTagName("link") ;
			for(var i=0;i<allcss.length;i++){
				if(allcss[i]&&allcss[i].getAttribute("href").indexOf("DVR-99-00-00.css")!=-1){
					var style = document.createElement("link");
					style.href = "../DVR-99/DVR-99-00-00-VGA.css";
					style.rel = "stylesheet";
					style.type = "text/css";
					allcss[i].parentNode.replaceChild(style, allcss[i]);
					//dsPSP.loadData();                //dave 2011.05.09
					break ;
				}
			}
		}
		else if(pageStatus==3){
			if(!localStorage.play)//localStorage.playに値が入っていた場合は操作メニューからの戻り → メニューの幅は0にする
			{
				changMenuFrameWith(BIG_MENU_WITH);
			}
			
			var allcss=document.getElementsByTagName("link") ;
			for(var i=0;i<allcss.length;i++){
				if(allcss[i]&&allcss[i].getAttribute("href").indexOf("DVR-99-00-00.css")!=-1){
					var style = document.createElement("link");
					style.href = "../DVR-99/DVR-99-00-00-VGA-BIG.css";
					style.rel = "stylesheet";
					style.type = "text/css";
					allcss[i].parentNode.replaceChild(style, allcss[i]);
					//dsPSP.loadData();                    //dave 2011.05.09
					break ;
				}
			}
		}
		else if(pageStatus==2){
			perZoomWait = false;
			var allcss=document.getElementsByTagName("link") ;
			for(var i=0;i<allcss.length;i++){
				if(allcss[i]&&allcss[i].getAttribute("href").indexOf("DVR-99-00-00.css")!=-1){
					var style = document.createElement("link");
					style.href = "../DVR-99/DVR-99-00-00-BIG.css";
					style.rel = "stylesheet";
					style.type = "text/css";
					allcss[i].parentNode.replaceChild(style, allcss[i]);
					break ;
				}
			}
		}
		else if(pageStatus==1)
		{
			perZoomWait = false;
		}
		
		//C_menuCreate_lapper(headID,subID,state);
		//C_menuCreate(headID,subID,state);		//call the function to create the menus
	}else{
		if(pageStatus==0){
			var allcss=document.getElementsByTagName("link") ;
			for(var i=0;i<allcss.length;i++){
				if(allcss[i]&&allcss[i].getAttribute("href").indexOf("DVR-99-00-00.css")!=-1){
					var style = document.createElement("link");
					style.href = "../DVR-99/DVR-99-00-00-VGA.css";
					style.rel = "stylesheet";
					style.type = "text/css";
					allcss[i].parentNode.replaceChild(style, allcss[i]);
					/* 対応方針変更 2011.10.26 URLに縮小パラメータを付与し、各画面で縮小CGIを実行しない様に修正
					 * (カメラ側で実行すると404エラーとなる為)
					 * 縮小のパラメータは今までカメラ画面移行時に設定する"PM"とする
					 * PMの値はアナログ，デカ文字表示以外の場合はnullを保持している
					 * 但し、ライブ画面から直飛びする画面リストに設定されている場合は実行する
					 */
					if(directDispIdList.indexOf(selectMenuID) > -1){
						//dsPSP.loadData();                  //dave 2011.05.09
					}
					break ;
				}
			}
		}
		else if(pageStatus==3){
			var allcss=document.getElementsByTagName("link") ;
			for(var i=0;i<allcss.length;i++){
				if(allcss[i]&&allcss[i].getAttribute("href").indexOf("DVR-99-00-00.css")!=-1){
					var style = document.createElement("link");
					style.href = "../DVR-99/DVR-99-00-00-VGA-BIG.css";
					style.rel = "stylesheet";
					style.type = "text/css";
					allcss[i].parentNode.replaceChild(style, allcss[i]);
					/* 対応方針変更 2011.10.26 URLに縮小パラメータを付与し、各画面で縮小CGIを実行しない様に修正
					 * (カメラ側で実行すると404エラーとなる為)
					 * 縮小のパラメータは今までカメラ画面移行時に設定する"PM"とする
					 * PMの値はアナログ，デカ文字表示以外の場合はnullを保持している
					 * 但し、ライブ画面から直飛びする画面リストに設定されている場合は実行する
					 */
					if(directDispIdList.indexOf(selectMenuID) > -1){
						//dsPSP.loadData();                            //dave 2011.05.09
					}
					break ;
				}
			}
		}
		else if(pageStatus==2){
			var allcss=document.getElementsByTagName("link") ;
			for(var i=0;i<allcss.length;i++){
				if(allcss[i]&&allcss[i].getAttribute("href").indexOf("DVR-99-00-00.css")!=-1){
					var style = document.createElement("link");
					style.href = "../DVR-99/DVR-99-00-00-BIG.css";
					style.rel = "stylesheet";
					style.type = "text/css";
					allcss[i].parentNode.replaceChild(style, allcss[i]);
					break ;
				}
			}
		}
		else{
			//C_menuCreate(headID,subID,state);		//call the function to create the menus
		}
	}
	if(selectMenuID=="DVR-01-00-00"||selectMenuID=="DVR-02-00-00"||selectMenuID=="DVR-03-00-00"||selectMenuID=="DVR-04-00-00")
	{
		dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"dsDVR99MenuLOAD前");
		if(localStorage.play)
		{
			dsPSP.setURL(gUrl + "/cgi-bin/DVR-99-00-00.cgi?WithoutRefleshMemory=1");
		}
		else
		{
			dsPSP.setURL(gUrl + "/cgi-bin/DVR-99-00-00.cgi?WithoutRefleshMemory=0");
		}
		dsPSP.useCache = false;
		dsPSP.loadData();
	    
	}

}

function pageScalingParameters(parameter){    //dave 2011.04.28  change page scaling  
	dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN" + localStorage.pageId);
	if(parameter!=null&&parameter!=undefined){
		dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"parameter="+parameter);
		top.document.body.style.zoom=getScaling(parameter);
		/* フレーム化対応 */
		//右表示エリア部分のzoomサイズを設定
		if(recordFlag == 0 || recordFlag == 3){
			//アナログ，デジタル表示の場合に縮小処理を実施
			dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"recordFlag="+recordFlag);
			parent.rightpage.document.body.style.zoom=getScaling(parameter);
			parent.menu.document.body.style.zoom=getScaling(parameter);
		}
		/**
		 * NTSCの倍率毎にメニューの長さを変更する
		 * デカ文字、VGA表示のみ実施
		**/
		var mainMenuObj = top.menu.document.getElementById("DVR-mainMenu-button");
		dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"2recordFlag="+recordFlag);
		if(recordFlag==0){
			switch(Number(parameter)){
				case 1 :
					mainMenuObj.style.height = "115px";
					break;
				case 2 :
					mainMenuObj.style.height = "113px";
					break;
				case 3 :
					mainMenuObj.style.height = "110px";
					break;
				case 4 :
					mainMenuObj.style.height = "108px";
					break;
				case 5 :
					mainMenuObj.style.height = "105px";
					break;
			}
		}else if(recordFlag==3){
			switch(Number(parameter)){
				case 1 :
					mainMenuObj.style.height = "110px";
					break;
				case 2 :
					mainMenuObj.style.height = "110px";
					break;
				case 3 :
					mainMenuObj.style.height = "108px";
					break;
				case 4 :
					mainMenuObj.style.height = "108px";
					break;
				case 5 :
					mainMenuObj.style.height = "108px";
					break;
				default:
				break;
			}
		}
		
		
		//var scaling=parameter.split("|");
		//document.body.style.zoom=getScaling(parseInt(scaling[0]));
		//document.getElementById(id).style.left=6*scaling[1]+"px";
//		document.getElementById(id).style.top=4*scaling[2]+"px";
		//document.getElementById("DVR").style.left=6*scaling[1]+"px";
//		document.getElementById("DVR").style.top=4*scaling[2]+"px";
	}
	dispShowPage();
} 

function C_menuCreate_lapper(headID,subID,state)
{
	consoleLogOutput(3,"DVR-99.js",arguments.callee.name,"perZoomWait="+perZoomWait);
	if(perZoomWait == true)
	{
		setTimeout(function(){C_menuCreate_lapper(headID,subID,state);},200);
		return;
	}
	C_menuCreate(headID,subID,state);
}

function perZoom(){ //dave 2011.05.09   get page scaling
	dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN");
	var row = dsPSP.getData() ;
	pageMagnification=row[0]["ZoomSize"];
	perZoomWait = false;
	//dsIPAdress.loadData();
	perIPAdress();
}
dsPSP.addObserver(afterdsPSP) ;
//addSpryDataSetObserver(dsPSP,perZoom);

function afterdsPSP(notificationType, dataSet, dat)
{
	dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN:" + notificationType);
	if(notificationType=="onPostLoad"){	
		SubMenuCgiData();
		if(localStorage.stopProcess)
		{
			consoleLogOutput(4,"DVR-99-00-00.js",arguments.callee.name,"stopProcess DVR-99-00-00側cgi完了");
			localStorage.stopProcess = "OK";
		}
	}
}

//the call-function for other files
/*  5桁文字列である
	D: 　0:NVR   1-5:  CNV1-CNV5   display
	V:   0:VPN無し、VPN有り   VPN
	U:  (1-5） ：ユーザID
	R:  (1-5）：ユーザ権限 、6:ロック　、7:保守  right
	S:  画面サイズ
　　0：小画面 (640 * 480)
　　1：大画面 (1024 * 768)
　　2：Full HD
*/

function mainMenucreate(selectMenuID)
{
	if(localStorage.ajNOW == "AutoJump(ToLive)")
	{
		localStorage.removeItem("ajNOW");
		consoleLogOutput(3,"DVR-99-00-00.js",arguments.callee.name,"LiveへのAutoJump中につきmenu描画は行わない");
		//return;
	}
	
	if(selectMenuID == "DVR-01-00-00")
	{
	dsIPAdress = new Spry.Data.NestedXMLDataSet(dsPSP, "IPAdress") ;
	dsDVR99Menu = new Spry.Data.NestedXMLDataSet(dsPSP, "Menu");
	}
	dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN");
	if(selectMenuID!="DVR-01-00-00"&&selectMenuID!=undefined){    //chang by david 2011.06.04
		createCover();
	}
	var params;
	if(top.document){
		params = Spry.Utils.urlComponentToObject(top.location.search.replace(/^\?/, ""));
	}else{
		params = Spry.Utils.urlComponentToObject(window.location.search.replace(/^\?/, ""));
	}
	consoleLogOutput(3,"DVR-99-00-00.js",arguments.callee.name,"-->" + params.screenFlag);
	//20111109 Yabuta add フレーム化対応 ライブ画面からの遷移の場合はPAGEIDをリクエストにつける
	if(localStorage.pageId!="" && localStorage.pageId!=undefined && localStorage.pageId!=null)
	{
		pageIdTmp=localStorage.pageId;//グローバル変数にPAGEIDを格納しておきリクエスト送出(関数:anotherServer)時に使用する
	}
	//20111109 Yabuta end 

	if(params.screenFlag!=null||params.screenFlag!=undefined){
		recordFlag =params.screenFlag.toString().substring(4,5) ;       
		DVR99pageState = params.screenFlag ;
	}else{
		recordFlag = 1;
		DVR99pageState="00011";
	}

	DVR99selectMenuID = selectMenuID ;	
	if(DVR99pageState.toString().length>5)
	{
		mArchiveFlag=DVR99pageState.toString().substring(5,6);
		mScaCopyStatusFlag=DVR99pageState.toString().substring(6,7);
	}

//	if(selectMenuID=="DVR-01-00-00"||selectMenuID=="DVR-02-00-00"||selectMenuID=="DVR-03-00-00"||selectMenuID=="DVR-04-00-00")
//	{
//		dsDVR99Menu.loadData();
//	    
//	}
//	alert(localStorage.playFlag2);
	if(selectMenuID==undefined/* && !localStorage.playFlag2localStorage.playFlag2!="" && localStorage.playFlag2!="undefined" && localStorage.playFlag2!=null)*/){              //david 2011.06.02
		removeCover();
	}
	else
	{	
	    if(DVR99pageState.toString().substring(0,1)==0){
			//DVR
			if(DVR99pageState.substring(1,2)==1){ 
				//VPNあり
				SubMenuAddDet(1,DVR99pageState.substring(3,4)) ; 		 
			}else{ 
				//VPNなし
				SubMenuAddDet(2,DVR99pageState.substring(3,4)) ;
			}
		}else{
			//増設表示機
			SubMenuAddDet(3,DVR99pageState.toString().substring(3,4));
		}	
//		if((selectMenuID!=undefined)&&(selectMenuID!="")){	//there are parameter input
			//dsPSP.loadData();
			//setTimeout("mainMenu_check('"+DVR99selectMenuID+"','"+DVR99pageState.toString().substring(4,5)+"')",500);
			mainMenu_check(DVR99selectMenuID,DVR99pageState.toString().substring(4,5)) ;	
			
//		}	
	}	
	if(recordFlag == 3) // 大文字処理
	{
		main_SubMenu = new Array(submenu1_1,submenu2_1,submenu3_1,submenu4) ;
	}
	
	//document.body.removeChild(document.getElementById("coverLayer"));
	return recordFlag ;
}
/*
* Author:david 2011.10.14
* creat menu cover div and change menu width
*/
function createMenuCover(){
	dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN");
	var size=Number(getPAGE_SIZE());
	if(0==size||3==size){
		changMenuFrameWith(NO_MENU_WITH);	
	}
	//var menu_body = top.menu.document.getElementById("C-Mainbody") ;
	var menu_div = top.menu.document.createElement("div") ;
	menu_div.className = "menu_div" ;
	menu_div.id = "menu_div" ;
	/** フレーム化対応 **
	 *メニューフレームをクリックされると、メニューのフレームにフォーカスが移ってしまう為、
	 *強制的にメイン画面のフレームにフォーカスを戻してやる処理を追加
	*/
	menu_div.onclick=function(){parent.rightpage.focus();};
	//レイヤーを被せている間は、「戻る」ボタンエリアを非表示とする
	var returnAreaDiv = top.menu.document.getElementById("DVR-mainMenu-button");
	if(returnAreaDiv){
		returnAreaDiv.style.display = "none";
	}
	if(!top.menu.document.getElementById("menu_div")){
		top.menu.document.body.appendChild(menu_div);
	}
	
/*	saved_menu_ActiveElement = top.menu.document.activeElement;
	if(saved_menu_ActiveElement){
		saved_menu_ActiveElement.blur();
	}
	saved_menu_BodyAction = new Array;
	saved_menu_BodyAction.push(top.menu.document.body.onkeydown);
	
	//replace it with do noting, stop defualt reaction of keydown, should also affected keyup,keypress ...
	top.menu.document.body.onkeydown = function(){
		stopDefaultling(event);
	};*/
}

function SubMenuCgiData()
{
	dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN");
	dsDVR99Menu.loadData();
	var rows = dsDVR99Menu.getData() ;	
	DVR99pageState=DVR99pageState.toString();
	if(DVR99pageState.length>5)
	{
		DVR99pageState=DVR99pageState.substring(0,5);
		
	}

	if((rows!="")&&(rows!=undefined))
	{
		dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"POST-IN");
		DVR99pageState=DVR99pageState.toString();
		if(DVR99pageState.length>5)
		{
			DVR99pageState=DVR99pageState.substring(0,5);
			
		}
		if((rows!="")&&(rows!=undefined))
		{
			if(rows[0]["@Archive"]==0)
			{
				
				DVR99pageState=DVR99pageState+"0";
				mArchiveFlag = 0 ;	
			}
			else
			{	
				DVR99pageState=DVR99pageState+"1";
				mArchiveFlag = 1 ;			//アーカイブ運用時
			}
			if(rows[1]["@ScaduleCopy"]==0)
			{	
				DVR99pageState=DVR99pageState+"0";
				mScaCopyStatusFlag = 0 ;	//セコム保守・その他 スケジュールコピー OFF
			}
			else
			{	
				DVR99pageState=DVR99pageState+"1";
				mScaCopyStatusFlag = 1 ;	//セコム保守・その他 スケジュールコピー ON
			}
		}
		if(DVR99pageState.toString().substring(0,1)==0)//DVR	
		{
			 if(DVR99pageState.substring(1,2)==1)//vpnあり
			 {
			   SubMenuAddDet(1,DVR99pageState.substring(3,4));  		 
			 }
			 else
			 {
				SubMenuAddDet(2,DVR99pageState.substring(3,4)); 
			 }
		}else//CNV
		{
			SubMenuAddDet(3,DVR99pageState.toString().substring(3,4));
		}	

		if((paramsForMenuCreate.screenFlag.toString().substring(4,5)==3) || (paramsForMenuCreate.screenFlag.toString().substring(4,5)==0))
		{
			//アナログ・デカ文字の場合は縮小率を取得する。
			perZoom();
		}
		else
		{
			//デジタル(4:3、16:9)の場合は縮小率を取得する処理はスキップする。
			perIPAdress();
		}
	}
}
//addSpryDataSetObserver(dsDVR99Menu,SubMenuCgiData,OBSERVER_HINT_MODE_INIT);
//dsDVR99Menu.addObserver(SubMenuCgiData) ;
//the process to delete or add the sub-menu with the data of cgi
/**
 flag 1:VPNあり 2:VPNなし  3:増設表示機
**/
function SubMenuAddDet(flag,right)
{
	dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN");
	//0：not display    1:  menu display
    switch(right.toString())
	{
		// 権限：6	設定なし？
	    case "6":
	    	for(var i=0;i<arrayRight_DVR_VPN_Exist.length;i++)
			{
			    arrayRight_DVR_VPN_Exist[i]=1 ;
			}
			// VPNあり
			if( flag == 1 )
			{
			  arrayRight_DVR_VPN_Exist[43]=0;		// LANテスト
			  arrayRight_DVR_VPN_Exist[44]=0;		// HDD詳細
			  arrayRight_DVR_VPN_Exist[45]=0;		// 機器異常詳細
			  arrayRight_DVR_VPN_Exist[46]=0;		// 温度履歴
			  arrayRight_DVR_VPN_Exist[47]=0;		// その他
			}
			// VPNなし
			else if ( flag == 2 )
			{
				 arrayRight_DVR_VPN_Exist[12]=0;		// VPN接続状態確認
			     arrayRight_DVR_VPN_Exist[43]=0;		// LANテスト
				 arrayRight_DVR_VPN_Exist[44]=0;		// HDD詳細
				 arrayRight_DVR_VPN_Exist[45]=0;		// 機器異常詳細
				 arrayRight_DVR_VPN_Exist[46]=0;		// 温度履歴
				 arrayRight_DVR_VPN_Exist[47]=0;		// その他
			}
			// 増設表示機
			else if ( flag == 3 )
			{
				//+▼+++++ STEP1対象外. 7月以降リリース機能 +++++▼+//
				 arrayRight_DVR_VPN_Exist[5]=0;			// コピー状態確認
				 arrayRight_DVR_VPN_Exist[6]=0;			// 画像コピー
				 arrayRight_DVR_VPN_Exist[33]=0;		// HDD保守
				 arrayRight_DVR_VPN_Exist[35]=0;		// 記録・再生管理
				 arrayRight_DVR_VPN_Exist[37]=0;		// システム停止
				 arrayRight_DVR_VPN_Exist[38]=0;		// リモート接続
				 arrayRight_DVR_VPN_Exist[41]=0;		// 初期化
				//+▲+++++ STEP1対象外. 7月以降リリース機能 +++++▲+//

				 arrayRight_DVR_VPN_Exist[7]=0;			// ダイレクトコピー
				 arrayRight_DVR_VPN_Exist[8]=0;			// 画像ダウンロード
				 arrayRight_DVR_VPN_Exist[9]=0;			// 予約コピー
				 arrayRight_DVR_VPN_Exist[11]=0;		// ネットワーク設定
				 arrayRight_DVR_VPN_Exist[12]=0;		// VPN接続状態確認"
				 arrayRight_DVR_VPN_Exist[32]=0;		// 履歴保存
				 arrayRight_DVR_VPN_Exist[40]=0;		// 設定保存・読込
				 arrayRight_DVR_VPN_Exist[42]=0;		// バージョンアップ
				 arrayRight_DVR_VPN_Exist[43]=0;		// LANテスト
				 arrayRight_DVR_VPN_Exist[44]=0;		// HDD詳細
				 arrayRight_DVR_VPN_Exist[45]=0;		// 機器異常詳細
				 arrayRight_DVR_VPN_Exist[46]=0;		// 温度履歴
				 arrayRight_DVR_VPN_Exist[47]=0;		// その他
			 }
			 else
			 {
			 	// 処理なし
			 }
			 break;

		// 権限：7	セコム保守
		case "7":
			for(var i=0;i<arrayRight_DVR_VPN_Exist.length;i++)
			{
				arrayRight_DVR_VPN_Exist[i]=1 ;
			}
			// VPNあり
			if( flag == 1 )
			{
			}
			// VPNなし
			else if ( flag == 2 )
			{
				 arrayRight_DVR_VPN_Exist[12]=0;		// VPN接続状態確認
				
			}
			// 増設表示機
			else if ( flag == 3 )
			{
				//+▼+++++ STEP1対象外. 7月以降リリース機能 +++++▼+//
				 arrayRight_DVR_VPN_Exist[5]=0;			// コピー状態確認
				 arrayRight_DVR_VPN_Exist[6]=0;			// 画像コピー
				 arrayRight_DVR_VPN_Exist[33]=0;		// HDD保守
				 arrayRight_DVR_VPN_Exist[35]=0;		// 記録・再生管理
				 arrayRight_DVR_VPN_Exist[37]=0;		// システム停止
				 arrayRight_DVR_VPN_Exist[38]=0;		// リモート接続
				 arrayRight_DVR_VPN_Exist[41]=0;		// 初期化
				//+▲+++++ STEP1対象外. 7月以降リリース機能 +++++▲+//

			  	 arrayRight_DVR_VPN_Exist[7]=0;			// ダイレクトコピー
				 arrayRight_DVR_VPN_Exist[8]=0; 		// 画像ダウンロード
				 arrayRight_DVR_VPN_Exist[9]=0; 		// 予約コピー
				 arrayRight_DVR_VPN_Exist[11]=0;		// ネットワーク設定
				 arrayRight_DVR_VPN_Exist[12]=0;		// VPN接続状態確認"
				 arrayRight_DVR_VPN_Exist[32]=0;		// 履歴保存
				 arrayRight_DVR_VPN_Exist[40]=0;		// 設定保存・読込
				 arrayRight_DVR_VPN_Exist[42]=0;		// バージョンアップ
				 arrayRight_DVR_VPN_Exist[43]=0;		// LANテスト
				 arrayRight_DVR_VPN_Exist[44]=0;		// HDD詳細
				 arrayRight_DVR_VPN_Exist[45]=0;		// 機器異常詳細
				 arrayRight_DVR_VPN_Exist[46]=0;		// 温度履歴
				 arrayRight_DVR_VPN_Exist[47]=0;		// その他
			 }
			 else
			 {
			 	// 処理なし
			 }
			 break;

		// 権限：1
		case "1":
			for(var i=0;i<arrayRight_DVR_VPN_Exist.length;i++)
			{
				arrayRight_DVR_VPN_Exist[i]=1 ;
			}
			// VPNあり
			if(flag==1)
			{
				arrayRight_DVR_VPN_Exist[43]=0;		// LANテスト
				arrayRight_DVR_VPN_Exist[44]=0;		// HDD詳細
				arrayRight_DVR_VPN_Exist[45]=0;		// 機器異常詳細
				arrayRight_DVR_VPN_Exist[46]=0;		// 温度履歴
				arrayRight_DVR_VPN_Exist[47]=0;		// その他
			}
			// VPNなし
			else if ( flag == 2 )
			{
				arrayRight_DVR_VPN_Exist[12]=0;		// VPN接続状態確認
			    arrayRight_DVR_VPN_Exist[43]=0;		// LANテスト
				arrayRight_DVR_VPN_Exist[44]=0;		// HDD詳細
				arrayRight_DVR_VPN_Exist[45]=0;		// 機器異常詳細
				arrayRight_DVR_VPN_Exist[46]=0;		// 温度履歴
				arrayRight_DVR_VPN_Exist[47]=0;		// その他
			}
			// 増設表示機
			else if ( flag == 3 )
			{
				//+▼+++++ STEP1対象外. 7月以降リリース機能 +++++▼+//
				 arrayRight_DVR_VPN_Exist[5]=0;			// コピー状態確認
				 arrayRight_DVR_VPN_Exist[6]=0;			// 画像コピー
				 arrayRight_DVR_VPN_Exist[33]=0;		// HDD保守
				 arrayRight_DVR_VPN_Exist[35]=0;		// 記録・再生管理
				 arrayRight_DVR_VPN_Exist[37]=0;		// システム停止
				 arrayRight_DVR_VPN_Exist[38]=0;		// リモート接続
				 arrayRight_DVR_VPN_Exist[41]=0;		// 初期化
				//+▲+++++ STEP1対象外. 7月以降リリース機能 +++++▲+//

				arrayRight_DVR_VPN_Exist[7]=0;			// ダイレクトコピー
				arrayRight_DVR_VPN_Exist[8]=0;  		// 画像ダウンロード
				arrayRight_DVR_VPN_Exist[9]=0;  		// 予約コピー
				arrayRight_DVR_VPN_Exist[11]=0; 		// ネットワーク設定
				arrayRight_DVR_VPN_Exist[12]=0; 		// VPN接続状態確認"
				arrayRight_DVR_VPN_Exist[32]=0; 		// 履歴保存
				arrayRight_DVR_VPN_Exist[40]=0; 		// 設定保存・読込
				arrayRight_DVR_VPN_Exist[42]=0; 		// バージョンアップ
				arrayRight_DVR_VPN_Exist[43]=0; 		// LANテスト
				arrayRight_DVR_VPN_Exist[44]=0; 		// HDD詳細
				arrayRight_DVR_VPN_Exist[45]=0; 		// 機器異常詳細
				arrayRight_DVR_VPN_Exist[46]=0; 		// 温度履歴
				arrayRight_DVR_VPN_Exist[47]=0; 		// その他
			}
			else
			{
				// 処理なし
			}
			break;

		// 権限2
		case "2":
			for(var i=0;i<arrayRight_DVR_VPN_Exist.length;i++)
			{
				arrayRight_DVR_VPN_Exist[i]=1 ;
			}
			// VPNあり
			if(flag==1)
			{
				arrayRight_DVR_VPN_Exist[10]=0;			// 機器構成設定
				arrayRight_DVR_VPN_Exist[11]=0; 		// ネットワーク設定
				arrayRight_DVR_VPN_Exist[12]=0; 		// VPN接続状態確認"
				arrayRight_DVR_VPN_Exist[13]=0;			// 時刻設定
				arrayRight_DVR_VPN_Exist[14]=0;			// 認証設定
				arrayRight_DVR_VPN_Exist[15]=0;			// HDD運用
				arrayRight_DVR_VPN_Exist[16]=0;			// 名称設定
				arrayRight_DVR_VPN_Exist[17]=0;			// レイアウト設定
				arrayRight_DVR_VPN_Exist[18]=0;			// モニター設定
				arrayRight_DVR_VPN_Exist[19]=0;			// カメラ設定
				arrayRight_DVR_VPN_Exist[20]=0;			// 接点入出力設定

				arrayRight_DVR_VPN_Exist[21]=0;			// 簡単記録設定
				arrayRight_DVR_VPN_Exist[22]=0;			// 詳細記録設定
				arrayRight_DVR_VPN_Exist[23]=0;			// 特定日記録設定
				arrayRight_DVR_VPN_Exist[24]=0;			// 記録設定確認
				arrayRight_DVR_VPN_Exist[25]=0;			// 記録負荷確認
				arrayRight_DVR_VPN_Exist[26]=0;			// 記録状態確認
				arrayRight_DVR_VPN_Exist[43]=0;			// LANテスト
				arrayRight_DVR_VPN_Exist[44]=0;			// HDD詳細
				arrayRight_DVR_VPN_Exist[45]=0;			// 機器異常詳細
				arrayRight_DVR_VPN_Exist[46]=0;			// 温度履歴
				arrayRight_DVR_VPN_Exist[47]=0;			// その他
			}
			// VPNなし
			else if ( flag == 2 )
			{
				 arrayRight_DVR_VPN_Exist[10]=0;			// 機器構成設定
				 arrayRight_DVR_VPN_Exist[11]=0; 			// ネットワーク設定
				 arrayRight_DVR_VPN_Exist[12]=0; 			// VPN接続状態確認"
				 arrayRight_DVR_VPN_Exist[13]=0;			// 時刻設定
				 arrayRight_DVR_VPN_Exist[14]=0;			// 認証設定
				 arrayRight_DVR_VPN_Exist[15]=0;			// HDD運用
				 arrayRight_DVR_VPN_Exist[16]=0;			// 名称設定
				 arrayRight_DVR_VPN_Exist[17]=0;			// レイアウト設定
				 arrayRight_DVR_VPN_Exist[18]=0;			// モニター設定
				 arrayRight_DVR_VPN_Exist[19]=0;			// カメラ設定
				 arrayRight_DVR_VPN_Exist[20]=0;			// 接点入出力設定
				 arrayRight_DVR_VPN_Exist[21]=0;			// 簡単記録設定
				 arrayRight_DVR_VPN_Exist[22]=0;			// 詳細記録設定
				 arrayRight_DVR_VPN_Exist[23]=0;			// 特定日記録設定
				 arrayRight_DVR_VPN_Exist[24]=0;			// 記録設定確認
				 arrayRight_DVR_VPN_Exist[25]=0;			// 記録負荷確認
				 arrayRight_DVR_VPN_Exist[26]=0;			// 記録状態確認
				 arrayRight_DVR_VPN_Exist[43]=0;			// LANテスト
				 arrayRight_DVR_VPN_Exist[44]=0;			// HDD詳細
				 arrayRight_DVR_VPN_Exist[45]=0;			// 機器異常詳細
				 arrayRight_DVR_VPN_Exist[46]=0;			// 温度履歴
				 arrayRight_DVR_VPN_Exist[47]=0;			// その他
			}
			// 増設表示機
			else if ( flag == 3 )
			{
				//+▼+++++ STEP1対象外. 7月以降リリース機能 +++++▼+//
				 arrayRight_DVR_VPN_Exist[5]=0;			// コピー状態確認
				 arrayRight_DVR_VPN_Exist[6]=0;			// 画像コピー
				 arrayRight_DVR_VPN_Exist[33]=0;		// HDD保守
				 arrayRight_DVR_VPN_Exist[35]=0;		// 記録・再生管理
				 arrayRight_DVR_VPN_Exist[37]=0;		// システム停止
				 arrayRight_DVR_VPN_Exist[38]=0;		// リモート接続
				 arrayRight_DVR_VPN_Exist[41]=0;		// 初期化
				//+▲+++++ STEP1対象外. 7月以降リリース機能 +++++▲+//

				arrayRight_DVR_VPN_Exist[7]=0;			// ダイレクトコピー
				arrayRight_DVR_VPN_Exist[8]=0;			// 画像ダウンロード
				arrayRight_DVR_VPN_Exist[9]=0;			// 予約コピー
				arrayRight_DVR_VPN_Exist[10]=0;			// 機器構成設定
				arrayRight_DVR_VPN_Exist[11]=0; 		// ネットワーク設
				arrayRight_DVR_VPN_Exist[12]=0; 		// VPN接続状態確認
				arrayRight_DVR_VPN_Exist[13]=0;			// 時刻設定
				arrayRight_DVR_VPN_Exist[14]=0;			// 認証設定
				arrayRight_DVR_VPN_Exist[15]=0;			// HDD運用
				arrayRight_DVR_VPN_Exist[16]=0;			// 名称設定
				arrayRight_DVR_VPN_Exist[17]=0;			// レイアウト設定
				arrayRight_DVR_VPN_Exist[18]=0;			// モニター設定
				arrayRight_DVR_VPN_Exist[19]=0;			// カメラ設定
				arrayRight_DVR_VPN_Exist[20]=0;			// 接点入出力設定
				arrayRight_DVR_VPN_Exist[21]=0;			// 簡単記録設定
				arrayRight_DVR_VPN_Exist[22]=0;			// 詳細記録設定
				arrayRight_DVR_VPN_Exist[23]=0;			// 特定日記録設定
				arrayRight_DVR_VPN_Exist[24]=0;			// 記録設定確認
				arrayRight_DVR_VPN_Exist[25]=0;			// 記録負荷確認
				arrayRight_DVR_VPN_Exist[26]=0;			// 記録状態確認
				arrayRight_DVR_VPN_Exist[32]=0;			// 履歴保存
				arrayRight_DVR_VPN_Exist[40]=0;			// NTSC出力
				arrayRight_DVR_VPN_Exist[42]=0;			// 初期化
				arrayRight_DVR_VPN_Exist[43]=0;			// LANテスト
				arrayRight_DVR_VPN_Exist[44]=0;			// HDD詳細
				arrayRight_DVR_VPN_Exist[45]=0;			// 機器異常詳細
				arrayRight_DVR_VPN_Exist[46]=0;			// 温度履歴
				arrayRight_DVR_VPN_Exist[47]=0;			// その他
			}
			break;
		// 権限：3
		case "3":
			for(var i=0;i<arrayRight_DVR_VPN_Exist.length;i++)
			{
				arrayRight_DVR_VPN_Exist[i]=0 ;
			}

			// VPNあり
			if( flag == 1 )
			{
				arrayRight_DVR_VPN_Exist[0]=1;			// 時間検索
				arrayRight_DVR_VPN_Exist[1]=1;			// イベント検索
				arrayRight_DVR_VPN_Exist[2]=1;			// サムネイル検索
				arrayRight_DVR_VPN_Exist[3]=1;			// 画像変化検索
				arrayRight_DVR_VPN_Exist[4]=1;			// マルチ再生
				arrayRight_DVR_VPN_Exist[5]=1;			// コピー状態確認
				arrayRight_DVR_VPN_Exist[6]=1;			// 画像コピー
				arrayRight_DVR_VPN_Exist[7]=1;			// ダイレクトコピー
				arrayRight_DVR_VPN_Exist[8]=1;			// 画像ダウンロード
				arrayRight_DVR_VPN_Exist[9]=1;			// 予約コピー
				arrayRight_DVR_VPN_Exist[27]=1;			// 異常履歴
				arrayRight_DVR_VPN_Exist[28]=1;			// 接点入出力履歴
				arrayRight_DVR_VPN_Exist[29]=1;			// 記録履歴
				arrayRight_DVR_VPN_Exist[30]=1;			// 操作履歴
				arrayRight_DVR_VPN_Exist[31]=1;			// メニュー操作履歴
				arrayRight_DVR_VPN_Exist[32]=1;			// 履歴保存
			}
			// VPNなし
			else if ( flag == 2 )
			{
				arrayRight_DVR_VPN_Exist[0]=1;			// 時間検索
				arrayRight_DVR_VPN_Exist[1]=1;			// イベント検索
				arrayRight_DVR_VPN_Exist[2]=1;			// サムネイル検索
				arrayRight_DVR_VPN_Exist[3]=1;			// 画像変化検索
				arrayRight_DVR_VPN_Exist[4]=1;			// マルチ再生
				arrayRight_DVR_VPN_Exist[5]=1;			// コピー状態確認
				arrayRight_DVR_VPN_Exist[6]=1;			// 画像コピー
				arrayRight_DVR_VPN_Exist[7]=1;			// ダイレクトコピー
				arrayRight_DVR_VPN_Exist[8]=1;			// 画像ダウンロード
				arrayRight_DVR_VPN_Exist[9]=1;			// 予約コピー
				arrayRight_DVR_VPN_Exist[27]=1;			// 異常履歴
				arrayRight_DVR_VPN_Exist[28]=1;			// 接点入出力履歴
				arrayRight_DVR_VPN_Exist[29]=1;			// 記録履歴
				arrayRight_DVR_VPN_Exist[30]=1;			// 操作履歴
				arrayRight_DVR_VPN_Exist[31]=1;			// メニュー操作履歴
				arrayRight_DVR_VPN_Exist[32]=1;			// 履歴保存
			}
			// 増設表示機
			else if ( flag == 3 )
			{
				//+▼+++++ STEP1対象外. 7月以降リリース機能 +++++▼+//
//				arrayRight_DVR_VPN_Exist[5]=1;			// コピー状態確認
//				arrayRight_DVR_VPN_Exist[6]=1;			// 画像コピー
				//+▲+++++ STEP1対象外. 7月以降リリース機能 +++++▲+//

			    arrayRight_DVR_VPN_Exist[0]=1;			// 時間検索
				arrayRight_DVR_VPN_Exist[1]=1;			// イベント検索
				arrayRight_DVR_VPN_Exist[2]=1;			// サムネイル検索
				arrayRight_DVR_VPN_Exist[3]=1;			// 画像変化検索
				arrayRight_DVR_VPN_Exist[4]=1;			// マルチ再生
				arrayRight_DVR_VPN_Exist[27]=1;			// 異常履歴
				arrayRight_DVR_VPN_Exist[28]=1;			// 接点入出力履歴
				arrayRight_DVR_VPN_Exist[29]=1;			// 記録履歴
				arrayRight_DVR_VPN_Exist[30]=1;			// 操作履歴
				arrayRight_DVR_VPN_Exist[31]=1;			// メニュー操作履歴
			}
			else
			{
				// 処理なし
			}
			break;
		// 権限：4
		case "4":
			for(var i=0;i<arrayRight_DVR_VPN_Exist.length;i++)
			{
				arrayRight_DVR_VPN_Exist[i]=0 ;
			}
			// VPNあり
			if( flag == 1 )
			{
			}
			// VPNなし
			else if ( flag == 2 )
			{
			}
			// 増設表示機
			else if ( flag == 3 )
			{
			}
			else
			{
			}
			break;
		// 権限：5
		case "5":
		for(var i=0;i<arrayRight_DVR_VPN_Exist.length;i++)
		{
			arrayRight_DVR_VPN_Exist[i]=0 ;
		}
			// VPNあり
			if( flag == 1 )
			{
			}
			else if ( flag == 2 )
			{
			}
			else if ( flag == 3 )
			{
			}
			else
			{
			}
			break;
		default:
		for(var i=0;i<arrayRight_DVR_VPN_Exist.length;i++)
		{
			arrayRight_DVR_VPN_Exist[i]=0 ;
		}
		break;
	}

	// スケジュールコピー有無
	if(mScaCopyStatusFlag=="0")
	{
		arrayRight_DVR_VPN_Exist[9]=0;		// 予約コピー
	}
	else
	{
		arrayRight_DVR_VPN_Exist[9]=1;
	}

	// アーカイブ運用有無
	if(mArchiveFlag=="0")
	{
		arrayRight_DVR_VPN_Exist[8]=0;		// 画像ダウンロード
	}
	else
	{
		arrayRight_DVR_VPN_Exist[8]=1;
	}
	
	//+▼+++++ STEP1対象外. 7月以降リリース機能 +++++▼+//
	arrayRight_DVR_VPN_Exist[7] = 0;			// ダイレクトコピー
	//+▲+++++ STEP1対象外. 7月以降リリース機能 +++++▲+//

	//------modified by Freya start 11.07.21(add right 7)
	if(right.toString()=="6" || right.toString()=="1" || right.toString()=="2" || right.toString()=="7"){
	//------modified by Freya end 11.07.21	
		// NTSCまたはIX
		if(DVR99pageState.toString().substring(4,5)==0||DVR99pageState.toString().substring(4,5)==3)
		{
			arrayRight_DVR_VPN_Exist[39]=1;		// NTSC出力
		}
		else
		{
			arrayRight_DVR_VPN_Exist[39]=0;		// NTSC出力
		}
	}
	else
	{
		arrayRight_DVR_VPN_Exist[39]=0;			// NTSC出力
	}

	// IX専用
	if(recordFlag == 3) 
	{
		arrayRight_DVR_VPN_Exist[1]=0;			// イベント検索
		arrayRight_DVR_VPN_Exist[2]=0;			// サムネイル検索
		arrayRight_DVR_VPN_Exist[3]=0;			// 画像変化検索
		arrayRight_DVR_VPN_Exist[4]=0;			// マルチ再生
		arrayRight_DVR_VPN_Exist[5]=0;			// コピー状態確認
		arrayRight_DVR_VPN_Exist[6]=0;			// 画像コピー
		arrayRight_DVR_VPN_Exist[7]=0;			// ダイレクトコピー
		arrayRight_DVR_VPN_Exist[8]=0;			// 画像ダウンロード
		arrayRight_DVR_VPN_Exist[9]=0;			// 予約コピー
		arrayRight_DVR_VPN_Exist[10]=0;			// 機器構成設定
		arrayRight_DVR_VPN_Exist[14]=0;			// 認証設定
		arrayRight_DVR_VPN_Exist[16]=0;			// 名称設定
		arrayRight_DVR_VPN_Exist[17]=0;			// レイアウト設定
		arrayRight_DVR_VPN_Exist[32]=0;			// 履歴保存
		arrayRight_DVR_VPN_Exist[34]=0;			// ピント調整
		arrayRight_DVR_VPN_Exist[35]=0;			// 記録・再生管理
		arrayRight_DVR_VPN_Exist[37]=0;			// システム停止

		// 増設表示機
		if( flag == 3 )
		{
			arrayRight_DVR_VPN_Exist[38]=0;		// リモート接続
		}
		arrayRight_DVR_VPN_Exist[40]=0;			// 設定保存・読込
		arrayRight_DVR_VPN_Exist[41]=0;			// 初期化
		arrayRight_DVR_VPN_Exist[43]=0;			// LANテスト
		arrayRight_DVR_VPN_Exist[44]=0;			// HDD詳細
		arrayRight_DVR_VPN_Exist[45]=0;			// 機器異常詳細
		arrayRight_DVR_VPN_Exist[46]=0;			// 温度履歴
		arrayRight_DVR_VPN_Exist[47]=0;			// その他
//		arrayRight_DVR_VPN_Exist[48]=0;			// ???????
	}
	// add by ayama 2012.05.25		保守 - 帯域制限は無条件で非表示
	arrayRight_DVR_VPN_Exist[36] = 0;
}

//the function for sub-page back
function mainSubPageBack(pageID) 
{
	dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN");
	var mainParaResult = pageID.indexOf("?") ;
	if(mainParaResult==-1){
		window.location.href = pageID + "?screenFlag=" + DVR99pageState ;
	}
	else{
		window.location.href = pageID + "&screenFlag=" + DVR99pageState ;
	}	
}


function callSub_pages(ev)
{
	dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN");
	createMenuCover();      //add by david 2011.10.14
	setTimeout(function(){//added the timer by luo 20110629 
	var linkAdd = ev.id;
			var array=Number(linkAdd.substring(10,12));
			if(linkAdd.substring(8,9)=="1")
			{
		
				if(submenu1[array][2]==1){
					//CNV側から実行時かつ、コピー状態確認画面のみ、メニュー画面でcgiを実行する
					if(linkAdd==url_DVR_01_06&&DVR99pageState.toString().substring(0,1)!="0"){
						confirmCopyState();
					}else{
						/* URLに画面の縮小サイズを追加 2011.10.26 */
						//anotherServer(ip,linkAdd + DVR99pageState);
						anotherServer(ip,linkAdd + DVR99pageState + scaleParamForVGA + pageMagnification);
					}
				}else{
					/* URLに画面の縮小サイズを追加 2011.10.26 */
					//sameServer(linkAdd + DVR99pageState);
					sameServer(linkAdd + DVR99pageState + scaleParamForVGA + pageMagnification);
				}
			}
			if(linkAdd.substring(8,9)=="2")
			{
				if(submenu2[array][2]==1){
					/* URLに画面の縮小サイズを追加 2011.10.26 */
					//anotherServer(ip,linkAdd + DVR99pageState);
					anotherServer(ip,linkAdd + DVR99pageState + scaleParamForVGA + pageMagnification);
				}else{
					/* URLに画面の縮小サイズを追加 2011.10.26 */
					//sameServer(linkAdd + DVR99pageState);
					sameServer(linkAdd + DVR99pageState + scaleParamForVGA + pageMagnification);
				}
			}
			if(linkAdd.substring(8,9)=="3")
			{
				var checkRireki = C_enterID.split("-");
				var rirekiFlag;	//どのメニューが押されたかのFlag　履歴共通の機器選択画面に遷移したときにどこから来たか区別するために使う
				switch (Number(checkRireki[2]))
				{
					case 30:
						rirekiFlag = "&RF=DVR-03-01-00";
						break;
					case 31:
						rirekiFlag = "&RF=DVR-03-02-00";
						break;
					case 32:
						rirekiFlag = "&RF=DVR-03-03-00";
						break;
					case 33:
						rirekiFlag = "&RF=DVR-03-04-00";
						break;
					case 34:
						rirekiFlag = "&RF=DVR-03-05-01";
						break;
					default:
						rirekiFlag = "";
						break;
				}
				if(paramsForMenuCreate.screenFlag.toString().substring(4,5)==3)
				{
					linkAdd = "../DVR-03-05-00/DVR-03-05-00-BIG.html" + linkAdd.slice(37);
				}
				else if(rirekiFlag != "")
				{
					linkAdd = "../DVR-03-05-00/DVR-03-05-00.html" + linkAdd.slice(33);
				}

				if(submenu3[array][2]==1){
					/* URLに画面の縮小サイズを追加 2011.10.26 */
					//anotherServer(ip,linkAdd + DVR99pageState);
					anotherServer(ip,linkAdd + DVR99pageState + scaleParamForVGA + pageMagnification + rirekiFlag);
				}else{
					/* URLに画面の縮小サイズを追加 2011.10.26 */
					//sameServer(linkAdd + DVR99pageState);
					sameServer(linkAdd + DVR99pageState + scaleParamForVGA + pageMagnification + rirekiFlag);
				}
			}
			if(linkAdd.substring(8,9)=="4")
			{
				if(array>14)
				{
					array=array-1;
				}
				if(submenu4[array][2]==1){
					/* URLに画面の縮小サイズを追加 2011.10.26 */
					//anotherServer(ip,linkAdd + DVR99pageState);
					anotherServer(ip,linkAdd + DVR99pageState + scaleParamForVGA + pageMagnification);
				}else{
					/* URLに画面の縮小サイズを追加 2011.10.26 */
					//sameServer(linkAdd + DVR99pageState);
					sameServer(linkAdd + DVR99pageState + scaleParamForVGA + pageMagnification);
				}
			}
	 },300);
}

/**
 * コピー状態確認cgi実行関数
 * CNV側からコピー状態確認画面表示時は、
 * CNV側でコピー状態確認画面表示依頼通知を出す
**/
function confirmCopyState(){
	dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN");
	var dsCfmCpyState = new Spry.Data.XMLDataSet(DVR99serUrl + "/cgi-bin/DVR-01-06-00-01-01.cgi","Result");
	addSpryDataSetObserver(dsCfmCpyState, responseDsCfmCpyState, OBSERVER_HINT_MODE_INIT);
	dsCfmCpyState.loadData();
}

/**
 * コピー状態確認cgiのレスポンス関数
 * 実行結果をパラメータに付与し、画面遷移を行う
**/
function responseDsCfmCpyState(notificationType, dataSet, dat){
	if (notificationType == "onPostLoad") {
		dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN");
		var initd = dataSet.getData();
		//画面遷移させる場合に付与するパラメータを作成
		var resultData = "&cpyState=";
		resultData = resultData + initd[0]["Success"];
		resultData = resultData + "|" + initd[0]["Status"];
		resultData = resultData + "|" + initd[0]["Progress/@Percent"];
		resultData = resultData + "|" + initd[0]["Progress/@Complete"];
		resultData = resultData + "|" + initd[0]["Progress/@Total"];
		resultData = resultData + "|" + initd[0]["Progress/@TimeRemain"];
		//取得した情報をパラメータに付与して画面遷移させる
		/* URLに画面の縮小サイズを追加 2011.10.26 */
		//anotherServer(ip,url_DVR_01_06 + DVR99pageState + resultData);
		anotherServer(ip,url_DVR_01_06 + DVR99pageState + scaleParamForVGA + pageMagnification + resultData);
	}
}

function perIPAdress()
{
	dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN");
	dsIPAdress.loadData();
	var row = dsIPAdress.getData() ;
	ip=row[0]["@IP"];
	// IP未設定時にはこちら側でリクエストヘッダーのホスト情報を設定

	if( ip == "" )
	{
		ip = window.location.host;
	}
	
	//NVRのIPアドレスをlocalstorageに保存しておく
	localStorage.NVRIP = row[0]["@IP"];
	consoleLogOutput(4,"DVR-99-00-00.js",arguments.callee.name," NVRのIP=" + localStorage.NVRIP);
	
	C_menuCreate_lapper(g_headID,g_subID,g_state);
}
//dsIPAdress.addObserver(perIPAdress) ;

function doNSTC(){
	dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN");
	dsNSTC.setURL(DVR99serUrl + "/cgi-bin/DVR-04-07-00.cgi");
	dsNSTC.loadData();

}

dsNSTC.addObserver(getdsNSTCData); 	//updated by hdu @ 20110418
function getdsNSTCData(notificationType, dataSet, dat)
{   
    if (notificationType == "onPostLoad") {
		dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN");
		var rows = dataSet.getData();
		//alert(rows[0]["Success"]);
		if(rows.length>0){
			if(rows[0]["Success"]){
				if(rows[0]["Success"]==1){
					var objPop2 = new actionPop(gettext("DVR-04-07-01-01"),1,"戻る","nstc") ;
					objPop2.show() ;		
				}
			}
		}
	}
}



//stop default event , added by duhong @ 20110411
function stopDefaultling(e){
	dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN");
	//if(e.preventDefault){ 
	if(e){ 
		e.preventDefault();
		//e.returnValue = false;
		//event.returnValue = false;
	}
	else if (window.event) {
		// this code is for IE		
		//event.returnValue = false;
		e.returnValue = false;
	}
}

//戻るボタンにマウスのカーソルが当たったときに色を変える関数
function changeOfColor(obj,flag)
{
	dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN");
	if(flag==1)
	{
		obj.style.backgroundColor = colorLightBlue ;
		document.getElementById("DVR-mainMenu-52").style.backgroundImage = "url(../images/DVR-99-backbutton_white" + calibrationIcon() + ".png)";
		document.getElementById("戻る").style.color = "#FFF";
	}
	else if(flag==0 && C_enterID!="DVR-mainMenu-52")
	{
		obj.style.backgroundColor = "#363636" ;
		document.getElementById("DVR-mainMenu-52").style.backgroundImage = "url(../images/DVR-99-backbutton" + calibrationIcon() + ".png)";
		document.getElementById("戻る").style.color = "#CCC";
	}
}

//現在のスクリーンサイズに合わせてアイコンサイズを補正する関数
function calibrationIcon()
{
	dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN");
	var dispSize = paramsForMenuCreate.screenFlag.toString().substring(4,5);
	switch (dispSize)
	{
		case "0"://アナログVGA
			if(pageMagnification==1){	
				return "_size20";
			}
			else if(pageMagnification==2){
				return "_size19";
			}
			else if(pageMagnification==3 || pageMagnification==null){
				return "_size18";
			}
			else if(pageMagnification==4){
				return "_size17";
			}
			else if(pageMagnification==5){
				return "_size16";
			}
			break;
		case "1"://4:3
			return "";
			break;
		case "2"://16:9
			return "";
			break;
		case "3"://アナログデカ文字
			if(pageMagnification==1){
				return "_size24";
			}
			else if(pageMagnification==2){
				return "_size23";
			}
			else if(pageMagnification==3){
				return "_size22";
			}
			else if(pageMagnification==4){
				return "_size20";
			}
			else if(pageMagnification==5){
				return "_size19";
			}
			break;
		default:
		break;
	}
	return "";
}

//現在のスクリーンサイズに合わせて倍率を補正する
function calibrationsize()
{
	dispConsoleOutput("DVR-99-00-00.js",arguments.callee.name,"IN");
	var dispSize = paramsForMenuCreate.screenFlag.toString().substring(4,5);
	var dispPer = "";
	switch (dispSize)
	{
		case "0":	//アナログVGA
			if(pageMagnification==1){	
				dispPer = "";
			}
			else if(pageMagnification==2){
				dispPer = "1.06";
			}
			else if(pageMagnification==3){
				dispPer = "1.1";
			}
			else if(pageMagnification==4){
				dispPer = "1.2";
			}
			else if(pageMagnification==5){
				dispPer = "1.3";
			}
			break;
		case "1":	//4:3
			dispPer = "";
			break;
		case "2":	//16:9
			dispPer = "";
			break;
		case "3":	//アナログデカ文字
			if(pageMagnification==1){	
				dispPer = "";
			}
			else if(pageMagnification==2){
				dispPer = "1.06";
			}
			else if(pageMagnification==3){
				dispPer = "1.1";
			}
			else if(pageMagnification==4){
				dispPer = "1.2";
			}
			else if(pageMagnification==5){
				dispPer = "1.3";
			}
			break;
		default:
		break;
	}
	return dispPer;
}


