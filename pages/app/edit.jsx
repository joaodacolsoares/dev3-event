import Template from '../../components/Template';
import Form from '../../components/Form';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Card from '../../components/Card';
import { PrismaClient } from '@prisma/client';
import Cookies from 'cookies';
import jwt from 'jsonwebtoken';

const validateRoute = data => {
  if (/[^a-z\d\-\_]/gi.test(data)) {
    return "So são permitidos letras e ' - '";
  }
  return true;
};

function Edit(page) {
  const [baseUrl, setBaseUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  console.log(page);
  return (
    <Form
      defaultValues={page}
      onSubmit={async data => {
        setLoading(true);
        await fetch('/api/page', {
          method: 'POST',
          body: JSON.stringify(data),
        }).then(res => res.json());
        setLoading(false);
        router.push(`/${data.route}`);
      }}
    >
      <Template
        header={
          <Template.Header>
            <div className="flex items-center justify-between w-full">
              <h1>Edição do Site</h1>
              <div className="!text-base">
                <Form.Submit
                  disabled={loading}
                  label={loading ? 'Carregando' : 'Salvar'}
                  className="font-normal !text-md"
                />
              </div>
            </div>
          </Template.Header>
        }
      >
        <Template.Sidebar>
          <Card title="Rota">
            <Form.Text name="route" label="Rota da sua página" fixedText="/" validate={validateRoute} />
          </Card>
          <Card title="Informações de contato">
            <Form.Text name="email" label="E-mail" />
            <Form.Phone name="phone" label="Telefone" />
          </Card>
        </Template.Sidebar>
        <Template.Section>
          <Card title="Cabeçalho">
            <Form.Text name="title" label="Titulo" />
            <Form.Text name="subtitle" label="Subtitulo" />
          </Card>
          <Card title="Corpo">
            <Form.TextArea name="description" label="Descrição" />
          </Card>
        </Template.Section>
      </Template>
    </Form>
  );
}

export async function getServerSideProps({ req }) {
  const prisma = new PrismaClient();

  const cookies = new Cookies(req);

  const { email } = jwt.decode(cookies.get('jwt'));

  const user = await prisma.user.findUnique({
    where: { email },
  });
  const page = await prisma.customPage.findUnique({
    where: {
      userId: user.id,
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
    props: { ...page },
  };
}

Edit.navbar = true;
export default Edit;
