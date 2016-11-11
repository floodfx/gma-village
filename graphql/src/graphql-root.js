var { GmaDAO } = require('gma-village-data-model');

const gmaDao = new GmaDAO()

const root = {
  gma: (id) => {
    console.log("gma", id)
    return gmaDao.gma(id)
      .then(gma => {
        console.log(gma)
        return gma
      })
      .catch(err => {
        throw err
      })
  },
  gmas: (filter, limit, nextToken) => {
    console.log("gmas", filter)
    return gmaDao.gmas(filter, limit, nextToken)
      .then(gmaList => {
        return gmaList
      })
      .catch(err => {
        throw err
      })
  },
  saveGma: (input) => {
    console.log("saveGma", input)
    return gmaDao.saveGma(input)
      .then(gma => {
        return gma
      })
      .catch(err => {
        throw err
      })
  }
}

module.exports = root
