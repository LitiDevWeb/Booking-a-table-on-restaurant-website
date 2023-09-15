import React from "react"
import greekSaladImg from '../../assets/greekSalad.jpg'
import bruschettaImg from '../../assets/bruschetta.jpg'
import lemonDessertImg from '../../assets/lemonDessert.jpg'
import MenuItem from '../home/MenuItem'

export default class Specials extends React.Component {
    render() {
        return (
            <section className="app-specials" id="specials" name="Weekly Specials">
                <div className="flex-row">
                    <div className="menu-header">
                        <span className="display-title-black">This Week's Specials!</span> <button aria-label="On Click" className='app-button'>Online Menu</button> <br />
                    </div>
                </div>
                <div className="flex-row">
                    <MenuItem imgSrc={greekSaladImg} imgAlt="Greek Salad" itemName="Greek Salad" itemPrice="$12.99" itemDesc="The famous greek salad of crispy lettuce, peppers, olives, and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons."/>
                    <MenuItem imgSrc={bruschettaImg} imgAlt="Bruschetta" itemName="Bruschetta" itemPrice="$5.99" itemDesc="Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil."/>
                    <MenuItem imgSrc={lemonDessertImg} imgAlt="Lemon Dessert" itemName="Lemon Dessert" itemPrice="$5.00" itemDesc="This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined."/>
                </div>
            </section>
        )
    }
}