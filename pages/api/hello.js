const Handler = async (req, res) => {
    if(req.method !== 'GET') {
        return res.send({ success: false, message: 'Wrong request made'})
    }
    if(req.method === 'GET') {
        res.send({ success: true, message: "Hello World"})
    }
}

export default Handler