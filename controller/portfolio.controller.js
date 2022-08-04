const db = require('../database/db')
const path = require('path');
const { Console } = require('console');

class PostController {
    async createPortfolio(req, res){
        const {role, category, about, user_id, links} = req.body
        const portfolio = await db.query(`INSERT INTO portfolio (img, role, category, about, user_id) values ($1, $2, $3, $4, $5) RETURNING *`, [req.files.avatar[0].filename, role, category, about, user_id])
        const portfiles = req.files;
        // console.log(portfiles)
        // console.log(req.body)
        if(portfiles){
            for(var i=0; i<portfiles.length; i++){
                const p_file = await db.query(`INSERT INTO files (f_name, user_id) values ($1, $2) RETURNING *`, [portfiles[i].filename, user_id])
            }
        }
        
        const arr = links.split(',');
        if(links){
            for(var i=0; i<arr.length; i+=2){
                // console.log(arr[i]+' '+arr[i+1])
                const link = await db.query(`INSERT INTO links (l_name, user_id, link_name) values ($1, $2, $3) RETURNING *`, [arr[i+1], user_id, arr[i]])
            }
        }
        
        res.json(portfolio.rows)

    }

    async updatePortfolio(req, res){
        const {role, category, about, user_id, links} = req.body
        // console.log(req.body)
        if(req.files.avatar){
            const edit = await db.query('UPDATE portfolio set img=$1, role=$2, category=$3, about=$4, user_id=$5 WHERE user_id=$5', [req.files.avatar[0].filename, role, category, about, user_id])
            res.json(req.files.avatar[0].filename)
        }else{
            const edit = await db.query('UPDATE portfolio set role=$1, category=$2, about=$3, user_id=$4 WHERE user_id=$4', [role, category, about, user_id])
            res.json('withoutavatar')
        }
        if(req.files.portfile){
            const portfiles = req.files.portfile;
            for(var i=0; i<portfiles.length; i++){
                const p_file = await db.query(`INSERT INTO files (f_name, user_id) values ($1, $2) RETURNING *`, [portfiles[i].filename, user_id])
            }
        }
        console.log(links)
        const arr = links.split(',');
        if(links){
            for(var i=0; i<arr.length; i+=2){
                // console.log(arr[i]+' '+arr[i+1])
                const link = await db.query(`INSERT INTO links (l_name, user_id, link_name) values ($1, $2, $3) RETURNING *`, [arr[i+1], user_id, arr[i]])
                console.log(link.rows)
            }
        }
    }

    async getAvatar(req, res){
        const { filename } = req.params;
        const dirname = path.resolve();
        ///home/ubuntu/backend/cdeals-backend/
        //dirname
        const fullfilepath = path.join('/home/ubuntu/backend/cdeals-backend/', 'uploads/' + filename);
        return res.sendFile(fullfilepath);
    }

    async getPortfolioByUser(req, res){
        const id = req.query.id
        const portfolio = await db.query('SELECT * FROM portfolio WHERE user_id = $1', [id])
        res.json(portfolio.rows)
    }

    async getLinks(req, res){
        const id = req.params.id
        const links = await db.query('SELECT id, l_name, link_name FROM links WHERE user_id = $1', [id])
        res.json(links.rows)
    }

    async updateLinks(req, res){
        // for(var i=0; i<links.length; i++){
        //     const link = await db.query('UPDATE links set id=$1, l_name=$2, user_id=$3 WHERE id=$1', [links.id, links.l_name, links.user_id])
        // }
        const links = req.body
        console.log(links)
        // res.json(req.body)
    }

    async getFiles(req, res){
        const id = req.query.id
        const files = await db.query('SELECT * FROM files WHERE user_id = $1', [id])
        res.json(files.rows)
    }

    async getFilesByCollab(req, res){
        const id = req.query.id
        const files = await db.query('SELECT * FROM files WHERE collab_id = $1', [id])
        res.json(files.rows)
    }

    async deleteFile(req, res){
        const id = req.params.id
        await db.query('DELETE FROM files WHERE id=$1', [id])
        res.json('deleted')
    }

    async deleteLink(req, res){
        const id = req.params.id
        await db.query('DELETE FROM links WHERE id=$1', [id])
        res.json('deleted')
    }

    
}

module.exports = new PostController()