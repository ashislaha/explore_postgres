
const pg = require('pg')

// connect to local postgres
const pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'socialmedia',
    user:'ashislaha',
    password:''
});

pool.query(`
    UPDATE posts
    SET loc = POINT(lat,lng)
    WHERE loc IS NULL;
`).then(()=> {
    console.log("update complete");
    pool.end();
}).catch((err)=> {
    console.error(err.message);
});