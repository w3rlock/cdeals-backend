const db = require('../database/db')

class UserController {
    async createUser(req, res){
        try{
            const {first_name, last_name, username, email, phone, pass} = req.body

            const ifUser = await db.query('SELECT * FROM users WHERE username=$1 OR email=$2', [username, email]);
            console.log(ifUser.rows)
            if(ifUser.rows.length === 0){
                const newUser = await db.query(`INSERT INTO users (first_name, last_name, username, email, phone, pass, points) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [first_name, last_name, username, email, phone, pass, 0])
                return res.json(newUser.rows[0].id)
            }else{
                return res.status(400).json('Username or Email exist');
            }

            // console.log(first_name, last_name, username, email, phone, pass)
        }
        catch(e){
            console.log(e)
            res.status(400).json({message: "Registration error"})
        }
        
    }

    async login(req, res){
        const {email, password } = req.body
        const users = await db.query(`SELECT * FROM users WHERE email=$1 AND pass=$2`, [email, password])
        // return res.json(users.rows)
        if(!users.rows[0]){
            res.status(401).json({
                message: "Login not successful",
                error: "User not found",
            })
        } else {
            res.status(200).json({
                message: "Login successful",
                user: users.rows,
            })          
        }
    }

    async getUser(req, res){
        const users = await db.query(`SELECT * FROM users`)
        res.json(users.rows)
    }

    async getOneUser(req, res){
        const id = req.params.id
        console.log(id)
        const user = await db.query(`SELECT * FROM users WHERE id = $1`, [id])
        res.json(user.rows[0])
    }

    async updatePoints(req, res){
        const { id, newPoints } = req.body
        await db.query('SELECT points FROM users WHERE id=$1', [id])
        .then(response => {
            const result = db.query('UPDATE users SET points=$1 WHERE id=$2 RETURNING *', [newPoints+response.rows[0].points, id])
            res.status(200).json(result.rows)
        })
    }

    async updateUser(req, res){
        const {id, first_name, last_name, username, email, phone, pass} = req.body
        const user = await db.query('UPDATE users set first_name = $1, last_name = $2, username = $3, email = $4, phone = $5, pass = $6 where id = $7', [first_name, last_name, username, email, phone, pass, id])
        res.json(user.rows[0])
    }

    async deleteUser(req, res){
        const id = req.params.id
        const user = await db.query(`DELETE FROM users WHERE id = $1`, [id])
        res.json(user.rows[0])
    }

    async getUserWithPortfolio(req, res){
            const id = req.query.id
            const user = await db.query(`SELECT u.id, u.username, u.first_name, u.last_name, u.phone, u.email, u.points, c.category, p.about, p.role, p.img FROM users u, portfolio p, category c, roles r WHERE u.id = p.user_id AND p.category = c.id AND p.role = r.id AND u.id=$1;`, [id])
            res.json(user.rows[0])
    }

    async getListUserWithPortfolio(req, res){
        const category = req.query.category
        console.log(category);
        if(category == -1){
            console.log('test1')
            const user = await db.query(`SELECT u.id, u.username, u.points, c.category, p.about, p.role, p.img FROM users u, portfolio p, category c, roles r WHERE u.id = p.user_id AND p.category = c.id AND p.role = r.id;`)
            res.json(user.rows)
        }else{
            console.log('test')
            const user = await db.query(`SELECT u.id, u.username, u.points, c.category, p.about, p.role, p.img FROM users u, portfolio p, category c, roles r WHERE u.id = p.user_id AND p.category = c.id AND p.role = r.id AND p.category=$1;`,[category])
            res.json(user.rows)
        }
    }
}

module.exports = new UserController()