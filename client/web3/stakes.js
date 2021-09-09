import { myWeb3, eth, getInstance } from './provider'
import { toTokenDecimals, toTokenUnits, toNumber, getAccount } from './utils'

import StakingRewardPool from "./artifacts/StakingRewardPool.json"
import CakeLP from "./artifacts/CakeLP.json"
import ETB from "./artifacts/ETB.json"

export const getStakedBalance = async () => {
  const account = await getAccount()
  const cakeLP = await getInstance(CakeLP)
  const pool = await getInstance(StakingRewardPool)
  const response = await pool.getStakedBalance.call({from: account}) 
  const staked = await toNumber(cakeLP, response, 4)

  return staked
}


export const startStake = async (amount) => {

    const account = await getAccount()
    const pool = await getInstance(StakingRewardPool)
    const cakeLP = await getInstance(CakeLP)
    const amountDecimals = await toTokenDecimals(cakeLP, amount)

    return new Promise( async (resolve, reject)  => {
      try {
        const result = await pool.depositAndStartStake(amountDecimals, { from: account } )
  
        resolve(result)
      } catch (error) {
        reject(error)
      }
    });
}


export const endStake = async (amount) => {

  const account = await getAccount()
  const pool = await getInstance(StakingRewardPool)
  const cakeLP = await getInstance(CakeLP)
  const amountDecimals = await toTokenDecimals(cakeLP, amount)
  
  return new Promise( async (resolve, reject)  => {
    try {
      const result = await pool.endStakeAndWithdraw(amountDecimals, { from: account } )
      resolve(result)
    } catch (error) {
      reject(error)
    }
  });
}


export const claimReward = async () => {
  const account = await getAccount()
  const pool = await getInstance(StakingRewardPool)
  return new Promise( async (resolve, reject)  => {
    try {
      const result = await pool.claimReward( { from: account } )
      resolve(result)
    } catch (error) {
      reject(error)
    }
  });

}


export const getClaimableRewards = async () => {

  const pool = await getInstance(StakingRewardPool)
  const etb = await getInstance(ETB)
  const cakeLP = await getInstance(CakeLP)
  const account = await getAccount()

  return new Promise( async (resolve, reject)  => {
    try {
      const result = await pool.claimableReward({from: account})
      const reward = await toNumber(etb, result, 4)
      resolve(reward)
    } catch (error) {
      reject(error)
    }
  });

}

