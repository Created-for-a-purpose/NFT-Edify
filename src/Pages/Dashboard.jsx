import './Dashboard.css'
import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import DashSection from '../components/DashSection'

const Dashboard = () => {
  return (
    <>
    <Navbar/>
    <div className="dashboard">
    <Sidebar/>
    <DashSection/>
    </div>
    </>
    )
}

export default Dashboard;