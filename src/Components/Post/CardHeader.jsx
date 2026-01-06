import userPhoto from '../../assets/test.webp'

export default function CardHeader({avatar , name , creationDate,subHeader}) {

  const date = new Date(creationDate);

  const formatted = date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  return (
 <div className=" h-16 flex items-center justify-between rounded px-5 ">
            <div className="flex">
              <img onError={(error) => error.target.src = userPhoto} className=" rounded-full w-10 h-10 mr-3" src={avatar} />
                <div>
                  <h3 className="text-md font-semibold ">{name}</h3>
                  {subHeader && <p className="text-sm text-gray-600">{subHeader}</p>}
                  {creationDate && <p className="text-xs text-gray-500">{formatted}</p>}
                </div>
            </div>
        </div>  )
}
