import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap'

import { useWeb3 } from '@openzeppelin/network/react';

const infuraProjectId = 'a9bdcdb2d94a4c8882b5ad5b591899ca';

function App() {

  const web3Context = useWeb3(`wss://ropsten.infura.io/ws/v3/${infuraProjectId}`);
  const { networkId, networkName, providerName } = web3Context; 
  console.log({web3Context})

  return (
    <div className="App">
      <div>
        <h1>OpenZeppelin Network.js</h1>
        <div>Network: {networkId ? `${networkId} – ${networkName}` : 'No connection'}</div>
        <div>Provider: {providerName}</div>
        <Button>hi</Button>
      </div>
    </div>
  );
}

export default App;