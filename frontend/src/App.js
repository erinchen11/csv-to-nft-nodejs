import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Web3Modal from 'web3modal';
import NFT from './NFT.json';
import {ethers} from 'ethers'

class App extends Component {
   

  constructor(props) {
    super(props);
      this.state = {
        selectedFile: null,
        //loaded:0
        file: null,
        CID: null,
        csvData: '',
        tokenId: '',
      }
   
  }

  
  
  onChangeHandler = (event)=>{
   
    // show upload csv file
    console.log(event.target.files[0].name)
    this.setState({
        selectedFile: event.target.files[0],
        loaded: 0,
      })
    }
    // upload csv file to backend and mint NFT
  
    onClickHandler = async() => {
        let data = new FormData() 
        data.append('file', this.state.selectedFile)
       
        // use post to pass csv file to backend
        axios.post("http://localhost:8000/mint/nft", data, {})
        .then(async res => {
            console.log("csv upload " + res.statusText)
            console.log("res body : " + JSON.stringify(res.data));
            this.setState({CID: res.data});

            // mint NFT
            // nft contract address
            const nftaddress = '0xe6D825262E7549f38E8F64FCc9FAb4cDd3010Ab3'
            
            // connect to the wallet, get the signer of the wallet

            const web3Modal = new Web3Modal()
            const connection = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(connection)
            const signer = provider.getSigner()
        
            // use mintToken function to create NFT token of file
            let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
            //check CID from backend
            console.log("CID : " + this.state.CID);
            console.log(contract.owner);
            // use the CID to call minNFT function
            let transaction = await contract.mintNFT(this.state.CID)
            console.log(transaction);
            let tx = await transaction.wait()
                console.log("transaction is ", tx)
            let event = tx.events[0]
                console.log("event is :", event)
            let value = event.args[2]
            // get tokenId of the minted NFT
            let tokenId = value.toNumber()
                console.log("value is ", value)
                console.log("tokenId is ", tokenId)
            this.setState({tokenId: tokenId})
            })

        
    }

    // preview JSON from uploaded CSV
    onPreviewHandler = () => {
        let data = new FormData() 
        data.append('file', this.state.selectedFile)
       

        axios.post("http://localhost:8000/resolve/csv", data, {})
        .then(res => {
            console.log("csv upload " + res.statusText)
            console.log("res body : " + JSON.stringify(res.data));
            this.setState({csvData: res.data});
        })

        

        
    }

    
   onError = (err) => console.log("Error:", err);


  render() {
    return (
      <div className="container">
	      <div className="row">
      	  <div className="offset-md-3 col-md-6">
               <div className="form-group files">
                <label>Upload Your CSV File </label>
               
                <input type="file"  name="file" className="form-control"  onChange={this.onChangeHandler}/>
                <button type="button" className="btn btn-primary btn-block" onClick={this.onClickHandler}>Mint NFT</button>

              </div>  
              <div>
            
                <p>IPFS CID :{this.state.CID}</p>
                <a href={"https://ipfs.io/ipfs/"+this.state.CID}>Your NFT IPFS Link</a>
                <p>NFT TokenId : {this.state.tokenId}</p>
              </div>
              
             
              <button type="button" className="btn btn-success btn-block" onClick={this.onPreviewHandler}>Preview</button>
            <div>
                <pre>{JSON.stringify(this.state.csvData, null, 2) }</pre>
            </div>

              
	      </div>
      </div>
      
      </div>
      
    );
  }
}

export default App;

