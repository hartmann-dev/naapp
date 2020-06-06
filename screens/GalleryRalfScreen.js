import React from 'react';
import { Text } from 'react-native'
import GallerySwiper from "react-native-gallery-swiper";


const galleryRalfScreen = props => {
    return (
        <GallerySwiper
            images={[
                {
                    uri: "https://luehangs.site/pic-chat-app-images/beautiful-blond-blonde-hair-478544.jpg",
                    // Optional: Adding a dimensions or height and
                    // width field with the actual width and height
                    // for REMOTE IMAGES will help improve performance.
                    dimensions: { width: 1080, height: 1920 }
                },
                {
                    uri: "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-women-beauty-40901.jpg",
                    dimensions: { width: 1080, height: 1920 }
                },
                {
                    uri: "https://luehangs.site/pic-chat-app-images/animals-avian-beach-760984.jpg",
                    dimensions: { width: 1080, height: 1920 }
                },
                {
                    uri: "https://luehangs.site/pic-chat-app-images/beautiful-blond-fishnet-stockings-48134.jpg",
                    dimensions: { width: 1080, height: 1920 }
                },
                {
                    uri: "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-woman-beauty-9763.jpg",
                    dimensions: { width: 1080, height: 1920 }
                },
                {
                    uri: "https://luehangs.site/pic-chat-app-images/attractive-balance-beautiful-186263.jpg",
                    dimensions: { width: 1920, height: 1080 }
                },
                // ...
                // ...
                // ...
            ]}
            // Version *1.15.0 update
            // onEndReached={() => {
            //     // add more images when scroll reaches end
            // }}
            // Change this to render how many items before it.
            initialNumToRender={2}
            // Turning this off will make it feel faster
            // and prevent the scroller to slow down
            // on fast swipes.
            sensitiveScroll={false}
            initialPage={3}
        />
    );
}

export default galleryRalfScreen;