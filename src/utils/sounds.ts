
// @ts-ignore
import ack from "../sounds/ack.ogg";
// @ts-ignore
import ambient from "../sounds/ambient.ogg";


interface Options {
    loop?: boolean
    volume?: number
}

export const playSound = (sound: 'ack' | 'ambient', options: Options = {}) => {
    let track = ack;
    if (sound === 'ambient') {
        track = ambient;
    }

    const ackAudio = new Audio(track);
    ackAudio.loop = !!options.loop;
    ackAudio.volume = options.volume || 1;

    ackAudio.play();
}