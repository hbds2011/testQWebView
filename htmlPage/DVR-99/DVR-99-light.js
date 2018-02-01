/*-------------------------------------------
	2012.09.07 Yabuta
	メインメニュー作成専用Javascript
	必要最低限の処理のみ
	その他の処理はDVR-99-menu.jsで定義
-------------------------------------------*/
var focusID			= null;				//TOPメニューではフォーカスは変数で管理する

//----------------------------------------------------------------------------------------------------------------//
//関数名：main
//引数：無
//戻値：無
//main関数。htmlロード時にコールされる
//----------------------------------------------------------------------------------------------------------------//
function main()
{
	try
	{
		//screenflagの取得(spryのjsをロードしていないため、locationを文字列分解)
		var sflagSource = top.location.href.split("screenFlag=");
		var sflag = sflagSource[1].substring(4,5);
		var device = sflagSource[1].substring(0,1);
		//pageIDの取得(取得できればpageIDmatchに-1以外が返る)
		var pageIDmatch = top.location.href.search("PAGEID=");
		//画面サイズに合わせてスタイルを変更する
		var CSS_FILE1;
		DispWebView.debugConsoleOutput("★★★★0" + localStorage.play + localStorage.ajNOW + localStorage.pageId + pageIDmatch);
		switch(sflag)
		{
			case "0"://NTSC
				
				//スタイルシートの読込
				CSS_FILE1 = document.createElement("link");
				CSS_FILE1.href = "../DVR-99/DVR-99-00-00-VGA.css";
				CSS_FILE1.rel = "stylesheet";
				CSS_FILE1.type = "text/css";
				document.getElementsByTagName("head")[0].appendChild(CSS_FILE1);

				//縮小をかける
				document.getElementById("DVR-mainMenu-00-img").src = "//127.0.0.1/images/DVR-99-00-00-01-02_size23.png";
				document.getElementById("DVR-mainMenu-11-img").src = "//127.0.0.1/images/DVR-99-00-00-02-02_size23.png";
				document.getElementById("DVR-mainMenu-29-img").src = "//127.0.0.1/images/DVR-99-00-00-03-02_size23.png";
				document.getElementById("DVR-mainMenu-36-img").src = "//127.0.0.1/images/DVR-99-00-00-04-02_size23.png";
				document.getElementById("DVR-mainMenu-52").style.backgroundImage="url(//127.0.0.1/images/DVR-99-backbutton_size22.png)";
				top.document.body.style.zoom = localStorage.zoomPercent;
				top.menu.document.body.style.zoom = localStorage.zoomPercent;
				top.rightpage.document.body.style.zoom = localStorage.zoomPercent;

				//フレーム枠の設定
				if((!localStorage.play) && (localStorage.ajNOW != "AutoJump(ToLive)") && (!localStorage.pageId) && (pageIDmatch == -1))
				{
					DispWebView.debugConsoleOutput("★★★★1" + localStorage.play + localStorage.ajNOW + localStorage.pageId + pageIDmatch);
					top.document.getElementById("mainFrame").cols = "180,*";
				}
				break;
				
			case "1"://XGA
				
				//スタイルシートの読込
				CSS_FILE1 = document.createElement("link");
				CSS_FILE1.href = "../DVR-99/DVR-99-00-00.css";
				CSS_FILE1.rel = "stylesheet";
				CSS_FILE1.type = "text/css";
				document.getElementsByTagName("head")[0].appendChild(CSS_FILE1);

				//フレーム枠の設定
				if((!localStorage.play) && (localStorage.ajNOW != "AutoJump(ToLive)") && (!localStorage.pageId) && (pageIDmatch == -1))
				{
					DispWebView.debugConsoleOutput("★★★★2" + localStorage.play + localStorage.ajNOW + localStorage.pageId + pageIDmatch);
					top.document.getElementById("mainFrame").cols = "220,*";
				}
				break;

			case "2"://FHD

				//スタイルシートの読込
				CSS_FILE1 = document.createElement("link");
				CSS_FILE1.href = "../DVR-99/DVR-99-00-00-BIG.css";
				CSS_FILE1.rel = "stylesheet";
				CSS_FILE1.type = "text/css";
				document.getElementsByTagName("head")[0].appendChild(CSS_FILE1);

				//フレーム枠の設定
				if((!localStorage.play) && (localStorage.ajNOW != "AutoJump(ToLive)") && (!localStorage.pageId) && (pageIDmatch == -1))
				{
					DispWebView.debugConsoleOutput("★★★★3" + localStorage.play + localStorage.ajNOW + localStorage.pageId + pageIDmatch);
					top.document.getElementById("mainFrame").cols = "220,*";
				}
				break;

			case "3"://デカ

				//スタイルシートの読込
				CSS_FILE1 = document.createElement("link");
				CSS_FILE1.href = "../DVR-99/DVR-99-00-00-VGA-BIG.css";
				CSS_FILE1.rel = "stylesheet";
				CSS_FILE1.type = "text/css";
				document.getElementsByTagName("head")[0].appendChild(CSS_FILE1);

				//縮小をかける
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

				//フレーム枠の設定
				if((!localStorage.play) && (localStorage.ajNOW != "AutoJump(ToLive)") && (!localStorage.pageId) && (pageIDmatch == -1))
				{
					DispWebView.debugConsoleOutput("★★★★4" + localStorage.play + localStorage.ajNOW + localStorage.pageId + pageIDmatch);
					top.document.getElementById("mainFrame").cols = "280,*";
				}
				break;
			default:
				break;
		}

		//検索にフォーカスを当てる
		document.getElementById("DVR-mainMenu-00").style.backgroundColor = "#55A5CD";

		focusID = "検索";
		//左側メニューにフォーカスを当てる
		top.menu.focus();

		//画面描画を再開する
		//操作メニュー→再生画面への戻り時は描画再開させない
		if((!localStorage.playFlag) && (!localStorage.ajNOW) && (!localStorage.pageId) && (pageIDmatch == -1))
		{
			DispWebView.EnableUpdateDrawing_woDialog();
		}
		var JS_FILE1 = document.createElement("script");
		JS_FILE1.type = "text/javascript";
		JS_FILE1.src = "../SpryAssets/SpryUtils.js";
		document.body.appendChild(JS_FILE1);
		
		//前のファイルのロードが完了したら次のファイルを読む
		JS_FILE1.onload = function()
		{
			var JS_FILE2 = document.createElement("script");
			JS_FILE2.type = "text/javascript";
			JS_FILE2.src = "../SpryAssets/xpath.js";
			document.body.appendChild(JS_FILE2);
			
			//前のファイルのロードが完了したら次のファイルを読む
			JS_FILE2.onload = function()
			{
				var JS_FILE3 = document.createElement("script");
				JS_FILE3.type = "text/javascript";
				JS_FILE3.src = "../SpryAssets/SpryData.js";
				document.body.appendChild(JS_FILE3);

				//前のファイルのロードが完了したら次のファイルを読む
				JS_FILE3.onload = function()
				{
					//この時点でCGIを呼ぶことは可能なので、ライブ画面で予約コピーの設定値が取れていないことがあればCGIを呼んで設定値を取得する
					if(!localStorage.yoyakuCopy)
					{
						var reserveCopyObj = new Spry.Data.XMLDataSet("/cgi-bin/DVR-99-00-00.cgi?WithoutRefleshMemory=1", "Results");
						reserveCopyObj.addObserver(afterCgi);
						reserveCopyObj.loadData();
					}
					var JS_FILE4 = document.createElement("script");
					JS_FILE4.type = "text/javascript";
					JS_FILE4.src = "../SpryAssets/SpryNestedXMLDataSet.js";
					document.body.appendChild(JS_FILE4);

					//前のファイルのロードが完了したら次のファイルを読む
					JS_FILE4.onload = function()
					{
						var JS_FILE5 = document.createElement("script");
						JS_FILE5.type = "text/javascript";
						JS_FILE5.src = "../SpryAssets/SpryURLUtils.js";
						document.body.appendChild(JS_FILE5);

						//前のファイルのロードが完了したら次のファイルを読む
						JS_FILE5.onload = function()
						{
							var JS_FILE6 = document.createElement("script");
							JS_FILE6.type = "text/javascript";
							JS_FILE6.src = "../DVR-99/DVR-99.js";
							document.body.appendChild(JS_FILE6);

							//前のファイルのロードが完了したら次のファイルを読む
							JS_FILE6.onload = function()
							{
								var JS_FILE7 = document.createElement("script");
								JS_FILE7.type = "text/javascript";
								JS_FILE7.src = "DVR-01-00-00.js";
								document.body.appendChild(JS_FILE7);

								//前のファイルのロードが完了したら次のファイルを読む
								JS_FILE7.onload = function()
								{
									DispWebViewLogStart();
									//★★★★★★オートページジャンプ対応★★★★★★
									pageId2Storage();
									if(localStorage.superAutoJump)
									{
										return;
									}
									//★★★★★★オートページジャンプ対応★★★★★★

									var JS_FILE8 = document.createElement("script");
									JS_FILE8.type = "text/javascript";
									JS_FILE8.src = "../DVR-99/DVR-99-menu.js";
									document.head.appendChild(JS_FILE8);

									//前のファイルのロードが完了したら次のファイルを読む
									JS_FILE8.onload = function()
									{
										//★★★★★★オートページジャンプ対応★★★★★★
										dispShowPage();
										//★★★★★★オートページジャンプ対応★★★★★★

										var CSS_FILE2 = document.createElement("link");
										CSS_FILE2.href = "../DVR-99/DVR-99-99-02.css";
										CSS_FILE2.rel = "stylesheet";
										CSS_FILE2.type = "text/css";
										document.body.appendChild(CSS_FILE2);

										var CSS_FILE3;
										switch(sflag)
										{
											case "0"://NTSC
												CSS_FILE3 = document.createElement("link");
												CSS_FILE3.href = "../DVR-99/DVR-99-02-01-VGA.css";
												CSS_FILE3.rel = "stylesheet";
												CSS_FILE3.type = "text/css";
												document.body.appendChild(CSS_FILE3);
												break;
											case "1"://XGA
												CSS_FILE3 = document.createElement("link");
												CSS_FILE3.href = "../DVR-99/DVR-99-02-01.css";
												CSS_FILE3.rel = "stylesheet";
												CSS_FILE3.type = "text/css";
												document.body.appendChild(CSS_FILE3);
												break;
											case "2"://FHD
												CSS_FILE3 = document.createElement("link");
												CSS_FILE3.href = "../DVR-99/DVR-99-02-01-BIG.css";
												CSS_FILE3.rel = "stylesheet";
												CSS_FILE3.type = "text/css";
												document.body.appendChild(CSS_FILE3);
												break;
											case "3"://デカ
												CSS_FILE3 = document.createElement("link");
												CSS_FILE3.href = "../DVR-99/DVR-99-02-01-VGA-BIG.css";
												CSS_FILE3.rel = "stylesheet";
												CSS_FILE3.type = "text/css";
												document.body.appendChild(CSS_FILE3);
												break;
											default:
												break;
										}
									};
								};
							};
						};
					};
				};
			};
		};
	}
	catch(error)
	{
		//consoleLogOutput(1,THISFILENAME,arguments.callee.name,error.description);
	}
}

function dispDrawStopW_lapper_light()
{
	try
	{
		//再生画面(DVR-05-07-00)から操作メニューを表示し、戻るボタンが押されたときの対応
		//メニュー画面が一瞬ちらつくのを防止するためonloadのタイミングでメニュー幅を0にする
		//(この後の処理で再生画面からのオートジャンプ以外はメニューに幅を持たせている)
		top.document.getElementById("mainFrame").cols="0,*";

		DispWebView.DisableUpdateDrawing_woDialog();

	}
	catch(error)
	{
		alert("ERROR#8983");
	}
}

function afterCgi(notificationType, dataSet, dat)
{
	if(notificationType == "onPostLoad")
	{
		var row = dataSet.getData();
		localStorage.NVRIP = row[0]["IP"];
		localStorage.yoyakuCopy = row[0]["Menu/@ScaduleCopy"];
		localStorage.arcCenter = row[0]["Menu/@Archive"];
		//(refs #11151)しばらくお待ちください画面の表示方法を変更する
		localStorage.shibaomahidflg = row[0]["Menu/@shibaomahidflg"];
	}
}
