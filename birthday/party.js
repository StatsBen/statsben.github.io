/*
      _________ _______  _______  _______      
      \__    _/(  ____ \(  ____ \(  ____ \     
         )  (  | (    \/| (    \/| (    \/     
         |  |  | (__    | (_____ | (_____      
         |  |  |  __)   (_____  )(_____  )     
         |  |  | (            ) |      ) |     
      |\_)  )  | (____/\/\____) |/\____) |     
      (____/   (_______/\_______)\_______)     
                                               
_________          _______  _        _______   
\__   __/|\     /|(  ____ )( (    /|(  ____ \  
   ) (   | )   ( || (    )||  \  ( || (    \/  
   | |   | |   | || (____)||   \ | || (_____   
   | |   | |   | ||     __)| (\ \) |(_____  )  
   | |   | |   | || (\ (   | | \   |      ) |  
   | |   | (___) || ) \ \__| )  \  |/\____) |  
   )_(   (_______)|/   \__/|/    )_)\_______)  
                                               
             _______  _______  _               
            / ___   )(  ____ \( )              
            \/   )  || (    \/| |              
                /   )| (____  | |              
              _/   / (_____ \ | |              
             /   _/        ) )(_)              
            (   (__/\/\____) ) _               
            \_______/\______/ (_)              


    Website by Ben Clark - April, 2017  ;) 
 *
 */



window.onload = function() {
    initializeCountdown();
    makePhotoMontage();
}

function initializeCountdown() {
    var birthDate = 29;
    var today = new Date()
    var daysLeft = birthDate - today.getDate();
    document.getElementById("countdown").innerHTML = "countdown: " + daysLeft + " days";
}

function makePhotoMontage() {
    var nPhotos = 9;
    var primeNumbers = [1,2,3,5,7,11,13,17,19];
    var photoSeed = Math.floor(Math.random() * 28 ) + 1;
    var container = document.getElementById("display-images");
    for (var i=1; i<nPhotos+1; i++) {
        var newPhoto = document.createElement("img");
        newPhoto.setAttribute("id", "jess-face-"+i);
        newPhoto.setAttribute("class", "derp-face");
        newPhoto.setAttribute("alt", "face of Jess number " + i);
        var photoID = ((photoSeed + primeNumbers[i-1]) % 28) + 1;
        var photoSeed = photoID;
        var photoURL = "faces/" + photoID + ".JPG";
        newPhoto.setAttribute("src", photoURL);
        container.appendChild(newPhoto);
//        console.log(photoID);
    }
}
