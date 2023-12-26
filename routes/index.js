var express = require('express');
var router = express.Router();

const userModel = require("./users");
const loacalStrategy = require("passport-local");
const passport = require('passport');

passport.use(new loacalStrategy(userModel.authenticate()));
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/error',function(req,res){
  res.render("error");
})
router.get('/profile', isLoggedIn,function(req, res, next) {
  res.render("profile");
});

router.post('/register',function(req,res){
  var userdata = new userModel({
    username: req.body.username,
    secret: req.body.secret
  });
  userModel.register(userdata,req.body.password)
    .then(function(registereduser){
      passport.authenticate("local")(req,res,function(){
        res.redirect('/profile');
      })
    })
})

router.post("/login",passport.authenticate("local",{
  successRedirect: "/profile",
  failureRedirect: "/error"
}),function(req,res){})

router.get("/logout",function(req,res,next){
  req.logout(function(err){
    if(err){
      return next(err);
    }
    res.redirect('/');
  })
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/")
}

// router.get('/failed',function(req,res){
//   req.flash("age",12);
//   res.send("done");
// })
// router.get('/login',function(req,res){
//   //agr login ho jaye toh login ke baad profile page display hoga
//   //else na ho toh is iss route se kisi or route pr le jao jaise ki /error aur vha pr dikhao failed
//   //iske liye flaSH msg use hoga-ek route mbane huye data ko doosre route muse kr skte hn
//   console.log(req.flash("age"));
// })

// router.get("/create",async function(req,res){
//   let userData=await userModel.create({
//     username: "dakshu",
//   nickname: "opksaxsax",
//   description: "he is a boy and he is not that smart",
//   categories: ['fun','lol','table tennis','games']
//   })
//   res.send(userData);
// });

//to handle case insesitive cases
// router.get("/find",async function(req,res){
//   var regex = new RegExp("^SakSham$",'i');
//   let user=await userModel.findOne({username: regex});
//   res.send(user);
// })

//documents with an array field
// router.get("/find",async function(req,res){
//   let user = await userModel.find({
//     categories: {$all:["js"]}
//   });
//   res.send(user);
// })

//filter documents based on the specific date range
// router.get("/find",async function(req,res){
//   var date1 = new Date('2023-12-26');
//   var date2 = new Date('2023-12-27');        //(yyyy-mm-dd)
//   let user = await userModel.find({datecreated: {$gte:date1,$lte:date2}});
//   res.send(user);
// })

//filter based on existence of field
// router.get("/find",async function(req,res){
//   let user = await userModel.find({
//     categories: {$exists: true}
//   });
//   res.send(user);
// })

//filter documents based on a specific feild's length
// router.get("/find",async function(req,res){
//   let user = await userModel.find({
//     $expr: {
//       $and: [
//         {$gte: [{$strLenCP: '$nickname'},0]},
//         {$lte: [{$strLenCP: '$nickname'},10]}
//       ]
//     }
//   });
//   res.send(user);
// })

module.exports = router;
