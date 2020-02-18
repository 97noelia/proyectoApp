import conexion from './conexion';
import mysql from 'promise-mysql';

const pool = mysql.createPool(conexion.database);
pool.getConnection().then(Connection=>{
    pool.releaseConnection(Connection);
    console.log("la base de datos está conectada");
});
export default pool;