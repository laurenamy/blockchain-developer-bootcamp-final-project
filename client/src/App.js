import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap'
import Header from './components/Header/Header'
// import { simpleStorageAbi } from './abi/SimpleStorage';
// import { coinCollectionAbi } from './abi/CoinCollection';
import CoinCollection from './abi/CoinCollection'
import Coin from './abi/Coin'

import { useWeb3 } from '@openzeppelin/network/react';
import Web3 from 'web3'

const infuraProjectId = 'a9bdcdb2d94a4c8882b5ad5b591899ca';

function App() {
  // const [number, setNumber] = useState(0);
  // const [getNumber, setGetNumber] = useState('0x00');
  const [address, setAddress] = useState(0)
  const [balance, setBalance] = useState(0x00)
  const web3 = new Web3(Web3.givenProvider)
  const web3Context = useWeb3('wss://ropsten.infura.io/ws/v3/a9bdcdb2d94a4c8882b5ad5b591899ca')
  const { accounts } = web3Context
  console.log('accounts: ', accounts)

  useEffect(() => {
    if (!accounts?.length) return
    setAddress(accounts[0])
    const init = async () => {
      const wei = await web3.eth.getBalance(accounts[0])
      const bal = await web3.utils.fromWei(String(wei))
      setBalance(bal)
    }
    init()
  }, [setAddress, setBalance, accounts, web3])

  console.log('account: ', address)
  console.log('balance: ', balance)

  const coinCollectionAddress = '0x739AE0F63107265490053Eda0f5d95232420A649'
  const coinAddress = '0x139C7A1f46501C466B62903c7EF9e22B3C15f044'
  
  const CoinCollectionContract = new web3.eth.Contract(CoinCollection.abi, coinCollectionAddress)
  const CoinContract = new web3.eth.Contract(Coin.abi, coinAddress)
  console.log({CoinCollectionContract})
  console.log({CoinContract})
  const metaData = {
    "description": "The most exclusive collector's edition coin.",
    "image": "https://gateway.pinata.cloud/ipfs/QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
    "name": "Game Release"
  }


  const onSubmit = async (e) => {
    // try {
    //   const res = await CoinCollectionContract.methods.createCollection()
    //   console.log('Transaction submitted: ', res)
    //   console.log({res})
    // } catch (error) {
    //   console.log('Collection creation error: ', error)
    // }
    try {
      // const gas = await CoinCollectionContract.methods.createCollection(
      //   coinAddress,
      //   20,
      //   metaData
      // ).estimateGas()
      // const res = await CoinCollectionContract.methods.createCollection(
      //   coinAddress,
      //   20,
      //   metaData
      // ).send({
      //   from: accounts[0],
      //   gas
      // })
      const res = await CoinContract.methods.admin().call()
      console.log('res: ', res)
    } catch (error) {
      console.log(error)
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
        <Header />
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
        {/* <button
          onClick={onSubmit}
          type="button" > 
          Create Collection 
        </button> */}

        <Button variant='primary' onClick={onSubmit}>Create Collection</Button>
        {/* { getNumber } */}
      </header>
    </div>  
  );
}

export default App;