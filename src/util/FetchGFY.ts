import axios from 'axios';

export async function fetchVids() {
    // Fetch all gfycat gifs
    var url = "https://api.gfycat.com/v1/gfycats/";
    const gifs = document.querySelectorAll(".gfyitem") as NodeListOf<HTMLElement>;

    for (let i = 0; i < gifs.length; i++) {
        const gif = gifs[i];

        var gifID = gif.dataset.id;
        const res = await axios.get(url + gifID);
        const data = res.data;
        var controls = data.gfyItem.hasAudio ? "controls" : "";
        var videoString = `<video loop autoplay="true" muted poster="${data.gfyItem.posterUrl}" ${controls}><source src="${data.gfyItem.webmUrl}" type="video/webm; codecs="vp8, vorbis""><source src="${data.gfyItem.mp4Url}" type="video/mp4; codecs="avc1.42E01E, mp4a.40.2""></video>`;

        //make a div
        var div = document.createElement("div");
        div.innerHTML = videoString.trim();

        // Replace the div with the video
        gif.parentNode.replaceChild(div.firstChild, gif);
    }
}