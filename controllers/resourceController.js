const axios = require('axios');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const SEARCH_ENGINE_ID = process.env.SEARCH_ENGINE_ID;

exports.searchResources = async (req, res) => {
  const { query } = req.query; 
// user in the session 
  if (!req.session.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
 
    const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
      params: {
        key: GOOGLE_API_KEY,
        cx: SEARCH_ENGINE_ID,
        q: query
      }
    });

    const searchResults = response.data.items;
    res.status(200).json({ searchResults });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
};
