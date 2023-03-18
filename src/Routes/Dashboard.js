import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getReports } from "../ApiCalls/apiCalls"
import ReportsList from "../Components/ReportsList"
import "../CSS/Dashboard.css"
import "../CSS/Loader.css"
import CircularProgress from '@mui/material/CircularProgress';

export default function Dashboard(){
    const navigate = useNavigate()
    const [ pendingReports, setPendingReports ] = useState([])
    const [ submittedReports, setSubmittedReports ] = useState([])
    const [ showPendingReports, setShowPendingReports ] = useState(true)
    const [ loader, setLoader ] = useState(true)

    function showPending(){
        setShowPendingReports(true)
    }

    function showSubmitted(){
        setShowPendingReports(false)
    }

    async function getAllReports(){
        const email = sessionStorage.getItem("email")
        const response = await getReports(email)
        setPendingReports(response.pendingReports)
        setSubmittedReports(response.submittedReports)
        setLoader(false)
    }


    function gotoCreateReport(){
        navigate("/createEsgReport", { state: {id: "default", access: true}})
    }

    useEffect(() => {
        sessionStorage.removeItem("id")
        if(!sessionStorage.getItem("email")){
            navigate("/")
        }
        getAllReports()
    }, [])

    return (
        <section>
            <div className="navbar">
            <h1>Dashboard</h1>
            <nav>
                <ul>
                    <li onClick={gotoCreateReport}>Create ESG Report</li>
                    <li onClick={showPending}>Pending reports</li>
                    <li onClick={showSubmitted}>Submitted reports</li>
                </ul>
            </nav>
            </div>
            {
                loader ?
                <div className="loader">
                    <CircularProgress size={100} />
                </div> :
                showPendingReports ?
                <ReportsList reports = {pendingReports} submitted={false} /> :
                <ReportsList reports = {submittedReports} submitted={true} />
            }
            

            
        </section>
    )
}