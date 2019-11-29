import React from  'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTable from 'react-table';
import Modal from 'react-modal';
import datas from './data';
import axios from 'axios';

class DataTable extends React.Component{

    constructor(){
        super();
        this.state={
            data:[],
            rowEdit:null,
            rowData:{},
            modalIsOpen:false,
            isDeleteModelOpen:false,
            modalToSave:{
               
            }
        }
    }
    handleDelete=()=>{
        this.setState({isDeleteModelOpen:true});
        
    }
    cancelDelete=()=>{
        this.setState({isDeleteModelOpen:false})
    }
    confirmDelete=()=>{
        const data  = this.state.data;
        axios.delete('http://localhost:8081/models/'+this.state.rowData.id).then(resp => {
            this.updateData();
            this.setState({isDeleteModelOpen:false})
         }).catch(error => {
 
             console.log(error);
         }); 
      
    }
    handleEdit=()=>{
        console.log(this.state.rowData);
        const n = this.state.rowData==null?2:this.state.rowData.id;
        this.props.history.push('/model/'+n);
    }
    showDialog=()=>{
        // this.setState({
        //     modalIsOpen:true
        // });
        this.props.history.push('/model/new');
    } 
    afterOpenModal=()=> {
        // references are now sync'd and can be accessed.
        
      }
      createModal=()=>{
        axios.post('http://localhost:8081/models',this.state.modalToSave)
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.setState({modalIsOpen:false});
                this.updateData();
            })
        }
         
      closeModal=()=> {
        this.setState({modalIsOpen: false});
      }
      updateData=()=>{
        axios.get('http://localhost:8081/models')
        .then(res => {
          this.setState(
              {
                   data:res.data
             });
        })
      }
        componentDidMount(){
           this.updateData();
        }
    render(){
   const data = this.state.data;
   const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
        return(
        <div>
            <div className="card bg-light">
                <div className="card-header mr-auto"><h5 className="badge badge-info">Model</h5></div>
                    <div className="card-body">
                      <div className="d-flex">
                          <button className="btn btn-outline-info btnFunc ml-auto" onClick={this.showDialog}><FontAwesomeIcon icon="plus"/></button>
                          <button className="btn btn-outline-info btnFunc" onClick={this.handleDelete}
                           disabled = {(this.state.rowEdit==null)? "disabled" : ""}><FontAwesomeIcon icon="trash"/>
                          </button>
                      <button className="btn btn-outline-info btnFunc" onClick={this.handleEdit}
                       disabled = {(this.state.rowEdit==null)? "disabled" : ""}><FontAwesomeIcon icon="edit"/>
                      </button>
                      </div>
                       <ReactTable
                       data={data}
                       columns={[
                             {
                               Header: "Model ID",
                               accessor: "id",
                               Cell: this.renderEditable,
                               style: { textAlign: "center" }
                             },{
                                Header: "Model Name",
                               accessor: "name",
                               Cell: this.renderEditable,
                               style: { textAlign: "center" }
                             },{
                                Header: "Model System",
                                accessor: "system",
                                Cell: this.renderEditable,
                                style: { textAlign: "center" }
                             },{
                                Header: "Model Category",
                                accessor: "category",
                                Cell: this.renderEditable,
                                style: { textAlign: "center" }
                             },{
                                Header: "Created Date",
                                accessor: "createddate",
                                Cell: this.renderEditable,
                                style: { textAlign: "center" }
                             },{
                                Header: "Description",
                                accessor: "description",
                                Cell: this.renderEditable,
                                style: { textAlign: "center" }
                             },{
                                Header: "Created By",
                                accessor: "createdby",
                                Cell: this.renderEditable,
                                style: { textAlign: "center" }
                             },{
                                Header: "Form",
                                accessor: "form",
                                Cell: this.renderEditable,
                                style: { textAlign: "center" }
                             },{
                                Header: "Developer",
                                accessor: "developer",
                                Cell: this.renderEditable,
                                style: { textAlign: "center" }
                             },{
                                Header: "Status",
                                accessor: "status",
                                Cell: this.renderEditable,
                                style: { textAlign: "center" }
                             }
                            ]}
                            defaultPageSize={10}
                            getTrProps={(state, rowInfo, column) => {
                                if (rowInfo && rowInfo.row) {
                                    return{
                                        onClick:e=>{
                                            console.log("here");
                                            console.log(rowInfo.row);
                                            console.log("here");
                                            if(rowInfo.index != this.state.rowEdit){
                                                this.setState({
                                                    rowEdit:rowInfo.index,
                                                    rowData:rowInfo.row._original
                                                });
                                            }else{
                                                this.setState({
                                                    rowEdit:null
                                                })
                                            }
                                        },style: {
                                            background: rowInfo.index === this.state.rowEdit ? "#D2F2B5" :"white",
                                           
                                          }
                                    }
                                }else{
                                    return{

                                    }
                                }
                                
                            }}
                       />
                    </div>
               
            </div>
            <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    
                    contentLabel="Create New Modal"
            >
            
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ModalDetailsLabel">Create New Modal</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="modalId" className="col-form-label">Modal ID:</label>
                                <input type="text" className="form-control" id="modalId" 
                                onChange={(e)=>{
                                    e.preventDefault();
                                    const obj = this.state.modalToSave;
                                    obj.id = e.target.value
                                    this.setState({modalToSave:obj});
                                    }}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="modalname" className="col-form-label">Name:</label>
                                <input type="text" className="form-control" id="modalname" 
                                 onChange={(e)=>{
                                    e.preventDefault();
                                    const obj = this.state.modalToSave;
                                    obj.name = e.target.value
                                    this.setState({modalToSave:obj});
                                    }}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="modalform" className="col-form-label">Form:</label>
                                <input type="text" className="form-control" id="modalform"
                                 onChange={(e)=>{
                                    e.preventDefault();
                                    const obj = this.state.modalToSave;
                                    obj.form = e.target.value
                                    this.setState({modalToSave:obj});
                                    }}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="modaldeveloper" className="col-form-label">Developer:</label>
                                <input type="text" className="form-control" id="modaldeveloper" 
                                 onChange={(e)=>{
                                    e.preventDefault();
                                    const obj = this.state.modalToSave;
                                    obj.developer = e.target.value
                                    this.setState({modalToSave:obj});
                                    }}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="modalstatus" className="col-form-label">Status:</label>
                                <input type="text" className="form-control" id="modalstatus" 
                                 onChange={(e)=>{
                                    e.preventDefault();
                                    const obj = this.state.modalToSave;
                                    obj.status = e.target.value
                                    this.setState({modalToSave:obj});
                                    }}/>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={this.createModal}>Create</button>
                    </div>
                </div>
                </div>
        </Modal>
        <Modal
                    isOpen={this.state.isDeleteModelOpen}
                    onRequestClose={this.cancelDelete}
                    style={customStyles}
                    contentLabel="Delete Modal"
            >
                <div className="modal-dialog" role="document">
            <div className="modal-content">
            
            <div className="modal-header">
                            <h5 className="modal-title" id="ModalDetailsLabel">Confirm Delete</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
            
                <div className="modal-body">
                    <p>You are about to delete one track, this procedure is irreversible.</p>
                    <p>Do you want to proceed?</p>
                    <p className="debug-url"></p>
                </div>
                
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" onClick={this.cancelDelete}>Cancel</button>
                    <a className="btn btn-danger btn-ok" onClick={this.confirmDelete}>Delete</a>
                </div>
            </div>
        </div>
            </Modal>
        </div>
        );
    }
}

export default DataTable;