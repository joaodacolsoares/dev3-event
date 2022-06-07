import clsx from 'clsx';
import Head from 'next/head';
import Form from '../../components/Form';
import Template from '../../components/Template';
import LogoutIcon from '@heroicons/react/solid/LogoutIcon';

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

export default function Home() {
  return (
    <div>
      <Head>
        <title>Marketing para profissionais de eventos - eVent</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Template header={<Header />}>
        <Template.Sidebar>
          <Card title="Meu card" padding={false}>
            <div className="bg-gray-100 w-full h-44" />
            <div className="space-y-3 p-5">
              <div className="bg-gray-100 w-full h-8 rounded" />
              <div className="bg-gray-100 w-full h-8 rounded" />
              <div className="bg-gray-100 w-full h-8 rounded" />
            </div>
          </Card>
          <Card padding={false}>
            <div className="space-y-3 p-5">
              <div className="bg-gray-100 w-full h-8 rounded" />
              <div className="bg-gray-100 w-full h-8 rounded" />
              <div className="bg-gray-100 w-full h-8 rounded" />
            </div>
          </Card>
          <Card title="Teste 2" padding={false}>
            <div className="bg-gray-100 w-full h-44" />
            <div className="space-y-3 p-5">
              <div className="bg-gray-100 w-full h-8 rounded" />
              <div className="bg-gray-100 w-full h-8 rounded" />
              <div className="bg-gray-100 w-full h-8 rounded" />
            </div>
          </Card>
        </Template.Sidebar>

        <Template.Section>
          <Card title="Teste 2" padding={false}>
            <div className="bg-gray-100 w-full h-44" />
            <div className="space-y-3 p-5">
              <div className="bg-gray-100 w-full h-8 rounded" />
              <div className="bg-gray-100 w-full h-8 rounded" />
              <div className="bg-gray-100 w-full h-8 rounded" />
            </div>
          </Card>
          <Card title="Meu card">
            <Form onSubmit={data => alert(data)}>
              <Form.Text name="teste" label="Minha label" />
              <Form.Text name="teste2" label="Minha label2" />
              <Form.Submit />
            </Form>
          </Card>
          <Card title="Teste 2" padding={false}>
            <div className="bg-gray-100 w-full h-44" />
            <div className="space-y-3 p-5">
              <div className="bg-gray-100 w-full h-8 rounded" />
              <div className="bg-gray-100 w-full h-8 rounded" />
              <div className="bg-gray-100 w-full h-8 rounded" />
            </div>
          </Card>
        </Template.Section>
      </Template>
    </div>
  );
}
