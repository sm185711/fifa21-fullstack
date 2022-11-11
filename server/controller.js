const pool = require('./dbconfig')

exports.root = async (req, res) => {
    console.log('Server testing.')
    return res.status(200).json('Hello World!')
}

exports.getPlayers = async (req, res) => {
    let metric = req.params.metric
    let order = req.params.order
    let searchTerm =
        req.params.searchTerm == '--' ? '%%' : '%' + req.params.searchTerm + '%'

    console.log('getPlayers called.')
    //console.log(`SELECT * FROM data WHERE name LIKE '${searchTerm}' ORDER BY ${metric} ${order} LIMIT 10`)

    pool.query(
        `SELECT * FROM data WHERE name LIKE '${searchTerm}' ORDER BY ${metric} ${order} LIMIT 5`,
        (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).json(results.rows)
        }
    )
}

exports.createPlayer = async (req, res) => {
    console.log('createPlayer called.')
    let body = req.body

    pool.query(
        `INSERT INTO data ("player_id", "name", "nationality", "position", "overall", "age", "hits", "potential", "team") 
          VALUES(
          '${body.player_id}', 
          '${body.name}', 
          '${body.nationality}', 
          '${body.position}', 
          '${body.overall}', 
          '${body.age}', 
          '${body.hits}', 
          '${body.potential}', 
          '${body.team}'
        ) RETURNING *`,

        (error, results) => {
            if (error) {
                throw error
            }
            console.log(results.rows)
            res.status(200).json({status: 'Player created.'})
        }
    )
}

exports.getPlayerByID = async (req, res) => {
    console.log('getPlayerByID called.')
    let ID = req.params.id

    pool.query(`SELECT * FROM data WHERE player_id=${ID}`, (error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows)
        res.status(200).json(results.rows)
    })
}

exports.updatePlayer = async (req, res) => {
    console.log('updatePlayer called.')
    console.log(req)
    let body = req.body

    pool.query(
        `
      UPDATE data SET 
        name = '${body.name}', 
        nationality = '${body.nationality}', 
        position = '${body.position}', 
        overall = '${body.overall}', 
        age = '${body.age}', 
        hits = '${body.hits}', 
        potential = '${body.potential}', 
        team = '${body.team}' 
        where player_id = '${req.params.id}' RETURNING *`,

        (error, results) => {
            if (error) {
                throw error
            }
            console.log(results.rows)
            res.status(200).json({status: 'Player updated.'})
        }
    )
}

exports.deletePlayer = async (req, res) => {
    console.log('deletePlayer called.')
    let ID = req.params.id

    pool.query(
        `DELETE FROM data WHERE player_id = '${ID}' RETURNING *`,
        (error, results) => {
            if (error) {
                throw error
            }
            console.log(results.rows)
            res.status(200).json({status: 'Player deleted.'})
        }
    )
}
