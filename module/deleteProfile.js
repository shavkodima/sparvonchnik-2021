
const conn = require('./db_connect')
const postDate = require('./current_date')

const deleteProfile = (req, res) =>{
    const id = req.params.id;

    conn.query("DELETE FROM users WHERE id=?", [id], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/edit');
        }
    })
    postDate();
    return;
}


module.exports = deleteProfile;