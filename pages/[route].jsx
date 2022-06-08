import { PrismaClient } from '@prisma/client';
import Card from '../components/Card';
import Template from '../components/Template';

const prisma = new PrismaClient();

const Page = ({ user, title, subtitle, description, email, phone }) => {
  return (
    <Template
      header={
        <Template.Header>
          <h1>Bem vindo ao site de {user.name}</h1>
        </Template.Header>
      }
    >
      <Template.Section>
        <Card title="Cabeçalho">
          <h2>{title}</h2>
          <h3>{subtitle}</h3>
        </Card>
        <Card title="Corpo">
          <p>{description}</p>
        </Card>
        <Card title="Contato">
          <div className="flex flex-col">
            <span>{phone}</span>
            <span>{email}</span>
          </div>
        </Card>
      </Template.Section>
    </Template>
  );
};

export async function getStaticPaths() {
  const pages = await prisma.customPage.findMany();
  return {
    paths: pages.map(page => {
      return { params: { route: page.route } };
    }),
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
      user: true,
    },
  });
  return {
    props: { ...pageProps },
  };
}

export default Page;
