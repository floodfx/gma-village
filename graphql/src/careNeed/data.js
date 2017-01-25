var { CareNeedDAO } = require('gma-village-data-access');

const isProd = process.env.NODE_ENV === 'production'
const namespace = isProd ? "prod" : "dev"

const careNeedDAO = new CareNeedDAO(namespace)

var saveCareNeed = (input) => {
  return careNeedDAO.save(input)
    .then(careNeed => {
      return careNeed
    })
    .catch(err => {
      throw err
    })
}

module.exports = {
  saveCareNeed
}