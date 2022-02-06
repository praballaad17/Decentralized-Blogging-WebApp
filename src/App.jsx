import React, { Component, useEffect, useState } from 'react';
import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Web3 from 'web3';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BlogFactory from './abis/BlogFactory.json'


export default function App() {
    const currentUser = true;
    const [userAccount, setUserAccount] = useState()
    const [contract, setContract] = useState()

    const web3 = window.web3

    useEffect(() => {


        const loadWeb3 = async () => {
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum)
                await window.ethereum.enable()
            }
            if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider)
            }
            else {
                console.log('Please use Metamask!!')
            }
        }

        const getAccount = async () => {
            // const web3 = window.web3
            //Account which is connected to website
            const accounts = await web3.eth.getAccounts()
            setUserAccount({ account: accounts[0] })
            console.log(accounts)
        }

        loadWeb3()
        getAccount()
    }, [])


    const loadBlockchainData = async () => {
        //network ID
        console.log(web3)
        const networkId = await Web3.eth.net.getId()
        console.log(networkId)
        const networkData = BlogFactory.networks[networkId]

        if (networkData) {
            //Fetch Contract
            const abi = BlogFactory.abi
            const address = networkData.address
            const contract = web3.eth.Contract(abi, address)
            this.setState({ contract })
            //console.log(contract)
            //const memeHash = await contract.methods.get().call()
            //this.setState({memeHash})
        }
        else {
            window.alert("Smart contract not deployed to detected network")
        }
    }

    loadBlockchainData()



    return (
        <div>
            <Router>
                <Topbar />
                <Switch>
                    <Route exact path="/">
                        <Homepage />
                    </Route>
                    <Route path="/posts">
                        <Homepage />
                    </Route>
                    <Route path="/register">
                        {currentUser ? <Homepage /> : <Register />}
                    </Route>
                    <Route path="/login">{currentUser ? <Homepage /> : <Login />}</Route>
                    <Route path="/post/:id">
                        <Single />
                    </Route>
                    <Route path="/write">{currentUser ? <Write /> : <Login />}</Route>
                    <Route path="/settings">
                        {currentUser ? <Settings /> : <Login />}
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}
