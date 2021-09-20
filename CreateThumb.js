import React, { Component } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {
	Image,
	Button,
	SafeAreaView
} from 'react-native'


import { createThumbnail } from "react-native-create-thumbnail";
import DocumentPicker from 'react-native-document-picker';


export default class App extends Component {

	state = {
		fileUrl: "https://static.statusqueen.in/mobilewallpaper/thumbnail/mobile_wallpaper__1-471.jpg"
	}

	openGallery = async () => {
		/* ImagePicker.openPicker({
			// width: 300,
			// height: 400,
			cropping: false,
			mediaType: "image"
		}).then(image => {
			console.log(image);

			// this.setState({ fileUrl: image.path });
			// this.uploadImage(image.path);

			createThumbnail({
				url: image.path,
			})
				.then(response => {
					console.log({ response });
					this.uploadImage(response.path);
					this.setState({ fileUrl: response.path });
				})
				.catch(err => console.log({ err }));

		}); */



		try {
			const results = await DocumentPicker.pickMultiple({
				type: [DocumentPicker.types.images, DocumentPicker.types.video],
			});
			console.log(results);

			createThumbnail({
				url: results[0].uri,
			})
				.then(response => {
					console.log({ response });
					// this.uploadImage(response.path);
					this.setState({ fileUrl: response.path });
				})
				.catch(err => console.log("Error in create thumb ", err));

			// this.uploadImage(results[0].uri, results[0].name);
		} catch (err) {
			if (DocumentPicker.isCancel(err)) {
				// User cancelled the picker, exit any dialogs or menus and move on
				console.log(err);

			} else {
				console.log(err);

			}
		}

	}

	uploadImage = async (singleFile, name = "52fb5ff9b59ee626c0a7afbd748ab804.jpg") => {
		try {
			//Check if any file is selected or not
			if (singleFile != null) {
				//If file selected then create FormData
				const fileToUpload = singleFile;
				const data = new FormData();

				data.append('file', {
					uri: fileToUpload,
					type: "image/jpeg",
					name: name,
				});
				console.log(fileToUpload);
				let res = await fetch(
					'http://testapi.newdevpoint.in/upload', {
					method: 'post',
					body: data,
					headers: {
						'Content-Type': 'multipart/form-data; ',
					},
				});
				let responseJson = await res.json();
				console.log("Response:: ", responseJson);
				if (responseJson.status == 1) {
					alert('Upload Successful');
				}
			} else {
				//if no file selected the show alert
				alert('Please Select File first');
			}
		} catch (ex) {
			console.log("Error", ex)
		}

	};
	render = () => {

		console.log("App", this.state.fileUrl);

		return (
			<SafeAreaView style={{ flex: 1 }}>
				<Button onPress={() => {
					this.openGallery();
				}} title="Open Gallery" />

				<Image
					source={{ uri: this.state.fileUrl }}
					// source={require("./images/done.png")}
					style={{
						height: 200,
						width: 200,
						backgroundColor: "red",
					}}
					resizeMode="cover" />
			</SafeAreaView>

		)
	}
}