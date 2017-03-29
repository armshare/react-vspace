import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Url from '../config/url';
import get from '../config/Get';
import Put from '../config/Put';
import InfoGen from '../config/InfoGen';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import NavCompoment from '../nav/NavCompoment';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';

import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
class ProjectCreate extends Component {
  constructor(props){
    super(props);

    const minDate = new Date();
    const maxDate = new Date();
    minDate.setFullYear(minDate.getFullYear());
    minDate.setHours(0, 0, 0, 0);
    maxDate.setFullYear(maxDate.getFullYear());
    maxDate.setHours(0, 0, 0, 0);

    this.state = {
      projectParse: 'Pre Sale',
      contract_no_filter:'',
      contract_no:'',
      project_name:'',
      enduser_name:'',
      enduser_address:'',
      iHaveContract:false,
      finished: false,
      stepIndex: 0,
      minDate: minDate,
      maxDate: maxDate,
      autoOk: false,
      disableYearSelection: false,
      contract_no_list:[]
    };
  }
  handleChangeMinDate = (event, date) => {
    this.setState({
      minDate: date,
    });
  };

  handleChangeMaxDate = (event, date) => {
    if(date<this.state.minDate){
      alert('Invalid Date');
    }else{
      this.setState({
        maxDate: date,
      });
    }
    console.log(this.state);
  };

