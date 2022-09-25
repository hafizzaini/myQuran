import {
  faFilePen,
  faLink,
  faPenRuler,
  faSun,
  faTag,
  faTags,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  Paper,
  Popover,
  Text,
  LoadingOverlay,
  Loader,
  Skeleton,
  TextInput,
  Textarea,
  Divider,
  Grid,
  ActionIcon,
  Tooltip,
} from '@mantine/core';
import { AxiosResponse } from 'axios';
import { clientApi } from 'lib/api';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { VersesResponse } from 'types/ApiResponses';

const Chapter = () => {
  const route = useRouter();
  const [verses, setVerses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchVerse = async () => {
    if (!route.query?.chapterId) return;

    setIsLoading(true);
    const response: AxiosResponse<VersesResponse> = await clientApi.post(
      `/verses/${route.query.chapterId}`
    );
    setIsLoading(false);
    setVerses(response.data?.verses);
  };

  useEffect(() => {
    console.log('path', route.query);
    fetchVerse();
  }, []);

  const renderVerse = (verse) => {
    if (!verse) return <div />;

    const fontFamily = 'UthmanicHafs';

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
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

  if (_.isEmpty(verses)) return <div />;

  return (
    <div>
      {verses.map((verse) => {
        return (
          <Paper shadow="xs" p="md" mb="md" key={verse.id}>
            <Grid>
              <Grid.Col
                span={1}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Tooltip label="Links">
                  <ActionIcon m="sm" radius="lg">
                    <FontAwesomeIcon icon={faLink} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Tags">
                  <ActionIcon m="sm" radius="lg">
                    <FontAwesomeIcon icon={faTags} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Note">
                  <ActionIcon m="sm" radius="lg">
                    <FontAwesomeIcon icon={faFilePen} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Go to Canvas">
                  <ActionIcon m="sm" radius="lg">
                    <FontAwesomeIcon icon={faPenRuler} />
                  </ActionIcon>
                </Tooltip>
              </Grid.Col>
              <Grid.Col span={11}>
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
              </Grid.Col>
            </Grid>
          </Paper>
        );
      })}
    </div>
  );
};

export default Chapter;
