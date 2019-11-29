import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import ReactTable from 'react-table';

class Model extends React.Component{
  constructor(){
    super();
    this.state={
      id:"",
      modelObj:{},
      isdisabled:true,
      newVariableObj:{},
      variableData:[],
      isVariableCellEditable:false
    }
  }
  renderEditable = cellInfo => {
    const cellValue = this.state.variableData[cellInfo.index][cellInfo.column.id];
    return (<label 
      contentEditable
      onBlur={e => {
        const variableData = [...this.state.variableData];
        variableData[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
        
        this.setState({ variableData });
      }}>{cellValue}</label>);
  };
  updateData=()=>{
    
  }
  deleteVariable = ()=>{
    console.log("aa");
  }
  saveVariables = ()=>{
    if(this.props.match.params.id=="new"){

    }else{
     const obj =  this.state.modelObj;
     obj.variables = this.state.variableData;
    axios.put('http://localhost:8081/models/'+this.state.id,obj).then(resp => {
    console.log(resp);
     // this.props.history.push('/');
   }).catch(error => {

       console.log(error);
   });  }
  }
  enableEditModel = ()=>{
    this.setState({isdisabled:false});
  }
  addDataToTable = ()=>{
      const arr = this.state.variableData;
      arr.splice(0, 0,{name:"",calculationtype:"",description:"",variabletype:""});
      
      this.setState({variableData:arr});
      this.setState({newVariableObj:{name:"",calculationtype:"",description:"",variabletype:""}});
  }
  updateModel=()=>{
    if(this.props.match.params.id=="new"){
      axios.post('http://localhost:8081/models'+this.state.id,this.state.modelObj).then(resp => {

        this.props.history.push('/');
     }).catch(error => {

         console.log(error);
     });  
    }else{
      axios.put('http://localhost:8081/models/'+this.state.id,this.state.modelObj).then(resp => {

        this.props.history.push('/');
     }).catch(error => {

         console.log(error);
     });  
    }
        
    
  }
  
  
  componentDidMount(){
    if(this.props.match.params.id!="new"){
      const id = this.props.match.params.id
    this.setState({
      id:id
    })
   
    axios.get('http://localhost:8081/models')
    .then(res => {
      const arr  = res.data.filter((m)=>m.id==id) ;
     
      this.setState({
        modelObj:arr[0],
        variableData:arr[0].variables==undefined?[]:arr[0].variables
      })
    })
    }
  }
render(){
  const o ={
    id:'',
    name:'',
    developer:'',
    status:'',
    form:''
  }
  const obj = this.state.modelObj==null?o:this.state.modelObj;
  const variableData =this.state.variableData;
  const pathId = this.props.match.params.id!="new";
  const newVariableObj = this.state.newVariableObj;
  
    return(<div>
        <div className="accordion" id="MainAccordian">
  <div className="card">
    <div className="card-header" id="headingOne">
      <h2 className="mb-0">
        <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Model Details
        </button>
      </h2>
    </div>

    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#MainAccordian">
      <div className="card-body">
      <div className="row">
      <div className="col-sm-6" >
       <form>
         <div className="form-group">
           <label htmlFor="id">Model id</label>
           <input type="text" className="form-control" value={obj.id}
           disabled = {(pathId && this.state.isdisabled)? "disabled" : ""}
            onChange={(e)=>{
              e.preventDefault();
              const obj = this.state.modelObj;
              obj.id = e.target.value
              this.setState({modalObj:obj});
              }}/>
         </div>
         <div className="form-group">
           <label>Name</label>
           <input type="text" className="form-control" value={obj.name}
           disabled = {(pathId && this.state.isdisabled)? "disabled" : ""}
           onChange={(e)=>{
            e.preventDefault();
            const obj = this.state.modelObj;
            obj.name = e.target.value
            this.setState({modalObj:obj});
            }}/>
         </div>
         <div className="form-group">
           <label>Form</label>
           <input type="text" className="form-control" value={obj.form}
           disabled = {(pathId && this.state.isdisabled)? "disabled" : ""}
           onChange={(e)=>{
            e.preventDefault();
            const obj = this.state.modelObj;
            obj.form = e.target.value
            this.setState({modalObj:obj});
            }}/>
         </div>
         <div className="form-group">
           <label>Developer</label>
           <input type="text" className="form-control" value={obj.developer}
           disabled = {(pathId && this.state.isdisabled)? "disabled" : ""}
           onChange={(e)=>{
            e.preventDefault();
            const obj = this.state.modelObj;
            obj.developer = e.target.value
            this.setState({modalObj:obj});
            }}/>
         </div>
         <div className="form-group">
           <label>Status</label>
           <input type="text" className="form-control" value={obj.status}
           disabled = {(pathId && this.state.isdisabled)? "disabled" : ""}
           onChange={(e)=>{
            e.preventDefault();
            const obj = this.state.modelObj;
            obj.status = e.target.value
            this.setState({modalObj:obj});
            }}/>
         </div>
       </form>
       </div>
       <div className="col-sm-6" >
       <div className="form-group">
           <label>Model System</label>
           <input type="text" className="form-control" value={obj.system}
           disabled = {(pathId && this.state.isdisabled)? "disabled" : ""}
           onChange={(e)=>{
            e.preventDefault();
            const obj = this.state.modelObj;
            obj.system = e.target.value
            this.setState({modalObj:obj});
            }}/>
         </div>
         <div className="form-group">
           <label>Model Category</label>
           <input type="text" className="form-control" value={obj.category}
           disabled = {(pathId && this.state.isdisabled)? "disabled" : ""}
           onChange={(e)=>{
            e.preventDefault();
            const obj = this.state.modelObj;
            obj.category = e.target.value
            this.setState({modalObj:obj});
            }}/>
         </div>
         <div className="form-group">
           <label>Created Date</label>
           <input type="text" className="form-control" value={obj.createddate}
           disabled = {(pathId && this.state.isdisabled)? "disabled" : ""}
           onChange={(e)=>{
            e.preventDefault();
            const obj = this.state.modelObj;
            obj.createddate = e.target.value
            this.setState({modalObj:obj});
            }}/>
         </div>
         <div className="form-group">
           <label>Description</label>
           <input type="text" className="form-control" value={obj.description}
           disabled = {(pathId && this.state.isdisabled)? "disabled" : ""}
           onChange={(e)=>{
            e.preventDefault();
            const obj = this.state.modelObj;
            obj.description = e.target.value
            this.setState({modalObj:obj});
            }}/>
         </div>
         <div className="form-group">
           <label>Created By</label>
           <input type="text" className="form-control" value={obj.createdby}
           disabled = {(pathId && this.state.isdisabled)? "disabled" : ""}
           onChange={(e)=>{
            e.preventDefault();
            const obj = this.state.modelObj;
            obj.createdby = e.target.value
            this.setState({modalObj:obj});
            }}/>
         </div>
       </div>
       </div>
       <button className="btn btn-outline-info ml-2 mb-5" onClick={this.enableEditModel}
            disabled = {(!this.state.isdisabled)? "disabled" : ""} hidden={!pathId ?"hidden":""}>
            <FontAwesomeIcon icon="edit"/>&nbsp;Edit</button>
        <button className="btn btn-outline-info ml-2 mb-5" onClick={this.updateModel}
            disabled = {(pathId && this.state.isdisabled)? "disabled" : ""}>
            <FontAwesomeIcon icon="save"/>&nbsp;Save</button>
      </div>
    </div>
  </div>
  <div className="card">
    <div className="card-header" id="headingTwo">
      <h2 className="mb-0">
        <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
         Model Variables
        </button>
      </h2>
    </div>
    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#MainAccordian">
      <div className="card-body">
        <div className="d-flex">
        <button className="btn btn-outline-info btnFunc ml-auto" type="button" onClick={this.addDataToTable}>
          <FontAwesomeIcon icon="plus"/>
        </button>
        <button className="btn btn-outline-info btnFunc" onClick={this.saveVariables}>
    <FontAwesomeIcon icon="save"/></button>
        </div>
       <ReactTable
       data={variableData}
       getTdProps={(state, rowInfo, column, instance)=>{
        return{
          onChange:(e)=>{
            e.preventDefault();
            console.log("here");
            console.log(rowInfo);
          },
          onClick:(e)=>{
            e.preventDefault();
            console.log(this.state.variableData);
          }
        }
      }}
       columns={[
             {
               Header: "Name",
               accessor: "name",
               Cell: this.renderEditable,
               style: { textAlign: "center" }
             },{
                Header: "Description",
               accessor: "description",
               Cell: this.renderEditable,
               style: { textAlign: "center" }
             },{
                Header: "Calculation Type",
                accessor: "calculationtype",
                Cell: this.renderEditable,
                style: { textAlign: "center" }
             },{
                Header: "Variable Type",
                accessor: "variabletype",
                Cell: this.renderEditable,
                style: { textAlign: "center" }
             },{
              Header: "Data Type",
              accessor: "datatype",
              Cell: this.renderEditable,
              style: { textAlign: "center" }
           },{
            Header: "Coefficient",
            accessor: "coefficient",
            Cell: this.renderEditable,
            style: { textAlign: "center" }
            },{
              Header: "Variable Type Details",
              accessor: "typedetails",
              Cell: this.renderEditable,
              style: { textAlign: "center" }
           },{
            Header: "Age Index Expression",
            accessor: "ageindexexpression",
            Cell: this.renderEditable,
            style: { textAlign: "center" }
           }
            ]}
            defaultPageSize={10}
       />
      </div>
    </div>
  </div>
  </div>
<div>
  </div>
  </div>
    );
}


}

export default Model;