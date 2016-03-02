var mongodb=require("mongodb");

var server = new mongodb.Server("localhost",27017,{auto_reconnect:true});

var db=new mongodb.Db("node_test",server,{safe:true});




db.open(function(err,db){
	if(err){
		console.log(err);
		return;
	}
	console.log("数据库创建成功！");
	db.createCollection("mycollection",function(err,collection){
		if(err){
			console.log(err);
			return;
		}

		collection.insert({hello:"world"},{safe:true},function(err,objects){
			if(err){
				console.log(err);
				return;
			}
			console.log(objects);

		})

	})
})



