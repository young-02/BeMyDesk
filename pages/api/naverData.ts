import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
axios.defaults.withCredentials = true;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const Client_id = 'ZfbnfULVjSwZYN8kMazQ';
  const Client_secret = 'slDEy_2sou';
  const Base_url = 'https://openapi.naver.com';

  try {
    const response = await axios.get(`${Base_url}/v1/search/shop`, {
      params: {
        query: req.query.query,
        display: '15',
        exclude: 'used, rental',
      },
      headers: {
        'X-Naver-Client-Id': Client_id,
        'X-Naver-Client-Secret': Client_secret,
      },
    });
    res.status(200).json(response.data.items);
  } catch (e) {
    console.log('에러임', e);
  }
};

export default handler;
