//usei o express para criar e configurar meu servidor
const express = require("express")
const server = express()

const db = require("./db")

const ideas = [{
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title: "Cursos de Programacao",
        category: "Estudo",
        description: "orem ipsum dolor, sit amet consectetur adipisicing elit. Dicta esse nesciunt tenetur magnam",
        url: "http://rockeseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
        title: "Exercícios",
        category: "Saúde",
        description: "orem ipsum dolor, sit amet consectetur adipisicing elit. Dicta esse nesciunt tenetur magnam",
        url: "http://rockeseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title: "Meditação",
        category: "Mentalidade",
        description: "orem ipsum dolor, sit amet consectetur adipisicing elit. Dicta esse nesciunt tenetur magnam",
        url: "http://rockeseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
        title: "Karaoke",
        category: "Estudo",
        description: "orem ipsum dolor, sit amet consectetur adipisicing elit. Dicta esse nesciunt tenetur magnam",
        url: "http://rockeseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729038.svg",
        title: "Pintura",
        category: "Criatividade",
        description: "orem ipsum dolor, sit amet consectetur adipisicing elit. Dicta esse nesciunt tenetur magnam",
        url: "http://rockeseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729048.svg",
        title: "Recortes",
        category: "Criatividade",
        description: "orem ipsum dolor, sit amet consectetur adipisicing elit. Dicta esse nesciunt tenetur magnam",
        url: "http://rockeseat.com.br"
    },
]

//configuar arquivos estáticos(css,script,imagens)
server.use(express.static("public"))

//configuração do Nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true, //boolean
})

//criei uma rota '/'
server.get("/", function (req, res) {

    db.all(`SELECT * FROM ideas`, function (err, rows) {
        if (err) return console.log(err)

        const reversedIdeas = [...rows].reverse()

        let lastIdeas = []
        for (let idea of reversedIdeas) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }

        return res.render("index.html", {
            ideas: lastIdeas
        })
    })

})

server.get("/ideia", function (req, res) {
    db.all(`SELECT * FROM ideas`, function (err, rows) {
        const reversedIdeas = [...ideas].reverse()

        return res.render("ideia.html", {
            ideas: reversedIdeas

        })
    })
})
//liguei meu servido na porta 3000
server.listen(3000)