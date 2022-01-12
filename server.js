const express = require("express")
const connectDB = require("./config/connectDB")
const Person = require("./model/Person")

const app = express()

app.use(express.json())

require("dotenv").config()

connectDB()

const PORT = process.env.PORT

//Create and Save a Record of a Model

const person = new Person(
    {
        name:'mariem',
        age:'26',
        favoriteFoods:["sushi", "pizza"]}
    )
person.save((err,data)=>{
    if (err){
        console.log(err)
    }else{
        console.log(data)
    }
})

//Create Many Records with model.create()

const arrayOfPeople=[
    {name:"ghofrane", age:21, favoriteFoods:["tacos", "pancake"]},
    {name:"dorra", age:25, favoriteFoods:["crêpes", "paella"]},
    {name:"sarra", age: 22, favoriteFoods:["pizza", "risotto"]}
];

Person.create(arrayOfPeople,(err,data)=>{
    if(err){
        console.log(err)
    }else{
        console.log(data)
    }
})

//Use model.find() to Search Your Database

Person.find({name:"mariem"},(err,data)=>{
    if(err){
        console.log(err)
    }else{
        console.log(data)
    }
})

  //Use model.findOne() to Return a Single Matching Document from Your Database

Person.findOne(({"favorite Foods":"risotto"}),(err,data)=>{

    if(err){
        console.log(er)
    }else{
        console.log(data)
    }
})

//Use model.findById() to Search Your Database By _id
const personId = "61de9e41dd56c9d6082b398b";
Person.findById(personId,function(err,data){
    if(err){
        console.log(err)
    }else{
        console.log(data)
    }
})

//Perform Classic Updates by Running Find, Edit, then Save
Person.findById(personId).then((person) => {
    person.favoriteFoods.push("humberger");
    person.save();
});

//Perform New Updates on a Document Using model.findOneAndUpdate()

const personName = "dorra";
Person.findOneAndUpdate({name: personName},{$set:  {age:27 }},{ new: true },(err,data)=>{
    if(err){
        console.log(err)
    }else{
        console.log(data)
    }
})

// Delete One Document Using model.findByIdAndRemove

Person.findByIdAndRemove(personId,(err,data)=>{
    if(err){
        console.log(err)
    }else{
        console.log(data)
    }
})

//Delete Many Documents with model.remove()

Person.remove({name:"sarra"}, (err,data)=>{
    if(err){
        console.log(err)
    }else{
        console.log(data)
    }
})

//Chain Search Query Helpers to Narrow Search Results

const queryChain = (done) =>{
    Person.find({favoriteFoods:"pizza"})
    .sort({name: 1})
    .limit(2).select("-age")
    .exec((err,data)=>{
        if(err){
            console.log(err)
        }else{
            console.log(data)
        }
})
}

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`this server is running on ${PORT}`)
})



