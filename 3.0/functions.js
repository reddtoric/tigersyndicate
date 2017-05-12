var DataFile = "Data.json";
var content = $("#content");
var contentTitle = $("#contentTitle");
var innerContent = $("#innerContent");


function GetJson(lambdaFunction){
    $.getJSON(DataFile, function(data){
        //empty
    }).done(function(data){
        lambdaFunction(data);
    });
}

function DisplayContact(){
    ChangeContentTitle("", "logo2", "Tiger Syndicate");
    EmptyInnerContent();
  
    var lambdaFunction = function(data){
        var TSI = data.TigerSyndicateInfo;
        
        var contactUsContainer = '<div id="contactContainer"></div>';
        var title = '<h2>Contact Us</h2>';
        var email = '<p>Email us at <a href="mailto:' + TSI.contact_email + '" target="_top">' + TSI.contact_email + '</a></p>';
        contactUsContainer.append(title);
        contactUsContainer.append(email);
        
        //paypal's donate button
        //to-do
        
        var connectWithUsContainer = '<div id="connectWithUsContainer"></div>';
        var title2 = '<h2>Connect with us</h2>';
        connectWithUsContainer.append(title2);
        
        var socialIcons;
        if(TSI.twitch != ""){
            socialIcons += '<a href="' + TSI.twitch + '" target="_blank">';
                socialIcons += '<i class="fa fa-twitch" title="Twitch" class="twitchIcon" aria-hidden="true"></i>';
            socialIcons += '</a>';
        }
        if(TSI.twitter != ""){
            socialIcons += '<a href="' + TSI.twitter + '" target="_blank">';
                socialIcons += '<i class="fa fa-twitter" title="Twitter" class="twitterIcon" aria-hidden="true"></i>';
            socialIcons += '</a>';
        }
        if(TSI.facebook != ""){
            socialIcons += '<a href="' + TSI.facebook + '" target="_blank">';
                socialIcons += '<i class="fa fa-facebook" title="Facebook" class="facebookIcon" aria-hidden="true"></i>';
            socialIcons += '</a>';
        }
        if(TSI.discord != ""){
            socialIcons += '<a href="' + TSI.discord + '" target="_blank">';
                socialIcons += '<div title="Discord" class="discordIcon" aria-hidden="true"></div>';
            socialIcons += '</a>';
        }
        if(TSI.youtube != ""){
            socialIcons += '<a href="' + TSI.youtube + '" target="_blank">';
                socialIcons += '<i class="fa fa-youtube-play" title="Youtube" class="youtubeIcon" aria-hidden="true"></i>';
            socialIcons += '</a>';
        }
        if(TSI.steam != ""){
            socialIcons += '<a href="' + TSI.steam + '" target="_blank">';
                socialIcons += '<i class="fa fa-steam-square" title="Steam" class="steamIcon" aria-hidden="true"></i>';
            socialIcons += '</a>';
        }
        if(TSI.google_plus != ""){
            socialIcons += '<a href="' + TSI.google_plus + '" target="_blank">';
                socialIcons += '<i class="fa fa-google-plus" title="Google+" class="google_plusIcon" aria-hidden="true"></i>';
            socialIcons += '</a>';
        }
        connectWithUsContainer.append(socialIcons);
        
        
    };
    
    GetJson(lambdaFunction);
}

function isGamesBtn(element){
    if(element.className === "gamesbtn")
        return true;
    return false;
}

function ChangeContentTitle(className, id, title){
    EmptyContentTitle();
    contentTitle.append('<div class="' + className +'" id="' + id + '" title="' + title + '"></div>');
}

    
function ListGames(){
    ChangeContentTitle("", "logo2", "Tiger Syndicate");
    EmptyInnerContent();
    
    var lambdaFunction = function(data){
        $.each(data.GameList, function(i, item){
            //console.log('<div class="gamesbtn" id="' + item.id + '">' + item.title + '</div>');
            
            innerContent.append('<a class="gamesbtn" id="' + item.id + '" title="' + item.title + '" onclick="DisplayMembers(this)"/>');
            //innerContent.append('<a class="gamesbtn" id="' + item.id + '" title="' + item.title + '" onclick="test(this)"/>');
            //innerContent.append('<a class="gamesbtn" id="' + item.id + '" title="' + item.title + '"/>');
            //innerContent.append('<a class="gamesbtn" id="' + item.id + '" title="' + item.title + '" onclick="DisplayTeams(' + item.id + ',' + item.title + ')"/>');
            
            
            //innerContent.append('<div class="gamesbtn" id="' + item.id + '">' + item.title + '</div>');
        });
   };
   
   GetJson(lambdaFunction);
}


function DisplayMembers(element){
    var id = element.getAttribute("id");
    var title = element.getAttribute("title");
    ChangeContentTitle("gameTitle", id, title);
    EmptyInnerContent();
    
    var lambdaFunction = function(data){
        $.each(data[id], function(i, item){
            var memberCard = '<div class="memberCard">';
            
                memberCard += '<div class="memberImgContainer">';
                if(item.img_path === ""){
                    memberCard += '<img class="memberImg" src="imgs/black.png"/>';
                }
                else{
                    memberCard += '<img class="memberImg" src="' + item.img_path + '"/>';
                }
                memberCard += '</div>';//end of memberImgContainer div
                
                memberCard += '<div class="memberContentContainer">';
                    memberCard += '<ign>' + item.ign + '</ign>';
                    memberCard += '<name>' + item.name + '</name>';
                    if(item.desc != ""){
                        memberCard += '<desc>' + item.desc + '</desc>';
                    }
                
                    memberCard += '<div class="memberLinksContainer">';
                    if(item.twitch != "" ){
                        memberCard += '<a href="' + item.twitch + '" target="_blank">';
                            memberCard += '<i class="fa fa-twitch" title="Twitch" class="twitchIcon" aria-hidden="true"></i>';
                        memberCard += '</a>';
                    }
                    if(item.twitter != ""){
                        memberCard += '<a href="' + item.twitter + '" target="_blank">';
                            memberCard += '<i class="fa fa-twitter" title="Twitter" class="twitterIcon" aria-hidden="true"></i>';
                        memberCard += '</a>';
                    }
                    if(item.steam != ""){
                        memberCard += '<a href="' + item.steam + '" target="_blank">';
                            memberCard += '<i class="fa fa-steam" title="Steam" class="steamIcon aria-hidden="true""></i>';
                        memberCard += '</a>';
                    }
                    if(item.discord != ""){
                        memberCard += '<a href="' + item.discord + '" target="_blank">';
                            memberCard += '<div title="Discord" class="discordIcon" aria-hidden="true"></div>';
                        memberCard += '</a>';
                    }
                    memberCard += '</div>';//end of memberLinksContainer div
                memberCard += '</div>';//end of memberContentContainer div
            
            memberCard += '</div>';//end of memberCard div
            
            innerContent.append(memberCard);
        });
    };
    
    GetJson(lambdaFunction);
}

function ToggleNavOverlay(){
    $("#navOverlay").toggle();
}

function EmptyContent(){
    content.empty();
}

function EmptyContentTitle(){
    contentTitle.empty();
}

function EmptyInnerContent(){
    innerContent.empty();
}
