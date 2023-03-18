import "../CSS/WorkerQuestions.css"

export default function WorkerQuestions({ workerQuestions, changeWorkerQuestions }){
    return (
        <section className="workerQuestions">
            <table className="workersTable">
                <thead>
                    <tr>
                        <td className="workerHeading"></td>
                        <td className="workerHeading"></td>
                        <td className="workerHeading">Male</td>
                        <td className="workerHeading">Female</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        workerQuestions.map((workerQuestion, index1) => {
                            return <tr key={index1}>
                                <td className={workerQuestion[0].cellType}>
                                    {
                                        workerQuestion[0].cellType === "label" || workerQuestion[0].cellType === "value" ? 
                                        workerQuestion[0].value :
                                        <input type={workerQuestion[0].cellType} value={workerQuestion[0].value} onChange = {
                                            (e) => {
                                                changeWorkerQuestions(e, index1, 0)
                                            }
                                        } />
                                    }
                                </td>

                                <td className={workerQuestion[1].cellType}>
                                    {
                                        workerQuestion[1].cellType === "label" || workerQuestion[1].cellType === "value" ? 
                                        workerQuestion[1].value :
                                        <input type={workerQuestion[1].cellType} value={workerQuestion[1].value} onChange = {
                                            (e) => {
                                                changeWorkerQuestions(e, index1, 1)
                                            }
                                        } />
                                    }
                                </td>
                                <td>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className={workerQuestion[2].cellType}>
                                                    {
                                                        workerQuestion[2].cellType === "label" || workerQuestion[2].cellType === "value" ? 
                                                        workerQuestion[2].value :
                                                        <input type={workerQuestion[2].cellType}
                                                        value={workerQuestion[2].value} 
                                                        onChange = {
                                                            (e) => {
                                                                changeWorkerQuestions(e, index1, 2)
                                                            }
                                                        } />
                                                    }
                                                </td>

                                                <td className={workerQuestion[3].cellType}>
                                                    {
                                                        workerQuestion[3].cellType === "label" || workerQuestion[3].cellType === "value" ? 
                                                        workerQuestion[3].value :
                                                        <input type={workerQuestion[3].cellType}
                                                        value={workerQuestion[3].value}
                                                        onChange = {
                                                            (e) => {
                                                                changeWorkerQuestions(e, index1, 3)
                                                            }
                                                        } />
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className={workerQuestion[4].cellType}>
                                                    {
                                                        workerQuestion[4].cellType === "label" || workerQuestion[4].cellType === "value" ? 
                                                        workerQuestion[4].value :
                                                        <input type={workerQuestion[4].cellType} 
                                                        value={workerQuestion[4].value}
                                                        onChange = {
                                                            (e) => {
                                                                changeWorkerQuestions(e, index1, 4)
                                                            }
                                                        } />
                                                    }
                                                </td>

                                                <td className={workerQuestion[5].cellType}>
                                                    {
                                                        workerQuestion[5].cellType === "label" || workerQuestion[5].cellType === "value" ? 
                                                        workerQuestion[5].value :
                                                        <input type={workerQuestion[5].cellType} 
                                                        value={workerQuestion[5].value}
                                                        onChange = {
                                                            (e) => {
                                                                changeWorkerQuestions(e, index1, 5)
                                                            }
                                                        } />
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </section>
    )
}