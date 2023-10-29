import useStore from "../stores/formStore";

function CardFront() {
    const formData = useStore((state) => state.formData); 
    return (
        <>
            <div className="absolute z-10 top-[120px] ml-[-15%] lg:left-0 lg:top-0 lg:mt-0 lg:relative lg:ml-[-100px]">
                <img 
                    src="./images/bg-card-front.png"
                    alt="Description of Image" 
                    className="w-[300px] lg:w-[300px] xl:w-[350px] 2xl:w-[450px] shadow-2xl"
                />
                <div className="absolute top-[12%] left-[7%] w-[250px] lg:w-[250px] xl:w-[280px] 2xl:w-[380px]">
                    <img className="w-12 lg:w-8 xl:w-12 2xl:w-20 pb-10 2xl:pb-16" src="./images/card-logo.svg" alt="card-front"></img>
                    <div className="text-md lg:text-[18px] xl:text-xl 2xl:text-[28px] tracking-widest">{formData.ccalias ? formData.ccalias : "0000 0000 0000 0000"}</div>
                    <div className="flex flex-row py-2 lg:py-3 xl:py-4 2xl:py-5">
                        <div className="uppercase text-sm lg:text-xs xl:text-md 2xl:text-lg w-4/5">{formData.name ? formData.name : "Jane Appleseed"}</div>
                        <div className="text-end text-sm lg:text-xs xl:text-md  2xl:text-lg w-1/5">{formData.mmalias ? formData.mmalias : "00"}<span>/</span>{formData.yyalias ? formData.yyalias : "00"} </div>
                    </div>
                </div>
            </div> 
        </>
    )
}

function CardBack() {
    const formData = useStore((state) => state.formData); 

    return (
        <>
        <div className="absolute ml-50 top-[20px] mr-[-15%] lg:top-0 lg:relative lg:mt-0 ">
        <img 
                src="./images/bg-card-back.png"
                alt="Description of Image" 
                className="w-[300px] lg:w-[300px] xl:w-[350px] 2xl:w-[450px] shadow-xl"
                />

            <div className="absolute top-[70px] right-[40px] lg:top-[69px] xl:top-[82px] 2xl:top-[105px] lg:right-[40px] xl:right-[60px]">
                <div className="text-md 2xl:text-xl tracking-widest">{formData.cvc ? formData.cvc : "000"}</div>
            </div>
        </div>
        
        </>

    )
}

function CardDisplay() {
    return (
        <div
        className="

            flex
            flex-col-reverse
            w-full
            justify-center
            items-center
            lg:absolute
            lg:flex-col
            lg:items-start
            lg:h-full
            lg:left-[15%]
            lg:w-auto
            lg:gap-10
            lg:top-0
            text-white

        ">
            <CardFront/>
            <CardBack/> 
        </div>
    )
}

export default CardDisplay
