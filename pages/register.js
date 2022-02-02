import Layout from '@/components/Layout';
import Register from '@/components/register/Register';
import { Head } from 'next/document';

export default function register() {
    return (
        <div className="bg-gray-100">
        
            <Layout>
                <Register />
            </Layout>
        </div>
    )

}
