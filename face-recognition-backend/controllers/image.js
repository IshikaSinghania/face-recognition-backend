const Clarifai = require('clarifai'); 

//use Your Own apiKey
const app = new Clarifai.App(
    {
        apiKey: '02ac6c6843574410902279cf74620f0a'
    }
);
const handleApiCall = (req,res) =>{
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		} )
		.catch(err => res.status(400).json('unable to work with api'))
}


const handleImagePost = ( db) => (req, res) =>{
	const { id }= req.body;
	db('users').where('id', '=', id)
	.increment('entries',1)
	.returning('entries')
	.then(entries =>{
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImagePost,
	handleApiCall
}