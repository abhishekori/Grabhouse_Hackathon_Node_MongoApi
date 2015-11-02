

 var express=require('express');
 var app = express();
 var cors = require('cors');
 app.use(cors());

var mongojs = require('mongojs');
 var db =mongojs('grab',['prop','comments','users','keys']);
 
 var bodyParser = require('body-parser');
var jsonParser=bodyParser.json();


var urlencodedParser = bodyParser.urlencoded({ extended: false })




app.post('/insert_comment', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)

  db.comments.insert({"username":req.body.username,"comments":req.body.comment});

res.send(req.body.username +" "+ req.body.comment+" inserted");
})

app.post('/get_prop',urlencodedParser,function(req,res){
	
	db.prop.find(function(err,docs){

		console.log(docs);

		res.json(docs);
	});
});

app.post('/sign_in',urlencodedParser,function (req,res) {

	if(!req.body) return res.sendStatus(400);

	db.users.find({username:req.body.fname,pass:req.body.pass},function  (err,docs) {

		res.json(docs);
		// body...
	});


	// body...
});

app.post('/rqst_key',urlencodedParser,function(req,res){
	if(!req.body) return res.sendStatus(400);

	db.keys.find({"fbname":req.body.fbname,"fbid":req.body.fbid,"link":req.body.fblink,"house_id":req.body.house_id},function(err,docs){
		console.log(docs.length);
		if(docs.length==0){
			db.keys.insert({"fbname":req.body.fbname,"fbid":req.body.fbid,"link":req.body.fblink,"house_id":req.body.house_id});
	res.json({"res":"key has been requested"});

		}else{
			res.send("key has already been requested ");
		}
	})

	

})

app.post('/get_rqsts',urlencodedParser,function(req,res){
	//res.send("enetered");
	db.users.find(function(err,docs){

		console.log(docs[0].house_id);
		
		db.keys.find({"house_id":docs[0].house_id},function(err,docsa){
			console.log(docsa[0]);
			res.json(docsa[0]);

		})
			


	})
	


});


app.post('/grant',urlencodedParser,function(req,res){

	db.users.find(function(err,docs){

		console.log(docs[0].house_id);


		
		db.keys.update({"house_id":docs[0].house_id},{$set:{"passcode":Math.round((Math.random()*10000)+1)}},function(err,docsa){
			res.send("granted");

		})
			


	})
})

app.post('/get_passcode',urlencodedParser,function(req,res){

	db.keys.find({"house_id":"5634c8af059a68dd0bbc235a"},function(err,docs){
		res.json(docs);
	});
});
app.listen(3000);

 console.log("Server running");