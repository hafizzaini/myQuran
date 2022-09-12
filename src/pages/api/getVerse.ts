import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { withSessionRoute } from 'lib/session';

async function handle(req: NextApiRequest, res: NextApiResponse) {
  // const { auth } =  req.query;

  try {
    const response: AxiosResponse<Boolean> = await axios.get(
      'https://staging.quran.com/api/qdc/verses/by_chapter/1?words=true&translation_fields=resource_name%2Clanguage_id&per_page=7&fields=text_uthmani%2Cchapter_id%2Chizb_number%2Ctext_imlaei_simple&translations=85%2C19%2C131&reciter=7&word_translation_language=en&page=1&word_fields=verse_key%2Cverse_id%2Cpage_number%2Clocation%2Ctext_uthmani%2Cqpc_uthmani_hafs&mushaf=5'
    );
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
}

export default withSessionRoute(handle);
