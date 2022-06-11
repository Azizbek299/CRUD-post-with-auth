const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const app = express()
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const errorHandler = require('./middleware/errorMiddleware')


const corsOptions ={
    origin: true, 								
    credentials:true,
    optionSuccessStatus:200
    }


app.use(express.json())
app.use(helmet());
app.use(morgan('dev'))   																																						
app.use(bodyParser.urlencoded({extended:true}))                
app.use(cors(corsOptions))     			
										

mongoose.connect(process.env.DATABASE_URL)  
.then(() => {
    console.log('MongoDB ga ulandik');
})
.catch((err) => {
    console.error('MongoDB ga ulanishda hato yuz berdi', err);
})
 


app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler)





app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`) )


 

