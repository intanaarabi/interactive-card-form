import ExpiryInput from "./Inputs/ExpiryInput"
import Input from "./Inputs/Input"


function CardForm() {
    return (
        <div className="flex flex-col gap-4 w-[400px]">
            <Input label="Cardholder Name" placeholder="e.g. Jane Appleseed" type="text"/>
            <Input label="Card Number" placeholder="e.g. 1234 5678 9123 0000" type="text"/>
            <div className="flex flex-row gap-4">
                <ExpiryInput/>
                <Input label="CVC" placeholder="e.g. 123" type="text"/>
            </div>
            <button className="">Confirm</button>
        </div>
        
    )
}

export default CardForm
