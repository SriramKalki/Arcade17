import express from 'express';
import { nanoid } from 'nanoid';
import Url from '../models/url.mjs';
import validUrl from 'valid-url';

const router = express.Router();

router.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;

  if (!validUrl.isUri(originalUrl)) {
    return res.status(400).json('Invalid URL');
  }

  const shortUrl = nanoid(7);

  const url = new Url({
    originalUrl,
    shortUrl,
  });

  try {
    const savedUrl = await url.save();
    res.json(savedUrl);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/:shortUrl', async (req, res) => {
  try {
    const url = await Url.findOne({ shortUrl: req.params.shortUrl });
    if (url) {
      res.redirect(url.originalUrl);
    } else {
      res.status(404).json('URL not found');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
