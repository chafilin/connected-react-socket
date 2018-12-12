import React from "react"
import { connect } from "react-redux"

class Provider extends React.Component {
	constructor(props){
		super(props)
	}
	componentDidMount(){
		const {socket, dispatch} = this.props
		socket.onevent = (msg) => {
			const [type, ...data] = msg.data
			dispatch({type: 'SOCKET_ACTION', payload: {
				type, data
			}})
		}
	}
	render(){
		const {children} = this.props
		return (
			<div>
				{children}
			</div>
		)
	}
}
export default connect()( Provider)