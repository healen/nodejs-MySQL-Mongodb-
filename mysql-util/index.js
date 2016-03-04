/**
 * 数据库操作类
 * @return {[type]} [description]
 */
var Util = require("./util");

var mysql = require("mysql");

var util=require("util");

var dbClient;

module.exports = function() {
	__constructor();

	/*执行数据库*/
	this.query=function(sql,callback){
		dbClient.query(sql,function(err,result){
			if(err){
				callback("query sql bad error="+err);
			}else{
				callback(result);
			}
		});
	}

	/*单条查询*/
	this.findOneById = function(tableName, idJson, callback) {
		dbClient.query("SELECT * FROM "+tableName+" WHERE ?",idJson,function(err,results){
			if(err){
				callback("findOneById bad error="+err);
			}else{
				results ? callback(results.pop()) : callback(results);
			}
		});
	}




	/*插入数据*/
	this.insert = function(tableName, rowInfo, callback) {
		dbClient.query("INSERT INTO "+tableName+" SET ?",rowInfo,function(err,result){
			if(err){
				callback("insert bad error="+err);
			} else{
				callback("insert success insertId="+result.insertId);

			}
		

		});
	}

	/*修改数据*/
	this.modify = function(tableName, idJson, rowInfo, callback) {
		dbClient.query("UPDATE "+tableName+" SET ? WHERE ?",[rowInfo,idJson],function(err,result){
			if(err){
				callback("update bad error="+err);
			}else{
				callback(result);
			}

		})
	}

	/*删除数据*/

	this.remove = function(tableName, idJson, callback) {
		dbClient.query("DELETE FROM "+tableName+" WHERE ?",idJson,function(err,result){
			if(err){
				callback("remove bad error="+err);
			}else{
				callback("remove success");
			} 
		});

	}

	/*多条查询*/

	this.find = function(tableName,whereSql,orderBy,limitArr,callback){
		// console.log(arguments.length);
		if(arguments.length<3){
			console.log("param err");
			return;
		}

		switch(arguments.length){
			case 3 : 
				dbClient.query("SELECT * FROM "+tableName+" WHERE "+ whereSql,function(err,results){
					if(err){
						orderBy("find bad error="+err);
					}else{
						orderBy(results);
					}
				});
			break;

			case 4 : 
				dbClient.query("SELECT * FROM "+tableName+" WHERE "+ whereSql+" ORDER BY "+orderBy,function(err,results){
					if(err){
						limitArr("find bad error="+err);
					}else{
						limitArr(results);
					}
				});
			break;

			case 5 : 
				dbClient.query("SELECT * FROM "+tableName+" WHERE "+ whereSql+" ORDER BY "+orderBy+" LIMIT "+limitArr[0]+","+limitArr[1],function(err,results){
					if(err){
						callback("find bad error="+err);
					}else{
						callback(results);
					}
				});
			break;

			default:

				console.log("param err");
			

			break;



			

		}

		// if(arguments.length==3){

		// }


		// dbClient.query("SELECT * FROM "+arguments[0]+" WHERE "+arguments[1]+" ORDERBY "+)

	}

	/*初始化创建表脚本*/
	this.init=function(){

	}

	function __constructor() {
		/*解析配置文件*/
		var dbConfig = Util.getJson('config.conf','db');
		var client={}
		client.host=dbConfig['host'];
		client.port=dbConfig['port'];
		client.user=dbConfig['user'];
		client.password=dbConfig['password'];

		dbClient=mysql.createConnection(client);

		dbClient.connect(function(err){
			if(err){
				util.debug("数据库连接失败 "+err);
				return;
			}
		})
		dbClient.query("USE "+dbConfig['dababase'],function(err,results){
			if(err){
				util.debug("执行数据库语句失败 "+err);
				dbClient.end();
				return ;
			}
			console.log("已成功链接到[%s]数据库",dbConfig['dababase']);
		})

		// dbClient.query("select * from node_book where book_id>73",function(err,result){
		// 	if(err){
		// 		console.log(err);
		// 	}else{
		// 		console.log(result);

		// 	}
			
		// })
	}
}