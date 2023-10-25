function CardFront() {
    return (
        <>
            <div className="relative ml-[-100px]">
                <img 
                    src="./images/bg-card-front.png"
                    alt="Description of Image" 
                    className="min-w-[450px]"
                />
                <div className="absolute top-8 left-10">
                    <img className="w-20 pb-14" src="./images/card-logo.svg" alt="card-front"></img>
                    <div className="flex flex-col gap-4">
                        <div className="text-3xl tracking-widest pr-10">9592 1923 1212 1111</div>
                        <div className="flex flex-row justify-between">
                            <div className="uppercase tracking-wide">Felicia Lane</div>
                            <div className="">09/09</div>
                        </div>
                    </div>
                </div>
            </div> 
        </>
    )
}

function CardBack() {
    return (
        <>
        <div className="relative">
        <img 
                src="./images/bg-card-back.png"
                alt="Description of Image" 
                className="min-w-[450px]"
            />

            <div className="absolute top-[105px] right-[60px]">
                <div className="text-xl tracking-widest">000</div>
            </div>
        </div>
        
        </>

    )
}

function CardDisplay() {
    return (
        <div className="absolute flex flex-col justify-center gap-10 h-full text-white left-[300px]">
            <CardFront/>
            <CardBack/> 
        </div>
    )
}

export default CardDisplay
