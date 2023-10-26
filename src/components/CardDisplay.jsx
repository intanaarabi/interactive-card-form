import useStore from "../stores/formStore";

function isEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

function CardFront() {
    const formData = useStore((state) => state.formData); 
    return (
        <>
            <div className="relative ml-[-100px]">
                <img 
                    src="./images/bg-card-front.png"
                    alt="Description of Image" 
                    className="w-[350px] 2xl:w-[450px]"
                />
                <div className="absolute top-8 left-10">
                    <img className="w-12 2xl:w-20 pb-10 2xl:pb-16" src="./images/card-logo.svg" alt="card-front"></img>
                    <div className="flex flex-col gap-4">
                        <div className="text-xl 2xl:text-3xl tracking-widest pr-10">{formData.ccalias ? formData.ccalias : "0000 0000 0000 0000"}</div>
                        <div className="flex flex-row justify-between text-sm tracking-widest">
                            <div className="uppercase ">{formData.name ? formData.name : "Jane Appleseed"}</div>
                            <div className="">{formData.mmalias ? formData.mmalias : "00"}<span>/</span>{formData.yyalias ? formData.yyalias : "00"} </div>
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
                className="w-[350px] 2xl:w-[450px]"
            />

            <div className="absolute top-[82px] 2xl:top-[105px] right-[60px]">
                <div className="text-md 2xl:text-xl tracking-widest">000</div>
            </div>
        </div>
        
        </>

    )
}

function CardDisplay() {
    return (
        <div className="absolute flex flex-col justify-center gap-10 h-full text-white left-[15%]">
            <CardFront/>
            <CardBack/> 
        </div>
    )
}

export default CardDisplay
