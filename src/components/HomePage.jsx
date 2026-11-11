import WorkList from "./WorkList"
export default function HomePage() {
    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                <a href="#"
                   className="px-4 py-2 bg-amber-800 text-white rounded-lg hover:bg-gray-600 transition mx-auto w-50">
                    Get Started
                </a>
                <div>
                    <p>Already have an account? &nbsp;
                        <a href="#" className="text-blue-500 underline">
                            Log in
                        </a>
                    </p>
                </div>
            </div>
            <WorkList/>
        </>
    )
}