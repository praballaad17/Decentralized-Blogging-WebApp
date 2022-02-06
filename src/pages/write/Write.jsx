import { useState } from "react";
import "./write.css";
import { useContract } from "../../context/ContractProvider";

export default function Write() {
  const [title, setTitle] = useState("");
  const [para, setPara] = useState("");
  const { blogFactoryContract } = useContract()

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const web3 = window.web3
    // const networkId = await web3.eth.net.getId()
    // console.log(networkId)
    // const networkData = BlogFactory.networks[networkId]

    // if (networkData) {
    //   //Fetch Contract
    //   const abi = BlogFactory.abi
    //   const address = networkData.address
    //   const contract = new web3.eth.Contract(abi, address)
    //   console.log(contract)
    blogFactoryContract.methods.createBlog(title, para).send({ from: "0x2245470cc3d89D287a628E17c4050d812e79f209" }).then(r => {
      console.log(r)
    })
    //const response = await contract.methods.getBlog(0).call()

    //console.log(response)

    //   this.setState({contract})
    //   //console.log(contract)
    //   //const memeHash = await contract.methods.get().call()
    //   //this.setState({memeHash})
    // }
    // else {
    //   window.alert("Smart contract not deployed to detected network")
    // }


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
