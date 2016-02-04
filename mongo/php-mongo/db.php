<?php
//连接mongodb
$mongo = new Mongo();

//选择数据库（不存在会自动创建一个）

$db = $mongo->testdb;

//选择集合（类似关系型数据库中的表）

$collection = $db->testtable;

//添加记录

$obj = array( "title" => "测试", "author" => "FKBlog" );
$collection->insert($obj);

$result = $collection->find();

foreach ($result as $obj) {
	echo $obj["title"] . "\n";
}
?>