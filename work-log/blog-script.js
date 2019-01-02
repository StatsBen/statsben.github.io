/** 
 * Some javascript controlling the show/hide on all the blog posts
 *   Author: Ben Clark - 2016
 */

$(document).ready(function() {
    initializePosts();
});



/**
 *      This setup function adds the dates of each entry,
 *      adds the 'read more' button, and styles everything.
 */ 

function initializePosts() {
    
    var posts = document.getElementsByClassName("entry");
    var n = posts.length;
    
    var updatedPosts = new Array();
    
    console.log('how many posts are there? : ' + n);
    
    for (i=0; i<n; i++) {
        
        // Add the 'read more' button'
        var viewButton = document.createElement('a');
        viewButton.innerHTML = 'read more...';
        viewButton.classList.add('view-button');
        viewButton.id = 'b' + i.toString();
        viewButton.onclick = function(){expand(this);};
        
        // retrieve the text and add the date
        var entryText = document.createElement('p');
        entryText.classList.add('entry-text');
        entryText.id = 'entry-text-' + i;
        var d = posts[i].getAttribute("date");
        var entryStyle = '<span style="font-weight:900; color:#333333;">';
        entryText.innerHTML = entryStyle + d + ' - </span>' + posts[i].innerHTML;
        entryText.style.height = '0.95em';
        
        // I'll also need a "clear" div to get all the spacing right...
        var spacerDiv = document.createElement('div');
        spacerDiv.classList.add('spacer-div');
        
        // Repack it all under a new containing div
        var container = document.createElement('div');
        container.classList.add('entry-container');
        container.appendChild(entryText);
        container.appendChild(viewButton);
        container.appendChild(spacerDiv);
        updatedPosts[i] = container;
    }
    
    var cont = document.getElementById('content');
    
    // clear out the old children...
    while (cont.firstChild) {
        cont.removeChild(cont.firstChild);
    }
    
    // insert the new children!
    for (i=0; i<n; i++) {
        cont.appendChild(updatedPosts[i]);
    }
}



/**
 *      This expand function is called when a user clicks on the
 *      'read more' button, and it expands a post to be read,
 *      and adds a 'close' button.
 */

function expand(e) { 
    // Select the relevent text element
    var spotID = e.id.charAt(1) + e.id.charAt(2) + e.id.charAt(3);
    var relevantTextID = '#entry-text-' + spotID;
    
    // Open it up
    $(relevantTextID).addClass('active-entry-text');
    $(relevantTextID).removeClass('entry-text');
    $(relevantTextID).animate({'min-height': '8em'}, 200);
    $(relevantTextID).animate({'height': '8em'}, 200);
    
    // Add the 'close' button
    e.innerHTML = 'close';
    e.onclick = function(){closeEntry(this)};
}



/**
 *      This closeEntry function is called when a user clicks
 *      on the 'close' button that appears after a post is 
 *      expanded, and it collapses the post while also 
 *      recreating the 'read more' button.
 */

function closeEntry(e) {
    // Select the relevent text element
    var spotID = e.id.charAt(1) + e.id.charAt(2) + e.id.charAt(3);
    var relevantTextID = '#entry-text-' + spotID;
    
    // collapse the element
    $(relevantTextID).addClass('entry-text');
    $(relevantTextID).removeClass('active-entry-text');
    $(relevantTextID).animate({'height': '0.95em'}, 200);
    $(relevantTextID).animate({'min-height': '0'}, 200);
    
    // return the 'read more' button
    e.innerHTML = 'read more...';
    e.onclick = function(){expand(this)};
}
