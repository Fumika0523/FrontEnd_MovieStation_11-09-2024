import MovieCard from "./MovieCard"

function MovieDisplay({ movieData, setMovieData }) {
    console.log(movieData)
    
    let displayStyle = {
        display: "flex",
        flexWrap: "wrap",
        gap: "2.7%",
        margin: "1% 4% 1% 4%",
        // backgroundColor: "black",
        position: "relative",
        //    border:"1px solid red",
        cursor: "pointer",
    }
   
    return (
        <>
        
    <div className="mt-1 mb-1" >
                {/* Search*/}
                <form className="d-flex justify-content-end me-5 pe-3">
                    <div className="iput-icons d-flex flex-row">
                        <i className="fas fa-search icon fs-5 pt-2 px-3 "></i>
                        <input className="form-control me-2 ps-4 bg-dark text-secondary" type="search" aria-label="Search" name="" id="" placeholder="  Search movie"
                            onChange={() => {
                                this.setState({
                                    query: this.search.value
                                }, this.filterArray)
                            }} />
                        <button className="btn px-3 mx-1 btn-outline-secondary" type="submit">Search</button>
                    </div>
                </form>
                {/* each movie card */}
                <div style={displayStyle} >

                    {
                        movieData?.map((element, index) => (
                            <MovieCard {...element} key={index} setMovieData={setMovieData} element={element} />   //spread operator
                        ))
                    }
                </div>
            </div>
        </>
    )
}
export default MovieDisplay