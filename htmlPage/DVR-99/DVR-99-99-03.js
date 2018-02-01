var comConfigDsCheck = new Spry.Data.XMLDataSet(null,"Result/DeviceInfo/DeviceSet");
var callBackCheck = null;
var selectNetMid = null;
var FocusObj = null;
var param1 = null;
var param2 = null;

/* 画面サブミット時に、DVR構成情報をチェックする
 * doFunction	: 画面サブミットの関数
 * netmid		: 対象機器のNetMid
 * p1			: パラメータ（フォーカス対象）
 */
function DoAfterCheckOk(doFunction, netmid, p1, p2, p3) {
	callBackCheck = doFunction;
	selectNetMid = netmid;
	FocusObj = p1;
	param1 = p2;
	param2 = p3;

	comConfigDsCheck.setURL(gUrl + "/cgi-bin/DVR-02-09-00.cgi?DVR-02-09-00-02=0" + "&omFlag=" + omFlag);
	comConfigDsCheck.useCache = false;
	comConfigDsCheck.loadData();
}

// コールバック関数の登録処理を行う
addSpryDataSetObserver(comConfigDsCheck, ComCheckConfigData, OBSERVER_HINT_MODE_INIT);

// DVR構成情報を取得した後、チェック処理を行う
function ComCheckConfigData(notificationType, dataSet, dat) {
	if (notificationType == "onPostLoad") {
		var tmpData = dataSet.getData();

		// DVR構成情報に、対象機器NetMIDをチェックする
		// チェックOK時、サブミットする
		for (var i=0;i<tmpData.length;i++) {
			// 選択した機器を探索する
			if( tmpData[i]["@DeviceNo"] != "" && tmpData[i]["@DeviceNo"] == selectNetMid )
			{
				callBackCheck(param1, param2);
				return;
			}
		}

		// チェックNG時、[設定できませんでした。]
		var PopUp = new actionPop("設定できませんでした。",1,"戻る","");
		PopUp.show(FocusObj);
	}
}

