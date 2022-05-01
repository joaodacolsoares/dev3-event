import Head from 'next/head';
import Form from '../components/Form';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Marketing para profissionais de eventos - eVent</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Form onSubmit={data => alert(data)}>
        <Form.Input name="teste" label="Minha label" />
        <Form.Input name="teste2" label="Minha label2" />
        <Form.Submit />
      </Form>
    </div>
  );
}
