/**
 *  Some Javascript to accompany my visualization of the last 5 years of
 *  CIHR funding distribution by province accross Canada.
 * 
 *  Author: Ben Clark
 *
 **/

var view;
var year;

window.onload = function(){
    initializePage();
}

function initializePage() {
    
    
    var norm = document.getElementById("norm-buttons-cheat");
    norm.innerHTML = "View: ";
    var view1 = document.createElement("a");
    view1.setAttribute("id", "funding-button");
    view1.innerHTML = "Funding By Year";
    addViewHandler(view1, "funding");
    norm.appendChild(view1);
    var view2 = document.createElement("a");
    view2.setAttribute("id", "change-button");
    view2.innerHTML = "Change in Funding";
    addViewHandler(view2, "change");
    norm.appendChild(view2);
    
    activateView("funding");
    //activateYear(2012);
}




function activateView(newView) {
    
    if (newView == "funding") {
        view = "funding";
        year = 2012;
        var yrButtPar = document.getElementById("year-buttons-cheat");
        yrButtPar.innerHTML = "Fiscal Year: ";
        for (var i=2012; i<2017; i++) {
            var j = (i+1)-2000;
            var yr = i.toString() + "/" + j.toString();
            var newButton = document.createElement("a");
            addYearHandler(newButton, i);
            newButton.innerHTML = yr;
            yrButtPar.appendChild(newButton);
        }
        activateYear(2012);
        newLegend(1);
        document.getElementById("funding-button").setAttribute("class", "active");
        document.getElementById("change-button").setAttribute("class", " ");
        document.getElementById("detail-change").style.display = "none";
        document.getElementById("detail-funding").style.display = "block";
    }
    
    else if (newView == "change") {
        view = "change";
        year = 2012;
        var yrButtPar = document.getElementById("year-buttons-cheat");
        yrButtPar.innerHTML = "Range: ";
        for (var i=2012; i<2016; i++) {
            var j = i + 2;
            var yr = i.toString() + "-" + j.toString();
            var newButton = document.createElement("a");
            addYearHandler(newButton, i);
            newButton.innerHTML = yr;
            yrButtPar.appendChild(newButton);
        }
        activateYear(2012);
        newLegend(2);
        document.getElementById("funding-button").setAttribute("class", " ");
        document.getElementById("change-button").setAttribute("class", "active");
        document.getElementById("detail-change").style.display = "block";
        document.getElementById("detail-funding").style.display = "none";
        
        
        
    } else {
        alert("uh oh! An error occurred. Please reload the page.");
    }
}






function activateYear(newYear) {
    
    
    var yrButtPar = document.getElementById("year-buttons-cheat");
    var yearChildren = yrButtPar.childNodes;
    
    function clearYears() {
        for (var i=0; i<yrButtPar.childElementCount; i++) {
            yearChildren[i+1].setAttribute("class", " ");
        }
    }
    
    if (view == "funding") {
        clearYears();
        var newIndex = (newYear - 2012) + 1;
        yearChildren[newIndex].setAttribute("class", "active");
        document.getElementById("map").innerHTML = "";
        var newMap = document.createElement("img");
        newMap.setAttribute("class", "map-image");
        newMap.setAttribute("alt", "CIHR Funding By Province");
        newMap.setAttribute("src", "assets/funding-"+newYear+".jpeg");
        document.getElementById("map").appendChild(newMap);
    }
    
    
    
    else if (view == "change") {
        clearYears();
        var newIndex = (newYear - 2012) + 1;
        yearChildren[newIndex].setAttribute("class", "active");
        document.getElementById("map").innerHTML = "";
        var newMap = document.createElement("img");
        newMap.setAttribute("class", "map-image");
        newMap.setAttribute("alt", "CIHR Funding By Province");
        newMap.setAttribute("src", "assets/change-"+newYear+".jpeg");
        document.getElementById("map").appendChild(newMap);
    }
    
    
}






    
function newLegend(n) {
    
    var legSrc = "assets/legend" + n.toString() + ".jpg";
    
    var leg = document.getElementById("legend");
    leg.innerHTML = " ";
    var newLeg = document.createElement("img");
    newLeg.setAttribute("class", "legend-image");
    newLeg.setAttribute("alt", "Legend");
    newLeg.setAttribute("src", legSrc);
    leg.appendChild(newLeg);
}


function addYearHandler(elem,  newY) {
    elem.addEventListener("click", function(){
        activateYear(newY);
    }, false);
}


function addViewHandler(elem, newV) {
    elem.addEventListener("click", function() {
        activateView(newV);
    }, false);
}

