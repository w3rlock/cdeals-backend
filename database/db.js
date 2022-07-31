const {Pool} = require('pg');
const pool = new Pool({
    user: 'postgres',
    password: '',
    host: 'localhost',
    port: 5432,
    database: 'cdeals'
});
pool.queryNew = async (queryBody)=>{
    const result = await pool.query(queryBody);
    if(result.rows[0] === undefined || result.rows[0] === null) return null;
    const key = Object.keys(result.rows[0]);
    return result.rows[0][key];
}
module.exports = pool;