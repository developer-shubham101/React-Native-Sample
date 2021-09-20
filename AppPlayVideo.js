import React, { Component } from 'react';
import {
	SafeAreaView
} from 'react-native'


import Video from 'react-native-video';

export default class VideoPlayer extends Component {

	state = {

	}


	render = () => {


		return (
			<SafeAreaView style={{ flex: 1 }}>
				<Video
					ref={videoPlayer => (this.videoPlayer = videoPlayer)}
					source={
						require('./sample.mp4') //"https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
					}
					style={{
						flex: 1,
					}}
					// volume={Math.max(Math.min(1, volume), 0)}

					repeat={true}
					resizeMode="contain"
					onBuffer={(data) => { console.log("onBuffer", data) }}
					onLoad={(data) => { console.log("onLoad", data) }}
					onProgress={(data) => { console.log("onProgress", data) }}
					onEnd={(data) => { console.log("onEnd", data) }}
					onError={(data) => { console.log("onError", data) }}

					controls={true}
				/>
			</SafeAreaView>

		)
	}
}