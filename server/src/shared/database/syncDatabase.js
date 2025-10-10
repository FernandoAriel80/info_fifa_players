import sequelize from './sequelize.js'
import setupAssociations from './associations.js'


async function asyncDb() {
  try {
    await sequelize.authenticate()
    console.log('✅ Conexión establecida con éxito.')
    
    setupAssociations()

    await sequelize.sync({ force: true }); // o { force: true } para borrar y recrear
    console.log('🗄️  Base de datos sincronizada correctamente.')
  } catch (error) {
    console.error('❌ Error al sincronizar la base de datos:', error)
  }
}
export default asyncDb
