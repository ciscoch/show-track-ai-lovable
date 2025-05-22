import express from 'express';
import multer from 'multer';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const hfEndpoint = process.env.HF_ENDPOINT || process.env.VITE_HF_ENDPOINT;

if (!supabaseUrl || !supabaseAnonKey || !hfEndpoint) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const app = express();
const upload = multer();

app.post('/predict', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const formData = new FormData();
    formData.append('file', new Blob([req.file.buffer], { type: req.file.mimetype }), req.file.originalname);

    const hfRes = await fetch(hfEndpoint, { method: 'POST', body: formData });
    if (!hfRes.ok) {
      const msg = await hfRes.text();
      return res.status(500).json({ error: msg });
    }

    const prediction = await hfRes.json();

    await supabase.from('predictions').insert({
      filename: req.file.originalname,
      prediction,
      created_at: new Date().toISOString()
    });

    res.json(prediction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Prediction failed' });
  }
});

app.get('/status', async (_req, res) => {
  // Placeholder: implement actual training status retrieval if available
  res.json({ status: 'ok' });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Orchestrator listening on port ${port}`);
});
