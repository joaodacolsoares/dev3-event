import clsx from 'clsx';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Form from '../components/Form';
import Template from '../components/Template';

function Card({ children, title, padding = true }) {
  return (
    <div className={clsx(padding && 'p-5', 'border-x-gray-100 md:rounded-lg border bg-white')}>
      {title && <div className={clsx(!padding && 'p-5', 'font-semibold mb-3')}>{title}</div>}
      <div>{children}</div>
    </div>
  );
}

export default function Login() {
  return (
    <div className="w-full h-screen flex items-center justify-center overflow-hidden">
      <div className="flex flex-col max-w-5xl w-full">
        <Card padding={false}>
          <div className="flex items-stretch justify-between flex-col-reverse md:flex-row md:h-auto h-screen">
            <div className="space-y-3 p-5 w-full md:flex md:justify-center md:flex-col">
              <div className="text-lg font-semibold mb-4">Entrar na conta</div>
              <Form onSubmit={data => alert(data)}>
                <Form.Input name="email" label="Email" />
                <Form.Input name="password" label="Senha" />
                <Form.Submit />
                <Link href="/signup">
                  <a className="text-sm text-pink-500 font-semibold text-center !mt-2">Criar conta</a>
                </Link>
              </Form>
            </div>
            <div className="flex relative bg-gray-200 w-full flex-grow object-fill h-full md:h-[450px]">
              <Image className="object-cover" src="/illustrations/sign-in-background.png" layout="fill" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
