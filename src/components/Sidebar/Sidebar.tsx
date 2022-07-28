import React, { useEffect, useState } from 'react';
import { Navbar, ScrollArea } from '@mantine/core';
import Link from 'next/link';
import useStyles from './Sidebar.styles';

import { useRouter } from 'next/router';

const data = [
  // { link: '/', label: 'Dashboard', icon: faHospital },
  { link: '/workspace', label: 'Workspace' },
  { link: '/reading', label: 'Reading' },
  { link: '/search', label: 'Search Results' },
];

export const Sidebar = () => {
  const { classes, cx } = useStyles();
  const router = useRouter();
  const [active, setActive] = useState('/');

  useEffect(() => {
    setActive(router.pathname);
  }, [router.pathname]);

  const links = data.map((item, i) => (
    <Link href={item.link} key={`${item.label}-${i}`}>
      <a
        className={cx(classes.link, { [classes.linkActive]: item.link === active })}
        key={item.label}
        onClick={(event) => {
          setActive(item.label);
        }}
      >
        <>
          <span>{item.label}</span>
        </>
      </a>
    </Link>
  ));

  return (
    <Navbar width={{ sm: 150, md: 250 }} p="md" hidden hiddenBreakpoint="sm">
      <ScrollArea>
        <Navbar.Section grow>{links}</Navbar.Section>

        <Navbar.Section className={classes.footer}>
          <Link href="/login">
            <a className={classes.link}>Logout</a>
          </Link>
        </Navbar.Section>
      </ScrollArea>
    </Navbar>
  );
};
