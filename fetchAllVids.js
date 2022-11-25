const vids = [
    "https://giant.gfycat.com/FrailFlawedBluefintuna.mp4",
    "https://giant.gfycat.com/ShadowyColossalChihuahua.mp4",
    "https://giant.gfycat.com/DifficultCoolComet.mp4",
    "https://giant.gfycat.com/UnsteadyHarmfulCrocodileskink.mp4",
    "https://giant.gfycat.com/VelvetyGaseousAkitainu.mp4",
    "https://giant.gfycat.com/FrailFlawedBluefintuna.mp4",
    "https://giant.gfycat.com/ShadowyColossalChihuahua.mp4",
    "https://giant.gfycat.com/DigitalHandyFattaileddunnart.mp4",
    "https://giant.gfycat.com/VelvetyGaseousAkitainu.mp4",
    "https://giant.gfycat.com/AjarGreatAmoeba.mp4",
    "https://giant.gfycat.com/RemoteSandyAfricanfisheagle.mp4",
    "https://giant.gfycat.com/SpottedFluidBarasingha.mp4",
    "https://giant.gfycat.com/SecretInformalIsabellinewheatear.mp4",
    "https://giant.gfycat.com/PlainUnlawfulHomalocephale.mp4",
    "https://giant.gfycat.com/PointedSickJavalina.mp4",
    "https://giant.gfycat.com/ShoddyShowyKestrel.mp4",
    "https://giant.gfycat.com/AjarGreatAmoeba.mp4",
    "https://giant.gfycat.com/RemoteSandyAfricanfisheagle.mp4",
    "https://giant.gfycat.com/UnselfishDirtyCoypu.mp4",
    "https://giant.gfycat.com/RashBraveAlbatross.mp4",
    "https://giant.gfycat.com/QualifiedCanineAtlanticsharpnosepuffer.mp4",
    "https://giant.gfycat.com/RewardingIckyBlackbear.mp4",
    "https://giant.gfycat.com/GargantuanUntriedErne.mp4",
    "https://giant.gfycat.com/HardtofindMistyDrake.mp4",
    "https://giant.gfycat.com/GlitteringWillingHerring.mp4",
    "https://giant.gfycat.com/HalfInfatuatedBeagle.mp4",
    "https://giant.gfycat.com/EllipticalRawKingbird.mp4",
    "https://giant.gfycat.com/PlaintiveFarflungGrayfox.mp4",
    "https://giant.gfycat.com/SlimNaturalDobermanpinscher.mp4",
];



import fs from 'fs';
import axios from 'axios';

//download all videos
const downloadAll = async () => {
    for (let i = 0; i < vids.length; i++) {
        const name = vids[i].split('/').pop().split('.')[0];
        await downloadFile(vids[i], `./vids/${name}.mp4`);
    }
}

import * as stream from 'stream';
import { promisify } from 'util';

const finished = promisify(stream.finished);

export async function downloadFile(fileUrl, outputLocationPath) {

    //Check if file exists first
    if (fs.existsSync(outputLocationPath)) {
        console.log('Skipping ' + fileUrl);
        return;
    }

    console.log('Getting ' + fileUrl);

    const writer = fs.createWriteStream(outputLocationPath);
    return axios({
        method: 'get',
        url: fileUrl,
        responseType: 'stream',
    }).then(response => {
        response.data.pipe(writer);
        return finished(writer); //this is a Promise
    });
}

console.log('starting download');
downloadAll();
