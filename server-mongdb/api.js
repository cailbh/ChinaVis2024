/* eslint-disable no-unused-vars */
"use strict";
const models = require('./db');
const express = require('express');
const router = express.Router();
// / 引入文件模块 
const fs = require("fs")
// 获取具体文件
router.get('/api/file/getDoc', (req, res) => {
    let fileName = req.query.fileName;
    // 假设我们的word文档文件就存放在这个doc目录里面
    let docxUrl = `D:/Cailibuhong/chinavis2024/fileData/${fileName}.docx`
  
    // 允许跨域
    res.header("Access-Control-Allow-Origin", "*");
  
    // 设置请求头
    res.writeHead(200, {
      // 指定文件类型为docx
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8',
    })
  
    //创建可读流
    let readStream = fs.createReadStream(docxUrl,{encoding: null})// 默认null})
    // 将读取的结果以管道pipe流的方式返回给前端
    readStream.pipe(res);
  
  })

// 获取文件列表数据
router.get('/api/file/getData', (req, res) => {
    // 通过模型去查找数据库
    models.File.find((err, data) => {
        if (err) {
            res.send(err);
        } else {

            res.send(data);
        }
    });
});

// 获取标签数据
router.get('/api/tag/getData', (req, res) => {
    // 通过模型去查找数据库
    models.Tag.find((err, data) => {
        if (err) {
            res.send(err);
        } else {

            res.send(data);
        }
    });
});
//修改标签选中
router.post('/api/tag/modifyChooseState', (req, res) => {
    let cId = req.body.params.cId;
    models.Tag.updateOne({ isChoose: true }, { $set: { isChoose: false } }).then(result => {
        models.Tag.updateOne({ id: cId }, { $set: { isChoose: true } }).then(result =>
            res.send('createRelsuccessed2')
        ).catch(error => {
            console.error('更新时发生错误:', error);
            res.send(error)
        });//
    }
    ).catch(error => {
        console.error('更新时发生错误:', error);
        res.send(error)
    });
});
module.exports = router;