var BaseModel=require("./BaseModel");

var dbConnection=new BaseModel();

// dbConnection.insert("node_book",{
// 	book_name:"《javascript》",
// 	author:"张晓东"
// },function(result){
// 	console.log(result);
// })

// dbConnection.remove("node_book","book_id<76",function(rsult){
// 	console.log(rsult);
// })
// 

// dbConnection.findOneById("node_book"," author=张晓东 ",function(data){
// 	console.log(data);
// })
// 
// 
// 


// dbConnection.query("select * from node_book where book_id>73",function(err,result){
// 	debugger;
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(result);
// 	}

// })
// 

dbConnection.find("node_book","book_id>10","book_id asc",[1,3],function(data){
	console.log(data);
});


