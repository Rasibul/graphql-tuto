import logo from './logo.svg';
import './App.css';
import { gql, useQuery } from '@apollo/client';

const query = gql`
  query {
    getTodos {
      id
      title
      completed
      user {
        id
        name
      }
    }
  }
`



function App() {
  const { loading, data } = useQuery(query);
  if (loading) return <p>Loading...</p>;
  return (
    <div className="App">
      {JSON.stringify(data)}
    </div>
  );
}

export default App;
