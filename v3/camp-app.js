var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");
    
var Campground = require("./models/campground");
var seedDB = require("./seeds");
    
mongoose.connect("mongodb://localhost:27017/camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

// SCHEMA SET-UP:



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

//SHOW ROUTE
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundGround){
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