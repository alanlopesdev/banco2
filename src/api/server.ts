// Importa o Express e o CORS
import express from "express";
import cors from "cors";

import { db } from '../db/index'
import { usersTable } from "../db/schema";
import { eq } from 'drizzle-orm'


const app = express();

const port = 3000;

// --- Middlewares ---
// Habilita o CORS para permitir requisições de outras origens (seu app React Native)
app.use(cors());
// Habilita o parsing de JSON no corpo das requisições
app.use(express.json());



app.get("/", (req, res) => {
  res.status(200).send({ message: "API está funcionando corretamente!" });
});


app.get("/users", async (req, res) => {
    try {
      
      const users = await db.select().from(usersTable);
      res.status(200).json(users);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      res.status(500).json({ message: "Ocorreu um erro no servidor." });
    }
  });
  

app.get("/login/:cpf/", async (req, res) =>{
  try {
  let cpf = req.params.cpf
  const user = await db.select().from(usersTable).where(eq(usersTable.cpf, cpf))
  res.status(200).json(user)
  }
  catch(err){
    console.log(err)
    res.status(500).json({message:"erro"})
  }
})


app.post("/login", async (req, res) =>{
  try{
  const dados = req.body
  console.log(dados)
  const user = await db.select().from(usersTable).where(eq(usersTable.cpf, `${dados.cpfPost}`))
  if (dados.cpfPost === user[0].cpf && dados.senhaPost === user[0].senha){
    res.status(200).json({ condi: true,
      dadosUser:{name : user[0].name,
        saldo: user[0].saldo,
      }
    })
  }}
  catch(err){
    res.status(500).json({message:"erro no login"})
  }

})


app.post("pix/:cpf", async (req, res) =>{
  try{
    const cpf = req.params.cpf
    const valorPix = req.body
    console.log(valorPix)
    await db.update(usersTable).set({saldo:Number(valorPix)}).where(eq(usersTable.cpf, cpf))
  }
  catch(error){
    console.log(error)
  }
})

  
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });

// --- Inicialização do Servidor ---
// Inicia o servidor e o faz "escutar" na porta definida
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

//module.exports = app;