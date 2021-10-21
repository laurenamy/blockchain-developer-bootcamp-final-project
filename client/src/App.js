import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap'
import { simpleStorageAbi } from './abi/SimpleStorage';
import { coinCollectionAbi } from './abi/CoinCollection';

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
  const contractAddr = '0x442079158149CC612111FE4b0Cd0f7f6d4f9f9F6'
  const SimpleContract = new web3.eth.Contract(simpleStorageAbi, contractAddr)
  const CoinCollectionContract = new web3.eth.Contract(coinCollectionAbi, contractAddr)
  console.log({CoinCollectionContract})
  console.log({SimpleContract})

  const onSubmit = async (e) => {
    try {
      const res = await CoinCollectionContract.methods.createCollection()
      console.log('Transaction submitted: ', res)
      console.log({res})
    } catch (error) {
      console.log('Collection creation error: ', error)
    }

  }


  // const handleGet = async (e) => {
  //   e.preventDefault();
  //   const result = await SimpleContract.methods.get().call();
  //   setGetNumber(result);
  //   console.log(result);
  // }

  // const handleSet = async (e) => {
  //   e.preventDefault();    
  //   const accounts = await window.ethereum.enable();
  //   const account = accounts[0];
  //   const gas = await SimpleContract.methods.set(number)
  //                       .estimateGas();
  //   const result = await SimpleContract.methods.set(number).send({
  //     from: account,
  //     gas 
  //   })
  //   console.log(result);
  // }

  return (
    <div className="App">
      <header className="App-header">
        {/* <form onSubmit={onSubmit}>
          <label>
            Set Number:
            <input 
              type="text"
              name="name"
              value={number}
              onChange={ e => setNumber(e.target.value) } />
          </label>
          <input type="submit" value="Set Number" />
        </form> */}
        <br/>
        <button
          onClick={onSubmit}
          type="button" > 
          Get Number 
        </button>
        { getNumber }
      </header>
    </div>  
  );
}

export default App;