import "./ContentDetail.css"
import Navbar from "../components/Navbar"
import { useLocation } from "react-router-dom";
import { useState } from "react";

const ContentDetail = () => {
const {pathname} = useLocation();
const id = pathname.split("/")[2];
const title = (id==='1')?("Solidity course for beginners"):("Make your First Dapp tutorial")
const videolink = (id==='1')?(""):("")
const skill = (id==='1')?("Smart Contract Development"):("Fullstack Web3 development")
const [show, setShow] = useState(false);

return(
   <>
    <Navbar/>
    <div className="content-detail">
        <video className="content-detail-video" width="320" height="240" controls>
            <source src="https://www.youtube.com/watch?v=3xGLsO98Lj0" type="video/mp4"/>
            No video
        </video>
        <div className="content-detail-info">
            <h1 className="content-detail-title">{title}</h1>
            <div className="content-detail-desc">
            <p><i><b>i</b></i>&nbsp; On completing this course, you will get a new skill...</p>
            <p>New skill: {skill}</p>
            </div>
            <p> <button onClick={()=> setShow(true)}>Take Quiz</button>{show && <span>Grades: 4/5</span>}</p>
            <div className="content-detail-desc">
            <p><i><b>i</b></i>&nbsp; Get EAS skill attestation and mint your skill NFT !</p>
            </div>
            <button onClick={()=> setShow(true)}>Attest & Mint</button>
        </div>
    </div>
   </>
)
}

export default ContentDetail; 