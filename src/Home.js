import React, {useState, useEffect} from 'react';
import Stat from './Stat';
import Profile from './Profile';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container:{
    display:'flex',
    justifyContent:'center'
  }
}));

const Home = (props) => {
  const classes = useStyles();
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
        setStats(data.data.stats)
    }
  }, [data]);

  return (
    <div className={classes.container}>
      <Profile metadata={meta}/>
      <Stat stats={stats}/>
    </div>
  );

}

export default Home;