const argon2 = require("argon2");

module.exports = { hashPassword , checkPassword };

async function hashPassword(password) {
    try{
	const hash = await argon2.hash(password);
	console.log(`Hashed password: ${hash}`);
	return hash;
    }catch(err) {
	console.error(`Error hashing password`, err);
    }
}



async function checkPassword(hashFromDB, submittedPass){ 
    try{
	const match = await argon2.verify(hashFromDB, submittedPass);
	if(match){
	    console.log("matched")
	    return true;
	}
	else{
	    console.log(`No match ${hashFromDB} != ${submittedPass}`)
	    return false;
	}
    }catch(err){
	console.error("Error during password verification:", err);
	return false;
    }
}




