import { Linking, Platform } from "react-native";
import SendIntentAndroid from "react-native-send-intent";

export function playVideo(url){
    var fn = Platform.select({
        android(){
            SendIntentAndroid.openAppWithData(
                /* "org.videolan.vlc" */null,
                "https://www.w3schools.com/html/mov_bbb.mp4",
                "video/*"
            ).then(wasOpened => {});
        },
        default(){
            Linking.openURL(url).catch(err => {});
        }
    });
    fn();
}