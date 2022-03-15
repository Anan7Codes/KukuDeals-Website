import Layout from '@/components/Layout'
import Head from 'next/head'
import React from 'react'

export default function Faq() {
    return (
        <div className="bg-[#161616]"> 
        <Head>
          <title>Kuku Deals</title>
        </Head>
        <Layout>
            <div className="text-white">
                <p className="text-[2.5rem] text-[#ffd601] pt-3 pb-5 font-bold font-title">Privacy Policy</p>
                <div className="pl-8 tracking-wide ">
                <p className="text-3xl text-[#ffd601] pt-5 font-bold pb-5 font-title" className="text-3xl text-[#ffd601] pt-5 font-bold pb-5 font-title">1. Your information</p>
                <li className="text-base pb-4  leading-loose text-justify" className="text-base pb-4">The type of information we collect from you is either personal to you, or is general in nature</li>
                <li className="text-base pb-4 leading-loose	text-justify">Personal Information: When you register on the platform as a member, update your information, purchase any goods or services, take part in promotions or send emails to us, you provide us with information that we store and process. Such information may include your name, address, phone number, email address, purchase and transaction history, interests, and other such 'Personal Information'.</li>
                <li className="text-base pb-4 leading-loose text-justify">General Information: We also receive more general information from you as a result of your visits to, and use of, the platform. This general information does not identify you personally, and can include information such as your IP address, the date and time you access the platform, length of time you spend on the platform, your browsing history (recorded by the text and graphics files that compose that page), the Internet address of the website from which you linked directly to our platform, and other such 'General Information'.</li>
               
                <p className="text-3xl text-[#ffd601] pt-5 font-bold pb-5 font-title">2. Collecting and using information </p>
                <li className="leading-loose text-justify text-base pb-4">All credit/debit cards details and personally identifiable information will NOT be stored, sold, shared, rented or leased to any third parties.</li>
                <li className="leading-loose text-justify text-base pb-4">Most of the platform can be used without giving us any information. However, certain services may involve collection of information from you. We use this information to provide you with a better service, and in particular to: keep internal records; improve our products, services and the platform; communicate with you if you have ordered, purchased or participated in anything on the platform; contact you for market research purposes; and provide you with information about new opportunities, promotions, special offers and other information that we may feel is relevant to you. If you contact us via the platform,  we may keep a record of that correspondence.</li>
                <li className="leading-loose text-justify text-base pb-4">We use General Information to help us make the platform more useful to visitors (including to help us assess content of interest to visitors), and for other purposes such as determining the Platform’s technical design specifications and identifying system performance or problem areas, for tracking activity on the platform, preparing reports, assessing trends, and otherwise monitoring the way in which the platform is being used none of which would be in a way that personally identifies any users.</li>
                <li className="leading-loose text-justify text-base pb-4">Some of the advertisements you see on the platform are selected and delivered by third parties, such as ad networks, advertising agencies, advertisers, and audience segment providers. These third parties may collect information about you and your online activities, either on the platform or on other websites, through cookies, web beacons, and other technologies in an effort to understand your interests and deliver to you advertisements that are tailored to your interests. Please remember that we do not have access to, or control over, the information these third parties may collect. The information practices of these third parties are not covered by this privacy policy.</li>
               
                <p className="text-3xl text-[#ffd601] pt-5 font-bold pb-5 font-title">3. Security</p>
                <li className="leading-loose text-justify text-base pb-4">Keeping your Personal Information secure and preventing unauthorized access is of utmost priority to Us, and We take all steps reasonably necessary to protect your Personal Information against any unauthorised access, use, alteration, disclosure or destruction. Whilst We have put in place physical, electronic and managerial procedures to secure and safeguard your Personal Information, We will not be held responsible for any unauthorised access by third parties and we cannot guarantee that the Personal Information provided by you or that is transmitted via the Platform or by e-mail is totally secure and safe.</li>
                
                <p className="text-3xl text-[#ffd601] pt-5 font-bold pb-5 font-title">4. Use of cookies </p>
                <li className="leading-loose text-justify text-base pb-4">Like many websites, the platform uses cookies, which are files that store information on your hard drive. Cookies allow the platform to identify account holders, track new users, record session information, and generally to optimise your experience. Most browsers accept cookies automatically but if you choose you can disable the cookies from your browser. For online advertising campaigns, cookies are automatically deleted after one (1) month.</li>
                <li className="leading-loose text-justify text-base pb-4">We recommend that you leave cookies “turned on” so that you can enjoy a better experience on the platform. </li>
                
                <p className="text-3xl text-[#ffd601] pt-5 font-bold pb-5 font-title">5. Use of Google analytics and Facebook Pixel</p>
                <li className="leading-loose text-justify text-base pb-4">This Website uses Google Analytics, a web analytics service of Google Inc. (“Google”) and Facebook Pixel, a social media analytics service of Facebook . Google Analytics and Facebook Pixel uses cookies and/or text files to analyze website traffic. Information generated by cookies with your details (including your IP address) is transferred to Google and Facebook  servers. Google and Facebook process this information to evaluate your use of the platform, compile reports about the platform’s activity on our behalf, and deliver other related services regarding website and Internet use. Google and Facebook may also share this information with third parties insofar as this is necessary or if these third parties process the information on behalf of Google or Facebook. Under no circumstances will Google or Facebook use your IP address in connection with other data supplied by Google or Facebook.</li>
                <li className="leading-loose text-justify text-base pb-4">You may disable the cookies from your browser by adjusting your browser settings. However, in this scenario, you may not be able to make full use of all the functions 
                available on the platform. By using the platform, you agree to Google's and Facebook’s  processing of the type of information discussed in this section in the manner contemplated in this Policy. Us, and our respective suppliers, and any of our shareholders, subsidiaries, parent companies, and any of Our and their officers, directors, managers, members, agents, and employees, are not liable for any direct, indirect, punitive, incidental, special, or consequential damages or loss (including, without limitation, incidental and consequential damages, lost profits, or damages resulting from lost data or business interruption) arising out of, or in way connected with, the use of the type of information discussed in this section.</li>
          
                </div>
                  </div>
        </Layout>
        </div>
    )
}
