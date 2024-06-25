import express from 'express';
import mongoose from 'mongoose';
import urlRoute from './routes/url.mjs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use('/url', urlRoute);

app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, 'public/index.html')));

mongoose.connect('mongodb://localhost:27017/url-shortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(port, () => console.log(`Server started on port ${port}`));
