const express = require('express');
const axios = require('axios');
const path = require('path');
const dotenv = require('dotenv');

const app = express();
const PORT = 3000;
dotenv.config();

const API_KEY = process.env.KEY;


app.use(express.static(path.join(__dirname, 'public')));


app.get('/api/cctv', async (req, res) => {
  try {
    const { data } = await axios.get('https://openapi.its.go.kr:9443/cctvInfo', {
      params: {
        apiKey: API_KEY,
        type: 'ex',
        cctvType: 1,
        minX: 126.9,
        maxX: 127.98,
        minY: 37.3,
        maxY: 37.7,
        getType: 'json'
      }

      
    });
    console.log(data)

    const list = data.response.data.filter(item =>
      item.cctvformat === 'HLS' && item.cctvurl
    ).slice(0,10);

    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('API 호출 실패');
  }
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
