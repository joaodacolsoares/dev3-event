import Template from '../../components/Template';
import Form from '../../components/Form';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Card from '../../components/Card';

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
