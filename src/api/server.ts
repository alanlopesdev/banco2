// Importa o Express e o CORS
import express from "express";
import cors from "cors";

import { db } from '../db/index'
import { usersTable } from "../db/schema";

let cpf : string = ""
// Cria a instância do aplicativo Express
const app = express();
// Define a porta em que o servidor vai rodar
const port = 3000; // Você pode escolher outra porta se preferir

// --- Middlewares ---
// Habilita o CORS para permitir requisições de outras origens (seu app React Native)
app.use(cors());
// Habilita o parsing de JSON no corpo das requisições
app.use(express.json());


// --- Rotas ---
// Rota de teste para verificar se a API está funcionando
app.get("/", (req, res) => {
  res.status(200).send({ message: "API está funcionando corretamente!" });
});

// Futuramente, adicionaremos as rotas para manipular os usuários aqui.
// 2. NOVA ROTA: Buscar todos os usuários
app.get("/users", async (req, res) => {
    try {
      // Usa o 'db.select()' para fazer um 'SELECT * FROM users_table'
      const users = await db.select().from(usersTable);
      res.status(200).json(users);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      res.status(500).json({ message: "Ocorreu um erro no servidor." });
    }
  });
  

app.get(`/login/${cpf}`, async (req, res) =>{
  try {
  const user = await db.select().from(usersTable).where(eq(usersTable.cpf, cpf))
  res.status(200).json(user)
  }
  catch(err){
    res.status(500).json({message:"erro"})
  }
})

  
/*  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });

// --- Inicialização do Servidor ---
// Inicia o servidor e o faz "escutar" na porta definida
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
*/
module.exports = app;