import { useState } from "react";
import "./write.css";
import Web3 from 'web3';
import BlogFactory from '../../abis/BlogFactory.json'
export default function Write() {
  const [title, setTitle] = useState("");
  const [para, setPara] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const web3 = window.web3
    const networkId = await web3.eth.net.getId()
    console.log(networkId)
    const networkData = BlogFactory.networks[networkId]

    if (networkData) {
      //Fetch Contract
      const abi = BlogFactory.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      console.log(contract)
      contract.methods.createBlog(title,para).call()
      //const response = await contract.methods.getBlog(0).call()
      
      //console.log(response)

      //   this.setState({contract})
      //   //console.log(contract)
      //   //const memeHash = await contract.methods.get().call()
      //   //this.setState({memeHash})
    }
    else {
      window.alert("Smart contract not deployed to detected network")
    }


    console.log(title, para);
  }

  return (
    <div className="write">
      <img
        className="writeImg"
        src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt=""
      />
      <form className="writeForm">
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input id="fileInput" type="file" style={{ display: "none" }} />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={(e) => setPara(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit" onClick={handleSubmit} >
          Publish
        </button>
      </form>
    </div>
  );
}
