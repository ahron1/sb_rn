import React, { useState, useEffect, useRef } from 'react'
import { TouchableOpacity, Image, PermissionsAndroid } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import { Button, Text, TextInput } from 'react-native-paper';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  PlayBackType,
  RecordBackType,
} from 'react-native-audio-recorder-player';
import HocHeader from '../../Hoc/Header'
import Icon from '../../../components/common/Icon/index';
import styles from './styles';
import { HorizontalLayout, VerticalLayout } from "../../../components/common/index"

const audioRecorderPlayer = new AudioRecorderPlayer();

function Index() {
  const [recordTime, setRecordTime] = useState('00:00:00')
  const [recordingDone, setRecordingDone] = useState(false)
  const [recordingOn, setRecording] = useState(false)
  const [currentPositionSec, setCurrentPositionSec] = useState(0)
  const [currentDurationSec, setCurrentDurationSec] = useState(0)
  const [playTime, setPlayTime] = useState('00:00:00')
  const [duration, setDuration] = useState('00:00:00')
  const [recordSecs, setRecordSecs] = useState(0)
  const [recordingPlay ,setRecordingPlay] = useState(false)

  const onStartRecord = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        console.log('write external stroage', grants);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }

    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };

    console.log('audioSet', audioSet);

    //? Default path
    const uri = await audioRecorderPlayer.startRecorder(
      undefined,
      audioSet,
    );

    audioRecorderPlayer.addRecordBackListener((e: RecordBackType) => {
      console.log('record-back', e);
      setRecordSecs(e.currentPosition)
      setRecording(true)
      setRecordTime(audioRecorderPlayer.mmssss(
        Math.floor(e.currentPosition),
      ))
    });
    console.log(`uri: ${uri}`);
  };
  const onPausePlay = async () => {
    console.log("pause recording======>")
    await audioRecorderPlayer.pausePlayer();
    setRecordingPlay(false)
  };
  const onPauseRecord = async () => {
    try {
      await audioRecorderPlayer.pauseRecorder();
    } catch (err) {
      console.log('pauseRecord', err);
    }
  };


  // const recordingPlay = async () => {
  //   await audioRecorderPlayer.current.pausePlayer();
  // };
  const onResumePlay = async () => {
    await audioRecorderPlayer.current.resumePlayer();
  };

  const onStopRecord = async () => {
    console.log("stop recording======>", audioRecorderPlayer)
    const result = await audioRecorderPlayer.stopRecorder();
    console.log("stop recording1222")
    audioRecorderPlayer.removeRecordBackListener();
    console.log("stop recording222")
    setRecordSecs(0)
    setRecording(false)
    setRecordingDone(true)
    console.log("----result", result);
  };

  const onStartPlay = async () => {
    console.log('onStartPlay===========>');
    //? Custom path
    // const msg = await this.audioRecorderPlayer.startPlayer(this.path);

    //? Default path
    const msg = await audioRecorderPlayer.startPlayer();
    const volume = await audioRecorderPlayer.setVolume(1.0);
    console.log(`file:------> ${msg}`, `volume:===> ${volume}`);

    audioRecorderPlayer.addPlayBackListener((e: PlayBackType) => {
      console.log("e.currentPosition--->", e.currentPosition, "e.duration===>", e.duration, "play TIme", audioRecorderPlayer.mmssss(
        Math.floor(e.currentPosition),
      ))
      setCurrentPositionSec(e.currentPosition)
      setCurrentDurationSec(e.duration)

      setPlayTime(audioRecorderPlayer.mmssss(
        Math.floor(e.currentPosition),
      ))
      setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)))
      if(e.currentPosition==e.duration){
        setRecordingPlay(false)
      }
      // this.setState({
      //   currentPositionSec: e.currentPosition,
      //   currentDurationSec: e.duration,
      //   playTime: this.audioRecorderPlayer.mmssss(
      //     Math.floor(e.currentPosition),
      //   ),
      //   duration: this.audioRecorderPlayer,
      // });
    });
  };
  const [image, setImage] = useState(null)
  const openPicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log("Image path", image.path)
      setImage(image.path)
    });
  };



  return (
    <VerticalLayout style={{ flex: 1 }}>
      <VerticalLayout style={{ flex: 2 }}>
        <Text style={{ fontWeight: '900' }}>Upload Prescription</Text>
        <TouchableOpacity style={{ height: 200, width: "90%", backgroundColor: 'gray', borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginTop: 20 }} onPress={() => {
          openPicker()
        }}>
          {image ?
            <Image source={{ uri: image }} style={{ height: 200, width: '90%' }} resizeMode="stretch" />
            :
            <Icon
              type="fontAwesome"
              name="upload"
              style={{ ...styles.checkMark }}
            />
          }

        </TouchableOpacity>

      </VerticalLayout>
      <VerticalLayout style={{ flex: 1 }}>
        <Text style={{ fontWeight: '900' }} >Upload Prescription</Text>
        <TextInput placeholder='Description' multiline={true} underlineColorAndroid="transparent" numberOfLines={2} style={{ borderBottomColor: 'white', borderBottomWidth: 0 }} />
      </VerticalLayout>
      {
        recordingDone
          ?
          <VerticalLayout style={{ flex: 1 }} >
            <HorizontalLayout style={{ height: 60, width: "100%", backgroundColor: 'white' }}>
              <VerticalLayout style={{ flex: 0.1, alignItems: 'center' }}>
                <TouchableOpacity style={{ top: "25%"}} onPress={() => {
                    //  recordingPlay?{
                    //   onPausePlay()
                    //  }:{
                    //   onStartPlay()
                    //   setRecordingPlay(true)
                    //  }
                    console.log("recordingPlay====>",recordingPlay)
                    if(recordingPlay){
                      console.log("recordingPlay====1>",recordingPlay)
                      onPausePlay()
                    }else{
                      onStartPlay()
                      setRecordingPlay(true)
                    }

                }}>
                  <Icon
                    type="fa5"
                    name={recordingPlay?"pause":"play"}
                    style={{ ...styles.checkMark }}
                  />
                </TouchableOpacity>
              </VerticalLayout>
              <VerticalLayout style={{ flex: 0.2, justifyContent: 'center', marginTop: -10 }}>
                <Text style={{ fontSize: 15, fontWeight: '500' }}>{playTime}</Text>
              </VerticalLayout>
              <VerticalLayout style={{ flex: 0.5, justifyContent: 'center', marginTop: -10 }}>
                <VerticalLayout
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 0.2,
                  }}
                />
              </VerticalLayout>
              <VerticalLayout style={{ flex: 0.2, justifyContent: 'center', marginTop: -10, paddingLeft: 10 }}>
                <Text style={{ fontSize: 20 }}>Clear</Text>
              </VerticalLayout>

            </HorizontalLayout>
          </VerticalLayout>
          :
          <VerticalLayout style={{ flex: 1}} >
            <HorizontalLayout style={{ height: 60, width: "100%", backgroundColor: 'white' }}>
              <VerticalLayout style={{ flex: 0.1, alignItems: 'center' }}>
                <TouchableOpacity style={{ top: "25%"}} onPress={() => {
                  recordingOn ? onStopRecord() : onStartRecord()

                }}>
                  <Icon
                    type="fa5"
                    name={recordingOn ? "record-vinyl" : 'microphone'}
                    style={{ ...styles.checkMark }}
                  />
                </TouchableOpacity>
              </VerticalLayout>
              <VerticalLayout style={{ flex: 0.2, justifyContent: 'center', marginTop: -10 }}>
                <Text style={{ fontSize: 15, fontWeight: '500' }}>{recordTime}</Text>
              </VerticalLayout>
              <VerticalLayout style={{ flex: 0.5, justifyContent: 'center', marginTop: -10 }}>
                <VerticalLayout
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 0.2,
                  }}
                />
              </VerticalLayout>
              <VerticalLayout style={{ flex: 0.2, justifyContent: 'center', marginTop: -10, paddingLeft: 10 }}>
                <Text style={{ fontSize: 10 }}>Max 30 Second</Text>
              </VerticalLayout>
            </HorizontalLayout>

          </VerticalLayout>
      }

    </VerticalLayout>
  )
}

export default HocHeader(Index, {
  title: "Store 1 Name",
  ButtonName: 'Contact'
})