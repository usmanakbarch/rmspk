// Test

const bcrypt = require('bcrypt');
const pass = "usman";

const salt = await bcrypt.genSalt(10);
const SaltHashed = bcrypt.hash(pass, salt);
// const SimplePassword =  bcrypt.hash(pass, 10);

console.log(SaltHashed);