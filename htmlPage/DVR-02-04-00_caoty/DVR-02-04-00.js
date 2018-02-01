// JavaScript Document

var omFlag = displayer();	// 操作元機器番号
var gUrl = "";
var Set    = new Spry.Data.XMLDataSet(null, "Status/Sets/Set");
//エラー発生項目タグ退避
//var errob=null;
//現在時刻
var timer1;
var timer2;
var weekdays 		= new Array("日","月","火","水","木","金","土");
var weekdays_full 	= new Array("日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日");
var numbers  		= new Array("０","１","２","３","４","５","６","７","８","９");
var currentime;
//イベント発生元、上へ、下へ、左へ、右へ　の順番に格納しておく
var FocusTagList = new Array(
	new Array("DVR-02-04-01-01"		,""					,"setting"			,""					,"DVR-02-04-01-02"),
	new Array("DVR-02-04-01-02"		,""					,"setting"			,"DVR-02-04-01-01"	,"DVR-02-04-01-03"),
	new Array("DVR-02-04-01-03"		,""					,"setting"			,"DVR-02-04-01-02"	,"DVR-02-04-01-04"),
	new Array("DVR-02-04-01-04"		,""					,"setting"			,"DVR-02-04-01-03"	,"DVR-02-04-01-05"),
	new Array("DVR-02-04-01-05"		,""					,"setting"			,"DVR-02-04-01-04"	,"DVR-02-04-01-06"),
	new Array("DVR-02-04-01-06"		,""					,"setting"			,"DVR-02-04-01-05"	,""),
	new Array("setting"				,"DVR-02-04-01-01"	,"dengen"			,""					,""),
	new Array("dengen" 				,"setting"			,"ntpset"			,""					,""),
	new Array("ntpset"				,"dengen"			,"DVR-02-04-00-06"	,""					,""),
	new Array("DVR-02-04-00-06"		,"ntpset"			,"DVR-02-04-00-07"	,""					,""),
	new Array("DVR-02-04-00-07"		,"DVR-02-04-00-06"	,"decide"			,""					,"DVR-02-04-00-08"),
	new Array("DVR-02-04-00-08"		,"DVR-02-04-00-06"	,"decide"			,"DVR-02-04-00-07"	,""),
	new Array("decide"				,"DVR-02-04-00-07"	,""					,""					,"cancel"),
	new Array("cancel"				,"DVR-02-04-00-07"	,""					,"decide"			,""));

// VPN接続時のフォーカス遷移
var FocusTagListVPN = new Array(
	new Array("decide"				,""	,""					,""					,"cancel"),
	new Array("cancel"				,""	,""					,"decide"			,""));

//radio array added by luo 20110722
radioArray=new Array(
                      new Array("DVR-02-04-00-04-2","DVR-02-04-00-04-1"),
                      new Array("DVR-02-04-00-05-2","DVR-02-04-00-05-1"));

//ラジオボタン選択状態
var chgRadioDGNFlg = 0;
//ラジオボタン選択状態
var chgRadioNTPFlg = 0;
//タイマー選択状態
var chgRadioTMFlg1 = 0;
var chgRadioTMFlg2 = 0;
var chgRadioTMFlg3 = 0;
var chgRadioTMFlg4 = 0;
var chgRadioTMFlg5 = 0;
var chgRadioTMFlg6 = 0;
var chgRadioTMFlg7 = 0;
var chgRadioTMFlg8 = 0;
//ＶＧＡモードへの切替判定処理
var screenflag;

// ポップアップ表示用変数
var set_time;
var wait_cnt  = 0; // ポップアップ表示時間(秒)
var stop_time = 3; // ポップアップ最低表示時間(秒)
var set_pop = null; // ポップアップオブジェクト用

