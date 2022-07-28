import React from 'react';
import { useAppSelector } from '../../../utils/hooks';
import { selectShowNavbar } from '../../../store/pageConfigSlice';

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
import { EmptyLayout } from '../EmptyLayout';
config.autoAddCss = false; /* eslint-disable import/first */

export interface LayoutConfig {
  showNavbar: 'full' | 'top' | 'side' | 'none';
  isDarkMode: boolean;
}

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const showNavbarSelector = useAppSelector(selectShowNavbar);

  if (showNavbarSelector === 'none') {
    return <EmptyLayout>{children}</EmptyLayout>;
  }

  return <Layout>{children}</Layout>;
};
