#-------------------------------------------------
#
# Project created by QtCreator 2017-10-15T06:20:35
#
#-------------------------------------------------

QT      +=  webkit network testlib xml
HEADERS =   \
    testWidget.h \
    testProgramme.h
SOURCES =   main.cpp \
    testWidget.cpp \
    testProgramme.cpp
RESOURCES = jquery.qrc \
    htmljscssresource.qrc

# install
target.path = /qt/qt-test/testQWebView/testQWebView
sources.files = $$SOURCES $$HEADERS $$RESOURCES *.pro
sources.path = /qt/qt-test/testQWebView/testQWebView
INSTALLS += target sources

symbian {
    TARGET.UID3 = 0xA000CF6C
    include($$QT_SOURCE_TREE/examples/symbianpkgrules.pri)
}

DISTFILES += \
    Makefile \
    htmlPage/DVR-05-04-00_caoty/DVR-05-04-00.js \
    htmlPage/DVR-05-04-00_caoty/DVR-05-04-00-VGA-BIG.css \
    htmlPage/DVR-05-04-00_caoty/DVR-05-04-00-VGA.css \
    htmlPage/DVR-05-04-00_caoty/DVR-05-04-00.css \
    htmlPage/DVR-05-04-00_caoty/DVR-05-04-00.html
