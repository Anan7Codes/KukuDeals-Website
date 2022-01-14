import { CircularProgressbar } from 'react-circular-progressbar';

export default function Circular() {
    return (
        <div>
            <div style={{ width: 200, height: 200 }}>
  <CircularProgressbar value={30} text={`{30} sold out `}/>
</div>
        </div>
    )
}
