/****************************************************************************
**
** Copyright (C) 2010 Nokia Corporation and/or its subsidiary(-ies).
** All rights reserved.
** Contact: Nokia Corporation (qt-info@nokia.com)
**
** This file is part of the examples of the Qt Toolkit.
**
** $QT_BEGIN_LICENSE:BSD$
** You may use this file under the terms of the BSD license as follows:
**
** "Redistribution and use in source and binary forms, with or without
** modification, are permitted provided that the following conditions are
** met:
**   * Redistributions of source code must retain the above copyright
**     notice, this list of conditions and the following disclaimer.
**   * Redistributions in binary form must reproduce the above copyright
**     notice, this list of conditions and the following disclaimer in
**     the documentation and/or other materials provided with the
**     distribution.
**   * Neither the name of Nokia Corporation and its Subsidiary(-ies) nor
**     the names of its contributors may be used to endorse or promote
**     products derived from this software without specific prior written
**     permission.
**
** THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
** "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
** LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
** A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
** OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
** SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
** LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
** DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
** THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
** (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
** OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE."
** $QT_END_LICENSE$
**
****************************************************************************/

#include <QtGui>
#include <QWebView>
#include <QNetworkAccessManager>

QT_BEGIN_NAMESPACE
class TestWebView;
QT_END_NAMESPACE

class TestWidget : public QWidget
{
    Q_OBJECT
public:
    explicit TestWidget();
    void loadUrl( const QString& url );
    TestWebView* getTestWebView() { return testWebView;}

private:
    // Webkit
    TestWebView* testWebView;
};

class TestWebView : public QWebView
{
    Q_OBJECT

public:
    explicit TestWebView(QWidget *parent);
    QString qWebViewJsStr;

//only for test
public slots:
    // JavaScript呼び出しI/F定義
    // キーリピートモードを特殊なモードへ移行
    void EnterRepeatMode(){qDebug() << "EnterRepeatMode complete";}
    // キーリピートモードを通常モードへ移行
    void LeaveRepeatMode(){qDebug() << "LeaveRepeatMode complete";}
    // コンソール(標準出力)へ文字列を出力する。一定数は内部で保持しておいて、p_stat disp 実行時に出力させる。
    void debugConsoleOutput(const QString &){}
    // デバッグレベルを指定してコンソールデバッグログを出力する。level : 0=Error, 1=Warn, 2=Trace, 3=Detail
    void debugLevelOutput(int level, const QString &){qDebug() << "debugLevelOutput complete";}
    // ２ボタンダイアログを表示する
    void ShowBackHomeDlg(const QString &){qDebug() << "ShowBackHomeDlg complete";}
    // ２ボタンダイアログを消す
    void CloseBackHomeDlg(){qDebug() << "CloseBackHomeDlg complete";}
    // 詳細記録設定用 確認ボタンダイアログを表示する
    void ShowDetailRecOkDlg(const QString &str){qDebug() << "ShowDetailRecOkDlg complete";}
    // 詳細記録設定用 文字列が多い時用の確認ボタンダイアログを表示する
    void ShowDetailRecOkBigDlg(const QString &str){qDebug() << "ShowDetailRecOkBigDlg complete";}
    // 詳細記録設定用 戻るボタンダイアログを表示する
    void ShowDetailRecBackDlg(const QString &str){qDebug() << "ShowDetailRecBackDlg complete";}
    // 詳細記録設定用 文字列が多い時用のダイアログを表示する
    void ShowDetailRecBackBigDlg(const QString &str){qDebug() << "ShowDetailRecBackBigDlg complete";}
    // 詳細記録設定用 確認・戻るボタンダイアログを閉じる
    void CloseDetailRecBackDlg(unsigned long dialogId){qDebug() << "CloseDetailRecBackDlg complete";}
    // 画面の描画を一時的に禁止してマーキーを表示する
    void ShowMarqueeDlg(const QString &){qDebug() << "ShowMarqueeDlg complete";}
    // 画面の描画を許可してマーキーを閉じる
    void CloseMarqueeDlg(){qDebug() << "CloseMarqueeDlg complete";}
    // トップメニューに遷移処理
    void GoTop(const QString &str){qDebug() << "GoTop complete";}
    // 画面の描画を一時的に禁止する
    void DisableUpdateDrawing(const QString &){qDebug() << "DisableUpdateDrawing complete";}
    // 画面の描画を許可する
    void EnableUpdateDrawing(){qDebug() << "EnableUpdateDrawing complete";}
    // 入力イベントを無効にする
    void DisableInputEvent(){qDebug() << "DisableInputEvent complete";}
    // 入力イベントを有効にする
    void EnableInputEvent(){qDebug() << "EnableInputEvent complete";}
    // 入力イベントのコントロールが無効にする
    void DisableInputCtrl(){qDebug() << "DisableInputCtrl complete";}
    // 入力イベントのコントロールが有効にする
    void EnableInputCtrl(){qDebug() << "EnableInputCtrl complete";}
    // 画面の描画を一時的に禁止する(ダイアログ無し版)
    void DisableUpdateDrawing_woDialog(){qDebug() << "DisableUpdateDrawing_woDialog complete";}
    // 画面の描画を許可する(ダイアログ無し版)
    void EnableUpdateDrawing_woDialog(){qDebug() << "EnableUpdateDrawing_woDialog complete";}
    // 処理中断ダイアログを閉じてWebViewにキーイベントを発行する
    void closeBackHomeDialog(int keycode){qDebug() << "closeBackHomeDialog complete";}
    // WebViewにキーイベントを発行する
    void pressVirtualKey(int keycode){qDebug() << "pressVirtualKey complete";}
    // トップメニューに遷移する (時刻調時の画面遷移不可の対応)
    void SetUrl(const QString &isTop, const QString &str){qDebug() << "SetUrl complete";}
    // 灰色オーバレイの表示位置を設定する
    void setGrayOverlayBounds(){qDebug() << "setGrayOverlayBounds complete";}
    // 灰色オーバレイの設定・解除を行う
    void setGrayOverlay(bool enable){qDebug() << "setGrayOverlay complete";}
    // 日時表示の表示・非表示を行う
    void setVisibleSystemTime(bool enable){qDebug() << "setVisibleSystemTime complete";}



