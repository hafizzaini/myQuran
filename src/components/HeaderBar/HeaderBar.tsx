import {
  Header,
  Group,
  Menu,
  ActionIcon,
  Box,
  Burger,
  Drawer,
  Grid,
  Button,
  Divider,
  Text,
  Space,
  Checkbox,
} from '@mantine/core';
import { useState } from 'react';
import Link from 'next/link';

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookQuran,
  faCircleInfo,
  faGear,
  faPaperPlane,
  faPenRuler,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import useStyles from './Header.styles';

const HeaderBar = () => {
  const { classes } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [sidebarOpened, setSidebarOpened] = useState(true);
  const [settingDrawerOpened, setSettingDrawerOpened] = useState(false);

  return (
    <Header height={50} p="xs">
      <Grid className={classes.header}>
        <Grid.Col span={10}>
          <Box sx={{ display: 'flex' }}>
            <Burger
              opened={sidebarOpened}
              onClick={() => setSidebarOpened((o) => !o)}
            />
            <Group spacing={50} ml={100}>
              <Link href="1">
                <Button
                  leftIcon={<FontAwesomeIcon icon={faBookQuran} />}
                  variant="subtle"
                  color="gray"
                >
                  Quran
                </Button>
              </Link>
              <Link href="/workspace">
                <Button
                  leftIcon={<FontAwesomeIcon icon={faPenRuler} />}
                  variant="subtle"
                  color="gray"
                >
                  Canvas
                </Button>
              </Link>
              <Link href="/feedback">
                <Button
                  leftIcon={<FontAwesomeIcon icon={faPaperPlane} />}
                  variant="subtle"
                  color="gray"
                >
                  Feedback
                </Button>
              </Link>
              <Link href="/help">
                <Button
                  leftIcon={<FontAwesomeIcon icon={faCircleInfo} />}
                  variant="subtle"
                  color="gray"
                >
                  Help
                </Button>
              </Link>
            </Group>
          </Box>
        </Grid.Col>
        <Grid.Col span={2} sx={{ display: 'flex', justifyContent: 'end' }}>
          <Group spacing="sm" pr="md">
            <ActionIcon
              radius="lg"
              onClick={() => setSettingDrawerOpened(true)}
            >
              <FontAwesomeIcon icon={faGear} size="lg" />
            </ActionIcon>

            <Menu
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
            >
              <Menu.Target>
                <ActionIcon radius="lg">
                  <FontAwesomeIcon icon={faUser} size="lg" />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>User Profile</Menu.Item>
                <Menu.Item>Settings</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Grid.Col>
      </Grid>
      <Drawer
        opened={settingDrawerOpened}
        onClose={() => setSettingDrawerOpened(false)}
        position="right"
        title="Settings"
        padding="sm"
      >
        <Box>
          <Text>Translation</Text>
          <Space h="xs" />
          <Text size="xs" weight={700}>
            By Verse
          </Text>
          <Box>
            <Checkbox label="I agree to sell my privacy" p="xxs" />
            <Checkbox label="I agree to sell my privacy" p="xxs" />
          </Box>
          <Space h="xs" />
          <Text size="xs" weight={700}>
            By Word
          </Text>
        </Box>
      </Drawer>
    </Header>
  );
};

export default HeaderBar;
