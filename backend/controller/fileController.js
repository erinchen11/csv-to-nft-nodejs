const multer = require('multer');
const CSVToJSON = require('csvtojson');
const path = require('path')

// after upload csv, user can press "Preview" to see the JSON from csv.
exports.preview = async function(req, res)
{

        let data = await handleCSV(req)

        console.log(data);
        res.status(200).jsonp(data);
        
    // store the csv file into public directory
    // and convert csv to json
    // use Promise make sure get the data

    function handleCSV(req){
        return new Promise((res,rej)=>{
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
            cb(null, 'public')
          },
           filename: async function (req, file, cb) {
            let orifilename = Date.now()+ file.originalname
            await cb(null, orifilename )
            // conver csv to json and store into public directory
            CSVToJSON().fromFile(path.join(__dirname, "../public/" + orifilename))
            .then(data => {
                res(data)
            }).catch(err => {
                console.log(err);
                rej(err)
            });
          }
        })
        
        // get csv from frontend
        var uploadCSV = multer({ storage: storage }).single('file');
        // detect error with multer
        uploadCSV(req, res, function(err){
            if (err instanceof multer.MulterError){
                 res.status(500).json(err)
            }else if (err) {
                 res.status(500).json("err")
            }
            console.log(req.file)
        })
        
    })}

};