    // 異常履歴画面用 文字列多い用の大きいダイアログを表示する
    void ShowHistorySearchDlg(const QString &str){qDebug() << "ShowHistorySearchDlg complete";}
    // 異常履歴画面用 文字列多い用の大きいダイアログを閉じる
    void CloseHistorySearchDlg(){qDebug() << "CloseHistorySearchDlg complete";}

    // カメラ設定中のPTZカメラ設定画面で設定変更（パン・チルト・ズーム・フォーカス）の送信処理
    QString SendPTZSettingInCamSet(const QString &ButtonIDStr, const QString &cameraIdStr, const QString &speedStr){return "";}
    // カメラ設定中のPTZカメラ設定画面で設定変更（プリセットポジション）の送信処理
    QString SendPTZPosSettingInCamSet(const QString &ButtonIDStr, const QString &cameraIdStr, const QString &speedStr){return "";}

    // マウス操作のPTZプリセットポジション設定画面のクリック対象の設定処理
    void SetPtzSetButtonId(const QString &ButtonIDStr){}

    // G2CAMのピント調整画面でAF操作の送信処理
    QString SendAfOpeInPint(const QString &ActionStr, const QString &cameraIdStr){return "";}

    // 遷移元パス取得
    QString GetOrgPath(){qDebug() << "GetOrgPath complete";return "";}
    // 現在のパス取得
    void SetCurrentPath( const QString &str ){qDebug() << "SetCurrentPath complete";}

    // #21231対応で、コンテンツへ送信停止関数を追加
    void stopSendKey(){qDebug() << "stopSendKey complete";}

    // #21231対応で、コンテンツへ送信開始関数を追加
    void startSendKey(){qDebug() << "startSendKey complete";}

    // ポップアップを消去する(検索画面系場合、特別処理)
    void DeletePopUpDialog(){qDebug() << "DeletePopUpDialog complete";}

    // 画面の描画を一時的に禁止する(全局)
    void disableGlobalDispDrawing(){qDebug() << "disableGlobalDispDrawing complete";}

    // #24960の対応で、特別の画面のポップアップに対して、切替停止フラグを設定する
    void SetStopDigAnaChg( const QString &stopFlag ){qDebug() << "SetStopDigAnaChg complete";}

    // #24880の対応で、システム時刻の変更時、JSのsetTimeoutに影響があるため、
    // WebView側JS用タイマー使用関数を追加
    void SetJSTimer( const QString &jsInterval, const QString &jsFuncName){qDebug() << "SetJSTimer complete";}

    // #25150の対応で、時間検索画面再生開始失敗時、すぐに画面制御フラグ設定のため、
    // 時間検索画面再生開始フラグの設定関数を追加
    void SetStartPlayFlag( const QString &startFlag ){qDebug() << "SetStartPlayFlag complete";}

    // #25397対応で、デジアナ切替時、JSからlocalStorageの値を一時保存する
    void GetLocalStorageValFromJS( const QString &itemKey, const QString &itemVal ){qDebug() << "GetLocalStorageValFromJS complete";}

    // #26978対応で、モニター設定変更開始する時、モニター変更中フラグを「D_COM_TRUE:1」に変更する。設定対象機器通信IDを保存する
    void SetMonitorChangeBegin(){qDebug() << "SetMonitorChangeBegin complete";}

    // #26978対応で、モニター設定変更完了する時、モニター変更中フラグを「D_COM_FALSE:0」に変更する。設定対象機器通信IDをクリアする
    void SetMonitorChangeEnd(){qDebug() << "SetMonitorChangeEnd complete";}

protected slots:
    void finishLoading(bool);
    void addJsObject(QWebFrame *webFrame);
    void addJsObject();
    void addJsObjectWhenCleared();

    void viewSource();
    void slotSourceDownloaded();

private:
};

class MyQNetworkAccessManager : public QNetworkAccessManager
{
    Q_OBJECT

protected:
    virtual QNetworkReply * createRequest(Operation op, const QNetworkRequest & req, QIODevice * outgoingData = 0);

public slots:
    void displayResponse();

private:
    QNetworkReply *reply;
};
