import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {red500} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';

class NavCompoment extends Component {
  constructor(props){
    super(props);
    console.log(props);
    this.state = {...props};
  }
  handleSignOut(){
    localStorage.removeItem("case_email");
    localStorage.removeItem("case_token");
    location.reload();
  }
  handlevSpace(){
    localStorage.removeItem("project_sid");
    localStorage.removeItem("currectPage");
    location.reload();
  }
  render(){
    const style = {
      title: {
        fontSize:14,
        color:'#ffffff'
      },
      toolbar: {
        backgroundColor: 'rgb(0, 188, 212)',
        color: '#ffffff',
      },
      search: {color:'#FFFFFF'},
      toolbarGroup: {
        width: '33%'
      },
      toolbarGroupCenter: {
        width: '33%',
        display:'block', textAlign:'center', color:'#FFFFFF'
      }
    }
    var avatar = <Avatar style={{'marginTop':'8px'}} src={this.props.info.pic_full} />;
    if(window.innerWidth<376){
      avatar = <span></span>
    }
    return(
      <Toolbar style={style.toolbar}>
        <ToolbarGroup style={style.toolbarGroup}>
          <TextField inputStyle={style.search} hintStyle={style.search}
            hintText="Search"
          />
        </ToolbarGroup>
        <ToolbarGroup style={style.toolbarGroupCenter}>
          <ToolbarTitle onClick={this.handlevSpace} style={{'cursor':'pointer','color':'#FFFFFF'}} text="vSpace">
          </ToolbarTitle>
        </ToolbarGroup>
        <ToolbarGroup style={{'display':'inline','width':'33%','textAlign':'right'}}>
          <ToolbarTitle style={style.title} text="">
          </ToolbarTitle>
          {avatar}
          <IconMenu color={red500}
            iconButtonElement={
              <IconButton iconStyle={{color:"#FFFFFF"}} touch={true}>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText="More Info" />
            <MenuItem primaryText="Sign Out" onClick={this.handleSignOut} />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    )
  }
}
export default NavCompoment;
