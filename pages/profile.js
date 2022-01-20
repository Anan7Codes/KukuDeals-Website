import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Profile from '@/components/profile/Profile'

export default function profile() {
    return (
        <div className="">
                  <body className="bg-gray-100 px-5 mt-4 overflow-x-hidden">
            <Navbar/>
            <Profile/>
            <Footer/>
            </body>
        </div>
    )
}
