import clsx from 'clsx';
import Template from '../components/Template';
import Card from '../components/Card';
import Fuse from 'fuse.js';
import useSWR from 'swr';
import { useEffect, useState, useRef } from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import Link from 'next/link';

const fetcher = (...args) => fetch(...args).then(res => res.json());
export default function SignUp() {
  const { data } = useSWR('/api/pages', fetcher);
  const [filteredResults, setFilteredResults] = useState([]);
  const [query, setQuery] = useState('');

  const fuseRef = useRef();

  useEffect(() => {
    const setup = async () => {
      if (data) {
        fuseRef.current = new Fuse(data, { keys: ['title', 'subtitle', 'phone', 'description'] });
      }
    };

    setup();
  }, [data]);

  useEffect(() => {
    if (query) {
      setFilteredResults((fuseRef?.current?.search?.(query) ?? []).map(({ item }) => item));
    } else {
      setFilteredResults(data);
    }
  }, [query, data]);

  if (!data || !filteredResults) {
    return null;
  }
  console.log(filteredResults);

  return (
    <Template header={<Template.Header>Procure a cerimonialista ideal</Template.Header>}>
      <Template.Section>
        <div className="relative border-b border-gray-200">
          <input
            autoComplete="off"
            className="appearance-none outline-none rounded-none w-full text-gray-700 p-4"
            inputMode="search"
            placeholder="Procurar cerimonialistas"
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
            }}
          />
          <SearchIcon className="absolute top-1/2 -translate-y-1/2 right-5 w-5 h-5 text-gray-400" />
        </div>
        <Card padding={false}>
          <div className="w-full flex flex-col space-y-3 divide-y divide-gray-100 cursor-pointer">
            {filteredResults.map(result => (
              <Link key={result.id} href={result.route || ''}>
                <div className="p-5">
                  <div className="text-lg font-semibold">{result.title}</div>
                  <div>{result.subtitle}</div>
                  <div>{result.description}</div>
                  <div>{result.email}</div>
                  <div>{result.phone}</div>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </Template.Section>
    </Template>
  );
}
