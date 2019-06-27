const fs = require('fs');
module.exports = () => {
  const count = fs.readFileSync('global/count.txt');
  fs.writeFileSync('global/count.txt',parseInt(count)+1);
  return count.toString();
}
