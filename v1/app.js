var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

 var campgrounds = [
    {name: "Salmon Creek", image:"https://www.zionponderosa.com/wp-content/uploads/2017/02/Tent-Camping-1000.jpg"},
    {name: "Granite Hill", image: "https://raftinginfo.com/files/gallery/tent-camping/tent-camping3.jpg"},
    {name: "Mountain Goat's Rest", image: "https://www.switchbacktravel.com/sites/default/files/image_fields/field_imgs_inline/Camping%20Tent%20%28doors%29.jpg"}
];

app.get("/", function(req, res){
   res.render("landing"); 
});

app.get("/campgrounds", function(req, res){
   

    res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res){
   res.render("new.ejs"); 
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server started (yelp camp server)...");
});