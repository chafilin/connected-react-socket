import React from "react"
import { connect } from "react-redux"
import Context from './Context'

class ConnectedSocket extends React.Component {
	constructor(props){
		super(props)
		this.state ={
			payload: null
		}
	}
	componentDidMount(){
		const {socket, dispatch} = this.props
		socket.onevent = (msg) => {
			const [type, ...data] = msg.data
			const payload ={
				type, data
			}
			this.setState({payload})
			dispatch({type: 'SOCKET_ACTION', payload})
		}
	}
	render(){
		const {children} = this.props
		const {payload} = this.state
		return (
			<Context.Provider value={payload}>
				{children}
			</Context.Provider>
		)
	}
}
export default connect()( ConnectedSocket)
