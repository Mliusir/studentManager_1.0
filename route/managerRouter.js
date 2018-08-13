const express = require('express');

const svgCaptcha = require('svg-captcha');

let router = express.Router();

const helper = require('../tools/helper');

const path = require('path');

router.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'../template/login.html'));
});

router.post('/login',(req,res)=>{
    //res.send(req.session.captcha);
    //获取数据 表单数据
    let userName = req.body.userName;
    let userPass = req.body.userPass;
    let vCode = req.body.vCode; 

    if(vCode==req.session.captcha){
        helper.find('admin',{userName,userPass},(result)=>{
            if(result.length!=0){
                res.redirect('/student/index');
            }else{
                helper.tips(res,'账号或密码错误','/manager/login');
            }
        })
    }else{
        helper.tips(res,'验证码错误','/manager/login');
    }
});


router.get('/register',(req,res)=>{
    res.sendFile(path.join(__dirname,'../template/register.html'));
});

router.post('/register',(req,res)=>{
    let userName = req.body.userName;
    let userPass = req.body.userPass;
    helper.find('admin',{userName},(result)=>{
        if(result.length==0){
            helper.insertOne('admin',{userName,userPass},(result)=>{
                if(result.n==1){
                    helper.tips(res,'注册成功','/manager/login')
                }
            })
        }else{
            helper.tips(res,'已被注册','/manager/register')
        }
    })
});

router.get('/vcode', function (req, res) {
    var captcha = svgCaptcha.create();
    req.session.captcha = captcha.text;
    res.type('svg');
	res.status(200).send(captcha.data);
}); 

module.exports = router;