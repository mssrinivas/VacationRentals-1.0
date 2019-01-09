const cors = require('cors');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var validator = require('express-validator');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
var mysql = require('mysql');
let fs = require("fs");
const multer = require("multer")


const bcrypt = require('bcrypt');
const saltRounds = 10;


app.use(session({
    secret              : 'shim!^^#&&@is@**#*(awesome',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

app.use(bodyParser.json());


var placename= '';
var	startdate_user = '';
var enddate_user  = '';
var adultlist = 0;
var childlist = 0;
var Max_ID = -1;


var con = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  password: "Audigger",
  database: "HomeAway"
});
/*
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Audigger",
    database : "HomeAway"
});*/


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });


app.post('/login',function(req,res){
    //console.log("Inside Login Post Request");
    con.getConnection(function(err) {
        if (err) 
            throw err;
           // console.log("Connected!");
            var username = req.body.username;
            var password = req.body.password;
            var sql = "SELECT password FROM UserDetails WHERE username = " + 
                      mysql.escape(username) + " and traveller = 1" ;
            //console.log(sql);
            con.query(sql,function(err,result){
            if(err){
                //  console.log("Failed here " + sql)
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Invalid Credentials");
              }
              else{
                   if(result[0] != null){
                     bcrypt.compare(req.body.password,result[0].password, function(err, answer) { 
                       // console.log("answer is " +  JSON.stringify(answer))
                        if(answer){   
                        res.cookie('cookie',req.body.username,{maxAge: 9000000, httpOnly: false, path : '/'});
                        req.session.user = result;
                        console.log("Successfully retrieving User")
                        console.log("Username is "+ JSON.stringify(username))
                         res.status(200).send(JSON.stringify(username));
                         res.end("Successful Login");
                       }//if
                     else
                     {
                        console.log("Failed here " + sql)
                        res.writeHead(400,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end("Invalid Credentials");
                     }

                   })//bcrypt
               }//bigif
          else
           {
              console.log("Failed here " + sql)
              res.writeHead(400,{
                  'Content-Type' : 'text/plain'
              })
              res.end("Invalid Credentials");
             }
          } //else
        });
    });//comm
});//app

app.post('/owner/login',function(req,res){
    console.log("Inside Login Post Request");
    con.getConnection(function(err) {
        if (err) 
            throw err;
          console.log("Connected!");
          var username = req.body.username;
          var password = req.body.password;
          var sql = "SELECT password FROM UserDetails WHERE username = " + 
                    mysql.escape(username)+ " and owner = 1" ;
          //console.log("Owner Login Query \n" + sql);
          con.query(sql,function(err,result){
              if(err){
                    console.log("Failed here " + sql)
                      res.writeHead(400,{
                          'Content-Type' : 'text/plain'
                      })
                      res.end("Invalid Credentials");
              }
              else{
                   if(result[0] != null){
                      bcrypt.compare(req.body.password,result[0].password, function(err, answer) { 
                      //console.log("answer is " +  JSON.stringify(answer))
                      if(answer){   
                      res.cookie('cookieowner',req.body.username,{maxAge: 9000000, httpOnly: false, path : '/'});
                      req.session.user = result;
                      console.log("Successfully retrieving Owner")
                      console.log("Owner Username is "+ JSON.stringify(username))
                       res.status(200).send(JSON.stringify(username));
                       res.end("Successful Login");
                   }//if
                   else
                   {
                      console.log("Failed here " + sql)
                      res.writeHead(400,{
                          'Content-Type' : 'text/plain'
                      })
                      res.end("Invalid Credentials");
                    } //else
                   })//bcrypt
               }//bigif
               else
               {
                    console.log("Failed here " + sql)
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Invalid Credentials");
               }
          } //else
        });
    });//comm
});//app


app.post('/traveller/signup',function(req,res){
    console.log("Inside Login Post Request");
    con.getConnection(function(err) {
        if (err) 
            throw err;
    console.log("Connected!");
    var hashed_password = '';

bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
  hashed_password = hash;
        var username = req.body.username;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var email = req.body.email;
        console.log("Hashed password = " + hashed_password)
       var sqlone =
    "insert into  HomeAway.UserDetails (username,password,firstname,lastname,traveller,email) values ( " +
    mysql.escape(username) +
    " , " +
    mysql.escape(hashed_password) +
    " , " +
    mysql.escape(firstname) +
    " , " +
    mysql.escape(lastname) + 
    " , " + 
    `1` +
    " , " +
    mysql.escape(email) + 
    " ) " ;

    console.log(sqlone);
        con.query(sqlone,function(err,result){
            if(err){
                   console.log(sqlone);
                res.writeHead(400,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Invalid Credentials");
            }
            else{
                 var sqltwo = "SELECT *  FROM UserDetails WHERE username = " + 
                mysql.escape(username) + " and password = " + mysql.escape(hashed_password);
             con.query(sqltwo,function(err,result){
            console.log(sqltwo)
            if(err){
                console.log(sqltwo);
                res.writeHead(400,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Invalid Credentials");
            }else{
                res.cookie('cookie',req.body.username,{maxAge: 9000000, httpOnly: false, path : '/'});
                req.session.user = result[0];
                console.log("YES iNSETRTED")
                console.log(JSON.stringify(result))
                 res.status(200).send(JSON.stringify(result[0].username));
                 res.end("Successful Login");
                 console.log(JSON.stringify(res.cookie));
            }
        });
            }
        });
          })// end of bcrypt
    });
});

app.post('/owner/signup',function(req,res){
   console.log("Inside Login Post Request");
    con.getConnection(function(err) {
        if (err) 
            throw err;
    console.log("Connected!");

var hashed_password = '';

bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        hashed_password = hash;
        var username = req.body.username;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var email = req.body.email;
        var sqlone =
    "insert into  HomeAway.UserDetails (username,password,firstname,lastname,owner,email) values ( " +
    mysql.escape(username) +
    " , " +
    mysql.escape(hashed_password) +
    " , " +
    mysql.escape(firstname) +
    " , " +
     mysql.escape(lastname) + 
    " , " + 
    `1` +
     " , " +
    mysql.escape(email) + 
    " ) " ;
    console.log("--------------------------------------------------");
    console.log("Signing Up Query is \n" + sqlone);
    console.log("--------------------------------------------------");
        con.query(sqlone,function(err,result){
            if(err){
                   console.log(sqlone);
                res.writeHead(400,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Invalid Credentials");
            }else{
                 var sqltwo = "SELECT *  FROM UserDetails WHERE username = " + 
                mysql.escape(username) + "and password = " + mysql.escape(hashed_password);
        con.query(sqltwo,function(err,result){
            console.log(sqltwo)
            if(err){
                console.log(sqltwo);
                res.writeHead(400,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Invalid Credentials");
            }else{
                res.cookie('cookieowner',req.body.username,{maxAge: 9000000, httpOnly: false, path : '/'});
                req.session.user = result[0];
                console.log("YES iNSETRTED")
                console.log(JSON.stringify(result))
                 res.status(200).send(JSON.stringify(result[0].username));
                 res.end("Successful Login");
                 console.log(JSON.stringify(res.cookie));
            }
        });
            }
        });
    });
})//end of bcrypt
});


app.get('/placefilters', function(req,res){
  //console.log("VALUES ARE : " + placename + startdate_user + adultlist + childlist)
		res.send({'placename': placename, 'startdate' : startdate_user ,'enddate' : enddate_user , 'adultlist' : adultlist, 'childlist' : childlist})
	});



app.get("/user/account/:id", function(req, res) {
  var sql =
    "select * FROM UserDetails where username = " +
    mysql.escape(req.params.id);
    console.log(sql)
  con.query(sql, function(err, result) {
    if (err) {

      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Error while retrieving User Account");
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify(result));
      console.log(JSON.stringify(result));
      console.log("JSON.stringify(result)", JSON.stringify(result));
    }
  });
});

