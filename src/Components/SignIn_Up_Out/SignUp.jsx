function SignUp() {
  return (
    <>
      <form className="container my-5 w-50">
        <div class="row mb-5">
          <div class="col">
            <label for="exampleInputPassword1" class="form-label">Name</label>
            <input type="text" className="form-control" />
          </div>
          <div class="col">
            <label for="exampleInputPassword1" class="form-label">Age</label>
            <input type="text" class="form-control" />
          </div>
        </div>
        <div class="row mb-5">
          <div class="col">
            <label for="exampleInputPassword1" class="form-label">Gender</label>
            <input type="text" class="form-control" />
          </div>
          <div class="col">
            <label for="exampleInputPassword1" class="form-label">Phone Number</label>
            <input type="text" class="form-control" />
          </div>
        </div>
        <div class="row mb-5">
          <div class="col">
            <label for="exampleInputPassword1" class="form-label">Email</label>
            <input type="text" class="form-control" />
          </div>
          <div class="col">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="text" class="form-control" />
          </div>
        </div>
        <button class="btn btn-secondary" type="submit">Sign Up</button>
      </form>
    </>
  )
}
export default SignUp

