function ContactUs_Section (){
    return(
<>
    <form>
        <h1 className="text-center pt-5 ">Submit a request</h1>
        <h5 className="my-5" style={{padding:"0 350px",}}>In order to solve your report, we ask you fill in as many fields as possible. Fields like the IMDb ID and JustWatch URL especially allow us to solve your report quickly.</h5>
        <div className="row justify-content-center mb-3">
        <div className="col-4">
        <label for="inputmobileNum4" className="form-label">First Name</label>
        <input type="text" className="form-control"  aria-label="First name"/>
        </div>
        <div className="col-4 mb-3">
        <label for="inputmobileNum4" className="form-label">Last Name</label>
        <input type="text" className="form-control" aria-label="Last name"/>
        </div>
        </div>
        <form className="row g-3 justify-content-center">
         <div className="col-md-4 mb-3">
         <label for="inputEmail4" className="form-label">Email</label>
        <input type="email" className="form-control" id="inputEmail4"/>
        </div>
        <div className="col-md-4 mb-3">
        <label for="inputmobileNum4" className="form-label">Mobile Phone No.</label>
    <input type="mobileNum" className="form-control" id="inputmobileNum4"/>
        </div>
  <div className="col-8">
    <label for="inputSub" className="form-label">Subject</label>
    <input type="text" className="form-control" id="inputSub"/>
  </div>
  <div className="col-8">
    <label for="inputAddress2" className="form-label">Description</label>
    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
    
    <p className="text-secondary mt-2" >Please enter the details of your request. A member of our support staff will respond as soon as possible.</p>
  </div>
  <div className="col-8 d-flex justify-content-start" style={{marginBottom:"80px"}}>
    <button type="submit" className="btn btn-primary">Submit</button>
  </div>
</form>
    </form>
</>
    )
}
export default ContactUs_Section