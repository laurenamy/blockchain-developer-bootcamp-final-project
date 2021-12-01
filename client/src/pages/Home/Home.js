import React, { useEffect, useState } from 'react'

import { FundsList, Header } from '../../components'
import CrowdFund from '../../abi/Crowdfund'

import { useWeb3 } from '@openzeppelin/network/react';
import Web3 from 'web3'

const infuraProjectId = 'a9bdcdb2d94a4c8882b5ad5b591899ca';

function Home() {
  // const [number, setNumber] = useState(0);
  // const [getNumber, setGetNumber] = useState('0x00');
  // const [address, setAddress] = useState(0)
  // const [balance, setBalance] = useState(0x00)
  const web3 = new Web3(Web3.givenProvider)
  const web3Context = useWeb3('wss://ropsten.infura.io/ws/v3/a9bdcdb2d94a4c8882b5ad5b591899ca')

  const { accounts } = web3Context
  console.log('accounts: ', accounts)

  const crowdFundAddress = '0x12CE4AcC77e1e9D38F41eE1584d54e9bB889CE63'
  const CrowdFundContract = new web3.eth.Contract(CrowdFund.abi, crowdFundAddress)

  // const funds = await CrowdFundContract.methods.getAllFunds()

  // useEffect(() => {
  //   if (!accounts?.length) return
  //   setAddress(accounts[0])
  //   const init = async () => {
  //     const wei = await web3.eth.getBalance(accounts[0])
  //     const bal = await web3.utils.fromWei(String(wei))
  //     setBalance(bal)
  //   }
  //   init()
  // }, [setAddress, setBalance, accounts, web3])


  console.log({CrowdFundContract})

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
      //   // gas
      // })
      // const res = await CoinContract.methods.admin().call()
      // console.log('res: ', res)
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
    <div>
      <header>
        <FundsList />
      </header>
    </div>  
  );
}

export default Home