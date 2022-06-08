import '../styles/globals.css';
import { HomeIcon, PencilIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import clsx from 'clsx';
import Head from 'next/head';

const NAV_ITEMS = [
  {
    name: 'Home',
    path: '/app',
    icon: HomeIcon,
  },
  {
    name: 'Edit',
    path: '/app/edit',
    icon: PencilIcon,
  },
];

function MyApp({ Component, pageProps }) {
  const { navbar } = Component;

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        ></link>
        <link href="https://fonts.googleapis.com/css2?family=Lusitana:wght@700&display=swap" rel="stylesheet" />
      </Head>
      <div className="flex w-full bg-gray-50 min-h-screen flex-col md:flex-row-reverse">
        <div className={clsx('min-h-screen w-full', navbar && 'mb-20 md:mb-0')}>
          <Component {...pageProps} />
        </div>
        {navbar && (
          <nav className="md:static border md:border-0 border-gray-200 fixed bottom-0 md:w-24 md:h-screen h-20 w-full shadow-lg bg-white flex md:flex-col items-center justify-center font-semibold">
            {NAV_ITEMS.map(item => (
              <Link key={item.path} href={item.path}>
                <div
                  className={clsx(
                    'hover:text-pink-300 transition-colors flex items-center p-3 flex-col text-gray-400 cursor-pointer space-y-1',
                    typeof window !== 'undefined' && window?.location?.pathname === item.path && '!text-pink-500'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <div>{item.name}</div>
                </div>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </>
  );
}

export default MyApp;
