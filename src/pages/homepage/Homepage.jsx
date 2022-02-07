import { useEffect } from "react";
import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContract } from "../../context/ContractProvider";
import "./homepage.css";

export default function Homepage() {
  const location = useLocation();
  console.log(location);
  const { blogFactoryContract, userAccount } = useContract()


  useEffect(async () => {
    if (!blogFactoryContract) return
    const count = await blogFactoryContract.methods.getBlogCount().call()
    console.log(count)

    const blog = await blogFactoryContract.methods.getBlogFromBlogHash("104242884546232587208185761615075562449322657461960659457127498426951089024742").call()
    console.log(blog)

    // const blog = await blogFactoryContract.methods.getBlog(0).call()
    // console.log(blog)

  }, [blogFactoryContract])

  return (
    <>
      <Header />
      <div className="home">
        <Posts />
        <Sidebar />
      </div>
    </>
  );
}
