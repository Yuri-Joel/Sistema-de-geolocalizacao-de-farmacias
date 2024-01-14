import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/offcanvas';
import 'bootstrap/js/dist/scrollspy';

export default function FooterDashboard() {
  return (
    <>
      <footer id="footer" className="footer" style={{backgroundColor:'#00968c'}}>
    <div className="copyright">
      &copy; Copyright <strong><span style={{color:'white'}}>GeoFarma</span></strong>. All Rights Reserved
    </div>
 
    </footer>
    </>
  )
}
