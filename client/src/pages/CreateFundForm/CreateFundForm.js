import React, { useEffect, useState } from 'react'
import CrowdFund from '../../abi/Crowdfund'
import { useWeb3 } from '@openzeppelin/network/react';
import Web3 from 'web3'
import { Button, Alert } from 'react-bootstrap'
import { CHARITIES } from '../../constants'
import styles from './CreateFundForm.module.css'
import DatePicker from 'react-datepicker'
import { useMetaMask } from "metamask-react"
import { useNavigate } from 'react-router-dom'

const CreateFundForm = () => {
  const web3 = new Web3(Web3.givenProvider)
  const [number, setNumber] = useState(0);
  const { account } = useMetaMask()
  const navigate = useNavigate()
    /// @notice Create a fund
  /// @param _title The title of the fund
  /// @param _description The description of the fund
  /// @param _end The end date (in seconds) for the fund
  /// @param _target The goal for the fund (in eth)
  /// @param _donationRecipient The address for the recipient of the donation
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [end, setEnd] = useState(new Date().setDate(new Date().getDate() + 7))
  const [target, setTarget] = useState(.001)
  const [donationRecipient, setDonationReceipient] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  // const web3Context = useWeb3('wss://ropsten.infura.io/ws/v3/a9bdcdb2d94a4c8882b5ad5b591899ca')

  // const { accounts } = web3Context
  // console.log('accounts: ', accounts)

  const crowdFundAddress = '0x12CE4AcC77e1e9D38F41eE1584d54e9bB889CE63'
  const CrowdFundContract = new web3.eth.Contract(CrowdFund.abi, crowdFundAddress)
  console.log({CrowdFundContract})

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
    event.preventDefault()
    setLoading(true)
    // console.log({title})
    // console.log({description})
    // console.log({donationRecipient})
    // console.log({end})
    try {
        /// @notice Create a fund
      /// @param _title The title of the fund
      /// @param _description The description of the fund
      /// @param _end The end date (in seconds) for the fund
      /// @param _target The goal for the fund (in eth)
      /// @param _donationRecipient The address for the recipient of the donation
      const args = [
        title,
        description,
        web3.utils.toBN(end),
        web3.utils.toWei(String(target)),
        donationRecipient
      ]

      const tx = await CrowdFundContract.methods.createFund(...args).send({
        from: account
      })
      console.log('Transaction submitted: ', tx)

      if (tx.events.FundCreated) {
        setSuccess('Your fund has been created!')
        navigate('/')
      } else {
        setError('Transaction failed. Try again later.')
      }

      setLoading(false)
    } catch (error) {
      console.log({error})
      setError('Transaction failed. Try again later.')
      setLoading(false)
    }
  }

  return (
    <div className={styles.form}>
      <h1>Create a CrowdFund</h1>
      {error && (
        <Alert variant='danger'>
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant='success'>
          {success}
        </Alert>
      )}
      <DatePicker
        selected={end}
        onChange={(date) => setEnd(date)} 
        minDate={new Date().setDate(new Date().getDate() + 7)}
      />
      <form onSubmit={onSubmit}>
        <label>
          Title:
          <br />
          <input 
            type="text"
            name="title"
            value={title}
            onChange={e => setTitle(e.target.value) }
            required
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
            required
          />
        </label>
        <br />
        <label>
          Target (in eth):
          <br />
          <input 
            type="number"
            name="target"
            min=".001"
            step=".0001"
            value={target}
            onChange={e => setTarget(e.target.value)}
            required
          />
        </label>
        <br />
        {CHARITIES.length && (
          CHARITIES.map(charity => {
            return (
              <div className={styles.radio}>
                <input
                  type="radio" 
                  value={charity.name} 
                  name="charity"
                  key={charity.name}
                  onChange={e => setDonationReceipient(charity.address)}
                  required
                />
                <span className={styles.radioLabel}>{charity.name}</span>
              </div>
            )
          })
        )}
        <br />
        {/* <input type="submit" value="Create" className="btn btn-primary" /> */}
        <Button type="submit" value="Create" >Create</Button>
      </form>
      <br/>
    </div>  
  )
}

export default CreateFundForm