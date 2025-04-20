

const HomeSkeleton = () => {
  return (
    <div className="animate-pulse space-y-6">
            <div className="h-10 w-3/4 mx-auto bg-gray-200 rounded-lg" />
            <div className="h-4 w-1/2 mx-auto bg-gray-200 rounded" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="h-[400px] bg-gray-200 rounded-lg" />
              <div className="h-[400px] bg-gray-200 rounded-lg" />
            </div>

            <div className="flex justify-center mt-8">
              <div className="w-48 h-12 bg-gray-300 rounded-full" />
            </div>
    </div>
  )
}

export default HomeSkeleton
