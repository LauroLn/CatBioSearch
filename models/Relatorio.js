const { Sequelize }= require('sequelize')
const startDb = require('../db/database')
const initUserModel = require('./Usuario')

let Relatorio

const initRelatorioModel = async () =>{
    const db = await startDb()

    Relatorio = db.define('Relatorios',{
        Nome_gato:{
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
        }
    

})

await Relatorio.sync();
return Relatorio

}

module.exports = initRelatorioModel