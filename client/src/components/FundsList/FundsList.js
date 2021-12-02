import React, { useEffect, useState } from 'react'
import CrowdFund from '../../abi/Crowdfund'
import Web3 from 'web3'
import { Container, Row } from 'react-bootstrap'
import { FundCard } from '..'



const FundsList = () => {
  const web3 = new Web3(Web3.givenProvider)
  const crowdFundAddress = '0x12CE4AcC77e1e9D38F41eE1584d54e9bB889CE63'
  const CrowdFundContract = new web3.eth.Contract(CrowdFund.abi, crowdFundAddress)
  const [funds, setFunds] = useState(null)
  const [loading, setLoading] = useState(false)

  const getAllFunds = async () => {
    if (funds !== null) return
    if (loading) return
    setLoading(true)
    const res = await CrowdFundContract.methods.getAllFunds().call()
    const activeFunds = await res.filter(fund => fund.active)
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
      </Container>
    </div>
  )
}

export default FundsList