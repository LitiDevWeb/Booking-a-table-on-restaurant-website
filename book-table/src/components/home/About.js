import React from "react"
import restaurantFoodImg from '../../assets/restaurantFood.jpg'

export default class About extends React.Component {
    render() {
        return (
                <section name="About" id="about" className="app-about-us">
                    <div className="flex-row">
                        <div className="flex-column">
                            <span className="display-title">Little Lemon</span><br />
                            <span className="subtitle">Chicago</span><br />
                            <span className="lead-text">
                                We are a family owned
                            </span><br />
                            <span className="lead-text">
                                Mediterranean restaurant,
                            </span><br />
                            <span className="lead-text">
                                focused on traditional
                            </span><br />
                            <span className="lead-text">
                                recipies served with a modern
                            </span><br />
                            <span className="lead-text">
                                twist.
                            </span><br />
                            <a href="/bookings">
                                <button aria-label="On Click" className='app-button'>Reserve a table</button>
                            </a>
                        </div>
                        <div className="flex-column">
                            <img src={restaurantFoodImg} alt="Restaurant Food" width="420" height="415" className="hero-image"/>
                        </div>
                    </div>
                </section>
        )
    }
}