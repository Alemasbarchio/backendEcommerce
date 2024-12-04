import express from "express";

import { createProduct } from "../services/product.service.js";
import axios from "axios";

const populateRouter = express.Router();


async function populateImages(){
  let imagens = [];
  for (let i = 0; i <= 20; i++){
    const url = await axios.get('https://api.unsplash.com/photos/random', {
      headers: {
        Authorization: 'Client-ID pli0nlPtnUSbi-px540rTx8DDBq-0fqB8M1vsbk2pIo'
      }
    })  
      imagens[i] = url.data.urls.thumb
    }
    return imagens;
  }

//populateDB
const populateDB = async () => {
  console.log("entrei no poplate");
  const adjectives = ["Tenis", "Camiseta", "Moletom", "Relogio", "Colar"];
  const nouns = ["Nike", "Adidas", "Puma", "Perolas", "Apple"];
  let imagens = await populateImages()

 
  function getRandomTitle() {
    const randomAdjective =
      adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomAdjective} ${randomNoun}`;
  }

  function getRandomDescription() {
    const description = [
      "Grande",
      "Pequeno",
      "XL",
      "Large",
      "Azul",
      "Roxo",
      "Fussia",
      "Laranja",
    ];
    const getRandomDescription =
      description[Math.floor(Math.random() * description.length)];

    return `${getRandomDescription}`;
  }

  let product = {};
  
  for (let i = 0; i <= 20; i++) {
    const title = getRandomTitle();
    product = {
      title: title,
      description: `${title},${getRandomDescription()}`,
      code: `P${i + Math.floor(Math.random() * i + 1)}`,
      price: `${i * 13 + 2}`,
      stock: `${i * 16 + 6}`,
      thumbmail:`${imagens[i]}` 
    };


    try {
      await createProduct(product);
      console.log(`Produto criado com sucesso: ${product}`);
    } catch (error) {
      console.log(error);
    }
  }
};

populateRouter.get("/", async (req, res) => {
  console.log("entrei no get");
  await populateDB();
 //await populateImages();
  console.log("sai do get");
  res.render("index");
});

export { populateRouter };
