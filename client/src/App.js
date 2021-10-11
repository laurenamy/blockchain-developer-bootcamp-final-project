import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap'
import { simpleStorageAbi } from './abi/SimpleStorage';

import { useWeb3 } from '@openzeppelin/network/react';
import Web3 from 'web3'

const infuraProjectId = 'a9bdcdb2d94a4c8882b5ad5b591899ca';



function App() {
  const [number, setNumber] = useState(0);
  const [getNumber, setGetNumber] = useState('0x00');
  const web3 = new Web3(Web3.givenProvider);
  const web3Context = useWeb3(`wss://ropsten.infura.io/ws/v3/${infuraProjectId}`);
  // const { networkId, networkName, providerName, accounts } = web3Context;
  console.log({web3Context})
  const contractAddr = '0xfA14B462d2B8a1a254307FDEf4478c49Ef53845C'
  const SimpleContract = new web3.eth.Contract(simpleStorageAbi, contractAddr)
  console.log({SimpleContract})


  const handleGet = async (e) => {
    e.preventDefault();
    const result = await SimpleContract.methods.get().call();
    setGetNumber(result);
    console.log(result);
  }

  const handleSet = async (e) => {
    e.preventDefault();    
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const gas = await SimpleContract.methods.set(number)
                        .estimateGas();
    const result = await SimpleContract.methods.set(number).send({
      from: account,
      gas 
    })
    console.log(result);
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSet}>
          <label>
            Set Number:
            <input 
              type="text"
              name="name"
              value={number}
              onChange={ e => setNumber(e.target.value) } />
          </label>
          <input type="submit" value="Set Number" />
        </form>
        <br/>
        <button
          onClick={handleGet}
          type="button" > 
          Get Number 
        </button>
        { getNumber }
      </header>
    </div>  
  );
}

export default App;