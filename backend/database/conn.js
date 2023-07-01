const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('school_db', 'root', 'root', {
    host: 'localhost',
    port: 3306,
    dialect: 'mariadb',
    define: {        
        freezeTableName: true
    }
   
  })

  
try{
    sequelize.authenticate()
    console.log('Connection Succefully')    
}
catch(err)
{
    console.log('Connection error')
}


module.exports = sequelize

