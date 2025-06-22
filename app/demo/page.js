// export default function Home() {
//     return (
//         <button className="bg-green-500 text-white px-4 py-2 m-5 rounded hover:bg-green-600 focus:ring-1 focus:ring-green-300">
//             Click Me
//         </button>
//     )
// }

// export default function Card() {
//     return (
//        <div className="max-w-sm mx-auto mt-10 bg-white rounded-xl shadow-md shadow-green-600 hover:shadow-lg p-6">
//             <h2 className="text-xl font-bold mb-2">
//                 My Spec Card
//             </h2>
//             <p className="text-gray-600">
//                 This is Card Component by Tailwind.css
//             </p>
//        </div>
//     )
// }


export default function Home(){
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
            <div className="bg-blue-100 p-4 rounded">Box 1</div>
            <div className="bg-blue-100 p-4 rounded">Box 2</div>
            <div className="bg-blue-100 p-4 rounded">Box 3</div>
        </div>
    );
}