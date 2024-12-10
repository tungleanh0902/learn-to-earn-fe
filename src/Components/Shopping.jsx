import React, { useState, useEffect } from 'react';
import Check from '../assets/Check.png'
import { createTransaction } from '../api/helper';
import {
  useTonConnectUI,
  useTonWallet
} from "@tonconnect/ui-react";
import addNotification from 'react-push-notification';
import { createSeasonBadgeStore } from "../api/seasonBadge.api";
import { createUserStore } from "../api/user.api";
import { createVoucherStore } from "../api/voucher.api";
import Popup from './Popups/Popup';
import { useSendTransaction, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";
import kaialogo from '../assets/kaia.jpeg';
import tonwallet from '../assets/Tonwallet.png';
import { abi } from '../contracts/badge.json'

const Shopping = () => {
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const { data: hash, sendTransaction, error } = useSendTransaction()
  const { data: contractHash, writeContract } = useWriteContract()

  const { address, isConnected, caipAddress, status } = useAppKitAccount()
  const modal = useAppKit()

  const buyNft = createSeasonBadgeStore(state => state.buyNft)
  const buyNftEvm = createSeasonBadgeStore(state => state.buyNftEvm)
  const currentSeasonBadge = createSeasonBadgeStore(state => state.currentSeasonBadge)
  const seasonBadge = createSeasonBadgeStore(state => state.seasonBadge)
  const checkBoughtSeasonBadge = createSeasonBadgeStore(state => state.checkBoughtSeasonBadge)
  const [loading, setLoading] = useState(false);
  const token = createUserStore(state => state.token)
  const buyMoreQuizz = createUserStore(state => state.buyMoreQuizz)
  const buyMoreQuizzEvm = createUserStore(state => state.buyMoreQuizzEvm)
  const userInfo = createUserStore(state => state.userInfo)
  const getMintBodyData = createUserStore(state => state.getMintBodyData)
  const saveStreak = createUserStore(state => state.saveStreak)
  const saveStreakEvm = createUserStore(state => state.saveStreakEvm)
  const getUserInfo = createUserStore(state => state.getUserInfo)
  const checkedYesterday = createUserStore(state => state.checkedYesterday)
  const isApiLoading = createUserStore(state => state.isApiLoading)
  const checkedToday = createUserStore(state => state.checkedToday)
  const buyVoucher = createVoucherStore(state => state.buyVoucher)
  const buyVoucherEvm = createVoucherStore(state => state.buyVoucherEvm)
  const getVouchers = createVoucherStore(state => state.getVouchers)
  const availableVoucher = createVoucherStore(state => state.availableVoucher)

  const [isHidden, setIsHidden] = useState(true)
  const [key, setKey] = useState("")
  const [selectedNetwork, setSelectedNetwork] = useState("kaia")
  const [isWallet, setIsWallet] = useState(false)
  const [option, setOption] = useState(null)

  const handleClose = () => {
    setIsHidden(true)
  }

  const handleBuyMoreQuizzGroup = async () => {
    if (selectedNetwork == "ton") {
      console.log("ton");
      await handleBuyMoreQuizz()
    } else if (selectedNetwork == "kaia") {
      console.log("kaia");
      await handleBuyMoreQuizzEvm()
    }
  }

  const handleBuyMoreQuizzEvm = async () => {
    try {
      if (userInfo.evmAddress == null) {
        throw addNotification({
          message: 'Connect your Kaia wallet in Misson tab first',
          theme: 'red',
        })
      }
      if (userInfo.evmAddress != address) {
        await tonConnectUI.disconnect()
        throw addNotification({
          message: 'Wrong wallet',
          theme: 'red',
        })
      }
      setLoading(true);
      let ownerAddress = import.meta.env.VITE_ADMIN_EVM_WALLET
      let amount = import.meta.env.VITE_MORE_QUIZZ_FEE_EVM
      sendTransaction({ to: ownerAddress, value: amount })
    } catch (error) {
      console.error(e);
      return setLoading(false);
    } finally {
      return setLoading(false);
    }
  }

  const handleBuyMoreQuizz = async () => {
    try {
      if (userInfo.address == null) {
        throw addNotification({
          message: 'Connect your wallet in Misson tab first',
          theme: 'red',
        })
      }
      if (userInfo.address != wallet.account.address) {
        await tonConnectUI.disconnect()
        throw addNotification({
          message: 'Wrong wallet',
          theme: 'red',
        })
      }
      setLoading(true);
      console.log(wallet);
      let tx = createTransaction(import.meta.env.VITE_ADMIN_WALLET.toString(), import.meta.env.VITE_MORE_QUIZZ_FEE.toString(), null)
      const result = await tonConnectUI.sendTransaction(tx);
      await buyMoreQuizz(
        {
          boc: result.boc,
        }
      )
    } catch (e) {
      console.log(e);
      return setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  const handleBuyNftGroup = async () => {
    if (selectedNetwork == "ton") {
      console.log("ton");
      await handleBuyNft()
    } else if (selectedNetwork == "kaia") {
      console.log("kaia");
      await handleBuyNftEvm()
    }
  }

  const handleBuyNftEvm = async () => {
    try {
      if (userInfo.evmAddress == null) {
        throw addNotification({
          message: 'Connect your Kaia wallet in Misson tab first',
          theme: 'red',
        })
      }
      if (userInfo.evmAddress != address) {
        await tonConnectUI.disconnect()
        throw addNotification({
          message: 'Wrong wallet',
          theme: 'red',
        })
      }
      let contractAddress = import.meta.env.VITE_BADGE_CONTRACT
      let amount = import.meta.env.VITE_MINT_NFT_FEE_EVM
      let evmAddress = import.meta.env.VITE_ADMIN_EVM_WALLET
      if (userInfo?.refUser) {
        let user = await getUserInfo(userInfo?.refUser) 
        if (user.evmAddress) {
          evmAddress = user.evmAddress 
        }
      }
      console.log(contractAddress);
      console.log(evmAddress);
      console.log(amount);
      await writeContract({
        address: contractAddress,
        abi,
        functionName: 'mintNFT',
        args: [evmAddress],
        value: amount,
      })
  
    } catch (error) {
      console.error(e);
      return setLoading(false);
    } finally {
      return setLoading(false);
    }
  }

  const handleBuyNft = async () => {
    console.log("handleBuyNft");
    try {
      if (userInfo.address == null) {
        throw addNotification({
          message: 'Connect your wallet in Misson tab first',
          theme: 'red',
        })
      }
      if (userInfo.address != wallet.account.address) {
        await tonConnectUI.disconnect()
        throw addNotification({
          message: 'Wrong wallet',
          theme: 'red',
        })
      }
      setLoading(true);
      const innerSeasonBadge = await currentSeasonBadge()
      let bodyData = await getMintBodyData({
        refUserId: userInfo?.refUser,
        tokenId: innerSeasonBadge.nextItemIndex
      }, token)

      console.log(wallet);
      let total = Number(import.meta.env.VITE_MINT_FEE) + Number(import.meta.env.VITE_STORE_COIN)
      let tx = createTransaction(innerSeasonBadge.address, total.toString(), bodyData)
      const result = await tonConnectUI.sendTransaction(tx);
      await buyNft(
        {
          badgeId: innerSeasonBadge._id,
          tokenId: innerSeasonBadge.nextItemIndex,
          boc: result.boc,
        },
        token
      )
    } catch (e) {
      console.error(e);
      return setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  const handleSaveStreakGroup = async () => {
    if (checkedToday == true) {
      throw addNotification({
        message: 'Already checkin today',
        theme: 'red',
      })
    }
    if (selectedNetwork == "ton") {
      console.log("ton");
      await handleSaveStreak()
    } else if (selectedNetwork == "kaia") {
      console.log("kaia");
      await handleSaveStreakEvm()
    }
  }

  const handleSaveStreakEvm = async () => {
    try {
      if (userInfo.evmAddress == null) {
        throw addNotification({
          message: 'Connect your Kaia wallet in Misson tab first',
          theme: 'red',
        })
      }
      if (userInfo.evmAddress != address) {
        await tonConnectUI.disconnect()
        throw addNotification({
          message: 'Wrong wallet',
          theme: 'red',
        })
      }
      setLoading(true);
      let ownerAddress = import.meta.env.VITE_ADMIN_EVM_WALLET
      let amount = import.meta.env.VITE_SAVE_STREAK_FEE_EVM
      sendTransaction({ to: ownerAddress, value: amount })
    } catch (error) {
      console.error(e);
      return setLoading(false);
    } finally {
      return setLoading(false);
    }
  }

  const handleSaveStreak = async () => {
    try {
      if (userInfo.address == null) {
        throw addNotification({
          message: 'Connect your wallet in Misson tab first',
          theme: 'red',
        })
      }
      if (userInfo.address != wallet.account.address) {
        await tonConnectUI.disconnect()
        throw addNotification({
          message: 'Wrong wallet',
          theme: 'red',
        })
      }
      setLoading(true);
      let tx = createTransaction(import.meta.env.VITE_ADMIN_WALLET.toString(), import.meta.env.VITE_STREAK_FEE.toString(), null)
      const result = await tonConnectUI.sendTransaction(tx);
      await saveStreak(
        {
          boc: result.boc,
        },
      )
    } catch (e) {
      console.error(e);
      return setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  const handleBuyLicenseGroup = async () => {
    console.log("handleBuyLicenseGroup");
    if (availableVoucher == 0) {
      throw addNotification({
        message: 'Out of available license',
        theme: 'red',
      })
    }
    if (selectedNetwork == "ton") {
      console.log("ton");
      await handleBuyLicenseTon()
    } else if (selectedNetwork == "kaia") {
      console.log("kaia");
      await handleBuyLicenseEvm()
    }
  }

  const handleBuyLicenseEvm = async () => {
    console.log("handleBuyLicenseEvm");
    try {
      if (userInfo.evmAddress == null) {
        throw addNotification({
          message: 'Connect your Kaia wallet in Misson tab first',
          theme: 'red',
        })
      }
      if (userInfo.evmAddress != address) {
        await tonConnectUI.disconnect()
        throw addNotification({
          message: 'Wrong wallet',
          theme: 'red',
        })
      }
      setLoading(true);
      let ownerAddress = import.meta.env.VITE_ADMIN_EVM_WALLET
      let amount = import.meta.env.VITE_BUY_LICENSE_EVM
      sendTransaction({ to: ownerAddress, value: amount })
    } catch (e) {
      console.error(e);
      return setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  const handleBuyLicenseTon = async () => {
    console.log("handleBuyLicenseTon");
    try {
      if (userInfo.address == null) {
        throw addNotification({
          message: 'Connect your wallet in Misson tab first',
          theme: 'red',
        })
      }
      if (userInfo.address != wallet.account.address) {
        await tonConnectUI.disconnect()
        throw addNotification({
          message: 'Wrong wallet',
          theme: 'red',
        })
      }
      setLoading(true);
      let tx = createTransaction(import.meta.env.VITE_ADMIN_WALLET.toString(), import.meta.env.VITE_BUY_LICENSE.toString(), null)
      const result = await tonConnectUI.sendTransaction(tx);
      let data = await buyVoucher(
        {
          boc: result.boc,
        },
        token
      )
      setKey(data.voucher.code)
      setIsHidden(false)
      await getVouchers(token)
    } catch (e) {
      console.error(e);
      return setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (selectedNetwork == "ton" && !wallet) {
      console.log("ton");
      setIsWallet(false)
    }
    if (selectedNetwork == "kaia" && !isConnected) {
      console.log("kaia");
      setIsWallet(false)
    }
    if (selectedNetwork == "ton" && wallet) {
      setIsWallet(true)
    }
    if (selectedNetwork == "kaia" && isConnected) {
      setIsWallet(true)
    }
  }, [wallet, isConnected, selectedNetwork])

  const handleConnectWallet = () => {
    if (selectedNetwork == "ton") {
      tonConnectUI.openModal()
    } else if (selectedNetwork == "kaia") {
      modal.open()
    }
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: hash ?? contractHash,
    })

  useEffect(() => {
    async function fetch() {
      try {
        switch (option) {
          case "license":
            let data = await buyVoucherEvm({
              tx: hash
            }, token)
            setKey(data.voucher.code)
            setIsHidden(false)
            await getVouchers(token)
            break;
          case "badge":
            await buyNftEvm(
              {
                badgeId: seasonBadge._id,
                tokenId: 0,
                tx: contractHash,
              },
              token
            )
            break;
          case "quizz":
            await buyMoreQuizzEvm({
              tx: hash
            })
            break;
          case "streak":
            await saveStreakEvm({
              tx: hash
            })
            break;
          default:
            break;
        }
      } catch (error) {
        console.log(error);
      }
    }
    console.log(hash);
    console.log(contractHash);
    console.log(isConfirmed);
    if ((hash || contractHash) && isConfirmed) {
      console.log(isConfirmed);
      fetch()
    }
  }, [hash, isConfirmed, contractHash])

  return (
    <div className="bg-[#1e1e1e] relative justify-center w-full h-full flex items-center">
      <div className="bg-[#1e1e1e] w-screen h-[90vh] overflow-x-hidden overflow-y-auto">
        {
          isHidden ?
            <></>
            :
            <Popup
              code={key}
              handleClose={handleClose}
            />
        }
        <button
          onClick={() => {
            if (selectedNetwork == "ton") {
              setSelectedNetwork("kaia")
            } else {
              setSelectedNetwork("ton")
            }
          }}
          className="fixed rounded-[20px] [text-shadow:0px_4px_11px_#00000040] font-adlam-display text-2xl z-30 right-[50px] top-[100px]">
          <img className='rounded-full w-[30px]' src={selectedNetwork == "ton" ? tonwallet : kaialogo} alt="" />
        </button>
        <div className="relative mt-[15px] bg-[#1e6252] w-[80vw] h-[46vh] left-[10vw] rounded-[15px]">
          <div className="relative pt-[4vh] font-adlam-display text-4xl text-white [text-shadow:0px_4px_4px_#00000040]">Special shop</div>

          <div className="relative font-medium text-[24px] pt-[1vh] pb-[1vh] text-white text-center font-afacad-variable">Mazii license</div>
          <div className="relative h-px w-[66vw] left-[7vw] bg-[#d9d9d936]"></div>

          <div className="grid grid-cols-4 gap-4 my-[10px] text-white">
            <div className='ml-[30px] w-[130px] text-left'>Activation period</div>
            <div className='ml-[120px] w-[120px] text-left'>1 year</div>
          </div>
          <div className="relative h-px w-[66vw] left-[7vw] bg-[#d9d9d936]"></div>
          <div className="grid grid-cols-4 gap-4 my-[10px] text-white">
            <div className='ml-[30px] w-[130px] text-left'>Activation date</div>
            <div className='ml-[120px] w-[120px] text-left'>2024-12-31</div>
          </div>
          <div className="relative h-px w-[66vw] left-[7vw] bg-[#d9d9d936]"></div>

          <div className="relative text-[#6f7478] text-white font-afacad-italic">
            <span>Only </span>
            <span className="line-through">30$</span>
            <span className> | 1 TON</span>
          </div>

          {isWallet ? (
            <button
              disabled={loading ? true : false}
              onClick={() => {
                setOption("license")
                handleBuyLicenseGroup()
              }}
              className="bottom-[3vh] bg-white rounded-[20px] w-[60vw] left-[10vw] [text-shadow:0px_4px_11px_#00000040] font-adlam-display text-2xl">
              <div className="py-[1vh]">
                {loading ? "Loading..." : "BUY NOW"}
              </div>
            </button>
          ) : (
            <button
              onClick={() => handleConnectWallet()}
              className="bottom-[3vh] bg-white rounded-[20px] w-[60vw] left-[10vw] [text-shadow:0px_4px_11px_#00000040] font-adlam-display text-2xl">
              <div className="py-[1vh]">
                Connect wallet
              </div>
            </button>
          )}
        </div>

        <div className="relative bg-[#1e3e62] w-[80vw] h-[58vh] top-[3vh] left-[10vw] rounded-[15px]">
          <div className="relative text-white top-[1vh] font-adlam-display text-3xl break-words [text-shadow:0px_4px_4px_#00000040]">
            Get more with Premium
          </div>

          <div className="relative top-[3vh] grid grid-cols-4 font-afacad-variable">
            <div className="col-start-3 col-span-1 text-base text-variable-collection-unactive text-[#6e7478]">Free</div>
            <div className="col-start-4 col-span-1 text-base text-white [text-shadow:0px_4px_13px_#00000075] font-medium relative left-[-2vw]">Premium</div>

            <div className="col-start-1 col-span-2 pt-[2vh] font-medium text-white text-left relative left-[7vw]">Points Multiplier</div>
            <div className="col-start-3 col-span-1 pt-[2vh] text-[#6e7478]">1x</div>
            <div className="col-start-4 col-span-1 pt-[2vh] text-white relative left-[-2vw]">2x</div>
            <div className="col-start-1 col-span-4 h-px bg-[#d9d9d936] relative left-[7vw] max-w-[66vw]"></div>

            <div className="col-start-1 col-span-2 pt-[1.5vh] font-medium text-white text-left relative left-[7vw]">Game tickets</div>
            <div className="col-start-3 col-span-1 pt-[1.5vh] text-[#6e7478]">8/day</div>
            <div className="col-start-4 col-span-1 pt-[1.5vh] text-white relative left-[-2vw]">25/day</div>
            <div className="col-start-1 col-span-4 h-px bg-[#d9d9d936] relative left-[7vw] max-w-[66vw]"></div>

            <div className="col-start-1 col-span-2 pt-[1vh] font-medium text-white text-left relative left-[7vw]">NFT Badge</div>
            {/* <div className="col-start-3 col-span-1 pt-[1vh] text-[#6e7478]">8/day</div> */}
            <img src={Check} alt="Check" className="col-start-4 col-span-1 pt-[1.5vh] relative left-[5vw]" />
            <div className="col-start-1 col-span-4 h-px bg-[#d9d9d936] relative left-[7vw] max-w-[66vw]"></div>

            <div className="col-start-1 col-span-2 pt-[1.5vh] font-medium text-white text-left relative left-[7vw]">Special Campaign</div>
            {/* <div className="col-start-3 col-span-1 pt-[1vh] text-[#6e7478]">8/day</div> */}
            <img src={Check} alt="Check" className="col-start-4 col-span-1 pt-[1.5vh] relative left-[5vw]" />
            <div className="col-start-1 col-span-4 h-px bg-[#d9d9d936] relative left-[7vw] max-w-[66vw]"></div>
          </div>

          <div className="relative text-[#6f7478] top-[5vh] font-afacad-italic">
            <span>Only </span>
            <span className="line-through">5 TON</span>
            <span className> | 2 TON</span>
          </div>

          {
            isWallet ?
              <button
                disabled={checkBoughtSeasonBadge || loading}
                onClick={() => {
                  setOption("badge")
                  handleBuyNftGroup()
                }}
                className="bg-white rounded-[20px] text-xl font-bold font-adlam-display absolute bottom-[4vh] w-[70vw] left-[5vw] py-[1vh]">
                {checkBoughtSeasonBadge ? "Already have this season badge" : loading ? "Loading..." : "BUY PREMIUM NOW"}
              </button>
              :
              <button
                onClick={() => handleConnectWallet()}
                className="bg-white rounded-[20px] text-xl font-bold font-adlam-display absolute bottom-[4vh] w-[70vw] left-[5vw] py-[1vh]">
                Connect wallet
              </button>
          }
        </div>

        <div className="relative top-[6vh] bg-[#1e3e62] w-[80vw] h-[33vh] left-[10vw] rounded-[15px]">
          <div className="font-nunito-bold text-white text-2xl left-[-15vw] relative top-[2vh]">
            Special Quizz
          </div>

          <div className="relative grid grid-cols-4 font-afacad-variable text-white">
            <div className="col-start-1 col-span-2 pt-[2vh] font-medium text-white text-left relative left-[7vw]">Points Multiplier</div>
            <div className="col-start-4 col-span-1 pt-[2vh] relative left-[-2vw]">5x</div>
            <div className="col-start-1 col-span-4 h-px bg-[#d9d9d936] relative left-[7vw] max-w-[66vw]"></div>

            <div className="col-start-1 col-span-2 pt-[1.5vh] font-medium text-white text-left relative left-[7vw]">Special Campaign</div>
            {/* <div className="col-start-3 col-span-1 pt-[1vh] text-[#6e7478]">8/day</div> */}
            <img src={Check} alt="Check" className="col-start-4 col-span-1 pt-[1.5vh] relative left-[5vw]" />
            <div className="col-start-1 col-span-4 h-px bg-[#d9d9d936] relative left-[7vw] max-w-[66vw]"></div>

            <div className="col-start-1 col-span-2 pt-[2vh] font-medium text-white text-left relative left-[7vw]">Bought quizz</div>
            <div className="col-start-4 col-span-1 pt-[2vh] relative left-[-2vw]">{userInfo.moreQuizz ?? 0}</div>
            <div className="col-start-1 col-span-4 h-px bg-[#d9d9d936] relative left-[7vw] max-w-[66vw]"></div>
          </div>

          {isWallet ? (
            <div className="absolute bg-white rounded-[15px] bottom-[1vh] right-[4vw]">
              <button
                disabled={loading}
                onClick={() => {
                  setOption("quizz")
                  handleBuyMoreQuizzGroup()
                }}
                className="relative px-[2vw] py-[1vh] font-adlam-display [text-shadow:0px_4px_11px_#00000040]">
                {loading ? "Loading..." : "BUY Special Quizz Now!"}
              </button>
            </div>
          ) : (
            <div className="absolute bg-white rounded-[15px] bottom-[3vh] right-[4vw]">
              <button
                onClick={() => handleConnectWallet()}
                className="relative px-[2vw] py-[1vh] font-adlam-display [text-shadow:0px_4px_11px_#00000040]">
                Connect wallet
              </button>
            </div>
          )}
        </div>

        <div className="relative top-[9vh] bg-[#1e6252] w-[80vw] h-[40vh] left-[10vw] rounded-[15px] mb-[140px]">
          <div className="relative pt-[4vh] font-adlam-display text-3xl text-white [text-shadow:0px_4px_4px_#00000040]">Streak Saver</div>

          <div className="relative font-medium pt-[3vh] pb-[1vh] text-white text-left left-[7vw] font-afacad-variable">Automatic save your streak</div>
          <div className="relative h-px w-[66vw] left-[7vw] bg-[#d9d9d936]"></div>

          <div className="relative grid grid-cols-4">
            <div className="relative col-start-1 col-span-3 text-left left-[7vw] text-white font-afacad-variable py-[1vh] font-medium">Pricing</div>
            <div className="relative col-start-4 col-span-1 text-white right-[7vw] font-afacad-variable py-[1vh] font-medium">0.1 Ton/day</div>
          </div>
          <div className="relative h-px w-[66vw] left-[7vw] bg-[#d9d9d936]"></div>

          {isWallet ? (
            <button
              disabled={checkedYesterday || userInfo?.hasStreakSaver ? true : loading ? true : false}
              onClick={() => {
                setOption("streak")
                handleSaveStreakGroup()
              }}
              className="absolute bottom-[5vh] bg-white rounded-[20px] w-[60vw] left-[10vw] [text-shadow:0px_4px_11px_#00000040] font-adlam-display text-2xl">
              <div className="py-[1vh]">
                {isApiLoading ? "Loading..." : checkedYesterday || userInfo?.hasStreakSaver == true ? "On streak" : loading ? "Loading..." : "Buy streak"}
              </div>
            </button>
          ) : (
            <button
              onClick={() => handleConnectWallet()}
              className="absolute bottom-[5vh] bg-white rounded-[20px] w-[60vw] left-[10vw] [text-shadow:0px_4px_11px_#00000040] font-adlam-display text-2xl">
              <div className="py-[1vh]">
                Connect wallet
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shopping;