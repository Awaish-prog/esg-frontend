import { useEffect, useState } from "react"
import { getQuestions, sendEsgDetails, sendInvite, deleteFile } from "../ApiCalls/apiCalls"
import GeneralQuestions from "../Components/GeneralQuestions"
import GrievanceQuestions from "../Components/GrievanceQuestions"
import LocationQuestions from "../Components/LocationQuestions"
import TypeOfCustomers from "../Components/TypeOfCustomers"
import WorkerQuestions from "../Components/WorkerQuestions"
import downloadFile from 'downloadjs';
import { useLocation, useNavigate } from "react-router-dom"
import "../CSS/WorkerQuestions.css"
import "../CSS/CreateEsgReport.css"
import CircularProgress from '@mui/material/CircularProgress';
import "../CSS/Loader.css"

export default function CreateEsgreport(){
    const navigate = useNavigate()
    const location = useLocation()
    const [ generalQuestions, setGeneralQuestions ] = useState([])
    const [ locationQuestions, setLocationQuestions ] = useState([])
    const [ typeOfCustomers, setTypeOfCustomers ] = useState([])
    const [ workerQuestions, setWorkerQuestions ] = useState([])
    const [ grievanceQuestions, setGrievanceQuestions ] = useState([])
    const [ workerQuestionsDiffAbled, setWorkerQuestionsDiffAbled ] = useState([])
    const [ displayDiffAbled, setDisplayDiffAbled ] = useState(false)
    const [ file, setFile ] = useState(null)
    const [ fileForm, setFileForm ] = useState(false)
    const [ attachedFiles, setAttachedFiles ] = useState([])
    const [ guestEmail, setGuestEmail ] = useState("")
    const [ fileMessage, setFileMessage ] = useState("")
    const [ saved, setSaved ] = useState(false)
    const [ workerTab, setWorkerTab ] = useState(true)
    const [ inviteMessage, setInviteMessage ] = useState("")
    const [ newReport, setNewReport ] = useState(false)
    const [ cinMessage, setCinMessage ] = useState("")
    const [ loader, setLoader ] = useState(true)
 
    async function getAllQuestions(){
        const id = sessionStorage.getItem("id") ? sessionStorage.getItem("id") : location.state.id
        const questions = await getQuestions(id)
        setGeneralQuestions(questions.generalQuestions)
        setLocationQuestions(questions.locationQuestions)
        setTypeOfCustomers(questions.typeOfCustomers)
        setWorkerQuestions(questions.workerQuestions)
        setGrievanceQuestions(questions.grievanceQuestions)
        setWorkerQuestionsDiffAbled(questions.workerQuestionsDiffAbled)
        setAttachedFiles(questions.attachedFiles)
        setSaved(questions.saved)
        setLoader(false)
    }

    function changeGeneralQuestionsAnswer(e, question){
        setGeneralQuestions((prev) => {
            const newGeneralQuestions = [...prev]
            for(let i = 0; i < newGeneralQuestions.length; i++){
                if(question === newGeneralQuestions[i].column1){
                    newGeneralQuestions[i].column2.value = e.target.value
                    return newGeneralQuestions
                }
            }
        })
    }

    function changelocationQuestionsAnswer(e, column, level){

        setLocationQuestions((prev) => {
            let newLocationQuestions = [...prev]
            if(level === 'National'){
                newLocationQuestions[1][column] = {
                    cellType: "number",
                    value: Number(e.target.value).toFixed(0)
                }
                newLocationQuestions[1].column4 = {
                    cellType: "value",
                    value: (Number(newLocationQuestions[1].column2.value) + Number(newLocationQuestions[1].column3.value)).toFixed(0)
                }
            }
            else if(level === "International"){
                newLocationQuestions[2][column] = {
                    cellType: "number",
                    value: Number(e.target.value).toFixed(0)
                } 
                newLocationQuestions[2].column4 = {
                    cellType: "value",
                    value: (Number(newLocationQuestions[2].column2.value) + Number(newLocationQuestions[2].column3.value)).toFixed(0) 
                }
            }
            return newLocationQuestions
        })
        
    }

    function changeTypeOfCustomersAnswer(e, index){
        setTypeOfCustomers((prev) => {
            let newTypeOfCustomers = [...prev]
            newTypeOfCustomers[index][1] = e.target.value
            return newTypeOfCustomers
        })
    }

    function addCustomer(){
        setTypeOfCustomers((prev) => {
            return prev.length === 1 ? [...prev, [1, "", "Delete"]] :[...prev, [prev[prev.length - 1][0] + 1, "", "Delete"]]
        })
    }

    function removeCustomer(index){
        setTypeOfCustomers((prev) => {
            let newTypeOfCustomers = [...prev]
            newTypeOfCustomers.splice(index, 1)
            for(let i = index; i < newTypeOfCustomers.length; i++){
                newTypeOfCustomers[i][0]--;
            }
            return newTypeOfCustomers
        })
    }

    function changeWorkerQuestions(e, row, col){
        setWorkerQuestions((prev) => {
            let newWorkerQuestions = [...prev]
            newWorkerQuestions[row][col].value = e.target.value

            newWorkerQuestions[row][1].value = Number(newWorkerQuestions[row][2].value) + Number(newWorkerQuestions[row][4].value)

            newWorkerQuestions[row][3].value = (Number(Number(newWorkerQuestions[row][2].value) / Number(newWorkerQuestions[row][1].value)) * 100).toFixed(2) === "NaN" ? 0 :
            (Number(Number(newWorkerQuestions[row][2].value) / Number(newWorkerQuestions[row][1].value)) * 100).toFixed(2)

            newWorkerQuestions[row][5].value = (Number(newWorkerQuestions[row][4].value) / Number(newWorkerQuestions[row][1].value) * 100).toFixed(2) === "NaN" ? 0 :
            (Number(newWorkerQuestions[row][4].value) / Number(newWorkerQuestions[row][1].value) * 100).toFixed(2)


            for(let i = 1; i < 6; i++){
                if(i === 3 || i === 5){
                    newWorkerQuestions[3][i].value = ((Number(newWorkerQuestions[1][i].value) + Number(newWorkerQuestions[2][i].value)) / 2).toFixed(2)
                }
                else {
                    newWorkerQuestions[3][i].value = Number(newWorkerQuestions[1][i].value) + Number(newWorkerQuestions[2][i].value)
                }
            }

            for(let i = 1; i < 6; i++){
                if(i === 3 || i === 5){
                    newWorkerQuestions[6][i].value = ((Number(newWorkerQuestions[4][i].value) + Number(newWorkerQuestions[5][i].value)) / 2).toFixed(2)
                }
                else {
                    newWorkerQuestions[6][i].value = Number(newWorkerQuestions[4][i].value) + Number(newWorkerQuestions[5][i].value)
                }
            }

            return newWorkerQuestions
        })
    }

    function changeWorkerQuestionsDiffAbled(e, row, col){
        setWorkerQuestionsDiffAbled((prev) => {
            let newWorkerQuestions = [...prev]
            newWorkerQuestions[row][col].value = e.target.value

            newWorkerQuestions[row][1].value = Number(newWorkerQuestions[row][2].value) + Number(newWorkerQuestions[row][4].value)

            newWorkerQuestions[row][3].value = (Number(newWorkerQuestions[row][2].value) / Number(newWorkerQuestions[row][1].value) * 100).toFixed(2) === "NaN" ? 0 :
            (Number(newWorkerQuestions[row][2].value) / Number(newWorkerQuestions[row][1].value) * 100).toFixed(2)

            newWorkerQuestions[row][5].value = (Number(newWorkerQuestions[row][4].value) / Number(newWorkerQuestions[row][1].value) * 100).toFixed(2) === "NaN" ? 0 :
            (Number(newWorkerQuestions[row][4].value) / Number(newWorkerQuestions[row][1].value) * 100).toFixed(2)


            for(let i = 1; i < 6; i++){
                if(i === 3 || i === 5){
                    newWorkerQuestions[3][i].value = ((Number(newWorkerQuestions[1][i].value) + Number(newWorkerQuestions[2][i].value)) / 2).toFixed(2)
                }
                else {
                    newWorkerQuestions[3][i].value = Number(newWorkerQuestions[1][i].value) + Number(newWorkerQuestions[2][i].value)
                }
            }

            for(let i = 1; i < 6; i++){
                if(i === 3 || i === 5){
                    newWorkerQuestions[6][i].value = ((Number(newWorkerQuestions[4][i].value) + Number(newWorkerQuestions[5][i].value)) / 2).toFixed(2)
                }
                else {
                    newWorkerQuestions[6][i].value = Number(newWorkerQuestions[4][i].value) + Number(newWorkerQuestions[5][i].value)
                }
            }

            return newWorkerQuestions
        })
    }

    function changeGrievanceQuestions(e, row, col){
        setGrievanceQuestions((prev) => {
            let newGrievanceQuestions = [...prev]

            newGrievanceQuestions[row][col].value = e.target.value

            return newGrievanceQuestions
        })
    }

    async function submitFile(e){
        e.preventDefault()

        if(file === null){
            setFileMessage("Please select a File")
            return
        }
        if(!saved){
            setFileMessage("Files can't be attached before saving details")
            return
        }
        const token = sessionStorage.getItem("token")
        const email = sessionStorage.getItem("email").toLowerCase()
        const formData = new FormData();
        formData.append('file', file);
        formData.append('cin', generalQuestions[0].column2.value)
        let response = await fetch("http://localhost:4002/upload", {
            method: "POST",
            headers : {
                "token": token,
                "email": email
            },
            body: formData
        })
        response = await response.json()
        if(response.status === 404){
            setFileMessage("Files can't be attached before saving details")
            return
        }
        setAttachedFiles((prev) => {
            const newFiles = [...prev]
            newFiles.push(file.name)
            return newFiles
        })
        setFile(null)
        setFileForm(false)
        setFileMessage("")
    }

    async function download(filename){
        const token = sessionStorage.getItem("token")
        const email = sessionStorage.getItem("email").toLowerCase()
        const response = await fetch("http://localhost:4002/files", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": token,
                "email": email
            },
            body: JSON.stringify({
                filename
            })
        })
        const blob = await response.blob();
        downloadFile(blob, filename);
    }

    function uploadFile(e){
        if(e.target.files[0].name.endsWith("png") || e.target.files[0].name.endsWith("xlsx") || e.target.files[0].name.endsWith("pdf")){
            setFile(e.target.files[0])
            setFileMessage("")
        }
        else{
            setFileMessage("Only PDF, excel sheets and image/png can be uploaded")
            setFileForm(false)
        }
    }

    async function sendDetails(submitted){
        if(generalQuestions[0].column2.value === ""){
            setCinMessage("CIN cannot be empty")
            return
        }
        const email = sessionStorage.getItem("email")
        const response = await sendEsgDetails(generalQuestions, locationQuestions, typeOfCustomers, workerQuestions, workerQuestionsDiffAbled, grievanceQuestions,attachedFiles, email, submitted, newReport)
        if(response.status === 409){
            setCinMessage("Report with this CIN already exists, you can't create new Report with same CIN")
            return
        }
        sessionStorage.setItem("id", generalQuestions[0].column2.value)
        setSaved(true)
        submitted ? navigate("/dashboard") : console.log("Saved");
    }

    function toggleForm(){
        setFileForm(true)
    }

    async function inviteSomeone(e){
        e.preventDefault()
        let response = await sendInvite(guestEmail, generalQuestions[0].column2.value)
        response.status === 404 ? setInviteMessage("You can't Invite others without saving details") : 
        response.status === 403 ? setInviteMessage("User with this email does not exist"):
        setInviteMessage("")
        setGuestEmail("")
    }

    async function deleteThisFile(fileName, cin){
        setAttachedFiles((prev) => {
            const newFiles = [...prev]
            const index = newFiles.indexOf(fileName)
            newFiles.splice(index, 1)
            return newFiles
        })
        let response = await deleteFile(fileName, cin)
    }

    function changeNewReport(){
        setNewReport(true)
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
                <CircularProgress size={150} />
            </div> :
            <>
            <h1 className="attachHeading">Create ESG Report</h1>
            <GeneralQuestions generalQuestions={generalQuestions} changeGeneralQuestionsAnswer={changeGeneralQuestionsAnswer} saved={saved} changeNewReport={changeNewReport}/>

            <LocationQuestions locationQuestions={locationQuestions} changelocationQuestionsAnswer = {changelocationQuestionsAnswer} />

            <TypeOfCustomers typeOfCustomers={typeOfCustomers} changeTypeOfCustomersAnswer={changeTypeOfCustomersAnswer} addCustomer={addCustomer} removeCustomer={removeCustomer} />
            <h2 className="empHead">Employees and Workers Detail</h2>
            <div className="workersNav">
            <p id={workerTab && `tabClass`} onClick={() => {setDisplayDiffAbled(false)
                setWorkerTab(true)
            }}>Employess (Including Differently Abled)</p>
            
            <p id={!workerTab && `tabClass`} onClick={() => {setDisplayDiffAbled(true)
                setWorkerTab(false)
            }}>Differently Abled Employees and Workers</p>
            </div>
            {
                displayDiffAbled ? 
                <WorkerQuestions workerQuestions={workerQuestionsDiffAbled} changeWorkerQuestions={changeWorkerQuestionsDiffAbled} /> :
                <WorkerQuestions workerQuestions={workerQuestions} changeWorkerQuestions={changeWorkerQuestions} />
            }    

            <GrievanceQuestions grievanceQuestions={grievanceQuestions} changeGrievanceQuestions={changeGrievanceQuestions} />

            

            <h2 className="attachHeading">Add Attachments</h2>
            <div className="filesList">
            {
                attachedFiles.length === 0 ?
                <h3>No Files Attched</h3> :
                attachedFiles.map((attachedFile, index) => {
                    return <>
                    <p onClick={() => {download(attachedFile)}}>{attachedFile}</p>
                    {location.state.access && <button onClick={() => {deleteThisFile(attachedFile, generalQuestions[0].column2.value)}}>Delete</button>}
                    </>
                })
            }
            </div>
            <div className="attachFileSection">
            {fileForm && <form onSubmit={submitFile} className="reportForms">
                <input type="file" onChange={uploadFile} />
                <input type="submit" className="button" />
            </form>}
            <p className="colorRed">{fileMessage}</p>
            <button onClick={toggleForm}>Attach File</button>
            </div>


            {location.state.access && <><h2 className="attachHeading">Invite Someone</h2>
            <p className="attachHeading colorRed">{inviteMessage}</p>
            <div className="attachFileSection">
            
            <form onSubmit={inviteSomeone} className="reportForms">
                
                <input type="email" value={guestEmail} onChange={(e) => {setGuestEmail(e.target.value)}} required placeholder="email"/>
                <input type="submit" className="button" value="Send" />
            </form>
            </div></>}
            <p className="attachHeading colorRed">{cinMessage}</p>
            <div className="saveButtons">
            <button onClick={() => {sendDetails(false)}}>Save Progress</button>
            { location.state.access && <button onClick={() => {sendDetails(true)}}>Submit Report</button>}
            </div>
            </>
            }
        </>
    )
}