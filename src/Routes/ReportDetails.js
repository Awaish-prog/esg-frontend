import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { getQuestions } from "../ApiCalls/apiCalls"
import ViewAttachedFiles from "../Components/ViewAttachedFiles"
import ViewGeneralQuestions from "../Components/ViewGeneralQuestions"
import ViewGrievanceQuestions from "../Components/ViewGrievanceQuestions"
import ViewLocationQuestions from "../Components/ViewLocationQuestions"
import ViewTypeOfCustomers from "../Components/ViewTypeOfCustomers"
import ViewWorkerQuestions from "../Components/ViewWorkerQuestions"
import "../CSS/ViewReport.css"
import CircularProgress from '@mui/material/CircularProgress';
import "../CSS/Loader.css"

export default function ReportDetails(){
    const location = useLocation()
    const navigate = useNavigate()
    const [ generalQuestions, setGeneralQuestions ] = useState([])
    const [ locationQuestions, setLocationQuestions ] = useState([])
    const [ typeOfCustomers, setTypeOfCustomers ] = useState([])
    const [ workerQuestions, setWorkerQuestions ] = useState([])
    const [ grievanceQuestions, setGrievanceQuestions ] = useState([])
    const [ workerQuestionsDiffAbled, setWorkerQuestionsDiffAbled ] = useState([])
    const [ attachedFiles, setAttachedFiles ] = useState([])
    const [ loader, setLoader ] = useState(true)

    async function getAllQuestions(){
        const id = location.state.id
        const questions = await getQuestions(id)
        setGeneralQuestions(questions.generalQuestions)
        setLocationQuestions(questions.locationQuestions)
        setTypeOfCustomers(questions.typeOfCustomers)
        setWorkerQuestions(questions.workerQuestions)
        setGrievanceQuestions(questions.grievanceQuestions)
        setWorkerQuestionsDiffAbled(questions.workerQuestionsDiffAbled)
        setAttachedFiles(questions.attachedFiles)
        setLoader(false)
    }

    useEffect(() => {
        if(!sessionStorage.getItem("email")){
            navigate("/")
        }
        getAllQuestions()
    }, [])
    return (
        <>
        {
            loader ?
            <div className="loader">
                <CircularProgress size={100} />
            </div> :
            <section className="reportDetails">
            <h1>Report Details</h1>
            <h2>General Questions</h2>
                <ViewGeneralQuestions generalQuestions={generalQuestions} />
            <h2>Location Questions</h2>
                <ViewLocationQuestions locationQuestions={locationQuestions} />
            <h2>Types of Customers</h2>
                <ViewTypeOfCustomers typeOfCustomers={typeOfCustomers} />
            <h2>Employess (Including Differently Abled)</h2>
                <ViewWorkerQuestions workerQuestions = {workerQuestions} />
            <h2>Differently Abled Employees and Workers</h2>
                <ViewWorkerQuestions workerQuestions = {workerQuestionsDiffAbled} />
            <h2>Is there a mechanism available to receive and redress grievances</h2>
                <ViewGrievanceQuestions grievanceQuestions={grievanceQuestions} />
            <h2>Attached Files</h2>
                <ViewAttachedFiles attachedFiles={attachedFiles} />
            </section>
        }
        </>
    )
}