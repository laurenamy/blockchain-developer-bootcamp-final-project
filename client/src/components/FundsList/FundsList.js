import React, { useEffect, useState } from 'react'
import CrowdFund from '../../abi/Crowdfund'
import { useWeb3 } from '@openzeppelin/network/react';
import Web3 from 'web3'

const FundsList = () => {
  const web3 = new Web3(Web3.givenProvider)
  // const web3Context = useWeb3('wss://ropsten.infura.io/ws/v3/a9bdcdb2d94a4c8882b5ad5b591899ca')

  // const { accounts } = web3Context
  // console.log('accounts: ', accounts)

  const crowdFundAddress = '0x12CE4AcC77e1e9D38F41eE1584d54e9bB889CE63'
  const CrowdFundContract = new web3.eth.Contract(CrowdFund.abi, crowdFundAddress)

  const [funds, setFunds] = useState(null)
  const getAllFunds = async () => {
    if (funds !== null) return
    const res = await CrowdFundContract.methods.getAllFunds()
    console.log({res})
  }
  useEffect(() => {
    getAllFunds()
  })

  return (
    <div>
      <h1>Active Funds</h1>
        {/* {funds.length && (
          funds.map(fund => {
            return (
              <h2>fund</h2>
            )
          })
        )} */}
    </div>
  )
}

export default FundsList