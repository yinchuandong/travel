/** 
一个用作js模板替换的代码 
template格式和数组格式如下 
var template = "<div><h1>{title}</h1><p>{content}</p></div>"; 
var data = [{title:"a",content:"aaaa"},{title:"b",content:"bbb"},{title:"c",content:"ccc"}]; 
只需要数据格式对应 
*/  
function replaceTpl(template,data){  
    var outPrint="";  
    for(var i = 0 ; i < data.length ; i++){  
        var matchs = template.match(/\{[a-zA-Z0-9_]+\}/gi);  
        var temp="";  
        for(var j = 0 ; j < matchs.length ;j++){  
            if(temp == "")  
                temp = template;  
            var re_match = matchs[j].replace(/[\{\}]/gi,"");  
            temp = temp.replace(matchs[j],data[i][re_match]);  
        }  
        outPrint += temp;  
    }  
    return outPrint;  
}
function tmpl(str , data){
    var fn = !/\W/.test(str) ? cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :        // Generate a reusable function that will serve as a template

        new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};" +

            // Introduce the data as local variables using with(){}
            "with(obj){p.push('" +

            // Convert the template into pure JavaScript
            str.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") +
            "');}return p.join('');");
    // Provide some basic currying to the user
    return data ? fn(data) : fn;
}