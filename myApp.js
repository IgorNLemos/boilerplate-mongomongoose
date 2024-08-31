require('dotenv').config();

//Challenge 1 - Setup and Install mongoose
const mongoose = require("mongoose");

async function run() {
  // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
  mongoose.connect(process.env.MONGO_URI);
  //await mongoose.connection.db.admin().command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");

}
run().catch(console.dir);

//Challenge 2 - Create a model
const { Schema } = mongoose;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema);


//Challenge 3 - Create and Save a Record of a Model
const createAndSavePerson = (done) => {
  var marshawnRich = new Person
  ({name: "Marshawn Rich", 
    age: 34, 
    favoriteFoods: ["sandwich", "skittles", "candy"]
  });

  marshawnRich.save((err, data) => {
    if (err) return console.error(err);
    done(null, data)
  });
};



//Challenge 4 - Create Many Records with model.create()

var arrayOfPeople = [  
  {name:'Johan P', age:20, favoriteFoods:["Pasta"]},
  {name:'Pashov', age:28, favoriteFoods:["burger"]}
 ];
 
const createManyPeople = (arrayOfPeople, done) => {  
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  }); 
};


//Challenge 5 - Use model.find() to Search Your Database
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, foundPerson) => {
    if (err){
        return console.error(err);
    }
    done(null, foundPerson); 
  });
};



//Challenge 6 - Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, record) => {
    if (err) { return console.error(err)
  }
  done(null, record);
  });
};


//Challenge 7 - Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
  Person.findOne({_id: personId}, (err, record) => {
    if (err) { return console.error(err);
  }
  done(null, record);
  });
};


//Challenge 8 - Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  
  Person.findById(personId, (err, person) => {
  if (err) return console.log(err);

  person.favoriteFoods.push(foodToAdd);

  person.save((err, updatedPerson) => {
    if (err) return console.log(err);
    done(null, updatedPerson)
    })
  })
};


//Challenge 9 - Perform New Updates on a Doc using model.findOneAndUpdate
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  
  Person.findOneAndUpdate(
  {name: personName /*search*/}, 
  {age: ageToSet /*update value*/},
  {new: true,/*return uptd*/ runValidators: true /*validate*/}, 
  (err, updatedPerson) => {
  if (err) return console.log(err);
  done(null, updatedPerson);
 })
};




//Challenge 10 - Delete one document using model.findByIdAndRemove
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, deletedDoc) => {
    if (err) return console.log(err);
    done(null, deletedDoc);
  })
};



//Challenge 11 - Delete Many Documents with model.remove()
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  
 Person.remove({name: nameToRemove},  (err, deletedDocs) => {
   if (err) return console.log(err);
   done(null, deletedDocs);
  });
};
  



//challenge 12 - Chain Search Query Helpers to Narrow Search Results
const queryChain = (done) => {
  const foodToSearch = "burrito";
  
  Person.find({favoriteFoods: foodToSearch})
  .sort({ name: 1 })      // sort ascending by name
  .limit(2)                   // limit to 2 items
  .select({ name: true}) // hide age
  .exec((err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
