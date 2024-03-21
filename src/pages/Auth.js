import React, { useState } from "react";
import { ethers } from "ethers";
import { Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Styles from "./auth.module.css";
import Spline from '@splinetool/react-spline';

function Auth() {

  const navi = useNavigate();
  const [data, setData] = useState({
    address: "",
    balance: null,
    isConnected: false,
  });

  const connectWallet = () => {
    console.log("Connecting..");
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => accountChangeHandler(res[0]));
    } else {
      alert("Install MetaMask extension!!");
    }
  };

  const accountChangeHandler = (account) => {
    console.log(account);
    setData({
      address: account,
      isConnected: true,
    });
  };

  const signInHandler = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        console.log("Signing in as:", address);
        setData({
          address: address,
          isConnected: true,
        });
        navi("/home")
      } catch (error) {
        console.error("Sign in failed:", error);
      }
    } else {
      alert("Install MetaMask extension!!");
    }
  };

  const signOutHandler = () => {
    setData({
      address: "",
      balance: null,
      isConnected: false,
    });
  };

  return (
    <div className={Styles.Auth}>
      {!data.isConnected && (
        <Card className="text-center">
          <Spline scene="https://prod.spline.design/pJHL1AYOHMdk-GBp/scene.splinecode" className={Styles.spline} />
          <Card.Header className={Styles.head}>
            <strong>Connect to MetaMask Wallet</strong>
          </Card.Header>
          <Card.Body className={Styles.main1}>
            <Button onClick={connectWallet} className={Styles.btn_auth}>
              Connect to wallet
            </Button>
          </Card.Body>
        </Card>
      )}
      {data.isConnected && (
        <SignInPage
          address={data.address}
          signOutHandler={signOutHandler}
          signInHandler={signInHandler}
        />
      )}
    </div>
  );
}

function SignInPage({ address, signOutHandler, signInHandler }) {
  return (
    <Card className="text-center">
      <Spline scene="https://prod.spline.design/4Z7CPCGqj2PY3A0g/scene.splinecode" className={Styles.spline}/>
      <Card.Header className={Styles.head1}>
        <strong>Address: </strong>
        {address}
      </Card.Header>
      <Card.Body className={Styles.main2}>
        <Button onClick={signOutHandler} className={Styles.btn}>
          Sign Out
        </Button>
        <Button onClick={signInHandler} className={Styles.btn2}>
          Sign In
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Auth;