// VPN接続判断用変数
var vpn_flg = false;
// フォームサブミット実行中フラグ（初期値：False）
var submitFlg = false;
function init() 
{
	//----デバッグエリア(デバッグコンソール)の作成----//
	createDebugArea();
	//--------------------作成完了--------------------//

	//-----------計測開始(本関数の使用開始)-----------//
	iDebug(arguments.callee.name + " start");
	//------------------------------------------------//

	var mFlag = mainMenucreate("DVR-02-04-00");
	if(mFlag==0)
	{
		document.getElementById("DVR-02-04-00css").href="DVR-02-04-00-VGA.css";
		screenflag=0;
	}
	else if(mFlag==3)
	{
		document.getElementById("DVR-02-04-00css").href="DVR-02-04-00-VGA-BIG.css";
		screenflag=3;
	}
	else
	{
		document.getElementById("DVR-02-04-00css").href="DVR-02-04-00.css";
		screenflag=1;
	}

	identifyRetBtn(document.getElementById('cancel'));	//added by hlzhang @ 20110408 specified key action mapping to cancel button click.
	createPageTimer(null,null,true);    //david 2011.10.13
	//現在時刻を退避
	currentime = new Date();
	//タイムプルダウンを作成
	timeComboxCreate();
	//現在時刻で初期選択
//	timer2=setTimeout("setinitime()",500);
//	//現在時刻表示初期化
//	timer1=setTimeout("timedCount()",500);
	//Set.setURL(gUrl + "/cgi-bin/DVR-02-04-00.cgi");
	Set.setURL("DVR-02-04-00_result.xml");
	Set.useCache = false;
	Set.loadData();

	//-----------計測終了(本関数の使用終了)-----------//
	iDebug(arguments.callee.name + " end");
	//------------------------------------------------//
}
//方向キーにて、フォーカスを遷移させる処理
function changeFocus(obj) {
	//キーコードを取得
	var keyCd = event.keyCode;
	var nextFocusId = "";

	//ラジオボタン以外、イベント発生場合、ラジオボタン選択状態をクリアする
	if (obj.id!="dengen") {
		chgRadioDGNFlg = 0;
	}

	//ラジオボタン選択状態の場合、ＥＳＣキーが押下した場合のみ、ラジオボタン選択状態解除する
	if (chgRadioDGNFlg==1) {
		if (keyCd==13 || keyCd==27) {
			chgRadioDGNFlg = 0;
			stopDefaultling(event);   
			stopBubbling(event);
			document.getElementById("dengen").focus();
			last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
		}
		return;
	}
	//ラジオボタン以外、イベント発生場合、ラジオボタン選択状態をクリアする




	if (obj.id!="ntpset") {
		chgRadioNTPFlg = 0;
	}
	//ラジオボタン選択状態の場合、ＥＳＣキーが押下した場合のみ、ラジオボタン選択状態解除する




	if (chgRadioNTPFlg==1) {
		if (keyCd==13 || keyCd==27) {
			chgRadioNTPFlg = 0;
			stopDefaultling(event);   
			stopBubbling(event);
			document.getElementById("ntpset").focus();
			last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
		}
		return;
	}
		
	if(document.activeElement.tagName=='SELECT'&&(event.keyCode==33||event.keyCode==34)){  //david 2011.09.23 select PageDown Up
		if(chgRadioNTPFlg==0){
			stopDefaultling(event);
		}
	}

	// 本体キー押下時のフォーカス処理
	if(keyCd == 9) {
		stopDefaultling(event);
		stopBubbling(event);

		// フォーカスの方向を設定
		var cur;
		if(event.shiftKey) {
			cur = -1;
		} else {
			cur = 1;
		}

		// 次のタグを取得し、フォーカスをあてる
		var nextTag = getNextTabFocus(obj.id, cur);
		if(document.getElementById(nextTag) && !document.getElementById(nextTag).disabled) {
			document.getElementById(nextTag).focus();
			last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
		}
	}

	//37(左)38(上)39(右)40(下)以外、処理しない
	if (keyCd==37 || keyCd==38 || keyCd==39 || keyCd==40) {
		var iLoop = 0;
		var tagExistFlg = false;
		//キーが押下したタグ名を探し出す
		for (iLoop=0;iLoop<FocusTagList.length;iLoop++) {
			if (obj.id==FocusTagList[iLoop][0]) {
				tagExistFlg = true;
				break;
			}
		}
		//存在すれば、下記を処理する




		//上方キーの場合、遷移先があるかを判断し、ある場合、遷移する




		if (keyCd==38 && tagExistFlg && FocusTagList[iLoop][1]!="") { //上
			nextFocusId = getNextActFocus(iLoop, -1);
			document.getElementById(nextFocusId).focus();
			last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
		}
		//下方キーの場合、遷移先があるかを判断し、ある場合、遷移する




		if (keyCd==40 && tagExistFlg && FocusTagList[iLoop][2]!="") { //下
			nextFocusId = getNextActFocus(iLoop, 1);
			document.getElementById(nextFocusId).focus();
			last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
		}
		//左方キーの場合、遷移先があるかを判断し、ある場合、遷移する




		if (keyCd==37 && tagExistFlg && FocusTagList[iLoop][3]!="") { //左
			document.getElementById(FocusTagList[iLoop][3]).focus();
			last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
		}
		//右方キーの場合、遷移先があるかを判断し、ある場合、遷移する




		if (keyCd==39 && tagExistFlg && FocusTagList[iLoop][4]!="") { //右
			document.getElementById(FocusTagList[iLoop][4]).focus();
			last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
		}
		//ラジオボタンの場合、上下反応しないようにする




		if (keyCd==38 || keyCd==40 || keyCd==37 || keyCd==39) {
			if (FocusTagList[iLoop][0]=="DVR-02-04-01-01") {event.returnValue=false;}
			if (FocusTagList[iLoop][0]=="DVR-02-04-01-02") {event.returnValue=false;}
			if (FocusTagList[iLoop][0]=="DVR-02-04-01-03") {event.returnValue=false;}
			if (FocusTagList[iLoop][0]=="DVR-02-04-01-04") {event.returnValue=false;}
			if (FocusTagList[iLoop][0]=="DVR-02-04-01-05") {event.returnValue=false;}
			if (FocusTagList[iLoop][0]=="DVR-02-04-01-06") {event.returnValue=false;}
			if (FocusTagList[iLoop][0]=="DVR-02-04-00-07") {event.returnValue=false;}
			if (FocusTagList[iLoop][0]=="DVR-02-04-00-08") {event.returnValue=false;}
		}
		//テキストボックスに左右を反応させる




		if (keyCd==37 || keyCd==39) {
			return true;
		}
	}
	//時間項目の選択変更処理

	if (obj.id=="DVR-02-04-01-01") {
		/*if (chgRadioTMFlg1==0) {*/
			if (keyCd==13) {
				document.getElementById("DVR-02-04-01-01").focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
				/*chgRadioTMFlg1 = 1;*/
			}
		//}
	}
	if (obj.id=="DVR-02-04-01-02") {
		/*if (chgRadioTMFlg2==0) {*/
			if (keyCd==13) {
				document.getElementById("DVR-02-04-01-02").focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
				/*chgRadioTMFlg2 = 1;*/
			}
		//}
	}
	if (obj.id=="DVR-02-04-01-03") {
		/*if (chgRadioTMFlg3==0) {*/
			if (keyCd==13) {
				document.getElementById("DVR-02-04-01-03").focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
				/*chgRadioTMFlg3 = 1;*/
			}
		//}
	}
	if (obj.id=="DVR-02-04-01-04") {
		/*if (chgRadioTMFlg4==0) {*/
			if (keyCd==13) {
				document.getElementById("DVR-02-04-01-04").focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
				/*chgRadioTMFlg4 = 1;*/
			}
		//}
	}
	if (obj.id=="DVR-02-04-01-05") {
		/*if (chgRadioTMFlg5==0) {*/
			if (keyCd==13) {
				document.getElementById("DVR-02-04-01-05").focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
				/*chgRadioTMFlg5 = 1;*/
			}
		//}
	}
	if (obj.id=="DVR-02-04-01-06") {
		/*if (chgRadioTMFlg6==0) {*/
			if (keyCd==13) {
				document.getElementById("DVR-02-04-01-06").focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
				/*chgRadioTMFlg6 = 1;*/
			}
		//}
	}
	if (obj.id=="DVR-02-04-00-07") {
		/*if (chgRadioTMFlg7==0) {*/
			if (keyCd==13) {
				document.getElementById("DVR-02-04-00-07").focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
				/*chgRadioTMFlg7 = 1;*/
			}
		//}
	}
	if (obj.id=="DVR-02-04-00-08") {
		/*if (chgRadioTMFlg8==0) {*/
			if (keyCd==13) {
				document.getElementById("DVR-02-04-00-08").focus();
				last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
				/*chgRadioTMFlg8 = 1;*/
			}
		//}
	}

	//ラジオボタンの場合、ＥＮＴＥＲキーにて、ラジオボタン選択状態にする
	if (obj.id=="dengen") {
		if (chgRadioDGNFlg==0) {
			// 操作不可の場合、Enterキーを処理しない
			if ((keyCd==13) && (document.getElementById("dengen").disabled != true)) {//modified by luo 20110711
				var rad1=document.getElementById("DVR-02-04-00-04-1");
				var rad2=document.getElementById("DVR-02-04-00-04-2");
				if(rad2.checked){
				   rad2.focus();
				   last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
				}else{
					rad1.focus();
					last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
				}
				//document.getElementById("DVR-02-04-00-04-1").focus();
				chgRadioDGNFlg = 1;
			}
		}
	}

	//ラジオボタンの場合、ＥＮＴＥＲキーにて、ラジオボタン選択状態にする
	if (obj.id=="ntpset") {
		if (chgRadioNTPFlg==0) {
			// 操作不可の場合、Enterキーを処理しない
			if ((keyCd==13) && ((document.getElementById("ntpset").disabled != true))){//modified by luo 20110711
				var rad1=document.getElementById("DVR-02-04-00-05-1");
				var rad2=document.getElementById("DVR-02-04-00-05-2");
				if(rad2.checked){
				   rad2.focus();
				   last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
				}else{
					rad1.focus();
					last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
				}
				//document.getElementById("DVR-02-04-00-05-1").focus();
				chgRadioNTPFlg = 1;
			}
		}
	}
}