app.get("/getmaxpropertyid" , function(req,res) {
var sql = "select max(id) as maximumID FROM Property";
con.query(sql, function(err, result) {
    if (err) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Error while retrieving User Account");
    } 
    else {
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      Max_ID = result[0].maximumID + 1
    }

  });
});

app.post("/postproperty", function(req, res) {
  //console.log(req.body);
          var startDate = req.body.startdate
          var endDate = req.body.enddate
          let insertQuery =
            "INSERT INTO homeaway.property (`id`, `bed`, `bath`, `country`, `address`, `unit`, `city`, `state`,`zip`,`name`,`description`,`type`,`maxadults`, `maxchild`, `currencytype`,`rate`,`minstay`,`startdate`,`enddate`) VALUES ('" +
            Max_ID +
            "', '" +
            req.body.Bedrooms +
            "', '" +
            req.body.Bathroom +
            "', '" +
            req.body.Country +
            "', '" +
            req.body.StreetAddress +
            "', '" +
            req.body.Suite +
            "', '" +
            req.body.City +
            "', '" +
            req.body.State +
            "', '" +
            req.body.ZipCode+
            "', '" +
            req.body.Headline +
            "', '" +
            req.body.PropertyDescription +
            "', '" +
            req.body.PropertyType +
            "', '" +
            req.body.MaxAdult +
            "', '" +
            req.body.MaxChild +
            "', '" +
            req.body.Currency +
            "', '" +
            req.body.NightCharge +
            "', '" +
            req.body.MinimumStay + 
            "', '" +
            startDate +
            "', '" +
            endDate +
            "')";

            console.log("--------------------------------------------------");
            console.log("Posting a Property Query \n" +  insertQuery)
            console.log("--------------------------------------------------");

                  con.query(insertQuery, function(err, result) {
                          if (err) {
                            console.log("insert", insertQuery);
                            res.writeHead(400, {
                              "Content-Type": "text/plain"
                            });
                            res.end("Error in Posting property.");
                    } //if done

                   else {
                          console.log("property inserted in property table");
                          let insertPropListQuery =
                            "INSERT INTO homeaway.ownerListings(`username`,`prop_id`,`startdate`,`enddate`) VALUES ('" +
                            req.body.username +
                            "', '" +
                            Max_ID +
                            "', '" +
                            startDate +
                            "', '" +
                            endDate +
                            "')";
                          con.query(insertPropListQuery, function(err, result) {
                            if (err) {
                              console.log(insertPropListQuery);
                              res.writeHead(400, {
                                "Content-Type": "text/plain"
                              });
                              res.end("Error in Posting property.");
                            } //if done 
                            else {
                              res.status(200).send({ message: "property Listed successfully!" });
                            }
                            }); // 3 query
                  }// else done
                }); // 2 Query
}); // final END


