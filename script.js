const mongoose = require('mongoose');
const User = require('./User');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/testdb')

    const user=await User.findOne({name:"Shiva Safana",
    age:16})

    console.log(user)
    user.save()
    console.log(user)
}
