import bcrypt from "bcrypt"

async function hashPassword(password) {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function validatePassword(password,user) {
    const valid = bcrypt.compare(password,user.hashedPassword);
    return valid
}

export {validatePassword,hashPassword}