app.put("/editprofile/save/:id", function(req, res) {
  //console.log("req.session.user", JSON.stringify(req.body));
  var username = req.params.id;
  let insertQuery =
    "UPDATE UserDetails SET aboutme =" + '"' + req.body.aboutme + '"' +  "," +
     "company =" + '"' + req.body.company + '"' + "," +
     "school =" + '"' + req.body.school + '"' + "," +
     "hometown =" + '"' + req.body.hometown + '"' + "," +
     "language =" + '"' + req.body.language + '"' + "," +
     "gender =" + '"' + req.body.gender + '"' + "," +
     "state =" + '"' + req.body.state + '"' + "," +
     "country =" + '"' + req.body.country + '"' + "," +
     "contact =" + '"' + req.body.contact + '"' + "," +
     "address =" + '"' + req.body.address + '"' +
    " WHERE username = " + '"' + username + '"' + ";"
    console.log("--------------------------------------------------");
    console.log("User Information Update Query : \n" + insertQuery)
    console.log("--------------------------------------------------");
  con.query(insertQuery, function(err, result) {
    if (err) {
      //console.log("insert query is =", insertQuery);
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Error in Posting property.");
    } else {
      res.status(200).send({ message: "property Listed successfully!" });
    }
  });
});


app.post("/book/property", function(req, res) {
  console.log(req.body);
  var id = req.body.property_id
  var name = req.body.username
  var startDate = req.body.startdate;
  var endDate = req.body.enddate;

  if (true) {
    let insertQuery =
      "INSERT INTO TravellerBookings (`prop_id`, `username`, `startdate`, `enddate`) VALUES ('" +
      id +
      "', '" +
      name +
      "', '" +
      startDate +
      "', '" +
      endDate +
      "')";
      console.log(insertQuery)
      if(req.body.startdate === '' || req.body.enddate === '')
      {
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in Booking property.");
      }
      else
      {
    con.query(insertQuery, function(err, result) {
      if (err) {
        console.log("Came here");
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in Booking property.");
      } else {
        console.log("Add Successful")
        res.status(200).send({ message: "property booked successfully!" });
      }
    });
    }
  } else {
    res.statusMessage  = "invalid session";
    res.status(401).end();
  }
});


