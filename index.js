import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { publicDecrypt } from "crypto";

const app=express();
const port=3000;
const API_URL="https://pokeapi.co/api/v2/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res) =>{
    res.render("index.ejs");
});

app.post("/get/:type", async(req,res) =>{
    const user= req.body.username;
    // console.log(user);
    const type=req.params.type;
    // console.log(type);
    try {
        const result= await axios.get(API_URL+"type/"+type);
        const randomIndex=(Math.floor(Math.random()*result.data.pokemon.length));
        console.log(randomIndex);
        const pokemonName=result.data.pokemon[randomIndex].pokemon.name;

        const pokemon=await axios.get(API_URL+"pokemon/"+pokemonName);
        // console.log(JSON.stringify(pokemon.data));
        let name=pokemon.data.name;
        name=name.charAt(0).toUpperCase()+name.slice(1);
        const image=pokemon.data.sprites.other.home.front_default;
        const id=pokemon.data.id;
        const types=pokemon.data.types;
        const height=pokemon.data.height;
        const weight=pokemon.data.weight;
        const abilities=pokemon.data.abilities;
        // const bio= {
        //     name: name,
        //     image: image,
        //     types: types,
        //     height: height,
        //     weight: weight,
        //     abilities: abilities,
        // }
        // console.log(bio);
        res.render("index.ejs",{user: user,name:name,image:image,id: id,types: types,height: height, weight: weight, abilities: abilities});
        // console.log(pokemonURL);
        
        // console.log(JSON.stringify(result.data.pokemon[randomIndex]));
    } catch (error) {
        console.error(error.message);
    }
    
});


app.listen(port,()=> {
    console.log(`Server running on port ${port}`);
})