// Schema、Model、Entity或者Documents的关系:Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose');
// 连接数据库 
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/FMS');

// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error', () => console.log('Mongo connection error'));
db.once('open', () => console.log('Mongo connection successed'));
/************** 定义模式Schema **************/
const tagsSchema = mongoose.Schema({
    id:String,//序号
    isChoose:Boolean,//是否选中
    fields:Array,//领域标签
    subF:Array,//具体的标签已经标签父子关系
});
const filesSchema = mongoose.Schema({
    name:String,//标题
    content:String,//内容
    fileName:String,//文件名
});
const caseRelSchema = mongoose.Schema({
});

/************** 定义模型Model **************/
const Models = {
    Tag: mongoose.model('Tags', tagsSchema,'tags'),
    File: mongoose.model('files', tagsSchema,'Files'),
}

module.exports = Models;
