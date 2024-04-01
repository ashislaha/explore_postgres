const express = require('express')
const pg = require('pg')

// connect to local postgres
const pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'socialmedia',
    user:'ashislaha',
    password:''
});

const app = express();
app.use(express.urlencoded({ extended: true }));

// Route handler: get list of posts
app.get('/posts', async(req, res)=>{
    const {rows} = await pool.query(`
        SELECT * 
        FROM posts;
    `);
    console.log(rows);
    res.send(`
        <table>
            <thead>
                <tr>
                    <th>id<th>
                    <th>lat<th>
                    <th>lng<th>
                </tr>
            </thead>
            <tbody>
            ${rows.map(row =>{
                return `
                    <tr>
                        <td>${row.id}</td>
                        <td>${row.loc.x}</td>
                        <td>${row.loc.y}</td>
                    </tr>
                `;
            }).join('')}
            </tbody>
        </table>
        <form method="POST">
            <h2>Create post</h2>
            <div>
                <label>Lat</label>
                <input name="lat"/>
            </div>
            <div>
                <label>Lng</label>
                <input name="lng"/>
            </div>
            <button type="submit">Create</button>
        </form >
    `);
});

// Route handler: add a new post
app.post('/posts', async (req, res)=> {
    const {lat, lng} = req.body;
    await pool.query('INSERT INTO posts (loc) VALUES ($1);', 
    [`(${lat},${lng})`]);

    res.redirect('/posts');
});

app.listen(3005, ()=> {
    console.log("listening on port 3005");
});