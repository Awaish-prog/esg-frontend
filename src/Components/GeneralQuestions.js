import "../CSS/GeneralQuestions.css"

export default function GeneralQuestions({ generalQuestions, changeGeneralQuestionsAnswer, saved, changeNewReport }){
    return (
        <section className="generalQuestions">
        <h2>General Questions</h2>
        <table className="generalTable">
            {
                generalQuestions.map((generalQuestion, index) => {
                    return <tr key={index}>
                        <td className="generalQuestion">
                            {generalQuestion.column1}
                        </td>
                        <td className="generalAnswer">{
                            saved && generalQuestion.dbKey === "cin" ?
                            <span>{generalQuestion.column2.value}</span> :
                             <input className="generalInput" type={generalQuestion.column2.cellType} value={generalQuestion.column2.value} onChange= {
                                (e) => {
                                    changeGeneralQuestionsAnswer(e, generalQuestion.column1)
                                    generalQuestion.dbKey === "cin" && changeNewReport()
                                }
                            } />
                            }
                        </td>
                    </tr>
                })
            }
        </table>
        </section>
    )
}