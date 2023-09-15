import React from "react"
import Nav from './Nav'
import { ReactComponent as LogoSvg } from '../../assets/Logo.svg'

export default class Header extends React.Component {
    render() {
        return(
                    <header className="app-header">
                        <div className="flex-row-center">
                            <LogoSvg width="190" height="60" />
                            <Nav isFooter="false"/>
                        </div>
                    </header>
        )
    }
}