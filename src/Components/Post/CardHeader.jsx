import userPhoto from '../../assets/test.webp'

export default function CardHeader({avatar , name , subHeader}) {
  return (
 <div className=" h-16 flex items-center justify-between rounded px-5 ">
            <div className="flex">
              <img onError={(error) => error.target.src = userPhoto} className=" rounded-full w-10 h-10 mr-3" src={avatar} />
                <div>
                  <h3 className="text-md font-semibold ">{name}</h3>
                  <p className="text-xs text-gray-500">{subHeader}</p>
                </div>
            </div>
        </div>  )
}
