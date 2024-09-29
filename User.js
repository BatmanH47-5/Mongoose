const mongoose = require('mongoose');

// Define the address schema
const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
});

// Define the user schema
const userSchema = new mongoose.Schema({
    name: String,
    age: {
        type: Number,
        min: 1,
        max: 100,
        validate: {
            validator: v => v % 2 === 0,
            message: props => `${props.value} is not an even number`
        }
    },
    email: {
        type: String,
        minLength: 10,
        required: true,
        uppercase: true,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
    bestFriend: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    hobbies: [String],
    address: addressSchema
});

// Define instance method
userSchema.methods.sayHi = function() {
    console.log(`My name is ${this.name} and my age is ${this.age}`);
};

// Define static method
userSchema.statics.findByName = function(name) {
    return this.where({ name: new RegExp(name, "i") });
};

// Define query method
userSchema.query.findByName = function(name) {
    return this.where({ name: new RegExp(name, "i") });
};

userSchema.virtual("namedEmail").get(function(){
    return `${this.name} <{this.mail}>`
})

userSchema.post("save",function(doc,next){
    doc.sayHi()
    next()
})

module.exports = mongoose.model("User", userSchema);