import React, { Component } from 'react';
import { GeoSearchControl, GoogleProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/assets/css/leaflet.css';
import 'leaflet/dist/leaflet.css';
import { Header, Icon, Container, Grid, Menu, Dimmer, Button, Segment, Item, Table, Modal, Form, Select } from 'semantic-ui-react';
import TimeRange from 'react-time-range';
import moment from 'moment';
import api from '../../../server/lib/api';


import CsoListView from './CsoListView';

const L = require('leaflet');
const Pointer = require('../../assets/pointer.png');

const provider = new GoogleProvider({
  region: 'ug',
  params: {
    key: 'AIzaSyCGy8oKABLzT1zJluhQnvSTZAm2uuXb08k',
  },
});
var PointerIcon = L.icon({
	iconUrl: Pointer,
	iconSize:     [50, 50], // size of the icon
	iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

const searchControl = new GeoSearchControl({
	provider: provider,
	showMarker: true,
	style:'bar',
	marker: {                                           // optional: L.Marker    - default L.Icon.Default
		icon: PointerIcon,
		draggable: true,
	},
	showPopup: false, 
	popupFormat: ({ query, result }) => result.label,   // optional: function    - default returns result label
	maxMarkers: 1,                                      // optional: number      - default 1
	retainZoomLevel: false,                             // optional: true|false  - default false
	animateZoom: true,                                  // optional: true|false  - default true
	autoClose: true,                                   // optional: true|false  - default false
	searchLabel: 'Enter address',                       // optional: string      - default 'Enter address'
	keepResult: true
});

class InnerControlMap extends Component {
	constructor(props){
		super(props);
		this.state = {

		}
	}
	pointArea(data){

	}
	renderMap(){
	 
		var map;
		map = new L.Map('innerMap');
		//  L.tileLayer( style + '/{z}/{x}/{y}' + scalex + '.png'
			 var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
			 var osmAttrib = 'Weyonjje';
			 var osm = new L.TileLayer(osmUrl, {
					minZoom: 7,
				 //maxZoom: 7,
			 zoomControl:false, attribution: osmAttrib});
			 map.setView(new L.LatLng(0.30809999999999965, 32.59680000000029), 14);
			 map.addLayer(osm);
			 map.addControl(searchControl);
			 map.on('geosearch/showlocation', function(e) {
				//$("#lat").val(e.location.y);
				//$("#lng").val(e.location.x);
				var address = document.getElementById('address');
				//selectedLocation
				var desiredTitle = document.querySelector('.selectedLocation');
			 // console.log(e);
				address.value=e.location.label;
				address.setAttribute('long',e.location.x);
				address.setAttribute('lat',e.location.y);
				desiredTitle.innerHTML="You have Selected <b>"+e.location.label+'</b>';
			});
			map.on('geosearch/marker/dragend', function(e) {
				//$("#lat").val(e.location.y);
				//$("#lng").val(e.location.x);
			//	console.log(e)
				var address = document.getElementById('address');
				console.log(e);
			  //address.value=e.location.label;
				address.setAttribute('long',e.location.lng);
				address.setAttribute('lat',e.location.lat);

				});
				

	}
	componentDidMount(){
		this.renderMap();
	}
	render(){
		return(
			<div className="col-md-12 innerMap" style={{height:"430px", marginBottom:"50px"}} id="innerMap"></div>
		);
	}
}

class CsoView extends Component {
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.close = this.close.bind(this);
		this.state = {
		status: '',
		modalOpen:false,
		modalOpen2:false,
		viewListMode: true,
		closeOnEscape:true,
		closeOnDimmerClick:true,
		startTime:"",
		endTime:"",
		csoData: [
       
    ]
	};
}

/* csos */
open(){this.setState({ modalOpen: true, modalOpen2: false })}
open2(){this.setState({ modalOpen: false, modalOpen2: true })}
close(){this.setState({ modalOpen: false, modalOpen2: false })}
handleClick(){

}
_loadData(){
	const thisApp = this;
	api.post("/cso/all", {}, function(err, data){
		if(err){ 
		console.log("err", err)
		}
		else{
			console.log("csos", data);
			thisApp.setState({
				csoData:data.csos.reverse(),
				modalOpen:false
			})
		}
	});
	
}
returnFunction(e){
	console.log(e)
}
componentDidMount(){
	//console.log(this.state);
	this._loadData();
}
_promptEdit(e, id){
	console.log(id);
	this.open2();
}

render(){
	const { status, csoData } = this.state;


	

  return(

	  
  	<Grid padded floated='right' stackable doubling mobile={16} largeScreen={16} widescreen={16} tablet={16}>
	  <Grid.Column>
		<Menu secondary>
							        <Menu.Menu>
							        
							          <Menu.Item>
							            <Button as='a' animated='fade' color='teal' fluid type='button' onClick={()=>this.open()} size='small'>
							              <Button.Content visible>Add CSO </Button.Content>
							              <Button.Content hidden>Add CSO </Button.Content>
							            </Button>
							          </Menu.Item>
							        </Menu.Menu>
						      </Menu>
	</Grid.Column>
	<Modal
          open={this.state.modalOpen}
          closeOnEscape={this.state.closeOnEscape}
          closeOnDimmerClick={this.state.closeOnDimmerClick}
          onClose={()=>this.close()}
        >
          <Modal.Header>Add a CSO</Modal.Header>
          <Modal.Content>
						<AddCsoForm reload={()=>this._loadData()}/>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} default>
              CANCEL
            </Button>
            <Button
              primary
              content='Close'
            />
          </Modal.Actions>
        </Modal>
			
				<Modal
          open={this.state.modalOpen2}
          closeOnEscape={this.state.closeOnEscape}
          closeOnDimmerClick={this.state.closeOnDimmerClick}
          onClose={()=>this.close()}
        >
          <Modal.Header>Update a CSO</Modal.Header>
          <Modal.Content>
						<EditCsoForm reload={()=>this._loadData()}/>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} default>
              CANCEL
            </Button>
            <Button
              primary
              content='Close'
            />
          </Modal.Actions>
        </Modal>


			<CsoListView edit={(e, id)=>this._promptEdit(e, id)} data={csoData} listVersion={status}/>
	</Grid>

  	)
  }
}

class AddCsoForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			cso_name:null,
			cso_email:null,
			cso_location:null,
			cso_longitude:null,
			cso_latitude:null,
			cso_working_hours:null,
			cso_phone_number:null,
			active:false
		};
		this._handleChange = this._handleChange.bind(this);
	}
	componentDidMount(){

	}

	_handleChange(event){
			const target = event.target;
			const value = target.type === 'checkbox' ? target.checked : target.value;
			const name = target.name;
			this.setState({[name]: value});
	}
	_submit(e){
		e.preventDefault();
		this.handleShow();
		const thisApp = this;
		var address = document.getElementById('address');
		this.setState({
			cso_location:address.value,
			cso_longitude:address.getAttribute('long'),
			cso_latitude:address.getAttribute('lat'),
		}, function(){
			let formData = thisApp.state
		api.post("/cso/add", formData, function(err, data){
			err ? 
			console.log("err", err)
			:
			console.log("cso", data);
			setTimeout(function(){
				thisApp.handleHide();
				thisApp.props.reload()
			}, 2000);
		});

		})
		


}
handleShow (){ 
	this.setState({ active: true })
}
handleHide (){
	this.setState({ active: false })
	}
	render(){
		return(
			<Form onSubmit={(e)=>this._submit(e)}>
			<Grid columns={2} divided>
				<Grid.Row>
				<Grid.Column>
				<Dimmer.Dimmable as={Segment} dimmed={this.state.active}>
				<Form.Field>
				<label>CSO Name</label>
				<input  required type="text" onChange={this._handleChange} value={this.state.cso_name} name="cso_name" placeholder='Fullname' />
				</Form.Field>
				<Form.Field>
				<label>Email</label>
				<input type ="email" onChange={this._handleChange} value={this.state.cso_email} name="cso_email" placeholder='Email address' />
				</Form.Field>
				<Form.Field>
				<label>Working hours</label>
				<input type="text" onChange={this._handleChange} value={this.state.cso_working_hours} name="cso_working_hours" placeholder='10 AM - 5 PM' />
				</Form.Field>
				<Form.Field>
				<label>Phone number</label>
				<input type="text" placeholder='+25670...' onChange={this._handleChange} value={this.state.cso_phone_number} name="cso_phone_number" />
				</Form.Field>
				<Form.Field>
				<label>Location</label>
				<input type="text" id="address" placeholder='' onChange={this._handleChange} value={this.state.cso_location} name="cso_location" />
				</Form.Field>
				
				<Button labelPosition='right'
					icon='checkmark'  
					positive  content="Submit"/>

					<Dimmer active={this.state.active} onClickOutside={this.handleHide}>
            <Header as='h2' icon inverted>
              <Icon name='sync' />
              Submitting Data
            </Header>
          </Dimmer>
        </Dimmer.Dimmable>
					</Grid.Column>
					<Grid.Column>
					<Form.Field>
				<label>Select CSO Location on the map</label>
				</Form.Field>
						<InnerControlMap/>
						<p className="selectedLocation"></p>
					</Grid.Column>
					</Grid.Row>
					</Grid>
			</Form>
		)
	}
}

class EditCsoForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			cso_name:null,
			cso_email:null,
			cso_location:null,
			cso_longitude:null,
			cso_latitude:null,
			cso_working_hours:null,
			cso_phone_number:null,
			active:false
		};
		this._handleChange = this._handleChange.bind(this);
	}
	componentDidMount(){

	}

	_handleChange(event){
			const target = event.target;
			const value = target.type === 'checkbox' ? target.checked : target.value;
			const name = target.name;
			this.setState({[name]: value});
	}
	_submit(e){
		e.preventDefault();
		this.handleShow();
		const thisApp = this;
		var address = document.getElementById('address');
		this.setState({
			cso_location:address.value,
			cso_longitude:address.getAttribute('long'),
			cso_latitude:address.getAttribute('lat'),
		}, function(){
			let formData = thisApp.state
		api.post("/cso/add", formData, function(err, data){
			err ? 
			console.log("err", err)
			:
			console.log("cso", data);
			setTimeout(function(){
				thisApp.handleHide();
				thisApp.props.reload()
			}, 2000);
		});

		})
		


}
handleShow (){ 
	this.setState({ active: true })
}
handleHide (){
	this.setState({ active: false })
	}
	render(){
		return(
			<Form onSubmit={(e)=>this._submit(e)}>
			<Grid columns={2} divided>
				<Grid.Row>
				<Grid.Column>
				<Dimmer.Dimmable as={Segment} dimmed={this.state.active}>
				<Form.Field>
				<label>CSO Name</label>
				<input  required type="text" onChange={this._handleChange} value={this.state.cso_name} name="cso_name" placeholder='Fullname' />
				</Form.Field>
				<Form.Field>
				<label>Email</label>
				<input type ="email" onChange={this._handleChange} value={this.state.cso_email} name="cso_email" placeholder='Email address' />
				</Form.Field>
				<Form.Field>
				<label>Working hours</label>
				<input type="text" onChange={this._handleChange} value={this.state.cso_working_hours} name="cso_working_hours" placeholder='10 AM - 5 PM' />
				</Form.Field>
				<Form.Field>
				<label>Phone number</label>
				<input type="text" placeholder='+25670...' onChange={this._handleChange} value={this.state.cso_phone_number} name="cso_phone_number" />
				</Form.Field>
				<Form.Field>
				<label>Location</label>
				<input type="text" id="address" placeholder='' onChange={this._handleChange} value={this.state.cso_location} name="cso_location" />
				</Form.Field>
				
				<Button labelPosition='right'
					icon='checkmark'  
					positive  content="Submit"/>

					<Dimmer active={this.state.active} onClickOutside={this.handleHide}>
            <Header as='h2' icon inverted>
              <Icon name='sync' />
              Submitting Data
            </Header>
          </Dimmer>
        </Dimmer.Dimmable>
					</Grid.Column>
					<Grid.Column>
					<Form.Field>
				<label>Select CSO Location on the map</label>
				</Form.Field>
						<InnerControlMap/>
						<p className="selectedLocation"></p>
					</Grid.Column>
					</Grid.Row>
					</Grid>
			</Form>
		)
	}
}

export default CsoView
