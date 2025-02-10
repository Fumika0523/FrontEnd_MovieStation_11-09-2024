function Footer (){
    
    return(
        <>
        <footer className="container-fluid   -warning -5">
            <hr/>
            <div className="row d-flex my-4 flex-row justify-content-evenly">
            {/* 1st */}
            <div className=" p-0 col-2">
                <h6>Top 5 movies</h6>
                <li className="footerListStyle">Mad Max: Fury Road</li>
                <li className="footerListStyle"> Godzilla Minus One</li>
                <li className="footerListStyle">Civil War</li>
                <li className="footerListStyle">Hit Man</li>
                <li className="footerListStyle">Dune:Part Two</li>
            </div>
            <div className=" p-0 col-2">
                <h6>Top 5 TV Series</h6>
                <li  className="footerListStyle">Dark Matter</li>
                <li className="footerListStyle" >Fallout</li>
                <li  className="footerListStyle">Eric</li>
                <li  className="footerListStyle">Shogun</li>
                <li  className="footerListStyle">Hacks</li>
            </div>
            <div className=" p-0 col-2">
                <h6>Top 5 providers</h6>
                <li  className="footerListStyle">Netflix</li>
                <li  className="footerListStyle">Disney Plus</li>
                <li  className="footerListStyle">Amazon Prime Video</li>
                <li  className="footerListStyle">Apple TV Plus</li>
                <li  className="footerListStyle"> Apple TV</li>
            </div>
            <div className=" p-0 col-2">
                <h6 >Top 5 new on provider</h6>
                <li  className="footerListStyle">What's new on Netflix</li>
                <li  className="footerListStyle">What's new on Disney Plus</li>
                <li  className="footerListStyle">What's new on Amazon Prime Video</li>
                <li  className="footerListStyle">What's new on Apple TV Plus</li>
                <li  className="footerListStyle">What's new on Apple TV</li>
            </div>
            <div className=" p-0 col-2 ">
                <h6>New upcpming movies</h6>
                <li  className="footerListStyle">Outstanding:A Comedy</li>
                <li  className="footerListStyle">Revolution</li>
                <li  className="footerListStyle">Black Barbie</li>
                <li  className="footerListStyle">Trigger Warning</li>
                <li  className="footerListStyle">A Family Affair</li>
            </div>
        </div>
            <div className="footer-copyright text-center my-4">© 2024 Copyright:
            <a href=""> MovieStation.com</a>
            </div>
        </footer>
        </>
    )
}
export default Footer