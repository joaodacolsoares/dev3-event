import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());
export default function useUser() {
  const { data, error } = useSWR('/api/session', fetcher);

  if (!data) {
    return {
      loading: true,
    };
  }

  if (error || data.error) {
    return {
      loading: false,
      error: data.error,
    };
  }

  return {
    loading: false,
    user: data,
  };
}
