import React, { Component } from 'react'
import Dropzone from 'react-dropzone';
import './Classifier.css'
import {Spinner, Button,Alert,Image} from 'react-bootstrap'
import axios from 'axios'


export default class Classifier extends Component {
    state={
        files: [],
        isLoading: false,
        errorMessage:'',
        resentImage:null
    }


    onDrop = (files) =>{
        this.setState({files:[],isLoading:true,resentImage:null})
        this.loadImage(files)
    }
    loadImage = (files)=>{
        setTimeout(()=>{
            this.setState({
                files,
                isLoading:false
            },()=>{
                console.log(this.state.files)
                let formData = new FormData()
                formData.append('picture', this.state.files[0],this.state.files[0].name)
                axios.post('http://localhost:8000/api/images/',formData,{
                    headers:{
                        'accept':'application/json',
                        'content-type':'multipart/form-data'
                }
        })
        .catch(err=>{
            this.setState({errorMessage:err.message})
        })

            }
            )  
        },1000);
    }
    activateSpinner = ()=>{
        this.setState({files:[],isLoading:true})
    }
    deactivateSpinner = ()=>{
        this.setState({isLoading:false})
    }

    sendImage = ()=>{
        this.activateSpinner()
        let formData = new FormData()
        formData.append('picture', this.state.files[0],this.state.files[0].name)
        axios.post('http://localhost:8000/api/images/',formData,{
            headers:{
                'accept':'application/json',
                'content-type':'multipart/form-data'
            }
        }).then(resp=>{
            this.getImageClass(resp)
        }).catch(err=>{
            this.setState({errorMessage:err.message})
        })

        
    }

    getImageClass = (obj)=>{
        axios.get(`http://localhost:8000/api/images/${obj.data.id}/`,{
            headers:{
                'accept':'application/json',
            }
        })
        .then(resp=>{
            this.setState({resentImage:resp})
        })
        .catch(err=>{
            this.setState({errorMessage:err.message})
        })
        this.deactivateSpinner()
    }


    render() {
        const files = this.state.files.map(file => (
            <li key={file.name}>
              {file.name} - {file.size} bytes
            </li>
          ));
        return (
            <div>
                <Dropzone onDrop={this.onDrop}  accept='image/png, image/jpeg'>
                    {({isDragActive, getRootProps, getInputProps}) => (
                    <section className="container">
                        <div {...getRootProps({className: 'dropzone back'})}>
                        <input {...getInputProps()} />
                        <i className='far fa-image mb-2 text-muted' style={{fontSize:100}}></i>
                        <p className='text-muted'>{isDragActive ? "Rasim yuklanmoqda" :"Bironta rasim yuklang"}</p>
                        </div>
                        <aside>
                        {files}
                        </aside>
                        {this.state.errorMessage && (
                            <Alert variant='danger'>
                                {this.state.errorMessage}
                            </Alert>
                        )}
                       

                        {this.state.files.length > 0 && (
                            <Button variant='info' className='mt-4 btn-block' size='lg' onClick={this.sendImage}>Yubormoq</Button>
                        )}
                        {this.state.isLoading && (
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden"></span>
                            </Spinner>
                        )}
                        {this.state.resentImage &&(
                            <React.Fragment>
                                <Alert variant='primary'>
                                Javob:  {this.state.resentImage.data.classified}
                                </Alert>
                                {
                                <Alert variant='info'>
                                    <a  href={`https://www.google.com/search?q=${this.state.resentImage.data.classified}`}>{this.state.resentImage.data.classified} nima ?</a>
                                </Alert> }

                                <Image className='justify-content-center' src={this.state.resentImage.data.picture} height='200' rounded />
                            </React.Fragment>
                        )}
                        
                    </section>
                    )}
                </Dropzone>
            </div>
        )
    }
}