var storagePropFiles = multer.diskStorage({
  destination: function(req, file, callback) {
  // console.log("req.session.user is", JSON.stringify(req.params));
    callback(null, createDirectory(Max_ID));
  },
  filename: function(req, file, callback) {
   // console.log("req", req.body);
    callback(null, file.originalname);
  }
});

var rootDirectory = "images/";

var uploadPropFiles = multer({
  storage: storagePropFiles
});

function createDirectory(Max_ID) {
  if (!fs.existsSync(rootDirectory)) {
    fs.mkdirSync(rootDirectory);
  }
  let directory = rootDirectory + Max_ID;
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
  return directory;
}

app.post("/upload-files/", uploadPropFiles.any(), function(req, res, next) {
});


app.post("/getPropertyImg", function(req, res, next) {
 // console.log("image body for selected img", req.body);
  var filter = ".png";

  var startPath =
    "/Users/local/Desktop/273/React/HomeAway/Backend/images/" +
    req.body.id;
  if (req.body.id) {
    var results = [];
    var files = fs.readdirSync(startPath);
    //console.log("files", files);

   // console.log(files.length);
if(files.length) {
      files.forEach(async function(file) {
       // console.log("files in download", file);
        fs.readFile(
          "/Users/local/Desktop/273/React/HomeAway/Backend/images/" +
            req.body.id +
            "/" +
            file,
          await function(err, content) {
           // console.log("###img:", content);
           // console.log("###filename:", file);
            if (err) {
              res.writeHead(400, { "Content-type": "text/html" });
              console.log(err);
              res.end("No such image");
            } else {
              //specify the content type in the response will be an image
              let base64Image = new Buffer(content, "binary").toString(
                "base64"
              );
              results.push(base64Image);
             // console.log("###image in node", results.length);
              //console.log("results in download", results.length);
              if (results.length === files.length) {
              //  console.log("final result", results.length);
                res.status(200).send({ results });
              }
            }//else
          }//await
        );
      });
    }}});


app.get('/places', (req,res) => { 
let selectQuery = "SELECT * from homeaway.property where city ="  + '"' + placename + '"' + " and maxadults >= " + adultlist + " and maxchild >= " + childlist + " and " + '"' + startdate_user + '"' + " between startdate and enddate and " + '"' + startdate_user + '"'  +" <= " + '"' + enddate_user + '"' + " and "+ '"' + enddate_user + '"' + " between startdate and enddate and " + '"' + enddate_user + '"'  + " >= " + '"' + startdate_user + '"' + " and id not in ( select distinct(prop_id) from HomeAway.TravellerBookings where " + '"' + startdate_user + '"' + " between  startdate and enddate || " + '"' + enddate_user + '"' + " between startdate and enddate or startdate between " + '"' +  startdate_user + '"' +  " and " + '"' + enddate_user + '"' + " or enddate between " + '"' +  startdate_user + '"' +  " and " + '"' + enddate_user + '"' + ");"
  //  console.log("GET  IS " + selectQuery)
  con.query(selectQuery, function(err, result) {
    if (err) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Error in Posting property.");
    } else {
      //  console.log(JSON.stringify(result));
      res.status(200).send(JSON.stringify(result));
    }
  });
});


