import { useNavigate } from "react-router-dom"
import "../CSS/ReportsList.css"

export default function ReportsList({ reports, submitted }){

    const navigate = useNavigate()

    function editReport(id, access){
        navigate("/createEsgReport", { state: { id, access }})
    }

    function viewReport(id, access){
        navigate("/viewReport", { state: { id, access }})
    }

    return (
        <>
            {
                reports.length === 0 ?
                submitted ? <h1 className="reportListMessage">You don't have any submitted reports</h1> :
                <h1 className="reportListMessage">You don't have any pending reports</h1> :
                reports.map((report, index) => {
                   return  <div key={index} className="report">
                        <p>Corporate Identity Number: {report.cin}</p>
                        {
                            report.access ?
                            <p>You created this report</p> :
                            <p>You are invited to give some inputs in this report</p>
                        }
                        {
                            submitted ?
                            <button onClick={() => {viewReport(report.cin, report.access)}}>View this report</button> :
                            <button onClick={() => {editReport(report.cin, report.access)}}>Continue</button>
                        }
                        
                    </div>
                })
            }
        </>
    )
}