var StringUtils=function($){
	var isEmpty = function(string){
		if((typeof string) == "undefined"){
			return true;
		}
		
		if(string == "undefined"){
			return true;
		}
		if(string == "null" || string==""){
			if(string!="0"){
				return true;
			}		
		}
		if(string == null){
			return true;
		}
		return false;
	};
	var isEqual = function(string1,string2){
		if(isEmpty(string1) && isEmpty(string2)){
			return true;
		}
		if(string1==string2){
			return true;
		}
		return false;
	};
	var removeArrayIndex = function(array,index){
		if(index>=array.length){
			return array;
		}
		var newArray = new Array();
		for(var i=0;i<array.length;i++){
			if(i!=index){
				newArray.push(array[i]);
			}
		}
		return newArray;
	};
	var jsonToParams = function(json){
		var param = "";
		var i=0;
		 for(var key in json){  
			 var value = json[key];
			 if(!isEmpty(value)){
				// console.log(key,(typeof value));
				 if((typeof value) != "function" && (typeof value) != "object"){
					 if(i>0){
						 param += "&";
					 }
					 param += key+"="+value;
					 i = 1;
					 
				 }
				 
			 }
	 	 } 
		 
		 return param;
	};
	/*文章清除格式*/
	var clearFormat = function(unclean){
		unclean = unclean.replace(/\t/g, " ");
		unclean = unclean.replace(/<v\:imagedata/gi,"<IMG");
		unclean = unclean.replace(/<\/?\w+:[^>]*>/gi,"");
		unclean = unclean.replace(/<\\?\??xml[^>]>/gi,"");
		
		unclean = unclean.replace(/<(\/)?strong>/ig, "");
		
		unclean = unclean.replace(/<(\/)?em>/ig, "<$1I> "); //replaces <EM> with <I>
		unclean = unclean.replace(/[ ]+/g, " ");
		unclean = unclean.replace(/<\/TR>/gi, "\n</TR>");
		unclean = unclean.replace(/<\/FORM>/gi, "\n</FORM>");
		unclean = unclean.replace(/<\/TBODY>/gi, "\n</TBODY>");
		unclean = unclean.replace(/<\/TABLE>/gi, "\n</TABLE>\n");
		unclean = unclean.replace(/<BR[^>]*>/gi, "\n<BR>");
		unclean = unclean.replace(/<\/UL>/gi, "\n</UL>");
		unclean = unclean.replace(/<\/OL>/gi, "\n</OL>\r");
		unclean = unclean.replace(/<\/DL>/gi, "\n</DL>");
		unclean = unclean.replace(/<SELECT/gi, "\n<SELECT");
		unclean = unclean.replace(/<OPTION/gi, "\r<OPTION");
		unclean = unclean.replace(/<\/SELECT>/gi, "\n</SELECT>");
		unclean = unclean.replace(/<INPUT/gi, "\n<INPUT");
		unclean = unclean.replace(/<!--\s+/gi, "<!--\r");
		unclean = unclean.replace(/ ([^=]+)=([^" >]+)/gi, " $1=\"$2\"");
		unclean = unclean.replace(/<INPUT type=\"hidden\" value=\"(.*?)\" name=\"(.*?)\">/gi, "<INPUT class=\"RunTimeHidden\" type=\"hidden\" value=\"$1\" name=\"$2\">");
		unclean = unclean.replace(/\[I\]/gi, "[1]");
		unclean = unclean.replace(/\[II\]/gi, "[2]");
		unclean = unclean.replace(/\[III\]/gi, "[3]");
		unclean = unclean.replace(/\[IV\]/gi, "[4]");
		unclean = unclean.replace(/\[V\]/gi, "[5]");
		unclean = unclean.replace(/\[VI\]/gi, "[6]");
		unclean = unclean.replace(/\[VII\]/gi, "[7]");
		unclean = unclean.replace(/\[VIII\]/gi, "[8]");
		unclean = unclean.replace(/\[IX\]/gi, "[9]");
		unclean = unclean.replace(/\[X\]/gi, "[10]");
		unclean = unclean.replace(/\[XI\]/gi, "[11]");
		unclean = unclean.replace(/\[XII\]/gi, "[12]");
		unclean = unclean.replace(/\[XIII\]/gi, "[13]");
		unclean = unclean.replace(/\[XIV\]/gi, "[14]");
		unclean = unclean.replace(/\[XV\]/gi, "[15]");
		unclean = unclean.replace(/\[XVI\]/gi, "[16]");
		unclean = unclean.replace(/\[XVII\]/gi, "[17]");
		unclean = unclean.replace(/\[XVIII\]/gi, "[18]");
		unclean = unclean.replace(/\[XIX\]/gi, "[19]");
		unclean = unclean.replace(/\[XX\]/gi, "[20]");
		unclean = unclean.replace(/\[XXI\]/gi, "[21]");
		unclean = unclean.replace(/\[XXII\]/gi, "[22]");
		unclean = unclean.replace(/\[XXIII\]/gi, "[23]");
		unclean = unclean.replace(/\[XXIV\]/gi, "[24]");
		unclean = unclean.replace(/\[XXV\]/gi, "[25]");
		unclean = unclean.replace(/\[XXVI\]/gi, "[26]");
		unclean = unclean.replace(/\[XXVII\]/gi, "[27]");
		unclean = unclean.replace(/\[XXVIII\]/gi, "[28]");
		unclean = unclean.replace(/\[XXIX\]/gi, "[29]");
		unclean = unclean.replace(/\[XXX\]/gi, "[30]");
		unclean = unclean.replace(/\[XXXI\]/gi, "[31]");
		unclean = unclean.replace(/\[XXXII\]/gi, "[32]");
		unclean = unclean.replace(/\[XXXIII\]/gi, "[33]");
		unclean = unclean.replace(/\[XXXIV\]/gi, "[34]");
		unclean = unclean.replace(/\[XXXV\]/gi, "[35]");
		unclean = unclean.replace(/\[XXXVI\]/gi, "[36]");
		unclean = unclean.replace(/\[XXXVII\]/gi, "[37]");
		unclean = unclean.replace(/\[XXXVIII\]/gi, "[38]");
		unclean = unclean.replace(/\[XXXIX\]/gi, "[39]");
		unclean = unclean.replace(/\[XL\]/gi, "[40]");
		unclean = unclean.replace(/\[XLI\]/gi, "[41]");
		unclean = unclean.replace(/\[XLII\]/gi, "[42]");
		unclean = unclean.replace(/\[XLIII\]/gi, "[43]");
		unclean = unclean.replace(/\[XLIV\]/gi, "[44]");
		unclean = unclean.replace(/\[XLV\]/gi, "[45]");
		unclean = unclean.replace(/\[XLVI\]/gi, "[46]");
		unclean = unclean.replace(/\[XLVII\]/gi, "[47]");
		unclean = unclean.replace(/\[XLVIII\]/gi, "[48]");
		unclean = unclean.replace(/\[XLIX\]/gi, "[49]");
		unclean = unclean.replace(/\[L\]/gi, "[50]");
		unclean = unclean.replace(/\[LI\]/gi, "[51]");
		unclean = unclean.replace(/\[LII\]/gi, "[52]");
		unclean = unclean.replace(/\[LIII\]/gi, "[53]");
		unclean = unclean.replace(/\[LIV\]/gi, "[54]");
		unclean = unclean.replace(/\[LV\]/gi, "[55]");
		unclean = unclean.replace(/\[LVI\]/gi, "[56]");
		unclean = unclean.replace(/\[LVII\]/gi, "[57]");
		unclean = unclean.replace(/\[LVIII\]/gi, "[58]");
		unclean = unclean.replace(/\[LIX\]/gi, "[59]");
		unclean = unclean.replace(/\[LX\]/gi, "[60]");
		unclean = unclean.replace(/\[LXI\]/gi, "[61]");
		unclean = unclean.replace(/\[LXII\]/gi, "[62]");
		unclean = unclean.replace(/\[LXIII\]/gi, "[63]");
		unclean = unclean.replace(/\[LXIV\]/gi, "[64]");
		unclean = unclean.replace(/\[LXV\]/gi, "[65]");
		unclean = unclean.replace(/\[LXVI\]/gi, "[66]");
		unclean = unclean.replace(/\[LXVII\]/gi, "[67]");
		unclean = unclean.replace(/\[LXVIII\]/gi, "[68]");
		unclean = unclean.replace(/\[LXIX\]/gi, "[69]");
		unclean = unclean.replace(/\[LXX\]/gi, "[70]");
		unclean = unclean.replace(/\[LXXI\]/gi, "[71]");
		unclean = unclean.replace(/\[LXXII\]/gi, "[72]");
		unclean = unclean.replace(/\[LXXIII\]/gi, "[73]");
		unclean = unclean.replace(/\[LXXIV\]/gi, "[74]");
		unclean = unclean.replace(/\[LXXV\]/gi, "[75]");
		unclean = unclean.replace(/\[LXXVI\]/gi, "[76]");
		unclean = unclean.replace(/\[LXXVII\]/gi, "[77]");
		unclean = unclean.replace(/\[LXXVIII\]/gi, "[78]");
		unclean = unclean.replace(/\[LXXIX\]/gi, "[79]");
		unclean = unclean.replace(/\[LXXX\]/gi, "[80]");
		unclean = unclean.replace(/\[LXXXI\]/gi, "[81]");
		unclean = unclean.replace(/\[LXXXII\]/gi, "[82]");
		unclean = unclean.replace(/\[LXXXIII\]/gi, "[83]");
		unclean = unclean.replace(/\[LXXXIV\]/gi, "[84]");
		unclean = unclean.replace(/\[LXXXV\]/gi, "[85]");
		unclean = unclean.replace(/\[LXXXVI\]/gi, "[86]");
		unclean = unclean.replace(/\[LXXXVII\]/gi, "[87]");
		unclean = unclean.replace(/\[LXXXVIII\]/gi, "[88]");
		unclean = unclean.replace(/\[LXXXIX\]/gi, "[89]");
		unclean = unclean.replace(/\[XC\]/gi, "[90]");
		unclean = unclean.replace(/\[XCI\]/gi, "[91]");
		unclean = unclean.replace(/\[XCII\]/gi, "[92]");
		unclean = unclean.replace(/\[XCIII\]/gi, "[93]");
		unclean = unclean.replace(/\[XCIV\]/gi, "[94]");
		unclean = unclean.replace(/\[XCV\]/gi, "[95]");
		unclean = unclean.replace(/\[XCVI\]/gi, "[96]");
		unclean = unclean.replace(/\[XCVII\]/gi, "[97]");
		unclean = unclean.replace(/\[XCVIII\]/gi, "[98]");
		unclean = unclean.replace(/\[XCIX\]/gi, "[99]");
		unclean = unclean.replace(/\[C\]/gi, "[100]");
		unclean = unclean.replace(/ <\/A>/gi, "</A> ");
		unclean = unclean.replace(/alt=\"\" /gi, "");
		unclean = unclean.replace(/hspace=\"0\" /gi, "");
		unclean = unclean.replace(/<o:p>\s*<\/o:p>/g, "");
		unclean = unclean.replace(/<o:p>[\s\S]*?<\/o:p>/g, "&nbsp;");
		//unclean = unclean.replace(/\s*mso-[^:]+:[^;"]+;?/gi, "");
		unclean = unclean.replace(/\s*MARGIN: 0cm 0cm 0pt\s*;/gi, "");
		unclean = unclean.replace(/\s*MARGIN: 0cm 0cm 0pt\s*"/gi, "\"");
		unclean = unclean.replace(/\s*TEXT-INDENT: 0cm\s*;/gi, "");
		unclean = unclean.replace(/\s*TEXT-INDENT: 0cm\s*"/gi, "\"");
		unclean = unclean.replace(/\s*TEXT-ALIGN: [^\s;]+;?"/gi, "\"");
		unclean = unclean.replace(/\s*PAGE-BREAK-BEFORE: [^\s;]+;?"/gi, "\"");
		unclean = unclean.replace(/\s*FONT-VARIANT: [^\s;]+;?"/gi, "\"");
		unclean = unclean.replace(/\s*tab-stops:[^;"]*;?/gi, "");
		unclean = unclean.replace(/\s*tab-stops:[^"]*/gi, "");
		
		unclean = unclean.replace(/\s*face="[^"]*"/gi,"");
		unclean = unclean.replace(/\s*face=[^ >]*/gi,"");
		unclean = unclean.replace(/\s*FONT-FAMILY:[^;"]*;?/gi,"");
			
		unclean = unclean.replace(/<H1([^>]*)>/gi,'<p>');
	    unclean = unclean.replace(/<H2([^>]*)>/gi,'<p>') ;
	    unclean = unclean.replace(/<H3([^>]*)>/gi,'<p>') ;
	    unclean = unclean.replace(/<H4([^>]*)>/gi,'<p>') ;
	    unclean = unclean.replace(/<H5([^>]*)>/gi,'<p>') ;
	    unclean = unclean.replace(/<H6([^>]*)>/gi,'<p>') ;
	    unclean = unclean.replace(/<\/H\d>/gi,'') ;
	    unclean = unclean.replace(/<([^\s>]+)(\s[^>]*)?>\s*<\/\1>/g,'') ;
	    unclean = unclean.replace(/<([^\s>]+)(\s[^>]*)?>\s*<\/\1>/g,'') ;
	    unclean = unclean.replace(/<([^\s>]+)(\s[^>]*)?>\s*<\/\1>/g,'') ;

	    unclean = unclean.replace(/<div(.*)?>(&nbsp;|\s|　)*/gi,'<p$1>');
	    unclean = unclean.replace(/<div(.*)?\/>(&nbsp;|\s|　)*/gi,'<p$1>');
	   // unclean = unclean.replace(/<br(.*)?>(&nbsp;|\s|　)*/gi,'');
	   // unclean = unclean.replace(/<br(.*)?\/>(&nbsp;|\s|　)*/gi,'');
	    unclean = unclean.replace(/<\/div>/gi,'</p>');
	    unclean = unclean.replace(/<\/br>/gi,'</p>');
	    unclean = unclean.replace(/<b>|<\/b>|<u>|<\/u>|<i>|<\/i>/gi,'');
	    unclean = unclean.replace(/<b.*?>/gi,'');
	    unclean = unclean.replace(/<\b>/gi,'');
	    unclean = unclean.replace(/　/gi,'  ');　　//一个全角空格，替换成两个半角空格
	    unclean = unclean.replace(/(<p.*?>)(&nbsp;|\s| )*(<span.*?>)(&nbsp;|\s|　)*<\/span>/gi, "$1$3</span>");
	    unclean = unclean.replace(/<p(.*)?>(&nbsp;|\s| )*/gi,'<p$1>');
	    unclean = unclean.replace(/<p(.*)?\/>(&nbsp;|\s| )*/gi,'<p$1>');

	    unclean = unclean.replace(/<p(.*)?>(&nbsp;|\s| )*<\/p>/gi,'<p$1>');
	    unclean = unclean.replace(/<font.*?>/gi,'');
	    unclean = unclean.replace(/<\font>/gi,'');
//	    unclean = unclean.replace(/<a.*?>/gi,'');
//	    unclean = unclean.replace(/<\a>/gi,'');
	    unclean = unclean.replace(/<span.*?>/gi,'');
	    unclean = unclean.replace(/<\span>/gi,'');
	    unclean = unclean.replace(/<ul.*?>/gi,'');
	    unclean = unclean.replace(/<\ul>/gi,'');
	    unclean = unclean.replace(/<li.*?>/gi,'<p>');
	    unclean = unclean.replace(/<\li>/gi,'');
	    unclean = unclean.replace(/<p.*?>/gi,'<p>');
	    unclean = unclean.replace(/<p.*?>(&nbsp;|\s| )*/gi,'<p>');
	 //   unclean = unclean.replace(/<p.*?\/>(&nbsp;|\s| )*/gi,'<p>');//  清除格式不能带图片 注释掉可以解决

	    unclean = unclean.replace(/(^\s*)|(\s*$)/g,"");
	    //去掉注释
	    unclean = unclean.replace(/\<\!\-\-.*\-\-\>/g,'');
	    unclean = unclean.replace(/<style[^>]*?>[\s\S]*?<\/style>/gi,'');
	    /*if(unclean.indexOf("<p")!=0 || unclean.indexOf("<P")!=0){
	    	unclean = "<p>"+unclean;
	    }*/
	    return unclean;
	};
	var html = function(str){
        return str ? str.replace(/&((g|l|quo)t|amp|#39|nbsp);/g, function (m) {
            return {
                '&lt;':'<',
                '&amp;':'&',
                '&quot;':'"',
                '&gt;':'>',
                '&#39;':"'",
                '&nbsp;':' '
            }[m]
        }) : '';
		   
	};
	var dbc2sb = function (str) {
        var result = '';
        for (var i = 0; i < str.length; i++) {
            var code = str.charCodeAt(i); //获取当前字符的unicode编码
            if (code >= 65281 && code <= 65373)//在这个unicode编码范围中的是所有的英文字母已经各种字符
            {
                result += String.fromCharCode(str.charCodeAt(i) - 65248); //把全角字符的unicode编码转换为对应半角字符的unicode码
            } else if (code == 12288)//空格
            {
                result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
            } else {
                result += str.charAt(i);
            }
        }
        return result;
    };
	var todbc = function (txtstring) {
        txtstring = html(txtstring);
        var tmp = "";
        var mark = "";/*用于判断,如果是html尖括里的标记,则不进行全角的转换*/
        for (var i = 0; i < txtstring.length; i++) {
            if (txtstring.charCodeAt(i) == 32) {
                tmp = tmp + String.fromCharCode(12288);
            }
            else if (txtstring.charCodeAt(i) < 127) {
                tmp = tmp + String.fromCharCode(txtstring.charCodeAt(i) + 65248);
            }
            else {
                tmp += txtstring.charAt(i);
            }
        }
        return tmp;
    };
    var isURL = function(str_url) { 
    	var strRegex = '[a-zA-z]+://[^\s]*'; 
    	var re=new RegExp(strRegex); 
    	if (re.test(str_url)) { 
    		return true; 
    	} else { 
    		return false; 
    	} 
   }; 
   var filterBr = function(data){
		 data = data.replace(/<br([^>]*)>/,'</p><p>');
		 if($(data).find("br").length>0){
			 return filterBr(data);
		 }
		 return data;
	 };
   var defaultStyle = function(data){
	   data = filterBr(data);
		 data = clearFormat(data);
		 var newData = "";
		 $.each($.parseHTML(data), function( i, el ) {
			 var hasImg = $(el).find("img");
			 if(hasImg.length>0){
				 $(el).attr("style","text-align:center;text-indent:0px;");
				 var outerHtml = $(el).prop("outerHTML");
				 if(outerHtml){
					 newData += $(el).prop("outerHTML");
				 }
				 return true;
			 }
			 var hasVideo = $(el).find("video");
			 if(hasVideo.length>0){
				 $(el).attr("style","text-align:center;text-indent:0px;");
				 var outerHtml = $(el).prop("outerHTML");
				 if(outerHtml){
					 newData += $(el).prop("outerHTML");
				 }
				 return true;
			 }
			 $(el).attr("style","LINE-HEIGHT: 180%; text-indent: 2em; font-size: 14pt;");
			 var outerHtml = $(el).prop("outerHTML");
			 if(outerHtml){
				 newData += $(el).prop("outerHTML");
			 }
		 });
		 return newData;
   };
	return {
		isEmpty:function(string){
			return isEmpty(string);
		},
		isEqual:function(string1,string2){
			return isEqual(string1,string2);
		},
		removeArrayIndex:function(array,index){
			return removeArrayIndex(array,index);
		},
		jsonToParams:function(json){
			return jsonToParams(json);
		},
		clearFormat:function(unclean){
			return clearFormat(unclean);
		},
		enToCn:function(txtstring){
			return dbc2sb(txtstring);
		},
		cnToEn:function(txtstring){
			return todbc(txtstring);
		},
		isURL:function(str_url){
			return isURL(str_url);
		},
		defaultStyle:function(content){
			return defaultStyle(content);
		}
	}
	
}