app.post('/places', (req,res) => {
    placename = req.body.placename
    startdate_user =  req.body.startdate
    enddate_user =  req.body.enddate 
    adultlist =  req.body.adultlist
    childlist =  req.body.childlist
    console.log("--------------------------------------------------");
    let selectQuery = "SELECT * from homeaway.property where city ="  + '"' + req.body.placename + '"' + " and maxadults >= " + req.body.adultlist + " and maxchild >= " + req.body.childlist + " and " + '"' + startdate_user + '"' + " between startdate and enddate and " + '"' + startdate_user + '"'  +" <= " + '"' + enddate_user + '"' + " and "+ '"' + enddate_user + '"' + " between startdate and enddate and " + '"' + enddate_user + '"'  + " >= " + '"' + startdate_user + '"' + " and id not in ( select distinct(prop_id) from HomeAway.TravellerBookings where " + '"' + startdate_user + '"' + " between  startdate and enddate || " + '"' + enddate_user + '"' + " between startdate and enddate or startdate between " + '"' +  startdate_user + '"' +  " and " + '"' + enddate_user + '"' + " or enddate between " + '"' +  startdate_user + '"' +  " and " + '"' + enddate_user + '"' + ");"
    console.log("Place Search Query is \n\n" + selectQuery )
    console.log("--------------------------------------------------");
      con.query(selectQuery, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          res.end("Error in Posting property.");
        } else {
          console.log("--------------------------------------------------");
          console.log("Places Fetched from Database \n\n" , JSON.stringify(result));
          console.log("--------------------------------------------------");
          res.status(200).send(JSON.stringify(result));
        }
      });
})

app.get('/places/propertydescription/:id', (req,res) => {
   console.log("--------------------------------------------------");
    let selectQuery =
    "SELECT * from Property where id=" +
    mysql.escape(req.params.id);
    console.log("Query hit for Property Description" + selectQuery);
     console.log("--------------------------------------------------");
    con.query(selectQuery, function(err, result) {
      if (err) {
      	console.log(err)
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Error in Listing Property Details.");
      } else {
      //	console.log("CALLED")
       console.log("--------------------------------------------------");
       console.log(JSON.stringify(result))
       console.log("--------------------------------------------------");
        res.status(200).send(JSON.stringify(result));
      }
    });
})

