/**
 * 数据库操作类
 * @return {[type]} [description]
 */
var Util = require("./util");

var mysql = require("mysql");

var util=require("util");

module.exports = function() {
	__constructor();

	/*单条查询*/
	this.findOneById = function(tableName, id, callback) {

	};

	/*插入数据*/
	this.insert = function(tableName, rowInfo, callback) {

	};

	/*修改数据*/
	this.modify = function(tableName, id, rowInfo, callback) {

	}

	/*删除数据*/
	this.remove = function(tableName, id, callback) {

	}

	/*多条查询*/
	this.find = function(tableName, whereJson, orderByJson, limitArr, fieldArr, callback){

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
			console.log("%s 数据库连接成功",dbConfig['dababase']);



		})


		


	}
}