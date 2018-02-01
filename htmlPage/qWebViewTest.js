function testWebView() {
    alert("testWebView");
    //sendAjaxReq();
}
document.getElementById("setting").click();

function sendAjaxReq() {
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var resultVal=xmlhttp.responseText;
            testWebViewExec.confirmTestResult(resultVal);
        }else if (xmlhttp.readyState==4) {
            //var resultVal = "Ajax Request Failed ! XmlHttpReq readyState: " + xmlhttp.readyState + "; XmlHttpReq status: " + xmlhttp.status;
            var resultVal = makeResult();
            testWebViewExec.confirmTestResult(resultVal);
        }
    }
    xmlhttp.open("GET","qrc:///htmlPage/form.html",true);
    xmlhttp.send();
}

function makeResult() {
    var result = "";
    result += "<?xml version=\"1.0\" encoding=\"euc-jp\"?>\n";
    result += "<bookindex>\n"
    result += "  <entry term=\"sidebearings\">\n"
    result += "    <page>11</page>\n"
    result += "  </entry>\n"
    result += "  <entry term=\"subtraction\">\n"
    result += "    <entry term=\"of pictures\">\n"
    result += "      <page>22</page>\n"
    result += "    </entry>\n"
    result += "    <entry term=\"of vectors\">\n"
    result += "      <page>33</page>\n"
    result += "    </entry>\n"
    result += "  </entry>\n"
    result += "</bookindex>\n"

    return result;
}
