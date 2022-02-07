import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import { useContract } from "../../context/ContractProvider";
import "./single.css";

export default function Single() {
  const { blogHash } = useParams()
  const [blog, setBlog] = useState()
  const { blogFactoryContract, userAccount } = useContract()
  console.log(blogHash)

  useEffect(async () => {
    if (!blogFactoryContract) return
    if (!blogHash) return
    const sBloghash = blogHash.toString()
    console.log(sBloghash)
    const blog = await blogFactoryContract.methods.getBlogFromBlogHash(sBloghash).call()
    console.log(blog)
    setBlog(blog)
  }, [blogHash, blogFactoryContract])

  return (
    <div className="single">
      <SinglePost />
      <Sidebar />
    </div>
  );
}
