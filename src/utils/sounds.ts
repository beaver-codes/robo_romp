
// @ts-ignore
import ack from "../sounds/ack.ogg";
// @ts-ignore
import ambient from "../sounds/ambient.ogg";
// @ts-ignore
import move from "../sounds/move.ogg";


type SoundType = 'ack' | 'ambient' | 'move';


const SOUNDS: Record<SoundType, HTMLAudioElement> = {
    ack: new Audio(ack),
    ambient: new Audio(ambient),
    move: new Audio(move),
}

interface Options {
    loop?: boolean
    volume?: number
}

export const playSound = (sound: SoundType, options: Options = {}) => {

    const audio = SOUNDS[sound];
    audio.loop = !!options.loop;
    audio.volume = options.volume || 1;

    audio.play();
}

export const stopSound = (sound: SoundType) => {
    SOUNDS[sound].pause();
}
