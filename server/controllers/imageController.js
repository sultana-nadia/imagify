import FormData from "form-data"
import userModel from "../models/userModel.js"
import axios from "axios"


export const generateImage = async(req, res)=>{
    // Track whether a credit was charged so failed generations can be refunded.
    let chargedUserId = null;

    try{

        const {prompt} = req.body
        const userId = req.userId
        // Normalize prompt input before charging or sending it to ClipDrop.
        const cleanPrompt = prompt?.trim()

        if(!cleanPrompt){
            return res.status(400).json({success: false, message: 'Prompt is required'})
        }

        // Deduct one credit atomically so parallel requests cannot overspend a balance.
        const user = await userModel.findOneAndUpdate(
            {_id: userId, creditBalance: {$gt: 0}},
            {$inc: {creditBalance: -1}},
            {returnDocument: 'after'}
        )

        if(!user){
            // Return the current balance so the client can update the navbar immediately.
            const existingUser = await userModel.findById(userId)
            return res.status(402).json({
                success: false,
                message: existingUser ? 'No credit balance' : 'User not found',
                creditBalance: existingUser?.creditBalance || 0
            })
        }

        chargedUserId = user._id

        const formData = new FormData()
        formData.append('prompt', cleanPrompt)

        // ClipDrop returns binary PNG data, so the response is requested as an arraybuffer.
        const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API,
                ...formData.getHeaders()
            },
            responseType: 'arraybuffer'
        })

        const base64Image = Buffer.from(data, 'binary').toString('base64')

        const resultImage = `data:image/png;base64,${base64Image}`

        res.json({success: true, message: "Image Generated", creditBalance: user.creditBalance, resultImage})



    }catch(error){
        if(chargedUserId){
            // If the provider fails after charging, restore the user's credit.
            await userModel.findByIdAndUpdate(chargedUserId, {$inc: {creditBalance: 1}})
        }

        console.log(error.message)
        res.status(500).json({success: false, message: error.response?.data?.message || error.message})
    }
}
