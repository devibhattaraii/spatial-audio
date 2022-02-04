/** @format */

import {useEffect, useState} from "react";

import {Howl, Howler} from "howler";

import Events from "./Events.jsx";
import song from "./song.mp4";

const SpatialAudio = () => { // const {Howl, Howler} = require('howler');
    const sound = new Howl({
        src: [song],
        html5: true,
        autoplay: true,
        loop: true,

        volume: 0.5,

        sprite: {
            blast: [
                0, 3000
            ],
            laser: [
                4000, 1000
            ],
            winner: [6000, 5000]
        }
    });

    // sound.prototype = {
    //     speaker: function (x, y) {
    //         var soundId = game.audio.sound.play('music');
    //         this.sound.once('play', function () { // Set the position of the speaker in 3D space.
    //             this.sound.pos(x + 0.5, y + 0.5, -0.5, soundId);
    //             this.sound.volume(1, soundId);

    //             // Tweak the attributes to get the desired effect.
    //             this.sound.pannerAttr({
    //                 panningModel: 'HRTF',
    //                 refDistance: 0.8,
    //                 rolloffFactor: 2.5,
    //                 distanceModel: 'exponential'
    //             }, soundId);
    //         }.bind(this), soundId);
    //     }

    // }

    return (<Events sound={sound}/>);
};

export default SpatialAudio;

