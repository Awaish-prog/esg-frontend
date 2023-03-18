import "../CSS/ViewReport.css"


export default function ViewGeneralQuestions({ generalQuestions }){
    return (
        <>
            <table className="viewGeneralTable">
                <thead>
                    <tr>
                        <td className="viewquestions viewTableHead">Questions</td>
                        <td className="viewanswers viewTableHead">Answers</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        generalQuestions.map((generalQuestion, index) => {
                           return <tr key={index}>
                                    <td className="viewquestions">{generalQuestion.column1}</td>
                                    {
                                        generalQuestion.column2.value ?
                                        <td className="viewanswers">{generalQuestion.column2.value}</td>:
                                        <td className="viewanswers">Answer not provided</td>
                                    } 
                                </tr>
                        })
                    }
                </tbody>
            </table>
        </>
    )
}