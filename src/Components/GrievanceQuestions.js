import "../CSS/GrievanceQuestions.css"

export default function GrievanceQuestions({ grievanceQuestions, changeGrievanceQuestions }){
    return (
        <section className="grievance">
        <h2 className="grievanceHead">Is there a mechanism available to receive and redress grievances</h2>
        <table>
            <tbody>
                {
                    grievanceQuestions.map((grievanceQuestion, index1) => {
                        return <tr className="grievanceRow" key={index1}>
                            {
                                grievanceQuestion.map((grievanceQuestionCell, index2) => {
                                    return <td className={grievanceQuestionCell.cellType} key={index2}>
                                        {
                                            grievanceQuestionCell.cellType === "label" &&
                                            grievanceQuestionCell.value
                                        }
                                        {
                                            grievanceQuestionCell.cellType === "select" &&
                                            <select onChange={(e) => changeGrievanceQuestions(e, index1, index2)} value={grievanceQuestionCell.value}>
                                                {
                                                    grievanceQuestionCell.options.map((option, index3) => {
                                                        return <option value={option} key={index3}>{option}</option>
                                                    })
                                                }
                                            </select>
                                        }
                                        {
                                            grievanceQuestionCell.cellType === "text" &&
                                            <input onChange={(e) => changeGrievanceQuestions(e, index1, index2)} type="text" value={grievanceQuestionCell.value} />
                                        }
                                    </td>
                                })
                            }
                        </tr>
                    })
                }
            </tbody>
        </table>
        </section>
    )
}