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
#include <QtTest/QtTest>
#include <QtGui>
#include <QtWebKit>
#include "testWidget.h"

TestWidget::TestWidget() : QWidget(NULL)
{
    this->setGeometry(0,0,1000,1200);
    this->show();
    testWebView = new TestWebView(this);
}

void TestWidget::loadUrl( const QString& url )
{
    testWebView->load(url);
}

TestWebView::TestWebView(QWidget *parent) : QWebView(parent)
{
    this->setGeometry(0,0,1000,1200);
    //load js file for test
    QFile file;
    file.setFileName(":/htmlPage/firebug-lite.js");
    file.open(QIODevice::ReadOnly);
    qWebViewJsStr = file.readAll();
    file.close();

    QNetworkProxyFactory::setUseSystemConfiguration(true);

    //enable localStorage
    this->page()->settings()->setAttribute(QWebSettings::LocalStorageEnabled, true);
    //set link of page
    this->page()->setLinkDelegationPolicy(QWebPage::DelegateAllLinks);
    //get ajax request file directly
    MyQNetworkAccessManager *networkManager = new MyQNetworkAccessManager();
    this->page()->setNetworkAccessManager(networkManager);
    //initialize the load of page
    connect(this, SIGNAL(loadFinished(bool)), SLOT(finishLoading(bool)));
    // JSObjectインストール用
    connect(this->page(), SIGNAL(frameCreated( QWebFrame * )), SLOT(addJsObject( QWebFrame * )));
    connect(this->page()->mainFrame(), SIGNAL(javaScriptWindowObjectCleared()), this, SLOT(addJsObject()));
}

void TestWebView::finishLoading(bool b)
{
    //QTest::qWait(10000);
    //this->page()->mainFrame()->evaluateJavaScript(qWebViewJsStr);
    qDebug() << "finishLoading complete";
}
void TestWebView::addJsObject(QWebFrame *webFrame)
{
    this->page()->mainFrame()->addToJavaScriptWindowObject("DispWebView", this);
    if ( webFrame == NULL )
    {
        return;
    }
    // オブジェクトのインストール
    webFrame->addToJavaScriptWindowObject("DispWebView",this);
    this->connect(webFrame, SIGNAL(javaScriptWindowObjectCleared()), SLOT(addJsObjectWhenCleared()));

    qDebug() << "addJsObject1 complete";
    return;
}
void TestWebView::addJsObject()
{
    this->page()->mainFrame()->addToJavaScriptWindowObject("DispWebView", this);
    qDebug() << "addJsObject2 complete";
    return;
}
void TestWebView::addJsObjectWhenCleared()
{
    // 全てのフレームに対してオブジェクトを再インストールする
    QWebFrame *mainframe = this->page()->mainFrame();
    if ( mainframe == NULL )
    {
        return;
    }
    mainframe->addToJavaScriptWindowObject("DispWebView",this);
    if ( mainframe->childFrames().count() == 0 )
    {
        return;
    }
    foreach ( QWebFrame *cf, mainframe->childFrames() )
    {
        cf->addToJavaScriptWindowObject("DispWebView",this);
    }
    qDebug() << "addJsObjectWhenCleared complete";
    return;
}
void TestWebView::viewSource()
{
    QNetworkAccessManager* accessManager = this->page()->networkAccessManager();
    QNetworkRequest request(this->url());
    QNetworkReply* reply = accessManager->get(request);
    connect(reply, SIGNAL(finished()), this, SLOT(slotSourceDownloaded()));
}

void TestWebView::slotSourceDownloaded()
{
    QNetworkReply* reply = qobject_cast<QNetworkReply*>(const_cast<QObject*>(sender()));
    QTextEdit* textEdit = new QTextEdit(NULL);
    textEdit->setAttribute(Qt::WA_DeleteOnClose);
    textEdit->show();
    textEdit->setPlainText(reply->readAll());
    reply->deleteLater();
}

QNetworkReply * MyQNetworkAccessManager::createRequest(Operation op, const QNetworkRequest & req, QIODevice * outgoingData)
{
    QUrl url = req.url();
    QString path = url.path();

    reply = QNetworkAccessManager::createRequest(op, req, outgoingData);
    if (path.endsWith("cgi")) {
        //reply has a problem of asyn request
        qDebug() << "Request Text: " <<req.url().toString();
        connect(reply, SIGNAL(readyRead()), SLOT(displayResponse()));
    }
    return reply;
}

void MyQNetworkAccessManager::displayResponse()
{
    if (reply != NULL) {
        QString response = QString(reply->peek(10000000));
        qDebug() << "Response Text: " <<response;
    }
}
