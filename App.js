import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { WebView } from "react-native-webview";



class AppModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			html: ''
		}
	}

	componentWillMount() {
		this.setState({
			html: `<html>
    <head>
    <script>
    window.ReactNativeWebView.postMessage("{status: data}")
    </script>
    </head>
    <body><h1>Hello from webView</h1></body>
    </html>`
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<WebView
					source={{
						html: this.state.html,
						// uri: 'https://dogwalkergame.ezxdemo.com/',
					}}

					onMessage={(event) => {
						console.log("onMessage", "asdasd");
						let message = event.nativeEvent.data;
						console.log("onMessage", { message });
						alert(message)
						/* event.nativeEvent.data must be string, i.e. window.postMessage
						should send only string.
						* */
					}}
				/>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 0,
		margin: 0
	},
	loading: {
		fontSize: 24,
		fontWeight: 'bold'
	}
})
export default AppModal;