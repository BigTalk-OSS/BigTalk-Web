import logo from '../logo.svg'
import './style/TitleBar.css'
export default function TitleBar(){
    return(
        <div className={"title-bar-container"}>
            <div className={"branding-container"}>
                <img className={"logo"} src={logo} alt={"app_logo"}/>
                <span className={"name"}><strong>Big Talk</strong></span>
            </div>
        </div>
    );
}
