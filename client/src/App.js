import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import Header from './components/Header/Header'
import { FundsList } from './components'
// import { simpleStorageAbi } from './abi/SimpleStorage';
// import { coinCollectionAbi } from './abi/CoinCollection';
// import CoinCollection from './abi/CoinCollection'
// import Coin from './abi/Coin'
import CrowdFund from './abi/Crowdfund'

import { useWeb3 } from '@openzeppelin/network/react';
import Web3 from 'web3'

const infuraProjectId = 'a9bdcdb2d94a4c8882b5ad5b591899ca';

function App() {
  const web3 = new Web3(Web3.givenProvider)
  const web3Context = useWeb3('wss://ropsten.infura.io/ws/v3/a9bdcdb2d94a4c8882b5ad5b591899ca')

  const { accounts } = web3Context
  console.log('accounts: ', accounts)

  const crowdFundAddress = '0x12CE4AcC77e1e9D38F41eE1584d54e9bB889CE63'
  const CrowdFundContract = new web3.eth.Contract(CrowdFund.abi, crowdFundAddress)


  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
    </div>  
  );
}

export default App;