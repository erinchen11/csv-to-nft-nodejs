const ipfsClient = require("ipfs-api");
const ipfs = new ipfsClient({host:'ipfs.infura.io',port:5001,protocol:'https'});

const fs = require('fs');
const multer = require('multer');
const CSVToJSON = require('csvtojson');
const path = require('path')



exports.mint = async function(req, res)
{
    // mintNFT : using CID to call it.
    // use JSON as metadata to store in IPFS.

    // before mint NFT, have to saving CSV file and convert it into JSON, and save it.
    // Use the JSON to call mintNFT .
    // make sure the sequence of excute function by using promise.
    // 1. saveCSVFile
    // 2. savingJSONFile
    // 3. mintNFT

    // get the CID to return frontend to use.
    
       try {
       
        let path = await savingCSVFile(req)
        let data = await savingJSONFile(path)
        let resultCID = await mintNFT(data)

        // test code : check CID
        console.log("333-- " + resultCID);
        console.log("444-- " + resultCID.link);
        console.log("555-- " + resultCID.CID);
        // get the CID to return frontend
        res.status(200).jsonp(resultCID.CID);
        

       } catch (error) {
        res.status(500).jsonp(error);
       }
   

};



async function savingCSVFile(req){
    return new Promise((res,rej)=>{
        let orifilename
    // console.log(req);
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null, 'public')
      },
       filename: async function (req, file, cb) {
         orifilename = Date.now()+ file.originalname
         cb(null, orifilename )
         console.log("ori filename -1 : " + orifilename)
      }
    })
    
    // upload csv from frontend
    var uploadCSV = multer({ storage: storage }).single('file');
    uploadCSV(req, res, function(err){
        if (err instanceof multer.MulterError){
            console.log(err);
            rej(err)
        }else if (err) {
            console.log(err);
            rej(err)
        }
        if (!err) {
            console.log("ori filename -2 : " + orifilename)
            res(orifilename)
        }
    })
    
    })
}


async function savingJSONFile(filepath){
    return new Promise((res,rej)=>{
        filepath=path.join(__dirname, "../public/"+filepath)

        CSVToJSON().fromFile(filepath)
        .then(data => {
            let jsonfilename = filepath.split(".")[0]
            let newpath = jsonfilename+".json"
            // Write JSON file
            fs.writeFileSync(newpath, JSON.stringify(data))
            res(data)
        }).catch(err => {
            console.log(err);
            rej(err)
        });
    })
} 


let mintNFT = function (data){
    return new Promise( async (res,rej)=>{  // make sure return obj
   
    let buffer = new Buffer.from(JSON.stringify(data));
    
    ipfs.add(buffer).then((fileinfo)=>{
        console.log("fileinfo : "+fileinfo);
        let obj = {
            link: "https://ipfs.io/ipfs/"+fileinfo[0].hash,
            CID: fileinfo[0].hash
        }
        console.log("obj"+obj);
        
        res(obj);
      });
    
})
}