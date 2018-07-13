import bcrypt from 'bcrypt';
const SALT_ROUNDS = 12;
function generateHash(password) {
    return bcrypt.hash(password, SALT_ROUNDS);
}

function checkPassword(password, hash) { //plaintext password & the pass coming from the db
    return bcrypt.compare(password, hash);
}

export { generateHash, checkPassword }