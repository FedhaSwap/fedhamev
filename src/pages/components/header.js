import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { ethers } from "ethers";
import Jazzicon from 'react-jazzicon'

import * as ed from '@noble/ed25519';

function trimAddress(address) {
    const length = address.length;
    const trimmedAddress = address.slice(0, 4) + "...." + address.slice(length - 4, length);
    return trimmedAddress;
}
function getAccountId(userAddress, brokerId) {
    const abiCoder = ethers.utils.defaultAbiCoder;
  
    // Pack brokerId as a string
    const encodedBrokerId = ethers.utils.formatBytes32String(brokerId);
  
    // Encode userAddress and packed brokerId
    const encodedData = abiCoder.encode(
      ['address', 'bytes32'],
      [userAddress, encodedBrokerId]
    );
  
    // Return the keccak256 hash of the encoded data
    return ethers.utils.keccak256(encodedData);
  }
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderColor: 'transparent',
        backgroundColor: "#198754"
    },
};


function Header() {

    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalSignInIsOpen, setSignIsOpen] = useState(false);
    const [WalletAddress, setWalletAddress] = useState(null)
    const [isSignedWallet, setSignedWallet] = useState(false)


    function openModal() {
        setIsOpen(true);
    }
    function openModalSignIn() {
        setSignIsOpen(true);
    }
    function afterOpenModal() {

    }
    function closeModal() {
        setIsOpen(false);
    }
    function closeModalSignIn() {
        setSignIsOpen(false);
    }
    async function connectWallet() {
        try {
            
                if (window.ethereum && window.ethereum.isMetaMask) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
               
                setWalletAddress(address)
                closeModal()
                openModalSignIn()
                }

        }
        catch (err) {
            alert('Error')
        }

    }
    async function signInWallet(){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const message = "Verify wallet connection";
        const signature = await signer.signMessage(message);
        if(signature){
          setSignedWallet(true)
          closeModalSignIn()
        }
    }
    async function getConnectedWallet(){
     
        const accounts = await window.ethereum.request({method: 'eth_accounts'});  
       
        if(accounts.length > 0){
             setWalletAddress(accounts[0])  
             console.log(getAccountId(accounts[0],'orderly'))  
             const privateKey = ed.utils.randomPrivateKey();

            async function generatePublicKey() {
            try {
                // Get the public key from the private key (Promise)
                const privKey = ed.utils.randomPrivateKey(); // Secure random private key
                const message = Uint8Array.from([0xab, 0xbc, 0xcd, 0xde]);
                const pubKey = await ed.getPublicKeyAsync(privKey); // Sync methods below
                const signature = await ed.signAsync(message, privKey);
                const isValid = await ed.verifyAsync(signature, message, pubKey);
                
            } catch (error) {
                console.error('Error generating public key:', error);
            }
            }

            generatePublicKey(); 
        }
        else{
            setWalletAddress(null)
        
            
        }
    }
    useEffect(()=>{
        if(window.ethereum && window.ethereum.isConnected()){
            getConnectedWallet()
        }
       
    },[])
    return (
        <>

            <div>

                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                      
                    <div className="row">
                        <div className='col-md-12'>
                            <h6 className="modal-title p1-color" id="exampleModalLabel" style={{ color: "white" }}>Connect Your Wallet</h6>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className='col-md-12'>
                            <a href="#"
                                onClick={() => { connectWallet() }}
                                className="modal_areastyle__item rounded-3 br2 px-3 px-md-4 py-2 py-md-3 d-flex align-items-center justify-content-between mb-5 mb-md-6">
                                <span className="fw_500" style={{ color: 'black', marginRight: 10 }}>Connect with Metamask</span>
                                <img src="assets/images/icon/dog.png" alt="Icon" />
                            </a>
                        </div>
                    </div>
                </Modal>
                <Modal
                    isOpen={modalSignInIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                      
                   
                    <div className="row mt-5">
                        <div className='col-md-12'>
                            <a href="#"
                                onClick={() => { signInWallet() }}
                                className="modal_areastyle__item rounded-3 br2 px-3 px-md-4 py-2 py-md-3 d-flex align-items-center justify-content-between mb-5 mb-md-6">
                                <span className="fw_500" style={{ color: 'black', marginRight: 10 }}>Sign In</span>
                                <img src="assets/images/icon/dog.png" alt="Icon" />
                            </a>

                        </div>
                    </div>
                </Modal>
            </div>
            {/* <button className="scrollToTop d-none d-md-flex d-center" aria-label="scroll Bar Button">
                <i className="ti ti-chevron-up fs-four p6-color"></i>
            </button>

            <div id="preloader" className="pre-item d-center">
                <div className="loaderall"></div>
            </div> */}



            <header className="header-section header-menu w-100 pt-1 pt-lg-0 pb-3 pb-lg-0">
                <div className="navbar_mainhead header-fixed w-100">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-12">
                                <nav className="navbar navbar-expand-lg position-relative py-md-3 py-lg-6 workready">
                                    <a href="/" className="navbar-brand d-flex align-items-center gap-2">
                                        <strong style={{ color: 'white' }}>Fedha.io</strong>
                                    </a>
                                    <div className="collapse navbar-collapse justify-content-between" id="navbar-content">
                                        <ul
                                            className="navbar-nav d-flex align-items-lg-center gap-5 gap-lg-1 gap-xl-4 gap-xxl-7 py-2 py-lg-0 ms-2 ms-xl-10 ms-xxl-20 ps-0 ps-xxl-10 align-self-center">
                                            <li className="dropdown">
                                                <a href="/" className="fs-ten">Home</a>
                                            </li>

                                            <li className="dropdown show-dropdown">
                                                <button type="button" aria-label="Navbar Dropdown Button"
                                                    className="dropdown-toggle dropdown-nav d-flex align-items-center fs-ten">Swap <i
                                                        className="ti ti-chevron-down"></i></button>
                                                <ul className="dropdown-menu">
                                                    
                                                    <li><a className="dropdown-item fs-ten" href={WalletAddress ? '/swap':"/"}>M-Pesa Swap</a></li>
                                                </ul>
                                            </li>
                                            <li className="dropdown show-dropdown">
                                                <a href="#" className="fs-ten">Farm</a>
                                            </li>
                                            <li className="dropdown show-dropdown">
                                                <a href="#" className="fs-ten">Arcade</a>
                                            </li>
                                            <li className="dropdown show-dropdown">
                                                <a href="/about" className="fs-ten">About</a>
                                            </li>



                                        </ul>
                                    </div>

                                    <div
                                        className="right-area custom-pos position-relative d-flex gap-0 gap-lg-2 align-items-center">
                                        <div className="single-item cart-area search-area">
                                            <div className="cmn-head">
                                                <button type="button" aria-label="Shopping Button"
                                                    className="common_toggles2 icon-area p-0 me-3 me-lg-0 box-second d-center position-relative">
                                                    <i className="ti ti-search slide-toggle2 fs-four p6-color"></i>
                                                </button>
                                                <div className="msg_area common_area2 p2-bg p-5 rounded-2">
                                                    <form className="d-flex align-items-center ">
                                                        <input type="text" />
                                                        <button type="submit" className="p-2"><i
                                                            className="ti ti-search slide-toggle2 fs-four p2-color"></i></button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="header-section__modalstyle">
                                          {
                                            WalletAddress ?
                                            <>
                                               <div className="row" style={{backgroundColor:'white',borderRadius:8,height:50,width:150,paddingTop:4}}>
                                                 <div className='col-md-12'>
                                                 <Jazzicon diameter={38} seed={Math.round(Math.random() * 10000000)} />

                                                 <span style={{color:"black",float:'right',paddingTop:10,fontSize:12}}>
                                                    {trimAddress(WalletAddress)}
                                                    </span>
                                                 </div>
                                                

                                               </div>
                                            </>:
                                            <button
                                            onClick={openModal}
                                            type="button"
                                            className="cmn-btn px-3 px-sm-5 px-md-6 py-2 py-sm-3 d-flex align-items-center gap-1"
                                            data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        >
                                            <span className="p7-color fw-semibold d-none d-sm-block">Connect</span> Wallet
                                        </button>

                                          }
                                            
                                        </div>

                                    </div>

                                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                        aria-label="Navbar Toggler" data-bs-target="#navbar-content" aria-expanded="true"
                                        id="nav-icon3">
                                        <span></span><span></span><span></span><span></span>
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
