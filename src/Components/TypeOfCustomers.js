import "../CSS/TypeOfCustomers.css"

export default function TypeOfCustomers({ typeOfCustomers, changeTypeOfCustomersAnswer, addCustomer, removeCustomer }){
    
    return (
        <section className="typeOfCustomers">
            <h2>Types of Customers</h2>
            <table className="typesTable">
                <tbody className="typesBody">
                    {typeOfCustomers.length !== 0 && <tr>
                        <td className="typeValues">{typeOfCustomers[0][0]}</td>
                        <td className="typeValues">{typeOfCustomers[0][1]}</td>
                        <td className="typeValues">{typeOfCustomers[0][2]}</td>
                    </tr>}
                    {
                        typeOfCustomers.map((typeOfCustomer, index) => {
                            return index !== 0 && <tr key={index}>
                                <td className="typeValues">{typeOfCustomer[0]}</td>
                                <td><input className="typeInputs" type="text" value={typeOfCustomer[1]} onChange={
                                    (e) => {
                                        changeTypeOfCustomersAnswer(e, index)
                                    }
                                } /></td>
                                <td className="typeValues deleteCus" onClick={() => {
                                    removeCustomer(index)
                                }}>{typeOfCustomer[2]}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <button onClick={addCustomer}>Add</button>
        </section>
    )
}