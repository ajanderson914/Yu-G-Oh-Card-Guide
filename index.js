const express = require('express');
const bodyParser = require('body-parser');
const supabaseClient = require('@supabase/supabase-js');
const dotenv = require('dotenv');

const app = express();
const port = 3000;
dotenv.config();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
  res.sendFile('public/index.html', { root: __dirname });
});

app.get('/cards', async (req, res) => {
  try {
    const search = req.query.search;

    if (search) {
      const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${encodeURIComponent(search)}`);
      const data = await response.json();
      return res.json(data);
    }

    const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?num=100&offset=0');
    const data = await response.json();

    const cards = data.data;
    const shuffled = cards.sort(() => Math.random() - 0.5);
    const random20 = shuffled.slice(0, 20);

    res.json({ data: random20 });
  } catch (error) {
    console.log('Error getting cards:', error);
    res.status(500).json({ message: 'Error getting card data' });
  }
});

app.get('/saved-cards', async (req, res) => {
  const { data, error } = await supabase.from('saved_cards').select();

  if (error) {
    console.log('Error getting saved cards:', error);
    res.status(500).send(error);
  } else {
    res.json(data);
  }
});

app.post('/saved-cards', async (req, res) => {
  const card = req.body;

  const { data, error } = await supabase
    .from('saved_cards')
    .insert({
      card_id: card.card_id,
      name: card.name,
      type: card.type,
      image_url: card.image_url,
      description: card.description,
    })
    .select();

  if (error) {
    console.log('Error saving card:', error);
    res.status(500).send(error);
  } else {
    res.json(data);
  }
});

app.listen(port, () => {
  console.log(`App is available on port: ${port}`);
});
