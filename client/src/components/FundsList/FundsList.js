import React, { useEffect, useState } from 'react'
import CrowdFund from '../../abi/Crowdfund'
import Web3 from 'web3'
import { Card, Container, ListGroup, ListGroupItem, Row, Col, Badge, Button, Alert } from 'react-bootstrap'
import truncateEthAddress from 'truncate-eth-address'
import { useMetaMask } from "metamask-react"
import { FundCard } from '..'

const getDateString = (timestamp) => {
  const date = new Date(timestamp)
  return `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`
}

const FundsList = () => {
  const web3 = new Web3(Web3.givenProvider)
  const crowdFundAddress = '0x12CE4AcC77e1e9D38F41eE1584d54e9bB889CE63'
  const CrowdFundContract = new web3.eth.Contract(CrowdFund.abi, crowdFundAddress)
  const { account } = useMetaMask()
  const [funds, setFunds] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [contribution, setContribution] = useState(0)
  const [loading, setLoading] = useState(false)

  console.log({funds})

  const getAllFunds = async () => {
    if (funds !== null) return
    if (loading) return
    setLoading(true)
    const res = await CrowdFundContract.methods.getAllFunds().call()
    const activeFunds = await res.filter(fund => fund.active)
    console.log({activeFunds})
    setFunds(activeFunds)
    setLoading(false)
  }

  useEffect(() => {
    getAllFunds()
  })

  return (
    <div>
      <Container>
      <h1>Active Funds</h1>
        <Row xs={1} md={2}>
          {funds && funds.length && (
            funds.map(fund => {
              return (
                <FundCard fund={fund} key={fund.id} />
              )
            })
          )}
        </Row>
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
      </Container>
    </div>
  )
}

export default FundsList