app.get("/tripsboard/:id", function(req, res) {
  let selectQuery =
    "SELECT prop_id from TravellerBookings where username=" +
    mysql.escape(req.params.id) +
    " order by startdate desc LIMIT 2";
     console.log("--------------------------------------------------");
     console.log("Place Search Query is \n\n" + selectQuery )
     console.log("--------------------------------------------------");
    con.query(selectQuery, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          console.log(selectQuery);
        res.end("Error in fetching latest properties");
          } 
          else 
          {
             // console.log(result.length)
              if(result.length === 0)
              {
                res.status(200).send(JSON.stringify(result));
              }
              if(result.length === 1)
              {
                var prop_id = [result[0].prop_id];
                  let selectQuery =
                    "SELECT  * from Property where id in (" +
                    prop_id[0] +  
                    ")";
                    con.query(selectQuery, function(err, result) {
                 //   console.log("Fault" + selectQuery);
                        if (err) {
                          res.writeHead(400, {
                            "Content-Type": "text/plain"
                          });
                          res.end("Error in fetching latest properties");
                        } else {
                         console.log("--------------------------------------------------");
                         console.log("Properties Fetched \n\n" + JSON.stringify(result))
                         console.log("--------------------------------------------------");
                          res.status(200).send(JSON.stringify(result));
                        }
                    });
            }
            if(result.length === 2)
            {
                var prop_id = [result[0].prop_id, result[1].prop_id];
                console.log(prop_id);
                let selectQuery =
                  "SELECT  * from Property where id in (" +
                  prop_id[0] +
                  "," +
                  prop_id[1] +
                  ")";
                  con.query(selectQuery, function(err, result) {
                      //console.log("Fault" + selectQuery);
                      if (err) {
                        res.writeHead(400, {
                          "Content-Type": "text/plain"
                        });
                        res.end("Error in fetching latest properties");
                      } else {
                        console.log("RESPONSE IS" + JSON.stringify(result))
                        res.status(200).send(JSON.stringify(result));
                      }
                  });
            }
           }
    });
});

app.get("/allpropertylisting/:id", function(req, res) {
      let selectQuery =
        "SELECT  * from Property where id in (" +
        "SELECT  prop_id from OwnerListings where username=" +
        mysql.escape(req.params.id) +
        ")";
        console.log("--------------------------------------------------");
        console.log("Query hit is "+selectQuery)
        console.log("--------------------------------------------------");
         con.query(selectQuery, function(err, result) {
            if (err) {
              console.log(selectQuery);
              res.writeHead(400, {
                "Content-Type": "text/plain"
              });
              res.end("Error in fetching owner properties");
            } else {
              res.status(200).send(JSON.stringify(result));
            }
      });
});

app.get("/mypropertylistings/:id", function(req, res) {
  let selectQuery =
    "SELECT  prop_id from OwnerListings where username=" +
    mysql.escape(req.params.id) +
    " order by startdate desc LIMIT 2";
    console.log("--------------------------------------------------");
    console.log("Place Search Query is \n\n" + selectQuery )
    console.log("--------------------------------------------------");
    con.query(selectQuery, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          console.log(selectQuery);
          res.end("Error in fetching latest properties");
         } 
        else 
        {
          console.log(result.length)
            if(result.length === 0)
            {
              res.status(200).send(JSON.stringify(result));
            }
            if(result.length === 1)
            {
              var prop_id = [result[0].prop_id];
               // console.log(prop_id);
                let selectQuery =
                "SELECT  * from Property where id in (" +
                prop_id[0] +  
                ")";
                con.query(selectQuery, function(err, result) {
                   // console.log("Fault" + selectQuery);
                      if (err) {
                        res.writeHead(400, {
                          "Content-Type": "text/plain"
                        });
                        res.end("Error in fetching latest properties");
                      } else {
                        console.log("--------------------------------------------------");
                        console.log("Fetching Properties \n " + JSON.stringify(result))
                        console.log("--------------------------------------------------");
                        res.status(200).send(JSON.stringify(result));
                      }
                  });
          }
          if(result.length === 2)
          {
              var prop_id = [result[0].prop_id, result[1].prop_id];
              console.log(prop_id);
              let selectQuery =
              "SELECT  * from Property where id in (" +
              prop_id[0] +
              "," +
              prop_id[1] +
              ")";
                con.query(selectQuery, function(err, result) {
                   // console.log("Fault" + selectQuery);
                    if (err) {
                      res.writeHead(400, {
                        "Content-Type": "text/plain"
                      });
                      res.end("Error in fetching latest properties");
                    } else {
                      console.log("--------------------------------------------------");
                      console.log("Fetching Properties \n " + JSON.stringify(result))
                      console.log("--------------------------------------------------");
                      res.status(200).send(JSON.stringify(result));
                    }
                });
           }
         }
  });
});

app.listen(4004, () => {
	console.log("Listening on port 4004")
})

