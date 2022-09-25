import {
  AppShell,
  Header,
  Group,
  Code,
  Center,
  Menu,
  Avatar,
  UnstyledButton,
  ActionIcon,
  useMantineColorScheme,
  Box,
  SegmentedControl,
  Burger,
  Drawer,
  Transition,
  Anchor,
  Text,
  Grid,
  Button,
  useMantineTheme,
} from '@mantine/core';
import Sidebar from '../Sidebar';
import useStyles from './Layout.styles';

import { useAppSelector } from '../../utils/hooks';
import { selectShowNavbar } from '../../store/pageConfigSlice';
import { useState } from 'react';
import Link from 'next/link';

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookAtlas,
  faBookBible,
  faBookQuran,
  faCircleInfo,
  faGear,
  faMoon,
  faPaperPlane,
  faPenRuler,
  faSun,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

config.autoAddCss = false; /* eslint-disable import/first */

export interface LayoutConfig {
  showNavbar: 'full' | 'top' | 'side' | 'none';
  isDarkMode: boolean;
}

export const Layout = ({ children }) => {
  const showNavbarSelector = useAppSelector(selectShowNavbar);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [openedBurger, setOpenedBurger] = useState(false);

  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [sidebarOpened, setSidebarOpened] = useState(true);

  const avatarInitials = () => {
    const split = ''.split(' ');

    if (split.length !== 0) {
      let text = '';

      split.forEach((item) => {
        text += item.charAt(0);
      });

      return text;
    }
  };

  if (showNavbarSelector === 'none') {
    return <>{children}</>;
  }

  return (
    <AppShell
      fixed
      navbar={
        <Transition
          mounted={sidebarOpened}
          transition="slide-right"
          timingFunction="ease"
        >
          {(styles) => (
            <div style={styles}>
              <Sidebar />
            </div>
          )}
        </Transition>
      }
      navbarOffsetBreakpoint="sm"
      header={
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
                <ActionIcon radius="lg" onClick={() => toggleColorScheme()}>
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
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <>
        <Drawer
          opened={openedBurger}
          onClose={() => setOpenedBurger(false)}
          title="Stuffs"
          padding="md"
        >
          List of stuffs
        </Drawer>
        <div>{children}</div>
      </>
    </AppShell>
  );
};
