var MysqlUtil=require("../mysql-util");
var cryptos=require("../modules/encryption");

var Db=new MysqlUtil();



Db.find("admin","login_name='admin'",function(results){
	// console.log(results);
	if(results.length==0){
		Db.insert("admin",{login_name:"admin",password:cryptos.encryption("88888888","md5")});
	}else{
		console.log("初始化已完成，请登录");
	}

})
