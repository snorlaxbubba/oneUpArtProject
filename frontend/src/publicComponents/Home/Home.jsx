import {useState, useEffect} from 'react';
import axios from 'axios';
import {API} from 'aws-amplify';

function Home() {

  const [items, setItems] = useState([]);

  // useEffect(() => {
  //   API.get('api', '/items').then((res) => {
  //     setItems(res);
  //   });
  // }, []);


  return (
    <div>
      {/* {items && items.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
      ))} */}
      <h2>This is Home</h2>
    </div>
  )
}
export default Home