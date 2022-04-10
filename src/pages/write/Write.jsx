import { useState } from "react";
import "./write.css";
import { useContract } from "../../context/ContractProvider";
import ipfs from '../../ipfs'

export default function Write() {
  const [title, setTitle] = useState("");
  const [para, setPara] = useState("");
  const [image, setImage] = useState();
  const [ipfsHash, setIpfsHash] = useState("");

  const { blogFactoryContract, userAccount } = useContract()
  console.log(userAccount, blogFactoryContract)
  const handleSubmit = async (e) => {
    e.preventDefault();



    blogFactoryContract.methods.createBlog(title, para, ipfsHash).send({ from: userAccount.account }).then(r => {
      console.log(r)
      window.location = "/"
    })

    console.log(title, para);

  }

  const captureFile = (e) => {
    e.preventDefault()
    console.log(e.target.files)
    const file = e.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      setImage(Buffer(reader.result))
    }
  }
  const submitfile = (e) => {
    e.preventDefault()
    console.log(image)
    ipfs.files.add(image, (error, result) => {
      if (error) {
        console.error(error)
        return
      }
      console.log(result[0])
      return setIpfsHash(result[0].hash)
    })
  }

  console.log("buffer", image, 'ipfs', ipfsHash)
  return (
    <div className="write">
      <img
        className="writeImg"
        src={`https://ipfs.infura.io/ipfs/${ipfsHash}`}
        alt=""
      />
      <input type="file" onChange={captureFile} />
      <button onClick={submitfile}>ipfs Submit</button>

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
