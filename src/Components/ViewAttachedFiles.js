import downloadFile from 'downloadjs';
import "../CSS/ViewReport.css"


export default function ViewAttachedFiles({ attachedFiles }){

    async function download(filename){
        const token = sessionStorage.getItem("token")
        const email = sessionStorage.getItem("email")
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

    return <>
        {
            attachedFiles.map((attachedFile, index) => {
                return <p key={index} className="viewAttachedFiles" onClick={() => {download(attachedFile)}}>{attachedFile}</p>
            })
        }
    </>
}