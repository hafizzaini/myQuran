import {
  Box,
  Paper,
  Text,
  Menu,
  SegmentedControl,
  Popover,
} from '@mantine/core';
import axios from 'axios';
import { clientApi } from 'lib/api';
import { useEffect, useRef, useState } from 'react';
import { getV1OrV2FontFaceSource } from 'src/utils/fontFaceHelper';
// import Workspace from "./Workspace";

interface FontSelection {
  label: string;
  value: FontType;
}
type FontType = 'qpc' | 'v1' | 'v2';

const Index = () => {
  const currentlyFetchingFonts = useRef([]);
  const [data, setData] = useState([]);
  const [fontType, setFontType] = useState<FontType>('qpc');

  useEffect(() => {
    fetchByFontType();

    if (fontType == 'qpc') return;

    const pageNumber = 1;
    console.log(fontType);
    const fontFace = new FontFace(
      `p${pageNumber}-${fontType}`,
      getV1OrV2FontFaceSource(fontType === 'v1', pageNumber)
    );

    console.log('fontface', fontFace);
    fontFace.display = 'block';
    document.fonts.add(fontFace);
    // // load the font-face programmatically
    // fontFace
    //   .load()
    //   .then(() => {
    //     // store the font face in Redux slice
    //     console.log('then fontface', fontFace);
    //   })
    //   .finally(() => {
    //     // whether we failed or succeeded to fetch the fontFace, we remove it from currently fetching array
    //     console.log('finally fontface', fontFace);
    //   });

    // const fontFace = new FontFace()
  }, [fontType]);

  const fetchByFontType = async () => {
    let res = null;

    if (fontType == 'qpc') {
      res = await clientApi.get('/getVerse');
    }

    if (fontType == 'v1') {
      res = await axios.get(
        'https://staging.quran.com/api/qdc/verses/by_chapter/1?words=true&translation_fields=resource_name%2Clanguage_id&per_page=7&fields=text_uthmani%2Cchapter_id%2Chizb_number%2Ctext_imlaei_simple&translations=85%2C19%2C131&reciter=7&word_translation_language=en&page=1&word_fields=verse_key%2Cverse_id%2Cpage_number%2Clocation%2Ctext_uthmani%2Ccode_v1%2Cqpc_uthmani_hafs&mushaf=2'
      );
    }

    if (fontType == 'v2') {
      res = await axios.get(
        'https://staging.quran.com/api/qdc/verses/by_chapter/1?words=true&translation_fields=resource_name%2Clanguage_id&per_page=7&fields=text_uthmani%2Cchapter_id%2Chizb_number%2Ctext_imlaei_simple&translations=85%2C19%2C131&reciter=7&word_translation_language=en&page=1&word_fields=verse_key%2Cverse_id%2Cpage_number%2Clocation%2Ctext_uthmani%2Ccode_v2%2Cqpc_uthmani_hafs&mushaf=1'
      );
    }

    console.log('res', res.data);
    if (res.data) {
      setData(res.data.verses);
    }
  };

  const renderVerse = (verse) => {
    if (!verse) return <div />;

    let fontFamily = 'UthmanicHafs';
    if (fontType === 'v1') {
      fontFamily = 'p1-v1';
    }
    if (fontType === 'v2') {
      fontFamily = 'p1-v2';
    }

    return (
      <div style={{ display: 'flex' }}>
        {verse.words.map((word) => {
          return (
            <Box pl={5} key={word.id}>
              <Text
                align="center"
                style={{ fontFamily: fontFamily, fontSize: '35px' }}
              >
                <Popover width={200} position="bottom" shadow="md">
                  <Popover.Target>
                    <div>{word.text}</div>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <Text size="sm">{word.text}</Text>
                  </Popover.Dropdown>
                </Popover>
              </Text>

              <Text p="xs" align="center" component="p">
                {word.translation.text}
              </Text>
            </Box>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <SegmentedControl
        value={fontType}
        data={[
          { label: 'qpc', value: 'qpc' },
          { label: 'v1', value: 'v1' },
          { label: 'v2', value: 'v2' },
        ]}
        onChange={(selected: FontType) => setFontType(selected)}
      />
      {data.map((verse) => {
        return (
          <Paper shadow="xs" p="md" mb="md" key={verse.id}>
            <div
              style={{
                direction: 'rtl',
              }}
            >
              {renderVerse(verse)}
            </div>
            {verse.translations.map((translation) => {
              return (
                <Box m="xs" key={translation.id}>
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
