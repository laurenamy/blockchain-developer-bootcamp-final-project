import React, { useEffect, useState } from 'react'
import CrowdFund from '../../abi/Crowdfund'
import Web3 from 'web3'
import { Card, Container, ListGroup, ListGroupItem, Row, Col, Badge, Button, Alert } from 'react-bootstrap'
import truncateEthAddress from 'truncate-eth-address'
import { useMetaMask } from "metamask-react"

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

  const getAllFunds = async () => {
    if (funds !== null) return
    const res = await CrowdFundContract.methods.getAllFunds().call()
    const activeFunds = res.filter(fund => fund.active)
    console.log({activeFunds})
    setFunds(activeFunds)
  }
  useEffect(() => {
    getAllFunds()
  })


  const contribute = async (fundId, contribution) => {
    try {
      const tx = await CrowdFundContract.methods.contribute(web3.utils.toBN(fundId)).send({
        from: account,
        value: web3.utils.toWei(contribution)
      })
      console.log('Transaction submitted: ', tx)
      if (tx.events.DonationReceived) {
        setSuccess('You successfully contributed to this fund.')
      } else {
        setError('Transaction failed. Try again later.')
      }
    } catch (error) {
      setError(JSON.stringify(error))
      console.log({error})
    }
  }

  //   active: true
// currentAmount: "0"
// description: "please"
// donationRecipient: "0x521b87308a2df0534cDAa947d586eBeA6720d7fe"
// end: "1639066693987"
// id: "0"
// owner: "0xBDB3053356e3c8DD8A143DAfcBa9AE57Bd8b01ba"
// target: "1000000000000000"
// title: "clean water"

  return (
    <div>
      <h1>Active Funds</h1>
      <Container>
        <Row xs={1} md={2}>
          {funds && funds.length && (
            funds.map(fund => {
              return (
                <Col>
                  <Card key={+fund.id}>
                    <Card.Header as="h5">{fund.title}</Card.Header>
                    <Card.Title>{fund.description}</Card.Title>
                    <Card.Body>
                      <input 
                        type="number"
                        name="contribution"
                        min=".0001"
                        step=".0001"
                        value={contribution}
                        onChange={e => setContribution(e.target.value)}
                        required
                      />
                      <Button type="primary" onClick={() => contribute(+fund.id, contribution)}>Contribute</Button>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem>Target date: {getDateString(+fund.end)}</ListGroupItem>
                      <ListGroupItem>Current funding: {fund.currentAmount}</ListGroupItem>
                      <ListGroupItem>Funding goal: {web3.utils.fromWei(fund.target)}</ListGroupItem>
                    </ListGroup>
                    <Card.Footer>
                      Created by: <Badge bg="primary">{truncateEthAddress(fund.owner)}</Badge>
                    </Card.Footer>
                  </Card>
                </Col>
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