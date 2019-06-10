var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");
    
var Campground = require("./models/campground");
var seedDB = require("./seeds");
    
seedDB();
mongoose.connect("mongodb://localhost:27017/camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SET-UP:


// Campground.create({
//     name: "Salmon Creek", 
//     image:"https://www.zionponderosa.com/wp-content/uploads/2017/02/Tent-Camping-1000.jpg",
//     description: "This is a huge granite hill, no bathrooms. No Water. Beautiful granite."
// }, function(err, newc){
//     if (err){
//         console.log(err);
//     } else {
//         console.log(newc);
//     }
// });

app.get("/", function(req, res){
   res.render("landing"); 
});

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, campgrounds){
        if (err){
            console.log(err);
        } else {
            res.render("index", {campgrounds: campgrounds});
        }
    });
  
  
});

app.get("/campgrounds/new", function(req, res){
   res.render("new.ejs"); 
});

app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, foundGround){
       if (err){
           console.log(err);
       } else {
           res.render("show", {campground: foundGround});
       }
    });
    
})

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    Campground.create(newCampground, function(err, newGround){
       if(err){
           console.log(err);
       } else {
           res.redirect("/campgrounds");
       }
    });
    
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server started (Yelp Camp server)...");
});