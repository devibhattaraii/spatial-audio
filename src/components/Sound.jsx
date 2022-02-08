import { Howl } from 'howler';
import spriteWebm from '../assets/sprite.webm';
import spriteMp3 from '../assets/sprite.mp3';

const useSound = () => {
  // Setup the shared Howl.
  const sound = new Howl({
    src: [spriteMp3, spriteWebm],
    sprite: {
      lightning: [2000, 4147],
      rain: [8000, 9962, true],
      thunder: [19000, 13858],
      music: [34000, 31994, true],
    },
    volume: 0,
  });

  const rain = () => {
    const _rain = sound.play('rain');
    sound.volume(0.2, _rain);
  };

  const thunder = () => {
    setTimeout(() => {
      // Play the thunder sound in a random position.
      var x = Math.round(100 * (2 - Math.random() * 4)) / 100;
      var y = Math.round(100 * (2 - Math.random() * 4)) / 100;
      const _thunder = sound.play('thunder');
      sound.pos(x, y, -0.5, _thunder);
      sound.volume(1, _thunder);

      // Schedule the next clap.
      thunder();
    }, 5000 + Math.round(Math.random() * 15000));
  };

  const lightning = () => {
    const x = Math.round(100 * (2.5 - Math.random() * 5)) / 100;
    const y = Math.round(100 * (2.5 - Math.random() * 5)) / 100;
    const rate = Math.round(100 * (0.4 + Math.random() * 1.25)) / 100;

    // Play the lightning sound.
    const id = sound.play('lightning');

    // Change the position and rate.
    sound.pos(x, y, -0.5, id);
    sound.rate(rate, id);
    sound.volume(1, id);
  };

  const speaker = (x, y) => {
    var soundId = sound.play('music');
    sound.once(
      'play',
      () => {
        // Set the position of the speaker in 3D space.
        sound.pos(x + 0.5, y + 0.5, -0.5, soundId);
        sound.volume(1, soundId);

        /*
    Panning-Model: spatialisation algorithm to use to position the audio in 3D space.
    ref-distance: A double value representing the reference distance 
                for reducing volume as the audio source moves further from the listener.
                For distances greater than this the volume will be reduced based on rolloffFactor and distanceModel.

    Rollerfactor: A double value describing how quickly the volume is reduced 
                as the source moves away from the listener. This value is used by all distance models.

    distanceModel: An enumerated value determining which algorithm to use 
                    to reduce the volume of the audio source as it moves away from the listener. 
                    Possible values are "linear", "inverse" and "exponential". The default value is "inverse".
    */

        // Tweak the attributes to get the desired effect.
        sound.pannerAttr(
          {
            panningModel: 'HRTF',
            refDistance: 0.8,
            rolloffFactor: 2.5,
            distanceModel: 'exponential',
          },
          soundId
        );
      },
      soundId
    );
  };

  // Begin playing background sounds.
  rain();
  thunder();

  return { rain, thunder, lightning, speaker };
};

export default useSound;
