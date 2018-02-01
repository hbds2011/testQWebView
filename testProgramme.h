#include <QtTest/QtTest>

class QWebView;
class QWebPage;
class QWebFrame;
#ifndef TESTQTWEBVIEW_H
#define TESTQTWEBVIEW_H
class TestQtWebViewExec;
class TestWidget;

// TestQtWebView
class TestQtWebView: public QObject
{
    Q_OBJECT

public:
    explicit TestQtWebView(TestQtWebViewExec *testWebViewExec) : testWebViewExec(testWebViewExec){}

private slots:
    void testWebViewPage();

private:
    TestQtWebViewExec *testWebViewExec;
};

// TestQtWebViewExec
class TestQtWebViewExec: public QObject
{
    Q_OBJECT

public:
    explicit TestQtWebViewExec();
    void testWebViewPageExec();

public slots:
    void confirmTestResult(QVariant result);

private slots:
    void onLoadFinished();
    void addTestWebViewExec();

private:
    bool isTestComplete;
    TestWidget *testWidget;

    void keyUp();
    void keyDown();
    void keyLeft();
    void keyRight();
    void keyEnter();

    void testCase1();
    void testCase2();

    void printSizeOfWidget(QWidget *qWidget, const QString &widgetName);
    void readTestXmlResult(QXmlStreamReader &xmlStreamReader);
};

#endif // TESTQTWEBVIEW_H
