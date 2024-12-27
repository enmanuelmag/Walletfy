import { RoutesApp } from '@constants/routes';
import { $ } from '@utils/styles';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <section className="cd-flex cd-flex-col cd-h-screen cd-w-full cd-justify-start cd-items-center">
      <header
        className={$(
          'cd-flex cd-justify-between cd-items-center',
          'cd-absolute cd-top-0 cd-left-0',
          'cd-w-full cd-px-[1rem] cd-py-[0.5rem]',
          'cd-border-b-2 cd-border-gray-200 cd-shadow-md'
        )}
      >
        <a
          href={RoutesApp.HOME}
          className="cd-text-lg cd-text-black cd-font-bold"
        >
          Wallet
          <span className="cd-text-violet-500 cd-text-lg">fy</span>
        </a>
      </header>
      <main className="cd-w-full cd-px-[4rem] cd-pt-[6rem]">
        <Outlet />
      </main>
    </section>
  );
}

export default Layout;
