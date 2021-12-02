import React from 'react'
import { FundsList, Hero } from '../../components'
import CrowdFund from '../../abi/Crowdfund'
import { useWeb3 } from '@openzeppelin/network/react';
import Web3 from 'web3'

function Home() {
  return (
    <div>
      <header>
        <Hero />
        <FundsList />
      </header>
    </div>  
  );
}

export default Home