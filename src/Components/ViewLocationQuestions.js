import "../CSS/ViewReport.css"

export default function ViewLocationQuestions({ locationQuestions }){
    return (
        <>
            <table>
                <tbody>
                    {
                        locationQuestions.map((locationQuestion, index) => {
                            return <tr key={index}>
                                <td className={index === 0 ? "viewanswers viewTableHead" : "viewanswers"}>{locationQuestion.column1.value}</td>
                                <td className={index === 0 ? "viewanswers viewTableHead" : "viewanswers"}>{locationQuestion.column2.value}</td>
                                <td className={index === 0 ? "viewanswers viewTableHead" : "viewanswers"}>{locationQuestion.column3.value}</td>
                                <td className={index === 0 ? "viewanswers viewTableHead" : "viewanswers"}>{locationQuestion.column4.value}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </>
    )
}