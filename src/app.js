import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Dialog, DialogTitle, DialogContent, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { Header, Loader } from './components'

import routes from './routes'

export default class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			activeRoute: !JSON.parse(localStorage.getItem("user-token")) ? '/login' : '/home',
			alert: null,
			isLoading: false
		}
	}

	alert(message, type, time = 5000, vertical = 'top', horizontal = 'center') {
		this.setState({
			alert: (
				<Snackbar className="alert" open={true} autoHideDuration={time} onClose={() => this.setState({ alert: null })}
					anchorOrigin={{ vertical, horizontal }}>
					<Alert onClose={() => this.setState({ alert: null })} severity={type}>
						{message}
					</Alert>
				</Snackbar>
			)
		})
	}

	loading(isLoading) {
		this.setState({ isLoading })
	}

	render() {
		const { activeRoute, alert, isLoading } = this.state

		return (
			<div>
				<Dialog fullScreen={Boolean("true")} open={Boolean("true")}>
					{activeRoute === '/login' ? null :
						<DialogTitle style={{ padding: 0 }}>
							<Header activeRoute={activeRoute} setRoute={(activeRoute) => this.setState({ activeRoute })} />
						</DialogTitle>
					}

					<DialogContent>
						{alert}

						<Loader isLoading={isLoading} />

						<Router>
							{routes.map((page, index) => {
								if (activeRoute.includes(page.route)) {
									let Component = null

									if (page.haveChild) {
										page.component.map(child => {
											if (child.route === activeRoute) {
												Component = child.component
											}
										})
									}

									else {
										Component = page.component
									}

									return <Route key={index} render={() => <Component {...this}
										alert={(message, type, time, vertical, horizontal) => this.alert(message, type, time, vertical, horizontal)}
										loading={(isLoading) => this.loading(isLoading)}
										activeRoute={activeRoute} setRoute={(activeRoute) => this.setState({ activeRoute })} />}
									/>
								}

								return null
							})}
						</Router>
					</DialogContent>
				</Dialog>
			</div>
		)
	}
}
