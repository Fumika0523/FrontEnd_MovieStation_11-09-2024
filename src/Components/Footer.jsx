import { ListGroup, ListGroupItem } from "react-bootstrap"

function Footer (){
    const footerDesign={
        // backgroundColor:"black",
        // color:"#54B4D3",
        opacity:"75%",
        ListGroupItem:"none"

    }
    return(
        <>
        <footer>
            <hr />
            <div className="pt-4 container-fluid text-start d-flex justify-content-evenly gap-2 my-3 ">
            <div>
                <h6 className="list-group-item">Top 5 movies</h6>
                <li style={footerDesign} className="list-group-item">Mad Max: Fury Road</li>
                <li style={footerDesign}className="list-group-item"> Godzilla Minus One</li>
                <li style={footerDesign}className="list-group-item">Civil War</li>
                <li style={footerDesign}className="list-group-item">Hit Man</li>
                <li style={footerDesign}className="list-group-item">Dune:Part Two</li>
            </div>
            <div>
                <h6 className="list-group-item">Top 5 TV Series</h6>
                <li style={footerDesign} className="list-group-item">Dark Matter</li>
                <li style={footerDesign}className="list-group-item" >Fallout</li>
                <li style={footerDesign} className="list-group-item">Eric</li>
                <li style={footerDesign} className="list-group-item">Shogun</li>
                <li style={footerDesign} className="list-group-item">Hacks</li>
            </div>
            <div>
                <h6 className="list-group-item">Top 5 providers</h6>
                <li style={footerDesign} className="list-group-item">Netflix</li>
                <li style={footerDesign} className="list-group-item">Disney Plus</li>
                <li style={footerDesign} className="list-group-item">Amazon Prime Video</li>
                <li style={footerDesign} className="list-group-item">Apple TV Plus</li>
                <li style={footerDesign} className="list-group-item"> Apple TV</li>
            </div>
            <div>
                <h6 className="list-group-item">Top 5 new on provider</h6>
                <li style={footerDesign} className="list-group-item">What's new on Netflix</li>
                <li style={footerDesign} className="list-group-item">What's new on Disney Plus</li>
                <li style={footerDesign} className="list-group-item">What's new on Amazon Prime Video</li>
                <li style={footerDesign} className="list-group-item">What's new on Apple TV Plus</li>
                <li style={footerDesign} className="list-group-item">What's new on Apple TV</li>
            </div>
            <div>
                <h6 className="list-group-item">New upcpming movies</h6>
                <li style={footerDesign} className="list-group-item">Outstanding:A Comedy</li>
                <li style={footerDesign} className="list-group-item">Revolution</li>
                <li style={footerDesign} className="list-group-item">Black Barbie</li>
                <li style={footerDesign} className="list-group-item">Trigger Warning</li>
                <li style={footerDesign} className="list-group-item">Diane von Furstenberg:Women in Charge</li>
                <li style={footerDesign} className="list-group-item">A Family Affair</li>
            </div>
        </div>
            <div className="footer-copyright text-center py-3 mb-3">© 2024 Copyright:
            <a href=""> MovieStation.com</a>
            </div>
        </footer>
        </>
    )
}
export default Footer