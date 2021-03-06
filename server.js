
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();

    // require('dotenv').parse();
}
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.set(expressLayouts);
app.set(express.static('public'));


const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.openUri = ((uri, options, callback)=>{
    console.log(uri, options, callback)
})
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to db'));

app.use('/',indexRouter)

app.listen(process.env.PORT || 3009);
// module.exports = {
//     mongoose
// };