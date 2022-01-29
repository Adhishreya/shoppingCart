import React, { Component } from "react"
import Products from "./components/DataFetch";
import Menu from "./components/Menu";
import { connect, context } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "./reduxStore/store";
class Main extends Component {
    render() {
        return (
            <div>
                <nav>
                {/* <Menu value={this.props.itemCount} /> */}
                </nav>
                
                <Products value={this.props}/>
            </div>
        )
    }
 
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);