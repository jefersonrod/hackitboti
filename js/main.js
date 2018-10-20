var cpfs;
var soc;
var postsPath = "js/posts.json";
var socialMediaPath = "js/socialmedia.json";
function jsonLoad(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cpfs = JSON.parse(this.responseText);              
            for(var i = 0; i < cpfs.length; i++)
		    {    
                document.getElementById("select-cpf").options[i+1] = new Option(cpfs[i].CPF);
                //$("#select-cpf").append("<option value=\""+i+"\">"+cpfs[i].CPF+"</option>\"");
			}
        }
    }

    xmlhttp.open("GET", postsPath, true);
    xmlhttp.send();

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            soc = JSON.parse(this.responseText);              
            
        }
    }

    xmlhttp.open("GET", socialMediaPath, true);
    xmlhttp.send();

}
function getPost(){
    while(document.getElementById("result1")){
        var element = document.getElementById("result1");
        element.parentNode.removeChild(element);
    }
    

    var sel = document.getElementById("select-cpf").selectedIndex-1;    

    for (let i = 0; i < cpfs[sel].Posts.length; i++) {
        console.log(cpfs[sel].Posts[i].Url)
        console.log(cpfs[sel].Posts[i].Text)

        var div = document.createElement("div");
        div.id = "result1";
        var img = document.createElement("img");

        
        img.src = cpfs[sel].Posts[i].Url;
        var post = cpfs[sel].Posts[i].Text;
        div.appendChild(img);
        div.append(post);
        
        document.getElementById("postlist").appendChild(div);
        //document.getElementById("postlist").append(post);
    }

    
    
}

function getsocial(){
    var result = "<ul>";
    var selcpfidx = document.getElementById("select-cpf").selectedIndex;
    var selcpf = document.getElementById("select-cpf").value;
    if (selcpfidx>0) {
        console.log("soc: "+soc.cpf);
        
            if (soc.cpf.includes(selcpf)) {
                
                console.log(soc.socialAnalysis.sellManyBrands);
                console.log(soc.socialAnalysis.isCommercialSupporter);
                console.log(soc.socialAnalysis.isProactive);
                //sellManyBrands
                if (soc.socialAnalysis.sellManyBrands) {
                    result = result+"<li>"+"Vende muitas marcas: SIM"+"</li>";
                } else {
                    result = result+"<li>"+"Vende muitas marcas: NÃO"+"</li>";
                }
                //isCommercialSupporter
                if (soc.socialAnalysis.isCommercialSupporter) {
                    result = result+"<li>"+"Faz propaganda: SIM"+"</li>";
                } else {
                    result = result+"<li>"+"Faz propaganda: NÃO"+"</li>";
                }
                /* //isProactive
                if (soc.socialAnalysis.isProactive) {
                    result = result+"<li>"+"Vende muitas marcas: SIM"+"</li>";
                } else {
                    result = result+"<li>"+"Vende muitas marcas: NÃO"+"</li>";
                } */
                //hasCompany
                if (soc.socialAnalysis.hasCompany) {
                    result = result+"<li>"+"Possui empresa aberta: SIM"+"</li>";
                } else {
                    result = result+"<li>"+"Possui empresa aberta: NÃO"+"</li>";
                }
            }
            
            document.getElementById("socialm").innerHTML = result+"</ul>";
    }
    
}