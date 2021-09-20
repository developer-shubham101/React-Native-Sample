import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	Image,
	TouchableHighlight,
	TouchableOpacity
} from 'react-native'

import { BoxShadow } from 'react-native-shadow'

export default class VideoCell extends Component {
	render = () => {
		const shadowOpt = {
			width: 160,
			height: 170,
			color: "#044",
			border: 10,
			radius: 3,
			opacity: 0.2,
			x: 0,
			y: 4,
			style: { marginVertical: 5 }
		}

		return (
			<View>
				<BoxShadow setting={shadowOpt}>
					<TouchableOpacity style={{
						position: "relative",
						width: 160,
						height: 170,
						backgroundColor: "#fff",
						borderRadius: 3,
						// marginVertical:5,
						overflow: "hidden"
					}}>
						<View><Text>asdasda</Text></View>
					</TouchableOpacity>
				</BoxShadow>

				<BoxShadow setting={shadowOpt}>
					<TouchableHighlight style={{
						position: "relative",
						width: 160,
						height: 170,
						backgroundColor: "#fff",
						borderRadius: 3,
						// marginVertical:5,
						overflow: "hidden"
					}}>
						<View><Text>asdasda</Text></View>
					</TouchableHighlight>
				</BoxShadow>
			</View>

		)
	}
}