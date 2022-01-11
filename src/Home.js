import React, {useState, useEffect} from 'react';
import Stat from './Stat';
import Profile from './Profile';

const Home = (props) => {
  const [data, setData] = useState("");
  const [meta, setMeta] = useState();
  const [stats, setStats] = useState();


  useEffect(() => {
    (async () => {
        const ret = await fetch("http://127.0.0.1:5000/profile?platform=ps4&user=MullyF");
        const json = await ret.json();
        setData(json);
    })();
  }, []);

  useEffect(() => {
    if (data) {
        // Could do something else here if data already exsisted
        // console.log("Data changed and exists!");
        console.log(data.data.metadata);
        setMeta(data.data.metadata)
        console.log(data.data.stats);
        setMeta(data.data.stats)
    }
  }, [data]);

  return (
    <div>
      <Profile metadata={meta}/>
      <Stat stats={stats}/>
    </div>
  );

}

export default Home;