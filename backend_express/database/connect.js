const mongoose = require("mongoose");

mongoose.connect(`mongodb+srv://akshay:${process.env.databasePassword}@cluster0.w8utn.mongodb.net/chatapp?retryWrites=true&w=majority`,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:true,
    useUnifiedTopology:true
});



