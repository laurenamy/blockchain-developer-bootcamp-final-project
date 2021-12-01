const CrowdFund = artifacts.require('./contracts/CrowdFund.sol')
const { time } = require('@openzeppelin/test-helpers')

contract('CrowdFund', accounts => {
  let crowdFundInstance
  let fundId

  const admin = accounts[0]
  const fundOwner = accounts[1]
  const donationAccount = accounts[2]
  const contributor1 = accounts[3]
  const contributor2 = accounts[4]
  let now = new Date()
  now.setDate(now.getDate() + 7)
  const fundInfo = {
    title: 'Save the bees',
    description: 'Would you save a bee?',
    end: now.getTime(),
    target: web3.utils.toWei('5', 'ether'),
    donationRecipient: donationAccount
  }
  before(async () => {
    crowdFundInstance = await CrowdFund.deployed()
  })
  describe('successful funding', async () => {
    //  This test block moves through a successful funding of a crowdfund and the distribution of the eth.
    it('should initialize the coin collection contract', async () => {
      await crowdFundInstance.initialize({ from: accounts[0] })
  
      const contractAdmin = await crowdFundInstance.admin.call()
      assert.equal(admin, contractAdmin)
    })
    it('should create a fund', async () => {
      const event = await crowdFundInstance.createFund(
        fundInfo.title,
        fundInfo.description,
        fundInfo.end,
        fundInfo.target,
        fundInfo.donationRecipient, 
        { from: fundOwner}
      )
  
      assert.equal(event.logs[0].event, 'FundCreated')
      fundId = Number(event.logs[0].args[0])
    })
    it('should add eth to the contract', async () => {
      const event = await crowdFundInstance.contribute(fundId, {
        from: contributor1,
        value: await web3.utils.toWei('2', 'ether')
      })
      const balance = await web3.eth.getBalance(crowdFundInstance.address)
  
      assert.equal(event.logs[0].args[0], fundId)
      assert.equal(balance, web3.utils.toWei('2', 'ether'))
    })
    it('should add eth to the fund', async () => {
      const fundBalance = await crowdFundInstance.checkFunding(fundId)
      assert.equal(fundBalance, web3.utils.toWei('2', 'ether'))
    })
    it('should distribute eth when fully funded', async () => {
      const fundBalance1 = await crowdFundInstance.checkFunding(fundId)
      const donationBalance1 = await web3.eth.getBalance(donationAccount)
      const ownerBalance1 = await web3.eth.getBalance(fundOwner)
  
      await crowdFundInstance.contribute(fundId, {
        from: contributor2,
        value: web3.utils.toWei('3', 'ether')
      })
      const fundBalance2 = await crowdFundInstance.checkFunding(fundId)
      const donationBalance2 = await web3.eth.getBalance(donationAccount)
      const ownerBalance2 = await web3.eth.getBalance(fundOwner)
  
      assert.equal(web3.utils.fromWei(fundBalance2.sub(fundBalance1), 'ether'), 3)
      assert.isAbove(+ownerBalance2, +ownerBalance1)
      assert.isAbove(+donationBalance2, +donationBalance1)
    })
  })
})
