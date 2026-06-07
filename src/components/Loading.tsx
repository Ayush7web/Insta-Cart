import { LoaderIcon } from "lucide-react"


const Loading = () => {
  return (
    <div className="flex min-h-96 h-full w-full">
      <LoaderIcon className="animate-spin size-8 text-green-950"/>
    </div>
  )
}

export default Loading