const db = require('../database/db')

class CategoryController {
    async getListCategory(req, res){
        const roles = await db.query('SELECT * FROM roles')
        res.json(roles.rows)
    }

    async getListRoles(req, res){
        const id = req.query.id;
        const roles = await db.query('SELECT * FROM category WHERE role_id=$1', [id])
        res.json(roles.rows)
    }
}

module.exports = new CategoryController()