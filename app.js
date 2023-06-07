import express from 'express';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import routes from './src/routes/routes.js'


const app = express();
const port = 5000;

const connect = mongoose.connect('mongodb+srv://admin:admin@cluster0.vjwmriy.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true,
})

if (connect) {
    console.log('DB Connected');
}

app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(methodOverride('_method'))

app.use(express.urlencoded({ extended: false }))


app.use('/', routes)


app.listen(port, () => {
    console.log('Server is running...');
})