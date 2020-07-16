//fazendo o require do express
const express = require('express')

//Template Engines
const nunjucks = require('nunjucks')

//colocando o express no server
const server = express()

const videos = require('./data')

//Configurando o express para arquivos estáticos
server.use(express.static('public'))

server.set("view engine","njk")

nunjucks.configure("views", {
  express:server,
  autoescape:false,
  noCache:true
})

//Criando as rotas
//Aqui está fazendo a requisação e a resposta
server.get("/", function(req, res){

  const about = {
    avatar:'https://avatars1.githubusercontent.com/u/39267536?s=400&u=03e98d923a1bb3834e8e26b5824c528addfe32cf&v=4',
    name: 'Abisai Santos',
    role:'Desenvolvedor Mobile e Web',
    description:'Programador Mobile e Web, apaixonado pelo front-end e colaborador na <a href="https://www.linkedin.com/company/espacoblackswan/" target="_blank">Black Swan</a>',
    
      links:[
      {
        name:'Github', url:'https://github.com/AbisaiSan',
        name:'Linkedin', url:'https://www.linkedin.com/in/abisai-santos/',
        name:'Instagram', url:'https://www.instagram.com/abisaissantos/?hl=pt-br'
      }
    ]
  }

  return res.render("about", {about})
})

server.get("/portfolio", function(req, res){
  return res.render("portfolio", {items:videos})
})

//passando dados do front para o back com query strings
server.get("/video", function(req,res) {
  const id = req.query.id

  const video = videos.find(function(video){
    return video.id == id
  })
  
  if(!video){
    return res.send('Video Not Found')
  }

  return res.render('video', {item: video})
})

//Criando a porta do servidor
server.listen(5000, function(){
  console.log('Server is running!')
})
