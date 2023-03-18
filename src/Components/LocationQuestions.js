import "../CSS/LocationQuestions.css"

export default function LocationQuestions({ locationQuestions, changelocationQuestionsAnswer}){
    return (
        <section className="locationQuestions">
            <h2>Location Questions</h2>
            <table className="locationTable">
                <tbody>
                {
                    locationQuestions.map((locationQuestion, index) => {
                        return <tr key = {index} className="locationRow">
                            {
                            locationQuestion.column1.cellType === "label" || locationQuestion.column1.cellType === "value" ? 
                            <td className="locationValues">{locationQuestion.column1.value}</td> :
                            <td>
                                <input type={locationQuestion.column1.cellType} value = {locationQuestion.column1.value}
                                onChange = {
                                    (e) => {
                                        changelocationQuestionsAnswer(e, "column1", locationQuestion.column1.value)
                                    }
                                } />
                            </td>
                            }

                            {
                            locationQuestion.column2.cellType === "label" || locationQuestion.column2.cellType === "value" ? 
                            <td className="locationValues">{locationQuestion.column2.value}</td> :
                            <td>
                                <input type={locationQuestion.column2.cellType} value = {locationQuestion.column2.value} 
                                onChange = {
                                    (e) => {
                                        changelocationQuestionsAnswer(e, "column2", locationQuestion.column1.value)
                                    }
                                } />
                            </td>
                            }

                            {
                            locationQuestion.column3.cellType === "label" || locationQuestion.column3.cellType === "value" ? 
                            <td className="locationValues">{locationQuestion.column3.value}</td> :
                            <td>
                                <input type={locationQuestion.column3.cellType} value = {locationQuestion.column3.value}
                                onChange = {
                                    (e) => {
                                        changelocationQuestionsAnswer(e, "column3", locationQuestion.column1.value)
                                    }
                                } />
                            </td>
                            }

                            {
                            locationQuestion.column4.cellType === "label" || locationQuestion.column4.cellType === "value" ? 
                            <td className="locationValues">{locationQuestion.column4.value}</td> :
                            <td>
                                <input type={locationQuestion.column4.cellType} value = {locationQuestion.column4.value}
                                onChange = {
                                    (e) => {
                                        changelocationQuestionsAnswer(e, "column4", locationQuestion.column1.value)
                                    }
                                } />
                            </td>
                            }
                        </tr>
                    })
                }
                </tbody>
            </table>
        </section>
    )
}