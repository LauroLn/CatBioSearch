const { Sequelize }= require('sequelize')
const startDb = require('../db/database')


let Relatorio

const initRelatorioModel = async () =>{
    const db = await startDb()

    Relatorio = db.define('Relatorios',{
        Nome:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        Sexo:{
            type: Sequelize.STRING,
            allowNull: false
        },
        Cliente:{
            type: Sequelize.STRING,
            allowNull: false
        },
        Idade:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Raca:{
            type: Sequelize.STRING,
            allowNull: false
        },
        Material:{
            type: Sequelize.STRING,
            allowNull: false
        },
        Metodo:{
            type: Sequelize.STRING,
            allowNull: false
        }
    

})

await Relatorio.sync();
return Relatorio

}

module.exports = initRelatorioModel