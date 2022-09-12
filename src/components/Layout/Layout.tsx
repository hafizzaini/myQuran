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
} from '@mantine/core';
import Sidebar from '../Sidebar';
import useStyles from './Layout.styles';
import cvsLogo from '../../static/images/cvsLogo.png';
import Image from 'next/image';
// import { SunIcon, MoonIcon } from '@modulz/radix-icons';

import { useAppSelector } from '../../utils/hooks';
import { selectShowNavbar } from '../../store/pageConfigSlice';
import { useState } from 'react';

export interface LayoutConfig {
  showNavbar: 'full' | 'top' | 'side' | 'none';
  isDarkMode: boolean;
}

export const Layout = ({ children }) => {
  const showNavbarSelector = useAppSelector(selectShowNavbar);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { classes } = useStyles();

  const [userMenuOpened, setUserMenuOpened] = useState(false);

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
      navbar={<Sidebar />}
      navbarOffsetBreakpoint="sm"
      header={
        <Header height={60} p="xs">
          <Group className={classes.header} position="apart" mx="lg">
            <Center>
              <Image src={cvsLogo} alt="Cormeum Logo" height="36" width="80" />
              <Code sx={{ fontWeight: 700 }} ml="sm">
                v0.0.0
              </Code>
            </Center>
            <Box sx={{ display: 'flex' }}>
              <ActionIcon
                onClick={() => toggleColorScheme()}
                radius="sm"
                size={35}
                sx={(theme) => ({
                  marginRight: '6px',
                  backgroundColor:
                    theme.colorScheme === 'dark'
                      ? theme.colors.dark[6]
                      : theme.colors.gray[0],
                  color:
                    theme.colorScheme === 'dark'
                      ? theme.colors.yellow[4]
                      : theme.colors.blue[6],
                })}
              >
                {/* {colorScheme === 'dark' ? (
                  <SunIcon width={20} height={20} />
                ) : (
                  <MoonIcon width={20} height={20} />
                )} */}
              </ActionIcon>

              <Menu
                onClose={() => setUserMenuOpened(false)}
                onOpen={() => setUserMenuOpened(true)}
              >
                <Menu.Target>
                  <UnstyledButton>
                    <Avatar size={35} radius={'sm'} color="primary">
                      {avatarInitials()}
                    </Avatar>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item>User Profile</Menu.Item>
                  <Menu.Item>Settings</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Box>
          </Group>
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
      {children}
    </AppShell>
  );
};
