import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

class NavigationBar extends React.Component{
    render(){
       return( <nav className="navbar navbar-expand-lg navbar-light bg-light">
       <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
           <span className="navbar-toggler-icon"></span>
       </button>
       <a className="navbar-brand " href="#">ModelImpPlatForm</a>

       <div className="collapse navbar-collapse" id="navbarToggler">
           <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
           <li className="nav-item active">
           <Link to={'/'} className="nav-link"><FontAwesomeIcon icon="home"><span style={{'font-family':'Titillium Web, sans-serif'}}>Home</span></FontAwesomeIcon> <span className="sr-only">(current)</span></Link>
           </li>
           
           </ul>
       </div>
   </nav>);
    }
}
export default NavigationBar;