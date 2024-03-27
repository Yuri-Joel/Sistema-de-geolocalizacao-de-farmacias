import React from 'react'
 import H from './pngeg.png'
import A1 from './client-1.png'
import A2 from './client-2.png'
import A3 from './client-3.png'
import A4 from './client-4.png'
import A5 from './client-5.png'
import A6 from './client-6.png'
import A7 from './client-7.png'
import A8 from './client-8.png'
import { ContarUser } from "../Components/Contagem"
import { CountFarmacias } from "../Components/Contagem"
import k from '../../assets/Geo Farma/Geo Farma.png'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/offcanvas';
import 'bootstrap/js/dist/scrollspy';
import 'bootstrap/js/dist/tab'
import '../../home.css' 
import { Link}  from 'react-router-dom'
function Hom() {
  return (
    <>
   
        <Link>ola</Link>
           <header id="heade" className="fixed-top ">
              <div className="container-fluid">
                  <div className="row justify-content-center">
                      <div className="col-xl-9 d-flex align-items-center justify-content-lg-between">
                          <a href="index.html" className="logo d-flex align-items-center">
                              <img src={k} alt="eee" />
                              <span className="d-none d-lg-block" style={{ color: 'white' }}>GeoFarma</span>
                          </a>
                          <nav id="navbar" className="navbar order-last order-lg-0">
                              <ul>
                                  <li><a className="nav-link scrollto active" href="#hero">Home</a></li>
                                  <li><a className="nav-link scrollto" href="#about">Sobre</a></li>
                                  <li><a className="nav-link scrollto" href="#services">Fármacias</a></li>
                                  <li><a className="nav-link scrollto" href="#pricing">Produtos</a></li>
                                  <li><a className="nav-link scrollto" href="#contact">Contactos</a></li>
                              </ul>
                              <i className="bi bi-list mobile-nav-toggle"></i>
                          </nav>
                 
                          <a to={'/login'} className="btn" style={{ listStyle: 'none', backgroundColor: '#00968c', width: '6.5rem', height: '2.3rem', color: 'white', textAlign: 'center' }}>Login</a>
                      </div>
                  </div>

              </div>
          </header>
          <section id="hero" className="d-flex flex-column justify-content-center">
              <div className="container">
                  <div className="row justify-content-center">
                      <div className="col-xl-8">
                          <h1>GeoFarma Poupe o seu tempo Facilite a sua vida</h1>
                          <h2>oferecemos confiaça e seguraça aos nossos clientes </h2>
                          <a className='btn btn-primary' style={{backgroundColor:'#00968c'}}> Localizar</a>
                      </div>
                  </div>
              </div>
          </section>

          <main>
              <section id="about" className="about">
                  <div className="container">

                      <div className="section-title">
                          <h2>Sobre</h2>
                          <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                      </div>

                      <div className="row content">
                          <div className="col-lg-6">
                              <p>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                  magna aliqua.
                              </p>
                              <ul>
                                  <li><i className="ri-check-double-line"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat</li>
                                  <li><i className="ri-check-double-line"></i> Duis aute irure dolor in reprehenderit in voluptate velit</li>
                                  <li><i className="ri-check-double-line"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat</li>
                              </ul>
                          </div>
                          <div className="col-lg-6 pt-4 pt-lg-0">
                              <p>
                                  Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                  culpa qui officia deserunt mollit anim id est laborum.
                              </p>
                              <a href="#" className="btn-learn-more">Learn More</a>
                          </div>
                      </div>

                  </div>
              </section>
           <section id="services" className="services">
                  <div className="container">

                      <div className="section-title">
                          <h2>Fámacias</h2>
                          <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                      </div>

                      <div className="row">
                          <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
                              <div className="icon-box">
                                  <div className="icon"><i className="bx bxl-dribbble"></i></div>
                                  <h4><a href="">Lorem Ipsum</a></h4>
                                  <p>Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi</p>
                              </div>
                          </div>

                          <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
                              <div className="icon-box">
                                  <div className="icon"><i className="bx bx-file"></i></div>
                                  <h4><a href="">Sed ut perspiciatis</a></h4>
                                  <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
                              </div>
                          </div>

                          <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
                              <div className="icon-box">
                                  <div className="icon"><i className="bx bx-tachometer"></i></div>
                                  <h4><a href="">Magni Dolores</a></h4>
                                  <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia</p>
                              </div>
                          </div>

                          <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
                              <div className="icon-box">
                                  <div className="icon"><i className="bx bx-world"></i></div>
                                  <h4><a href="">Nemo Enim</a></h4>
                                  <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis</p>
                              </div>
                          </div>

                          <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
                              <div className="icon-box">
                                  <div className="icon"><i className="bx bx-slideshow"></i></div>
                                  <h4><a href="">Dele cardo</a></h4>
                                  <p>Quis consequatur saepe eligendi voluptatem consequatur dolor consequuntur</p>
                              </div>
                          </div>
                          <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
                              <div className="icon-box">
                                  <div className="icon"><i className="bx bx-arch"></i></div>
                                  <h4><a href="">Divera don</a></h4>
                                  <p>Modi nostrum vel laborum. Porro fugit error sit minus sapiente sit aspernatur</p>
                              </div>
                          </div>

                      </div>

                  </div>
              </section>
              
              <section id="cta" className="cta">
                  <div className="container">
                      <div className="row">
                          <div className="col-lg-9 text-center text-lg-start">
                              <h3>Call To Action</h3>
                              <p> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                          </div>
                          <div className="col-lg-3 cta-btn-container text-center">
                              <a className="cta-btn align-middle" href="#">Call To Action</a>
                          </div>
                      </div>

                  </div>
              </section>
              <section id="features" className="features">
                  <div className="container">
                      <div className="row">
                          <div className="col-lg-6 order-2 order-lg-1">
                              <div className="icon-box mt-5 mt-lg-0">
                                  <i className="bx bx-receipt"></i>
                                  <h4>Est labore ad</h4>
                                  <p>Consequuntur sunt aut quasi enim aliquam quae harum pariatur laboris nisi ut aliquip</p>
                              </div>
                              <div className="icon-box mt-5">
                                  <i className="bx bx-cube-alt"></i>
                                  <h4>Harum esse qui</h4>
                                  <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt</p>
                              </div>
                              <div className="icon-box mt-5">
                                  <i className="bx bx-images"></i>
                                  <h4>Aut occaecati</h4>
                                  <p>Aut suscipit aut cum nemo deleniti aut omnis. Doloribus ut maiores omnis facere</p>
                              </div>
                              <div className="icon-box mt-5">
                                  <i className="bx bx-shield"></i>
                                  <h4>Beatae veritatis</h4>
                                  <p>Expedita veritatis consequuntur nihil tempore laudantium vitae denat pacta</p>
                              </div>
                          </div>
                          <div className="image col-lg-6 order-1 order-lg-2" style={{ backgroundImage:`url(${H})`}}></div>
                      </div>

                  </div>
              </section>
              
              <section id="clients" className="clients">
                  <div className="container">

                      <div className="row no-gutters clients-wrap clearfix wow fadeInUp">

                          <div className="col-lg-3 col-md-4 col-xs-6">
                              <div className="client-logo">
                                  <img src={A1} className="img-fluid" alt=""/>
                              </div>
                          </div>

                          <div className="col-lg-3 col-md-4 col-xs-6">
                              <div className="client-logo">
                                  <img src={A2} className="img-fluid" alt=""/>
                              </div>
                          </div>

                          <div className="col-lg-3 col-md-4 col-xs-6">
                              <div className="client-logo">
                                  <img src={A3} className="img-fluid" alt=""/>
                              </div>
                          </div>

                          <div className="col-lg-3 col-md-4 col-xs-6">
                              <div className="client-logo">
                                  <img src={A4} className="img-fluid" alt=""/>
                              </div>
                          </div>

                          <div className="col-lg-3 col-md-4 col-xs-6">
                              <div className="client-logo">
                                  <img src={A5} className="img-fluid" alt=""/>
                              </div>
                          </div>

                          <div className="col-lg-3 col-md-4 col-xs-6">
                              <div className="client-logo">
                                  <img src={A6} className="img-fluid" alt=""/>
                              </div>
                          </div>

                          <div className="col-lg-3 col-md-4 col-xs-6">
                              <div className="client-logo">
                                  <img src={A7} className="img-fluid" alt=""/>
                              </div>
                          </div>

                          <div className="col-lg-3 col-md-4 col-xs-6">
                              <div className="client-logo">
                                  <img src={A8}className="img-fluid" alt=""/>
                              </div>
                          </div>

                      </div>

                  </div>
              </section>
              
              <section id="pricing" className="pricing">
                  <div className="container">

                      <div className="section-title">
                          <h2>Produtos</h2>
                          <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                      </div>

                      <div className="row">

                          <div className="col-lg-4 col-md-6">
                              <div className="box">
                                  <h3>Free</h3>
                                  <h4><sup>$</sup>0<span> / month</span></h4>
                                  <ul>
                                      <li>Aida dere</li>
                                      <li>Nec feugiat nisl</li>
                                      <li>Nulla at volutpat dola</li>
                                      <li className="na">Pharetra massa</li>
                                      <li className="na">Massa ultricies mi</li>
                                  </ul>
                                  <div className="btn-wrap">
                                      <a href="#" className="btn-buy">Buy Now</a>
                                  </div>
                              </div>
                          </div>

                          <div className="col-lg-4 col-md-6 mt-4 mt-md-0">
                              <div className="box recommended">
                                  <span className="recommended-badge">Recommended</span>
                                  <h3>Business</h3>
                                  <h4><sup>$</sup>19<span> / month</span></h4>
                                  <ul>
                                      <li>Aida dere</li>
                                      <li>Nec feugiat nisl</li>
                                      <li>Nulla at volutpat dola</li>
                                      <li>Pharetra massa</li>
                                      <li className="na">Massa ultricies mi</li>
                                  </ul>
                                  <div className="btn-wrap">
                                      <a href="#" className="btn-buy">Buy Now</a>
                                  </div>
                              </div>
                          </div>

                          <div className="col-lg-4 col-md-6 mt-4 mt-lg-0">
                              <div className="box">
                                  <h3>Developer</h3>
                                  <h4><sup>$</sup>29<span> / month</span></h4>
                                  <ul>
                                      <li>Aida dere</li>
                                      <li>Nec feugiat nisl</li>
                                      <li>Nulla at volutpat dola</li>
                                      <li>Pharetra massa</li>
                                      <li>Massa ultricies mi</li>
                                  </ul>
                                  <div className="btn-wrap">
                                      <a href="#" className="btn-buy">Buy Now</a>
                                  </div>
                              </div>
                          </div>

                      </div>

                  </div>
                  
              </section>
          
              <section id="contact" className="contac">
                  <div className="container">

                      <div className="section-title">
                          <h2>Contactos</h2>
                          <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                      </div>
                  </div>

                  <div>
                      <iframe style={{border:'0',width:'100%',height:'350px'}} src={"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621"} frameborder="0" allowfullscreen></iframe>
                  </div>

                  <div className="container">
                      <div className="row mt-5">
                          <div className="col-lg-4">
                              <div className="info">
                                  <div className="address">
                                      <i className="ri-map-pin-line"></i>
                                      <h4>Location:</h4>
                                      <p>A108 Adam Street, New York, NY 535022</p>
                                  </div>

                                  <div className="email">
                                      <i className="ri-mail-line"></i>
                                      <h4>Email:</h4>
                                      <p>info@example.com</p>
                                  </div>

                                  <div className="phone">
                                      <i className="ri-phone-line"></i>
                                      <h4>Call:</h4>
                                      <p>+1 5589 55488 55s</p>
                                  </div>
                              </div>
                          </div>
                          <div className="col-lg-8 mt-5 mt-lg-0">
                              <form action="forms/contact.php" method="post" role="form" className="php-email-form">
                                  <div className="row">
                                      <div className="col-md-6 form-group">
                                          <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required/>
                                      </div>
                                      <div className="col-md-6 form-group mt-3 mt-md-0">
                                          <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required/>
                                      </div>
                                  </div>
                                  <div className="form-group mt-3">
                                      <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required/>
                                  </div>
                                  <div className="form-group mt-3">
                                      <textarea className="form-control" name="message" rows="5" placeholder="Message" required></textarea>
                                  </div>
                                  <div className="my-3">
                                      <div className="loading">Loading</div>
                                      <div className="error-message"></div>
                                      <div className="sent-message">Your message has been sent. Thank you!</div>
                                  </div>
                                  <div className="text-center"><button type="submit">Enviar Menssagem</button></div>
                              </form>

                          </div>

                      </div>
                  </div>
              </section>
          </main> 

           <footer id='foote'>
              <div className="container">
                  <h3>GeoFarma</h3>
                  <p>Et aut eum quis fuga eos sunt ipsa nihil. Labore corporis magni eligendi fuga maxime saepe commodi placeat.</p>
                  <div className="social-links">
                      <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
                      <a href="#" className="facebook"><i className="bx bxl-facebook"></i></a>
                      <a href="#" className="instagram"><i className="bx bxl-instagram"></i></a>
                      <a href="#" className="google-plus"><i className="bx bxl-skype"></i></a>
                      <a href="#" className="linkedin"><i className="bx bxl-linkedin"></i></a>
                  </div>
                  <div className="copyright">
                      &copy; Copyright <strong><span>GeoFarma</span></strong>. All Rights Reserved
                  </div>
                  <div className="credits">
                      Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                  </div>
              </div>
          </footer>

        

    </>
  )
}

export default Hom;
