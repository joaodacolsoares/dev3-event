import clsx from 'clsx';
import Template from '../../components/Template';
import Form from '../../components/Form';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function Card({ children, title, padding = true }) {
  return (
    <div className={clsx(padding && 'p-5', 'border-x-gray-100 md:rounded-lg border bg-white')}>
      {title && <div className={clsx(!padding && 'p-5', 'font-semibold mb-3')}>{title}</div>}
      <div>{children}</div>
    </div>
  );
}

const validateRoute = data => {
  if (/[^a-z\d\-\_]/gi.test(data)) {
    return "So são permitidos letras e ' - '";
  }
  return true;
};

function Edit() {
  const [baseUrl, setBaseUrl] = useState('');
  const router = useRouter();

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  return (
    <Template
      header={
        <Template.Header>
          <h1>Edição do Site</h1>
        </Template.Header>
      }
    >
      <Template.Section>
        <Form
          onSubmit={async data => {
            await fetch('/api/page', {
              method: 'POST',
              body: JSON.stringify(data),
            }).then(res => res.json());
            router.push(`/${data.route}`);
          }}
        >
          <Card title="Rota">
            <Form.Text name="route" label="Rota da sua página" fixedText={`${baseUrl}/`} validate={validateRoute} />
          </Card>
          <Card title="Cabeçalho">
            <Form.Text name="title" label="Titulo" />
            <Form.Text name="subtitle" label="Subtitulo" />
          </Card>
          <Card title="Corpo">
            <Form.TextArea name="description" label="Descrição" />
          </Card>
          <Card title="Contato">
            <Form.Text name="email" label="E-mail" />
            <Form.Phone name="phone" label="Telefone" />
          </Card>
          <Form.Submit />
        </Form>
      </Template.Section>
    </Template>
  );
}

export default Edit;
