import "../CSS/ViewReport.css"


export default function ViewGrievanceQuestions({ grievanceQuestions }){
    return (
        <>
            <table>
                <tbody>
                    {
                        grievanceQuestions.map((grievanceQuestion, row) => {
                                return <tr key={row}>
                                    {
                                        grievanceQuestion.map((cell, col) => {
                                            return <td className={row === 0 ? "viewanswers viewTableHead" : "viewanswers"} key={col}>{cell.value}</td>
                                        })
                                    }
                                </tr>
                        })
                    }
                </tbody>
            </table>
        </>
    )
}