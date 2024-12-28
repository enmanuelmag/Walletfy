import { Outlet } from 'react-router-dom';
import { IconMoon, IconSun } from '@tabler/icons-react';

import { RoutesApp } from '@constants/routes';

import { useAppStore } from '@store/index';

import { $ } from '@utils/styles';
import React from 'react';

function Layout() {
  const { theme, setTheme } = useAppStore();

  React.useEffect(() => {
    const themeSelected = localStorage.getItem('theme') as 'light' | 'dark';

    setTheme(themeSelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      className={$(
        'cd-flex cd-flex-col cd-h-screen cd-w-full',
        'cd-justify-start cd-items-center',
        'cd-bg-gray-100 dark:cd-bg-zinc-900'
      )}
    >
      <header
        className={$(
          'cd-absolute cd-top-0 cd-left-0',
          'cd-w-full cd-px-[1rem] cd-py-[0.75rem]',
          'dark:cd-border-zinc-800 dark:cd-bg-zinc-800',
          'cd-flex cd-justify-between cd-items-center cd-shadow-md'
        )}
      >
        <a
          href={RoutesApp.HOME}
          className={$(
            'cd-text-2xl cd-font-bold',
            'cd-text-black dark:cd-text-white'
          )}
        >
          Wallet
          <span className={$('cd-text-violet-500 dark:cd-text-violet-400')}>
            fy
          </span>
        </a>

        <button
          className={$(
            'cd-p-2 cd-rounded-md cd-shadow-md',
            'cd-bg-gray-200 hover:cd-bg-gray-300',
            'dark:cd-bg-zinc-700 dark:hover:cd-bg-zinc-600'
          )}
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          <span className="cd-text-gray-700 dark:cd-text-gray-300">
            {theme === 'light' ? <IconMoon /> : <IconSun />}
          </span>
        </button>
      </header>
      <main className={$('cd-w-full cd-px-[4rem] cd-pt-[6rem]')}>
        <Outlet />
      </main>
    </section>
  );
}

export default Layout;
