var mysql = require("mysql");
var Connnection = mysql.createConnection({
	host:"localhost",
	user:"root",
	database:"test",
	port:3306,
	password:"123456"
});

Connnection.connect(function(err){
	if(err){
		console.log(err);
		return;
	}
	console.log("数据库连接成功");
});



Connnection.query("INSERT INTO admin set ?",{name:"healen",gender:"男",date:new Date()},function(err,result){
	if(err){
		console.log(err);
		return;
	}
	console.log(result);
})


Connnection.query("SELECT * FROM admin",function(err,rows){
	if(err){
		console.log(err);
		return;
	}
	console.log(rows);
});

Connnection.query("UPDATE admin SET name='ss' WHERE name='healen'",function(err,result){
	if(err){
		console.log(err);
		return;
	}
	console.log(result);
})




Connnection.query("DELETE FROM admin WHERE uid=1",function(err,reulst){
	if(err){
		console.log(err);
		return;
	}else{
		console.log(reulst);
	}
})



























Connnection.end(function(err){
	if(err){
		console.log(err);
		return;
	}
	console.log("数据库关闭");
});





