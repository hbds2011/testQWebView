/**
* author: Liang.Yong
*
* purpose:
* 1. clear each elements's tabIndex
* 2. re-mapping the element's tabIndex thru user definition
* 3. once end-user enter the key "Enter" on the FIELDSET element, re-mapping each sub element's tabIndex of this FIELDSET
* 4. once end-user enter the key "Esc" on the FIELDSET element, restore each element's tabIndex to user definition
*
* usage:
* 0. you need include stylesheet file DVR-99-99-01.css
* 1. you need declare an array, and define each BLOCK element's tabIndex as below format
* var defaultFocus = new Array(
*	"element 1 id" ' tabIndex 1
*	,"element 2 id"' tabIndex 2
*	...
*	);
* 2. create an instance of class FocusNavigator, and pass the array to it construct function
* 3. when your document is ready, invoke the method init() of the instance
*/

var Class = {
  create: function() {
    return function() {
      this.initialize.apply(this, arguments);
    };
  }
};

var FocusNavigator;
FocusNavigator = Class.create();
if (!FocusNavigator.Node) FocusNavigator.Node = {};
FocusNavigator.Node.ELEMENT_NODE = 1;

FocusNavigator.prototype = {
	initialize: function() {
		this.focusInfo = new Array();
		this.hasInitBodyFunction = false;

		this.defaultFocus = null; // default tab index
		this.defaultFocusObject = null;//default object that should obtain focus
		this.focusIndex = 1; //current tab index
		this.focusObject = null; //object to bo obtain focus
		this.catchedFocus = false;//whether the object catched an enter key?
		this.catchedFocusObject = null; //object that catched enter key
		this.focusContainer = document; //current container that should catch focus

},
	pushFocusInfo: function(defaultFocus, parentContainer, saveFlag, setFocusFlag) {
		this.clearFocusIndex(this.focusContainer, saveFlag);

		//save old values
		var info = [this.defaultFocus, this.defaultFocusObject, this.focusIndex, this.focusObject, this.catchedFocus, this.catchedFocusObject, this.focusContainer];
		this.focusInfo.push(info);

		this.defaultFocus = defaultFocus; // default tab index
		this.defaultFocusObject = null;//default object that should obtain focus
		this.focusIndex = 1; //current tab index
		this.focusObject = null; //object to bo obtain focus
		this.catchedFocus = false;//whether the object catched an enter key?
		this.catchedFocusObject = null; //object that catched enter key
		this.focusContainer = parentContainer; //

		this.init(setFocusFlag);

	},
	popFocusInfoOnly: function(restoreFlag) {
		
		//iDebug('step in popFocusInfoOnly');
		
		this.clearFocusIndex(this.focusContainer);
		
		//restore old values
		var info = this.focusInfo.pop();

		if(info){
			this.defaultFocus = info[0]; // default tab index
			this.defaultFocusObject = info[1];//default object that should obtain focus
			this.focusIndex = info[2]; //current tab index
			this.focusObject = info[3]; //object to bo obtain focus
			this.catchedFocus = info[4];//whether the object catched an enter key?
			this.catchedFocusObject = info[5]; //object that catched enter key
			this.focusContainer = info[6]; //object that catched enter key
		}
		
		if(restoreFlag){
			try{
				
				//var timestamp = Date.parse(new Date());		
				//iDebug('restoreFlag proc start time :'+timestamp)	
		
				if(!whiteListOfAccessable){
					//iDebug('bulidWhiteList ! ')	;		
					bulidWhiteList();
//					for (i in whiteListOfAccessable){
//						iDebug('element is : '+whiteListOfAccessable[i])	;					
//					}
				}
				
				this.clearAllFocusIndex(this.focusContainer);			
				
				//iDebug('the nodeTabindexSaver.length='+nodeTabindexSaver.length);
				for(i in nodeTabindexSaver){
					//iDebug(''+this.nodeTabindexSaver[i])
					var valz = nodeTabindexSaver[i].split('|');
					//iDebug(' id='+valz[0]+' tabindex='+valz[1])
					var obj = document.getElementById(valz[0]);
					if(valz[0].indexOf("temp_save_id_")!=-1){
						obj.removeAttribute("id");
					} else {
						obj.setAttribute("tabindex", valz[1]);
					}
				}		
				nodeTabindexSaver =  new Array;				

				//var timestamp = Date.parse(new Date());		
				//iDebug('restoreFlag proc end time :'+timestamp)					

			}catch(e){
				iDebug('exception occur in restoreFlag proc : ' + e);	
			}
		}
		
		if (this.catchedFocus == true) { //an enter key have been pressed
			this.catchedFocus = false;
			this.setFocusIndex(this.focusContainer);//set sub-elements focus index
		} else { //never been pressed
			this.attemptSetDefaultFocusIndex();
		}
		
		
	},
	popFocusInfo: function(obj,restoreFlag) {

		//popup old focus info, and set focus to obj
		this.popFocusInfoOnly(restoreFlag);
		if(obj != null) {
			this.focusObject = obj;
		}
		var varThis = this;
		setTimeout(function() {varThis.setFirstFocusAsync();}, 300);

	},
	clearFocusIndex: function (elem, saveFlag) {
		//iDebug('setp in clearFocusIndex, elem='+elem+' saveFlag='+saveFlag);
		//var timestamp = Date.parse(new Date());		
		//iDebug('clearFocusIndex start time :'+timestamp)		
		var childNodes = elem.childNodes;

		for (var i = 0; i < childNodes.length; i++) {
			if (childNodes[i].nodeType == FocusNavigator.Node.ELEMENT_NODE) {
				if(childNodes[i].getAttribute("tabindex") && saveFlag){
					//iDebug('holder of tabindex, value='+childNodes[i].getAttribute("tabindex")+' id='+childNodes[i].id)
					if(!childNodes[i].id || childNodes[i].id==undefined){
						childNodes[i].id='temp_save_id_'+nodeTabindexSaver.length;
					}
					var savKey = childNodes[i].id;
					var savVal = childNodes[i].getAttribute("tabIndex");
					var savString = savKey+'|'+savVal;
					//iDebug('savKey='+savKey+' savVal='+savVal);
					nodeTabindexSaver.push(savString);

					childNodes[i].setAttribute("tabIndex", -1);
				}
			}
			if(childNodes[i].tagName == "INPUT" && childNodes[i].type == "radio") {
				//▼onfocusに処理を記述しているため、クリア処理をスルーするように修正▼
				switch(childNodes[i].id) {
					case "DVR-04-03-00-01-01-01": // 「記録・再生管理」⇒「未記録監視設定」⇒「無」
					case "DVR-04-03-00-01-01-02": // 「記録・再生管理」⇒「未記録監視設定」⇒「有」
					case "DVR-04-03-00-01-03-01": // 「記録・再生管理」⇒「記録期間制限」⇒「無」
					case "DVR-04-03-00-01-03-02": // 「記録・再生管理」⇒「記録期間制限」⇒「有」
					break;
					
					default:
						childNodes[i].onfocus = function () { this.blur();};
					break;
				}
				//▲onfocusに処理を記述しているため、クリア処理をスルーするように修正▲

				//childNodes[i].onfocus = function () { this.blur();};
			}
			if (childNodes[i].childNodes.length)
				this.clearFocusIndex(childNodes[i],saveFlag);
		}     
		
		//timestamp = Date.parse(new Date());		
		//iDebug('clearFocusIndex end time :'+timestamp)			
	},
	clearAllFocusIndex: function (elem) {
		
		var childNodes = elem.childNodes;
		for (var i = 0; i < childNodes.length; i++) {
			if (childNodes[i].nodeType == FocusNavigator.Node.ELEMENT_NODE) {
				//iDebug('childNodes['+i+'] before ='+childNodes[i].tabIndex);	
				childNodes[i].removeAttribute('tabIndex');	
				//iDebug('1 childNodes['+i+'] after='+childNodes[i].tabIndex);	
				//iDebug(childNodes[i].tagName);
				//iDebug('Next is : '+childNodes[i].nextSibling);
				//iDebug('ID ='+ childNodes[i].id)
				//iDebug(childNodes[i].tagName);
				if(whiteListOfAccessable.indexOf(childNodes[i].id)==-1 && childNodes[i].tagName == "DIV"){
					//iDebug('ID not in white list! die!')
					childNodes[i].onmousedown = function () { 
						//iDebug('justDoNothing!');
						//stopDefaultling(event);
						stopBubbling(event);
					};
				}else{
					//iDebug('ID in white list!')	
					childNodes[i].onmousedown = function () { 
						//iDebug('dontSpread..');
						stopBubbling(event);
					};					
				}
/*				
				if(childNodes[i].tagName!='INPUT'){
					childNodes[i].onclick = function () { 
						iDebug('stopIt!oc');
						stopDefaultling(event);
						stopBubbling(event);
					}					
				}   
				*/
/*				childNodes[i].onclick = function () { 
					iDebug('stopIt!oc1');
					stopDefaultling(event);
					stopBubbling(event);
				} */  
/*				
				childNodes[i].onmousedown = function () { 
					iDebug('stopIt!omd');
					stopDefaultling(event);
					stopBubbling(event);
				}	
				*/			
				
			}
			if (childNodes[i].childNodes.length)
				this.clearAllFocusIndex(childNodes[i]);
		}       
	},	
	// set each sub element's focus index of container elem
	setFocusIndex: function (elem) {
		var childNodes = elem.childNodes;

		for (var i = 0; i < childNodes.length; i++) {
			if (childNodes[i].nodeType == FocusNavigator.Node.ELEMENT_NODE && (childNodes[i].tagName == "INPUT" || childNodes[i].tagName == "SELECT" || childNodes[i].tagName == "BUTTON"  || childNodes[i].tagName == "FIELDSET" )) {
				childNodes[i].setAttribute("tabindex", this.focusIndex++);
			}
			if(childNodes[i].tagName == "INPUT" && childNodes[i].type == "radio") {
				//▼onfocusに処理を記述しているため、クリア処理をスルーするように修正▼
				switch(childNodes[i].id) {
					case "DVR-04-03-00-01-01-01": // 「記録・再生管理」⇒「未記録監視設定」⇒「無」
					case "DVR-04-03-00-01-01-02": // 「記録・再生管理」⇒「未記録監視設定」⇒「有」
					case "DVR-04-03-00-01-03-01": // 「記録・再生管理」⇒「記録期間制限」⇒「無」
					case "DVR-04-03-00-01-03-02": // 「記録・再生管理」⇒「記録期間制限」⇒「有」
					break;
					
					default:
						childNodes[i].onfocus = function () {};
					break;
				}
				//▲onfocusに処理を記述しているため、クリア処理をスルーするように修正▲

				//childNodes[i].onfocus = function () {};
			}
			//else alert(childNodes[i].tagName);
			if (childNodes[i].childNodes.length && childNodes[i].tagName != "FIELDSET")
				this.setFocusIndex(childNodes[i], this.focusIndex);
		}       
	},

	setFirstFocus: function (elem) {
		var childNodes = elem.childNodes;
		for (var i = 0; i < childNodes.length; i++) {
			if (this.foundFirstFocus) {
				break;
			}
			if (childNodes[i].nodeType == FocusNavigator.Node.ELEMENT_NODE && childNodes[i].getAttribute("tabindex") != -1) {
				//childNodes[i].focus();
				if(childNodes[i].disabled == true ) {
					//skip disabled elements
				}  else {
					this.focusObject = childNodes[i]; // object to set focus
					this.foundFirstFocus = true;
					break;
				}
			}
			if (childNodes[i].childNodes.length )
				this.setFirstFocus(childNodes[i]);
		}       
	},
	setFirstFocusIndex: function () {
		if (this.focusObject == null) {
			this.foundFirstFocus = false;
			this.setFirstFocus(this.focusContainer);
			var varThis = this;
			setTimeout(function() {varThis.setFirstFocusAsync();}, 300);
		}
	},
	setDefaultFocusIndex: function () {
		var childNodes;
		for (var i = 0; i < this.defaultFocus.length; i++) {
			document.getElementById(this.defaultFocus[i]).setAttribute("tabindex", i+1);
		}       
	},
	setFirstFocusAsync: function () {
		if(this.focusObject != null) {
			if(ElementIsVisible(this.focusObject) && !this.focusObject.disabled){//updated by hdu, move focus only if obj is visible and enabled
				this.focusObject.focus();
				last_focus = document.activeElement;
			}
			this.focusObject = null;
		}
	},


	catchFocus: function (obj) {
		if (event.keyCode==13) {
			if(obj == document.activeElement) {
				//active and focus element, process
				if (this.catchedFocus == false) {
					this.catchedFocus = true;//enter focus control
					this.catchedFocusObject = obj;// current object to holding focus
					this.focusObject = obj; //object to bo obtain focus

					this.pushFocusInfo(null, obj);
					event.cancelBubble = true; 
					return false;
				}
			}
		} else if(event.keyCode == 27) {// Esc  - exit
		//fsfds
			if(obj == this.focusInfo[this.focusInfo.length -1][5]) {
				//is pushed from fieldset by enter key, so pop it
				this.popFocusInfo(null);
				event.cancelBubble = true; 
				return false;
			} 
		} 
	},
	catchAllFocus: function (elem, varThis) {
		var childNodes = elem.childNodes;
		for (var i = 0; i < childNodes.length; i++) {
			if(childNodes[i].tagName =="FIELDSET") {
				childNodes[i].onkeydown = function () { varThis.catchFocus(this);};
			}
			if (childNodes[i].childNodes.length && childNodes[i].tagName != "FIELDSET")
				this.catchAllFocus(childNodes[i], varThis);
		}       
	},
	attemptSetDefaultFocusIndex: function () {
		if(this.defaultFocus == null) {
			//default index
			this.setFocusIndex(this.focusContainer);//set sub-elements focus index
		} else {
			this.setDefaultFocusIndex();
		}
	},
	init: function (setFocusFlag) {

		this.attemptSetDefaultFocusIndex();

		var varThis = this;
		this.catchAllFocus(this.focusContainer, varThis);

		if(setFocusFlag)
			this.setFirstFocusIndex();

		if(this.hasInitBodyFunction == false) {
			this.hasInitBodyFunction = true;
			document.body.onfocus = function () {varThis.setFirstFocusIndex();};
		}
	}
};

