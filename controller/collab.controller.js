const db = require('../database/db')

class CollabController {

    async getCollabs(req, res){
        const collabs = await db.query('SELECT * FROM collabs');
        res.json(collabs.rows)
    }

    async getCollabByUser(req, res){
        const id = req.params.id;
        const collabs = await db.query('SELECT c.id, c.title, c.descr, c.c_status, (SELECT username FROM users WHERE users.id=c.u_from) as "from_user", (SELECT username FROM users WHERE users.id=c.u_to) as "to_user" FROM collabs c WHERE  c.u_from=$1 OR c.u_to=$1;', [id]);
        res.json(collabs.rows)
    }

    async createCollab(req, res){
        const collab = req.body
        const portfiles = req.files.portfile;
        const c_result = await db.query('INSERT INTO collabs (title, descr, u_from, u_to, c_status) VALUES ($1, $2, $3, $4, $5) RETURNING *', [collab.title, collab.descr, collab.u_from, collab.u_to, collab.c_status])
        // console.log(c_result.rows[0].id);
        for(var i=0; i<portfiles.length; i++){
            const p_file = await db.query(`INSERT INTO files (f_name, collab_id) values ($1, $2) RETURNING *`, [portfiles[i].filename, c_result.rows[0].id])
        }
        res.json(c_result)
    }

    async getCollabById(req, res){
        const id = req.query.id
        const collab = await db.query('SELECT c.id, c.title, c.descr, c.c_status, c.u_from, c.u_to, (SELECT username FROM users WHERE users.id=c.u_from) as "from_user", (SELECT username FROM users WHERE users.id=c.u_to) as "to_user" FROM collabs c WHERE  c.id=$1', [id])
        res.json(collab.rows[0])
    }

    async changeStatus(req, res){
        console.log('status')
        const { status, id } = req.body
        const result = await db.query('UPDATE collabs set c_status=$1 WHERE id=$2', [status, id])
        res.status(200).json("Status has changed")
    }
}

module.exports = new CollabController()