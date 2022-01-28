const style={
    margin:"auto",
    display:"flex",
    flexDirection:"column",
    color:"red",
    width:"100%!important",
    justifyContent:"center"
}

const ErrorPage =()=>{
    return (<div style={style}>
        <h1 style={{width:"fit-content"}}>Oops! nothing found here!</h1>
        {/* <img alt="404Error" src="https://images.unsplash.com/photo-1633078654544-61b3455b9161?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=745&q=80"/> */}
        <img src="https://media.istockphoto.com/photos/error-page-concept-of-computer-error-3d-rendering-picture-id1364478157?b=1&k=20&m=1364478157&s=170667a&w=0&h=wCMFKVGG3afshnJwQMcePUVnBoyagHufJyecgWeU6cI="/>
    </div>)
}

export default ErrorPage;