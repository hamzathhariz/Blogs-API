const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
var blogRouter = require('./routes/blog.router');


app.use('/test', blogRouter);
app.listen(process.env.PORT || 3000)



// database
mongoose.connect('mongodb+srv://hamsa:lnKB8NdFGXSvxXz7@cluster0.maweq.mongodb.net/blog?retryWrites=true&w=majority');

    mongoose.connection.on('connected', () => {
        console.log(`connected to mongoDB mongodb+srv://hamsa:lnKB8NdFGXSvxXz7@cluster0.maweq.mongodb.net/blog?retryWrites=true&w=majority }`);
    });


// mongoose.set('debug', true);

mongoose.connection.on('error', (err) => {
  console.log(`MongoDB has occured ${ err }`);
});

app.use(cors());


module.exports = app;