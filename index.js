import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

//Connect to MongoDB
const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to Memories API');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

/*

To deploy server and client as diferent deploys, seperate client and server folders then:


If you want to upload this directly without setting up env in Heroku you can take .env out of -.gitignore
Also create a file called Procfile in the server main directory and add the following command: web: npm run start

then add the cmd $ heroku git:remote -a memories-project
git add and commit
git push heroku master

then you need to change the axios url in the client API file and deploy yo netifly


To deploy both Server and client in Heroku add the following to index.js:

// you will require path-parse

if (process.env.NODE_ENV === "production") {
  const root = require("path").join(__dirname, "client", "build");
  app.use(express.static(root));
  app.get("*", (req, res) => {
    res.sendFile("index.html", { root });
  });

  and will also to do $ npm run build
  and then deploy to heroku

*/
