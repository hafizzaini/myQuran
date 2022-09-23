import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Menu,
  Navbar,
  NavLink,
  ScrollArea,
  Text,
  TextInput,
} from '@mantine/core';
import Link from 'next/link';
import useStyles from './Sidebar.styles';

import { useRouter } from 'next/router';
import Chapter from 'types/Chapter';

const data = [
  // { link: '/', label: 'Dashboard', icon: faHospital },
  { link: '/workspace', label: 'Workspace' },
  { link: '/reading', label: 'Reading' },
  { link: '/search', label: 'Search Results' },
];

export const Sidebar = () => {
  const { classes, cx } = useStyles();
  const router = useRouter();
  const [active, setActive] = useState('');
  const [sidebarData, setSidebarData] = useState([]);
  const [verseList, setVerseList] = useState([]);

  useEffect(() => {
    setActive(router.pathname);
  }, [router.pathname]);

  const getAllChaptersData = (
    lang: string = 'en'
  ): Promise<Record<string, Chapter>> => {
    return new Promise((res) => {
      import(`../../../data/chapters/en.json`).then((data) => {
        // @ts-ignore
        res(data.default);
      });
    });
  };

  useEffect(() => {
    (async () => {
      const data = await getAllChaptersData();
      const chapters = [];
      for (const [key, value] of Object.entries(data)) {
        chapters.push(value);
      }
      setSidebarData(chapters);
    })();
  }, []);

  const links = () => {
    if (!sidebarData) return <div />;

    return sidebarData.map((item, i) => (
      <Link href={`/${i + 1}`} key={`${item.transliteratedName}-${i}`}>
        <div
          className={cx(classes.link, {
            [classes.linkActive]: item.transliteratedName === active,
          })}
          key={i}
          onClick={(event) => {
            setActive(item.transliteratedName);
            setVerseList(Array.from(Array(item.versesCount).keys()));
          }}
        >
          <Text mr="xs">{i + 1}</Text>
          <Text>{item.transliteratedName}</Text>
        </div>
      </Link>
    ));
  };

  return (
    <Navbar p="md" width={{ md: 350 }} hidden hiddenBreakpoint="sm">
      <Grid>
        <Grid.Col span={9}>
          <ScrollArea type="always" style={{ height: '100vh' }}>
            <Navbar.Section grow>
              <>
                <TextInput
                  size="xs"
                  sx={{ width: 150 }}
                  placeholder="Search surah"
                />
                {links()}
              </>
            </Navbar.Section>
          </ScrollArea>
        </Grid.Col>
        <Grid.Col span={3}>
          <ScrollArea type="always" style={{ height: '100vh' }}>
            <Navbar.Section grow>
              <TextInput size="xs" sx={{ width: 50 }} placeholder="Verse" />
              <Box>
                {verseList.map((item) => (
                  <NavLink label={item + 1} />
                ))}
              </Box>
            </Navbar.Section>
          </ScrollArea>
        </Grid.Col>
      </Grid>
    </Navbar>
    //   </Grid.Col>
    //   <Grid.Col span={3}>
    //     <Navbar p="md" hidden hiddenBreakpoint="sm">
    //       <ScrollArea>
    //         <Navbar.Section grow>{links()}</Navbar.Section>
    //       </ScrollArea>
    //     </Navbar>
    //   </Grid.Col>
    // </Grid>
  );
};
// import React, { useEffect, useState } from 'react';
// import { Navbar, ScrollArea } from '@mantine/core';
// import Link from 'next/link';
// import useStyles from './Sidebar.styles';

// import { useRouter } from 'next/router';

// const data = [
//   // { link: '/', label: 'Dashboard', icon: faHospital },
//   { link: '/workspace', label: 'Workspace' },
//   { link: '/reading', label: 'Reading' },
//   { link: '/search', label: 'Search Results' },
// ];

// export const Sidebar = () => {
//   const { classes, cx } = useStyles();
//   const router = useRouter();
//   const [active, setActive] = useState('/');

//   useEffect(() => {
//     setActive(router.pathname);
//   }, [router.pathname]);

//   const links = data.map((item, i) => (
//     <Link href={item.link} key={`${item.label}-${i}`}>
//       <a
//         className={cx(classes.link, { [classes.linkActive]: item.link === active })}
//         key={item.label}
//         onClick={(event) => {
//           setActive(item.label);
//         }}
//       >
//         <>
//           <span>{item.label}</span>
//         </>
//       </a>
//     </Link>
//   ));

//   return (
//     <Navbar width={{ sm: 150, md: 250 }} p="md" hidden hiddenBreakpoint="sm">
//       <ScrollArea>
//         <Navbar.Section grow>{links}</Navbar.Section>

//         <Navbar.Section className={classes.footer}>
//           <Link href="/login">
//             <a className={classes.link}>Logout</a>
//           </Link>
//         </Navbar.Section>
//       </ScrollArea>
//     </Navbar>
//   );
// };
