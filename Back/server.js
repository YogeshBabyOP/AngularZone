const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/tododb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


const workSchema = new mongoose.Schema({
  task: String,
});

const Work = mongoose.model('Work', workSchema); 
app.get('/works', async (req, res) => {
  const works = await Work.find();
  res.json(works);
});

app.post('/works', async (req, res) => {
  const newWork = new Work({ task: req.body.task });
  await newWork.save();
  res.json(newWork);
});

app.delete('/works/:id', async (req, res) => {
  await Work.findByIdAndDelete(req.params.id);
  res.json({ message: 'Work deleted' });

});




const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
