var express = require("express");
var app = express();



app.set("view engine", "ejs");

app.get("/", function(req, res){
   res.render("landing"); 
});

app.get("/campgrounds", function(req, res){
    var campgrounds = [
    {name: "Salmon Creek", image:"https://www.zionponderosa.com/wp-content/uploads/2017/02/Tent-Camping-1000.jpg"},
    {name: "Granite Hill", image: "https://raftinginfo.com/files/gallery/tent-camping/tent-camping3.jpg"},
    {name: "Mountain Goat's Rest", image: "https://www.switchbacktravel.com/sites/default/files/image_fields/field_imgs_inline/Camping%20Tent%20%28doors%29.jpg"}
    ];

    res.render("campgrounds", {campgrounds: campgrounds});
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server started (yelp camp server)...");
});