import { Box, Paper } from '@mantine/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
// import Workspace from "./Workspace";

const Index = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        'https://staging.quran.com/api/qdc/verses/by_chapter/67?words=true&translation_fields=resource_name%2Clanguage_id&per_page=12&fields=text_uthmani%2Cchapter_id%2Chizb_number%2Ctext_imlaei_simple&translations=85%2C19%2C131&reciter=7&word_translation_language=en&page=1&word_fields=verse_key%2Cverse_id%2Cpage_number%2Clocation%2Ctext_uthmani%2Ccode_v1%2Cqpc_uthmani_hafs&mushaf='
      );

      console.log('res', res.data);
      if (res.data) {
        setData(res.data.verses);
      }
    })();
  }, []);

  return (
    <div>
      {data.map((verse) => {
        return (
          <Paper shadow="xs" p="md" mb="md">
            <div style={{ direction: 'rtl' }}>{verse?.text_uthmani}</div>
            {verse.translations.map((translation) => {
              return (
                <Box m="xs">
                  <div>{translation.text}</div>
                  <div>- {translation.resource_name}</div>
                </Box>
              );
            })}
          </Paper>
        );
      })}
    </div>
  );

  // return <Workspace Comp={Comp} />;
};

export default Index;
