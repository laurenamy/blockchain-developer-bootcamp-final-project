import React, { useEffect, useState } from 'react'
import CrowdFund from '../../abi/Crowdfund'
import { useWeb3 } from '@openzeppelin/network/react';
import Web3 from 'web3'
import { Button } from 'react-bootstrap'
import { CHARITIES } from '../../constants'

const CreateFundForm = () => {
  const web3 = new Web3(Web3.givenProvider)
  const [number, setNumber] = useState(0);
    /// @notice Create a fund
  /// @param _title The title of the fund
  /// @param _description The description of the fund
  /// @param _end The end date (in seconds) for the fund
  /// @param _target The goal for the fund (in eth)
  /// @param _donationRecipient The address for the recipient of the donation
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [end, setEnd] = useState(null)
  const [target, setTarget] = useState(0)
  const [donationReceipient, setDonationReceipient] = useState(null)
  // const web3Context = useWeb3('wss://ropsten.infura.io/ws/v3/a9bdcdb2d94a4c8882b5ad5b591899ca')

  // const { accounts } = web3Context
  // console.log('accounts: ', accounts)

  const crowdFundAddress = '0x12CE4AcC77e1e9D38F41eE1584d54e9bB889CE63'
  const CrowdFundContract = new web3.eth.Contract(CrowdFund.abi, crowdFundAddress)


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


    const onSubmit = async event => {
      console.log({title})
      console.log({description})
      console.log({donationReceipient})
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
    /// @notice Create a fund
  /// @param _title The title of the fund
  /// @param _description The description of the fund
  /// @param _end The end date (in seconds) for the fund
  /// @param _target The goal for the fund (in eth)
  /// @param _donationRecipient The address for the recipient of the donation

  return (
    <div>
      <h1>Create a CrowdFund</h1>
      <form onSubmit={onSubmit}>
        <label>
          Title:
          <br />
          <input 
            type="text"
            name="title"
            value={title}
            onChange={e => setTitle(e.target.value) }
          />
        </label>
        <br />
        <label>
          Description:
          <br />
          <textarea 
            type="text"
            name="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          Target (in eth):
          <br />
          <input 
            type="text"
            name="target"
            value={target}
            onChange={e => setTarget(e.target.value)}
          />
        </label>
        <br />
        {CHARITIES.length && (
          CHARITIES.map(charity => {
            return (
              <>
                <input 
                  type="radio" 
                  value={charity.name} 
                  name="charity"
                  key={charity.name}
                  onChange={e => setDonationReceipient(charity.address)}
                /> {charity.name}
              </>
            )
          })
        )}
        <br />
        {/* <input type="submit" value="Create" className="btn btn-primary" /> */}
        <Button type="submit" value="Create" onClick={onSubmit}>Create</Button>
      </form>
      <br/>
    </div>  
  )
}

export default CreateFundForm