import './Dashboard.css'
import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import DashSection from '../components/DashSection'

const Dashboard = () => {
    const [selectedContent, setSelectedContent] = useState('skills');

    const handleContent = (content)=>{
        setSelectedContent(content)
    }

  return (
    <>
    <Navbar/>
    <div className="dashboard">
    <Sidebar handleContent={handleContent}/>
    <DashSection selectedContent={selectedContent}/>
    </div>
    </>
    )
}

export default Dashboard;