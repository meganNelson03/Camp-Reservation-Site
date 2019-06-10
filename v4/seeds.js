var mongoose = require("mongoose"),
    Campground  = require("./models/campground");
    
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://files.adirondackcamp.com/photos/uploads/23159/slideLarge/home-7.jpg",
        description: "Cool little log cabins line the path up to this hot spot. Be careful taking your dogs here."
    },
    {
        name: "Billygoat Hall",
        image: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Camp_4.jpg",
        description: "Bet you've never seen anything like this. You thought you could cheat on me and get away with it?"
    },
    {
        name: "Gertie's Gull",
        image: "https://www.pinetreesociety.org/wp-content/uploads/2017/10/cabins-960x600.jpg",
        description: "Quit playing dumb. I know you've been dating your coworker Ted. What do you even see in that loser?"
    },
    {
        name: "The Handsome Man",
        image: "http://www.guntherpublications.com/core/wp-content/uploads/2018/01/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810.jpg",
        description: "Seriously, though? Four years. Four years we've been dating and you thought I'd never catch on."
        
    },
    {
        name: "Fortuna Oblongata",
        image: "https://www.zionponderosa.com/wp-content/uploads/2017/02/Tent-Camping-1000.jpg",
        description: "What's your mother going to think of you now? Everyone's gonna know what a psycho you are."
    },
    {
        name: "Wincer's Pike",
        image: "https://www.zionponderosa.com/wp-content/uploads/2017/02/Tent-Camping-1000.jpg",
        description: "Don't touch me. Don't even get near me. Just leave, Penelope. Jesus H Christ."
    },
    {
        name: "Charlie's Pass",
        image: "https://www.travelyosemite.com/media/549688/high-sierra-camp-at-yosemite-national-park-227_1000x667.jpg",
        description: "I want you out of this house. I am putting all your things out on the lawn. You aren't allowed here anymore."
    }
    

]

function seedDB() {

    Campground.remove({}, function(err) {
        if (err) {
            console.log("Error removing all campgrounds");
        }
        console.log("Removed all Campgrounds from database"); 
        
        data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Added a campground");
                    // create comments
                    Comment.create(
                        {
                            text: "This place is great... I just wish there was internet...",
                            author: "Georgia Hunt"
                        }, function(err, cm) {
                            if (err) {
                                console.log(err);
                            } else {
                                campground.comments.push(cm);
                                campground.save();
                                console.log("created new comment");
                            }
                        }
                    );
                }
            });
        });
    });
    
    
    

}

module.exports = seedDB; 