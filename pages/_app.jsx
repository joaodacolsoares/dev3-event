import '../styles/globals.css';
import { HomeIcon, PencilIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import clsx from 'clsx';

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
  console.log(navbar);
  return (
    <div className="flex w-full bg-gray-50 min-h-screen flex-col md:flex-row-reverse">
      <div className="min-h-screen w-full">
        <Component {...pageProps} />
      </div>
      {navbar && (
        <nav className="w-24 h-screen shadow-lg bg-white flex flex-col items-center justify-center font-semibold">
          {NAV_ITEMS.map(item => (
            <Link key={item.path} href={item.path}>
              <div
                className={clsx(
                  'hover:text-pink-300 transition-colors flex items-center py-3 flex-col text-gray-400 cursor-pointer space-y-1',
                  location.pathname === item.path && '!text-pink-500'
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
  );
}

export default MyApp;
