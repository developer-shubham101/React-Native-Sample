import React, { Component } from 'react';
import { Button, SafeAreaView, View } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import { VideoPlayer, Trimmer, ProcessingManager } from 'react-native-video-processing';

class CompressVideo extends Component {
  state = {
    fileUrl: undefined,
  };
  trimVideo() {
    const options = {
      startTime: 0,
      endTime: 15,
      quality: VideoPlayer.Constants.quality.QUALITY_1280x720, // iOS only
      saveToCameraRoll: true, // default is false // iOS only
      saveWithCurrentDate: true, // default is false // iOS only
    };
    this.videoPlayerRef
      .trim(options)
      .then(newSource => console.log(newSource))
      .catch(console.warn);
  }

  compressVideo() {
    const options = {
      width: 720,
      height: 1280,
      bitrateMultiplier: 3,
      saveToCameraRoll: true, // default is false, iOS only
      saveWithCurrentDate: true, // default is false, iOS only
      minimumBitrate: 300000,
      removeAudio: true, // default is false
    };
    this.videoPlayerRef
      .compress(options)
      .then(newSource => console.log(newSource))
      .catch(console.warn);
  }

  getPreviewImageForSecond(second) {
    const maximumSize = { width: 640, height: 1024 }; // default is { width: 1080, height: 1080 } iOS only
    this.videoPlayerRef
      .getPreviewForSecond(second, maximumSize) // maximumSize is iOS only
      .then(base64String =>
        console.log('This is BASE64 of image', base64String),
      )
      .catch(console.warn);
  }

  getVideoInfo() {
    this.videoPlayerRef
      .getVideoInfo()
      .then(info => console.log(info))
      .catch(console.warn);
  }


  openGallery = async () => {
    ImageCropPicker.openPicker({
      // width: 300,
      // height: 400,
      cropping: false,
      mediaType: 'video',
      compressVideoPreset: 'Passthrough',
    }).then(image => {
      console.log('Image::::', image);
      // this.setState({ fileUrl: image.path });
      const options = {
        width: image.width * 0.5,
        height: image.height * 0.5,
        bitrateMultiplier: 4,
        saveToCameraRoll: false, // default is false, iOS only
        saveWithCurrentDate: false, // default is false, iOS only
        minimumBitrate: 300000,
        removeAudio: false, // default is false
      };
      /* ProcessingManager.getVideoInfo(image.path)
        .then((info) => console.log('getVideoInfo', info))
        .catch(console.warn); */
      ProcessingManager.compress(image.path, options) // like VideoPlayer compress options
        .then((data) => {
          console.log('ProcessingManager::::::', data);
          this.uploadImage(data, data.split('/').pop());
        })
        .catch(e => {
          console.error(e);
        });

      // this.uploadImage(image.sourceURL, image.sourceURL.split('/').pop());

    });
  }

  uploadImage = async (
    singleFile,
    name = '52fb5ff9b59ee626c0a7afbd748ab804.jpg',
  ) => {
    try {
      //Check if any file is selected or not
      if (singleFile != null) {
        //If file selected then create FormData
        const fileToUpload = singleFile;
        const data = new FormData();

        data.append('file', {
          uri: fileToUpload,
          type: 'image/jpeg',
          name: name,
        });
        console.log(fileToUpload);
        let res = await fetch(
          'http://localhost:8000/?url=upload' /* 'http://testapi.newdevpoint.in/upload' */,
          {
            method: 'post',
            body: data,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

        let responseJson = await res.json();
        console.log('Response:: ', responseJson);
        if (responseJson.status == 1) {
          alert('Upload Successful');
        }
      } else {
        //if no file selected the show alert
        alert('Please Select File first');
      }
    } catch (ex) {
      console.log('Error', ex);
    }
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* {
          this.state.fileUrl ? <>
            <VideoPlayer
              ref={ref => (this.videoPlayerRef = ref)}
              startTime={30} // seconds
              endTime={120} // seconds
              play={true} // default false
              replay={true} // should player play video again if it's ended
              rotate={true} // use this prop to rotate video if it captured in landscape mode iOS only
              source={this.state.fileUrl}
              playerWidth={300} // iOS only
              playerHeight={500} // iOS only
              style={{ backgroundColor: 'black' }}
              resizeMode={VideoPlayer.Constants.resizeMode.CONTAIN}
              onChange={({ nativeEvent }) => console.log({ nativeEvent })} // get Current time on every second
            />
            <Trimmer
              source={this.state.fileUrl}
              height={100}
              width={300}
              onTrackerMove={e => console.log(e.currentTime)} // iOS only
              // currentTime={this.video.currentTime} // use this prop to set tracker position iOS only
              themeColor={'white'} // iOS only
              thumbWidth={30} // iOS only
              trackerColor={'green'} // iOS only
              onChange={e => console.log(e.startTime, e.endTime)}
            /></> : <Button title="Open Gallery" onPress={this.openGallery} />
        } */}
        <Button title="Open Gallery" onPress={this.openGallery} />
      </SafeAreaView>
    );
  }
}

export default CompressVideo;
