import React, { useEffect, useState } from 'react'
import CrowdFund from '../../abi/Crowdfund'
import Web3 from 'web3'
import { Card, ListGroup, ListGroupItem, Col, Badge, Button, Alert } from 'react-bootstrap'
import styles from './Hero.module.css'

const Hero = ({fund}) => {

  return (
    <Card bg="primary" className={styles.hero}>
      <Card.Body>
        <h1 className={styles.title}>Raise funds, do good.</h1>
        <h4 className={styles.tagline}>Do some good in the world by automatically donating to a charity of your choice when you raise funds, even if your goal isn't met.</h4>
      </Card.Body>
    </Card>
  )
}

export default Hero