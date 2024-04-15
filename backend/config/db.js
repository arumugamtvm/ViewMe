const mongoose = require('mongoose')

const DB_URL = 'mongodb+srv://arumugam:arumugam@cluster0.3crsbpj.mongodb.net/ViewMeDB?retryWrites=true&w=majority'

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(result => console.log('DB Connected'))
    .catch(err => console.log("Error Occured", err))
