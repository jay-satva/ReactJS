import bcrypt from "bcryptjs";

// The plain password you want to use
const password = "john123";

// Generate a hash
const hash = bcrypt.hashSync(password, 12);
console.log("Hash for admin:", hash);

// Optional: verify
console.log("Check password matches:", bcrypt.compareSync(password, hash));