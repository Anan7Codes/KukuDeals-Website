
import { CircularProgress, makeStyles, createStyles } from "@material-ui/core";
import { useState, useEffect } from "react";


function CircularProgressbar() {
  const [level, setLevel] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLevel((newLevel) => (newLevel >= 100 ? 0 : newLevel + 10));
    }, 700);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div style={{marginLeft:100, marginTop:200}}>
      <CircularProgress color="secondary" variant="determinate" className="bg-yellow-500 rounded-full w-44 h-44" value={30} />
    </div>
  );
}



export default CircularProgressbar;