/*---------------------------------------------------------*
 * getNextActFocus
 * リモコンの「↑」「↓」のフォーカス処理で使用する次のフォーカスを取得する
 *
 * @param string id     現在のフォーカスインデックス
 * @param int    cursor 動かす方向 1:下 -1:上
 * @return    次のフォーカスオブジェクトのID
 *---------------------------------------------------------*/
function getNextActFocus(curTagIndex,iDirection) {

	var curTagId;
	var nextTagIndex = 0;
	var targetTagIndex = "";
	var nextTagId = "";
	var targetTagId = "";
	var curTagColIndex = 0;

	// デフォルト値は当前フォーカスそのままです。
	curTagId = FocusTagList[curTagIndex][0];

	targetTagId = curTagId;

	// 下方キーの場合
	if( iDirection == 1 )
	{
		curTagColIndex = 2;
	}
	// 上方キーの場合
	else if( iDirection == -1 )
	{
		curTagColIndex = 1;
	}

	targetTagId = FocusTagList[curTagIndex][curTagColIndex];

	// 「NTP同期」と「電源同期」が非活性場合、次のフォーカス項目の再取得処理は必要です。
	if( (document.getElementById(targetTagId).tagName=="TABLE") && document.getElementById(targetTagId).tabindex == -1 )
	{
		targetTagId = "";
	}

	// 取得した次のフォーカス項目が活性以外場合、次のフォーカス項目を戻る
	if( (targetTagId == "") || (document.getElementById(targetTagId).disabled) )
	{
		nextTagIndex = curTagIndex + iDirection;
		while( nextTagIndex >=0 && nextTagIndex < FocusTagList.length )
		{
			nextTagId = FocusTagList[nextTagIndex][curTagColIndex];
			if( (nextTagId !="") && !(document.getElementById(nextTagId).disabled) )
			{
				break;
			}
			nextTagIndex = nextTagIndex + iDirection;
		}

		// 活性のフォーカス項目がある場合、戻るIDに設定する
		if( nextTagIndex >=0 && nextTagIndex < FocusTagList.length )
		{
			targetTagId = nextTagId;
		}
		else
		{
			targetTagId = curTagId;
		}
	}

	return targetTagId;
}

/*---------------------------------------------------------*
 * getNextTabFocus
 * 本体キーのフォーカス処理で使用する次のタグを取得する
 *
 * @param string id     現在のID
 * @param int    cursor 動かす方向 1:下 -1:上
 * @param int    i      位置
 *---------------------------------------------------------*/
function getNextTabFocus(id, cursor) {
	var iLoop = 0;
	var tag = "";

	//キーが押下したタグ名を探し出す
	for (iLoop = 0; iLoop < FocusTagList.length; iLoop ++) {
		if (id == FocusTagList[iLoop][0]) {
			tagExistFlg = true;
			break;
		}
	}

	// タグが見つからなければ自分自身を返す
	if(!tagExistFlg)
	{
		tag = id;
	}
	// 添え字が最小値、または最大値なら自分自身を返す
	else if(((iLoop+cursor) < 0) || ((iLoop+cursor) > (FocusTagList.length-1)))
	{
		tag = id;
	}
	// 次のタグが存在したら
	else if(document.getElementById(FocusTagList[(iLoop+cursor)][0]) && !document.getElementById(FocusTagList[(iLoop+cursor)][0]).disabled)
	{
		tag = FocusTagList[(iLoop+cursor)][0];
	}
	// タグが見つからなければ再度取得しにいく
	else
	{
		tag = getNextTabFocus(FocusTagList[(iLoop+cursor)][0],cursor);
	}
	
	return tag;
}

