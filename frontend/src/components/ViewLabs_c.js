import React, {Component} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';


export default class viewLabs extends Component {
        constructor(props){
        super(props);

        this.state={
        labs:[]
        };
    }


        componentDidMount(){
        this.retrieveLabs();
    }

    //retrive lab details from database
    retrieveLabs(){
        axios.get("http://localhost:8070/labs").then(res=>{
            if(res.data.success){
                this.setState({
                labs:res.data.existingLabs
            });

                console.log(this.state.labs);
        }
        })
    }

    //delete lab test details method
    onDelete = (id) => {
        axios.delete(`http://localhost:8070/lab/delete/${id}`).then((res) =>{
            alert("Do you want to delete the record?");
            this.retrieveLabs();
        })
    }


    //search lab test details by id or patients name
    filterData(labs,searchKey){
    const result = labs.filter((labs)=>
    labs.id.toString().includes(searchKey)||labs.name.toLowerCase().includes(searchKey)
    )
    this.setState({labs:result})
    }

    handleSearchArea =(e) => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:8070/labs")
        .then(Response => {
            if(Response.data.success){
                this.filterData(Response.data.existingLabs,searchKey)
            }
        });
}



    render(){
        return(
          
            <div> 
                <h1 align="center"><b>Laboratory Tests Details</b></h1>
                <br></br>

            <Link to="PrintLabReport" className="results">
            <button className='btn btn-primary' style={{marginLeft:'85%',marginTop:'5px'}}><i class = "fas fa-file-download">&nbsp;&nbsp;&nbsp;</i>View Report</button>
            {/* <button className="btn btn-primary" style={{marginLeft:890,marginBottom:20}}><i class="fas fa-list"></i>&nbsp;View All Lab Tests</button>   */}
            </Link>

                <div>
                <div>
                <div class="col-md-8">
                <div class="search"> 
                <i class="fa fa-search"></i> 
                <input type="text" 
                    class="form-control" 
                    style={{fontSize:'14px'}} 
                    placeholder="Enter Patient ID or Patient Name Here" 
                    onChange={this.handleSearchArea}/></div>
                </div>
                </div>
                </div>
                
                <br></br>
                <hr></hr>
                <br></br>
                <table className="table table-striped">
                    <thead>
                        <tr class="table-primary">
                            <th scope='col'>Patient Name</th>
                            <th scope='col'>Patient ID</th>
                            <th scope= 'col'>Phone</th>
                            <th scope='col'>Age</th>
                            <th scope='col'>Gender</th>
                            <th scope='col'>Date</th>
                            <th scope='col'>Laboratory Test</th>
                            <th scope='col'>Lab No</th>
                            <th scope='col'>Laboratory Technologist</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.labs.map((labs,index) => (

                            <tr>
                                
                                    <td>
                                        <a href={'/lab/${labs._id}'} style={{textDecoration:'none',color:'black'}}>
                                        {labs.name}
                                        </a>
                                    </td>
                                    <td>{labs.id} </td>
                                    <td>0{labs.phone}</td>
                                    <td>{labs.age} </td>
                                    <td>{labs.gender} </td>
                                    <td>{labs.date.toString().substr(0 ,10)}</td>
                                    <td>{labs.labTest} </td>
                                    <td><center>{labs.labNo}</center> </td>
                                    <td>{labs.technologist} </td>
                                    <td>{labs.status} </td>
                                    <td>
                                        <a className="btn btn-warning" href={`/editLab/${labs._id}`}>
                                            <i className="fas fa-edit"></i>&nbsp;Edit
                                        </a>
                                        &nbsp;
                                        &nbsp;
                                        <a className="btn btn-danger" href="#" onClick={() => this.onDelete(labs._id)}>
                                            <i className="far fa-trash-alt"></i>&nbsp;Delete
                                        </a>

                                    </td>
                            </tr>

                        ))}
                    </tbody>
                </table>
                
            </div>
        )
    }
}


