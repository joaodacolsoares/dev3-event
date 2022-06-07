import clsx from 'clsx';
import Image from 'next/image';
import Form from '../components/Form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useUser from '../hooks/useUser';
import { useEffect } from 'react';

function Card({ children, title, padding = true }) {
  return (
    <div className={clsx(padding && 'p-5', 'border-x-gray-100 md:rounded-lg border bg-white')}>
      {title && <div className={clsx(!padding && 'p-5', 'font-semibold mb-3')}>{title}</div>}
      <div>{children}</div>
    </div>
  );
}

export default function SignUp() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/app');
    }
  }, [user, router]);

  const onSubmit = async data => {
    const session = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    console.log(session);

    if (!session.ok) {
      const data = await session.json();
      console.log(data);
      alert('Erro ao criar conta');
      return;
    }

    return router.push('/app');
  };

  return (
    <div className="w-full h-screen flex items-center justify-center overflow-hidden">
      <div className="flex flex-col max-w-5xl w-full">
        <Card padding={false}>
          <div className="flex items-stretch justify-between flex-col-reverse md:flex-row md:h-auto h-screen">
            <div className="space-y-3 p-5 w-full md:flex md:justify-center md:flex-col">
              <div className="text-lg font-semibold mb-4">Criar conta</div>
              <Form onSubmit={onSubmit}>
                <Form.Text name="name" label="Name" />
                <Form.Email name="email" label="Email" />
                <Form.Password name="password" label="Senha" />
                <Form.Submit label="Enviar" />
                <Link href="/login">
                  <a className="text-sm text-pink-500 font-semibold text-center !mt-2">Já tenho conta</a>
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
