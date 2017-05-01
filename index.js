/**
 *  Scripts for controlling the nifty animations and interactivity on
 *   my personal website, benjamindavidclark.com
 *
 *  Author: Ben Clark - Apr. 2017
 *
 **/
 

/**
 * Here's where I initialize everything :)
 **/
$(document).ready(function(){
    
    //initializeNavBar();
    //initializeScrolling();
    //initializeWorksElements();
    //initializeBackgroundAndAccents();
    
});


/**
 *  This is the big one! Setting up all the "Works" elements from my custom
 *   html tags. They need to be read, rendered as clickable elements, and
 *    then an "onClick" function must be created to expand the accordion
 *     and reveal the iFrame when desired.
 */
function initializeWorksElements() {
    
    // Loop through all the elements
    var projectsContainer = $("#projects-container")[0];
    var works = $('proj');
    for (var i=0; i<works.length; i++) {
        
        // Make the link/button or whatever...
        var newWork = document.createElement("div");
        newWork.setAttribute("id", "project-" + (i+1));
        newWork.setAttribute("class", "project");
        
        // Insert the title
        var w = works[i];
        var title = w.getAttribute("name");
        var wTitle = document.createElement("p");
        wTitle.setAttribute("class", "project-title");
        wTitle.innerHTML = title;
        newWork.appendChild(wTitle);
        
        // Insert the date
        var d = new Date(w.getAttribute("date"));
        var time = makeMonthName(d);
        var wDate = document.createElement("p");
        wDate.setAttribute("class", "project-date");
        wDate.innerHTML = time;
        newWork.appendChild(wDate);
        
        // Add space for the iFrame
        var h = w.getAttribute("height");
        var scroh = w.getAttribute("scroll");
        var wFrame = document.createElement("iframe");
        wFrame.setAttribute("id", "wframe-" + (i+1));
        wFrame.setAttribute("class", "project-frame");
        if (scroh == "true")
            wFrame.setAttribute("scrolling", "yes");
        else
            wFrame.setAttribute("scrolling", "no");
        wFrame.setAttribute("frameborder", "0");
        //wFrame.setAttribute("height", h + "px");
        
        // Make a container for the link and iframe
        var wContainer = document.createElement("div");
        wContainer.setAttribute("id", "project-container-" + (i+1));
        wContainer.setAttribute("class", "project-container");
        wContainer.appendChild(newWork);
        wContainer.appendChild(wFrame);
        
        // Add the frame expansion functionality
        var imgSrc = w.getAttribute("framesrc");
        var height = w.getAttribute("height") + "px";
        addProjectEventHandler(wContainer, imgSrc, height, true);
        
        // Append the new work to the document
        projectsContainer.appendChild(wContainer);
    }
    
}


/**
 *  Inserts the background image and sets up the accompanying accent colors
 *   randomly from info tucked away in my made up "background" tags in the
 *    header tag up top
 **/
function initializeBackgroundAndAccents() {
    
    // Extract a random theme
    var backs = $("background");
    var nBacks = backs.length;
    var backID = Math.floor(Math.random() * nBacks);
    var newBack = backs[backID];
    var lightAccent = newBack.getAttribute("lightaccent");
    var darkAccent  = newBack.getAttribute("darkaccent");
    var titleAccent = newBack.getAttribute("titleaccent");
    var bgFN = newBack.getAttribute("image");
    
    // Apply theme to header
    $("header h1").css("color", lightAccent);
    $(".tag").css("color", lightAccent);
    
    // Apply theme to H1 elements
    var hs = $("h1");
    for (var i=1; i<hs.length; i++) {
        var currentH = hs[i];
        currentH.style.color = darkAccent;
    }
    
    // Apply theme to Nav Bar
    var navs = $("#nav-bar p a");
    for (var i=0; i<navs.length; i++) {
        var currentNav = navs[i];
        currentNav.style.color = lightAccent;
    }
    
    // Apply theme to Works elements
    var ws = $("p.project-title");
    for (var i=0; i<ws.length; i++) {
        var currentW = ws[i];
        currentW.style.color = darkAccent;
    }
    
    // Set up the randomized background image
    var bg = "url(./assets/" + bgFN + ")";
    $("header").css("background-image", bg);
}


/**
 *  Simple function, just sets up the smooth scrolling between page sections
 *   with out-of-the-box jQuery
 **/
function initializeScrolling() {
    $('#cv-link').click( function() {
        $('html, body').stop().animate({
            scrollTop: $('#cv').offset().top + 20
        }, 600, 'swing');
    });
    $('#works-link').click( function() {
        $('html, body').stop().animate({
            scrollTop: $('#projects').offset().top + 20
        }, 600, 'swing');
    });
    $('#header-link').click( function() {
        $('html, body').stop().animate({
            scrollTop: $('#header').offset().top + 20
        }, 600, 'swing');
        $("#nav-bar").animate({paddingBottom: "25px"}, 600);
        $("#nav-bar").animate({paddingTop: "25px"}, 600);
        console.log(document.body.scrollTop);
    });
}


/**
 *  Shrinks and expands the nav bar as the user scrolls about
 **/
function initializeNavBar() {
    $("#nav-bar").css("padding", "20px");
    document.addEventListener("scroll", function(e){
        
        var nav = $("#nav-bar");
        var isBig = !nav.hasClass("small");
        var nearTop = document.body.scrollTop < 600;
        
        if(!nearTop && isBig) {
            nav.animate({paddingBottom: "5px",
                         paddingTop: "5px"}, 600);
            nav.addClass("small");
        } 
        
        else if (nearTop && !isBig) {
            nav.animate({paddingBottom: "25px",
                         paddingTop: "25px"}, 600);
            nav.removeClass("small");
        }
    });
}


/**
 *  Adds the event handler to a project element
 **/
function addProjectEventHandler(elem, imgSrc, height) {
    elem.addEventListener("click", function(){
        
        var elemID = "#" + elem.id;
        var frameName = $(elemID).find("iframe")[0].id;
        var frameID = "#" + $(elemID).find("iframe")[0].id;
        
        if ($(elemID).hasClass("active")) {
            $(frameID).animate({height: 0}, 800);
            $(frameID).attr("src", " ");
            $(frameID).css("margin", "0");
            $(elemID).removeClass("active");
            $(elemID).addClass("inactive");
        }
        
        else {
            $(frameID).attr("src", imgSrc);
            var newH = $(frameID).contents().height();
            console.log(newH);
            $(frameID).animate({height: height}, 800);
            $(frameID).css("margin", "25px 5% 25px 5%");
            $(elemID).removeClass("inactive");
            $(elemID).addClass("active");
        }
        
    }, false);
}



/** 
 *  Adding a quick message to go with the "Adventures" button in the Nav Bar
 **/
function adventuresRedirect() {
    alert("You're being redirected to a sub-domain of my website. To return, please press the Back button");
}


/**
 *  Takes Date object, and makes the exact kind of readable string
 *   I want.  (that's "Month, yyyy")
 **/
function makeMonthName(d) {
    var monthNames = [ "January", "February", "March", "April", "May", "June",
                       "July", "August", "September", "October", "November",
                       "December" ];
    moNo = d.getMonth();
    year = d.getFullYear();
    dateString = monthNames[moNo] + ", " + year;
    return(dateString);
}
