const user = require('../entity/users')

const addUsers = async (data, result) => {
    user.create(data)
        .then((results) => {
            result(null, results)
        })
        .catch((err) => {
            result(err, null)
        })
}
module.exports = { addUsers };