addSpryDataSetObserver(Set,GetDsSet,OBSERVER_HINT_MODE_INIT);
function GetDsSet(notificationType, dataSet, dat) {
	if (notificationType == "onPostLoad") {
		//CGI処理が終了したらwaitpop利用可能フラグをOFFにする→ここから先はwaitpopを呼ばせない
		usableWaitPop = false;
	    var initd = dataSet.getData();
		if (initd[0]["@SetPeriod"]=="1") {
			document.getElementById("DVR-02-04-00-04-1").checked=true;
		} else {
			document.getElementById("DVR-02-04-00-04-2").checked=true;
		}
		if (initd[0]["@SetNtp"]=="1") {
			document.getElementById("DVR-02-04-00-05-1").checked=true;
			document.getElementById("DVR-02-04-00-06").disabled=false;

			docheck1();

			getindex("DVR-02-04-00-07",initd[0]["@SetHour"]);
			getindex("DVR-02-04-00-08",initd[0]["@SetMinute"]);
		} else {
			document.getElementById("DVR-02-04-00-05-2").checked=true;
			document.getElementById("DVR-02-04-00-06").disabled=true;

			docheck2();
		}
		document.getElementById("DVR-02-04-00-06").value=initd[0]["@SetNtpaddr"];
		setinitime();
		// NTP同期・電源同期の排他処理
		periodNTP();
		// VPN接続対応
		if(initd[0]["@ID"] == "1") {
			vpn_flg = true;
		
			// 現在取得を取得して非活性
			document.getElementById("DVR-02-04-01-01").disabled = true; // 年
			document.getElementById("DVR-02-04-01-02").disabled = true; // 月
			document.getElementById("DVR-02-04-01-03").disabled = true; // 日
			document.getElementById("DVR-02-04-01-04").disabled = true; // 時
			document.getElementById("DVR-02-04-01-05").disabled = true; // 分
			document.getElementById("DVR-02-04-01-06").disabled = true; // 秒

			// 時刻変更適用ボタン・非活性
			document.getElementById("setting").disabled = true;
			
			// 電源同期・チェックをはずして非活性
			document.getElementById("DVR-02-04-00-04-1").checked  = false;
			document.getElementById("DVR-02-04-00-04-2").checked  = false;
			document.getElementById("DVR-02-04-00-04-1").disabled = true;
			document.getElementById("DVR-02-04-00-04-2").disabled = true;
			document.getElementById("DVR-02-04-00-04-1-td").className = "RadioWord fontDimColor";
			document.getElementById("DVR-02-04-00-04-2-td").className = "RadioWord fontDimColor";
			document.getElementById("dengen").disabled = true;
			document.getElementById("dengen").className = "RadioTab1 dengen borderAsPageBackColor";

			// NTP同期・チェックをはずして非活性
			document.getElementById("DVR-02-04-00-05-1").checked  = false;
			document.getElementById("DVR-02-04-00-05-2").checked  = false;
			document.getElementById("DVR-02-04-00-05-1").disabled = true;
			document.getElementById("DVR-02-04-00-05-2").disabled = true;
			document.getElementById("DVR-02-04-00-05-1-td").className = "RadioWord fontDimColor";
			document.getElementById("DVR-02-04-00-05-2-td").className = "RadioWord fontDimColor";
			document.getElementById("ntpset").disabled = true;
			document.getElementById("ntpset").className = "RadioTab1 dengenDim borderAsPageBackColor";

			// 同期時刻・空白
			document.getElementById("DVR-02-04-00-07").options.add(new Option("",""));
			document.getElementById("DVR-02-04-00-07").value = "";
			document.getElementById("DVR-02-04-00-08").options.add(new Option("",""));
			document.getElementById("DVR-02-04-00-08").value = "";
			
			// NTP同期が「有」で設定されていれば
			if(initd[0]["@SetNtp"] == "1") {
				docheck2();
			}
			
			// フォーカスタグをVPN用に差し替え
			FocusTagList = FocusTagListVPN;
		}

		showPage();//add by djwan @20110429
		
		// 一番最初のタグにフォーカスをあてる
		for(var i = 0; i < FocusTagList.length; i ++) {
			if(!document.getElementById(FocusTagList[i][0]).disabled) {
				document.getElementById(FocusTagList[i][0]).focus();
				break;
			}
		}
		last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる

		// 画面描画再開
		dispDrawStart();
		// 初期フォーカス失敗時の救済処置
		//rescueFocus(top.rightpage.document.getElementById(FocusTagList[i][0]));
		rescueFocus(top.document.getElementById(FocusTagList[i][0]));
	}
}
//年月日時分秒のプルダウン初期値設定


