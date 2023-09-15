import React from "react"
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

export default class BookingConfirmation extends React.Component {
  render() {
    return (
    <>
      <Header />
        <span>Success! Your booking has been confirmed.</span>
      <Footer />
    </>
    );
  }
}
