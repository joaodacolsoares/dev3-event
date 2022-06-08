import { PrismaClient } from '@prisma/client';
import Head from 'next/head';
import Card from '../components/Card';
import Template from '../components/Template';

const prisma = new PrismaClient();

const Page = ({ title, subtitle, description, email, phone }) => {
  return (
    <>
      <Head>
        <title>{title} - eVent</title>
      </Head>
      <div className="flex justify-center">
        <div className="py-5 flex flex-col max-w-5xl w-full relative min-h-screen">
          <header className="flex items-center justify-between px-5 w-[1024]">
            {title && (
              <div className="font-bold text-2xl font-lusitana text-pink-400">{title[0]?.toUpperCase() || 'E'}</div>
            )}
            <a href={`mailto:${email}`} className="p-3 bg-pink-400 text-white rounded-lg">
              Entrar em contato
            </a>
          </header>
          <main className="px-5 mt-8 space-y-4">
            <div className="flex items-center justify-center flex-col text-center text-gray-700">
              <div className="text-2xl font-semibold">{title}</div>
              <div className="text-lg mb-3">{subtitle}</div>
              <div className="text-gray-600 md:max-w-1/3">{description}</div>
            </div>
            <div className="text-center text-gray-700">
              <div className="font-semibold text-lg">Informações de contato</div>
              <div>{email}</div>
              <div>{phone}</div>
            </div>
          </main>
          <footer className="absolute bottom-4 w-full flex flex-col items-center justify-center text-pink-300">
            <div className="text-sm text-gray-600">Desenvolvido por</div>
            <div className="font-lusitana font-semibold text-2xl">eVent</div>
          </footer>
        </div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const pageProps = await prisma.customPage.findUnique({
    where: {
      route: params.route,
    },
    select: {
      title: true,
      subtitle: true,
      route: true,
      description: true,
      phone: true,
      email: true,
      id: false,
      userId: false,
    },
  });
  return {
    props: { ...pageProps },
    revalidate: 20,
  };
}

export default Page;
