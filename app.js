const express=require('express')
const request=require('request')
const bodyParser=require('body-parser')
const https=require('https')
const app=express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.get('/',function(req,res){
    res.sendFile(__dirname+'/signup.html')
})
app.post('/',function(req,res){
    const firstname=req.body.firstname;
    const lastname=req.body.lastname
    const email=req.body.email
    console.log(firstname+" "+ lastname+" "+email)
    var data={
        members:[
            {
                email_adress:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstname,
                    LNAME:lastname
                }
            }
        ]
    }
    const jsonData=JSON.stringify(data)
    const url="Your url"
    const options={
        method:"POST",
        auth:"YOUR-API-KEY-HERE"
    }

    const request=https.request(url,options,function(response){
        if(response.statusCode==200){
            res.sendFile(__dirname+"/succes.html")
        }else{
            // res.send("their is error")
            res.sendFile(__dirname+"/failure.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data))
        })

    })
    request.write(jsonData)
    request.end()



})
app.listen(3000,function(){
    console.log("server is running on port 3000")
})
// apikey:50200f56eb772a0bd7f9989c95cc844f-us21
// ea69be12bd.
