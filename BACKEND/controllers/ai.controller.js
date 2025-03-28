import * as ai from '../services/ai.service.js';


export const getResult = async (req, res) => {
    try{
        const prompt = req.query.prompt;
        const result = await ai.generateResult(prompt);
        res.status(200).json({result});
    }catch(err){
        res.status(500).json({error: err});
    }
}