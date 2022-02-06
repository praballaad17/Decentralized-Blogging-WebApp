import { useState } from "react";
import "./write.css";
import { useContract } from "../../context/ContractProvider";

export default function Write() {
  const [title, setTitle] = useState("");
  const [para, setPara] = useState("");
  const { blogFactoryContract, userAccount } = useContract()
  console.log(userAccount)
  const handleSubmit = async (e) => {
    e.preventDefault();



    blogFactoryContract.methods.createBlog(title, para).send({ from: userAccount.account }).then(r => {
      console.log(r)
    })

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
