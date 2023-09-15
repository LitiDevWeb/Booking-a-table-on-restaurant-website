import '../App.css';
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import About from '../components/home/About'
import Specials from '../components/home/Specials'
import React from "react"


export default class Home extends React.Component {
  render() {
    return (
    <>
        <meta name="description" content="Little Lemon Restaurant Website"/>
        <meta name="og:title" content="Little Lemon Restaurant"/>
        <meta name="og:description" content="Classic Italian Fare With A Modern Twist"/>
        <meta name="og:image" content="https://upload.wikimedia.org/wikipedia/commons/e/e4/Lemon.jpg"/>
        <Header />
        <About />
        <Specials />
        <Footer />
    </>
    );
  }
}
