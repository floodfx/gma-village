
var cleanName = (name) => {
  var n = name.replace(/Gma /, '');
  var [first, ...rest] = n.split(/\s/);
  return {
    first_name: first,
    last_name: rest.join(' ')
  }
}

module.exports = cleanName
