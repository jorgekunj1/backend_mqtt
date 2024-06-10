
(async () => {

      const database = require('./db');
      const mqtt = require('./mqtt');
      const express = require('express');
      const app = express();
      const Produto =  require('./produtos');

   
      await database.sync();
      const port = 3001;
      const cors = require('cors');


      //midlewere parse jason
      app.use(cors());
      app.use(express.json());

      //midlewere parse cors
  

      /*CRUD BÁSICO
      
      Crud utilizando Sequelize
      API  utlizando Express

      */ 


      app.get('/produto', async (req, res) => {

        const produtos = await Produto.findAll();
        res.json(produtos);

      });
      
      app.get('/produto/:id', async (req, res) => {
       
        const id = parseInt(req.params.id);
        const produto =  await Produto.findByPk(id);
        res.json(produto);
      
      });
      
      app.post('/produto', async (req, res) => {
        
        const { nome, preco, descricao} = req.body;
        try {
          await Produto.create({

            nome:nome,
            preco: preco,
            descricao: descricao

        } );
          res.status(201).send('Produto criado com sucesso');
        } catch (error) {
          console.error(error);
          res.status(500).send('Erro ao criar produto');
        }

      });

      app.put('/produto/:id', async (req, res) => {

        const { nome, preco, descricao} = req.body;
        const id = parseInt(req.params.id);

        try {

            const produto = await Produto.findByPk(id);
            produto.nome = nome
            produto.descricao = descricao
            produto.preco = preco
            produto.save();

            res.status(201).send('Produto Atualizado com sucesso');

          } catch (error) {
            console.error(error);

            res.status(500).send('Erro ao Atualizar o produto');

          }
       });
       
      

      /*MQTT GRAVANDO NO BANCO
      
        mqtt + sequelize

      */

    //Conectando
      const topic = 'Jorgenerico/Contador'
      mqtt.on('connect', () => {
        console.log('Connected')
        mqtt.subscribe([topic], () => {
          console.log(`Subscribe to topic '${topic}'`)
        })
      })


      /* Callback para inserir quando receber uma mensagem nova via MQTT*/ 
      mqtt.on('message', async (topic, payload) => {
        console.log('Received Message:', topic, payload.toString());
       
        await Produto.create({

          nome:payload.toString(),
          preco: payload.toString(),
          descricao: payload.toString()

      } );

      })

      /*Iniciando o servidor
      */

     app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

  }

)();