  handleNext = () => {
    const {stepIndex} = this.state;

    if((stepIndex+1)>1){
      if(this.state.project_name !== '' && this.state.enduser_name !== ''){
        this.setState({
          stepIndex: stepIndex + 1,
          finished: stepIndex >= 3,
        });
      }
    }else{
      this.setState({
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 3,
      });
    }
    if(this.state.finished){
      console.log('finished');
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  handleProjectParse = (e) => {
    this.setState({projectParse:e.target.value});
    this.setState({contract_no:''});
    this.setState({project_name:''});
    this.setState({enduser_name:''});
    this.setState({enduser_address:''});
    if(e.target.value==='None Contract'){
      this.setState({contract_no:'None Contract'});
    }
  }
  handleProjectName = (e) => {
    this.setState({project_name:e.target.value});
  }
  handleCustomerCompany = (e) => {
    this.setState({enduser_name:e.target.value});
  }
  handleContractNo = (e) => {
    this.setState({contract_no_filter:e.target.value});
  }
  handleFindContract = () => {
    var formData = new FormData();
    formData.append('email', InfoGen.email);
    formData.append('token', InfoGen.token);
    formData.append('contract', this.state.contract_no_filter);
    var that = this;
    get(Url.findContractInfo, formData).then(function(res){
      if(!res.error){
        that.setState({contract_no_list:res.data});
      }
    });
  }
  handleSelectProject = (e) => {
    this.setState({contract_no:e.currentTarget.dataset.id});
    this.setState({project_name:e.currentTarget.dataset.projectname});
    this.setState({enduser_name:e.currentTarget.dataset.endusername});
    this.setState({enduser_address:e.currentTarget.dataset.enduseraddress});
  }
  handleClearContract = (e) => {
    this.setState({contract_no:''});
    this.setState({project_name:''});
    this.setState({enduser_name:''});
    this.setState({enduser_address:''});
  }
  handleCreateNewProject = () => {
    var confirmCreateProject = {
      start:(this.state.minDate.getFullYear()+"-"+(this.state.minDate.getMonth()+1)+"-"+this.state.minDate.getDate()),
      end: (this.state.maxDate.getFullYear()+"-"+(this.state.maxDate.getMonth()+1)+"-"+this.state.maxDate.getDate()),
      project_status: this.state.projectParse,
      contract_no: this.state.contract_no,
      contract_info: {
        project_name: this.state.project_name,
        end_user_name: this.state.enduser_name,
        end_user_address: this.state.enduser_address,
      },
      engineer:[
        {man_day:0,email:InfoGen.email}
      ],
      man_day: '0',
      man_hour: '0',
    }

    console.log(confirmCreateProject);
    var formData = new FormData();
    formData.append('email', InfoGen.email);
    formData.append('token',InfoGen.token);
    formData.append('data',JSON.stringify(confirmCreateProject));
    Put(Url.projectCreate, formData).then(function(res){
        console.log(res);
        localStorage.removeItem('currectPage');
        location.reload();
    });
  }
  handleIHaveContract = () => {
    if(this.state.iHaveContract){
      this.setState({'iHaveContract':false});
    }else{
      this.setState({'iHaveContract':true});
    }
  }
  renderStepActions(step) {
    const {stepIndex} = this.state;

    var nextOrFinish;
    if(stepIndex===3){
      nextOrFinish = <RaisedButton
        label={'Finish'}
        disableTouchRipple={true}
        disableFocusRipple={true}
        primary={true}
        onTouchTap={this.handleCreateNewProject}
        style={{marginRight: 12}}
      />
    }else{
      nextOrFinish = <RaisedButton
        label={'Next'}
        disableTouchRipple={true}
        disableFocusRipple={true}
        primary={true}
        onTouchTap={this.handleNext}
        style={{marginRight: 12}}
      />
    }

    return (
      <div style={{margin: '12px 0'}}>
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev}
          />
        )}
        {nextOrFinish}
      </div>
    );
  }

  render(){
    var styles = {
      padding : {
        padding: '50px',
        maxWidth:680,
        margin: 'auto',
        marginTop: '20px'
      },
      block: {
        maxWidth: 250,
      },
      radioButton: {
        marginBottom: 16,
      },
    }
    var contract_no_list = this.state.contract_no_list.map((item,k) => (
      <List key={k}>
        <ListItem onClick={this.handleSelectProject} data-id={item.CONTRACT_NO} data-projectname={item.PROJECT_NAME} data-endusername={item.ENDUSER_NAME} data-enduseraddress={item.ENDUSER_ADDRESS}
          primaryText={item.CONTRACT_NO}
          secondaryText={
            <div>
              <div>{item.PROJECT_NAME}</div>
              <div style={{color: darkBlack}}>{item.ENDUSER_NAME}</div>
              <div>{item.ENDUSER_ADDRESS}</div>
            </div>
          }
          secondaryTextLines={2}
        />
      </List>
    ));
    var selectedContractNo;
    var findContractForm;

      selectedContractNo =
          <div>
            <div>{this.state.contract_no}</div>
            <div>{this.state.project_name}</div>
            <div>{this.state.enduser_name}</div>
            <div>{this.state.enduser_address}</div>
            <div style={{textAlign:'right'}}>
              <RaisedButton
                label={"Clear"}
                disableTouchRipple={true}
                disableFocusRipple={true}
                style={{margin: 5}}
                onClick={this.handleClearContract}
              />
            </div>
          </div>;

      findContractForm =
          <div>
            <TextField hintText="Contract No" value={this.state.contract_no_filter} onChange={this.handleContractNo} floatingLabelText="Contract No"/>
            <RaisedButton
              label={"Find"}
              disableTouchRipple={true}
              disableFocusRipple={true}
              backgroundColor="#a4c639" labelColor="#FFFFFF"
              style={{marginRight: 12}}
              onClick={this.handleFindContract}
            />
            <br />
            <div>{contract_no_list}</div>
          </div>;


    if(!this.state.iHaveContract){
      var formPreSale =
        <div>
          <div><TextField hintText="Project Name" value={this.state.project_name} onChange={this.handleProjectName} floatingLabelText="Project Name"/><br /></div>
          <div><TextField hintText="Enduser Company" value={this.state.enduser_name} onChange={this.handleCustomerCompany} floatingLabelText="Enduser Company"/><br /></div>
          <div style={{color: darkBlack}}>กรอกข้อมูล Project Name และ Enduser Company<br/>เราจะสร้าง Dummy Contract ให้</div>
          <br/>
          <div><FlatButton onClick={this.handleIHaveContract} label="ไม่, ฉันมี Contract No แล้ว" secondary={true} /></div>
        </div>;
    }else{
      if(this.state.contract_no && this.state.project_name){
        var formPreSale = selectedContractNo;
      }else{
        var formPreSale = findContractForm;
      }
    }

    if(this.state.contract_no && this.state.project_name){
      var formPostSale = selectedContractNo
    }else{
      var formPostSale = findContractForm
    }

    var formNoneContract = <div>
      <div><TextField hintText="Project Name" value={this.state.project_name} onChange={this.handleProjectName} floatingLabelText="Project Name"/><br /></div>
      <div><TextField hintText="Enduser Company" value={this.state.enduser_name} onChange={this.handleCustomerCompany} floatingLabelText="Enduser Company"/><br /></div>
      <br/>
    </div>;


    var formProjectInformation;
    if(this.state.projectParse==="Pre Sale"){
      formProjectInformation = formPreSale;
    }else if(this.state.projectParse==="None Contract"){
      formProjectInformation = formNoneContract;
    }else {
      formProjectInformation = formPostSale;
    }
    const {finished, stepIndex} = this.state;
    var displayContractNo = (this.state.contract_no)?this.state.contract_no:'-';
    var stepCreateProject =
      <div style={{maxWidth: 580, margin: 'auto'}}>
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel>Select Project Type</StepLabel>
            <StepContent>
                  <RadioButtonGroup name="shipSpeed" onChange={this.handleProjectParse} defaultSelected={this.state.projectParse}>
                    <RadioButton
                      value="Pre Sale"
                      label="Pre-Sale"
                      style={styles.radioButton}
                    />
                    <RadioButton
                      value="Post Sale"
                      label="Post-Sale"
                      style={styles.radioButton}
                    />
                    <RadioButton
                      value="None Contract"
                      label="None Contract"
                      style={styles.radioButton}
                    />
                  </RadioButtonGroup>
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Project Information</StepLabel>
            <StepContent>
              <div>
                {formProjectInformation}
              </div>
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Period Project</StepLabel>
            <StepContent>
              <div>
                  <DatePicker
                    onChange={this.handleChangeMinDate}
                    autoOk={this.state.autoOk}
                    floatingLabelText="Start Date"
                    defaultDate={this.state.minDate}
                    disableYearSelection={this.state.disableYearSelection}
                  />
                  <DatePicker
                    value={this.state.maxDate}
                    onChange={this.handleChangeMaxDate}
                    autoOk={this.state.autoOk}
                    floatingLabelText="Expect End Date"
                    defaultDate={this.state.maxDate}
                    disableYearSelection={this.state.disableYearSelection}
                  />
              </div>
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Confirmation</StepLabel>
            <StepContent>
              <div>
                <div>Project Type: {this.state.projectParse}</div>
                <div>Contract No: {displayContractNo}</div>
                <div>Project Name: {this.state.project_name}</div>
                <div>Enduser Name: {this.state.enduser_name}</div>
                <div>Enduser Address: {this.state.enduser_address}</div>
                <div>
                  <span>Period: </span> <span>{this.state.minDate.getFullYear()}-{(this.state.minDate.getMonth()+1)}-{this.state.minDate.getDate()}</span> <span>To</span> <span>{this.state.maxDate.getFullYear()}-{(this.state.maxDate.getMonth()+1)}-{this.state.maxDate.getDate()}</span>
                </div>
              </div>
              {this.renderStepActions(3)}
            </StepContent>
          </Step>
        </Stepper>
      </div>
      var formCreate =
        <Card style={styles.padding}>
          <div>
              <CardHeader
              title="Create a new Project"
              subtitle="คุณกำลังสร้างโปรเจคใหม่"
            />
            <CardText>
              <div>
                {stepCreateProject}
              </div>
            </CardText>
          </div>
        </Card>

    return(
      <MuiThemeProvider>
        <div>
          <div>
            <NavCompoment info={this.props.info} />
          </div>
          <div>
            {formCreate}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default ProjectCreate;