// #17673の対応、NTP調時、電源調時は 片方しか「有」に出来ないように対応する
function periodNTP() {
	// NTP同期が「有」の場合
	if( document.getElementById("DVR-02-04-00-05-1").checked == true ){
		// 電源同期を「無」で非活性表示する
		document.getElementById("DVR-02-04-00-04-2").checked  = true;
		document.getElementById("DVR-02-04-00-04-1").disabled = true;
		document.getElementById("DVR-02-04-00-04-2").disabled = true;
		document.getElementById("DVR-02-04-00-04-1-td").className = "RadioWord fontDimColor";
		document.getElementById("DVR-02-04-00-04-2-td").className = "RadioWord fontDimColor";
		document.getElementById("dengen").disabled = true;
		document.getElementById("dengen").className = "RadioTab1 dengenDim borderAsPageBackColor";
	} else {
		// 電源同期を活性表示する
		document.getElementById("DVR-02-04-00-04-1").disabled = false;
		document.getElementById("DVR-02-04-00-04-2").disabled = false;
		document.getElementById("DVR-02-04-00-04-1-td").className = "RadioWord";
		document.getElementById("DVR-02-04-00-04-2-td").className = "RadioWord";
		document.getElementById("dengen").disabled = false;
		document.getElementById("dengen").className = "RadioTab1 dengen borderAsPageBackColor";
	}

	// 電源同期が「有」の場合
	if( document.getElementById("DVR-02-04-00-04-1").checked == true ){
		// NTP同期を「無」で非活性表示する
		document.getElementById("DVR-02-04-00-05-2").checked  = true;
		document.getElementById("DVR-02-04-00-05-1").disabled = true;
		document.getElementById("DVR-02-04-00-05-2").disabled = true;
		document.getElementById("DVR-02-04-00-05-1-td").className = "RadioWord fontDimColor";
		document.getElementById("DVR-02-04-00-05-2-td").className = "RadioWord fontDimColor";
		document.getElementById("ntpset").disabled = true;
		document.getElementById("ntpset").className = "RadioTab1 dengenDim borderAsPageBackColor";
	} else {
		// NTP同期を活性表示する
		document.getElementById("DVR-02-04-00-05-1").disabled = false;
		document.getElementById("DVR-02-04-00-05-2").disabled = false;
		document.getElementById("DVR-02-04-00-05-1-td").className = "RadioWord";
		document.getElementById("DVR-02-04-00-05-2-td").className = "RadioWord";
		document.getElementById("ntpset").disabled = false;
		document.getElementById("ntpset").className = "RadioTab1 dengen borderAsPageBackColor";
	}

	// NTP同期と電源同期の設定値より、項目のフォーカスを設定する。
	setTblTabIndex();

}

function setinitime() {
	var YY=document.getElementById("DVR-02-04-01-01");
	var MM=document.getElementById("DVR-02-04-01-02");
	var DD=document.getElementById("DVR-02-04-01-03");
	var HH=document.getElementById("DVR-02-04-01-04");
	var FF=document.getElementById("DVR-02-04-01-05");
	//var SS=document.getElementById("DVR-02-04-01-06");

	// 現在年の取得
	var year = currentime.getYear();
	year = (year < 2000) ? year + 1900 : year; // 4桁現在年

	// プルダウン選択
	if (VALID_YEAR_FROM <= year && year <= VALID_YEAR_TO) {
		YY.options[year-VALID_YEAR_FROM].selected=true;
	} else {
		YY.options[0].selected=true;
	}
	MM.options[currentime.getMonth()].selected=true;
	DD.options[currentime.getDate()-1].selected=true;
	HH.options[currentime.getHours()].selected=true;
	FF.options[currentime.getMinutes()].selected=true;
	document.getElementById("weekday").innerHTML = "(" + weekdays[currentime.getDay()] + ")";
	clearTimeout(timer2);
}
//タイムのプルダウンを作成
function timeComboxCreate(){
	var YY=document.getElementById("DVR-02-04-01-01");
	var MM=document.getElementById("DVR-02-04-01-02");
	var DD=document.getElementById("DVR-02-04-01-03");
	var HH=document.getElementById("DVR-02-04-01-04");
	var FF=document.getElementById("DVR-02-04-01-05");
	var SS=document.getElementById("DVR-02-04-01-06");
	var HX=document.getElementById("DVR-02-04-00-07");
	var FX=document.getElementById("DVR-02-04-00-08");
	//年プルダウン設定
	for (var i=VALID_YEAR_FROM;i<=VALID_YEAR_TO;i++) {
		YY.options.add(new Option(i,i));
	}
	//月プルダウン設定
	for (var i=1;i<13;i++) {
		if (i<10) {
			MM.options.add(new Option("0"+i,i));
		} else {
			MM.options.add(new Option(i,i));
		}
	}
	//日プルダウン設定
	var year=currentime.getYear();
	if (year<1900) year+=1900;
	var mont=currentime.getMonth()+1;
	var lday=getMonthLastDay(year,mont);
	for (var i=1;i<=lday;i++) {
		if (i<10) {
			DD.options.add(new Option("0"+i,i));
		} else {
			DD.options.add(new Option(i,i));
		}
	}
	//時分秒プルダウン設定




	for (var i=0;i<60;i++) {
		if (i<10) {
			HH.options.add(new Option("0"+i,i));
			HX.options.add(new Option("0"+i,i));
			FF.options.add(new Option("0"+i,i));
			FX.options.add(new Option("0"+i,i));
			SS.options.add(new Option("0"+i,i));
		} else {
			if (i<24) {
				HH.options.add(new Option(i,i));
				HX.options.add(new Option(i,i));
			}
			FF.options.add(new Option(i,i));
			FX.options.add(new Option(i,i));
			SS.options.add(new Option(i,i));
		}
	}
}
//月のラストディーを求める




