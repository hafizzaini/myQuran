import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { withSessionRoute } from 'lib/session';
import qs from 'qs';

async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { chapterId } = req.query;

  const BASE_URL = 'https://staging.quran.com/api/qdc/verses/by_chapter';

  const defaultQueries = {
    words: 'true',
    translation_fields: 'resource_name,language_id',
    per_page: '20',
    fields: 'text_uthmani,chapter_id,hizb_number,text_imlaei_simple',
    translations: '85,19,131',
    reciter: '7',
    word_translation_language: 'en',
    page: '1',
    word_fields:
      'verse_key,verse_id,page_number,location,text_uthmani,qpc_uthmani_hafs',
    mushaf: "5'",
  };

  const query = `${BASE_URL}/${chapterId}?${qs.stringify(defaultQueries)}`;

  try {
    const response: AxiosResponse<Boolean> = await axios.get(query);
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
}

export default withSessionRoute(handle);
