import React from "react"
import { connect } from "react-redux"
import Context from './Context'
import { handleSocketAction } from "./actions";
import PropTypes from 'prop-types'

/**
 * Connected socket provider for app
 */
class ConnectedSocket extends React.Component {
	constructor(props){
		super(props)
		this.state = {
      payload: null,
		}
	}
	componentDidMount(){
    const {socket, dispatch} = this.props
		socket.onevent = (msg) => {
			const [type, ...data] = msg.data
			const payload = {
				type, data,
			}
			this.setState({payload})
			dispatch(handleSocketAction(payload))
		}
	}
	render(){
		const {children,socket} = this.props
		const {payload} = this.state
		return (
			<Context.Provider value={{payload, emit: (type, ...rest) => socket.emit(type, ...rest)}} >
				{children}
			</Context.Provider>
		)
	}
}

ConnectedSocket.propTypes = {
  children: PropTypes.node.isRequired,
  socket: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}
export default connect()(ConnectedSocket)