function getMonthLastDay(yy,mm) {
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
//取消ボタン




/* 2012.9.11 取消ボタンの処理を共通ファイル DVR-99.js へ移動
function doCancel()      //modified by luo 20110627
{
       var obj=document.getElementById("cancel");
       var popObj1=new actionPop(gettext("DVR-99-01-cancel"),2,"はい","いいえ");
       popObj1.addObserver(doIt);
	   popObj1.show(obj);
	//window.location = "../DVR-02-00-00/DVR-02-00-00.html";
	//backServer();//delete by luo 20110627
}
function doIt(methodName){//added by luo 20110627
	   if(methodName=="ok"){
	      backServer();
	   }
	}*/
//曜日を計算する




function getDateInfo(flg) {
	var o = document.getElementById("DVR-02-04-01-01");
	var y = parseInt(o.options[o.selectedIndex].text);
	var m = document.getElementById("DVR-02-04-01-02").selectedIndex + 1;
	o = document.getElementById("DVR-02-04-01-03");
	//var d = o.options[o.selectedIndex].text;
	var d = o.selectedIndex;             //chang by david 2011.09.29
	if (flg==1 || flg==2) {
		o.options.length=0;
		var lday=getMonthLastDay(y,m);
		for (var i=1;i<=lday;i++) {
			if (i<10) {
				o.options.add(new Option("0"+i,i));
			} else {
				o.options.add(new Option(i,i));
			}
		}
		if (d > o.length-1) {           //chang by david 2011.09.29
			o.selectedIndex=o.length-1;
		} else {
			o.selectedIndex=d;
		}
	}
	d = o.options[o.selectedIndex].text;
	var c = new Date();
	c.setFullYear(y,m-1,d);
	var dayOfWeek = c.getDay();
	document.getElementById("weekday").innerHTML = "(" + weekdays[dayOfWeek] + ")";
}

//----------------------------------------------------
// 適用ボタン
//----------------------------------------------------
function addset()
{
	// 時刻を変更しています
	set_pop = new actionPop(gettext("DVR-02-04-01-01"),0,"","");
	set_pop.show();

	dispInputEventStop(); 

	// #11883 start --->
	// 指定月に対する指定日の妥当性チェックを行い、
	// 指定日が指定月の最終日を超える場合、指定月の最終日に補正する
	var Year  = document.getElementById("DVR-02-04-01-01").value;
	var Month = document.getElementById("DVR-02-04-01-02").value;
	var Day   = document.getElementById("DVR-02-04-01-03").value;
	var Lastday = getMonthLastDay(Year, Month);
	if( Day > Lastday )
	{
		document.getElementById("DVR-02-04-01-03").value = Lastday;
	}
	// <--- #11883 end

	// ポップアップ表示秒数カウント開始
	wait_cnt = 0;
	set_time = setInterval(doWaitCnt,1000);

	var objf = document.forms.item(1);	
	objf.innerHTML="";
	var obj=null;
	//年
	obj=document.getElementById("DVR-02-04-01-01");
// Daniel 2011/04/05 Start html->cgiのパラメータ値修正
//	objf.appendChild(createinput("DVR-02-04-01-01","20".concat(obj.options(obj.selectedIndex).text)));
	objf.appendChild(createinput("DVR-02-04-01-01",obj.options[obj.selectedIndex].text));
// Daniel 2011/04/05 End
	//月




	obj=document.getElementById("DVR-02-04-01-02");
	objf.appendChild(createinput("DVR-02-04-01-02",obj.options[obj.selectedIndex].text));
	//日




	obj=document.getElementById("DVR-02-04-01-03");
	objf.appendChild(createinput("DVR-02-04-01-03",obj.options[obj.selectedIndex].text));
	//時
	obj=document.getElementById("DVR-02-04-01-04");
	objf.appendChild(createinput("DVR-02-04-01-04",obj.options[obj.selectedIndex].text));
	//分
	obj=document.getElementById("DVR-02-04-01-05");
	objf.appendChild(createinput("DVR-02-04-01-05",obj.options[obj.selectedIndex].text));
	//秒
	obj=document.getElementById("DVR-02-04-01-06");
	objf.appendChild(createinput("DVR-02-04-01-06",obj.options[obj.selectedIndex].text));
	//操作元機器番号
	objf.appendChild(createinput("omFlag",omFlag));
	//objf.action = gUrl + "/cgi-bin/DVR-02-04-01.cgi";
	objf.action = "DVR-02-04-01_result.xml";
	//submitformではwaitpopを出すようにフラグを戻す
	usableWaitPop = false;
	submitForm("DVR-02-04-00-tmpform",updateResponseWait);
}

/*-----------------------------------------------*
 * updateResponseWait
 * ポップアップ表示待機用
 *-----------------------------------------------*/
function updateResponseWait(req) {
	// ポップアップ表示秒数カウント処理をクリア
	clearInterval(set_time);

	// ポップアップ残り表示時間を計算
	var btime = stop_time - wait_cnt; // 最低表示時間-表示時間
	if(btime < 0) {
		btime = 0;
	} else {
		btime = btime * 1000; // 単位がミリ秒のため、1000で掛ける
	}
	consoleLogOutput(5,"DVR-02-04-00.js",arguments.callee.name,"登録終了処理へ遷移する");
	updateResponseDiv1(req);
}

function updateResponseDiv1(req){           /*FORM１の値を保存する*/
	closeWaitingWindow();

	dispInputEventStart();

	//added by hlzhang @ 20110505 specified key action mapping to cancel button click.
	identifyRetBtn(document.getElementById('cancel'));	
	
	var aim = /<ReturnValue>(\d+)<\/ReturnValue>/;
	var txt = req.xhRequest.responseText;
	var result = txt.match(aim);
	if (result[1] != 0) {
		var jobj = new actionPop(gettext("DVR-02-04-02-01"),1,"戻る","");
		jobj.show(document.getElementById("setting"));
	}
	//2011.10.05 mod hikosaka NVRD-2739
	document.getElementById("setting").focus();
	last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
}
//開かれたポップアップ画面を閉じる




function closeWaitingWindow() {
	// 時刻設定中ポップアップを非表示へ
	if(set_pop)
	{
		set_pop.hide();
	}
}

/*-----------------------------------------------*
 * doWaitCnt
 * ポップアップ表示してからの秒数をカウントする
 *-----------------------------------------------*/
function doWaitCnt() {
	wait_cnt ++;
}

//----------------------------------------------------
// 確定ボタン
//----------------------------------------------------
function doConnect(){
	// フォームサブミット中場合、二重サブミットを制御する
	if( submitFlg ){
		return;
	}
	submitFlg = true;

	// VPN接続時は変更する値がないため、処理せずに遷移する
	if(vpn_flg) {
		backServer();
	} else {

		// #11883 start --->
		// 指定月に対する指定日の妥当性チェックを行い、
		// 指定日が指定月の最終日を超える場合、指定月の最終日に補正する(画面表示のみ)
		var Year  = document.getElementById("DVR-02-04-01-01");
		var Month = document.getElementById("DVR-02-04-01-02");
		var Day   = document.getElementById("DVR-02-04-01-03");
		var Lastday = getMonthLastDay(Year, Month);
		if( Day > Lastday )
		{
			document.getElementById("DVR-02-04-01-03").value = Lastday;
		}
		// <--- #11883 end

		// 入力チェック
		var chk_obj;
		
		// ◆NTPサーバーアドレス
		chk_obj = document.getElementById("DVR-02-04-00-06");
		if (!chk_obj.disabled) {
			// 桁数チェック
			if(chk_obj.value.length > 40) { //40文字以上
				showErrorMessage(gettext("DVR-02-04-04-01"),chk_obj);
				submitFlg = false;
				return;
			}
			// 半角英数記号チェック
			else if(!checkCh(chk_obj.value))
			{
				showErrorMessage(gettext("DVR-02-04-03-01"),chk_obj);
				submitFlg = false;
				return;
			}
		}

		var objf = document.forms.item(1);	
		objf.innerHTML="";
		var obj=null;
		//電源同期 1:する 0:しない
		obj=document.getElementById("DVR-02-04-00-04-1");
		if (obj.checked) {
			objf.appendChild(createinput("DVR-02-04-00-04","1"));
		} else {
			objf.appendChild(createinput("DVR-02-04-00-04","0"));
		}
		//ＮＴＰ設定 1:する 0:しない　　＆　　調時時刻




		obj=document.getElementById("DVR-02-04-00-05-1");
		if (obj.checked) {
			objf.appendChild(createinput("DVR-02-04-00-05","1"));
			obj=document.getElementById("DVR-02-04-00-07");
			objf.appendChild(createinput("DVR-02-04-00-07",obj.options[obj.selectedIndex].text));
			obj=document.getElementById("DVR-02-04-00-08");
			objf.appendChild(createinput("DVR-02-04-00-08",obj.options[obj.selectedIndex].text));
		} else {
			objf.appendChild(createinput("DVR-02-04-00-05","0"));
			obj=document.getElementById("DVR-02-04-00-07");
			objf.appendChild(createinput("DVR-02-04-00-07",obj.options[obj.selectedIndex].text));
			obj=document.getElementById("DVR-02-04-00-08");
			objf.appendChild(createinput("DVR-02-04-00-08",obj.options[obj.selectedIndex].text));
		}
		//ＮＴＰサーバアドレス
		obj=document.getElementById("DVR-02-04-00-06");
		
		// IPを入力している場合、IPの補正処理を行う
		if(checkIpAddressFormat(obj.value))
		{
			var newNTPstr = resetNTPIpAddressValue(obj.value);
			objf.appendChild(createinput("DVR-02-04-00-06", newNTPstr));
		}
		else
		{
			objf.appendChild(createinput("DVR-02-04-00-06", obj.value));
		}
		
		//操作元機器番号
		objf.appendChild(createinput("omFlag",omFlag));
		//objf.action = gUrl + "/cgi-bin/DVR-02-04-02.cgi";
		objf.action = "DVR-02-04-02_result.xml";
		//submitformではwaitpopを出すようにフラグを戻す
		usableWaitPop = true;
		submitForm("DVR-02-04-00-tmpform",updateResponseDiv2);
	}
}
function updateResponseDiv2(req){           /*FORM２の値を保存する*/
	var aim = /<ReturnValue>(\d+)<\/ReturnValue>/;
	var txt = req.xhRequest.responseText;
	var result = txt.match(aim);
	if (result[1] == 0) {
		//window.location = "../DVR-02-00-00/DVR-02-00-00.html";
		backServer();
	} else {
		var jobj = new actionPop(gettext("DVR-02-04-02-01"),1,"戻る","");
		jobj.show(document.getElementById("decide"));
	}
	// フォームサブミット完了場合、フラグを「false」に変更する
	submitFlg = false;
}
//調時時刻の有効




/*-----------------------------------------------*
 * docheck1
 * NTP同期「有」選択時の処理
 *-----------------------------------------------*/
function docheck1()
{
	var ob=document.getElementById("DVR-02-04-00-06");
	if (ob!=null) ob.disabled = false;
	var ob=document.getElementById("DVR-02-04-00-07");
	if (ob!=null) ob.disabled = false;
	var ob=document.getElementById("DVR-02-04-00-08");
	if (ob!=null) ob.disabled = false;
	FocusTagList[8][2]  = "DVR-02-04-00-06";
	FocusTagList[12][1] = "DVR-02-04-00-07";
	FocusTagList[13][1] = "DVR-02-04-00-07"; // 「取消」の上方向のフォーカスを同期時刻に

	// 同期時刻を元に戻す
	// (末尾に「--」を追加してあるので、消す
	var len = document.getElementById("DVR-02-04-00-07").length - 1;
	if(document.getElementById("DVR-02-04-00-07").options[len].value == "--") document.getElementById("DVR-02-04-00-07").options[len] = null;
	len = document.getElementById("DVR-02-04-00-08").length - 1;
	if(document.getElementById("DVR-02-04-00-08").options[len].value == "--") document.getElementById("DVR-02-04-00-08").options[len] = null;

	// NTPサーバーアドレスを活性
	document.getElementById("DVR-02-04-00-06").className = "textaddr";
	document.getElementById("DVR-02-04-00-06").disabled  = false;

	// NTP同期と電源同期の設定値より、項目のフォーカスを設定する。
	setTblTabIndex();
}

/*-----------------------------------------------*
 * docheck2
 * NTP同期「無」選択時の処理
 *-----------------------------------------------*/
function docheck2()
{
	var ob=document.getElementById("DVR-02-04-00-06");
	if (ob!=null) ob.disabled = true;
	var ob=document.getElementById("DVR-02-04-00-07");
	if (ob!=null) ob.disabled = true;
	var ob=document.getElementById("DVR-02-04-00-08");
	if (ob!=null) ob.disabled = true;
	FocusTagList[8][2]  = "decide";
	FocusTagList[12][1] = "ntpset";
	FocusTagList[13][1] = "ntpset"; // 「取消」の上方向のフォーカスをNTP同期に

	// 同期時刻に「--」を表示して非活性
	document.getElementById("DVR-02-04-00-07").options.add(new Option("--","--"));
	document.getElementById("DVR-02-04-00-07").value = "--";
	document.getElementById("DVR-02-04-00-08").options.add(new Option("--","--"));
	document.getElementById("DVR-02-04-00-08").value = "--";

	// NTPサーバーアドレスを非活性
	document.getElementById("DVR-02-04-00-06").className = "textaddr disableBackgroundColor";
	document.getElementById("DVR-02-04-00-06").disabled  = true;
	document.getElementById("DVR-02-04-00-06").value     = "";

	// NTP同期と電源同期の設定値より、項目のフォーカスを設定する。
	setTblTabIndex();
}
//エラーメッセージを表示する




function showErrorMessage(txt,obj){
	var jobj = new actionPop(txt,1,"戻る","");
	//jobj.addObserver(afterError);
	jobj.show(obj);
}
//function afterError(methodName){
//	errob.focus();	
//}
function createinput(name,s) {
	var ipt=document.createElement('input');
	ipt.name=name;
	ipt.type="hidden";
	ipt.value=s;
	return ipt;
}
function getindex(id,val) {
	var objs = document.getElementById(id);
	for (var i=0;i<objs.options.length;i++) {
		if (val==objs.options[i].text) {
			objs.selectedIndex = i;
			return;
		}
	}
}
//サーバーアドレスの妥当性チェック
function isSvrAddress(id) {
	if (!isIP(document.getElementById(id).value)) {
		//var serverPat=/[\w-.!~*'\" ();\/?:@&=+\$,%\#]+/; 
		var serverPat=/[A-Za-z0-9\.-]{3,}\.[A-Za-z]{3}/;
		var matchArray=serverPat.test(document.getElementById(id).value); 
		if (matchArray) {
			return true;
		}
		//showErrorMessage("サーバーアドレスが間違っています。");
		//errob=document.getElementById(id);
		return false;
	} else {
		return true;
	}
}
//ＩＰアドレスの妥当性チェック
function isIP(strIP) {
	var re=/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g ;//IPアドレスにマッチング
	if(re.test(strIP))
	{
		if( RegExp.$1 <256 && RegExp.$2<256 && RegExp.$3<256 && RegExp.$4<256) return true;
	}
	return false;
}

//---------------------------------------------------------------
// 関数名:clickRadio
// ラジオボタンがクリックされたときに中項目選択状態
// (ラジオボタン選択状態)に設定する関数
//---------------------------------------------------------------
function clickRadio(target)
{
	target.focus();
	last_focus = document.activeElement; //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
	//#11882対応 ラジオボタン選択中のフラグを立てる
	//setTimeoutを使用することでBODY部に仕込んだ関数(clickBody)よりも後に実行できる
	setTimeout(function(){
							switch (last_focus.id)
							{
								case "DVR-02-04-00-04-2":
								case "DVR-02-04-00-04-1":
									chgRadioDGNFlg = 1;
									last_focus = document.getElementById("dengen"); //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
									break;
								case "DVR-02-04-00-05-2":
								case "DVR-02-04-00-05-1":
									chgRadioNTPFlg = 1;
									last_focus = document.getElementById("ntpset"); //フォーカスを見失ったときに復活させるためにフォーカス位置を覚えさせる
									break;
								default:
									consoleLogOutput(1,"DVR-02-04-00.js",arguments.callee.name,"ラジオボタンクリックで不正動作");
									break;
							}
							consoleLogOutput(9,"DVR-02-04-00.js",arguments.callee.name,"RadioFlg ON");
						},0);
}

//---------------------------------------------------------------
// 関数名:clickBody
// 画面内の任意の箇所がクリックされたときに中項目選択状態
// (ラジオボタン選択状態)をクリアする関数
//---------------------------------------------------------------
function clickBody()
{
	chgRadioDGNFlg = 0;
	chgRadioNTPFlg = 0;
}

// マウスのキーを押下したの制御処理：非活性の項目はフォーカス不可に設定する。
function setMouseFocus(obj)
{
	// NTP同期と電源同期一方が「無」場合、フォーカス不可に設定する。
	if( ( (obj.id == "dengen") && (document.getElementById("DVR-02-04-00-04-2").checked) ) ||
		( (obj.id == "ntpset") && (document.getElementById("DVR-02-04-00-05-2").checked) ) )
	{
		obj.tabIndex == -1;
		//イベント伝播抑止
		stopDefaultling(event);	
		stopBubbling(event);
		return false;
	}
}

// NTP同期と電源同期の設定値より、項目のフォーカスを設定する。
function setTblTabIndex()
{
	var noNtpSetChk = false;
	var noDengenchk = false;

	noDengenchk = document.getElementById("DVR-02-04-00-04-2").checked;
	noNtpSetChk = document.getElementById("DVR-02-04-00-05-2").checked;
	// NTP同期が「無」と電源同期が「無」場合
	if( (noDengenchk) && (noNtpSetChk) )
	{
		// 活性項目をフォーカス可能に設定する
		document.getElementById("dengen").tabindex = "8";

		// 活性項目をフォーカス可能に設定する
		document.getElementById("ntpset").tabindex = "9";
	}
	// NTP同期が「無」と電源同期が「有」場合
	else if(!noDengenchk)
	{
		// 活性項目をフォーカス可能に設定する
		document.getElementById("dengen").tabindex = "8";

		// 非活性項目をフォーカス不可に設定する
		document.getElementById("ntpset").tabindex = "-1";
	}
	// NTP同期が「有」と電源同期が「無」場合
	else if(!noNtpSetChk)
	{
		// 非活性項目をフォーカス不可に設定する
		document.getElementById("dengen").tabindex = "-1";

		// 活性項目をフォーカス可能に設定する
		document.getElementById("ntpset").tabindex = "9";
	}
}
