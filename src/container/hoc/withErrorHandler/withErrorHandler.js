import React, { Component, Fragment } from 'react';
import Modal from '../../../components/UI/Modal/modal';

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			error: null
		};
		componentDidMount() {
			axios.interceptors.request.use((req) => {
				this.setState({ error: null });
				return req;
			});
			axios.interceptors.response.use((res) => res, (error) => this.setState({ error: error }));
		}
		errorConfirmedHandler = () => {
			this.setState({ error: null });
		};
		render() {
			return (
				<Fragment>
					<Modal purchasing={this.state.error} cancel={this.errorConfirmedHandler}>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent />
				</Fragment>
			);
		}
	};
};
export default withErrorHandler;
