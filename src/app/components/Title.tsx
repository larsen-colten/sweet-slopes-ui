type TitleProps = {
    title: string
}

export default function Title(props: TitleProps) {
    return (
        <div className="grid grid-cols-10">
            <div className="col-start-5 col-end-7 mt-5">
                <p className="col-start-5 col-end-7 flex text-2xl justify-center border-t-2 border-b-2 border-stone-500 py-10 font-sans">{props.title}</p>
            </div>
        </div >
    )
}