import clsx from 'clsx';
import Head from 'next/head';
import Link from 'next/link';
import Template from '../../components/Template';
import LogoutIcon from '@heroicons/react/solid/LogoutIcon';
import { PrismaClient } from '@prisma/client';
import Cookies from 'cookies';
import jwt from 'jsonwebtoken';

function Card({ children, title, padding = true }) {
  return (
    <div className={clsx(padding && 'p-5', 'border-x-gray-100 md:rounded-lg border bg-white')}>
      {title && <div className={clsx(!padding && 'p-5', 'font-semibold mb-3')}>{title}</div>}
      <div>{children}</div>
    </div>
  );
}

const onLogoutClick = async () => {
  await fetch('/api/logout', {
    method: 'POST',
  });
  document.location.reload();
};

function Header() {
  return (
    <>
      <Template.Header>
        <h1>Bem vindo</h1>
        <button>
          <div className="space-x-1 flex items-center">
            <span>Sair</span>
            <LogoutIcon className="h-4 w-4 mt-2" onClick={onLogoutClick} />
          </div>
        </button>
      </Template.Header>
    </>
  );
}

export default function Home({ route }) {
  return (
    <div>
      <Head>
        <title>Marketing para profissionais de eventos - eVent</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Template header={<Header />}>
        <Template.Sidebar>
          <Card title="Edite o seu site" padding={false}>
            <div className="w-full flex px-2 pb-2 justify-between items-center">
              <span>Aqui você pode customizar o seu site</span>
              <Link href="/app/edit">
                <button className="bg-pink-400 p-3 rounded-lg font-semibold text-white cursor-pointer">Editar</button>
              </Link>
            </div>
          </Card>
        </Template.Sidebar>

        <Template.Section>
          <Card title="Vistiar o seu site" padding={false}>
            <div className="w-full flex px-2 pb-2 justify-between items-center">
              {route ? (
                <>
                  <span>Aqui você pode visitar o seu site e ver como ele fica para as outras pessoas</span>
                  <Link href={`/${route}`}>
                    <button className="bg-pink-400 p-3 rounded-lg font-semibold text-white cursor-pointer">
                      Visitar
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <span>Você ainda não tem um site configurado</span>
                  <button className="bg-gray-400 p-3 rounded-lg font-semibold text-white" disabled>
                    Visitar
                  </button>
                </>
              )}
            </div>
          </Card>
        </Template.Section>
      </Template>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const prisma = new PrismaClient();

  const cookies = new Cookies(req);

  const { email } = jwt.decode(cookies.get('jwt'));
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return {
    props: { route: user.route },
  };
}
