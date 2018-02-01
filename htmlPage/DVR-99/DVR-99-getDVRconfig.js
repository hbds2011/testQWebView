var DVRconfig = new Spry.Data.XMLDataSet(null, "Result");

function getDVRconfig()
{
	//まずはNVR設定値取得のCGIを呼び出す
	DVRconfig.setURL(gUrl + "/cgi-bin/DVR-99-getDVRconfig.cgi");
	
	//本HTMLが呼ばれたときのパラメータによって処理を変える
	var param = Spry.Utils.getLocationParamsAsObject();
	var request = param.order;
	switch (request)
	{
		case "HDDope":
			addSpryDataSetObserver(DVRconfig, getHddOpe);
			break;
		default:
			consoleLogOutput(1,"DVR-99-getDVRconfig.js",arguments.callee.name,"パラメータ取得失敗");
			return;
			break;
	}
	
	DVRconfig.loadData();
	
}

function getHddOpe(notificationType, dataSet, dat)
{
	if(notificationType == "onPostLoad")
	{
		consoleLogOutput(5,"DVR-99-getDVRconfig.js",arguments.callee.name,"CGI処理完了");
		var result = dataSet.getData();
		var addParam = new Array(new Array("OpeKindDvr",result[0]["OpeKindDvr"]),new Array("OpeKindExt",result[0]["OpeKindExt"]),new Array("End",true));
		localStorage.tetete = "aaa";
		backServerForAddParam(1,null,addParam);
	}
}

